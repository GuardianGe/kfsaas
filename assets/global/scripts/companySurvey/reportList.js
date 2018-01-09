/******
 
 UPDATE DATE:2017/4/24
 NAV:企业调查
 NAME:WANGJH
 
 ******/


/************************************报告列表****************************************/
var reportList = function () {
    
    //报告列表
    var reportList = function () {
    	
    	var initTable = function(){
    		var keyword = $("#comKeyWord").val();
	        var _url = $.kf.GETREPORTLIST + "?" + "keyword=" + keyword;
	        var dataTipObj = {
	        	title:"还没有任何内容",
				subtitle:"你可以通过右上方新建报告按钮制作新报告模板，快速生成各个新三板公司报告"
	        };
	       // new GetTable(_url, $("#pageTool"), {}, noteList, "get", $("#reportList"),1,"",true,true,dataTipObj).init();
	        $.getTable({
	        	url:_url,//url
		    	pageId:$("#pageTool"),//分页id
		    	callback:noteList,//callback
		    	dataTip:dataTipObj,
		    	tbodyId:$("#reportList")//tbody的id,
	        })
    	}
        initTable();
        /***table***/
        function noteList(data) {
            var list = data.data;
            if(isNullOrEmpty(list)){
            	$(".box-left").hide();
            }else{
            	$(".box-left").show();
            }
            var tr = "";
            $("#allChecked").attr("checked",false);
            $("#reportList").html("");
            $(list).each(function (i) {
                tr += "<tr se-id='"+ list[i].id +"'>";
                tr += "<td class='pdl5'><input type='checkbox' /></td>";
                tr += "<td>" + list[i].code + "</td>";
                if(list[i].name.length > 40){
                	tr += "<td><a class='spliceNum' href='"+ $.url.reportModify() + "rp_id=" + list[i].id + "&tmp_id=" + list[i].tmpId + "&title=" + list[i].name + "&currentId=" + list[i].codeNum +"'>" + list[i].name.substring(0,39) + "...</a></td>";
                }else{
                	tr += "<td><a class='spliceNum' href='"+ $.url.reportModify() + "rp_id=" + list[i].id + "&tmp_id=" + list[i].tmpId + "&title=" + list[i].name + "&currentId=" + list[i].codeNum +"'>" + list[i].name + "</a></td>";
                }
                tr += "<td>" + list[i].createDate + "</td>";
                tr += "<td>" + list[i].updateDate + "</td>";
                tr += "<td width='20%'><a href='javascript:void(0)' class='export'>导出</a><a href='"+ $.url.reportModify() + "rp_id=" + list[i].id + "&tmp_id=" + list[i].tmpId + "&currentId=" + list[i].codeNum + "&currentName=" + list[i].name +"' class='reportModify mgl10'>修改</a><a href='javascript:void(0)' class='mgl10 deleteReport'>删除</a></td>";
                tr += "</tr>";
            });
            $("#reportList").append(tr);
            $("input:checkbox").uniform();
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
	        	var parentAll = {"rp_id":repId};
	        	$("#comModalLoad2").modal("show");
	        	$.kf.ajax({
	                type: "post",
	                url: $.kf.REPORTLIST,
	                data: parentAll,
	                dataType: "json",
	                processResponse: function (data) {
	                	dataId = data.data.id;
	                	$.kf.ajax({
			                type: "get",
			                url: $.kf.GETPROGRESS + "?id=" + dataId,
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
    		var checkedLen = $("#reportList input[type='checkbox']:checked").length;
    		if(checkedLen != 0){
        	$("#reportList input:checkbox").each(function(){
        		if($(this).attr("checked") == "checked"){
        			var reportID = $(this).parents("tr").attr("se-id");
        			messageList.push(reportID)
        		}
        	});
        	
        	var repList = JSON.stringify(messageList);
        	var parentAll = {"rp_id":repList};
        	$.kf.ajax({
                type: "post",
                url: $.kf.REPORTLIST,
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
                		$("#myModal02").modal("show");
                		
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
        	var checkedLen = $("#reportList input[type='checkbox']:checked").length;
        	$.kf.ajax({
                type: "get",
                url: $.kf.GETPROGRESS + "?id=" + dataId,
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
                		$("#myModal02").modal("hide");
                		window.location.href = data.url;
                	}
                }
            }); 
        }
        
        //删除
        function deleteReport(){
        	$(".deleteReport").on("click",function(){
        		//上送参数
        		alert("你确定要删除对应的报告吗？","提示","delReport",true);
        		var param = {
                    id: $(this).parents("tr").attr("se-id")
                }
        		$("#delReport").on("click",function(){
        			$.kf.ajax({
	                    type: "post",
	                    url: $.kf.DELREPORT,
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
			$("#reportList").find(".checker").on("click",function(){
				var chekLen = $("#reportList").find(".checker").find(".checked").length;
				var chekLen2 = $("#reportList").find(".checker").length;
				if(chekLen == chekLen2){
					$("#allChecked").parent().addClass("checked");
				}else{
					$("#allChecked").parent().removeClass("checked");
				}
			})
		}
		
		        /***搜索***/
        $("#noteSer").on("click", function () {
            $("#reportList").html("");
            initTable();
        });
        //重置
        $("#noteReset").on("click",function(){
        	$("#comKeyWord").val("");
        	initTable();
        })
        $("#comKeyWord").on("keydown", function (e) {
            var keyCode = e.which;
            if (keyCode == 13) {
                $("#noteSer").click();
            }
        });
        /***新建报告页面跳转***/
        $("#newsReport").click(function(){
        	window.top.location.href = $.url.reportGuide();
        })
    }
    return {
        reportList: function () {
            reportList()
        }
    }
}();


