/*查cookie*/
$(document).ready(function () {
    verify();
    if ($.cookie("rmbUser") == "true") {
        $("#rmbPw").attr("checked", true);
        $("#loginName").val($.cookie("username"));
        $("#loginPw").val($.cookie("password"));
    }
});
function verify() {
	var time = new Date().getTime();
    $("#verify").attr("src", $.kf.CAPTCHA +"?v="+ time);
    /*图形验证码*/
    $("#verify").on("click", function () {
        var time = new Date().getTime();
        $(this).attr("src", $.kf.CAPTCHA +"?v="+ time);
    });

}
//记住用户名密码
function savePw() {
    if ($("#rmbPw").is(':checked')) {
        var str_username = $("#loginName").val();
        var str_password = $("#loginPw").val();
        $.cookie("rmbUser", "true", {expires: 30}); //存储一个带30天期限的cookie
        $.cookie("username", str_username, {expires: 30});
        $.cookie("password", str_password, {expires: 30});
    }
    else {
        $.cookie("rmbUser", "false", {expire: -1});
        $.cookie("username", "", {expires: -1});
        $.cookie("password", "", {expires: -1});
    }
};

/*用户名登录*/
new BlurIpt($("#loginName"),{},isMobile,$("#loginNameError")).init();
/*密码显示*/
$(".eye").on("click", function () {
    var name = $(this).attr("name");
    if (name == "1") {
        $('#loginPw').attr("type", "text");
        $(this).attr("name", "0").addClass("eyeOpen");
    } else {
        $('#loginPw').attr("type", "password")
        $(this).attr("name", "1").removeClass("eyeOpen");
    }
});



/*密码登录*/
$("#loginPw").on("blur", function () {
    var pw = $(this).val();
    if (isNullOrEmpty(pw)) {
        $("#loginPwError").text("密码不能为空");
    } else {
        $("#loginPwError").text("");
    }
});
/*login验证码*/
new BlurIpt($("#loginCode"),{},isCode,$("#loginCodeError")).init();



/*login全局校验输入项*/
var checkAllLogin = function () {
    var flg = true;
    $(".login").find(".form-control").each(function () {
        if ($(this).val() == "") {
            $(this).parents(".form-group").next(".login-error").text($(this).attr("name") + "不能为空");
            flg = false;
        }
    });
    return flg;
}
/*login错误提示校验*/
var errorTipLogin = function () {
    var tip = true;
    $(".login-form").find(".login-error").each(function () {
        if ($(this).text() != "") {
            tip = false;
        }
    });
    return tip;
}

//回车搜索
$("#loginPw").on("keydown",function(e){
	var keyCode = e.which;
	if(keyCode == 13){
		$("#loginBtn").click();
	}
	
});


