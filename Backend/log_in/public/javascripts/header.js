$(document).ready(function(){
    if (!$.cookie('userID') || $.cookie('userID') == "null") {
        $('#login').show();
        $('#changePW').hide();
        $('#username').hide();
        $('#logout').hide();
    } else {
        $('#login').hide();
        $('#changePW').show();
        $('#username').show();
        $('#username').text("UserName : " + $.cookie('userName'));
        $('#logout').show();
    }
    //登出功能
})
function logout(){
    console.log('清除');
    //$.removeCookie("userID",{ path: '/' });
    //$.removeCookie("userName" ,{ path: '/' });
    $.cookie("userID",null);
    $.cookie("userName",null);
    $.removeCookie('userID');
    $.removeCookie('userName');
    history.go(0);
    location.href = '/public/首頁.html';
}

    