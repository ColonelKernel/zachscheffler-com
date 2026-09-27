import RouteHead from "@/components/seo/RouteHead";
import { ROUTE_META } from "@/app/routeMeta";
import { PROJECTS_JSONLD } from "@/app/routeStructuredData";
import { PROJECTS } from "@/content/projects";
import ProjectCard from "@/components/ProjectCard";
import ProjectRelationships from "@/components/ProjectRelationships";
export default function ProjectsPage() {
  return <div className="min-h-screen"><RouteHead {...{title: ROUTE_META.projects.title, description: ROUTE_META.projects.description, canonicalPath: ROUTE_META.projects.path, jsonLd: PROJECTS_JSONLD}}/>
    <main className="pt-16"><section className="section-padding"><div className="container mx-auto">
      <header className="mb-12 max-w-3xl"><p className="eyebrow mb-3">Selected projects</p><h1 className="type-h1 mb-6">Software I Build</h1><p className="text-lg leading-8 text-muted-foreground">Data science, creative systems, and the engineering between them. These project families connect civic data, musical interaction, and tools that help people understand and control complex software.</p><p className="mt-4 leading-7 text-muted-foreground">Each case study identifies my contribution, what can be demonstrated, and what remains uncertain. Private projects are shown through curated examples; their source and personal data stay private.</p></header>
      <h2 className="type-h2 mb-6">Featured project families</h2><div className="grid gap-6 md:grid-cols-2">{PROJECTS.filter(p=>p.featured).map(project=><ProjectCard key={project.id} project={project}/>)}</div>
      <ProjectRelationships/>
      <section className="mt-16"><h2 className="type-h2 mb-6">Supporting work</h2><div className="grid gap-5 md:grid-cols-2">{PROJECTS.filter(p=>!p.featured).map(project=><ProjectCard key={project.id} project={project}/>)}</div></section>
    </div></section></main></div>;
}
