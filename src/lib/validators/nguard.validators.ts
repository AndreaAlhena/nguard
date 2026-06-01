import { ArrayValidators } from './array.validators';
import { AsyncValidators } from './async.validators';
import { BooleanValidators } from './boolean.validators';
import { CrossFieldValidators } from './cross-field.validators';
import { NumberValidators } from './number.validators';
import { StringValidators } from './string.validators';

export namespace NguardValidators {
    export const Array = ArrayValidators;
    export const Async = AsyncValidators;
    export const Boolean = BooleanValidators;
    export const CrossField = CrossFieldValidators;
    export const Number = NumberValidators;
    export const String = StringValidators;
}
