/*
 * Public API Surface of nguard
 */

// Interfaces (Config types for directives)
export * from './lib/interfaces/alpha-directive-config.interface';
export * from './lib/interfaces/alpha-dash-directive-config.interface';
export * from './lib/interfaces/alpha-num-directive-config.interface';
export * from './lib/interfaces/comparable.interface';
export * from './lib/interfaces/required-if-config.interface';

// Utility types
export { primitive } from './lib/utils/validators.utils';

// Directives
// - multi
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
export * from './lib/directives/number/nguard-range.directive';
// - string
export * from './lib/directives/string/nguard-alpha-dash.directive';
export * from './lib/directives/string/nguard-alpha-num.directive';
export * from './lib/directives/string/nguard-alpha.directive';
export * from './lib/directives/string/nguard-ascii.directive';
export * from './lib/directives/string/nguard-lowercase.directive';
export * from './lib/directives/string/nguard-uppercase.directive';
export * from './lib/directives/string/nguard-url.directive';

// Validators
export * from './lib/validators/nguard.validators';
