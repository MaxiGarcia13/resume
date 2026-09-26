import type { Skill, SkillCategory, SkillId } from '@/types/skills';
import { capitalize } from '@maxigarcia/js-utils';
import { SKILLS_REGISTRY } from './registry';

const SKILL_NAME_MAP: Partial<Record<SkillId, string>> = {
  'aws': 'AWS',
  'cloudflare-r2': 'Cloudflare R2',
  'html': 'HTML',
  'css': 'CSS',
  'react-pdf': 'React PDF Renderer',
  'javascript': 'JavaScript',
  'typescript': 'TypeScript',
  'graphql': 'GraphQL',
  'next': 'Next.js',
  'react-native': 'React Native',
  'nodejs': 'Node.js',
  'threejs': 'Three.js',
  'pwa': 'PWA',
  'mcp': 'MCP',
  'ci': 'CI/CD',
};

export function getSkill(id: SkillId): Skill {
  const { category } = SKILLS_REGISTRY[id];

  const name = SKILL_NAME_MAP[id] ?? capitalize(id.replace(/-/g, ' '));

  return {
    id,
    name,
    category,
  };
}

export function getSkills(ids: SkillId[]): Skill[] {
  const uniqueIds = [...new Set(ids)];
  return uniqueIds.map(getSkill);
}

export function uniqueSkills(...lists: Array<Skill[] | undefined>): Skill[] {
  const seen = new Map<SkillId, Skill>();

  for (const list of lists) {
    for (const skill of list ?? []) {
      if (!seen.has(skill.id)) {
        seen.set(skill.id, skill);
      }
    }
  }

  return [...seen.values()];
}

export function formatSkills(skills?: Skill[]): string {
  if (!skills?.length) {
    return 'Not specified in the CV data';
  }

  return skills.map((skill) => skill.name).join(', ');
}

export function groupSkillsByCategory(skills: Skill[]): Record<SkillCategory, Skill[]> {
  return skills.reduce((acc, skill) => {
    const category = skill.category;

    if (!acc[category]) {
      acc[category] = [];
    }

    acc[category].push(skill);
    return acc;
  }, {} as Record<SkillCategory, Skill[]>);
}
