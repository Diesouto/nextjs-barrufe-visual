import Link from "next/link";

export default function IndexPage() {
  return (
    <main className="container mx-auto min-h-screen max-w-3xl p-8">
      <h1 className="text-4xl font-bold mb-8">Welcome to My Site</h1>

      <div className="flex flex-col gap-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Content Categories</h2>
          <ul className="flex flex-col gap-4">
            <li>
              <Link
                href="/posts"
                className="text-xl hover:underline text-blue-600"
              >
                📝 Posts →
              </Link>
              <p className="text-gray-600">
                Read our latest articles and updates
              </p>
            </li>
            <li>
              <Link
                href="/workshops"
                className="text-xl hover:underline text-blue-600"
              >
                🎓 Workshops →
              </Link>
              <p className="text-gray-600">
                Explore our workshops and training sessions
              </p>
            </li>
          </ul>
        </section>
      </div>
    </main>
  );
}
