import type { Skill } from './skills';

export interface WorkExperience {
  company: string;
  website: string;
  image: string;
  description?: string;
  schedule: Schedule;
  positions: Array<Position>;
  skills?: Array<Skill>;
}

export interface Schedule {
  startDate: string;
  endDate?: string;
}

export interface Position {
  title: string;
  description: string;
}
