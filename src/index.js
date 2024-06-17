import {
    getGithubRepos,
    getLastUpdatedRepos,
    sumRepositoryStars,
    filterReposByStars,
} from "../src/helpers/Core.helper.js";

import { manageError } from "../src/helpers/Error.helper.js";

export const main = async () => {
    try {
        const repos = await getGithubRepos();

        const moreThan = filterReposByStars(repos, 5);
        console.log("MORE THAN K STARS", moreThan);

        const lastUpdated = getLastUpdatedRepos(repos, 5);
        console.log("UPDATED", lastUpdated);

        const totalStars = sumRepositoryStars(repos);
        console.log("SUM STARS", totalStars);
    } catch (error) {
        manageError(error);
    }
};

main();
