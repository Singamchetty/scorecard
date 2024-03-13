const {MongoClient}=require("mongodb")


let dbConnection

module.exports = {
    connectToDb : (cb)=>{
        // MongoClient.connect('mongodb://localhost:27017/ecommerse')
        MongoClient.connect('mongodb+srv://vsingamchetty:user1234@cluster0.ch8kwyt.mongodb.net/nisumscorecard')
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
    getDb: () => dbConnection,
    getModel:function(collectionName){
       let dbConnection = dbConnection();
        try { 
            return dbConnection.model(collectionName);
        } catch (error) {
            // if (['PERM_AGING_LOG', 'PETITION_AGING_LOG'].indexOf(collectionName) > -1) {
            //     return dbConnection.model(collectionName, new this.mongoDb.Schema(models[collectionName], {  optimisticConcurrency: true, versionKey: 'version'  }))
            // } else {
                return dbConnection.model(collectionName, new this.mongoDb.Schema(models[collectionName]))
            // }
        }
    }
}