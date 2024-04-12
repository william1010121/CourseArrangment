
var fetchCourse = require('./courseFetcher.js');
var fs = require('fs');

function CourseData(name, semester, department) {
    return fetchCourse(name, semester, department)
        .then((data) => {
            if(data["totalCount"] == 0) {
                throw new Error("No course found");
            }
            return data["courses"][0];
        });
}

module.exports = CourseData;