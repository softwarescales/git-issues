## Documentation

You can see below the API reference of this module.

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

