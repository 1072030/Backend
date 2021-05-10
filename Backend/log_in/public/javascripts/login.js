$(document).ready(function(){
    if($.cookie('userName') != null){
        location.href = '/public/租借.html';
    }
    $('#loginbtn').click(function(){
        var _account = $('#account').val();
        var _password = $('#pwd').val();
        var API = "http://localhost:2000/member/login";
    if (_account == "" || _password == "") {
        alert('請輸入帳號密碼!');
    }
    else {
        $.post(API, { 'account':_account, 'password':_password }, function(res){
            if (res.status == 1) {
               $('#errmsg').text(res.msg);
            } else {
                $.cookie('userName', res.data.name);
                $.cookie('userID', res.data.account);
                
                alert('登入成功!');
                location.href = '/public/租借.html';
            }
        });
    }
    });
});