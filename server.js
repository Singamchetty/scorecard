const express = require("express");
const { connectToDb, getDb } = require("./db");
const cors = require("cors");
const moment = require("moment");
const { ObjectId } = require("mongodb");
const app = express();
const _ = require('lodash');

app.use(express.json());
app.use(cors());

connectToDb((err) => {
  if (!err) {
    app.listen(4000, () => {
      console.log("app listening on port 4000");
    });
    db = getDb();
  }
});

//to get all the employees data
app.get("/employees", async(req, res) => {
  await db.collection("employees")
    .find()
    .toArray()
    .then((result) => {
      res.send(result);
    })
    .catch((error) => res.status(401).send(error));
});

//to get only individual employee data
app.get("/employee/:id", async(req, res) => {
  let Id = parseInt(req.params.id);
  await db.collection("employees")
    .findOne({ empId: Id }, { projection: { _id: false } })
    .then((result) => {
      if (!result)
        res.status(404).json({ message: "Employee not found" });
      else
        res.send(result);
    })
    .catch((error) => res.status(401).send(error));
});

//login Check
app.post('/login', async (req, res) => {
  const { empId } = req.body;
  try {
    const user = await db.collection('employees').findOne({ empId: empId }, { projection: { _id: false } })
    if (!user) {
      return res.status(401).json({ error: 'Authentication failed', message: 'User not found' });
    }
    if (empId === user.empId) {
      res.json({ message: 'Login successful', user });
    } else {
      res.status(401).json({ error: 'Authentication failed', message: 'Email and password do not match' });
    }
  }
  catch (error) {
    res.status(401).json({ error: 'Internal server error', details: error.message });
  }
});

//to get activities to display
app.get("/activities", async(req, res) => {
  await db.collection("activities_master")
    .find()
    .toArray()
    .then((result) => {
      res.send(result);
    })
    .catch((error) => res.status(401).send(error));
});

/*
Example of post Data
{
    "reportees":[41689,41716,41710,41750,41751,41714],
    "sort":{"type":"empId","order":-1}
    ,"page":1,"perPage":10,
    "searchText":"eng"
}*/
app.post("/getreportees",async (req, res) => {
  let reporteesArray = req.body.reportees || [];
  let sortBy = req.body.sort ? req.body.sort.type || "_id" : "_id";
  let sortByOrder = req.body.sort ? parseInt(req.body.sort.order) || 1 : 1;
  let page = req.body.page ? parseInt(req.body.page) || 1 : 1;
  let limit = req.body.perPage ? parseInt(req.body.perPage) || 10 : 10;
  let skip = (page - 1) * limit || 0;
  let query = { empId: { $in: reporteesArray } };
  let aggre = [{ $match: { empId: { $in: reporteesArray } } }];

  aggre.push({
    $addFields: {
      empIdString: { $toString: "$empId" } 
    }
  })

  if (req.body.searchText) {
    let searchText = req.body.searchText.trim();
    let searchStr = new RegExp(searchText, "ig");
    let orCondation = {
      $or: [
        { empIdString: searchStr },
        { empName: searchStr },
        { designation: searchStr },
        {techStack:searchStr}
      ],
    };
    aggre.push({ $match: orCondation });
    aggre.push({$unset:"empIdString"});
    query = Object.assign(query);
  }
  aggre.push({ $sort: { [sortBy]: sortByOrder } });
  let facet = {
    data: [{ $skip: skip }, { $limit: limit }],
    totalCount: [{ $count: "count" }],
  };
  aggre.push({ $facet: facet });
  aggre.push({ $unwind: { path: "$totalCount" } });
  await db.collection("employees")
    .aggregate(aggre)
    .toArray()
    .then((result) => {
      if (result && result.length) {
        res.status(201).json({ ...result[0] });
      } else {
        res.status(201).json({ data: [], totalCount: { count: 0 } });
      }
    })
    .catch((error) => res.status(401).send(error));
});

