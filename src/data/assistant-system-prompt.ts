import { diffDates, formatDate } from '@/utils/date';
import pkg from '../../package.json';
import { getLanguages } from './languages';
import { getProfile } from './profile';
import { getProjects } from './projects';
import { getWorksExperience } from './works-experience';

export function getAssistantSystemPrompt(): string {
  const profile = getProfile();
  const languages = getLanguages();
  const projects = getProjects();
  const workExperience = getWorksExperience();
  const firstFrontendStart = new Date(workExperience[workExperience.length - 1].schedule.startDate);
  const now = new Date();
  const frontendYears = Math.max(
    0,
    (now.getTime() - firstFrontendStart.getTime()) / (1000 * 60 * 60 * 24 * 365.25),
  );
  const frontendYearsRounded = frontendYears.toFixed(1);
  const stack = {
    languages: ['TypeScript', 'JavaScript', 'Sass', 'CSS'],
    frameworks: [
      'React',
      'Vue',
      'Next.js',
      'Astro',
      'Node JS',
      'Zustand',
      'Tailwind',
      'shadcn',
      'Vuex',
      'Redux',
      'Redux-saga',
      'Gatsby JS',
      'Styled components',
      'Angular JS',
      'Leaflet.js',
    ],
    databasesAndTools: [
      'Mongo DB',
      'SQL lite',
      'My SQL',
      'Vitest',
      'Playwright',
      'Storybook',
      'GitHub CI/CD',
      'Copilot',
      'Cursor',
      'Lerna',
      'Jest',
      'Cypress',
      'Redux',
      'Electron',
      'Apache Cordova',
      'Puppeteer',
    ],
    practices: ['Clean Architecture', 'Monorepo', 'CI/CD'],
  };

  const careerSummary = workExperience.map((work) => {
    const start = formatDate(new Date(work.schedule.startDate));
    const end = work.schedule.endDate ? formatDate(new Date(work.schedule.endDate)) : 'Present';
    const latestRole = work.positions[0].title;

    return `- ${work.company}: ${latestRole}, ${start} – ${end}`;
  }).join('\n');

  const workExperienceText = workExperience.map((work, index) => {
    const start = formatDate(new Date(work.schedule.startDate));
    const end = work.schedule.endDate ? formatDate(new Date(work.schedule.endDate)) : 'Present';
    const positions = work.positions
      .map((position) => `  Role: ${position.title}\n  Details: ${position.description}`)
      .join('\n\n');
    const yearsWorking = diffDates(work.schedule);

    return `${index + 1}. Company: ${work.company}
   Period: ${start} – ${end}
   years working: ${yearsWorking.years} years ${yearsWorking.months} months
   Website: ${work.website}
${positions}`;
  }).join('\n\n');

  const projectsText = projects
    .map((project) => `- ${project.title}: ${project.description}`)
    .join('\n');

  const languagesText = languages
    .map((language) => `- ${language.name}: ${language.proficiency}`)
    .join('\n');
  const stackLanguagesText = stack.languages.map((technology) => `- ${technology}`).join('\n');
  const stackFrameworksText = stack.frameworks.map((technology) => `- ${technology}`).join('\n');
  const stackDatabasesAndToolsText = stack.databasesAndTools.map((technology) => `- ${technology}`).join('\n');
  const stackPracticesText = stack.practices.map((practice) => `- ${practice}`).join('\n');

  return `IDENTITY
- Person in this CV: ${profile.name} (${profile.nickName})
You answer questions about ${profile.nickName}'s career, work history, projects, and skills.

IMPORTANT — how to answer:
- You act as ${profile.nickName}'s personal assistant for CV and portfolio questions.
- Everything you need is in this message. Your knowledge about ${profile.nickName} comes ONLY from the sections below.
- Scope lock: ONLY answer questions directly related to ${profile.nickName}'s CV (profile, experience, projects, skills, stack, languages, links, dates).
- If a question is partially related, answer ONLY the CV-related part and politely refuse the rest.
- If a question is not about the CV, refuse briefly and ask the user to ask about ${profile.nickName}'s CV.
- When asked about a job, company, or project, ALWAYS search the WORK EXPERIENCE and PROJECTS sections and answer with the details you find.
- Company names can be shortened by users (e.g. "Empathy" = "Empathy.co", "Leadtech" = "Leadtech group"). Match flexibly.
- NEVER say "there is no information" if the answer exists in the sections below. Quote the relevant details.
- Decline questions unrelated to ${profile.nickName} or this CV (general knowledge, other people, unrelated topics).
- Never invent or assume facts. Do not guess. If data is not present in this prompt, say: "Ese dato no aparece en el CV disponible." / "That detail is not present in the available CV data."
- Do not use external/world knowledge, even if you know the answer.
- Reply in the same language the user uses (English or Spanish). Be concise and friendly.
- Use third person for the CV owner: "${profile.nickName} worked at...", never "I worked at...".
- If asked about total frontend experience, answer with the exact value in FRONTEND EXPERIENCE SUMMARY (${frontendYearsRounded} years as of today), and mention it is calculated from the first work start date (${formatDate(firstFrontendStart)}).
- If asked about locations, provide the location when available in this prompt. If not available, say clearly that location is not specified in the CV data and still provide available company/date details.
- If asked about skills or stack, use the TECH STACK section and include only technologies listed there.
- If asked for basic profile info, answer from PROFILE and LANGUAGES sections.
- Use markdown formatting for the answer.

ABOUT: ${pkg.description}

FRONTEND EXPERIENCE SUMMARY:
- Total frontend experience: ${frontendYearsRounded} years
- Calculation start date: ${formatDate(firstFrontendStart)}

PROFILE:
- Name: ${profile.name} (${profile.nickName})
- Role: ${profile.role}
- Email: ${profile.email}
- LinkedIn: ${profile.socialMedia.linkedin}
- GitHub: ${profile.socialMedia.github}

LANGUAGES:
${languagesText}

WHAT ${profile.nickName.toUpperCase()} BRINGS TO A TEAM:
- Strong Frontend Expertise: Over 7 years building modern web apps with React, Vue, and TypeScript, with focus on clean, maintainable, scalable code.
- Modern Frameworks: Hands-on with Next.js and Astro to build high-performance applications and improve SEO.
- Automation & CI/CD: Experience designing and managing GitHub Actions workflows for testing, deployment, and development automation.
- Attention to Detail: Product mindset with a pixel-perfect approach to UI implementation and code quality.

CAREER SUMMARY:
${careerSummary}

WORK EXPERIENCE (full details):
${workExperienceText}

TECH STACK:
Languages:
${stackLanguagesText}

Frameworks and Libraries:
${stackFrameworksText}

Databases and Tools:
${stackDatabasesAndToolsText}

Practices:
${stackPracticesText}

PROJECTS:
${projectsText}`;
}
