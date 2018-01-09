
/*会计师事务所*/
var AccountingLawOffice = function(){
	//选项的点击事件
    var listComClick = function () {
        var province = "";
        var setupTime = "";
        $(".allList").find("li").unbind("click").on("click", function (event) {
            event.preventDefault();
            $(".sort").find("a").removeClass("bgredB");
    		$(".sort").find("a").removeClass("bgredT");
            var ind = $("#soCheck").find("li").length;

            if (!$(this).hasClass("hang-more")) {
                $("#tableOne").html("");
                $(this).parent("ul").find("li").removeClass("hang-active");
                $(this).addClass("hang-active");

                
                /*办公地址*/
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
                /*成立时间*/
                if ($(this).parents(".allList").attr("id") == "compCw") {
                    setupTime = $(this).text();
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
                        $("#allListSo").find("ul").prepend("<li class='listFour'name =" + finCode + ">" + setupTime + "<span class='soListClose'></span></li>");
                    }
                };

                initTable();
                removeThing();
            }

        });
    }

    /*拼table表格*/
    var getList = function (data) {
        var list = data.data;
        var tr = "";

        $("#tableOne").html("");
        $(list).each(function (i) {
            tr += "<tr>";
            tr += "<td><a class='basicName2'  data-name='"+list[i].companyName+"' href='"+ $.url.industryUrl() + "companyName=" + list[i].companyName +"'>" + list[i].name + "</a></td>";
            tr += "<td>" + list[i].principalName + "</td>";
            tr += "<td>" + list[i].tel + "</td>";
            tr += "<td>" + list[i].date + "</td>";
            tr += "<td>" + list[i].serviceListing + "</td>";
            tr += "<td>" + list[i].cityName + "</td>";
            tr += "<td>" + list[i].address + "</td>";
            tr += "</tr>";
        });
        $("#tableOne").append(tr);
         //扣费跳转
        var isCookie2 = false;

        moneyUrl($(".basicName2"), isCookie2, "isCookie");
	
    };
    var removeThing = function () {
        //点击关闭按钮
        $(".soListClose").unbind().on("click", function () {
        	$(".sort").find("a").removeClass("bgredB");
    		$(".sort").find("a").removeClass("bgredT");
            var flg = $(this).index();
            $("#tableOne").html("");
            if ($(this).parents(".allListSo").find("li").length == 2) {
                $(this).parents(".allListSo").hide();
            }
            $(this).parent().remove();
            //查询条件清除地址栏参数
            if ($(this).parent().hasClass("listThree")) {
            	$("#comProvince").find("li").removeClass("provinceLi");
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
            	$("#compPopLaw").find("li").removeClass("provinceLi");
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
        });
    };

    var getUrlParam = function () {
        var cCode = Query.getHash("proCode");
        var dCode = Query.getHash("finCode");
        var c = "", d = ""
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
                } else {
                    $(this).addClass("hang-active");
                    $(this).siblings("li").removeClass("hang-active");
                    d = $(this).text();
                }
            }

        });
        
        if (isNullOrEmpty(cCode) && isNullOrEmpty(dCode)) {
            $("#allListSo").hide();
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
        /***排序***/
        $("#sample_1 th a").on("click", function (e) {
        	Query.setHash({"page":1});
        	sortToggle(this);
	    	initTable();
        })
        //显示关闭按钮
        $("#soClear").on("click", function () {
        	$(".sort").find("a").removeClass("bgredB");
    		$(".sort").find("a").removeClass("bgredT");
            Query.setHash({
                proCode: "",
                "page":1,
                 finCode: ""
            });
            
            $(this).parent("li").siblings().remove();
            $(this).parents("#allListSo").hide();
            $("#compSf").find("li").eq(0).addClass("hang-active").siblings().removeClass("hang-active");
            $("#compCw").find("li").eq(0).addClass("hang-active").siblings().removeClass("hang-active");
	        
	        
			$(".city-list").find("li").removeClass("provinceLi");
           	$(".modal-footer").each(function(){
           		$(this).find(".btn").eq(1).addClass("default").removeClass("btn-primary");
           	});
            initTable();
        });
        //初始化列表
        initTable();
		
		//选项点击
		listComClick();
		
        //清空选项
        removeThing();
    };
    
    //初始化表格
    var initTable = function () {
        var province = "";
        var setupTime = "";
        
        //办公地址
        if ($(".listThree").size()) {
            province = $(".listThree").text();
        } else if ($("#compSf").find(".hang-active").text() == "全部") {
            province = "";
        } else {
            province = $("#compSf").find(".hang-active").text();
        }
        //成立时间
        if ($(".listFour").size()) {
            setupTime = $(".listFour").attr("name");
        } else if ($("#compCw").find(".hang-active").text() == "全部") {
            setupTime = "";
        } else {
            setupTime = $("#compCw").find(".hang-active").attr("name");
        }

        var code = "";
        var keyword = $("#comKeyWord").val();
        var start_time = $("#compStartTime").val();
        var stop_time = $("#compEndTime").val();
	 	var orderByName = "";
        var orderByType = "";
        var getByName = Query.getHash("orderByName");
	    if(!isNullOrEmpty(getByName)){
        	orderByName = getByName;
        	orderByType = Query.getHash("orderByType");
        }else{
        	$(".sort a").eq(1).addClass("bgredB");
	        $(".sort a").each(function () {
	            if ($(this).hasClass("bgredB") || $(this).hasClass("bgredT")) {
	                orderByName = $(this).parents("th").attr("name");
	                orderByType = $(this).attr("name");
	            }
	        });
	    }
        var _url = "";
		var lastPage = Query.getHash("page");
        var _url = $.kf.ACCOUNTINGFIRM + "?"+ "orderByName=" + orderByName + "&orderByType=" + orderByType  + "&province=" + province + "&setupTime=" + setupTime + "&keyword=" + keyword + "&start_time=" + start_time + "&stop_time=" + stop_time;
        //new GetTable(_url, $("#pageTool"), "", getList, "get", $("#tableOne"),lastPage).init();
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
        $("#compBtn").on("click", function () {
        	$(".sort").find("a").removeClass("bgredB");
    		$(".sort").find("a").removeClass("bgredT");
        	Query.setHash({"page":1});
            initTable();
        });
        //重置
        $("#compReset").on("click", function () {
        	$(".sort").find("a").removeClass("bgredB");
    		$(".sort").find("a").removeClass("bgredT");
        	$(this).parents(".page-content-par").find("input").val("");
        	soClear.click();
           
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

	//办公地址pop
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
				$(".province-ul").find("li").removeClass("provinceLi");
				$(".province-ul").find("li:last").addClass("provinceLi");
				$(".sort").find("a").removeClass("bgredB");
    			$(".sort").find("a").removeClass("bgredT");
				$('#myModal').modal('hide');
				$("#tableOne").html("");
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
	
	return {
		init:function(){
			getUrlParam();
			keyWord();//关键字搜索
			provinceChoose();//弹窗选择省份
		}
	}
}();