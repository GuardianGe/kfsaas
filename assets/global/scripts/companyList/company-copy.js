/*
 * 
 * 
 个人信息页面start
 * 
 * 
 * 
 * 
 * */
/*个人信息修改页面*/
function getUserInfo(){
	$.kf.ajax({
        type: "get",
        url: $.kf.GETUSERINFO,
        data: "",
        dataType: "json",
        processResponse: function(data){
        	var data = data.data;
        	getInfoFun(data);
        }
    });
    //写入页面信息
    function getInfoFun(data){
    	$("#personPic").attr("src",data.photo_url);//头像
    	$("#personName").text(data.name);//姓名
    	$("#personZq").text(data.company);//公司
    	$("#personWork").text(data.job);//职位
    	$("#personStart").text(data.vipExpiredDate);//开始时间
    	$("#personEnd").text(data.vipStartDate);//结束时间
    	$("#personTel").text(data.tel);//注册账号
    	
    }
    /*姓名修改*/
	new BlurIpt($("#userNameChange"),{},userName,$("#userNameChangeError")).init();
	/*邮箱修改*/
	new BlurIpt($("#userEmailChange"),{},userEmail,$("#userEmailChangeError")).init();
	/*职位修改*/
	new BlurIpt($("#userJobChange"),{},userMess,$("#userJobChangeError")).init();
	/*公司修改*/
	new BlurIpt($("#userCompnayChange"),{},userMess,$("#userComChangeError")).init();
	/*修改个人信息 保存*/
	$("#saveMess").on("click",function(){
		if(checkAll()){
			if(errorTip()){
				$("#myModal02").hide();
				$(".modal-backdrop").remove();
			}
		}
	});
}


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
        $(".allList").find("li").unbind("click").on("click", function (event) {
            event.preventDefault();
			Query.setHash({"page":1});
            var ind = $("#soCheck").find("li").length;

            if (!$(this).hasClass("hang-more")) {
                $("#tableOne").html("");
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
	                            "seCode": ""
	                        });
	                        $(".listOne").remove();
                    	}
                       
                    } else {
                    	$("#allListSo").show();
                        Query.setHash({
                            "seCode": seCode
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
	                            "inCode": ""
	                        });
	                        $(".listTwo").remove();
                    	}
                        
                    } else {
                    	$("#allListSo").show();
                        Query.setHash({
                            "inCode": inCode
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
	                            proCode: ""
	                        });
                    	}
                    } else {
                    	$("#allListSo").show();
                        Query.setHash({
                            proCode: proCode
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
	                            finCode: ""
	                        });
                    	}
                    } else {
                    	$("#allListSo").show();
                        Query.setHash({
                            finCode: finCode
                        });
                        $(".listFour").remove();
                        $("#allListSo").find("ul").prepend("<li class='listFour'name =" + finCode + ">" + finance + "<span class='soListClose'></span></li>");
                    }
                }

                var _url = "";
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
                };
                var mode = $(".menu1").text();
                mode = $.trim(mode);
                if(mode == "转让方式"||mode == "全部"){
                	mode = "";
                }else{
                	mode = $(".menu1").text();
                };
                var type = "";
                type = $.trim($(".menu2").text());
                if (type == "创新层") {
                    type = 1;
                } else if (type == "基础层") {
                    type = 2;
                }
                var code = "";
                var keyword = $("#comKeyWord").val();
                var start_time = $("#compStartTime").val();
                var stop_time = $("#compEndTime").val();


                var _url = $.kf.GETCOMPANYLISTEDLIST + "?" + "&securities=" + securities + "&province=" + province + "&industry=" + industry + "&finance=" + finance + "&keyword=" + keyword + "&start_time=" + start_time + "&stop_time=" + stop_time + "&mode=" + mode + "&type=" + type;
                //_url = "http://60.205.57.43:8081/index.php/service/getFundManager?keyword=法人&fund_type=证券投资基金&start_time=2016-7-2&stop_time=2016-8-9&address=北京&page=1";
                new GetTable(_url, $("#pageTool"), "", getList, "get", $("#tableOne")).init();
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
        var tr = "";
        var securities = "";

        $("#tableOne").html("");
        $(list).each(function (i) {
        	if(list[i].securities == "1"){
				securities = "取消";
			}else{
				securities = "关注";
			};
            tr += "<tr>";
            tr += "<td>" + list[i].code + "</td>";
            if(list[i].securities == "0"){
            	 tr += "<td><a href='" + $.url.companyListUrl() + "#id=" + list[i].id + "&nameCodeId=" + list[i].code + "&position=companyList"+"'>" + list[i].shortname + "</a></td>";
            }else{
            	 tr += "<td><a style='color:#f57d4b' href='" + $.url.companyListUrl() + "#id=" + list[i].id + "&nameCodeId=" + list[i].code + "&position=companyList"+"'>" + list[i].shortname + "</a></td>";
            }
           
            tr += "<td class='queryWidthCom'>" + list[i].current_price + "</td>";
            //tr += "<td>" + list[i].max_capital + "</td>";
            tr += "<td>" + list[i].mode + "</td>";
            tr += "<td>" + list[i].level + "</td>";
            tr += "<td>" + list[i].area + "</td>";
            tr += "<td>" + list[i].industry + "</td>";
            tr += "<td>" + list[i].special + "</td>";
            tr += "<td>" + list[i].market + "</td>";
            tr += "<td>" + list[i].listingDateMachine + "</td>";
            tr += "<td><a class='comOptional'>" + securities + "</a></td>";
            tr += "</tr>";
        });
        $("#tableOne").append(tr);
        //自选功能
        comOptional();
    };
     //加入自选功能
    var comOptional = function(){
		$(".comOptional").click(function(){
			var _url = "";
			var code = $(this).parent().parent().children().first().text();
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
		            	initTable();
	            	}
			 	 })
		})
    }
    var removeThing = function () {
        //点击关闭按钮
        $(".soListClose").unbind().on("click", function () {
            var flg = $(this).index();
            Query.setHash({"page":1});
            $("#tableOne").html("");
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
                    seCode: ""
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
                    inCode: ""
                });
            }
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
                    proCode: ""
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
                    finCode: ""
                });
            }
            var _url = "";

            var securities = "";
            var industry = "";
            var province = "";
            var finance = "";
			
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
            var code = "";
            var keyword = $("#comKeyWord").val();
            var start_time = $("#compStartTime").val();
            var stop_time = $("#compEndTime").val();


            _url = $.kf.GETCOMPANYLISTEDLIST + "?" + "keyword=" + keyword + "&securities=" + securities + "&province=" + province + "&industry=" + industry + "&finance=" + finance + "&start_time=" + start_time + "&stop_time=" + stop_time + "&page=" + 1;
            //_url = "http://60.205.57.43:8081/index.php/service/getFundManager?keyword=法人&fund_type=证券投资基金&start_time=2016-7-2&stop_time=2016-8-9&address=北京&page=1";
            new GetTable(_url, $("#pageTool"), "", getList, "get", $("#tableOne")).init();
        });
    };

    var dateSearch = function () {

        /*日历搜索按钮*/
        $("#compDateSearch").on("click", function () {
        	Query.setHash({"page":1});
            var _url = "";
            var securities = "";
            var industry = "";
            var province = "";
            var finance = "";
            $("#tableOne").html("");
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

            var code = "";
            var keyword = $("#comKeyWord").val();
            var start_time = $("#compStartTime").val();
            var stop_time = $("#compEndTime").val();
            if (isNullOrEmpty(start_time) || isNullOrEmpty(stop_time)) {
                return false;
            }

            _url = $.kf.GETCOMPANYLISTEDLIST + "?" + "keyword=" + keyword + "&securities=" + securities + "&province=" + province + "&industry=" + industry + "&finance=" + finance + "&start_time=" + start_time + "&stop_time=" + stop_time + "&page=" + 1;
            //_url = "http://60.205.57.43:8081/index.php/service/getFundManager?keyword=法人&fund_type=证券投资基金&start_time=2016-7-2&stop_time=2016-8-9&address=北京&page=1";
            new GetTable(_url, $("#pageTool"), "", getList, "get", $("#tableOne")).init();
        });
    };

    var getUrlParam = function () {
        var aCode = Query.getHash("seCode");
        var bCode = Query.getHash("inCode");
        var cCode = Query.getHash("proCode");
        var dCode = Query.getHash("finCode");
        var a = "", b = "", c = "", d = "";
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
                } else {
                    $(this).addClass("hang-active");
                    $(this).siblings("li").removeClass("hang-active");
                    d = $(this).text();
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
        }
        //显示关闭按钮
        $("#soClear").on("click", function () {
        	Query.setHash({"page":1});
            Query.setHash({
                inCode: ""
            });
            Query.setHash({
                seCode: ""
            });
            Query.setHash({
                proCode: ""
            });
            Query.setHash({
                finCode: ""
            });
            $(this).parent("li").siblings().remove();
            $(this).parents("#allListSo").hide();
            $("#compQs").find("li").eq(0).addClass("hang-active").siblings().removeClass("hang-active");
            $("#compHy").find("li").eq(0).addClass("hang-active").siblings().removeClass("hang-active");
            $("#compSf").find("li").eq(0).addClass("hang-active").siblings().removeClass("hang-active");
            $("#compCw").find("li").eq(0).addClass("hang-active").siblings().removeClass("hang-active");
           	
           	$(".city-list").find("li").removeClass("provinceLi");
           	$(".modal-footer").each(function(){
           		$(this).find(".btn").eq(1).addClass("default").removeClass("btn-primary");
           	});
           	
            //券商
	        var securities = "";
	        //行业
	        var industry = "";
	        //省份
	        var province = "";
	        //财务
	        var finance = "";
	        var code = "";
	        var keyword = $("#comKeyWord").val();
	        var start_time = $("#compStartTime").val();
	        var stop_time = $("#compEndTime").val();

            _url = $.kf.GETCOMPANYLISTEDLIST + "?" + "keyword=" + keyword + "&securities=" + securities + "&province=" + province + "&industry=" + industry + "&finance="+ finance + "&start_time=" + start_time + "&stop_time=" + stop_time + "&page=" + 1;
            new GetTable(_url, $("#pageTool"), "", getList, "get", $("#tableOne")).init();
        });
        //初始化列表
        initTable();

        //清空选项
        removeThing();
    };
    //初始化表格
    var initTable = function () {/*
        var securities = "";
        var industry = "";
        var province = "";
        var finance = "";
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

		var mode = $(".menu1").text();
        var type = "";
        if(!isNullOrEmpty(Query.getHash("type"))){
        	type = Query.getHash("type");
        	if(type == 1){
        		$("#comSelect1").children("a").html('创新层<b class="caret"></b>');
        	}else if(type == 2){
        		$("#comSelect1").children("a").html('基础层<b class="caret"></b>');
        	}
        }else{
        	if ($(".menu2").text() == "创新层") {
	            type = 1;
	        } else if ($(".menu2").text() == "基础层") {
	            type = 2;
	        }
        }
        var code = "";
        var keyword = $("#comKeyWord").val();
        var start_time = $("#compStartTime").val();
        var stop_time = $("#compEndTime").val();
        var _url = "";
        _url = $.kf.GETCOMPANYLISTEDLIST + "?"+ "type=" + type+ "&mode=" + mode + "&keyword=" + keyword + "&securities=" + securities + "&province=" + province + "&industry=" + industry + "&finance=" + finance +"&start_time=" + start_time + "&stop_time=" + stop_time + "&page=" + 1;
		var lastPage = Query.getHash("page");
        new GetTable(_url, $("#pageTool"), "", getList, "get", $("#tableOne"),lastPage).init();
		
    */
   	 	$("#sample_1").tableList({
   	 		url:$.kf.GETCOMPANYLISTEDLIST,
	    	el:$("#pageTool"),
	    	param:"",
	    	listFun:getList,
	    	method:"get",
	    	lastPage:1,
	    	loadEle:null,
	    	isShowData:false,
	    	tbodyId: $("#tableOne")
   	 	});
    
    };

    var keyWord = function () {
        /*关键词搜索按钮*/
        $("#compBtn").on("click", function () {
        	Query.setHash({"page":1});
            var securities = "";
            var industry = "";
            var province = "";
            var finance = "";
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

            var mode = $(".menu1").text();
            var type = "";
            if ($(".menu2").text() == "创新层") {
                type = 1;
            } else if ($(".menu2").text() == "基础层") {
                type = 2;
            }
            var code = "";
            var keyword = $("#comKeyWord").val();
            var start_time = $("#compStartTime").val();
            var stop_time = $("#compEndTime").val();



            var _url = "";
           
            if (compareDate(start_time, stop_time)) {
                $("#tableOne").html("");
                var _url = $.kf.GETCOMPANYLISTEDLIST + "?" + "&securities=" + securities + "&province=" + province + "&industry=" + industry + "&finance=" + finance +"&keyword=" + keyword + "&start_time=" + start_time + "&stop_time=" + stop_time + "&mode=" + mode + "&type=" + type;
                //_url = "http://60.205.57.43:8081/index.php/service/getFundManager?keyword=法人&fund_type=证券投资基金&start_time=2016-7-2&stop_time=2016-8-9&address=北京&page=1";
                new GetTable(_url, $("#pageTool"), "", getList, "get", $("#tableOne")).init();
            }
            ;

        });
        //重置
        $("#compReset").on("click", function () {
        	Query.setHash({"page":1});
        	$(this).parents(".page-content-par").find("input").val("");
            initTable();
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
		var tr = "";
		var trPop = "";
		var m = 0;
		$("#comSpecial").html("").append("<li class='hang-active'>全部</li>");
		$(data).each(function(i){
			m++;
			if(i < 5){
				tr += "<li name =" + data[i].code +">" + data[i].broker_name + "</li>";
			}else{
				trPop += "<li data-name=" + data[i].letter +" name =" + data[i].code +" title=' " + data[i].broker_name + " '>" + data[i].broker_name + "</li>";
			}
		});
		
		
		$("#comSpecial").append(tr);
		
		//是否显示更多按钮
		if(m > 5){
			$("#comSpecial").append('<li id = "trPop"  class="hang-more" data-toggle="modal" data-target="#myModal02">更多>></li>');
		}
	
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
		$("#compIndustry").html("").append("<li class='hang-active' name=''>全部</li>");
		$(data).each(function(i){
			m++;
			if(i < 5){
				tr += "<li  name =" + data[i].code +">" + data[i].name + "</li>";
			}else{
				trPop2 += "<li data-name=" + data[i].letter +" name =" + data[i].code +" title=' " + data[i].name + " '><span>" + data[i].name + "</span></li>";
			}
			
		});
		
		
		$("#compIndustry").append(tr);
		
		if(m > 5){
			
			$("#compIndustry").append('<li id = "trPop2" class="hang-more" data-toggle="modal" data-target="#myModal03">更多>></li>');
		}
		
		$("#compPop2").find("ul").empty("").html("");
		$("#compPop2").find("ul").append(trPop2);
		//字母选择
		popLetter();
		
		comPopIndu();
		
		listComClick();
		
		getUrlParam();//地址栏参数，刷新
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
			$(".city-list").find("li").show();
			if(_text != ""){
				Query.setHash({"page":1});
				$('#myModal').modal('hide');
				$("#tableOne").html("");
				$("#compSf").find("li").removeClass("hang-active");
				Query.setHash({
					proCode:proCode
				});
				var _url = "";
		
				var securities = "";
				var industry = "";
				var finance = "";
				//券商
				if($(".listOne").size()){
					securities = $(".listOne").attr("name");
				}else if($("#compQs").find(".hang-active").text() == "全部"){
					securities = "";
				}else{
					securities = $("#compQs").find(".hang-active").attr("name")
				}
				//行业
				if($(".listTwo").size()){
					industry = $(".listTwo").attr("name");
				}else if($("#compHy").find(".hang-active").text() == "全部"){
					industry = "";
				}else{
					industry = $("#compHy").find(".hang-active").attr("name")
				}
				//财务
				if($(".listFour").size()){
					finance = $(".listFour").text();
				}else if($("#compCw").find(".hang-active").text() == "全部"){
					finance = "";
				}else{
					finance = $("#compCw").find(".hang-active").text()
				}
				
				var province = _text;
				var code = "";	
				var keyword = $("#comKeyWord").val();
				var start_time = $("#compStartTime").val();
				var stop_time = $("#compEndTime").val();
				
				_url = $.kf.GETCOMPANYLISTEDLIST+"?"+"keyword="+keyword+"&finance="+finance+"&securities="+securities+"&province="+province+"&industry="+industry+"&start_time="+start_time+"&stop_time="+ stop_time+"&page="+1;                                                                
				//_url = "http://60.205.57.43:8081/index.php/service/getFundManager?keyword=法人&fund_type=证券投资基金&start_time=2016-7-2&stop_time=2016-8-9&address=北京&page=1";
				new GetTable(_url,$("#pageTool"),"",getList,"get",$("#tableOne")).init();
				$("#allListSo").show();
				$(".listThree").remove();
				$("#allListSo").find("ul").prepend("<li class='listThree' name =" + proCode + ">" + _text + "<span class='soListClose'></span></li>");
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
			$(".city-list").find("li").show();
			if(_text != ""){
				Query.setHash({"page":1});
				$('#myModal02').modal('hide');
				$("#tableOne").html("");
				$("#compQs").find("li").removeClass("hang-active");
				Query.setHash({
					seCode:seCode
				});
				var securities = seCode;
				var industry = "";
				var finance = "";
				//行业
				if($(".listTwo").size()){
					industry = $(".listTwo").attr("name");
				}else if($("#compHy").find(".hang-active").text() == "全部"){
					industry = "";
				}else{
					industry = $("#compHy").find(".hang-active").attr("name")
				}
				
				//省份
				if($(".listThree").size()){
					province = $(".listThree").text();
				}else if($("#compSf").find(".hang-active").text() == "全部"){
					province = "";
				}else{
					province = $("#compHy").find(".hang-active").text();
				}
				//财务
				if($(".listFour").size()){
					finance = $(".listFour").text();
				}else if($("#compCw").find(".hang-active").text() == "全部"){
					finance = "";
				}else{
					finance = $("#compCw").find(".hang-active").text()
				}
				
				var code = "";	
				var keyword = $("#comKeyWord").val();
				var start_time = $("#compStartTime").val();
				var stop_time = $("#compEndTime").val();
				var _url = "";
				
				_url = $.kf.GETCOMPANYLISTEDLIST+"?"+"keyword="+keyword+"&finance="+finance+"&securities="+securities+"&province="+province+"&industry="+industry+"&start_time="+start_time+"&stop_time="+ stop_time+"&page="+1;                                                                
				//_url = "http://60.205.57.43:8081/index.php/service/getFundManager?keyword=法人&fund_type=证券投资基金&start_time=2016-7-2&stop_time=2016-8-9&address=北京&page=1";
				new GetTable(_url,$("#pageTool"),"",getList,"get",$("#tableOne")).init();
				$("#allListSo").show();
				$(".listOne").remove();
				$("#allListSo").find("ul").prepend("<li class='listOne' name =" + seCode + ">" + _text + "<span class='soListClose'></span></li>");
				_text = '';
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
			$(".city-list").find("li").show();
			if(_text != ""){
				Query.setHash({"page":1});
				$('#myModal03').modal('hide');
				$("#tableOne").html("");
				$("#compHy").find("li").removeClass("hang-active");
				Query.setHash({
					inCode:inCode
				});
				var industry = inCode;
				var securities = "";
				var finance = "";
				//券商
				if($(".listOne").size()){
					securities = $(".listOne").attr("name");
				}else if($("#compQs").find(".hang-active").text() == "全部"){
					securities = "";
				}else{
					securities = $("#compQs").find(".hang-active").attr("name")
				}
				
				//省份
				if($(".listThree").size()){
					province = $(".listThree").text();
				}else if($("#compSf").find(".hang-active").text() == "全部"){
					province = "";
				}else{
					province = $("#compHy").find(".hang-active").text();
				}
				//财务
				if($(".listFour").size()){
					finance = $(".listFour").text();
				}else if($("#compCw").find(".hang-active").text() == "全部"){
					finance = "";
				}else{
					finance = $("#compCw").find(".hang-active").text()
				}
				var code = "";	
				var keyword = "";
				var start_time = $("#compStartTime").val();
				var stop_time = $("#compEndTime").val();
				var _url = "";
				_url = $.kf.GETCOMPANYLISTEDLIST+"?"+"keyword="+keyword+"&finance="+finance+"&securities="+securities+"&province="+province+"&industry="+industry+"&start_time="+start_time+"&stop_time="+ stop_time+"&page="+1;                                                                
				//_url = "http://60.205.57.43:8081/index.php/service/getFundManager?keyword=法人&fund_type=证券投资基金&start_time=2016-7-2&stop_time=2016-8-9&address=北京&page=1";
				new GetTable(_url,$("#pageTool"),"",getList,"get",$("#tableOne")).init();
				$("#allListSo").show();
				$(".listTwo").remove();
				$("#allListSo").find("ul").prepend("<li class='listTwo' name =" + inCode + ">" + _text + "<span class='soListClose'></span></li>");
				_text = "";
			}
			removeThing();
		})
	};
	
	var tableSelect = function(){
		new Select($("#comSelect1"),{}).init();
		new Select($("#comSelect2"),{}).init();
		//转让方式
		$("#comSelect2").find("li").on("click",function(){
			$("#tableOne").html("");
			var inCode = "";
			Query.setHash({
				inCode:inCode
			});
			var industry = inCode;
			//行业
			if($(".listTwo").size()){
				industry = $(".listTwo").attr("name");
			}else if($("#compHy").find(".hang-active").text() == "全部"){
				industry = "";
			}else{
				industry = $("#compHy").find(".hang-active").attr("name")
			}
			//券商
			if($(".listOne").size()){
				securities = $(".listOne").attr("name");
			}else if($("#compQs").find(".hang-active").text() == "全部"){
				securities = "";
			}else{
				securities = $("#compQs").find(".hang-active").attr("name")
			}
			
			//省份
			if($(".listThree").size()){
				province = $(".listThree").text();
			}else if($("#compSf").find(".hang-active").text() == "全部"){
				province = "";
			}else{
				province = $("#compHy").find(".hang-active").text();
			}
			//财务
			if($(".listFour").size()){
				finance = $(".listFour").text();
			}else if($("#compSf").find(".hang-active").text() == "全部"){
				finance = "";
			}else{
				finance = $("#compCw").find(".hang-active").text();
			}
			var keyword = $("#comKeyWord").val();
			var start_time = $("#compStartTime").val();
			var stop_time = $("#compEndTime").val();
			var mode = trim($(this).text());
			var type = $(".menu2").text();
			var _url = $.kf.GETCOMPANYLISTEDLIST+"?"+"&securities="+securities+"&province="+province+"&industry="+industry+ "&finance=" + finance +"&keyword="+keyword+"&start_time="+start_time+"&stop_time="+ stop_time+"&mode="+mode+"&type="+type;
			new GetTable(_url,$("#pageTool"),"",getList,"get",$("#tableOne")).init();
		});
		//市场层级
		$("#comSelect1").find("li").on("click",function(){
			Query.setHash({"page":1});
			$("#tableOne").html("");
			var inCode = "";
			Query.setHash({
				inCode:inCode
			});
			var industry = inCode;
			//行业
			if($(".listTwo").size()){
				industry = $(".listTwo").attr("name");
			}else if($("#compHy").find(".hang-active").text() == "全部"){
				industry = "";
			}else{
				industry = $("#compHy").find(".hang-active").attr("name")
			}
			//券商
			if($(".listOne").size()){
				securities = $(".listOne").attr("name");
			}else if($("#compQs").find(".hang-active").text() == "全部"){
				securities = "";
			}else{
				securities = $("#compQs").find(".hang-active").attr("name")
			}
			
			//省份
			if($(".listThree").size()){
				province = $(".listThree").text();
			}else if($("#compSf").find(".hang-active").text() == "全部"){
				province = "";
			}else{
				province = $("#compHy").find(".hang-active").text();
			}
			//财务
			if($(".listFour").size()){
				finance = $(".listFour").text();
			}else if($("#compCw").find(".hang-active").text() == "全部"){
				finance = "";
			}else{
				finance = $("#compCw").find(".hang-active").text();
			}
			var keyword = $("#comKeyWord").val();
			var start_time = $("#compStartTime").val();
			var stop_time = $("#compEndTime").val();
			var type = "";
			var mode = $(".menu1").text();
			if($(this).find("a").text() == "创新层"){
				type = 1;
			}else if($(this).find("a").text() == "基础层"){
				type = 2;
			}
			var _url = $.kf.GETCOMPANYLISTEDLIST+"?"+"&securities="+securities+"&province="+province+"&industry="+industry+ "&finance=" + finance +"&keyword="+keyword+"&start_time="+start_time+"&stop_time="+ stop_time+"&mode="+mode+"&type="+type;
			new GetTable(_url,$("#pageTool"),"",getList,"get",$("#tableOne")).init();
		});
	}
	
	return {
		init:function(){
			dateSearch();//日历选项
			specialWord();//加载券商选项
			//industryWord();//加载行业选项
			keyWord();//关键字搜索
			provinceChoose();//弹窗选择省份
			tableSelect();//表格标题下拉框
			
		}
	}
}();



/*
 
 * 
 * 基金管理人列表
 * 
 * 
 * 
 * */

var CnFund = function(){
	
	//基金管理选项
	
	var cnCheck = function(){
		var cnFundLists = $(".cnFundList");
		cnFundLists.find("li").unbind("click").on("click",function(){
			Query.setHash({"page":1});
			var ind = $("#cnFundCheck").find("li").length;
			if(!$(this).hasClass("hang-more")){
				$("#cnFund").html("");
				$(this).addClass("hang-active");
				$(this).siblings().removeClass("hang-active");
				if($(this).parents(".cnFundList").attr("id") == "cnFundList01"){
					var fundCode = $(this).attr("name");
					if($(this).index() == 0){
						if($(".listOneFund").length){
							if(ind <= 2){
								$("#cnAllFund").hide();
							}
							
							$(".listOneFund").remove();
							Query.setHash({
								fund_type:""
							});
						}
						
					}else{
						$("#cnAllFund").show();
						Query.setHash({
							fund_type:fundCode
						});
						$(".listOneFund").remove();
						$("#cnAllFund").find("ul").prepend("<li name='"+fundCode+"' class='listOneFund'>" + $(this).text() + "<span class='soListClose fundListClose'></span></li>");
					}
				};
				if($(this).parents(".cnFundList").attr("id") == "cnFundList02"){
					var addCode = $(this).attr("name");
					if($(this).index() == 0){
						if($(".listTwoFund").length){
							if(ind <= 2){
								$("#cnAllFund").hide();
							}
							$(".listTwoFund").remove();
							Query.setHash({
								address:""
							});
						}
						
					}else{
						$("#cnAllFund").show();
						Query.setHash({
							address:addCode
						});
						$(".listTwoFund").remove();
						$("#cnAllFund").find("ul").prepend("<li class='listTwoFund'>" + $(this).text() + "<span class='soListClose fundListClose'></span></li>");
					}
				}
				var _url = "";
				var fund_type = "";
				var address = "";
				if ($(".listOneFund").size()) {
	                fund_type = $(".listOneFund").text();
	            } else if ($("#cnFundList01").find(".hang-active").text() == "全部") {
	                fund_type = "";
	            } else {
	                fund_type = $("#cnFundList01").find(".hang-active").text();
	            }
	            //省份
	            if ($(".listTwoFund").size()) {
	                address = $(".listTwoFund").text();
	            } else if ($("#cnFundList02").find(".hang-active").text() == "全部") {
	                address = "";
	            } else {
	                address = $("#cnFundList02").find(".hang-active").text();
	            }
				var keyword = $("#cnFundNmae").val();
				var start_time = $("#cnFundTime01").val();
				var stop_time = $("#cnFundTime02").val();
				
				_url = $.kf.GETFUNDMANAGER+"?"+"keyword="+keyword+"&fund_type="+fund_type+"&start_time="+start_time+"&stop_time="+ stop_time+"&address="+address+"&page="+1;                                                                
				//_url = "http://60.205.57.43:8081/index.php/service/getFundManager?keyword=法人&fund_type=证券投资基金&start_time=2016-7-2&stop_time=2016-8-9&address=北京&page=1";
				new GetTable(_url,$("#pageCnFund"),"",cnFundList,"get",$("#cnFund")).init();
			}
			removeCheck();
		});
		showBtn();
	};
	
	var showBtn = function(){
		$("#soFundClear").on("click",function(){
			Query.setHash({"page":1});
			$(this).parents(".soList").find("li").children("span").show();
		});
	};
	var cnFundList = function(data){//加载表格
		var list = data.data;
		
		var tr = "";
		$("#cnFund").html("");
		/*var id = Query.getHash("id");*/
		$(list).each(function(i){
			tr += "<tr>";
			tr += "<td><a href='"+$.url.fundManagerUrl()+"#id="+list[i].id+"'>" + list[i].name+"</a></td>";
			tr += "<td>" + list[i].legal_person + "</td>";
			tr += "<td>" + list[i].fund_type  + "</td>";
			tr += "<td>" + list[i].reg_address  + "</td>";
			tr += "<td>" + list[i].founding_time + "</td>";
			tr += "<td>" + list[i].reg_time + "</td>";
			tr += "<td>" + list[i].fund_count + "</td>";
			tr += "</tr>";
		});
		$("#cnFund").append(tr);
		
	};
	var getFundParam = function(){ //地址栏参数
		var afund = Query.getHash("address");
		var bfund = Query.getHash("fund_type");
		var afundText = "";
		var bfundText = "";
		if(!isNullOrEmpty()){
			
		}
		$(".cnFundList").find("li").each(function(){
			if(!isNullOrEmpty(afund)){
				if($(this).attr("name") == afund){
					$(this).addClass("hang-active");
					$(this).siblings("li").removeClass("hang-active");
					afundText = $(this).text();
				}
			};
			if(!isNullOrEmpty(bfund)){
				if($(this).attr("name") == bfund){
					$(this).addClass("hang-active");
					$(this).siblings("li").removeClass("hang-active");
					bfundText = $(this).text();
				};
			};
			
			$("#cnFundList02").find("li").each(function(i){
				if(!isNullOrEmpty(afund)){
					if($(this).attr("name") != afund){
						$(this).removeClass("hang-active");
						$(this).nextAll("li").removeClass("hang-active");
						$("#comProvince").find("li").each(function(){
							if($(this).attr("name") == afund ){
								afundText = $(this).text();
							}
						});
					}else{
						$(this).addClass("hang-active");
						$(this).siblings("li").removeClass("hang-active");
					}
				}
				
			});
		});
		if(isNullOrEmpty(afund) && isNullOrEmpty(bfund) ){
			$("#cnAllFund").hide();
		}
		if(!isNullOrEmpty(afund)){
			$("#cnAllFund").show();
			$(".listTwoFund").remove();
			$("#cnAllFund").find("ul").prepend("<li class='listTwoFund'>" + afundText + "<span class='soListClose'></span></li>");
		}
		if(!isNullOrEmpty(bfund)){
			$("#cnAllFund").show();
			$(".listOneFund").remove();
			$("#cnAllFund").find("ul").prepend("<li class='listOneFund'>" + bfundText + "<span class='soListClose'></span></li>");
		}
		//显示关闭按钮
		$("#soFundClear").on("click",function(){
			Query.setHash({"page":1});
			 Query.setHash({
                fund_type: ""
            });
            Query.setHash({
                address: ""
            });
            $("#comProvince").find("li").removeClass("provinceLi");
        	$("#compProvSave").addClass("default").removeClass("btn-primary");
            $(this).parent("li").siblings().remove();
            $(this).parents("#cnAllFund").hide();
            $("#cnFundList01").find("li").eq(0).addClass("hang-active").siblings().removeClass("hang-active");
            $("#cnFundList02").find("li").eq(0).addClass("hang-active").siblings().removeClass("hang-active");
           
           var keyword = $("#cnFundNmae").val();
			var start_time = $("#cnFundTime01").val();
			var stop_time = $("#cnFundTime02").val();
			var fund_type = '';
			var address = '';
			_url = $.kf.GETFUNDMANAGER+"?"+"keyword="+keyword+"&fund_type="+fund_type+"&start_time="+start_time+"&stop_time="+ stop_time+"&address="+address+"&page="+1;                                                                
			//_url = "http://60.205.57.43:8081/index.php/service/getFundManager?keyword=法人&fund_type=证券投资基金&start_time=2016-7-2&stop_time=2016-8-9&address=北京&page=1";
			new GetTable(_url,$("#pageCnFund"),"",cnFundList,"get",$("#cnFund")).init();
		});
		
		
		showBtn();
		removeCheck();
		initTableFund();
		
	};
	var removeCheck = function(){
		//点击关闭按钮
		$(".soListClose").unbind().on("click",function(){
			Query.setHash({"page":1});
			$("#cnFund").html("");
			var flg = $(this).index();
			if($(this).parents(".allListSo").find("li").length == 2){
				$(this).parents(".allListSo").hide();
			}
			$(this).parent().remove();
			//查询条件清除地址栏参数
			if($(this).parent().hasClass("listOneFund")){
				$("#cnFundList01").find("li").each(function(){
					if($(this).text() == "全部"){
						$(this).addClass("hang-active");
						$(this).siblings().removeClass("hang-active");
					}
				});
				Query.setHash({
					fund_type:""
				});
			}
			//查询条件清除地址栏参数
			if($(this).parent().hasClass("listTwoFund")){
				$("#comProvince").find("li").removeClass("provinceLi");
            	$("#compProvSave").addClass("default").removeClass("btn-primary");
				$("#cnFundList02").find("li").each(function(){
					if($(this).text() == "全部"){
						$(this).addClass("hang-active");
						$(this).siblings().removeClass("hang-active");
					}
				});
				Query.setHash({//清除地址栏对应的参数
					address:""
				});
			}
			var _url = "";
			var fund_type = "";
			var address = "";
			if ($(".listOneFund").size()) {
                fund_type = $(".listOneFund").text();
            } else if ($("#cnFundList01").find(".hang-active").text() == "全部") {
                fund_type = "";
            } else {
                fund_type = $("#cnFundList01").find(".hang-active").text();
            }
            //省份
            if ($(".listTwoFund").size()) {
                address = $(".listTwoFund").text();
            } else if ($("#cnFundList02").find(".hang-active").text() == "全部") {
                address = "";
            } else {
                address = $("#cnFundList02").find(".hang-active").text();
            }
			var keyword = $("#cnFundNmae").val();
			var start_time = $("#cnFundTime01").val();
			var stop_time = $("#cnFundTime02").val();
			
			if($(this).parent().hasClass("listOneFund")){
				fund_type = "";
			};
			if($(this).parent().hasClass("listTwoFund")){
				address = "";
			}
			_url = $.kf.GETFUNDMANAGER+"?"+"keyword="+keyword+"&fund_type="+fund_type+"&start_time="+start_time+"&stop_time="+ stop_time+"&address="+address+"&page="+1;                                                                
			//_url = "http://60.205.57.43:8081/index.php/service/getFundManager?keyword=法人&fund_type=证券投资基金&start_time=2016-7-2&stop_time=2016-8-9&address=北京&page=1";
			new GetTable(_url,$("#pageCnFund"),"",cnFundList,"get",$("#cnFund")).init();
		});
	};
	
	//关键字搜索
	var keyWordFund = function(){
		/*关键词搜索按钮*/
		$("#cnFundBtn").on("click",function(){
			Query.setHash({"page":1});
			var _url = "";
		
			var fund_type = "";
			var address = "";
			if ($(".listOneFund").size()) {
                fund_type = $(".listOneFund").text();
            } else if ($("#cnFundList01").find(".hang-active").text() == "全部") {
                fund_type = "";
            } else {
                fund_type = $("#cnFundList01").find(".hang-active").text();
            }
            //省份
            if ($(".listTwoFund").size()) {
                address = $(".listTwoFund").text();
            } else if ($("#cnFundList02").find(".hang-active").text() == "全部") {
                address = "";
            } else {
                address = $("#cnFundList02").find(".hang-active").text();
            }
			var keyword = $("#cnFundNmae").val();
			var start_time = $("#cnFundTime01").val();
			var stop_time = $("#cnFundTime02").val();
			
			fund_type = fund_type != "" ? fund_type :$(".listOneFund").text();
			address = address != "" ? address :$(".listTwoFund").text();
			if(compareDate(start_time,stop_time)){
				$("#cnFund").html("");
				_url = $.kf.GETFUNDMANAGER+"?"+"keyword="+keyword+"&fund_type="+fund_type+"&start_time="+start_time+"&stop_time="+ stop_time+"&address="+address+"&page="+1;                                                                
				//_url = "http://60.205.57.43:8081/index.php/service/getFundManager?keyword=法人&fund_type=证券投资基金&start_time=2016-7-2&stop_time=2016-8-9&address=北京&page=1";
				new GetTable(_url,$("#pageCnFund"),"",cnFundList,"get",$("#cnFund")).init();
			}
			
			
		});
		//重置
		$("#compReset").on("click",function(){
			Query.setHash({"page":1});
			$(this).parents(".page-content-par").find("input").val("");
			initTableFund();
		});
		$("#cnFundNmae").on("keydown",function(e){
			var keyCode = e.which;
			if(keyCode == 13){
				$("#cnFundBtn").click();
			}
			
		});
	};
	//省份选择pop
	var provinceChooseFund = function(){
		var _text = "";
		var addCode = "";
		$("#comProvince").find("li").on("click",function(){
			$("#compProvSave").addClass("btn-primary").removeClass("default");
			_text = $(this).text();
			addCode = $(this).attr("name");
			$(this).addClass("provinceLi");
			$(this).siblings().removeClass("provinceLi");
		});
		$("#compProvSave").unbind().on("click",function(){
			$(".city-list").find("li").show();
			if(_text != ""){
				Query.setHash({"page":1});
				$('#myModal').modal('hide');
				$("#cnFund").html("");
				$("#cnFundList02").find("li").removeClass("hang-active");
				Query.setHash({
					address:addCode
				});
				var fund_type = "";
				var address = "";
				if ($(".listOneFund").size()) {
	                fund_type = $(".listOneFund").attr("name");
	            } else if ($("#cnFundList01").find(".hang-active").text() == "全部") {
	                fund_type = "";
	            } else {
	                fund_type = $("#cnFundList01").find(".hang-active").attr("name")
	            }
				var address = _text;
				var keyword = $("#cnFundNmae").val();
				var start_time = $("#cnFundTime01").val();
				var stop_time = $("#cnFundTime02").val();
				
				var _url = $.kf.GETFUNDMANAGER+"?"+"keyword="+keyword+"&fund_type="+fund_type+"&start_time="+start_time+"&stop_time="+ stop_time+"&address="+address+"&page="+1; 
				new GetTable(_url,$("#pageCnFund"),"",cnFundList,"get",$("#cnFund")).init();
				
				$("#cnAllFund").show();
				$(".listTwoFund").remove();
				$("#cnAllFund").find("ul").prepend("<li class='listTwoFund'>" + _text + "<span class='soListClose'></span></li>");
				_text = "";
			}
			removeCheck();
		})
		
	};
	var initTableFund = function(){
		var _url = "";
		
		var fund_type = "";
		var address = "";
		if ($(".listOneFund").size()) {
            fund_type = $(".listOneFund").text();
        } else if ($("#cnFundList01").find(".hang-active").text() == "全部") {
            fund_type = "";
        } else {
            fund_type = $("#cnFundList01").find(".hang-active").text();
        }
        //省份
        if ($(".listTwoFund").size()) {
            address = $(".listTwoFund").text();
        } else if ($("#cnFundList02").find(".hang-active").text() == "全部") {
            address = "";
        } else {
            address = $("#cnFundList02").find(".hang-active").text();
        }
		var keyword = $("#cnFundNmae").val();
		var start_time = $("#cnFundTime01").val();
		var stop_time = $("#cnFundTime02").val();
		
		fund_type = fund_type != "" ? fund_type :$(".listOneFund").text();
		address = address != "" ? address :$(".listTwoFund").text();
		
		_url = $.kf.GETFUNDMANAGER+"?"+"keyword="+keyword+"&fund_type="+fund_type+"&start_time="+start_time+"&stop_time="+ stop_time+"&address="+address+"&page="+1;                                                                
		//_url = "http://60.205.57.43:8081/index.php/service/getFundManager?keyword=法人&fund_type=证券投资基金&start_time=2016-7-2&stop_time=2016-8-9&address=北京&page=1";
		new GetTable(_url,$("#pageCnFund"),"",cnFundList,"get",$("#cnFund")).init();
	};
	return {
		init:function(){
			//initTableFund();
			cnCheck();//基金管理选项点击
			getFundParam();//地址栏参数
			//fundSearchDate();//日历查询
			keyWordFund();//关键字搜索
			provinceChooseFund();//省份选择
		}
	}
	
}();
/*
 
 * 
 * 基金管理人列表  end
 * 
 * 
 * 
 * */




/*
 
 * 
 * 
 * 基金管理人详情
 * 
 * 
 * 
 * */
var fundMgDetail = function(){
	
	var fundMsg = function(){
		
		var id= Query.getHash("id");
		var _url = $.kf.GETMANAGERINFO+"?"+"id="+id; 
		
		$.kf.ajax({
            type: "get",
            url: _url,
            data: "",
            dataType: "json",
            processResponse: function (data) {

                fundMsgList(data);

                var obj = data.data;
                var obj1 = obj.executive;
                var obj2 = obj.managerFund;
                if (isData($(".dataDiv1"), obj1, "")) {
                    deList(data);
                }
                ;
                if (isData($(".dataDiv2"), obj2, "")) {
                    deListTwo(data);
                }
            }
        });
    };

    //拼接新闻列表
    var fundMsgList = function (data) {
        var list = data.data;

        $("#lastTime").text(list.updatedDate);
        //写入信息
        $("#compName").text(list.fullname);
        $("#legalPerson").text(list.legalPerson);
        $("#regDate").text(list.regDate);
        $("#fundType").text(list.fundType);
        
        if (isNullOrEmpty(list.website)) {
            trs += ""
        }else{
            $("#website").html("<a href=" + list.website + " target='_blank'>" + list.website + "</a>");
        }
        
        
        $("#regAddress").text(list.regAddress);
        $("#remoney").text(list.remoney);
        $("#memberNum").text(list.memberNum);
        $("#orgCode").text(list.orgCode);
        $("#workAddress").text(list.workAddress);
        $("#realMoney").text(list.realMoney);
        $("#companyType").text(list.companyType);
        $("#deDcode").text(list.code);
        $("#fund_other").text(list.fund_other);
        $("#realRatio").text(list.realRatio);

        $("#realRatio").text(list.realRatio);
        $("#fundDate").text(list.fundDate);
        var trs = "";
        trs += "<tr>"
        trs += "<td colspan='2'>"
        if (isNullOrEmpty(list.fullname)) {
            trs += "公司全称："
        }else{
            trs += "公司全称：<a id='industry01' class='toIndusDetail' href='" + $.url.industryUrl() + "#companyName=" + list.fullname + "'>" + list.fullname + "<span class='seeIndustryDetails'>查看详情</span></a>"
        }
        trs += "</td>"
        trs += "</tr>"
        $("#namefulas").prepend(trs);
        var mflg01 = false;//true 不再提示；如需在提示只能清除缓存，或者等待30天有效期
        //扣费跳转
        var isCookie = false;
        moneyUrl($("#industry01"), isCookie, "isCookie");
    };
    var deList = function (data) {
        var list = data.data;
        var executive = list.executive;//高管
        //拼接table
        var tr = "";
        $("#fundMsgTable").html("");
        $(executive).each(function (i) {
            tr += "<tr>";
            tr += "<td><span>" + executive[i].name + "</span></td>";
            tr += "<td><span>" + executive[i].job + "</span></td>";
            tr += "</tr>";
        });
        $("#fundMsgTable").append(tr);



    };
    var deListTwo = function (data) {
        var list = data.data;
        var managerFund = list.managerFund;//实施前成立的基金
        //拼接table
        var tw = "";
        var th = "<tr><th>暂行办法实施前成立的基金 </th><th>暂行办法实施后成立的基金 </th></tr>";
        $("#proMsgTable").html("");
        $("#proMsgTable").html(th);
        $(managerFund).each(function (i) {
            tw += "<tr>";
            tw += "<td><span>" + managerFund[i].name + "</span></td>";
            tw += "<td><span>" + managerFund[i].lastName + "</span></td>";
            tw += "</tr>";
        });
        $("#proMsgTable").append(tw);
    }


	
	
	
	
	
	return {
		init:function(){
			fundMsg();
		}
	}
	
	
}();

















