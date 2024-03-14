const express = require('express')
const { connectToDb, getDb } = require("./db")
const { ObjectId } = require("mongodb")
const cors = require("cors")
const app = express();

app.use(express.json())
app.use(cors())



connectToDb((err) => {
    if (!err) {
        app.listen(4000, () => {
            console.log('app listening on port 4000')
        })
        db = getDb()
    }
})

//to get all the employees data
app.get('/employees', (req, res) => {
    db.collection('employees').find().toArray()
        .then(result => { res.send(result) })
        .catch(error => res.status(401).send(error))
})

//to get only individual employee data
app.get('/employee/:id', (req, res) => {
    let Id = parseInt(req.params.id);
    db.collection('employees').findOne({empId:Id},{projection:{_id:false}})
        .then(result => { res.send(result) })
        .catch(error => res.status(401).send(error))
})

//to get activities to display
app.get('/activities', (req, res) => {
    db.collection('activities_master').find().toArray()
        .then(result => { res.send(result) })
        .catch(error => res.status(401).send(error))
})

/*
Example of post Data
{
    "reportees":[41689,41716,41710,41750,41751,41714],
    "sort":{"type":"empId","order":-1}
    ,"page":1,"perPage":10,
    "searchText":"eng"
}*/
app.post('/getreportees', (req, res) => {
    let reporteesArray = req.body.reportees || [];
    let sortBy=req.body.sort?req.body.sort.type || "_id" :"_id"
    let sortByOrder=req.body.sort?parseInt(req.body.sort.order)|| 1: 1;
    let page = req.body.page?parseInt(req.body.page) || 1 : 1;
    let limit = req.body.perPage?parseInt(req.body.perPage) || 10: 10;
    let skip = (page - 1) * limit || 0;
    let query = { empId: { $in: reporteesArray }  };
    if(req.body.searchText){
        let searchText = req.body.searchText.trim();
        let searchStr = new RegExp(searchText, 'ig');
        query = Object.assign(query, {
                                "$or": [
                                    { 'empId': searchStr },
                                    { 'empName': searchStr },
                                    {"designation":searchStr}
                                ]
                            });     
    }
    db.collection('employees').find(query, { projection: { _id: false } })
        .skip(skip)
        .sort({[sortBy]:sortByOrder})
        .limit(limit)
        .toArray()
        .then(result => {
            // Get the total count of data
            db.collection('employees').countDocuments(query)
                .then(totalCount => {
                    res.send({
                        totalcount: totalCount,
                        currentPage: page,
                        totalPages: Math.ceil(totalCount / limit),
                        data: result,
                    });
                })
                .catch(error => res.status(401).send(error));
        })
        .catch(error => res.status(401).send(error));
});

//Example of post Data
/*
{
    "empId":10000,
    "data":{
        "aName":"timesheet",
        "aId":"D001",
        "type":"default",
        "recorded_date":"2024-03-12",
        "score":3,
        "comments":"very good"
    }
}
*/
app.post('/create-performance',(req,res)=>{
    const empId = req.body.empId || null;
    if(!empId){
        res.status(401).json({"message":"Employee id is missing"});
        return
    }else{
        let {data} = req.body;
        data = {...data, "recorded_date": new Date(data['recorded_date']) };  
        let query = {empId:empId };
        db.collection('performance_master').findOne(query).then( (result)=>{                      
            if(result){
                db.collection('performance_master').updateOne(query,{ $push: { "activities":data  } })
                .then(async (updateRes)=>{
                    await calculateAverage(query);
                    res.json({"reuslt":updateRes});
                    
                })
                .catch((error)=>{
                    res.json({"error":error});
                });             
            }else{
                let insertData =  { empId:empId, activities:[]};                
                insertData.activities.push(data);
                db.collection('performance_master').insertOne(insertData).then(async (result)=>{
                    await calculateAverage(query);
                    res.json({"result":result});

                }).catch((error)=>{
                    res.json({"message":error})

                })               
            } 
        }).catch((error)=>{
            console.log(error)
           res.send(query)
        })


    }


})

//calculating average score and updating into employees data
const calculateAverage= (query)=>{
    return new Promise((res,rej)=>{  
      db.collection('performance_master').findOne(query).then((result)=>{
        let activitiesList=result.activities;
        let activitiesLength=activitiesList.length;
        let score=activitiesList.reduce((acc,curr)=>{
            return (acc) + (curr.score)
        },0)            
        let averageScore=0
        score<0?averageScore=0:(averageScore=(score/activitiesLength))
        db.collection("employees").updateOne(query,{$set:{score:averageScore}})
        .then((result)=>{
            res(result)       
        })
        .catch((error)=>rej(error))
    })
    .catch((error)=>{
        rej(error)
    })
});
}



