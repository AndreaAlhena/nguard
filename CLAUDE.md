# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

The validator catalog, usage and architecture notes live in the documentation
site in [docs/](docs/) — read them there, they are not repeated here. This file
is only the conventions, which the docs do not cover.

## Comments

The rule most often broken here.

- Always JSDoc (`/** */`), never `//`.
- Write one only if deleting it would let someone break something: a footgun, a
  non-obvious constraint, or why the tempting alternative is wrong. The JSDoc on
  a public validator or directive is the exception: it is the library's API
  documentation and stays, usage example included.
- Never comment on the codebase's own conventions — file placement, naming,
  alphabetical ordering, section labels over a group of imports or exports, or
  explanations of TypeScript to a TypeScript reader. A comment that restates the
  filename or a rule visible in the file is noise.
- The only `//` allowed is an `eslint-disable-next-line <rule> -- <why>`
  directive, and it always says why.
- No TODO comments. Unfinished work is an issue on the board; the code says
  nothing about it until it is done.

## Layout

- The library is organised **by data type**. A validator lives in the namespace
  of the data it operates on (`NguardValidators.String`, `.Number`, `.Array`,
  `.Boolean`, `.Async`); `CrossField` is reserved for relations that are
  genuinely type-agnostic, such as equality between two fields.
- **The type suffix decides the folder**, and it is the plural of the suffix:
  `.directive.ts` → `directives/<namespace>/`, `.validators.ts` → `validators/`,
  `.type.ts` → `types/`, `.errors.ts` → `errors/`, `.helper.ts` → `helpers/`,
  `.interface.ts` → `interfaces/`, `.enum.ts` → `enums/`. There is no
  `support/` or `utils/` — a folder named for nothing in particular ends up
  holding everything.
- **A folder holding one file is still the right folder.** The first enum gets
  `enums/`, not a spot at the root until a second one shows up.
- One interface, enum or type alias per file. A constant only one of them uses
  sits in that one's file.
- A namespace file (`string.validators.ts`) is one drawer: its validators sorted
  alphabetically, not one file per validator.
- Every validator ships with its directive, and both with a spec. A directive is
  standalone, uses signal inputs (`input()` / `input.required()`), is
  registered through `NG_VALIDATORS` or `NG_ASYNC_VALIDATORS`, and its selector
  is the `nguard`-prefixed camelCase name of the validator (`[nguardMinSize]`).
  It holds no logic of its own: `validate` delegates to the namespace function.
- Everything public is exported from `src/public-api.ts`. A file it does not
  export is internal, whatever its `export` keywords say.
- No module-level functions in a file that defines a class — extract them to a
  `.helper.ts`.
- Logic needed in a second place is extracted, never copied. Search for it
  before writing a helper; if it exists, move both into a shared helper and
  turn a per-caller difference into a parameter with a default rather than a
  fork. Copies drift apart one correct-looking file at a time.
- A spec file defines no functions, even one only that spec uses. Control and
  fixture builders (`createAbstractControlSpy`, `createDirectiveFixture`) live
  in the shared test helpers, which are compiled by `tsconfig.spec.json` only
  and never ship.
- A class that exists only to carry the directive under test is the test's
  input, not a helper: it stays in its spec, beside the assertions that depend
  on it. A directive is proven by a spec of its own, never only through the
  validator it delegates to.

## Code

- Alphabetical wherever order means nothing: class and object members,
  namespace members, interface and type members, config maps, named imports,
  public-api exports within a group, docs sidebar entries. Order that means
  something stays — a priority list, a fallback chain. Lint enforces it for
  class members, interfaces and type literals: fields, then the constructor,
  then methods, each group alphabetical.
- `_` prefixes private members (`private readonly _injector`), so visibility
  is readable at the call site. Lint enforces it.
- No `I` prefix on an interface — Angular's own (`Validator`,
  `AsyncValidator`) have none, and lint refuses one.
- Public members say `public`.
- A function body declares first — destructuring, derived values, named
  predicates (`const hasTriggerValue = …`) — then a blank line, then guards,
  branches and the return. A condition that means something gets a name above
  the line instead of being written inside the `if`.
- `control.value` is `any`. Read it into a `const value: unknown = c.value`
  and narrow from there; lint's `no-unsafe-*` rules refuse an `any` flowing
  into a call, member access or return.
- Every promise is awaited, returned or explicitly `void`ed; lint makes a
  floating one an error.
- A type-only import says so: `import type { X }`, or `{ type X }` in an import
  that also brings a value. `npm run lint:fix` marks them.
- Values that are design decisions (a debounce time, a default charset) are
  named constants, not magic numbers inline.

## Working in this repo

- Formatting is Prettier (2 spaces, single quotes, trailing commas, 80
  columns); lint runs it as a rule. `npm run lint:fix` rewrites files.
- Tests are Jasmine on Karma: `npm test` for one run, `npm run test-dev` to
  watch. A spec name is a present-tense sentence about the behaviour (`should
  fail when the sibling is missing`).
- The pre-commit hook runs lint-staged; the pre-push hook runs the full lint
  and test suite. Neither is skipped.
- Every task starts as a GitHub issue. Its branch is `feature/<issue number>`,
  cut from `origin/develop` — the local `develop` can lag behind.
- Commits are atomic: one logical change each, formatting split from
  behaviour. Subjects follow Conventional Commits and stay short
  (`feat(array): …`, `chore(lint): …`). No `Co-Authored-By` trailer.

## Documentation

- The docs site in `docs/` (Docusaurus) is the only home of the validator
  reference and the architecture notes. `README.md` only points there; nothing
  is documented twice.
- A new or changed validator updates its page under
  `docs/docs/validators/<namespace>/` and the sidebar in the same commit.
- Every release commit (`chore(release): vX.Y.Z`) adds its section to
  `CHANGELOG.md` (Keep a Changelog), bumps `package.json`, and snapshots the
  docs as a Docusaurus version (`versioned_docs/`, `versions.json`).
- `docs/` is a separate package with its own lockfile, never imported by the
  library, and excluded from lint and Prettier.
