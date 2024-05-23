export class MapperError extends Error {
    constructor(message) {
        super(message);
        this.name = "MapperError";
        this.description = "An error occurred while mapping the response";
    }
}