//Example of post Data
/*
{
    "empId":10000,
    "data":{
        "aName":"Approval of timesheet",
        "aId":"D001",
        "type":"duties",
        "ratedBy":"Name",
        "score":3,
        "comments":""
    }
}
*/
app.post('/createActivity',async (req, res) => {
  const empId = req.body.empId;
  if (!empId) {
    res.status(401).json({ "message": "Employee id is missing" });
    return
  } else {
    let { data } = req.body;

    //data validation
    if (!_.get(data, "aName", "") || !_.get(data, "aId", "") || !_.get(data, "type", "") || !_.get(data, "score", "") || !_.get(data,"comments","") ||!_.get(data,"ratedBy","") ) {
      res.status(401).json({ "error": "Invalid Activity data" });
      return;
    }

    if (data.score === (0 || -0) || data.score > 5 || data.score < -5) {
      res.status(401).json({ "message": "Score Should be between 1 to 5 or -1 to -5 only" });
      return
    }
    // if(data["comments"]===undefined){
    //   res.status(401).json({ "message": "need comments field" });
    //   return
    // }

    data = { ...data, "recorded_date": new Date() };
    data = Object.assign(data, { "_id": new ObjectId() })

    let query = { empId: empId };
    await db.collection('performance_master').findOne(query).then(async(result) => {
      if (result) {
       await db.collection('performance_master').updateOne(query, { $push: { "activities": data } })
          .then(async (updateRes) => {
            await calculateAverage(query);
            res.status(201).json({ "reuslt": updateRes });

          })
          .catch((error) => {
            res.json({ "error": error });
          });
      } else {
        let insertData = { empId: empId, activities: [] };

        insertData.activities.push(data);
       await db.collection('performance_master').insertOne(insertData).then(async (result) => {
          await calculateAverage(query);
          res.status(201).json({ "result": result });

        }).catch((error) => {
          res.json({ "message": error })

        })
      }
    }).catch((error) => {
      console.log(error)
      res.send(query)
    })


  }
})

//calculating average score and updating into employees data
const calculateAverage = async(query) => {
  return await new Promise(async(res, rej) => {
    await db.collection("performance_master")
      .findOne(query)
      .then(async(result) => {
        let activitiesList = result.activities;
        let activitiesLength = activitiesList.length;
        let score = activitiesList.reduce((acc, curr) => { return acc + Number(curr.score) }, 0);
        let averageScore = score / activitiesLength;
        // score < 0
        //   ? (averageScore = 0)
        //   : (averageScore = score / activitiesLength);

        // if (averageScore % 1 !== 0) {
          averageScore = Number(averageScore).toFixed(1);
        // }

        await db.collection("employees")
          .updateOne(query, { $set: { score: Number(averageScore) } })
          .then((result) => {
            res(result);
          })
          .catch((error) => rej(error));
      })
      .catch((error) => {
        rej(error);
      });
  });
};

//sending filtered activities data
/*Example post data
{
    "empId":41689,
    "fromDate":"2024-03-10",
    "toDate":"2024-03-14",
    page:0
    perPage:10, 
    "types":["duties","initiative"]
}
*/

app.post("/getActivities", async(req, res) => {
  let { empId,today,types } = req.body;
  if (!empId || typeof empId == "string") {
    res.status(401).json({ message: "Employee id is missing / EmpId should be string only" });
    return;
  } else {
    let page = req.body.page ? parseInt(req.body.page) || 1 : 1;
    let limit = req.body.perPage ? parseInt(req.body.perPage) || 10 : 10;
    let skip = (page - 1) * limit || 0;

    //let query = { empId: empId};
    let aggreGate = [  { $match:{empId: empId} } ];
    
     
    let fromDate = moment().subtract(90, "days").toDate();
    let toDate = moment().toDate()

    if (req.body.fromDate && req.body.toDate) {
        fromDate = new Date(req.body.fromDate);
        toDate = new Date(req.body.toDate);
                
    }
    toDate.setHours(23);
    toDate.setMinutes(59);
    toDate.setSeconds(59);
   // query["activities.recorded_date"] =  {$gte: new Date(fromDate),$lte: new Date(toDate) };
   
    aggreGate.push({$match:{"activities.recorded_date": {$gte: new Date(fromDate),$lte: new Date(toDate) } } });
    aggreGate.push({$unwind:"$activities" });
    aggreGate.push({ $sort: { "activities.recorded_date": -1 } });
    if(types && types?.length)
        aggreGate.push({$match:{"activities.type": {"$in":types} } });
    //console.log(JSON.stringify(aggreGate));

    let facet = {
      data: [{ $skip: skip }, { $limit: limit }],
      totalCount: [{ $count: "count" }],
    };
    aggreGate.push({ $facet: facet });
    aggreGate.push({ $unwind: { path: "$totalCount" } });
      

     db.collection("performance_master")
    .aggregate(aggreGate)
    .toArray()
    .then((result) => {
      if (result && result.length) {
        let resData = { activities: [], totalCount: result[0].totalCount,"empId":empId };
        if(result[0].data?.length){
          result[0].data.forEach((item)=>{
            resData["activities"].push(item.activities);
          });

        }
       

        res.status(201).json(resData);
      } else {
        res.status(201).json({ activities: [], totalCount: { count: 0 },"empId":empId });
      }
    })
    .catch((error) => res.status(401).send(error));
  }
});

