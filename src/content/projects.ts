/** Curated public portfolio metadata. Never import the local repository inventory here. */
export type ProjectKind = "data" | "web-app" | "in-site" | "audio-tooling" | "ableton-extension" | "research";
export interface ProjectLink { label: string; url: string }
export interface Project {
  id: string; kind: ProjectKind; title: string; tagline: string; stack: string[];
  featured: boolean; maturity: string; role: string;
  sourceVisibility: "public" | "private" | "mixed";
  relatedProjectIds: string[]; successorId: string | null; route?: string;
  links: ProjectLink[];
}
export const PROJECTS: Project[] = [
  {
    "id": "transit-atlas",
    "kind": "data",
    "title": "World Transit Atlas",
    "tagline": "201 rail systems assembled from open data, with real geographic alignments and an audit of what the ridership figures can actually support.",
    "stack": [
      "Python",
      "R",
      "GeoJSON"
    ],
    "route": "transitAtlas",
    "featured": true,
    "maturity": "Working web application",
    "role": "Data collection, geographic pipeline, visualization, and methodological audit.",
    "sourceVisibility": "public",
    "relatedProjectIds": [
      "tonnetzmetro",
      "music-analytics"
    ],
    "links": [
      {
        "label": "Case study",
        "url": "/projects/transit-atlas"
      },
      {
        "label": "Live atlas",
        "url": "https://colonelkernel.github.io/world-transit-atlas/"
      },
      {
        "label": "Source",
        "url": "https://github.com/ColonelKernel/world-transit-atlas"
      }
    ],
    "successorId": null
  },
  {
    "id": "session-state",
    "kind": "research",
    "title": "Session State Analyzer",
    "tagline": "One evidence-aware representation of session state across Ableton, REAPER, Logic, and Cubase. Missing information remains visible.",
    "stack": [
      "Python",
      "Pydantic",
      "Streamlit"
    ],
    "route": "sessionState",
    "featured": true,
    "maturity": "Research prototype",
    "role": "Canonical data model, DAW adapters, analytical workbench, and evaluation.",
    "sourceVisibility": "public",
    "relatedProjectIds": [
      "audio-agents",
      "tonnetzmetro"
    ],
    "links": [
      {
        "label": "Case study",
        "url": "/projects/session-state"
      },
      {
        "label": "Source",
        "url": "https://github.com/ColonelKernel/session-state-analyzer"
      }
    ],
    "successorId": null
  },
  {
    "id": "autoharm",
    "kind": "web-app",
    "title": "AutoHarm & Interactive Improvisation",
    "tagline": "A playable browser harmony instrument and its Max lineage: deterministic musical engines, on-device inference, and phrase-based interaction.",
    "stack": [
      "TypeScript",
      "Web MIDI",
      "ONNX",
      "Max/MSP"
    ],
    "route": "autoharm",
    "featured": true,
    "maturity": "Web instrument · related prototypes",
    "role": "Instrument design, browser port, model inference, and cross-surface integration; donor models and datasets credited.",
    "sourceVisibility": "mixed",
    "relatedProjectIds": [
      "groove-prediction",
      "ableton-tools"
    ],
    "links": [
      {
        "label": "Case study",
        "url": "/projects/autoharm"
      },
      {
        "label": "Launch app",
        "url": "https://autoharm.zachscheffler.com/"
      },
      {
        "label": "Web source",
        "url": "https://github.com/ColonelKernel/AutoHarm-Web"
      },
      {
        "label": "Max source",
        "url": "https://github.com/ColonelKernel/Autoharmonizer"
      }
    ],
    "successorId": null
  },
  {
    "id": "audio-agents",
    "kind": "audio-tooling",
    "title": "Agent-Assisted Audio Production",
    "tagline": "Useful agent control of audio software: inspect the system, validate a change, apply it deliberately, and keep a route back.",
    "stack": [
      "Python",
      "TypeScript",
      "C++",
      "MCP"
    ],
    "route": "audioAgents",
    "featured": true,
    "maturity": "Local integrations",
    "role": "Host bridges, capability-aware tools, validation, and reversible editing workflows.",
    "sourceVisibility": "mixed",
    "relatedProjectIds": [
      "session-state",
      "jsfx-forge",
      "ableton-tools"
    ],
    "links": [
      {
        "label": "Case study",
        "url": "/projects/audio-agents"
      },
      {
        "label": "VCV Rack source",
        "url": "https://github.com/ColonelKernel/vcv-rack-mcp"
      }
    ],
    "successorId": null
  },
  {
    "id": "tonnetzmetro",
    "kind": "audio-tooling",
    "title": "TonnetzMetro",
    "tagline": "A sample library and old DAW projects become a navigable metro map over harmonic space, with uncertainty in the analysis kept visible.",
    "stack": [
      "Python",
      "Audio analysis",
      "Tonnetz"
    ],
    "route": "tonnetzMetro",
    "featured": true,
    "maturity": "Prototype · synthetic demonstration",
    "role": "Audio-analysis pipeline, project ingestion, harmonic mapping, and interactive exploration.",
    "sourceVisibility": "private",
    "relatedProjectIds": [
      "transit-atlas",
      "session-state"
    ],
    "links": [
      {
        "label": "Case study",
        "url": "/projects/tonnetzmetro"
      }
    ],
    "successorId": null
  },
  {
    "id": "groove-prediction",
    "kind": "audio-tooling",
    "title": "GroovePrediction",
    "tagline": "A shared TypeScript engine generates drum grooves for the browser and Max for Live, preserving velocity, microtiming, and repeatable performance controls.",
    "stack": [
      "TypeScript",
      "Statistical models",
      "Web MIDI",
      "Max for Live"
    ],
    "route": "groovePrediction",
    "featured": true,
    "maturity": "Prototype · browser demonstration",
    "role": "Statistical modeling, deterministic engine, and web/Max performance interfaces, using the credited E-GMD corpus.",
    "sourceVisibility": "private",
    "relatedProjectIds": [
      "autoharm",
      "ableton-tools"
    ],
    "links": [
      {
        "label": "Case study",
        "url": "/projects/groove-prediction"
      }
    ],
    "successorId": null
  },
  {
    "id": "ableton-tools",
    "kind": "ableton-extension",
    "title": "Ableton Workflow Tools",
    "tagline": "Track cleanup, arrangement planning, delivery checks, and performance preparation, collected as one family of reviewable Live extensions.",
    "stack": [
      "TypeScript",
      "Ableton Extensions SDK"
    ],
    "route": "abletonTools",
    "featured": false,
    "maturity": "Extensions SDK beta prototypes",
    "role": "Workflow design, deterministic analysis, preview interfaces, and host integration.",
    "sourceVisibility": "mixed",
    "relatedProjectIds": [
      "audio-agents",
      "groove-prediction"
    ],
    "links": [
      {
        "label": "Case study",
        "url": "/projects/ableton-tools"
      }
    ],
    "successorId": null
  },
  {
    "id": "music-analytics",
    "kind": "in-site",
    "title": "Music Catalog Intelligence",
    "tagline": "Forecasting and risk exploration over a demonstration dataset derived from public Spotify popularity data, with the model limitations documented.",
    "stack": [
      "React",
      "Recharts",
      "Supabase"
    ],
    "route": "catalogIntelligence",
    "featured": false,
    "maturity": "Demonstration dashboard",
    "role": "Data transformation, forecasting, analytical interface, and methods documentation.",
    "sourceVisibility": "public",
    "relatedProjectIds": [
      "transit-atlas"
    ],
    "links": [
      {
        "label": "Open dashboard",
        "url": "/music-analytics"
      },
      {
        "label": "Case study",
        "url": "/projects/catalog-intelligence"
      }
    ],
    "successorId": null
  },
  {
    "id": "jsfx-forge",
    "kind": "audio-tooling",
    "title": "JSFX Forge",
    "tagline": "Engineering JSFX effects into individual AU, VST3, and CLAP plugins. A technical case study; packaged effects are not offered for redistribution.",
    "stack": [
      "C++",
      "JUCE",
      "ysfx",
      "Audio plugins"
    ],
    "route": "jsfxForge",
    "featured": false,
    "maturity": "Private builds · distribution restricted",
    "role": "Plugin packaging and host lifecycle integration, built on credited third-party runtimes and effect scripts.",
    "sourceVisibility": "private",
    "relatedProjectIds": [
      "audio-agents"
    ],
    "links": [
      {
        "label": "Engineering case study",
        "url": "/projects/jsfx-forge"
      }
    ],
    "successorId": null
  },
  {
    "id": "music-tools",
    "kind": "in-site",
    "title": "Interactive Music Tools",
    "tagline": "Rhythm, harmony, circle of fifths, and Tonnetz workspaces sharing one key, tempo, and Web Audio transport.",
    "stack": [
      "React",
      "Web Audio",
      "Music theory"
    ],
    "featured": false,
    "maturity": "Working browser tools",
    "role": "Shared musical state, audio scheduling, interfaces, and cited rhythm material.",
    "sourceVisibility": "public",
    "relatedProjectIds": [
      "autoharm",
      "groove-prediction"
    ],
    "links": [
      {
        "label": "Open tools",
        "url": "/tools"
      }
    ],
    "successorId": null
  },
  {
    "id": "this-site",
    "kind": "web-app",
    "title": "Portfolio Engineering",
    "tagline": "A lightweight React portfolio with shared audio state, route metadata, a bundle budget, and accessibility checks across all twenty routes.",
    "stack": [
      "React",
      "TypeScript",
      "Vitest",
      "Playwright"
    ],
    "route": "portfolioEngineering",
    "featured": false,
    "maturity": "Deployed website",
    "role": "Application architecture, content modeling, verification, and deployment.",
    "sourceVisibility": "public",
    "relatedProjectIds": [
      "music-tools"
    ],
    "links": [
      {
        "label": "Engineering note",
        "url": "/projects/portfolio-engineering"
      },
      {
        "label": "Source",
        "url": "https://github.com/ColonelKernel/zachscheffler-com/tree/portfolio/rebuild"
      }
    ],
    "successorId": null
  }
];
export const FEATURED_PROJECTS = PROJECTS.filter((project) => project.featured);
export const PROJECT_SECTIONS: Array<{ kind: ProjectKind; title: string }> = [
  {kind: "data", title: "Data & Geospatial"}, {kind: "research", title: "Research"},
  {kind: "web-app", title: "Web Applications"}, {kind: "audio-tooling", title: "Audio Systems"},
  {kind: "ableton-extension", title: "Ableton Tools"}, {kind: "in-site", title: "Interactive Tools"},
];
