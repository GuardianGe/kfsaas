/*
 
 * 
 * 基金管理人列表
 * 
 * 
 * 
 * */

var CnFund = function(){
	//基金管理选项
	var cnCheck = function(){
		var cnFundLists = $(".cnFundList");
		cnFundLists.find("li").unbind("click").on("click",function(){
			var ind = $("#cnFundCheck").find("li").length;
			if(!$(this).hasClass("hang-more")){
				$("#cnFund").html("");
				$(this).addClass("hang-active");
				$(this).siblings().removeClass("hang-active");
				if($(this).parents(".cnFundList").attr("id") == "cnFundList01"){
					var fundCode = $(this).attr("name");
					if($(this).index() == 0){
						if($(".listOneFund").length){
							if(ind <= 2){
								$("#cnAllFund").hide();
							}
							
							$(".listOneFund").remove();
							Query.setHash({
								"page":1,
								"fund_type":""
							});
						}
						
					}else{
						$("#cnAllFund").show();
						Query.setHash({
							"page":1,
							"fund_type":fundCode
						});
						$(".listOneFund").remove();
						$("#cnAllFund").find("ul").prepend("<li name='"+fundCode+"' class='listOneFund'>" + $(this).text() + "<span class='soListClose fundListClose'></span></li>");
					}
				};
				if($(this).parents(".cnFundList").attr("id") == "cnFundList02"){
					var addCode = $(this).attr("name");
					if($(this).index() == 0){
						if($(".listTwoFund").length){
							if(ind <= 2){
								$("#cnAllFund").hide();
							}
							$(".listTwoFund").remove();
							Query.setHash({
								"page":1,
								"address":""
							});
						}
						
					}else{
						$("#cnAllFund").show();
						Query.setHash({
							"address":addCode,
                            "page":1
						});
						$(".listTwoFund").remove();
						$("#cnAllFund").find("ul").prepend("<li class='listTwoFund'>" + $(this).text() + "<span class='soListClose fundListClose'></span></li>");
					}
				}
				initTableFund();
				
			}
			removeCheck();
		});
		showBtn();
	};
	
	var showBtn = function(){
		$("#soFundClear").on("click",function(){
			Query.setHash({"page":1});
			$(this).parents(".soList").find("li").children("span").show();
		});
	};
	var cnFundList = function(data){//加载表格
		var list = data.data;
		var tr = "";
		$("#cnFund").html("");
		/*var id = Query.getHash("id");*/
		$(list).each(function(i){
			tr += "<tr>";
			tr += "<td><a href='"+$.url.fundManagerUrl() + "id="+list[i].id+"'>" + list[i].name+"</a></td>";
			tr += "<td>" + list[i].legal_person + "</td>";
			tr += "<td>" + list[i].fund_type  + "</td>";
			tr += "<td>" + list[i].reg_address  + "</td>";
			tr += "<td>" + list[i].founding_time + "</td>";
			tr += "<td>" + list[i].reg_time + "</td>";
			tr += "<td>" + list[i].fund_count + "</td>";
			tr += "</tr>";
		});
		$("#cnFund").append(tr);
	};
	var getFundParam = function(){ //地址栏参数
		var afund = Query.getHash("address");
		var bfund = Query.getHash("fund_type");
		var afundText = "";
		var bfundText = "";
		if(!isNullOrEmpty()){
			
		}
		$(".cnFundList").find("li").each(function(){
			if(!isNullOrEmpty(afund)){
				if($(this).attr("name") == afund){
					$(this).addClass("hang-active");
					$(this).siblings("li").removeClass("hang-active");
					afundText = $(this).text();
				}
			};
			if(!isNullOrEmpty(bfund)){
				if($(this).attr("name") == bfund){
					$(this).addClass("hang-active");
					$(this).siblings("li").removeClass("hang-active");
					bfundText = $(this).text();
				};
			};
			
			$("#cnFundList02").find("li").each(function(i){
				if(!isNullOrEmpty(afund)){
					if($(this).attr("name") != afund){
						$(this).removeClass("hang-active");
						$(this).nextAll("li").removeClass("hang-active");
						$("#comProvince").find("li").each(function(){
							if($(this).attr("name") == afund ){
								afundText = $(this).text();
							}
						});
					}else{
						$(this).addClass("hang-active");
						$(this).siblings("li").removeClass("hang-active");
					}
				}
				
			});
		});
		if(isNullOrEmpty(afund) && isNullOrEmpty(bfund) ){
			$("#cnAllFund").hide();
		}
		if(!isNullOrEmpty(afund)){
			$("#cnAllFund").show();
			$(".listTwoFund").remove();
			$("#cnAllFund").find("ul").prepend("<li class='listTwoFund'>" + afundText + "<span class='soListClose'></span></li>");
		}
		if(!isNullOrEmpty(bfund)){
			$("#cnAllFund").show();
			$(".listOneFund").remove();
			$("#cnAllFund").find("ul").prepend("<li class='listOneFund'>" + bfundText + "<span class='soListClose'></span></li>");
		}
		//显示关闭按钮
		$("#soFundClear").on("click",function(){
			Query.setHash({
				"page":1,
                "fund_type": "",
                "address": ""
            });
            $("#comProvince").find("li").removeClass("provinceLi");
        	$("#compProvSave").addClass("default").removeClass("btn-primary");
            $(this).parent("li").siblings().remove();
            $(this).parents("#cnAllFund").hide();
            $("#cnFundList01").find("li").eq(0).addClass("hang-active").siblings().removeClass("hang-active");
            $("#cnFundList02").find("li").eq(0).addClass("hang-active").siblings().removeClass("hang-active");
           
           initTableFund();
		});
		
		
		showBtn();
		removeCheck();
		initTableFund();
		
	};
	var removeCheck = function(){
		//点击关闭按钮
		$(".soListClose").unbind().on("click",function(){
			$("#cnFund").html("");
			var flg = $(this).index();
			if($(this).parents(".allListSo").find("li").length == 2){
				$(this).parents(".allListSo").hide();
			}
			$(this).parent().remove();
			//查询条件清除地址栏参数
			if($(this).parent().hasClass("listOneFund")){
				$("#cnFundList01").find("li").each(function(){
					if($(this).text() == "全部"){
						$(this).addClass("hang-active");
						$(this).siblings().removeClass("hang-active");
					}
				});
				Query.setHash({
					"page":1,
					"fund_type":""
				});
			}
			//查询条件清除地址栏参数
			if($(this).parent().hasClass("listTwoFund")){
				$("#comProvince").find("li").removeClass("provinceLi");
            	$("#compProvSave").addClass("default").removeClass("btn-primary");
				$("#cnFundList02").find("li").each(function(){
					if($(this).text() == "全部"){
						$(this).addClass("hang-active");
						$(this).siblings().removeClass("hang-active");
					}
				});
				Query.setHash({//清除地址栏对应的参数
					"page":1,
					"address":""
				});
			}
			initTableFund();
			
		});
	};
	
	//关键字搜索
	var keyWordFund = function(){
		/*关键词搜索按钮*/
		$("#cnFundBtn").on("click",function(){
			Query.setHash({"page":1});
			initTableFund();
		});
		//重置
		$("#compReset").on("click",function(){
			$(this).parents(".page-content-par").find("input").val("");
			$("#soFundClear").click();
			
		});
		$("#cnFundNmae").on("keydown",function(e){
			var keyCode = e.which;
			if(keyCode == 13){
				$("#cnFundBtn").click();
			}
			
		});
	};
	//省份选择pop
	var provinceChooseFund = function(){
		var _text = "";
		var addCode = "";
		$("#comProvince").find("li").on("click",function(){
			$("#compProvSave").addClass("btn-primary").removeClass("default");
			_text = $(this).text();
			addCode = $(this).attr("name");
			$(this).addClass("provinceLi");
			$(this).siblings().removeClass("provinceLi");
		});
		$("#compProvSave").unbind().on("click",function(){
			if($(this).parents(".myModal01 ").find(".city-list").find(".provinceLi").text() != ""){
				$(".city-list").find("li").show();
				_text = $(this).parents(".myModal01 ").find(".city-list").find(".provinceLi").text();
				$(".province-ul").find("li").removeClass("provinceLi");
				$(".province-ul").find("li:last").addClass("provinceLi");
				Query.setHash({"page":1});
				$('#myModal').modal('hide');
				$("#cnFund").html("");
				$("#cnFundList02").find("li").removeClass("hang-active");
				Query.setHash({
					address:addCode
				});
				
				
				$("#cnAllFund").show();
				$(".listTwoFund").remove();
				$("#cnAllFund").find("ul").prepend("<li class='listTwoFund'>" + _text + "<span class='soListClose'></span></li>");
				_text = "";
				$("#cnFundList02").find("li").each(function(){
					if($(this).attr("name") == addCode){
						$(this).siblings().removeClass("hang-active");
						$(this).addClass("hang-active");
					}
				});
				initTableFund();
			}
			removeCheck();
		})
		
	};
	var initTableFund = function(){
		var _url = "";
		
		var fund_type = "";
		var address = "";
		if ($(".listOneFund").size()) {
            fund_type = $(".listOneFund").text();
        } else if ($("#cnFundList01").find(".hang-active").text() == "全部") {
            fund_type = "";
        } else {
            fund_type = $("#cnFundList01").find(".hang-active").text();
        }
        //省份
        if ($(".listTwoFund").size()) {
            address = $(".listTwoFund").text();
        } else if ($("#cnFundList02").find(".hang-active").text() == "全部") {
            address = "";
        } else {
            address = $("#cnFundList02").find(".hang-active").text();
        }
		var keyword = $("#cnFundNmae").val();
		var start_time = $("#cnFundTime01").val();
		var stop_time = $("#cnFundTime02").val();
		
		
		_url = $.kf.GETFUNDMANAGER+"?"+"keyword="+keyword+"&fund_type="+fund_type+"&start_time="+start_time+"&stop_time="+ stop_time+"&address="+address+"&page="+1;                                                                
		//new GetTable(_url,$("#pageCnFund"),"",cnFundList,"get",$("#cnFund")).init();
		if (compareDate(start_time, stop_time)) {
	        $("#cnFund").html("");
			var lastPage = Query.getHash("page");
	        $.getTable({
	        	url:_url,//url
		    	pageId:$("#pageCnFund"),//分页id
		    	callback:cnFundList,//callback
		    	currentPage:lastPage,
		    	tbodyId:$("#cnFund")//tbody的id,
	        })
       }
	};
	return {
		init:function(){
			//initTableFund();
			cnCheck();//基金管理选项点击
			getFundParam();//地址栏参数
			//fundSearchDate();//日历查询
			keyWordFund();//关键字搜索
			provinceChooseFund();//省份选择
		}
	}
	
}();
/*
 
 * 
 * 基金管理人列表  end
 * 
 * 
 * 
 * */




