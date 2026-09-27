import { useState } from 'react';

type Entity = { id: string; entity_type: string; name: string; properties: Record<string, unknown> };
type Snapshot = { schema_version: string; entities: Entity[]; relationships: { rel_type: string; source: string; target: string }[] };
const states = ['before', 'after', 'restored'] as const;
const labels = ['Before edit', 'After −6 dB edit', 'After undo'];
const base = '/demos/reaper-canonical';

export default function SessionSnapshotDemo() {
  const [snapshots, setSnapshots] = useState<Snapshot[] | null>(null);
  const [selected, setSelected] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  async function launch() {
    setLoading(true); setError('');
    try {
      const data = await Promise.all(states.map(async state => {
        const response = await fetch(`${base}/${state}.json`);
        if (!response.ok) throw new Error('Snapshot unavailable');
        const snapshot = await response.json() as Snapshot;
        if (snapshot.schema_version !== '0.2.0' || !Array.isArray(snapshot.entities) || !Array.isArray(snapshot.relationships)) throw new Error('Incompatible snapshot');
        return snapshot;
      }));
      setSnapshots(data);
    } catch { setError('The snapshots could not be loaded. Try again or use the downloads below.'); }
    finally { setLoading(false); }
  }
  const snapshot = snapshots?.[selected];
  return <section className="my-12 max-w-3xl rounded-card border border-border bg-card p-6 sm:p-8" aria-labelledby="reaper-demo-title">
    <p className="eyebrow mb-3">Verified integration · synthetic session</p>
    <h2 id="reaper-demo-title" className="type-h2 mb-4">From live session to reviewable evidence</h2>
    <p className="leading-7 text-muted-foreground">A read-only MCP export loads in Session State Analyzer. This replay uses snapshots captured from REAPER 7.80 on macOS. No local software is needed to explore them.</p>
    <p className="mt-4 leading-7"><strong>Reviewed proposal:</strong> lower track 2, “Pulse,” from 0 to −6 dB. Its native identifier distinguishes it from the other track named Pulse. The edit and undo use separate REAPER tools.</p>
    {!snapshots && <button className="mt-6 rounded-md bg-primary px-5 py-3 font-medium text-primary-foreground" disabled={loading} onClick={() => void launch()}>{loading ? 'Loading snapshots…' : 'Explore captured snapshots'}</button>}
    {error && <p role="alert" className="mt-4">{error}</p>}
    {snapshot && <div className="mt-6">
      <div className="flex flex-wrap gap-2" role="group" aria-label="Captured session state">{labels.map((label, index) => <button key={label} aria-pressed={selected === index} onClick={() => setSelected(index)} className={`rounded-md border px-4 py-3 ${selected === index ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-background text-foreground'}`}>{label}</button>)}</div>
      <div className="mt-5 overflow-x-auto"><table className="w-full text-left text-sm"><caption className="mb-3 text-left font-medium" aria-live="polite">{labels[selected]} — {snapshot.entities.length} entities, {snapshot.relationships.length} relationships</caption><thead><tr className="border-b border-border"><th scope="col" className="py-3 pr-4">Track</th><th scope="col" className="py-3 pr-4">Level</th><th scope="col" className="py-3">Effects</th></tr></thead><tbody>{snapshot.entities.filter(e => e.entity_type === 'TRACK').map(track => {
        const channelId = snapshot.relationships.find(r => r.rel_type === 'TRACK_USES_CHANNEL' && r.source === track.id)?.target;
        const channel = snapshot.entities.find(e => e.id === channelId);
        const gain = channel?.properties.volume;
        const fx = snapshot.relationships.filter(r => r.rel_type === 'CHANNEL_PROCESSED_BY' && r.source === channelId).length;
        return <tr key={track.id} className="border-b border-border"><th scope="row" className="py-3 pr-4 font-medium">{String(track.properties.index)} · {track.name}</th><td className="py-3 pr-4">{typeof gain === 'number' && gain > 0 ? `${(20 * Math.log10(gain)).toFixed(1)} dB` : 'Unavailable'}</td><td className="py-3">{fx}</td></tr>;
      })}</tbody></table></div>
      <p className="mt-4 leading-7" aria-live="polite">{selected === 0 ? 'Initial state: all three tracks at unity gain. Export adds no undo entry.' : selected === 1 ? 'The comparison finds the target channel’s gain change and the project’s modified flag. Routing, effects and native identities remain unchanged.' : 'Undo restores the track, routing and FX data. REAPER retains its modified flag; capture times and snapshot IDs also differ.'}</p>
    </div>}
    <figure className="mt-8"><video controls preload="none" poster={`${base}/analyzer.png`} className="w-full rounded-md" aria-label="Captured REAPER and Analyzer walkthrough"><source src={`${base}/walkthrough.mp4`} type="video/mp4"/><track kind="captions" src={`${base}/walkthrough.vtt`} srcLang="en" label="English descriptions" default/></video><figcaption className="mt-3 text-sm leading-6 text-muted-foreground">24-second step capture from the live validation: inspect → export → visualize → reviewed edit → compare → undo. Timing condensed; no audio.</figcaption></figure>
    <p className="mt-5 text-sm leading-6 text-muted-foreground">This is a structural demonstration. Automation, media, modulation and FX parameters remain explicitly unavailable. Native plugin identifiers are redacted from these public examples. Fixture tests and real-host checks are separate evidence.</p>
    <div className="mt-5 flex flex-wrap gap-4">{states.map((state, index) => <a className="text-sm underline underline-offset-4" key={state} href={`${base}/${state}.json`} download>{labels[index]} JSON</a>)}<a className="text-sm underline underline-offset-4" href={`${base}/analyzer-comparison.json`} download>Analyzer comparison</a></div>
  </section>;
}
