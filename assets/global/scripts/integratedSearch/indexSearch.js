



var indexSearchh = function(){
	var comLabel = [];//公司标签
	var comLabelOpen = [];//公司标签
	var rpId = '';//我的筛选ID;
	
	//tab列表
	var tabList = function(){
		$.kf.ajax({
	        type: "get",
	        url: $.kf.GETCONDITION,
	        data: "",
	        dataType: "json",
	        processResponse: function(data){
	        	var tabList = "";
	        	var list = data.data;
	        	$(list).each(function(i){
	        		if(i == 0){
        				tabList += "<li class='active' style='cursor:default'><a href='#tab_"+ i +"' name="+ list[i].secCode +" data-toggle='tab'>"+ list[i].secName + "</a></li>";
	        		}else{
	        			tabList += "<li style='cursor:default'><a href='#tab_"+ i +"' name="+ list[i].secCode +" data-toggle='tab'>"+ list[i].secName + "</a></li>";
	        		}
	        	});
	        	$(".comNewTab").append(tabList);
	        	tabClick();
	        }
	    });
	}
	
	//tab点击指标加载
	
	var tabClick = function(){
		//默认加载常用指标
		var thisId = "#tab_0";
		var secCode = $(".comNewTab").find("a:first").attr("name");
		var _url = $.kf.GETCONDITIONTIMES + "?"+"secCode="+secCode;
		$.kf.ajax({
	        type: "get",
	        url: _url,
	        data: "",
	        dataType: "json",
	        processResponse: function(data){
	        	checkList(data,thisId);
	        }
	    });
		$(".comNewTab").find("a").on("click",function(){
			thisId = $(this).attr("href");
			var thisName = $(this).text();
			secCode = $(this).attr("name");
			if(thisName == "企业标签"){
				_url = $.kf.GETCOMPANYTAG;
			}else{
				_url = $.kf.GETCONDITIONTIMES + "?"+"secCode="+secCode;
			};
			var conTxt = $(thisId).find("ul").text();
			if(isNullOrEmpty(conTxt)){
				$.kf.ajax({
			        type: "get",
			        url: _url,
			        data: "",
			        dataType: "json",
			        processResponse: function(data){
			        	if(thisName == "财务数据"){
			        		financeList(data,thisId);
			        	}else if(thisName == "企业标签"){
			        		labelList(data,thisId);
			        	}else{
			        		checkList(data,thisId);
			        	}
			        }
			    });
			}
		})
	};
	//指标列表
	var checkList = function(data,thisId){
		var tr = "";
		var list = data.data;
		var thisId = thisId;
		$(list).each(function(i){
			var obj = "";
			obj = {
				"indexCode":list[i].indexCode,
				"type":list[i].type,
				"controls":list[i].controls,
				"select":list[i].select
				
			};
			tr += "<li>";
			if($("#"+list[i].indexCode).size()){
				tr +="<label class='"+ list[i].indexCode +"_n' data-obj='"+ JSON.stringify(obj) +"' title='"+ list[i].indexName +"'><span class='checkbox-bg checkbox-active'></span><b>"+ list[i].indexName +"</b></label>"
			}else{
				tr +="<label class='"+ list[i].indexCode +"_n' data-obj='"+ JSON.stringify(obj) +"' title='"+ list[i].indexName +"'><span class='checkbox-bg'></span><b>"+ list[i].indexName +"</b></label>"
			}
			tr += "</li>";
		});
		$(thisId).find("ul").html("");
		$(thisId).find("ul").append(tr);
		checkEvent();
	};
	//企业标签列表
	var labelList = function(data,thisId){
		var tr = "";
		var tr2 = "";
		var list = data.data;
		var thisId = thisId;
		$(list).each(function(i){
			if(i<40){
				if($("#zb0139").attr("name") == list[i].id){
					comLabel +="<li class='myLabelChild'>";
					comLabel +="<a class='"+list[i].id+" active' href='javascript:void(0)' data-letter='"+ list[i].letter +"' name='"+ list[i].id +"'>"+ list[i].name +"</a>";
					comLabel +="</li>";
				}else{
					comLabel +="<li class='myLabelChild'>";
					comLabel +="<a class='"+list[i].id+"' href='javascript:void(0)' data-letter='"+ list[i].letter +"' name='"+ list[i].id +"'>"+ list[i].name +"</a>";
					comLabel +="</li>";
				}
			}else{
				if($("#zb0139").attr("name") == list[i].id){
					comLabelOpen +="<li class='myLabelChild'>";
					comLabelOpen +="<a class='"+list[i].id+" active' href='javascript:void(0)' data-letter='"+ list[i].letter +"' name='"+ list[i].id +"'>"+ list[i].name +"</a>";
					comLabelOpen +="</li>";
				}else{
					comLabelOpen +="<li class='myLabelChild'>";
					comLabelOpen +="<a class='"+list[i].id+"' href='javascript:void(0)' data-letter='"+ list[i].letter +"' name='"+ list[i].id +"'>"+ list[i].name +"</a>";
					comLabelOpen +="</li>";
				}
			}
		});
		$(thisId).find(".divOpt").append(comLabel);
		$(thisId).find(".divOpt").append(comLabelOpen);
		labelClick();
	};
	//财务数据指标列表
	var financeList = function(data,thisId){
		var tr = "";
		var list = data.data;
		var thisId = thisId;
		$(list).each(function(i){
			var tr2 = "";
			if(i == 0){
				tr +="<li class='active'><a href='#sTap_0' name='"+ list[i].indexCode +"' data-toggle='tab'>"+ list[i].indexName +"</a></li>"
				$(list[i].level).each(function(j){
					var obj = "";
					obj = {
						"indexCode":list[i].level[j].indexCode,
						"type":list[i].level[j].type,
						"controls":list[i].level[j].controls,
						"select":list[i].level[j].select
					};
					tr2 +="<li>";
					if($("#"+list[i].level[j].indexCode).size()){
						tr2 +="<label class='"+ list[i].level[j].indexCode +"_n' data-obj='"+ JSON.stringify(obj) +"' title='"+ list[i].level[j].indexName +"'><span class='checkbox-bg checkbox-active'></span><b>"+ list[i].level[j].indexName +"</b></label>";
					}else{
						tr2 +="<label class='"+ list[i].level[j].indexCode +"_n' data-obj='"+ JSON.stringify(obj) +"' title='"+ list[i].level[j].indexName +"'><span class='checkbox-bg'></span><b>"+ list[i].level[j].indexName +"</b></label>";
					}
					tr2 +="</li>";
				});
				$("#sTap_0").append(tr2);
			}else{
				tr +="<li><a href='#sTap_"+ i +"' name='"+ list[i].indexCode +"' data-toggle='tab'>"+ list[i].indexName +"</a></li>";
				$(list[i].level).each(function(j){
					var obj = "";
					obj = {
						"indexCode":list[i].level[j].indexCode,
						"type":list[i].level[j].type,
						"controls":list[i].level[j].controls,
						"select":list[i].level[j].select
					};
					tr2 +="<li>";
					tr2 +="<label class='"+ list[i].level[j].indexCode +"_n' data-obj='"+ JSON.stringify(obj) +"' title='"+ list[i].level[j].indexName +"'><span class='checkbox-bg'></span><b>"+ list[i].level[j].indexName +"</b></label>";
					tr2 +="</li>";
				});
				$("#sTap_"+ i).append(tr2);
			}
		});
		$(thisId).find(".titleList").append(tr);
		checkEvent();
	}
	
	//指标checkbox点击事件
	var checkEvent = function(){
		$(".cheList").find("label").off().on("click",function(){
			if($("#tab_6").hasClass("active")){
				var myObjFirst = JSON.parse($(".cheList").find(".zb0035_n").attr("data-obj"));
				var myTypeFirst = '';
			}
			if($("#tab_7").hasClass("active")){
				var myObjHq = JSON.parse($(".cheList").find(".zb0181_n").attr("data-obj"));
				var myTypeHq = '';
			}
			
			var myObj = JSON.parse($(this).attr("data-obj"));
	    	var myText = $(this).text();
	    	var myType = '';
	    	var myTit = '';
	    	//checkbox
	    	if($(this).find("span").hasClass("checkbox-active")){
	    		$(this).find("span").removeClass("checkbox-active");
	    		$("."+$(this).attr("class")).find("span").removeClass("checkbox-active");
	    		if($(this).attr("class") == "zb0035_n"){
		    		$("#zb0035").remove();
	    		}else if($(this).attr("class") == "zb0181_n"){
	    			$("#zb0181").remove();
	    		}else{
	    			$("#"+myObj.indexCode).remove();
	    		}
	    		
	    		if(!$(".aList2").find("li").size()){
	    			$(".typeNoData").show();
	    		};
	    	}else{
	    		$(".typeNoData").hide();
	    		$(this).find("span").addClass("checkbox-active");
	    		$("."+$(this).attr("class")).find("span").addClass("checkbox-active");
		    	$(myObj.type).each(function(i){
		    		myType += mySelect(myObj.type[i],i,myObj.controls[i],"",myObj.select,myObj.indexCode);
		    	});
		    	
		    	//财务日期dom
		    	if($("#tab_6").hasClass("active")){
					myTypeFirst = mySelect(myObjFirst.type[0],0,myObjFirst.controls[0],"",myObjFirst.select,myObjFirst.indexCode);
				}
		    	//行情日期dom
		    	if($("#tab_7").hasClass("active")){
					myTypeHq = mySelect(myObjHq.type[0],0,myObjHq.controls[0],"",myObjHq.select,myObjHq.indexCode);
				}
		    	
		    	if($(this).parents(".cheList").hasClass("moneyDiv")){
		    		if($(this).attr("class") == "zb0035_n"){
		    			myTit = '<li class="typeNameLi" id="' + myObj.indexCode + '"><span class="typeTilte">' + myText + '</span>' + myType + '<span class="shutLiLabel"></span></li>';
		    		}else{
		    			if(!$(".zb0035_n").children("span").hasClass("checkbox-active")){
		    				$(".zb0035_n").children("span").addClass("checkbox-active");
		    				myTit = '<li class="typeNameLi" id="' + myObjFirst.indexCode + '"><span class="typeTilte">' + $(".zb0035_n").find("b").text() + '</span>' + myTypeFirst + '<span class="shutLiLabel"></span></li>';
		    			}
		    			myType = '<li class="typeNameLi" id="' + myObj.indexCode + '"><span class="typeTilte">' + myText + '</span>' + myType + '<span class="shutLiLabel"></span></li>';
		    		}
		    		
		    	}else if($(this).parents(".active").attr("id") == "tab_7"){
		    		
		    		if($(this).attr("class") == "zb0181_n"){
		    			myTit = '<li class="typeNameLi" id="' + myObj.indexCode + '"><span class="typeTilte">' + myText + '</span>' + myType + '<span class="shutLiLabel"></span></li>';
		    		}else{
		    			if(!$(".zb0181_n").children("span").hasClass("checkbox-active")){
		    				$(".zb0181_n").children("span").addClass("checkbox-active");
		    				myTit = '<li class="typeNameLi" id="' + myObjHq.indexCode + '"><span class="typeTilte">' + $(".zb0181_n").find("b").text() + '</span>' + myTypeHq + '<span class="shutLiLabel"></span></li>';
		    			}
		    			myType = '<li class="typeNameLi" id="' + myObj.indexCode + '"><span class="typeTilte">' + myText + '</span>' + myType + '<span class="shutLiLabel"></span></li>';
		    		}
		    		
		    	}else{
		    		myType = '<li class="typeNameLi" id="' + myObj.indexCode + '"><span class="typeTilte">' + myText + '</span>' + myType + '<span class="shutLiLabel"></span></li>';
		    	}
		    	$(".titlDate").prepend(myTit);
		    	$(".conDate").prepend(myType);
				$(".conDate").children("div").hide();
				
		    	singleThink()
		    	if($(this).attr("class") == "zb0002_n"){
		    		specialSelect();
		    	}
		    	closeLine();
	    	};
	    	$("#datetimeStart").find("input[type=text]").val(getNowtime().substr(0,10));
	    	$("#datetimeStart").find("input[type=text],button").prop("disabled",true);
	    	var liLenn = $(".aList2 li").length;			
			if(liLenn == 0){
				$("#saveName,#exportExcel,#clearAll").css({"background":"#cccccc"}).attr("disabled","disabled");
			}
	    	Query.setHash({"page":1});
	    	//组合数组上送
	    	connectParam(eachLiData());
		});
	};
	
	//标签点击
	var labelClick = function(){
		//标签
	    $(".myLabelChild a").off().on("click",function(){
	    	$(".myLabelChild").find("a").removeClass("active");
	    	$(this).addClass("active");
	    	$(".typeNoData").hide();
	    	$("#zb0139").remove();
	    	myType = '<li class="typeNameLi" id="zb0139" name="'+$(this).attr("name")+'"><span class="typeTilte">企业标签</span>' + mySelect("label","","",$(this).text(),"","zb0139") + '<span class="shutLiLabel"></span></li>';
	    	$(".conDate").prepend(myType);
	    	closeLine();
	    	$("#datetimeStart").find("input[type=text]").val(getNowtime().substr(0,10));
	    	$("#datetimeStart").find("input[type=text],button").prop("disabled",true);
	    	Query.setHash({"page":1});
	    	var liLenn = $(".aList2 li").length;			
			if(liLenn == 0){
				$("#saveName,#exportExcel,#clearAll").css({"background":"#cccccc"}).attr("disabled","disabled");
			}
	    	//组合数组上送
	    	connectParam(eachLiData());
	    });
	};
	
	//上送数据
	var connectParam = function(param,type){
		//$("#saveName").css({"background":"#f28d5d"}).attr("disabled",false);
//		$(".typeTotalPage").hide();
		if(type == "date"){//日期
			var date = $("#tradingStart").val()
			var obj = {
	    		controls:JSON.stringify(param),
	    		date:date,
	    		pickId:rpId
	    	};
		}else if(type == "chgType"){//状态
			var chgType = $(".menu3").text();
			chgType = $.trim(chgType);
	        if(chgType == "状态"||chgType == "全部"){
	        	chgType = "";
	        }else if (chgType == "新增") {
	            chgType = "add";
	        } else if (chgType == "剔除") {
	            chgType = "reduce";
	        } else if (chgType == "不变") {
	            chgType = "constant";
	        };
			var obj = {
	    		controls:JSON.stringify(param),
	    		chgType:chgType,
	    		pickId:rpId
	    	};
		}else{
			var obj = {
	    		controls:JSON.stringify(param)
	    	};
		}
    	//console.log(obj);
    	$("#fixedTable").html("");
    	$("#searchList2Header").html("");
        $("#searchList2").html("");
    	var lastPage = Query.getHash("page");
    	var _url = $.kf.GETSEARCHINFO;
    	$.getTable({
   	 		url:_url,
	    	pageId:$("#pageTool"),
	    	method:"post",
	    	param:obj,
	    	callback:getList,
	    	currentPage:lastPage,
	    	tbodyId:$("#searchList")
   	 	});
	};
	//表格
	var getList = function(data){
		var list = data.data;
		var list2 = data.data;
        var tr = "";
        var tr2 = "";
        var tr3 = "";
        var cmpr = "";
        var securities = "";
        var thArray = [];//保存thead
        $("#fixedTable").html("");
    	$("#searchList2Header").html("");
        $("#searchList2").html("");
        if(!isNullOrEmpty(Query.getHash("pageOut"))){
			$("#menuItemCol").show();
			$("#menuItemState").show();
        }else{
        	$("#menuItemCol").hide();
			$("#menuItemState").hide();
        }
        //每个list的key都相同
        for (var key in list2[0]){
    		thArray.push(key);
    	};
		$(list).each(function (i) {
	        tr += "<tr>";
	        tr += "<td>" + list[i].code + "</td>";
	        if(!isNullOrEmpty(Query.getHash("pageOut"))){
            	//加问号的模式，以后开发
            	/*if(list[i].chgType == "新增" || list[i].chgType == "剔除"){
            		tr += "<td><p style='position:relative;'>" + list[i].chgType + "<span class='searSpan' name='' set-name=''></span></p></td>";
            	}else{
            		tr += "<td>" + list[i].chgType + "</td>";
            	}*/
            	if(list[i].chgType == ""){
            		tr += "<td>不变</td>";
            	}else if(list[i].chgType == "add"){
            		tr += "<td>新增</td>";
            	}else if(list[i].chgType == "reduce"){
            		tr += "<td>剔除</td>";
            	}
            	
            }
	        if(list[i].securities == "0"){
	        	 tr += "<td><a href='" + $.url.companyListUrl() + "id=" + list[i].id + "&nameCodeId=" + list[i].codeNum + "&position=companyList"+"'>" + list[i].shortname + "</a></td>";
	        }else{
	        	 tr += "<td><a style='color:#f57d4b' href='" + $.url.companyListUrl() + "id=" + list[i].id + "&nameCodeId=" + list[i].codeNum + "&position=companyList"+"'>" + list[i].shortname + "</a></td>";
	        }
	        tr += "</tr>";
	    });	
	    $("#fixedTable").append(tr);
		
		
		
		//筛选列表head
//		console.log(thArray)
		thArray.splice($.inArray('masterId',thArray),1);
		thArray.splice(0,6);
		$(thArray).each(function(i){
			tr3 += "<th>"+ thArray[i] +"</th>"
		})
		$("#searchList2Header").append(tr3);
		
		//筛选列表
		$(list).each(function (i) {
	    	if(list[i].securities == "1"){
				securities = "取消";
			}else{
				securities = "关注";
			};
	        tr2 += "<tr>";
				//拼接TD
	        	$(thArray).each(function(j){
		            if(isChinese(thArray[j])){
		            	if(thArray[j] == "操作"){
		            		//对比和关注
					        if(list[i].cmpr == "1"){
				            	tr2 += "<td><a class='comOptional' name='" +list[i].code+ "'>" + securities + "</a></td>";
				            }else{
				            	tr2 += "<td><a href='javascript:;' class='comOptional' name='" +list[i].code+ "'>" + securities + "</a></td>";
				            }	
		            	}else{
		            		if(typeof list[i][thArray[j]] == "object"){
		            			if(!isNullOrEmpty(list[i][thArray[j]][1])){
		            				tr2 += "<td><a href='"+ list[i][thArray[j]][1] +"'>" + list[i][thArray[j]][0] + "</a></td>";
		            			}else if(list[i][thArray[j]][1].indexOf(".") > 0){
		            				tr2 += "<td class='queryWidthCom'>" + list[i][thArray[j]][0] + "</td>";
		            			}else{
		            				tr2 += "<td>" + list[i][thArray[j]][0] + "</td>";
		            			}
		            		}else{
		            			tr2 += "<td>" + list[i][thArray[j]] + "</td>";
		            		}
		            	}

		    		}
	        	})
        	tr += "</tr>";
	    });
	    $("#searchList2").append(tr2);
		
		//右表格父元素宽度
	    $('.tableBox2').width($(".boxTable").width() - 230);

         //自选功能
        comOptional();
        tableSelect();
	};
	 //加入自选功能
    var comOptional = function(){
		$(".comOptional").off().on("click",function(){
			$("#fixedTable").html("");
	        $("#searchList2Header").html("");
	        $("#searchList2").html("");
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
	            	connectParam(eachLiData());
            	}
		 	})
		});
		//帮助弹窗
        $("#searchList .searSpan").click(function(e){
        	e.stopPropagation();
        	var thisName = $(this).attr("name");
        	var thisSetName = $(this).attr("set-name");
        	$("#myModal04s .modal-title").html(thisName);
        	$("#myModal04s .modal-body p").html(thisSetName);
			$("#myModal04s").modal("show")
        })
    }
	//修改或者删除我的筛选项
	var closeLine = function(){
		//加载日期控件
		var dataPicker = $(".date-picker").datepicker({
	        format: "yyyy-mm-dd",
	        autoclose: true,
	        minView: "month",
	        maxView: "decade",
	        todayBtn: "linked",
	        language: 'zh-CN',
	        todayHighlight: true,
	        pickerPosition: "bottom-left",
	        endDate:new Date()
	    });
	    //$('.date-picker').datepicker('setEndDate','2017-08-11');
	    //删除li
		$(".shutLiLabel").off().on("click",function(){
			$("#datetimeStart").find("input[type=text]").val(getNowtime().substr(0,10));
	    	$("#datetimeStart").find("input[type=text],button").prop("disabled",true);
	    	Query.setHash({"page":1});
			$(this).parent("li").remove();
			//判断是否是企业标签
			if($(this).parent("li").attr("id") == "zb0139"){
				$(".myLabelChild").find('.active').removeClass("active");
			}else{
				$("."+$(this).parent().attr("id")+"_n").find('span').removeClass("checkbox-active");
			}
			//展示暂无筛选
			if(!$(".aList2").find("li").size()){
				$(".typeNoData").show();
			};
			connectParam(eachLiData());
			//判断按钮是否可点
			$("#saveName,#exportExcel,#clearAll").css({"background":"#f28d5d"}).attr("disabled",false);
			var liLenn = $(".aList2 li").length;			
			if(liLenn == 0){
				$("#saveName,#exportExcel,#clearAll").css({"background":"#cccccc"}).attr("disabled","disabled");
			}
		});
		//删除全部
		$("#clearAll").off().on("click",function(){
			$("#datetimeStart").find("input[type=text]").val(getNowtime().substr(0,10));
	    	$("#datetimeStart").find("input[type=text],button").prop("disabled",true);
			Query.setHash({
				"rp_id":"",
				"selectName":"",
				"createDate":"",
				"page":1
			});
			$(".typeNoData").show();
			$(".aList2").find("li").remove();
			$(".myLabelChild").find('.active').removeClass("active");
			$(".cheList").find("label").find('span').removeClass("checkbox-active");
			connectParam(eachLiData());
			$("#saveName,#exportExcel,#clearAll").css({"background":"#cccccc"}).attr("disabled","disabled");
		});
		//日历选项修改
		dataPicker.off("changeDate").on("changeDate",function(){
			var start_time = $(this).parents(".typeNameLi").find(".dateIpt1").val();
        	var stop_time = $(this).parents(".typeNameLi").find(".dateIpt2").val();
        	if (compareDate(start_time, stop_time)) {
        		if($(this).attr("id") == "datetimeStart"){
					connectParam(eachLiData(),"date");
				}else{
					$("#datetimeStart").find("input[type=text]").val(getNowtime().substr(0,10));
		    		$("#datetimeStart").find("input[type=text],button").prop("disabled",true);
		    	Query.setHash({"page":1});
					connectParam(eachLiData());
				}
        	}
		});
		//2选1的 radio切换
		$(".typeDetail input[type=radio]").off("click").on("click",function(){
			$("#datetimeStart").find("input[type=text]").val(getNowtime().substr(0,10));
	    	$("#datetimeStart").find("input[type=text],button").prop("disabled",true);
	    	Query.setHash({"page":1});
			//切换disabled
			$(this).parent(".radioWrap").find("input[type=text],button").prop("disabled",false);
			$(this).attr("data-check","true");
			$(this).parent(".radioWrap").siblings(".radioWrap").find("input[type=text],button").prop("disabled",true);
			$(this).parent(".radioWrap").siblings(".radioWrap").find("input[type=radio]").attr("data-check","false");
			//存数组
	    	connectParam(eachLiData());
		});
		
		//input选项修改
		$(".typeDetail .changeText").off("change.type").on("change.type",function(){
			$("#datetimeStart").find("input[type=text]").val(getNowtime().substr(0,10));
	    	$("#datetimeStart").find("input[type=text],button").prop("disabled",true);
	    	Query.setHash({"page":1});
			//地区联动
	    	if($(this).parents(".typeNameLi").attr("id") == "zb0002" && $(this).parent(".typeDetail").attr("name") == "0"){
	    		var cityOption = "";
	    		var $_this = $(this);
				$.ajax({
	                type: "get",
	                url: $.kf.GETCONDITIONTIMESINFO+"?indexCode=zb0002&keyword="+$_this.find("option:selected").val(),
	                data: "",
	                dataType: "json",
	                success: function (data) {
	                	var city = data.data;
	                  	$(city).each(function(i) {
							cityOption += "<option>"+city[i]+"</option>";
						});
						$_this.parent(".typeDetail").siblings(".typeDetail").find("option").remove();
						$_this.parent(".typeDetail").siblings(".typeDetail").find("select").html(cityOption);
						connectParam(eachLiData());
	                }
	            });
	    	}else if($(this).hasClass("singleInputThink")){
	    		var t = setTimeout(function(){
	    			connectParam(eachLiData());
	    		},500);
	    	}else{
	    		var crrentParents = $(this).parents(".typeNameLi");
	    		var crrentCon = $(this).parents(".typeDetail").siblings("b");
	    		var crrentParent = $(this).parent(".typeMoney").find("input");
	    		var crrentOne = crrentParent.eq(0).val();
	    		var crrentTwo = crrentParent.eq(1).val();
	    		if(parseInt(crrentOne*10000) > parseInt(crrentTwo*10000)){
	    			crrentCon.remove();
	    			crrentParents.append("<b class='pieceError'>区间范围有误</b>")
	    		}else{
	    			crrentCon.remove();
	    			connectParam(eachLiData());
	    		}
	    	}
		});
		
	};
	//特殊处理的select,此处指省市联动
	var specialSelect = function(name,name2){
		var _name = name;
		var _name2 = name2;
		$("#zb0002").find("select").each(function(){
			if($(this).parent(".typeDetail").attr("name") == "0"){
				var $_this = $(this);
				$.ajax({
	                type: "get",
	                url: $.kf.GETCONDITIONTIMESINFO+"?indexCode=zb0002",
	                data: "",
	                dataType: "json",
	                success: function (data) {
	                	var data = data.data;
	                  	optionList(data,$_this,_name,_name2);
	                }
	            });
			}
		});
	};
	//加载option
	var optionList = function(data,that,name,name2){
		var area = data;
		var name = name;
		var name2 = name2;
		var areaOption = "";
		$(area).each(function(i) {
			if(!isNullOrEmpty(name) && area[i] == name){
				areaOption += "<option selected>"+name+"</option>";
				var cityOption = "";
				$.ajax({
	                type: "get",
	                url: $.kf.GETCONDITIONTIMESINFO+"?indexCode=zb0002&keyword="+name,
	                data: "",
	                dataType: "json",
	                success: function (data) {
	                	var city = data.data;
	                  	$(city).each(function(i) {
	                  		if(name2 == city[i]){
	                  			cityOption += "<option selected>"+name2+"</option>";
	                  		}else{
	                  			cityOption += "<option>"+city[i]+"</option>";
	                  		}
							
						});
						that.parent(".typeDetail").siblings(".typeDetail").find("option").remove();
						that.parent(".typeDetail").siblings(".typeDetail").find("select").html(cityOption);
	                }
	            });
			}else{
				areaOption += "<option>"+area[i]+"</option>";
			}
		});
		that.html(areaOption);
	};
	//th下拉框
	var tableSelect = function(){
		new Select($("#comSelect3"),{}).init();
		//状态
		$("#comSelect3").find("li").on("click",function(){
			Query.setHash({"page":1});
			$("#searchList").html("");
			connectParam(eachLiData(),'chgType');
			
		});
	}
	/*筛选DOM操作*/
	var mySelect = function(type,i,defaultValue,labelText,selectArr,id){//类型,num,类型默认值,标签text,select数据,id
		var html = "";
		var options = "";
		var optionsArr = [];
		if(
			type == "areaSelect"
			|| type == "categorySelect" 
			|| type == "currencySelect" 
			|| type == "logicSelect" 
			|| type == "findateSelect" 
			|| type == "dataUnitSelect" 
			|| type == "containSelect"
		)
		{
			type = "select";
			$.each(selectArr,function(key,value){
				//除省市之外的一行多个select的情况
				if($.isArray(value)){
					optionsArr = selectArr;
				}else{
					//一行单个select
					/*if(value == defaultValue){
						console.log(defaultValue);
						options += '<option selected>' + value + '</option>';
					}else{
						options += '<option>' + value + '</option>';
					}*/
					options = '<option>' + defaultValue + '</option>';
				}
			})
			/*options = isNullOrEmpty(options1) ? options2 : options1;*/
		};
		var defaultValue = isNullOrEmpty(defaultValue) ? "" : defaultValue;
		if(type == "date2Select" || type == "single2Input"){
			var defaultValue1 = isNullOrEmpty(defaultValue[0]) ? "" : defaultValue[0];
			var defaultValue2 = isNullOrEmpty(defaultValue[1]) ? "" : defaultValue[1];
		}
		if(type == "dateRadioSelect"){
			var defaultValue1 = isNullOrEmpty(defaultValue[0]) ? "" : defaultValue[0];
			var defaultValue2 = isNullOrEmpty(defaultValue[1]) ? "" : defaultValue[1];
			var defaultValue3 = isNullOrEmpty(defaultValue[2]) ? "" : defaultValue[2];
			var defaultValue4 = isNullOrEmpty(defaultValue[3]) ? "" : defaultValue[3];
			var defaultValue5 = isNullOrEmpty(defaultValue[4]) ? "" : defaultValue[4];
		}
		//带日历控件的分三个模块，其余的分别组合使用
		switch (type){
			case "singleInput":
				html +=			'<div name="'+i+'" class="typeDetail typeInput">';
				html +=				'<input class="changeText" type="text" name="" id="" value="'+defaultValue+'" />';
				html +=			'</div>';
				break;
			case "singleInputThink":
				html +=			'<div name="'+i+'" class="typeDetail typeInput" style="position: relative;">';
				html +=				'<input style="text-align:left;padding:0 3px;" class="changeText singleInputThink" type="text" name="" id="" value="'+defaultValue+'" />';
				html +=				'<div style="left:0;min-width:140px;" class="codeList codeListSame singleSearch"><ul class="singleThink"></ul></div>';
				html +=			'</div>';
				break;
			case "label":
				html +=			'<div name="'+i+'" class="typeDetail typeText">';
				html +=				'<div name="label" class="labelText">'+ labelText +'</div>';
				html +=			'</div>';
				break;
			case "singleText":
				html +=			'<div name="'+i+'" class="typeDetail typeText">';
				html +=				'<div class="labelText">'+ defaultValue +'</div>';
				html +=			'</div>';
				break;
			case "select":
				//除省市联动之外的一行多个select框的情况
				if(!isNullOrEmpty(optionsArr)){
					$(optionsArr[i]).each(function(j){
						if(optionsArr[i][j] == defaultValue){
							options += '<option selected>' + optionsArr[i][j] + '</option>';
						}else{
							options += '<option>' + optionsArr[i][j] + '</option>';
						}
					})
				}
				html +=			'<div name="'+i+'" class="typeDetail typeSelect">';
				html +=				'<select name="" class="changeText changeSelect">' + options + '</select>';
				html +=			'</div>';
				break;
			case "single2Input":	
				html +=			'<div name="'+i+'" class="typeDetail typeInput typeMoney single2Input">';
				html +=				'<input name="iptOne" class="changeText changeTextDouble" type="text" name="" id="" value="'+defaultValue1+'" />';
				html +=				'<div class="arrive">至</div>';
				html +=				'<input name="iptTwo"  class="changeText changeTextDouble" type="text" name="" id="" value="'+defaultValue2+'" />';
				html +=			'</div>';
				break;
			case "dateSelect":
				html +=			'<div name="'+i+'" class="typeDetail typeInput typeInputAndDate">';
				html +=				'<div class="datePar">';
				html +=					'<div name="dateOne" class="input-group date date-picker" data-date-viewmode="years" data-date-format="dd/mm/yyyy">';
				html +=						'<input type="text" class="form-control form-filter input-sm date-ipt" readonly="" name="product_created_from" value="'+defaultValue+'">';
				html +=						'<span class="input-group-btn">';
				html +=							'<button  class="btn btn-sm btn-icon-btn" type="button"><i class="fa fa-calendar"></i></button>';
				html +=						'</span>';
				html +=					'</div>';
				html +=				'</div>';
				html +=			'</div>';
				break;
			case "date2Select":
				html +=			'<div name="'+i+'" class="typeDetail typeInput typeInputAndDate date2Select">';
				html +=				'<div class="datePar">';
				html +=					'<div name="dateOne" class="input-group date date-picker " data-date-viewmode="years" data-date-format="dd/mm/yyyy">';
				html +=						'<input type="text" class="form-control form-filter input-sm date-ipt" readonly="" name="product_created_from" value="'+defaultValue1+'">';
				html +=						'<span class="input-group-btn">';
				html +=							'<button  class="btn btn-sm btn-icon-btn" type="button"><i class="fa fa-calendar"></i></button>';
				html +=						'</span>';
				html +=					'</div>';
				html +=				'</div>';
				html +=				'<div class="arrive">至</div>';
				html +=				'<div class="select_box2_father  datePar">';
				html +=					'<div name="dateTwo" class="input-group date date-picker " data-date-format="dd/mm/yyyy">';
				html +=						'<input type="text" class="form-control form-filter input-sm date-ipt" readonly="" name="product_created_from" value="'+defaultValue2+'">';
				html +=						'<span class="input-group-btn">';
				html +=							'<button class="btn btn-sm  btn-icon-btn" type="button"><i class="fa fa-calendar"></i></button>';
				html +=						'</span>';
				html +=					'</div>';
				html +=				'</div>';
				html +=			'</div>';
				break;
			case "dateRadioSelect":
				html +=			'<div name="'+i+'" class="typeDetail typeInput typeInputAndDate dateRadioSelect">';
				html +=				'<div class="radioWrap">';
				html +=				'<input class="radioOne" type="radio" checked="checked" name="'+id+'" id="" value="" data-check="'+defaultValue1+'" />';
				html +=				'<span class="remoteText">近</span>';
				html +=				'<input class="remoteDays changeText" type="text" name="" id="" value="'+defaultValue2+'" />';
				html +=				'<span class="remoteText remoteTextDay">年</span>';
				html +=				'</div>';
				html +=				'<div class="radioWrap">';
				html +=				'<input  class="radioTwo"type="radio" name="'+id+'" id="" value=""  data-check="'+defaultValue3+'"/>';
				html +=				'<div class="datePar">';
				html +=					'<div name="dateOne" class="input-group date date-picker" data-date-viewmode="years" data-date-format="dd/mm/yyyy">';
				html +=						'<input type="text" class="form-control form-filter input-sm date-ipt dateIpt1" disabled readonly="" name="product_created_from" value="'+defaultValue4+'">';
				html +=						'<span class="input-group-btn">';
				html +=							'<button disabled  class="btn btn-sm btn-icon-btn" type="button"><i class="fa fa-calendar"></i></button>';
				html +=						'</span>';
				html +=					'</div>';
				html +=				'</div>';
				html +=				'<div class="arrive">至</div>';
				html +=				'<div class="select_box2_father  datePar">';
				html +=					'<div name="dateTwo" class="input-group date date-picker" data-date-format="dd/mm/yyyy">';
				html +=						'<input type="text"  class="form-control form-filter input-sm date-ipt dateIpt2" disabled readonly="" name="product_created_from" value="'+defaultValue5+'">';
				html +=						'<span class="input-group-btn">';
				html +=							'<button disabled class="btn btn-sm  btn-icon-btn" type="button"><i class="fa fa-calendar"></i></button>';
				html +=						'</span>';
				html +=					'</div>';
				html +=				'</div>';
				html +=				'</div>';
				html +=			'</div>';
				break;
			default:
				break;
		}
		return html;
	};
	
	//企业标签滚动展开收起功能
	$(".showDiv").on('click',function(){
		if($(this).attr("name") == "1"){
			$(".divOpt").slimScroll({
				height: '170px',
				position: 'right',
				color: '#999999',
				size: '10px', //组件宽度
				alwaysVisible: true,
				disableFadeOut: false
			});
			$(".divOpt").append(comLabelOpen);
			//$(".divChild").show();
			$('.myLabelChild').find("a").removeClass("active");
	    	$("."+$("#zb0139").attr("name")).addClass("active");
			$(".divTit").show();
			$(this).text("收起▲");
			$(this).attr("name","0");
		}else{
			$(".divOpt").slimScroll({
				height: '90px',
				destroy:"destroy"
			});
			//$(".divOpt").html("").append(comLabel);
			//$(".divChild").hide();
			$(".divTit").hide();
			$(this).text("展开▼");
			$(this).attr("name","1");
			$(".divTit").find("a").eq(0).click();
		}
		labelClick();
	});
	//字母筛选
	$(".divTit").find("a").on("click",function(){
		var thisLe = $(this).text();
		$(this).addClass("active").siblings("a").removeClass("active");
		if(thisLe !== "全部"){
			$(".divOpt").find("a").parent().hide();
			if(thisLe == "其他"){
				$(".divOpt").find("a").each(function(){
					var tabNum = $(this).attr("data-letter").toUpperCase().charCodeAt(0);
					if(tabNum<65||tabNum>90){
						$(this).parent().show();
					}
				})
			}else{
				$(".divOpt").find("a").each(function(){
					var tabLe = $(this).attr("data-letter").toUpperCase();
					if(tabLe == thisLe){
						$(this).parent().show();
					}
				})
			}
		}else{
			$(".divOpt").find("a").parent().show();
		}
	})

	//保存//导出Excel
	var liLen = $(".aList2 li").length;
	$(".tab-pane").on("click",function(){
		var eachLi = $(".aList2 li").length;
		if(liLen != eachLi){
			$("#saveName,#exportExcel,#clearAll").css({"background":"#f28d5d"}).attr("disabled",false);
		}
	})
	
	//是否另存为弹窗
	function otherName(){
		var liLen = $(".aList2 li").length;
		$("#saveName").click(function(){
			var crrentLi = $(".aList2 li").length;
			if(crrentLi != 0){ //需添加是否有修改
				if(!isNullOrEmpty(Query.getHash("pageOut"))){
					$("#myModal03").modal('show');
					$("#otherSaveCase").on('click',function(){
						var selectName = Query.getHash("selectName");
						$(".mySelectName2").val(selectName)
						$("#myModal03").modal('hide');
						$("#myModal02").modal('show');
					})
				}else{
					$("#myModal02").modal('show');
				}
			}else{
				//...
			}
		})
	}
	
	//保存点击
	$("#saveCase2,#saveCase3,#exportExcel").off().click(function(){
		var param = eachLiData();
		var inputVal2 = $("#mySelectName").val();
		var inputVal = $(".mySelectName2").val();
		rpId = Query.getHash("rp_id");
		var _this = $(this);
		if($(this).attr("id") == "saveCase2"){
			if(isNullOrEmpty(inputVal)){
				$(".saveInput").text("方案名称不能为空");
				return false;
			}
			var user = {
				"pickName":inputVal
			}
			$.kf.ajax({ //判断名字是否重复
		        type: "post",
		        url: $.kf.GETREPEAT,
		        data: user,
		        dataType: "json",
		        processResponse: function(data){
		        	if(data.code == "100000"){
		        		$(".saveInput").text(data.message);
		        	}else{
		        		param = {
							"controls":JSON.stringify(param),
							"type":"save",
							"pickName":inputVal
						}
		        		$('#myModalSave').modal({backdrop: 'static', keyboard: false});
						sendDate(param,_this);
		        	}
		        }
		    });
			
		}else if($(this).attr("id") == "saveCase3"){
			$('#myModalSave').modal({backdrop: 'static', keyboard: false});
			param = {
				"controls":JSON.stringify(param),
				"type":"save",
				"pickId":rpId,
				"pickName":inputVal2
			}
			sendDate(param,_this);
		}else if($(this).attr("id") == "exportExcel"){
			$("#myModal04").modal({backdrop: 'static', keyboard: false});
			param = {
				"controls":JSON.stringify(param),
				"type":"save",
				"pickId":rpId,
				"pickName":inputVal2
			}
			sendDate(param,_this);
		}
	});
	
	//数据上送
	function sendDate(param,_this){
		$("#myModal02").modal('hide');
		$("#myModal03").modal('hide');
		$.kf.ajax({ //保存
	        type: "post",
	        url: $.kf.ADDCONDITION,
	        data: param,
	        dataType: "json",
	        processResponse: function(data){
	        	var inputVal2 = $("#mySelectName").val();
	        	var exportEven = {
	        		"pickName":inputVal2,
	        		"pickId":data.data.pickId,
	        		"type":"export"
	        	}
	        	if(_this.attr("id") == "exportExcel"){
	        		$.kf.ajax({ //导出
				        type: "post",
				        url: $.kf.ADDCONDITION,
				        data: exportEven,
				        dataType: "json",
				        processResponse: function(data){
				        	var t = setTimeout(function(){
		                		$("#myModal04").modal("hide");
		                		window.location.href = data.data.url;
		                	},1500)
				        }
				    });
	    		}else{
	    			$("#myModalSave").modal('hide');
	    			window.location.href = $.url.mySearch()+"page=1";
	    		}
	        }
	    });
	}
	//遍历已经筛选的数据
	var eachLiData = function(){
		var param = [];
		$(".aList2 li").each(function(){
			var indexCode = $(this).attr("id");
			//标签处理
			if($(this).find('.labelText').size() && $(this).find('.labelText').attr("name") == "label"){
				var indexName = $(this).find('.labelText').text();
			}else{
				//正常checkbox
				var indexName = $(this).children(".typeTilte").text();
			}
			var value = [];
			var thisType = $(this).children(".typeDetail");
			var $_this = $(this);
			$(thisType).each(function(){//遍历typeDetail
				if($(this).hasClass("typeSelect")){ //判断类型select
					$(this).find("select").each(function(){
						value.push($(this).find("option:selected").val())
					})
				}else if($(this).hasClass("typeInput")){
					var smallValue = [];
					var smallValue2 = [];
					$(this).find("input").each(function(){
						if($(this).attr("type") == "text"){//遍历input
							//是否是2维数组
							if($(this).parents(".typeDetail").hasClass("single2Input") || $(this).parents(".typeDetail").hasClass("date2Select")){
								smallValue.push($(this).val());
							}else if($(this).parents(".typeDetail").hasClass("dateRadioSelect")){
								smallValue2.push($(this).val());
							}else{
								value.push($(this).val());
							};
						}else if($(this).attr("type") == "radio"){
							smallValue2.push($(this).attr("data-check"));
						}
					});
					if(!isNullOrEmpty(smallValue)){
						value.push(smallValue);
					};
					if(!isNullOrEmpty(smallValue2)){
						value.push(smallValue2);
					};
				//标签
				}else if($_this.attr("id") == "zb0139"){
					value.push($_this.attr("name"));
				//单位
				}else if($(this).hasClass("typeText")){
					value.push($(this).find(".labelText").text());
				};
			});
			//value = value.toString();
			var paramVal = {
				indexCode:indexCode,
				indexName:indexName,
				value:value
			};
			param.push(paramVal)
		})
		return param;
	};
	var keySearch = function(that){
    	if(that.attr("data-label") == "check"){
    		$("#codeKeyWord").val("");
        	var myObj = JSON.parse(that.attr("data-obj"));
	    	var myText = that.attr("title");
	    	var myType = '';
    		$(".typeNoData").hide();
    		$("#"+myObj.indexCode).remove();
	    	$(myObj.type).each(function(i){
	    		myType += mySelect(myObj.type[i],i,myObj.controls[i],"",myObj.select,myObj.indexCode);
	    	});
	    	myType = '<li class="typeNameLi" id="' + myObj.indexCode + '"><span class="typeTilte">' + myText + '</span>' + myType + '<span class="shutLiLabel"></span></li>'
	    	$("."+myObj.indexCode+"_n").find('span').addClass("checkbox-active");
	    	$(".conDate").append(myType);
	    	if(that.attr("id") == "zb0002_n"){
	    		specialSelect();
	    	}
    	}else{
	    	$(".typeNoData").hide();
	    	$("#zb0139").remove();
	    	$(".myLabelChild").find('span').addClass("checkbox-active");
	    	myType = '<li class="typeNameLi" id="zb0139" name="'+that.attr("name")+'"><span class="typeTilte">企业标签</span>' + mySelect("label","","",that.find("span").text(),"","zb0139") + '<span class="shutLiLabel"></span></li>'
	    	$(".conDate").append(myType);
	    	$('.myLabelChild').find("a").removeClass("active");
	    	$("."+$("#zb0139").attr("name")).addClass("active");
    	}
    	var liLenn = $(".aList2 li").length;			
		if(liLenn == 0){
			$("#saveName,#exportExcel,#clearAll").css({"background":"#cccccc"}).attr("disabled","disabled");
		}else{
			$("#saveName,#exportExcel,#clearAll").css({"background":"#f28d5d"}).removeAttr("disabled");
		}
    	closeLine();
    	//组合数组上送
    	connectParam(eachLiData());
    	$(".searchAuto").hide();
    	$(".searchAuto ul").html("");
    	//iptChange();
		                        
	};
	var keyThink = function(){
        //键盘
		$("#codeKeyWord").off().on("keyup focus",function(e){
    		var searchI = trim($("#codeKeyWord").val());
    		var keyCode = e.which;
            if (keyCode == 13) {
                var thisId = '';
                $(".searchAuto").show();
                if(!isNullOrEmpty($(".searchAuto .active").find("span").text())){
                	$("#codeKeyWord").val("");
                	thisId = $(".searchAuto .active").attr("name");
                	searchI = $(".searchAuto .active").find("span").text();
                	$(".searchAuto").hide();
                	keySearch($(".searchAuto .active"));
        			$(".searchAuto ul").html("");
        			$("#saveName,#exportExcel,#clearAll").css({"background":"#f28d5d"}).attr("disabled",false);
                }
                $(".searchAuto ul li:first-child").addClass("active");
    			//iptChange();
            } else if (keyCode == 40) {
	            if ($(".searchAuto ul li:last-child").hasClass("active")) {
	                return false;
	            } else if (!$(".searchAuto ul li").hasClass("active")) {
	                $(".searchAuto ul li:first-child").addClass("active");
	                return false;
	            } else {
	                $(".searchAuto .active").removeClass("active").next().addClass("active");
	                return false;
                }
	        } else if (keyCode == 38) {
	            if ($(".searchAuto ul li:first-child").hasClass("active")) {
	                return false;
	            } else {
	                $(".searchAuto .active").removeClass("active").prev().addClass("active");
	                return false;
	            }
	        }else if(keyCode == 27){
	        	$(".searchAuto ").find(".active").removeClass("active");
	        	$(".searchAuto").hide();
	        }else{
        		if (searchI != "") {
		            //上送参数
		            $.kf.ajax({
		                type: "get",
		                url: $.kf.GETSECCODE+"?keyword="+searchI,
		                data: "",
		                dataType: "json",
		                processResponse: function (data) {
		                	var list = data.data;
//		                	console.log(list)
		                    if (isNullOrEmpty(list.index)&&isNullOrEmpty(list.tagList)) {
		                         $(".searchAuto").hide();
		                         $(".codeHideSame").show();
		                         $(".codeHideSame").text('抱歉，没有找到与"'+ searchI + '"相关结果');
		                    } else {
		                    	$(".codeHideSame").text("").hide();
		                    	$(".searchAuto ul").html("");
		                        var tr = "";
		                        var tr2 = "";
		                        $(list.index).each(function (i) {
		                        	var obj = "";
									obj = {
										"indexCode":list.index[i].indexCode,
										"type":list.index[i].type,
										"controls":list.index[i].controls,
										"select":list.index[i].select
									};
		                            if (i < 10) {
		                            	if(!isNullOrEmpty(list.tagList)){
		                            		tr += "<li data-label='check'  class='"+ list.index[i].indexCode +"_n' data-obj='"+ JSON.stringify(obj) +"' title='"+ list.index[i].indexName +"'><a href='javascript:void(0)'><b class='pull-right'>" + list.index[i].secName + "</b><span>" + list.index[i].indexName + "</span></a></li>";
		                            	}else{
		                            		if( i == 0){
		                            		 	tr += "<li data-label='check' class='"+ list.index[i].indexCode +"_n active' data-obj='"+ JSON.stringify(obj) +"' title='"+ list.index[i].indexName +"'><a href='javascript:void(0)'><b class='pull-right'>" + list.index[i].secName + "</b><span>" + list.index[i].indexName + "</span></a></li>";
			                            	}else{
			                            		 tr += "<li data-label='check'  class='"+ list.index[i].indexCode +"_n' data-obj='"+ JSON.stringify(obj) +"' title='"+ list.index[i].indexName +"'><a href='javascript:void(0)'><b class='pull-right'>" + list.index[i].secName + "</b><span>" + list.index[i].indexName + "</span></a></li>";
			                            	}
		                            	}
		                            	
		                            }
		                        });
		                        $(list.tagList).each(function (i) {
		                        	if (i < 10) {
		                            	if( i == 0){
		                            		 tr2 += "<li data-label='label' class='active' name='"+ list.tagList[i].id +"'><a href='javascript:void(0)'><b class='pull-right'>企业标签</b><span>" + list.tagList[i].tagName + "</span></a></li>";
		                            	}else{
		                            		 tr2 += "<li data-label='label'  name='"+ list.tagList[i].id +"'><a href='javascript:void(0)'><b class='pull-right'>企业标签</b><span>" + list.tagList[i].tagName + "</span></a></li>";
		                            	}
		                            }
		                        	
		                        })
		                        $(".searchAuto ul").append(tr2+tr);
		                        $(".searchAuto").show();
		                        $(".searchAuto").find("li").on("click",function(){
		                        	keySearch($(this));
		                        });
		                    }
		                }
		            });
		        } else {
		            $(".searchAuto").hide();
	             	$(".codeHideSame").text("");
		        }
	        }
    	});
		$("body").on("click",function(){
    		$(".searchAuto").hide();
    		$(".searchAuto ").find(".active").removeClass("active");
   		});
	};
	
	keyThink();	
	
	var pageInit = function(){
		otherName();
		rpId = Query.getHash("rp_id");
		var pageOut = Query.getHash("pageOut");
		var selectName = Query.getHash("selectName");
		if(!isNullOrEmpty(pageOut)){
			$(".hideType").show();
			$('.typeOfMy').show();
			$("#mySelectName").val(selectName);
			$(".typeCreatDate").text("创建日期："+Query.getHash("createDate"));
			$("#tradingStart").val(getNowtime().substr(0,10));
			$.kf.ajax({
	            type: "get",
	            url: $.kf.GETCONDITIONMULTIPLE+"?pickId="+rpId,
	            data: "",
	            dataType: "json",
	            processResponse: function (data) {
	            	if(isNullOrEmpty(data.data)){
	            		$(".typeNoData").show();
	            	}else{
	            		$(".typeNoData").hide();
	            		pageInitList(data);
	            	}
	            	
	            }
	        });
		}else{
			$(".hideType").hide();
			tabList();
			connectParam("");
		}
	}
	var pageInitList = function(data){
		var list = data.data;
		var myLi = '';
		var myLii = '';
		var liNum = $(".aList2").length;
		var selected = "";
		$(list).each(function(i){
			var myType = '';
			if(list[i].indexCode == "zb0035" && list[i].indexCode == "zb0181"){
				$(list[i].type).each(function(j){
		    		myType += mySelect(list[i].type[j],j,list[i].controls[j],"",list[i].select,list[i].indexCode);
		    	});
		    	myLii += '<li name="'+list[i].controls[0]+'" class="typeNameLi" id="' + list[i].indexCode + '"><span class="typeTilte">' + list[i].indexName + '</span>' + myType + '<span class="shutLiLabel"></span></li>'
			}else if(list[i].indexCode == "zb0139"){
				$(list[i].type).each(function(j){
		    		myLi += '<li class="typeNameLi" id="zb0139" name="'+list[i].controls+'"><span class="typeTilte">企业标签</span>' + mySelect("label","","",list[i].indexName,"","zb0139") + '<span class="shutLiLabel"></span></li>'
		    	});
			}else{
				$(list[i].type).each(function(j){
		    		myType += mySelect(list[i].type[j],j,list[i].controls[j],"",list[i].select,list[i].indexCode);
		    	});
		    	myLi += '<li name="'+list[i].controls[0]+'" data-name="'+list[i].controls[1]+'" class="typeNameLi" id="' + list[i].indexCode + '"><span class="typeTilte">' + list[i].indexName + '</span>' + myType + '<span class="shutLiLabel"></span></li>'
			}
		});
		$(".conDate").prepend(myLi);
		$(".titlDate").prepend(myLii);
		
		if($(".aList2").find("#zb0002").size()){
    		specialSelect($("#zb0002").attr("name"),$("#zb0002").attr("data-name"));
    	}
		if(liNum != 0){
			$("#saveName,#exportExcel,#clearAll").css({"background":"#f28d5d"}).attr("disabled",false);
		}
		tabList();
    	closeLine();
    	//组合数组上送
    	connectParam(eachLiData());
	}
	
	//进页面加载
	pageInit();
	
	var singleThink = function(){
        //键盘
		$(".singleInputThink").off().on("keyup",function(e){
    		var searchI = trim($(this).val());
    		var keyCode = e.which;
    		var thisList = $(this).parent().find(".codeList");
    		var thisCode = $(this).parents("li").attr("id");
            if (keyCode == 13) {
                if($(this).parent().find(".codeList .active").find("span").text() == ""){
                	searchI = $(this).val();
                }else{
                	searchI = thisList.find(".active").find("span").text();
                }
                $(this).val(searchI);
        		thisList.hide();
        		thisList.find("ul").html("");
    			//iptChange();
            } else if (keyCode == 40) {
	            if (thisList.find("ul li:last-child").hasClass("active")) {
	                return false;
	            } else if (!thisList.find("ul li").hasClass("active")) {
	                thisList.find("ul li:first-child").addClass("active");
	                return false;
	            } else {
	                thisList.find(".active").removeClass("active").next().addClass("active");
	                return false;
	                }
	        } else if (keyCode == 38) {
	            if (thisList.find("ul li:first-child").hasClass("active")) {
	                return false;
	            } else {
	                thisList.find(".active").removeClass("active").prev().addClass("active");
	                return false;
	            }
	        }else{
	        	thisList.find("ul").html("");
        		if (searchI != "") {
		            //上送参数
		            $.kf.ajax({
		                type: "get",
		                url: $.kf.GETSINGLEINPUTTHINK + "?keyword="+ searchI + "&typeThink=" + thisCode,
		                data: "",
		                dataType: "json",
		                processResponse: function (data) {
		                	var list = data.data;
		                    if (isNullOrEmpty(list)) {
		                         thisList.hide();
		                    } else {
//		                        console.log(list);
		                        var tr = "";
		                        thisList.find("ul").html("");
		                        $(list).each(function (i) {
		                            if (i < 10) {
		                                tr += "<li name='"+ list[i].code +"'><a href='javascript:void(0)'><span>" + list[i].name + "</span></a></li>";
		                            }
		                        });
		                        thisList.find("ul").append(tr);
		                        thisList.show();
		                        thisList.find("li").on("click",function(){
		                        	var code = $(this).find("span").text();
		                        	$(this).parents(".codeList").siblings("input").val(code);
		                        	$(this).parents(".codeList").hide();
        							$(this).parents(".codeList").find("ul").html("");
		                        });
		                    }
		                }
		            });
		        } else {
		            thisList.hide();
	             	//$(".codeHideSame").text("");
		        }
	        }
		});
		$("body").on("click",function(){
    		$(".singleSearch").hide();
   		});
	}
	
}();


//@ sourceURL=indexSearch.js
