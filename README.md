# git-issues
Git issues extension to list issues of a Git project

[![NPM](https://nodei.co/npm/git-issues.png)](https://nodei.co/npm/git-issues/)

## Installation
Install globally to have it automatically work (this command will probably
require a `sudo`):

```sh
npm install -g git-issues
```

Or you can clone this repository locally:

```sh
$ git clone git://github.com/softwarescales/git-issues.git git-issues
$ cd git-issues
$ npm install
$ ./bin/git-issues --help
# Optionally, you can use this installation globally using:
$ npm link
```

## Usage
For public repositories:

```
$ git issues
┌──┬─────────────────────────────────────────────────────────────────────────┬────────┐
│# │Title                                                                    │Status  │
├──┼─────────────────────────────────────────────────────────────────────────┼────────┤
│1 │Test issue Open (Do not close!)                                          │OPEN    │
├──┼─────────────────────────────────────────────────────────────────────────┼────────┤
│7 │Cache user & password or access token into a file                        │OPEN    │
├──┼─────────────────────────────────────────────────────────────────────────┼────────┤
│10│feature #7                                                               │OPEN    │
├──┼─────────────────────────────────────────────────────────────────────────┼────────┤
│11│Error: Cannot find module '/usr/bin/lib/node_modules/git-issues/index.js'│OPEN    │
└──┴─────────────────────────────────────────────────────────────────────────┴────────┘
```

For private repositories you must provide your Git provider username and password.

```
$ git issues -u your-username -p 'your-password'
```

For more information about how to use this tool run:

```sh
$ git issues -h
```

:bulb: The credentials are stored in `~/.git-issues.json`.

## Documentation
### `fromProvider(providerName, user, repo, status, auth, callback)`
Fetches the issues from provider.

#### Params
- **String** `providerName`: The provider name (currently supported `"bitbucket"` and `"github"`).
- **String** `user`: The repository owner.
- **String** `repo`: The repository name.
- **String** `status`: The issue status.
- **Object** `auth`: The authorization object:
 - `username` (String): The provider username.
 - `password` (String): The provider password/token.

- **Function** `callback`: The callback function.

### `fromPath(path, status, auth, callback)`
Fetches the issues by passing the local repository path.

#### Params
- **String** `path`: The path to the local repository.
- **String** `status`: The issue status.
- **Object** `auth`: The authorization object:
 - `username` (String): The provider username.
 - `password` (String): The provider password/token.
- **Function** `callback`: The callback function.

## How to contribute
1. File an issue in the repository, using the bug tracker, describing the
   contribution you'd like to make. This will help us to get you started on the
   right foot.
2. Fork the project in your account and create a new branch:
   `your-great-feature`.
3. Commit your changes in that branch.
4. Open a pull request, and reference the initial issue in the pull request
   message.

## License
See the [LICENSE](./LICENSE) file.
