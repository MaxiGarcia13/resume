import type { CvData } from '@/data/cv';
import type { SkillCategory } from '@/types/skills';
import { capitalize } from '@maxigarcia/js-utils';
import { spaces } from './constants';
import { Section, Text, Wrapper } from './shared';

interface SkillsProps {
  skills: CvData['skills'];
}

const SKILS_ORDER: SkillCategory[] = [
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

export function Skills({ skills }: SkillsProps) {
  return (
    <Section title="Skills" gap="sm">
      {SKILS_ORDER.map((category) => {
        const list = skills[category];

        const titles: Record<SkillCategory, string> = {
          'language': 'Languages',
          'state-management': 'State Management',
          'tool': 'Tools',
          'testing': 'Testing',
          'database': 'Databases/BaaS/CMS',
          'frontend-framework': 'Frontend Frameworks',
          'backend-framework': 'Backend Frameworks',
          'css-framework': 'Styling/CSS',
          'ai': 'AI/Tools/Agents/Providers',
          'cloud': 'Cloud',
          'devops': 'DevOps',
          'other': 'Others',
        };

        const title = titles[category as SkillCategory] ?? capitalize(category);

        return (
          <Wrapper key={category} flexDirection="row" style={{ flexWrap: 'wrap' }}>
            <Text size="sm" color="secondary" weight="bold" style={{ marginRight: spaces.xs }}>
              {`${title}:`}
            </Text>

            {list.map((skill, index) => (
              <>
                <Text key={skill.id} size="sm" color="tertiary">
                  {
                    `${skill.name}${
                      index === list.length - 2
                        ? ' and '
                        : index < list.length - 1
                          ? ', '
                          : ''
                    }`
                  }
                </Text>
              </>
            ))}
          </Wrapper>
        );
      })}
    </Section>
  );
}
