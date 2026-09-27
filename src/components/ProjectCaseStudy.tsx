import { Link } from "react-router-dom";
import RouteHead from "@/components/seo/RouteHead";
import { ROUTE_META, type RouteKey } from "@/app/routeMeta";
import { ROUTE_JSONLD } from "@/app/routeStructuredData";
import { PROJECTS } from "@/content/projects";
import { PROJECT_DETAILS } from "@/content/projectDetails";
import ProjectRelationships from "./ProjectRelationships";
export default function ProjectCaseStudy({ id }: { id: string }) {
  const project=PROJECTS.find(p=>p.id===id)!;
  const detail=PROJECT_DETAILS[id]; const route=project.route as RouteKey; const meta=ROUTE_META[route];
  return <div className="min-h-screen"><RouteHead title={meta.title} description={meta.description} canonicalPath={meta.path} jsonLd={ROUTE_JSONLD[route]}/>
  <main className="pt-16"><article className="section-padding"><div className="container mx-auto"><Link to="/projects" className="text-sm underline underline-offset-4">All projects</Link><header className="mt-8 mb-10 max-w-3xl"><p className="eyebrow mb-3">{project.maturity}</p><h1 className="type-h1 mb-5">{project.title}</h1><p className="text-lg leading-8 text-muted-foreground">{project.tagline}</p><p className="mt-5 leading-7"><strong>My contribution: </strong>{project.role}</p><p className="mt-3 text-sm text-muted-foreground">{project.sourceVisibility === 'private' ? 'Source remains private. This case study contains curated demonstration material.' : project.sourceVisibility === 'mixed' ? 'Selected source is public. Private components are described without exposing their repositories.' : 'Public source is linked below.'}</p></header>
  <div className="max-w-3xl space-y-10">{([['The problem',detail.problem],['Architecture',detail.architecture],['Demonstration',detail.demonstration],['Evidence',detail.evidence],['Limitations',detail.limitations]] as const).map(([title,text])=><section key={title}><h2 className="type-h2 mb-4">{title}</h2><p className="leading-8 text-muted-foreground">{text}</p>{title==='Demonstration' && detail.image && <figure className="mt-6"><a href={detail.image} target="_blank" rel="noopener noreferrer"><img className="h-auto w-full rounded-card border border-border" src={detail.image} alt={detail.imageAlt} loading="lazy" width="1400" height="900"/></a><figcaption className="mt-3 text-sm text-muted-foreground">{detail.imageAlt} Open image for full size.</figcaption></figure>}</section>)}</div>
  <div className="mt-8 flex flex-wrap gap-5">{project.links.filter(l=>!l.url.startsWith('/projects/')).map(l=><a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer" className="font-medium underline underline-offset-4">{l.label}</a>)}</div>
  <ProjectRelationships id={id}/>
  </div></article></main></div>;
}
