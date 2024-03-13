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

app.get('/employee/:id', (req, res) => {
    let Id = parseInt(req.params.id);
    db.collection('employees').findOne({empId:Id},{projection:{_id:false}})
        .then(result => { res.send(result) })
        .catch(error => res.status(401).send(error))
})

app.post('/getreportees', (req, res) => {
    let reporteesArray = req.body.reportees;
    let page = parseInt(req.query.page) || 1; 
    let limit = 10;
    let skip = (page - 1) * limit;
    db.collection('employees').find({ empId: { $in: reporteesArray } }, { projection: { _id: false } })
        .skip(skip)
        .limit(limit)
        .toArray()
        .then(result => {
            // Get the total count of data
            db.collection('employees').countDocuments({ empId: { $in: reporteesArray } })
                .then(totalCount => {
                    res.send({
                        total: totalCount,
                        currentPage: page,
                        totalPages: Math.ceil(totalCount / limit),
                        data: result
                    });
                })
                .catch(error => res.status(401).send(error));
        })
        .catch(error => res.status(401).send(error));
});




