

$(document).ready(function(){
    $('#RegisterForm').on('submit',(e) =>{
        e.preventDefault();
        let hash = {};
        let arg = ['account','name','email','password','password_confirm'];
        var API = "http://localhost:2000/member/Register";
        arg.forEach((name) => { //foreach 內容全部
            let value = $('#RegisterForm').find(`[name= ${name}]`).val(); //不懂 & 符號為什麼不一樣
            hash[name] = value; //把資料丟到hash 來確認內容是否為空
        })
        $('#RegisterForm').find('.error').each((index,span)=>{
            $(span).text('');//初始的錯誤提示為空
        })
        if(hash['account']===''){
            $('#RegisterForm').find('[name = "account"]').siblings('.error').text('請輸入帳號'); 
            //讓error 顯示沒有輸入
            return
        }
        if(hash['name']===''){
            $('#RegisterForm').find('[name = "name"]').siblings('.error').text('請輸入姓名'); 
            //讓error 顯示沒有輸入
            return
        }
        if(hash['email']===''){
            $('#RegisterForm').find('[name = "email"]').siblings('.error').text('請輸入郵件'); 
            //讓error 顯示沒有輸入
            return
        }
        if(hash['password'] === ''){
            $('#RegisterForm').find('[name = "password"]').siblings('.error').text('請輸入密碼');
            //讓error 顯示沒有輸入
            return
        }
        if(hash['password_confirm'] === ''){
            $('#RegisterForm').find('[name = "password_confirm"]').siblings('.error').text('請輸入密碼');
            //讓error 顯示沒有輸入
            return
        }
        if(hash['password'] !== hash['password_confirm'] ){
            $('#RegisterForm').find('[name = "password_confirm"]').siblings('.error').text('密碼不匹配');
            //兩組密碼不一樣
            return
        }
        $.post(API,hash,function(){
            alert("成功!");
            location.href="/public/login.html";
        })     
        
    });
})

