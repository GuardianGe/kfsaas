/*获取验证码*/
var countdown = 60;
function timeWork(obj) {
    var time = new Date().getTime();
    var _url = $.kf.CHECKCAPTCHA + "?v=" + time + "&captcha=" + $("#picCode").val();
    if(!isNullOrEmpty($("#picCode").val())){
    	$("#picCodeError").text("");
    	$.ajax({
	        type: "get",
	        url: _url,
	        data: "",
	        dataType: "json",
	        success: function (data) {
	            if (data.code == 0) {
	                $("#picCodeError").text("");
	                setTime(obj);
	                $.ajax({
	                    type: "get",
	                    url: $.kf.SENDCODE + "?phoneNo=" + $("#phoneNo").val(),
	                    data: "",
	                    dataType: "json",
	                    success: function (data) {
	                        if (data.code == "100002") {
	                            $("#codeError").text(data.message);
	                        } else if (data.code == "100001") {
	                            $("#codeError").text(data.message);
	                        } else {
	                            $("#codeError").text("");
	                        }
	                    }
	                });
	
	            } else {
	                $("#picCodeError").text(data.message);
	                var time = new Date().getTime();
	                $("#verifyReg").attr("src", $.kf.CAPTCHA + "?v=" + time);
	            }
	        }
	    });
    }else{
    	$("#picCodeError").text("验证码不能为空");
    }

}
function setTime(obj) {
    if (countdown == 0) {
        obj.removeAttribute("disabled");
        obj.innerHTML = "获取验证码";
        countdown = 60;
        return;
    } else {
        obj.setAttribute("disabled", true);
        $("#phoneNo").attr("disabled", true);
        obj.innerHTML = "重新发送(" + countdown + ")";
        countdown--;
    }
    setTimeout(function () {
        setTime(obj)
    }, 1000)
}
/*校验手机号*/
$("#phoneNo").on("keyup", function () {
	var mobile = $("#phoneNo").val();
    var code = $("#picCode").val();
    if (isMobile(mobile)) {
	    var param = {"phone": mobile}
	    $.ajax({
	        type: "get",
	        url: $.kf.VALIDATEUSER + "?phoneNo=" + mobile,
	        data: "",
	        dataType: "json",
	        success: function (data) {
	            if (data.code != 0) {
	                $("#phoneNoError").text("该手机号已注册");
	                $("#userCode").attr("disabled", true);
	            } else {
	                $("#phoneNoError").text("");
	                if(isNullOrEmpty($("#picCodeError").val())&&!isNullOrEmpty($("#picCode").val())){
                		$("#userCode").attr("disabled", false);
                		$("#userCode").removeClass("active");
	                }
	            }
	        }
	    });
	}else {
        $("#userCode").attr("disabled", true);
        $("#userCode").addClass("active");
    }
});
$("#phoneNo").on("blur", function () {
	var mobile = $("#phoneNo").val();
	if (!isNullOrEmpty(mobile)) {
    	if (!isMobile(mobile)) {
			$("#phoneNoError").text("手机号格式错误");
	        $("#userCode").attr("disabled", true);
		}
    }else{
        $("#phoneNoError").text("手机号不能为空");
        $("#userCode").attr("disabled", true);
    }
})
/*图形验证码4位*/
$("#picCode").on("blur", function () {
    var code = $(this).val();
    var mobile = $("#phoneNo").val();
    if (!isNullOrEmpty(code)) {
        if (code.length != 4) {
            $("#picCodeError").text("请输入4位图形码");
            $("#userCode").attr("disabled", true);
            $("#userCode").addClass("active");
        } else if (isCode(code)) {
            $("#picCodeError").text("");
            if(isNullOrEmpty($("#phoneNoError").text())&&!isNullOrEmpty($("#phoneNo").val())){
        		$("#userCode").attr("disabled", false);
        		$("#userCode").removeClass("active");
            }
        } else {
            $("#picCodeError").text("图形码格式错误");
            $("#userCode").attr("disabled", true);
            $("#userCode").addClass("active");
        }
    } else {
        $("#picCodeError").text("图形码不能为空");
        $("#userCode").attr("disabled", true);
        $("#userCode").addClass("active");
    }
});
$("#picCode").on("keyup", function () {
	var code = $(this).val();
	if (code.length != 4) {
	 	$("#userCode").attr("disabled", true);
        $("#userCode").addClass("active");
	}else if (isCode(code)) {
		$("#picCodeError").text("");
        if(isNullOrEmpty($("#phoneNoError").text())&&!isNullOrEmpty($("#phoneNo").val())){
    		$("#userCode").attr("disabled", false);
    		$("#userCode").removeClass("active");
        }
	}else {
        $("#picCodeError").text("图形码格式错误");
        $("#userCode").attr("disabled", true);
        $("#userCode").addClass("active");
    }
})
/*姓名*/
new BlurIpt($("#userName"), {}, userName, $("#userNmaeError")).init();
/*邮箱*/
new BlurIpt($("#userEmail"), {}, userEmail, $("#userEmailError")).init();
/*职位*/
new BlurIpt($("#userJob"), {}, userMess, $("#userJobError")).init();
/*公司*/
new BlurIpt($("#userCompnay"), {}, userMess, $("#userComError")).init();

