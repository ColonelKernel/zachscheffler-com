import { lazy, Suspense } from "react";

import Hero from "@/components/Hero";
import RouteHead from "@/components/seo/RouteHead";
import SystemsPreview from "@/components/SystemsPreview";
import { ROUTE_META } from "@/app/routeMeta";
import { HOME_JSONLD } from "@/app/routeStructuredData";

const Services = lazy(() => import("@/components/Services"));
const About = lazy(() => import("@/components/About"));
const Contact = lazy(() => import("@/components/Contact"));

interface SectionFallbackProps {
  id?: string;
  className?: string;
}

const SectionFallback = ({ id, className = "" }: SectionFallbackProps) => (
  <section id={id} className={`section-padding ${className}`}>
    <div className="container mx-auto">
      <div className="h-24 rounded-card border border-border/70 bg-card/45" />
    </div>
  </section>
);

const Index = () => {
  return (
    <div className="min-h-screen">
      <RouteHead
        title={ROUTE_META.home.title}
        description={ROUTE_META.home.description}
        canonicalPath={ROUTE_META.home.path}
        jsonLd={HOME_JSONLD}
      />
      <main>
        <Hero />

        <Suspense fallback={<SectionFallback id="evidence" className="bg-background" />}>
          <Services />
        </Suspense>

        {/* The selected systems connect the professional and creative work. */}
        <div className="border-y border-border/60 bg-secondary/50">
          <SystemsPreview />
        </div>

        <Suspense fallback={<SectionFallback id="about" className="bg-background" />}>
          <About />
        </Suspense>
        <Suspense fallback={<SectionFallback id="contact" className="bg-background" />}>
          <Contact />
        </Suspense>
      </main>
    </div>
  );
};

export default Index;
