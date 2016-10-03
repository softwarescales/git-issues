
# `$ git-issues`

 [![Version](https://img.shields.io/npm/v/git-issues.svg)](https://www.npmjs.com/package/git-issues) [![Downloads](https://img.shields.io/npm/dt/git-issues.svg)](https://www.npmjs.com/package/git-issues)

> Git issues extension to list issues of a Git project

## :cloud: Installation

You can install the package globally and use it as command line tool:


```sh
$ npm i -g git-issues
```


Then, run `git-issues --help` and see what the CLI tool can do.


```
$ git-issues --help
Usage: git-issues [options]

Options:
  -u, --user <username>      The provider username.
  -p, --password <password>  The provider password or token.
  -r, --repo <path>          The path to the repository.
  -s, --status <path>        The path to the repository.
  -h, --help                 Displays this help.
  -v, --version              Displays version information.

Examples:
  git-issues # No authentification for public repositories
  git-issues -u your-username -p 'your-password'
  git-issues -r ../another-repository
  git-issues -s 'assigned'

Documentation can be found at https://github.com/SoftwareScales/git-issues
```

## :memo: Documentation

For full API reference, see the [DOCUMENTATION.md][docs] file.

## :yum: How to contribute
Have an idea? Found a bug? See [how to contribute][contributing].

## :dizzy: Where is this library used?
If you are using this library in one of your projects, add it in this list. :sparkles:


 - [`git-egylet`](https://github.com/kzhunbp/git-egylet#readme) (by kzhunbp)—Use git more easier

## :scroll: License

[MIT][license] © [Gabriel Petrovay][website]

[license]: http://showalicense.com/?fullname=Gabriel%20Petrovay%20%3Cgabipetrovay%40gmail.com%3E&year=2013#license-mit
[website]:
[contributing]: /CONTRIBUTING.md
[docs]: /DOCUMENTATION.md
