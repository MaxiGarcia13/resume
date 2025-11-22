import { getProfile } from '@/data';
import { ProfileImage } from './profile';
import { DownloadIcon, GithubIcon, Heading, Link, LinkedInIcon, Text } from './shared';

export function Header() {
  const { name, role, socialMedia } = getProfile();

  return (
    <header className="pb-10 flex gap-8 items-center flex-col sm:flex-row">
      <ProfileImage
        src="assets/images/profile.png"
        alt={`${name} Profile Picture`}
      />

      <section className="flex flex-col gap-1">
        <Heading>{name}</Heading>
        <Text>{role}</Text>
        <div className="flex gap-2 mt-2">
          <Link icon={<LinkedInIcon />} href={socialMedia.linkedin} target="_blank" />
          <Link icon={<GithubIcon />} href={socialMedia.github} target="_blank" />
          <Link
            icon={<DownloadIcon />}
            href="/assets/cv_maximiliano_garcia.pdf"
            download="cv_maximiliano_garcia.pdf"
            variant="primary"
          >
            Download CV
          </Link>
        </div>
      </section>
    </header>
  );
}
