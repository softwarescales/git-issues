var util = require('util');

function getIssueApiUrl(son, options) {
    var options = options || {};

    var urlFormat = 'https://api.github.com/repos/%s/%s/issues?';

    // switch between the open and closed issued
    switch (options.status) {
        case 'open':
            urlFormat += 'state=open';
            break;
        case 'closed':
            urlFormat += 'state=closed';
            break;
        default:
            urlFormat += 'state=open';
    }

    return util.format(urlFormat, son.owner, son.name);
}

function convertIssues(issues) {
    return issues;
}

exports.convertIssues = convertIssues;
exports.getIssueApiUrl = getIssueApiUrl;
