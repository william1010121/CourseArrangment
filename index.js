const express = require('express');
const CourseData = require('./data_process/crawler.js');
const bodyParser = require('body-parser');
const app = express();
const port = 5001;

app.set('view engine', 'ejs');
app.use('/static', express.static('node_modules'));
app.use(bodyParser.urlencoded({ extended: true }));




/*data */
/*
大一必修
1. 微積分3
2. 微積分4
3. 資料結構與演算法
4. 計算機程式設計

經濟系輔系必修
1. 個體經濟學原理與實習
2. 總體經濟學原理與實習
*/
function makeCourse(name, semester, department=[], tags=[]) {
    return {
        "name": name,
        "semester": semester,
        "department": department,
        "tags":tags
    };
}

function addCourse(courseList, courseName, semester, department=[], tags=[]) {
    courseList[courseName] = makeCourse(courseName, semester, department, tags);
}

let courseList = {};
let Semester = {"上":"112-1", "下":"112-2"};
//資工
//大一  
addCourse(courseList, "計算機程式設計", ["上"], ["9020"], ["資工","大一","必修"]);
addCourse(courseList, "微積分3", ["下"], ["9020"], ["資工","大一","必修"]);
addCourse(courseList, "微積分4", ["下"], ["9020"], ["資工","大一","必修"]);
addCourse(courseList, "資料結構與演算法", ["下"], ["9020"], ["資工","大一","必修"]);

//大二
addCourse(courseList, "演算法設計與分析", ["上"], ["9020"], ["資工","大二","必修"]);
addCourse(courseList, "系統程式設計", ["上"], ["9020"], ["資工","大二","必修"]);
addCourse(courseList, "機率", ["下"], ["9020"], ["資工","大二","必修"]);
addCourse(courseList, "作業系統", ["下"], ["9020"], ["資工","大二","必修"]);

// 大三
//addCourse(courseList, "專題研究", ["112-1","112-2"], ["9020"], ["資工","大三","必修","自行找教授"]);
addCourse(courseList, "計算機網路", ["上"], ["9020"], ["資工","大三","必修"]);
addCourse(courseList, "自動機與形式語言", ["上"], ["9020"], ["資工","大三","必修"]);
addCourse(courseList, "計算機結構", ["下"], ["9020"], ["資工","大三","必修"]);

addCourse(courseList, "人工智慧導論", ["下"], ["9020"], ["資工","大三","必修"]);
addCourse(courseList, "計算機網路實驗", ["下"], ["9020"], ["資工","大三","必修"]);

//法律
//大一
addCourse(courseList, "民法總則", ["上"], [], ["法律","大一","必修","上下學期都有"]);
addCourse(courseList, "刑法總則一", ["上"], [], ["法律","大一","必修"]);

addCourse(courseList, "憲法", ["上"], [], ["法律","大一","必修"]);
addCourse(courseList, "刑法總則二", ["下"], [], ["法律","大一","必修"]);

addCourse(courseList, "民法債編總論一", ["上", "下"], [], ["法律","大一","必修","上下學期都有"]);

// 大二

addCourse(courseList, "法理學", ["上"], [], ["法律","大二","必修"]);
addCourse(courseList, "民法物權", ["上", "下"], [], ["法律","大二","必修","上下學期都有"]);
addCourse(courseList, "刑法分則", ["上","下"], [], ["法律","大二","必修", "上下學期都有"]);
addCourse(courseList, "民法債編總論二", ["上","下"], [], ["法律","大二","必修","上下學期都有"]);
addCourse(courseList, "民法債編各論", ["上", "下"], [], ["法律","大二","必修","上下學期都有"]);
addCourse(courseList, "國際公法", ["上", "下"], [], ["法律","大二","必修","上下學期都有"]);
addCourse(courseList, "民法身分法", ["上", "下"], [], ["法律","大二","必修","上下學期都有"]);
addCourse(courseList, "行政法", ["上", "下"], [], ["法律","大二","必修","上下學期都有"]);
addCourse(courseList, "行政救濟法", ["下"], [], ["法律","大二","必修"]);
addCourse(courseList, "法律史", ["下"], [], ["法律","大二","必修"]);


