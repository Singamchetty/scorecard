Nisum ScoreCard Demo Documentation


Project Demo Deployment Link DEV team

URL : https://nisumscorecard.netlify.app/

Project Demo Deployment Link for QA team testing
 
URL : https://nisumscorecard-qa.netlify.app/


API's for QA Testing Team Usage

GET API’s :

1. To get all employees data

https://nisumscorecardservertesting.netlify.app/.netlify/functions/api/employees


2. To get individual employee data

https://nisumscorecardservertesting.netlify.app/.netlify/functions/api/employee/:id


3. To get master data of activities with types

https://nisumscorecardservertesting.netlify.app/.netlify/functions/api/activities


POST API's

1. POST api to validate login into dashboard

https://nisumscorecardservertesting.netlify.app/.netlify/functions/api/login

Data In body 
example: {"empId":41689}

2. POST api to get reportees data under the employee who logged in. The data we send in the body should contain at least reportees filed with an array of employee empId, remaining all fields are optional.

https://nisumscorecardservertesting.netlify.app/.netlify/functions/api/getreportees

Data In body Example :
{
    "reportees":[41689,41716,41710,41750,41751,41714],
    "sort":{"type":"empId","order":-1}
    ,"page":1,"perPage":10,
    "searchText":"eng"
}*/


3. POST method to add activity added by manager to his reportees.  Id should contain all the fields given below in the example or else it throws an error. 
Note: Users can add a custom aName field..

https://nisumscorecardservertesting.netlify.app/.netlify/functions/api/createActivity

Data In body Example :
//Example of post Data
{
    "empId":10000,
    "data":{
        "aName":"Approval of timesheet",
        "type":"duties",
        "ratedBy":"Name",
        "score":3,
        "comments":""
    }
}



Actual Activities Data this to be used when trying to create a activity to a employee: 

[{"_id":"65f19252ecd2b756fab896b8","type":"duties","aName":"Submission timesheet"},
{"_id":"65f19252ecd2b756fab896b9","type":"duties","aName":"Successful deliveries"},
{"_id":"65f19252ecd2b756fab896bb","type":"duties","aName":"Approval of timesheet"},
{"_id":"65f19252ecd2b756fab896bd","type":"initiative","aName":"POC's"},
{"_id":"65f19252ecd2b756fab896ba","type":"duties","aName":"Vacation/Unplanned leaves"},
{"_id":"65f19252ecd2b756fab896bc","type":"initiative","aName":"Goals"},{"_id":"65f19252ecd2b756fab896be","type":"initiative","aName":"RFP's"}]


4. POST method to get reports by filtering from Date and toDate. Mandatory is empId in the example data which we post in the body to get minimum data of the previous 90 days. 
 If fromDate and toDate is not given we get only previous 90 days activities.

https://nisumscorecardservertesting.netlify.app/.netlify/functions/api/getActivities

Data In body Example :
/*Example post data 
{
    "empId":41689,
    "fromDate":"2024-03-10",
    "toDate":"2024-03-14",
    page:0
    perPage:10, 
    getAll:true //send only for get all records
}
*/


5. POST method to get Average scores of individual activities.
https://nisumscorecardservertesting.netlify.app/.netlify/functions/api/getActivities-avg

//sending filtered activities avg score data
/*Example post data
{
    "empId":41689,
    "fromDate":"2024-03-10",
    "toDate":"2024-03-14",
    "types":["duties","initiative"]
   
}
*/



API's for Deployment Team Usage

GET API's

1. To get all employees data

https://nisumscorecardserverdev.netlify.app/.netlify/functions/api/employees


2. To get individual employee data

https://nisumscorecardserverdev.netlify.app/.netlify/functions/api/employee/:id


3. To get master data of activities with types

https://nisumscorecardserverdev.netlify.app/.netlify/functions/api/activities


POST API's

1. POST api to validate login into dashboard

https://nisumscorecardserverdev.netlify.app/.netlify/functions/api/login

Data In body 
example: {"empId":41689}

2. POST api to get reportees data under the employee who logged in. The data we send in the body should contain at least reportees filed with an array of employee empId, remaining all fields are optional.

https://nisumscorecardserverdev.netlify.app/.netlify/functions/api/getreportees

Data In body Example :
{
    "reportees":[41689,41716,41710,41750,41751,41714],
    "sort":{"type":"empId","order":-1}
    ,"page":1,"perPage":10,
    "searchText":"eng"
}*/


3. POST method to add activity added by manager to his reportees.  Id should contain all the fields given below in the example or else it throws an error.
Note: Users can add a custom aName field.

https://nisumscorecardserverdev.netlify.app/.netlify/functions/api/createActivity

Data In body Example :
//Example of post Data
{
    "empId":10000,
    "data":{
        "aName":"Approval of timesheet",
        "type":"duties",
        "ratedBy":"Name",
        "score":3,
        "comments":""
    }
}


Actual Activities Data this to be used when trying to create a activity to a employee: 

[{"_id":"65f19252ecd2b756fab896b8","type":"duties","aName":"Submission timesheet"},s
{"_id":"65f19252ecd2b756fab896b9","type":"duties","aName":"Successful deliveries"},
{"_id":"65f19252ecd2b756fab896bb","type":"duties","aName":"Approval of timesheet"},
{"_id":"65f19252ecd2b756fab896bd","type":"initiative","aName":"POC's"},
{"_id":"65f19252ecd2b756fab896ba","type":"duties","aName":"Vacation/Unplanned leaves"},
{"_id":"65f19252ecd2b756fab896bc","type":"initiative","aName":"Goals"},{"_id":"65f19252ecd2b756fab896be","type":"initiative","aName":"RFP's"}]



4. POST method to get reports by filtering from Date and toDate. Mandatory is empId in the example data which we post in the body to get minimum data of the previous 90 days. 
 If fromDate and toDate is not given we get only previous 90 days activities.

https://nisumscorecardserverdev.netlify.app/.netlify/functions/api/getActivities

Data In body Example :
{
    "empId":41689,
    "fromDate":"2024-03-10",
    "toDate":"2024-03-14",
    page:0
    perPage:10,
   getAll:true //send only for get all records
}
*/


5. POST method to get Average scores of individual activities.
https://nisumscorecardserverdev.netlify.app/.netlify/functions/api/getActivities-avg

//sending filtered activities avg score data
/*Example post data
{
    "empId":41689,
    "fromDate":"2024-03-10",
    "toDate":"2024-03-14",
    "types":["duties","initiative"]
   
}
*/



