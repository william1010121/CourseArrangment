var axios = require('axios');
var cheerio = require('cheerio');

function fetchCourse(courseName, semester, department)  {
  console.log(`Fetching course: ${courseName} in semester ${semester} from department ${department}`);
  playload = {
      "query": {
        "keyword": courseName,
        "time": [
          [],
          [],
          [],
          [],
          [],
          []
        ],
        "timeStrictMatch": false,
        "isFullYear": null,
        "excludedKeywords": [],
        "enrollMethods": [],
        "isEnglishTaught": false,
        "isDistanceLearning": false,
        "hasChanged": false,
        "isAdditionalCourse": false,
        "noPrerequisite": false,
        "semester": semester,
        "isPrecise": true,
        "departments": department,
        "isCompulsory": null,
        "department": null,
        "suggestedGrade": null,
        "departmentCourseType": null,
        "generalCourseTypes": [],
        "commonTargetDepartments": [],
        "commonCourseTypes": [],
        "peArmyCourseTypes": [],
        "programs": [],
        "courseProviders": [],
      },
      "batchSize": 25,
      "pageIndex": 0,
      "sorting": "correlation"
    };

  return axios.post('https://course.ntu.edu.tw/api/v1/courses/search/quick', playload)  
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(`Error: ${error}`);
      throw error;
    });
}

module.exports = fetchCourse;
