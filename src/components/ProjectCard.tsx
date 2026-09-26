import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/content/projects";
import { cardClasses } from "@/components/ui/card";
export default function ProjectCard({ project }: { project: Project }) {
  return <article className={cardClasses({}, "flex flex-col gap-4")}>
    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{project.maturity}</p>
    <div><h3 className="text-xl font-semibold">{project.title}</h3><p className="mt-3 leading-7 text-muted-foreground">{project.tagline}</p></div>
    <p className="text-sm leading-6 text-muted-foreground"><span className="font-medium text-foreground">My contribution: </span>{project.role}</p>
    <div className="flex flex-wrap gap-2">{project.stack.map(tech => <span key={tech} className="rounded-full border border-border px-2.5 py-1 text-xs text-muted-foreground">{tech}</span>)}</div>
    {project.sourceVisibility !== "public" && <p className="text-xs text-muted-foreground">{project.sourceVisibility === "private" ? "Private source · curated demonstration" : "Selected source public · private components retained"}</p>}
    <div className="mt-auto flex flex-wrap gap-4">{project.links.map(link => link.url.startsWith("/") ? <Link key={link.url} to={link.url} className="inline-flex items-center gap-1 text-sm font-medium hover:text-primary">{link.label}<ArrowUpRight size={14}/></Link> : <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm font-medium hover:text-primary">{link.label}<ArrowUpRight size={14}/></a>)}</div>
  </article>;
}
