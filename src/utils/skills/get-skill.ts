import type { Skill, SkillId } from '@/types/skills';
import { capitalize } from '@maxigarcia/js-utils';
import { SKILLS_ICONS_REGISTRY } from './registry';

export function getSkill(id: SkillId): Skill {
  const icon = SKILLS_ICONS_REGISTRY[id];

  return {
    id,
    icon,
    name: capitalize(id.replace(/-/g, ' ')),
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
