const errorFactory = (name, description) => {
    return class extends Error {
        constructor(message) {
            super(message);
            this.name = name;
            this.description = description;
        }
    };
};

export const FetchError = errorFactory("FetchError", "An error occurred while fetching the API");

export const ConnectionError = errorFactory("ConnectionError", "An error occurred while connecting to the API");

export const ForbiddenError = errorFactory(
    "ForbiddenError",
    "The server understood the request, but refuses to authorize it",
);

export const RecursiveError = errorFactory("RecursiveError", "An error occurred while calling a recursive function");

export const GithubRepoBuilderError = errorFactory(
    "GithubRepoBuilderError",
    "An error occurred while building the GithubRepo object",
);
