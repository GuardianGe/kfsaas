/******
 
 UPDATE DATE:2016/9/20
 NAV:masterBrokers
 NAME:WANGJH
 
 ******/



var securitiesCompany = function () {
	var isPunish = 2;
    /************************************主办券商****************************************/
    var securities = function () {

        //类别选中
        function investBtn() {
            $(".allList").find("li").unbind("click").on("click", function (event) {
                event.preventDefault()
                $(".sort").find("a").removeClass("bgredB");
        		$(".sort").find("a").removeClass("bgredT");
                var ind = $("#soCheck").find("li").length;
                var afund = Query.getHash("netCapital");
                if (!$(this).hasClass("hang-more")) {
                    $(this).parent("ul").find("li").removeClass("hang-active");
                    $(this).addClass("hang-active");

                    /*净资本*/
                    if ($(this).parents(".allList").attr("id") == "compQs") {
                        netCapital = $(this).text();
                        ncode = $(this).attr("name");
                        if ($(this).index() == 0) {
                        	if($(".listOne").length){
                        		if(ind <=2){
                        			$("#allListSo").hide();
                        		}
                        		 Query.setHash({
	                                netCapital: "",
	                                "page":1
	                            });
	                            $(".listOne").remove(); //删除已选领域状态
                        	}
                           
                        } else {
                        	$("#allListSo").show();
                            Query.setHash({
                                netCapital: ncode,
	                                "page":1
                            });
                            $(".listOne").remove();
                            $("#allListSo").find("ul").prepend("<li class='listOne' name='"+ncode+"'>" + netCapital + "<span class='soListClose'></span></li>");
                        }
                    }
                    /*办公地址*/
                    if ($(this).parents(".allList").attr("id") == "compHy") {
                        address = $(this).text();
                        acode = $(this).attr("name");
                        if ($(this).index() == 0) {
                        	if($(".listTwo").length){
                        		if(ind <=2){
                        			$("#allListSo").hide();
                        		}
                        		Query.setHash({
	                                address: "",
	                                "page":1
	                            });
	                            $(".listTwo").remove();
                        	}
                            
                        } else {
                        	$("#allListSo").show();
                            Query.setHash({
                                address: acode,
	                                "page":1
                            });
                            $(".listTwo").remove();
                            $("#allListSo").find("ul").prepend("<li class='listTwo' name='"+acode+"'>" + address + "<span class='soListClose'></span></li>");
                        }

                    }
                    /*成立时间*/
                    if ($(this).parents(".allList").attr("id") == "compSf") {
                        fundTime = $(this).text();
                        fcode = $(this).attr("name");
                        if ($(this).index() == 0) {
                        	if($(".listThree").length){
                        		if(ind <=2){
                        			$("#allListSo").hide();
                        		}
                        		$(".listThree").remove();
	                            Query.setHash({
	                                fundTime: "",
	                                "page":1
	                            });
                        	}
                            
                        } else {
                        	$("#allListSo").show();
                            Query.setHash({
                                fundTime: fcode,
	                                "page":1
                            });
                            $(".listThree").remove();
                            $("#allListSo").find("ul").prepend("<li class='listThree' name='"+fcode+"'>" + fundTime + "<span class='soListClose'></span></li>");
                        }
                    }


                    initTable();

                }
                removeThing();
            });

        }
        investBtn();


        //点击关闭按钮
        var removeThing = function () {
            $(".soListClose").unbind().on("click", function () {
            	 $(".sort").find("a").removeClass("bgredB");
    			$(".sort").find("a").removeClass("bgredT");
                var flg = $(this).index();
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
                        netCapital: "",
                        "page":1
                    });
                }
                //查询条件清楚地址栏参数
                if ($(this).parent().hasClass("listTwo")) {
                	$("#compPop").find("li").removeClass("provinceLi");
            		$("#compPopspecailSave").addClass("default").removeClass("btn-primary");
                    $("#compHy").find("li").each(function () {
                        if ($(this).text() == "全部") {
                            $(this).addClass("hang-active");
                            $(this).siblings().removeClass("hang-active");
                        }
                    });
                    Query.setHash({//清楚地址栏对应的参数
                        address: "",
                        "page":1
                    });
                }
                //查询条件清楚地址栏参数
                if ($(this).parent().hasClass("listThree")) {
                    $("#compSf").find("li").each(function () {
                        if ($(this).text() == "全部") {
                            $(this).addClass("hang-active");
                            $(this).siblings().removeClass("hang-active");
                        }
                    });
                    Query.setHash({
                        fundTime: "",
                        "page":1
                    });
                }

               initTable();
            });
        };

		 /***排序***/
        $("#sortNew span a").on("click", function (e) {
        	Query.setHash({"page":1});
            sortToggle(this);
            Query.setHash({"orderByName":""});
            Query.setHash({"orderByType":""});
            initTable();
        })
        //搜索
        $("#securitiesSer").on("click", function () {
        	Query.setHash({"page":1});
        	$(".sort").find("a").removeClass("bgredB");
    		$(".sort").find("a").removeClass("bgredT");
            initTable();
        })
        //重置
        $("#securitiesReset").on("click", function () {
        	$(".securities").val("");
        		$("#soClear").click();
            
        })
        //
        //回车查询
        //enter
        $(".securities").on("keydown", function (e) {
            var keyCode = e.which;
            if (keyCode == 13) {
                $("#securitiesSer").click();
            }

        });

        //受罚情况
        $("#menu1 li a").on("click", function () {
        	Query.setHash({"page":1});
            isPunish = $(this).attr("tabindex");
             if ($(".listTwo").size()) {
                address = $(".listTwo").text();
            } else if ($("#compHy").find(".hang-active").text() == "全部") {
                address = "";
            } else {
                address = $("#compHy").find(".hang-active").text();
            }
            var _url = "";
            var netCapital = $("#compQs").find(".hang-active").attr("name");
            var fundTime = $("#compSf").find(".hang-active").attr("name");
            var keyword = $(".securities").val();
            var lastPage = Query.getHash("page");
            if(isPunish == "受罚情况"){
            	_url = $.kf.SECURITIESCOMPANY + "?" + "keyword=" + keyword + "&netCapital=" + netCapital + "&address=" + address + "&fundTime=" + fundTime + "&page=" + 1;
            }else{
            	_url = $.kf.SECURITIESCOMPANY + "?"+ "isPunish=" + isPunish  + "keyword=" + keyword + "&netCapital=" + netCapital + "&address=" + address + "&fundTime=" + fundTime + "&page=" + 1;
            }
            
            $.getTable({
	        	url:_url,//url
		    	pageId:$("#pageTool"),//分页id
		    	callback:securitiesList,//callback
		    	currentPage:lastPage,
		    	tbodyId:$("#securitiesList")//tbody的id,
	        })
        })

        /**table**/
        function securitiesList(data) {
            var list = data.data;
            var tr = "";
            $("#securitiesList").html("");
            $(list).each(function (i) {
                tr += "<tr>";
                tr += "<td><a href='" + $.url.securitiesUrl() + "currentTab=tab0" + "&id=" + list[i].id + "'>" + list[i].name + "</a></td>";
                tr += "<td>" + list[i].regAddress + "</td>";
                tr += "<td class='queryWidth'>" + list[i].netCapital + "</td>";
                tr += "<td>" + list[i].foundTime + "</td>";
                tr += "<td><a href='" + $.url.securitiesUrl() + "currentTab=tab1" + "&id=" + list[i].id + "'>" + list[i].recommend + "</a></td>";
                tr += "<td><a href='" + $.url.securitiesUrl() + "currentTab=tab2" + "&id=" + list[i].id + "'>" + list[i].market + "</a></td>";
                tr += "<td><a href='" + $.url.securitiesUrl() + "currentTab=tab3" + "&id=" + list[i].id + "'>" + list[i].recommendedMarket + "</a></td>";
                tr += "<td>" + list[i].isPunish + "</td>";
                tr += "</tr>";
            });
            $("#securitiesList").append(tr);
           
        }

        //弹窗保存
        var comPopSpecial = function () {
            var _text = "";
            var address = "";
            $(".city-list").find("li").on("click", function () {
                _text = $(this).text();
                address = $(this).attr("name");
                $(this).addClass("provinceLi");
                $(this).siblings().removeClass("provinceLi");
                $("#compPopspecailSave").removeClass("default");
                $("#compPopspecailSave").addClass("btn-primary");
            });
            $("#compPopspecailSave").on("click", function () {
                if($(this).parents(".myModal").find(".city-list").find(".provinceLi").text() != ""){
	            	_text = $(this).parents(".myModal").find(".city-list").find(".provinceLi").text();
					$(".city-list").find("li").show();
					$(".province-ul").find("li").removeClass("provinceLi");
					$(".province-ul").find("li:last").addClass("provinceLi");
                    $('#myModal').modal('hide');
                    $("#compHy").find("li").removeClass("hang-active");
                    Query.setHash({
                        address: address,
                        "page":1
                    });
                    $("#allListSo").show();
                    $(".listTwo").remove();
                    $("#allListSo").find("ul").prepend("<li class='listTwo'>" + _text + "<span class='soListClose'></span></li>");
                    initTable();
                	_text = "";
                }
                removeThing();
            })
        };
        comPopSpecial();

        //初始化表格
        var initTable = function () {
            if ($(".listTwo").size()) {
                var address = $(".listTwo").text();
            } else if ($("#compHy").find(".hang-active").text() == "全部") {
                var address = "";
            } else {
                var address = $("#compHy").find(".hang-active").text();
            }
            var _url = "";
            var netCapital = $("#compQs").find(".hang-active").attr("name");
            var fundTime = $("#compSf").find(".hang-active").attr("name");
            var keyword = $(".securities").val();
			var lastPage = Query.getHash("page");
			var getByName = Query.getHash("orderByName");
			var orderByName = "";
	        var orderByType = "";
	        if(!isNullOrEmpty(getByName)){
            	orderByName = getByName;
	        	orderByType = Query.getHash("orderByType");
            }else{
            	$(".sort").eq(3).children("a").eq(1).addClass("bgredB");
		        $(".sort a").each(function () {
		            if ($(this).hasClass("bgredB") || $(this).hasClass("bgredT")) {
		                orderByName = $(this).parents("th").attr("name");
		                orderByType = $(this).attr("name");
		            }
		        });
		    }
            var _url = $.kf.SECURITIESCOMPANY + "?" + "&orderByName=" + orderByName +"&isPunish="+isPunish+ "&orderByType=" + orderByType+"&keyword=" + keyword + "&netCapital=" + netCapital + "&address=" + address + "&fundTime=" + fundTime + "&page=" + 1;
			$.getTable({
	        	url:_url,//url
		    	pageId:$("#pageTool"),//分页id
		    	callback:securitiesList,//callback
		    	currentPage:lastPage,
		    	tbodyId:$("#securitiesList")//tbody的id,
	        })
			

        };

        //刷新
        var getUrlParam = function () {
            var acCode = Query.getHash("netCapital");
            var bcCode = Query.getHash("address");
            var ccCode = Query.getHash("fundTime");
			var a = "",b="",c="";

            $("#compQs").find("li").each(function (i) {
                //if($(this).attr("na")){}
                if (!isNullOrEmpty(acCode)) {
                    if ($(this).attr("name") != acCode) {
                        $(this).removeClass("hang-active");
                        $(this).nextAll("li").removeClass("hang-active");
                    } else {
                        $(this).addClass("hang-active");
                        $(this).siblings("li").removeClass("hang-active");
                        a = $(this).text();
                    }
                }

            });
            $("#compHy").find("li").each(function (i) {
                if (!isNullOrEmpty(bcCode)) {
                    if ($(this).attr("name") != bcCode) {
                        $(this).removeClass("hang-active");
                        $(this).nextAll("li").removeClass("hang-active");
                        $("#compPop").find("li").each(function () {
                            if ($(this).attr("name") != bcCode) {
                                $(this).removeClass("hang-active");
                                $(this).nextAll("li").removeClass("hang-active");
                            } else {
                                $(this).addClass("hang-active");
                                $(this).siblings("li").removeClass("hang-active");
                                b = $(this).text();
                            }
                        })

                    } else {
                        $(this).addClass("hang-active");
                        $(this).siblings("li").removeClass("hang-active");
                        b = $(this).text();
                    }
                }

            });
            $("#compSf").find("li").each(function (i) {
                if (!isNullOrEmpty(ccCode)) {
                    if ($(this).attr("name") != ccCode) {
                        $(this).removeClass("hang-active");
                        $(this).nextAll("li").removeClass("hang-active");
                    } else {
                        $(this).addClass("hang-active");
                        $(this).siblings("li").removeClass("hang-active");
                        c = $(this).text();
                    }
                }

            });


            if (isNullOrEmpty(acCode) && isNullOrEmpty(bcCode) && isNullOrEmpty(ccCode)) {
                $("#allListSo").hide();
            }
            if (!isNullOrEmpty(acCode)) {
                $("#allListSo").show();
                $(".listOne").remove();
                $("#allListSo").find("ul").prepend("<li class='listOne' name='"+acCode+"'>" + a + "<span class='soListClose'></span></li>");
            }
            if (!isNullOrEmpty(bcCode)) {
                $("#allListSo").show();
                $(".listTwo").remove();
                $("#allListSo").find("ul").prepend("<li class='listTwo' name='"+bcCode+"'>" + b + "<span class='soListClose'></span></li>");
            }
            if (!isNullOrEmpty(ccCode)) {
                $("#allListSo").show();
                $(".listThree").remove();
                $("#allListSo").find("ul").prepend("<li class='listThree' name='"+ccCode+"'>" + c + "<span class='soListClose'></span></li>");
            }
            //显示关闭按钮
            $("#soClear").on("click", function () {
            	$(".sort").find("a").removeClass("bgredB");
        		$(".sort").find("a").removeClass("bgredT");
                Query.setHash({
	                netCapital: "",
	                address: "",
	                fundTime: "",
                    "page":1
	            });
	            $("#compPop").find("li").removeClass("provinceLi");
        		$("#compPopspecailSave").addClass("default").removeClass("btn-primary");
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
        getUrlParam();
    }


    /************************************主办券商TAB************************************/
    var securitiesCon = function () {
    	var secName = function(){
    		 var _url = $.kf.SECURITIESCOMPANYINFO + "?" + "id=" + sid + "&page=" + 1;
    		 $.kf.ajax({
                type: "get",
                url: _url,
                data: "",
                dataType: "json",
                processResponse: function (data) {
                 	var list = data.data;
					$(".masterDetail").text("(" + list.name + ")");
                }
            });
    	}
        //公司概况
        var sid = Query.getHash("id");
        var securitiesProfile = function () {
            var _url = $.kf.SECURITIESCOMPANYINFO + "?" + "id=" + sid + "&page=" + 1;
            //new GetTable(_url,$("#pageTool"),"",profileList,"get",$("#profile")).init();
            new LoadingAjax($(".maskInAjax"), {}, $("#profile")).init();//加载中。。。
            $.kf.ajax({
                type: "get",
                url: _url,
                data: "",
                dataType: "json",
                processResponse: function (data) {
                    profileList(data);
                    new LoadingAjax($(".maskInAjax"), {}, $("#profile")).close();//删除加载中。。。
                }
            });

            /***table***/
            function profileList(data) {
                var list = data.data;
                var tr = "";
                $("#profile").html("");
                tr += "<div class='col-md-5'>";
                tr += "公司名称：<a class='newsId' class='toIndusDetail' href='" + $.url.industryUrl() + "companyName=" + list.fullname + "'>" + list.fullname + "<span class='seeIndustryDetails'>查看详情</span></a><br/>";
                tr += "成立日期：" + list.foundTime + "<br/>";
                tr += "法定代表人：" + list.legalRepresentative + "<br/>";
                tr += "总经理：" + list.generalManager + "<br/>";
                tr += "营业部家数：" + list.departmentNum + "<br/>";
                tr += "邮编：" + list.post + "<br/>";
                tr += "电子邮箱：" + list.email + "<br/>";
                tr += "</div>";
                tr += "<div class='col-md-5'>";
                tr += "注册资本：" + list.registeredCapital + "万元" + "<br/>";
                tr += "净资本：" + list.netCapital + "万元" + "<br/>";
                tr += "净资产：" + list.netAsset + "万元" + "<br/>";
                tr += "公司注册地址：" + list.regAddress + "<br/>";
                tr += "办公地址：" + list.officialAddress + "<br/>";
                tr += "公司网址：<a href="+list.website+" target='_blank'>" + list.website + "</a><br/>";
                tr += "经营证券业务许可证编码：" + list.licenseCode + "<br/>";
                tr += "</div>";
                tr += "<div class='col-md-12'><hr></div>";
                tr += "<div class='col-md-12'>";
                tr += "<b>证监会批准从事的证券业务</b>";
                tr += "<p>" + list.business + "</p>";
                tr += "</div>";
                tr += "<div class='col-md-12'><hr></div>";
                tr += "<div class='col-md-12'>";
                tr += "<b>在全国股份转让系统从事的业务种类</b>";
                tr += "<p>" + list.type + "</p>";
                tr += "<b>公司概况</b>";
                tr += "<p>" + list.summary + "</p>";
                tr += "</div>";
                tr += "</div>";
                $("#profile").append(tr);

                //扣费跳转
                var isCookie = false;
                moneyUrl($(".newsId"), isCookie, "isCookie");
            }

        }
        //业务动态
        var securitiesNews = function () {
            _url = $.kf.SECURITIESSTATISTICS + "?" + "id=" + sid;
            //new GetTable(_url, $("#pageToold"), "", newsFourList, "get", $("#newsFour")).init();
            $.kf.ajax({
		        type: "get",
		        url: _url,
		        data: "",
		        dataType: "json",
		        processResponse: function (data) {
		            newsFourList(data);
		        }
		    });
            function newsFourList(data) {
                var list = data.data;
                var tr = "";
                $("#newsFour").html("");
                tr += "<tr>";
                tr += "<td><a href='javascript:void(0)' data-target='#myModal02' data-toggle='modal'>推荐挂牌公司数</a></td>";
                tr += "<td>" + list.recommendListingNum + "</td>";
                tr += "</tr>";
                tr += "<tr>";
                tr += "<td>推荐已挂牌数</td>";
                tr += "<td>" + list.recommendListing + "</td>";
                tr += "</tr>";
                tr += "<tr>";
                tr += "<td>撤回及申请被否数</td>";
                tr += "<td>" + list.recommendUnlistingNum + "</td>";
                tr += "</tr>";
                tr += "<tr>";
                tr += "<td>正在挂牌数</td>";
                tr += "<td>" + list.listingNum + "</td>";
                tr += "</tr>";
                tr += "<tr>";
                tr += "<td>已上市公司数</td>";
                tr += "<td>" + list.listedNum + "</td>";
                tr += "</tr>";
                tr += "<tr>";
                tr += "<td>已被终止挂牌数</td>";
                tr += "<td>" + list.unlistedNum + "</td>";
                tr += "</tr>";
                $("#newsFour").append(tr);
            }
            _url = $.kf.SECURITIESSTATISTICS + "?" + "id=" + sid;
            //new GetTable(_url, $("#pageToolf"), "", newsFiveList, "get", $("#newsFive")).init();
            $.kf.ajax({
		        type: "get",
		        url: _url,
		        data: "",
		        dataType: "json",
		        processResponse: function (data) {
		            newsFiveList(data);
		        }
		    });
            function newsFiveList(data) {
                var list = data.data;
                var tr = "";
                $("#newsFive").html("");
                tr += "<tr>";
                tr += "<td><a href='javascript:void(0)' data-target='#myModal03' data-toggle='modal'>推荐定向发行次数</a></td>";
                tr += "<td>" + list.recommendOldSectionNum + "</td>";
                tr += "</tr>";
                tr += "<tr>";
                tr += "<td>推荐成功次数</td>";
                tr += "<td>" + list.failureDirectedDilutionNum + "</td>";
                tr += "</tr>";
                tr += "<tr>";
                tr += "<td>推荐失败次数</td>";
                tr += "<td>" + list.successDirectedDilutionNum + "</td>";
                tr += "</tr>";
                tr += "<tr>";
                tr += "<td>推荐老三板公司家数</td>";
                tr += "<td>" + list.recommendDirectedDilutionNum + "</td>";
                tr += "</tr>";
                $("#newsFive").append(tr);
            }
        }
        //securitiesNews();

        //推荐定向发行次数
        var directedDilution = function () {
            _url = $.kf.DIRECTEDDILUTION + "?" + "id=" + sid;
            //new GetTable(_url, $("#pageToolTow"), "", recommendedList, "get", $("#recommendedNumber")).init();
            $.kf.ajax({
		        type: "get",
		        url: _url,
		        data: "",
		        dataType: "json",
		        processResponse: function (data) {
		            recommendedList(data);
		        }
		    });
            function recommendedList(data) {
                var list = data.data;
                var tr = "";
                $("#recommendedNumber").html("");
                $(list).each(function (i) {
                    tr += "<tr>";
                    tr += "<td>" + list[i].code + "</td>";
                    tr += "<td>" + list[i].name + "</td>";
                    tr += "<td>" + list[i].status + "</td>";
                    tr += "</tr>";
                })
                $("#recommendedNumber").append(tr);
            }
        }
        //directedDilution();

        //推荐挂牌公司数
        var recommendListedCompany = function () {
            _url = $.kf.RECOMMENDLISTEDCOMPANY + "?" + "id=" + sid;
            //new GetTable(_url, $("#pageToolOne"), "", listedList, "get", $("#companyNumber")).init();
            $.kf.ajax({
		        type: "get",
		        url: _url,
		        data: "",
		        dataType: "json",
		        processResponse: function (data) {
		            listedList(data);
		        }
		    });
            function listedList(data) {
                var list = data.data;
                var tr = "";
                $("#companyNumber").html("");
                $(list).each(function (i) {
                    tr += "<tr>";
                    tr += "<td>" + list[i].code + "</td>";
                    tr += "<td>" + list[i].shortname + "</td>";
                    tr += "<td>" + list[i].date + "</td>";
                    tr += "<td>" + list[i].status + "</td>";
                    tr += "</tr>";
                })
                $("#companyNumber").append(tr);
            }
        }
        //recommendListedCompany();
		
		//推荐挂牌
		var recommendCompany = function(){
			//初始化表格
			var recommendInit = function(){
				$("#tableOne").html("");
				var lastPage = Query.getHash("page");
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
                };
                var orderByTab = $("#recomLink").find(".sort-up").hasClass("bgredT");
               	var orderByTab2 = $("#recomLink").find(".sort-down").hasClass("bgredB");
               
           	 	var orderByName = "";
	            var orderByType = "";
                if(orderByTab){
                	var orderByName = $("#recomLink").find(".bgredT").parents("th").attr("name");
                	var orderByType = $("#recomLink").find(".bgredT").attr("name");
                }else if(orderByTab2){
                	var orderByName = $("#recomLink").find(".bgredB").parents("th").attr("name");
                	var orderByType = $("#recomLink").find(".bgredB").attr("name");
                }
	            var keyword = $(".recomKey").val();
			 	var _url = $.kf.GETSECOMPANYHIS + "?" + "id=" + sid +"&ListedType=recommend"+"&type=" + type+"&mode=" + mode+ "&orderByName=" + orderByName + "&orderByType=" + orderByType+"&keyword=" + keyword +  "&page=" + 1;
			 	$.getTable({
		        	url:_url,//url
			    	pageId:$("#pageTool"),//分页id
			    	callback:recompanyList,//callback
			    	currentPage:lastPage,
			    	tbodyId:$("#tableOne")//tbody的id,
		        })
		 	}
			var recompanyList = function(data) {
	            var list = data.data;
	            var tr = "";
	            $(list).each(function (i) {
	                $("#tableOne").html("");
	                tr += "<tr>";
	                tr += "<td><a href='" + $.url.companyListUrl() + "id=" + list[i].id  + "&position=masterHold&seuId="+sid+"'>" + list[i].shortname + "</a></td>";
	                tr += "<td>" + list[i].listingDateMachine + "</td>";
//	                tr += "<td>" + list[i].date + "</td>";
	                tr += "<td>" + list[i].mode + "</td>";
	                tr += "<td>" + list[i].level + "</td>";
	                tr += "<td>" + list[i].area + "</td>";
	                tr += "<td>" + list[i].industry + "</td>";
	                tr += "<td class='queryWidth'>" + list[i].peRate + "</td>";
	                tr += "<td class='queryWidth'>" + list[i].marketValue + "</td>";
	                tr += "</tr>";
	            })
	            $("#tableOne").append(tr);
	        }
			var recommentEven = function(){
				 /***排序***/
		        $("#recomLink span a").unbind().on("click", function (e) {
		        	Query.setHash({"page":1});
		        	$("#tableOne").html("");
		            sortToggle(this);
		            recommendInit();
		            
		        })
		        //搜索
		        $("#recomKeywords").unbind().on("click", function () {
		        	Query.setHash({"page":1});
		            recommendInit();
		        })
		        //重置
		        $("#recomKeywordsReset").unbind().on("click", function () {
		        	Query.setHash({"page":1});
		        	$(".recomKey").val("");
		            recommendInit();
		        })
		        //回车查询
		        //enter
		        $(".recomKey").unbind().on("keydown", function (e) {
		            var keyCode = e.which;
		            if (keyCode == 13) {
		                $("#recomKeywords").click();
		            }
		        });
			}
			var tableSelect = function(){
				new Select($("#comSelect1"),{}).init();
				new Select($("#comSelect2"),{}).init();
				//转让方式
				$("#comSelect2").find("li").on("click",function(){
					$("#tableOne").html("");
					Query.setHash({"page":1});
					recommendInit();
				});
				//市场层级
				$("#comSelect1").find("li").on("click",function(){
					$("#tableOne").html("");
					Query.setHash({"page":1});
					recommendInit();
				});
			}
			recommentEven();
			tableSelect();
			recommendInit();
		}
		
		
		 //做市业务
		var marketBusiness = function(){
			//初始化表格
			var marketInit = function(){
				$("#tableTow").html("");
				var lastPage = Query.getHash("page");
                var type = "";
                type = $.trim($(".menu3").text());
                if (type == "创新层") {
                    type = 1;
                } else if (type == "基础层") {
                    type = 2;
                };
               	var orderByTab = $("#marketLink").find(".sort-up").hasClass("bgredT");
               	var orderByTab2 = $("#marketLink").find(".sort-down").hasClass("bgredB");
               
           	 	var orderByName = "";
	            var orderByType = "";
                if(orderByTab){
                	var orderByName = $("#marketLink").find(".bgredT").parents("th").attr("name");
                	var orderByType = $("#marketLink").find(".bgredT").attr("name");
                }else if(orderByTab2){
                	var orderByName = $("#marketLink").find(".bgredB").parents("th").attr("name");
                	var orderByType = $("#marketLink").find(".bgredB").attr("name");
                }
	            var keyword = $(".marketKey").val();
			 	var _url = $.kf.GETSECOMPANYHIS + "?" + "id=" + sid +"&ListedType=market"+"&type=" + type+ "&orderByName=" + orderByName + "&orderByType=" + orderByType+"&keyword=" + keyword +  "&page=" + 1;
			 	$.getTable({
		        	url:_url,//url
			    	pageId:$("#pageTool2"),//分页id
			    	callback:marketList,//callback
			    	currentPage:lastPage,
			    	tbodyId:$("#tableTow")//tbody的id,
		        })
		 	}
			var marketList = function(data) {
	            var list = data.data;
	            var tr = "";
	            $(list).each(function (i) {
	                $("#tableTow").html("");
	                tr += "<tr>";
                 	tr += "<td><a href='" + $.url.companyListUrl() + "id=" + list[i].id  + "&position=masterHold&seuId="+sid+"'>" + list[i].shortname + "</a></td>";
	                tr += "<td>" + list[i].listingDateMachine + "</td>";
//	                tr += "<td>" + list[i].date + "</td>";
	                tr += "<td>" + list[i].level + "</td>";
	                tr += "<td>" + list[i].area + "</td>";
	                tr += "<td>" + list[i].industry + "</td>";
	                tr += "<td class='queryWidth'>" + list[i].peRate + "</td>";
	                tr += "<td class='queryWidth'>" + list[i].marketValue + "</td>";
	                tr += "</tr>";
	            })
	            $("#tableTow").append(tr);
	        }
			var marketEven = function(){
				 /***排序***/
		        $("#marketLink span a").unbind().on("click", function (e) {
		        	Query.setHash({"page":1});
		            sortToggle(this);
		            marketInit();
		        })
		        //搜索
		        $("#marketKeywords").unbind().on("click", function () {
		        	Query.setHash({"page":1});
		            marketInit();
		        })
		        //重置
		        $("#marketKeywordsReset").unbind().on("click", function () {
		        	Query.setHash({"page":1});
		        	$(".marketKey").val("");
		            marketInit();
		        })
		        //回车查询
		        //enter
		        $(".marketKey").unbind().on("keydown", function (e) {
		            var keyCode = e.which;
		            if (keyCode == 13) {
		               $("#marketKeywords").click();
		            }
		
		        });
			}
			var marketSelect = function(){
				new Select($("#comSelect3"),{}).init();
				//市场层级
				$("#comSelect3").find("li").on("click",function(){
					Query.setHash({"page":1});
					$("#tableTow").html("");
					marketInit();
				});
			}
			marketEven();
		 	marketSelect();
			marketInit();
		}
		
		//挂牌且做市
		var listingMaking = function(){
			//初始化表格
			var listingInit = function(){
				$("#tableThree").html("");
				var lastPage = Query.getHash("page");
                var type = "";
                type = $.trim($(".menu4").text());
                if (type == "创新层") {
                    type = 1;
                } else if (type == "基础层") {
                    type = 2;
                };
               	var orderByTab = $("#listingLink").find(".sort-up").hasClass("bgredT");
               	var orderByTab2 = $("#listingLink").find(".sort-down").hasClass("bgredB");
               
           	 	var orderByName = "";
	            var orderByType = "";
                if(orderByTab){
                	var orderByName = $("#listingLink").find(".bgredT").parents("th").attr("name");
                	var orderByType = $("#listingLink").find(".bgredT").attr("name");
                }else if(orderByTab2){
                	var orderByName = $("#listingLink").find(".bgredB").parents("th").attr("name");
                	var orderByType = $("#listingLink").find(".bgredB").attr("name");
                }
	            var keyword = $(".listingKey").val();
			 	var _url = $.kf.GETSECOMPANYHIS + "?" + "id=" + sid +"&ListedType=recommendedMarket"+"&type=" + type+ "&orderByName=" + orderByName + "&orderByType=" + orderByType+"&keyword=" + keyword +  "&page=" + 1;
			 	$.getTable({
		        	url:_url,//url
			    	pageId:$("#pageTool3"),//分页id
			    	callback:listingList,//callback
			    	currentPage:lastPage,
			    	tbodyId:$("#tableThree")//tbody的id,
		        })
		 	}
			var listingList = function(data) {
				$("#tableThree").html("");
	            var list = data.data;
	            var tr = "";
	            $(list).each(function (i) {
	                tr += "<tr>";
	                tr += "<td><a href='" + $.url.companyListUrl() + "id=" + list[i].id  + "&position=masterHold&seuId="+sid+"'>" + list[i].shortname + "</a></td>";
                	tr += "<td>" + list[i].listingDateMachine + "</td>";
//	                tr += "<td>" + list[i].date + "</td>";
	                tr += "<td>" + list[i].level + "</td>";
	                tr += "<td>" + list[i].area + "</td>";
	                tr += "<td>" + list[i].industry + "</td>";
	                tr += "<td class='queryWidth'>" + list[i].peRate + "</td>";
	                tr += "<td class='queryWidth'>" + list[i].marketValue + "</td>";
	                tr += "</tr>";
	            })
	            $("#tableThree").append(tr);
	        }
			var listingEven = function(){
				 /***排序***/
		        $("#listingLink span a").unbind().on("click", function (e) {
		        	Query.setHash({"page":1});
		            sortToggle(this);
		            listingInit();
		        })
		        //搜索
		        $("#listingKeywords").unbind().on("click", function () {
		        	Query.setHash({"page":1});
		            listingInit();
		        })
		        //重置
		        $("#listingKeywordsReset").unbind().on("click", function () {
		        	Query.setHash({"page":1});
		        	$(".listingKey").val("");
		            listingInit();
		        })
		        //回车查询
		        //enter
		        $(".listingKey").unbind().on("keydown", function (e) {
		            var keyCode = e.which;
		            if (keyCode == 13) {
		                $("#listingKeywords").click();
		            }
		
		        });
			}
			var listingSelect = function(){
				new Select($("#comSelect4"),{}).init();
				//市场层级
				$("#comSelect4").find("li").on("click",function(){
					$("#tableThree").html("");
					listingInit();
				});
			}
			listingEven();
		 	listingSelect();
			listingInit();
		}
        
        var securitiesDepartment = function () {
            var sid = Query.getHash("id");
            _url = $.kf.SECURITIESDEPARTMENT + "?" + "id=" + sid;
            //经纪业务
            //new GetTable(_url, $("#pageToolw"), "", brokerList, "get", $("#newsOne")).init();
            $.getTable({
	        	url:_url,//url
		    	pageId:$("#pageToolw"),//分页id
		    	callback:brokerList,//callback
		    	showPageTool:false,
		    	tbodyId:$("#newsOne")//tbody的id,
	        })
            function brokerList(data) {
                var list = data.data;
                $("#pageToolw").parent().find("#noOutData").remove();
                if (list.broker.length == 0) {
                    funNoData($("#pageToolw"));
                }
                ;
                var tr = "";
                $(list.broker).each(function (i) {
                    $("#newsOne").html("");
                    tr += "<tr>";
                    tr += "<td>" + list.broker[i].name + "</td>";
                    tr += "<td>" + list.broker[i].tel + "</td>";
                    tr += "<td>" + list.broker[i].fax + "</td>";
                    tr += "<td>" + list.broker[i].email + "</td>";
                    tr += "</tr>";
                })
                $("#newsOne").append(tr);
            }
            //推荐业务
            //new GetTable(_url, $("#pageToolwq"), "", recommendedList, "get", $("#newsTwo")).init();
            $.getTable({
	        	url:_url,//url
		    	pageId:$("#pageToolwq"),//分页id
		    	callback:recommendedList,//callback
		    	showPageTool:false,
		    	tbodyId:$("#newsTwo")//tbody的id,
	        })
            function recommendedList(data) {
                var list = data.data;
                $("#pageToolwq").parent().find("#noOutData").remove();
                if (list.broker.length == 0) {
                    funNoData($("#pageToolwq"));
                }
                ;
                var tr = "";
                $(list.recommend).each(function (i) {
                    $("#newsTwo").html("");
                    tr += "<tr>";
                    tr += "<td>" + list.recommend[i].name + "</td>";
                    tr += "<td>" + list.recommend[i].tel + "</td>";
                    tr += "<td>" + list.recommend[i].fax + "</td>";
                    tr += "<td>" + list.recommend[i].email + "</td>";
                    tr += "</tr>";
                })
                $("#newsTwo").append(tr);
            }
            //推荐业务部门
            // new GetTable(_url, $("#pageTool"), "", departmentList, "get", $("#newsThree")).init();
            $.getTable({
	        	url:_url,//url
		    	pageId:$("#pageTool"),//分页id
		    	callback:departmentList,//callback
		    	showPageTool:false,
		    	tbodyId:$("#newsThree")//tbody的id,
	        })
            function departmentList(data) {
                var list = data.data;
                var tr = "";
                var tr2 = "";
                $(list.department).each(function (i) {
                    $("#newsThree").html("");
                    var depNum = list.department[i].staff.length;
                    tr += "<div class='newThreeTit'>";
                    tr += "<div class='msg-wrap'>";
                    tr += "<div class='msg-title'>" + list.department[i].departmentName + "</div>";
                    tr += "</div>";
                    tr += "部门负责人：" + list.department[i].departmentLeader + " &nbsp;&nbsp;  部门人员数：" + depNum;
                    tr += "</div>";
                    tr += "<div class='table-scrollable maskInTable'>";
                    tr += "<table class='table table-striped table-bordered table-hover'>";
                    tr += "<thead class='view-tr'>";
                    tr += "<tr class='tr'>";
                    tr += "<th>姓名</th>";
                    tr += "<th>是否适合担任<br/>项目负责人</th>";
                    tr += "<th>是否具有注册<br/>会计师资格</th>";
                    tr += "<th>是否具有<br/>律师资格</th>";
                    tr += "<th>拟担任项目小组<br/>行业分析师</th>";
                    tr += "</tr>";
                    tr += "</thead>";
                    tr += "<tbody class='newsThreeList" + i + "'>";

                    tr += "</tbody>";
                    tr += "</table>";
                    tr += "</div>";
                    tr += "</div>";
                })
                $("#newsThree").append(tr);
                /*$(list.department[0].staff).each(function(i){
                 $(".newsThreeList").html("");
                 
                 })*/
                var tr2 = [];
                for (var i = 0; i < list.department.length; i++) {
                    for (var j = 0; j < list.department[i].staff.length; j++) {
                        tr2[i] = "<tr>" +
                                "<td>" + list.department[i].staff[j].personName + "</td>" +
                                "<td>" + list.department[i].staff[j].isProjectLeader + "</td>" +
                                "<td>" + list.department[i].staff[j].isCpa + "</td>" +
                                "<td>" + list.department[i].staff[j].isLawyer + "</td>" +
                                "<td>" + list.department[i].staff[j].isAnalysts + "</td>" +
                                "</tr>";

                        //rr.push(tr2[i]);
                        $(".newsThreeList" + i).append(tr2[i]);
                    }
                }
            }
        }
       //tab判断
       var securitiesTab = function(){
        	var currentTab = Query.getHash("currentTab");
	    	if (isNullOrEmpty(currentTab)) {
	            $(".overLi-btn").find("li").eq(0).addClass("active").siblings().removeClass("active");
	            $("#tab_0").addClass("active").siblings().removeClass("active");
	            //公司概况
	        	securitiesProfile();
	        } else if (currentTab == "tab0") {
	            $(".overLi-btn").find("li").eq(0).addClass("active").siblings().removeClass("active");
	            $("#tab_0").addClass("active").siblings().removeClass("active");
	            //公司概况
	         	securitiesProfile();
	        } else if (currentTab == "tab1") {
	            $(".overLi-btn").find("li").eq(1).addClass("active").siblings().removeClass("active");
	            $("#tab_3").addClass("active").siblings().removeClass("active");
	            //推荐挂牌
	            recommendCompany();
	        } else if (currentTab == "tab2") {
	            $(".overLi-btn").find("li").eq(2).addClass("active").siblings().removeClass("active");
	            $("#tab_4").addClass("active").siblings().removeClass("active");
	            //做市业务
	            marketBusiness();
	        } else if (currentTab == "tab3") {
	            $(".overLi-btn").find("li").eq(3).addClass("active").siblings().removeClass("active");
	            $("#tab_5").addClass("active").siblings().removeClass("active");
	            //挂牌且做市
	            listingMaking();
	        } else if (currentTab == "tab4") {
	            $(".overLi-btn").find("li").eq(4).addClass("active").siblings().removeClass("active");
	            $("#tab_2").addClass("active").siblings().removeClass("active");
	            //部门设置
	            securitiesDepartment();
	        }
        }
        //刷新页面判断
        securitiesTab();
        secName();
        //tab点击判断
        $(".overLi-btn").find("a").on("click",function(){
			var thisId = Query.getHash("id");
			//window.location.hash = 'id='+ thisId +'&page=1&currentTab=tab' + $(this).parent().index();
			pushUrlState($(this).parent().index(),{id:thisId});
    		securitiesTab();
    	});
        
    }

    return {
        securities: function () {
            securities();
        },
        securitiesP: function () {
            securitiesCon();
        }
    }
}();