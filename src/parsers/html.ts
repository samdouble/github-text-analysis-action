import { parse } from 'node-html-parser';

export const parseHtml = (html: string) => {
  const root = parse(html);
  return root;
};
