import type { CvData } from '@/data/cv';
import { Link, Section, Text, Wrapper } from './shared';

interface ProjectsProps {
  projects: CvData['projects'];
}

export function Projects({ projects }: ProjectsProps) {
  return (
    <Section title="Projects" flexDirection="column" gap="md">
      {projects.map((project) => (
        <Wrapper key={project.title} flexDirection="column" gap="sm">
          <Wrapper flexDirection="row" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
            <Text size="sm" color="secondary" weight="bold">{project.title}</Text>

            <Wrapper
              flexDirection="row"
              gap="sm"
            >
              {project.website && <Text size="xs" color="tertiary">{project.website}</Text>}

              {project.repo && (
                <Link src={project.repo} size="xs" color="tertiary">
                  {project.repo}
                </Link>
              )}
            </Wrapper>
          </Wrapper>

          <Text size="sm" color="tertiary">{project.description}</Text>
        </Wrapper>
      ))}
    </Section>
  );
}
