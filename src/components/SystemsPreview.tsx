import { Link } from "react-router-dom";
import { TOOLS } from "@/content/tools";
import { FEATURED_PROJECTS } from "@/content/projects";
import { cardClasses } from "@/components/ui/card";
export default function SystemsPreview() { return <section id="systems" className="section-padding-tight scroll-mt-24"><div className="container mx-auto">
  <div className="mb-8 flex flex-wrap items-end justify-between gap-5"><div className="max-w-2xl"><p className="eyebrow mb-3">Selected systems</p><h2 className="type-h1">From Evidence to Instruments</h2><p className="mt-4 leading-7 text-muted-foreground">Six connected bodies of work: open data, inspectable models, and creative tools. Explore the result and the reasoning behind it.</p></div><Link className="font-medium underline underline-offset-4" to="/projects">All projects</Link></div>
  <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{FEATURED_PROJECTS.map(p=><article key={p.id} className={cardClasses({}, "flex flex-col")}><p className="text-xs uppercase tracking-wide text-muted-foreground">{p.maturity}</p><h3 className="mt-3 text-xl font-semibold">{p.title}</h3><p className="mt-3 mb-6 text-sm leading-6 text-muted-foreground">{p.tagline}</p><Link to={p.links[0].url} className="mt-auto text-sm font-medium underline underline-offset-4">Read the case study<span className="sr-only">: {p.title}</span></Link></article>)}</div>
  <p className="mt-8 text-sm text-muted-foreground">Also explore <Link className="text-foreground underline underline-offset-4" to="/tools">the interactive music tools</Link> and <Link className="text-foreground underline underline-offset-4" to="/music-analytics">Music Catalog Intelligence</Link>.</p>
<nav aria-label="Interactive music tools" className="mt-5 flex flex-wrap gap-5">{TOOLS.map(tool=><Link key={tool.path} to={tool.path} className="text-sm underline underline-offset-4">{tool.title}</Link>)}</nav>
</div></section>; }
