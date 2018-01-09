/*申请挂牌*/
var WantComp = function(){
	
	//选项的点击事件
    var listComClick = function () {
        var securities = "";
        var industry = "";
        var province = "";
        var lawOffice = "";
        var accountingFirm = "";
        $(".allList").find("li").unbind("click").on("click", function (event) {
            event.preventDefault();
            var ind = $("#soCheck").find("li").length;

            if (!$(this).hasClass("hang-more")) {
                $("#tableWant").html("");
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
                }
                /*律师*/
                if ($(this).parents(".allList").attr("id") == "compCw") {
                    lawOffice = $(this).text();
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
                        $("#allListSo").find("ul").prepend("<li class='listFour'name =" + finCode + ">" + lawOffice + "<span class='soListClose'></span></li>");
                    }
                };
                /*会计*/
                if ($(this).parents(".allList").attr("id") == "compKj") {
                    accountingFirm = $(this).text();
                    var acCode = $(this).attr("name");
                    if ($(this).index() == 0) {
                    	if($(".listFive").length){
                    		if(ind <= 2){
                    			$("#allListSo").hide();
                    		}
                    		
                    		$(".listFive").remove();
	                        Query.setHash({
	                            acCode: "",
								"page":1
	                        });
                    	}
                    } else {
                    	$("#allListSo").show();
                        Query.setHash({
                            acCode: acCode,
							"page":1
                        });
                        $(".listFive").remove();
                        $("#allListSo").find("ul").prepend("<li class='listFive'name =" + acCode + ">" + accountingFirm + "<span class='soListClose'></span></li>");
                    }
                }
               //初始化列表
        		initTable();
                removeThing();
            }

        });
    }

    /*拼table表格*/
    var getList = function (data) {
        var list = data.data;
        var tr = "";
        $("#tableWant").html("");
        $(list).each(function (i) {
            tr += "<tr>";
            tr += "<td><a class='basicName' data-name='"+list[i].companyName+"' href='"+$.url.industryUrl() + "companyName=" + list[i].companyName+"'>" + list[i].shortname + "</a></td>";
            tr += "<td>" + list[i].special + "</td>";
            tr += "<td>" + list[i].lawOffice + "</td>";
            tr += "<td>" + list[i].accountingFirm + "</td>";
            tr += "<td>" + list[i].province + "</td>";
            tr += "<td>" + list[i].industry + "</td>";
            tr += "<td>" + list[i].issued + "</td>";
            tr += "<td>" + list[i].schedule + "</td>";
            tr += "<td>" + list[i].date + "</td>";
            tr += "</tr>";
        });
        $("#tableWant").append(tr);
        //扣费跳转
        var isCookie = false;
        moneyUrl($(".basicName"), isCookie, "isCookie");
    };
    var removeThing = function () {
        //点击关闭按钮
        $(".soListClose").unbind().on("click", function () {
            var flg = $(this).index();
            $("#tableWant").html("");
            if ($(this).parents(".allListSo").find("li").length == 2) {
                $(this).parents(".allListSo").hide();
            }
            $(this).parent().remove();
            //查询条件清除地址栏参数
            if ($(this).parent().hasClass("listOne")) {
            	$("#compPop").find(".provinceLi").removeClass("provinceLi");
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
            	$("#compPop2").find(".provinceLi").removeClass("provinceLi");
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
            	$("#compPopLaw").find(".provinceLi").removeClass("provinceLi");
            	$("#compLawSave").addClass("default").removeClass("btn-primary");
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
            };
            //查询条件清除地址栏参数
            if ($(this).parent().hasClass("listFive")) {
            	$("#compPopAccount").find(".provinceLi").removeClass("provinceLi");
            	$("#compAccountSave").addClass("default").removeClass("btn-primary");
                $("#compKj").find("li").each(function () {
                    if ($(this).text() == "全部") {
                        $(this).addClass("hang-active");
                        $(this).siblings().removeClass("hang-active");
                    }
                });
                Query.setHash({
                    acCode: "",
					"page":1
                });
            }
            initTable();
        });
    };


    var getUrlParam = function () {
        var aCode = Query.getHash("seCode");
        var bCode = Query.getHash("inCode");
        var cCode = Query.getHash("proCode");
        var dCode = Query.getHash("finCode");
        var eCode = Query.getHash("acCode");
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
                if ($(this).attr("name") != cCode) {
                    $(this).removeClass("hang-active");
                    $(this).nextAll("li").removeClass("hang-active");
                    $("#comProvince").find("li").each(function () {
                        if ($(this).attr("name") == cCode) {
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
                    $("#compPopLaw").find("li").each(function () {
                        if ($(this).attr("name") == dCode) {
                            d = $(this).text();
                        }
                    });
                } else {
                    $(this).addClass("hang-active");
                    $(this).siblings("li").removeClass("hang-active");
                    d = $(this).text();
                }
            }

        });
        $("#compKj").find("li").each(function (i) {
            if (!isNullOrEmpty(eCode)) {
                if ($(this).attr("name") != eCode) {
                    $(this).removeClass("hang-active");
                    $(this).nextAll("li").removeClass("hang-active");
                    $("#compPopAccount").find("li").each(function () {
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
        if (isNullOrEmpty(aCode) && isNullOrEmpty(bCode) && isNullOrEmpty(cCode) && isNullOrEmpty(dCode)) {
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
        };
        if (!isNullOrEmpty(eCode)) {
            $("#allListSo").show();
            $(".listFive").remove();
            $("#allListSo").find("ul").prepend("<li class='listFive' name=" + eCode + ">" + e + "<span class='soListClose'></span></li>");
        }
        //显示关闭按钮
        $("#soClear").on("click", function () {
            Query.setHash({
                inCode: "",
                acCode: "",
                finCode: "",
                proCode: "",
                seCode: "",
                "page":1
            });
            
            $(this).parent("li").siblings().remove();
            $(this).parents("#allListSo").hide();
            $("#compQs").find("li").eq(0).addClass("hang-active").siblings().removeClass("hang-active");
            $("#compHy").find("li").eq(0).addClass("hang-active").siblings().removeClass("hang-active");
            $("#compSf").find("li").eq(0).addClass("hang-active").siblings().removeClass("hang-active");
            $("#compCw").find("li").eq(0).addClass("hang-active").siblings().removeClass("hang-active");
            $("#compKj").find("li").eq(0).addClass("hang-active").siblings().removeClass("hang-active");
            
			$(".city-list").find(".provinceLi").removeClass("provinceLi");
           	$(".modal-footer").each(function(){
           		$(this).find(".btn").eq(1).addClass("default").removeClass("btn-primary");
           	});
           initTable();
        });
        //初始化列表
        initTable();

        //清空选项
        removeThing();
    };
    //初始化表格
    var initTable = function () {
        var securities = "";
        var industry = "";
        var province = "";
        var lawOffice = "";
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
        //律师
        if ($(".listFour").size()) {
            lawOffice = $(".listFour").attr("name");
        } else if ($("#compCw").find(".hang-active").text() == "全部") {
            lawOffice = "";
        } else {
            lawOffice = $("#compCw").find(".hang-active").attr("name");
        }
 		//会计
        if ($(".listFive").size()) {
            accountingFirm = $(".listFive").attr("name");
        } else if ($("#compKj").find(".hang-active").text() == "全部") {
            accountingFirm = "";
        } else {
            accountingFirm = $("#compKj").find(".hang-active").attr("name");
        }

        var code = "";
        var issued  = $(".menu1").text();
        var schedule = $(".menu2").text();
        if(issued == "挂牌同时发行"){
			issued = "";
		};
		if(schedule == "审查进度"){
			schedule = "";
		}
        var keyword = $("#comKeyWord").val();
        var start_time = $("#compStartTime").val();
        var stop_time = $("#compEndTime").val();



        var _url = $.kf.GETAPPLYLISTED + "?" + "securities=" + securities + "&province=" + province + "&industry=" + industry + "&lawOffice=" + lawOffice+"&accountingFirm=" + accountingFirm + "&keyword=" + keyword + "&start_time=" + start_time + "&stop_time=" + stop_time + "&issued=" + issued + "&schedule=" + schedule;
		var lastPage = Query.getHash("page");
		
		if (compareDate(start_time, stop_time)) {
			$("#tableWant").html("");
			$.getTable({
	        	url:_url,//url
		    	pageId:$("#pageTool"),//分页id
		    	callback:getList,//callback
		    	currentPage:lastPage,
		    	tbodyId:$("#tableWant")//tbody的id,
	        })
		}

    };

    var keyWord = function () {
        /*关键词搜索按钮*/
        $("#compBtn").on("click", function () {
        	Query.setHash({
        		"page":1
        	});
            initTable();

        });
        //重置
        $("#compReset").on("click", function () {
        	Query.setHash({"page":1});
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
            	
            	var dtd = $.Deferred(); // 新建一个deferred对象
            	var dtd2 = $.Deferred(); // 新建一个deferred对象
			　　var wait = function(dtd){
					//律师
					var lawOfficeFun = function(){
						var trLaw = '';
						$.kf.ajax({
				            type: "get",
				            url: $.kf.GETLAWOFFICELIST,
				            data: "",
				            dataType: "json",
				            processResponse: function(data){
				            	var data = data.data;
				            	$(data).each(function(i){
				            		trLaw += "<li data-name=" + data[i].letter +" name =" + data[i].code +" title=' " + data[i].name + " '><span>" + data[i].name + "</span></li>";
				            	});
				           		$("#compPopLaw").find("ul").append(trLaw);
				           		lawPop();
				           		dtd.resolve();
				            }
				        });
					};
					lawOfficeFun(); //律师事务所
					return dtd;
			　　};
			
				var wait2 = function(dtd2){
					//会计
					var accountOffice = function(){
						var trAccount = '';
						$.kf.ajax({
				            type: "get",
				            url: $.kf.GETACCOUNTINGFIRMLIST,
				            data: "",
				            dataType: "json",
				            processResponse: function(data){
				            	var data = data.data;
				            	$(data).each(function(i){
				            		trAccount += "<li data-name=" + data[i].letter +" name =" + data[i].code +" title=' " + data[i].name + " '><span>" + data[i].name + "</span></li>";
				            	});
				            	$("#compPopAccount").find("ul").append(trAccount);
				            	accountPop();
				            	dtd2.resolve();
				            }
				        });
					};
					
              		accountOffice(); //会计师事务所
              		return dtd2;
			　　};
			
			
				$.when(wait(dtd),wait2(dtd2))
			
			　　.done(function(){
					getUrlParam();//地址栏参数，刷新
				})
			
//			　　.fail(function(){ alert("出错啦！"); });
            }
        });
	};
	//主办券商l列表
	var specialFun = function(data){
		var data = data.data;
		var tr = "";
		var trPop = "";
		var m = 0;
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
		var tr = "";
		var trPop2 = "";
		var m = 0;
		$(data).each(function(i){
			trPop2 += "<li data-name=" + data[i].letter +" name =" + data[i].code +" title=' " + data[i].name + " '><span>" + data[i].name + "</span></li>";
		});
		$("#compPop2").find("ul").empty("").html("");
		$("#compPop2").find("ul").append(trPop2);
		//字母选择
		popLetter();
		
		comPopIndu();
		
		listComClick();
	};
	
	//省份选择pop
	var provinceChoose = function(){
		var _text = "";
		var proCode = "";
		$("#comProvince").find("li").on("click",function(){
			$("#compProvSave").addClass("btn-primary").removeClass("default");
			_text = $(this).text();
			proCode = $(this).attr("name");
			$(this).addClass("provinceLi");
			$(this).siblings().removeClass("provinceLi");
		});
		$("#compProvSave").unbind().on("click",function(){
			if($(this).parents(".myModal01 ").find(".city-list").find(".provinceLi").text() != ""){
				_text = $(this).parents(".myModal01 ").find(".city-list").find(".provinceLi").text();
				$(".city-list").find("li").show();
				$(this).parents(".myModal01 ").find(".province-ul").find(".provinceLi").removeClass("provinceLi");
				$(this).parents(".myModal01 ").find(".province-ul").find("li:last").addClass("provinceLi");
				$('#myModal').modal('hide');
				$("#tableWant").html("");
				$("#compSf").find("li").removeClass("hang-active");
				Query.setHash({
					proCode:proCode,
					"page":1
				});
				
				$("#allListSo").show();
				$(".listThree").remove();
				$("#allListSo").find("ul").prepend("<li class='listThree' name =" + proCode + ">" + _text + "<span class='soListClose'></span></li>");
				initTable();
				_text = "";
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
				_text = $(this).parents(".myModal01 ").find(".city-list").find(".provinceLi").text();
				$(".city-list").find("li").show();
				$(this).parents(".myModal01 ").find(".province-ul").find(".provinceLi").removeClass("provinceLi");
				$(this).parents(".myModal01 ").find(".province-ul").find("li:last").addClass("provinceLi");
				$('#myModal02').modal('hide');
				$("#tableWant").html("");
				$("#compQs").find("li").removeClass("hang-active");
				Query.setHash({
					seCode:seCode,
					"page":1
				});
				var securities = seCode;
				$("#allListSo").show();
				$(".listOne").remove();
				$("#allListSo").find("ul").prepend("<li class='listOne' name =" + seCode + ">" + _text + "<span class='soListClose'></span></li>");
				$("#compQs").find("li").each(function(){
					if($(this).attr("name") == seCode){
						$(this).siblings().removeClass("hang-active");
						$(this).addClass("hang-active");
					}
				});
				initTable();
				_text = "";
			}
			removeThing();
		})
	};
	/*行业弹窗选择*/
	var comPopIndu = function(){
		var _text = "";
		var inCode = "";
		$("#compPop2").find("li").on("click",function(){
			$("#industrySave").addClass("btn-primary").removeClass("default");
			_text = $(this).text();
			inCode = $(this).attr("name");
			$(this).addClass("provinceLi");
			$(this).siblings().removeClass("provinceLi");
		});
		$("#industrySave").unbind().on("click",function(){
			if($(this).parents(".myModal01 ").find(".city-list").find(".provinceLi").text() != ""){
				_text = $(this).parents(".myModal01 ").find(".city-list").find(".provinceLi").text();
				$(".city-list").find("li").show();
				$(this).parents(".myModal01 ").find(".province-ul").find(".provinceLi").removeClass("provinceLi");
				$(this).parents(".myModal01 ").find(".province-ul").find("li:last").addClass("provinceLi");
				$('#myModal03').modal('hide');
				$("#tableWant").html("");
				$("#compHy").find("li").removeClass("hang-active");
				Query.setHash({
					inCode:inCode,
					"page":1
				});
				var industry = inCode;
				
				$("#allListSo").show();
				$(".listTwo").remove();
				$("#allListSo").find("ul").prepend("<li class='listTwo' name =" + inCode + ">" + _text + "<span class='soListClose'></span></li>");
				$("#compHy").find("li").each(function(){
					if($(this).attr("name") == inCode){
						$(this).siblings().removeClass("hang-active");
						$(this).addClass("hang-active");
					}
				});
				initTable();
				_text = "";
			}
			removeThing();
		})
	};
	/*律师弹窗选择*/
	var lawPop = function(){
		var _text = "";
		var finCode = "";
		$("#compPopLaw").find("li").unbind().on("click",function(){
			$("#compLawSave").addClass("btn-primary").removeClass("default");
			_text = $(this).text();
			finCode = $(this).attr("name");
			$(this).addClass("provinceLi");
			$(this).siblings().removeClass("provinceLi");
		});
		$("#compLawSave").unbind().on("click",function(){
			if($(this).parents(".myModal01 ").find(".city-list").find(".provinceLi").text() != ""){
				_text = $(this).parents(".myModal01 ").find(".city-list").find(".provinceLi").text();
				$(".city-list").find("li").show();
				$(this).parents(".myModal01 ").find(".province-ul").find(".provinceLi").removeClass("provinceLi");
				$(this).parents(".myModal01 ").find(".province-ul").find("li:last").addClass("provinceLi");
				$("#myModalLaw").modal('hide');
				$("#tableWant").html("");
				$("#compCw").find("li").removeClass("hang-active");
				Query.setHash({
					finCode:finCode,
					"page":1
				});
				var lawOffice = finCode;
				
				$("#allListSo").show();
				$(".listFour").remove();
				$("#allListSo").find("ul").prepend("<li class='listFour' name =" + finCode + ">" + _text + "<span class='soListClose'></span></li>");
				$("#compCw").find("li").each(function(){
					if($(this).attr("name") == finCode){
						$(this).siblings().removeClass("hang-active");
						$(this).addClass("hang-active");
					}
				});
				initTable();
				_text = "";
			}
			removeThing();
		})
	};
	/*会计弹窗选择*/
	var accountPop = function(){
		var _text = "";
		var acCode = "";
		$("#compPopAccount").find("li").unbind().on("click",function(){
			$("#compAccountSave").addClass("btn-primary").removeClass("default");
			_text = $(this).text();
			acCode = $(this).attr("name");
			$(this).addClass("provinceLi");
			$(this).siblings().removeClass("provinceLi");
		});
		$("#compAccountSave").unbind().on("click",function(){
			if($(this).parents(".myModal01 ").find(".city-list").find(".provinceLi").text() != ""){
				_text = $(this).parents(".myModal01 ").find(".city-list").find(".provinceLi").text();
				$(".city-list").find("li").show();
				$(this).parents(".myModal01 ").find(".province-ul").find(".provinceLi").removeClass("provinceLi");
				$(this).parents(".myModal01 ").find(".province-ul").find("li:last").addClass("provinceLi");
				$("#myModalAccount").modal('hide');
				$("#tableWant").html("");
				$("#compKj").find("li").removeClass("hang-active");
				Query.setHash({
					acCode:acCode,
					"page":1
				});
				var accountingFirm = acCode;
				$("#allListSo").show();
				$(".listFive").remove();
				$("#allListSo").find("ul").prepend("<li class='listFive' name =" + acCode + ">" + _text + "<span class='soListClose'></span></li>");
				$("#compKj").find("li").each(function(){
					if($(this).attr("name") == acCode){
						$(this).siblings().removeClass("hang-active");
						$(this).addClass("hang-active");
					}
				});
				initTable();
				_text = "";
			}
			removeThing();
		})
	};
	var tableSelect = function(){
		new Select($("#comSelect1s"),{}).init();
		new Select($("#comSelect2s"),{}).init();
		//是否
		$("#comSelect2s").find("li").on("click",function(){
			$("#tableWant").html("");
			initTable();
		});
		//进度
		$("#comSelect1s").find("li").on("click",function(){
			$("#tableWant").html("");
			initTable();
		});
	}
	
	return {
		init:function(){
			specialWord();//加载券商选项
			keyWord();//关键字搜索
			provinceChoose();//弹窗选择省份
			tableSelect();//表格标题下拉框
		}
	}
}();