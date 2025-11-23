import { getWorksExperience } from '@/data';
import { diffDates, formatSechedule } from '@/utils';
import { ExternalLinkIcon, Heading, Img, Link, Text } from '../shared';
import { Positions } from './positions';

export function WorksExperience() {
  const worksExperience = getWorksExperience();

  return (
    <section id="works-experience" className="flex flex-col gap-4">
      <Heading tag="h2"><Link href="#works-experience" noWrap>Works Experience</Link></Heading>
      <ul className="flex flex-col gap-4">
        {worksExperience.map((experience) => {
          const { startDate, endDate } = formatSechedule(experience.schedule);
          const { years, months } = diffDates(experience.schedule);

          return (
            <li key={experience.company} className="flex flex-col gap-2">
              <div className="flex gap-6 justify-start items-center">
                <Img src={experience.image} alt={experience.company} className="w-[60px] h-[60px] rounded bg-neutral-100" />
                <div>
                  <Heading id={experience.id} tag="h3" className="group flex gap-2 items-center justify-start">
                    <Link href={`#${experience.id}`} noWrap>
                      {experience.company}
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
