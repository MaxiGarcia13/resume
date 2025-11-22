import { getExperiences } from '@/data';
import { diffDates, formatSechedule } from '@/utils';
import { ExternalLinkIcon, Heading, Img, Link, LinkIcon, Text } from '../shared';
import { Positions } from './positions';

export function Experiences() {
  const experiences = getExperiences();

  return (
    <section className="flex flex-col gap-2">
      <Heading tag="h2">Professional Experience</Heading>
      <ul>
        {experiences.map((experience) => {
          const { startDate, endDate } = formatSechedule(experience.schedule);
          const { years, months } = diffDates(experience.schedule);

          return (
            <li key={experience.company} className="py-4 flex flex-col gap-2">
              <div className="flex gap-6">
                <Img src={experience.image} alt={experience.company} className="w-[60px] h-[60px] rounded bg-neutral-100" />
                <div>
                  <Heading id={experience.id} tag="h3" className="group flex gap-2 items-center justify-start">
                    <Link href={`#${experience.id}`} noWrap>
                      <span className="flex gap-2 items-center justify-start">
                        <LinkIcon width={18} height={18} className="hidden group-hover:block" />
                        {experience.company}
                      </span>
                    </Link>
                    <Link href={experience.website} icon={<ExternalLinkIcon width={18} height={18} />} target="_blank" />
                  </Heading>
                  <Text tag="span" className="flex gap-1">
                    {`${startDate} - ${endDate ?? 'now'}. ${years > 0 ? `${years} years ${months > 0 ? `and ${months} months` : ''}` : `${months} months`}`}
                  </Text>
                </div>
              </div>

              <Positions positions={experience.positions} className="pl-0 md:pl-[84px]" />
            </li>
          );
        })}
      </ul>
    </section>
  );
}
