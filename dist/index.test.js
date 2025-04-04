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
const _1 = require(".");
const core_1 = require("@actions/core");
const github_1 = require("@actions/github");
// Mock getInput and setFailed functions
jest.mock('@actions/core', () => ({
    getInput: jest.fn(),
    setFailed: jest.fn(),
}));
// Mock context and getOctokit functions
jest.mock('@actions/github', () => ({
    context: {
        payload: {
            pull_request: {
                number: 1,
            },
        },
        repo: {
            owner: 'owner',
            repo: 'repo',
        },
    },
    getOctokit: jest.fn(),
}));
describe('run', () => {
    beforeEach(() => {
        // Clear all mock function calls and reset mock implementation
        jest.clearAllMocks();
    });
    it('should add label to the pull request', () => __awaiter(void 0, void 0, void 0, function* () {
        // Mock the return values for getInput
        core_1.getInput.mockReturnValueOnce('gh-token-value');
        core_1.getInput.mockReturnValueOnce('label-value');
        github_1.context.payload.pull_request = {
            number: 1,
        };
        // Mock the Octokit instance and the addLabels method
        const mockAddLabels = jest.fn();
        const mockOctokit = {
            rest: {
                issues: {
                    addLabels: mockAddLabels,
                },
            },
        };
        github_1.getOctokit.mockReturnValueOnce(mockOctokit);
        // Run the function
        yield (0, _1.run)();
        // Assertions
        expect(core_1.getInput).toHaveBeenCalledWith('gh-token');
        expect(core_1.getInput).toHaveBeenCalledWith('label');
        expect(github_1.getOctokit).toHaveBeenCalledWith('gh-token-value');
        expect(mockAddLabels).toHaveBeenCalledWith({
            owner: 'owner',
            repo: 'repo',
            issue_number: 1,
            labels: ['label-value'],
        });
        expect(core_1.setFailed).not.toHaveBeenCalled();
    }));
});
