/*
 * Public API Surface of nguard
 */

// Types (config shapes for directives)
export * from './lib/types/charset-config.type';
export * from './lib/types/field-comparison-config.type';
export * from './lib/types/field-condition-config.type';

// Utility types
export type { primitive } from './lib/utils/validators.utils';

// Directives
// - multi
export * from './lib/directives/multi/nguard-confirmed.directive';
export * from './lib/directives/multi/nguard-different.directive';
export * from './lib/directives/multi/nguard-doesnt-end-with.directive';
export * from './lib/directives/multi/nguard-doesnt-start-with.directive';
export * from './lib/directives/multi/nguard-ends-with.directive';
export * from './lib/directives/multi/nguard-greater-than.directive';
export * from './lib/directives/multi/nguard-greater-than-or-equal.directive';
export * from './lib/directives/multi/nguard-lesser-than.directive';
export * from './lib/directives/multi/nguard-lesser-than-or-equal.directive';
export * from './lib/directives/multi/nguard-required-if.directive';
export * from './lib/directives/multi/nguard-same.directive';
export * from './lib/directives/multi/nguard-starts-with.directive';
// - number
export * from './lib/directives/number/nguard-between.directive';
export * from './lib/directives/number/nguard-integer.directive';
export * from './lib/directives/number/nguard-max.directive';
export * from './lib/directives/number/nguard-min.directive';
export * from './lib/directives/number/nguard-negative.directive';
export * from './lib/directives/number/nguard-numeric.directive';
export * from './lib/directives/number/nguard-positive.directive';
export * from './lib/directives/number/nguard-range.directive';
// - string
export * from './lib/directives/string/nguard-alpha-dash.directive';
export * from './lib/directives/string/nguard-alpha-num.directive';
export * from './lib/directives/string/nguard-alpha.directive';
export * from './lib/directives/string/nguard-ascii.directive';
export * from './lib/directives/string/nguard-email.directive';
export * from './lib/directives/string/nguard-json.directive';
export * from './lib/directives/string/nguard-lowercase.directive';
export * from './lib/directives/string/nguard-not-blank.directive';
export * from './lib/directives/string/nguard-not-regex.directive';
export * from './lib/directives/string/nguard-regex.directive';
export * from './lib/directives/string/nguard-uppercase.directive';
export * from './lib/directives/string/nguard-url.directive';

// Validators
export * from './lib/validators/nguard.validators';
