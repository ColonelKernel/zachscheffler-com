export interface ProjectDetail { problem: string; architecture: string; demonstration: string; evidence: string; limitations: string; image?: string; imageAlt?: string }
export const PROJECT_DETAILS: Record<string, ProjectDetail> = {
  "audio-agents": {
    "problem": "Audio applications expose large, uneven control surfaces. A useful assistant needs to know what the host actually exposes and explain what an edit will do.",
    "architecture": "VCV Rack uses a C++ host bridge and a TypeScript MCP server with structured patch operations. REAPER uses a Python MCP server and a Lua bridge. Cardinal works with patch files and standalone OSC; GuitarRig uses MIDI Learn without parameter readback.",
    "demonstration": "The VCV Rack source includes a captured patch-building walkthrough. REAPER requires a local host and bridge; its source remains private. The Session State bridge is proposed work until its live checks are recorded.",
    "evidence": "VCV Rack validates proposed patch changes and applies transactions with recovery. REAPER tools separate inspection from mutation and support batches grouped into one undo point.",
    "limitations": "These integrations require installed host applications. MIDI commands sent to GuitarRig cannot establish its current state. A valid patch is not evidence that it sounds good.",
    "image": "/projects/media/rack-demo.png",
    "imageAlt": "Captured VCV Rack MCP patch-building transcript from the public repository."
  },
  "tonnetzmetro": {
    "problem": "Folders make it easy to retrieve a known sample and difficult to discover a musically related idea in an old project.",
    "architecture": "Python analyzes audio, reads supported project evidence, and stores results in a local database. A map places material against 24 major/minor triads. CLI, local web, desktop, and plugin surfaces have different readiness levels.",
    "demonstration": "The captured map uses synthetic fixtures to show navigation without exposing a personal sample library. It demonstrates the interface and pipeline, not recognition accuracy on real recordings.",
    "evidence": "Harmonic analysis, project ingestion, and map generation are separated, allowing deterministic fixture checks and explicit comparison between available analysis engines.",
    "limitations": "Key estimates are uncertain, particularly for ambiguous or percussive audio. Optional analysis engines and plugin builds need their own installation and validation. The private source and personal audio archives are not distributed. DIGLINE and Gold Digger explore related discovery problems; shared indexing is only a proposal until identifiers and metadata are compared.",
    "image": "/projects/media/tonnetzmetro-demo.png",
    "imageAlt": "TonnetzMetro harmonic map generated from a synthetic sample fixture."
  },
  "groove-prediction": {
    "problem": "A performance instrument needs controllable variation that preserves a groove, including the timing and dynamics between grid positions.",
    "architecture": "A deterministic TypeScript core creates integer-tick plans from counted statistical models. Thin browser and Max for Live surfaces schedule those plans and expose performance controls.",
    "demonstration": "The browser demonstration generates a groove with built-in synthesized percussion. No private recordings are included. Max for Live and physical MIDI timing require separate host checks.",
    "evidence": "Versioned model tables, seeded generation, velocity, and microtiming are represented explicitly. The source credits Google Magenta’s Expanded Groove MIDI Dataset rather than claiming authorship of its performances.",
    "limitations": "A statistical continuation does not establish musical preference. Dataset coverage limits style generalization. A neural upgrade must be evaluated against the statistical baseline before it can be claimed as an improvement.",
    "image": "/projects/media/groove-demo.png",
    "imageAlt": "GroovePrediction browser performance interface during a local demonstration."
  },
  "ableton-tools": {
    "problem": "Finishing a Live Set involves repeated housekeeping: naming tracks, understanding scenes, checking delivery risks, and preparing a performance.",
    "architecture": "Separate TypeScript extensions share a workflow pattern: scan the host, produce an explainable plan, preview it, and apply only the changes that the tool supports.",
    "demonstration": "Track Doctor proposes track names; Arrangement Architect produces a song blueprint; Live Console previews commands; Deliverables Assistant produces a handoff manifest; Performance Rig produces a pre-flight report.",
    "evidence": "These remain separate tools with individual source histories. Drum Rack Cartographer adds pitch-role analysis and reviewed remapping, making it a potential partner for GroovePrediction.",
    "limitations": "The tools target Ableton’s Extensions SDK beta. Host behavior and packaging must be verified against the installed Live build; a unit-test result alone is not an in-host compatibility claim."
  },
  "jsfx-forge": {
    "problem": "A useful effect written for one host is difficult to use in another without adapting its runtime, packaging, and lifecycle.",
    "architecture": "Individual AU, VST3, and CLAP wrappers bundle an effect script with the ysfx runtime. The engineering work includes plugin lifecycle behavior, packaging, and host-specific validation.",
    "demonstration": "This is a description of private engineering builds. There is no public download or installer offered on this page.",
    "evidence": "The implementation builds on ysfx, JUCE, and effect authors’ scripts. My contribution is the integration and packaging work, not authorship of all bundled effects.",
    "limitations": "Packaged effects are not cleared for redistribution. Intel builds, signing, notarization, and host compatibility are separate release concerns. Source visibility stays private."
  },
  "this-site": {
    "problem": "A portfolio that also contains audio tools needs to stay quick to load, navigable without audio, and clear about what each project actually demonstrates.",
    "architecture": "React and TypeScript provide a lazy-loaded route shell. A single transport coordinates the music tools. Typed content drives project cards; route metadata drives the router, static document heads, and sitemap checks.",
    "demonstration": "Open the music tools, change the shared key or tempo, and move between workspaces. Audio begins only after an explicit interaction.",
    "evidence": "The repository runs typechecking, zero-warning lint, unit and browser tests, a 150 KB gzip homepage graph budget, and Lighthouse accessibility checks. Public data checks prevent local filesystem paths from leaking into published datasets.",
    "limitations": "Private project backends are not hosted by this portfolio. Screenshots and fixture demonstrations are labeled separately from live applications. Production contact and external services have their own availability constraints."
  }
};
