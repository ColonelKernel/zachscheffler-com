import { describe, expect, it } from "vitest";

import { ROUTE_META } from "@/app/routeMeta";
import { PROJECT_SECTIONS, PROJECTS } from "./projects";

/**
 * The projects model backs the /projects page. Contract: every card is
 * complete, every link is either https or a real in-app route, and repos we
 * deliberately keep off the page (empty scaffolds) never sneak back on.
 */

const realPaths = new Set<string>(
  Object.values(ROUTE_META)
    .map((route): string => route.path)
    .filter((path) => path !== "*"),
);

describe("PROJECTS", () => {
  it("has unique ids and complete cards", () => {
    const ids = PROJECTS.map((project) => project.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const project of PROJECTS) {
      expect(project.title.length).toBeGreaterThan(2);
      expect(project.tagline.length).toBeGreaterThan(20);
      expect(project.stack.length).toBeGreaterThan(0);
      expect(project.links.length).toBeGreaterThan(0);
    }
  });

  it("every link is https or a known in-app route", () => {
    for (const project of PROJECTS) {
      for (const link of project.links) {
        if (link.url.startsWith("/")) {
          expect(realPaths.has(link.url), `${link.url} is not a real route`).toBe(true);
        } else {
          expect(new URL(link.url).protocol).toBe("https:");
        }
      }
    }
  });

  it("every section kind has at least one project", () => {
    for (const section of PROJECT_SECTIONS) {
      expect(
        PROJECTS.some((project) => project.kind === section.kind),
        `section ${section.kind} is empty`,
      ).toBe(true);
    }
  });

  it("keeps scaffold repos off the page", () => {
    // GrooveSurgeon is a 2-commit vendored-SDK scaffold with no real source
    // (audit finding, 2026-07-21). It stays off until real source ships.
    const urls = PROJECTS.flatMap((project) => project.links.map((link) => link.url));
    expect(urls.some((url) => url.includes("GrooveSurgeon"))).toBe(false);
  });
});


describe("curation and visibility", () => {
  it("keeps private repositories out of public source links", () => {
    for (const p of PROJECTS) {
      if (p.sourceVisibility === "private") expect(p.links.every(l=>!l.url.includes("github.com"))).toBe(true);
      expect(p.role.length).toBeGreaterThan(20);
      expect(p.maturity.length).toBeGreaterThan(5);
      for (const related of p.relatedProjectIds) expect(PROJECTS.some(q=>q.id===related && q.id!==p.id)).toBe(true);
    }
    const urls=PROJECTS.flatMap(p=>p.links.map(l=>l.url)).join(" ");
    expect(urls).not.toMatch(/github.com\/ColonelKernel\/(?:TonnetzMetro|GroovePrediction|reaper-session-mcp|Reaeffect-YSFX_to_VST_AU)/);
  });
  it("does not publish paths from the private maintenance inventory", () => {
    expect(JSON.stringify(PROJECTS)).not.toMatch(/\/Users\/|\/Volumes\/|maintenance-control|\.ai\/assistant-sync/);
  });
});
