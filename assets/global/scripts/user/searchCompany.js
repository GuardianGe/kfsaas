var InvestCompany = function(){
	
	/************************************被投企业****************************************/
	var investCompany = function(){
		//选项的点击事件
	    var listComClick = function () {
	    	var industry = "";
	        var status = "";
	        var province = "";
	        var neeqlabel = "";
	        var isHighMoney = "";
	        $(".allList").find("li").unbind("click").on("click", function (event) {
	            event.preventDefault();
	
	            var ind = $("#soCheck").find("li").length;
	            if (!$(this).hasClass("hang-more")) {
	                $("#tableOneSearch").html("");
	                $(this).parent("ul").find("li").removeClass("hang-active");
	                $(this).addClass("hang-active");
					
					/*所属行业*/
	                if ($(this).parents(".allList").attr("id") == "compHy") {
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
	                /*慧标签*/
	                if ($(this).parents(".allList").attr("id") == "compBq") {
	                    neeqlabel = $(this).text();
	                    var neCode = $(this).attr("name");
	                    if ($(this).index() == 0) {
	                    	if($(".listTwo").length){
	                    		if(ind <= 2){
	                    			$("#allListSo").hide();
	                    		}
	                    		Query.setHash({
		                            "neCode": "",
		                            "page":1
		                        });
		                        $(".listTwo").remove();
	                    	}
	                       
	                    } else {
	                    	$("#allListSo").show();
	                        Query.setHash({
	                            "neCode": neCode,
	                            "page":1
	                        });
	                        $(".listTwo").remove();
	                        $("#allListSo").find("ul").prepend("<li class='listTwo' name =" + neCode + ">" + neeqlabel + "<span class='soListClose'></span></li>");
	                    }
	
	                }
	                 /*轮次*/
	                if ($(this).parents(".allList").attr("id") == "compLc") {
	                    status = $(this).text();
	                    var stCode = $(this).attr("name");
	                    if ($(this).index() == 0) {
	                    	if($(".listThree").length){
	                    		if(ind <= 2){
	                    			$("#allListSo").hide();
	                    		}
	                    		
	                    		$(".listThree").remove();
		                        Query.setHash({
		                            stCode: "",
		                            "page":1
		                        });
	                    	}
	                    } else {
	                    	$("#allListSo").show();
	                        Query.setHash({
	                            stCode: stCode,
	                            "page":1
	                        });
	                        $(".listThree").remove();
	                        $("#allListSo").find("ul").prepend("<li class='listThree'name =" + stCode + ">" + status + "<span class='soListClose'></span></li>");
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
	                        $(".listFour").remove();
	                        $("#allListSo").find("ul").prepend("<li class='listFour'name =" + proCode + ">" + province + "<span class='soListClose'></span></li>");
	                    }
	                }
	                /*是否高新企业*/
	                if ($(this).parents(".allList").attr("id") == "compGx") {
	                    isHighMoney = $(this).text();
	                    var hiCode = $(this).attr("name");
	                    if ($(this).index() == 0) {
	                    	if($(".listThree").length){
	                    		if(ind <= 2){
	                    			$("#allListSo").hide();
	                    		}
	                    		
	                    		$(".listThree").remove();
		                        Query.setHash({
		                            hiCode: "",
		                            "page":1
		                        });
	                    	}
	                    } else {
	                    	$("#allListSo").show();
	                        Query.setHash({
	                            hiCode: hiCode,
	                            "page":1
	                        });
	                        $(".listFive").remove();
	                        $("#allListSo").find("ul").prepend("<li class='listFive'name =" + hiCode + ">" + isHighMoney + "<span class='soListClose'></span></li>");
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
	    		$(this).parents(".allListInvest").find(".tradingStart").val(startT);
	    		$(this).parents(".allListInvest").find(".tradingStop").val(stopT);
	    	})
	    }
	
	    /*拼table表格*/
	    var getLists = function (data) {
	        var list = data.data;
	        var tr = "";
	        $("#tableOneSearch").html("");
	        var attention = "";
	        $(list).each(function (i) {
	        	if(list[i].attention == "1"){
					attention = "取消";
				}else{
					attention = "关注";
				};
	        	tr += "<tr>";
	        	 tr += '<td style="text-align:left;"><div class="investTbox investTbox-search">';
                tr += '    <div class="investT-left investT-left-search"><img src="'+list[i].logo+'"></div>';
                tr += '    <div class="investT-right">';
                tr += '        <div class="investR-top">';
                tr += '            <span id="inName"><a href="">'+ list[i].name +'</a></span>';
                tr += '            <span id="investType">'+ list[i].setBy +'</span>';
                tr += '            <span class="investHide"><br></span>';
                tr += '        </div>';
                tr += '        <div class="in-content" style="display: block;">'+ list[i].content.substring(0,28) +'...<a class="in-more">展开<img src="../../assets/admin/layout/img/xiala.png"></a></div>';
                tr += '        <div class="in-content2" style="display: none;">'+ list[i].content +'<a class="in-more in-hide">收起<img src="../../assets/admin/layout/img/shouqi.png"></a></div>';
                tr += '   </div>';
                tr += '   </div>';
                tr += '   <div>';
                
                $(list[i].saasType).each(function(j){
                	 tr += '<span>'+list[i].saasType[j].type+'</span>';
                }); 
                
                tr += '</div>';
                tr += '   <div><span>共有'+ list[i].dynamic +'条动态</span><span>重大提示：'+ list[i].major +'条</span></div>';
                tr += '</td>';
	        	tr += "<td>" + list[i].companyType + "</td>";
	        	tr += "<td>" + list[i].step + "</td>";
	        	tr += "<td>" + list[i].date + "</td>";
	        	tr += "<td>" + list[i].address + "</td>";
	        	tr += "<td><a class='comOptional' name='" + list[i].id + "'>" + attention + "</a></td>";
                tr += "</tr>";
	        });
	        $("#tableOneSearch").append(tr);
			
			//展开收起
			$(".investT-right").on("click",".in-more",function(){
				if($(this).hasClass("in-hide")){
					$(this).parents(".investT-right").find(".in-content2").hide();
					$(this).parents(".investT-right").find(".in-content").show();
				}else{
					$(this).parents(".investT-right").find(".in-content2").show();
					$(this).parents(".investT-right").find(".in-content").hide();
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
	            $("#tableOneSearch").html("");
	            if ($(this).parents(".allListSo").find("li").length == 2) {
	                $(this).parents(".allListSo").hide();
	            }
	            $(this).parent().remove();
	            //查询条件清除地址栏参数--行业
	            if ($(this).parent().hasClass("listOne")) {
	                $("#compHy").find("li").each(function () {
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
	            //查询条件清除地址栏参数--标签
	            if ($(this).parent().hasClass("listTwo")) {
	                $("#compBq").find("li").each(function () {
	                    if ($(this).text() == "全部") {
	                        $(this).addClass("hang-active");
	                        $(this).siblings().removeClass("hang-active");
	                    }
	                });
	                Query.setHash({//清除地址栏对应的参数
	                    neCode: "",
                        "page":1
	                });
	            }
	            //查询条件清除地址栏参数--轮次
	            if ($(this).parent().hasClass("listThree")) {
	                $("#compLc").find("li").each(function () {
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
	                    stCode: "",
                        "page":1
	                });
	            }
	             //查询条件清除地址栏参数--省份
	            if ($(this).parent().hasClass("listFour")) {
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
	             //查询条件清除地址栏参数--高薪
	            if ($(this).parent().hasClass("listFive")) {
	                $("#compGx").find("li").each(function () {
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
	                    hiCode: "",
                        "page":1
	                });
	            }
	            initTable();
	        });
	    };
	
	    var getUrlParam = function () {
	        var aCode = Query.getHash("inCode");
	        var bCode = Query.getHash("neCode");
	        var cCode = Query.getHash("stCode");
	        var dCode = Query.getHash("proCode");
	        var eCode = Query.getHash("hiCode");
	        var a = "", b = "", c = "";d = "";e = "";
	        $("#compHy").find("li").each(function (i) {
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
	        $("#compBq").find("li").each(function (i) {
	            if (!isNullOrEmpty(bCode)) {
	                if ($(this).attr("name") != bCode) {
	                    $(this).removeClass("hang-active");
	                    $(this).nextAll("li").removeClass("hang-active");
	                    $("#compPop3").find("li").each(function () {
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
	        $("#compLc").find("li").each(function (i) {
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
	        $("#compSf").find("li").each(function (i) {
	            if (!isNullOrEmpty(dCode)) {
	                if ($(this).attr("name") != dCode) {
	                    $(this).removeClass("hang-active");
	                    $(this).nextAll("li").removeClass("hang-active");
	                    $("#comProvince").find("li").each(function () {
	                        if ($(this).attr("name") == dCode) {
	                            d = $(this).text();
	                        }
	                    });
	                } else {
	                    $(this).addClass("hang-active");
	                    $(this).siblings("li").removeClass("hang-active");
	                    d = $(this).text();
	                }
	            }
	
	        });
	        $("#compGx").find("li").each(function (i) {
	            if (!isNullOrEmpty(eCode)) {
	                if ($(this).attr("name") != eCode) {
	                    $(this).removeClass("hang-active");
	                    $(this).nextAll("li").removeClass("hang-active");
	                    $("#comProvince").find("li").each(function () {
	                        if ($(this).attr("name") == eCode) {
	                            e = $(this).text();
	                        }
	                    });
	                } else {
	                    $(this).addClass("hang-active");
	                    $(this).siblings("li").removeClass("hang-active");
	                    e = $(this).text();
	                }
	            }
	
	        });
	        if (isNullOrEmpty(aCode) && isNullOrEmpty(bCode) && isNullOrEmpty(cCode) && isNullOrEmpty(dCode) && isNullOrEmpty(eCode)) {
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
	        if (!isNullOrEmpty(eCode)) {
	            $("#allListSo").show();
	            $(".listFive").remove();
	            $("#allListSo").find("ul").prepend("<li class='listFive' name=" + eCode + ">" + e + "<span class='soListClose'></span></li>");
	        }
	        //显示关闭按钮
	        $("#soClear").on("click", function () {
	            Query.setHash({
	                "inCode": "",
	                "neCode": "",
	                "stCode": "",
	                "proCode": "",
	                "hiCode":"",
                    "page":1
	            });
	            $("#tradingStart").val("");
	            $("#tradingStop").val("");
	            $(this).parent("li").siblings().remove();
	            $(this).parents("#allListSo").hide();
	            $("#compBq").find("li").eq(0).addClass("hang-active").siblings().removeClass("hang-active");
	            $("#compHy").find("li").eq(0).addClass("hang-active").siblings().removeClass("hang-active");
	            $("#compSf").find("li").eq(0).addClass("hang-active").siblings().removeClass("hang-active");
	            $("#compLc").find("li").eq(0).addClass("hang-active").siblings().removeClass("hang-active");
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
	        var industry = "";
	        var status = "";
	        var province = "";
	        var neeqlabel = "";
	        var isHighMoney = "";
	        //行业
	        if ($(".listOne").size()) {
	            industry = $(".listOne").text();
	        } else if ($("#compHy").find(".hang-active").text() == "全部") {
	            industry = "";
	        } else {
	            industry = $("#compHy").find(".hang-active").text();
	        }
	        //会标签
	        if ($(".listTwo").size()) {
	            neeqlabel = $(".listTwo").text();
	        } else if ($("#compBq").find(".hang-active").text() == "全部") {
	            neeqlabel = "";
	        } else {
	            neeqlabel = $("#compBq").find(".hang-active").text()
	        }
	        //轮次
	        if ($(".listThree").size()) {
	            status = $(".listThree").text();
	        } else if ($("#compLc").find(".hang-active").text() == "全部") {
	            status = "";
	        } else {
	            status = $("#compLc").find(".hang-active").text();
	        }
	        //省份
	        if ($(".listFour").size()) {
	            province = $(".listFour").text();
	        } else if ($("#compSf").find(".hang-active").text() == "全部") {
	            province = "";
	        } else {
	            province = $("#compSf").find(".hang-active").text();
	        }
	        //是否高薪
	        if ($(".listFive").size()) {
	            isHighMoney = $(".listFive").text();
	        } else if ($("#compGx").find(".hang-active").text() == "全部") {
	            isHighMoney = "";
	        } else {
	            isHighMoney = $("#compGx").find(".hang-active").text();
	        }
			var orderByName = "";
	        var orderByType = "";
	        $(".sort a").each(function () {
	            if ($(this).hasClass("bgredB") || $(this).hasClass("bgredT")) {
	                orderByName = $(this).parents("th").attr("name");
	                orderByType = $(this).attr("name");
	            }
	        });
	        var code = "";
	        var keyword = $("#comKeyWord").val();
			var createStart  = $("#tradingStart1").val();
			var createStop = $("#tradingStop1").val();
			var listedStart = $("#tradingStart2").val();
			var listedStop = $("#tradingStop2").val();
	        var _url = "";
			if (compareDate(createStart, createStop) || compareDate(listedStart, listedStop)) {
				 _url = $.kf.SEARCHGETCOMPANYSEARCH + "?" + "keyword=" + keyword+ "&highSalary="+isHighMoney+ "&orderByName="+orderByName+ "&orderByType="+orderByType+ "&tag="+ neeqlabel + "&step=" + status + "&province=" + province + "&industry=" + industry + "&createStart=" + createStart + "&createStop=" + createStop + "&listedStart=" + listedStart + "&listedStop=" + listedStop + "&page=" + 1;
		        $("#tableOneSearch").html("");
				var lastPage = Query.getHash("page");
	            $.getTable({
		        	url:_url,//url
			    	pageId:$("#pageToolSearch"),//分页id
			    	callback:getLists,//callback
			    	currentPage:lastPage,
			    	loadId:".maskInTable-pad",
			    	tbodyId:$("#tableOneSearch")//tbody的id,
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
	        	$("#tableOneSearch").html("");
	        	$("#comKeyWord").val("");
	        	$("#tradingStart").val("");
				$("#tradingStop").val("");
	        	$("#soClear").click();
	        	
	        })
	        //日期查询
	        $("#tradingSer1").on("click", function () {
	        	Query.setHash({"page":1});
	            initTable();
	        });
	        //日期查询
	        $("#tradingSer2").on("click", function () {
	        	Query.setHash({"page":1});
	            initTable();
	        });
	        //日期清空
	        $("#compReset1").on("click", function () {
	        	Query.setHash({"page":1});
	        	$("#tradingStart1").val("");
				$("#tradingStop1").val("");
	            initTable();
	        });
	        //日期清空
	        $("#compReset2").on("click", function () {
	        	Query.setHash({"page":1});
	        	$("#tradingStart2").val("");
				$("#tradingStop2").val("");
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
			
		};
		
		//慧标签
		var smartBq = function(){
			$.kf.ajax({//所属行业
	            type: "get",
	            url: $.kf.GETCOMPANYTAG,
	            data: "",
	            dataType: "json",
	            processResponse: function(data){
	            	smartBqList(data);
	            }
	        });
		};
		smartBq();
		//慧标签列表
		var smartBqList = function(data){
			var data = data.data;
			var tr = "";
			var trPop3 = "";
			$(data).each(function(i){
				trPop3 += "<li data-name=" + data[i].letter +" name =" + data[i].id +" title=' " + data[i].name + " '><span>" + data[i].name + "</span></li>";
			});
			$("#compPop3").find("ul").empty("").html("");
			$("#compPop3").find("ul").append(trPop3);
			//字母选择
			popLetter();
			
			comPopIndu();//行业弹窗
			
			bpBox();//标签弹窗
			
			provinceChoose();//省份选择
			
			listComClick();//筛选事件
			
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
					$("#tableOneSearch").html("");
					$("#compSf").find("li").removeClass("hang-active");
					Query.setHash({
						proCode:proCode,
                        "page":1
					});
					$("#allListSo").show();
					$(".listFour").remove();
					$("#allListSo").find("ul").prepend("<li class='listFour' name =" + proCode + ">" + _text + "<span class='soListClose'></span></li>");
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
		/*慧标签弹窗选择*/
		var bpBox = function(){
			var _text = "";
			var neCode = "";
			$("#compPop3").find("li").on("click",function(){
				$("#bqSave").addClass("btn-primary").removeClass("default");
				_text = $(this).text();
				neCode = $(this).attr("name");
				$(this).addClass("provinceLi");
				$(this).siblings().removeClass("provinceLi");
			});
			$("#bqSave").on("click",function(){
				if($(this).parents(".myModal01").find(".city-list").find(".provinceLi").text() != ""){
					$(".city-list").find("li").show();
					_text = $(this).parents(".myModal01").find(".city-list").find(".provinceLi").text();
					$(".province-ul").find("li").removeClass("provinceLi");
					$(".province-ul").find("li:last").addClass("provinceLi");
					$('#myModal04').modal('hide');
					$("#tableOneSearch").html("");
					$("#compBq").find("li").removeClass("hang-active");
					Query.setHash({
						neCode:neCode,
                        "page":1
					});
					$("#allListSo").show();
					$(".listTwo").remove();
					$("#allListSo").find("ul").prepend("<li class='listTwo' name =" + neCode + ">" + _text + "<span class='soListClose'></span></li>");
					_text = "";
					$("#compBq").find("li").each(function(){
						if($(this).attr("name") == neCode){
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
				if($(this).parents(".myModal01").find(".city-list").find(".provinceLi").text() != ""){
					$(".city-list").find("li").show();
					_text = $(this).parents(".myModal01").find(".city-list").find(".provinceLi").text();
					$(".province-ul").find("li").removeClass("provinceLi");
					$(".province-ul").find("li:last").addClass("provinceLi");
					$('#myModal03').modal('hide');
					$("#tableOneSearch").html("");
					$("#compHy").find("li").removeClass("hang-active");
					Query.setHash({
						inCode:inCode,
                        "page":1
					});
					$("#allListSo").show();
					$(".listOne").remove();
					$("#allListSo").find("ul").prepend("<li class='listOne' name =" + inCode + ">" + _text + "<span class='soListClose'></span></li>");
					_text = "";
					$("#compHy").find("li").each(function(){
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
