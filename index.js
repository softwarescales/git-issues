var util = require('util');
var prompt = require('prompt');
var request = require('request');
var argv = require('optimist')
    .alias('username', 'u')
    .alias('password', 'p')
    .alias('repo', 'r')
    .argv;

/**************************************************************************/
/* CONFIGURATION                                                          */
/**************************************************************************/

var CONFIG = {
    numberLength: 5,
    titleLength: 60,
    stateLength: 12,
    longValueSuffix: ' …',
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
    },
    validRepoUrls: {
        ssh: /^(.+)@(.+)(\.com|\.org):(.+)\/(.+)\.git$/,
        https: /^https:\/\/(.+@)?(.+)(\.com|\.org)\/(.+)\/(.+)\.git$/,
        git: /^git:\/\/(.+@)?(.+)(\.com|\.org)\/(.+)\/(.+)\.git$/
    },
    issueApiUrlFormats: {
        'github': 'https://api.github.com/repos/%s/%s/issues',
        'bitbubket': 'https://bitbucket.org/api/1.0/repositories/%s/%s/issues'
    },
    issueFormatString: '| %s | %s | %s |'
};

CONFIG.numberSpaces = new Array(CONFIG.numberLength + 1).join(' ');
CONFIG.titleSpaces = new Array(CONFIG.titleLength + 1).join(' ');
CONFIG.stateSpaces = new Array(CONFIG.stateLength + 1).join(' ');
CONFIG.separatorLine = new Array((util.format(CONFIG.issueFormatString, CONFIG.numberSpaces, CONFIG.titleSpaces, CONFIG.stateSpaces)).length + 1).join('-');

/**************************************************************************/


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
if (['github', 'bitbubket'].indexOf(son.source) === -1) {
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
    getIssues(son, user, !argv['password'], issuesCallback);
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

    printHeader();

    for (var i in issues) {
        printIssue(issues[i]);
        //console.log(issues[i]);
    }

    printFooter();
}

/**************************************************************************/
/* IMPLEMENTATION FUNCTIONS
/**************************************************************************/

function getIssues(son, user, pass, callback) {

    var urlFormat = CONFIG.issueApiUrlFormats[son.source];
    if (!urlFormat) {
        return callback('Missing issue API url format for source: ' + son.source);
    }

    var options = {
        url: util.format(urlFormat, son.owner, son.name),
        json: true
    };

    // if a user is provided we
    if (user) {
        options.auth = {
            user: user,
            pass: pass
        };
    }

    // fetch the issues from the web
    request.get(options, function(err, response, issues) {

        if (err) {
            return callback(err);
        }

        if (response.statusCode != 200) {
            return callback('Authentication failed');
        }

        // TODO convert form provider format to a common nternal one

        callback(null, issues);
    });
}

function printIssue(issue) {

    var number = (CONFIG.numberSpaces + issue.number).substr(-CONFIG.numberLength);

    var title = issue.title;
    title = title.length > CONFIG.titleLength ? title.substr(0, CONFIG.titleLength - CONFIG.longValueSuffix.length) + CONFIG.longValueSuffix : title;
    title = (title + CONFIG.titleSpaces).substr(0, CONFIG.titleLength);

    var state = (issue.state.toUpperCase() + CONFIG.stateSpaces).substr(0, CONFIG.stateLength);

    console.log(CONFIG.issueFormatString, number, title, state);
}

function printHeader() {
    console.log('issues for repo: ' + argv['repo']);
    console.log(CONFIG.separatorLine);
    printIssue({ number: '#', title: 'Title', state: 'Status' });
    console.log(CONFIG.separatorLine);
}

function printFooter() {
    console.log(CONFIG.separatorLine);
}

function extractSONFromFromUrl(url) {

    var match = url.match(/^(.{3,5}):\/\//);
    var proto = 'ssh';

    if (match) {
        proto = match[1];
    }

    if (!CONFIG.validRepoUrls[proto]) {
        console.error('Repository URL protocol not supported: ' + proto);
        process.exit(11);
    }

    match = url.match(CONFIG.validRepoUrls[proto]);
    var son = {
        source: match[2].toLowerCase(),
        owner: match[4],
        name: match[5]
    };

    return son;
}

/**************************************************************************/

