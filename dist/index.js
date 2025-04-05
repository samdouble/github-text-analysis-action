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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = run;
const glob_1 = require("glob");
const promises_1 = __importDefault(require("node:fs/promises"));
const node_path_1 = __importDefault(require("node:path"));
const markdown_1 = require("./parsers/markdown");
// import { getInput, setFailed } from '@actions/core';
const config = [{
        patterns: ['src/**/*.md'],
        rules: [{
                "max-sentence-length": 25,
            }],
    }];
var NodeType;
(function (NodeType) {
    NodeType[NodeType["HTMLElement"] = 1] = "HTMLElement";
    NodeType[NodeType["TextNode"] = 3] = "TextNode";
})(NodeType || (NodeType = {}));
const readNode = (node) => {
    for (const childNode of node.childNodes) {
        if (childNode.nodeType === NodeType.TextNode) {
            console.log(childNode.rawText);
        }
        else if (childNode.nodeType === NodeType.HTMLElement) {
            console.log(`Reading node ${childNode.rawTagName}`);
            readNode(childNode);
        }
    }
};
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        // const label = getInput('label');
        const fileNames = yield (0, glob_1.glob)('src/**/*.md', { ignore: 'node_modules/**' });
        for (const fileName of fileNames) {
            const fileContents = yield promises_1.default.readFile(fileName, { encoding: 'utf8' });
            const extension = node_path_1.default.extname(fileName);
            const parsedHtml = yield (0, markdown_1.parseMarkdown)(fileContents);
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
    });
}
run();
exports.default = {
    run,
};
