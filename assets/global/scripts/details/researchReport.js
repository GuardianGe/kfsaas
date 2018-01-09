/*
 * 
 * 
 研报 start  
 * 
 * 
 * */
var Report = function () {

    //选项点击事件
    var listComClick = function () {
        var securities = "";
        var industry = "";
        var province = "";
        var teCode = '';
        var typeText = '';
        var seCode = '';
        $(".allList").find("li").unbind("click").on("click", function (event) {
            event.preventDefault();
            var ind = $("#soCheck").find("li").length;
            if (!$(this).hasClass("hang-more")) {
                $("#tableOne").html("");
                $(this).parent("ul").find("li").removeClass("hang-active");
                $(this).addClass("hang-active");
				seCode = Query.getHash("seCode");
				teCode = Query.getHash("teCode");
                /*证券机构*/
                if ($(this).parents(".allList").attr("id") == "compQs") {
                    securities = $(this).text();
                    seCode = $(this).attr("name");
                    if ($(this).index() == 0) {
                    	if($(".listOne").length){
                    		if(ind <= 2){
                    			$("#allListSo").hide();
                    		}
                    		Query.setHash({
	                            "seCode": "",
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
                 /*研报类型*/
                if ($(this).parents(".allList").attr("id") == "compYg") {
                    teCode = $(this).attr("name");
                    typeText = $(this).text();
                    if ($(this).index() == 0) {
                    	if($(".listTwo").length){
                    		if(ind <= 2){
                    			$("#allListSo").hide();
                    		}
                    		
	                        Query.setHash({
	                            "teCode": "",
	                            "page":1
	                        });
	                        $(".listTwo").remove();
                    	}
                    	
                    } else {
                    	$("#allListSo").show();
                        Query.setHash({
                            "teCode": teCode,
	                            "page":1
                        });
                        $(".listTwo").remove();
                        $("#allListSo").find("ul").prepend("<li class='listTwo' name =" + teCode + ">" + typeText + "<span class='soListClose'></span></li>");
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
        $("#tableOne").html("");
        $(list).each(function (i) {
            tr += "<tr>";
            //tr += "<td><a href='" + list[i].url + "'  target='_blank'>" + list[i].title + "</a></td>";
            tr += "<td>"
            if(!isNullOrEmpty(list[i].url)){
            	tr += "<p style='text-align:left;'><a href=" + list[i].url + " target='_blank'>" + list[i].title + "</a></p>"
            }else{
            	tr += "<p style='text-align:left;'><span>" + list[i].title + "</span></p>"
            }
            if(isNullOrEmpty(list[i].highlight)){
            	tr += "<p style='display:none;text-align:left;'>" + list[i].highlight + "</p></td>";
            }else{
            	tr += "<p style='width:90%;color:#999;text-align:left;'>" + list[i].highlight + "</p></td>";
            }
            
			tr += "<td>" + list[i].type + "</td>";
            if (list[i].companyId) {
                tr += "<td><a href='" + $.url.companyListUrl() + "id=" + list[i].companyId + "'>" + list[i].companyName + "</a></td>";
            }else{
                tr += "<td>" + list[i].companyName + "</td>";
            }
            tr += "<td>" + list[i].agency + "</td>";
            tr += "<td>" + list[i].author + "</td>";
            tr += "<td>" + list[i].date + "</td>";
            tr += "</tr>";
        });
        $("#tableOne").append(tr);
    };
    var removeThing = function () {
        //点击关闭按钮
        $(".soListClose").unbind().on("click", function () {
            var flg = $(this).index();
            $("#tableOne").html("");
            if ($(this).parents(".allListSo").find("li").length == 2) {
                $(this).parents(".allListSo").hide();
            }
            $(this).parent().remove();
            //查询条件清楚地址栏参数
            if ($(this).parent().hasClass("listOne")) {
            	$("#compPop").find("li").removeClass("provinceLi");
            	$("#compPopspecailSave").addClass("default").removeClass("btn-primary");
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
            if ($(this).parent().hasClass("listTwo")) {
                $("#compYg").find("li").each(function () {
                    if ($(this).text() == "全部") {
                        $(this).addClass("hang-active");
                        $(this).siblings().removeClass("hang-active");
                    }
                });
                Query.setHash({
                    teCode: "",
                    "page":1
                });
            }

            initTable();
        });
    };
	
	var dateSearch = function () {
        /*日历搜索按钮*/
        $("#compBtn").on("click", function () {
        	Query.setHash({"page":1});
            initTable();

        });
        //重置
        $("#compReset").on("click", function () {
        	$(this).parents(".page-content-par").find("input").val("");
            $("#soClear").click();
        });
        $("#comKeyWord").on("keydown", function (e) {
            var keyCode = e.which;
            if (keyCode == 13) {
                $("#compBtn").click();
            }

        });
    };
    var getUrlParam = function () {
        var atxt = "";
        var btxt = '';
        var aCode = Query.getHash("seCode");
		var bCode = Query.getHash("teCode");
        $("#compQs").find("li").each(function (i) {
            if (!isNullOrEmpty(aCode)) {
                if ($(this).attr("name") != aCode) {
                    $(this).removeClass("hang-active");
                    $(this).nextAll("li").removeClass("hang-active");
                    $("#compPop").find("li").each(function () {
                        if ($(this).attr("name") == aCode) {
                            atxt = $(this).text();
                            //console.log(aTex);
                        }
                    });
                } else {
                    $(this).addClass("hang-active");
                    $(this).siblings("li").removeClass("hang-active");
                    atxt = $(this).text();
                }
            }

        });
        $("#compYg").find("li").each(function (i) {
            if (!isNullOrEmpty(bCode)) {
                if ($(this).attr("name") != bCode) {
                    $(this).removeClass("hang-active");
                    $(this).nextAll("li").removeClass("hang-active");
                } else {
                    $(this).addClass("hang-active");
                    $(this).siblings("li").removeClass("hang-active");
                    btxt = $(this).text();
                }
            }

        });


        if (isNullOrEmpty(aCode) && isNullOrEmpty(bCode)) {
            $("#allListSo").hide();
        }
        if (!isNullOrEmpty(aCode)) {
            $("#allListSo").show();
            $(".listOne").remove();
            $("#allListSo").find("ul").prepend("<li class='listOne' name=" + aCode + ">" + atxt + "<span class='soListClose'></span></li>");
        }
        if (!isNullOrEmpty(bCode)) {
            $("#allListSo").show();
            $(".listTwo").remove();
            $("#allListSo").find("ul").prepend("<li class='listTwo' name=" + bCode + ">" + btxt + "<span class='soListClose'></span></li>");
        }
        //清空选项
        $("#soClear").on("click", function () {
        	Query.setHash({
                teCode: "",
                seCode: "",
	            "page":1
            });
            $("#compPop").find("li").removeClass("provinceLi");
        	$("#compPopspecailSave").addClass("default").removeClass("btn-primary");
            $(this).parent("li").siblings().remove();
            $(this).parents("#allListSo").hide();
            $("#compQs").find("li").eq(0).addClass("hang-active").siblings().removeClass("hang-active");
            $("#compYg").find("li").eq(0).addClass("hang-active").siblings().removeClass("hang-active");
            initTable();
        });
        //初始化列表
        initTable();

        //清空选项
        removeThing();
    };

    //初始化表格
    var initTable = function () {
        var _url = "";

        var code = '';

        var company = "";
        var keyword = $("#comKeyWord").val();


        var start_time = $("#compStartTime").val();
        var stop_time = $("#compEndTime").val();

        if ($(".listOne").size()) {
            code = $(".listOne").attr("name");
        } else if ($("#compQs").find(".hang-active").text() == "全部") {
            code = "";
        } else {
            code = $("#compQs").find(".hang-active").attr("name");
        }
        
        
        if ($(".listTwo").size()) {
            type = $(".listTwo").attr("name");
        } else if ($("#compYg").find(".hang-active").text() == "全部") {
            type = "";
        } else {
            type = $("#compYg").find(".hang-active").attr("name");
        }
		var lastPage = Query.getHash("page");
        _url = $.kf.GETREPORT + "?" + "code=" + code + "&company=" + company + "&start_time=" + start_time + "&stop_time=" + stop_time + "&keyword=" + keyword + "&type=" + type;
        //new GetTable(_url, $("#pageTool"), "", getList, "get", $("#tableOne"),lastPage,$(".maskInTable")).init();
   	 	if (compareDate(start_time, stop_time)) {
   	 		$.getTable({
	   	 		url:_url,
		    	pageId:$("#pageTool"),
		    	callback:getList,
		    	loadId:".maskInTable",
		    	currentPage:lastPage,
		    	tbodyId:$("#tableOne")
	   	 	});
   	 	}
   	 	

    };


    //主办券商
    var specialWord = function () {
        $.kf.ajax({
            type: "get",
            url: $.kf.SPECIALWORD,
            data: "",
            dataType: "json",
            processResponse: function (data) {
                specialFun(data);
            }
        });
    };
    //主办券商l列表
    var specialFun = function (data) {
        var data = data.data;
        var tr = "";
        var trPop = "";
        var m = 0;
        $(data).each(function (i) {
            trPop += "<li data-name=" + data[i].letter + "  name =" + data[i].code + " title=' " + data[i].broker_name + " '>" + data[i].broker_name + "</li>";
        });

        $("#compPop").find("ul").empty("").html("");
        $("#compPop").find("ul").append(trPop);
        $("#compPop").find("ul").append("<li name ='0'>其他</li>");
        popLetter();
        //弹窗选择事件
        comPopSpecial();

        //选项点击事件
        listComClick();

        //地址栏参数，刷新
        getUrlParam();

    };


    //证券机构pop
    var comPopSpecial = function () {
        var _text = "";
        var seCode = "";
        $(".city-list").find("li").on("click", function () {
            _text = $(this).text();
            seCode = $(this).attr("name");
            $(this).addClass("provinceLi");
            $(this).siblings().removeClass("provinceLi");
            $("#compPopspecailSave").removeClass("default").addClass("btn-primary");
        });
        $("#compPopspecailSave").on("click", function () {
           if($(this).parents(".myModal01 ").find(".city-list").find(".provinceLi").text() != ""){
				$(".city-list").find("li").show();
				_text = $(this).parents(".myModal01 ").find(".city-list").find(".provinceLi").text();
				$(".province-ul").find("li").removeClass("provinceLi");
				$(".province-ul").find("li:last").addClass("provinceLi");
                $('#myModal02').modal('hide');
                $("#compQs").find("li").removeClass("hang-active");
                Query.setHash({
                    seCode: seCode,
	           		 "page":1
                });
                $("#compQs").find("li").each(function(){
					if($(this).attr("name") == seCode){
						$(this).siblings().removeClass("hang-active");
						$(this).addClass("hang-active");
					}
				});
                $("#allListSo").show();
                $(".listOne").remove();
                $("#allListSo").find("ul").prepend("<li class='listOne' name =" + seCode + ">" + _text + "<span class='soListClose'></span></li>");
                initTable();
            	_text = "";
            }
            removeThing();
        })
    }

    return {
        init: function () {
        	dateSearch();
            specialWord();//加载券商选项
            //keyWord();//关键字搜索
        }
    }

}();

