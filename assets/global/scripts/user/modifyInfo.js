
/*资料修改*/
var pageMessage = function () {
	/*内容写入*/
    var pageContent = function(){
    	$.kf.ajax({
	        type: "get",
	        url: $.kf.GETUSERINFO,
	        data: "",
	        dataType: "json",
	        processResponse: function (data) {
	            var data = data.data;
	            getInfoFun(data);
	        }
	    });
	    //写入页面信息
	    function getInfoFun(data) {
	    	if(data.certifiedImg != ""){
	    		$("#modifyMR").show();
	    		$("#imghead").attr("src",data.certifiedImg)
	    	}else{
	    		if(data.certified == "certifying"){
	    			$(".certificTip").removeClass("hide").children(".certifactionSuccess").removeClass("hide");
	    		}else if(data.certified == "certifyFailed" || data.certified == "certifyFailedFirst"){
	    			$(".certificTip").removeClass("hide").children(".certifactionFail").removeClass("hide");
	    			$(".tocertification").attr("href",$.url.certification()+"&certify=modifyInfo")
	    		}
	    	}
	        $("#personName").text(data.name);//姓名
	        $("#personZq").text(data.email);//公司
	        $(".buyList").each(function () {
	            $(this).eq(0).append("<a href='" + $.url.buyUrl() + "'><span>立即购买</span></a>")
	        })
	
	        //计算到期时间
	        if(!isNullOrEmpty(data.vipExpiredDate)){
	        	end_str = (data.vipExpiredDate).replace(/-/g, "/");//一般得到的时间的格式都是：yyyy-MM-dd hh24:mi:ss，所以我就用了这个做例子，是/的格式，就不用replace了。
	        	var end_date = new Date(end_str);//将字符串转化为时间  
		        //开始时间  
		        var myDate = new Date();
		        var creetDate = new Date(myDate.toLocaleDateString());
		        var num = (end_date - creetDate) / (1000 * 3600 * 24);//求出两个时间的时间差，这个是天数  
		        var days = parseInt(Math.ceil(num));//转化为整天（小于零的话剧不用转了）
		        $(".per-time-in b").text(data.day);
	        }
	        if (data.gender == 0) {
	            $(".sexid input").eq(0).attr("checked", "checked");
	            $("#personName").attr("class", "man");
	        } else {
	            $(".sexid input").eq(1).attr("checked", "checked");
	            $("#personName").attr("class", "woman");
	        }
	        $("#userNameChange").val(data.name);
	        $("#userEmailChange").val(data.email);
	        $("#userJobChange").val(data.job);
	        $("#userCompnayChange").val(data.company)
	    }
	    /*姓名修改*/
	    new BlurIpt($("#userNameChange"), {}, userName, $("#userNameChangeError")).init();
	    /*邮箱修改*/
	    new BlurIpt($("#userEmailChange"), {}, userEmail, $("#userEmailChangeError")).init();
	    /*职位修改*/
	    new BlurIpt($("#userJobChange"), {}, userMess, $("#userJobChangeError")).init();
	    /*公司修改*/
	    new BlurIpt($("#userCompnayChange"), {}, userMess, $("#userComChangeError")).init();
	
	    /*修改个人信息 保存*/
	    $("#saveMess").on("click", function () {
	        if (checkAll()) {
	            if (errorTip()) {
	                //获取性别
	                var sex;
	                $("#saveMess").attr("disabled","disabled").css("background","").children("img").removeClass("hide");
	                $(".sexid input:radio").each(function () {
	                    if ($(this).attr("checked") == "checked") {
	                        sex = $(this).attr("value")
	                    }
	                })
	                if(isNullOrEmpty($("#preview").find("img").attr("src")) || $("#preview").attr("setName") == "0"){
	                	var imgSrc = ""
	                }else{
	                	var imgSrc = dataImg;
	                }
	                //上送参数
	                var param = {
	                    username: $("#userNameChange").val(),
	                    usersex: sex,
	                    useremail: $("#userEmailChange").val(),
	                    userjob: $("#userJobChange").val(),
	                    usercompany: $("#userCompnayChange").val(),
	                    img: imgSrc
	                }
	
	                $.kf.ajax({
	                    type: "post",
	                    url: $.kf.UPDATEUSERINFOU,
	                    data: param,
	                    dataType: "json",
	                    processResponse: function (data) {
	                    	var t = setTimeout(function(){
	                    		alert("您的个人资料修改成功，认证材料需要重新审核，审核结果请关注消息中心。");
	                    		$("#saveMess").attr("disabled",false).css("background","#f77e44").children("img").addClass("hide");
	                    	},1500);
	                    	
	                    }
	                });
	            }
	        }
	    });
	    
	    
    }
    return{
    	init:function(){
    		pageContent();
    	}
    }
}();
