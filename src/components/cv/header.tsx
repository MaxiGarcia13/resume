import type { CvData } from '@/data/cv';
import { Link, Text, Wrapper } from './shared';

export interface HeaderProps {
  profile: CvData['profile'];
  telephoneNumber: string;
  portfolioUrl: string;
}

export function Header({ profile, telephoneNumber, portfolioUrl }: HeaderProps) {
  return (
    <Wrapper flexDirection="column" gap="sm" style={{ justifyContent: 'center', alignItems: 'flex-start' }}>
      <Text size="xxl" color="primary" weight="bold">{profile.name}</Text>
      <Text size="md" color="secondary">{profile.role}</Text>

      <Wrapper flexDirection="row" gap="sm" style={{ flexWrap: 'wrap', alignItems: 'center' }}>
        <Link src={`mailto:${profile.email}`} size="sm" color="tertiary">{profile.email}</Link>
        <Link src={`tel:${telephoneNumber}`} size="sm" color="tertiary">{telephoneNumber}</Link>
        <Text size="sm" color="tertiary">Santander, Spain</Text>
      </Wrapper>

      <Wrapper flexDirection="row" gap="sm" style={{ alignItems: 'center' }}>
        <Link src={profile.socialMedia.linkedin} size="xs" color="tertiary">
          {profile.socialMedia.linkedin}
        </Link>
        <Link src={portfolioUrl} size="xs" color="tertiary">
          {portfolioUrl}
        </Link>
      </Wrapper>
    </Wrapper>
  );
}
