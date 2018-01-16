
/*修改密码*/
var modifyPassword = function () {
	
	/*内容写入*/
    var modifyPasswordCon = function () {
        //获取用户手机
        $.kf.ajax({
            type: "get",
            url: $.kf.GETUSERINFO,
            data: "",
            dataType: "json",
            processResponse: function (data) {
                var data = data.data;
                $(".original span").text(data.tel)
            }
        });

        //发送验证码
        var countdown = 60;
        var t = null;
        $("#send").click(function () {
            $(this).attr("disabled", true);
            setTime(this)
            var time = new Date().getTime();
            $.ajax({
                type: "get",
                url: $.kf.MODIFYCODE,
                data: "",
                dataType: "json",
                success: function (data) {
                    if (data.code == "100001") {
                        $("#pwError01").text(data.message);
                        /* if(t){
                         clearTimeout(t);
                         //$("#send").text("发送");
                         }*/
                    } else if (data.code == "100002") {
                        $("#pwError01").text(data.message);
                    } else {
                    	$("#Vcode").attr("disabled", false);
                        $("#pwError01").text("");
                    }
                }
            });
        })
        function setTime(obj) {
            if (countdown == 0) {
                obj.innerHTML = "重新发送";
                countdown = 60;
                $("#send").attr("disabled", false);
                return;
            } else {
                obj.innerHTML = countdown + "s";
                countdown--;
            }
            t = setTimeout(function () {
                setTime(obj)
            }, 1000)
        }

        /*密码校验*/
        $("#Vcode").on("blur", function () {
            var pw = $(this).val();
            if (!isNullOrEmpty(pw)) {
                $("#pwError01").text("");
            } else {
                $("#pwError01").text("验证码不能为空");
            }
        });
        $("#newsPass").on("blur", function () {
            var pw = $(this).val();
            if (!isNullOrEmpty(pw)) {
                if (pw.length < 6) {
                    $("#pwError02").text("密码长度最小6位");
                } else if (isPassWord(pw)) {
                    $("#pwError02").text("");
                } else {
                    $("#pwError02").text("新密码格式不正确，密码需要包含字母和数字");
                }
            } else {
                $("#pwError02").text("密码不能为空");
            }
        });
        //提交密码
        $("#modifySub").on("click", function () {
            var code = $("#Vcode").val();
            var password = $("#newsPass").val();
            if (isNullOrEmpty(code)) {
                $("#pwError01").text("验证码不能为空")
            } else if (password.length < 6) {
                $("#pwError02").text("密码长度最小6位");
            } else if (isNullOrEmpty(password)) {
                $("#pwError02").text("新密码不能为空")
            } else if (!isPassWord(password)) {
                $("#pwError02").text("新密码格式不正确，密码需要包含字母和数字")
            } else {
                //上送参数
                var param = {
                    code: $("#Vcode").val(),
                    password: $("#newsPass").val()
                }

                $.kf.ajax({
                    type: "post",
                    url: $.kf.MODIFYPWD,
                    data: param,
                    dataType: "json",
                    processResponse: function (data) {
                        if (data.code == 10001) {
                            $("#pwError01").text(data.message)
                        } else if (data.code == 100005) {
                            $("#pwError02").text(data.message)
                        } else if (data.code == 100003) {
                            $("#pwError01").text(data.message)
                        } else if (data.code == 0) {
                            $("#content").fadeIn().delay(3000).fadeOut();
                            setTimeout(function () {
                                window.top.location.href = "http://test.kaifengdata.com/user/login";
                            }, 3000)
                        }
                    }
                });
            }
        })

        $("#cancelT").attr("href", $.url.marketView())
    }
    return{
    	init:function(){
    		modifyPasswordCon();
    	}
    }
}();
