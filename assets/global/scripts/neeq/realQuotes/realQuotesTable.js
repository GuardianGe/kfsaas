/*终止挂牌*/
var RealQuoTable = function(){
	var codeArr = [];
	var pageTotal = "";
	//选项的点击事件
    var listComClick = function () {
        $(".allList").find("li").unbind("click").on("click", function (event) {
        	$(".sort").find("a").removeClass("bgredB");
    		$(".sort").find("a").removeClass("bgredT");
            event.preventDefault();
            var ind = $("#soCheck").find("li").length;
            if (!$(this).hasClass("hang-more")) {
                $("#tableEnd").html("");
                $(this).parent("ul").find("li").removeClass("hang-active");
                $(this).addClass("hang-active");

                /*类型*/
                if ($(this).parents(".allList").attr("id") == "compLx") {
                    realLx = $(this).text();
                    var seCode = $(this).attr("name");
                    if ($(this).index() == 0) {
                    	if($(".listOne").length){
                    		if(ind <= 2){
                    			$("#allListSo").hide();
                    		}
                    		Query.setHash({
	                            "leCode": "",
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
                        $("#allListSo").find("ul").prepend("<li class='listOne' name =" + seCode + ">" + realLx + "<span class='soListClose'></span></li>");
                    }

                }
                /*券商*/
                if ($(this).parents(".allList").attr("id") == "compQs") {
                    realQs = $(this).text();
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
                        $("#allListSo").find("ul").prepend("<li class='listTwo' name =" + inCode + ">" + realQs + "<span class='soListClose'></span></li>");
                    }

                }
                /*特征*/
                if ($(this).parents(".allList").attr("id") == "compTz") {
                    realTz = $(this).text();
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
                        $("#allListSo").find("ul").prepend("<li class='listThree'name =" + proCode + ">" + realTz + "<span class='soListClose'></span></li>");
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
    }

    /*拼table表格*/
    var getList = function (data) {
        var list = data.data;
        var tr = "";
        $("#tableEnd").html("");
        codeArr.splice(0,codeArr.length);//清空数组
        $(list).each(function (i) {
        	codeArr[i] = list[i].codeNum;
            tr += "<tr>";
            tr += "<td>" + list[i].date + "</td>";
            tr += "<td>" + list[i].code + "</td>";
            if(list[i].securities == "关注"){
            	tr += "<td><a href='" + $.url.companyListUrl() + "id=" + list[i].id + "&nameCodeId=" + list[i].codeNum + "&position=realTime"+"'>" + list[i].name + "</a></td>";
            }else{
            	tr += "<td><a style='color:#f57d4b;' href='" + $.url.companyListUrl() + "id=" + list[i].id + "&nameCodeId=" + list[i].codeNum + "&position=realTime"+"'>" + list[i].name + "</a></td>";
            }
            if(Number(list[i].current) == 0){
            	if(list[i].upDown == 1){
            		tr += "<td class='queryWidthCom priceBgRed'><span class='priceGreen'>" + list[i].currentPrice + "</span></td>";
            	}else if(list[i].upDown == 0){
            		tr += "<td class='queryWidthCom priceBgGreen'><span class='priceGreen'>" + list[i].currentPrice + "</span></td>";
            	}else{
            		tr += "<td class='queryWidthCom'><span class='priceGreen'>" + list[i].currentPrice + "</span></td>";
            	}
            	
            }else if(Number(list[i].current) == 1){
            	if(list[i].upDown == 1){
            		tr += "<td class='queryWidthCom priceBgRed'><span class='priceRed'>" + list[i].currentPrice + "</span></td>";
            	}else if(list[i].upDown == 0){
            		tr += "<td class='queryWidthCom priceBgGreen'><span class='priceRed'>" + list[i].currentPrice + "</span></td>";
            	}else{
            		tr += "<td class='queryWidthCom'><span class='priceRed'>" + list[i].currentPrice + "</span></td>";
            	}
            	
            }else{
            	tr += "<td class='queryWidthCom'>" + list[i].currentPrice + "</td>";
            }
            
            if(Number(list[i].upDownClose) > 0){
            	tr += "<td><span class='priceRed'>" + list[i].upDownClose + "</span></td>";
            }else if(Number(list[i].upDownClose) < 0){
            	tr += "<td><span class='priceGreen'>" + list[i].upDownClose + "</span></td>";
            }else{
            	tr += "<td><span class=''>" + list[i].upDownClose + "</span></td>";
            }
            if(Number(list[i].upDownRateClose) > 0){
            	tr += "<td><span class='priceRed'>" + list[i].upDownRateClose + "</span></td>";
            }else if(Number(list[i].upDownRateClose) < 0){
            	tr += "<td><span class='priceGreen'>" + list[i].upDownRateClose + "</span></td>";
            }else{
            	tr += "<td><span class=''>" + list[i].upDownRateClose + "</span></td>";
            }
            if(Number(list[i].max) == 0){
            	tr += "<td class='queryWidthCom'><span class='priceGreen'>" + list[i].maxPrice + "</span></td>";//max
            }else if(Number(list[i].max) == 1){
            	tr += "<td class='queryWidthCom'><span class='priceRed'>" + list[i].maxPrice + "</span></td>";//max
            }else{
            	tr += "<td class='queryWidthCom'>" + list[i].maxPrice + "</td>";//max
            }
            
            if(Number(list[i].min) == 0){
            	tr += "<td class='queryWidthCom'><span class='priceGreen'>" + list[i].minPrice + "</span></td>";//max
            }else if(Number(list[i].min) == 1){
            	tr += "<td class='queryWidthCom'><span class='priceRed'>" + list[i].minPrice + "</span></td>";//max
            }else{
            	tr += "<td class='queryWidthCom'>" + list[i].minPrice + "</td>";//max
            }
            tr += "<td class='queryWidthCom'>" + list[i].previousPrice + "</td>";
            tr += "<td class='queryWidthCom'>" + list[i].dealSum + "</td>";
            tr += "<td>" + list[i].dealVolumn + "</td>";
            tr += "<td>" + list[i].transRate + "</td>";
            tr += "<td><a class='addMyChoose' data-code='"+list[i].codeNum+"' href='javascript:;'>"+list[i].securities+"</a></td>";
            tr += "</tr>";
        });
        $("#tableEnd").append(tr);
        addChoose();
        //pageTotal =  $(".first-page-li").find("span").text();
        timeIntervalInit();
        
    };
    var addChoose = function(){
    	$(".addMyChoose").off().on("click",function(){
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
	            	initTable();
            	}
		 	 })
		});
    };
    var timeIntervalInit = function(){
		clearInterval(timePicker);
		clearInterval(timePicker2);
    	var _leng = "";
    	for(var i=0;i<codeArr.length;i++){
	        _leng += codeArr[i]+",";
	    }
    	_leng = _leng.substring(0,_leng.length-1);
    	var keyword = $("#comKeyWord").val();
    	var _url = $.kf.GETQUOTESREAL + "?code="+_leng+"&keyword="+ keyword;
    	timePicker = setInterval(function(){
    		new GetTableQuotes(_url, $("#pageToolaaa"), "", getList, "get", $("#tableEnd"),"",$(".noLoading")).init();
//	        $.kf.ajax({
//	            type: "get",
//	            url: _url,
//	            data: "",
//	            dataType: "json",
//	            processResponse: function (data) {
//	                getList(data);
//	            }
//	        });
    	},10000);
    	timePicker2 = setTimeout(function(){
    		$("#tableEnd").find(".priceBgGreen").removeClass("priceBgGreen");
    		$("#tableEnd").find(".priceBgRed").removeClass("priceBgRed");
    	},3000);
    };
    var removeThing = function () {
        //点击关闭按钮
        $(".soListClose").unbind().on("click", function () {
        	$(".sort").find("a").removeClass("bgredB");
    		$(".sort").find("a").removeClass("bgredT");
            var flg = $(this).index();
            $("#tableEnd").html("");
            if ($(this).parents(".allListSo").find("li").length == 2) {
                $(this).parents(".allListSo").hide();
            }
            $(this).parent().remove();
            //查询条件清除地址栏参数
            if ($(this).parent().hasClass("listOne")) {
                $("#compLx").find("li").each(function () {
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
            	$("#comProvince").find("li").removeClass("provinceLi");
            	$("#compProvSave").addClass("default").removeClass("btn-primary");
                $("#compQs").find("li").each(function () {
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
                $("#compTz").find("li").each(function () {
                    if ($(this).text() == "全部") {
                        $(this).addClass("hang-active");
                        $(this).siblings().removeClass("hang-active");
                    }
                });
                Query.setHash({
                    proCode: "",
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
                    bqCode: "",
                    "page":1
                });
            }
            initTable();
        });
    };

    //初始化表格
    var initTable = function () {
        var realLx = "";
        var realQs = "";
        var realTz = '';
		var tag = "";
        //类型
        if ($(".listOne").size()) {
            realLx = $(".listOne").attr("name");
        } else if ($("#compLx").find(".hang-active").text() == "全部") {
            realLx = "";
        } else {
            realLx = $("#compLx").find(".hang-active").attr("name")
        }
        //券商
        if ($(".listTwo").size()) {
            realQs = $(".listTwo").attr("name");
        } else if ($("#compQs").find(".hang-active").text() == "全部") {
            realQs = "";
        } else {
            realQs = $("#compQs").find(".hang-active").attr("name")
        }
        //特征
        if ($(".listThree").size()) {
            realTz = $(".listThree").attr("name");
        } else if ($("#compTz").find(".hang-active").text() == "全部") {
            realTz = "";
        } else {
            realTz = $("#compTz").find(".hang-active").attr("name");
        }
        //公司标签
        if ($(".listFive").size()) {
            tag = $(".listFive").attr("name");
        } else if ($("#compBq").find(".hang-active").text() == "全部") {
            tag = "";
        } else {
            tag = $("#compBq").find(".hang-active").attr("name")
        }
        var orderByName = "";
        var orderByType = "";
        $(".sort a").each(function () {
            if ($(this).hasClass("bgredB") || $(this).hasClass("bgredT")) {
                orderByName = $(this).parents("th").attr("name");
                orderByType = $(this).attr("name");
            }
        });
        
        var keyword = $("#comKeyWord").val();
        var _url = "";
        var lastPage = Query.getHash("page");
        _url = $.kf.GETQUOTATIONREAL + "?orderByName=" + orderByName + "&orderByType=" + orderByType+ "&tag=" + tag+ "&type=" + realLx + "&special=" + realQs + "&transaction=" + realTz +  "&keyword=" + keyword;
        new GetTableQuotes(_url, $("#pageTool"), "", getList, "get", $("#tableEnd"),lastPage).init();

    };

    var keyWord = function () {
    	 /***排序***/
        $("#sample_1 th a").on("click", function (e) {
        	Query.setHash({"page":1});
            sortToggle(this);
            initTable();
        })
        /*关键词搜索按钮*/
        $("#compBtn").off().on("click", function () {
        	Query.setHash({"page":1});
        	$(".sort").find("a").removeClass("bgredB");
    		$(".sort").find("a").removeClass("bgredT");
            initTable();

        });

        //回车查询
        //enter
        $("#comKeyWord").off().on("keydown", function (e) {
        	$(".sort").find("a").removeClass("bgredB");
    		$(".sort").find("a").removeClass("bgredT");
            var keyCode = e.which;
            if (keyCode == 13) {
                $("#compBtn").click();
            }

        });
        //清空选项
        $("#soClear").on("click", function () {
        	$(".sort").find("a").removeClass("bgredB");
    		$(".sort").find("a").removeClass("bgredT");
        	$(".city-list").find("li").removeClass("provinceLi");
           	$(".modal-footer").each(function(){
           		$(this).find(".btn").eq(1).addClass("default").removeClass("btn-primary");
           	});
            Query.setHash({
                inCode: "",
                seCode: "",
                proCode: "",
                bqCode: "",
                "page":1
            });
            $(this).parent("li").siblings().remove();
            $(this).parents("#allListSo").hide();
            $("#compQs").find("li").eq(0).addClass("hang-active").siblings().removeClass("hang-active");
            $("#compTz").find("li").eq(0).addClass("hang-active").siblings().removeClass("hang-active");
            $("#compLx").find("li").eq(0).addClass("hang-active").siblings().removeClass("hang-active");
            $("#compBq").find("li").eq(0).addClass("hang-active").siblings().removeClass("hang-active");
            initTable();
        });
    	//重置
        $("#compReset").on("click", function () {
        	$(".sort").find("a").removeClass("bgredB");
    		$(".sort").find("a").removeClass("bgredT");
        	$(this).parents(".page-content-par").find("input").val("");
        	$("#soClear").click();
           
        });
    };
    //主办券商
    var specialWord = function () {
        $.kf.ajax({
            type: "get",
            url: $.kf.SPECIALWORD,
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
		var m = 0;
		$(data).each(function(i){
			trPop += "<li data-name=" + data[i].letter +" name =" + data[i].code +" title=' " + data[i].broker_name + " '>" + data[i].broker_name + "</li>";
		});
	
		$("#comProvince").find("ul").empty("").html("");
		$("#comProvince").find("ul").append(trPop);
		
		//弹窗选择事件
		comPopSpecial();
		
	};
	
	/*券商弹窗选择*/
	var comPopSpecial = function(){
		var _text = "";
		var seCode = "";
		
		$("#comProvince").find("li").unbind().on("click",function(){
			_text = $(this).text();
			seCode = $(this).attr("name");
			$(this).addClass("provinceLi");
			$(this).siblings().removeClass("provinceLi");
			$("#compProvSave").addClass("btn-primary").removeClass("default");
		});
		$("#compProvSave").unbind().on("click",function(){
			 if($(this).parents(".myModal01 ").find(".city-list").find(".provinceLi").text() != ""){
				$(".city-list").find("li").show();
				_text = $(this).parents(".myModal01 ").find(".city-list").find(".provinceLi").text();
				$(".province-ul").find("li").removeClass("provinceLi");
				$(".province-ul").find("li:last").addClass("provinceLi");
				$(".sort").find("a").removeClass("bgredB");
        		$(".sort").find("a").removeClass("bgredT");
				$('#myModalQuotes').modal('hide');
				$("#tableEnd").html("");
				$("#compQs").find("li").removeClass("hang-active");
				Query.setHash({
					seCode:seCode,
					"page":1
				});
				$("#allListSo").show();
				$(".listTwo").remove();
				$("#allListSo").find("ul").prepend("<li class='listTwo' name =" + seCode + ">" + _text + "<span class='soListClose'></span></li>");
				initTable();
				$("#compQs").find("li").each(function(){
					if($(this).attr("name") == seCode){
						$(this).siblings().removeClass("hang-active");
						$(this).addClass("hang-active");
					}
				});
				_text = "";
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
		listComClick();
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
	
	
	return {
		init:function(){
			specialWord();//加载标签选项
			labelWord();//加载标签
			initTable();
			keyWord();//关键字搜索
		}
	}
}();









