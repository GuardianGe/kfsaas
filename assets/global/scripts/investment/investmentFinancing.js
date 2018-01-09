var InvestFinanc = function(){
	
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
	        //地区弹窗选择
	        provinceChoose();
	        //地址栏参数，刷新
	        getUrlParam();
	    }
	    ;
	
	    //显示关闭按钮
	    $("#soClear").on("click", function () {
	        Query.setHash({
	            "industry": "",
	            "stCode": "",
	            "proCode":"",
	            "tmCode":""
	        });
	        $(this).parent("li").siblings().remove();
	        $(this).parents("#allListSo").hide();
	        $("#comSpecial").find("li").eq(0).addClass("hang-active").siblings().removeClass("hang-active");
	        $("#compIndustry").find("li").eq(0).addClass("hang-active").siblings().removeClass("hang-active");
	        $("#compSf").find("li").eq(0).addClass("hang-active").siblings().removeClass("hang-active");
	        $("#compTm").find("li").eq(0).addClass("hang-active").siblings().removeClass("hang-active");
	      	initTable();
	    });
	
	    //类别选中
	    function investBtn() {
	        $(".allList").find("li").unbind("click").on("click", function (event) {
	            event.preventDefault();
	            var ind = $("#soCheck").find("li").length;
	            var industry = '';
	            var status = '';
	            var province = "";
	            var investmentDate = "";
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
	                /*投资时间*/
	                if ($(this).parents(".allList").attr("id") == "compTm") {
	                    investmentDate = $(this).text();
	                    var tmCode = $(this).attr("name");
	                    if ($(this).index() == 0) {
	                    	if($(".listFour").length){
	                    		if(ind <= 2){
	                    			$("#allListSo").hide();
	                    		}
	                    		$(".listFour").remove();
		                        Query.setHash({
		                            tmCode: "",
		                            "page":1
		                        });
	                    	}
	                    } else {
	                    	$("#allListSo").show();
	                        Query.setHash({
	                            tmCode: tmCode,
	                            "page":1
	                        });
	                        $(".listFour").remove();
	                        $("#allListSo").find("ul").prepend("<li class='listFour'name =" + tmCode + ">" + investmentDate + "<span class='soListClose'></span></li>");
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
	            if(isNullOrEmpty(list[i].companyId)){
	        		if (list[i].type == "新三板") {
	        			if(isNullOrEmpty(list[i].logoUrl)){
		            		invNmae = "<div class='investOrgImg'><div class='investOrgBox'><img src='../../assets/admin/layout/img/investImg.png' /></div><span>" + list[i].name + "</span></div>";
		                }else{
		            		invNmae = "<div class='investOrgImg'><div class='investOrgBox'><img src='"+ list[i].logoUrl +"' /></div><span>" + list[i].name + "</span></div>";
		                }
	        		}else{
						if(isNullOrEmpty(list[i].logoUrl)){
	               	 		invNmae = "<div class='investOrgImg'><div class='investOrgBox'><img src='../../assets/admin/layout/img/investImg.png' /></div><span>" + list[i].name + "</span></div>";
		                }else{
	               	 		invNmae = "<div class='investOrgImg'><div class='investOrgBox'><img src='"+ list[i].logoUrl +"' /></div><span>" + list[i].name + "</span></div>";
		                }
	        		}
	        	}else{
	        		if (list[i].type == "新三板") {
	        			if(isNullOrEmpty(list[i].logoUrl)){
		            		invNmae = "<div class='investOrgImg'><div class='investOrgBox'><img src='../../assets/admin/layout/img/investImg.png' /></div><a class='investRest' href='" + $.url.companyListUrl() + "id=" + list[i].companyId + "'>" + list[i].name + "</a></div>";
		                }else{
		            		invNmae = "<div class='investOrgImg'><div class='investOrgBox'><img src='"+ list[i].logoUrl +"' /></div><a class='investRest' href='" + $.url.companyListUrl() + "id=" + list[i].companyId + "'>" + list[i].name + "</a></div>";
		                }
	        		}else{
						if(isNullOrEmpty(list[i].logoUrl)){
	               	 		invNmae = "<div class='investOrgImg'><div class='investOrgBox'><img src='../../assets/admin/layout/img/investImg.png' /></div><a class='investRests' data-name='" + list[i].companyName + "' href='" + $.url.industryUrl()  + "companyName=" + list[i].companyName + "'>" + list[i].name + "</a></div>";
		                }else{
	               	 		invNmae = "<div class='investOrgImg'><div class='investOrgBox'><img src='"+ list[i].logoUrl +"' /></div><a class='investRests' data-name='" + list[i].companyName + "' href='" + $.url.industryUrl()  + "companyName=" + list[i].companyName + "'>" + list[i].name + "</a></div>";
		                }
	        		}
	        	}
	            tr += "<tr>";
	            tr += "<td>" + invNmae + "</td>";
	            tr += "<td>" + list[i].industryName + "</td>";
	            if(isNullOrEmpty(list[i].step)){
	            	tr += "<td>--</td>";
	            }else{
	            	tr += "<td>" + list[i].step + "</td>";
	            }
	            tr += "<td style='text-align:right'>" + list[i].financingAmount + "</td>";
	            if (list[i].agencyId) {
                    tr += "<td><a href=" + $.url.investmentAgencyDetailsUrl() + "id=" + list[i].agencyId + ">" + list[i].agency + "</a></td>";
                } else {
                    tr += "<td>" + list[i].agency + "</td>";
                }
                if(isNullOrEmpty(list[i].url)){
               	 	tr += '<td>--</td>';
                }else{
               	 	tr += '<td><a target="_blank" href="'+ list[i].url +'" class="comComparison" style="white-space: nowrap;">打开</a>&nbsp;&nbsp;<a target="_blank" href="'+ list[i].urlDown +'" class="comOptional" style="white-space: nowrap;">下载</a></td>';
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
	                    proCode: ""
	                });
	            }
	            //查询条件清除地址栏参数
	            if ($(this).parent().hasClass("listFour")) {
	                $("#compTm").find("li").each(function () {
	                    if ($(this).text() == "全部") {
	                        $(this).addClass("hang-active");
	                        $(this).siblings().removeClass("hang-active");
	                    }
	                });
	                Query.setHash({
	                    tmCode: ""
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
					initTable();
				}
				removeThing();
			})
		};
	    //初始化表格
	    var initTable = function () {
	        var _url = "";
	        var industry = "";
	        var status = "";
	        var province = "";
	        var investmentDate = "";
	        var keyword = $(".investSname").val();
	
	        //领域
	        if ($(".listOne").size()) {
	            industry = $(".listOne").attr("name");
	        } else if ($("#compQs").find(".hang-active").text() == "全部") {
	            industry = "";
	        } else {
	            industry = $("#compQs").find(".hang-active").attr("name");
	        }
	        //轮次
	        if ($(".listTwo").size()) {
	            status = $(".listTwo").text();
	        } else if ($("#compHy").find(".hang-active").text() == "全部") {
	            status = "";
	        } else {
	            status = $("#compHy").find(".hang-active").text();
	        }
	        //省份
	        if ($(".listThree").size()) {
	            province = $(".listThree").text();
	        } else if ($("#compSf").find(".hang-active").text() == "全部") {
	            province = "";
	        } else {
	            province = $("#compSf").find(".hang-active").text();
	        }
	        //投资时间
	        if ($(".listFour").size()) {
	            investmentDate = $(".listFour").attr("name");
	        }else {
	            investmentDate = $("#compTm").find(".hang-active").attr("name");
	        }
	        _url = $.kf.GETFINANCINGCOMPANY + "?" + "keyword=" + keyword + "&status=" + status+"&industry=" + industry+"&province=" + province+"&investmentDate=" + investmentDate + "&page=" + 1;
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
	        var c = Query.getHash("proCode");
	        var d = Query.getHash("tmCode");
	        var btext = '';
	        var atext = '';
	        var ctext = '';
	        var dtext = '';
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
			$("#compSf").find("li").each(function (i) {
	            if (!isNullOrEmpty(c)) {
	                if ($(this).attr("name") != c) {
	                    $(this).removeClass("hang-active");
	                    $(this).nextAll("li").removeClass("hang-active");
	                    $("#comProvince").find("li").each(function () {
	                        if ($(this).attr("name") == c) {
	                           ctext = $(this).text();
	                        }
	                    });
	                } else {
	                    $(this).addClass("hang-active");
	                    $(this).siblings("li").removeClass("hang-active");
	                    ctext = $(this).text();
	                }
	            }
	
	        });
	        $("#compTm").find("li").each(function (i) {
	            if (!isNullOrEmpty(d)) {
	                if ($(this).attr("name") != d) {
	                    $(this).removeClass("hang-active");
	                    $(this).nextAll("li").removeClass("hang-active");                   
	                } else {
	                    $(this).addClass("hang-active");
	                    $(this).siblings("li").removeClass("hang-active");
	                    dtext = $(this).text();
	                }
	            }
	
	        });
	
	        if (isNullOrEmpty(a) && isNullOrEmpty(b)&& isNullOrEmpty(c)&& isNullOrEmpty(d)) {
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
	        if (!isNullOrEmpty(c)) {
	            $("#allListSo").show();
	            $(".listThree").remove();
	            $("#allListSo").find("ul").prepend("<li class='listThree' name=" + c + ">" + ctext + "<span class='soListClose'></span></li>");
	        }
	        if (!isNullOrEmpty(d)) {
	            $("#allListSo").show();
	            $(".listFour").remove();
	            $("#allListSo").find("ul").prepend("<li class='listFour' name=" + d + ">" + dtext + "<span class='soListClose'></span></li>");
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
