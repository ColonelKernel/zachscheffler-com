import { Link } from "react-router-dom";
import { PROJECTS } from "@/content/projects";
import { PROJECT_CONNECTIONS } from "@/content/projectConnections";
export default function ProjectRelationships({ id }: { id?: string }) {
  const connections = PROJECT_CONNECTIONS.filter(c => !id || c.from === id || c.to === id);
  return <section className="mt-12 space-y-5" aria-label="Project connections">
    <h2 className="type-h2">How the projects connect</h2>
    <p className="text-muted-foreground">Shared ideas and proposed bridges are labeled separately from working integrations.</p>
    <div className="grid gap-4 md:grid-cols-2">{connections.map(c => <article key={c.from+c.to} className="rounded-card border border-border p-5">
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{c.status}</p>
      <h3 className="mt-2 font-semibold">{[c.from,c.to].map((projectId, i) => { const p=PROJECTS.find(p=>p.id===projectId)!; return <span key={p.id}>{i > 0 && ' ↔ '}<Link className="underline underline-offset-4" to={p.links[0].url}>{p.title}</Link></span>; })}</h3>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">{c.text}</p>
    </article>)}</div>
  </section>;
}
