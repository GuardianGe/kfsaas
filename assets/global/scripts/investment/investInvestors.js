var InvestInvestors = function(){
	
	/************************************投资人****************************************/
	var investInvestors = function(){
		//选项的点击事件
	    var listComClick = function () {
	    	var industry = "";
	        var status = "";
	        var province = "";
	        $(".allList").find("li").unbind("click").on("click", function (event) {
	            event.preventDefault();
	
	            var ind = $("#soCheck").find("li").length;
	            if (!$(this).hasClass("hang-more")) {
	                $("#tableOne").html("");
	                $(this).parent("ul").find("li").removeClass("hang-active");
	                $(this).addClass("hang-active");
					
					/*所属行业*/
	                if ($(this).parents(".allList").attr("id") == "compQs") {
	                    industry = $(this).text();
	                    var inCode = $(this).attr("name");
	                    if ($(this).index() == 0) {
	                    	if($(".listOne").length){
	                    		if(ind <= 2){
	                    			$("#allListSo").hide();
	                    		}
	                    		
	                    		Query.setHash({
	                    			"page":1,
		                            "inCode": ""
		                        });
		                        $(".listOne").remove();
	                    	}
	                        
	                    } else {
	                    	$("#allListSo").show();
	                        Query.setHash({
	                        	"page":1,
	                            "inCode": inCode
	                        });
	                        $(".listOne").remove();
	                        $("#allListSo").find("ul").prepend("<li class='listOne' name =" + inCode + ">" + industry + "<span class='soListClose'></span></li>");
	                    }
	                }
	                /*获投状态*/
	                if ($(this).parents(".allList").attr("id") == "compHy") {
	                    status = $(this).text();
	                    var seCode = $(this).attr("name");
	                    if ($(this).index() == 0) {
	                    	if($(".listTwo").length){
	                    		if(ind <= 2){
	                    			$("#allListSo").hide();
	                    		}
	                    		Query.setHash({
	                    			"page":1,
		                            "seCode": ""
		                        });
		                        $(".listTwo").remove();
	                    	}
	                       
	                    } else {
	                    	$("#allListSo").show();
	                        Query.setHash({
	                        	"page":1,
	                            "seCode": seCode
	                        });
	                        $(".listTwo").remove();
	                        $("#allListSo").find("ul").prepend("<li class='listTwo' name =" + seCode + ">" + status + "<span class='soListClose'></span></li>");
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
		                        	"page":1,
		                            proCode: ""
		                        });
	                    	}
	                    } else {
	                    	$("#allListSo").show();
	                        Query.setHash({
	                        	"page":1,
	                            proCode: proCode
	                        });
	                        $(".listThree").remove();
	                        $("#allListSo").find("ul").prepend("<li class='listThree'name =" + proCode + ">" + province + "<span class='soListClose'></span></li>");
	                    }
	                }
	                
	               initTable();
	            }
				removeThing();
	        });
	    }
	
	    /*拼table表格*/
	    var getList = function (data) {
	        var list = data.data;
	        var tr = "";
			
	        $("#tableOne").html("");
	        $(list).each(function (i) {
	        	tr += "<div class='col-md-6 pdl10 pdr'>";
	        	tr += "<div class='col-md-12 whiteBg'>";
	        	tr += "<div class='investorsCon'>"
	        	tr += "<img src='"+ list[i].logo +"'/>";
	        	tr += "<div class='companyCon'>";
	        	tr += "<h1><a href='"+ $.url.investorDetailsUrl() + "id=" + list[i].id +"'>"+ list[i].name +"</a></h1>";
	        	if(isNullOrEmpty(list[i].companyId)){
	        		tr += "<h2>"+ list[i].investment + "&nbsp;&nbsp;&nbsp;<b>" + list[i].job +"</b></h2>";
	        	}else{
	        		tr += "<h2><a style='font-size:16px;' href='" + $.url.investmentAgencyDetailsUrl() + "id=" + list[i].companyId +"'>"+ list[i].investment + "</a>&nbsp;&nbsp;&nbsp;<b>" + list[i].job +"</b></h2>";
	        	}
	        	if($(window).width() < 1366){
	        		tr += "<p title='"+list[i].summary+"'>"+ list[i].summary.substring(0,30) +"...</p>";
	        	}else{
	        		tr += "<p title='"+list[i].summary+"'>"+ list[i].summary.substring(0,50) +"...</p>";
	        	}
	        	
	        	tr += "</div>";
	        	tr += "</div>";
	        	tr += "<div class='companyConBottom'>";
	        	tr += "<div class='focusOn'>";
	        	tr += "<h3>关注行业领域：</h3>";
	        	tr += "<div class='focusRight' id='industryField'>";
	        	for(var j=0; j<list[i].field.length; j++){
	        		if(j=='7'){ //判断到第八个标签后面添加...
	        			tr += "<a set-name='"+ list[i].id +"'>"+ list[i].field[j] +"...</a>";	
	        		}else if(j==list[i].field.length - 1){ //判断到不足八个截取最后标签不要分隔符
	        			tr += "<a set-name='"+ list[i].id +"'>"+ list[i].field[j] +"</a>";	
	        		}else{ //每个标签后面添加分隔符
	        			tr += "<a set-name='"+ list[i].id +"'>"+ list[i].field[j] +",</a>";
	        		}
	        	}
	        	tr += "</div></div>";
	        	tr += "<div class='focusOn mgb'>";
	        	tr += "<h3>偏好投资阶段：</h3>";
	        	tr += "<div class='focusRight' id='invesmentField'>";
	        	for(var j=0; j<list[i].stage.length; j++){
	        		if(j=='7'){ //判断到第八个标签后面添加...
	        			tr += "<p>"+ list[i].stage[j] +"...</p>";	
	        		}else if(j==list[i].stage.length - 1){ //判断到不足八个截取最后标签不要分隔符
	        			tr += "<p>"+ list[i].stage[j] +"</p>";	
	        		}else{ //每个标签后面添加分隔符
	        			tr += "<p>"+ list[i].stage[j] +",</p>";
	        		}
	        	}
	        	tr += "</div></div>";
	        	tr += "</div>";
	        	tr += "</div>";
	        	tr += "</div>";
	        });
	        $("#tableOne").append(tr);
	        
	        //关注行业领域 点击
//	        $("#industryField a").on("click",function(){
//	        	var industry = $(this).attr("set-name");
//	        	var _url = $.kf.GETINVESTORLIST + "?" + "industry=" + industry;
//	            new GetTable(_url, $("#pageTool"), "", getList, "get", $("#tableOne")).init();
//	        })
//	        //偏好投资阶段 点击
//	        $("#invesmentField a").on("click",function(){
//	        	var industry = $(this).attr("set-name");
//	        	var _url = $.kf.GETINVESTORLIST + "?" + "industry=" + industry;
//	            new GetTable(_url, $("#pageTool"), "", getList, "get", $("#tableOne")).init();
//	        })
	    };
	    
	    var removeThing = function () {
	        //点击关闭按钮
	        $(".soListClose").unbind("click").on("click", function () {
	            var flg = $(this).index();
	            $("#tableOne").html("");
	            if ($(this).parents(".allListSo").find("li").length == 2) {
	                $(this).parents(".allListSo").hide();
	            }
	            $(this).parent().remove();
	            //查询条件清除地址栏参数
	            if ($(this).parent().hasClass("listOne")) {
	                $("#compQs").find("li").each(function () {
	                    if ($(this).text() == "全部") {
	                        $(this).addClass("hang-active");
	                        $(this).siblings().removeClass("hang-active");
	                    }
	                });
	                $("#compPop2").find("li").each(function(){
	                	$(this).removeClass("provinceLi");
	                	$("#industrySave").addClass("default");
	                })
	                Query.setHash({
	                	"page":1,
	                    seCode: ""
	                });
	            }
	            //查询条件清除地址栏参数
	            if ($(this).parent().hasClass("listTwo")) {
	                $("#compHy").find("li").each(function () {
	                    if ($(this).text() == "全部") {
	                        $(this).addClass("hang-active");
	                        $(this).siblings().removeClass("hang-active");
	                    }
	                });
	                Query.setHash({//清除地址栏对应的参数
	                	"page":1,
	                    inCode: ""
	                });
	            }
	            //查询条件清除地址栏参数
	            if ($(this).parent().hasClass("listThree")) {
	                $("#compSf").find("li").each(function () {
	                    if ($(this).text() == "全部") {
	                        $(this).addClass("hang-active");
	                        $(this).siblings().removeClass("hang-active");
	                    }
	                });
	                $("#comProvince").find("li").each(function(){
	                	$(this).removeClass("provinceLi");
	                	$("#compProvSave").addClass("default");
	                })
	                Query.setHash({
	                	"page":1,
	                    proCode: ""
	                });
	            }
	           initTable();
	        });
	    };
	
	    var getUrlParam = function () {
	        var aCode = Query.getHash("inCode");
	        var bCode = Query.getHash("seCode");
	        var cCode = Query.getHash("proCode");
	        var a = "", b = "", c = "";
	        $("#compQs").find("li").each(function (i) {
	            if (!isNullOrEmpty(aCode)) {
	                if ($(this).attr("name") != aCode) {
	                    $(this).removeClass("hang-active");
	                    $(this).nextAll("li").removeClass("hang-active");
	                    $("#compPop2").find("li").each(function () {
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
	        if (isNullOrEmpty(aCode) && isNullOrEmpty(bCode) && isNullOrEmpty(cCode)) {
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
	        //显示关闭按钮
	        $("#soClear").on("click", function () {
	        	
	            Query.setHash({
	            	"page":1,
	                "inCode": "",
	                "seCode": "",
	                "proCode": ""
	            });
	            $(this).parent("li").siblings().remove();
	            $(this).parents("#allListSo").hide();
	            $("#compQs").find("li").eq(0).addClass("hang-active").siblings().removeClass("hang-active");
	            $("#compHy").find("li").eq(0).addClass("hang-active").siblings().removeClass("hang-active");
	            $("#compSf").find("li").eq(0).addClass("hang-active").siblings().removeClass("hang-active");
	            initTable();
	        });
	        //初始化列表
	        initTable();
	
	        //清空选项
	        removeThing();
	    };
	    //初始化表格
	    var initTable = function () {
	        var status = "";
	        var industry = "";
	        var province = "";
	        //行业
	        if ($(".listOne").size()) {
	            industry = $(".listOne").text();
	        } else if ($("#compQs").find(".hang-active").text() == "全部") {
	            industry = "";
	        } else {
	            industry = $("#compQs").find(".hang-active").text()
	        }
	        //投资轮次
	        if ($(".listTwo").size()) {
	            status = $(".listTwo").text();
	        } else if ($("#compHy").find(".hang-active").text() == "全部") {
	            status = "";
	        } else {
	            status = $("#compHy").find(".hang-active").text()
	        }
	        //省份
	        if ($(".listThree").size()) {
	            province = $(".listThree").text();
	        } else if ($("#compSf").find(".hang-active").text() == "全部") {
	            province = "";
	        } else {
	            province = $("#compSf").find(".hang-active").text();
	        }
	        var code = "";
	        var keyword = $("#comKeyWord").val();
	
	        var _url = "";
			$("#tableOne").html("");
	        _url = $.kf.GETINVESTORLIST + "?" + "keyword=" + keyword + "&status=" + status + "&province=" + province + "&industry=" + industry + "&page=" + 1;
	        //new GetTable(_url, $("#pageTool"), "", getList, "get", $("#tableOne")).init();
	        var lastPage = Query.getHash("page");
            $.getTable({
	        	url:_url,//url
		    	pageId:$("#pageTool"),//分页id
		    	callback:getList,//callback
		    	currentPage:lastPage,
		    	tbodyId:$("#tableOne")//tbody的id,
	        })
	
	    };
	
	    var keyWord = function () {
	        /*关键词搜索按钮*/
	        $("#investSer").on("click", function () {
	        	Query.setHash({"page":1});
	            initTable();
	        });
			//重置
	        $("#investSerReset").on("click",function(){
	        	$("#tableOne").html("");
	        	$(".investSname").val("");
	        	$("#soClear").click();
	        
	        })
	        //回车查询
	        $("#comKeyWord").on("keydown", function (e) {
	            var keyCode = e.which;
	            if (keyCode == 13) {
	                $("#investSer").click();
	            }
	
	        });
	    };
	    keyWord();
	    
		//所属行业
		var industryWord = function(){
			$.kf.ajax({//所属行业
	            type: "get",
	            url: $.kf.GETINDUSTRY,
	            data: "",
	            dataType: "json",
	            processResponse: function(data){
	            	industryFun(data);
	            }
	        });
		};
		industryWord();
		
		//行业列表
		var industryFun = function(data){
			var data = data.data;
			var tr = "";
			var trPop2 = "";
			$(data).each(function(i){
				trPop2 += "<li data-name=" + data[i].letter +" name =" + data[i].id +" title=' " + data[i].name + " '><span>" + data[i].name + "</span></li>";
			});
			$("#compPop2").find("ul").empty("").html("");
			$("#compPop2").find("ul").append(trPop2);
			//字母选择
			popLetter();
			
			comPopIndu();
			
			provinceChoose();
			
			listComClick();
			
			getUrlParam();//地址栏参数，刷新
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
			$("#compProvSave").on("click",function(){
				if($(this).parents(".myModal01 ").find(".city-list").find(".provinceLi").text() != ""){
					$(".city-list").find("li").show();
					_text = $(this).parents(".myModal01 ").find(".city-list").find(".provinceLi").text();
					$(".province-ul").find("li").removeClass("provinceLi");
					$(".province-ul").find("li:last").addClass("provinceLi");
					$('#myModal').modal('hide');
					$("#tableOne").html("");
					$("#compSf").find("li").removeClass("hang-active");
					Query.setHash({
						"page":1,
						"proCode":proCode
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
					initTable();
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
			$("#industrySave").on("click",function(){
				if($(this).parents(".myModal01 ").find(".city-list").find(".provinceLi").text() != ""){
					$(".city-list").find("li").show();
					_text = $(this).parents(".myModal01 ").find(".city-list").find(".provinceLi").text();
					$(".province-ul").find("li").removeClass("provinceLi");
					$(".province-ul").find("li:last").addClass("provinceLi");
					$('#myModal03').modal('hide');
					$("#tableOne").html("");
					$("#compQs").find("li").removeClass("hang-active");
					Query.setHash({
						"page":1,
						inCode:inCode
					});
					$("#allListSo").show();
					$(".listOne").remove();
					$("#allListSo").find("ul").prepend("<li class='listOne' name =" + inCode + ">" + _text + "<span class='soListClose'></span></li>");
					_text = "";
					$("#compQs").find("li").each(function(){
						if($(this).attr("name") == inCode){
							$(this).siblings().removeClass("hang-active");
							$(this).addClass("hang-active");
						}
					});
					initTable();
				}
				removeThing();
			})
		};
	}
	
	return{
		init:function(){
			investInvestors();
		}
	}
	
}()
