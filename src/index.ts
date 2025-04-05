import { glob } from 'glob';
// import { getInput, setFailed } from '@actions/core';

export async function run() {
  // const token = getInput('gh-token');
  // const label = getInput('label');

  const markdownFiles = await glob('**/*.md', { ignore: 'node_modules/**' });
  for (const markdownFile of markdownFiles) {
    console.log(markdownFile);
  }
}

run();

export default {
  run,
};
