var InvestCompany = function(){
	
	/************************************被投企业****************************************/
	var investCompany = function(){
		//选项的点击事件
	    var listComClick = function () {
	    	var industry = "";
	        var status = "";
	        var province = "";
	        var highSalary = "";
	        $(".allList").find("li").unbind("click").on("click", function (event) {
	            event.preventDefault();
	
	            var ind = $("#soCheck").find("li").length;
	            if (!$(this).hasClass("hang-more")) {
	                $("#tableOne").html("");
	                $(this).parent("ul").find("li").removeClass("hang-active");
	                $(this).addClass("hang-active");
					
					/*所属行业*/
	                if ($(this).parents(".allList").attr("id") == "compQs") {
	                    industry = $(this).text();
	                    var inCode = $(this).attr("name");
	                    if ($(this).index() == 0) {
	                    	if($(".listOne").length){
	                    		if(ind <= 2){
	                    			$("#allListSo").hide();
	                    		}
	                    		
	                    		Query.setHash({
		                            "inCode": "",
		                            "page":1
		                        });
		                        $(".listOne").remove();
	                    	}
	                        
	                    } else {
	                    	$("#allListSo").show();
	                        Query.setHash({
	                            "inCode": inCode,
		                            "page":1
	                        });
	                        $(".listOne").remove();
	                        $("#allListSo").find("ul").prepend("<li class='listOne' name =" + inCode + ">" + industry + "<span class='soListClose'></span></li>");
	                    }
	                }
	                /*获投状态*/
	                if ($(this).parents(".allList").attr("id") == "compHy") {
	                    status = $(this).text();
	                    var seCode = $(this).attr("name");
	                    if ($(this).index() == 0) {
	                    	if($(".listTwo").length){
	                    		if(ind <= 2){
	                    			$("#allListSo").hide();
	                    		}
	                    		Query.setHash({
		                            "seCode": "",
		                            "page":1
		                        });
		                        $(".listTwo").remove();
	                    	}
	                       
	                    } else {
	                    	$("#allListSo").show();
	                        Query.setHash({
	                            "seCode": seCode,
	                            "page":1
	                        });
	                        $(".listTwo").remove();
	                        $("#allListSo").find("ul").prepend("<li class='listTwo' name =" + seCode + ">" + status + "<span class='soListClose'></span></li>");
	                    }
	
	                }
	                /*省份*/
	                if ($(this).parents(".allList").attr("id") == "compSf") {
	                    province = $(this).text();
	                    var proCode = $(this).attr("name");
	                    if ($(this).index() == 0) {
	                    	if($(".listThree").length){
	                    		if(ind <= 2){
	                    			$("#allListSo").hide();
	                    		}
	                    		
	                    		$(".listThree").remove();
		                        Query.setHash({
		                            proCode: "",
		                            "page":1
		                        });
	                    	}
	                    } else {
	                    	$("#allListSo").show();
	                        Query.setHash({
	                            proCode: proCode,
	                            "page":1
	                        });
	                        $(".listThree").remove();
	                        $("#allListSo").find("ul").prepend("<li class='listThree'name =" + proCode + ">" + province + "<span class='soListClose'></span></li>");
	                    }
	                }
	                /*高新企业*/
	                if ($(this).parents(".allList").attr("id") == "compGx") {
	                    highSalary = $(this).text();
	                    var higCode = $(this).attr("name");
	                    if ($(this).index() == 0) {
	                    	if($(".listFour").length){
	                    		if(ind <= 2){
	                    			$("#allListSo").hide();
	                    		}
	                    		
	                    		$(".listFour").remove();
		                        Query.setHash({
		                            higCode: "",
		                            "page":1
		                        });
	                    	}
	                    } else {
	                    	$("#allListSo").show();
	                        Query.setHash({
	                            higCode: higCode,
	                            "page":1
	                        });
	                        $(".listFour").remove();
	                        $("#allListSo").find("ul").prepend("<li class='listFour'name =" + higCode + ">" + highSalary + "<span class='soListClose'></span></li>");
	                    }
	                }
	                initTable();
	            }
				removeThing();
	        });
	    	//成立时间的年份点击
	    	$(".investDateList a").on("click",function(){
	    		var startT = $(this).text()+"-01-01";
	    		var stopT = $(this).text()+"-12-31";
	    		var et = new Date(stopT.replace(/\-/g, "\/"));
	    		var crDay = new Date(currentDay.replace(/\-/g, "\/"));
	    		if(et > crDay){
	    			stopT = currentDay;
	    		};
	    		$("#tradingStart").val(startT);
	    		$("#tradingStop").val(stopT);
	    	})
	    }
	
	    /*拼table表格*/
	    var getList = function (data) {
	        var list = data.data;
	        var tr = "";
	        
	        $("#tableOne").html("");
	        var attention = "";
	        $(list).each(function (i) {
	        	if(list[i].attention == "1"){
					attention = "取消";
				}else{
					attention = "关注";
				};
	        	tr += "<tr>";
	        	tr += "<td class='investComNum'>"
	        	tr += "<div class='investComNum-left'>";
	        	if(isNullOrEmpty(list[i].logo)){
	        		tr += "<img src='../../assets/admin/layout/img/investImg2.png' />";
	        	}else{
	        		tr += "<img src='"+ list[i].logo +"'/>";
	        	}
	        	tr += "</div>";
	        	if(isNullOrEmpty(list[i].id)){
	        		tr += "<div class='investComNum-right'><span>" + list[i].companyName + "</span>";
	        	}else{
	        		if(list[i].companyType == "新三板"){
	        			tr += "<div class='investComNum-right'><a class='basicName' title='"+ list[i].name +"' data-name='"+list[i].name+"' href='"+ $.url.companyListUrl() + "id=" + list[i].id +"'>"+ list[i].companyName +"</a>";
		        	}else{
	        			tr += "<div class='investComNum-right'><a class='basicName' title='"+ list[i].name +"' data-name='"+list[i].name+"' href='"+ $.url.industryUrl() + "id=" + list[i].id +"'>"+ list[i].companyName +"</a>";
		        	}
	        	}
	        	if(list[i].summary.length<39){
	        		tr += "<span>" + list[i].summary + "</span>";
	        	}else{
	        		tr += "<div class='investSumBox'><span data-title='"+list[i].summary+"'>" + list[i].summary.substring(0,38) + "...<b class='investSummary investJj'>展开</b></span></div>";
	        	};
	        	tr += "</div></td>";
	        	if(isNullOrEmpty(list[i].city)){
	        		tr += "<td>--</td>";
	        	}else{
	        		tr += "<td class='investImg'><img src='../../assets/admin/layout/img/dizhi.png' />" + list[i].city + "</td>";
	        	};
	        	if(isNullOrEmpty(list[i].date)){
	        		tr += "<td>--</td>";
	        	}else{
	        		tr += "<td>" + list[i].date + "</td>";
	        	}
	        	if(isNullOrEmpty(list[i].industry)){
	        		tr += "<td>--</td>";
	        	}else{
	        		tr += "<td>" + list[i].industry + "</td>";
	        	}
	        	tr += "<td>" + list[i].investmentDate + "</td>";
	        	tr += "<td>" + list[i].invest + "</td>";
	        	tr += "<td class='investT"+i+" investEdg'><div class='investTwo'></div><div class='investAll'></div></td>";
	        	if(isNullOrEmpty(list[i].id)){
	        		tr += "<td>关注</td>";
	        	}else{
	        		tr += "<td><a class='comOptional' name='" + list[i].id + "'>" + attention + "</a></td>";
	        	}

                tr += "</tr>";
	        });
	        $("#tableOne").append(tr);
			//$clamp(investClampList, {clamp: 2});
	        //扣费跳转
	        var isCookie = false;
	        moneyUrl($(".basicName"), isCookie, "isCookie");
	        
	        //投资机构列表
	        for (var i = 0; i < list.length; i++) {
	            var tr2 = [];
	            var tr3 = [];
	            var investmentL = list[i].investmentAgency.length;
	            for (var j = 0; j < investmentL; j++) {
	                if (investmentL == 0 || investmentL == 1) {
	                    if (list[i].investmentAgency[j].investorId) {
	                        tr2 += "<a href=" + $.url.investmentAgencyDetailsUrl() + "id=" + list[i].investmentAgency[j].investorId + ">" + list[i].investmentAgency[j].investment + "</a>";
	                    } else {
	                        tr2 += list[i].investmentAgency[j].investment;
	                    }
	                } else {
	                    if (list[i].investmentAgency[j].investorId) {
	                    	if(list[i].investmentAgency[j].investment !=" "){
	                    		tr2 += "<a href=" + $.url.investmentAgencyDetailsUrl() + "id=" + list[i].investmentAgency[j].investorId + ">" + list[i].investmentAgency[j].investment + "</a>/";
	                    	}else{
	                    		tr2 += "";
	                    	}
	                    } else {
	                    	if(list[i].investmentAgency[j].investment !=" "){
	                        	tr2 += list[i].investmentAgency[j].investment + "/";
	                        }else{
	                        	tr2 += "";
	                        }
	                    }
	                    if(j<2){
	                    	tr3 = tr2;
	                    }
	                }
	            }
	            if(investmentL<3){
	            	if(investmentL ==2){
	            		$(".investT" + i).find(".investTwo").append(tr2.substring(0,tr2.length-1));
	            	}else{
	            		$(".investT" + i).find(".investTwo").append(tr2);
	            	}
	            }else{
	            	var tr4 = tr3.substring(0,tr3.length-1)+'...<b class="investSummary investJg">展开</b>';
	            	$(".investT" + i).find(".investTwo").append(tr4);
	            	$(".investT" + i).find(".investAll").append(tr2.substring(0,tr2.length-1)+'<b class="investSummary investSummaryClose investJg2">收起</b>');
	            }
	        }
			$(".investEdg").each(function(){
				if($(this).html().indexOf("/") > 0){
					$(this).html($(this).html().substring(0,$(this).html().length-1));
				}
			});
			//机构展开收起
			$(".investEdg").on("click",".investJg",function(){
				$(this).parent(".investTwo").hide();
				$(this).parent(".investTwo").siblings(".investAll").show();
			})
			$(".investEdg").on("click",".investJg2",function(){
				$(this).parent(".investAll").hide();
				$(this).parent(".investAll").siblings(".investTwo").show();
			})
			//简介展开收起
			$(".investSumBox").on("click",".investJj",function(){
				if($(this).hasClass("investSummaryClose")){
					var cont = $(this).parent("span").attr("data-title").substring(0,38);
					$(this).parent("span").html(cont+"...<b class='investJj'>展开</b>");
				}else{
					var cont = $(this).parent("span").attr("data-title");
					$(this).parent("span").html(cont+"<b class='investSummary investJj investSummaryClose'>收起</b>");
				}
			})
			//自选功能
	        comOptional();
	    };
	    //加入自选功能
	    var comOptional = function(){
			$(".comOptional").click(function(){
				var _url = "";
				var code = $(this).attr("name");
				var param = {
				  		"code":code,
				  		"type":"b2"
				 	};
				if($(this).text()== "关注"){
		           	 _url = $.kf.ADDCOLLECTIONOPTION;
				}else{
					 _url = $.kf.CANCELCOLLECTIONOPTION;
				}
				$.kf.ajax({
		            type: "post",
		            url: _url,
		            data: param,
		            dataType: "json",
		            processResponse: function(data){
		            	initTable();
	            	}
			 	 })
			})
	   };
	    var removeThing = function () {
	        //点击关闭按钮
	        $(".soListClose").unbind("click").on("click", function () {
	            //var flg = $(this).index();
	            $("#tableOne").html("");
	            if ($(this).parents(".allListSo").find("li").length == 2) {
	                $(this).parents(".allListSo").hide();
	            }
	            $(this).parent().remove();
	            //查询条件清除地址栏参数
	            if ($(this).parent().hasClass("listOne")) {
	                $("#compQs").find("li").each(function () {
	                    if ($(this).text() == "全部") {
	                        $(this).addClass("hang-active");
	                        $(this).siblings().removeClass("hang-active");
	                    }
	                });
	                $("#compPop2").find("li").each(function(){
	                	$(this).removeClass("provinceLi");
	                	$("#industrySave").addClass("default");
	                })
	                Query.setHash({
	                    inCode: "",
                        "page":1
	                });
	            }
	            //查询条件清除地址栏参数
	            if ($(this).parent().hasClass("listTwo")) {
	                $("#compHy").find("li").each(function () {
	                    if ($(this).text() == "全部") {
	                        $(this).addClass("hang-active");
	                        $(this).siblings().removeClass("hang-active");
	                    }
	                });
	                Query.setHash({//清除地址栏对应的参数
	                    seCode: "",
                        "page":1
	                });
	            }
	            //查询条件清除地址栏参数
	            if ($(this).parent().hasClass("listThree")) {
	                $("#compSf").find("li").each(function () {
	                    if ($(this).text() == "全部") {
	                        $(this).addClass("hang-active");
	                        $(this).siblings().removeClass("hang-active");
	                    }
	                });
	                $("#comProvince").find("li").each(function(){
	                	$(this).removeClass("provinceLi");
	                	$("#compProvSave").addClass("default");
	                })
	                
	                Query.setHash({
	                    proCode: "",
                        "page":1
	                });
	            }
	            //查询条件清除地址栏参数
	            if ($(this).parent().hasClass("listFour")) {
	                $("#compGx").find("li").each(function () {
	                    if ($(this).text() == "全部") {
	                        $(this).addClass("hang-active");
	                        $(this).siblings().removeClass("hang-active");
	                    }
	                });
	                Query.setHash({//清除地址栏对应的参数
	                    higCode: "",
                        "page":1
	                });
	            }
	            initTable();
	        });
	    };
	
	    var getUrlParam = function () {
	        var aCode = Query.getHash("inCode");
	        var bCode = Query.getHash("seCode");
	        var cCode = Query.getHash("proCode");
	        var dCode = Query.getHash("higCode");
	        var a = "", b = "", c = "",d = "";
	        $("#compQs").find("li").each(function (i) {
	            if (!isNullOrEmpty(aCode)) {
	                if ($(this).attr("name") != aCode) {
	                    $(this).removeClass("hang-active");
	                    $(this).nextAll("li").removeClass("hang-active");
	                    $("#compPop2").find("li").each(function () {
	                        if ($(this).attr("name") == aCode) {
	                            a = $(this).text();
	                        }
	                    });
	                } else {
	                    $(this).addClass("hang-active");
	                    $(this).siblings("li").removeClass("hang-active");
	                    a = $(this).text();
	                }
	            }
	        });
	        $("#compHy").find("li").each(function (i) {
	            if (!isNullOrEmpty(bCode)) {
	                if ($(this).attr("name") != bCode) {
	                    $(this).removeClass("hang-active");
	                    $(this).nextAll("li").removeClass("hang-active");
	                    $("#compPop2").find("li").each(function () {
	                        if ($(this).attr("name") == bCode) {
	                            b = $(this).text();
	                        }
	                    });
	                } else {
	                    $(this).addClass("hang-active");
	                    $(this).siblings("li").removeClass("hang-active");
	                    b = $(this).text();
	                }
	            }
	
	        });
	        $("#compSf").find("li").each(function (i) {
	            if (!isNullOrEmpty(cCode)) {
	                if ($(this).attr("name") != cCode) {
	                    $(this).removeClass("hang-active");
	                    $(this).nextAll("li").removeClass("hang-active");
	                    $("#comProvince").find("li").each(function () {
	                        if ($(this).attr("name") == cCode) {
	                            c = $(this).text();
	                        }
	                    });
	                } else {
	                    $(this).addClass("hang-active");
	                    $(this).siblings("li").removeClass("hang-active");
	                    c = $(this).text();
	                }
	            }
	
	        });
	        $("#compGx").find("li").each(function (i) {
	            if (!isNullOrEmpty(dCode)) {
	            	if ($(this).attr("name") != dCode) {
	                    $(this).removeClass("hang-active");
	                    $(this).nextAll("li").removeClass("hang-active");                   
	                } else {
	                    $(this).addClass("hang-active");
	                    $(this).siblings("li").removeClass("hang-active");
	                    d = $(this).text();
	                }
	            }
	        });
	        if (isNullOrEmpty(aCode) && isNullOrEmpty(bCode) && isNullOrEmpty(cCode)) {
	            $("#allListSo").hide();
	        }
	        if (!isNullOrEmpty(aCode)) {
	            $("#allListSo").show();
	            $(".listOne").remove();
	            $("#allListSo").find("ul").prepend("<li class='listOne' name=" + aCode + ">" + a + "<span class='soListClose'></span></li>");
	        }
	        if (!isNullOrEmpty(bCode)) {
	            $("#allListSo").show();
	            $(".listTwo").remove();
	            $("#allListSo").find("ul").prepend("<li class='listTwo' name=" + bCode + ">" + b + "<span class='soListClose'></span></li>");
	        }
	        if (!isNullOrEmpty(cCode)) {
	            $("#allListSo").show();
	            $(".listThree").remove();
	            $("#allListSo").find("ul").prepend("<li class='listThree' name=" + cCode + ">" + c + "<span class='soListClose'></span></li>");
	        }
	        if (!isNullOrEmpty(dCode)) {
	            $("#allListSo").show();
	            $(".listFour").remove();
	            $("#allListSo").find("ul").prepend("<li class='listFour' name=" + dCode + ">" + d + "<span class='soListClose'></span></li>");
	        }
	        //显示关闭按钮
	        $("#soClear").on("click", function () {
	            Query.setHash({
	                "inCode": "",
	                "seCode": "",
	                "proCode": "",
	                "higCode": "",
                    "page":1
	            });
	            $("#tradingStart").val("");
	            $("#tradingStop").val("");
	            $(this).parent("li").siblings().remove();
	            $(this).parents("#allListSo").hide();
	            $("#compQs").find("li").eq(0).addClass("hang-active").siblings().removeClass("hang-active");
	            $("#compHy").find("li").eq(0).addClass("hang-active").siblings().removeClass("hang-active");
	            $("#compSf").find("li").eq(0).addClass("hang-active").siblings().removeClass("hang-active");
	            $("#compGx").find("li").eq(0).addClass("hang-active").siblings().removeClass("hang-active");
	            initTable();
	        });
	        //初始化列表
	        initTable();
	
	        //清空选项
	        removeThing();
	    };
	    //初始化表格
	    var initTable = function () {
	        var status = "";
	        var industry = "";
	        var province = "";
	        var highSalary = "";
	        //行业
	        if ($(".listOne").size()) {
	            industry = $(".listOne").text();
	        } else if ($("#compQs").find(".hang-active").text() == "全部") {
	            industry = "";
	        } else {
	            industry = $("#compQs").find(".hang-active").text();
	        }
	        //投资轮次
	        if ($(".listTwo").size()) {
	            status = $(".listTwo").text();
	        } else if ($("#compHy").find(".hang-active").text() == "全部") {
	            status = "";
	        } else {
	            status = $("#compHy").find(".hang-active").text()
	        }
	        //省份
	        if ($(".listThree").size()) {
	            province = $(".listThree").text();
	        } else if ($("#compSf").find(".hang-active").text() == "全部") {
	            province = "";
	        } else {
	            province = $("#compSf").find(".hang-active").text();
	        }
			//高新企业
	        if ($(".listFour").size()) {
	            highSalary = $(".listFour").text();
	        } else if ($("#compGx").find(".hang-active").text() == "全部") {
	            highSalary = "";
	        } else {
	            highSalary = $("#compGx").find(".hang-active").text();
	        }
	        var code = "";
	        var keyword = $("#comKeyWord").val();
			var startTime = $("#tradingStart").val();
			var stopTime = $("#tradingStop").val();
	        var _url = "";
			if (compareDate(startTime, stopTime)) {
				 _url = $.kf.GETCOMPANYLIST + "?" + "keyword=" + keyword + "&status=" + status + "&province=" + province + "&industry=" + industry+ "&highSalary=" + highSalary + "&startTime=" + startTime + "&stopTime=" + stopTime + "&page=" + 1;
		        $("#tableTwo").html("");
				var lastPage = Query.getHash("page");
	            $.getTable({
		        	url:_url,//url
			    	pageId:$("#pageTool"),//分页id
			    	callback:getList,//callback
			    	currentPage:lastPage,
			    	tbodyId:$("#tableOne")//tbody的id,
		        })
			}
	    };
	
	    var keyWord = function () {
	        /*关键词搜索按钮*/
	        $("#investSer").on("click", function () {
	        	Query.setHash({"page":1});
	            initTable();
	        });
	        //重置
	        $("#investSerReset").on("click",function(){
	        	Query.setHash({"page":1});
	        	$("#tableOne").html("");
	        	$("#comKeyWord").val("");
	        	$("#tradingStart").val("");
				$("#tradingStop").val("");
	        	$("#soClear").click();
	        	
	        })
	        //日期查询
	        $("#tradingSer").on("click", function () {
	        	Query.setHash({"page":1});
	            initTable();
	        });
	        //日期清空
	        $("#compReset").on("click", function () {
	        	Query.setHash({"page":1});
	        	$("#tradingStart").val("");
				$("#tradingStop").val("");
	            initTable();
	        });
	        //回车查询
	        $("#comKeyWord").on("keydown", function (e) {
	            var keyCode = e.which;
	            if (keyCode == 13) {
	                $("#investSer").click();
	            }
	
	        });
	    };
	    keyWord();
	    
		//所属行业
		var industryWord = function(){
			$.kf.ajax({//所属行业
	            type: "get",
	            url: $.kf.GETCOMPANYINDUSTRY,
	            data: "",
	            dataType: "json",
	            processResponse: function(data){
	            	industryFun(data);
	            }
	        });
		};
		industryWord();
		
		//行业列表
		var industryFun = function(data){
			var data = data.data;
			var tr = "";
			var trPop2 = "";
			$(data).each(function(i){
				trPop2 += "<li data-name=" + data[i].letter +" name =" + data[i].code +" title=' " + data[i].name + " '><span>" + data[i].name + "</span></li>";
			});
			$("#compPop2").find("ul").empty("").html("");
			$("#compPop2").find("ul").append(trPop2);
			//字母选择
			popLetter();
			
			comPopIndu();
			
			provinceChoose();
			
			listComClick();
			
			getUrlParam();//地址栏参数，刷新
		};
		
		//省份选择pop
		var provinceChoose = function(){
			var _text = "";
			var proCode = "";
			$("#comProvince").find("li").on("click",function(){
				$("#compProvSave").addClass("btn-primary").removeClass("default");
				_text = $(this).text();
				proCode = $(this).attr("name");
				$(this).addClass("provinceLi");
				$(this).siblings().removeClass("provinceLi");
			});
			$("#compProvSave").on("click",function(){
				if($(this).parents(".myModal01 ").find(".city-list").find(".provinceLi").text() != ""){
					$(".city-list").find("li").show();
					_text = $(this).parents(".myModal01 ").find(".city-list").find(".provinceLi").text();
					$(".province-ul").find("li").removeClass("provinceLi");
					$(".province-ul").find("li:last").addClass("provinceLi");
					$('#myModal').modal('hide');
					$("#tableOne").html("");
					$("#compSf").find("li").removeClass("hang-active");
					Query.setHash({
						proCode:proCode,
                        "page":1
					});
					$("#allListSo").show();
					$(".listThree").remove();
					$("#allListSo").find("ul").prepend("<li class='listThree' name =" + proCode + ">" + _text + "<span class='soListClose'></span></li>");
					_text = "";
					$("#compSf").find("li").each(function(){
						if($(this).attr("name") == proCode){
							$(this).siblings().removeClass("hang-active");
							$(this).addClass("hang-active");
						}
					});
					initTable();
				}
				removeThing();
			})
			
			
		};
		
		/*行业弹窗选择*/
		var comPopIndu = function(){
			var _text = "";
			var inCode = "";
			$("#compPop2").find("li").on("click",function(){
				$("#industrySave").addClass("btn-primary").removeClass("default");
				_text = $(this).text();
				inCode = $(this).attr("name");
				$(this).addClass("provinceLi");
				$(this).siblings().removeClass("provinceLi");
			});
			$("#industrySave").on("click",function(){
				if($(this).parents(".myModal01 ").find(".city-list").find(".provinceLi").text() != ""){
					$(".city-list").find("li").show();
					_text = $(this).parents(".myModal01 ").find(".city-list").find(".provinceLi").text();
					$(".province-ul").find("li").removeClass("provinceLi");
					$(".province-ul").find("li:last").addClass("provinceLi");
					$('#myModal03').modal('hide');
					$("#tableOne").html("");
					$("#compQs").find("li").removeClass("hang-active");
					Query.setHash({
						inCode:inCode,
                        "page":1
					});
					$("#allListSo").show();
					$(".listOne").remove();
					$("#allListSo").find("ul").prepend("<li class='listOne' name =" + inCode + ">" + _text + "<span class='soListClose'></span></li>");
					_text = "";
					$("#compQs").find("li").each(function(){
						if($(this).attr("name") == inCode){
							$(this).siblings().removeClass("hang-active");
							$(this).addClass("hang-active");
						}
					});
					initTable();
				}
				removeThing();
			})
		};
	}
	
	return{
		init:function(){
			investCompany();
		}
	}
	
}()
