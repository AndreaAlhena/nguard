import { primitive } from "../utils/validators.utils";

export interface IRequiredIfConfig {
    fieldKey: string;
    isStrict?: boolean;
    value?: primitive;
}