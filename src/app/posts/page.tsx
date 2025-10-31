import Link from "next/link";
import { type SanityDocument } from "next-sanity";

import { client } from "@/sanity/client";
import { ContentCard } from "@/components/cards/contentCard";

const POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{_id, title, slug, publishedAt, image}`;

const options = { next: { revalidate: 30 } };

export default async function PostsPage() {
  const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY, {}, options);

  return (
    <main className="container mx-auto min-h-screen max-w-3xl p-8">
      <Link href="/" className="hover:underline mb-8 inline-block">
        ← Back to home
      </Link>
      <h1 className="text-4xl font-bold mb-8">Posts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
    </main>
  );
}
