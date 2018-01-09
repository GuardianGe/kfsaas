/*
 * 
 * 
报表列表start  
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
            if(list[i].isCollection == 0){
            	tr += "<td><a href='javascript:void(0)' u_id='"+ list[i].id +"' name='"+ list[i].isCollection +"' class='collcationList'>收藏</a></td>";
            }else{
            	tr += "<td><a href='javascript:void(0)' u_id='"+ list[i].id +"' name='"+ list[i].isCollection +"' class='collcationList'>已收藏</a></td>";
            }
            tr += "<td><a href='javascript:void(0)' se-id='"+list[i].id+"' class='export' name='"+ list[i].titleName +"'>导出</a></td>";
            tr += "</tr>";
        });
        $("#tableOne").append(tr);
        listSC();//是否收藏
        clickSC(".collcationList");//收藏
        exportTable();//导出
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
        _url = $.kf.TABLEBASESERVICEGETLIST + "?start_time=" + start_time + "&stop_time=" + stop_time + "&keyword=" + keyword;
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
    	//是否收藏
    var listSC = function () {
        $(".collcationList").each(function () {
            if ($(this).attr("name") == 0) {
                $(this).text("收藏")
            } else {
                $(this).text("已收藏").addClass("defaultSC").unbind("click")
            }
        })
    }
	
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


/*
 * 
 * 
报表详情start  
 * 
 * 
 * */
var FormDetail = function () {

    /*拼table表格*/
    var getList = function (data) {
        var list = data.data;
        var keyArray = [];//保存thead
    	var th = "";
        var tr = "";
        //每个list的key都相同
        for (var key in list[0]){
    		keyArray.push(key);
    	};
    	$(".formBtn").find("button").removeAttr("disabled").css("background","#f28d5d");
    	$(".table-scrollable").css("border","1px solid #e5e5e5");
    	$("#newTitle").text(data.title);
    	$("#newDate").text("创建时间："+data.date);
        $("#tableOne").html("");
        //thead
		th += '<thead>';
			th += '<tr class="tr">';
				$(keyArray).each(function (i) {
					if(keyArray[i].indexOf("_id") < 0){
		    			th += "<th>" + keyArray[i] + "</th>";
		    		}
				})
			th += '</tr>';
		th += '</thead>';
		//tbody
        $(list).each(function (i) {
            tr += "<tr>";
	            $(keyArray).each(function (j) {
	            	if(keyArray[j] != "company_id"){
	            		if(keyArray[j] == "简称"){
		            		tr += "<td><a href='" + $.url.companyListUrl() + "id=" + list[i]["company_id"] + "&position=formDetail"+"'>" + list[i][keyArray[j]] + "</a></td>";
		            	}else{
		            		tr += "<td>" + list[i][keyArray[j]] + "</td>";
		            	}
	            	}
	            })
            tr += "</tr>";
        });
        $("#tableOne").append(th + tr);
        exportTable();
    };

    //初始化表格
    var initTable = function () {
    	var id = Query.getHash("id");
		var lastPage = Query.getHash("page");
        _url = $.kf.TABLEBASESERVICEGETTABLEDETAIL+"?id="+id;
        $.getTable({
   	 		url:_url,
	    	pageId:$("#pageTool"),
	    	callback:getList,
	    	loadId:".maskInTable",
	    	currentPage:lastPage,
	    	tbodyId:$("#tableOne")
   	 	});
    };
	//导出
    var exportTable = function(){
    	$(".formBtn button").off().on("click",function(){
			//上送参数
			var repId = Query.getHash("id");
			var name = $("#newTitle").text();
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
            initTable();//加载
        }
    }

}();

