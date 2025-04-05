import { glob } from 'glob';
import fs from 'node:fs/promises';
import marked from 'marked';

// import { getInput, setFailed } from '@actions/core';

const config = [{
  pattern: 'src/**/*.md',
  rules: [{
    "max-sentence-length": 25,
  }]
}];

export async function run() {
  // const label = getInput('label');

  const markdownFiles = await glob('src/**/*.md', { ignore: 'node_modules/**' });
  for (const markdownFile of markdownFiles) {
    const data = await fs.readFile(markdownFile, { encoding: 'utf8' });
    console.log(markdownFile);
    const tokens = marked.parse(data);
    console.log(tokens);
    const sentences = data.split('.');
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
