
$(document).ready(function(){

    //---------------------------------------與後端相關-----------------
    $('#btn_confirm').click(function(){
        var id = document.getElementsByName('week');
        var week = new Array();
        /*$('input:checkbox:checked[name="week"]').each(function(i,n){
            week[i] = this.value;
            console.log(week[i]);
        })
        for(var i = 1;i<=week.length;i++){
            if(week[0] == )
        }*/
        for(var i = 0;i<id.length;i++){
            if(id[i].checked){
                week.push(1);//布林判斷
            }
            else{
                week.push(0);//布林判斷
            }
        }
        var API = "http://localhost:2000/member/bookTime"
        let data = {
            title:$.cookie('title'),
            User :$.cookie('userName'),
            Monday : week[0],
            Tuesday : week[1],
            Wednesday :week[2],
            Thursday :week[3],
            Friday : week[4]
        }
        $.post(API,data,function(res){
            if(res.status == 0){
                alert("成功更新!");
            }
            else{
                alert("成功登記!");
            }
        })
        $('#choose').addClass("none");
    });
    $('#confirm_date').click(function(){
        var week = $('input[name=date]:checked').val();
        var API = "http://localhost:2000/member/Room";
        
        let Change = {
            name :$.cookie('room'),
            When : week,
            check : true,
            user:$.cookie('userName'),
            final:$.cookie('room'),
            finalWhen : week,
            state:true
        }
        $.post(API,Change,function(res){
            console.log(Change);
            console.log(res);
            if(res.status == 1){
                $('#error').text("教室已被借走!!");
            }
            else if(res.status == 0){
                $('#error').text("預約成功");
                document.getElementById("confirm_date").disabled = true;
                document.getElementById("rent").disabled =true;
            }
        })
    })
    
    


     //------------------------------------------------與後端相關-----------------


    















    getfinal();
    function getfinal(){
        $('#rent').attr("disabled",false);
        var user = $.cookie('userName');
        var sta = true;
        var API = "http://localhost:2000/member/RoomFind?state="+sta;
        $.get(API,function(data){
            for(var i = 0;i<data.length;i++){
                console.log(data[i]);
                if(data[i].user == user){
                    console.log(data[i].user);
                    addFinal(data[i]);
                }
                else{
                    console.log(0);
                }
            }
           
        })
    }
    function addFinal(data){
        document.getElementById("rent").disabled = true;
        let add = 
        `<div style="margin-top:30px;">最後選擇 :${data.final}教室，禮拜${data.finalWhen}</div>`
        $('#final').append(add);
    }
    //------------------------------------------------↓更新頁面--------------------
    function addUser(data){
        let addbox=
            `  <div class=" box_1 col-md-3 border  border-dark mh-100 offset-md-2"  style="height:150px;width:50%;">
            <div class="nam">
                ${data}
            </div>
        </div>`
        $('.name1').append(addbox);
    }
    getmember(); //確定會議人數
    function getmember(){
       var path = location.href.split("=");  
       var title = path[path.length-1];
       $.cookie('title',title);
        var api ="http://localhost:2000/member/In_meeting?title="+title;
        $.get(api,function(data){
            for(var i = 0;i<data[0].User.length;i++){
                addUser(data[0].User[i]);
                var temp = data[0].User[0];
                
               if($.cookie('userName') != temp){
                document.getElementById("rent").disabled =true;
               }
            }
        })
    }
    //------------------------------------------------↑更新頁面-----------------------
    //------------------------------------------------前端click事件-----------------------
    $('#sign').click(function(){
        var show = document.getElementsByName('week');
        $('.up1').parents('div').removeClass('none');
        $(show).parents('div').removeClass('none');
    })
    $('#rent').click(function(){
        var show = document.getElementsByName('room');
        var next = document.getElementsByName('date');
        $(next).parents('div').addClass('none');
        $(show).removeClass('disabled-radio');
        $('#confirm_room').removeClass('none');
        $(show).parents('div').removeClass('none');
        $('#error').text("");
    })
    
    $('#confirm_room').click(function(){
        var show = document.getElementsByName('room');
        var room = $(':radio:checked');
        if(room.length > 0){
            $.cookie('room',$(":radio:checked").val());//cookie
        }
        $(show).addClass('disabled-radio');
        var next = document.getElementsByName('date');
        $(next).parents('div').removeClass('none');
        $('#confirm_room').addClass('none');
        
    });
    //------------------------------------------------前端click事件-----------------------
})