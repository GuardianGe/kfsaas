var InvestOrganization = function(){
	
	
	var organization = function(){
		
        //领域选项
        var specialWord = function () {
            $.kf.ajax({
                type: "get",
                url: $.kf.INVESTEVENTSTAGE,
                data: "",
                dataType: "json",
                processResponse: function (data) {
                    specialFun(data);
                }
            });
        }
        specialWord();

        var specialFun = function (data) {
            var data = data.data;
            var trPop = "";
            $(data).each(function (i) {
            	trPop += "<li name=" + data[i].code + " data-name=" + data[i].letter + " title=" + data[i].name + ">" + data[i].name + "</li>";
            })
            $("#compPop").find("ul").empty("").html("");
            $("#compPop").find("ul").append(trPop);

            //选项点击事件
            investBtn();
            //弹窗选择事件
            comPopSpecial();
            //省份弹窗选择事件
            provinceChoose();
            //地址栏参数，刷新
            getUrlParam();
        };

        //类别选中
        function investBtn() {
            $(".allList").find("li").unbind("click").on("click", function (event) {
                event.preventDefault();
                $(".sort").find("a").removeClass("bgredB");
    			$(".sort").find("a").removeClass("bgredT");
                var ind = $("#soCheck").find("li").length;
                var afund = Query.getHash("industry");
                if (!$(this).hasClass("hang-more")) {
                    $(this).parent("ul").find("li").removeClass("hang-active");
                    $(this).addClass("hang-active");

                    /*投资领域*/
                    if ($(this).parents(".allList").attr("id") == "compQs") {
                        industry = $(this).text();
                        seCode = $(this).attr("name");
                        if ($(this).index() == 0) {
                        	if($(".listOne").length){
                        		if(ind <=2){
                        			$("#allListSo").hide();
                        		}
                        		$(".listOne").remove(); //删除已选领域状态
	                            Query.setHash({
	                            	"page":1,
	                                "industry": ""
	                            });
                        	}
                        	
                            
                        } else {
                        	$("#allListSo").show();
                            Query.setHash({
                            	"page":1,
                                "industry": seCode
                            });
                            $(".listOne").remove();
                            $("#allListSo").find("ul").prepend("<li class='listOne' name=" + seCode + ">" + industry + "<span class='soListClose'></span></li>");
                        }
                        
                    }
                    /*投资阶段*/
                    if ($(this).parents(".allList").attr("id") == "compHy") {
                        stage = $(this).text();
                        inCode = $(this).attr("name");
                        if ($(this).index() == 0) {
                        	if($(".listTwo").length){
                        		if(ind <=2){
                        			$("#allListSo").hide();
                        		}
                        		$(".listTwo").remove();
	                            Query.setHash({
	                            	"page":1,
	                                "stage": ""
	                            });
                        	}
                           
                        } else {
                        	$("#allListSo").show();
                            Query.setHash({
                            	"page":1,
                                "stage": inCode
                            });
                            $(".listTwo").remove();
                            $("#allListSo").find("ul").prepend("<li class='listTwo' name =" + inCode + ">" + stage + "<span class='soListClose'></span></li>");
                        }

                    }
                    /*机构类型*/
                    if ($(this).parents(".allList").attr("id") == "compLy") {
                        agencyType = $(this).text();
                        lyCode = $(this).attr("name");
                        if ($(this).index() == 0) {
                        	if($(".listFour").length){
                        		if(ind <=2){
                        			$("#allListSo").hide();
                        		}
                        		$(".listFour").remove();
	                            Query.setHash({
	                            	"page":1,
	                                "lyCode": ""
	                            });
                        	}
                           
                        } else {
                        	$("#allListSo").show();
                            Query.setHash({
                            	"page":1,
                                "lyCode": lyCode
                            });
                            $(".listFour").remove();
                            $("#allListSo").find("ul").prepend("<li class='listFour' name =" + lyCode + ">" + agencyType + "<span class='soListClose'></span></li>");
                        }

                    }
                    /*资本类型*/
                    if ($(this).parents(".allList").attr("id") == "compSf") {
                        ouCode = $(this).attr("name");
                        type = $(this).text();
                        if ($(this).index() == 0) {
                        	if($(".listThree").length){
                        		if(ind <= 2 ){
                        			$("#allListSo").hide();
                        		}
                        		$(".listThree").remove();
	                            Query.setHash({
	                            	"page":1,
	                                "type": ""
	                            });
                        	}
                            
                        } else {
                        	$("#allListSo").show();
                            Query.setHash({
                            	"page":1,
                                "type": ouCode
                            });
                            $(".listThree").remove();
                            $("#allListSo").find("ul").prepend("<li class='listThree' name =" + ouCode + ">" + type + "<span class='soListClose'></span></li>");
                        }
                    }
					/*所选地区*/
                    if ($(this).parents(".allList").attr("id") == "compDq") {
                        proCode = $(this).attr("name");
                        province = $(this).text();
                        if ($(this).index() == 0) {
                        	if($(".listFive").length){
                        		if(ind <= 2 ){
                        			$("#allListSo").hide();
                        		}
                        		$(".listFive").remove();
	                            Query.setHash({
	                            	"page":1,
	                                "proCode": ""
	                            });
                        	}
                            
                        } else {
                        	$("#allListSo").show();
                            Query.setHash({
                            	"page":1,
                                "proCode": proCode
                            });
                            $(".listFive").remove();
                            $("#allListSo").find("ul").prepend("<li class='listFive' name =" + proCode + ">" + province + "<span class='soListClose'></span></li>");
                        }
                    }
                   /* if (ind == 2 && $(this).text() == "全部") {//剩余最后一个清除选项
                        $("#allListSo").hide();
                    } else {
                        $("#allListSo").show();
                    }*/
                    initTable();
                }
                removeThing();

            });

        }

        //弹窗保存
        var comPopSpecial = function () {
            var _text = "";
            $("#compPop").find("li").on("click", function () {
                _text = $(this).text();
                seCode = $(this).attr("name");
                $(this).addClass("provinceLi");
                $(this).siblings().removeClass("provinceLi");
                $("#compPopspecailSave").removeClass("default").addClass("btn-primary");
            });
            $("#compPopspecailSave").on("click", function () {
            	$(".sort").find("a").removeClass("bgredB");
    			$(".sort").find("a").removeClass("bgredT");
                if ($(this).parents(".myModal01 ").find(".city-list").find(".provinceLi").text() != "") {
                    $('#myModal02').modal('hide');
					_text = $(this).parents(".myModal01 ").find(".city-list").find(".provinceLi").text();
                    $("#compQs").find("li").removeClass("hang-active");
                    Query.setHash({
                    	"page":1,
                        "industry": seCode
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
					$("#investList").html("");
					$("#compDq").find("li").removeClass("hang-active");
					Query.setHash({
						proCode:proCode,
                        "page":1
					});
					$("#allListSo").show();
					$(".listFive").remove();
					$("#allListSo").find("ul").prepend("<li class='listFive' name =" + proCode + ">" + _text + "<span class='soListClose'></span></li>");
					_text = "";
					$("#compDq").find("li").each(function(){
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
                	$("#compPop").find("li").removeClass("provinceLi");
            		$("#compPopspecailSave").addClass("default").removeClass("btn-primary");
                    $("#compQs").find("li").each(function () {
                        if ($(this).text() == "全部") {
                            $(this).addClass("hang-active");
                            $(this).siblings().removeClass("hang-active");
                        }
                    });
                    Query.setHash({
                    	"page":1,
                        "industry": ""
                    });
                }
                //查询条件清楚地址栏参数
                if ($(this).parent().hasClass("listTwo")) {
                    $("#compHy").find("li").each(function () {
                        if ($(this).text() == "全部") {
                            $(this).addClass("hang-active");
                            $(this).siblings().removeClass("hang-active");
                        }
                    });
                    Query.setHash({//清楚地址栏对应的参数
                    	"page":1,
                        "stage": ""
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
                    	"page":1,
                        "type": ""
                    });
                }
                //查询条件清楚地址栏参数
                if ($(this).parent().hasClass("listFour")) {
                    $("#compLy").find("li").each(function () {
                        if ($(this).text() == "全部") {
                            $(this).addClass("hang-active");
                            $(this).siblings().removeClass("hang-active");
                        }
                    });
                    Query.setHash({
                    	"page":1,
                        "type": ""
                    });
                }
                //查询条件清楚地址栏参数
                if ($(this).parent().hasClass("listFive")) {
                    $("#compDq").find("li").each(function () {
                        if ($(this).text() == "全部") {
                            $(this).addClass("hang-active");
                            $(this).siblings().removeClass("hang-active");
                        }
                    });
                    Query.setHash({
                    	"page":1,
                        "proCode": ""
                    });
                }
                initTable();
            });
        };

        //显示关闭按钮
        $("#soClear").on("click", function () {
        	$(".sort").find("a").removeClass("bgredB");
    		$(".sort").find("a").removeClass("bgredT");
            Query.setHash({
            	"page":1,
                "industry": "",
                "stage": "",
                "type": "",
                "lyCode":"",
                "proCode":""
            });
            $("#compPop").find("li").removeClass("provinceLi");
    		$("#compPopspecailSave").addClass("default").removeClass("btn-primary");
            $(this).parent("li").siblings().remove();
            $(this).parents("#allListSo").hide();
            $("#compQs").find("li").eq(0).addClass("hang-active").siblings().removeClass("hang-active");
            $("#compHy").find("li").eq(0).addClass("hang-active").siblings().removeClass("hang-active");
            $("#compSf").find("li").eq(0).addClass("hang-active").siblings().removeClass("hang-active");
            $("#compLy").find("li").eq(0).addClass("hang-active").siblings().removeClass("hang-active");
            $("#compDq").find("li").eq(0).addClass("hang-active").siblings().removeClass("hang-active");
            initTable();
        });

        //搜索
        $("#investSer").on("click", function () {
        	Query.setHash({"page":1});
        	$(".sort").find("a").removeClass("bgredB");
    		$(".sort").find("a").removeClass("bgredT");
            $("#investList").html();
            initTable();
        })
        //重置
        $("#investSerReset").on("click",function(){
        	$("#investList").html("");
        	$(".investSname").val("");
        	$("#soClear").click();
        
        })
        //enter事件
        $(".investSname").on("keydown", function (e) {
        	$(".sort").find("a").removeClass("bgredB");
    		$(".sort").find("a").removeClass("bgredT");
            var keyCode = e.which;
            if (keyCode == 13) {
                $("#investSer").click();
            }

        });
		 /***排序***/
        $("#allDelSort tr span a").on("click", function (e) {
        	Query.setHash({"page":1});
            $("#investList").html("");
            sortToggle(this);
            Query.setHash({"orderByName":""});
            Query.setHash({"orderByType":""});
            initTable();
        });
        //刷新
        var getUrlParam = function () {
            var a = Query.getHash("industry");
            var b = Query.getHash("stage");
            var c = Query.getHash("type");
            var d = Query.getHash("lyCode");
            var e = Query.getHash("proCode");
            var aa="",bb="",cc="",dd="",ee="";
            $("#compQs").find("li").each(function (i) {
                if (!isNullOrEmpty(a)) {
                    if ($(this).attr("name") != a) {
                        $(this).removeClass("hang-active");
                        $(this).nextAll("li").removeClass("hang-active");
                        $("#compPop").find("li").each(function () {
                            if ($(this).attr("name") == a) {
                                aa = $(this).text();
                            }
                        })
                    } else {
                        $(this).addClass("hang-active");
                        $(this).siblings("li").removeClass("hang-active");
                        aa = $(this).text();
                    }
                }

            });
            $("#compHy").find("li").each(function (i) {
                if (!isNullOrEmpty(b)) {
                    if ($(this).attr("name") != b) {
                        $(this).removeClass("hang-active");
                        $(this).nextAll("li").removeClass("hang-active");
                    } else {
                        $(this).addClass("hang-active");
                        $(this).siblings("li").removeClass("hang-active");
                        bb = $(this).text();
                    }
                }

            });
            $("#compSf").find("li").each(function (i) {
                if (!isNullOrEmpty(c)) {
                    if ($(this).attr("name") != c) {
                        $(this).removeClass("hang-active");
                        $(this).nextAll("li").removeClass("hang-active");
                    } else {
                        $(this).addClass("hang-active");
                        $(this).siblings("li").removeClass("hang-active");
                        cc = $(this).text();
                    }
                }

            });
			$("#compLy").find("li").each(function (i) {
                if (!isNullOrEmpty(d)) {
                    if ($(this).attr("name") != d) {
                        $(this).removeClass("hang-active");
                        $(this).nextAll("li").removeClass("hang-active");
                    } else {
                        $(this).addClass("hang-active");
                        $(this).siblings("li").removeClass("hang-active");
                        dd = $(this).text();
                    }
                }

            });
            $("#compDq").find("li").each(function (i) {
                if (!isNullOrEmpty(e)) {
                    if ($(this).attr("name") != e) {
                        $(this).removeClass("hang-active");
                        $(this).nextAll("li").removeClass("hang-active");
                    } else {
                        $(this).addClass("hang-active");
                        $(this).siblings("li").removeClass("hang-active");
                        ee = $(this).text();
                    }
                }

            });

            if (isNullOrEmpty(a) && isNullOrEmpty(b) && isNullOrEmpty(c) && isNullOrEmpty(d) && isNullOrEmpty(e)) {
                $("#allListSo").hide();
            }
            if (!isNullOrEmpty(a)) {
                $("#allListSo").show();
                $(".listOne").remove();
                $("#allListSo").find("ul").prepend("<li class='listOne' name=" + a + ">" + aa + "<span class='soListClose'></span></li>");
            }
            if (!isNullOrEmpty(b)) {
                $("#allListSo").show();
                $(".listTwo").remove();
                $("#allListSo").find("ul").prepend("<li class='listTwo' name=" + b + ">" + bb + "<span class='soListClose'></span></li>");
            }
            if (!isNullOrEmpty(c)) {
                $("#allListSo").show();
                $(".listThree").remove();
                $("#allListSo").find("ul").prepend("<li class='listThree' name=" + c + ">" + cc + "<span class='soListClose'></span></li>");
            }
            if (!isNullOrEmpty(d)) {
                $("#allListSo").show();
                $(".listFour").remove();
                $("#allListSo").find("ul").prepend("<li class='listFour' name=" + c + ">" + cc + "<span class='soListClose'></span></li>");
            }
            if (!isNullOrEmpty(e)) {
                $("#allListSo").show();
                $(".listFive").remove();
                $("#allListSo").find("ul").prepend("<li class='listFive' name=" + c + ">" + cc + "<span class='soListClose'></span></li>");
            }
            //显示关闭按钮
            $("#soClear").on("click", function () {
                $(this).parents(".soList").find("li").children("span").show();
            });
            //初始化列表
            initTable();
            //清空选项
            removeThing();
        };

        /**table**/
        function investList(data) {
            var list = data.data;
            var tr = "";
            $("#investList").html("");
            var attention = "";
            var invNmae = "";
            $(list).each(function (i) {
            	if(list[i].attention == "1"){
					attention = "取消";
				}else{
					attention = "关注";
				};
				if (list[i].type == "新三板") {
	                invNmae = "<a class='investRest' href='" + $.url.companyListUrl() + "id=" + list[i].boardcompanyId + "'>" + list[i].boardName + "</ a>";
	            } else {
	            	if(isNullOrEmpty(list[i].boardCompanyName)){
	            		invNmae = "<span>" + list[i].boardName + "</span>";
	            	}else{
	               	 	invNmae = "<a class='investRests' data-name='" + list[i].boardCompanyName + "' href='" + $.url.industryUrl()  + "companyName=" + list[i].boardCompanyName + "'>" + list[i].boardName + "</ a>";
	            	}
	            }
                tr += "<tr>";
                if(isNullOrEmpty(list[i].logoUrl)){
                	tr += "<td><div class='investOrgImg'><div class='investOrgBox'><img src='../../assets/admin/layout/img/investImg.png' /></div><a href='" + $.url.investmentAgencyDetailsUrl() + "id=" + list[i].id + "'>" + list[i].shortname + "</a></div></td>";
                }else{
                	tr += "<td><div class='investOrgImg'><div class='investOrgBox'><img src='"+ list[i].logoUrl +"' /></div><a href='" + $.url.investmentAgencyDetailsUrl() + "id=" + list[i].id + "'>" + list[i].shortname + "</a></div></td>";
                }

                if(Number(list[i].companyNum) == 0 || isNullOrEmpty(list[i].companyNum)){
                	tr += "<td>" + list[i].companyNum + "</td>";
                }else{
                	tr += "<td><a href='" + $.url.investmentAgencyDetailsUrl() + "currentTab=tab_1" + "&id=" + list[i].id + "'>" + list[i].companyNum + "</a></td>";
                };
                if(Number(list[i].boardNum) == 0 || isNullOrEmpty(list[i].boardNum)){
                	tr += "<td>" + list[i].boardNum + "</td>";
                }else{
                	tr += "<td><a href='" + $.url.investmentAgencyDetailsUrl() + "currentTab=tab_1" + "&id=" + list[i].id + "&newThree=yes"+"'>" + list[i].boardNum + "</a></td>";
                }
                if(isNullOrEmpty(list[i].address)){
                	tr += "<td>--</td>";
                }else{
                	tr += "<td>" + list[i].address + "</td>";
                }
                if(isNullOrEmpty(list[i].agencyType)){
                	tr += "<td>--</td>";
                }else{
                	tr += "<td>" + list[i].agencyType + "</td>";
                }
                if(Number(list[i].investmentFund) == 0 || isNullOrEmpty(list[i].investmentFund)){
                	tr += "<td>" + list[i].investmentFund + "</td>";
                }else{
                	tr += "<td><a href='" + $.url.investmentAgencyDetailsUrl() + "currentTab=tab_6" + "&id=" + list[i].id + "'>" + list[i].investmentFund + "</a></td>";
                };
                if(isNullOrEmpty(list[i].boardName)){
                	tr += "<td>--</td>";
                }else{
                	tr += "<td>" + invNmae + "</td>";
                };
                if(isNullOrEmpty(list[i].step)){
                	tr += "<td>--</td>";
                }else{
                	tr += "<td>" + list[i].step + "</td>";
                }
                tr += "<td>"+ list[i].date +"</td>";
                tr += "<td><a class='comOptional' name='" + list[i].id + "'>" + attention + "</a></td>";
                tr += "</tr>";
            });
            $("#investList").append(tr);
            $("[data-toggle='tooltip']").tooltip();
            //自选功能
	        comOptional();
        }
		//加入自选功能
	    var comOptional = function(){
			$(".comOptional").click(function(){
				var _url = "";
				var code = $(this).attr("name");
				var param = {
				  		"code":code,
				  		"type":"b1"
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
	   };
        //初始化表格
        var initTable = function () {
            var _url = "";
            var industry = "";
            var stage = "";
            var type = "";
            var province = "";
            var agencyType = "";
            var orderByName = "";
	        var orderByType = "";
	        var getByName = Query.getHash("orderByName");
            var keyword = $(".investSname").val();
            var name = $(".investCname").val();

            //industry = industry != "" ? industry : $(".listOne").attr("name"),
            if ($(".listOne").size()) {
                industry = $(".listOne").attr("name");
            } else if ($("#compQs").find(".hang-active").text() == "全部") {
                industry = "";
            } else {
                industry = $("#compQs").find(".hang-active").attr("name");
            }

            //stage = stage != "" ? stage :$(".listTwo").attr("name"),
            if ($(".listTwo").size()) {
                stage = $(".listTwo").attr("name");
            } else if ($("#compHy").find(".hang-active").text() == "全部") {
                stage = "";
            } else {
                stage = $("#compHy").find(".hang-active").attr("name");
            }

            //type = type != "" ? type :$(".listThree").text(),
            if ($(".listThree").size()) {
                type = $(".listThree").attr("name");
            } else if ($("#compSf").find(".hang-active").text() == "全部") {
                type = "";
            } else {
                type = $("#compSf").find(".hang-active").attr("name");
            }
            if ($(".listFour").size()) {
                agencyType = $(".listFour").text();
            } else if ($("#compLy").find(".hang-active").text() == "全部") {
                agencyType = "";
            } else {
                agencyType = $("#compLy").find(".hang-active").text();
            }
            if ($(".listFive").size()) {
                province = $(".listFive").text();
            } else if ($("#compDq").find(".hang-active").text() == "全部") {
                province = "";
            } else {
                province = $("#compDq").find(".hang-active").text();
            }
            if(!isNullOrEmpty(getByName)){
            	orderByName = getByName;
	        	orderByType = Query.getHash("orderByType");
	        	$(".sort a").each(function () {
		            if ($(this).parents("th").attr("name") == orderByName) {
		            	if(orderByType == "ASC" && $(this).attr("name") == "ASC"){
		            		$(this).addClass("bgredT");
		            	}else if(orderByType == "DESC" && $(this).attr("name") == "DESC"){
		            		$(this).addClass("bgredB");
		            	}
		            }
		        });
            }else{
            	if($(".bgredB").length == 0 && $(".bgredT").length == 0){
            		$(".sort").eq(0).children("a").eq(1).addClass("bgredB");
            	}
            	$(".sort a").each(function () {
		            if ($(this).hasClass("bgredB") || $(this).hasClass("bgredT")) {
		                orderByName = $(this).parents("th").attr("name");
		                orderByType = $(this).attr("name");
		            }
		        });
            }
	        
            _url = $.kf.INVESTINSTITUTIONS + "?" + "keyword=" + keyword + "&industry=" + industry+ "&orderByName=" + orderByName+ "&orderByType=" + orderByType + "&stage=" + stage + "&type=" + type + "&agencyType=" + agencyType + "&province=" + province + "&page=" + 1;
            //new GetTable(_url, $("#pageTool"), "", investList, "get", $("#investList")).init();
            $("#investList").html("");
			var lastPage = Query.getHash("page");
            $.getTable({
	        	url:_url,//url
		    	pageId:$("#pageTool"),//分页id
		    	callback:investList,//callback
		    	currentPage:lastPage,
		    	tbodyId:$("#investList")//tbody的id,
	        })
       };
    
	}
	
	return {
		init:function(){
			organization();
		}
	}
	
}()