/*
 
 * 
 * 
 * 基金管理人详情
 * 
 * 
 * 
 * */
var fundMgDetail = function(){
	
	var fundMsg = function(){
		
		var id= Query.getHash("id");
		var _url = $.kf.GETMANAGERINFO+"?"+"id="+id; 
		
		$.kf.ajax({
            type: "get",
            url: _url,
            data: "",
            dataType: "json",
            processResponse: function (data) {
                var obj = data.data;
                var obj1 = obj.personData;
                var obj2 = obj.executive;
                if(isNullOrEmpty(obj1)){
                	$("#fundTableDb").parent(".table-scroll-par").hide();
                }else{
                	 workList(data);
                };
                if(isNullOrEmpty(obj2)){
                	$("#maskInTableGg").parent(".table-scroll-par").hide();
                }else{
                	 deList(data);
                };
                fundMsgList(data);
            }
        });
        //产品信息
        var _url2 = $.kf.GETMANAGERPRODUCT+"?"+"id="+id; 
        $.kf.ajax({
            type: "get",
            url: _url2,
            data: "",
            dataType: "json",
            processResponse: function (data) {
                var obj = data.data;
                var fundBase = obj.fundBase;//实施前成立的基金
       			var fundBaseBack = obj.fundBaseBack;//实施后成立的基金
       			if (isNullOrEmpty(fundBase)){
                	$(".fundTableOne").html("");
		        };
		        if (isNullOrEmpty(fundBaseBack)){
                	$(".fundTableTwo").html("");
		        };
                if (isNullOrEmpty(fundBase) && isNullOrEmpty(fundBaseBack)){
                	
		        }else{
		           	deListTwo(data);
		        }
            }
        });
    };

    //拼接新闻列表
    var fundMsgList = function (data) {
        var list = data.data;
        $("#lastTime").text(list.updatedDate);
        //写入信息
        $("#compName").text(list.fullname);
        $("#legalPerson").text(list.legalPerson);
     	$("#isQualification").text(list.isQualification);
      	$("#qualificationMode").text(list.qualificationMode);
        $("#regDate").text(list.regDate);
        $("#fundType").text(list.fundType);
        $("#fundOther").text(list.fundOther);
        if (!isNullOrEmpty(list.website)) {
            $("#website").html("<a href=" + list.website + " target='_blank'>" + list.website + "</a>");
		}        
        $("#fullname").text(list.fullname);
        $("#fullEnName").text(list.fullEnName);
        $("#regAddress").text(list.regAddress);
        $("#remoney").text(list.remoney);
        $("#memberNum").text(list.memberNum);
        $("#orgCode").text(list.orgCode);
        $("#workAddress").text(list.workAddress);
        $("#realMoney").text(list.realMoney);
        $("#companyType").text(list.companyType);
        $("#deDcode").text(list.code);
        $("#fund_other").text(list.fund_other);
        if(!isNullOrEmpty(list.realRatio)){
        	$("#realRatio").text(list.realRatio+"%");
        }
        $("#fundDate").text(list.fundDate);
        
        $("#isVip").text(list.isVip);
        $("#vipDate").text(list.vipDate);
        $("#vipType").text(list.vipType);
        $("#legalOpinions").text(list.legalOpinions);
        $("#legalOpinions2").text(list.lawFirm);
        $("#legalOpinions3").text(list.lawyer);
        
        $("#updatedDate").text(list.updatedDate);
        $("#specialNote").text(list.specialNote);
        
        var mflg01 = false;//true 不再提示；如需在提示只能清除缓存，或者等待30天有效期
        //扣费跳转
        var isCookie = false;
        moneyUrl($("#industry01"), isCookie, "isCookie");
    };
    var workList = function (data) {
        var list = data.data;
        var personData = list.personData;//工作履历
        //拼接table
        var tr = "";
        $("#workMsgTable").html("");
        $(personData).each(function (i) {
            tr += "<tr>";
            tr += "<td><span class='fundPhtxt'>时间：</span><span>" + personData[i].date + "</span></td>";
            tr += "<td><span class='fundPhtxt'>任职单位：</span><span>" + personData[i].companyName + "</span></td>";
            tr += "<td><span class='fundPhtxt'>职务：</span><span>" + personData[i].position + "</span></td>";
            tr += "</tr>";
        });
        $("#workMsgTable").append(tr);
    };
    var deList = function (data) {
        var list = data.data;
        var executive = list.executive;//高管
        //拼接table
        var tr = "";
        $("#fundMsgTable").html("");
        $(executive).each(function (i) {
            tr += "<tr>";
            tr += "<td><span class='fundPhtxt'>高管姓名：</span><span>" + executive[i].name + "</span></td>";
            tr += "<td><span class='fundPhtxt'>职务：</span><span>" + executive[i].job + "</span></td>";
            tr += "<td><span class='fundPhtxt'>是否具有基金从业资格：</span><span>" + executive[i].qualification + "</span></td>";
            tr += "</tr>";
        });
        $("#fundMsgTable").append(tr);
    };
    var deListTwo = function (data) {
        var list = data.data;
        var fundId= Query.getHash("id");
        var fundBase = list.fundBase;//实施前成立的基金
        var fundBaseBack = list.fundBaseBack;//实施后成立的基金
        var tw = "";
        var tw2 = "";
        $("#proMsgTable").html("");
        $("#proMsgTable2").html("");
        if(isNullOrEmpty(fundBase)){
        	$(".fundTableOne").hide();
        }else{
        	$(fundBase).each(function (i) {
	            tw += "<tr><td>";
	            tw += "<span><a href='" + $.url.fundDetailUrl() + "id=" + fundBase[i].id + "&fundId=" + fundId + "'>" + fundBase[i].name + "</a></span>";
	            tw += "<span><span class='fundPhcolor'>月报：</span>" + fundBase[i].month + "；<span class='fundPhcolor'>季报：</span>" + fundBase[i].season + "；<span class='fundPhcolor'>半年报：</span>" + fundBase[i].sixMonths + "；<span class='fundPhcolor'>年报：</span>" + fundBase[i].year + "；</span>";
	            tw += "</td></tr>";
	        });
        }
        if(isNullOrEmpty(fundBaseBack)){
        	$(".fundTableTwo").hide();
        }else{
        	$(fundBaseBack).each(function (i) {
	            tw2 += "<tr><td>";
	            tw2 += "<span><a href='" + $.url.fundDetailUrl() + "id=" + fundBaseBack[i].id + "&fundId=" + fundId + "'>" + fundBaseBack[i].name + "</a></span>";
	            tw2 += "<span><span class='fundPhcolor'>月报：</span>" + fundBaseBack[i].month + "；<span class='fundPhcolor'>季报：</span>" + fundBaseBack[i].season + "；<span class='fundPhcolor'>半年报：</span>" + fundBaseBack[i].sixMonths + "；<span class='fundPhcolor'>年报：</span>" + fundBaseBack[i].year + "；</span>";
	            tw2 += "</td></tr>";
	        });
        }
        $("#proMsgTable").append(tw);
        $("#proMsgTable2").append(tw2);
    }
	return {
		init:function(){
			fundMsg();
		}
	}
	
	
}();




