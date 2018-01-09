/*
 
 * 
 * 
 * 
 * 新闻start
 * 
 * 
 * 
 * */


var News = function () {
    var typeSelect = 0;
    //要闻/////////////////////////////////////////////
    /*拼table表格*/
   	var getListE = function (data) {
        var list = data.data;
        var tr = "";
        $(".pageTotalDiv").remove();
        $("#tableFive").html("");
        $(list).each(function (i) {
        	if(list[i].fileExt == "pdf"){
            tr += "<tr><td width='100%'>";
            if(Number(list[i].isTips)){
	            	tr += "<div><a href='" + list[i].fileUrl + "'>" + list[i].title + "</a>" + "<img src='../../assets/admin/layout/img/tip.png' class='tip'/></div>";
	            }else{
	            	tr += "<div><a href='" + list[i].fileUrl + "'>" + list[i].title + "</a></div>";
	            }
        	}else{
        		tr += "<tr><td width='100%'>";
	            if(Number(list[i].isTips)){
            	tr += "<div><a target='_blank' href='" + $.url.newsInfoUrl() + "id=" + list[i].id + '&name=news' + "'>" + list[i].title + "</a>" + "<img src='../../assets/admin/layout/img/tip.png' class='tip'/></div>";
            }else{
            tr += "<div><a target='_blank' target='_blank' href='" + $.url.newsInfoUrl() + "id=" + list[i].id + '&name=news' + "'>" + list[i].title + "</a></div>";
	            }
            }
            tr += "<p class='newsSpan'><span>" + list[i].source + "</span>";
            tr += "<span>" + list[i].date + "</span></p>";
            tr += "<p><span>" + list[i].summary + "</span></p>";
            tr += "</td></tr>";
        });
        $("#tableFive").append(tr);
        if(isNullOrEmpty(data.total)){
        	data.total = 0;
        }
        $(".tab-content").find('.active .clear').after("<div class='allListTow pageTotalDiv'><div class='hang-title'>共<span class='pageTotal'>"+ data.total +"</span>条结果</div></div>");
    };
    //初始化表格
    var importantNews = function(){
    	var _url = "";
        var code = "";
        var outkeyword = $("#comSearchE").val();
        var keyword = $("#comKeyWordE").val();
        var type = typeSelect;
		var lastPage = Query.getHash("page");
        _url = $.kf.GETNEWS + "?" + "code=" + code + "&outkeyword=" + outkeyword + "&type=" + type + "&keyword=" + keyword + "&category=yaowentuijian";
	    $.getTable({
   	 		url:_url,
	    	pageId:$("#pageToolE"),
	    	callback:getListE,
	    	loadId:".maskInTable00",
	    	currentPage:lastPage,
	    	tbodyId:$("#tableFive")
   	 	});
    }
    //查询
    $("#compBtnE").on("click", function () {
    	Query.setHash({"page":1});
        $("#tableFive").html("");
        importantNews();
    });
    //重置
    $("#compBtnERest").on("click", function () {
        $("#tableFive").html("");
        Query.setHash({"page":1});
        $("#comKeyWordE").val("");
        $("#comSearchE").val("");
        typeSelect=0;
        $("#noteTypeE").html('全部<span class="input-group-btn caret2"><button class="btn btn-sm  btn-icon-btn" type="button"><i class="fa fa-calendar2"></i></button></span>');
        importantNews();
    });
	
	//新三板/////////////////////////////////////////////
    /*拼table表格*/
    var getListW = function (data) {
        var list = data.data;
        var tr = "";
        $(".pageTotalDiv").remove();
        $("#tableTwo").html("");
        $(list).each(function (i) {
            if(list[i].fileExt == "pdf"){
        		tr += "<tr><td width='100%'>";
            if(Number(list[i].isTips)){
	            	tr += "<div><a href='" + list[i].fileUrl + "'>" + list[i].title + "</a>" + "<img src='../../assets/admin/layout/img/tip.png' class='tip'/></div>";
	            }else{
	            	tr += "<div><a href='" + list[i].fileUrl + "'>" + list[i].title + "</a></div>";
	            }
        	}else{
        		tr += "<tr><td width='100%'>";
	            if(Number(list[i].isTips)){
            	tr += "<div><a target='_blank' href='" + $.url.newsInfoUrl() + "id=" + list[i].id + '&name=news' + "'>" + list[i].title + "</a>" + "<img src='../../assets/admin/layout/img/tip.png' class='tip'/></div>";
            }else{
            tr += "<div><a target='_blank' href='" + $.url.newsInfoUrl() + "id=" + list[i].id + '&name=news' + "'>" + list[i].title + "</a></div>";
	            }
            }
            tr += "<p class='newsSpan'><span>" + list[i].source + "</span>";
            tr += "<span>" + list[i].date + "</span></p>";
            tr += "<p><span>" + list[i].summary + "</span></p>";
            tr += "</td></tr>";
        });
        $("#tableTwo").append(tr);
        if(isNullOrEmpty(data.total)){
        	data.total = 0;
        }
        $(".tab-content").find('.active .clear').after("<div class='allListTow pageTotalDiv'><div class='hang-title'>共<span class='pageTotal'>"+ data.total +"</span>条结果</div></div>");
    };
    //初始化表格
    var initTableW = function () {
        var _url = "";
        var code = "";
        var outkeyword = $("#comSearchW").val();
        var keyword = $("#comKeyWordW").val();
        var type = typeSelect;
		var lastPage = Query.getHash("page");
        _url = $.kf.GETNEWS + "?" + "code=" + code + "&outkeyword=" + outkeyword + "&type=" + type + "&keyword=" + keyword + "&category=xinsanban";
        //new GetTable(_url, $("#pageToolW"), "", getListW, "get", $("#tableTwo"),lastPage,$(".maskInTable1")).init();
        $.getTable({
   	 		url:_url,
	    	pageId:$("#pageToolW"),
	    	callback:getListW,
	    	loadId:".maskInTable1",
	    	currentPage:lastPage,
	    	tbodyId:$("#tableTwo")
   	 	});
    };
    //查询
    $("#compBtnW").on("click", function () {
    	Query.setHash({"page":1});
        $("#tableTwo").html("");
        initTableW();
    });
    //重置
    $("#compBtnWRest").on("click", function () {
        $("#tableTwo").html("");
        Query.setHash({"page":1});
        $("#comKeyWordW").val("");
        $("#comSearchW").val("");
        typeSelect=0;
        $("#noteTypeW").html('全部<span class="input-group-btn caret2"><button class="btn btn-sm  btn-icon-btn" type="button"><i class="fa fa-calendar2"></i></button></span>');
        initTableW();
    });
    
    
    //沪深要闻/////////////////////////////////////////////
    /*拼table表格*/
    var getListH = function (data) {
        var list = data.data;
        var tr = "";
        $(".pageTotalDiv").remove();
        $("#tableSix").html("");
        $(list).each(function (i) {
            if(list[i].fileExt == "pdf"){
        		tr += "<tr><td width='100%'>";
            if(Number(list[i].isTips)){
	            	tr += "<div><a href='" + list[i].fileUrl + "'>" + list[i].title + "</a>" + "<img src='../../assets/admin/layout/img/tip.png' class='tip'/></div>";
	            }else{
	            	tr += "<div><a href='" + list[i].fileUrl + "'>" + list[i].title + "</a></div>";
	            }
        	}else{
        		tr += "<tr><td width='100%'>";
	            if(Number(list[i].isTips)){
            	tr += "<div><a target='_blank' href='" + $.url.newsInfoUrl() + "id=" + list[i].id + '&name=news' + "'>" + list[i].title + "</a>" + "<img src='../../assets/admin/layout/img/tip.png' class='tip'/></div>";
            }else{
            tr += "<div><a target='_blank' href='" + $.url.newsInfoUrl() + "id=" + list[i].id + '&name=news' + "'>" + list[i].title + "</a></div>";
	            }
            }
            tr += "<p class='newsSpan'><span>" + list[i].source + "</span>";
            tr += "<span>" + list[i].date + "</span></p>";
            tr += "<p><span>" + list[i].summary + "</span></p>";
            tr += "</td></tr>";
        });
        $("#tableSix").append(tr);
        if(isNullOrEmpty(data.total)){
        	data.total = 0;
        }
        $(".tab-content").find('.active .clear').after("<div class='allListTow pageTotalDiv'><div class='hang-title'>共<span class='pageTotal'>"+ data.total +"</span>条结果</div></div>");
    };
    //初始化表格
    var initTableH = function () {
        var _url = "";
        var code = "";
        var outkeyword = $("#comSearchH").val();
        var keyword = $("#comKeyWordH").val();
        var type = typeSelect;
		var lastPage = Query.getHash("page");
        _url = $.kf.GETNEWS + "?" + "code=" + code + "&outkeyword=" + outkeyword + "&type=" + type + "&keyword=" + keyword + "&category=hushenyaowen";
        //new GetTable(_url, $("#pageToolW"), "", getListW, "get", $("#tableTwo"),lastPage,$(".maskInTable1")).init();
        $.getTable({
   	 		url:_url,
	    	pageId:$("#pageToolH"),
	    	callback:getListH,
	    	loadId:".maskInTable06",
	    	currentPage:lastPage,
	    	tbodyId:$("#tableSix")
   	 	});
    };
    //查询
    $("#compBtnH").on("click", function () {
    	Query.setHash({"page":1});
        $("#tableTwo").html("");
        initTableH();
    });
    //重置
    $("#compBtnHRest").on("click", function () {
        $("#tableSix").html("");
        Query.setHash({"page":1});
        $("#comKeyWordH").val("");
        $("#comSearchH").val("");
        typeSelect=0;
        $("#noteTypeH").html('全部<span class="input-group-btn caret2"><button class="btn btn-sm  btn-icon-btn" type="button"><i class="fa fa-calendar2"></i></button></span>');
        initTableH();
    });
    
    
    //创投市场/////////////////////////////////////////////
    /*拼table表格*/
    var getListC = function (data) {
        var list = data.data;
        var tr = "";
        $(".pageTotalDiv").remove();
        $("#tableCt").html("");
        $(list).each(function (i) {
            if(list[i].fileExt == "pdf"){
        		tr += "<tr><td width='100%'>";
            if(Number(list[i].isTips)){
	            	tr += "<div><a href='" + list[i].fileUrl + "'>" + list[i].title + "</a>" + "<img src='../../assets/admin/layout/img/tip.png' class='tip'/></div>";
	            }else{
	            	tr += "<div><a href='" + list[i].fileUrl + "'>" + list[i].title + "</a></div>";
	            }
        	}else{
        		tr += "<tr><td width='100%'>";
	            if(Number(list[i].isTips)){
            	tr += "<div><a target='_blank' href='" + $.url.newsInfoUrl() + "id=" + list[i].id + '&name=news' + "'>" + list[i].title + "</a>" + "<img src='../../assets/admin/layout/img/tip.png' class='tip'/></div>";
            }else{
            tr += "<div><a target='_blank' href='" + $.url.newsInfoUrl() + "id=" + list[i].id + '&name=news' + "'>" + list[i].title + "</a></div>";
	            }
            }
            tr += "<p class='newsSpan'><span>" + list[i].source + "</span>";
            tr += "<span>" + list[i].date + "</span></p>";
            tr += "<p><span>" + list[i].summary + "</span></p>";
            tr += "</td></tr>";
        });
        $("#tableCt").append(tr);
        if(isNullOrEmpty(data.total)){
        	data.total = 0;
        }
        $(".tab-content").find('.active .clear').after("<div class='allListTow pageTotalDiv'><div class='hang-title'>共<span class='pageTotal'>"+ data.total +"</span>条结果</div></div>");
    };
    //初始化表格
    var initTableC = function () {
        var _url = "";
        var code = "";
        var outkeyword = $("#comSearchC").val();
        var keyword = $("#comKeyWordC").val();
        var type = typeSelect;
		var lastPage = Query.getHash("page");
        _url = $.kf.GETNEWS + "?" + "code=" + code + "&outkeyword=" + outkeyword + "&type=" + type + "&keyword=" + keyword + "&category=chuangtoushichang";
        //new GetTable(_url, $("#pageToolW"), "", getListW, "get", $("#tableTwo"),lastPage,$(".maskInTable1")).init();
        $.getTable({
   	 		url:_url,
	    	pageId:$("#pageToolC"),
	    	callback:getListC,
	    	loadId:".maskInTableC",
	    	currentPage:lastPage,
	    	tbodyId:$("#tableCt")
   	 	});
    };
    //查询
    $("#compBtnC").on("click", function () {
    	Query.setHash({"page":1});
        $("#tableCt").html("");
        initTableC();
    });
    //重置
    $("#compBtnCRest").on("click", function () {
        $("#tableCt").html("");
        Query.setHash({"page":1});
        $("#comKeyWordC").val("");
        $("#comSearchC").val("");
        typeSelect=0;
        $("#noteTypeC").html('全部<span class="input-group-btn caret2"><button class="btn btn-sm  btn-icon-btn" type="button"><i class="fa fa-calendar2"></i></button></span>');
        initTableC();
    });
    
    
    
	//公司/////////////////////////////////////////////
    //选项点击事件
    var listComClick = function () {
        var industry = "";
        $(".allList").find("li").unbind("click").on("click", function (event) {
            event.preventDefault();
            var ind = $("#soCheck").find("li").length;
            if (!$(this).hasClass("hang-more")) {

                $("#tableThree").html("");

                $(this).parent("ul").find("li").removeClass("hang-active");
                $(this).addClass("hang-active");

                /*行业*/
                if ($(this).parents(".allList").attr("id") == "compQs") {
                    industry = $(this).text();

                    if ($(this).text() == "全部") {
                        inCode = "";
                    } else {
                        inCode = $(this).attr("name");
                    }

                    if ($(this).index() == 0) {
                    	Query.setHash({
                    		"page":1,
                    		"inCode": ""
                    	});
                        $(".listOne").remove();
                    } else {
                        Query.setHash({
                    		"page":1,
                    		"inCode": inCode
                    	});
                        $(".listOne").remove();
                        $("#allListSo").find("ul").prepend("<li class='listOne' name =" + inCode + ">" + industry + "<span class='soListClose'></span></li>");
                    }

                }

                if (ind <= 2 && $(this).text() == "全部") {//剩余最后一个清除选项
                    $("#allListSo").hide();
                } else {
                    $("#allListSo").show();
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
        $("#tableThree").html("");
        $(list).each(function (i) {
            if(list[i].fileExt == "pdf"){
        		tr += "<tr><td width='100%'>";
	            if(list[i].isTips == 1){
	            	tr += "<div><a href='" + list[i].fileUrl + "'>" + list[i].title + "</a><img src='../../assets/admin/layout/img/tip.png' class='tip'/></div>";
	            }else{
	            	tr += "<div><a href='" + list[i].fileUrl + "'>" + list[i].title + "</a></div>";
	            }
        	}else{
        		tr += "<tr><td width='100%'>";
	            if(list[i].isTips == 1){
	            	tr += "<div><a target='_blank' href='" + $.url.newsInfoUrl() + "id=" + list[i].id + '&name=news' + '&position=news'+"'>" + list[i].title + "</a>" + "<img src='../../assets/admin/layout/img/tip.png' class='tip'/></div>";
	            }else{
		            tr += "<div><a target='_blank' href='" + $.url.newsInfoUrl() + "id=" + list[i].id + '&name=news' + '&position=news'+"'>" + list[i].title + "</a></div>";
			    }
        	}
            tr += "<p class='newsSpan sss'><span>" + list[i].source + "</span>";
            tr += "<span>" + list[i].date + "</span>";
           	if(list[i].type == "公司"){
                if(list[i].companyId){
                    tr += "<a href='" + $.url.companyListUrl() + "id=" + list[i].companyId + "&position=news" + "'>"+list[i].companyName+"</a>";    
                }else{
                    tr += list[i].companyName;
                }
            }else{
                if(list[i].companyId){
                    tr += "<a href='" + $.url.investmentAgencyDetailsUrl() + "id=" + list[i].companyId + "&position=news" + "'>"+list[i].companyName+"</a>";
                }else{
                    tr += list[i].companyName;
                }
            }
            tr += "</p>";
            tr += "<p><span>" + list[i].summary + "</span></p>";
            tr += "</td></tr>";
        });
        $("#tableThree").append(tr);
    };
    
    //关闭选项
    var removeThing = function () {
        //点击关闭按钮
        $(".soListClose").on("click", function () {
        	Query.setHash({"page":1});
            var flg = $(this).index();
            $("#tableThree").html("");
            if ($(this).parents(".allListSo").find("li").length == 2) {
                $(this).parents(".allListSo").hide();
            }
            $(this).parent().remove();
            //查询条件清楚地址栏参数
            if ($(this).parent().hasClass("listOne")) {
                $("#compQs").find("li").each(function () {
                    if ($(this).text() == "全部") {
                        $(this).addClass("hang-active");
                        $(this).siblings().removeClass("hang-active");
                    }
                });
                Query.setHash({
                    inCode: ""
                });
            }

           initTable();
        });
    };
	
	//刷新页面
    var getUrlParam = function () {
        var aCode = Query.getHash("inCode");
        var aTex = "";
        $("#compQs").find("li").each(function (i) {
            if (!isNullOrEmpty(aCode)) {
                if ($(this).attr("name") != aCode) {
                    $(this).removeClass("hang-active");
                    $(this).nextAll("li").removeClass("hang-active");
                    $("#compPop").find("li").each(function () {
                        if ($(this).attr("name") == aCode) {
                            aTex = $(this).text();
                        }
                    });
                } else {
                    $(this).addClass("hang-active");
                    $(this).siblings("li").removeClass("hang-active");
                    aTex = $(this).text();
                }
            }

        });


        if (isNullOrEmpty(aCode)) {
            $("#allListSo").hide();
            $(".listOne").remove();
        }
        if (!isNullOrEmpty(aCode)) {
            $("#allListSo").show();
            $(".listOne").remove();
            $("#allListSo").find("ul").prepend("<li class='listOne' name=" + aCode + ">" + aTex + "<span class='soListClose'></span></li>");
        }
        //显示关闭按钮
        $("#soClear").on("click", function () {
        	Query.setHash({
        		"page":1,
        		inCode: ""
        	});
            $(this).parent("li").siblings().remove();
            $(this).parents("#allListSo").hide();
            $("#comSpecial").find("li").eq(0).addClass("hang-active").siblings().removeClass("hang-active");
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

        var code = "";
        if ($(".listOne").size()) {
            code = $(".listOne").attr("name");
        } else if ($("#compQs").find(".hang-active").text() == "全部") {
            code = "";
        } else {
            code = $("#compQs").find(".hang-active").attr("name");
        }

        var outkeyword = $("#comSearchT").val();
        var keyword = $("#comKeyWordT").val();
        var type = typeSelect;
		if($(".typeNews").find("b").hasClass("typeNews-active")){
			var isTips = 1;
		}else{
			var isTips = 0;
		};
        var param = {
            category: "gongsi"
        }
        var lastPage = Query.getHash("page");
        _url = $.kf.GETNEWS + "?" + "code=" + code + "&outkeyword=" + outkeyword + "&type=" + type + "&keyword=" + keyword + "&category=gongsi"+"&isTips="+isTips;
        //new GetTable(_url, $("#pageToolT"), "", getList, "get", $("#tableThree"),lastPage,$(".maskInTable2")).init();
   	 	$.getTable({
   	 		url:_url,
	    	pageId:$("#pageToolT"),
	    	callback:getList,
	    	loadId:".maskInTable2",
	    	currentPage:lastPage,
	    	tbodyId:$("#tableThree")
   	 	});
		
    };
	
    var keyWord = function () {
        /*关键词搜索按钮*/
        $("#compBtnT").on("click", function () {
        	Query.setHash({"page":1});
            $("#tableThree").html("");
            initTable();
        });
        //重置
        $("#compBtnTReset").on("click", function () {
        	Query.setHash({"page":1});
            $("#tableThree").html("");
            $("#comKeyWordT").val("");
            $("#comSearchT").val("");
            typeSelect=0;
            $("#typeNewsCop").find("b").removeClass("typeNews-active");
            $("#noteType02").html('全部<span class="input-group-btn caret2"><button class="btn btn-sm  btn-icon-btn" type="button"><i class="fa fa-calendar2"></i></button></span>');
            $("#soClear").click();
        });
        
        var myTimeout = null;
		$("#typeNewsCop").on("click",function(){
			clearTimeout(myTimeout);
			myTimeout = setTimeout(function(){
				Query.setHash({"page":1});
		    	$("#typeNewsCop b").toggleClass("typeNews-active");
		    	$("#tableThree").html("");
		        initTable();
		    },300)
	    })
//      $("#comKeyWord , #comSearch").on("keydown", function (e) {
//          var keyCode = e.which;
//          if (keyCode == 13) {
//              $("#compBtn").click();
//          }
//      });
    };
   
   //行业
    var specialWord = function () {
    	$(".typeNews").find("b").removeClass("typeNews-active");
        $.kf.ajax({
            type: "get",
            url: $.kf.INDUSTRYWORD,
            data: "",
            dataType: "json",
            processResponse: function (data) {
                specialFun(data);
            }
        });
    };
    
    //行业列表
    var specialFun = function (data) {
        var data = data.data;
        var tr = "";
        $(".pageTotalDiv").remove();
        var trPop = "";
        var m = 0;
        $(data).each(function (i) {
            trPop += "<li data-name=" + data[i].letter + " name =" + data[i].code + " title=' " + data[i].name + " '>" + data[i].name + "</li>";
        });

        $("#compPop").find("ul").empty("").html("");
        $("#compPop").find("ul").append(trPop);

        popLetter();
        //弹窗选择事件
        comPopSpecial();

        //选项点击事件
        listComClick();

        //地址栏参数，刷新
        getUrlParam();

    };

    //行业列表pop
    var comPopSpecial = function () {
        var _text = "";
        var inCode = "";
        $("#compPopspecailSave").addClass("default").removeClass("btn-primary");
        $(".city-list").find("li").on("click", function () {
            $("#compPopspecailSave").addClass("btn-primary").removeClass("default");
            _text = $(this).text();
            inCode = $(this).attr("name");
            $(this).addClass("provinceLi");
            $(this).siblings().removeClass("provinceLi");
        });
        $("#compPopspecailSave").on("click", function () {
//          $(".city-list").find("li").show();
            if($(this).parents(".myModal01 ").find(".city-list").find(".provinceLi").text() != ""){
				$(".city-list").find("li").show();
				_text = $(this).parents(".myModal01 ").find(".city-list").find(".provinceLi").text();
				$(".province-ul").find("li").removeClass("provinceLi");
				$(".province-ul").find("li:last").addClass("provinceLi");
                $('#myModal02').modal('hide');
				Query.setHash({
					"page":1,
					inCode: inCode
				});
                $("#compQs").find("li").removeClass("hang-active");
                $("#allListSo").show();
                $(".listOne").remove();
                $("#allListSo").find("ul").prepend("<li class='listOne' name =" + inCode + ">" + _text + "<span class='soListClose'></span></li>");
                initTable();
            }
            removeThing();
        })
    };
    
    
    //宏观/////////////////////////////////////////////
    /*拼table表格*/
    var getListO = function (data) {
        var list = data.data;
        var tr = "";
        $(".pageTotalDiv").remove();
        $("#tableOne").html("");
        $(list).each(function (i) {
        	if(list[i].fileExt == "pdf"){
            tr += "<tr><td width='100%'>";
            if(Number(list[i].isTips)){
	            	tr += "<div><a href='" + list[i].fileUrl + "'>" + list[i].title + "</a>" + "<img src='../../assets/admin/layout/img/tip.png' class='tip'/></div>";
	            }else{
	            	tr += "<div><a href='" + list[i].fileUrl + "'>" + list[i].title + "</a></div>";
	            }
        	}else{
        		tr += "<tr><td width='100%'>";
	            if(Number(list[i].isTips)){
            	tr += "<div><a target='_blank' href='" + $.url.newsInfoUrl() + "id=" + list[i].id + '&name=news' + "'>" + list[i].title + "</a>" + "<img src='../../assets/admin/layout/img/tip.png' class='tip'/></div>";
            }else{
            tr += "<div><a target='_blank' href='" + $.url.newsInfoUrl() + "id=" + list[i].id + '&name=news' + "'>" + list[i].title + "</a></div>";
	            }
            }
            tr += "<p class='newsSpan'><span>" + list[i].source + "</span>";
            tr += "<span>" + list[i].date + "</span></p>";
            tr += "<p><span>" + list[i].summary + "</span></p>";
            tr += "</td></tr>";
        });
        $("#tableOne").append(tr);
        if(isNullOrEmpty(data.total)){
        	data.total = 0;
        }
        $(".tab-content").find('.active .clear').after("<div class='allListTow pageTotalDiv'><div class='hang-title'>共<span class='pageTotal'>"+ data.total +"</span>条结果</div></div>");
    };
    //初始化表格
    var initTableO = function () {
        var _url = "";
        var code = "";
        var outkeyword = $("#comSearchO").val();
        var keyword = $("#comKeyWordO").val();
        var type = typeSelect;
		var lastPage = Query.getHash("page");
        _url = $.kf.GETNEWS + "?" + "code=" + code + "&outkeyword=" + outkeyword + "&type=" + type + "&keyword=" + keyword + "&category=hongguan";
       // new GetTable(_url, $("#pageToolO"), "", getListO, "get", $("#tableOne"),lastPage,$(".maskInTable0")).init();
        $.getTable({
   	 		url:_url,
	    	pageId:$("#pageToolO"),
	    	callback:getListO,
	    	loadId:".maskInTable0",
	    	currentPage:lastPage,
	    	tbodyId:$("#tableOne")
   	 	});

    };
	//查询    
    $("#compBtnO").on("click", function () {
    	Query.setHash({"page":1});
        $("#tableOne").html("");
        initTableO();
    });
    //重置
    $("#compBtnOReset").on("click", function () {
    	Query.setHash({"page":1});
        $("#comKeyWordO").val("");
        $("#comSearchO").val("");
        typeSelect=0;
        $("#noteTypeO").html('全部<span class="input-group-btn caret2"><button class="btn btn-sm  btn-icon-btn" type="button"><i class="fa fa-calendar2"></i></button></span>');
        $("#tableOne").html("");
        initTableO();
    });
    
   //四大报/////////////////////////////////////////////
    /*拼table表格*/
    var getListS = function (data) {
        var list = data.data;
        var tr = "";
        $(".pageTotalDiv").remove();
        $("#tableS").html("");
        $(list).each(function (i) {
        	if(list[i].fileExt == "pdf"){
            tr += "<tr><td width='100%'>";
            if(Number(list[i].isTips)){
	            	tr += "<div><a href='" + list[i].fileUrl + "'>" + list[i].title + "</a>" + "<img src='../../assets/admin/layout/img/tip.png' class='tip'/></div>";
	            }else{
	            	tr += "<div><a href='" + list[i].fileUrl + "'>" + list[i].title + "</a></div>";
	            }
        	}else{
        		tr += "<tr><td width='100%'>";
	            if(Number(list[i].isTips)){
            	tr += "<div><a target='_blank' href='" + $.url.newsInfoUrl() + "id=" + list[i].id + '&name=news' + "'>" + list[i].title + "</a>" + "<img src='../../assets/admin/layout/img/tip.png' class='tip'/></div>";
            }else{
            tr += "<div><a target='_blank' href='" + $.url.newsInfoUrl() + "id=" + list[i].id + '&name=news' + "'>" + list[i].title + "</a></div>";
	            }
            }
            tr += "<p class='newsSpan'><span>" + list[i].source + "</span>";
            tr += "<span>" + list[i].date + "</span></p>";
            tr += "<p><span>" + list[i].summary + "</span></p>";
            tr += "</td></tr>";
        });
        $("#tableS").append(tr);
        if(isNullOrEmpty(data.total)){
        	data.total = 0;
        }
        $(".tab-content").find('.active .clear').after("<div class='allListTow pageTotalDiv'><div class='hang-title'>共<span class='pageTotal'>"+ data.total +"</span>条结果</div></div>");
    };
    //初始化表格
    var initTableS = function () {
        var _url = "";
        var code = "";
        var outkeyword = $("#comSearchS").val();
        var keyword = $("#comKeyWordS").val();
        var type = typeSelect;
		var lastPage = Query.getHash("page");
        _url = $.kf.GETNEWS + "?" + "code=" + code + "&outkeyword=" + outkeyword + "&type=" + type + "&keyword=" + keyword + "&category=sidabao";
       // new GetTable(_url, $("#pageToolO"), "", getListO, "get", $("#tableOne"),lastPage,$(".maskInTable0")).init();
        $.getTable({
   	 		url:_url,
	    	pageId:$("#pageToolS"),
	    	callback:getListS,
	    	loadId:".maskInTableS",
	    	currentPage:lastPage,
	    	tbodyId:$("#tableS")
   	 	});

    };
	//查询    
    $("#compBtnS").on("click", function () {
    	Query.setHash({"page":1});
        $("#tableS").html("");
        initTableS();
    });
    //重置
    $("#compBtnSReset").on("click", function () {
    	Query.setHash({"page":1});
        $("#comKeyWordS").val("");
        $("#comSearchS").val("");
        typeSelect=0;
        $("#noteTypeS").html('全部<span class="input-group-btn caret2"><button class="btn btn-sm  btn-icon-btn" type="button"><i class="fa fa-calendar2"></i></button></span>');
        $("#tableS").html("");
        initTableS();
    });
    
    
    //股评/////////////////////////////////////////////
    /*拼table表格*/
    var getListF = function (data) {
        var list = data.data;
        var tr = "";
        $(".pageTotalDiv").remove();
        $("#tableFour").html("");
        $(list).each(function (i) {
            if(list[i].fileExt == "pdf"){
        		tr += "<tr><td width='100%'>";
            if(Number(list[i].isTips)){
	            	tr += "<div><a href='" + list[i].fileUrl + "'>" + list[i].title + "</a>" + "<img src='../../assets/admin/layout/img/tip.png' class='tip'/></div>";
	            }else{
	            	tr += "<div><a href='" + list[i].fileUrl + "'>" + list[i].title + "</a></div>";
	            }
        	}else{
        		tr += "<tr><td width='100%'>";
	            if(Number(list[i].isTips)){
            	tr += "<div><a target='_blank' href='" + $.url.newsInfoUrl() + "id=" + list[i].id + '&name=news' + "'>" + list[i].title + "</a>" + "<img src='../../assets/admin/layout/img/tip.png' class='tip'/></div>";
            }else{
            tr += "<div><a target='_blank' href='" + $.url.newsInfoUrl() + "id=" + list[i].id + '&name=news' + "'>" + list[i].title + "</a></div>";
	            }
            }
            tr += "<p class='newsSpan'><span>" + list[i].source + "</span>";
            tr += "<span>" + list[i].date + "</span></p>";
            tr += "<p><span>" + list[i].summary + "</span></p>";
            tr += "</td></tr>";
        });
        $("#tableFour").append(tr);
        if(isNullOrEmpty(data.total)){
        	data.total = 0;
        }
        $(".tab-content").find('.active .clear').after("<div class='allListTow pageTotalDiv'><div class='hang-title'>共<span class='pageTotal'>"+ data.total +"</span>条结果</div></div>");
    };
    //初始化表格
    var initTableF = function () {
        var _url = "";
        var code = "";
        var outkeyword = $("#comSearchF").val();
        var keyword = $("#comKeyWordF").val();
        var type = typeSelect;
        var lastPage = Query.getHash("page");
        _url = $.kf.GETNEWS + "?" + "code=" + code + "&outkeyword=" + outkeyword + "&type=" + type + "&keyword=" + keyword + "&category=guping";
        //new GetTable(_url, $("#pageToolF"), "", getListF, "get", $("#tableFour"),lastPage,$(".maskInTable3")).init();
        $.getTable({
   	 		url:_url,
	    	pageId:$("#pageToolF"),
	    	callback:getListF,
	    	loadId:".maskInTable3",
	    	currentPage:lastPage,
	    	tbodyId:$("#tableFour")
   	 	});

    };
    //查询
    $("#compBtnF").on("click", function () {
    	Query.setHash({"page":1});
        $("#tableFour").html("");
        initTableF();
    });
    //重置
	$("#compBtnFReset").on("click", function () {
    	Query.setHash({"page":1});
        $("#tableFour").html("");
        $("#comKeyWordF").val("");
        $("#comSearchF").val("");
        typeSelect=0;
        $("#noteType03").html('全部<span class="input-group-btn caret2"><button class="btn btn-sm  btn-icon-btn" type="button"><i class="fa fa-calendar2"></i></button></span>');
        initTableF();
    });
	
	
	    //自媒体/////////////////////////////////////////////
    /*拼table表格*/	
    var getListZ = function (data) {
        var list = data.data;
        var tr = "";
        $(".pageTotalDiv").remove();
        $("#tableZm").html("");
        $(list).each(function (i) {
            if(list[i].fileExt == "pdf"){
        		tr += "<tr><td width='100%'>";
            if(Number(list[i].isTips)){
	            	tr += "<div><a href='" + list[i].fileUrl + "'>" + list[i].title + "</a>" + "<img src='../../assets/admin/layout/img/tip.png' class='tip'/></div>";
	            }else{
	            	tr += "<div><a href='" + list[i].fileUrl + "'>" + list[i].title + "</a></div>";
	            }
        	}else{
        		tr += "<tr><td width='100%'>";
	            if(Number(list[i].isTips)){
            	tr += "<div><a target='_blank' href='" + $.url.newsInfoUrl() + "id=" + list[i].id + '&name=news' + "'>" + list[i].title + "</a>" + "<img src='../../assets/admin/layout/img/tip.png' class='tip'/></div>";
            }else{
            	tr += "<div><a target='_blank' href='" + $.url.newsInfoUrl() + "id=" + list[i].id + '&name=news' + "'>" + list[i].title + "</a></div>";
	            }
            }
            tr += "<p class='newsSpan'><span>" + list[i].source + "</span>";
            tr += "<span>" + list[i].date + "</span></p>";
            tr += "<p><span>" + list[i].summary + "</span></p>";
            tr += "</td></tr>";
        });
        $("#tableZm").append(tr);
        if(isNullOrEmpty(data.total)){
        	data.total = 0;
        }
        $(".tab-content").find('.active .clear').after("<div class='allListTow pageTotalDiv'><div class='hang-title'>共<span class='pageTotal'>"+ data.total +"</span>条结果</div></div>");
    };
    //初始化表格
    var initTableZ = function () {
        var _url = "";
        var code = "";
        var outkeyword = $("#comSearchZ").val();
        var keyword = $("#comKeyWordZ").val();
        var type = typeSelect;
        var lastPage = Query.getHash("page");
        _url = $.kf.GETNEWS + "?" + "code=" + code + "&outkeyword=" + outkeyword + "&type=" + type + "&keyword=" + keyword + "&category=zimeiti";
        //new GetTable(_url, $("#pageToolF"), "", getListF, "get", $("#tableFour"),lastPage,$(".maskInTable3")).init();
        $.getTable({
   	 		url:_url,
	    	pageId:$("#pageToolZ"),
	    	callback:getListZ,
	    	loadId:".maskInTableZ",
	    	currentPage:lastPage,
	    	tbodyId:$("#tableZm")
   	 	});

    };
    //查询
    $("#compBtnZ").on("click", function () {
    	Query.setHash({"page":1});
        $("#tableZm").html("");
        initTableZ();
    });
    //重置
	$("#compBtnZReset").on("click", function () {
    	Query.setHash({"page":1});
        $("#tableZm").html("");
        $("#comKeyWordZ").val("");
        $("#comSearchZ").val("");
        typeSelect=0;
        $("#noteTypeZ").html('全部<span class="input-group-btn caret2"><button class="btn btn-sm  btn-icon-btn" type="button"><i class="fa fa-calendar2"></i></button></span>');
        initTableZ();
    });
    
    
    
	 //回车查询事件
    $(".tab-content").on("keydown", function (e) {
        var keyCode = e.which;
        if (keyCode == 13) {
            $(".overLi-btn li").each(function(){
		    	var tabC = $(this).children("a").text();
		    	if($(this).hasClass("active") && tabC == "要闻推荐"){
		    		$("#compBtnE").click();
		    	}else if($(this).hasClass("active") && tabC == "新三板"){
		    		$("#compBtnW").click();
		    	}else if($(this).hasClass("active") && tabC == "沪深要闻"){
		    		$("#compBtnH").click();
		    	}else if($(this).hasClass("active") && tabC == "创投市场"){
		    		$("#compBtnC").click();
		    	}else if($(this).hasClass("active") && tabC == "公司新闻"){
		    		$("#compBtnT").click();
		    	}else if($(this).hasClass("active") && tabC == "宏观经济"){
		    		$("#compBtnO").click();
		    	}else if($(this).hasClass("active") && tabC == "四大报"){
		    		$("#compBtnS").click();
		    	}else if($(this).hasClass("active") && tabC == "其他财经媒体"){
		    		$("#compBtnMost").click();
		    	}else if($(this).hasClass("active") && tabC == "自媒体"){
		    		$("#compBtnZ").click();
		    	}
		    })
        }

    });
    //范围下拉框
    $("#newsChangeLi").find("a").on("click", function () {
    	Query.setHash({"page":1});
    	typeSelect=0;
        $(this).parents("#newsChange").find(".dropdown-toggle").html("全部"+'<span class="input-group-btn caret2"><button class="btn btn-sm  btn-icon-btn" type="button"><i class="fa fa-calendar2"></i></button></span>');
    });
    
	var newsTab = function(){
		var currentTab = Query.getHash("currentTab");
        if (isNullOrEmpty(currentTab)) {
            $(".tab-content").find(".tab-pane").eq(0).addClass("active").siblings(".tab-pane").removeClass("active");
            $(".overLi-btn").find("li").eq(0).addClass("active").siblings().removeClass("active");
            $("#noteTypeE").html('全部<span class="input-group-btn caret2"><button class="btn btn-sm  btn-icon-btn" type="button"><i class="fa fa-calendar2"></i></button></span>');
            importantNews();//要闻
        } else if (currentTab == "tab0") {
            $(".tab-content").find(".tab-pane").eq(0).addClass("active").siblings(".tab-pane").removeClass("active");
            $(".overLi-btn").find("li").eq(0).addClass("active").siblings().removeClass("active");
            $("#noteTypeE").html('全部<span class="input-group-btn caret2"><button class="btn btn-sm  btn-icon-btn" type="button"><i class="fa fa-calendar2"></i></button></span>');
            importantNews();//要闻
        }else if (currentTab == "tab1") {
           $(".tab-content").find(".tab-pane").eq(1).addClass("active").siblings(".tab-pane").removeClass("active");
           $(".overLi-btn").find("li").eq(1).addClass("active").siblings().removeClass("active");
           $("#noteTypeW").html('全部<span class="input-group-btn caret2"><button class="btn btn-sm  btn-icon-btn" type="button"><i class="fa fa-calendar2"></i></button></span>');
           initTableW();//新三板
        }else if (currentTab == "tab2") {
           $(".tab-content").find(".tab-pane").eq(2).addClass("active").siblings(".tab-pane").removeClass("active");
            $(".overLi-btn").find("li").eq(2).addClass("active").siblings().removeClass("active");
            $("#noteTypeH").html('全部<span class="input-group-btn caret2"><button class="btn btn-sm  btn-icon-btn" type="button"><i class="fa fa-calendar2"></i></button></span>');
           initTableH();//沪深要闻
        } else if (currentTab == "tab3") {
            $(".tab-content").find(".tab-pane").eq(3).addClass("active").siblings(".tab-pane").removeClass("active");
            $(".overLi-btn").find("li").eq(3).addClass("active").siblings().removeClass("active");
            $("#noteTypeC").html('全部<span class="input-group-btn caret2"><button class="btn btn-sm  btn-icon-btn" type="button"><i class="fa fa-calendar2"></i></button></span>');
             initTableC();//创投公司
        } else if (currentTab == "tab4") {
            $(".tab-content").find(".tab-pane").eq(4).addClass("active").siblings(".tab-pane").removeClass("active");
            $(".overLi-btn").find("li").eq(4).addClass("active").siblings().removeClass("active");
            $("#noteType02").html('全部<span class="input-group-btn caret2"><button class="btn btn-sm  btn-icon-btn" type="button"><i class="fa fa-calendar2"></i></button></span>');
            $("#comSpecial").find("li").removeClass("hang-active");
            $("#comSpecial").find("li").eq(0).addClass("hang-active");
            specialWord();//公司新闻
        }else if (currentTab == "tab5") {
            $(".tab-content").find(".tab-pane").eq(5).addClass("active").siblings(".tab-pane").removeClass("active");
            $(".overLi-btn").find("li").eq(5).addClass("active").siblings().removeClass("active");
            $("#noteTypeO").html('全部<span class="input-group-btn caret2"><button class="btn btn-sm  btn-icon-btn" type="button"><i class="fa fa-calendar2"></i></button></span>');
            initTableO();//宏观经济
        }else if (currentTab == "tab6") {
            $(".tab-content").find(".tab-pane").eq(6).addClass("active").siblings(".tab-pane").removeClass("active");
            $(".overLi-btn").find("li").eq(6).addClass("active").siblings().removeClass("active");
            $("#noteTypeS").html('全部<span class="input-group-btn caret2"><button class="btn btn-sm  btn-icon-btn" type="button"><i class="fa fa-calendar2"></i></button></span>');
            initTableS();//四大报
        }else if (currentTab == "tab7") {
            $(".tab-content").find(".tab-pane").eq(7).addClass("active").siblings(".tab-pane").removeClass("active");
            $(".overLi-btn").find("li").eq(7).addClass("active").siblings().removeClass("active");
            $("#noteType").html('全部<span class="input-group-btn caret2"><button class="btn btn-sm  btn-icon-btn" type="button"><i class="fa fa-calendar2"></i></button></span>');
            Majormt.init();//其他财经媒体
        }else if (currentTab == "tab8") {
            $(".tab-content").find(".tab-pane").eq(8).addClass("active").siblings(".tab-pane").removeClass("active");
            $(".overLi-btn").find("li").eq(8).addClass("active").siblings().removeClass("active");
            $("#noteTypeZ").html('全部<span class="input-group-btn caret2"><button class="btn btn-sm  btn-icon-btn" type="button"><i class="fa fa-calendar2"></i></button></span>');
            initTableZ();//自媒体
        }
	}
	//tab切换
	$(".overLi-btn").find("a").off().on("click", function () {
		var tab = $(this).attr("href").split("_")[1];
		pushUrlState(tab);
		typeSelect=0;
//		window.location.hash = 'page=1&currentTab=tab' + $(this).parent().index();
		newsTab();
	})
    return {
        init: function () {
            keyWord();//关键字搜索
            newsTab()//
            /*模拟select选中,和宽度适应*/
            var Selects = function (el, options) {
                this.el = el;
                this.options = options;
                var _width = this.el.width();
                var _minwidth = _width - 44;
              //this.el.find(".dropdown-menu").width(_width);
                this.el.find(".dropdown-menu").css("min-width",_minwidth);
            }

            Selects.prototype = {
                init: function (el, opitions) {
                    var _this = this;
                    if(_this.el.parent().is("th")){
						var _intext = "<b class='caret'></b>";
					}else{
						var _intext = "<span class='input-group-btn caret2'><button class='btn btn-sm  btn-icon-btn' type='button'><i class='fa fa-calendar2'></i></button></span>";
					};
                    this.el.find(".dropdown-menu").children("li").on("click", function () {
                        var _text = $(this).find("a").text();
                        if (_text == "全部") {
                            typeSelect = 0;
                        }
                        if (_text == "标题") {
                            typeSelect = 1;
                        }
                        if (_text == "正文") {
                            typeSelect = 2;
                        }
                        _this.el.find(".dropdown-toggle").html(_text + _intext);
                    });
                }
            };
            //执行下拉框
            new Selects($(".dropdown-select"), {}).init();
        }
    }

}();



//主要媒体
var Majormt = function(){
	var typeSelect = 0;
	var listComClick = function () {
        var industry = "";
        $(".allList").find("li").unbind("click").on("click", function (event) {
            event.preventDefault();
			Query.setHash({"page":1});
            var ind = $("#soCheckMost").find("li").length;
            if (!$(this).hasClass("hang-more")) {

                $("#tableMost").html("");

                $(this).parent("ul").find("li").removeClass("hang-active");
                $(this).addClass("hang-active");

                /*行业*/
                if ($(this).parents(".allList").attr("id") == "compQsMost") {
                    industry = $(this).text();

                    if ($(this).text() == "全部") {
                        inCode = "";
                    } else {
                        inCode = $(this).attr("name");
                    }

                    if ($(this).index() == 0) {
                        Query.setHash({
                            "inCode": ""
                        });
                        $(".listOne").remove();
                    } else {
                        Query.setHash({
                            "inCode": inCode
                        });
                        $(".listOne").remove();
                        $("#allListSoMost").find("ul").prepend("<li class='listOne' name =" + inCode + ">" + industry + "<span class='soListClose'></span></li>");
                    }

                }

                if (ind <= 2 && $(this).text() == "全部") {//剩余最后一个清除选项
                    $("#allListSoMost").hide();
                } else {
                    $("#allListSoMost").show();
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
        $(".pageTotalDiv").remove();
        $("#tableMost").html("");
        $(list).each(function (i) {
            if(list[i].fileExt == "pdf"){
        		tr += "<tr><td width='100%'>";
            if(Number(list[i].isTips)){
	            	tr += "<div><a href='" + list[i].fileUrl + "'>" + list[i].title + "</a><img src='../../assets/admin/layout/img/tip.png' class='tip'/></div>";
	            }else{
	            	tr += "<div><a href='" + list[i].fileUrl + "'>" + list[i].title + "</a></div>";
	            }
        	}else{
        		tr += "<tr><td width='100%'>";
	            if(Number(list[i].isTips)){
            	tr += "<div><a target='_blank' href='" + $.url.newsInfoUrl() + "id=" + list[i].id + '&name=news' + '&position=news'+"'>" + list[i].title + "</a>" + "<img src='../../assets/admin/layout/img/tip.png' class='tip'/></div>";
            }else{
            tr += "<div><a target='_blank' href='" + $.url.newsInfoUrl() + "id=" + list[i].id + '&name=news' + '&position=news'+"'>" + list[i].title + "</a></div>";
	            }
            }
            tr += "<p class='newsSpan sss'><span>" + list[i].source + "</span>";
            tr += "<span>" + list[i].date + "</span>";
           if(list[i].type == "公司"){
                if(list[i].companyId){
                    tr += "<a href='" + $.url.companyListUrl() + "id=" + list[i].companyId + "&position=news" + "'>"+list[i].companyName+"</a>";    
                }else{
                    tr += list[i].companyName;
                }
            }else{
                if(list[i].companyId){
                    tr += "<a href='" + $.url.investmentAgencyDetailsUrl() + "id=" + list[i].companyId + "&position=news" + "'>"+list[i].companyName+"</a>";
                }else{
                    tr += list[i].companyName;
                }
                
            }
            
            tr += "</p>";
            tr += "<p><span>" + list[i].summary + "</span></p>";
            tr += "</td></tr>";
        });
        $("#tableMost").append(tr);
        if(isNullOrEmpty(data.total)){
        	data.total = 0;
        }
        $(".tab-content").find('.active .clear').after("<div class='allListTow pageTotalDiv'><div class='hang-title'>共<span class='pageTotal'>"+ data.total +"</span>条结果</div></div>");
    };
    
    //关闭选项
    var removeThing = function () {
        //点击关闭按钮
        $(".soListClose").on("click", function () {
        	Query.setHash({"page":1});
            var flg = $(this).index();
            $("#tableMost").html("");
            if ($(this).parents(".allListSo").find("li").length == 2) {
                $(this).parents(".allListSo").hide();
            }
            $(this).parent().remove();
            //查询条件清楚地址栏参数
            if ($(this).parent().hasClass("listOne")) {
                $("#compQsMost").find("li").each(function () {
                    if ($(this).text() == "全部") {
                        $(this).addClass("hang-active");
                        $(this).siblings().removeClass("hang-active");
                    }
                });
                Query.setHash({
                    inCode: ""
                });
            }

            initTable();
        });
    };
	
	//刷新页面
    var getUrlParam = function () {
        var aCode = Query.getHash("inCode");
        var aTex = "";
        $("#compQsMost").find("li").each(function (i) {
            if (!isNullOrEmpty(aCode)) {
                if ($(this).attr("name") != aCode) {
                    $(this).removeClass("hang-active");
                    $(this).nextAll("li").removeClass("hang-active");
                    $("#compPop").find("li").each(function () {
                        if ($(this).attr("name") == aCode) {
                            aTex = $(this).text();
                        }
                    });
                } else {
                    $(this).addClass("hang-active");
                    $(this).siblings("li").removeClass("hang-active");
                    aTex = $(this).text();
                }
            }

        });


        if (isNullOrEmpty(aCode)) {
            $("#allListSoMost").hide();
            $(".listOne").remove();
        }
        if (!isNullOrEmpty(aCode)) {
            $("#allListSoMost").show();
            $(".listOne").remove();
            $("#allListSoMost").find("ul").prepend("<li class='listOne' name=" + aCode + ">" + aTex + "<span class='soListClose'></span></li>");
        }
        //
        $("#typeNewsMost").off().on("click",function(){
			Query.setHash({"page":1});
	    	$("#typeNewsMost b").toggleClass("typeNews-active");
	    	$("#tableMost").html("");
	        initTable();
	    })
        //显示关闭按钮
        $("#soClearMost").on("click", function () {
        	Query.setHash({"page":1});
            Query.setHash({
                inCode: ""
            });
            $(this).parent("li").siblings().remove();
            $(this).parents("#allListSoMost").hide();
            $("#comSpecialMost").find("li").eq(0).addClass("hang-active").siblings().removeClass("hang-active");
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
        var code = "";
        var outkeyword = $("#comSearchMost").val();
        var keyword = $("#comKeyWordMost").val();
        var type = typeSelect;
		if($(".typeNews").find("b").hasClass("typeNews-active")){
			var isTips = 1;
		}else{
			var isTips = 0;
		};
        var param = {
            category: "zhuyaomeiti"
        }
        var lastPage = Query.getHash("page");
        _url = $.kf.GETNEWS + "?" + "code=" + code + "&outkeyword=" + outkeyword + "&type=" + type + "&keyword=" + keyword + "&category=zhuyaomeiti"+"&isTips="+isTips;
        //new GetTable(_url, $("#pageToolMost"), "", getList, "get", $("#tableMost"),lastPage,$(".maskInTableMost")).init();
        $.getTable({
   	 		url:_url,
	    	pageId:$("#pageToolMost"),
	    	callback:getList,
	    	loadId:".maskInTableMost",
	    	currentPage:lastPage,
	    	tbodyId:$("#tableMost")
   	 	});
		
    };
	
    var keyWord = function () {
        /*关键词搜索按钮*/
        $("#compBtnMost").off().on("click", function () {
        	Query.setHash({"page":1});
            $("#tableMost").html("");
            initTable();
        });
        //重置
        $("#compBtnMostReset").off().on("click", function () {
        	Query.setHash({"page":1});
            $("#tableMost").html("");
            $("#comKeyWordMost").val("");
            $("#comSearchMost").val("");
            typeSelect=0;
            $("#noteType").html('全部<span class="input-group-btn caret2"><button class="btn btn-sm  btn-icon-btn" type="button"><i class="fa fa-calendar2"></i></button></span>');
            initTable();
        });
        /*$("#comKeyWordMost , #comSearchMost").unbind().on("keydown", function (e) {
             var keyCode = e.which;
             if (keyCode == 13) {
              $("#compBtnMost").click();
            }
        });*/
     };
	//行业
    var specialWord = function () {
        $.kf.ajax({
            type: "get",
            url: $.kf.INDUSTRYWORD,
            data: "",
            dataType: "json",
            processResponse: function (data) {
                specialFun(data);
            }
        });
    };
    
    //行业列表
    var specialFun = function (data) {
        var data = data.data;
        var tr = "";
        $(".pageTotalDiv").remove();
        var trPop = "";
        var m = 0;
        $(data).each(function (i) {
            trPop += "<li data-name=" + data[i].letter + " name =" + data[i].code + " title=' " + data[i].name + " '>" + data[i].name + "</li>";
        });

        $("#compPop").find("ul").empty("").html("");
        $("#compPop").find("ul").append(trPop);

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
        var inCode = "";
        $("#compPopspecailSave").addClass("default").removeClass("btn-primary");
        $(".city-list").find("li").on("click", function () {
            $("#compPopspecailSave").addClass("btn-primary").removeClass("default");
            _text = $(this).text();
            inCode = $(this).attr("name");
            $(this).addClass("provinceLi");
            $(this).siblings().removeClass("provinceLi");
        });
        $("#compPopspecailSave").on("click", function () {
            if($(this).parents(".myModal01 ").find(".city-list").find(".provinceLi").text() != ""){
				$(".city-list").find("li").show();
				_text = $(this).parents(".myModal01 ").find(".city-list").find(".provinceLi").text();
				$(".province-ul").find("li").removeClass("provinceLi");
				$(".province-ul").find("li:last").addClass("provinceLi");
                $('#myModal02').modal('hide');
				Query.setHash({
					"page":1,
					inCode: inCode
				});
                $("#compQsMost").find("li").removeClass("hang-active");
                $("#allListSoMost").show();
                $(".listOne").remove();
                $("#allListSoMost").find("ul").prepend("<li class='listOne' name =" + inCode + ">" + _text + "<span class='soListClose'></span></li>");
                initTable();
            }
            removeThing();
        })
    }  
        
        
    return {
    	init:function(){
    		//选项点击事件
        	listComClick();
	        //地址栏参数，刷新
	        getUrlParam();
    		keyWord();
    		$(".typeNews").find("b").removeClass("typeNews-active");
    		 /*模拟select选中,和宽度适应*/
            var Selects = function (el, options) {
                this.el = el;
                this.options = options;
                var _width = this.el.width();
                var _minwidth = _width - 44;
              //this.el.find(".dropdown-menu").width(_width);
                this.el.find(".dropdown-menu").css("min-width",_minwidth);
            }

            Selects.prototype = {
                init: function (el, opitions) {
                    var _this = this;
                    if(_this.el.parent().is("th")){
						var _intext = "<b class='caret'></b>";
					}else{
						var _intext = "<span class='input-group-btn caret2'><button class='btn btn-sm  btn-icon-btn' type='button'><i class='fa fa-calendar2'></i></button></span>";
					};
                    this.el.find(".dropdown-menu").children("li").on("click", function () {
                        var _text = $(this).find("a").text();
                        if (_text == "全部") {
                            typeSelect = 0;
                        }
                        if (_text == "标题") {
                            typeSelect = 1;
                        }
                        if (_text == "正文") {
                            typeSelect = 2;
                        }
                        _this.el.find(".dropdown-toggle").html(_text + _intext);
                    });
                }
            };
            //执行下拉框
            new Selects($(".dropdown-select"), {}).init();
    	}
    }
}()