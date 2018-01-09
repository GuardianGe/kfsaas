/******
 
 UPDATE DATE:2016/9/19
 NAV:INVER
 NAME:WANGJH
 公告行情
 历史行情
 最新动态
 ******/


/************************************ 最新动态****************************************/
var newsThree = function () {
    var recentNews = function () {
        var initTable = function(){
        	var keyword = $("#comKeyWord").val();
	        var type = $("#comSpecial").find(".hang-active").attr("name");
	        var start_time = $("#startDate").val();
	        var stop_time = $("#stopDate").val();
	        if (isNullOrEmpty(type)) {
	            type = '';
	        }
	        var lastPage = Query.getHash("page");
	        if (compareDate(start_time, stop_time)) {
				$("#recentNews").html("");
	        	var _url = $.kf.GETLATESTNEWS + "?" + "keyword=" + keyword + "&type=" + type + "&start_time=" + start_time + "&stop_time=" + stop_time;
	        	$.getTable({
		        	url:_url,//url
			    	pageId:$("#pageTool"),//分页id
			    	callback:noteList,//callback
			    	currentPage:lastPage,
			    	tbodyId:$("#recentNews")//tbody的id,
		        })
			}
        };
        /***table***/
        function noteList(data) {
            var list = data.data;
            var tr = "";
            $("#recentNews").html("");
            $(list).each(function (i) {
                tr += "<tr>";
                if (list[i].fileExt == "pdf") {
                    tr += "<td style='text-align:left' width='50%'>"
                    tr += "<p style='text-align:left;'><span class='noteTit'><a href='" + list[i].fileUrl + "'>" + list[i].title + "</a></span></p>"
                    tr += "<p style='width:90%;color:#999;text-align:left;'>" + list[i].summary + "</p></td>";
                } else {
                    tr += "<td style='text-align:left' width='50%'>"
                    tr += "<p style='text-align:left;'><span class='noteTit'><a target='_blank' href='" + $.url.newsInfoUrl() + "from=latestnews&id=" + list[i].id + '&name=news&position=latestnews' + "'>" + list[i].title + "</a></span></p>"
                    tr += "<p style='width:90%;color:#999;text-align:left;'>" + list[i].summary + "</p></td>";
                }
                tr += "<td>" + list[i].type + "</td>";
                tr += "<td width='20%'>" + list[i].date + "</td>";
                tr += "</tr>";
            });
            $("#recentNews").append(tr);
        };

        /***搜索***/
        $("#noteSer").on("click", function () {
        	Query.setHash({"page":1});
             initTable();
        });
        //重置
        $("#compReset").on("click", function () {
        	Query.setHash({"page":1});
            $(".list-inline").find("li").eq(0).addClass("hang-active").siblings("li").removeClass("hang-active");
            $("#comKeyWord").val("");
             initTable();
        });
        $("#comKeyWord").on("keydown", function (e) {
            var keyCode = e.which;
            if (keyCode == 13) {
                $("#noteSer").click();
            }
        });
        /*点击事件*/
        $("#notesLi").find("li").on("click", function () {
        	Query.setHash({"page":1});
            $(this).addClass("hang-active");
            $(this).siblings().removeClass("hang-active");
             initTable();
        });
        initTable();
    }
    return {
        recentNews: function () {
            recentNews()
        }
    }
}();