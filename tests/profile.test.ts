import { describe, it, expect } from 'vitest';
import { loadProfile, parseProfile } from '../src/lib/profile';

const SAMPLE = `# PROFILE

## Name
Somchai

## Headline
Dev@Somewhere

## Tagline
One line value

## Bio
First paragraph.

Second paragraph
continues here.

Third paragraph.

## Audience
Peers

## Interests
- A
- B
- C

## Contact
- email: demo@example.com
- github: https://github.com/example

## Knowledge
Intro line.

### A
A is a thing.
It has two lines.
อ่านต่อ: https://a.example/docs
บทความประกอบ:
- [A basics](https://a.example/basics) — start here
- [A deep dive](https://a.example/deep) — go further

### B
B summary.

## Brainstorm
- ignored
`;

describe('parseProfile (D12)', () => {
  const p = parseProfile(SAMPLE);

  it('reads every paragraph of Bio', () => {
    expect(p.bio.split(/\n{2,}/)).toHaveLength(3);
    expect(p.bio).toContain('Third paragraph.');
  });

  it('reads every Interests bullet', () => {
    expect(p.interests).toEqual(['A', 'B', 'C']);
  });

  it('reads Tagline and the GitHub contact link', () => {
    expect(p.tagline).toBe('One line value');
    expect(p.github).toBe('https://github.com/example');
  });

  it('parses Knowledge entries with summary, read-more and articles', () => {
    expect(p.knowledge.map((k) => k.title)).toEqual(['A', 'B']);
    const [a, b] = p.knowledge;
    expect(a.summary).toBe('A is a thing. It has two lines.');
    expect(a.readMore).toBe('https://a.example/docs');
    expect(a.articles).toEqual([
      { title: 'A basics', url: 'https://a.example/basics', note: 'start here' },
      { title: 'A deep dive', url: 'https://a.example/deep', note: 'go further' },
    ]);
    expect(b).toMatchObject({ summary: 'B summary.', readMore: '', articles: [] });
  });

  it('keeps legacy fields intact', () => {
    expect(p).toMatchObject({ name: 'Somchai', headline: 'Dev@Somewhere', audience: 'Peers' });
  });

  it('falls back when sections are missing', () => {
    const empty = parseProfile('# PROFILE\n');
    expect(empty.name).toBeTruthy();
    expect(empty.interests.length).toBeGreaterThan(0);
    expect(empty).toMatchObject({ tagline: '', github: '', knowledge: [] });
  });
});

describe('loadProfile on docs/PROFILE.md', () => {
  it('returns the full Bio and all six interests', () => {
    const p = loadProfile();
    expect(p.bio.split(/\n{2,}/).length).toBeGreaterThanOrEqual(3);
    expect(p.interests).toHaveLength(6);
    expect(p.knowledge).toHaveLength(6);
    expect(p.tagline).toBeTruthy();
    expect(p.github).toMatch(/^https:\/\/github\.com\//);
  });
});
