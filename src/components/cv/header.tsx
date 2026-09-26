import type { CvData } from '@/data/cv';
import process from 'node:process';
import { Link, Text, Wrapper } from './shared';

export interface HeaderProps {
  profile: CvData['profile'];
}

export function Header({ profile }: HeaderProps) {
  const portfolioUrl = 'https://maxi-garcia-mortigliengo-cv.vercel.app';
  const telephoneNumber = process.env.TELEPHONE_NUMBER;
  const location = process.env.LOCATION ?? 'Spain';

  return (
    <Wrapper flexDirection="column" gap="sm" style={{ justifyContent: 'center', alignItems: 'flex-start' }}>
      <Text size="xxl" color="primary" weight="bold">{profile.name}</Text>
      <Text size="md" color="secondary">{profile.role}</Text>

      <Wrapper flexDirection="row" gap="sm" style={{ flexWrap: 'wrap', alignItems: 'center' }}>
        <Text size="sm" color="tertiary">{location}</Text>

        <Link src={`mailto:${profile.email}`} size="sm" color="tertiary">{profile.email}</Link>
        {
          telephoneNumber && (
            <Link src={`tel:${telephoneNumber}`} size="sm" color="tertiary">{telephoneNumber}</Link>
          )
        }
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
