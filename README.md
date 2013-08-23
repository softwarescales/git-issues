# git-issues

[![NPM](https://nodei.co/npm/git-issues.png)](https://nodei.co/npm/git-issues/)

## Description

`git issues` extension to list issues of a Git repository.

Install globally to have it automatically work (this command will probably require a `sudo`):

```bash
npm install -g git-issues
```

For non-global installs or repository clones, add the following path to your PATH (for example in `.bash_profile`):

```
<INSTALLED_OR_CLONE_LOCATION>/bin
```

## Usage

For public repositories:

```
$ git issues
issues for repo: git@github.com:softwarescales/git-issues.git
---------------------------------------------------------------------------------------
|     # | Title                                                        | STATUS       |
---------------------------------------------------------------------------------------
|     1 | Test issue 1                                                 | OPEN         |
---------------------------------------------------------------------------------------
```

For private repositories you must provide your Git provider username. If the password is not provided you will be prompted for one:

```
git issues -u gabipetrovay
Password:
jillix:git-issues gabriel$ git issues
issues for repo: git@github.com:softwarescales/git-issues.git
---------------------------------------------------------------------------------------
|     # | Title                                                        | STATUS       |
---------------------------------------------------------------------------------------
|     1 | Test issue 1                                                 | OPEN         |
---------------------------------------------------------------------------------------
```

## Git Providers

- currently only **GitHub** issues are supported
- TODO: add BitBucket issue support

## Change Log

#### 0.5.1

- added binary script such that the `git issues` command works automatically when installing this module globally: `npm install -g git-issues`

#### 0.5.0

- initial version with support for GitHub and listing in a table format
