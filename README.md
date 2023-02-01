[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

# template-name: template-description

This is a template which Just Works™ for a new [TypeScript](https://typescriptlang.org/) project with simple layout. It provides a library, binary, and testsuite and runs on node.js and the browser.

It uses:

- [pnpm](https://pnpm.io) as the package-manager
- [tsc](https://typescriptlang.org/) to type-check
- [esbuild](https://esbuild.github.io/) to build code
- [ts-standard](https://standardjs.com/) (with a couple modifications via a custom script) to lint.
- [Apache 2.0](https://www.apache.org/licenses/LICENSE-2.0) as the license

Unlike some projects the type-checking and compiling are separate, so you can actually skip type-checking and compile the project using esbuild if you think your types are ok and don't want to wait. It also supports watching and a live-server for the binary (TODO: run tests in the browser).

Besides this description section, the following symbols should be replaced:

- `template-name`
- `template-description`
- `template-git-org`
- `template-npm-org`

The following sections can remain (after replacing the above keywords):

## Installing

template-name can be installed using [pnpm](https://pnpm.io/) (recommended). See https://pnpm.io/installation for how to install pnpm.

```shell
pnpm install @template-npm-org/template-name
```

Alternatively you can install template-name with [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) as it is on the NPM repo.

## Repository info (e.g. for contributing)

template-name was created from [template98](https://github.com/Jakobeha/template98.git), a template for general TypeScript packages.

It is built using [esbuild](https://esbuild.org/). The package manager used is [pnpm](https://pnpm.io/). Linting is done by [standard](https://standardjs.com/), however we use a *slightly* modified version removing some warnings which is run through `pnpm run lint` (specifically `node ts-standardx.mjs`).
