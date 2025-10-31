import Link from "next/link";
import { type SanityDocument } from "next-sanity";

import { client } from "@/sanity/client";

const WORKSHOPS_QUERY = `*[
  _type == "workshop"
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{_id, title, slug, publishedAt}`;

const options = { next: { revalidate: 30 } };

export default async function WorkshopsPage() {
  const workshops = await client.fetch<SanityDocument[]>(
    WORKSHOPS_QUERY,
    {},
    options
  );

  return (
    <main className="container mx-auto min-h-screen max-w-3xl p-8">
      <Link href="/" className="hover:underline mb-8 inline-block">
        ← Back to home
      </Link>
      <h1 className="text-4xl font-bold mb-8">Workshops</h1>
      <ul className="flex flex-col gap-y-4">
        {workshops.map((workshop) => (
          <li className="hover:underline" key={workshop._id}>
            <Link href={`/workshops/${workshop.slug.current}`}>
              <h2 className="text-xl font-semibold">{workshop.title}</h2>
              <p>{new Date(workshop.publishedAt).toLocaleDateString()}</p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
