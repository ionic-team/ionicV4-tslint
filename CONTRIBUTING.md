# Contributing

1. Clone the repo
1. `npm install`
1. `npm run build` to build source code
1. `npm run test` to run tests

### Workflow

This repo uses [semantic-release](https://github.com/semantic-release/semantic-release), so it's important to follow a strict workflow to ensure properly automated releases.

* Work off of `develop` branch (create new branch or fork)
* Make changes with relevant test changes
* Use `npm run cz` (or `git cz` if [commitizen](https://github.com/commitizen/cz-cli) is installed globally) to make commits
* Create a pull request
    * Pull requests will be approved and squashed into the `develop` branch
    * Try to make pull requests with a single objective (don't have multiple features in one PR, don't mix fixes and features in one PR, etc.)

### Developing Rules

Rules generally comprise two parts: a `Rule` class and a `RuleWalker` class. Rules which operate on TypeScript code can use extend `RuleWalker` directly from `tslint`, but rules which operate on markup or styles must use the `NgWalker` from [codelyzer](https://github.com/mgechev/codelyzer).

#### Resources

* [Developing TSLint rules](https://palantir.github.io/tslint/develop/custom-rules/)

### Linking the Rules into a Project

Do not use `npm link`!

1. `npm run tsc:watch` to watch for source changes
1. Copy the rules into your project's `node_modules`:

    ```
    rsync --exclude node_modules --exclude .git -rv /path/to/v4-migration-tslint node_modules/@ionic
    ```

1. Follow usage instructions in [`README.md`](https://github.com/ionic-team/v4-migration-tslint/blob/develop/README.md#how-to-use)

### Publishing

Releases are automated in CI using [semantic-release](https://github.com/semantic-release/semantic-release) when the `master` branch is pushed to Github. Rebase `develop` with `master`. Commits in `develop` should be appropriately formatted from the PR workflow (see [Workflow](#workflow)).
