import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";

import SystemsPreview from "./SystemsPreview";
import { FEATURED_PROJECTS } from "@/content/projects";
import { ROUTE_META } from "@/app/routeMeta";

/**
 * The merged Systems section, which replaced two consecutive card bands —
 * SystemsPreview and AnalyticsPreview — on the homepage.
 *
 * The invariant worth testing is not how it looks but that the merge cost
 * nothing: every destination the two old sections linked to still has a link
 * here. A merge that quietly drops a route is the failure mode.
 *
 * The "never claims real streaming data" guard is inherited from
 * AnalyticsPreview.test.tsx, which was deleted with its component. The claim
 * it guards against was live on the site once; the guard outlives the markup
 * that carried it.
 */

const renderSection = () =>
  render(
    <MemoryRouter>
      <SystemsPreview />
    </MemoryRouter>,
  );

/** Everything the two pre-merge sections linked to, plus the atlas. */
const REQUIRED_DESTINATIONS = [
  // The site is aimed at transportation roles; the largest artifact on it
  // cannot be absent from the homepage's work grid.
  "/projects/transit-atlas",
  ROUTE_META.musicAnalytics.path,
  ROUTE_META.rhythm.path,
  ROUTE_META.harmony.path,
  ROUTE_META.circle.path,
  ROUTE_META.tonnetz.path,
  ROUTE_META.projects.path,
];

describe("SystemsPreview", () => {
  it("keeps a link to every destination the two merged sections had", () => {
    const { container } = renderSection();
    const hrefs = [...container.querySelectorAll("a")].map((a) => a.getAttribute("href"));
    for (const path of REQUIRED_DESTINATIONS) {
      expect(hrefs, `missing link to ${path}`).toContain(path);
    }
  });

  it("features exactly the six curated families, each with a case-study link", () => {
    const { container } = renderSection();
    const headings = [...container.querySelectorAll("h3")].map(h=>h.textContent);
    expect(headings).toEqual(FEATURED_PROJECTS.map(p=>p.title));
    expect(headings).toHaveLength(6);
    for (const project of FEATURED_PROJECTS) {
      expect(container.querySelector(`a[href="${project.links[0].url}"]`)).not.toBeNull();
    }
  });

  it("keeps the demonstration catalog accessible as supporting work", () => {
    const { container } = renderSection();
    expect(container.querySelector('a[href="/music-analytics"]')?.textContent).toBe("Music Catalog Intelligence");
  });

  it("never claims real streaming data", () => {
    renderSection();
    expect(document.body.textContent).not.toMatch(/real streaming data/i);
  });
});
