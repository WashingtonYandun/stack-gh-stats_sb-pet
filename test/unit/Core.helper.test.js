import { describe, expect, test } from "vitest";
import { mapResponseToGithubRepos } from "../../src/helpers/Core.helper.js";
import { MOCK_EXPECTED, MOCK_RESPONSE } from "../mocks/repos.js";
import {
    getGithubRepos,
    filterReposMoreThanKStars,
    getLastUpdatedRepos,
    sumRepositoryStars,
} from "../../src/helpers/Core.helper.js";

describe("Core Helper", () => {
    describe("getGithubRepos", () => {
        test("returns an array of repositories", async () => {
            const repos = await getGithubRepos();
            expect(Array.isArray(repos)).toBe(true);
        });
    });
    
    describe("mapResponseToGithubRepos", () => {
        test("returns an array of GithubRepo objects", () => {
            const result = mapResponseToGithubRepos(MOCK_RESPONSE);
            expect(result).toEqual(MOCK_EXPECTED);
        });
    });


    describe("filterReposByStars", () => {
        test("returns an array of GithubRepo objects with starsCount greater than the given stars", () => {
            const repos = [
                { fullName: "repo1", starsCount: 10 },
                { fullName: "repo2", starsCount: 20 },
                { fullName: "repo3", starsCount: 30 },
                { fullName: "repo4", starsCount: 40 },
                { fullName: "repo5", starsCount: 50 },
            ];

            const result = filterReposMoreThanKStars(repos, 30);

            expect(result).toEqual([
                { fullName: "repo4", starsCount: 40 },
                { fullName: "repo5", starsCount: 50 },
            ]);
        });
    });

    describe("getLastUpdatedRepos", () => {
        test("returns an array of the last updated GithubRepo objects", () => {
            const repos = [
                { fullName: "repo1", updatedAt: new Date("2022-01-01") },
                { fullName: "repo2", updatedAt: new Date("2022-02-01") },
                { fullName: "repo3", updatedAt: new Date("2022-03-01") },
                { fullName: "repo4", updatedAt: new Date("2022-04-01") },
                { fullName: "repo5", updatedAt: new Date("2022-05-01") },
            ];

            const result = getLastUpdatedRepos(repos, 3);

            expect(result).toEqual([
                { fullName: "repo5", updatedAt: new Date("2022-05-01") },
                { fullName: "repo4", updatedAt: new Date("2022-04-01") },
                { fullName: "repo3", updatedAt: new Date("2022-03-01") },
            ]);
        });

        test("returns an empty array if no repos are provided", () => {
            const repos = [];
            const result = getLastUpdatedRepos(repos, 3);
            expect(result).toEqual([]);
        });
    });

    describe("sumRepositoryStars", () => {
        test("returns the sum of starsCount for all GithubRepo objects", () => {
            const repos = [
                { fullName: "repo1", starsCount: 10 },
                { fullName: "repo2", starsCount: 20 },
                { fullName: "repo3", starsCount: 30 },
                { fullName: "repo4", starsCount: 40 },
                { fullName: "repo5", starsCount: 50 },
            ];

            const result = sumRepositoryStars(repos);
            expect(result).toBe(150);
        });

        test("returns 0 if no repos are provided", () => {
            const repos = [];
            const result = sumRepositoryStars(repos);
            expect(result).toBe(0);
        });
    });
});
