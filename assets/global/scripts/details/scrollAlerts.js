/*
 
 * 
 * 
 * 
 * 滚动资讯
 * 
 * 
 * 
 * */

var scrollAlerts = function () {
    /*拼table表格*/
    var getListE = function (data) {
        var list = data.data;
        var tr = "";
        $("#tableFive").html("");
        $(list).each(function (i) {
    		tr += "<tr class='tr2'>";
            tr += "<td style='color:#000000' name='"+ list[i].year +"'>"+ list[i].publishTime +"</td>";
//          tr += "<td style='color:#000000'>"+ list[i].source +"</td>";
			if(isNullOrEmpty(list[i].accessoryUrl)){
				tr += "<td style='color:#000000'>"+ list[i].itext +"</td>";
			}else{
				tr += "<td><a href='"+list[i].accessoryUrl+"' target='_blank' class='pull-left'>"+ list[i].itext +"</a><span class='pdfIcon'></span></td>";
			}
            tr += "</tr>";
        });
        $("#tableFive").append(tr);
        $("#tableFive .tr2").each(function(i){
        	var thisYear = $(this).find("td").eq(0).attr("name"); //获取当前日期
        	if(thisYear != $(this).prev().find("td").eq(0).attr("name") && $(this).index() != 1){
          		$(this).before("<tr><td name='"+ $(this).find("td").eq(0).attr("name") +"' colspan='3' class='timeIcon'>"+ $(this).find("td").eq(0).attr("name") +"</td></tr>")
        	}
        })
        socketNews();
    };
    var importantNews = function(){
    	$("#tableFive").html("");
    	var lastPage = Query.getHash("page");
	    _url = $.kf.ANWEBSOCKETIMPORTANT+"?size=20";
	   // new GetTable(_url, $("#pageToolE"), "", getListE, "get", $("#tableFive"),lastpage,$(".maskInTable00"),true).init();
	    $.getTable({
   	 		url:_url,
	    	pageId:$("#pageToolE"),
	    	callback:getListE,
	    	loadId:".maskInTable00",
	    	currentPage:lastPage,
	    	tbodyId:$("#tableFive")
   	 	});
    }
    
	//要闻
	var socketNews = function() {
		var socket = new SockJS($.kf.ANWEBSOCKETNEWS);
	 	stompClient = Stomp.over(socket);
	 	stompClient.connect({}, function (frame) {
	 		stompClient.subscribe('/topic/yaowen_topicqueue_routingkey', function (stockdata) {
		 		var list = JSON.parse(stockdata.body)
		 		if(list.year != $("#tableFive tr td").eq(0).attr("name")){
			 		var tc = "";
			 		tc += "<tr><td name='"+ list.year +"' colspan='3' class='timeIcon'>"+ list.year +"</td></tr>"
			 		tc += "<tr class='tr2'>";
			 		tc += "<td style='color:#000000' name='"+ list.year +"'>"+ list.publishTime +"</td>";
//			 		tc += "<td style='color:#000000'>"+ list.source +"</td>";
			 		if(isNullOrEmpty(list[i].accessoryUrl)){
						tc += "<td style='color:#000000'>"+ list[i].itext +"</td>";
					}else{
						tc += "<td><a href='"+list[i].accessoryUrl+"' target='_blank' class='pull-left'>"+ list[i].itext +"</a><span class='pdfIcon'></span></td>";
					}
			 		tc += "</tr>";
		 			getHash();
		 			if(flg==true){
				    	$("#tableFive tr").eq(0).after(tc)
				    	$("#tableFive tr").css("background","#fff");
				    	$("#tableFive tr").eq(1).css("background","rgba(245,125,75,.2)")
				    }
	 			}else{
	 				var tc = "";
			 		tc += "<tr class='tr2'>";
			 		tc += "<td style='color:#000000' name='"+ list.year +"'>"+ list.publishTime +"</td>";
//			 		tc += "<td style='color:#000000'>"+ list.source +"</td>";
			 		if(isNullOrEmpty(list[i].accessoryUrl)){
						tc += "<td style='color:#000000'>"+ list[i].itext +"</td>";
					}else{
						tc += "<td><a href='"+list[i].accessoryUrl+"' target='_blank' class='pull-left'>"+ list[i].itext +"</a><span class='pdfIcon'></span></td>";
					}
			 		tc += "</tr>";
		 			getHash();
		 			if(flg==true){
				    	$("#tableFive tr").eq(0).after(tc)
				    	$("#tableFive tr").css("background","#fff");
				    	$("#tableFive tr").eq(1).css("background","rgba(245,125,75,.2)")
				    }
	 			}
	 			//判断第一条为红色背景时  5秒后清除背景
	 			if($("#tableFive tr").eq(1).css("background-color") == "rgba(245, 125, 75, 0.2)"){
		        	setInterval(function(){
			        	$("#tableFive tr").eq(1).css("background","none")
			        },5000)
		        }
		 	})
		})
	}
	var flg = true;
    function getHash(){
    	var id = Query.getHash("page");
    	if(id == 1 || id == "undefined" || id == ""){
    		flg = true;
    	}else{
    		flg = false;
    	}
    }
	
    return {
        init: function () {
            importantNews();
        }
    }

}();

