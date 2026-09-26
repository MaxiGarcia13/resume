import type { Education } from '@/types/education';

export function getEducation(): Array<Education> {
  return [
    {
      institution: 'Colegio Universitario IES',
      degree: 'Systems Analyst',
      schedule: {
        startDate: '2016-03-01',
        endDate: '2020-04-24',
      },
      url: 'https://ies21.edu.ar',
    },
    {
      institution: 'Coderhouse',
      degree: 'Course of UX/UI Design',
      schedule: {
        startDate: '2020-02-01',
        endDate: '2020-07-01',
      },
      url: 'https://www.coderhouse.com',
    },
    {
      institution: 'La Metro escuela de diseño y comunicación audiovisual',
      degree: 'Course in Graphic design',
      schedule: {
        startDate: '2016-03-01',
        endDate: '2017-03-01',
      },
      url: 'https://lametro.edu.ar/',
    },
  ];
}
