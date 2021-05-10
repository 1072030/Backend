const mongoose = require('mongoose');
const url = "mongodb://localhost:27017/Members";
//const db = mongoose.createConnection(url,{useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
/*db.on('connected',function(err){
    if(err){
        console.log('資料庫連接失敗!'+err);
    }else{
        console.log('資料庫連接成功！');
    }
});*/
var Schema = mongoose.Schema;
const MeetingSchema = new Schema({
    title : {
        type: String,
        require : [true, '請輸入帳號']
    },
    state :  {
        type:Boolean
    },
    User :  {
        type:Array,
        item : {
            type: String
        }
    }
});
MeetingSchema.set('collection', 'AllMeeting');
const model = mongoose.model('AllMeeting',MeetingSchema);
//---------------
/*const test = new model({title:"AAAA",state:true});
test.save(function(err){
    if(err) throw err;
    console.log('新增成功');
})*/
//-------------
module.exports = model;