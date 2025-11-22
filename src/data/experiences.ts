import type { Experience } from '@/types/experiences';

export function getExperiences(): Array<Experience> {
  return [
    {
      id: 'empathy-co',
      company: 'Empathy.co',
      schedule: {
        startDate: '2022-05-01',
      },
      website: 'https://empathy.co/products/',
      image: 'https://media.glassdoor.com/sql/2977682/empathy-co-squarelogo-1569478606360.png',
      positions: [
        {
          title: 'Senior Frontend Software Engineer',
          description: 'Developed and maintained web applications using React JS, Vue JS, Next JS, TypeScript; implemented unit tests with Jest and Vitest; collaborated on end-to-end testing with Playwright and Cypress; worked to improve the developer experience by enhancing internal tools and workflows; implemented continuous-integration pipelines using GitHub Actions; collaborated with the migration from Vue JS to React JS.',
        },
        {
          title: 'Frontend Software Engineer',
          description: 'Developed and maintained web applications using Vue JS, TypeScript; implemented unit tests with Jest and Vitest; collaborated with the migration from Vue 2.7 to Vue 3.',
        },
      ],
    },
    {
      id: 'capitole-consulting',
      company: 'Capitole Consulting',
      schedule: {
        startDate: '2021-09-01',
        endDate: '2022-05-01',
      },
      website: 'https://www.capitole-consulting.com/es/',
      image: 'https://media.glassdoor.com/sql/2060890/capitole-consulting-squareLogo-1690893755232.png',
      positions: [
        {
          title: 'Frontend Developer',
          description: 'Developed and maintained web applications using React JS, TypeScript; implemented unit tests with Jest.',
        },
      ],
    },
    {
      id: 'leadtech',
      company: 'Leadtech group',
      schedule: {
        startDate: '2020-10-01',
        endDate: '2021-09-01',
      },
      website: 'https://leadtech.com/',
      image: 'https://media.glassdoor.com/sql/3325548/leadtech-spain-squarelogo-1629382439526.png',
      positions: [
        {
          title: 'Frontend Developer',
          description: 'Developed and maintained web applications using React JS, TypeScript and Gatsby JS.',
        },
      ],
    },
    {
      id: 'global-think-technology',
      company: 'Global think technology',
      schedule: {
        startDate: '2018-7-01',
        endDate: '2020-08-01',
      },
      website: 'https://globalthink.io/es/',
      image: 'https://media.glassdoor.com/sql/3026242/global-think-technology-squarelogo-1717155359680.png',
      positions: [
        {
          title: 'Associate Frontend Developer',
          description: 'Developed and maintained web applications using React JS, Angular JS, Electron JS and Node JS.',
        },
        {
          title: 'Junior Frontend Developer',
          description: 'Developed and maintained web applications using Angular JS.',
        },
      ],
    },
  ];
}
