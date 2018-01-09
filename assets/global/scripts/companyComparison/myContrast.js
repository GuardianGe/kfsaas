/******
 
 UPDATE DATE:2017/5/16
 NAV:企业对比
 NAME:WANGJH
 
 ******/


/************************************我的对比****************************************/
var myContrastList = function () {
    
    //我的对比列表
    var contrastList = function () {
    	var initTable = function(){
    		var keyword = $.trim($("#comKeyWord").val());
	        var _url = $.kf.COMPAREDINFO + "?" + "keyword=" + keyword;
	        $.getTable({
	        	url:_url,//url
		    	pageId:$("#pageTool"),//分页id
		    	callback:noteList,//callback
		    	tbodyId:$("#myContrastList"),//tbody的id,
		    	dataTip:{
		    		title:"还没有任何内容",//默认暂无数据提示信息
		    		subtitle:"你可以通过顶部对比工具栏快速生成对比"
		    	}
	        })
    	}
        initTable();
        //new GetTable(_url, $("#pageTool"), {}, noteList, "get", $("#myContrastList"),1,"",true,true,dataTipObj).init();
        
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
            $("#myContrastList").html("");
            $(list).each(function (i) {
                tr += "<tr se-id='"+ list[i].id +"'>";
                tr += "<td class='pdl5'><input type='checkbox' /></td>";
				tr += "<td>" + list[i].code + "</td>";
	            tr += "<td><a href='" + $.url.companyListUrl() + "id=" + list[i].companyId + "&nameCodeId=" + list[i].codeNum + "&position=companyList"+"&position=contrast"+"'>" + list[i].shortname + "</a></td>";
	            if(list[i].type == "行业对比"){
	            	tr += "<td><a href='" + $.url.contrastSameIn()+"from=contrast&title="+ list[i].title + "&type=save"+"&code="+list[i].code +"&id=" + list[i].id +"&label=" + list[i].tagId +"' >" + list[i].title + "</a></td>";
	            }else{
	            	tr += "<td><a href='" + $.url.contrastPage()+"from=contrast&title="+ list[i].title + "&id=" + list[i].id +"&type=save"+"'>" + list[i].title + "</a></td>";
	            }
                tr += "<td>" + list[i].type + "</td>";
                tr += "<td>" + list[i].createDate + "</td>";
                tr += "<td>" + list[i].updateDate + "</td>";
                tr += "<td width='20%'><a href='javascript:void(0)' class='export'>导出</a><a href='javascript:void(0)' class='mgl10 deleteReport'>删除</a></td>";
                tr += "</tr>";
            });
            $("#myContrastList").append(tr);
            $("input:checkbox").uniform();
            deleteReport();
            exportReport();
            oneClick();
        };
        
        
        //导出
        var dataId = '';
        function exportReport(){
        	$(".export").off().on("click",function(){
        		$(".progress-bar").css("width","0");
    			//上送参数
    			var repId = $(this).parents("tr").attr("se-id");
	        	var parentAll = {"rpId":repId};
	        	$.kf.ajax({
	                type: "post",
	                url: $.kf.COMPAREDEXPORTLIST,
	                data: parentAll,
	                dataType: "json",
	                processResponse: function (data) {
                		$(".numLen").text("1");
                		$(".numDate").text("0");
                		$("#myModal02").modal("show");
                		dataId = data.data.id;
                		var setPress = setInterval(function(){
                			$.kf.ajax({
				                type: "get",
				                url: $.kf.COMPAREDPROGRESS + "?id=" + dataId,
				                data: '',
				                dataType: "json",
				                processResponse: function (data) {
				                	var _data = data.data;
				                	var censt = '';
				                	$(".numDate").text("1")
				                	$(".progress-bar").css("width","100%");
			                		clearInterval(setPress);
			                		var modalUrl = function(){
				                		$("#myModal02").modal("hide");
				                		if(!isNullOrEmpty(data.url)){
				                			window.location.href = data.url;
				                		}
				                	}
			                		setTimeout(modalUrl,1000);
				                }
				            });
                		},3000);
                		
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
    		var checkedLen = $("#myContrastList input[type='checkbox']:checked").length;
    		if(checkedLen != 0){
        	$("#myContrastList input:checkbox").each(function(){
        		if($(this).attr("checked") == "checked"){
        			var reportID = $(this).parents("tr").attr("se-id");
        			messageList.push(reportID)
        		}
        	});
        	
        	var repList = JSON.stringify(messageList);
        	var parentAll = {"rpId":repList};
        	$.kf.ajax({
                type: "post",
                url: $.kf.COMPAREDEXPORTLIST,
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
                		
                		pressLen = setInterval(getProgreesStatu,3500)
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
        	var checkedLen = $("#myContrastList input[type='checkbox']:checked").length;
        	$.kf.ajax({
                type: "get",
                url: $.kf.COMPAREDPROGRESS + "?id=" + dataId,
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
                	if(_data == $(".numLen").text()){
                		clearInterval(pressLen);
                		var t = setTimeout(function(){
                		$("#myModal02").modal("hide");
                		if(!isNullOrEmpty(data.url)){
                			window.location.href = data.url;
                		}
	                	},1500);
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
	                    url: $.kf.DELCOMPARISON,
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
        });
        
        
        
		//单选
		function oneClick(){
			$("#myContrastList").find(".checker").on("click",function(){
				var chekLen = $("#myContrastList").find(".checker").find(".checked").length;
				var chekLen2 = $("#myContrastList").find(".checker").length;
				if(chekLen == chekLen2){
					$("#allChecked").parent().addClass("checked");
				}else{
					$("#allChecked").parent().removeClass("checked");
				}
			})
		}
		
		/***搜索***/
        $("#noteSer").on("click", function () {
            $("#myContrastList").html("");
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
    }
    return {
        contrastList: function () {
            contrastList()
        }
    }
}();