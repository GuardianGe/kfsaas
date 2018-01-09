/*
 
 * 
 * 
 * 
 * 同行对比
 * 
 * 
 * 
 * */
var SameContrast = function(){
	 //选项的点击事件
    var listComClick = function () {
        var securities = "";
        $(".allList").find("li").off("click").on("click", function (event) {
            event.preventDefault();
            var ind = $("#soCheck").find("li").length;
			$(".codeHideSame").text("");
            if (!$(this).hasClass("hang-more")) {
                $("#tableOne").html("");
                $(this).parent("ul").find("li").removeClass("hang-active");
                $(this).addClass("hang-active");

                /*企业标签*/
                if ($(this).parents(".allList").attr("id") == "compYg") {
                    securities = $(this).text();
                    var seCode = $(this).attr("name");
                    Query.setHash({
                    	"page":1,
                        "seCode": seCode
                    });

                }
                initTable();
            }
            if(!isNullOrEmpty(Query.getHash('code'))){
	        	$("#codeKeyWord").val(Query.getHash('code'));
	        }

        });
        
    };
	var initTable = function(){
        //加载表格
        if(isNullOrEmpty(Query.getHash('code'))){
        	var code = $("#codeKeyWord").val();
        }else{
        	var code = Query.getHash('code');
        }
        var type = $("#comSpecial").find(".hang-active").attr("name");
        if(isNullOrEmpty(type)){
        	type = "";
        };
        if(!isNullOrEmpty(Query.getHash("id"))){
			var rpId = Query.getHash("id");
		}else{
			var rpId = "";
		}
        var _url = $.kf.GETBUSINESSCOMPARISON + "?code=" + code +"&type=" + type+"&rpId="+rpId;
        $.getTable({
        	url:_url,//url
	    	pageId:$("#samePage"),//分页id
	    	callback:getList,//callback
	    	tbodyId:$("#tableOne"),//tbody的id,
	    	showPageTool:false
        });
        
        //table
        function getList(data){
        	leftTable();
        	if(isNullOrEmpty(data.data)){
        		$(".btnList").hide();
        	}else{
        		$(".btnList").show();
        	}
        	var arr = data.data.data;
        	var companyNum = data.data.company;
       		if(isNullOrEmpty(arr)){
       			$("#bigName").text("");
       			$("#commonName").text("");
       			return false;
       		};
       		$("#bigName").text(companyNum.name);
       		$("#commonName").text(companyNum.number);
       		var leng = arr.length;
        	var list = [];
        	var html = "";
       		var newArr = [], tempArr = [];
       		for (var i = 0, j = arr.length - 1; i < j; i++) {
       			//此处label为data返回的要去除的  字段
                if (arr[i].label == arr[i + 1].label) {
                    tempArr.push(arr[i]);
                } else {
                    tempArr.push(arr[i]);
                    newArr.push(tempArr.slice(0));
                    tempArr.length = 0;
                }
            }
            tempArr.push(arr[leng - 1]);
            var lastArr = [];
            lastArr.push(tempArr);
            list = newArr.concat(lastArr);
            $("#tableOne").html("");
            for(var i=0;i<list.length;i++){
            	html += '<tr>';
				html += '	<td colspan="9">';
				html += '<div class="same-title">';
				for (var g = 0; g < list[i].length; g++) {
                    html += '<span>' + list[i][g].label + '</span>';
                }
				html += '</div>';
				html += '		<table class="same-table" width="100%" border="0" cellspacing="0" cellpadding="0">';
				html += '			<colgroup>';
				html += '				<col width="10%" />';
				html += '				<col width="23%" />';
				html += '				<col width="21%" />';
				/*html += '				<col width="11%" />';*/
				html += '				<col width="23%" />';
				/*html += '				<col width="11%" />';*/
				html += '				<col width="23%" />';
				html += '			</colgroup>';
				 //循环内容
                for (var j = 0; j < list[i].length; j++) {
                    html += "<tr>";
                    html += "<td style='text-align: left;color: #5C5C5F;padding-left:10px;'>" + list[i][j].indexName + "</td>";
                    html += "<td class='same-toRight'>" + list[i][j].value + "</td>";
                    html += "<td class='same-toRight'>" + list[i][j].valueAvg + "</td>";
                    /*html += "<td class=''><a href='" + $.url.companyListUrl() + "#id=" + list[i][j].maxId  + "&position=companyList"+"'>" + list[i][j].companyMax + "</a></td>";*/
                    html += "<td class='same-toRight'>" + list[i][j].valueMax + "</td>";
                    /*html += "<td class=''><a href='" + $.url.companyListUrl() + "#id=" + list[i][j].minId  + "&position=companyList"+"'>" + list[i][j].companyMin + "</a></td>";*/
                    html += "<td class='same-toRight'>" + list[i][j].valueMin + "</td>";
                    html += "</tr>";
                }
				html += '		</table>';
				html += '	</td>';
				html += '</tr>';
            }
            $("#tableOne").html(html);
            //控制左右高度
            var _h = $(".same-left").height();
            $(".same-right-in").height(_h);
            $(".same-title").each(function () {
	            var texts = $(this).find("span").eq(0).text();
	            $(this).html("").append("<span>" + texts + "</span>");
	        });
        }
	};
	 //企业标签
    var specialWord = function () {
    	var code = $("#codeKeyWord").val();
        $.kf.ajax({
            type: "get",
            url: $.kf.GETENTERPRISELABEL +"?code="+ code,
            data: "",
            dataType: "json",
            processResponse: function(data){
            	specialFun(data);
            }
        });
	};
	//企业标签列表
	var specialFun = function(data){
		var data = data.data;
		$("#comSpecial").html("");
		if(!isNullOrEmpty(data)){
			var tr = "";
			var trPop = "";
			var m = 0;
			$(data).each(function(i){
				m++;
				if(i < 5){
					tr += "<li name =" + data[i].labelCode +">" + data[i].labelName + "</li>";
				}else{
					trPop += "<li data-name=" + data[i].letter +" name =" + data[i].labelCode +" title=' " + data[i].labelName + " '>" + data[i].labelName + "</li>";
				}
			});
			
			
			$("#comSpecial").append(tr);
			$("#comSpecial").find("li").eq(0).addClass("hang-active");
			if(!isNullOrEmpty(Query.getHash("label"))){
				label = Query.getHash("label");
				$("#comSpecial").find("li").each(function(){
					if($(this).attr("name") == label){
						$(this).addClass("hang-active");
						$(this).siblings().removeClass("hang-active");
					}
				});
			}
			//是否显示更多按钮
			if(m > 5){
				$("#comSpecial").append('<li id = "trPop"  class="hang-more" data-toggle="modal" data-target="#myModal02">更多>></li>');
			}
		
			$("#compPop").find("ul").empty("").html("");
			$("#compPop").find("ul").append(trPop);
			$("#compYg").show();
		}else{
			$("#compYg").hide();
		}
		initTable();
		listComClick();
		
	};
	var iptChange = function(){
		var searchI = trim($("#codeKeyWord").val());
		var label = "";
		
		if(isNullOrEmpty(searchI)){
			$(".codeHideSame").text("请输入代码或者简称");
			return false;
		}else{
			$(".codeHideSame").text("");
		}
		
        //上送参数
        $.kf.ajax({
            type: "get",
            url: $.kf.GETLISTEDCOMPARED+"?code="+searchI,
            data: "",
            dataType: "json",
            processResponse: function (data) {
                if (data.code == 10010) {
                     $(".codeList").hide();
                     $(".codeHideSame").text("未找到对应公司，请重新输入");
                } else {
                	Query.setHash({"code":data.data.code});
                	Query.setHash({"seCode":""});
                	$(".same-wrap").show();
                	$(".same-nodata").hide();
                	//window.location.href = $.url.contrastSameIn()+ "?peerCode=" + data.data.code + window.location.hash;
                	specialWord();//企业标签
                	
                }
            }
        });
        
        btnClick();
	};
	var btnClick = function(){
		var arr = [];
		
		//公司跳转
		$("#same-comp").on('click',function(){
			if(!isNullOrEmpty(Query.getHash("code"))){
				arr.push(Query.getHash("code"));
			}else{
				arr.push($("#codeKeyWord").val());
			}
			$("#sameIndustry").find("tr").each(function(){
				arr.push($(this).find("td").eq(0).text())
			});
			var code = arr.join(",");
			if(!isNullOrEmpty("type") && Query.getHash("type") == "save"){
				window.location.href = $.url.contrastPage()+"companyPeerCode="+code+"&code="+code+"&type=save";
			}else{
				window.location.href = $.url.contrastPage()+"companyPeerCode="+code+"&code="+code;
			}
			
		});
		
		if(!isNullOrEmpty("type") && Query.getHash("type") == "save"){
			
			var typeId = Query.getHash("id");
			//已保存过的    导出 
			$("#same-excel").on("click",function(){
			
				var type = $("#comSpecial").find(".hang-active").attr("name");
		        if(isNullOrEmpty(type)){
		        	type = "";
		        };
		        var typeName = $("#comSpecial").find(".hang-active").text();
		        if(isNullOrEmpty(typeName)){
		        	typeName = "";
		        };
		        var title = trim($("#codeKeyOut").val());
		        var param = {
					'rpId':typeId,
					'export':'export'
				};
				$('#comModalLoad').modal({backdrop: 'static', keyboard: false});
				$.ajax({
	                type: "post",
	                url: $.kf.SAVEBUSINESSCOMPARISON,
	                data: param,
	                dataType: "json",
	                success: function (data) {
                		var t = setTimeout(function(){
	                		$("#comModalLoad").modal("hide");
                			window.location.href = data.data.url;
	                	},1500);
	                }
	            });
		
			});
		}else{
			$("#same-excel").on("click",function(){
				$("#myModalOut").modal("show");
			});
			$("#same-save").on("click",function(){
				$("#myModalSame").modal("show");
			})
		}
		
		$("#codeKeySave,#codeKeyOut").on("keyup",function(e){
			var keyCode = e.which;
            if (keyCode == 13) {
                $(".sameSureSave").click();
            }
		});
		
		//保存  和 导出 
		$(".sameSureSave").off().on("click",function(){
			$(this).parents(".myModal01").find(".same-pop-error").text("");
			
			var type = $("#comSpecial").find(".hang-active").attr("name");
	        if(isNullOrEmpty(type)){
	        	type = "";
	        };
	        var typeName = $("#comSpecial").find(".hang-active").text();
	        if(isNullOrEmpty(typeName)){
	        	typeName = "";
	        };
	        if(isNullOrEmpty($(this).parents(".myModal01").find("input").val())){
	        	$(this).parents(".myModal01").find(".same-pop-error").text("名称不能为空");
	        	return false;
	        }else{
	        	$(this).parents(".myModal01").find(".same-pop-error").text("");
	        }
	        
	        if($(this).attr("name") == "export"){
	        	//导出
	        	var title = trim($("#codeKeyOut").val());
	        	var param = {
					'code':$("#codeKeyWord").val(),
					'type':type,
					'typeName':typeName,
					'title':title,
					'export':'export'
				};
	        }else{
	        	//保存
	        	var title = trim($("#codeKeySave").val());
	        	var param = {
					'code':$("#codeKeyWord").val(),
					'type':type,
					'typeName':typeName,
					'title':title
				};
				$(".modal_tips").hide();
	        }
	        var $this = $(this);
	        $.kf.ajax({
                type: "get",
                url: $.kf.GETREPEATSERVICE+"?title="+title+"&type=2",
                data: "",
                dataType: "json",
                processResponse: function (data) {
                	if(data.code == "10020"){
                		$this.parents(".myModal01").find(".same-pop-error").text("名称不能重复");
                	}else{
                		$this.parents(".myModal01").find(".same-pop-error").text("");
                		$("#myModalSame").modal("hide");
						$("#myModalOut").modal("hide");
						$('#comModalLoad').modal({backdrop: 'static', keyboard: false});
						$.kf.ajax({
			                type: "post",
			                url: $.kf.SAVEBUSINESSCOMPARISON,
			                data: param,
			                dataType: "json",
			                processResponse: function (data) {
			            		var t = setTimeout(function(){
			                		$('#comModalLoad').modal("hide");
				                	if($this.attr("name") == "export"){
				                		window.location.href = data.data.url;
				                	}else{
				                		window.location.href = $.url.myContrast();
				                	}
			                	},1500)
			                	
			                }
			            });
                	}
                }
            });
		
		});
		
	}
	var keyThink = function(){
		//输入框事件
		if(!isNullOrEmpty(Query.getHash("code"))){
			$(".same-wrap").show();
        	$(".same-nodata").hide();
			$("#codeKeyWord").val(Query.getHash("code"));
			iptChange();
		}else{
			$(".same-wrap").hide();
        	$(".same-nodata").show();
		};
		if(!isNullOrEmpty("type") && Query.getHash("type") == "save"){
			$("#same-save").hide();
			$("#same-comp").hide();
			$("#same-excel").hide();
			
		}
		//查询
   		$("#compBtn").on("click",function(){
   			iptChange();
   		});
        //键盘
		$("#codeKeyWord").off().on("keyup",function(e){
    		var searchI = trim($("#codeKeyWord").val());
    		var keyCode = e.which;
            if (keyCode == 13) {
                var code = '';
                if($(".codeList .active").find("span").text() == ""){
                	code = $("#codeKeyWord").val();
                }else{
                	code = $(".codeList .active").find("span").text();
                }
                $("#codeKeyWord").val(code);
        		$(".codeList").hide();
        		$(".codeList ul").html("");
    			iptChange();
            } else if (keyCode == 40) {
	            if ($(".codeList ul li:last-child").hasClass("active")) {
	                return false;
	            } else if (!$(".codeList ul li").hasClass("active")) {
	                $(".codeList ul li:first-child").addClass("active");
	                return false;
	            } else {
	                $(".codeList .active").removeClass("active").next().addClass("active");
	                return false;
	                }
	        } else if (keyCode == 38) {
	            if ($(".codeList ul li:first-child").hasClass("active")) {
	                return false;
	            } else {
	                $(".codeList .active").removeClass("active").prev().addClass("active");
	                return false;
	            }
	        }else{
	        	$(".codeList ul").html("");
        		if (searchI != "") {
		            //上送参数
		            var param = {"code": searchI,"listStatusId":"b2"};
		            $.kf.ajax({
		                type: "get",
		                url: $.kf.COMPANYCODE,
		                data: param,
		                dataType: "json",
		                processResponse: function (data) {
		                    if (data.total == 0) {
		                         $(".codeList").hide();
		                    } else {
		                    	$(".codeHideSame").text("");
		                        var list = data.data.companyList;
		                        var tr = "";
		                        $(".codeList ul").html("");
		                        $(list).each(function (i) {
		                            if (i < 10) {
		                                tr += "<li><a href='javascript:void(0)'><b class='pull-right'>" + list[i].shortname + "</b><span>" + list[i].code + "</span></a></li>";
		                            }
		                        });
		                        $(".codeList ul").append(tr);
		                        $(".codeList").show();
		                        $(".codeList").find("li").on("click",function(){
		                        	var code = $(this).find("span").text();
		                        	$("#codeKeyWord").val(code);
		                        	$(".codeList").hide();
		                        	iptChange();
		                        });
		                    }
		                }
		            });
		        } else {
		            $(".codeList").hide();
	             	$(".codeHideSame").text("");
		        }
	        }
    	});
		$("body").on("click",function(){
    		$(".codeList").hide();
   		});
   		
    
	};
	/*企业标签选择*/
	var leftTable = function(){
		//同商业
		var code = $("#codeKeyWord").val();
        var type = $("#comSpecial").find(".hang-active").attr("name");
		$.kf.ajax({
            type: "get",
            url: $.kf.GETCOMPAREDSIMILIAR + "?code=" + code,
            data: "",
            dataType: "json",
            processResponse: function (data) {
               sameIndustry(data);
            }
        });
        function sameIndustry(data){
        	var list = data.data;
        	$("#sameIndustry").html("");
        	if(isNullOrEmpty(list)){
        		sameNoData($("#sameIndustry"));
        		$("#same-comp").hide();
        		return false;
        	}
        	var tr = "";
        	$(list).each(function(i) {
        		tr += "<tr><td>"+ list[i].code +"</td>";
        		if(list[i].securities == "0"){
        			securities = "关注";
	            	 tr += "<td><a href='" + $.url.companyListUrl() + "id=" + list[i].id + "&nameCodeId=" + list[i].code + "&position=sameContrast"+"'>" + list[i].shortname + "</a></td>";
	            }else{
	            	securities = "取消";
	            	 tr += "<td><a style='color:#f57d4b' href='" + $.url.companyListUrl() + "id=" + list[i].id + "&nameCodeId=" + list[i].code + "&position=sameContrast"+"'>" + list[i].shortname + "</a></td>";
	            }
        		tr += "<td>";
        		tr += "<a name='"+list[i].code+"' href='javascript:;' class='same-const'>对比</a>&nbsp;";
        		tr += "<a name='"+list[i].code+"' href='javascript:;' class='same-add'>"+ securities +"</a>";
        		tr += "</td></tr>";
        	});
        	
        	$("#sameIndustry").html(tr);
        	sameAhref();
        	
        }
        
        //同龙头
        var code = $("#codeKeyWord").val();
        var type = $("#comSpecial").find(".hang-active").text();
        if(isNullOrEmpty(type)){
        	type = "";
        }
		$.kf.ajax({
            type: "get",
            url: $.kf.GETTOPSIMILIAR + "?tagName=" + type,
            data: "",
            dataType: "json",
            processResponse: function (data) {
               sameBoss(data);
            }
        });
        function sameBoss(data){
        	$("#sameBoss").html("");
        	var list = data.data;
        	if(isNullOrEmpty(list)){
        		sameNoData($("#sameBoss"));
        		return false;
        	}
        	var tr = "";
        	$(list).each(function(i) {
        		tr += "<tr><td>"+ list[i].code +"</td>";
        		if(list[i].securities == "0"){
        			securities = "关注";
	            	tr += "<td><a href='" + $.url.companyListUrl() + "id=" + list[i].id + "&nameCodeId=" + list[i].code + "&position=sameContrast"+"'>" + list[i].shortname + "</a></td>";
	            }else{
	            	securities = "取消";
	            	tr += "<td><a style='color:#f57d4b' href='" + $.url.companyListUrl() + "id=" + list[i].id + "&nameCodeId=" + list[i].code + "&position=sameContrast"+"'>" + list[i].shortname + "</a></td>";
	            }
        		tr += "<td>";
        		tr += "<a name='"+list[i].code+"' href='javascript:;' class='same-const'>对比</a>&nbsp;";
        		tr += "<a name='"+list[i].code+"' href='javascript:;' class='same-add'>"+ securities +"</a>";
        		tr += "</td></tr>";
        	});
        	
        	$("#sameBoss").html(tr);
        	sameAhref();
        };
        //对比和关注
        function sameAhref(){
        	//对比
        	$(".same-const").on("click",function(){
        		var _name = $(this).attr("name");
        		$("#codeKeyWord").val(_name);
        		iptChange();
        	});
        	
        	//关注
			$(".same-add").click(function(){
				var _url = "";
				var code = $(this).attr("name");
				var param = {
				  		"code":code
				 	 };
				if($(this).text()== "关注"){
		           	 _url = $.kf.ADDCOLLECTIONOPTION;
				}else{
					 _url = $.kf.CANCELCOLLECTIONOPTION;
				}
				$.kf.ajax({
		            type: "post",
		            url: _url,
		            data: param,
		            dataType: "json",
		            processResponse: function(data){
		            	leftTable();
	            	}
			 	})
			})
    
        }
        
	}
	
	return {
		init:function(){
			keyThink();//键盘精灵
			
		}
	}
	
}()



