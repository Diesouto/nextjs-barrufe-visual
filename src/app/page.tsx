import { TitleExperiment } from "@/components/titles/titleExperiment";
import { PostsSection } from "@/components/sections/PostsSection";
import { WorkshopsSection } from "@/components/sections/WorkshopsSection";
import { Navigation } from "@/components/navigation/Navigation";
import { ScrollIndicator } from "@/components/ui/ScrollIndicator";
import { Footer } from "@/components/navigation/Footer";

export default function IndexPage() {
  return (
    <>
      <Navigation />
      <main className="w-full">
        {/* Hero Section with Animated Title */}
        <section className="w-full h-screen bg-white text-black relative overflow-hidden flex items-center justify-center">
          <TitleExperiment title="Barrufe Visual" />
          <ScrollIndicator />
        </section>

        {/* Workshops Section */}
        <WorkshopsSection />

        {/* Posts Section */}
        <PostsSection />
      </main>
      <Footer />
    </>
  );
}
