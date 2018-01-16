var investmentDirection = function(){
	
	var investTh = function(){
		//领域选项
	    (function () {
	        $.kf.ajax({
	            type: "get",
	            url: $.kf.INVESTEVENTSTAGE,
	            data: "",
	            dataType: "json",
	            processResponse: function (data) {
	                stage(data);
	            }
	        });
	    })();
	
	    function stage(data) {
	        var data = data.data;
	        var tr = "";
	        var trPop = "";
	        $(data).each(function (i) {
	            trPop += "<li name=" + data[i].code + " data-name=" + data[i].letter + " title=" + data[i].name + ">" + data[i].name + "</li>";
	        });
	        $("#compPop").find("ul").empty("").html("");
	        $("#compPop").find("ul").append(trPop);
	        //选项点击事件
	        investBtn();
	        //弹窗选择事件
	        comPopSpecial();
	        //地址栏参数，刷新
	        getUrlParam();
	    }
	    ;
	
	    //显示关闭按钮
	    $("#soClear").on("click", function () {
	        Query.setHash({
	            "industry": "",
	            "stCode": ""
	        });
	        $(this).parent("li").siblings().remove();
	        $(this).parents("#allListSo").hide();
	        $("#comSpecial").find("li").eq(0).addClass("hang-active").siblings().removeClass("hang-active");
	        $("#compIndustry").find("li").eq(0).addClass("hang-active").siblings().removeClass("hang-active");
	      	initTable();
	    });
	
	    //类别选中
	    function investBtn() {
	        $(".allList").find("li").unbind("click").on("click", function (event) {
	            event.preventDefault();
	            var ind = $("#soCheck").find("li").length;
	            var industry = '';
	            var status = '';
	            if (!$(this).hasClass("hang-more")) {
	                $("#investList").html("");
	                $(this).parent("ul").find("li").removeClass("hang-active");
	                $(this).addClass("hang-active");
	                /*投资领域*/
	                if ($(this).parents(".allList").attr("id") == "compQs") {
	                    industry = $(this).text();
	                    var seCode = $(this).attr("name");
	                    if ($(this).index() == 0) {
	                    	if($(".listOne").length){
	                    		if(ind <= 2){
	                    			$("#allListSo").hide();
	                    		}
	                    		Query.setHash({
	                    			"page":1,
		                            "industry": ""
		                        });
		                        $(".listOne").remove();
	                    	}
	                       
	                    } else {
	                    	$("#allListSo").show();
	                        Query.setHash({
	                        	"page":1,
	                            "industry": seCode
	                        });
	                        $(".listOne").remove();
	                        $("#allListSo").find("ul").prepend("<li class='listOne' name =" + seCode + ">" + industry + "<span class='soListClose'></span></li>");
	                    }
	
	                }
	                /*轮次*/
	                if ($(this).parents(".allList").attr("id") == "compHy") {
	                    status = $(this).text();
	                    var stCode = $(this).attr("name");
	                    if ($(this).index() == 0) {
	                    	if($(".listTwo").length){
	                    		if(ind <= 2){
	                    			$("#allListSo").hide();
	                    		}
	                    		
	                    		Query.setHash({
	                    			"page":1,
		                            "stCode": ""
		                        });
		                        $(".listTwo").remove();
	                    	}
	                        
	                    } else {
	                    	$("#allListSo").show();
	                        Query.setHash({
	                        	"page":1,
	                            "stCode": stCode
	                        });
	                        $(".listTwo").remove();
	                        $("#allListSo").find("ul").prepend("<li class='listTwo' name =" + stCode + ">" + status + "<span class='soListClose'></span></li>");
	                    }
	
	                }
	                initTable();
	            }
	            removeThing();
	
	        });
	    }
	
	
	    //搜索
	    $("#investSer").on("click", function () {
	        $("#investList").html("");
	        initTable();
	    });
	    //重置
	    $("#investSerReset").on("click",function(){
	    	$("#investList").html("");
	    	$(".investSname").val("");
	    	$("#soClear").click();
	    
	    })
	    //enter事件
	    $(".investSname").on("keydown", function (e) {
	        var keyCode = e.which;
	        if (keyCode == 13) {
	            $("#investSer").click();
	        }
	
	    });
	
	    /**table**/
	    function investList(data) {
	        var list = data.data;
	        var tr = "";
	        var invNmae = "";
	        $("#investList").html("");
	
	        $(list).each(function (i) {
	            if (list[i].type == "新三板") {
	                invNmae = "<a class='investRest' href='" + $.url.companyListUrl() + "id=" + list[i].companyId + "'>" + list[i].name + "</a>";
	            } else {
	            	if(isNullOrEmpty(list[i].companyId)){
	            		invNmae = "<span>" + list[i].name + "</span>";
	            	}else{
	               	 	invNmae = "<a class='investRests' data-name='" + list[i].companyName + "' href='" + $.url.industryUrl()  + "id=" + list[i].companyId + "'>" + list[i].name + "</a>";
	            	}
	            }
	
	            tr += "<tr>";
	            tr += "<td>" + invNmae + "</td>";
	            tr += "<td>" + list[i].industry + "</td>";
	            tr += "<td class='investT"+i+" investEdg'></td>"
	            //tr += "<td><a href=''>" +  + "</a></td>";
	            tr += "<td>" + list[i].step + "</td>";
	            tr += "<td>" + list[i].currencyCode + "</td>";
	            tr += "<td class='queryWidth'>" + list[i].investmentAmount + "</td>";
	            tr += "<td>" + list[i].date + "</td>";
	            if(isNullOrEmpty(list[i].desc)){
	            	tr += "<td>--</td>";
	            }else{
	            	tr += "<td><a class='privateListutOa' href='javascript:void(0)'  data-toggle='modal' data-target='#myModalOut' name='" + list[i].desc + "'>简介</a></td>";
	            }
	            tr += "</tr>";
	        });
	        $("#investList").append(tr);
	        //$("[data-toggle='tooltip']").tooltip();
	
	        $(".privateListutOa").on("click", function () {
	            var _txt = $(this).attr("name")
	            $("#privateListutO").html(_txt);
	        });
	        var isCookie = false;
	        moneyUrl($(".investRests"), isCookie, "isCookie");
	        //投资机构列表
	        for (var i = 0; i < list.length; i++) {
	            var tr2 = [];
	            var investmentL = list[i].investment.length;
	            for (var j = 0; j < investmentL; j++) {
	                if (investmentL == 0 || investmentL == 1) {
	                    if (list[i].investment[j].investorId) {
	                        tr2 += "<a href=" + $.url.investmentAgencyDetailsUrl() + "id=" + list[i].investment[j].investorId + ">" + list[i].investment[j].investment + "</a>";
	                    } else {
	                        tr2 += list[i].investment[j].investment;
	                    }
	                } else {
	                    if (list[i].investment[j].investorId) {
	                    	if(list[i].investment[j].investment !=" "){
	                    		tr2 += "<a href=" + $.url.investmentAgencyDetailsUrl() + "id=" + list[i].investment[j].investorId + ">" + list[i].investment[j].investment + "</a>/";
	                    	}else{
	                    		tr2 += "";
	                    	}
	                    } else {
	                    	if(list[i].investment[j].investment !=" "){
	                        	tr2 += list[i].investment[j].investment + "/";
	                        }else{
	                        	tr2 += "";
	                        }
	                    }
	                }
	            }
	            $(".investT" + i).append(tr2);
	        }
			$(".investEdg").each(function(){
				if($(this).html().indexOf("/") > 0){
					$(this).html($(this).html().substring(0,$(this).html().length-1));
				}
			});
	        //投资金额列表
	//            for (var i = 0; i < list.length; i++) {
	//                var tr3 = [];
	//                var amountL = list[i].total.length;
	//                for (var j = 0; j < amountL; j++) {
	//                    if (list[i].total[j].investmentAmount == "") {
	//                        tr3 += "";
	//                    } else if (amountL == 1) {
	//                        tr3 += list[i].total[j].investmentAmount;
	//                    } else {
	//                        tr3 += list[i].total[j].investmentAmount + "/";
	//                    }
	//          		for(var p=0; p<list[i].total[j].investmentAmount.length; p++){
	//          			if(list[i].total[j].investmentAmount[p] == " "){
	//          				alert("空")
	//          			}else if(amountL ==1){
	//          			    tr3 += list[i].total[j].investmentAmount + "万";
	//	            		}else{
	//	            			tr3 += list[i].total[j].investmentAmount + "万/";
	//	            		}
	//          		}
	//                }
	//                $(".investN" + i).append(tr3)
	//            }
	    }
	    var removeThing = function () {
	        //点击关闭按钮
	        $(".soListClose").on("click", function () {
	        	Query.setHash({"page":1});
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
	                    industry: ""
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
	                Query.setHash({
	                    stCode: ""
	                });
	            }
	            initTable();
	        });
	    };
	
	    //弹窗保存
	    var comPopSpecial = function () {
	        var _text = "";
	        $(".city-list").find("li").on("click", function () {
	            _text = $(this).text();
	            acode = $(this).attr("name");
	            $(this).addClass("provinceLi");
	            $(this).siblings().removeClass("provinceLi");
	            $("#compPopspecailSave").removeClass("default").addClass("btn-primary");
	        });
	        $("#compPopspecailSave").on("click", function () {
	            if ($(this).parents(".myModal01 ").find(".city-list").find(".provinceLi").text() != "") {
	                $('#myModal02').modal('hide');
	                _text = $(this).parents(".myModal01 ").find(".city-list").find(".provinceLi").text();
	                $("#compQs").find("li").removeClass("hang-active");
	                Query.setHash({
	                	"page":1,
	                    "industry": acode
	                });
	                $("#allListSo").show();
	                $(".listOne").remove();
	                $("#allListSo").find("ul").prepend("<li class='listOne' name=" + acode + ">" + _text + "<span class='soListClose'></span></li>");
	                initTable();
	                _text = '';
	                $("#compQs").find("li").each(function(){
					if($(this).attr("name") == acode){
						$(this).siblings().removeClass("hang-active");
						$(this).addClass("hang-active");
					}
				});
	            }
	            removeThing();
	
	        })
	    };
	
	    //初始化表格
	    var initTable = function () {
	        var _url = "";
	        var industry = "";
	        var status = "";
	        var keyword = $(".investSname").val();
	
	        //industry = industry != "" ? industry : $(".listOne").attr("name"),
	        if ($(".listOne").size()) {
	            industry = $(".listOne").attr("name");
	        } else if ($("#compQs").find(".hang-active").text() == "全部") {
	            industry = "";
	        } else {
	            industry = $("#compQs").find(".hang-active").attr("name");
	        }
	        //行业
	        if ($(".listTwo").size()) {
	            status = $(".listTwo").text();
	        } else if ($("#compHy").find(".hang-active").text() == "全部") {
	            status = "";
	        } else {
	            status = $("#compHy").find(".hang-active").text();
	        }
	        _url = $.kf.INVESTHING + "?" + "keyword=" + keyword + "&status=" + status+"&industry=" + industry + "&page=" + 1;
	        //new GetTable(_url, $("#pageTool"), "", investList, "get", $("#investList"),lastPage).init();
	        $("#tableTwo").html("");
			var lastPage = Query.getHash("page");
	        $.getTable({
	        	url:_url,//url
		    	pageId:$("#pageTool"),//分页id
		    	callback:investList,//callback
		    	currentPage:lastPage,
		    	tbodyId:$("#investList")//tbody的id,
	        })
	    };
	
	
	    var getUrlParam = function () {
	        var a = Query.getHash("industry");
	        var b = Query.getHash("stCode");
	        var btext = '';
	        var atext = '';
	        $("#compQs").find("li").each(function (i) {
	            if (!isNullOrEmpty(a)) {
	                if ($(this).attr("name") != a) {
	                    $(this).removeClass("hang-active");
	                    $(this).nextAll("li").removeClass("hang-active");
	                    $("#compPop").find("li").each(function () {
	                        if ($(this).attr("name") != a) {
	                            $(this).removeClass("hang-active");
	                            $(this).nextAll("li").removeClass("hang-active");
	                        } else {
	                            $(this).addClass("hang-active");
	                            $(this).siblings("li").removeClass("hang-active");
	                            atext = $(this).text();
	                        }
	                    })
	                } else {
	                    $(this).addClass("hang-active");
	                    $(this).siblings("li").removeClass("hang-active");
	                    atext = $(this).text();
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
	                    btext = $(this).text();
	                }
	            }
	
	        });
	
	
	        if (isNullOrEmpty(a) && isNullOrEmpty(b)) {
	            $("#allListSo").hide();
	        }
	
	        if (!isNullOrEmpty(a)) {
	            $("#allListSo").show();
	            $(".listOne").remove();
	            $("#allListSo").find("ul").prepend("<li class='listOne' name=" + a + ">" + atext + "<span class='soListClose'></span></li>");
	        }
	        if (!isNullOrEmpty(b)) {
	            $("#allListSo").show();
	            $(".listTwo").remove();
	            $("#allListSo").find("ul").prepend("<li class='listTwo' name=" + b + ">" + btext + "<span class='soListClose'></span></li>");
	        }
	       
	        //清空选项
	        removeThing();
	    
	        //初始化列表
	        initTable();
		}
    }
    return {
    	init:function(){
    		investTh();
    	}
    }
}()
