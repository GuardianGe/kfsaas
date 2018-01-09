/*
 
 * 
 * 
 * 
 * 时政新闻
 * 
 * 
 * 
 * */


var News = function () {
    var typeSelect = 0;

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
	            	tr += "<div><a target='_blank' href='" + $.url.timePolicyUrl() + "id=" + list[i].id + '&name=news' + '&position=timePolicyNews'+"'>" + list[i].title + "</a>" + "<img src='../../assets/admin/layout/img/tip.png' class='tip'/></div>";
	            }else{
		            tr += "<div><a target='_blank' href='" + $.url.timePolicyUrl() + "id=" + list[i].id + '&name=news' + '&position=timePolicyNews'+"'>" + list[i].title + "</a></div>";
			    }
        	}
            tr += "<p class='newsSpan sss'><span>" + list[i].source + "</span>";
            tr += "<span>" + list[i].date + "</span>";
           	if(list[i].type == "公司"){
                if(list[i].companyId){
                    tr += "<a href='" + $.url.companyListUrl() + "id=" + list[i].companyId + "&position=timePolicyNews" + "'>"+list[i].companyName+"</a>";    
                }else{
                    tr += list[i].companyName;
                }
            }else{
                if(list[i].companyId){
                    tr += "<a href='" + $.url.investmentAgencyDetailsUrl() + "id=" + list[i].companyId + "&position=timePolicyNews" + "'>"+list[i].companyName+"</a>";
                }else{
                    tr += list[i].companyName;
                }
            }
            tr += "</p>";
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
    var initTable = function () {
        var _url = "";
        var outkeyword = $("#comSearchO").val();
        var keyword = $("#comKeyWordO").val();
        var type = typeSelect;
		if($(".typeNews").find("b").hasClass("typeNews-active")){
			var isTips = 1;
		}else{
			var isTips = 0;
		};
        var lastPage = Query.getHash("page");
        _url = $.kf.GETNEWS + "?" + "&outkeyword=" + outkeyword + "&type=" + type + "&keyword=" + keyword + "&category=guowuyuan"+"&isTips="+isTips;
        //new GetTable(_url, $("#pageToolT"), "", getList, "get", $("#tableThree"),lastPage,$(".maskInTable2")).init();
   	 	$.getTable({
   	 		url:_url,
	    	pageId:$("#pageToolO"),
	    	callback:getList,
	    	loadId:".maskInTable0",
	    	currentPage:lastPage,
	    	tbodyId:$("#tableOne")
   	 	});
		
    };
	
    var keyWord = function () {
        /*关键词搜索按钮*/
        $("#compBtnO").on("click", function () {
        	Query.setHash({"page":1});
            $("#tableOne").html("");
            initTable();
        });
        //重置
        $("#compBtnOReset").on("click", function () {
        	Query.setHash({"page":1});
            $("#tableOne").html("");
            $("#comKeyWordO").val("");
            $("#comSearchO").val("");
            typeSelect=0;
            $("#typeNewsCop").find("b").removeClass("typeNews-active");
            $("#noteTypeO").html('全部<span class="input-group-btn caret2"><button class="btn btn-sm  btn-icon-btn" type="button"><i class="fa fa-calendar2"></i></button></span>');
        	initTable();
        });
        
//      var myTimeout = null;
//		$("#typeNewsCop").on("click",function(){
//			clearTimeout(myTimeout);
//			myTimeout = setTimeout(function(){
//				Query.setHash({"page":1});
//		    	$("#typeNewsCop b").toggleClass("typeNews-active");
//		    	$("#tableOne").html("");
//		        initTable();
//		    },300)
//	    })
//      $("#comKeyWord , #comSearch").on("keydown", function (e) {
//          var keyCode = e.which;
//          if (keyCode == 13) {
//              $("#compBtn").click();
//          }
//      });
    };
   
   
    
    
    //部委公告/////////////////////////////////////////////
    /*拼table表格*/
    var getListT = function (data) {
        var list = data.data;
        var tr = "";
        $("#tableTwo").html("");
        $(list).each(function (i) {
        	if(list[i].fileExt == "pdf"){
            tr += "<tr><td width='100%'>";
            if(list[i].isTips){
	            	tr += "<div><a href='" + list[i].fileUrl + "'>" + list[i].title + "</a>" + "<img src='../../assets/admin/layout/img/tip.png' class='tip'/></div>";
	            }else{
	            	tr += "<div><a href='" + list[i].fileUrl + "'>" + list[i].title + "</a></div>";
	            }
        	}else{
        		tr += "<tr><td width='100%'>";
	            if(list[i].isTips){
            	tr += "<div><a target='_blank' href='" + $.url.timePolicyUrl() + "id=" + list[i].id + '&name=news' + "&position=timePolicyNews" + "'>" + list[i].title + "</a>" + "<img src='../../assets/admin/layout/img/tip.png' class='tip'/></div>";
            }else{
            tr += "<div><a target='_blank' href='" + $.url.timePolicyUrl() + "id=" + list[i].id + '&name=news' + "&position=timePolicyNews" + "'>" + list[i].title + "</a></div>";
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
    var initTableT = function () {
        var _url = "";
        var outkeyword = $("#comSearchT").val();
        var keyword = $("#comKeyWordT").val();
        var type = typeSelect;
		var lastPage = Query.getHash("page");
        _url = $.kf.GETNEWS + "?" + "&outkeyword=" + outkeyword + "&type=" + type + "&keyword=" + keyword + "&category=buweigonggao";
       // new GetTable(_url, $("#pageToolO"), "", getListO, "get", $("#tableOne"),lastPage,$(".maskInTable0")).init();
        $.getTable({
   	 		url:_url,
	    	pageId:$("#pageToolT"),
	    	callback:getListT,
	    	loadId:".maskInTableT",
	    	currentPage:lastPage,
	    	tbodyId:$("#tableTwo")
   	 	});

    };
    
    
    $("#compBtnT").on("click", function () {
    	Query.setHash({"page":1});
        $("#tableTwo").html("");
        initTableT();
    });
    //重置
    $("#compBtnWRest").on("click", function () {
    	Query.setHash({"page":1});
        $("#comKeyWordT").val("");
        $("#comSearchT").val("");
        typeSelect=0;
        $("#noteTypeW").html('全部<span class="input-group-btn caret2"><button class="btn btn-sm  btn-icon-btn" type="button"><i class="fa fa-calendar2"></i></button></span>');
        $("#tableTwo").html("");
        initTableT();
    });
    $(".tab-content").on("keydown", function (e) {
        var keyCode = e.which;
        if (keyCode == 13) {
            $(".overLi-btn li").each(function(){
		    	var tabC = $(this).children("a").text();
		    	if($(this).hasClass("active") && tabC == "国务院"){
		    		$("#compBtnO").click();
		    	}else if($(this).hasClass("active") && tabC == "部委公告"){
		    		$("#compBtnT").click();
		    	}else if($(this).hasClass("active") && tabC == "时政要闻"){
		    		$("#compBtnP").click();
		    	}
		    })
        }

    });
    
    //时政新闻/////////////////////////////////////////////
    /*拼table表格*/
    var getListW = function (data) {
        var list = data.data;
        var tr = "";
        $("#tableThree").html("");
        $(list).each(function (i) {
            if(list[i].fileExt == "pdf"){
        		tr += "<tr><td width='100%'>";
            if(list[i].isTips){
	            	tr += "<div><a href='" + list[i].fileUrl + "'>" + list[i].title + "</a>" + "<img src='../../assets/admin/layout/img/tip.png' class='tip'/></div>";
	            }else{
	            	tr += "<div><a href='" + list[i].fileUrl + "'>" + list[i].title + "</a></div>";
	            }
        	}else{
        		tr += "<tr><td width='100%'>";
	            if(list[i].isTips){
            	tr += "<div><a target='_blank' href='" + $.url.timePolicyUrl() + "id=" + list[i].id + '&name=news' + "&position=timePolicyNews" + "'>" + list[i].title + "</a>" + "<img src='../../assets/admin/layout/img/tip.png' class='tip'/></div>";
            }else{
            tr += "<div><a target='_blank' href='" + $.url.timePolicyUrl() + "id=" + list[i].id + '&name=news' + "&position=timePolicyNews" + "'>" + list[i].title + "</a></div>";
	            }
            }
            tr += "<p class='newsSpan'><span>" + list[i].source + "</span>";
            tr += "<span>" + list[i].date + "</span></p>";
            tr += "<p><span>" + list[i].summary + "</span></p>";
            tr += "</td></tr>";
        });
        $("#tableThree").append(tr);
        if(isNullOrEmpty(data.total)){
        	data.total = 0;
        }
        $(".tab-content").find('.active .clear').after("<div class='allListTow pageTotalDiv'><div class='hang-title'>共<span class='pageTotal'>"+ data.total +"</span>条结果</div></div>");
    };
    //初始化表格
    var initTableP = function () {
        var _url = "";
        var code = "";
        var outkeyword = $("#comSearchP").val();
        var keyword = $("#comKeyWordP").val();
        var type = typeSelect;
		var lastPage = Query.getHash("page");
        _url = $.kf.GETNEWS + "?" + "&outkeyword=" + outkeyword + "&type=" + type + "&keyword=" + keyword + "&category=shizhengyaowen";
        //new GetTable(_url, $("#pageToolW"), "", getListW, "get", $("#tableTwo"),lastPage,$(".maskInTable1")).init();
        $.getTable({
   	 		url:_url,
	    	pageId:$("#pageToolP"),
	    	callback:getListW,
	    	loadId:".maskInTableP",
	    	currentPage:lastPage,
	    	tbodyId:$("#tableThree")
   	 	});
    };
    
    
    $("#compBtnP").on("click", function () {
    	Query.setHash({"page":1});
        $("#tableThree").html("");
        initTableP();
    });
    //重置
    $("#compBtnFReset").on("click", function () {
        $("#tableThree").html("");
        Query.setHash({"page":1});
        $("#comKeyWordP").val("");
        $("#comSearchP").val("");
        typeSelect=0;
        $("#noteType03").html('全部<span class="input-group-btn caret2"><button class="btn btn-sm  btn-icon-btn" type="button"><i class="fa fa-calendar2"></i></button></span>');
        initTableP();
    });
    $("#newsChangeLi").find("a").on("click", function () {
    	Query.setHash({"page":1});
    	typeSelect=0;
        $(this).parents("#newsChange").find(".dropdown-toggle").html("全部"+'<span class="input-group-btn caret2"><button class="btn btn-sm  btn-icon-btn" type="button"><i class="fa fa-calendar2"></i></button></span>');
    });
    
	
	var newsTab = function(){
		var currentTab = Query.getHash("currentTab");
		function crrentActive(n){
			$(".tab-content").find(".tab-pane").eq(n).addClass("active").siblings(".tab-pane").removeClass("active");
            $(".overLi-btn").find("li").eq(n).addClass("active").siblings().removeClass("active");
		}
        if (isNullOrEmpty(currentTab)) {
            crrentActive(0);
            initTable();
        } else if (currentTab == "tab0") {
            crrentActive(0);
            initTable();
        }else if (currentTab == "tab1") {
            crrentActive(1);
            initTableT();
        }else if (currentTab == "tab2") {
            crrentActive(2);
            initTableP();
        }
	}
	$(".overLi-btn").find("a").off().on("click", function () {
			pushUrlState($(this).parent().index());
			typeSelect=0;
            $("#noteTypeO,#noteTypeW,#noteType03").html('全部<span class="input-group-btn caret2"><button class="btn btn-sm  btn-icon-btn" type="button"><i class="fa fa-calendar2"></i></button></span>');
//			window.location.hash = 'page=1&currentTab=tab' + $(this).parent().index();
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

