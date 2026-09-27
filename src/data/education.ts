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
      location: 'Córdoba, Argentina',
    },
    {
      institution: 'Coderhouse',
      degree: 'UX/UI Design Course',
      schedule: {
        startDate: '2020-02-01',
        endDate: '2020-08-01',
      },
      url: 'https://www.coderhouse.com',
      location: 'Buenos Aires, Argentina',
    },
    {
      institution: 'La Metro escuela de diseño y comunicación audiovisual',
      degree: 'Graphic design Course',
      schedule: {
        startDate: '2016-03-01',
        endDate: '2017-03-01',
      },
      url: 'https://lametro.edu.ar/',
      location: 'Córdoba, Argentina',
    },
  ];
}
