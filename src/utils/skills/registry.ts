import type { Skill, SkillCategory, SkillId } from '@/types/skills';

const ICONS_PATH = '../../components/shared/icons/skills';

const modules = import.meta.glob<{ default: Skill['icon'] }>(
  '../../components/shared/icons/skills/**/*.astro',
  { eager: true },
);

const getIconPath = (type: string, skill: SkillId) => `${ICONS_PATH}/${type}/${skill}.astro`;
function getSkillData(type: SkillCategory, skill: SkillId) {
  const folderByCategory: Partial<Record<SkillCategory, string>> = {
    'language': 'languages',
    'frontend-framework': 'frameworks',
    'backend-framework': 'frameworks',
    'tool': 'tools',
    'database': 'databases',
    'devops': 'devops',
    'testing': 'testing',
    'state-management': 'tools',
    'css-framework': 'tools',
  };

  const folder = folderByCategory[type] ?? type;

  return {
    icon: modules[getIconPath(folder, skill)]?.default,
    category: type,
  };
}

export const SKILLS_REGISTRY: Record<SkillId, Pick<Skill, 'icon' | 'category'>> = {
  // Languages
  'typescript': getSkillData('language', 'typescript'),
  'javascript': getSkillData('language', 'javascript'),
  'graphql': getSkillData('language', 'graphql'),
  'html': getSkillData('language', 'html'),
  'css': getSkillData('language', 'css'),

  // Frontend Frameworks
  'react': getSkillData('frontend-framework', 'react'),
  'vue': getSkillData('frontend-framework', 'vue'),
  'next': getSkillData('frontend-framework', 'next'),
  'astro': getSkillData('frontend-framework', 'astro'),
  'react-native': getSkillData('frontend-framework', 'react-native'),
  'expo': getSkillData('frontend-framework', 'expo'),
  'gatsby': getSkillData('frontend-framework', 'gatsby'),
  'angularjs': getSkillData('frontend-framework', 'angularjs'),
  'apache-cordova': getSkillData('frontend-framework', 'apache-cordova'),
  'electron': getSkillData('frontend-framework', 'electron'),

  // Backend Frameworks
  'nodejs': getSkillData('backend-framework', 'nodejs'),
  'fastify': getSkillData('backend-framework', 'fastify'),
  'express': getSkillData('backend-framework', 'express'),

  // cloud
  'aws': getSkillData('cloud', 'aws'),
  'cloudflare': getSkillData('cloud', 'cloudflare'),
  'cloudflare-workers': getSkillData('cloud', 'cloudflare'),
  'cloudflare-r2': getSkillData('cloud', 'cloudflare'),
  'cloudflare-pages': getSkillData('cloud', 'cloudflare'),
  'vercel': getSkillData('cloud', 'vercel'),
  'render': getSkillData('cloud', 'render'),

  // DevOps
  'docker': getSkillData('devops', 'docker'),
  'jenkins': getSkillData('devops', 'jenkins'),
  'github-actions': getSkillData('devops', 'github-actions'),
  'ci': getSkillData('devops', 'ci'),
  'sentry': getSkillData('devops', 'sentry'),
  'kubernetes': getSkillData('devops', 'kubernetes'),

  // databases & CMS
  'mysql': getSkillData('database', 'mysql'),
  'mongodb': getSkillData('database', 'mongodb'),
  'postgres': getSkillData('database', 'postgres'),
  'supabase': getSkillData('database', 'supabase'),
  'contentful': getSkillData('database', 'contentful'),

  // testing
  'vitest': getSkillData('testing', 'vitest'),
  'cypress': getSkillData('testing', 'cypress'),
  'jest': getSkillData('testing', 'jest'),
  'playwright': getSkillData('testing', 'playwright'),

  // State Management
  'react-query': getSkillData('state-management', 'react-query'),
  'zustand': getSkillData('state-management', 'zustand'),
  'pinia': getSkillData('state-management', 'pinia'),
  'redux': getSkillData('state-management', 'redux'),
  'nanostores': getSkillData('state-management', 'nanostores'),

  // CSS Frameworks
  'scss': getSkillData('css-framework', 'sass'),
  'sass': getSkillData('css-framework', 'sass'),
  'tailwind': getSkillData('css-framework', 'tailwind'),
  'styled-components': getSkillData('css-framework', 'styled-components'),

  // Tools
  'git': getSkillData('tool', 'git'),
  'threejs': getSkillData('tool', 'threejs'),
  'colyseus': getSkillData('tool', 'colyseus'),
  'storybook': getSkillData('tool', 'storybook'),
  'react-three-fiber': getSkillData('tool', 'react-three-fiber'),
  'redux-saga': getSkillData('tool', 'redux-saga'),
  'eslint': getSkillData('tool', 'eslint'),
  'prettier': getSkillData('tool', 'prettier'),
  'Sharp': getSkillData('tool', 'Sharp'),
  'lerna': getSkillData('tool', 'lerna'),
  'nx': getSkillData('tool', 'nx'),
  'vite': getSkillData('tool', 'vite'),
  'webpack': getSkillData('tool', 'webpack'),
  'monaco-editor': getSkillData('tool', 'monaco-editor'),
  'i18n': getSkillData('tool', 'i18n'),
  'zod': getSkillData('tool', 'zod'),
  'leaflet': getSkillData('tool', 'leaflet'),
  'react-pdf': getSkillData('tool', 'react-pdf'),

  // Other
  'performance': getSkillData('other', 'performance'),
  'seo': getSkillData('other', 'seo'),
  'monorepo': getSkillData('other', 'monorepo'),
  'microfrontend': getSkillData('other', 'microfrontend'),
  'pwa': getSkillData('other', 'pwa'),
  'ssr': getSkillData('other', 'ssr'),
  'websockets': getSkillData('other', 'websockets'),
  'solid': getSkillData('other', 'solid'),
  'kiss': getSkillData('other', 'kiss'),
  'dry': getSkillData('other', 'dry'),
  'clean-architecture': getSkillData('other', 'clean-architecture'),

  // AI Tools
  'mcp': getSkillData('ai', 'mcp'),
  'webllm': getSkillData('ai', 'webllm'),
  'llm': getSkillData('ai', 'llm'),
  'ollama': getSkillData('ai', 'ollama'),

  'ai': getSkillData('ai', 'ai'),

  // AI Providers
  'groq': getSkillData('ai', 'groq'),
  'openai': getSkillData('ai', 'openai'),
  'anthropic': getSkillData('ai', 'anthropic'),
  'gemini': getSkillData('ai', 'gemini'),
  'openrouter': getSkillData('ai', 'openrouter'),

  // AI Agents
  'cursor': getSkillData('ai', 'cursor'),
  'opencode': getSkillData('ai', 'opencode'),
  'claude': getSkillData('ai', 'claude'),
};
