import { glob } from 'glob';
import fs from 'node:fs/promises';
import path from 'node:path';
import { parseHtml, readNode } from './parsers/html';
import { parseMarkdown } from './parsers/markdown';

const config = {
  exclude: ['node_modules/**'],
  patterns: ['src/**/*.md'],
  rules: {
    "max-sentence-length": {
      "warn-value": 20,
      "error-value": 25,
    },
  },
};

export async function parse() {
  // const label = getInput('label');

  const fileNames = await glob('src/**/*.md', { ignore: config.exclude });
  for (const fileName of fileNames) {
    const fileContents = await fs.readFile(fileName, { encoding: 'utf8' });
    const extension = path.extname(fileName);
    console.log(fileName);
    let textNodes: string[] = [];
    if (extension === '.html') {
      const parsedHtml = parseHtml(fileContents);
      textNodes = readNode(parsedHtml);
    } else if (extension === '.md') {
      const parsedHtml = await parseMarkdown(fileContents);
      textNodes = readNode(parsedHtml);
    }
    for (const textNode of textNodes) {
      const sentences = textNode.split(/[\\?|\\!|\\.]+/);
      for (const sentence of sentences) {
        const trimmedSentence = sentence.trim();
        const words = trimmedSentence.split(' ');
        if (words.length > 25) {
          console.log(sentence);
        }
      }
    }
  }
}

export default {
  parse,
};
