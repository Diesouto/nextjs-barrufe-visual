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
  index?: number;
}

export function ContentCard({
  title,
  publishedAt,
  slug,
  image,
  basePath,
  index = 0,
}: ContentCardProps) {
  const imageUrl = image ? urlFor(image)?.width(400).height(225).url() : null;

  // Cycle through paper backgrounds (0-5)
  const paperBg = `paper_bg${index % 6}`;

  // Rotate images in different directions (-3 to 3 degrees)
  const rotations = [2, -2, 3, -1, 1, -3];
  const rotation = rotations[index % rotations.length];

  return (
    <Link
      href={`/${basePath}/${slug}`}
      className={`content-card block transition-all duration-300 overflow-hidden shadow-lg ${paperBg}`}
      style={
        {
          "--rotation": `${rotation}deg`,
        } as React.CSSProperties
      }
    >
      {imageUrl ? (
        <div className="p-4 pt-6">
          <Image
            src={imageUrl}
            alt={title}
            width={400}
            height={225}
            className="w-full aspect-video object-cover shadow-md"
          />
        </div>
      ) : (
        <div className="p-4 pt-6">
          <div
            className="w-full aspect-video bg-gray-200 flex items-center justify-center shadow-md"
            style={{ transform: `rotate(${rotation}deg)` }}
          >
            <span className="text-gray-400">No image</span>
          </div>
        </div>
      )}
      <div className="p-4 text-black">
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
