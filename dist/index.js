"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = run;
const glob_1 = require("glob");
// import { getInput, setFailed } from '@actions/core';
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        // const token = getInput('gh-token');
        // const label = getInput('label');
        const markdownFiles = yield (0, glob_1.glob)('**/*.md', { ignore: 'node_modules/**' });
        for (const markdownFile of markdownFiles) {
            console.log(markdownFile);
        }
    });
}
run();
exports.default = {
    run,
};