//sending filtered activities avg score data
/*Example post data
{
    "empId":41689,
    "fromDate":"2024-03-10",
    "toDate":"2024-03-14",
    "types":["duties","initiative"]
   
}
*/
app.post("/getActivities-avg", async(req, res) => {
  let { empId,today,types } = req.body;
  if (!empId || typeof empId == "string") {
    res.status(401).json({ message: "Employee id is missing / EmpId should be string only" });
    return;
  } else {
    let page = req.body.page ? parseInt(req.body.page) || 1 : 1;
    let limit = req.body.perPage ? parseInt(req.body.perPage) || 10 : 10;
    let skip = (page - 1) * limit || 0;

    //let query = { empId: empId};
    let aggreGate = [  { $match:{empId: empId} } ];
    
     
    let fromDate = moment().subtract(90, "days").toDate();
    let toDate = moment().toDate()

    if (req.body.fromDate && req.body.toDate) {
        fromDate = new Date(req.body.fromDate);
        toDate = new Date(req.body.toDate);
                
    }
    toDate.setHours(23);
    toDate.setMinutes(59);
    toDate.setSeconds(59);
   // query["activities.recorded_date"] =  {$gte: new Date(fromDate),$lte: new Date(toDate) };
   
    aggreGate.push({$match:{"activities.recorded_date": {$gte: new Date(fromDate),$lte: new Date(toDate) } } });
    aggreGate.push({$unwind:"$activities" });
    aggreGate.push({ $sort: { "activities.recorded_date": -1 } });
    if(types && types?.length)
        aggreGate.push({$match:{"activities.type": {"$in":types} } });

    let facet = {
      data: [{ $skip: skip }, { $limit: limit }],
      totalCount: [{ $count: "count" }],
    };
    //aggreGate.push({ $facet: facet });
    //aggreGate.push({ $unwind: { path: "$totalCount" } });

      aggreGate.push({
        $group:{
          _id:"$activities.type",
          "avgScore":{ "$avg":"$activities.score" }

        }
      });

     db.collection("performance_master")
    .aggregate(aggreGate)
    .toArray()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((error) => res.status(401).send(error));
  }
});

// -------------------------------------------------------------

