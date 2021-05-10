$(document).ready(function(e){
    //------------------------------click
    $('#Add').click(function(){
        /*let content = '<input type="text" placeholder="請輸入會議名稱" id="meeting_name">'
        $('#key_in').append(content);*/
        $('#key_in').show();
    })
    $('#confirmed').click(function(){
        let title = $('#meeting_name').val();
        var API = "http://localhost:2000/member/Allmeeting";
        let addMeeting = {
            'title' : title,
            'state' : true,
            'User' : $.cookie('userName')
        };
        if(title == "" ){
            alert("輸入會議名稱和密碼");
        }else{
            $('#meeting_name').val('');
            $.post(API,addMeeting,function(res){
                if(res.status == 0){
                    newMeetting(addMeeting);
                }
                else{
                    console.log("err");
                }
            })
            $('#key_in').hide();
        }
    })
    $(document).on('click','.join',function(event){
        event.stopPropagation();
        event.stopImmediatePropagation();
        var value = $(this).siblings('.data_title').text();
        let title = value;
        console.log(value);
        var API = "http://localhost:2000/member/Addmember";
        let addMeeting = {
            'title' : title,
            'state' : true,
            'User' : $.cookie('userName')
         };
        $.post(API,addMeeting,function(res){
            console.log(res.User);
        })   
    })
    //----------------------------更新
    getList();
    function getList(){
        var api ="http://localhost:2000/member/AllmeetingList";
        $.get(api,function(data){
            for(var i = 0;i<data.length;i++){
                newMeetting(data[i]);
            }
        })
        
    }
    function newMeetting(data){
        let content=
        `<div class="col-3">
        <div class="border border-dark mh-100 bg-warning"style="height:350px" >
            <div class="row justify-content-center data_title"style="font-size:50px" >${data.title}</div>   
            <input type="button" value="+" style="float: right;" class="join" onClick="location.href='http://localhost:2000/public/in_meeting.html?title=${data.title}'">                                                                                                                                                                 
            <span id="people">人數 : ${data.User.length}</span>
            </div>
        </div>`
        $('.containerbox').append(content);
        
    }
    
})