import { getGithubRepos, getLastUpdatedRepos, sumRepositoryStars, filterReposByStars } from "../src/utils/Utils.js";

export const main = async () => {
    try {
        const repos = await getGithubRepos();
        console.log("REPOS", repos);

        const totalStars = sumRepositoryStars(repos);
        console.log("SUM STARS", totalStars);

        const lastUpdated = getLastUpdatedRepos(repos, 5);
        console.log("UPDATED", lastUpdated);

        const moreThan = filterReposByStars(repos, 5);
        console.log("MORE THAN K STARS", moreThan);
    } catch (error) {
        console.error(error);
    }
};

main();
