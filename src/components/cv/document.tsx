import type { CvData } from '@/data/cv';
import {
  Document,
  Page,
} from '@react-pdf/renderer';
import { Header } from './header';
import { Languages } from './languages';
import { ProfilePicture } from './profile-picture';
import { Projects } from './projects';
import { Wrapper } from './shared';
import { Skills } from './skills';
import { WorkExperience } from './work-experience';

export interface CvDocumentProps {
  data: CvData;
  photoSrc: string;
}

export function CvDocument({ data, photoSrc }: CvDocumentProps) {
  const { profile, spokenLanguages, works, projects, skills } = data;
  const portfolioUrl = 'https://maxi-garcia-mortigliengo-cv.vercel.app';
  const telephoneNumber = '+34643761326';

  return (
    <Document
      title={`${profile.name} — CV`}
      author={profile.name}
      subject={profile.role}
    >
      <Page
        size="A4"
        style={{
          paddingTop: 36,
          paddingBottom: 36,
          paddingHorizontal: 40,
        }}
      >
        <Wrapper flexDirection="column" gap="md">
          <Wrapper
            flexDirection="row"
            gap="md"
            style={{
              alignItems: 'center',
            }}
          >
            <ProfilePicture src={photoSrc} />
            <Header
              profile={profile}
              telephoneNumber={telephoneNumber}
              portfolioUrl={portfolioUrl}
            />
          </Wrapper>

          <Languages spokenLanguages={spokenLanguages} />

          <Skills skills={skills} />

          <WorkExperience works={works} />

          <Projects projects={projects} />
        </Wrapper>
      </Page>
    </Document>
  );
}
