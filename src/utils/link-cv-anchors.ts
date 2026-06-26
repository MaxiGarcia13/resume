import { getProjects } from '@/data/projects';
import { getWorksExperience } from '@/data/works-experience';

interface CvAnchorTerm {
  anchorId: string;
  names: string[];
}

export function getCvAnchorId(title: string) {
  return title.toLowerCase().replaceAll(' ', '-').replaceAll('.', '');
}

function getCompanyAnchorTerms(): CvAnchorTerm[] {
  return getWorksExperience().map((work) => {
    const names = new Set([work.company]);
    const firstWord = work.company.split(/[\s.]/)[0];
    if (firstWord && firstWord.length > 2) {
      names.add(firstWord);
    }
    return {
      anchorId: getCvAnchorId(work.company),
      names: [...names].sort((a, b) => b.length - a.length),
    };
  });
}

function getProjectAnchorTerms(): CvAnchorTerm[] {
  return getProjects().map((project) => ({
    anchorId: getCvAnchorId(project.title),
    names: [project.title],
  }));
}

function getCvAnchorTerms() {
  return [
    ...getCompanyAnchorTerms(),
    ...getProjectAnchorTerms(),
  ];
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function isInsideMarkdownLink(text: string, index: number) {
  const before = text.slice(0, index);
  const openBracket = before.lastIndexOf('[');
  const closeBracket = before.lastIndexOf(']');
  const openParen = before.lastIndexOf('(');

  if (openBracket > closeBracket) {
    return true;
  }

  if (closeBracket > openBracket && openParen > closeBracket) {
    return before.lastIndexOf(')') < openParen;
  }

  return false;
}

function linkFirstMention(text: string, names: string[], anchorId: string) {
  if (text.includes(`](#${anchorId})`)) {
    return text;
  }

  for (const name of names) {
    const regex = new RegExp(`\\b(${escapeRegExp(name)})\\b`, 'i');
    const match = regex.exec(text);

    if (match?.index !== undefined && !isInsideMarkdownLink(text, match.index)) {
      const original = match[1];

      return `${text.slice(0, match.index)}[${original}](#${anchorId})${text.slice(match.index + original.length)}`;
    }
  }

  return text;
}

export function linkCvAnchors(text: string) {
  return getCvAnchorTerms().reduce(
    (result, { anchorId, names }) => linkFirstMention(result, names, anchorId),
    text,
  );
}
