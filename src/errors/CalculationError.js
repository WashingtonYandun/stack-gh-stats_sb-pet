export class CalculationError extends Error {
    constructor(message) {
        super(message);
        this.name = "CalculationError";
        this.description = "An error occurred while making calculations.";
    }
}
