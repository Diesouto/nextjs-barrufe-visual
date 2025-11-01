import Link from "next/link";
import { type SanityDocument } from "next-sanity";
import { client } from "@/sanity/client";
import { ContentCard } from "@/components/cards/contentCard";
import { AnimatedText } from "@/components/ui/AnimatedText";

const POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc)[0...6]{_id, title, slug, publishedAt, image}`;

const options = { next: { revalidate: 60 } };

export async function PostsSection() {
  const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY, {}, options);

  return (
    <section
      id="posts"
      className="min-h-screen w-full flex flex-col justify-center items-center p-8 bg-black text-white"
    >
      <div className="container mx-auto max-w-6xl">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold">
            <AnimatedText text="Posts" />
          </h2>
          <Link href="/posts" className="text-lg hover:underline text-red-500">
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <ContentCard
              key={post._id}
              title={post.title}
              publishedAt={post.publishedAt}
              slug={post.slug.current}
              image={post.image}
              basePath="posts"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
