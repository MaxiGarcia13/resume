import { getProfile, getProjects } from '@/data';
import { GithubIcon, Heading, Iframe, Link, Text } from '../shared';

export function Projects() {
  const projects = getProjects();
  const { socialMedia: { github: githubUrl } } = getProfile();

  return (
    <section id="projects" className="flex flex-col gap-6">
      <Heading tag="h2"><Link href="#projects" noWrap>Projects</Link></Heading>
      <ul className="flex flex-col gap-10">
        {
          projects.map(project => (
            <li key={project.title} className="flex flex-col gap-4">
              <Heading tag="h3" className="flex gap-2 justify-start items-center">
                {project.title}
                <Link href={project.repo} icon={<GithubIcon />} />
              </Heading>
              <Text>{project.description}</Text>
              <Iframe src={project.website} title={project.title} width="100%" height={400} sandbox="allow-scripts allow-same-origin" scrolling="no" />
            </li>
          ))
        }
      </ul>
      <div className="flex justify-center items-center">
        <Link href={`${githubUrl}?tab=repositories`} target="_blank" icon={<GithubIcon />} iconPosition="right">See More Code</Link>
      </div>
    </section>
  );
}
