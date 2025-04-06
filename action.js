// import { getInput, setFailed } from '@actions/core';
import { parse } from './dist/index.js';

export async function run() {
  // const label = getInput('label');
  parse();
}

run();

export default {
  run,
};
