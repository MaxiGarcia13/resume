import type { SkillCategory, SkillId } from '@/types/skills';

export interface SkillRegistryEntry {
  category: SkillCategory;
  /** Icon file stem under the category folder; defaults to the skill id */
  icon?: string;
}

function entry(category: SkillCategory, icon?: string): SkillRegistryEntry {
  return { category, icon };
}

export const SKILLS_REGISTRY: Record<SkillId, SkillRegistryEntry> = {
  // Languages
  'typescript': entry('language'),
  'javascript': entry('language'),
  'graphql': entry('language'),
  'html': entry('language'),
  'css': entry('language'),

  // Frontend Frameworks
  'react': entry('frontend-framework'),
  'vue': entry('frontend-framework'),
  'next': entry('frontend-framework'),
  'astro': entry('frontend-framework'),
  'react-native': entry('frontend-framework'),
  'expo': entry('frontend-framework'),
  'gatsby': entry('frontend-framework'),
  'angularjs': entry('frontend-framework'),
  'apache-cordova': entry('frontend-framework'),
  'electron': entry('frontend-framework'),

  // Backend Frameworks
  'nodejs': entry('backend-framework'),
  'fastify': entry('backend-framework'),
  'express': entry('backend-framework'),

  // cloud
  'aws': entry('cloud'),
  'cloudflare': entry('cloud'),
  'cloudflare-workers': entry('cloud', 'cloudflare'),
  'cloudflare-r2': entry('cloud', 'cloudflare'),
  'cloudflare-pages': entry('cloud', 'cloudflare'),
  'vercel': entry('cloud'),
  'render': entry('cloud'),

  // DevOps
  'docker': entry('devops'),
  'jenkins': entry('devops'),
  'github-actions': entry('devops'),
  'ci': entry('devops'),
  'sentry': entry('devops'),
  'kubernetes': entry('devops'),

  // databases & CMS
  'mysql': entry('database'),
  'mongodb': entry('database'),
  'postgres': entry('database'),
  'supabase': entry('database'),
  'contentful': entry('database'),

  // testing
  'vitest': entry('testing'),
  'cypress': entry('testing'),
  'jest': entry('testing'),
  'playwright': entry('testing'),

  // State Management
  'react-query': entry('state-management'),
  'zustand': entry('state-management'),
  'pinia': entry('state-management'),
  'redux': entry('state-management'),
  'nanostores': entry('state-management'),

  // CSS Frameworks
  'scss': entry('css-framework', 'sass'),
  'sass': entry('css-framework'),
  'tailwind': entry('css-framework'),
  'styled-components': entry('css-framework'),

  // Tools
  'git': entry('tool'),
  'threejs': entry('tool'),
  'colyseus': entry('tool'),
  'storybook': entry('tool'),
  'react-three-fiber': entry('tool'),
  'redux-saga': entry('tool'),
  'eslint': entry('tool'),
  'prettier': entry('tool'),
  'Sharp': entry('tool'),
  'lerna': entry('tool'),
  'nx': entry('tool'),
  'vite': entry('tool'),
  'webpack': entry('tool'),
  'monaco-editor': entry('tool'),
  'i18n': entry('tool'),
  'zod': entry('tool'),
  'leaflet': entry('tool'),
  'react-pdf': entry('tool'),

  // Other
  'performance': entry('other'),
  'seo': entry('other'),
  'monorepo': entry('other'),
  'microfrontend': entry('other'),
  'pwa': entry('other'),
  'ssr': entry('other'),
  'websockets': entry('other'),
  'solid': entry('other'),
  'kiss': entry('other'),
  'dry': entry('other'),
  'clean-architecture': entry('other'),

  // AI Tools
  'mcp': entry('ai'),
  'webllm': entry('ai'),
  'llm': entry('ai'),
  'ollama': entry('ai'),

  'ai': entry('ai'),

  // AI Providers
  'groq': entry('ai'),
  'openai': entry('ai'),
  'anthropic': entry('ai'),
  'gemini': entry('ai'),
  'openrouter': entry('ai'),

  // AI Agents
  'cursor': entry('ai'),
  'opencode': entry('ai'),
  'claude': entry('ai'),
};

export const ICON_FOLDER_BY_CATEGORY: Partial<Record<SkillCategory, string>> = {
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