/*
 * 
 * 
 * 
 * 公司对比
 * 
 * 
 * 
 * 
 * 
 * */
var CompContrast = function(){
	var code = "";
	var id = "";
	var initTable = function(){
		var arrObj = [];
		if(isNullOrEmpty(Query.getHash("code")) && isNullOrEmpty(Query.getHash("id"))){
			$(".same-nodata").show();
			$(".same-inComp").hide();
			return false;
		};
		if(!isNullOrEmpty("type") && Query.getHash("type") == "save"){
			$("#comp-save").hide();
		}
		
		if(!isNullOrEmpty(Query.getHash("id"))){
			id = Query.getHash("id");
		};
		
		if(!isNullOrEmpty(Query.getHash("code"))){
			code = Query.getHash("code");
		}
		
		$(".same-nodata").hide();
		$(".same-inComp").show();
		
		
		var _url = $.kf.GETCOMPANYCOPMLIST+"?code="+code+"&rpId="+id;
		
		//加载表格
		$.getTable({
        	url:_url,//url
	    	pageId:$("#samePage"),//分页id
	    	callback:getList,//callback
	    	tbodyId:$("#tableOne"),//tbody的id,
	    	showPageTool:false
        });
        //table
        function getList(data){
        	var arr = data.data.data;
        	var comp = data.data.company;
        	var leng = arr.length;
        	var list = [];
        	var html = "";
        	var tr = '';
       		var newArr = [], tempArr = [];
       		for (var i = 0, j = arr.length - 1; i < j; i++) {
       			//此处label为data返回的要去除的  字段
                if (arr[i].label == arr[i + 1].label) {
                    tempArr.push(arr[i]);
                } else {
                    tempArr.push(arr[i]);
                    newArr.push(tempArr.slice(0));
                    tempArr.length = 0;
                }
            }
            tempArr.push(arr[leng - 1]);
            var lastArr = [];
            lastArr.push(tempArr);
            list = newArr.concat(lastArr);
            $("#tableOne").html("");
            $("#sameTh").html("");
            tr+= '<th scope="col" class="pdl10" style="text-align: left;padding-left:14px !important;">指标</th>';
            for(var i=0;i<comp.length;i++){
            	tr+= "<th>"+comp[i].name+"</th>";
            }
            $("#sameTh").append(tr);
            for(var i=0;i<list.length;i++){
            	html += '<tr>';
				html += '	<td colspan="9">';
				html += '<div class="same-title">';
				for (var g = 0; g < list[i].length; g++) {
                    html += '<span>' + list[i][g].label + '</span>';
                }
				html += '</div>';
				html += '		<table class="same-table" width="100%" border="0" cellspacing="0" cellpadding="0">';
				html += '			<colgroup>';
				html += '				<col width="11%" />';
				html += '				<col width="11%" />';
				html += '				<col width="11%" />';
				html += '				<col width="11%" />';
				html += '				<col width="11%" />';
				html += '				<col width="11%" />';
				html += '				<col width="11%" />';
				html += '				<col width="11%" />';
				html += '				<col width="12%" />';
				html += '			</colgroup>';
				 //循环内容
                for (var j = 0; j < list[i].length; j++) {
                    html += "<tr>";
                    if(list[i][j].type == "机构"){
                    	html += "<td style='text-align: left;color: #5C5C5F;'><a class='basicName' data-name='"+list[i][j].indexName+"'  href='"+ $.url.industryUrl() + "companyName=" + list[i][j].indexName +"'>" + list[i][j].indexName + "</a></td>";
                    }else{
                    	html += "<td style='text-align: left;color: #5C5C5F;'>" + list[i][j].indexName + "</td>";
                    }
                    html += "<td class='same-toRight'>" + list[i][j].value1 + "</td>";
                    html += "<td class='same-toRight'>" + list[i][j].value2 + "</td>";
                    html += "<td class='same-toRight'>" + list[i][j].value3 + "</td>";
                    html += "<td class='same-toRight'>" + list[i][j].value4 + "</td>";
                    html += "<td class='same-toRight'>" + list[i][j].value5 + "</td>";
                    html += "<td class='same-toRight'>" + list[i][j].value6 + "</td>";
                    html += "<td class='same-toRight'>" + list[i][j].value7 + "</td>";
                    html += "<td class='same-toRight'>" + list[i][j].value8 + "</td>";
                    html += "</tr>";
                }
				html += '		</table>';
				html += '	</td>';
				html += '</tr>';
            }
            $("#tableOne").html(html);
            $(".same-title").each(function () {
	            var texts = $(this).find("span").eq(0).text();
	            $(this).html("").append("<span>" + texts + "</span>");
	        });
        }
        compSave();
	};
	var compSave = function(){
		var arr = [];
		if(!isNullOrEmpty("type") && Query.getHash("type") == "save"){
			var typeId = Query.getHash("id");
			
			//已保存过的   导出情况
			$("#comp-out").on("click",function(){
				
				var type = $("#comSpecial").find(".hang-active").attr("name");
		        if(isNullOrEmpty(type)){
		        	type = "";
		        };
		        var typeName = $("#comSpecial").find(".hang-active").text();
		        if(isNullOrEmpty(typeName)){
		        	typeName = "";
		        };
		       var param = {
					'rpId':typeId,
					'export':'export'
				};
				var title = trim($("#comKeyOut").val());
				$('#comModalLoad').modal({backdrop: 'static', keyboard: false});
				$.ajax({
	                type: "post",
	                url: $.kf.SAVECOMPANYCOMPSERVICE,
	                data: param,
	                dataType: "json",
	                success: function (data) {
	                	var t = setTimeout(function(){
	                		$("#comModalLoad").modal("hide");
                			window.location.href = data.data.url;
	                	},1000);
	                }
	            });
		
			});
		}else{
			$("#comp-out").on("click",function(){
				$("#comModalOut").modal("show");
			});
			$("#comp-save").on("click",function(){
				$("#comModalSame").modal("show");
			});
		};
		
		//keyup
		$("#comKeySave,#comKeyOut").on("keyup",function(e){
			var keyCode = e.which;
            if (keyCode == 13) {
                $(".comSureSave").click();
            }
		});
		//保存 和 导出
		$(".comSureSave").on("click",function(){
			$(this).parents(".myModal01").find(".same-pop-error").text("");
			
			var type = $("#comSpecial").find(".hang-active").attr("name");
	        if(isNullOrEmpty(type)){
	        	type = "";
	        };
	        var typeName = $("#comSpecial").find(".hang-active").text();
	        if(isNullOrEmpty(typeName)){
	        	typeName = "";
	        };
	        if(isNullOrEmpty($(this).parents(".myModal01").find("input").val())){
	        	$(this).parents(".myModal01").find(".same-pop-error").text("名称不能为空");
	        	return false;
	        }else{
	        	$(this).parents(".myModal01").find(".same-pop-error").text("");
	        }
	        if($(this).attr("name") == "export"){
	        	//导出
	        	var title = trim($("#comKeyOut").val());
	        	var param = {
					'code':code,
					'rpId':id,
					'title':title,
					'export':'export'
				};
				$(".modal_tips").show();
	        }else{
	        	//保存
	        	var title = trim($("#comKeySave").val());
	        	var param = {
					'code':code,
					'rpId':id,
					'title':title
				};
				$(".modal_tips").hide();
	        }
	        var $this = $(this);
	        $.kf.ajax({
                type: "get",
                url: $.kf.GETREPEATSERVICE+"?title="+title+"&type=1",
                data: "",
                dataType: "json",
                processResponse: function (data) {
                	if(data.code == "10020"){
                		$this.parents(".myModal01").find(".same-pop-error").text("名称不能重复");
                		return false;
                	}else{
                		$this.parents(".myModal01").find(".same-pop-error").text("");
                		$("#comModalSame").modal("hide");
						$("#comModalOut").modal("hide");
						$('#comModalLoad').modal({backdrop: 'static', keyboard: false});
						$.ajax({
			                type: "post",
			                url: $.kf.SAVECOMPANYCOMPSERVICE,
			                data: param,
			                dataType: "json",
			                success: function (data) {
			            		var t = setTimeout(function(){
			            			$("#comModalLoad").modal("hide");
				                	if($this.attr("name") == "export"){
				                		window.location.href = data.data.url;
				                	}else{
				                		window.location.href = $.url.myContrast();
				                	}
			                	},1000);
			                	
			                }
			            });
                	}
                }
            });
			
		})
	}
	
	return {
		init:function(){
			initTable();
		}
	}
	
}()