const checkEmpIdExists = async (req, res, next) => {
  try {
    const empId = req.body.empId;
    const empEdit = req.body?.empEdit;
    const reportingTo = req.body.reportingTo;
 
    const existingEmployee = await db.collection('employees').findOne({ empId: empId });
 
    if (existingEmployee && !empEdit) {
      return  res.status(400).json({ error: "Employee already exists" });
    }
    else if(!existingEmployee){
      await db.collection('employees').updateOne({ empId: reportingTo }, { $push: { reportees: empId } });
      next();
    } 
    else{
      db.collection('employees').updateOne({empId:existingEmployee.reportingTo},{ $pull: { reportees: { $eq: empId } } });
      await db.collection('employees').updateOne({ empId: reportingTo }, { $push: { reportees: empId } });
      next();
    } 
  } catch (error) {
    console.error('Error checking or updating employee data:', error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const checkEmpIdActivityExists = async (req, res, next) => {
  try {
    const empId = req.body.empId;
    const existingEmployee = await db.collection('performance_master').findOne({ empId: empId });
    if (!existingEmployee) {
      return  res.status(400).json({ error: "Employee doesn't have any activity" });
    }
    else{
      next();
    } 
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Add employee details API endpoint
// {
//   "empId": 41716,
//   "empName": "Prashanth vagalaboina",
//   "designation": "Software Engineer",
//   "reportingTo": 16020,
//   "score": 0,
//   "project": "prologies",
//   "reportees": [],
//   "empEmail": "pvagalaboina@nisum.com",
//   "techStack": "Frontend",
//   "createdBy": 41111,
//   "roleId": 1,
//   "status": 1,
//   "updatedBy": 41111
// }
app.post('/addEmployee', checkEmpIdExists, async (req, res) => {
  try {
    const empData = req.body;
    // Insert data into MongoDB
    const result = await db.collection('employees').insertOne(empData);
 
    res.status(201).json({ message: 'Data added successfully', insertedId: result.insertedId });
  } catch (err) {
    console.error('Error adding data:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update employee details API endpoint
// Mandatory(*) fields are Editable in UI
// {
//   "empId": 41716,
//  * "empName": "Prashanth vagalaboina",
//  * "designation": "Software Engineer",
//  * "reportingTo": 16020,
//   "score": 0,
//  * "project": "prologies",
//   "reportees": [],
//   "empEmail": "pvagalaboina@nisum.com",
//  * "techStack": "Frontend",
//   "createdBy": 41111,
//  * "roleId": 1,
//  * "status": 1,
//  * "updatedBy": 41111,
//   "empEdit" : "true"
// }
app.put('/updateEmployee', checkEmpIdExists, async (req, res) => {
  try {
    const { empId, empName, project, roleId, designation, status, reportingTo, techStack, updatedBy } = req.body;
 
    // Update employee details
    const result = await db.collection('employees').updateOne(
      { empId: empId },
      {
        $set: {
          empName,
          project,
          roleId,
          designation,
          status,
          reportingTo,
          techStack,
          updatedBy
        }
      }
    );
 
    if (result.modifiedCount === 1) {
      res.status(200).json({ message: 'Employee details updated successfully' });
    } else {
      res.status(404).json({ message: 'Employee not found' });
    }
  } catch (err) {
    console.error('Error updating employee details:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Employee role and status check API endpoint
// {
//   "category": "emp_roles" or "emp_status"
// }
app.post('/getmaster-data',(req, res) => {
  let emp = req.body.category;
  let collection = ""
  if(emp === "emp_roles")
    collection ="emp_roles";
  if(emp === "emp_status")
    collection = "emp_status";
    db.collection(collection).find({}).toArray()
        .then(result => {
            res.status(201).json(result);
        })
        .catch(error => res.status(500).json({ error: "Could not fetch the Role / Status of Employee" }));
});

// Delete Activity details API endpoint
// {
//   "empId": 41716,
//   "ObjectId": "660ba3ab707f841402133801"
// }
app.put('/deleteActivity', checkEmpIdActivityExists, async (req, res) => {
 try {
    const empId = req.body.empId;
    const Id = req.body.ObjectId;
  
    const result = await db.collection('performance_master').updateOne({empId:empId},{ $pull: { activities: { _id: new ObjectId(Id) } } });
    console.log(result);
    if (result.modifiedCount === 1) {
      res.status(200).json({ message: 'Employee activity deleted successfully' });
    }
 } catch (err) {
  console.error('Error updating employee details:', err);
  res.status(500).json({ message: 'Internal server error' });
}
}); 

// Add MasterActivity details API endpoint
// {
//   "atype": "duties",
//   "aName": "submission test",
//   "appreciate": "true",
//   "depreciate": "false"
// }
app.post('/addMasterActivity', async (req, res) => {
  try {
    const empActivityMasterData = req.body;
    // Insert data into MongoDB
    const result = await db.collection('activities_master').insertOne(empActivityMasterData);
    res.status(201).json({ message: 'Data added successfully', insertedId: result.insertedId });
  } catch (err) {
    console.error('Error adding data:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete Master Activity details API endpoint
// {
//   "ObjectId": "660ba3ab707f841402133801"
// }

app.put('/deleteMasterActivity', async (req, res) => {
  const aId = req.body.ObjectId;
  await db.collection('activities_master').deleteOne({_id: new ObjectId(aId)}).then((result) => {
    res.send(result);}).catch((error) => res.status(401).send(error));
});