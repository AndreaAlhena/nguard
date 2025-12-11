export namespace RangeValidatorErrors {
    export class MinGreaterThanMax extends Error {
        constructor() {
            super('Min cannot be greater than Max');
        }
    }
}
