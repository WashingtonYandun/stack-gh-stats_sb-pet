import { expect, test } from "vitest";

import { getGithubRepos } from "../../src/helpers/Core.helper.js";

test("getGithubRepos should return an array of repositories", async () => {
    const repos = await getGithubRepos();
    expect(Array.isArray(repos)).toBe(true);
});
