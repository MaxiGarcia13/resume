import type { Skill } from './skills';

export interface Project {
  title: string;
  description: string;
  repo: string;
  website?: string;
  skills?: Array<Skill>;
}
