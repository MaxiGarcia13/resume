import type { WorkExperience } from '@/types/experiences';
import type { Language } from '@/types/languages';
import type { Profile } from '@/types/profile';
import type { Project } from '@/types/projects';
import type { Skill, SkillCategory } from '@/types/skills';
import { getCvSkills, groupSkillsByCategory } from '@/utils/skills';
import { getLanguages } from './languages';
import { getProfile } from './profile';
import { getProjects } from './projects';
import { getWorksExperience } from './works-experience';

export const CV_PHOTO_PATH = 'assets/images/favicon.png';
export const CV_FILENAME = 'maxi_garcia_mortigliengo_cv.pdf';

export interface CvData {
  profile: Profile;
  spokenLanguages: Language[];
  works: WorkExperience[];
  projects: Project[];
  skills: Record<SkillCategory, Skill[]>;
  photoPath: string;
  filename: string;
}

export function getCvData(): CvData {
  const projects = getProjects();

  const skills = getCvSkills({
    projects,
    works: getWorksExperience(),
  });

  const skillsByCategory = groupSkillsByCategory(skills);

  return {
    profile: getProfile(),
    spokenLanguages: getLanguages(),
    works: getWorksExperience(),
    projects: projects.filter((project) => project.showInCv),
    skills: skillsByCategory,
    photoPath: CV_PHOTO_PATH,
    filename: CV_FILENAME,
  };
}