// 大三
addCourse(courseList, "民事訴訟法甲上", ["上"], [], ["法律","大三","必修"]);
addCourse(courseList, "民事訴訟法甲下", ["下"], [], ["法律","大三","必修"]);
addCourse(courseList, "刑事訴訟法", ["上","下"], [], ["法律","大三","必修"]);
addCourse(courseList, "商事法總論及公司法", ["上"], [], ["法律","大三","必修"]);
addCourse(courseList, "保險法", ["上","下"], [], ["法律","大三","必修"]);
addCourse(courseList, "證券交易法", ["上","下"], [], ["法律","大三","必修"]);


//數學
addCourse(courseList, "分析導論一", ["上"], ["2010"], ["數學","大一","必修"]);
addCourse(courseList, "線性代數一", ["上"], ["2010"], ["數學","大一","必修"]);

addCourse(courseList, "分析導論二", ["下"], ["2010"], ["數學","大一","必修"]);
addCourse(courseList, "線性代數二", ["下"], ["2010"], ["數學","大一","必修"]);


function makeNameListWithSemester(courseList) {
    let nameList = {"上":[], "下":[]};
    Object.keys(courseList).forEach((key) => {
        let course = courseList[key];
        course["semester"].forEach((semester) => {
            nameList[semester].push({name: course["name"], tags: course["tags"]});
        });
    });
    return nameList;
}

const courseArrangement = {
    "大一" : {
        "上" : ["計算機程式設計", "線性代數一","民法總則","憲法","刑法總則一","民法債編總論一"],
        "下" : ["微積分3", "微積分4", "資料結構與演算法","線性代數二","刑法總則二","民法債編總論二"]
    },
    "大二" : {
        "上" : ["演算法設計與分析", "系統程式設計"],
        "下" : ["機率", "作業系統"]
    },
    "大三":{
        "上" : ["分析導論一"],
        "下" : ["分析導論二"]
    }, 
    "大四":{
        "上" : [],
        "下" : []
    }
};

async function getCourseArray(courseArray,semester) {
    let data = await Promise.all(courseArray.map(async (course) => {
        let courseData = courseList[course];
        if(!courseData["semester"].includes(semester))
            throw new Error(`This course(${courseData["name"]}) is not available in this semester(${semester})`);

        return CourseData(courseData["name"], Semester[semester], courseData["department"]);
    })).catch((err) => {
        console.log("ERROR:" + err );
    });
    return data;
}

async function getDataGradeSemester(grade, semester) {
    let courseArray = courseArrangement[grade][semester];
    return await getCourseArray(courseArray, semester);
}
async function getDataCourseArray(courseArray, semester) {
    console.log("courseArray",courseArray);
    return await getCourseArray(courseArray,semester);
};

let gradeList = ["大一", "大二", "大三", "大四"];
let semesterList = ["上", "下"];
app.get('/', async (req, res) => {
    res.render('hello', { 
        grades: gradeList, 
        semesters: semesterList , 
        data: JSON.stringify([]), 
        choose: {grade: "大一", semester: "上", courses:[]},
        nameList: makeNameListWithSemester(courseList)
    });
});

app.post('/', async (req, res) => {
    let grade = req.body.grade;
    let semester = req.body.semester;
    console.log(grade, semester);
    let data = await getDataGradeSemester(grade, semester);
    res.render('hello', { 
        grades: gradeList, 
        semesters: semesterList , 
        data: JSON.stringify(data), 
        choose: {grade: grade, semester: semester,courses:[]},
        nameList: makeNameListWithSemester(courseList)
    });
});

app.post('/getCourses', async (req, res) => {
    let grade = req.body.grade;
    let semester = req.body.semester;
    let courses = req.body.courses;
    
    res.json(await getDataCourseArray(courses, semester));
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});