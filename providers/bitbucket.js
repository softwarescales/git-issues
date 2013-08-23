/******************************************************************************
Copyright (C) 2013 SoftwareScales GmbH

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
******************************************************************************/
var util = require('util');

function getIssueApiUrl(son, options) {
    var options = options || {};

    var urlFormat = 'https://bitbucket.org/api/1.0/repositories/%s/%s/issues?limit=50&';

    // switch between the open and closed issued
    switch (options.status) {
        case 'open':
            urlFormat += 'status=new';
            break;
        case 'closed':
            urlFormat += 'status=resolved';
            break;
        default:
            urlFormat += 'status=new';
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
