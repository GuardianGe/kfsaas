/******
 
 UPDATE DATE:2017/2/8
 NAV:投资企业、投资人、投资人详情
 NAME:WANGJH
 
 ******/



var InvestorsDetail = function () {

	
	/************************************投资人详情****************************************/
	var investorsDetail = function(){
		//投资详情
		var investorsCon = function(){
			var id = Query.getHash("id");
			$.kf.ajax({//所属行业
	            type: "get",
	            url: $.kf.GETINVESTORDETAILS + "?" + "id=" + id,
	            data: "",
	            dataType: "json",
	            processResponse: function(data){
	            	var list = data.data;
	            	if(isNullOrEmpty(list.tel)&&isNullOrEmpty(list.weiXi)&&isNullOrEmpty(list.email)){
	            		$(".IuserDetail").find("b").hide();
	            		$(".IuserDetail").find("a").hide();
	            	}else{
	            		if(isNullOrEmpty(list.tel)){
		            		$("#investors-phone").text("--");
		            	}else{
		            		$(".IuserDetail").find("b").text("联系方式");
		            		$("#investors-phone").text(list.tel);
		            		$(".investorsTxtLine").prepend('<img src="../../assets/admin/layout/img/dianhua.png" alt="" />');
		            	}
		            	if(isNullOrEmpty(list.weiXi)){
		            		$("#investors-wx").text("--");
		            	}else{
		            		$(".IuserDetail").find("b").text("联系方式");
		            		$("#investors-wx").text(list.weiXi);
		            		$(".investorsTxtLine").prepend('<img src="../../assets/admin/layout/img/weixin.png" alt="" />');
		            	}
		            	if(isNullOrEmpty(list.email)){
		            		$("#investors-email").text("--");
		            	}else{
		            		$(".IuserDetail").find("b").text("联系方式");
		            		$("#investors-email").html(list.email);
		            		$(".investorsTxtLine").prepend('<img src="../../assets/admin/layout/img/youxiang.png" alt="" />');
		            	}
	            	}
	            	
	            	$(".IuserImg").append("<img src='"+ list.logo +"'>");
	            	$(".IuserDetail h1 span").text(list.name);
	            	$(".IuserDetail h2 span").text(list.job);
	            	$(".IuserDetail h2 b").text(list.investment);
	            	$(".IuserDetail p").attr('title',list.summary);
	            	//$(".IuserDetail p").text(list.summary);
	            	$(".style .type1 span").text(list.field);
	            	$(".style .type2 span").text(list.stage);
	            	$(".style .type3 span").text(list.city);
	            	$(".style .type4 span").text(list.num);
	            	$(".style .type5 span").text(list.quota);
	            	$(".InvestMK span").eq(0).text(list.investmentYear);
	            	$(".InvestMK2 span").eq(0).text(list.invested);
	            	$(".InvestMK span").eq(1).text(list.next);
	            	$(".InvestMK2 span").eq(1).text(list.quit);
					//截取投资人详情内容
					var investorsTxt = '';//最终拼接字符串
					var investorsDet = list.summary;
					var investorsNumber = 85;//显示字数
					if(investorsDet.length > investorsNumber){
						var investorsC = investorsDet.substring(0, 80);
						investorsTxt = investorsC + '...';
						$(".IuserDetail p").text(investorsTxt);
					}else{
						investorsTxt = investorsDet;
					$(".IuserDetail p").text(investorsTxt);
					}
	            	var tr = "";
	            	var tg = "";
	            	var tb = "";
	            	//投资案例
			        $("#conList").html("");
			        $(list.case).each(function (i) {
			        	tr += "<div class='investCase'>";
						tr += "<img src='"+ list.case[i].logo +"'>";
						tr += "<div>";
						tr += "<h1>"+ list.case[i].name +"</h1>";
						tr += "<h2>公司阶段："+ list.case[i].stage +"</h2>";
						tr += "<p>"+ list.case[i].summary +"</p>";
						tr += "</div>";
						tr += "</div>";
			        });
			        $("#conList").append(tr);
			        
			        
			        //所在机构概要
			        if(isNullOrEmpty(list.investmentId)){
			        	$(".inview-title").html(list.investment);
			        }else{
			        	$(".inview-title").html("<a href='" + $.url.investmentAgencyDetailsUrl() + "id=" + list.investmentId + "'>" + list.investment + "</a>");
			        }
			        if(isNullOrEmpty(list.investmentUrl)){
			        	$(".inview-left").html("<img src='../../assets/admin/layout/img/investImg2.png' />");
			        }else{
			        	$(".inview-left").html("<img src='"+ list.investmentUrl +"' />");
			        }
			        if(isNullOrEmpty(list.investmentStage)){
						//$(".inviewStage").find("span").text("--");
			        }else{
						$(".inviewStage").find("span").text(list.investmentStage);
			        }
					var tf = "";
					$(list.investmentField).each(function(i){
						tf +="<li>"+ list.investmentField[i] +"</li>";
					});
					$(".inviewField").append(tf);
			        $(".inview-url").text(list.investmentWeb);
			        $(".inview-url").attr("href",list.investmentWeb);
			        
			        //教育经历
			        $("#education").html("");
			        $(list.education).each(function (i) {
						tg += "<p><span>"+ list.education[i].year +"</span><span>"+ list.education[i].university +"</span><span>"+ list.education[i].profession +"</span></p>";	
			        });
			        $("#education").append(tg);
			        
			        //工作经历
			        $("#workCon").html("");
			        if(list.work[0].university == "--"){
			        	tb +="";
			        }else{
			        	$(list.work).each(function (i) {
							tb += "<li>"+ list.work[i].university +"<b>|</b><span>"+ list.work[i].profession +"</span></li>";	
				        });
			        }
			        $("#workCon").append(tb);
	            }
	        });
		};
		investorsCon();
	}
	

    return {
        init: function(){
        	investorsDetail();
        }
    }
}();