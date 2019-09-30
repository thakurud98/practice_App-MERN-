/**Inserting a document into collection */
        db.collection('user').insertOne({
            name: 'uday Singh', age: 24
        }, (error, result)=>{
            if(error) return console.log("error in collection insertion", error)
            console.log(result.ops)
        })

        /**Inserting many documents using mongo's ObjectId which creates 12 bytes sized id */
        await db.collection('user').insertMany([
                { name: 'pankaj Singh', age: 26, _id: new ObjectID() },
                { name: 'Hemant Singh', age: 34, _id: new ObjectID()},
                { name: 'Pradeep Sharma', age: 37, _id: new ObjectID()}
            ], (error, result) => {
                if (error)
                    return console.log("error in inserting", error)
                console.log("inserted==============", result.ops)
            })

            /**To get all data from collection */
        let user = await db.collection('user').find({})
        // console.log("user==============", user)
        console.log("user============== array", await user.toArray()) //[{},{},{}]
        console.log("user==============limit", await db.collection('user').find({}).limit(1).toArray()) // [ { _id: 5d8c9c8bb020fa3f9eca77fd, name: 'pankaj Singh', age: 26 } ]
        console.log("user==============count", await user.count()) // 3
        console.log("user==============read", await user.read()) //null

        let allUser = await db.collection('user').find({})
        console.log("allUser==============", await allUser.toArray()) //using await as it returns promise  //[{},{},{}]
        
        let user = await db.collection('user').findOne({'name': 'pankaj Singh'})
        console.log("user==============", user) //{ _id: 5d8c9c8bb020fa3f9eca77fd, name: 'pankaj Singh', age: 26 } 

        /*************** UpdateQuery **************
         updateMany() : to update multiple documents from collection
         updateOne(): to update individual document
        **/

       db.collection('user').updateOne({_id: new ObjectID("5d8c9c8bb020fa3f9eca77fd")}, {$set:{"age": 25}})
       .then((res)=> console.log('success ===========', res.result))
       .catch((e)=>console.log(e))



       /*************** deleteQuery **************
         deleteMany() : to delete multiple documents from collection
         deleteOne(): to delete individual document
        **/
       
    db.collection('users').deleteMany({age : 23})
    .then((result)=>{
        console.log("use colleciton has============", result)
    }).catch((err)=>{
        console.log("err in user collection",err)
    })
    // This will gonna return a bunch of data, but we only want deletedCount from it.
    // Which can be access using result.deletedCount

    
    db.collection('task').deleteOne({description : "do MCA"})
        .then((result)=>{
            return console.log("use colleciton has============", result.deletedCount)
        }).catch((err)=>{
            return console.log("err in user collection",err)
        })


        /**Mongoose */
        mongoose.connect(connectionUrl+dataBase, {useCreateIndex: true, useNewUrlParser: true})

        const User = mongoose.model("User",{
            name: { type: String, required: true},
            age: { type:Number, required: true},
            email: {
                type: String, required: true, validate(val){
                    if(!validator.isEmail(val)) throw new Error('Invalid Email')  //using validator.js for validation
                }
            }
        },"user")

        const UserName = new User({name: "uday", age : 24, email : 4})

        UserName.save().then((res)=>console.log("data saved=============",res)).catch((e)=>console.log("er============",e))
