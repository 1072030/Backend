const mongoose = require('mongoose');
const url = "mongodb://localhost:27017/Members";
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("連線成功");
});
const listSchema = new mongoose.Schema({
    account : {
        type: String,
        require : [true, '請輸入帳號']
    },
    name : {
        type:String,
        require : [true, '請輸入姓名']
    },
    email :{
        type:String,
        require : [true, '請輸入信箱']
    },
    password:{
        type:String,
        require : [true, '請輸入密碼']
    },
    password_confirm:{
        type:String,
        require : [true, '請輸入密碼']
    }
});
/*const breakfast = new mongoose.Schema({
    // eggs - 可填的value為數字型態，範圍在6~12，小於6會顯示'Too few eggs'，
    //沒填會顯示'Why no eggs?'
    eggs: {
        type: Number,
        min: [6, 'Too few eggs'],
        max: 12,
        required: [true, 'Why no eggs?']
      },
      // drink - 可填的value為字串型態，只可填入Coffee、Tea、Water
      drink: {
        type: String,
        enum: ['Coffee', 'Tea', 'Water']
      }
});*/
listSchema.set('collection', 'list');
const model = mongoose.model('list', listSchema);
module.exports = model;