import type { AstroComponentFactory } from 'astro/runtime/server/index.js';

export interface Skill {
  id: SkillId;
  name: string;
  icon?: AstroComponentFactory;
  category: SkillCategory;
}

export type SkillCategory
  = 'language'
    | 'state-management'
    | 'tool'
    | 'testing'
    | 'database'
    | 'ai'
    | 'cloud'
    | 'devops'
    | 'other'
    | 'frontend-framework'
    | 'backend-framework'
    | 'css-framework';

export type SkillId
  = FrameworkSkillId
    | LanguageSkillId
    | ToolSkillId
    | TestingSkillId
    | OtherSkillId
    | DatabaseSkillId
    | AISkillId
    | CloudSkillId
    | DevOpsSkillId;

type LanguageSkillId
  = 'typescript'
    | 'javascript'
    | 'graphql';

type FrameworkSkillId
  = 'react'
    | 'vue'
    | 'next'
    | 'astro'
    | 'react-native'
    | 'expo'
    | 'nodejs'
    | 'gatsby';

type DatabaseSkillId
  = 'postgres'
    | 'mysql'
    | 'mongodb'
    | 'supabase'
    | 'contentful';

type DevOpsSkillId
  = 'docker'
    | 'kubernetes'
    | 'github-actions'
    | 'ci'
    | 'sentry'
    | 'jenkins';

type ToolSkillId
  = 'git'
    | 'colyseus'
    | 'tailwind'
    | 'zod'
    | 'storybook'
    | 'threejs'
    | 'react-three-fiber'
    | 'react-query'
    | 'zustand'
    | 'redux'
    | 'redux-saga'
    | 'pinia'
    | 'eslint'
    | 'prettier'
    | 'Sharp'
    | 'sass'
    | 'scss'
    | 'fastify'
    | 'express'
    | 'lerna'
    | 'nx'
    | 'vite'
    | 'webpack'
    | 'electron'
    | 'apache-cordova'
    | 'styled-components'
    | 'angularjs'
    | 'nanostores'
    | 'monaco-editor'
    | 'leaflet'
    | 'react-pdf';

type CloudSkillId = 'cloudflare'
  | 'cloudflare-workers'
  | 'cloudflare-r2'
  | 'cloudflare-pages'
  | 'vercel'
  | 'aws'
  | 'render';

type AISkillId
  = 'mcp'
    | 'ai'
    | 'llm'
    | 'webllm'
    | 'cursor'
    | 'groq'
    | 'ollama'
    | 'opencode'
    | 'claude'
    | 'openai'
    | 'anthropic'
    | 'gemini'
    | 'openrouter';

type TestingSkillId
  = 'jest'
    | 'vitest'
    | 'playwright'
    | 'cypress';

type OtherSkillId
  = 'html'
    | 'css'
    | 'performance'
    | 'seo'
    | 'monorepo'
    | 'microfrontend'
    | 'pwa'
    | 'ssr'
    | 'websockets'
    | 'i18n'
    | 'solid'
    | 'kiss'
    | 'dry'
    | 'clean-architecture';
