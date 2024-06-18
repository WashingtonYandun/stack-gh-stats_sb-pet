export class GithubRepo {
    constructor(builder) {
        this.name = builder.name;

        this.description = builder.description;
        this.license = builder.license;
        this.htmlUrl = builder.htmlUrl;

        this.starsCount = builder.starsCount;
        this.forksCount = builder.forksCount;
        this.watchersCount = builder.watchersCount;

        this.language = builder.language;

        this.createdAt = new Date(builder.createdAt);
        this.updatedAt = new Date(builder.updatedAt);
        this.pushedAt = new Date(builder.pushedAt);
    }
}

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
        this.license = license && license.name ? license.name : "N/A";
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
