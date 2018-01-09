/*
 * 
 * 
 	公司列表 start  
 * 
 * 
 * */
var Comp = function(){
	
    //选项的点击事件
    var listComClick = function () {
        var securities = "";
        var industry = "";
        var province = "";
        var finance = "";
        var tag = "";
        $(".allList").find("li").unbind("click").on("click", function (event) {
            event.preventDefault();
            var ind = $("#soCheck").find("li").length;

            if (!$(this).hasClass("hang-more")) {
                $("#tableTd").html("");
                $(this).parent("ul").find("li").removeClass("hang-active");
                $(this).addClass("hang-active");

                /*主办券商*/
                if ($(this).parents(".allList").attr("id") == "compQs") {
                    securities = $(this).text();
                    var seCode = $(this).attr("name");
                    if ($(this).index() == 0) {
                    	if($(".listOne").length){
                    		if(ind <= 2){
                    			$("#allListSo").hide();
                    		}
                    		Query.setHash({
	                            "seCode": "",
	                            "page":1
	                        });
	                        $(".listOne").remove();
                    	}
                       
                    } else {
                    	$("#allListSo").show();
                        Query.setHash({
                            "seCode": seCode,
                            "page":1
                        });
                        $(".listOne").remove();
                        $("#allListSo").find("ul").prepend("<li class='listOne' name =" + seCode + ">" + securities + "<span class='soListClose'></span></li>");
                    }

                }
                /*所属行业*/
                if ($(this).parents(".allList").attr("id") == "compHy") {
                    industry = $(this).text();
                    var inCode = $(this).attr("name");
                    if ($(this).index() == 0) {
                    	if($(".listTwo").length){
                    		if(ind <= 2){
                    			$("#allListSo").hide();
                    		}
                    		Query.setHash({
	                            "inCode": "",
	                            "page":1
	                        });
	                        $(".listTwo").remove();
                    	}
                        
                    } else {
                    	$("#allListSo").show();
                        Query.setHash({
                            "inCode": inCode,
                            "page":1
                        });
                        $(".listTwo").remove();
                        $("#allListSo").find("ul").prepend("<li class='listTwo' name =" + inCode + ">" + industry + "<span class='soListClose'></span></li>");
                    }

                }
                /*省份*/
                if ($(this).parents(".allList").attr("id") == "compSf") {
                    province = $(this).text();
                    var proCode = $(this).attr("name");
                    if ($(this).index() == 0) {
                    	if($(".listThree").length){
                    		if(ind <= 2){
                    			$("#allListSo").hide();
                    		}
                    		
                    		$(".listThree").remove();
	                        Query.setHash({
	                            proCode: "",
	                            "page":1
	                        });
                    	}
                    } else {
                    	$("#allListSo").show();
                        Query.setHash({
                            proCode: proCode,
                            "page":1
                        });
                        $(".listThree").remove();
                        $("#allListSo").find("ul").prepend("<li class='listThree'name =" + proCode + ">" + province + "<span class='soListClose'></span></li>");
                    }
                    /*if (ind <= 2 && $(this).text() == "全部") {//剩余最后一个清除选项
                    	
                    		$("#allListSo").hide();
                    		$("#allListSo").hide();
                    	}
	                }*/
                }
                /*财务*/
                if ($(this).parents(".allList").attr("id") == "compCw") {
                    finance = $(this).text();
                    var finCode = $(this).attr("name");
                    if ($(this).index() == 0) {
                    	if($(".listFour").length){
                    		if(ind <= 2){
                    			$("#allListSo").hide();
                    		}
                    		
                    		$(".listFour").remove();
	                        Query.setHash({
	                            finCode: "",
	                            "page":1
	                        });
                    	}
                    } else {
                    	$("#allListSo").show();
                        Query.setHash({
                            finCode: finCode,
                            "page":1
                        });
                        $(".listFour").remove();
                        $("#allListSo").find("ul").prepend("<li class='listFour'name =" + finCode + ">" + finance + "<span class='soListClose'></span></li>");
                    }
                }
				//公司标签
                if ($(this).parents(".allList").attr("id") == "compBq") {
                    tag = $(this).text();
                    var bqCode = $(this).attr("name");
                    if ($(this).index() == 0) {
                    	if($(".listFive").length){
                    		if(ind <= 2){
                    			$("#allListSo").hide();
                    		}
                    		
                    		Query.setHash({
	                            "bqCode": "",
	                            "page":1
	                        });
	                        $(".listFive").remove();
                    	}
                        
                    } else {
                    	$("#allListSo").show();
                        Query.setHash({
                            "bqCode": bqCode,
                            "page":1
                        });
                        $(".listFive").remove();
                        $("#allListSo").find("ul").prepend("<li class='listFive' name =" + bqCode + ">" + tag + "<span class='soListClose'></span></li>");
                    }

                }
                initTable("td");
                removeThing();
            }

        });
        //帮助弹窗
        $("#compCw ul li span").click(function(e){
        	e.stopPropagation();
        	var thisName = $(this).attr("name");
        	var thisSetName = $(this).attr("set-name");
        	$("#myModal04 .modal-body p").empty("");
        	$("#myModal04 .modal-title").text(thisName)
        	if(thisName == "创新层维持标准"){
				$("#myModal04 .modal-body p").html(thisSetName)
        	}else if(thisName == "创新层标准"){
				$("#myModal04 .modal-body p").html(thisSetName)
        	}else if(thisName == "降层风险"){
				$("#myModal04 .modal-body p").html(thisSetName)
        	}
			$("#myModal04").modal("show")
        })
    }
    /*拼table表格*/
    var getList = function (data) {
        var list = data.data;
        var thArray = [];//保存thead
        var tr = "";
        var securities = "";
        var cmpr = "";
        $("#tableOne").html("");
        var th = "";
        //每个list的key都相同
        for (var key in list[0]){
    		thArray.push(key);
    	};
    	
    	//thead
		th += '<thead>';
			th += '<tr  role="row" class="tr">';
				$(thArray).each(function (i) {
					if(isChinese(thArray[i])){
						if(thArray[i] == "转让方式"){
							th += '<th>';
							th += '<div class="dropdown dropdown-select2" id="comSelect2">';
							th += '	<a class="dropdown-toggle menu1" id="noteType" role="button" data-toggle="dropdown" href="javascript:void(0)">转让方式<b class="caret"></b></a>';
							th += '	<ul id="menu1" class="dropdown-menu" role="menu" aria-labelledby="drop4">';
							th += '		<li role="presentation">';
							th += '			<a role="menuitem" href="javascript:void(0)" name="2">做市</a>';
							th += '		</li>';
							th += '		<li role="presentation">';
							th += '			<a role="menuitem" href="javascript:void(0)" name="1">协议</a>';
							th += '		</li>';
							th += '		<li role="presentation">';
							th += '			<a role="menuitem" tabindex="转让方式" href="javascript:void(0)" name=" ">全部</a>';
							th += '		</li>';
							th += '	</ul>';
							th += '</div>';
							th += '</th>';
						}else if(thArray[i] == "市场层级"){
							th += '<th>';
							th += '<div class="dropdown dropdown-select3" id="comSelect1">';
							th += '	<a class="dropdown-toggle menu2" id="noteType2" role="button" data-toggle="dropdown" href="javascript:void(0)">市场层级<b class="caret"></b></a>';
							th += '	<ul id="menu2" class="dropdown-menu" role="menu" aria-labelledby="drop4">';
							th += '		<li role="presentation">';
							th += '			<a role="menuitem" name="3" href="javascript:void(0)">创新层</a>';
							th += '		</li>';
							th += '		<li role="presentation">';
							th += '			<a role="menuitem" name="4" href="javascript:void(0)">基础层</a>';
							th += '		</li>';
							th += '		<li role="presentation">';
							th += '			<a role="menuitem" tabindex="市场层级" name=" " href="javascript:void(0)">全部</a>';
							th += '		</li>';
							th += '	</ul>';
							th += '</div>';
							th += '</th>';
						}else{
							th += "<th>" + thArray[i] + "</th>";
						}
		    			
		    		}
				})
			th += '</tr>';
		th += '</thead>';
		//tbody
        var tbody = "<tbody id='tableTd'>"+connectTd(list,thArray)+"</tbody>"
        $("#tableOne").append(th + tbody);
        //转让方式
    	var mode = Query.getHash("mode");
    	if(mode == 1){
    		mode = "做市";
    		$("#comSelect2").children("a").html('做市<b class="caret"></b>');
    	}else if(mode == 2){
    		mode = "协议";
    		$("#comSelect2").children("a").html('协议<b class="caret"></b>');
    	}
        
        //市场层级
        var type = Query.getHash("type");
    	if(type == 1){
    		$("#comSelect1").children("a").html('创新层<b class="caret"></b>');
    	}else if(type == 2){
    		$("#comSelect1").children("a").html('基础层<b class="caret"></b>');
    	}
        $("#tableOne").find("td,a").css("white-space","nowrap");
        tableSelect();//表格标题下拉框
        //自选功能
        comOptional();
        //对比功能
        comComparison();
    };
    var getListTd = function(data){
        var list = data.data;
        var thArray = [];
        for (var key in list[0]){
    		thArray.push(key);
    	};
        $("#tableTd").html("");
		//tbody
        $("#tableTd").append(connectTd(list,thArray));
        $("#tableOne").find("td,a").css("white-space","nowrap");
        //自选功能
        comOptional();
        //对比功能
        comComparison();
    
    };
    var connectTd = function(list,thArray){
    	var tr = '';
    	var securities = "";
    	var cmpr = "";
    	$(list).each(function (i) {
        	if(list[i].securities == "1"){
				securities = "取消";
			}else{
				securities = "关注";
			};
			if(list[i].cmpr == "1"){
				cmpr = "已选";
			}else{
				cmpr = "对比";
			};
			tr += "<tr>";
				//拼接TD
	        	$(thArray).each(function(j){
		            if(isChinese(thArray[j])){
		            	if(thArray[j] == "简称"){
		            		if(list[i].securities == "0"){
				            	 tr += "<td><a href='" + $.url.companyListUrl() + "id=" + list[i]["id"] + "&nameCodeId=" + list[i]["codeNum"] + "&position=companyList"+"'>" + list[i][thArray[j]]  + "</a></td>";
				            }else{
				            	 tr += "<td><a style='color:#f57d4b' href='" + $.url.companyListUrl() + "id=" + list[i]["id"] + "&nameCodeId=" + list[i]["codeNum"] + "&position=companyList"+"'>" + list[i][thArray[j]] + "</a></td>";
				            }
		            	}else if(thArray[j] == "主办券商"){
		            		tr += "<td><a href='" + $.url.securitiesUrl() +"currentTab=tab0"+"&id=" + list[i]["masterId"] +"'>" + list[i][thArray[j]]  + "</a></td>";
		            	}else if(thArray[j] == "操作"){
		            		//对比和关注
					        if(list[i].cmpr == "1"){
				            	tr += "<td><span style='color:#999'>"+ cmpr +"</a>&nbsp;&nbsp;<a class='comOptional'>" + securities + "</a></td>";
				            }else{
				            	tr += "<td><a href='javascript:;' class='comComparison'>"+ cmpr +"</a>&nbsp;&nbsp;<a href='javascript:;' class='comOptional'>" + securities + "</a></td>";
				            }	
		            	}else{
		            		if(list[i][thArray[j]].indexOf(".") > 0){
		            			tr += "<td class='queryWidthCom'>" + list[i][thArray[j]] + "</td>";
		            		}else{
		            			tr += "<td>" + list[i][thArray[j]] + "</td>";
		            		}
		            		
		            	}
		    		}
	        	})
		        
        	tr += "</tr>";
        });
        
        return tr;
    }
    //对比功能
    var comComparison = function(){
    	//对比
    	$(".comComparison").off().on("click",function(){
    		var thisCode = $(this).parents("tr").find("td:first-child").text();
    		$("#contrastInput").val(thisCode);
    		$(".newAddContrast").click();
    		$("#contrastInput").val("");
    		$(".contrastModal").show();
    		initTable("td");
    	});
    	//全部清除和单独清除
    	$(".clearContrastr,.companyP1 a").off("click.company").on("click.company",function(){
    		var t1 = setInterval(function(){
    			if(_flgCons){
    				clearInterval(t1);
	    			initTable("td");
	    		}
    		},300);
    		
    	});
    	//键盘精灵
    	$("body").find(".codeList2").on("click","li",function(){
    		var t2 = setInterval(function(){
    			if(_flgCons){
    				clearInterval(t2);
	    			initTable("td");
	    		}
    		},300);
    	})
    };
     //加入自选功能
    var comOptional = function(){
		$(".comOptional").click(function(){
			var _url = "";
			var code = $(this).parents("tr").find("td").eq(0).text();
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
	            	initTable("td");
            	}
		 	})
		})
    }
    var removeThing = function () {
        //点击关闭按钮
        $(".soListClose").unbind().on("click", function () {
            var flg = $(this).index();
            $("#tableTd").html("");
            if ($(this).parents(".allListSo").find("li").length == 2) {
                $(this).parents(".allListSo").hide();
            }
            $(this).parent().remove();
            //查询条件清除地址栏参数
            if ($(this).parent().hasClass("listOne")) {
            	$("#compPop").find("li").removeClass("provinceLi");
            	$("#compPopspecailSave").addClass("default").removeClass("btn-primary");
                $("#compQs").find("li").each(function () {
                    if ($(this).text() == "全部") {
                        $(this).addClass("hang-active");
                        $(this).siblings().removeClass("hang-active");
                    }
                });
                Query.setHash({
                    seCode: "",
                    "page":1
                });
            }
            //查询条件清除地址栏参数
            if ($(this).parent().hasClass("listTwo")) {
            	$("#compPop2").find("li").removeClass("provinceLi");
            	$("#industrySave").addClass("default").removeClass("btn-primary");
                $("#compHy").find("li").each(function () {
                    if ($(this).text() == "全部") {
                        $(this).addClass("hang-active");
                        $(this).siblings().removeClass("hang-active");
                    }
                });
                Query.setHash({//清除地址栏对应的参数
                    inCode: "",
                    "page":1
                });
            }
            //查询条件清除地址栏参数
            if ($(this).parent().hasClass("listThree")) {
            	$("#comProvince").find(".provinceLi").removeClass("provinceLi");
            	$("#compProvSave").addClass("default").removeClass("btn-primary");
                $("#compSf").find("li").each(function () {
                    if ($(this).text() == "全部") {
                        $(this).addClass("hang-active");
                        $(this).siblings().removeClass("hang-active");
                    }
                });
                Query.setHash({
                    proCode: "",
                    "page":1
                });
            }
            //查询条件清除地址栏参数
            if ($(this).parent().hasClass("listFour")) {
                $("#compCw").find("li").each(function () {
                    if ($(this).text() == "全部") {
                        $(this).addClass("hang-active");
                        $(this).siblings().removeClass("hang-active");
                    }
                });
                Query.setHash({
                    finCode: "",
                    "page":1
                });
            }
            //查询条件清除地址栏参数
            if ($(this).parent().hasClass("listFive")) {
            	$("#compLabelPop").find(".provinceLi").removeClass("provinceLi");
            	$("#compLabelSave").addClass("default").removeClass("btn-primary");
                $("#compBq").find("li").each(function () {
                    if ($(this).text() == "全部") {
                        $(this).addClass("hang-active");
                        $(this).siblings().removeClass("hang-active");
                    }
                });
                Query.setHash({//清除地址栏对应的参数
                    bqCode: "",
                    "page":1
                });
            }
            initTable("td");
        });
    };

    var getUrlParam = function () {
        var aCode = Query.getHash("seCode");
        var bCode = Query.getHash("inCode");
        var cCode = Query.getHash("proCode");
        var dCode = Query.getHash("finCode");
        var eCode = Query.getHash("bqCode");
        var a = "", b = "", c = "", d = "",e = "";
        $("#compQs").find("li").each(function (i) {
            if (!isNullOrEmpty(aCode)) {
                if ($(this).attr("name") != aCode) {
                    $(this).removeClass("hang-active");
                    $(this).nextAll("li").removeClass("hang-active");
                    $("#compPop").find("li").each(function () {
                        if ($(this).attr("name") == aCode) {
                            a = $(this).text();
                        }
                    });

                } else {
                    $(this).addClass("hang-active");
                    $(this).siblings("li").removeClass("hang-active");
                    a = $(this).text();
                }
            }

        });
        $("#compHy").find("li").each(function (i) {
            if (!isNullOrEmpty(bCode)) {
                if ($(this).attr("name") != bCode) {
                    $(this).removeClass("hang-active");
                    $(this).nextAll("li").removeClass("hang-active");
                    $("#compPop2").find("li").each(function () {
                        if ($(this).attr("name") == bCode) {
                            b = $(this).text();
                        }
                    });
                } else {
                    $(this).addClass("hang-active");
                    $(this).siblings("li").removeClass("hang-active");
                    b = $(this).text();
                }
            }

        });
        $("#compSf").find("li").each(function (i) {
            if (!isNullOrEmpty(cCode)) {
                if ($(this).attr("name") != cCode && $(this).text() != cCode) {
                    $(this).removeClass("hang-active");
                    $(this).nextAll("li").removeClass("hang-active");
                    $("#comProvince").find("li").each(function () {
                        if ($(this).attr("name") == cCode || $(this).text() == cCode) {
                            c = $(this).text();
                        }
                    });
                } else {
                    $(this).addClass("hang-active");
                    $(this).siblings("li").removeClass("hang-active");
                    c = $(this).text();
                }
            }

        });
        $("#compCw").find("li").each(function (i) {
            if (!isNullOrEmpty(dCode)) {
                if ($(this).attr("name") != dCode) {
                    $(this).removeClass("hang-active");
                    $(this).nextAll("li").removeClass("hang-active");                   
                } else {
                    $(this).addClass("hang-active");
                    $(this).siblings("li").removeClass("hang-active");
                    d = $(this).text();
                }
            }

        });
        $("#compBq").find("li").each(function (i) {
            if (!isNullOrEmpty(eCode)) {
                if ($(this).attr("name") != eCode) {
                    $(this).removeClass("hang-active");
                    $(this).nextAll("li").removeClass("hang-active");
                    $("#compLabelPop").find("li").each(function () {
                        if ($(this).attr("name") == eCode) {
                            e = $(this).text();
                        }
                    });
                } else {
                    $(this).addClass("hang-active");
                    $(this).siblings("li").removeClass("hang-active");
                    e = $(this).text();
                }
            }

        });
        if (isNullOrEmpty(aCode) && isNullOrEmpty(bCode) && isNullOrEmpty(cCode) && isNullOrEmpty(dCode)&& isNullOrEmpty(eCode)){
            $("#allListSo").hide();
        }
        if (!isNullOrEmpty(aCode)) {
            $("#allListSo").show();
            $(".listOne").remove();
            $("#allListSo").find("ul").prepend("<li class='listOne' name=" + aCode + ">" + a + "<span class='soListClose'></span></li>");
        }
        if (!isNullOrEmpty(bCode)) {
            $("#allListSo").show();
            $(".listTwo").remove();
            $("#allListSo").find("ul").prepend("<li class='listTwo' name=" + bCode + ">" + b + "<span class='soListClose'></span></li>");
        }
        if (!isNullOrEmpty(cCode)) {
            $("#allListSo").show();
            $(".listThree").remove();
            $("#allListSo").find("ul").prepend("<li class='listThree' name=" + cCode + ">" + c + "<span class='soListClose'></span></li>");
        }
        if (!isNullOrEmpty(dCode)) {
            $("#allListSo").show();
            $(".listFour").remove();
            $("#allListSo").find("ul").prepend("<li class='listFour' name=" + dCode + ">" + d + "<span class='soListClose'></span></li>");
        }
        if (!isNullOrEmpty(eCode)) {
            $("#allListSo").show();
            $(".listFive").remove();
            $("#allListSo").find("ul").prepend("<li class='listFive' name=" + eCode + ">" + e + "<span class='soListClose'></span></li>");
        }
        //显示关闭按钮
        $("#soClear").on("click", function () {
            Query.setHash({
                inCode: "",
                seCode: "",
                proCode: "",
                finCode: "",
                bqCode: "",
                type:"",
                mode:"",
                "page":1
            });
            $("#comSelect2").children("a").html('转让方式<b class="caret"></b>');
            $("#comSelect1").children("a").html('市场层级<b class="caret"></b>');
            $(this).parent("li").siblings().remove();
            $(this).parents("#allListSo").hide();
            $("#compQs").find("li").eq(0).addClass("hang-active").siblings().removeClass("hang-active");
            $("#compHy").find("li").eq(0).addClass("hang-active").siblings().removeClass("hang-active");
            $("#compSf").find("li").eq(0).addClass("hang-active").siblings().removeClass("hang-active");
            $("#compCw").find("li").eq(0).addClass("hang-active").siblings().removeClass("hang-active");
            $("#compBq").find("li").eq(0).addClass("hang-active").siblings().removeClass("hang-active");
           	
           	$(".city-list").find(".provinceLi").removeClass("provinceLi");
           	$(".modal-footer").each(function(){
           		$(this).find(".btn").eq(1).addClass("default").removeClass("btn-primary");
           	});
            initTable("td");
        });
        //初始化列表
        initTable();

        //清空选项
        removeThing();
    };
    //初始化表格
    var initTable = function (flg) {
        var securities = "";
        var industry = "";
        var province = "";
        var finance = "";
        var tag = "";
        var orderByName = "";
        var orderByType = "";
        var getByName = Query.getHash("orderByName");
        //券商
        if ($(".listOne").size()) {
            securities = $(".listOne").attr("name");
        } else if ($("#compQs").find(".hang-active").text() == "全部") {
            securities = "";
        } else {
            securities = $("#compQs").find(".hang-active").attr("name")
        }
        //行业
        if ($(".listTwo").size()) {
            industry = $(".listTwo").attr("name");
        } else if ($("#compHy").find(".hang-active").text() == "全部") {
            industry = "";
        } else {
            industry = $("#compHy").find(".hang-active").attr("name")
        }
        //省份
        if ($(".listThree").size()) {
            province = $(".listThree").text();
        } else if ($("#compSf").find(".hang-active").text() == "全部") {
            province = "";
        } else {
            province = $("#compSf").find(".hang-active").text();
        }
        //财务
        if ($(".listFour").size()) {
            finance = $(".listFour").text();
        } else if ($("#compCw").find(".hang-active").text() == "全部") {
            finance = "";
        } else {
            finance = $("#compCw").find(".hang-active").text();
        }
		//公司标签
        if ($(".listFive").size()) {
            tag = $(".listFive").attr("name");
        } else if ($("#compBq").find(".hang-active").text() == "全部") {
            tag = "";
        } else {
            tag = $("#compBq").find(".hang-active").attr("name")
        }
        //转让方式
    	var mode = Query.getHash("mode");
    	if(mode == 1){
    		mode = "做市";
    		//$("#comSelect2").children("a").html('做市<b class="caret"></b>');
    	}else if(mode == 2){
    		mode = "协议";
    		//$("#comSelect2").children("a").html('协议<b class="caret"></b>');
    	}
        
        //市场层级
        var type = Query.getHash("type");
    	if(type == 1){
    		//$("#comSelect1").children("a").html('创新层<b class="caret"></b>');
    	}else if(type == 2){
    		//$("#comSelect1").children("a").html('基础层<b class="caret"></b>');
    	}
    	
    	//排序判断
    	if(!isNullOrEmpty(getByName)){
    		console.log(getByName)
        	orderByName = getByName;
        	orderByType = Query.getHash("orderByType");
        }
        
        var code = "";
        var keyword = $("#comKeyWord").val();
        var start_time = $("#compStartTime").val();
        var stop_time = $("#compEndTime").val();
        if (compareDate(start_time, stop_time)) {
	        var _url = "";
	        if(!isNullOrEmpty(Query.getHash("source"))){
	        	var source = Query.getHash("source");
	        }else{
	        	var source = "companyList";
	        }
	        if(!isNullOrEmpty(Query.getHash("orderByName"))){
	        	var orderName = Query.getHash("orderByName");
	        	var orderType = "Desc";
	        }else{
	        	var orderName = "";
	        	var orderType = "";
	        }
	        _url = $.kf.GETCOMPANYDYNAMICCOLUMN + "?"+ "type=" + type + "&source="+ source + "&orderByName="+ orderName +"&orderByType="+ orderType +"&mode=" + mode+ "&tag=" + tag + "&keyword=" + keyword + "&securities=" + securities + "&province=" + province + "&industry=" + industry + "&finance=" + finance +"&start_time=" + start_time + "&stop_time=" + stop_time + "&page=" + 1;
	    	var lastPage = Query.getHash("page");
	    	
	    	if(isNullOrEmpty(flg)){//正常逻辑
	    		$.getTable({
		   	 		url:_url,
			    	pageId:$("#pageTool"),
			    	callback:getList,
			    	currentPage:lastPage,
			    	tbodyId:$("#tableOne")
		   	 	});
	    	}else{//后期加载
	    		$.getTable({
		   	 		url:_url,
			    	pageId:$("#pageTool"),
			    	callback:getListTd,
			    	currentPage:lastPage,
			    	tbodyId:$("#tableTd")
		   	 	});
	    	}
	   	 	
   	 	}
    };

    var keyWord = function () {
        /*关键词搜索按钮*/
        $("#compBtn").on("click", function () {
        	Query.setHash({"page":1});
            initTable("td");
        });
        //重置
        $("#compReset").on("click", function () {
        	$(this).parents(".page-content-par").find("input").val("");
        	$("#soClear").click();
        });

        //回车查询
        //enter
        $("#comKeyWord").on("keydown", function (e) {
            var keyCode = e.which;
            if (keyCode == 13) {
                $("#compBtn").click();
            }

        });
    };
    //主办券商
    var specialWord = function () {
        $.kf.ajax({
            type: "get",
            url: $.kf.SPECIALWORD,
            data: "",
            dataType: "json",
            processResponse: function(data){
            	specialFun(data);
            	industryWord();
            }
        });
	};
	//主办券商l列表
	var specialFun = function(data){
		var data = data.data;
		var trPop = "";
		$(data).each(function(i){
			trPop += "<li data-name=" + data[i].letter +" name =" + data[i].code +" title=' " + data[i].broker_name + " '>" + data[i].broker_name + "</li>";
		});
		$("#compPop").find("ul").empty("").html("");
		$("#compPop").find("ul").append(trPop);
		//弹窗选择事件
		comPopSpecial();
	};
	//所属行业
	var industryWord = function(){
		$.kf.ajax({//所属行业
            type: "get",
            url: $.kf.INDUSTRYWORD,
            data: "",
            dataType: "json",
            processResponse: function(data){
            	industryFun(data);
            }
        });
	};
	//行业列表
	var industryFun = function(data){
		var data = data.data;
		var trPop2 = "";
		$(data).each(function(i){
			trPop2 += "<li data-name=" + data[i].letter +" name =" + data[i].code +" title=' " + data[i].name + " '><span>" + data[i].name + "</span></li>";
		});
		$("#compPop2").find("ul").empty("").html("");
		$("#compPop2").find("ul").append(trPop2);
		//字母选择
		popLetter();
		comPopIndu();
		labelWord();
		
	};
	
	//公司标签
	var labelWord = function(){
		$.kf.ajax({//公司标签
            type: "get",
            url: $.kf.GETCOMPANYTAG,
            data: "",
            dataType: "json",
            processResponse: function(data){
            	labelFun(data);
            }
        });
	};
	//标签列表
	var labelFun = function(data){
		var data = data.data;
		var trPop2 = "";
		$(data).each(function(i){
			trPop2 += "<li data-name=" + data[i].letter +" name =" + data[i].id +" title=' " + data[i].name + " '><span>" + data[i].name + "</span></li>";
		});
		$("#compLabelPop").find("ul").empty("").html("");
		$("#compLabelPop").find("ul").append(trPop2);
		//字母选择
		popLetter();
		listComClick();
		getUrlParam();
		comLabelSpecial();
	};
	
	/*公司标签弹窗选择*/
	var comLabelSpecial = function(){
		var _text = "";
		var bqCode = "";
		
		$("#compLabelPop").find("li").unbind().on("click",function(){
			_text = $(this).text();
			bqCode = $(this).attr("name");
			$(this).addClass("provinceLi");
			$(this).siblings().removeClass("provinceLi");
			$("#compLabelSave").addClass("btn-primary").removeClass("default");
		});
		$("#compLabelSave").unbind().on("click",function(){
			if($(this).parents(".myModal01 ").find(".city-list").find(".provinceLi").text() != ""){
				$(".city-list").find("li").show();
				_text = $(this).parents(".myModal01 ").find(".city-list").find(".provinceLi").text();
				$(this).parents(".myModal01 ").find(".province-ul").find(".provinceLi").removeClass("provinceLi");
				$(this).parents(".myModal01 ").find(".province-ul").find("li:last").addClass("provinceLi");
				$('#myModalBq').modal('hide');
				$("#tableTd").html("");
				$("#compBq").find("li").removeClass("hang-active");
				Query.setHash({
					bqCode:bqCode,
					"page":1
				});
				$("#allListSo").show();
				$(".listFive").remove();
				$("#allListSo").find("ul").prepend("<li class='listFive' name =" + bqCode + ">" + _text + "<span class='soListClose'></span></li>");
				_text = '';
				$("#compLb").find("li").each(function(){
					if($(this).attr("name") == bqCode){
						$(this).siblings().removeClass("hang-active");
						$(this).addClass("hang-active");
					}
				});
				initTable("td");
			}
			removeThing();
		})
	};
	
	//省份选择pop
	var provinceChoose = function(){
		var _text = "";
		var proCode = "";
		$("#comProvince").find("li").unbind().on("click",function(){
			$("#compProvSave").addClass("btn-primary").removeClass("default");
			_text = $(this).text();
			proCode = $(this).attr("name");
			$(this).addClass("provinceLi");
			$(this).siblings().removeClass("provinceLi");
		});
		$("#compProvSave").unbind().on("click",function(){
			if($(this).parents(".myModal01 ").find(".city-list").find(".provinceLi").text() != ""){
				$(".city-list").find("li").show();
				_text = $(this).parents(".myModal01 ").find(".city-list").find(".provinceLi").text();
				$(this).parents(".myModal01 ").find(".province-ul").find(".provinceLi").removeClass("provinceLi");
				$(this).parents(".myModal01 ").find(".province-ul").find("li:last").addClass("provinceLi");
				$('#myModal').modal('hide');
				$("#tableTd").html("");
				$("#compSf").find("li").removeClass("hang-active");
				Query.setHash({
					proCode:proCode,
					"page":1
				});
				$("#allListSo").show();
				$(".listThree").remove();
				$("#allListSo").find("ul").prepend("<li class='listThree' name =" + proCode + ">" + _text + "<span class='soListClose'></span></li>");
				_text = "";
				$("#compSf").find("li").each(function(){
					if($(this).attr("name") == proCode){
						$(this).siblings().removeClass("hang-active");
						$(this).addClass("hang-active");
					}
				});
				initTable("td");
			}
			removeThing();
		})
	};
	/*券商弹窗选择*/
	var comPopSpecial = function(){
		var _text = "";
		var seCode = "";
		$("#compPop").find("li").unbind().on("click",function(){
			_text = $(this).text();
			seCode = $(this).attr("name");
			$(this).addClass("provinceLi");
			$(this).siblings().removeClass("provinceLi");
			$("#compPopspecailSave").addClass("btn-primary").removeClass("default");
		});
		$("#compPopspecailSave").unbind().on("click",function(){
			if($(this).parents(".myModal01 ").find(".city-list").find(".provinceLi").text() != ""){
				$(".city-list").find("li").show();
				_text = $(this).parents(".myModal01 ").find(".city-list").find(".provinceLi").text();
				$(this).parents(".myModal01 ").find(".province-ul").find(".provinceLi").removeClass("provinceLi");
				$(this).parents(".myModal01 ").find(".province-ul").find("li:last").addClass("provinceLi");
				$('#myModal02').modal('hide');
				$("#tableTd").html("");
				$("#compQs").find("li").removeClass("hang-active");
				Query.setHash({
					seCode:seCode,
					"page":1
				});
				$("#allListSo").show();
				$(".listOne").remove();
				$("#allListSo").find("ul").prepend("<li class='listOne' name =" + seCode + ">" + _text + "<span class='soListClose'></span></li>");
				_text = '';
				$("#compQs").find("li").each(function(){
					if($(this).attr("name") == seCode){
						$(this).siblings().removeClass("hang-active");
						$(this).addClass("hang-active");
					}
				});
				initTable("td");
			}
			removeThing();
		})
	};
	
	/*行业弹窗选择*/
	var comPopIndu = function(){
		var _text = "";
		var inCode = "";
		$("#compPop2").find("li").unbind().on("click",function(){
			$("#industrySave").addClass("btn-primary").removeClass("default");
			_text = $(this).text();
			inCode = $(this).attr("name");
			$(this).addClass("provinceLi");
			$(this).siblings().removeClass("provinceLi");
		});
		$("#industrySave").unbind().on("click",function(){
			if($(this).parents(".myModal01 ").find(".city-list").find(".provinceLi").text() != ""){
				$(".city-list").find("li").show();
				_text = $(this).parents(".myModal01 ").find(".city-list").find(".provinceLi").text();
				$(this).parents(".myModal01 ").find(".province-ul").find(".provinceLi").removeClass("provinceLi");
				$(this).parents(".myModal01 ").find(".province-ul").find("li:last").addClass("provinceLi");
				$('#myModal03').modal('hide');
				$("#tableTd").html("");
				$("#compHy").find("li").removeClass("hang-active");
				Query.setHash({
					inCode:inCode,
					"page":1
				});
				$("#allListSo").show();
				$(".listTwo").remove();
				$("#allListSo").find("ul").prepend("<li class='listTwo' name =" + inCode + ">" + _text + "<span class='soListClose'></span></li>");
				_text = "";
				$("#compHy").find("li").each(function(){
					if($(this).attr("name") == inCode){
						$(this).siblings().removeClass("hang-active");
						$(this).addClass("hang-active");
					}
				});
				initTable("td");
			}
			removeThing();
		})
	};
	
	var tableSelect = function(){
		new Select($("#comSelect1"),{}).init();
		new Select($("#comSelect2"),{}).init();
		//转让方式
		$("#comSelect2").find("li").on("click",function(){
			if(trimAll($(this).text()) == "做市"){
				$("#noteType").html("做市<b class='caret'></b>");
				Query.setHash({
					"mode":1,
					"page":1
				});
			}else if(trimAll($(this).text()) == "协议"){
				$("#noteType").html("协议<b class='caret'></b>");
				Query.setHash({
					"mode":2,
					"page":1
				});
			}else{
				$("#noteType").html("转让方式<b class='caret'></b>");
				Query.setHash({
					"mode":"",
					"page":1
				});
			}
			
			$("#tableTd").html("");
			initTable("td");
		});
		//市场层级
		$("#comSelect1").find("li").on("click",function(){
			if(trimAll($(this).text()) == "创新层"){
				$("#noteType2").html("创新层<b class='caret'></b>");
				Query.setHash({
					"type":1,
					"page":1
				});
			}else if(trimAll($(this).text()) == "基础层"){
				$("#noteType2").html("基础层<b class='caret'></b>");
				Query.setHash({
					"type":2,
					"page":1
				});
			}else{
				$("#noteType2").html("市场层级<b class='caret'></b>");
				Query.setHash({
					"type":"",
					"page":1
				});
			}
			$("#tableTd").html("");
			initTable("td");
		});
	}
	
	return {
		init:function(){
			specialWord();//加载券商选项
			//industryWord();//加载行业选项
			keyWord();//关键字搜索
			provinceChoose();//弹窗选择省份
		}
	}
}();




//@ sourceURL=company.js















