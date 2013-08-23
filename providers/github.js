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
