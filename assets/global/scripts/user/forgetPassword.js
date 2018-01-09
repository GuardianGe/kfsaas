/*获取验证码*/
var countdown = 60;
function timeWork(obj) {
    var time = new Date().getTime();
    var _url = $.kf.CHECKCAPTCHA + "?v=" + time + "&captcha=" + $("#picCode").val();
    $.kf.ajax({
        type: "get",
        url: _url,
        data: "",
        dataType: "json",
        processResponse: function (data) {
            if (data.code == 0) {
                $("#picCodeError").text("");
                setTime(obj);
                $.kf.ajax({
                    type: "get",
                    url: $.kf.SENDCODE + "?phoneNo=" + $("#phoneNo").val() + "&type=forget",
                    data: "",
                    dataType: "json",
                    processResponse: function (data) {
                        if (data.code == "100002") {
                            $("#codeError").text("");
                        } else {
                            $("#codeError").text(data.message);
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
        $.kf.ajax({
            type: "get",
            url: $.kf.VALIDATEUSER + "?phoneNo=" + mobile + '&type=forget',
            data: "",
            dataType: "json",
            processResponse: function (data) {
                if (data.code == "100001") {
                    $("#phoneNoError").text(data.message);
                    $("#userCode").attr("disabled", true);
            $("#userCode").addClass("active");
                } else {
                    $("#phoneNoError").text("");
                    if(isNullOrEmpty($("#picCodeError").val())&&!isNullOrEmpty($("#picCode").val())){
                		$("#userCode").attr("disabled", false);
                		 $("#userCode").removeClass("active");
	                }
                }
            }
        });
    } else {
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
            $("#userCode").addClass("active");
		}
    }else{
        $("#phoneNoError").text("手机号不能为空");
        $("#userCode").attr("disabled", true);
            $("#userCode").addClass("active");
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

/*校验验证码6位*/
$("#phoneCode").on("blur", function () {
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
        $("#codeError").text("短信验证码不能为空");
    }
});

/*找回密码第一页提交*/
$('#forgetPbtn').on("click", function () {
    if (checkAll()) {
        if (errorTip()) {
            $("#registeCheck").text("");
            var param = {
                tel: $("#phoneNo").val(),
                captcha: $("#picCode").val(),
                code: $("#phoneCode").val()
            }
            $.kf.ajax({
                type: "post",
                url: $.kf.FINDPWD,
                data: param,
                dataType: "json",
                processResponse: function (data) {
                    if (data.code == 100002) {
                        $("#picCodeError").text("图形验证码错误");
                    } else if (data.code == 100001) {
                        $("#codeError").text(data.message);
                        var time = new Date().getTime();
                        $("#verifyReg").attr("src", $.kf.CAPTCHA + "?v=" + time);
                    } else if (data.code == 100005) {
                        $("#codeError").text(data.message);
                    } else {
                        $("#codeError").text("");
                        $("#picCodeError").text("");
                        window.location.href = "/user/modifypassword";
                    }
                }
            });
        }
    }
    ;
});

/*找回密码第二页提交*/
$('#forgetP2btn').on("click", function () {
    if (checkAll()) {
        if (errorTip()) {
            $('#forgetPbtn').attr("disabled", true);
            var param = {
                password: $("#pw1").val()
            }
            $.kf.ajax({
                type: "post",
                url: $.kf.RESETPASSWORD,
                data: param,
                dataType: "json",
                processResponse: function (data) {
                    window.location.href = "/user/login";
                }
            });
        }
    }

})


/*找回密码第三页提交*/
$("#forgetP3btn").on("click", function () {
    window.location.href = "/user/login";
})


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