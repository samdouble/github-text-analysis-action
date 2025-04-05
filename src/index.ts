import { glob } from 'glob';
import fs from 'node:fs/promises';
import path from 'node:path';
import { parseMarkdown } from './parsers/markdown';

// import { getInput, setFailed } from '@actions/core';

const config = [{
  patterns: ['src/**/*.md'],
  rules: [{
    "max-sentence-length": 25,
  }],
}];

enum NodeType {
  HTMLElement = 1,
  TextNode = 3,
}

const readNode = (node: any) => {
  for (const childNode of node.childNodes) {
    if (childNode.nodeType === NodeType.TextNode) {
      console.log(childNode.rawText);
    } else if (childNode.nodeType === NodeType.HTMLElement) {
      console.log(`Reading node ${childNode.rawTagName}`);
      readNode(childNode);
    }
  }
};

export async function run() {
  // const label = getInput('label');

  const fileNames = await glob('src/**/*.md', { ignore: 'node_modules/**' });
  for (const fileName of fileNames) {
    const fileContents = await fs.readFile(fileName, { encoding: 'utf8' });
    const extension = path.extname(fileName);
    const parsedHtml = await parseMarkdown(fileContents);
    console.log(fileName);
    readNode(parsedHtml);
    const sentences = fileContents.split('.');
    for (const sentence of sentences) {
      const trimmedSentence = sentence.trim();
      const words = trimmedSentence.split(' ');
      if (words.length > 25) {
        //console.log(sentence);
      }
    }
  }
}

run();

export default {
  run,
};
