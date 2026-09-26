import type { CvData } from '@/data/cv';
import { formatSechedule } from '@/utils/date';
import { Link, Section, Text, Wrapper } from './shared';

interface WorkExperienceProps {
  works: CvData['works'];
}

export function WorkExperience({ works }: WorkExperienceProps) {
  return (
    <Section title="Work Experience" flexDirection="column" gap="md">
      {works.map((experience) => {
        const { startDate, endDate } = formatSechedule(experience.schedule);

        return (
          <Wrapper key={experience.company} flexDirection="column" gap="sm">
            <Wrapper
              flexDirection="row"
              style={{ justifyContent: 'space-between', alignItems: 'center' }}
            >
              <Link src={experience.website} size="md" color="secondary" weight="bold">
                {experience.company}
              </Link>
              <Text size="xs" color="tertiary" weight="oblique">
                {`${startDate} – ${endDate ?? 'Present'}`}
              </Text>
            </Wrapper>

            {experience.positions.map((position) => (
              <Wrapper
                key={`${experience.company}-${position.title}`}
                flexDirection="column"
                gap="sm"
              >
                <Text size="sm" color="secondary" weight="bold">{position.title}</Text>

                {position.description.map((item, index) => (
                  <Wrapper
                    key={`${position.title}-${index}`}
                    flexDirection="row"
                    gap="xs"
                  >
                    <Text size="sm" color="tertiary">•</Text>
                    <Text size="sm" color="tertiary">{item}</Text>
                  </Wrapper>
                ))}
              </Wrapper>
            ))}
          </Wrapper>
        );
      })}
    </Section>
  );
}
