/*
 * 
 * 
我的报表start  
 * 
 * 
 * */
var Form = function () {

    /*拼table表格*/
    var getList = function (data) {
        var list = data.data;
        var tr = "";
        $("#tableOne").html("");
        $(list).each(function (i) {
            tr += "<tr>";
            tr += "<td>"
        	tr += "<p style='text-align:left;'><a class='toFormDetail' href='" + $.url.formDetail() + "id=" + list[i].id +"' name=" + list[i].id + ">" + list[i].title + "</a></p>"
            tr += "<td>" + list[i].date + "</td>";
            tr += "<td>" + list[i].frequency + "</td>";
            tr += "<td><a href='javascript:void(0)' u_id='"+ list[i].id +"' name='"+ list[i].isCollection +"' class='collcationList'>取消收藏</a></td>";
            tr += "<td><a href='javascript:void(0)' class='export' se-id='"+list[i].id+"' name='"+ list[i].titleName +"'>导出</a></td>";
            tr += "</tr>";
        });
        $("#tableOne").append(tr);
        chartCancelCollection(".collcationList");
        exportTable();//导出
    };
	//报表取消收藏
    var chartCancelCollection = function(className){
		$(className).on("click",function(){
			var param = {
                id: $(this).attr("u_id"),
            }
			$.kf.ajax({
                type: "post",
                url: $.kf.TABLEBASESERVICECANCELCOLLECTION,
                data: param,
                dataType: "json",
                processResponse: function (data) {
            		location.reload(location.href);
                }
            });
        })
    }
	var dateSearch = function () {
        /*日历搜索按钮*/
        $("#compBtn").on("click", function () {
        	Query.setHash({"page":1});
            initTable();
        });
        //重置
        $("#compReset").on("click", function () {
        	$(this).parents(".page-content-par").find("input").val("");
            initTable();
        });
        $("#comKeyWord").on("keydown", function (e) {
            var keyCode = e.which;
            if (keyCode == 13) {
                $("#compBtn").click();
            }
        });
    };

    //初始化表格
    var initTable = function () {
        var _url = "";
        var keyword = $("#comKeyWord").val();
        var start_time = $("#compStartTime").val();
        var stop_time = $("#compEndTime").val();
		var lastPage = Query.getHash("page");
        _url = $.kf.TABLEBASESERVICEGETCOLLECTIONLIST + "?start_time=" + start_time + "&stop_time=" + stop_time + "&keyword=" + keyword;
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
	
	
	//收藏
    var clickSC = function (className) {
        $(className).on("click", function () {
            if ($(this).attr("name") == 0) {
                //上送参数
                var param = {
                    id: $(this).attr("u_id")
                }
                $.kf.ajax({
                    type: "post",
                    url: $.kf.TABLEBASESERVICEADDCOLLECTION,
                    data: param,
                    dataType: "json",
                    processResponse: function (data) {
						
                    }
                });
                $(this).text("已收藏").addClass("defaultSC").unbind("click")
            }
        })
    }
    
    //导出
    var exportTable = function(){
    	$(".export").off().on("click",function(){
			//上送参数
			var repId = $(this).attr("se-id");
			var name = $(this).attr("name");
        	var parentAll = {
        		"id":repId,
        		"name":name
        	};
        	$('#myModal04').modal({backdrop: 'static', keyboard: false});
        	$.kf.ajax({
                type: "get",
                url: $.kf.TABLEBASESERVICEGETEXPORT,
                data: parentAll,
                dataType: "json",
                processResponse: function (data) {
                	var _data = data.data;
                	var t = setTimeout(function(){
                		$("#myModal04").modal("hide");
                		window.location.href = _data.url;
                	},1500)
                }
            });
    	})
    }
	
    return {
        init: function () {
        	dateSearch();
            initTable();//加载
        }
    }

}();









