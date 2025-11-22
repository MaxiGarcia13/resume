import type { Profile } from '@/types/profile';

export function getProfile(): Profile {
  return {
    name: 'Maximiliano Garcia Mortigliengo',
    nickName: 'Maxi',
    email: 'maxig8@hotmail.com',
    role: 'Senior Frontend Software Engineer',
    socialMedia: {
      linkedin: 'https://www.linkedin.com/in/maximilianogarcia13',
      github: 'https://github.com/MaxiGarcia13',
    },
  };
}
