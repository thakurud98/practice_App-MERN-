var { MongoClient, ObjectID } = require('mongodb')
const connectionUrl = 'mongodb://127.0.0.1:27017'
const dataBase = 'Task-Manager-App'

MongoClient.connect(connectionUrl, { useNewUrlParser: true }, async (err, client) => {
    try {
        if (err) return console.log("error in connecting db", err)
        console.log("DB connected successfully==============")

        const db = await client.db(dataBase)
        /**Inserting a document into collection */
        // db.collection('user').insertOne({
        //     name: 'uday Singh', age: 24
        // }, (error, result)=>{
        //     if(error) return console.log("error in collection insertion", error)
        //     console.log(result.ops)
        // })

        /**Inserting many documents using mongo's ObjectId which creates 12 bytes sized id */
        // await db.collection('user').insertMany([
        //         { name: 'pankaj Singh', age: 26, _id: new ObjectID() },
        //         { name: 'Hemant Singh', age: 34, _id: new ObjectID()},
        //         { name: 'Pradeep Sharma', age: 37, _id: new ObjectID()}
        //     ], (error, result) => {
        //         if (error)
        //             return console.log("error in inserting", error)
        //         console.log("inserted==============", result.ops)
        //     })
        /**To get all data from collection */
        // db.collection('user').updateOne({_id: new ObjectID("5d8c9c8bb020fa3f9eca77fd")}, {$set:{"age": 25}})
        // .then((res)=> console.log('success ===========', res.result))
        // .catch((e)=>console.log(e))


    } catch (e) { console.log("inside catch==============", e) }


})