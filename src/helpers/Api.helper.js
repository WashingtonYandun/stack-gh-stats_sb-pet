import { FetchError, ConnectionError, ForbiddenError, LogicError } from "../errors/ErrorFactory.js";

export const fetchData = async (url) => {
    try {
        const response = await fetch(url, {
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
        const repos = await fetchData(url);
        if (repos === null || repos.length === 0) {
            return allRepos;
        }
        const newRepos = allRepos.concat(repos);
        const newPage = page + 1;
        return fetchAllRepos(`${url}?per_page=100&page=${newPage}`, newPage, newRepos);
    } catch (error) {
        throw new LogicError(error.message);
    }
};
