var searchList = function () {
	var Tone = $("#Tone").val();
    var Ttwo = $("#Ttwo").val();
    var Tthree = $("#Tthree").val();
    var Cone = $("#Cone").val();
    var Ctwo = $("#Ctwo").val();
    var Cthree = $("#Cthree").val();
    //选项的点击事件
    var listComClick = function () {
        var type = "";
        var securities = "";
        var industry = "";
        var province = "";
        $(".allList").find("li").unbind("click").on("click", function (event) {
            event.preventDefault();
            var ind = $("#soCheck").find("li").length;
            if (!$(this).hasClass("hang-more")) {
                $("#tableOne").html("");
                $(this).parent("ul").find("li").removeClass("hang-active");
                $(this).addClass("hang-active");

                /*公告类型*/
                if ($(this).parents(".allList").attr("id") == "type") {
                    type = $(this).text();
                    var noCode = $(this).attr("name");
                    if ($(this).index() == 0) {
                    	if($(".listNote").length){
                    		if(ind <=2){
                    			$("#allListSo").hide();
                    		}
                    	}
                        Query.setHash({
                            "noCode": "",
                			"page":1
                        });
                        $(".listNote").remove();
                    } else {
                    	$("#allListSo").show();
                        Query.setHash({
                            "noCode": noCode,
                            "page":1
                        });
                        $(".listNote").remove();
                        $("#allListSo").find("ul").prepend("<li class='listNote' name =" + noCode + ">" + type + "<span class='soListClose'></span></li>");
                    }
                }
                /*主办券商*/
                if ($(this).parents(".allList").attr("id") == "compQs") {
                    securities = $(this).text();
                    var seCode = $(this).attr("name");
                    if ($(this).index() == 0) {
                    	if($(".listOne").length){
                    		if(ind <=2){
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
                    		if(ind <=2){
                    			$("#allListSo").hide();	
                    		}
                    		$(".listTwo").remove();
	                        Query.setHash({
	                            "inCode": "",
                            	"page":1
	                        });
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
                    		if(ind <=2){
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

                initTable();
                removeThing();
            }
        });
    }

    /*拼table表格*/
    var getList = function (data) {
        var list = data.data;
        var tr = "";
        $(".pageTotalDiv").remove();
        //$("#countN").text('(' + data.total + ')');
        $("#tableOne").html("");
        $(list).each(function (i) {
            tr += "<tr>";
            tr += "<td width='10%'>" + list[i].date + "</td>";
            tr += "<td width='10%'>" + list[i].code + "</td>";
            tr += "<td width='10%'><a href='"+ $.url.companyListUrl() + "id=" + list[i].companyId + "&nameCodeId="+ list[i].code + "&position=colletion" + "'>" + list[i].companyName + "</a></td>";
            if (isNullOrEmpty(list[i].url)) {
                tr += "<td>"
                tr += "<p style='text-align:left;'><span class='noteTit'>" + list[i].title + "</span></p>"
                tr += "<p style='width:90%;color:#999;text-align:left;'>" + list[i].highlight + "</p></td>";
            } else {
                tr += "<td>"
                tr += "<p style='text-align:left;'><a class='noteTit' href='" + list[i].url + "' target='_blank'>" + list[i].title + "</a></p>"
                tr += "<p style='width:90%;color:#999;text-align:left;'>" + list[i].highlight + "</p></td>";
            }
            if(list[i].isCollection){
                tr += "<td width='10%'><a u_type='' class='noteSCD defaultSC' u_id=" + list[i].id + " name=" + list[i].isCollection + ">已收藏</a></td>";
            }else{
                tr += "<td width='10%'><a u_type='notice' class='noteSCD' u_id=" + list[i].id + " name=" + list[i].isCollection + ">收藏</a></td>";
            }
            tr += "</tr>";
        });
        $("#tableOne").append(tr);
        noteSC();
        clickSC(".noteSCD");
        if(isNullOrEmpty(data.total)){
        	data.total = 0;
        }
        $(".compBtn").after("<div class='allListTow pageTotalDiv'><div class='hang-title' style='margin:12px 6px 8px'>共<span class='pageTotal'>"+ data.total +"</span>条结果</div></div>");
    };
    
    //公告是否收藏
    var noteSC = function () {
        $(".noteSC").each(function () {
            if ($(this).attr("name") == 0) {
                $(this).text("收藏")
            } else {
                $(this).text("已收藏").addClass("defaultSC").unbind("click")
            }
        })
    }
    //点击收藏
    var clickSC = function (className) {
        $(className).on("click", function () {
            if ($(this).attr("name") == 0) {
                //上送参数
                var param = {
                    id: $(this).attr("u_id"),
                    type: $(this).attr("u_type"),
                    keyword: $(this).attr("u_keyword"),
                    title: $(this).parent("td").siblings("td").find(".noteTit").text()
                }
                $.kf.ajax({
                    type: "post",
                    url: $.kf.COLLECTION,
                    data: param,
                    dataType: "json",
                    processResponse: function (data) {
						
                    }
                });
                $(this).text("已收藏").addClass("defaultSC").unbind("click")
            }
        })
    }


    var removeThing = function () {
        //点击关闭按钮
        $(".soListClose").on("click", function () {
            var flg = $(this).index();
            $("#tableOne").html("");
            if ($(this).parents(".allListSo").find("li").length == 2) {
                $(this).parents(".allListSo").hide();
            }
            $(this).parent().remove();
            //查询条件清除地址栏参数
            if ($(this).parent().hasClass("listNote")) {
                $("#type").find("li").each(function () {
                    if ($(this).text() == "全部") {
                        $(this).addClass("hang-active");
                        $(this).siblings().removeClass("hang-active");
                    }
                });
                Query.setHash({
                    noCode: "",
                    "page":1
                });
            }
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
            initTable();
        });
    };
   
    var getUrlParam = function () {
        var nCode = Query.getHash("noCode");
        var aCode = Query.getHash("seCode");
        var bCode = Query.getHash("inCode");
        var cCode = Query.getHash("proCode");
        var n = "", a = "", b = "", c = "";
        $("#type").find("li").each(function (i) {
            if (!isNullOrEmpty(nCode)) {
                if ($(this).attr("name") == nCode) {
                    $(this).addClass("hang-active");
                    $(this).siblings("li").removeClass("hang-active");
                    n = $(this).text();
                }

            }
        });
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
        if (isNullOrEmpty(nCode) && isNullOrEmpty(aCode) && isNullOrEmpty(bCode) && isNullOrEmpty(cCode)) {
            $("#allListSo").hide();
        }
        if (!isNullOrEmpty(nCode)) {
            $("#allListSo").show();
            $(".listNote").remove();
            $("#allListSo").find("ul").prepend("<li class='listNote' name=" + nCode + ">" + n + "<span class='soListClose'></span></li>");
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
            //$(this).parents(".soList").find("li").children("span").show();
             Query.setHash({
                inCode: "",
                seCode: "", 
                noCode: "",
                proCode: "",
                page:1
            });
            $(".city-list").find("li").removeClass("provinceLi");
           	$(".modal-footer").each(function(){
           		$(this).find(".btn").eq(1).addClass("default").removeClass("btn-primary");
           	});
            $(this).parent("li").siblings().remove();
            $(this).parents("#allListSo").hide();
            $("#compQs").find("li").eq(0).addClass("hang-active").siblings().removeClass("hang-active");
            $("#compHy").find("li").eq(0).addClass("hang-active").siblings().removeClass("hang-active");
            $("#compSf").find("li").eq(0).addClass("hang-active").siblings().removeClass("hang-active");
            $("#type").find("li").eq(0).addClass("hang-active").siblings().removeClass("hang-active");
            initTable();
        });
        //初始化列表
        initTable();

        //清空选项
        removeThing();
    };
    //初始化表格
    var initTable = function () {
        var type = "";
        var securities = "";
        var industry = "";
        var province = "";
        //公告类型
        if ($(".listNote").size()) {
            type = $(".listNote").attr("name");
        } else if ($("#type").find(".hang-active").text() == "全部") {
            type = "";
        } else {
            type = $("#type").find(".hang-active").attr("name")
        }
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


        var code = "";
        var keyword = $("#keyword").val();
        var start_time = $("#compStartTime").val();
        var stop_time = $("#compEndTime").val();
        var Tone = $("#Tone").val();
        var Ttwo = $("#Ttwo").val();
        var Tthree = $("#Tthree").val();
        var Cone = $("#Cone").val();
        var Ctwo = $("#Ctwo").val();
        var Cthree = $("#Cthree").val();

        _url = $.kf.SEARCHNOTICE + "?" + "type=" + type + "&securities=" + securities + "&province=" + province + "&industry=" + industry + "&keyword=" + keyword + "&title_all=" + Tone + "&title_any=" + Ttwo + "&title_no=" + Tthree + "&content_all=" + Cone + "&content_any=" + Ctwo + "&content_no=" + Cthree + "&start_time=" + start_time + "&stop_time=" + stop_time;
        //new GetTable(_url, $("#pageTool"), "", getList, "get", $("#tableOne")).init();
        if (compareDate(start_time, stop_time)) {
            $("#tableOne").html("");
			var lastPage = Query.getHash("page");
            $.getTable({
	        	url:_url,//url
		    	pageId:$("#pageTool"),//分页id
		    	callback:getList,//callback
		    	currentPage:lastPage,
		    	tbodyId:$("#tableOne")//tbody的id,
	        })
       };
    };

    var keyWord = function () {
        /*关键词搜索按钮*/
        $("#compBtn").on("click", function () {
        	Query.setHash({"page":1})
            initTable();
        });
        //重置
        $("#compReset").on("click", function () {
        	$(".resetVul").find("input").val("");
        	$("#soClear").click();
        });

        //回车查询
        $(".resetVul").find("input").on("keydown", function (e) {
            var keyCode = e.which;
            if (keyCode == 13) {
                $("#compBtn").click();
            }
        });
            //搜索案例  插入关键词
	    $(".keywordListT li").each(function () {
	        var currentKey = $(this).children("a").text();
	        $(this).children("a").on("click", function () {
	            $(".resetVul input").each(function () {
	                $(this).val("")
	            })
	            if (currentKey == "外籍高管持股") {
	                $("#Ctwo").val("外籍高级管理 外籍高管 为外籍人士");
	            } else if (currentKey == "同业竞争解决方案") {
	                $("#Ttwo").val("法律意见书 反馈");
	                $("#Cone").val("存在同业竞争 解决措施");
	                $("#Cthree").val("均不存在同业竞争 不存在同业竞争");
	            } else if (currentKey == "企业亏损") {
	                $("#Cone").val("净利润为负");
	            } else if (currentKey == "有对赌协议") {
	                $("#Tone").val("公开转让说明书");
	                $("#Ctwo").val("对赌条款 业绩补偿 业绩承诺");
	                $("#Cthree").val("不存在对赌 未签署对赌 不涉及业绩补偿 均无对赌 任何对赌 任何业绩补偿");
	            } else if (currentKey == "打算IPO的企业"){
	            	$("#Tone").val("上市辅导");
	            	$("#Tthree").val("完成 通过");
	            	$("#Cone").val("证监局");
	            } else if (currentKey == "不定向发行"){
	            	$("#Tone").val("发行方案");
	            	$("#Cone").val("发行对象");
	            	$("#Ctwo").val("不确定 未确定");
	            } else if (currentKey == "增发认购获配"){
	            	$("#Tone").val("结果");
	            	$("#Ttwo").val("认购 获配");
	            	$("#Tone").val("发行对象");
	            } else if (currentKey == "更换财务总监"){
	            	$("#Tone").val("人员");
	            	$("#Ttwo").val("变动 辞职 离职");
	            	$("#Cone").val("财务总监");
	            	$("#Ctwo").val("先生 女士");
	            	$("#Cthree").val("换届");
	            }else if(currentKey == "有三类股东"){
	            	$("#Ctwo").val("契约型基金 信托计划 资产管理计划");
	            }
	            $("#compBtn").click();
	        })
	    })
    };
    //主办券商
    var specialWord = function () {
        $.kf.ajax({
            type: "get",
            url: $.kf.SPECIALWORD,
            data: "",
            dataType: "json",
            processResponse: function (data) {
                specialFun(data);
                industryWord();
            }
        });
    };
    //主办券商l列表
    var specialFun = function (data) {
        var data = data.data;
        var trPop = "";
        $(data).each(function (i) {
            trPop += "<li data-name=" + data[i].letter + " name =" + data[i].code + " title=' " + data[i].broker_name + " '>" + data[i].broker_name + "</li>";
        });
        $("#compPop").find("ul").empty("").html("");
        $("#compPop").find("ul").append(trPop);
        //弹窗选择事件
        comPopSpecial();


    };
    //所属行业
    var industryWord = function () {
        $.kf.ajax({//所属行业
            type: "get",
            url: $.kf.INDUSTRYWORD,
            data: "",
            dataType: "json",
            processResponse: function (data) {
                industryFun(data);
            }
        });
    };
    //行业列表
    var industryFun = function (data) {
        var data = data.data;
        var trPop2 = "";
        $(data).each(function (i) {
            trPop2 += "<li data-name=" + data[i].letter + " name =" + data[i].code + " title=' " + data[i].name + " '><span>" + data[i].name + "</span></li>";
        });
        $("#compPop2").find("ul").empty("").html("");
        $("#compPop2").find("ul").append(trPop2);
        //字母选择
        popLetter();

        comPopIndu();

        listComClick();

        getUrlParam();//地址栏参数，刷新
    };

    //省份选择pop
    var provinceChoose = function () {
        var _text = "";
        var proCode = "";
        $(".city-list").find("li").on("click", function () {
            $("#compProvSave").addClass("btn-primary").removeClass("default");
            _text = $(this).text();
            proCode = $(this).attr("name");
            $(this).addClass("provinceLi");
            $(this).siblings().removeClass("provinceLi");
        });
        $("#compProvSave").on("click", function () {
//          $(".city-list").find("li").show();
            if ($(this).parents(".myModal01 ").find(".city-list").find(".provinceLi").text() != "") {
                $('#myModal').modal('hide');
                _text = $(this).parents(".myModal01 ").find(".city-list").find(".provinceLi").text();
                $("#tableOne").html("");
                $("#compSf").find("li").removeClass("hang-active");
                Query.setHash({
                    proCode: proCode,
            		page:1
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
    /*券商弹窗选择*/
    var comPopSpecial = function () {
        var _text = "";
        var seCode = "";
        $("#compPopspecailSave").addClass("default").removeClass("btn-primary");

        $(".city-list").find("li").on("click", function () {
            $("#compPopspecailSave").addClass("btn-primary").removeClass("default");
            _text = $(this).text();
            seCode = $(this).attr("name");
            $(this).addClass("provinceLi");
            $(this).siblings().removeClass("provinceLi");
        });
        $("#compPopspecailSave").on("click", function () {
//          $(".city-list").find("li").show();
            if ($(this).parents(".myModal01 ").find(".city-list").find(".provinceLi").text() != "") {
                $('#myModal02').modal('hide');
                 _text = $(this).parents(".myModal01 ").find(".city-list").find(".provinceLi").text();
                $("#tableOne").html("");
                $("#compQs").find("li").removeClass("hang-active");
                Query.setHash({
                    seCode: seCode,
                	page:1
                });
                $("#allListSo").show();
                $(".listOne").remove();
                $("#allListSo").find("ul").prepend("<li class='listOne' name =" + seCode + ">" + _text + "<span class='soListClose'></span></li>");
            	_text = "";
            	$("#compQs").find("li").each(function(){
					if($(this).attr("name") == seCode){
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
    var comPopIndu = function () {
        var _text = "";
        var inCode = "";
        $("#industrySave").addClass("default").removeClass("btn-primary");
        $("#compPop2").find("li").on("click", function () {
            $("#industrySave").addClass("btn-primary").removeClass("default");
            _text = $(this).text();
            inCode = $(this).attr("name");
            $(this).addClass("provinceLi");
            $(this).siblings().removeClass("provinceLi");
        });
        $("#industrySave").on("click", function () {
//          $(".city-list").find("li").show();
            if ($(this).parents(".myModal01 ").find(".city-list").find(".provinceLi").text() != "") {
                $('#myModal03').modal('hide');
                _text = $(this).parents(".myModal01 ").find(".city-list").find(".provinceLi").text();
                $("#tableOne").html("");
                $("#compHy").find("li").removeClass("hang-active");
                Query.setHash({
                    inCode: inCode,
               		 page:1
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
            	initTable();
            }
            removeThing();
        })
    };
	return {
        init: function () {
            specialWord();//加载券商选项
            //industryWord();//加载行业选项
            keyWord();//关键字搜索
            provinceChoose();//弹窗选择省份
        }
    }

}();


