/*
 
 * 
 * 
 * 
 * 政策新闻
 * 
 * 
 * 
 * */


var News = function () {
    var typeSelect = 0;
      //股转公告/////////////////////////////////////////////
    /*拼table表格*/
    var getListFa = function (data) {
        var list = data.data;
        var tr = "";
        $("#tableFa").html("");
        $(list).each(function (i) {
            if(list[i].fileExt == "pdf"){
        		tr += "<tr><td width='100%'>";
            if(list[i].isTips){
	            	tr += "<div><a href='" + list[i].fileUrl + "'>" + list[i].title + "</a>" + "<img src='../../../assets/admin/layout/img/tip.png' class='tip'/></div>";
	            }else{
	            	tr += "<div><a href='" + list[i].fileUrl + "'>" + list[i].title + "</a></div>";
	            }
        	}else{
        		tr += "<tr><td width='100%'>";
	            if(list[i].isTips){
            	tr += "<div><a target='_blank' href='" + $.url.supervisionUrl() + "from=supervisionNews" + "&id=" + list[i].id + '&position=supervisionNews&name=news' + "'>" + list[i].title + "</a>" + "<img src='../../../assets/admin/layout/img/tip.png' class='tip'/></div>";
            }else{
            tr += "<div><a target='_blank' href='" + $.url.supervisionUrl() + "from=supervisionNews" + "&id=" + list[i].id + '&position=supervisionNews&name=news' + "'>" + list[i].title + "</a></div>";
	            }
            }
            tr += "<p class='newsSpan'><span>" + list[i].source + "</span>";
            tr += "<span>" + list[i].date + "</span></p>";
            tr += "<p><span>" + list[i].summary + "</span></p>";
            tr += "</td></tr>";
        });
        $("#tableFa").append(tr);
        if(isNullOrEmpty(data.total)){
        	data.total = 0;
        }
        $(".tab-content").find('.active .clear').after("<div class='allListTow pageTotalDiv'><div class='hang-title'>共<span class='pageTotal'>"+ data.total +"</span>条结果</div></div>");
    };
    //初始化表格
    var initTableFa = function () {
        var _url = "";
        var code = "";
        var outkeyword = $("#outkeyFa").val();
        var keyword = $("#keyFa").val();
        var type = typeSelect;
        var lastPage = Query.getHash("page");
        _url = $.kf.GETNEWS + "?" + "code=" + code + "&outkeyword=" + outkeyword + "&type=" + type + "&keyword=" + keyword + "&category=guzhuangonggao";
        //new GetTable(_url, $("#pageFa"), "", getListFa, "get", $("#tableFa"),lastPage,$(".maskFa")).init();
        $.getTable({
   	 		url:_url,
	    	pageId:$("#pageFa"),
	    	callback:getListFa,
	    	loadId:".maskFa",
	    	currentPage:lastPage,
	    	tbodyId:$("#tableFa")
   	 	});

    };
    
    $("#btnFa").on("click", function () {
    	Query.setHash({"page":1});
        $("#tableFa").html("");
        initTableFa();
    });
    //重置
    $("#btnFaReset").on("click", function () {
    	Query.setHash({"page":1});
        $("#keyFa").val("");
        $("#outkeyFa").val("");
        typeSelect=0;
        $("#noteType").html('全部<span class="input-group-btn caret2"><button class="btn btn-sm  btn-icon-btn" type="button"><i class="fa fa-calendar2"></i></button></span>');
        $("#tableFa").html("");
        initTableFa();
    });
	//股转公告end/////////////////////////////////////////////
	
   
    //一行三会/////////////////////////////////////////////
    /*拼table表格*/
    var getListO = function (data) {
        var list = data.data;
        var tr = "";
        $("#tableOne").html("");
        $(list).each(function (i) {
        	if(list[i].fileExt == "pdf"){
            tr += "<tr><td width='100%'>";
            if(list[i].isTips){
	            	tr += "<div><a href='" + list[i].fileUrl + "'>" + list[i].title + "</a>" + "<img src='../../../assets/admin/layout/img/tip.png' class='tip'/></div>";
	            }else{
	            	tr += "<div><a href='" + list[i].fileUrl + "'>" + list[i].title + "</a></div>";
	            }
        	}else{
        		tr += "<tr><td width='100%'>";
	            if(list[i].isTips){
	            	tr += "<div><a target='_blank' href='" + $.url.supervisionUrl() + "from=supervisionNews" + "&id=" + list[i].id + '&position=supervisionNews&name=news' + "'>" + list[i].title + "</a>" + "<img src='../../../assets/admin/layout/img/tip.png' class='tip'/></div>";
	            }else{
	            	tr += "<div><a target='_blank' href='" + $.url.supervisionUrl() + "from=supervisionNews" + "&id=" + list[i].id + '&position=supervisionNews&name=news' + "'>" + list[i].title + "</a></div>";
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
        _url = $.kf.GETNEWS + "?" + "code=" + code + "&outkeyword=" + outkeyword + "&type=" + type + "&keyword=" + keyword + "&category=yihangsanhui";
        //new GetTable(_url, $("#pageToolO"), "", getListO, "get", $("#tableOne"),lastPage,$(".maskInTable0")).init();
   	 	$.getTable({
   	 		url:_url,
	    	pageId:$("#pageToolO"),
	    	callback:getListO,
	    	loadId:".maskInTable0",
	    	currentPage:lastPage,
	    	tbodyId:$("#tableOne")
   	 	});

    };
    
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
	//沪深交易所/////////////////////////////////////////////
    /*拼table表格*/
    var getListYang = function (data) {
        var list = data.data;
        var tr = "";
        $("#tableYang").html("");
        $(list).each(function (i) {
            if(list[i].fileExt == "pdf"){
        		tr += "<tr><td width='100%'>";
            if(list[i].isTips){
	            	tr += "<div><a href='" + list[i].fileUrl + "'>" + list[i].title + "</a>" + "<img src='../../../assets/admin/layout/img/tip.png' class='tip'/></div>";
	            }else{
	            	tr += "<div><a href='" + list[i].fileUrl + "'>" + list[i].title + "</a></div>";
	            }
        	}else{
        		tr += "<tr><td width='100%'>";
	            if(list[i].isTips){
            	tr += "<div><a target='_blank' href='" + $.url.supervisionUrl() + "from=supervisionNews" + "&id=" + list[i].id + '&position=supervisionNews&name=news' + "'>" + list[i].title + "</a>" + "<img src='../../../assets/admin/layout/img/tip.png' class='tip'/></div>";
            }else{
            tr += "<div><a target='_blank' href='" + $.url.supervisionUrl() + "from=supervisionNews" + "&id=" + list[i].id + '&position=supervisionNews&name=news' + "'>" + list[i].title + "</a></div>";
	            }
            }
            tr += "<p class='newsSpan'><span>" + list[i].source + "</span>";
            tr += "<span>" + list[i].date + "</span></p>";
            tr += "<p><span>" + list[i].summary + "</span></p>";
            tr += "</td></tr>";
        });
        $("#tableYang").append(tr);
        if(isNullOrEmpty(data.total)){
        	data.total = 0;
        }
        $(".tab-content").find('.active .clear').after("<div class='allListTow pageTotalDiv'><div class='hang-title'>共<span class='pageTotal'>"+ data.total +"</span>条结果</div></div>");
    };
    //初始化表格
    var initTableYang = function () {
        var _url = "";
        var code = "";
        var outkeyword = $("#outkeyYang").val();
        var keyword = $("#keyYang").val();
        var type = typeSelect;
        var lastPage = Query.getHash("page");
        _url = $.kf.GETNEWS + "?" + "code=" + code + "&outkeyword=" + outkeyword + "&type=" + type + "&keyword=" + keyword + "&category=jiaoyisuo";
        //new GetTable(_url, $("#pageYang"), "", getListYang, "get", $("#tableYang"),lastPage,$(".maskYang")).init();
		$.getTable({
   	 		url:_url,
	    	pageId:$("#pageYang"),
	    	callback:getListYang,
	    	loadId:".maskYang",
	    	currentPage:lastPage,
	    	tbodyId:$("#tableYang")
   	 	});
    };
    
    $("#btnYang").on("click", function () {
    	Query.setHash({"page":1});
        $("#tableYang").html("");
        initTableYang();
    });
	//重置
    $("#btnYangReset").on("click", function () {
    	Query.setHash({"page":1});
        $("#keyYang").val("");
        $("#outkeyYang").val("");
        typeSelect=0;
        $("#noteTypeY").html('全部<span class="input-group-btn caret2"><button class="btn btn-sm  btn-icon-btn" type="button"><i class="fa fa-calendar2"></i></button></span>');
        $("#tableYang").html("");
        initTableYang();
    });
	//央行end/////////////////////////////////////////////
	
    var newsTab = function(){
		var currentTab = Query.getHash("currentTab");
		if(isNullOrEmpty(currentTab)){
			$(".tab-content").find(".tab-pane").eq(0).addClass("active").siblings(".tab-pane").removeClass("active");
            $(".overLi-btn").find("li").eq(0).addClass("active").siblings().removeClass("active");
            $("#noteType").html('全部<span class="input-group-btn caret2"><button class="btn btn-sm  btn-icon-btn" type="button"><i class="fa fa-calendar2"></i></button></span>');
            initTableFa();
		}else if (currentTab == "tab0") {
            $(".tab-content").find(".tab-pane").eq(0).addClass("active").siblings(".tab-pane").removeClass("active");
            $(".overLi-btn").find("li").eq(0).addClass("active").siblings().removeClass("active");
             $("#noteType").html('全部<span class="input-group-btn caret2"><button class="btn btn-sm  btn-icon-btn" type="button"><i class="fa fa-calendar2"></i></button></span>');
            initTableFa();
        }else if (currentTab == "tab1") {
            $(".tab-content").find(".tab-pane").eq(1).addClass("active").siblings(".tab-pane").removeClass("active");
            $(".overLi-btn").find("li").eq(1).addClass("active").siblings().removeClass("active");
        	$("#noteTypeO").html('全部<span class="input-group-btn caret2"><button class="btn btn-sm  btn-icon-btn" type="button"><i class="fa fa-calendar2"></i></button></span>');
            initTableO();
        }else if (currentTab == "tab2") {
            $(".tab-content").find(".tab-pane").eq(2).addClass("active").siblings(".tab-pane").removeClass("active");
            $(".overLi-btn").find("li").eq(2).addClass("active").siblings().removeClass("active");
            $("#noteTypeY").html('全部<span class="input-group-btn caret2"><button class="btn btn-sm  btn-icon-btn" type="button"><i class="fa fa-calendar2"></i></button></span>');
            initTableYang();
        }
    }
    
    $(".overLi-btn").find("a").on("click", function () {
		pushUrlState($(this).parent().index());
		 typeSelect=0;
		//window.location.hash = 'page=1&currentTab=tab' + $(this).parent().index();
		newsTab();
	})
    
     //回车查询事件
    $(".tab-content").on("keydown", function (e) {
        var keyCode = e.which;
        if (keyCode == 13) {
            $(".overLi-btn li").each(function(){
		    	var tabC = $(this).children("a").text();
		    	if($(this).hasClass("active") && tabC == "股转公告"){
		    		$("#btnFa").click();
		    	}else if($(this).hasClass("active") && tabC == "一行三会"){
		    		$("#compBtnO").click();
		    	}else if($(this).hasClass("active") && tabC == "沪深交易所"){
		    		$("#btnYang").click();
		    	}
		    })
        }

    });
    
    return {
        init: function () {
        	newsTab();
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
