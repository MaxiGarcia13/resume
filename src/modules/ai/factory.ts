import type { BaseLLM } from './domain/base-llm';
import type { LLMServiceType } from './types';
import { GroqService } from './domain/groq';
import { LocalLLM } from './domain/local-llm';
import { OpenRouterService } from './domain/open-router';

const SERVICE_ORDER: LLMServiceType[] = [
  'groq',
  'open-router',
  'local',
];

const instances = new Map<LLMServiceType, BaseLLM>();
let currentType: LLMServiceType = SERVICE_ORDER[0];

export function createLLM(type: LLMServiceType): BaseLLM {
  const existing = instances.get(type);

  if (existing) {
    return existing;
  }

  let llm: BaseLLM;

  switch (type) {
    case 'groq':
      llm = new GroqService();
      break;
    case 'open-router':
      llm = new OpenRouterService();
      break;
    case 'local':
      llm = new LocalLLM();
      break;
    default:
      throw new Error(`Unsupported LLM service type: ${type}`);
  }

  instances.set(type, llm);
  return llm;
}

export function getLLM(): BaseLLM {
  return createLLM(currentType);
}

export function switchToNext(): BaseLLM | null {
  const nextType = SERVICE_ORDER[SERVICE_ORDER.indexOf(currentType) + 1];

  if (!nextType) {
    return null;
  }

  currentType = nextType;
  return createLLM(currentType);
}
