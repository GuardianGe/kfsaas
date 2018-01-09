//历史行情
var newsThree = function () {
    var newsThreeTrading = function () {
        //类别选中
        var trading = function () {
            $(".allList").find("li").on("click", function (event) {
            	$(".sort").find("a").removeClass("bgredB");
        		$(".sort").find("a").removeClass("bgredT");
                event.preventDefault()
                var ind = $("#soCheck").find("li").length;
                var afund = Query.getHash("type");
                if (!$(this).hasClass("hang-more")) {
                    $(this).parent("ul").find("li").removeClass("hang-active");
                    $(this).addClass("hang-active");
                     //类型
	                if ($(this).parents(".allList").attr("id") == "trading") {
	                    var tagName = $(this).attr("name");
	                    var tagText = $(this).text();
	                    if ($(this).index() == 0) {
	                    	if($(".listOne").length){
	                    		if(ind <= 2){
	                    			$("#allListSo").hide();
	                    		}
	                    		
	                    		Query.setHash({
		                            "tagName": "",
		                            "page":1
		                        });
		                        $(".listOne").remove();
	                    	}
	                        
	                    } else {
	                    	$("#allListSo").show();
	                        Query.setHash({
	                            "tagName": tagName,
	                            "page":1
	                        });
	                        $(".listOne").remove();
	                        $("#allListSo").find("ul").prepend("<li class='listOne' name =" + tagName + ">" + tagText + "<span class='soListClose'></span></li>");
	                    }
	
	                }
                    //公司标签
	                if ($(this).parents(".allList").attr("id") == "compBq") {
	                    var tag = $(this).text();
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
                    
                   initTable(false);
                   removeThing();
                }
            });
        }
       
		var removeThing = function () {
	        //点击关闭按钮
	        $(".soListClose").unbind().on("click", function () {
	            var flg = $(this).index();
	            $("#tableOne").html("");
	            if ($(this).parents(".allListSo").find("li").length == 2) {
	                $(this).parents(".allListSo").hide();
	            }
	            $(this).parent().remove();
	            //查询条件清除地址栏参数
	            if ($(this).parent().hasClass("listOne")) {
	                $("#trading").find("li").each(function () {
	                    if ($(this).text() == "全部") {
	                        $(this).addClass("hang-active");
	                        $(this).siblings().removeClass("hang-active");
	                    }
	                });
	                Query.setHash({
	                    "tagName": "",
	                    "page":1
	                });
	            }
	           
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
	            initTable(false);
	        });
	    };
	    
	    
        var getUrlParam = function () {
	        var aCode = Query.getHash("tagName");
	        var bCode = Query.getHash("bqCode");
	        var a = "", b = "";
	        $("#trading").find("li").each(function (i) {
	            if (!isNullOrEmpty(aCode)) {
	                if ($(this).attr("name") != aCode) {
	                    $(this).removeClass("hang-active");
	                    $(this).nextAll("li").removeClass("hang-active");
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
	                    $("#compLabelPop").find("li").each(function () {
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
	        
	        if (isNullOrEmpty(aCode) && isNullOrEmpty(bCode)){
	            $("#allListSo").hide();
	        }
	        if (!isNullOrEmpty(aCode)) {
	            $("#allListSo").show();
	            $(".listOne").remove();
	            $("#allListSo").find("ul").prepend("<li class='listOne' name=" + aCode + ">" + a + "<span class='soListClose'></span></li>");
	        }
	         if (!isNullOrEmpty(bCode)) {
	            $("#allListSo").show();
	            $(".listFive").remove();
	            $("#allListSo").find("ul").prepend("<li class='listFive' name=" + bCode + ">" + b + "<span class='soListClose'></span></li>");
	        }
	        //显示关闭按钮
	        $("#soClear").on("click", function () {
	            Query.setHash({
	                tagName: "",
	                bqCode: "",
	                companyCode:'',
	                "page":1
	            });
	            $(this).parent("li").siblings().remove();
	            $(this).parents("#allListSo").hide();
	            $("#trading").find("li").eq(0).addClass("hang-active").siblings().removeClass("hang-active");
	            $("#compBq").find("li").eq(0).addClass("hang-active").siblings().removeClass("hang-active");
	           	
	           	$(".city-list").find("li").removeClass("provinceLi");
	           	$(".modal-footer").each(function(){
	           		$(this).find(".btn").eq(1).addClass("default").removeClass("btn-primary");
	           	});
	            initTable(false);
	        });
	        //初始化列表
	        initTable(false);
	
	        //清空选项
	        removeThing();
	    };

        var initTable = function (flg) {
        	if(flg){
        		var keyword = $("#tradingName").val();
        	}else{
        		var companyCode = Query.getHash("companyCode");
	    		$("#tradingName").val(companyCode);
	    		var keyword = $("#tradingName").val();
        	}
	    	var tag = "";
	        //公司标签
	        if ($(".listFive").size()) {
	            tag = $(".listFive").attr("name");
	        } else if ($("#compBq").find(".hang-active").text() == "全部") {
	            tag = "";
	        } else {
	            tag = $("#compBq").find(".hang-active").attr("name")
	        }
	        var type = $("#trading").find(".hang-active").attr("name");
	        var start_time = $("#tradingStart").val();
	        var stop_time = $("#tradingStop").val();
	        if (isNullOrEmpty(type)) {
	            type = "";
	        }
	        var orderByName = "";
        	var orderByType = "";
	        var lastPage = Query.getHash("page");
	        $(".sort a").each(function () {
	            if ($(this).hasClass("bgredB") || $(this).hasClass("bgredT")) {
	                orderByName = $(this).parents("th").attr("name");
	                orderByType = $(this).attr("name");
	            }
	        });
	        if (compareDate(start_time, stop_time)) {
				 $("#GtradingList").html("");
	        	var _url = $.kf.GTRADING + "?" + "orderByName=" + orderByName + "&orderByType=" + orderByType+"&keyword=" + keyword +"&tag=" + tag+ "&start_time=" + start_time + "&stop_time=" + stop_time + "&type=" + type + "&page=" + 1;
	        	//new GetTable(_url, $("#pageToolMon"), "", getList, "get", $("#tableOne"),lastPage).init();
	        	$.getTable({
		        	url:_url,//url
			    	pageId:$("#pageTool"),//分页id
			    	callback:tardingList,//callback
			    	currentPage:lastPage,
			    	tbodyId:$("#GtradingList")//tbody的id,
		        })
			}

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
			getUrlParam();
			trading();
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
					initTable(false);
				}
				removeThing();
			})
		};
        /***table***/
        var tardingList = function (data) {
        	var datas = data;
            var list = data.data;
            var tr = "";
            $("#GtradingList").html("");
            $(list).each(function (i) {
                tr += "<tr>";
                tr += "<td>" + list[i].date + "</td>";
                tr += "<td>" + list[i].code + "</td>";
                 if(list[i].securities == "关注"){
	            	tr += "<td><a href='" + $.url.companyListUrl() + "id=" + list[i].id + "&position=trading" + "'>" + list[i].shortname + "</a></td>";
	            }else{
	            	tr += "<td><a style='color:#f57d4b;' href='" + $.url.companyListUrl() + "id=" + list[i].id + "&position=trading" + "'>" + list[i].shortname + "</a></td>";
	            }
               
                tr += "<td class='queryWidth'>" + list[i].turnover + "</td>";
                tr += "<td class='queryWidth'>" + list[i].volumn + "</td>";
                tr += "<td class='queryWidth'>" + list[i].close + "</td>";
                tr += "<td class='queryWidth'>" + list[i].pchange_pct + "</td>";
                tr += "<td class='queryWidth'>" + list[i].high + "</td>";
                tr += "<td class='queryWidth'>" + list[i].low + "</td>";
                tr += "<td class='queryWidth'>" + list[i].pratio + "</td>";
                tr += "<td><a data-code='"+list[i].codeNum+"' class='addMyChoose' href='javascript:;'>" + list[i].securities + "</a></td>";
                tr += "</tr>";
            });
            $("#GtradingList").append(tr);
            $("#tradingStart").val(datas.dateStart);
            $("#tradingStop").val(datas.dateStop);
            
	    	$(".addMyChoose").click(function(){
				var _url = "";
				var code = $(this).attr("data-code");
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
		            	initTable(false);
	            	}
			 	 })
			});
    
        }

        /***搜索***/
        $("#tradingSer").on("click", function () {
        	$(".sort").find("a").removeClass("bgredB");
    		$(".sort").find("a").removeClass("bgredT");
    		Query.setHash({
                companyCode: $('#tradingName').val()
            });
            initTable(true);
        });
        //重置
        $("#compReset").on("click", function () {
        	$(".sort").find("a").removeClass("bgredB");
    		$(".sort").find("a").removeClass("bgredT");
        	$(this).parents(".page-content-par").find("input").val("");
        	$("#soClear").click();
        });
        //enter
        $("#tradingName").on("keydown", function (e) {
        	$(".sort").find("a").removeClass("bgredB");
    		$(".sort").find("a").removeClass("bgredT");
            var keyCode = e.which;
            if (keyCode == 13) {
                $("#tradingSer").click();
            }

        });
        /***排序***/
        $("#Gsample tr span a").on("click", function (e) {
            sortToggle(this);
            initTable(false);
        })
        
        //导出excel
        $("#outExcel").on("click",function(){
        	var type = $("#trading").find(".hang-active").attr("name");
            var keyword = $("#tradingName").val();
            var start_time = $("#tradingStart").val();
            var stop_time = $("#tradingStop").val();
            var orderByName = "";
    	    var orderByType = "";
    	    var tag = "";
            $(".sort a").each(function(){
            	if($(this).hasClass("bgredB") || $(this).hasClass("bgredT")){
            		orderByName = $(this).parents("th").attr("name");
            	    orderByType = $(this).attr("name");
            	}
            });
            //公司标签
	        if ($(".listFive").size()) {
	            tag = $(".listFive").attr("name");
	        } else if ($("#compBq").find(".hang-active").text() == "全部") {
	            tag = "";
	        } else {
	            tag = $("#compBq").find(".hang-active").attr("name")
	        }
            var _url = $.kf.GTRADING + "?exportType=" + "export" + "&orderByName=" + orderByName + "&orderByType=" + orderByType+"&tag=" + tag +"&keyword=" + keyword + "&start_time=" + start_time + "&stop_time=" + stop_time + "&type=" + type + "&page=" + 1;
            var excelUrl = $.kf.GETEXPORTQUOTES;
            
            if (compareDate(start_time, stop_time)){
            	if(start_time == stop_time){
            		$.kf.ajax({
			            type: "get",
			            url: excelUrl,
			            data: '',
			            dataType: "json",
			            processResponse: function(data){
			            	if(data.flag){//是否有权限
			            		window.open(_url);
			            	}else{
			            		alert(data.message);
			            	}
		            	}
				 	});
	            }else{
	            	alert("每次只能导出一天的数据");
	            }
            }
            
           
        });
        labelWord();
    }
	return {
        threeTrading: function () {
            newsThreeTrading()
        }
    }
}();
