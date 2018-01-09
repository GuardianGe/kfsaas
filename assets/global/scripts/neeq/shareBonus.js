/******

UPDATE DATE:2016/9/20
NAV:定增
NAME:WANGJH

******/



var privateAddPage = function(){

/************************************分红****************************************/	
    var privateAdd = function(){
    	
    	var initTable = function(){
	    	var securities = "";
	        var industry = "";
	        var province = "";
	        var tag = "";
	        //券商
	        if ($(".listOne").size()) {
	            securities = $(".listOne").text();
	        } else if ($("#compQs").find(".hang-active").text() == "全部") {
	            securities = "";
	        } else {
	            securities = $("#compQs").find(".hang-active").text();
	        }
	        //行业
	        if ($(".listTwo").size()) {
	            industry = $(".listTwo").attr("name");
	        } else if ($("#compHy").find(".hang-active").text() == "全部") {
	            industry = "";
	        } else {
	            industry = $("#compHy").find(".hang-active").attr("name");
	        }
	        //省份
	        if ($(".listThree").size()) {
	            province = $(".listThree").text();
	        } else if ($("#compSf").find(".hang-active").text() == "全部") {
	            province = "";
	        } else {
	            province = $("#compSf").find(".hang-active").text();
	        }
	         //公司标签
	        if ($(".listFive").size()) {
	            tag = $(".listFive").attr("name");
	        } else if ($("#compBq").find(".hang-active").text() == "全部") {
	            tag = "";
	        } else {
	            tag = $("#compBq").find(".hang-active").attr("name");
	        }
	    	var keyword = $("#keyword").val();
			var year = trimAll($("#checkYear").children("a").text()) == "全部年份" ? "" : trimAll($("#checkYear").children("a").text());
			var dtReport = trimAll($("#checkReport").children("a").text()) == "全部报告" ? "" : trimAll($("#checkReport").children("a").text());
			if(dtReport == "年报"){
				dtReport = "all";
			}else if(dtReport == "半年报"){
				dtReport = "six";
			}
			var mode =securities ;
			var type = industry;
			var progressName = province;
			var orderByName = "";
	        var orderByType = "";
	        $(".sort a").each(function () {
	            if ($(this).hasClass("bgredB") || $(this).hasClass("bgredT")) {
	                orderByName = $(this).parents("th").attr("name");
	                orderByType = $(this).attr("name");
	            }
	        });
			var _url = $.kf.COMPANYDIVSERVICEGETLIST+"?"+ "orderByName=" + orderByName + "&orderByType=" + orderByType+"&keyword="+keyword+"&tag="+tag+"&year="+year+"&dtReport="+dtReport + "&mode="+mode + "&type="+type+"&progressName="+progressName;
			var lastPage = Query.getHash("page");
			$.getTable({
	        	url:_url,//url
		    	pageId:$("#pageTool"),//分页id
		    	callback:addList,//callback
		    	currentPage:lastPage,
		    	tbodyId:$("#addList")//tbody的id,
	        })
			/*if(year == "" && dtReport != ""){
				alert("请选择报告期年份");
			}else if(year != "" && dtReport == ""){
				alert("请选择年报或者半年报");
			}else{
				
			}*/
	    };
		 /*拼table表格*/
	    var addList = function (data) {
	        var list = data.data;
	        var tr = "";
	        var securities = "";
	        $("#addList").html("");
	        $(list).each(function (i) {
	        	if(list[i].securities == "1"){
					securities = "取消";
				}else{
					securities = "关注";
				};
	            tr += "<tr>";
	            tr += "<td>" + list[i].redCode + "</td>";
	            if(list[i].securities == "0"){
	            	 tr += "<td><a href='" + $.url.companyListUrl() + "id=" + list[i].companyId + "&nameCodeId=" + list[i].code + "&position=companyList"+"'>" + list[i].redShortname + "</a></td>";
	            }else{
	            	 tr += "<td><a style='color:#f57d4b' href='" + $.url.companyListUrl() + "id=" + list[i].companyId + "&nameCodeId=" + list[i].code + "&position=companyList"+"'>" + list[i].shortname + "</a></td>";
	            }
	           
	            tr += "<td class=''>" + list[i].dtReport + "</td>";
	            tr += "<td>" + list[i].dtPlan + "</td>";
	            tr += "<td>" + list[i].dtRegist + "</td>";
	            tr += "<td>" + list[i].dtDivEx + "</td>";
	            tr += "<td>" + list[i].dtCapitalBase + "</td>";
	            tr += "<td class='queryWidthFen'>" + list[i].capitalBase + "</td>";
	            tr += "<td class='queryWidthFen'>" + list[i].capitalPostDiv + "</td>";
	            tr += "<td>" + list[i].progressName + "</td>";
	            tr += "<td><a href='#fenhBox' class='fBox'  data-toggle='modal'  name='"+ list[i].divDscrp +"'>详情</a></td>";
	            tr += "<td><a class='comOptional'>" + securities + "</a></td>";
	            tr += "</tr>";
	        });
	        $("#addList").append(tr);
	        //自选功能
	        comOptional();
	    };
	     //加入自选功能
	    var comOptional = function(){
	    	$(".fBox").on("click",function(){
	    		var _tt = $(this).attr("name");
	    		$("#shufsk").text(_tt);
	    	});
			$(".comOptional").click(function(){
				var _url = "";
				var code = $(this).parent().parent().children().first().text();
				var param = {
				  		"code":code
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
		var pickItem = function(){
			var securities = "";//转让方式1,2  mode
	        var industry = "";//市场层级,做市和协议  type
	        var province = "";//定增进度
	        $(".allList").find("li").unbind("click").on("click", function (event) {
	            event.preventDefault();
				$(".sort").find("a").removeClass("bgredB");
        		$(".sort").find("a").removeClass("bgredT");
	            var ind = $("#soCheck").find("li").length;
	            if (!$(this).hasClass("hang-more")) {
	                $("#addList").html("");
	                $(this).parent("ul").find("li").removeClass("hang-active");
	                $(this).addClass("hang-active");
	                /*转让方式*/
	                if ($(this).parents(".allList").attr("id") == "compQs") {
	                    securities = $(this).text();
	                    var seCode = $(this).attr("name");
	                    if ($(this).index() == 0) {
	                    	if($(".listOne").length){
	                    		if(ind <= 2){
	                    			$("#allListSo").hide();
	                    		};
	                    		Query.setHash({
		                            "seCode": seCode,
		                            "page":1
		                        });
		                        $(".listOne").remove();
	                    	}
	                    } else {
	                    	$("#allListSo").show();
	                        Query.setHash({
	                            "seCode": seCode,
	                            "page":1
	                        });
	                        $(".listOne").remove();
	                        $("#allListSo").find("ul").prepend("<li class='listOne' name =" + seCode + ">" + securities + "<span class='soListClose'></span></li>");
	                    }
	
	                }
	                /*市场层级*/
	                if ($(this).parents(".allList").attr("id") == "compHy") {
	                    industry = $(this).text();
	                    var inCode = $(this).attr("name");
	                    if ($(this).index() == 0) {
	                    	if($(".listTwo").length){
	                    		if(ind <= 2){
	                    			$("#allListSo").hide();
	                    		}
	                    		
	                    		Query.setHash({
		                            "inCode": "",
		                            "page":1
		                        });
		                        $(".listTwo").remove();
	                    	}
	                        
	                    } else {
	                    	$("#allListSo").show();
	                        Query.setHash({
	                            "inCode": inCode,
	                            "page":1
	                        });
	                        $(".listTwo").remove();
	                        $("#allListSo").find("ul").prepend("<li class='listTwo' name =" + inCode + ">" + industry + "<span class='soListClose'></span></li>");
	                    }
	
	                }
	                /*定增进度*/
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
	                //公司标签
	                if ($(this).parents(".allList").attr("id") == "compBq") {
	                    tag = $(this).text();
	                    var bqCode = $(this).attr("name");
	                    if ($(this).index() == 0) {
	                    	if($(".listFive").length){
	                    		if(ind <= 2){
	                    			$("#allListSo").hide();
	                    		}
	                    		
	                    		Query.setHash({
		                            "bqCode": "",
		                            "page":1
		                        });
		                        $(".listFive").remove();
	                    	}
	                        
	                    } else {
	                    	$("#allListSo").show();
	                        Query.setHash({
	                            "bqCode": bqCode,
	                            "page":1
	                        });
	                        $(".listFive").remove();
	                        $("#allListSo").find("ul").prepend("<li class='listFive' name =" + bqCode + ">" + tag + "<span class='soListClose'></span></li>");
	                    }
	
	                }
	                initTable();
	                removeThing();
	            }
	        });
		};
		var removeThing = function () {
	        //点击关闭按钮
	        $(".soListClose").unbind().on("click", function () {
	        	$(".sort").find("a").removeClass("bgredB");
        		$(".sort").find("a").removeClass("bgredT");
	            var flg = $(this).index();
	            $("#addList").html("");
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
	                Query.setHash({
	                    seCode: "",
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
	                    inCode: "",
	                    "page":1
	                });
	            }
	            //查询条件清除地址栏参数
	            if ($(this).parent().hasClass("listThree")) {
	            	$("#progressNameMy").find("li").removeClass("provinceLi");
            		$("#compPopspecailSave").addClass("default").removeClass("btn-primary");
	                $("#compSf").find("li").each(function () {
	                    if ($(this).text() == "全部") {
	                        $(this).addClass("hang-active");
	                        $(this).siblings().removeClass("hang-active");
	                    }
	                });
	                Query.setHash({
	                    proCode: "",
	                    "page":1
	                });
	            };
	            
	            //查询条件清除地址栏参数
	            if ($(this).parent().hasClass("listFive")) {
	            	$("#compLabelPop").find("li").removeClass("provinceLi");
	            	$("#compLabelSave").addClass("default").removeClass("btn-primary");
	                $("#compBq").find("li").each(function () {
	                    if ($(this).text() == "全部") {
	                        $(this).addClass("hang-active");
	                        $(this).siblings().removeClass("hang-active");
	                    }
	                });
	                Query.setHash({//清除地址栏对应的参数
	                    bqCode: "",
	                    "page":1
	                });
	            }
	            
	           initTable();
	        });
	    };
		var getUrlParam = function () {
	        var aCode = Query.getHash("seCode");
	        var bCode = Query.getHash("inCode");
	        var cCode = Query.getHash("proCode");
	        var eCode = Query.getHash("bqCode");
	        var a = "", b = "", c = "",e='';
	        $("#compQs").find("li").each(function (i) {
	            if (!isNullOrEmpty(aCode)) {
	                if ($(this).attr("name") != aCode) {
	                    $(this).removeClass("hang-active");
	                    $(this).nextAll("li").removeClass("hang-active");
	                    $("#compPop").find("li").each(function () {
	                        if ($(this).text() == aCode) {
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
	                    $("#progressNameMy").find("li").each(function () {
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
	        $("#compBq").find("li").each(function (i) {
	            if (!isNullOrEmpty(eCode)) {
	                if ($(this).attr("name") != eCode) {
	                    $(this).removeClass("hang-active");
	                    $(this).nextAll("li").removeClass("hang-active");
	                    $("#compLabelPop").find("li").each(function () {
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
	        if (isNullOrEmpty(aCode) && isNullOrEmpty(bCode) && isNullOrEmpty(cCode) && isNullOrEmpty(eCode)) {
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
	        if (!isNullOrEmpty(eCode)) {
	            $("#allListSo").show();
	            $(".listFive").remove();
	            $("#allListSo").find("ul").prepend("<li class='listFive' name=" + eCode + ">" + e + "<span class='soListClose'></span></li>");
	        }
	        //请空选项
	        $("#soClear").on("click", function () {
	        	$(".sort").find("a").removeClass("bgredB");
        		$(".sort").find("a").removeClass("bgredT");
	            Query.setHash({
	                inCode: "",
	                seCode: "",
	                proCode: "",
	                bqCode: "",
                    "page":1
	            });
	            $("#progressNameMy").find("li").removeClass("provinceLi");
        		$("#compPopspecailSave").addClass("default").removeClass("btn-primary");
	            $(this).parent("li").siblings().remove();
	            $(this).parents("#allListSo").hide();
	            $("#compQs").find("li").eq(0).addClass("hang-active").siblings().removeClass("hang-active");
	            $("#compHy").find("li").eq(0).addClass("hang-active").siblings().removeClass("hang-active");
	            $("#compSf").find("li").eq(0).addClass("hang-active").siblings().removeClass("hang-active");
	            $("#compBq").find("li").eq(0).addClass("hang-active").siblings().removeClass("hang-active");
	            initTable();
	        });
	        initTable();
			removeThing();
	    };
	    /***搜索***/
		$("#addSer").on("click",function(){
			Query.setHash({"page":1});
			$(".sort").find("a").removeClass("bgredB");
    		$(".sort").find("a").removeClass("bgredT");
			initTable();
			
		});
		//重置
		$("#compReset").on("click",function(){
			$(".sort").find("a").removeClass("bgredB");
    		$(".sort").find("a").removeClass("bgredT");
    		$("#checkYear").children("a").html('全部年份<span class="input-group-btn caret2"><button class="btn btn-sm  btn-icon-btn" type="button"><i class="fa fa-calendar2"></i></button></span>');
    		$("#checkReport").children("a").html('全部报告<span class="input-group-btn caret2"><button class="btn btn-sm  btn-icon-btn" type="button"><i class="fa fa-calendar2"></i></button></span>');
			$(this).parents(".page-content-par").find("input").val("");
			$("#soClear").click();
		});
		//enter
		$("#keyword").on("keydown",function(e){
			$(".sort").find("a").removeClass("bgredB");
        		$(".sort").find("a").removeClass("bgredT");
			var keyCode = e.which;
			if(keyCode == 13){
				$("#addSer").click();
			}
			
		});
		/***排序***/
        $("#sample_1 tr span a").on("click", function (e) {
        	Query.setHash({"page":1});
			sortToggle(this);
			$("#addList").html("");
            initTable();
            
       });
       //公司标签
		var labelWord = function(){
			$.kf.ajax({//公司标签
	            type: "get",
	            url: $.kf.GETCOMPANYTAG,
	            data: "",
	            dataType: "json",
	            processResponse: function(data){
	            	labelFun(data);
	            }
	        });
		};
		//标签列表
		var labelFun = function(data){
			var data = data.data;
			var trPop2 = "";
			$(data).each(function(i){
				trPop2 += "<li data-name=" + data[i].letter +" name =" + data[i].id +" title=' " + data[i].name + " '><span>" + data[i].name + "</span></li>";
			});
			$("#compLabelPop").find("ul").empty("").html("");
			$("#compLabelPop").find("ul").append(trPop2);
			//字母选择
			popLetter();
			getUrlParam();
			pickItem();
			comLabelSpecial();
		};
		
		/*公司标签弹窗选择*/
		var comLabelSpecial = function(){
			var _text = "";
			var bqCode = "";
			$("#compLabelPop").find("li").unbind().on("click",function(){
				_text = $(this).text();
				bqCode = $(this).attr("name");
				$(this).addClass("provinceLi");
				$(this).siblings().removeClass("provinceLi");
				$("#compLabelSave").addClass("btn-primary").removeClass("default");
			});
			$("#compLabelSave").unbind().on("click",function(){
				if($(this).parents(".myModal01 ").find(".city-list").find(".provinceLi").text() != ""){
					$(".city-list").find("li").show();
					_text = $(this).parents(".myModal01 ").find(".city-list").find(".provinceLi").text();
					$(".province-ul").find("li").removeClass("provinceLi");
					$(".province-ul").find("li:last").addClass("provinceLi");
					$('#myModalBq').modal('hide');
					$("#tableOne").html("");
					$("#compBq").find("li").removeClass("hang-active");
					Query.setHash({
						bqCode:bqCode,
						"page":1
					});
					$("#allListSo").show();
					$(".listFive").remove();
					$("#allListSo").find("ul").prepend("<li class='listFive' name =" + bqCode + ">" + _text + "<span class='soListClose'></span></li>");
					_text = '';
					$("#compLb").find("li").each(function(){
						if($(this).attr("name") == bqCode){
							$(this).siblings().removeClass("hang-active");
							$(this).addClass("hang-active");
						}
					});
					initTable();
				}
				removeThing();
			})
		};
		labelWord();
	};
	


	return {
		privateAdd:function(){
			new Select($("#checkYear"),{}).init();
			new Select($("#checkReport"),{}).init();
			privateAdd();
			
		}
	}
}();