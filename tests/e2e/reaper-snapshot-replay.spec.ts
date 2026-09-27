import { test, expect } from '@playwright/test';

test('captured snapshots load on demand and show the edit and undo', async ({ page }) => {
  const snapshotRequests: string[] = [];
  page.on('request', request => { if (/reaper-canonical\/(before|after|restored)\.json/.test(request.url())) snapshotRequests.push(request.url()); });
  await page.goto('/projects/audio-agents');
  expect(snapshotRequests).toHaveLength(0);
  const launch = page.getByRole('button', { name: 'Explore captured snapshots' });
  await launch.focus();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('table')).toBeVisible();
  expect(snapshotRequests).toHaveLength(3);
  const target = page.getByRole('row').filter({ has: page.getByRole('rowheader', { name: '2 · Pulse', exact: true }) });
  await expect(target).toContainText('0.0 dB');
  await page.getByRole('button', { name: 'After −6 dB edit', exact: true }).click();
  await expect(target).toContainText('-6.0 dB');
  await expect(page.getByRole('row').filter({ has: page.getByRole('rowheader', { name: '3 · Pulse', exact: true }) })).toContainText('0.0 dB');
  await page.getByRole('button', { name: 'After undo', exact: true }).click();
  await expect(target).toContainText('0.0 dB');
  await expect(page.getByText('Undo restores the track, routing and FX data.', { exact: false })).toBeVisible();
});

test('public exports are valid synthetic bundles and have no filesystem paths', async ({ request }) => {
  for (const state of ['before', 'after', 'restored']) {
    const response = await request.get(`/demos/reaper-canonical/${state}.json`);
    expect(response.ok()).toBeTruthy();
    const snapshot = await response.json();
    expect(snapshot.schema_version).toBe('0.2.0');
    expect(snapshot.entities.filter((e: { entity_type: string }) => e.entity_type === 'TRACK')).toHaveLength(3);
    expect(JSON.stringify(snapshot)).not.toMatch(/\/Users\/|\/Volumes\/|\/Applications\//);
  }
});
