export interface WorkExperience {
  id: string
  company: string
  website: string
  image: string
  description?: string
  schedule: Schedule
  positions: Array<Position>
}

export interface Schedule {
  startDate: string
  endDate?: string
}

export interface Position {
  title: string
  description: string
}
