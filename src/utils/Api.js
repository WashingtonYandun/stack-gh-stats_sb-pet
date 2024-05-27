import { FetchError, ConnectionError, ForbiddenError, RecursiveError } from "../errors/ErrorFactory.js";
import { buildUrl } from "../utils/Utils.js";

export const fetchData = async (url, page) => {
    try {
        const response = await fetch(buildUrl(url, page), {
            method: "GET",
            headers: {
                Accept: "application/vnd.github.v3+json",
            },
        });

        if (!response.ok) {
            throw new ConnectionError("Failed to fetch data");
        } else if (response.status === 403) {
            throw new ForbiddenError("Forbidden to fetch Github data");
        }

        return await response.json();
    } catch (error) {
        throw new FetchError(error.message);
    }
};

export const fetchAllRepos = async (url, page = 1, allRepos = []) => {
    try {
        const repos = await fetchData(url, page);
        if (repos === null || repos.length === 0) {
            return allRepos;
        }
        const newRepos = allRepos.concat(repos);
        return fetchAllRepos(url, page + 1, newRepos);
    } catch (error) {
        throw new RecursiveError(error.message);
    }
};
