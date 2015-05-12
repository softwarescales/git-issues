var util = require('util');
var prompt = require('prompt');
var request = require('request');
var argv = require('optimist')
    .alias('username', 'u')
    .alias('password', 'p')
    .alias('repo', 'r')
    .alias('status', 's')
    .default('status', 'open')
    .argv;
var couleurs = require('couleurs')();
var Table = require('le-table');
var GitUrlParse = require('giturlparse');

// Table defaults
Table.defaults.marks = {
    nw: '┌'
  , n:  '─'
  , ne: '┐'
  , e:  '│'
  , se: '┘'
  , s:  '─'
  , sw: '└'
  , w:  '│'
  , b:  ' '
  , mt: '┬'
  , ml: '├'
  , mr: '┤'
  , mb: '┴'
  , mm: '┼'
};

/**************************************************************************/
/* CONFIGURATION                                                          */
/**************************************************************************/

var CONFIG = {
    promptSchema: {
        properties: {
            username: {
                pattern: /^[a-zA-Z\s\-]+$/,
                message: 'Name must be only letters, spaces, or dashes'
            },
            password: {
                description: 'Password:',
                hidden: true
            }
        }
    }
};

/**************************************************************************/

var status = argv['status'];
var stati = ['closed', 'open'];
if (stati.indexOf(status) === -1) {
    console.error('Invalid status choose one of: ' + stati.join(', '));
    process.exit(4);
}

prompt.override = argv;
prompt.message = '';
prompt.delimiter = '';

// if a user is present, it must be a strong
var user = argv['username'];
if (user !== undefined && typeof user !== 'string' || user === '') {
    console.error('The username (-u) must be a non-empty string');
    process.exit(1);
}

// extract and validate the source (github/bitbucket), owner, and name from the repo URL
var son = extractSONFromFromUrl(argv['repo']);
if (['github', 'bitbucket'].indexOf(son.source) === -1) {
    console.error('Repository source not supported: ' + son.source);
    process.exit(11);
}

// if a user is provided, we also need a password for the basic authentication
if (user && !argv['password']) {

    prompt.get(CONFIG.promptSchema, function(err, result) {

        if (err) {
            console.error(err);
            process.exit(2);
        }

        // fetch and print the issues
        getIssues(son, user, result.password, issuesCallback);
    });
} else {
    // fetch and print the issues
    getIssues(son, user, argv['password'], issuesCallback);
}

function issuesCallback(err, issues) {

    if (err) {
        console.error(err);
        process.exit(3);
    }

    if (!issues || issues.length === 0) {
        console.log('No issues in this repository');
        process.exit(0);
    }

    var table = new Table();
    table.addRow([
        couleurs.bold('#'),
        couleurs.bold('Title'),
        couleurs.bold('Status')
    ]);

    issues.sort(function (a, b) {
        return a.number > b.number;
    });

    for (var i in issues) {
        var cI = issues[i];
        table.addRow([cI.number, cI.title, cI.state.toUpperCase()]);
    }

    console.log(table.toString());
}

/**************************************************************************/
/* IMPLEMENTATION FUNCTIONS
/**************************************************************************/

function getIssues(son, user, pass, callback) {

    var provider;

    try {
        provider = require('./providers/' + son.source);
    } catch (err) {}

    if (!provider) {
        return callback('Provider not suppoerted: ' + son.source);
    }

    var repoIssueUrl = provider.getIssueApiUrl(son, { status: status });
    if (!repoIssueUrl) {
        return callback('Missing issue API url format for source: ' + son.source);
    }

    var options = {
        url: repoIssueUrl,
        json: true,
        headers: {
            'user-agent': 'git-issues NPM Module'
        }
    };

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

        if (response.statusCode != 200) {
            return callback(issueRespose.error || 'Error: ' + JSON.stringify(issueRespose));
        }

        // we convert the issues in a common format
        // (I took the GitHub format as example)
        callback(null, provider.convertIssues(issueRespose));
    });
}

function extractSONFromFromUrl(url) {


    var parsed = GitUrlParse(url);
    if (!parsed.source || !parsed.owner || !parsed.name) {
        console.error('Repository URL not supported: ' + parsed._);
        process.exit(11);
    }

    parsed.source = parsed.source.toLowerCase().replace(/\.com$/g, "");
    return parsed;
}

/**************************************************************************/
