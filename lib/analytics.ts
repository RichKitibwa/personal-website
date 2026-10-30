// Privacy-friendly analytics via Plausible (no cookies, no personal data).
// Outbound links (LinkedIn, GitHub, live products) and file downloads (resume)
// are tracked automatically by Plausible once enabled in the site settings.
// Page views cover case-study and article views.

type PlausibleFn = (event: string, options?: { props?: Record<string, string> }) => void;

export function track(event: string, props?: Record<string, string>) {
  const plausible = (window as unknown as { plausible?: PlausibleFn }).plausible;
  plausible?.(event, props ? { props } : undefined);
}
