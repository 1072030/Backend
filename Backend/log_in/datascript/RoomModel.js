const mongoose = require('mongoose');
const url = "mongodb://localhost:27017/Members";
//const db = mongoose.createConnection(url,{useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
var Schema = mongoose.Schema;
const RoomSchema = new Schema({
    name : {
        type: String,
    },
    When : {
        type:Number
    },
    check :{
        type:Boolean
    },
    user : {
        type: String,
    },
    final:{
        type:String,
    },
    finalWhen:{
        type:Number,
    },
    state:{
        type:Boolean
    }
});
RoomSchema.set('collection','Room');
const model = mongoose.model('Room',RoomSchema);
module.exports = model;