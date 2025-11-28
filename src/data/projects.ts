import type { Project } from '@/types/projects';

export function getProjects(): Array<Project> {
  return [
    {
      title: 'Web Chatbot powered by Web LLM',
      description: 'Chat component integrated with web-llm (React JS)',
      repo: 'https://github.com/MaxiGarcia13/web-llm-chat',
      website: 'https://maxi-gpt.vercel.app/',
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
      website: 'https://vinoslm-git-main-maxigarcia13.vercel.app/',
    },
    {
      title: 'Examples React',
      description: 'A Practical Guide to React State Management: useState, useEffect, Context, Redux, and Redux Saga.',
      repo: 'https://github.com/MaxiGarcia13/examples-react',
      website: 'https://examples-react.vercel.app/',
    },
  ];
}
