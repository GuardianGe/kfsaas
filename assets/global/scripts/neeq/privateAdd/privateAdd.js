/******

UPDATE DATE:2016/9/20
NAV:定增
NAME:WANGJH

******/



var privateAddPage = function(){

/************************************定增****************************************/	
    var privateAdd = function(){
    	
    	var sortFlg = '';
    	var sortArrow = '';
    	var initTable = function(flg){
	    	var securities = "";
	        var industry = "";
	        var province = "";
	        var mode = '';
	        var type = '';
	        var hyCode = '';//行业
	        var tag = "";
	        //转让方式
	        if ($(".listOne").size()) {
	            mode = $(".listOne").text();
	        } else if ($("#compQs").find(".hang-active").text() == "全部") {
	            mode = "";
	        } else {
	            mode = $("#compQs").find(".hang-active").text();
	        }
	        //市场层级
	        if ($(".listTwo").size()) {
	            type = $(".listTwo").attr("name");
	        } else if ($("#compHy").find(".hang-active").text() == "全部") {
	            type = "";
	        } else {
	            type = $("#compHy").find(".hang-active").attr("name");
	        }
	        //定增进度
	        if ($(".listThree").size()) {
	            province = $(".listThree").attr("name");
	        } else if ($("#compSf").find(".hang-active").text() == "全部") {
	            province = "";
	        } else {
	            province = $("#compSf").find(".hang-active").attr("name");
	        }
	        //行业
	        if ($(".listFour").size()) {
	            hyCode = $(".listFour").attr("name");
	        } else if ($("#compHyy").find(".hang-active").text() == "全部") {
	            hyCode = "";
	        } else {
	            hyCode = $("#compHyy").find(".hang-active").attr("name");
	        }
	        //公司标签
	        if ($(".listFive").size()) {
	            tag = $(".listFive").attr("name");
	        } else if ($("#compBq").find(".hang-active").text() == "全部") {
	            tag = "";
	        } else {
	            tag = $("#compBq").find(".hang-active").attr("name")
	        }
	        if(!isNullOrEmpty(Query.getHash("industry"))){
	        	industry = Query.getHash("industry");
	        }else{
	        	industry = hyCode;
	        }
	    	var keyword = $("#keyword").val();
			var start_time = $("#startDate").val();
			var stop_time = $("#stopDate").val();
			var progress = province;
			
			var orderByName = "";
	        var orderByType = "";
	        var getByName = Query.getHash("orderByName");
		    if(!isNullOrEmpty(getByName)){
	        	orderByName = getByName;
	        	orderByType = Query.getHash("orderByType");
	        }else{
		        if(!isNullOrEmpty(sortFlg)){
	                $("."+sortFlg).find("a").each(function () {
			            if ($(this).hasClass("bgredB") || $(this).hasClass("bgredT")) {
			                orderByName = $(this).parents("th").attr("name");
			                orderByType = $(this).attr("name");
			            }
			        });
		        }
		    }
	        if(Query.getHash("company") == "company"){
	        	orderByName = "fund_max";
	        	orderByType = "DESC"
	        }
			var _url = $.kf.GETSTOCKDILUTIONCOLUMN+"?"+"keyword="+keyword+"&industry="+industry+"&tag="+tag+"&orderByName=" + orderByName + "&orderByType=" + orderByType+"&start_time="+start_time+"&stop_time="+stop_time + "&mode="+mode + "&type="+type+"&progress="+progress;
			var lastPage = Query.getHash("page");
			
			if (compareDate(start_time, stop_time)) {
				if(isNullOrEmpty(flg)){
					$("#addList").html("");
					$.getTable({
			        	url:_url,//url
				    	pageId:$("#pageTool"),//分页id
				    	callback:addList,//callback
				    	border:false,
				    	currentPage:lastPage,
				    	tbodyId:$("#addList")//tbody的id,
			        })
				}else{
					$("#addTableId").html("");
					$.getTable({
			        	url:_url,//url
				    	pageId:$("#pageTool"),//分页id
				    	callback:addListTd,//callback
				    	border:false,
				    	currentPage:lastPage,
				    	tbodyId:$("#addTableId")//tbody的id,
			        })
				}
				
			}
			
	    };
    	//拼接td
    	var connectTd = function(list,thArray){
    		//tbody
    		var tr = '';
			$(list).each(function(i){
				tr += "<tr>";
					//拼接TD
		        	$(thArray).each(function(j){
			            if(isChinese(thArray[j])){
			            	if(thArray[j] == "简称"){
				            	tr += "<td><a href='"+ $.url.addUrl()+"id="+list[i]["company_id"]+"&position=privateAdd"+"'>" + list[i][thArray[j]] + "</a></td>";
			            	}else if(thArray[j] == "详细"){
				            	tr += "<td class='addDetail'><a data-toggle='modal' data-target='#myModal' name=" + list[i]["id"] + " data-name="+list[i]["ifDependent"]+">详情</a></td>";
			            	}else{
			            		if(list[i][thArray[j]].indexOf(".") > 0){
			            			tr += "<td class='queryWidthCom'>" + list[i][thArray[j]] + "</td>";
			            		}else{
			            			tr += "<td>" + list[i][thArray[j]] + "</td>";
			            		}
			            		
			            	}
			            }
		        	})
	            	
	        	tr += "</tr>";
			});
			return tr;
    	};
    	var returnTh = function(title,bgredT,bgredB,className,attrName){
    		var myTh = "";
    		myTh += '<th class="'+className+'" name="'+attrName+'">';
			myTh += '<span>'+title+'</span>';
            myTh += '<span class="sort">';
            myTh += '    <a href="javascript:void(0)" name="ASC" class="sort-up '+bgredT+'"></a>';
            myTh += '    <a href="javascript:void(0)" name="DESC" class="sort-down '+bgredB+'"></a>';
            myTh += '</span>';
            myTh += '</th>';
            return myTh;
    	}
    	var addList = function (data){
			var list = data.data;
			var tr = "";
			var thArray = [];
			$("#addTableId").html("");
			var th = "";
	        //每个list的key都相同
	        for (var key in list[0]){
	    		thArray.push(key);
	    	};
	    	//thead
			th += '<thead>';
				th += '<tr  role="row" class="tr">';
					$(thArray).each(function (i) {
						if(isChinese(thArray[i])){
							if(thArray[i] == "最新公告日"){
								if(!isNullOrEmpty(sortFlg)){
									if(sortFlg == "sortNewst"){
										if(sortArrow == "up"){
											th += returnTh("最新公告日","bgredT","","sortNewst","date_new");
										}else{
											th += returnTh("最新公告日","","bgredB","sortNewst","date_new");
										}
									}else{
										th += returnTh("最新公告日","","","sortNewst","date_new");
									}
								}else{
									th += returnTh("最新公告日","","","sortNewst","date_new");
								}
							}else if(thArray[i] == "预案公告日"){
								if(!isNullOrEmpty(sortFlg)){
									if(sortFlg == "sortPrep"){
										if(sortArrow == "up"){
											th += returnTh("预案公告日","bgredT","","sortPrep","date_plan");
										}else{
											th += returnTh("预案公告日","","bgredB","sortPrep","date_plan");
										}
									}else{
										th += returnTh("预案公告日","","","sortPrep","date_plan");
									}
								}else{
									th += returnTh("预案公告日","","","sortPrep","date_plan");
								}
							}else if(thArray[i] == "募集资金(万元)"){
								if(!isNullOrEmpty(sortFlg)){
									if(sortFlg == "sortMoney"){
										if(sortArrow == "up"){
											th += returnTh("募集资金(万元)","bgredT","","sortMoney","fund_max");
										}else{
											th += returnTh("募集资金(万元)","","bgredB","sortMoney","fund_max");
										}
									}else{
										th += returnTh("募集资金(万元)","","","sortMoney","fund_max");
									}
								}else{
									th += returnTh("募集资金(万元)","","","sortMoney","fund_max");
								}
							}else{
								th += "<th>" + thArray[i] + "</th>";
							}
							
			    		}
					})
				th += '</tr>';
			th += '</thead>';
			var tbody = "<tbody id='addTableId'>"+connectTd(list,thArray)+"</tbody>";
			$("#addList").append(th + tbody);
			if(!isNullOrEmpty(Query.getHash("orderByName"))){
				$(".sort").eq(6).children("a").eq(1).addClass("bgredB");
			}
			addEvent();
		};
		var addListTd = function(data){
			var list = data.data;
			var tr = "";
			var thArray = [];
			$("#addTableId").html("");
			var th = "";
	        //每个list的key都相同
	        for (var key in list[0]){
	    		thArray.push(key);
	    	};
	    	$("#addTableId").append(connectTd(list,thArray));
	    	addEvent();
		}
		var addEvent = function(){
			/***排序***/
	        $("#addList tr span a").on("click", function (e) {
	        	sortToggle(this);
	        	sortFlg = $(this).parents("th").attr("class");
	        	if($(this).attr("name") == "ASC"){
	        		sortArrow = "up";
	        	}else{
	        		sortArrow = "down";
	        	}
	        	Query.setHash({"page":1});
	           	initTable("td");
	        })
			//点击显示弹窗详情
			$(".addDetail a").on("click",function(){
				var Tid = $(this).attr("name");
				var ifDependent = $(this).attr("data-name");
				_url = $.kf.DILUTIONDETAIL+"?"+"id="+Tid+"&ifDependent="+ifDependent;
				//new GetTable(_url,$("#pageToolSmall"),"",privateList,"get","").init();
				$.kf.ajax({
		            type: "get",
		            url: _url,
		            data: "",
		            dataType: "json",
		            processResponse: function(data){
		            	privateList(data);
		            }
		        });
			});
		}
		var privateList = function(data){
			var list = data.data;
			var tr = "";
			$("#privateList").html("");
				tr += "<tr>";
				tr += "<td>公告日期</td>";
				tr += "<td>" + list.date + "</td>";
				tr += "</tr>";
				tr += "<tr>";
				tr += "<td>进度</td>";
				tr += "<td>" + list.progress + "</td>";
				tr += "</tr>";
				tr += "<tr>";
				tr += "<td>增发价格(元)</td>";
				tr += "<td>" + list.price + "</td>";
				tr += "</tr>";
				tr += "<tr>";
				tr += "<td>增发数量(万股)</td>";
				tr += "<td>" + list.number + "</td>";
				tr += "</tr>";
				tr += "<tr>";
				tr += "<td>募集资金(万元)</td>";
				tr += "<td>" + list.financingAmount + "</td>";
				tr += "</tr>";
				tr += "<tr>";
				tr += "<td class='bborder'>发行对象</td>";
				tr += "<td class='bborder'><a class='fobject' style='color:#f77e44'>展开</a></td>";
				tr += "</tr>";
				tr += "<tr class='hideV'>";
				tr += "<td></td>";
				tr += "<td>" + list.object + "</td>";
				tr += "</tr>";
				tr += "<tr>";
				tr += "<td>认购方式</td>";
				tr += "<td>" + list.addIssuanceMethod + "</td>";
				tr += "</tr>";
				tr += "<tr>";
				tr += "<td>定向增发目的</td>";
				tr += "<td>" + list.financingPurpose + "</td>";
				tr += "</tr>";
			$("#privateList").append(tr);
			if(isNullOrEmpty(list.object)){
				$(".fobject").hide();
			}
			//弹窗发行对象展开
			$(".fobject").on("click",function(){
				var text = $(this).text();
				var nextTr = $(this).closest("tr").next("tr");
				if(text == "展开"){
					$(".bborder").addClass("bbNode");
					$(this).text("收起")
					nextTr.addClass("showV").removeClass("hideV");

				}else{
					$(".bborder").removeClass("bbNode");
					$(this).text("展开")
					nextTr.addClass("hideV").removeClass("showV");
				}
			})

		}
		var pickItem = function(){
			var securities = "";//转让方式1,2  mode
	        var industry = "";//市场层级,做市和协议  type
	        var province = "";//定增进度
	        var tag = "";
	        $(".allList").find("li").unbind("click").on("click", function (event) {
	            event.preventDefault();
				$(".sort").find("a").removeClass("bgredB");
        		$(".sort").find("a").removeClass("bgredT");
	            var ind = $("#soCheck").find("li").length;
	
	            if (!$(this).hasClass("hang-more")) {
	                $("#addTableId").html("");
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
	                    		}
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
	                //行业
	                if ($(this).parents(".allList").attr("id") == "compHyy") {
	                    var hyy = $(this).text();
	                    var hyCode = $(this).attr("name");
	                    if ($(this).index() == 0) {
	                    	if($(".listFour").length){
	                    		if(ind <= 2){
	                    			$("#allListSo").hide();
	                    		}
	                    		
	                    		Query.setHash({
		                            "hyCode": "",
		                            "page":1
		                        });
		                        $(".listFour").remove();
	                    	}
	                        
	                    } else {
	                    	$("#allListSo").show();
	                        Query.setHash({
	                            "hyCode": hyCode,
	                            "page":1
	                        });
	                        $(".listFour").remove();
	                        $("#allListSo").find("ul").prepend("<li class='listFour' name =" + hyCode + ">" + hyy + "<span class='soListClose'></span></li>");
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
	
	                initTable("td");
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
	            $("#addTableId").html("");
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
	                    "seCode": "",
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
	                    "inCode": "",
                        "page":1
	                });
	            }
	            //查询条件清除地址栏参数
	            if ($(this).parent().hasClass("listThree")) {
	            	$("#progressMy").find("li").removeClass("provinceLi");
            		$("#compPopspecailSave").addClass("default").removeClass("btn-primary");
	                $("#compSf").find("li").each(function () {
	                    if ($(this).text() == "全部") {
	                        $(this).addClass("hang-active");
	                        $(this).siblings().removeClass("hang-active");
	                    }
	                });
	                Query.setHash({
	                    "proCode": "",
                        "page":1
	                });
	            }
	            //查询条件清除地址栏参数
	            if ($(this).parent().hasClass("listFour")) {
	            	$("#compHyy").find("li").removeClass("provinceLi");
	            	$("#compLabelIndSave").addClass("default").removeClass("btn-primary");
	                $("#compHyy").find("li").each(function () {
	                    if ($(this).text() == "全部") {
	                        $(this).addClass("hang-active");
	                        $(this).siblings().removeClass("hang-active");
	                    }
	                });
	                Query.setHash({//清除地址栏对应的参数
	                    "hyCode": "",
	                    "page":1
	                });
	            }
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
	                    "bqCode": "",
	                    "page":1
	                });
	            }
	            initTable("td");
	        });
	    };
		var getUrlParam = function () {
	        var aCode = Query.getHash("seCode");
	        var bCode = Query.getHash("inCode");
	        var cCode = Query.getHash("proCode");
	        var eCode = Query.getHash("bqCode");
	        var dCode = Query.getHash("hyCode");
	        var a = "", b = "", c = "",e='',d='';
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
	                    $("#progressMy").find("li").each(function () {
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
	        $("#compHyy").find("li").each(function (i) {
	            if (!isNullOrEmpty(dCode)) {
	                if ($(this).attr("name") != dCode) {
	                    $(this).removeClass("hang-active");
	                    $(this).nextAll("li").removeClass("hang-active");
	                    $("#compLabelIndw").find("li").each(function () {
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
	        //请空选项
	        $("#soClear").on("click", function () {
	        	$(".sort").find("a").removeClass("bgredB");
        		$(".sort").find("a").removeClass("bgredT");
	            Query.setHash({
	                "inCode": "",
	                "seCode": "",
	                "proCode": "",
	                "bqCode": "",
	                "hyCode":'',
	                "page":1
	            });
	            $("#progressMy").find("li").removeClass("provinceLi");
        		$("#compPopspecailSave").addClass("default").removeClass("btn-primary");
	            $(this).parent("li").siblings().remove();
	            $(this).parents("#allListSo").hide();
	            $("#compQs").find("li").eq(0).addClass("hang-active").siblings().removeClass("hang-active");
	            $("#compHy").find("li").eq(0).addClass("hang-active").siblings().removeClass("hang-active");
	            $("#compSf").find("li").eq(0).addClass("hang-active").siblings().removeClass("hang-active");
	            $("#compBq").find("li").eq(0).addClass("hang-active").siblings().removeClass("hang-active");
	            $("#compHyy").find("li").eq(0).addClass("hang-active").siblings().removeClass("hang-active");
	            initTable("td");
	        });
	        initTable();
			removeThing();
	    };
	    /***搜索***/
		$("#addSer").on("click",function(){
			Query.setHash({"page":1});
			$(".sort").find("a").removeClass("bgredB");
    		$(".sort").find("a").removeClass("bgredT");
			$("#addTableId").html("");
			initTable("td");
			
		});
		//重置
		$("#compReset").on("click",function(){
			$(".sort").find("a").removeClass("bgredB");
    		$(".sort").find("a").removeClass("bgredT");
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
		//定增进度
	    var specialWord = function () {
	        $.kf.ajax({
	            type: "get",
	            url: $.kf.GETPLANCATEGORY,
	            data: "",
	            dataType: "json",
	            processResponse: function(data){
	            	specialFun(data);
	            }
	        });
		};
		//主办券商l列表
		var specialFun = function(data){
			var data = data.data;
			var tr = "";
			var trPop = "";
			$(data).each(function(i){
				trPop += "<li data-name=" + data[i].letter +" name =" + data[i].code +" title=' " + data[i].name + " '>" + data[i].name + "</li>";
			});
			
			$("#progressMy").find("ul").empty("").html("");
			$("#progressMy").find("ul").append(trPop);
			
			//字母选择
			popLetter();
			//弹窗选择事件
			comPopSpecial();
			getUrlParam();
			pickItem();
			
		};
		/*定增进度弹窗选择*/
		var comPopSpecial = function(){
			var _text = "";
			var proCode = "";
			
			$("#progressMy").find("li").on("click",function(){
				_text = $(this).text();
				proCode = $(this).attr("name");
				$(this).addClass("provinceLi");
				$(this).siblings().removeClass("provinceLi");
				$("#compPopspecailSave").addClass("btn-primary").removeClass("default");
			});
			$("#compPopspecailSave").on("click",function(){
				if($(this).parents(".myModal01").find(".city-list").find(".provinceLi").text() != ""){
					$(".city-list").find("li").show();
					_text = $(this).parents(".myModal01").find(".city-list").find(".provinceLi").text();
					$(".province-ul").find("li").removeClass("provinceLi");
					$(".province-ul").find("li:last").addClass("provinceLi");
					Query.setHash({
						"proCode":proCode,
						"page":1
					});
					$('#myModalPro').modal('hide');
					$('#myModal02').modal('hide');
					$("#tableOne").html("");
					$("#compSf").find("li").removeClass("hang-active");
					$("#allListSo").show();
					$(".listThree").remove();
					$("#allListSo").find("ul").prepend("<li class='listThree' name =" + proCode + ">" + _text + "<span class='soListClose'></span></li>");
					$("#compSf").find("li").each(function(){
						if($(this).attr("name") == proCode){
							$(this).siblings().removeClass("hang-active");
							$(this).addClass("hang-active");
						}
					});
					_text = "";
					initTable("td");
				}
				removeThing();
			})
		};
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
			specialWord();
			industryWord();
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
					$("#addTableId").html("");
					$("#compBq").find("li").removeClass("hang-active");
					Query.setHash({
						"bqCode":bqCode,
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
					initTable("td");
				}
				removeThing();
			})
		};
		//行业
		var industryWord = function(){
			$.kf.ajax({
	            type: "get",
	            url: $.kf.INDUSTRYWORD,
	            data: "",
	            dataType: "json",
	            processResponse: function(data){
	            	industryFun(data);
	            }
	        });
		};
		//行业列表
		var industryFun = function(data){
			var data = data.data;
			var trPop2 = "";
			$(data).each(function(i){
				trPop2 += "<li style='width:180px;' data-name=" + data[i].letter +" name =" + data[i].code +" title=' " + data[i].name + " '><span>" + data[i].name + "</span></li>";
			});
			$("#compLabelIndw").find("ul").empty("").html("");
			$("#compLabelIndw").find("ul").append(trPop2);
			//字母选择
			popLetter();
			industrySpecial();
		};
		
		/*行业弹窗选择*/
		var industrySpecial = function(){
			var _text = "";
			var hyCode = "";
			
			$("#compLabelIndw").find("li").unbind().on("click",function(){
				_text = $(this).text();
				hyCode = $(this).attr("name");
				$(this).addClass("provinceLi");
				$(this).siblings().removeClass("provinceLi");
				$("#compLabelIndSave").addClass("btn-primary").removeClass("default");
			});
			$("#compLabelIndSave").unbind().on("click",function(){
				if($(this).parents(".myModal01 ").find(".city-list").find(".provinceLi").text() != ""){
					$(".city-list").find("li").show();
					_text = $(this).parents(".myModal01 ").find(".city-list").find(".provinceLi").text();
					$(".province-ul").find("li").removeClass("provinceLi");
					$(".province-ul").find("li:last").addClass("provinceLi");
					$('#compLabelInd').modal('hide');
					$("#addTableId").html("");
					$("#compHyy").find("li").removeClass("hang-active");
					Query.setHash({
						"hyCode":hyCode,
						"page":1
					});
					$("#allListSo").show();
					$(".listFour").remove();
					$("#allListSo").find("ul").prepend("<li class='listFour' name =" + hyCode + ">" + _text + "<span class='soListClose'></span></li>");
					_text = '';
					$("#compHyy").find("li").each(function(){
						if($(this).attr("name") == hyCode){
							$(this).siblings().removeClass("hang-active");
							$(this).addClass("hang-active");
						}
					});
					initTable("td");
				}
				removeThing();
			})
		};
	    labelWord();
	};
	


	return {
		privateAdd:function(){
			privateAdd();
			
		}
	}
}();