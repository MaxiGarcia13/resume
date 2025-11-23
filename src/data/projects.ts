import type { Project } from '@/types/projects';

export function getProjects(): Array<Project> {
  return [
    {
      title: 'Bilde konverterer',
      description: 'Transform images faster and simpler. The frontend is built with React and TypeScript, while the backend is built with Node.js and Express JS.',
      repo: 'https://github.com/MaxiGarcia13/bildekonverterer/tree/main',
      website: 'https://bildekonverterer.vercel.app',
    },
    {
      title: 'Vinos LM',
      description: 'Small-scale E-commerce Marketplace for wine lovers. Features full-stack development using Next.js (React) for a server-rendered, high-performance frontend, integrated with Supabase for robust PostgreSQL database management and real-time backend services.',
      repo: 'https://github.com/MaxiGarcia13/vinoslm',
      website: 'https://vinoslm-git-main-maxigarcia13.vercel.app/',
    },
    {
      title: 'Examples React',
      description: 'A Practical Guide to React State Management: useState, useEffect, Context, Redux, and Redux Saga.',
      repo: 'https://github.com/MaxiGarcia13/examples-react',
      website: 'https://examples-react.vercel.app/',
    },
    {
      title: 'Github repository searcher',
      description: 'Search repositories in GitHub, only filter by ID. Built with React and TypeScript.',
      repo: 'https://github.com/MaxiGarcia13/github-repository-searcher',
      website: 'https://github-repository-searcher.vercel.app/',
    },
  ];
}
