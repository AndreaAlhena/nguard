import { CrossFieldValidators } from './cross-field.validators';
import { NumberValidators } from './number.validators';
import { StringValidators } from './string.validators';

export namespace NguardValidators {
    export const CrossField = CrossFieldValidators;
    export const Number = NumberValidators;
    export const String = StringValidators;
}
