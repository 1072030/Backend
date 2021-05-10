var express = require('express');
var router = express.Router();

var MeetingModel = require('../datascript/MeetingModel');
var listModel = require('../datascript/listModel');
var RoomModel = require('../datascript/RoomModel');
var BookModel = require('../datascript/BookModel');
/* GET home page. */
router.post('/Register', function(req, res, next) {
    var list = new listModel({
        "account" : req.body.account,
        "name":req.body.name,
        "email" : req.body.email,
        "password" : req.body.password,
        "password_confirm" : req.body.password_confirm,
    });
    listModel.countDocuments({account: req.body.account}, function(err, data){
        if(data>0){
            res.json({"status":1, "msg":"此帳號已被註冊!"});
        } else {
            list.save(function(err, data){
                if(err){
                    res.json({"status":1, "msg":"error"});
                } else {
                    res.json({"status":0, "msg":"success", "data":list});
                }
            });
          }
    });
})
router.post('/login', function(req, res){
    listModel.findOne({account:req.body.account, password:req.body.password}, function(err
    , data){
    if(data == null){
    res.json({"status":1, "msg":"帳號密碼錯誤!"});
    } else if(err){
    res.json({"status":1, "msg":"error"});
    } else {
     res.json({"status":0, "msg":"success", "data":data});
        }
    })
});
//-------------------------------↓↓↓Allmeeting↓↓↓----------------------↓↓↓Allmeeting↓↓↓--------------------↓↓↓Allmeeting↓↓↓
router.post('/Allmeeting',function(req,res,next){
    var meeting_data = new MeetingModel({
        "title" : req.body.title,
        "state" : req.body.state,
        "User" : req.body.User
    })
    MeetingModel.countDocuments({title: req.body.title}, function(err, data){
        if(data>0){
            res.json({"status":1, "msg":"此名稱已重複!"});
        } else {
            MeetingModel.update({title: req.body.title},{$push:{User: req.body.User}});
            meeting_data.save(function(err, data){
                if(err){
                    res.json({"status":1, "msg":"error"});
                } else {
                    res.json({"status":0, "msg":"success", "data":data});
                }
            });
        }
    });
});
router.get('/AllmeetingList', function(req, res){
    MeetingModel.find(function(err, data){
        if(err) console.log(err);
        res.json(data);
    });
});

//------search

router.get('/Search', function(req, res){
    MeetingModel.find({User:req.query.User},function(err, data){
        if(err) console.log(err);
        res.json(data);
    });
});

//------search
router.get('/In_meeting', function(req, res){
    MeetingModel.find({title:req.query.title},function(err, data){
        if(err) console.log(err);
        res.json(data);
    });
});

router.post('/checkpeople',function(req,res){
    MeetingModel.find(function(err,data){
        if(err) console.log(err);
        res.json(data);
    })
})
router.post('/Addmember',function(req,res){
    var meeting_data = new MeetingModel({
        "title" : req.body.title,
        "state" : req.body.state,
        "User" : req.body.User
    })
    MeetingModel.countDocuments({title: req.body.title}, function(err, data){
        if(data ==1){
            MeetingModel.countDocuments({title: req.body.title,User:req.body.User},function(err,data){
                if(data >= 1){
                    console.log("already have");
                }
                else{
                    MeetingModel.update({title: req.body.title},{$push:{User: req.body.User}},function(){
                        console.log(req.body.title);
                    });
                }
            })
        } else{
            res.json({"status":1, "msg":"此名稱已重複!"});
        }
    });
})
//------------------↓↓↓Book↓↓↓-----------------------↓↓↓Book↓↓↓-----------
router.post('/bookTime',function(req,res){
    var bookTime = new BookModel({
        "title":req.body.title,
        "User":req.body.User,
        "Monday" : req.body.Monday,
        "Tuesday" : req.body.Tuesday,
        "Wednesday":req.body.Wednesday,
        "Thursday":req.body.Thursday,
        "Friday":req.body.Friday
    })
    BookModel.countDocuments({User:req.body.User,title:req.body.title}, function(err, data){
        if(data ==1){
            BookModel.update({User:req.body.User},{$set:{Monday:req.body.Monday}},function(){
                //console.log("success 1");Debug
            }),
            BookModel.update({User:req.body.User},{$set:{Tuesday:req.body.Tuesday}},function(){
                //console.log("sucess 2");Debug
            }),
            BookModel.update({User:req.body.User},{$set:{Wednesday:req.body.Wednesday}},function(){
                //console.log("sucess 3");Debug
            }),
            BookModel.update({User:req.body.User},{$set:{Thursday:req.body.Thursday,}},function(){
                //console.log("sucess 4");Debug
            }),
            BookModel.update({User:req.body.User},{$set:{Friday:req.body.Friday}},function(){
                //console.log("sucess 5");Debug
            })
            res.json({"status":0,"msg":"成功更新資料"});
        } else{
            bookTime.save(function(err,data){
                if(err) throw err;
                else{
                    res.json({"status":1,"data":data});
                }
            })
        }
    });
})
//------------------↓↓↓Room↓↓↓-----------------------↓↓↓Room↓↓↓-----------
router.post('/Room',function(req,res){
    var Room_data = new RoomModel({
        "name" : req.body.name,
        "When" :req.body.When,
        "check" : req.body.check,
        "user":req.body.user,
        "final" : req.body.final,
        "finalWhen":req.body.finalWhen,
        "state":req.body.state
    })
    RoomModel.countDocuments({name:req.body.name}, function(err, data){
        if(data >1){
            console.log(data);
            RoomModel.countDocuments({name:req.body.name,When :req.body.When,check:req.body.check},function(err,data){
                console.log(data);
                if(data == 1){
                    RoomModel.update({check:req.body.check},{$set:{user:req.body.user}},function(){

                    })
                    RoomModel.update({check:req.body.check},{$set:{final:req.body.final}},function(){

                    })
                    RoomModel.update({check:req.body.check},{$set:{finalWhen:req.body.finalWhen}},function(){
                    
                    })
                    RoomModel.update({check:req.body.check},{$set:{state:true}},function(){
                    
                    })
                    RoomModel.update({check:req.body.check},{$set:{check:false}},function(err,data){
                        if(err){
                            throw err;
                        }
                        else{
                            res.json({"status":0,"msg":"預約成功"});

                        }
                    })
                }
                else{
                    res.json({"status":1, "msg":"教室已被借走"});
                }
            })
        } else{
            res.json({"status":1, "msg":"錯誤查詢"});
        }
    });
});
router.get('/RoomFind',function(req,res){
    RoomModel.find({state:req.query.state},function(err, data){
        if(err) console.log(err);
        res.json(data);
    });
})
module.exports = router;
