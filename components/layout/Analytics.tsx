import Script from "next/script";

// Loads only when NEXT_PUBLIC_PLAUSIBLE_SRC is set (the site-specific script
// URL from Plausible, e.g. https://plausible.io/js/pa-XXXX.js).
export function Analytics() {
  const src = process.env.NEXT_PUBLIC_PLAUSIBLE_SRC;
  if (!src) return null;
  return (
    <>
      <Script src={src} strategy="afterInteractive" />
      <Script id="plausible-init" strategy="afterInteractive">
        {`window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}};plausible.init()`}
      </Script>
    </>
  );
}
