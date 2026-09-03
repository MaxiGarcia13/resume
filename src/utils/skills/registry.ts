import type { Skill, SkillId } from '@/types/skills';

type IconType
  = 'languages'
    | 'frameworks'
    | 'tools'
    | 'databases'
    | 'testing'
    | 'cloud'
    | 'devops';

const ICONS_PATH = '../../components/shared/icons/skills';

const modules = import.meta.glob<{ default: Skill['icon'] }>(
  '../../components/shared/icons/skills/**/*.astro',
  { eager: true },
);

const getIconPath = (type: IconType, skill: SkillId) => `${ICONS_PATH}/${type}/${skill}.astro`;
const getIcon = (type: IconType, skill: SkillId) => modules[getIconPath(type, skill)];

export const SKILLS_ICONS_REGISTRY: Partial<Record<SkillId, Skill['icon']>> = {
  // Languages
  'typescript': getIcon('languages', 'typescript').default,
  'javascript': getIcon('languages', 'javascript').default,
  'graphql': getIcon('languages', 'graphql').default,

  // Frameworks
  'react': getIcon('frameworks', 'react').default,
  'vue': getIcon('frameworks', 'vue').default,
  'next': getIcon('frameworks', 'next').default,
  'astro': getIcon('frameworks', 'astro').default,
  'react-native': getIcon('frameworks', 'react-native').default,
  'nodejs': getIcon('frameworks', 'nodejs').default,
  'gatsby': getIcon('frameworks', 'gatsby').default,

  // cloud
  'aws': getIcon('cloud', 'aws').default,
  'cloudflare': getIcon('cloud', 'cloudflare').default,
  'cloudflare-workers': getIcon('cloud', 'cloudflare').default,
  'cloudflare-r2': getIcon('cloud', 'cloudflare').default,
  'cloudflare-pages': getIcon('cloud', 'cloudflare').default,
  'vercel': getIcon('cloud', 'vercel').default,

  // DevOps
  'docker': getIcon('devops', 'docker').default,

  // databases
  'mysql': getIcon('databases', 'mysql').default,
  'mongodb': getIcon('databases', 'mongodb').default,

  // testing
  'vitest': getIcon('testing', 'vitest').default,
  'cypress': getIcon('testing', 'cypress').default,

  // Tools
  'git': getIcon('tools', 'git').default,
  'redux': getIcon('tools', 'redux').default,
  'sass': getIcon('tools', 'sass').default,
  'scss': getIcon('tools', 'sass').default,
  'tailwind': getIcon('tools', 'tailwind').default,
  'threejs': getIcon('tools', 'threejs').default,
};
