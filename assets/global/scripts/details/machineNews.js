/*
 
 * 
 * 
 * 
 * 机器新闻start
 * 
 * 
 * 
 * */


var MachineNews = function () {
	var getList = function (data) {
        var list = data.data;
        var tr = "";
        $(".pageTotalDiv").remove();
        $("#tableSix").html("");
        $(list).each(function (i) {
            
        	tr += "<tr><td><div><a target='_blank' href='" + $.url.newsInfoUrl() + "id=" + list[i].id + '&name=news' + "'>" + list[i].title + "</a></div>";
            tr += "<p class='newsSpan'><span>" + list[i].source + "</span>";
            tr += "<span>" + list[i].date + "</span></p>";
            tr += "<p><span>" + list[i].summary + "</span></p>";
            tr += "</td></tr>";
        });
        $("#tableMachine").append(tr);
        if(isNullOrEmpty(data.total)){
        	data.total = 0;
        }
        $(".tab-content").find('.active .clear').after("<div class='allListTow pageTotalDiv'><div class='hang-title'>共<span class='pageTotal'>"+ data.total +"</span>条结果</div></div>");
    };
    //初始化表格
    var initTable = function () {
        var _url = "";
        var code = "";
        var outkeyword = "";
        var keyword = "";
		var lastPage = Query.getHash("page");
        _url = $.kf.GETNEWS + "?" + "code=" + code + "&outkeyword="+ outkeyword +"&type=0"+ "&keyword=" + keyword + "&category=zidonghua";
        $.getTable({
   	 		url:_url,
	    	pageId:$("#pageMachine"),
	    	callback:getList,
	    	loadId:".maskInTable",
	    	currentPage:lastPage,
	    	tbodyId:$("#tableMachine")
   	 	});
    };
    //查询
    $("#compBtnH").on("click", function () {
    	Query.setHash({"page":1});
        $("#tableTwo").html("");
        initTableH();
    });
    
    return {
    	init:function(){
    		initTable();
    	}
    }
    
}();


