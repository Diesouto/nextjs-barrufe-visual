import Link from "next/link";
import { type SanityDocument } from "next-sanity";

import { client } from "@/sanity/client";
import { ContentCard } from "@/components/cards/contentCard";

const WORKSHOPS_QUERY = `*[
  _type == "workshop"
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{_id, title, slug, publishedAt, image}`;

const options = { next: { revalidate: 60 } };

export default async function WorkshopsPage() {
  const workshops = await client.fetch<SanityDocument[]>(
    WORKSHOPS_QUERY,
    {},
    options
  );

  return (
    <main className="container mx-auto min-h-screen max-w-6xl p-8">
      <Link href="/" className="hover:underline mb-8 inline-block">
        ← Back to home
      </Link>
      <h1 className="text-4xl font-bold mb-8">Workshops</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {workshops.map((workshop) => (
          <ContentCard
            key={workshop._id}
            title={workshop.title}
            publishedAt={workshop.publishedAt}
            slug={workshop.slug.current}
            image={workshop.image}
            basePath="workshops"
          />
        ))}
      </div>
    </main>
  );
}
