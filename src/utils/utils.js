import { GithubRepoBuilder } from "../models/GithubRepo.js";
import { API } from "../constants/Constants.js";
import { fetchAllRepos } from "./Api.js";
import { GithubRepoBuilderError } from "../errors/ErrorFactory.js";

export const mapResponseToGithubRepos = (response) => {
    try {
        return response.map((repo) => {
            return new GithubRepoBuilder()
                .setFullName(repo.full_name)
                .setDescription(repo.description)
                .setLicense(repo.license)
                .setTopics(repo.topics)
                .setHtmlUrl(repo.html_url)
                .setStarsCount(repo.stargazers_count)
                .setForksCount(repo.forks_count)
                .setWatchersCount(repo.watchers_count)
                .setLanguage(repo.language)
                .setLanguagesUrl(repo.languages_url)
                .setCreatedAt(repo.created_at)
                .setUpdatedAt(repo.updated_at)
                .setPushedAt(repo.pushed_at)
                .build();
        });
    } catch (error) {
        throw new GithubRepoBuilderError(error.message);
    }
};

export const buildUrl = (url, page) => {
    return `${url}?per_page=100&page=${page}`;
};

export const getGithubRepos = async () => {
    const repos = await fetchAllRepos(buildUrl(API.GITHUB_API_URL, 1));
    return mapResponseToGithubRepos(repos);
};

export const filterReposByStars = (repos, stars) => {
    return repos.filter((repo) => {
        return repo.starsCount > stars;
    });
};

export const getLastUpdatedRepos = (repos, count = 5) => {
    return repos.sort((a, b) => b.updatedAt - a.updatedAt).slice(0, count);
};

export const sumRepositoryStars = (repos) => {
    return repos.reduce((total, repo) => {
        return total + repo.starsCount;
    }, 0);
};
