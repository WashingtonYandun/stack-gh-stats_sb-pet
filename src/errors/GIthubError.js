export class GithubError extends Error {
    constructor(message) {
        super(message);
        this.name = "GithubError";
        this.description = "An error occurred while fetching the Github API";
    }
}
