# Git Issues
[![NPM](https://nodei.co/npm/git-issues.png)](https://nodei.co/npm/git-issues/)

## Description
`git issues` extension to list issues of a Git repository.

Install globally to have it automatically work (this command will probably require a `sudo`):

```bash
npm install -g git-issues
```

For non-global installs or repository clones, add the following path to your `PATH` (for example in `.bash_profile`):

```
<INSTALLED_OR_CLONE_LOCATION>/bin
```

## Usage
For public repositories:

```
$ git issues
┌─┬─────────────────────────────────────────────────┬─────────────────────────────────────────────────┐
│#│Title                                            │Status                                           │
├─┼─────────────────────────────────────────────────┼─────────────────────────────────────────────────┤
│1│Test issue Open (Do not close!)                  │OPEN                                             │
├─┼─────────────────────────────────────────────────┼─────────────────────────────────────────────────┤
│4│Use le-table instead                             │OPEN                                             │
├─┼─────────────────────────────────────────────────┼─────────────────────────────────────────────────┤
│5│Cannot read property '2' of null                 │OPEN                                             │
├─┼─────────────────────────────────────────────────┼─────────────────────────────────────────────────┤
│7│Cache user & password or access token into a file│OPEN                                             │
└─┴─────────────────────────────────────────────────┴─────────────────────────────────────────────────┘
```

For private repositories you must provide your Git provider username. If the password is not provided you will be prompted for one:

```
$ git issues -u gabipetrovay
Password:
┌─┬─────────────────────────────────────────────────┬─────────────────────────────────────────────────┐
│#│Title                                            │Status                                           │
├─┼─────────────────────────────────────────────────┼─────────────────────────────────────────────────┤
│1│Test issue Open (Do not close!)                  │OPEN                                             │
├─┼─────────────────────────────────────────────────┼─────────────────────────────────────────────────┤
│4│Use le-table instead                             │OPEN                                             │
├─┼─────────────────────────────────────────────────┼─────────────────────────────────────────────────┤
│5│Cannot read property '2' of null                 │OPEN                                             │
├─┼─────────────────────────────────────────────────┼─────────────────────────────────────────────────┤
│7│Cache user & password or access token into a file│OPEN                                             │
└─┴─────────────────────────────────────────────────┴─────────────────────────────────────────────────┘
```

### Arguments
 - `username|u`: the Git provider username (mandatory for private repositories or private issue trackers)
 - `password|p`: the Git provider user password (considered only if the `username` is provided)
 - `status|s`: the type of issues to return. Must be one of: `open` (default), `closed`

## Git Providers
 - both **GitHub** and **BitBucket** repositories are supported

## Changelog
### `0.5.1`
 - added support for BitBucket
 - added command line issue status filtering (`open` and `close`)

### `0.5.0`
 - initial version with support for GitHub and listing in a table format
 - binary script that works for global installations: `npm install -g git-issues`
