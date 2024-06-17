const errorFactory = (name, description) => {
    return class extends Error {
        constructor(message) {
            super(message);
            this.name = name;
            this.description = description;
        }
    };
};

export const manageError = (error) => {
    switch (error.name) {
        case "FetchError":
        case "ConnectionError":
        case "ForbiddenError":
        case "LogicError":
        case "GithubRepoBuilderError":
        case "UnkwownError":
            console.error(error);
            break;
        default:
            console.error(new UnkwownError(error.message));
            break;
    }
};

export const FetchError = errorFactory("FetchError", "An error occurred while fetching the API");

export const ConnectionError = errorFactory("ConnectionError", "An error occurred while connecting to the API");

export const ForbiddenError = errorFactory(
    "ForbiddenError",
    "The server understood the request, but refuses to authorize it",
);

export const LogicError = errorFactory("LogicError", "An error occurred while calling a recursive function");

export const GithubRepoBuilderError = errorFactory(
    "GithubRepoBuilderError",
    "An error occurred while building the GithubRepo object",
);

export const UnkwownError = errorFactory("UnkwownError", "An unexpected error occurred");
