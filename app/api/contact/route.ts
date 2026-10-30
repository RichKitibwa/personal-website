import { normalise, validate } from "@/lib/contact";

// Contact form endpoint: validates input, checks a honeypot and (optionally)
// Cloudflare Turnstile, applies a per-IP rate limit, then emails the message
// via Resend. Sent as plain text, so submitted content can't inject HTML.

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
// Best-effort, per-instance limit. Serverless platforms run several instances,
// so Turnstile is the primary abuse control in production.
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

async function verifyTurnstile(token: string, ip: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // Not configured (e.g. local development).
  if (!token) return false;
  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body: new URLSearchParams({ secret, response: token, remoteip: ip }),
  });
  if (!res.ok) throw new Error(`Turnstile verification failed with HTTP ${res.status}`);
  const data = (await res.json()) as { success: boolean };
  return data.success;
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

  if (rateLimited(ip)) {
    return Response.json({ error: "Too many messages. Please try again in a few minutes." }, { status: 429 });
  }

  let raw: Record<string, unknown>;
  try {
    raw = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: real visitors never see or fill this field. Pretend success.
  if (typeof raw.website === "string" && raw.website.length > 0) {
    return Response.json({ ok: true });
  }

  const input = normalise(raw);
  const errors = validate(input);
  if (Object.keys(errors).length) {
    return Response.json({ error: "Please fix the highlighted fields.", fields: errors }, { status: 422 });
  }

  try {
    const human = await verifyTurnstile(typeof raw.turnstileToken === "string" ? raw.turnstileToken : "", ip);
    if (!human) {
      return Response.json({ error: "Spam check failed. Please refresh and try again." }, { status: 400 });
    }
  } catch (err) {
    console.error("[contact] turnstile error", err);
    return Response.json({ error: "Spam check is unavailable. Please email me directly." }, { status: 502 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !to || !from) {
    console.error("[contact] email delivery is not configured: set RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL");
    return Response.json({ error: "The contact form isn't configured yet. Please email me directly." }, { status: 503 });
  }

  const text = [
    `Name: ${input.name}`,
    `Email: ${input.email}`,
    `Organisation: ${input.organisation || "—"}`,
    `Reason: ${input.reason}`,
    "",
    input.message,
  ].join("\n");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: input.email,
      subject: `Website: ${input.reason} — ${input.name}`.slice(0, 180),
      text,
    }),
  });

  if (!res.ok) {
    console.error("[contact] resend error", res.status, await res.text());
    return Response.json({ error: "Your message couldn't be sent. Please email me directly." }, { status: 502 });
  }

  return Response.json({ ok: true });
}
