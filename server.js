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

app.get('/employees', (req, res) => {
    db.collection('employees').find().toArray()
        .then(result => { res.send(result) })
        .catch(error => res.status(401).send(error))
})

app.get('/activities', (req, res) => {
    db.collection('activities_master').find().toArray()
        .then(result => { res.send(result) })
        .catch(error => res.status(401).send(error))
})

app.get('/employee/:id', (req, res) => {
    let Id = parseInt(req.params.id);
    db.collection('employees').findOne({empId:Id},{projection:{_id:false}})
        .then(result => { res.send(result) })
        .catch(error => res.status(401).send(error))
})

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
    console.log(query);

    

    db.collection('employees').aggregate([
        { $match: query },
        {
            $facet: {
                // Perform the main query to get paginated data
                paginatedData: [
                    { $skip: skip },
                    { $limit: limit },
                    { $sort: { [sortBy]: sortByOrder } },
                    { $project: { _id: false } }
                ],
                // Perform a separate query to get the total count of documents
                totalCount: [
                    { $count: "total" }
                ]
            }
        }
    ])
    .toArray()
    .then(result => {
        // Extract paginated data and total count from the result
        const paginatedData = result[0].paginatedData;
        const totalCount = result[0].totalCount[0].total;
    
        // Send the response with pagination details
        res.send({
            totalCount: totalCount,
            currentPage: page,
            totalPages: Math.ceil(totalCount / limit),
            data: paginatedData,
        });
    })
    .catch(error => res.status(401).send(error));
    


    // db.collection('employees').find(query, { projection: { _id: false } })
    //     .skip(skip)
    //     .sort({[sortBy]:sortByOrder})
    //     .limit(limit)
    //     .toArray()
    //     .then(result => {
    //         // Get the total count of data
    //         db.collection('employees').countDocuments(query)
    //             .then(totalCount => {
    //                 res.send({
    //                     totalcount: totalCount,
    //                     currentPage: page,
    //                     totalPages: Math.ceil(totalCount / limit),
    //                     data: result,
    //                 });
    //             })
    //             .catch(error => res.status(401).send(error));
    //     })
    //     .catch(error => res.status(401).send(error));
});




