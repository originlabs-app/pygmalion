import { test, expect } from '@playwright/test';

test('Génération des 4 documents (PDF) — liens valides', async ({ request }) => {
  const token = process.env.TEST_TOKEN || '';
  const headers = token ? { Authorization: `Bearer ${token}` } : {} as any;

  const types = ['attendance', 'attestation', 'certificate', 'invoice'];
  for (const type of types) {
    const res = await request.post(`${process.env.API_URL || 'http://localhost:8000'}/documents/generate`, {
      data: { type, enrollmentId: 'demo-enrollment-id' },
      headers,
    });
    expect(res.ok()).toBeTruthy();
    const body = await res.json();
    expect(body.url).toBeTruthy();

    const file = await request.get(body.url);
    expect(file.ok()).toBeTruthy();
    const size = Number(file.headers()['content-length'] || '1');
    expect(size).toBeGreaterThan(0);
  }
});

