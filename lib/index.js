// Dependencies
var GitUrlParse = require("giturlparse")
  , IsThere = require("is-there")
  , Gry = require("gry")
  , Request = require("request")
  , Ul = require("ul")
  , Fs = require("fs")
  ;

// Constants
var GIT_ISSUES_CONFIG_PATH = Ul.USER_DIR + "/.git-issues.json";

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
 * @param {Object} auth The authorization object:
 *
 *  - `username` (String): The provider username.
 *  - `password` (String): The provider password/token.
 *
 * @param {Function} callback The callback function.
 */
GitIssues.prototype.fromProvider = function (providerName, user, repo, status, auth, callback) {
    providerName = providerName.toLowerCase().replace(/\.(com|org)$/g, "");

    var provider = null;
    try {
        provider = require("./providers/" + providerName);
    } catch (err) {}

    if (!provider) {
        return callback("Provider not suppoerted: " + providerName);
    }

    var repoIssueUrl = provider.getIssueApiUrl({
            owner: user
          , name: repo
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
      , conf = {}
      ;

    try {
        conf = require(GIT_ISSUES_CONFIG_PATH);
    } catch (e) {};

    auth = conf[providerName] = conf[providerName] || auth;

    if (auth && auth.username && auth.password) {
        options.auth = auth;
    } else {
        delete conf[providerName];
        delete options.auth
    }

    // fetch the issues from the web
    Request.get(options, function(err, response, issueRespose) {

        if (err) {
            return callback(err);
        }

        if (issueRespose && (issueRespose.message || issueRespose.error)) {
            return callback(new Error(issueRespose.message || issueRespose.error));
        }

        if (!Array.isArray(issueRespose) && issueRespose && !Array.isArray(issueRespose.issues)) {
            return callback(new Error("Cannot fetch the issues. Authentification needed?"));
        }

        Fs.writeFile(GIT_ISSUES_CONFIG_PATH, JSON.stringify(conf), function (err) {
            // we convert the issues in a common format
            // (I took the GitHub format as example)
            callback(null, provider.convertIssues(issueRespose));
        });
    });
};

/**
 * fromPath
 * Fetches the issues by passing the local repository path.
 *
 * @name fromPath
 * @function
 * @param {String} path The path to the local repository.
 * @param {String} status The issue status.
 * @param {Object} auth The authorization object:
 *
 *  - `username` (String): The provider username.
 *  - `password` (String): The provider password/token.
 *
 * @param {Function} callback The callback function.
 */
GitIssues.prototype.fromPath = function (path, status, auth, callback) {

    if (!IsThere(path)) {
        return callback(new Error("The provided path doesn't exist."));
    }

    var self = this
      , repo = new Gry(path)
      , parsedUrl = null
      ;

    repo.exec("config --get remote.origin.url", function (err, stdout) {
        if (err) { return callback(new Error("Cannot get the remote repository. Is this a git repository?")); }
        parsedUrl = GitUrlParse(stdout);
        self.fromProvider(parsedUrl.source, parsedUrl.owner, parsedUrl.name, status, auth, callback);
    });
};

module.exports = new GitIssues();
