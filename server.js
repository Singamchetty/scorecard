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
app.get("/employees", (req, res) => {
  db.collection("employees")
    .find()
    .toArray()
    .then((result) => {
      res.send(result);
    })
    .catch((error) => res.status(401).send(error));
});

//to get only individual employee data
app.get("/employee/:id", (req, res) => {
  let Id = parseInt(req.params.id);
  db.collection("employees")
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
//require empId  
//example {empId:41689}
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
app.get("/activities", (req, res) => {
  db.collection("activities_master")
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
app.post("/getreportees", (req, res) => {
  let reporteesArray = req.body.reportees || [];
  let sortBy = req.body.sort ? req.body.sort.type || "_id" : "_id";
  let sortByOrder = req.body.sort ? parseInt(req.body.sort.order) || 1 : 1;
  let page = req.body.page ? parseInt(req.body.page) || 1 : 1;
  let limit = req.body.perPage ? parseInt(req.body.perPage) || 10 : 10;
  let skip = (page - 1) * limit || 0;
  let query = { empId: { $in: reporteesArray } };
  let aggre = [{ $match: { empId: { $in: reporteesArray } } }];

  if (req.body.searchText) {
    let searchText = req.body.searchText.trim();
    let searchStr = new RegExp(searchText, "ig");
    let orCondation = {
      $or: [
        { empId: searchStr },
        { empName: searchStr },
        { designation: searchStr },
      ],
    };
    aggre.push({ $match: orCondation });

    query = Object.assign(query);
  }
  aggre.push({ $sort: { [sortBy]: sortByOrder } });
  let facet = {
    data: [{ $skip: skip }, { $limit: limit }],
    totalCount: [{ $count: "count" }],
  };
  aggre.push({ $facet: facet });
  aggre.push({ $unwind: { path: "$totalCount" } });
  db.collection("employees")
    .aggregate(aggre)
    .toArray()
    .then((result) => {
      if (result && result.length) {
        res.status(201).json({ ...result[0] });
      } else {
        res.status(404).json({ data: [], totalCount: { count: 0 } });
      }
    })
    .catch((error) => res.status(401).send(error));
});


//Example of post Data
/*
{
    "empId":41689,
    "data":{
        "aName":"Approval of timesheet",
        "aId":"D001",
        "type":"default",
        "score":3,
        "comments":""
    }
}
*/
// app.post('/createActivity',async (req, res) => {
//   const empId = req.body.empId;
//   if (!empId) {
//     res.status(401).json({ "message": "Employee id is missing" });
//     return
//   } else {
//     let { data } = req.body;

//     //data validation
//     if (!_.get(data, "aName", "") || !_.get(data, "aId", "") || !_.get(data, "type", "") || !_.get(data, "score", "")) {
//       res.status(401).json({ "error": "Invalid Activity data" });
//       return;
//     }

//     if (data.score === (0 || -0) || data.score > 5 || data.score < -5) {
//       res.status(401).json({ "message": "Score Should be between 1 to 5 or -1 to -5 only" });
//       return
//     }
//     if(data["comments"]===undefined){
//       res.status(401).json({ "message": "need comments field" });
//       return
//     }

//     data = { ...data, "recorded_date": new Date() };
//     data = Object.assign(data, { "_id": new ObjectId() })

//     let query = { empId: empId };
//     await db.collection('performance_master').findOne(query).then(async(result) => {
//       if (result) {
//        await db.collection('performance_master').updateOne(query, { $push: { "activities": data } })
//           .then(async (updateRes) => {
//             await calculateAverage(query);
//             res.status(201).json({ "reuslt": updateRes });

//           })
//           .catch((error) => {
//             res.json({ "error": error });
//           });
//       } else {
//         let insertData = { empId: empId, activities: [] };

//         insertData.activities.push(data);
//        await db.collection('performance_master').insertOne(insertData).then(async (result) => {
//           await calculateAverage(query);
//           res.status(201).json({ "result": result });

//         }).catch((error) => {
//           res.json({ "message": error })

//         })
//       }
//     }).catch((error) => {
//       console.log(error)
//       res.send(query)
//     })


//   }
// })

app.post('/createActivity', async (req, res) => {
  const empId = req.body.empId;
  if (!empId) {
    res.status(401).json({ "message": "Employee id is missing" });
    return;
  } else {
    let { data } = req.body;

    // Data validation
    if (
      data === undefined ||
      typeof data.aName !== 'string' || data.aName.trim() === '' ||
      typeof data.aId !== 'string' || data.aId.trim() === '' ||
      typeof data.type !== 'string' || data.type.trim() === '' ||
      typeof data.score !== 'number'
    ) {
      res.status(401).json({ "error": "Invalid Activity data" });
      return;
    }

    if (data.score === 0 || data.score === -0 || data.score > 5 || data.score < -5) {
      res.status(401).json({ "message": "Score should be between 1 to 5 or -1 to -5 only" });
      return;
    }

    if (data.comments === undefined) {
      res.status(401).json({ "message": "Need comments field" });
      return;
    }

    data = { ...data, "recorded_date": new Date() };
    data = Object.assign(data, { "_id": new ObjectId() });

    let query = { empId: empId };
    await db.collection('performance_master').findOne(query).then(async (result) => {
      if (result) {
        await db.collection('performance_master').updateOne(query, { $push: { "activities": data } })
          .then(async (updateRes) => {
            await calculateAverage(result); // Pass result instead of query
            res.status(201).json({ "result": updateRes });
          })
          .catch((error) => {
            res.json({ "error": error });
          });
      } else {
        let insertData = { empId: empId, activities: [] };
        insertData.activities.push(data);
        await db.collection('performance_master').insertOne(insertData).then(async (result) => {
          await calculateAverage(result); // Pass result instead of query
          res.status(201).json({ "result": result });
        }).catch((error) => {
          res.json({ "message": error });
        });
      }
    }).catch((error) => {
      console.log(error);
      res.send(error);
    });
  }
});



//calculating average score and updating into employees data
const calculateAverage = (query) => {
  return new Promise((res, rej) => {
    db.collection("performance_master")
      .findOne(query)
      .then((result) => {
        let activitiesList = result.activities;
        let activitiesLength = activitiesList.length;
        let score = activitiesList.reduce((acc, curr) => { return acc + curr.score }, 0);
        let averageScore = 0;
        score < 0
          ? (averageScore = 0)
          : (averageScore = score / activitiesLength);

        if (averageScore % 1 !== 0) {
          averageScore = averageScore.toFixed(1);
        }

        db.collection("employees")
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
    "toDate":"2024-03-14"
}
*/
app.post("/getActivities", (req, res) => {
  let { empId, fromDate, toDate, today } = req.body;
  if (!empId || typeof empId == "string") {
    res.status(401).json({ message: "Employee id is missing / EmpId should be string only" });
    return;
  } else {
    let query = {
      empId: empId,
    };
    if (fromDate && toDate) {
      fromDate = new Date(fromDate)
      toDate = new Date(toDate);
      toDate.setHours(23);
      toDate.setMinutes(59);
      toDate.setSeconds(59);
      query["activities.recorded_date"] = {
        $gte: new Date(fromDate),
        $lte: new Date(toDate),
      };
    } else {
      // If fromDate and toDate are not provided, fetch data for the last 90 days
      query["activities.recorded_date"] = {
        $gte: moment().subtract(90, "days").toDate(),
        $lte: moment().toDate(),
      };
    }
    db.collection("performance_master")
      .findOne(query)
      .then((results) => {
        res.status(201).json(results);
      })
      .catch((error) => {
        res.status(401).json({ message: "Error fetching data" }, error);
      });
  }
});
