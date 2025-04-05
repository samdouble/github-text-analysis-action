"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseHtml = void 0;
const node_html_parser_1 = require("node-html-parser");
const parseHtml = (html) => {
    const root = (0, node_html_parser_1.parse)(html);
    return root;
};
exports.parseHtml = parseHtml;
