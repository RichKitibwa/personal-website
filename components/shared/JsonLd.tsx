import { JsonLdString } from "@/lib/structured-data";

export function JsonLd({ data }: { data: unknown }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JsonLdString(data) }} />;
}
