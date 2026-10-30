import Image from "next/image";
import type { Media } from "@/content/projects";

// Real product screenshots, framed so their provenance (browser vs. phone) is clear.
export function MediaFrame({ media, priority = false, sizes }: { media: Media; priority?: boolean; sizes?: string }) {
  if (media.frame === "phone") {
    return (
      <figure className="mx-auto w-full max-w-[260px]">
        <div className="overflow-hidden rounded-[2rem] border-[6px] border-ink bg-ink shadow-xl shadow-black/20">
          <Image
            src={media.src}
            alt={media.alt}
            width={media.width}
            height={media.height}
            priority={priority}
            sizes={sizes ?? "260px"}
            className="h-auto w-full rounded-[1.5rem]"
          />
        </div>
        <figcaption className="mt-3 text-center text-xs leading-relaxed text-muted">{media.caption}</figcaption>
      </figure>
    );
  }
  return (
    <figure className="w-full">
      <div className="overflow-hidden rounded-xl border border-line bg-raised shadow-xl shadow-black/10">
        <div aria-hidden className="flex items-center gap-1.5 border-b border-line px-3 py-2.5">
          <span className="size-2.5 rounded-full bg-line" />
          <span className="size-2.5 rounded-full bg-line" />
          <span className="size-2.5 rounded-full bg-line" />
        </div>
        <Image
          src={media.src}
          alt={media.alt}
          width={media.width}
          height={media.height}
          priority={priority}
          sizes={sizes ?? "(min-width: 1024px) 720px, 100vw"}
          className="h-auto w-full"
        />
      </div>
      <figcaption className="mt-3 text-xs leading-relaxed text-muted">{media.caption}</figcaption>
    </figure>
  );
}
