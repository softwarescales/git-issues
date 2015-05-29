var util = require("util");

function getIssueApiUrl(son, options) {
    var options = options || {};

    var urlFormat = "https://bitbucket.org/api/1.0/repositories/%s/%s/issues?limit=50&";

    // switch between the open and closed issued
    switch (options.status) {
        case "open":
            urlFormat += "status=new";
            break;
        case "closed":
            urlFormat += "status=resolved";
            break;
        default:
            urlFormat += "status=new";
    }

    return util.format(urlFormat, son.owner, son.name);
}

function convertIssues(issues) {

    var newIssues = [];

    for (var i in issues.issues) {
        newIssues.push({
            number: issues.issues[i].local_id,
            title: issues.issues[i].title,
            state: issues.issues[i].status
        });
    }

    return newIssues;
}

exports.convertIssues = convertIssues;
exports.getIssueApiUrl = getIssueApiUrl;
