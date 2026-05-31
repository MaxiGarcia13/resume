import type { Language } from '@/types/languages';

export function getLanguages(): Array<Language> {
  return [
    { name: 'Spanish', proficiency: 'Native' },
    { name: 'English', proficiency: 'Fluent' },
  ];
}
