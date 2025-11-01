import Link from "next/link";
import { type SanityDocument } from "next-sanity";
import { client } from "@/sanity/client";
import { ContentCard } from "@/components/cards/contentCard";
import { AnimatedText } from "@/components/ui/AnimatedText";

const WORKSHOPS_QUERY = `*[
  _type == "workshop"
  && defined(slug.current)
]|order(publishedAt desc)[0...6]{_id, title, slug, publishedAt, image}`;

const options = { next: { revalidate: 60 } };

export async function WorkshopsSection() {
  const workshops = await client.fetch<SanityDocument[]>(
    WORKSHOPS_QUERY,
    {},
    options
  );

  return (
    <section
      id="workshops"
      className="min-h-screen w-full flex flex-col justify-center items-center p-8 bg-black text-white"
    >
      <div className="container mx-auto max-w-6xl">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold">
            <AnimatedText text="Workshops" />
          </h2>
          <Link
            href="/workshops"
            className="text-lg hover:underline text-red-500"
          >
            View all →
          </Link>
        </div>
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
      </div>
    </section>
  );
}
