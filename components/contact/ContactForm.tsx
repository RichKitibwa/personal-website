"use client";

import Script from "next/script";
import { useRef, useState, type FormEvent } from "react";
import { limits, normalise, reasons, validate, type FieldErrors } from "@/lib/contact";
import { track } from "@/lib/analytics";
import { profile } from "@/content/profile";

type Status = { state: "idle" } | { state: "sending" } | { state: "sent" } | { state: "error"; message: string };

const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

const inputCls =
  "mt-2 w-full rounded-xl border border-line bg-raised px-4 py-3 text-base transition placeholder:text-muted/60 focus:border-accent aria-[invalid=true]:border-rose-500";

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const [errors, setErrors] = useState<FieldErrors>({});

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const input = normalise(data);
    const clientErrors = validate(input);
    setErrors(clientErrors);
    if (Object.keys(clientErrors).length) {
      const first = Object.keys(clientErrors)[0];
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    setStatus({ state: "sending" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...input,
          website: data.website ?? "",
          turnstileToken: data["cf-turnstile-response"] ?? "",
        }),
      });
      const body = (await res.json().catch(() => ({}))) as { error?: string; fields?: FieldErrors };
      if (!res.ok) {
        if (body.fields) setErrors(body.fields);
        setStatus({ state: "error", message: body.error ?? "Something went wrong. Please try again." });
        return;
      }
      setStatus({ state: "sent" });
      track("Contact Submitted", { reason: input.reason });
      formRef.current?.reset();
    } catch (err) {
      console.error("Contact form submission failed", err);
      setStatus({ state: "error", message: "Network error. Please check your connection or email me directly." });
    }
  }

  if (status.state === "sent") {
    return (
      <div role="status" className="rounded-2xl border border-accent/40 bg-accent-soft p-8">
        <p className="font-display text-3xl">Thank you, message received.</p>
        <p className="mt-3 text-muted">I read every message and will reply to the email address you gave, usually within a few days.</p>
        <button type="button" onClick={() => setStatus({ state: "idle" })} className="mt-6 text-sm font-medium text-accent underline underline-offset-4">
          Send another message
        </button>
      </div>
    );
  }

  const field = (name: keyof FieldErrors) => ({
    name,
    id: `contact-${name}`,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `contact-${name}-error` : undefined,
  });

  const errorText = (name: keyof FieldErrors) =>
    errors[name] ? (
      <p id={`contact-${name}-error`} className="mt-1.5 text-sm text-rose-600 dark:text-rose-400">
        {errors[name]}
      </p>
    ) : null;

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="grid gap-6">
      {siteKey ? <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer /> : null}

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="text-sm font-medium">
            Name
          </label>
          <input {...field("name")} type="text" autoComplete="name" maxLength={limits.name} required className={inputCls} />
          {errorText("name")}
        </div>
        <div>
          <label htmlFor="contact-email" className="text-sm font-medium">
            Email
          </label>
          <input {...field("email")} type="email" autoComplete="email" maxLength={limits.email} required className={inputCls} />
          {errorText("email")}
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-organisation" className="text-sm font-medium">
            Organisation <span className="font-normal text-muted">(optional)</span>
          </label>
          <input {...field("organisation")} type="text" autoComplete="organization" maxLength={limits.organisation} className={inputCls} />
          {errorText("organisation")}
        </div>
        <div>
          <label htmlFor="contact-reason" className="text-sm font-medium">
            Reason for getting in touch
          </label>
          <select {...field("reason")} required defaultValue="" className={inputCls}>
            <option value="" disabled>
              Choose one…
            </option>
            {reasons.map((r) => (
              <option key={r}>{r}</option>
            ))}
          </select>
          {errorText("reason")}
        </div>
      </div>

      <div>
        <label htmlFor="contact-message" className="text-sm font-medium">
          Message
        </label>
        <textarea {...field("message")} rows={6} maxLength={limits.message} required className={inputCls} />
        {errorText("message")}
      </div>

      {/* Honeypot — hidden from people and assistive tech. */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {siteKey ? <div className="cf-turnstile" data-sitekey={siteKey} data-theme="auto" /> : null}

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={status.state === "sending"}
          className="inline-flex h-12 items-center rounded-full bg-fg px-6 text-sm font-medium text-bg transition hover:opacity-85 disabled:opacity-50"
        >
          {status.state === "sending" ? "Sending…" : "Send message"}
        </button>
        <p className="text-xs text-muted">Your details are only used to reply to you.</p>
      </div>

      <div aria-live="assertive">
        {status.state === "error" ? (
          <p className="rounded-xl border border-rose-500/40 bg-rose-500/10 p-4 text-sm">
            {status.message}{" "}
            <a href={`mailto:${profile.email}`} className="font-medium underline underline-offset-4">
              {profile.email}
            </a>
          </p>
        ) : null}
      </div>
    </form>
  );
}
