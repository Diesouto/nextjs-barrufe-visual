import { TitleExperiment } from "@/components/titles/titleExperiment";
import Link from "next/link";

export default function ExperimentPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Link
        href="/"
        className="fixed top-8 left-8 z-50 text-white hover:underline"
      >
        ← Back to home
      </Link>

      <TitleExperiment title="Make things" />

      <div className="fixed bottom-8 left-0 right-0 text-center">
        <div className="animate-bounce text-4xl">↓</div>
        <p className="text-sm mt-2 opacity-70">Scroll to see the magic</p>
      </div>
    </main>
  );
}
