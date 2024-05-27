import { ConnectionError, FetchError, ForbiddenError } from "../errors/ErrorFactory.js";

/**
 * GithubRepo model class
 * @class GithubRepo
 */
export class GithubRepo {
    /**
     * Create a GithubRepo.
     * @param {GithubRepoBuilder} builder - The builder object containing all properties.
     */
    constructor(builder) {
        this.name = builder.name;

        this.description = builder.description;
        this.license = builder.license;
        this.topics = builder.topics;
        this.htmlUrl = builder.htmlUrl;

        this.starsCount = builder.starsCount;
        this.forksCount = builder.forksCount;
        this.watchersCount = builder.watchersCount;

        this.language = builder.language;
        this.languagesUrl = builder.languagesUrl;

        this.createdAt = new Date(builder.createdAt);
        this.updatedAt = new Date(builder.updatedAt);
        this.pushedAt = new Date(builder.pushedAt);

        this.langStats = {};
        this.timeStats = {};
    }

    /**
     * Set the language statistics.
     * @param {Object} langStats - The language statistics object.
     */
    async setLangStats() {
        // get languages stats from languagesUrl
        try {
            const response = await fetch(this.languagesUrl, {
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

            const langStats = await response.json();
            this.langStats = langStats;
        } catch (error) {
            throw new FetchError(error.message);
        }
    }

    /**
     * Set the time statistics.
     * @param {Object} timeStats - The time statistics object.
     */

    setTimeStats() {}
}

/**
 * Class used to build a GithubRepo object.
 *
 * @class GithubRepoBuilder
 */
export class GithubRepoBuilder {
    setFullName(name) {
        this.name = name || "N/A";
        return this;
    }
    setDescription(description) {
        this.description = description || "N/A";
        return this;
    }
    setLicense(license) {
        this.license = license ? license.name : "N/A";
        return this;
    }
    setTopics(topics) {
        this.topics = topics || ["N/A"];
        return this;
    }
    setHtmlUrl(htmlUrl) {
        this.htmlUrl = htmlUrl || "N/A";
        return this;
    }
    setStarsCount(starsCount) {
        this.starsCount = starsCount || 0;
        return this;
    }
    setForksCount(forksCount) {
        this.forksCount = forksCount || 0;
        return this;
    }
    setWatchersCount(watchersCount) {
        this.watchersCount = watchersCount || 0;
        return this;
    }
    setLanguage(language) {
        this.language = language || "N/A";
        return this;
    }
    setLanguagesUrl(languagesUrl) {
        this.languagesUrl = languagesUrl || "N/A";
        return this;
    }
    setCreatedAt(createdAt) {
        this.createdAt = createdAt || new Date();
        return this;
    }
    setUpdatedAt(updatedAt) {
        this.updatedAt = updatedAt || new Date();
        return this;
    }
    setPushedAt(pushedAt) {
        this.pushedAt = pushedAt || new Date();
        return this;
    }
    build() {
        return new GithubRepo(this);
    }
}
