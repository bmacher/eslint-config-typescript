[![npm version](https://img.shields.io/npm/v/@bmacher/eslint-config-typescript)](https://www.npmjs.com/package/@bmacher/eslint-config-typescript/v/latest)
[![GitHub license](https://img.shields.io/github/license/bmacher/eslint-config-typescript.svg)](https://github.com/bmacher/eslint-config-typescript/blob/master/LICENSE)

# ESLint Config Typescript

> ESLint config  based on [AirBnB](https://github.com/airbnb/javascript) for TypeScript & CDK.

## Table of contents

- [Installation](#installation)
- [Usage](#usage)
- [Default Rules](#default-rules)
  - [import/prefer-default-export](#importprefer-default-export)
  - [max-params](#max-params)
  - [no-console](#no-console)
  - [@typescript-eslint/member-delimiter-style](#typescript-eslintmember-delimiter-style)
  - [@typescript-eslint/naming-convention](#typescript-eslintnaming-convention)
    - [Interface](#interface)
    - [Class](#class)
    - [Enum](#enum)
    - [Variable](#variable)
    - [Function](#function)
    - [ClassProperty](#classproperty)
    - [ObjectLiteralProperty](#objectliteralproperty)
- [CDK Rules](#cdk-rules)
  - [no-new](#no-new)
  - [@typescript-eslint/naming-convention](#typescript-eslintnaming-convention-1)
    - [ObjectLiteralProperty](#objectliteralproperty-1)
- [Overrides](#overrides)
  - [import/no-extraneous-dependencies](#importno-extraneous-dependencies)

## Installation 

```sh
yarn add --dev @bmacher/eslint-config-typescript

# Or with npm
npm install --save-dev @bmacher/eslint-config-typescript
```

## Usage

```ts
module.exports = {
  root: true,
  parserOptions: {
    project: './tsconfig.json'
  },
  extends: [
    "@bmacher/eslint-config-typescript",
    // Use this in CDK projects instead
    "@bmacher/eslint-config-typescript/cdk",
  ],
}
```

The short version `@bmacher/typescript` does also work. However, that is [not recommended by ESLint](https://eslint.org/docs/developer-guide/shareable-configs#npm-scoped-modules), as it can lead to name clashes.

## Default Rules

<!-- Template
Title

Description...

👎 Don't

```ts

```

👍 Do

```ts

``` 
-->

### [import/prefer-default-export](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/prefer-default-export.md)

Using default exports can lead to different names in imports. Therefore, named imports are preferred.

Value: `off`

👎 Don't

```ts
// bar-1.ts
import foo from 'foo';
foo.bar();

// bar-2.ts
import bar from 'foo';
bar.bar();
```

👍 Do

```ts
import { bar } from 'foo';
bar();
```

### [max-params](https://eslint.org/docs/rules/max-params)

Functions with too many parameters either do too much or introduce too many variables.

Value: `["error", 3]`

👎 Don't

```ts
function foo(a: string, b: string, c: string, d: string): void {}
```

👍 Do

```ts
interface FooProps {
  a: string;
  b: string; 
  c: string; 
  d: string;
}

function foo(props: FooProps): void {}

// OR if possible
function foo(a: string, b: string): Something {}
function bar(foo: Something,  c: string, d: string): void {}

const resultOfFoo = foo(...);
bar(resultOfFoo, ...)
```

### [no-console](https://eslint.org/docs/rules/no-console)

Logging should never be considered bad.

Value: `off`

### [@typescript-eslint/member-delimiter-style](https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/member-delimiter-style.md)

There should only be one delimiter for members in interfaces or types.

Value: `;`

### [@typescript-eslint/naming-convention](https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/naming-convention.md)

#### *Interface*

Value: `PascalCase` with no I prefix (`/^(?![I][A-Z])/`)

[Guideline](https://github.com/microsoft/TypeScript/wiki/Coding-guidelines#names) by TypeScript for contributors.

#### *Class*

Value: `PascalCase`

#### *Enum*

Value: `PascalCase`

#### *Variable*

Value: `camelCase, UPPER_CASE`

#### *Function*

Value: `camelCase`

#### *ClassProperty*

Value: `camelCase`

#### *ObjectLiteralProperty*

Value: `camelCase`

## CDK Rules

### no-new

Either `no-new` or `no-unused-var` would be thrown when you only need to create a resource but not using it elsewhere.

Value: `off`

Example

```ts
new Bucket(myStack, 'Bucket');
```

### @typescript-eslint/naming-convention

#### *ObjectLiteralProperty*

Environments of Lambdas (and any other place) should be UPPER_CASE and properties of CFN resources can be PascalCase as well. 

Value: `camelCase, UPPER_CASE, PascalCase`

## Overrides

### [import/no-extraneous-dependencies](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-extraneous-dependencies.md)

This rule is disabled in `scripts/**/*.js` and tests, because they are not part of the application/project but could need dedicated imports themselves (like `shelljs` or `axios` in tests) which should to be under `devDependencies`.