/*校验验证码6位*/
$("#phoneCode").on("keyup", function () {
    var code = $(this).val();
    if (!isNullOrEmpty(code)) {
        if (code.length != 6) {
            $("#codeError").text("请输入6位验证码");
        } else if (isCode(code)) {
            $("#codeError").text("");
        } else {
            $("#codeError").text("验证码格式错误");
        }
    } else {
        $("#codeError").text("验证码不能为空");
    }
});

/*第一次密码校验*/
$("#pw1").on("blur", function () {
    var passw = $(this).val();
    if (!isNullOrEmpty(passw)) {
        if (passw.length < 6) {
            $("#pwError01").text("密码长度最小6位");
        } else if (isPassWord(passw)) {
            $("#pwError01").text("");
        } else {
            $("#pwError01").text("密码格式错误");
        }
    } else {
        $("#pwError01").text("密码不能为空");
    }
});
/*密码显示*/
$(".eye").on("click", function () {
    var name = $(this).attr("name");
    if (name == "1") {
        $('#pw1').attr("type", "text");
        $(this).attr("name", "0").addClass("eyeOpen");
    } else {
        $('#pw1').attr("type", "password")
        $(this).attr("name", "1").removeClass("eyeOpen");
    }
});

/*第2次密码校验*/
/*$("#pw2").on("blur",function(){
 var passw2 = $(this).val();
 var passw = $("#pw1").val();
 if(!isNullOrEmpty(passw2)){
 if(passw2.length < 6){
 $("#pwError02").text("密码长度最小6位");
 }else if(passw2 != passw){
 $("#pwError02").text("两次密码不一致");
 }else{
 $("#pwError02").text("");
 }
 }else{
 $("#pwError02").text("密码不能为空");
 }
 });*/

//是否勾选checkbox
$(".register-check").on("click", function () {
    if ($(this).is(":checked")) {
        $("#registeCheck").text("");
    } else {
        $("#registeCheck").text("请勾选我已同意并阅读使用许可协议");
    }
});
/*注册第一页提交*/
$('#register').on("click", function () {
    if (checkAll()) {
        if (errorTip()) {
            $('#register').attr("disabled", true);
            if ($(".register-check").is(":checked")) {
                $("#registeCheck").text("");
                var param = {
                    username: $("#phoneNo").val(),
                    code: $("#phoneCode").val(),
                    password: $("#pw1").val(),
                    captcha: $("#picCode").val(),
                    isAgreement: 1
                }
                $.ajax({
                    type: "post",
                    url: $.kf.REGISTER,
                    data: param,
                    dataType: "json",
                    success: function (data) {
                        if (data.code == "100001") {//图片验证码错误
                            $("#picCodeError").text(data.message);
                            $('#register').attr("disabled", false);
                        } else if (data.code == "100002") {//短信验证码错误
                            $("#codeError").text(data.message);
                            $('#register').attr("disabled", false);
                            var time = new Date().getTime();
                            $("#verifyReg").attr("src", $.kf.CAPTCHA + "?v=" + time);
                        } else {
                            $("#codeError").text("");
                            $("#picCodeError").text("");
                            window.location.href = "/user/info";
                        }
                    }
                });
            } else {
                $("#registeCheck").text("请勾选我已同意并阅读用户注册协议");
            }
        }
    }
    ;
});
/*注册第2页,填写个人信息*/
$('#register02').on("click", function () {
    if (checkAll()) {
        if (errorTip()) {
            $('#register02').attr("disabled", true);
            var username = $("#userName").val();
            var useremail = $("#userEmail").val();
            var userjob = $("#userJob").val();
            var usercompany = $("#userCompnay").val();
            var param = {
                username: username,
                useremail: useremail,
                userjob: userjob,
                usercompany: usercompany
            };
            var _url = $.kf.UPDATEUSERINFO;
            $.ajax({
                type: "post",
                url: _url,
                data: param,
                dataType: "json",
                success: function (data) {
                    window.location.href = "/user/success";
                }
            });
        }
    }
    ;
});

//验证码
function verifyReg() {
    var time = new Date().getTime();
    $("#verifyReg").attr("src", $.kf.CAPTCHA + "?v=" + time);
    /*图形验证码*/
    $("#verifyReg").on("click", function () {
        var time = new Date().getTime();
        $(this).attr("src", $.kf.CAPTCHA + "?v=" + time);
    });

}


/*注册第3页,认证页*/
$("#login-toIdentify").on("click", function () {
    $('#login-toIdentify').attr("disabled", true);
    window.location.href = $.url.certification();
});


//直接登录
$("#reg04").on("click", function () {
	$('#reg04').attr("disabled", true);
	$.cookie("certified", "unCertify",{ path: "/", expiress: "" ,sucue:true});//是否认证
    window.location.href = $.url.companyList();
});
/*权限到期页面*/
$("#toCertifyHtml").on("click", function () {
    $('#toCertifyHtml').attr("disabled", true);
    window.location.href = $.url.certification();
});