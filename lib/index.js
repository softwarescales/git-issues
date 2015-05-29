// Dependencies
var GitUrlParse = require("giturlparse")
  , IsThere = require("is-there")
  , Gry = require("gry")
  , Request = require("request")
  ;

/*!
 * GitIssues
 *
 * @name GitIssues
 * @function
 * @return {GitIssues} The `GitIssues` instance.
 */
function GitIssues() {}

/**
 * fromProvider
 * Fetches the issues from provider.
 *
 * @name fromProvider
 * @function
 * @param {String} providerName The provider name (currently supported `"bitbucket"` and `"github"`).
 * @param {String} user The repository owner.
 * @param {String} repo The repository name.
 * @param {String} status The issue status.
 * @param {Function} callback The callback function.
 */
GitIssues.prototype.fromProvider = function (providerName, user, repo, status, callback) {
    providerName = providerName.toLowerCase().replace(/\.com$/g, "");

    var provider = null;
    try {
        provider = require("./providers/" + son.source);
    } catch (err) {}

    if (!provider) {
        return callback("Provider not suppoerted: " + son.source);
    }

    var repoIssueUrl = provider.getIssueApiUrl({
            owner: user
          , name: name
        }, {
            status: status
        })
      , options = {
            url: repoIssueUrl
          , json: true
          , headers: {
                "user-agent": "git-issues NPM Module"
            }
        }
      ;

    // if a user is provided we
    if (user) {
        options.auth = {
            user: user,
            pass: pass
        };
    }

    // fetch the issues from the web
    request.get(options, function(err, response, issueRespose) {

        if (err) {
            return callback(err);
        }

        if (issueRespose.message || issueRespose.error) {
            return callback(new Error(issueRespose.message || issueRespose.error));
        }

        if (!Array.isArray(issueRespose)) {
            return callback(new Error("Cannot fetch the issues."));
        }

        // we convert the issues in a common format
        // (I took the GitHub format as example)
        callback(null, provider.convertIssues(issueRespose));
    });
};

/**
 * fromPath
 * Fetches the issues by passing the local repository path.
 *
 * @name fromPath
 * @function
 * @param {String} path The path to the local repository.
 * @param {Function} callback The callback function.
 */
GitIssues.prototype.fromPath = function (path, callback) {

    if (!IsThere(path)) {
        return callback(new Error("The provided path doesn't exist."));
    }

    var self = this
      , repo = new Gry(path)
      , parsedUrl = null
      ;

    repo.exec("config --get remote.origin.url", function (err, stdout) {
        if (err) { return callback(err); }
        parsedUrl = GitUrlParse(stdout);
        self.fromProvider(parsedUrl, parsed.owner, parsed.name, callback);
    });
};

module.exports = new GitIssues();
