var Vip = function () {
    //选项的点击事件
    var listComClick = function () {
        var securities = "";
        var industry = "";
        var province = "";
        var tag = "";
        $(".allList").find("li").unbind("click").on("click", function (event) {
            event.preventDefault();
            $(".sort").find("a").removeClass("bgredB");
            $(".sort").find("a").removeClass("bgredT");
            var ind = $("#soCheck").find("li").length;

            if (!$(this).hasClass("hang-more")) {
                $("#tableThree").html("");
                $(this).parent("ul").find("li").removeClass("hang-active");
                $(this).addClass("hang-active");

                /*特性*/
                if ($(this).parents(".allList").attr("id") == "compQs") {
                    securities = $(this).text();
                    var seCode = $(this).attr("name");
                    if ($(this).index() == 0) {
                        if ($(".listOne").length) {
                            if (ind <= 2) {
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
                        if ($(".listTwo").length) {
                            if (ind <= 2) {
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
                        if ($(".listThree").length) {
                            if (ind <= 2) {
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
                //公司标签
                if ($(this).parents(".allList").attr("id") == "compBq") {
                    tag = $(this).text();
                    var bqCode = $(this).attr("name");
                    if ($(this).index() == 0) {
                    	if($(".listSix").length){
                    		if(ind <= 2){
                    			$("#allListSo").hide();
                    		}
                    		
                    		Query.setHash({
	                            "bqCode": "",
                            	"page":1
	                        });
	                        $(".listSix").remove();
                    	}
                        
                    } else {
                    	$("#allListSo").show();
                        Query.setHash({
                            "bqCode": bqCode,
                            	"page":1
                        });
                        $(".listSix").remove();
                        $("#allListSo").find("ul").prepend("<li class='listSix' name =" + bqCode + ">" + tag + "<span class='soListClose'></span></li>");
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

        $("#tableThree").html("");
        $(list).each(function (i) {
            tr += "<tr>";
            tr += "<td>" + list[i].code + "</td>";
            tr += "<td><a href='" + $.url.companyListUrl() + "id=" + list[i].id + "&nameCodeId=" + list[i].urlCode + "&position=privilege" + "'>" + list[i].shortname + "</a></td>";
            tr += "<td class='queryWidthCom'>" + list[i].peRate + "</td>";
            tr += "<td class='queryWidthCom'>" + list[i].marketValue + "</td>";
            tr += "<td>" + list[i].financeDate + "</td>";
            tr += "<td class='queryWidthCom'>" + list[i].netProfit + "</td>";
            tr += "<td>" + list[i].mode + "</td>";
            tr += "<td>" + list[i].type + "</td>";
            tr += "<td>" + list[i].area + "</td>";
            tr += "<td>" + list[i].industryName + "</td>";
            tr += "<td>" + list[i].specialName + "</td>";
            tr += "<td>" + list[i].listingDate + "</td>";
            tr += "</tr>";
        });
        $("#tableThree").append(tr);
    };
    var removeThing = function () {
        /***排序***/
        $("#sample_1 tr span a").on("click", function (e) {
            $("#tableThree").html("");
            Query.setHash({"page": 1});
            sortToggle(this);
            initTable();

        })
        //点击关闭按钮
        $(".soListClose").unbind().on("click", function () {
            $(".sort").find("a").removeClass("bgredB");
            $(".sort").find("a").removeClass("bgredT");
            var flg = $(this).index();
            $("#tableThree").html("");
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
            //查询条件清除地址栏参数
            if ($(this).parent().hasClass("listSix")) {
            	$("#compLabelPop").find("li").removeClass("provinceLi");
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
           initTable();
        });
    };


    var getUrlParam = function () {
        var aCode = Query.getHash("seCode");
        var bCode = Query.getHash("inCode");
        var cCode = Query.getHash("proCode");
        var eCode = Query.getHash("bqCode");
        var a = "", b = "", c = "",e="";
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
        $("#compBq").find("li").each(function (i) {
            if (!isNullOrEmpty(eCode)) {
                if ($(this).attr("name") != eCode) {
                    $(this).removeClass("hang-active");
                    $(this).nextAll("li").removeClass("hang-active");
//                  console.log($("#compLabelPop").html())
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
        if (isNullOrEmpty(aCode) && isNullOrEmpty(bCode) && isNullOrEmpty(cCode) && isNullOrEmpty(eCode)) {
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
        if (!isNullOrEmpty(eCode)) {
            $("#allListSo").show();
            $(".listSix").remove();
            $("#allListSo").find("ul").prepend("<li class='listSix' name=" + eCode + ">" + e + "<span class='soListClose'></span></li>");
        }
        //显示关闭按钮
        $("#soClear").on("click", function () {
            $(".sort").find("a").removeClass("bgredB");
            $(".sort").find("a").removeClass("bgredT");
            Query.setHash({
    			"page":1,
    			"seCode":"",
    			"inCode":"",
    			"proCode":"",
    			"bqCode": ""
    		});
            $(".city-list").find("li").removeClass("provinceLi");
            $(".modal-footer").each(function () {
                $(this).find(".btn").eq(1).addClass("default").removeClass("btn-primary");
            });
            $(this).parent("li").siblings().remove();
            $(this).parents("#allListSo").hide();
            $("#compQs").find("li").eq(0).addClass("hang-active").siblings().removeClass("hang-active");
            $("#compHy").find("li").eq(0).addClass("hang-active").siblings().removeClass("hang-active");
            $("#compSf").find("li").eq(0).addClass("hang-active").siblings().removeClass("hang-active");
			$("#compBq").find("li").eq(0).addClass("hang-active").siblings().removeClass("hang-active");
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
        var tag = "";
        //券商
        if ($(".listOne").size()) {
            securities = $(".listOne").attr("name");
        } else if ($("#compQs").find(".hang-active").text() == "全部") {
            securities = "";
        } else {
            securities = $("#compQs").find(".hang-active").attr("name");
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
		//公司标签
        if ($(".listSix").size()) {
            tag = $(".listSix").attr("name");
        } else if ($("#compBq").find(".hang-active").text() == "全部") {
            tag = "";
        } else {
            tag = $("#compBq").find(".hang-active").attr("name")
        }
        var code = "";
        var keyword = $("#comKeyWord").val();
        var start_time = $("#compStartTime").val();
        var stop_time = $("#compEndTime").val();

        var lastPage = Query.getHash("page");
        var mode = $(".menu1").text();
        mode = trim(mode);
        if (mode == "转让方式" || mode == "全部") {
            mode = "";
        } else {
            mode = $(".menu1").text();
        };
        var type = "";
        type = trim($(".menu2").text());
        if (type == "创新层") {
            type = 1;
        } else if (type == "基础层") {
            type = 2;
        }
        var orderByName = "";
        var orderByType = "";
        $(".sort a").each(function () {
            if ($(this).hasClass("bgredB") || $(this).hasClass("bgredT")) {
                orderByName = $(this).parents("th").attr("name");
                orderByType = $(this).attr("name");
            }
        });
        
        var _url = $.kf.GETFEATUREDLAYERS + "?orderByName=" + orderByName + "&tag=" + tag + "&orderByType=" + orderByType + "&securities=" + securities + "&province=" + province + "&industry=" + industry + "&keyword=" + keyword + "&start_time=" + start_time + "&stop_time=" + stop_time + "&mode=" + mode + "&type=" + type;

		var lastPage = Query.getHash("page");
		
		if (compareDate(start_time, stop_time)) {
			$("#tableThree").html("");
			$.getTable({
	        	url:_url,//url
		    	pageId:$("#pageToolThree"),//分页id
		    	callback:getList,//callback
		    	currentPage:lastPage,
		    	tbodyId:$("#tableThree")//tbody的id,
	        })
		}
        
    };

    var keyWord = function () {
        /*关键词搜索按钮*/
        $("#compBtn").on("click", function () {
            Query.setHash({"page": 1});
            $(".sort").find("a").removeClass("bgredB");
            $(".sort").find("a").removeClass("bgredT");
            initTable();

        });
        //重置
        $("#compReset").on("click", function () {
            $(".sort").find("a").removeClass("bgredB");
            $(".sort").find("a").removeClass("bgredT");
            $(this).parents(".page-content-par").find("input").val("");
            $("#soClear").click();
        });

        //回车查询
        //enter
        $("#comKeyWord").on("keydown", function (e) {
            $(".sort").find("a").removeClass("bgredB");
            $(".sort").find("a").removeClass("bgredT");
            var keyCode = e.which;
            if (keyCode == 13) {
                $("#compBtn").click();
            }

        });

        //导出excel
        $("#outExcel").on("click", function () {
            var securities = "";
            var industry = "";
            var province = "";
            var tag = "";
            //券商
            if ($(".listOne").size()) {
                securities = $(".listOne").attr("name");
            } else if ($("#compQs").find(".hang-active").text() == "全部") {
                securities = "";
            } else {
                securities = $("#compQs").find(".hang-active").attr("name");
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
            //公司标签
            if ($(".listSix").size()) {
                tag = $(".listSix").attr("name");;
            } else if ($("#compBq").find(".hang-active").text() == "全部") {
                tag = "";
            } else {
                tag = $("#compBq").find(".hang-active").attr("name");;
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
            var mode = $(".menu1").text();
            mode = trim(mode);
            if (mode == "转让方式" || mode == "全部") {
                mode = "";
            } else {
                mode = $(".menu1").text();
            }
            ;
            var type = "";
            type = trim($(".menu2").text());
            if (type == "创新层") {
                type = 1;
            } else if (type == "基础层") {
                type = 2;
            }
            var orderByName = "";
            var orderByType = "";
            $(".sort a").each(function () {
                if ($(this).hasClass("bgredB") || $(this).hasClass("bgredT")) {
                    orderByName = $(this).parents("th").attr("name");
                    orderByType = $(this).attr("name");
                }
            });
            var _url = $.kf.GETFEATUREDLAYERS + "?orderByName=" + orderByName + "&orderByType=" + orderByType + "&securities=" + securities + "&exportType=" + "export" + "&province=" + province + "&industry=" + industry + "&tag=" + tag + "&keyword=" + keyword + "&start_time=" + start_time + "&stop_time=" + stop_time + "&mode=" + mode + "&type=" + type;
            if (compareDate(start_time, stop_time)) {
                window.open(_url);
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
            processResponse: function (data) {
                specialFun(data);
                industryWord();
            }
        });
    };
    //主办券商l列表排序
    var specialFun = function (data) {
        var data = data.data;
        var tr = "";
        var trPop = "";
        var m = 0;
        $(data).each(function (i) {
            trPop += "<li data-name=" + data[i].letter + " name =" + data[i].code + " title=' " + data[i].broker_name + " '>" + data[i].broker_name + "</li>";
        });
        $("#compPop").find("ul").empty("").html("");
        $("#compPop").find("ul").append(trPop);
        //弹窗选择事件
        comPopSpecial();
    };
    /*券商弹窗选择*/
    var comPopSpecial = function () {
        var _text = "";
        var seCode = "";

        $("#compPop").find("li").unbind().on("click", function () {
            _text = $(this).text();
            seCode = $(this).attr("name");
            $(this).addClass("provinceLi");
            $(this).siblings().removeClass("provinceLi");
            $("#compPopspecailSave").addClass("btn-primary").removeClass("default");
        });
        $("#compPopspecailSave").unbind().on("click", function () {
            if($(this).parents(".myModal01 ").find(".city-list").find(".provinceLi").text() != ""){
            	_text = $(this).parents(".myModal01 ").find(".city-list").find(".provinceLi").text();
				$(".city-list").find("li").show();
				$(".province-ul").find("li").removeClass("provinceLi");
				$(".province-ul").find("li:last").addClass("provinceLi");
                $('#myModal02').modal('hide');
                $("#tableTwo").html("");
                $("#compQs").find("li").removeClass("hang-active");
                Query.setHash({
                    seCode: seCode,
                	"page":1
                });
                
                $("#allListSo").show();
                $(".listOne").remove();
                $("#allListSo").find("ul").prepend("<li class='listOne' name =" + seCode + ">" + _text + "<span class='soListClose'></span></li>");
                $("#compQs").find("li").each(function(){
					if($(this).attr("name") == seCode){
						$(this).siblings().removeClass("hang-active");
						$(this).addClass("hang-active");
					}
				});
                _text = '';
                initTable();
            }
            removeThing();
        })
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
        var tr = "";
        var trPop2 = "";
        var m = 0;
        /*$("#compIndustry").html("<li class='hang-active' >全部</li>");*/
        $(data).each(function (i) {
            trPop2 += "<li data-name=" + data[i].letter + " name =" + data[i].code + " title=' " + data[i].name + " '><span>" + data[i].name + "</span></li>";
        });

        $("#compPop2").find("ul").empty("").html("");
        $("#compPop2").find("ul").append(trPop2);
        //字母选择
        popLetter();
        comPopIndu();
        labelWord();
    };

    //省份选择pop
    var provinceChoose = function () {
        var _text = "";
        var proCode = "";
        $("#comProvince").find("li").on("click", function () {
            $("#compProvSave").addClass("btn-primary").removeClass("default");
            _text = $(this).text();
            proCode = $(this).attr("name");
            $(this).addClass("provinceLi");
            $(this).siblings().removeClass("provinceLi");
        });
        $("#compProvSave").off().on("click", function () {
            if($(this).parents(".myModal01 ").find(".city-list").find(".provinceLi").text() != ""){
            	_text = $(this).parents(".myModal01 ").find(".city-list").find(".provinceLi").text();
				$(".city-list").find("li").show();
				$(".province-ul").find("li").removeClass("provinceLi");
				$(".province-ul").find("li:last").addClass("provinceLi");
                $(".sort").find("a").removeClass("bgredB");
                $(".sort").find("a").removeClass("bgredT");
                $('#myModal').modal('hide');
                $("#tableThree").html("");
                $("#compSf").find("li").removeClass("hang-active");
                Query.setHash({
                    proCode: proCode,
                	"page":1
                });
                
                $("#allListSo").show();
                $(".listThree").remove();
                $("#allListSo").find("ul").prepend("<li class='listThree' name =" + proCode + ">" + _text + "<span class='soListClose'></span></li>");
                _text = '';
                initTable();
            }
            removeThing();
        })


    };
    /*行业弹窗选择*/
    var comPopIndu = function () {
        var _text = "";
        var inCode = "";
        $("#compPop2").find("li").on("click", function () {
            $("#industrySave").addClass("btn-primary").removeClass("default");
            _text = $(this).text();
            inCode = $(this).attr("name");
            $(this).addClass("provinceLi");
            $(this).siblings().removeClass("provinceLi");
        });
        $("#industrySave").off().on("click", function () {
            if($(this).parents(".myModal01 ").find(".city-list").find(".provinceLi").text() != ""){
            	_text = $(this).parents(".myModal01 ").find(".city-list").find(".provinceLi").text();
				$(".city-list").find("li").show();
				$(".province-ul").find("li").removeClass("provinceLi");
				$(".province-ul").find("li:last").addClass("provinceLi");
                $(".sort").find("a").removeClass("bgredB");
                $(".sort").find("a").removeClass("bgredT");
                $('#myModal03').modal('hide');
                $("#tableThree").html("");
                $("#compHy").find("li").removeClass("hang-active");
                Query.setHash({
                    inCode: inCode,
                	"page":1
                });
                $("#allListSo").show();
                $(".listTwo").remove();
                $("#allListSo").find("ul").prepend("<li class='listTwo' name =" + inCode + ">" + _text + "<span class='soListClose'></span></li>");
                $("#compHy").find("li").each(function(){
					if($(this).attr("name") == inCode){
						$(this).siblings().removeClass("hang-active");
						$(this).addClass("hang-active");
					}
				});
                _text = '';
                initTable();
            }
            removeThing();
        })
    };

    var tableSelect = function () {
        new Select($("#comSelect1"), {}).init();
        new Select($("#comSelect2"), {}).init();
        //转让方式
        $("#comSelect2").find("li").on("click", function () {
            Query.setHash({"page": 1});
            $(".sort").find("a").removeClass("bgredB");
            $(".sort").find("a").removeClass("bgredT");
            $("#tableThree").html("");
           initTable();
        });
        //市场层级
        $("#comSelect1").find("li").on("click", function () {
            Query.setHash({"page": 1});
            $(".sort").find("a").removeClass("bgredB");
            $(".sort").find("a").removeClass("bgredT");
            $("#tableThree").html("");
            initTable();
        });
    }
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
		comPopIndu();
		getUrlParam();//地址栏参数，刷新
        listComClick();
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
				$(".province-ul").find("li").removeClass("provinceLi");
				$(".province-ul").find("li:last").addClass("provinceLi");
				$('#myModalBq').modal('hide');
				$("#tableOne").html("");
				$("#compBq").find("li").removeClass("hang-active");
				Query.setHash({
					bqCode:bqCode,
                	"page":1
				});
				$("#allListSo").show();
				$(".listSix").remove();
				$("#allListSo").find("ul").prepend("<li class='listSix' name =" + bqCode + ">" + _text + "<span class='soListClose'></span></li>");
				_text = '';
				$("#compLb").find("li").each(function(){
					if($(this).attr("name") == bqCode){
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
            specialWord();
            keyWord();//关键字搜索
            provinceChoose();//弹窗选择省份
            tableSelect();//表格标题下拉框
        }
    }

}();
