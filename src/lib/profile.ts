/**
 * Profile helpers. Learners fill docs/PROFILE.md in Lab 01.
 * Owner: Claude · frontend (D14). `Profile` is a shared contract — add fields freely,
 * changing or removing existing ones needs a handoff note.
 */
import { readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

export type KnowledgeArticle = { title: string; url: string; note: string };

export type KnowledgeEntry = {
  title: string;
  summary: string;
  readMore: string;
  articles: KnowledgeArticle[];
};

export type Profile = {
  name: string;
  headline: string;
  bio: string;
  audience: string;
  interests: string[];
  tagline: string;
  github: string;
  knowledge: KnowledgeEntry[];
};

const FALLBACK: Profile = {
  name: 'Your Name',
  headline: 'Personal branding site (course stub)',
  bio: 'Replace this stub after Lab 01 Interview. Write docs/PROFILE.md then wire pages in Lab 04.',
  audience: 'Hiring managers / peers / community',
  interests: ['AI agents', 'Web', 'Teaching'],
  tagline: '',
  github: '',
  knowledge: [],
};

function profilePath(): string {
  const candidates = [
    join(process.cwd(), 'docs', 'PROFILE.md'),
    join(dirname(fileURLToPath(import.meta.url)), '..', '..', 'docs', 'PROFILE.md'),
  ];
  return candidates.find((p) => existsSync(p)) || candidates[0];
}

const bullets = (text: string) =>
  text
    .split('\n')
    .map((l) => l.replace(/^[-*]\s*/, '').trim())
    .filter(Boolean);

function parseKnowledge(section: string): KnowledgeEntry[] {
  return section
    .split(/^###\s+/m)
    .slice(1)
    .map((chunk) => {
      const [title, ...lines] = chunk.split('\n');
      const summary: string[] = [];
      const articles: KnowledgeArticle[] = [];
      let readMore = '';
      for (const line of lines.map((l) => l.trim()).filter(Boolean)) {
        const more = line.match(/^อ่านต่อ:\s*(\S+)/);
        const article = line.match(/^[-*]\s*\[([^\]]+)\]\(([^)]+)\)\s*(?:—\s*(.*))?$/);
        if (more) readMore = more[1];
        else if (article) articles.push({ title: article[1], url: article[2], note: (article[3] || '').trim() });
        else if (!line.startsWith('บทความประกอบ')) summary.push(line);
      }
      // หน้าเว็บแสดงเป็นข้อความธรรมดา จึงตัด backtick ของ inline code ใน markdown ออก
      return { title: title.trim(), summary: summary.join(' ').replace(/`/g, ''), readMore, articles };
    });
}

export function parseProfile(markdown: string): Profile {
  const raw = markdown.replace(/\r\n/g, '\n');
  const get = (label: string) => {
    // Section body runs until the next `## ` heading or the end of the file (not the end of a line).
    const m = raw.match(new RegExp(`^##\\s*${label}\\s*\\n([\\s\\S]*?)(?=^##\\s|(?![\\s\\S]))`, 'm'));
    return (m?.[1] || '').trim();
  };
  const interests = bullets(get('Interests'));
  const github = get('Contact').match(/^[-*]\s*github:\s*(\S+)/m)?.[1] || '';
  return {
    name: get('Name') || FALLBACK.name,
    headline: get('Headline') || FALLBACK.headline,
    bio: get('Bio') || FALLBACK.bio,
    audience: get('Audience') || FALLBACK.audience,
    interests: interests.length ? interests : FALLBACK.interests,
    tagline: get('Tagline'),
    github,
    knowledge: parseKnowledge(get('Knowledge')),
  };
}

export function loadProfile(): Profile {
  const path = profilePath();
  if (!existsSync(path)) return FALLBACK;
  return parseProfile(readFileSync(path, 'utf8'));
}
