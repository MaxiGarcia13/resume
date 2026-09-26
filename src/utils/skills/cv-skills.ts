import type { WorkExperience } from '@/types/experiences';
import type { Project } from '@/types/projects';
import type { Skill } from '@/types/skills';
import { getSkills, uniqueSkills } from './get-skill';

interface Args {
  projects: Project[];
  works: WorkExperience[];
}

export function getCvSkills({ projects, works }: Args): Skill[] {
  return uniqueSkills(
    ...works.map((work) => work.skills),
    ...projects.map((project) => project.skills),

    // Skills from this project
    getSkills(
      [
        'openrouter',
        'anthropic',
        'gemini',
        'openai',
        'cursor',
        'opencode',
        'claude',
        'webllm',
        'react-pdf',
      ],
    ),
  );
}
