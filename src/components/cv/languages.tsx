import type { CvData } from '@/data/cv';
import { Section, Text, Wrapper } from './shared';

interface LanguagesProps {
  spokenLanguages: CvData['spokenLanguages'];
}

export function Languages({ spokenLanguages }: LanguagesProps) {
  return (

    <Section title="Languages" gap="sm">
      {spokenLanguages.map((language) => (
        <Wrapper key={language.name} flexDirection="row" gap="sm">
          <Text size="sm" color="secondary" weight="bold">{`${language.name}:`}</Text>
          <Text size="sm" color="tertiary">{language.proficiency}</Text>
        </Wrapper>
      ))}
    </Section>
  );
}
