import type { Schedule } from './schedule';

export interface Education {
  institution: string;
  degree: string;
  schedule: Schedule;
  url: string;
  location: string;
}
