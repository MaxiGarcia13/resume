import type { Skill, SkillId } from '@/types/skills';
import { ICON_FOLDER_BY_CATEGORY, SKILLS_REGISTRY } from './registry';

const ICONS_PATH = '../../components/shared/icons/skills';

const modules = import.meta.glob(
  '../../components/shared/icons/skills/**/*.astro',
  { eager: true },
) as Record<string, { default: NonNullable<Skill['icon']> }>;

export function getSkillIcon(id: SkillId): Skill['icon'] {
  const entry = SKILLS_REGISTRY[id];

  if (!entry) {
    return undefined;
  }

  const folder = ICON_FOLDER_BY_CATEGORY[entry.category] ?? entry.category;
  const iconId = entry.icon ?? id;

  return modules[`${ICONS_PATH}/${folder}/${iconId}.astro`]?.default;
}