/*
 
 * 
 * 
 * 基金详情
 * 
 * 
 * 
 * */
var fundDetailList = function(){
	var fundDetailMsg = function(){
		var id= Query.getHash("id");
		var _url = $.kf.GETMANAGERPRODUCTINFO+"?"+"id="+id; 
		$.kf.ajax({
            type: "get",
            url: _url,
            data: "",
            dataType: "json",
            processResponse: function (data) {
                var obj = data.data;
                fundDetailList(data);
            }
        });
    };

    //拼接新闻列表
    var fundDetailList = function (data) {
        var list = data.data;
        var fundId= Query.getHash("fundId");
        $("#compName").text(list.fundName);
        $("#lastTime").text(list.dtUpdate);
        
        $("#fundName").text(list.fundName);
        $("#fundNumber").text(list.fundNumber);
        $("#establishDate").text(list.establishDate);
        $("#recordDate").text(list.recordDate);
        $("#checkTime").text(list.checkTime);
        $("#recordStage").text(list.recordStage);
        $("#fundType").text(list.fundType);
        $("#currencyCode").text(list.currencyCode);
        $("#managerName").html("<a href='" + $.url.fundManagerUrl() + "id=" + fundId + "'>" + list.managerName + "</a>");
        $("#managementType").text(list.managementType);
        $("#custodianName").text(list.custodianName);
        $("#operationStatus").text(list.operationStatus);
        $("#dtUpdate").text(list.dtUpdate);
        $("#specialNote").text(list.specialNote);
        $("#year").text(list.year);
        $("#sixMonths").text(list.sixMonths);
        $("#season").text(list.season);
        $("#month").text(list.month);
        var mflg01 = false;//true 不再提示；如需在提示只能清除缓存，或者等待30天有效期
        //扣费跳转
        var isCookie = false;
        moneyUrl($("#industry01"), isCookie, "isCookie");
    };
	return {
		init:function(){
			fundDetailMsg();
		}
	}
	
	
}();