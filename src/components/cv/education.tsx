import type { CvData } from '@/data/cv';
import { formatSechedule } from '@/utils/date';
import { Section, Text, Wrapper } from './shared';

interface EducationProps {
  education: CvData['education'];
}

export function Education({ education }: EducationProps) {
  return (
    <Section title="Education" flexDirection="column" gap="md">
      {education.map(({ institution, degree, schedule, location }) => {
        const { startDate, endDate } = formatSechedule(schedule);

        return (
          <Wrapper key={institution} flexDirection="column" gap="sm">
            <Wrapper
              flexDirection="row"
              style={{ justifyContent: 'space-between', alignItems: 'center' }}
            >
              <Wrapper
                flexDirection="row"
                style={{ justifyContent: 'flex-start', alignItems: 'center' }}
              >
                <Text size="sm" color="secondary" weight="bold">
                  {degree}
                  {' '}
                </Text>
                <Text size="xs" color="tertiary">
                  at
                  {' '}
                  {institution}
                </Text>
              </Wrapper>

              <Text size="xs" color="tertiary" weight="oblique">
                {location}
                {' '}
                -
                {' '}
                {`${startDate} – ${endDate ?? 'Present'}`}
              </Text>
            </Wrapper>
          </Wrapper>
        );
      })}
    </Section>
  );
}
