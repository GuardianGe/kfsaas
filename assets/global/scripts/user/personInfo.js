
/*我的三板慧*/
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
	    $("#modifyMessage").attr("href",$.url.modifyInfo());
	    //写入页面信息
	    function getInfoFun(data) {
	    	var certifiedText = '';
	    	if(isNullOrEmpty($.cookie("certified"))){
		    	certifiedText = "";
		    	
		    //未认证的登录情况
		    }else if($.cookie("certified") == "unCertify"){
		    	certifiedText = "<a href='"+$.url.certification()+ "&certify=personInfo"+"'>立即认证</a>";
		    	
		    //认证中、  登录情况
		    }else if($.cookie("certified") == "certifying"){
		    	certifiedText = "认证中";
		    	
		    //认证失败、认证失败后第一次  登录
		    }else if($.cookie("certified") == "certifyFailed" || $.cookie("certified") == "certifyFailedFirst"){
		    	certifiedText = "<a href='"+$.url.certification()+ "&certify=personInfo"+"'>立即认证</a>";
		    	
		    //认证成功后的登录 ， 认证成功后第一次登录
		    }else if($.cookie("certified") == "certified" || $.cookie("certified") == "certifiedFirst"){
		    	certifiedText = data.company;
		    }
		    //没有购买并且没有认证成功
		    if(data.role == "noPay"){
		    	if(data.certified == "certified" || data.certified == "certifiedFirst"){
		    		$(".successHide").hide();
		    		$("#registTime").attr("class","col-md-6");
		    		$("#certifiedTime").text(data.certifiedDt);
		    		$(".certifiedHide").show();
		    	}
		    } 
	    	var span = "<span>"+certifiedText+"</span>";
	        $("#personPic").attr("src", data.photo_url);//头像
	        $("#personName").html(data.name + span);//姓名
	        $("#personZq").text(data.email);//公司
	        $("#messageNum").text(data.message);//消息数
	        $("#collectionNum").text(data.collection);//收藏数
	        $("#personStart").text(data.vipStartDate);//开始时间
	        $("#personEnd").text(data.vipExpiredDate);//结束时间
	        $("#personTel").text(data.day);//剩余服务天数
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
	    
    }
    return{
    	init:function(){
    		pageContent();
    	}
    }
}();
