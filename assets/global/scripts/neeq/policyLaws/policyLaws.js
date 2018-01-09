/*
 
 * 
 * 
 * 政策法规
 * 
 * 
 * */


var Laws = function () {

    var lawCheck = function () {
        //选中刷新列表
        $("#lawSpecial").find("li").on("click", function () {
        	Query.setHash({"page":1});
            $("#lawList").html("");
            $(this).addClass("hang-active");
            $(this).siblings().removeClass("hang-active");
            lawInitTable();
			
        });
        //关键词搜索列表
        $("#lawBtn").on("click", function () {
        	Query.setHash({"page":1});
            $("#lawList").html("");
            lawInitTable();
        });
		//重置
		$("#lawBtnReset").on("click", function () {
			$("#lawSpecial").find("li").removeClass("hang-active");
			$("#lawSpecial").find("li").eq(0).addClass("hang-active");
			$("#lawIpt").val("");
        	Query.setHash({"page":1});
            lawInitTable();
        });
        $("#lawIpt").on("keydown", function (e) {
            var keyCode = e.which;
            if (keyCode == 13) {
                $("#lawBtn").click();
            }

        });
    };
	var lawInitTable = function(){
		var type = $(".hang-active").attr("name");
        var _url = "";
        var keyword = $("#lawIpt").val();
        //默认列表
        _url = $.kf.GETINFORMATIONLAWS + "?" + "keyword=" + keyword + "&type=" + type + "&page=" + 1;
        var lastPage = Query.getHash("page");
        //new GetTable(_url, $("#lawPage"), "", lawList, "get", $("#lawList")).init();
        $.getTable({
        	url:_url,//url
	    	pageId:$("#lawPage"),//分页id
	    	callback:lawList,//callback
	    	currentPage:lastPage,
	    	tbodyId:$("#lawList")//tbody的id,
        })
	}
    var lawList = function (data) {
        var list = data.data;
        var tr = "";
        $("#lawList").html("");
        $(list).each(function (i) {
            tr += "<tr><td width='100%'>";
            if(list[i].type == "text"){
           		tr += "<div><a name='" + list[i].id + "' href='" + $.url.lawsUrl() + "id=" + list[i].id + "&name=laws'>" + list[i].title + "</a></div>";
            }
			if(!isNullOrEmpty(list[i].url)){
           		tr += "<div><a name='" + list[i].id + "' href='" + list[i].url + "'>" + list[i].title + "</a></div>";
			}
            tr += "<p class='newsSpan'><span>" + list[i].source + "</span>";
            tr += "<span>" + list[i].date + "</span></p>";
            tr += "<p><span>" + list[i].summary + "</span></p>";
            tr += "</td></tr>";
        });
        $("#lawList").append(tr);
    }
    return {
        init: function () {
            lawCheck();
            lawInitTable();
        }
    }


}();

