const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/Members";

MongoClient.connect(url,{useNewUrlParser:true,useUnifiedTopology:true},function(err,db){
    if(err) throw err;
    const dbo = db.db("Members");
    default_Room = [
       {"name" : "1024","When" : 1,"check":false,"state": false},
       {"name" : "1024","When" : 2,"check":true,"state": false},
       {"name" : "1024","When" : 3,"check":true,"state": false},
       {"name" : "1024","When" : 4,"check":false,"state": false},
       {"name" : "1024","When" : 5,"check":false,"state": false},
       {"name" : "1025","When" : 1,"check":false,"state": false},
       {"name" : "1025","When" : 2,"check":true,"state": false},
       {"name" : "1025","When" : 3,"check":true,"state": false},
       {"name" : "1025","When" : 4,"check":true,"state": false},
       {"name" : "1025","When" : 5,"check":true,"state": false},
       {"name" : "1026","When" : 1,"check":true,"state": false},
       {"name" : "1026","When" : 2,"check":false,"state": false},
       {"name" : "1026","When" : 3,"check":false,"state": false},
       {"name" : "1026","When" : 4,"check":false,"state": false},
       {"name" : "1026","When" : 5,"check":true,"state": false},
       {"name" : "2048","When" : 1,"check":true,"state": false},
       {"name" : "2048","When" : 2,"check":true,"state": false},
       {"name" : "2048","When" : 3,"check":true,"state": false},
       {"name" : "2048","When" : 4,"check":true,"state": false},
       {"name" : "2048","When" : 5,"check":true,"state": false},
       {"name" : "2049","When" : 1,"check":false,"state": false},
       {"name" : "2049","When" : 2,"check":false,"state": false},
       {"name" : "2049","When" : 3,"check":true,"state": false},
       {"name" : "2049","When" : 4,"check":false,"state": false},
       {"name" : "2049","When" : 5,"check":false,"state": false},
       {"name" : "2050","When" : 1,"check":true,"state": false},
       {"name" : "2050","When" : 2,"check":true,"state": false},
       {"name" : "2050","When" : 3,"check":false,"state": false},
       {"name" : "2050","When" : 4,"check":false,"state": false},
       {"name" : "2050","When" : 5,"check":true,"state": false},

       
    ]
    dbo.collection("Room").insertMany(default_Room,function(err,res){
        if(err) throw err;
        console.log("successfully");
        db.close();
    })
})