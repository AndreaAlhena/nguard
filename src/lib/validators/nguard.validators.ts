import { MultiValidators } from "./multi.validators";
import { NumberValidators } from "./number.validators";
import { StringValidators } from "./string.validators";

export namespace NguardValidators {
  export const Multi = MultiValidators;
  export const Number = NumberValidators;
  export const String = StringValidators;  
}
