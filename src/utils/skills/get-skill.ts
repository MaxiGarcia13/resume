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
