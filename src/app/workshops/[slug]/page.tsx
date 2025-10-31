import { PortableText, type SanityDocument } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client } from "@/sanity/client";
import Link from "next/link";

const WORKSHOP_QUERY = `*[_type == "workshop" && slug.current == $slug][0]`;

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

const options = { next: { revalidate: 30 } };

export default async function WorkshopPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const workshop = await client.fetch<SanityDocument>(
    WORKSHOP_QUERY,
    await params,
    options
  );
  const workshopImageUrl = workshop.image
    ? urlFor(workshop.image)?.width(550).height(310).url()
    : null;

  return (
    <main className="container mx-auto min-h-screen max-w-3xl p-8 flex flex-col gap-4">
      <Link href="/workshops" className="hover:underline">
        ← Back to workshops
      </Link>
      {workshopImageUrl && (
        <img
          src={workshopImageUrl}
          alt={workshop.title}
          className="aspect-video rounded-xl"
          width="550"
          height="310"
        />
      )}
      <h1 className="text-4xl font-bold mb-8">{workshop.title}</h1>
      <div className="prose">
        <p>
          Published:{" "}
          {new Date(workshop.publishedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        {Array.isArray(workshop.body) && <PortableText value={workshop.body} />}
      </div>
    </main>
  );
}
