import type { Project } from '@/types/projects';

export function getProjects(): Array<Project> {
  return [
    {
      title: 'Liga de Padel cantabra pero con IA',
      description: 'Find the leaderboard, a team or compare a team with other teams.',
      repo: 'https://github.com/MaxiGarcia13/fcp-chat',
      website: 'https://fcp-chat.vercel.app/',
    },
    {
      title: 'Web Chatbot powered by Web LLM',
      description: 'Chat component integrated with web-llm (React JS)',
      repo: 'https://github.com/MaxiGarcia13/web-llm-chat',
      website: 'https://maxi-gpt.vercel.app/',
    },
    {
      title: 'La casita del árbol',
      description: 'La Casita del Árbol is a creative studio where we offer ceramic classes and sell handcrafted ceramic products.',
      repo: 'https://github.com/MaxiGarcia13/la-casita-del-arbol',
      website: 'https://la-casita-del-arbol.vercel.app',
    },
    {
      title: 'Bilde konverterer',
      description: 'Transform images faster and simpler. The frontend is built with React and TypeScript, while the backend is built with Node.js and Express JS.',
      repo: 'https://github.com/MaxiGarcia13/bildekonverterer/tree/main',
      website: 'https://bildekonverterer.vercel.app',
    },
    {
      title: 'Vinos LM',
      description: 'Small Marketplace for wine lovers. Features full-stack development using Next.js (React) for a server-rendered, integrated with Supabase for database management and real-time backend services.',
      repo: 'https://github.com/MaxiGarcia13/vinoslm',
      website: 'https://vinoslm-git-main-maxigarcia13.vercel.app',
    },
    {
      title: 'Examples React',
      description: 'A Practical Guide to React State Management: useState, useEffect, Context, Redux, and Redux Saga.',
      repo: 'https://github.com/MaxiGarcia13/examples-react',
      website: 'https://examples-react.vercel.app/',
    },
    {
      title: 'My sketch',
      description: 'Art sketch project with React and Canvas sketch',
      repo: 'https://github.com/MaxiGarcia13/my-sketch',
      website: 'https://my-sketch-9000.vercel.app/',
    },
    {
      title: 'Github repository searcher',
      description: 'Search repositories in GitHub, only filter by ID. Built with React and TypeScript.',
      repo: 'https://github.com/MaxiGarcia13/github-repository-searcher',
      website: 'https://github-repository-searcher.vercel.app/',
    },
  ];
}
