/******
 
 UPDATE DATE:2017/7/21
 NAV:我的筛选
 
 ******/


/************************************我的筛选****************************************/
var mySearch = function () {
    
    //报告列表
    var mySearchList = function () {
    	$("input:checkbox").uniform();
    	var initTable = function(){
	        var _url = $.kf.MYSEARCHLIST;
	        var dataTipObj = {
	        	title:"还没有任何内容",
				subtitle:"你可以通过指标筛选页面选择条件快速生成筛选结果"
	        };
	       // new GetTable(_url, $("#pageTool"), {}, noteList, "get", $("#reportList"),1,"",true,true,dataTipObj).init();
	        $.getTable({
	        	url:_url,//url
		    	pageId:$("#pageTool"),//分页id
		    	callback:noteList,//callback
		    	dataTip:dataTipObj,
		    	tbodyId:$("#integratedList")//tbody的id,
	        })
    	}
        initTable();
        /***table***/
        function noteList(data) {
            var list = data.data;
            if(isNullOrEmpty(list)){
            	$(".box-title").hide();
            }else{
            	$(".box-title").show();
            }
            var tr = "";
            $("#allChecked").attr("checked",false);
            $("#integratedList").html("");
            $(list).each(function (i) {
                tr += "<tr se-id='"+ list[i].id +"'>";
                tr += "<td class='pdl5'><input type='checkbox' /></td>";
                if(list[i].name.length > 40){
                	tr += "<td><a class='spliceNum toIndexSearch' data-name='"+list[i].name+"' href='javascript:;' name='"+list[i].id+"'>" + list[i].name.substring(0,39) + "...</a></td>";
                }else{
                	tr += "<td><a class='spliceNum toIndexSearch' data-name='"+list[i].name+"' href='javascript:;' name='"+list[i].id+"'>" + list[i].name + "</a></td>";
                }
                tr += "<td>" + list[i].companyNumber + "</td>";
                tr += "<td>" + list[i].updateDate + "</td>";
                if(Number(list[i].addNumber) == 0){
                	 tr += "<td><span name='"+list[i].id+"'>" + list[i].addNumber + "</span></td>";
                }else{
                	tr += "<td><a class='toIndexSearch' href='javascript:;' name='"+list[i].id+"'>" + list[i].addNumber + "</a></td>";
                }
                if(Number(list[i].reduceNumber) == 0){
                	 tr += "<td><span name='"+list[i].id+"'>" + list[i].reduceNumber + "</span></td>";
                }else{
                	tr += "<td><a class='toIndexSearch' href='javascript:;' name='"+list[i].id+"'>" + list[i].reduceNumber + "</a></td>";
                }
                tr += "<td class='createDate'>" + list[i].createDate + "</td>";
                tr += "<td width='20%'><a href='javascript:void(0)' class='export'>导出</a><a href='javascript:;' name='"+list[i].id+"' class='reportModify mgl10 toIndexSearch'>修改</a><a href='javascript:void(0)' class='mgl10 deleteReport'>删除</a></td>";
                tr += "</tr>";
            });
            $("#integratedList").append(tr);
            $("input:checkbox").uniform();
            $(".toIndexSearch").on('click',function(){
            	var obj = {
            		"rp_id":$(this).attr("name"),
            		"selectName":$(this).parents("tr").find(".spliceNum").attr("data-name"),
            		"createDate":$(this).parents("tr").find(".createDate").text().substr(0,10),
            		"pageOut":"myPageOut"
            	}
            	window.location.href = $.url.indexSearch() + $.param(obj);
            });
            
            deleteReport();
            exportReport();
            oneClick();
        };
        
        
        //导出
        var dataId = '';
        function exportReport(){
        	$(".export").off().on("click",function(){
//      		$(".progress-bar").css("width","0");
    			//上送参数
    			var repId = $(this).parents("tr").attr("se-id");
	        	var parentAll = {"pickId":repId};
	        	$('#comModalLoad2').modal({backdrop: 'static', keyboard: false});
	        	$.kf.ajax({
	                type: "post",
	                url: $.kf.SEARCHEXPORTLIST,
	                data: parentAll,
	                dataType: "json",
	                processResponse: function (data) {
	                	dataId = data.data.id;
	                	$.kf.ajax({
			                type: "get",
			                url: $.kf.SEARCHGETPROGRESS + "?id=" + dataId,
			                data: '',
			                dataType: "json",
			                processResponse: function (data) {
			                	var _data = data.data;
			                	$("#comModalLoad2").modal("hide");
			                	window.location.href = data.url;
			                }
			            });
	                }
	            });
        	})
      		$("#reportWord").off().on("click",function(){
      			$(".progress-bar").css("width","0")
      			postDate()
      		});
        }
        
        //数据上送
        var pressLen = '';
        function postDate(){
        	//上送参数
    		var messageList = [];
    		var parentAll = {};
    		var checkedLen = $("#integratedList input[type='checkbox']:checked").length;
    		if(checkedLen != 0){
        	$("#integratedList input:checkbox").each(function(){
        		if($(this).attr("checked") == "checked"){
        			var reportID = $(this).parents("tr").attr("se-id");
        			messageList.push(reportID)
        		}
        	});
        	
        	var repList = JSON.stringify(messageList);
        	var parentAll = {"pickId":repList};
        	$.kf.ajax({
                type: "post",
                url: $.kf.SEARCHEXPORTLIST,
                data: parentAll,
                dataType: "json",
                processResponse: function (data) {
                	//if(isNullOrEmpty(data)){
                		dataId = data.data.id;
                		if(checkedLen == 0){
                			$(".numLen").text("1");
                		}else{
                			$(".numLen").text(checkedLen);
                		}
                		$(".numDate").text("0");
                		$("#myModal05").modal("show");
                		
                		pressLen = setInterval(getProgreesStatu,2000)
                  	//}
                }
            });
    		}else{
    			alert("请选择需要导出的报告","提示","",false)
    		}
        }
        $("#cancelOutReport").on("click",function(){
			clearInterval(pressLen);
		})
        
        //获取进度状态
        function getProgreesStatu(){
        	var checkedLen = $("#integratedList input[type='checkbox']:checked").length;
        	$.kf.ajax({
                type: "get",
                url: $.kf.SEARCHGETPROGRESS + "?id=" + dataId,
                data: '',
                dataType: "json",
                processResponse: function (data) {
                	var _data = data.data;
                	var censt = '';
                	if(checkedLen == 0){
                		censt = 100;
                		$(".numDate").text("1")
                	}else{
                		censt = 100/checkedLen;
                		$(".numDate").text(_data)
                	}
                	var prograss = _data * censt;
                	$(".progress-bar").css("width",prograss+"%");
                	//$(".waitingStatu").text(data.message)
                	if(_data == $(".numLen").text()){
                		clearInterval(pressLen);
                		$("#myModal05").modal("hide");
                		window.location.href = data.url;
                	}
                }
            }); 
        }
        
        //删除
        function deleteReport(){
        	$(".deleteReport").on("click",function(){
        		//上送参数
        		alert("您确定要删除对应筛选方案吗？","提示","delReport",true);
        		var param = {
                    pickId: $(this).parents("tr").attr("se-id")
                }
        		$("#delReport").on("click",function(){
        			$.kf.ajax({
	                    type: "post",
	                    url: $.kf.DELCONDITION,
	                    data: param,
	                    dataType: "json",
	                    processResponse: function (data) {
	                        window.location.reload();
	                    }
	                });
        		})
        	})
        }
        
        
        //全选
        $("#allChecked").on("click",function(){
        	var setC = $(this).attr("data-set");
        	if($(this).attr("checked") == "checked"){
				$(setC).attr("checked",true)
        	}else{
        		$(setC).attr("checked",false)
        	}
        	$("input:checkbox").uniform(); 
        })
		//单选
		function oneClick(){
			$("#integratedList").find(".checker").on("click",function(){
				var chekLen = $("#integratedList").find(".checker").find(".checked").length;
				var chekLen2 = $("#integratedList").find(".checker").length;
				if(chekLen == chekLen2){
					$("#allChecked").parent().addClass("checked");
				}else{
					$("#allChecked").parent().removeClass("checked");
				}
			})
		}
    }
    return {
        mySearchList: function () {
            mySearchList()
        }
    }
}();


