import Link from "next/link";
import Image from "next/image";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client } from "@/sanity/client";

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

interface ContentCardProps {
  title: string;
  publishedAt: string;
  slug: string;
  image?: SanityImageSource;
  basePath: "posts" | "workshops";
}

export function ContentCard({
  title,
  publishedAt,
  slug,
  image,
  basePath,
}: ContentCardProps) {
  const imageUrl = image ? urlFor(image)?.width(400).height(225).url() : null;

  return (
    <Link
      href={`/${basePath}/${slug}`}
      className="block hover:shadow-lg transition-shadow rounded-lg overflow-hidden border border-gray-200"
    >
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={title}
          width={400}
          height={225}
          className="w-full aspect-video object-cover"
        />
      ) : (
        <div className="w-full aspect-video bg-gray-200 flex items-center justify-center">
          <span className="text-gray-400">No image</span>
        </div>
      )}
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <p className="text-gray-600 text-sm">
          {new Date(publishedAt).toLocaleDateString("es-ES", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>
    </Link>
  );
}
