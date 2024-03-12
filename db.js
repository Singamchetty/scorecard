const {MongoClient}=require("mongodb")

let dbConnection

module.exports = {
    connectToDb : (cb)=>{
        // MongoClient.connect('mongodb://localhost:27017/ecommerse')
        MongoClient.connect('mongodb+srv://vsingamchetty:user1234@cluster0.ch8kwyt.mongodb.net/ecommerce')
        // mongodb+srv://vsingamchetty:user1234@cluster0.ch8kwyt.mongodb.net/
        .then((client)=>{
            dbConnection=client.db()
            return cb()
        })
        .catch(err=>{
            console.log("DB Connection Error", err);
            return cb(err)
        })
    },
    getDb: () => dbConnection
}