import type { CvData } from '@/data/cv';
import type { SkillCategory } from '@/types/skills';
import { capitalize } from '@maxigarcia/js-utils';
import { Section, Text, Wrapper } from './shared';

interface SkillsProps {
  skills: CvData['skills'];
}

const SKILLS_ORDER: SkillCategory[] = [
  'language',
  'frontend-framework',
  'css-framework',
  'state-management',
  'backend-framework',
  'testing',
  'database',
  'devops',
  'cloud',
  'tool',
  'ai',
  'other',
];

const CATEGORY_TITLES: Record<SkillCategory, string> = {
  'language': 'Languages & Web',
  'state-management': 'State & Data',
  'tool': 'Tools',
  'testing': 'Testing',
  'database': 'Databases/BaaS/CMS',
  'frontend-framework': 'Frontend',
  'backend-framework': 'Backend',
  'css-framework': 'Styling',
  'ai': 'AI',
  'cloud': 'Cloud',
  'devops': 'DevOps',
  'other': 'Others',
};

export function Skills({ skills }: SkillsProps) {
  return (
    <Section title="Skills" gap="sm">
      {SKILLS_ORDER.map((category) => {
        const list = skills[category];

        if (!list?.length) {
          return null;
        }

        const title = CATEGORY_TITLES[category] ?? capitalize(category);
        const names = list.map((skill) => skill.name).join(', ');

        return (
          <Wrapper key={category} flexDirection="row">
            <Text size="sm" color="tertiary">
              {'• '}
              <Text size="sm" color="secondary" weight="bold">
                {`${title}: `}
              </Text>
              {names}
            </Text>
          </Wrapper>
        );
      })}
    </Section>
  );
}
