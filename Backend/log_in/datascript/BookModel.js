const mongoose = require('mongoose');
const url = "mongodb://localhost:27017/Members";
//const db = mongoose.createConnection(url,{useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
var Schema = mongoose.Schema;
const BookShema = new Schema({
    title:{
        type:String
    },
    User:{
        type:String
    },
    Monday:{
        type:Boolean
    },
    Tuesday:{
        type:Boolean
    },
    Wednesday:{
        type:Boolean
    },
    Thursday:{
        type:Boolean
    },
    Friday:{
        type:Boolean
    }
})
BookShema.set('collection', 'Book');
const model = mongoose.model('Book', BookShema );
module.exports = model;



