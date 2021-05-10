$(document).ready(function(){
    getMeet();
    function getMeet(){
        var api ="http://localhost:2000/member/Search?User="+$.cookie("userName");
        $.get(api,function(data){
            for(var i = 0;i<data.length;i++){
                addMeet(data[i]);
                console.log(data);
            }
        })
    }
    function addMeet(data){
        let add = 
        `<div class="col-3">
        <div class="border border-dark mh-100 bg-warning"style="height:350px" >
            <div class="row justify-content-center data_title"style="font-size:50px" >${data.title}</div>   
            <input type="button" value="+" style="float: right;" class="join" onClick="location.href='http://localhost:2000/public/in_meeting.html?title=${data.title}'">                                                                                                                                                                 
            <span id="people">人數 :${data.User.length}</span>
            </div>
        </div>`
        $('.name1').append(add);
    }
})