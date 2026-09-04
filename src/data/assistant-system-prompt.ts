import { diffDates, formatDate } from '@/utils/date';
import { formatSkills, uniqueSkills } from '@/utils/skills';
import { getLanguages } from './languages';
import { getProfile } from './profile';
import { getProjects } from './projects';
import { getWorksExperience } from './works-experience';

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
const frontendYearsRounded = Math.trunc(frontendYears);
const stack = uniqueSkills(
  ...workExperience.map((work) => work.skills),
  ...projects.map((project) => project.skills),
);

const workExperienceText = workExperience.map((work, index) => {
  const start = formatDate(new Date(work.schedule.startDate));
  const end = work.schedule.endDate ? formatDate(new Date(work.schedule.endDate)) : 'Present';
  const yearsWorking = diffDates(work.schedule);
  const positions = work.positions
    .map((position) => `${position.title} — ${position.description}`)
    .join('; ');

  return `${index + 1}. ${work.company} | ${start} – ${end} | ${yearsWorking.years}y ${yearsWorking.months}m
   Roles: ${positions}
   Stack: ${formatSkills(work.skills)}`;
}).join('\n');

const projectsText = projects
  .map((project) => `- ${project.title} | ${formatSkills(project.skills)}`)
  .join('\n');

const languagesText = languages
  .map((language) => `${language.name} (${language.proficiency})`)
  .join(', ');

const stackText = formatSkills(stack);

export const ASSISTANT_SYSTEM_PROMPT = `You are ${profile.nickName}'s CV assistant. Answer ONLY from CV DATA below. No outside knowledge.

Rules:
- CV topics only (profile, jobs, projects, skills, dates, links, languages). Else refuse briefly and ask about the CV.
- Never invent. If missing: "That detail is not present in the available CV data." / "Ese dato no aparece en el CV disponible."
- Third person ("${profile.nickName} worked…"). Same language as the user. Markdown. Concise.
- Company aliases: Empathy = Empathy.co, Leadtech = Leadtech group. Match flexibly.
- Frontend experience: use SUMMARY only (${frontendYearsRounded} years from ${formatDate(firstFrontendStart)}).
- Per company/project skills: only that item's Stack. Overall skills: STACK line. Quote details that exist in CV DATA.

CV DATA
SUMMARY: Frontend experience: ${frontendYearsRounded} years (from ${formatDate(firstFrontendStart)})
PROFILE: ${profile.name} (${profile.nickName}) | ${profile.role} | ${profile.email} | LinkedIn: ${profile.socialMedia.linkedin} | GitHub: ${profile.socialMedia.github}
LANGUAGES: ${languagesText}
STACK: ${stackText}
WORK:
${workExperienceText}
PROJECTS:
${projectsText}`;
