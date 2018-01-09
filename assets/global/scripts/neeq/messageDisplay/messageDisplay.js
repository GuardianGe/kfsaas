/******
 
 UPDATE DATE:2017/2/25
 NAV:INVER
 NAME:WANGJH
 信息披露
 ******/


/************************************信息披露****************************************/
var messageNote = function () {
    //公告
    var newsThreeNote = function () {
    	
    	//刷新页面逻辑
        var getUrlParam = function(){
	        var _type = Query.getHash("type");
	        var _typeText = Query.getHash("typeText");
	        var bzCode = Query.getHash("bzCode");
	        if(bzCode == "业务标准"){
	        	$("#notesLi").find("li").each(function (i) {
		            if (!isNullOrEmpty(_type)) {
		                if ($(this).attr("name") != _type) {
		                    $(this).removeClass("hang-active");
		                    $(this).nextAll("li").removeClass("hang-active");
		                    $("#compPop").find("li").each(function () {
		                        if ($(this).attr("name") != _type) {
		                            $(this).removeClass("hang-active");
		                            $(this).nextAll("li").removeClass("hang-active");
		                        } else {
		                            $(this).addClass("hang-active");
		                            $(this).siblings("li").removeClass("hang-active");
		                            _typeText = $(this).text();
		                        }
		                    })
		                } else {
		                    $(this).addClass("hang-active");
		                    $(this).siblings("li").removeClass("hang-active");
		                    _typeText = $(this).text();
		                }
		            }
		
		        });
		        
		    //官方标准
	        }else if(bzCode == "官方标准"){
	        	$("#tradingAnou").show();
	        	$("#notesLi").hide();
	        	$("#noteTypeO").html('官方标准<span class="input-group-btn caret2"><button class="btn btn-sm  btn-icon-btn" type="button"><i class="fa fa-calendar2"></i></button></span>');
	        	$("#tradingAnou").find("li").each(function (i) {
		            if (!isNullOrEmpty(_type)) {
		                if ($(this).attr("name") != _type) {
		                    $(this).removeClass("hang-active");
		                    $(this).nextAll("li").removeClass("hang-active");
		                } else {
		                    $(this).addClass("hang-active");
		                    $(this).siblings("li").removeClass("hang-active");
		                    _typeText = $(this).text();
		                }
		            }
		
		        });
	        }
	        if (isNullOrEmpty(_type)) {
	            $("#allListSo").hide();
	        }else{
	            $("#allListSo").show();
	            $(".listOne").remove();
	            $("#allListSo").find("ul").prepend("<li class='listOne' name=" + _type + ">" + _typeText + "<span class='soListClose'></span></li>");
	        }
	        //初始化列表
	        initTable();
	        //清空选项
	        removeThing();
	    };
		var initTable = function(){
			var keyword = $("#comKeyWord").val();
			var type = Query.getHash('type');
	        var start_time = $("#startDate").val();
	        var stop_time = $("#stopDate").val();
	        var outkeyword = $("#comKeyWordOut").val();
	        if (isNullOrEmpty(type)) {
	            type = '';
	        }
	        var _url = $.kf.GNOTE + "?" + "keyword=" + keyword + "&outkeyword=" + outkeyword + "&type=" + type + "&start_time=" + start_time + "&stop_time=" + stop_time + "&typeCode=b05";
	        //new GetTable(_url, $("#pageTool"), {}, noteList, "get", $("#Gnote")).init();
	        if (compareDate(start_time, stop_time)) {
				var lastPage = Query.getHash("page");
	            $.getTable({
		        	url:_url,//url
			    	pageId:$("#pageTool"),//分页id
			    	callback:noteList,//callback
			    	currentPage:lastPage,
			    	tbodyId:$("#Gnote")//tbody的id,
		        })
	        };
		}
		var removeThing = function(){
			//点击关闭按钮
	        $(".soListClose").unbind().on("click", function () {
	            var flg = $(this).index();
	            $("#Gnote").html("");
	            if ($(this).parents(".allListSo").find("li").length == 2) {
	                $(this).parents(".allListSo").hide();
	            }
	            $(this).parent().remove();
	            //查询条件清除地址栏参数
	            if ($(this).parent().hasClass("listOne")) {
	            	$("#compPop").find("li").removeClass("provinceLi");
	            	$("#compPopspecailSave").addClass("default").removeClass("btn-primary");
	                $("#comSpecial,#tradingAnou").find("li").each(function () {
	                    if ($(this).text() == "全部") {
	                        $(this).addClass("hang-active");
	                        $(this).siblings().removeClass("hang-active");
	                    }
	                });
	                Query.setHash({
	                    "type": "",
	                    "typeText":"",
                		"page":1
	                });
	            }
	            initTable();
	        });
	        
	        //显示关闭按钮
	        $("#soClear").off().on("click", function () {
	        	$(".city-list").find("li").removeClass("provinceLi");
	           	$(".modal-footer").each(function(){
	           		$(this).find(".btn").eq(1).addClass("default").removeClass("btn-primary");
	           	});
	            Query.setHash({
	                "type": "",
	                "typeText":"",
                	"page":1
	            });
	            $(this).parent("li").siblings().remove();
	            $(this).parents("#allListSo").hide();
	            $("#comSpecial").find("li").eq(0).addClass("hang-active").siblings().removeClass("hang-active");
	            $("#tradingAnou").find("li").eq(0).addClass("hang-active").siblings().removeClass("hang-active");
	            initTable();
	        });
		}
        //公告分类
        var noteIndustry = function () {
            $.kf.ajax({
                type: "get",
                url: $.kf.GETNOTICECATEGORY,
                data: "",
                dataType: "json",
                processResponse: function (data) {
                    typeFun(data);
                }
            });
        };
        //公告分类列表
        var typeFun = function (data) {
            var data = data.data;
            var trPop = "";
            var tr = "";
            var noteChild = [];
            $(".province-ul").find("ul").html("");
            $(data).each(function (i) {
                trPop += "<li name='" + data[i].id + "'title='" + data[i].name + "'>" + data[i].name + "</li>";
            });
            //全部子级
            for (var i = 0; i < data.length; i++) {
            	
                if (!isNullOrEmpty(data[i].child)) {
                    for (var j = 0; j < data[i].child.length; j++) {
                        tr += "<li name='" + data[i].child[j].id + "'title='" + data[i].child[j].name + "'>" + data[i].child[j].name + "</li>";
                    }
                }
            }

            //是否显示更多按钮
            $("#comSpecial").append('<li style="padding:2px 8px" id = "trPop"  class="hang-more" data-toggle="modal" data-target="#myModal02">更多>></li>');
            $("#compPop").find("ul").empty("").html("");
            $("#compPop").find("ul").append(tr);
            $("#compPop").find("li").each(function () {
                if ($(this).text() == "全部") {
                    $(this).remove();
                }
            });
            $(".province-ul").find("ul").append(trPop);
            $(".province-ul").find("ul").append('<li class="provinceLi">全部</li>')

            //类型切换
            $(".province-ul ul li").on("click", function () {
                $("#compPop").find("ul").empty("").html("");
                $("#compPopspecailSave").removeClass("btn-primary");
                $("#compPopspecailSave").addClass("default");
                $(this).addClass("provinceLi");
                $(this).siblings().removeClass("provinceLi");
                var typeTxt = $(this).text();
                if (typeTxt == "全部") {
                    //全部子级
                    for (var i = 0; i < data.length; i++) {
                        if (!isNullOrEmpty(data[i].child)) {
                            for (var j = 0; j < data[i].child.length; j++) {
                                tr += "<li name='" + data[i].child[j].id + "'title='" + data[i].child[j].name + "'>" + data[i].child[j].name + "</li>";
                            }
                        }
		            };
		            
                    $("#compPop").find("ul").append(tr);
                    $("#compPop").find("li").each(function () {
                        if ($(this).text() == "全部") {
                            $(this).remove();
                        }
                    });
                    //弹窗选择事件
                    comPopSpecial();
                } else {
                    var tc = "";
                    $.kf.ajax({
                        type: "get",
                        url: $.kf.GETNOTICECATEGORY,
                        data: "",
                        dataType: "json",
                        processResponse: function (data) {
                            var data = data.data;
                            $("#compPop").find("ul").empty("").html("");
                            for (var i = 0; i < data.length; i++) {
                                if (data[i].name == typeTxt) {
                                    for (var j = 0; j < data[i].child.length; j++) {
                                        tc += "<li name='" + data[i].child[j].id + "'title='" + data[i].child[j].name + "'>" + data[i].child[j].name + "</li>";
                                    }

                                    $("#compPop").find("ul").append(tc);

                                }
                            }
                            comPopSpecial();
                        }
                    });
                }

            })

            //弹窗选择事件
            comPopSpecial();
        };
		noteIndustry();
        
        //弹窗保存
        var comPopSpecial = function () {
            var _text = "";
            $(".city-list").find("li").on("click", function () {
                _text = $(this).text();
                seCode = $(this).attr("name");
                $(this).addClass("provinceLi");
                $(this).siblings().removeClass("provinceLi");
                $("#compPopspecailSave").removeClass("default");
                $("#compPopspecailSave").addClass("btn-primary");
            });
            $("#compPopspecailSave").unbind().on("click", function () {
                if ($(this).parents(".myModal01 ").find(".city-list").find(".provinceLi").text() != "") {
                	$(".city-list").find("li").show();
                    $('#myModal02').modal('hide');
                    _text = $(this).parents(".myModal01").find(".city-list").find(".provinceLi").text();
                    $("#comSpecial").find("li").removeClass("hang-active");
                    $("#comSpecial").find("li").each(function(){
						if($(this).attr("name") == seCode){
							$(this).siblings().removeClass("hang-active");
							$(this).addClass("hang-active");
						}
					});
					if(_text == "全部"){
	                	seCode = $(".province-ul").find(".provinceLi").attr("name");
	               		_text = $(".province-ul").find(".provinceLi").text();
	                }
                    Query.setHash({
                        "type": seCode,
                        "typeText":_text,
               			"page":1
                    });
                    $("#allListSo").show();
					$(".listOne").remove();
					$("#allListSo").find("ul").prepend("<li class='listOne' name =" + seCode + ">" + _text + "<span class='soListClose'></span></li>");
                    initTable();
                    removeThing();
                }
            })
        };
        /***table***/
        function noteList(data) {
            var list = data.data;
            var tr = "";
            var page = 1;
            if(!isNullOrEmpty(Query.getHash("page"))){
            	page = Query.getHash("page");
            }
            $("#Gnote").html("");
            $(list).each(function (i) {
                tr += "<tr>";
                if(list[i].type == "基础层"){
                	if(list[i].transferMode == "做市"){
                		tr += "<td width='15%'><span class='level-chuangxin'>做</span><span class='level-jichu'>基</span>"+ list[i].code +"</td>";
                	}else{
                		tr += "<td width='15%'><span class='level-chuangxin'>协</span><span class='level-jichu'>基</span>"+ list[i].code +"</td>";
                	}
                }else if(list[i].type == "创新层"){
                	if(list[i].transferMode == "做市"){
                		tr += "<td width='15%'><span class='level-chuangxin'>做</span><span class='level-jichu'>创</span>"+ list[i].code +"</td>";
                	}else{
                		tr += "<td width='15%'><span class='level-chuangxin'>协</span><span class='level-jichu'>创</span>"+ list[i].code +"</td>";
                	}
                }else{
                	tr += "<td width='15%'>" + list[i].code +"</td>";
                }
                tr += "<td width='15%'><a href='" + $.url.companyListUrl() + "id=" + list[i].company_id + "&position=neeqNotice" + "'>" + list[i].shortname + "</td>";
                if (isNullOrEmpty(list[i].url) && isNullOrEmpty(list[i].htmlUrl)) {
                    tr += "<td style='text-align:left' width='40%'>";
                    tr += "<p style='text-align:left;'><span class='noteTit'>" + list[i].title + "</span></p>";
                    tr += "<p style='width:90%;color:#999;text-align:left;'>" + list[i].highlight + "</p></td>";
                    //tr += "<a href='javascript:void(0)'>" + list[i].title + "</a></td>";
                } else if(!isNullOrEmpty(list[i].htmlUrl)){
                	tr += "<td style='text-align:left;' width='40%'>";
                	if(!isNullOrEmpty($.cookie("read"))){
						if($.cookie("read").indexOf("r"+page+i) == -1){
	                    	tr += "<p style='text-align:left;'><a class='noteLink noteLinkHtml' href='"+$.url.newsUrl()+"from=html"+"&name=html"+"&word="+$("#comKeyWord").val()+"&position=html"+"&htmlUrl="+base64encode(utf16to8(decodeURIComponent(list[i].htmlUrl)))+"'><span class='noteTit'>" + list[i].title + "</span><img class='mgl5' src='../../assets/admin/layout/img/html_icon.png'/><img class='mgl5' src='../../assets/admin/layout/img/pdf_icon.png'/></a></p>"
	                	}else{
                    		tr += "<p style='text-align:left;'><a class='noteLink noteLinkHtml noteLink-active' href='"+$.url.newsUrl()+"from=html"+"&name=html"+"&word="+$("#comKeyWord").val()+"&position=html"+"&htmlUrl="+base64encode(utf16to8(decodeURIComponent(list[i].htmlUrl)))+"'><span class='noteTit'>" + list[i].title + "</span><img class='mgl5' src='../../assets/admin/layout/img/html_icon.png'/><img class='mgl5' src='../../assets/admin/layout/img/pdf_icon.png'/></a></p>"
                		}
                	}else{
                		tr += "<p style='text-align:left;'><a class='noteLink noteLinkHtml' href='"+$.url.newsUrl()+"from=html"+"&name=html"+"&word="+$("#comKeyWord").val()+"&position=html"+"&htmlUrl="+base64encode(utf16to8(decodeURIComponent(list[i].htmlUrl)))+"'><span class='noteTit'>" + list[i].title + "</span><img class='mgl5' src='../../assets/admin/layout/img/html_icon.png'/><img class='mgl5' src='../../assets/admin/layout/img/pdf_icon.png'/></a></p>"
            		}
                    tr += "<p style='width:90%;color:#999;text-align:left;'>" + list[i].highlight + "</p></td>";
                } else{
                	tr += "<td style='text-align:left;' width='40%'>";
                	if(!isNullOrEmpty($.cookie("read"))){
                		if($.cookie("read").indexOf("r"+page+i) == -1){
	                   		tr += "<p style='text-align:left;'><a class='noteLink' href='" + list[i].url + "'target='_blank'><span class='noteTit'>" + list[i].title + "</span><img class='mgl5' src='../../assets/admin/layout/img/pdf_icon.png'/></a></p>"
	                	}else{
	                    	tr += "<p style='text-align:left;'><a class='noteLink noteLink-active' href='" + list[i].url + "'target='_blank'><span class='noteTit'>" + list[i].title + "</span><img class='mgl5' src='../../assets/admin/layout/img/pdf_icon.png'/></a></p>"
	                	}
                	}else{
                    	tr += "<p style='text-align:left;'><a class='noteLink' href='" + list[i].url + "'target='_blank'><span class='noteTit'>" + list[i].title + "</span><img class='mgl5' src='../../assets/admin/layout/img/pdf_icon.png'/></a></p>"
                	}
                    tr += "<p style='width:90%;color:#999;text-align:left;'>" + list[i].highlight + "</p></td>";
                }
                tr += "<td width='10%'>" + list[i].publishType + "</td>";
                tr += "<td width='10%'>" + list[i].isNegative + "</td>";
                tr += "<td width='10%'>" + list[i].date + "</td>";
                tr += "</tr>";
            });
            $("#Gnote").append(tr);
            $(".noteLink").on("click",function(){
            	var thisIdx = $(this).parents('tr').index();
            	if(isNullOrEmpty($.cookie("read"))){
            		$.cookie("read","r"+page+thisIdx,{ path: "/", expiress: "" ,sucue:true});
            	}else{
            		$.cookie("read",$.cookie("read")+"r"+page+thisIdx,{ path: "/", expiress: "" ,sucue:true});
            	}
            	$(this).addClass("noteLink-active");
            });
        };
        /***分类标准***/
        $("#menu1 a").on("click", function () {
            var thisTxt = $(this).text();
            Query.setHash({
                "type": "",
                "typeText":"",
                "bzCode":thisTxt,
                "page":1
            });
            if($(".listOne").size()){
            	$(".listOne").remove()
            }
            $("#allListSo").hide();
            if (thisTxt == "业务标准") {
     			$("#comSpecial").find("li").eq(0).addClass("hang-active");
                $("#comSpecial").find("li").eq(0).siblings().removeClass("hang-active");
                $("#notesLi").show();
                $("#tradingAnou").hide();
                initTable();
            } else {
                $("#tradingAnou").find("li").eq(0).addClass("hang-active");
            	$("#tradingAnou").find("li").eq(0).siblings().removeClass("hang-active");
                $("#notesLi").hide();
                $("#tradingAnou").show();
                initTable();
            }
        })

        /***搜索***/
        $("#noteSer").on("click", function () {
        	Query.setHash({
                "page":1
            });
            var outkeyword = $("#comKeyWordOut").val();
            var keyword = $("#comKeyWord").val();
            var type = $("#comSpecial").find(".hang-active").attr("name");
            var start_time = $("#startDate").val();
            var stop_time = $("#stopDate").val();
            if (isNullOrEmpty(type)) {
                type = '';
            }
			
			if(start_time !="" && stop_time ==""){
				alert("请选择结束时间！")
            	return false;
            }else if(start_time =="" && stop_time !=""){
            	alert("请选择开始时间！")
            	return false;
            }else if(!isNullOrEmpty(outkeyword) || !isNullOrEmpty(keyword)) {
				if(!isNullOrEmpty(outkeyword) && !isNullOrEmpty(keyword)){
					if (outkeyword == keyword) {
	                    alert("关键字和排除关键字不能相同！");
	                    return false;
	                }else if(start_time =="" && stop_time ==""){
	                	$("#Gnote").html("");
	                    initTable();
	                }else if(start_time !="" && stop_time !=""){
	                	if(compareDate(start_time, stop_time)){
	                		$("#Gnote").html("");
		                    initTable();
	                	}
	                }
				}else{
					initTable();
				}
			}else{
				initTable();
			}
        });
		
		/*官方标准点击事件*/
        $("#tradingAnou").find("li").on("click", function () {
            /*$("#Gnote").html("");
            $(this).addClass("hang-active");
            $(this).siblings().removeClass("hang-active");
            var seCode = $(this).attr('name');
            var _text = $(this).text();
            Query.setHash({
                "type": seCode,
                "typeText":_text,
                "page":1
            });
          	 initTable();
          	 removeThing();*/
        	event.preventDefault();
            var ind = $("#soCheck").find("li").length;
            if (!$(this).hasClass("hang-more")) {
                $("#Gnote").html("");
                $(this).parent("ul").find("li").removeClass("hang-active");
                $(this).addClass("hang-active");
                /*公告类型*/
                if ($(this).parents(".allList").attr("id") == "tradingAnou") {
                    var seCode = $(this).attr("name");
                    var _text = $(this).text();
                    if ($(this).index() == 0) {
                    	if($(".listOne").length){
                    		if(ind <= 2){
                    			$("#allListSo").hide();
                    		}
                    		Query.setHash({
	                            "type": "",
	                            "typeText":"",
                				"page":1
	                        });
	                        $(".listOne").remove();
                    	}
                       
                    } else {
                    	$("#allListSo").show();
                        var seCode = $(this).attr('name');
                        var _text = $(this).text();
			            Query.setHash({
			                "type": seCode,
			                "typeText":_text,
            				"page":1
			            });
                        $(".listOne").remove();
                        $("#allListSo").find("ul").prepend("<li class='listOne' name =" + seCode + ">" + _text + "<span class='soListClose'></span></li>");
                    }

                }
            
            }
	        
            initTable();
            removeThing();
        
        });
		
        //重置
        $(".compReset").on("click", function () {
        	Query.setHash({
                "page":1,
                "typeText":"",
                "type": ""
            });
            var _thisVal = $(this).val();
            $(".contan-search,.datePar").find("input").val("");
            $(".allList").find("li:first").addClass("hang-active").siblings("li").removeClass("hang-active")
            initTable();
        });

        //回车查询
        $(".form-filter").on("keydown", function (e) {
        	Query.setHash({
                "page":1
            });
            var keyCode = e.which;
            var btnId = $(this).parents(".mod-con-ipt").children(".compBtn").children("button:first").attr("id");
            if (keyCode == 13) {
                $("#" + btnId).click();
            }
        })
		//业务标准点击事件
        $("#notesLi").find("li").on("click", function (event) {
        	event.preventDefault();
            var ind = $("#soCheck").find("li").length;
            if (!$(this).hasClass("hang-more")) {
                $("#Gnote").html("");
                $(this).parent("ul").find("li").removeClass("hang-active");
                $(this).addClass("hang-active");
                /*公告类型*/
                if ($(this).parents(".allList").attr("id") == "notesLi") {
                    securities = $(this).text();
                    var seCode = $(this).attr("name");
                    var _text = $(this).text();
                    if ($(this).index() == 0) {
                    	if($(".listOne").length){
                    		if(ind <= 2){
                    			$("#allListSo").hide();
                    		}
                    		Query.setHash({
	                            "type": "",
	                            "typeText":"",
                				"page":1
	                        });
	                        $(".listOne").remove();
                    	}
                       
                    } else {
                    	$("#allListSo").show();
                        var seCode = $(this).attr('name');
                        var _text = $(this).text();
			            Query.setHash({
			                "type": seCode,
			                "typeText":_text,
            				"page":1
			            });
                        $(".listOne").remove();
                        $("#allListSo").find("ul").prepend("<li class='listOne' name =" + seCode + ">" + securities + "<span class='soListClose'></span></li>");
                    }

                }
            
            }
	        
            initTable();
            removeThing();
        });
		getUrlParam();
    }
    
    //业务周知
    var messageBusiness = function () {
    	var initTable = function(){
    		var keyword = $("#comKeyWord2").val();
	        var type = $("#tradingAnou2").find(".hang-active").attr("name");
	        var start_time = $("#startDate2").val();
	        var stop_time = $("#stopDate2").val();
	        var outkeyword = $("#comKeyWordOut2").val();
	        if (isNullOrEmpty(type)) {
	            type = '';
	        }
	        var _url = $.kf.GNOTE + "?" + "keyword=" + keyword + "&outkeyword=" + outkeyword + "&start_time=" + start_time + "&stop_time=" + stop_time + "&typeCode=b01";
	        //new GetTable(_url, $("#pageTool"), {}, noteList, "get", $("#Gnote2")).init();
	        if (compareDate(start_time, stop_time)) {
				var lastPage = Query.getHash("page");
	            $.getTable({
		        	url:_url,//url
			    	pageId:$("#pageTool"),//分页id
			    	callback:noteList,//callback
			    	currentPage:lastPage,
			    	tbodyId:$("#Gnote2")//tbody的id,
		        })
		       };
    	}
        initTable();
        /***table***/
        function noteList(data) {
            var list = data.data;
            var tr = "";
            $("#Gnote2").html("");
            $(list).each(function (i) {
                tr += "<tr>";
                tr += "<td width='10%'>" + list[i].code + "</td>";
                tr += "<td><a href='" + $.url.companyListUrl() + "id=" + list[i].company_id + "&position=neeqNotice" + "'>" + list[i].shortname + "</td>";
                if (isNullOrEmpty(list[i].url)) {
                    tr += "<td style='text-align:left' width='50%'>"
                    tr += "<p style='text-align:left;'><span class='noteTit'>" + list[i].title + "</span></p>"
                    tr += "<p style='width:90%;color:#999;text-align:left;'>" + list[i].highlight + "</p></td>";
                    //tr += "<a href='javascript:void(0)'>" + list[i].title + "</a></td>";
                } else {
                    //tr += "<td  style='text-align:left;' width='50%'><a href='" + list[i].url + "'target='_blank'>" + list[i].title + "</a></td>";
                    tr += "<td style='text-align:left;' width='50%'>"
                    tr += "<p style='text-align:left;'><a href='" + list[i].url + "'target='_blank'><span class='noteTit'>" + list[i].title + "</span></a></p>"
                    tr += "<p style='width:90%;color:#999;text-align:left;'>" + list[i].highlight + "</p></td>";
                }
                tr += "<td width='10%'>" + list[i].publishType + "</td>";
                tr += "<td width='10%'>" + list[i].isNegative + "</td>";
                tr += "<td width='10%'>" + list[i].date + "</td>";
                tr += "</tr>";
            });
            $("#Gnote2").append(tr);
            if(isNullOrEmpty(data.total)){
            	data.total = 0;
            }
          	$(".tab-content").find('.active .mod-con-ipt').after("<div class='row allListTow pageTotalDiv'><div class='hang-title'>共<span class='pageTotal'>"+ data.total +"</span>条结果</div></div>");
        };

        /***搜索***/
        $("#noteSer2").on("click", function () {
        	Query.setHash({
                "page":1
            });
            var keyword = $("#comKeyWord2").val();
            var type = $("#comSpecial2").find(".hang-active").attr("name");
            var start_time = $("#startDate2").val();
            var stop_time = $("#stopDate2").val();
            var outkeyword = $("#comKeyWordOut2").val();
            if (isNullOrEmpty(type)) {
                type = '';
            }

            if(start_time !="" && stop_time ==""){
				alert("请选择结束时间！")
            	return false;
            }else if(start_time =="" && stop_time !=""){
            	alert("请选择开始时间！")
            	return false;
            }else if(!isNullOrEmpty(outkeyword) || !isNullOrEmpty(keyword)) {
				if(!isNullOrEmpty(outkeyword) && !isNullOrEmpty(keyword)){
					if (outkeyword == keyword) {
	                    alert("关键字和排除关键字不能相同！");
	                    return false;
	                }else if(start_time =="" && stop_time ==""){
	                	$("#Gnote2").html("");
	                    initTable();
	                }else if(start_time !="" && stop_time !=""){
	                	if(compareDate(start_time, stop_time)){
	                		$("#Gnote2").html("");
		                    initTable();
	                	}
	                }
				}else{
					initTable();
				}
			}else{
				initTable();
			}
        });


        //重置
        $(".compReset").on("click", function () {
        	Query.setHash({
                "page":1
            });
            var _thisVal = $(this).val();
            $(".contan-search,.datePar").find("input").val("");
            $(".allList").find("li:first").addClass("hang-active").siblings("li").removeClass("hang-active")
            initTable();
        });

        //回车查询
        $(".form-filter").on("keydown", function (e) {
            var keyCode = e.which;
            var btnId = $(this).parents(".mod-con-ipt").children(".compBtn").children("button:first").attr("id");
            if (keyCode == 13) {
                $("#" + btnId).click();
            }
        })

        $("#notesLi").find("li").on("click", function () {
            $(this).addClass("hang-active");
            $(this).siblings().removeClass("hang-active");
            initTable();
        });

    }
    
    //监管公告
    var messageSupervision = function () {
    	var initTable = function(){
    		var keyword = $("#comKeyWord5").val();
	        var type = $("#tradingAnou5").find(".hang-active").attr("name");
	        var start_time = $("#startDate5").val();
	        var stop_time = $("#stopDate5").val();
	        var outkeyword = $("#comKeyWordOut5").val();
	        if (isNullOrEmpty(type)) {
	            type = '';
	        }
	        var _url = $.kf.GNOTE + "?" + "keyword=" + keyword + "&outkeyword=" + outkeyword + "&start_time=" + start_time + "&stop_time=" + stop_time + "&typeCode=b02";
	        //new GetTable(_url, $("#pageTool"), {}, noteList, "get", $("#Gnote3")).init();
	        if (compareDate(start_time, stop_time)) {
				var lastPage = Query.getHash("page");
	            $.getTable({
		        	url:_url,//url
			    	pageId:$("#pageTool"),//分页id
			    	callback:noteList,//callback
			    	currentPage:lastPage,
			    	tbodyId:$("#Gnote3")//tbody的id,
		        })
		       };
    	}
		initTable();
        /***table***/
        function noteList(data) {
            var list = data.data;
            var tr = "";
            $("#Gnote3").html("");
            $(list).each(function (i) {
                tr += "<tr>";
                tr += "<td width='10%'>" + list[i].code + "</td>";
                tr += "<td><a href='" + $.url.companyListUrl() + "id=" + list[i].company_id + "&position=neeqNotice" + "'>" + list[i].shortname + "</td>";
                if (isNullOrEmpty(list[i].url)) {
                    tr += "<td style='text-align:left' width='50%'>"
                    tr += "<p style='text-align:left;'><span class='noteTit'>" + list[i].title + "</span></p>"
                    tr += "<p style='width:90%;color:#999;text-align:left;'>" + list[i].highlight + "</p></td>";
                    //tr += "<a href='javascript:void(0)'>" + list[i].title + "</a></td>";
                } else {
                    //tr += "<td  style='text-align:left;' width='50%'><a href='" + list[i].url + "'target='_blank'>" + list[i].title + "</a></td>";
                    tr += "<td style='text-align:left;' width='50%'>"
                    tr += "<p style='text-align:left;'><a href='" + list[i].url + "'target='_blank'><span class='noteTit'>" + list[i].title + "</span></a></p>"
                    tr += "<p style='width:90%;color:#999;text-align:left;'>" + list[i].highlight + "</p></td>";
                }
                tr += "<td width='10%'>" + list[i].publishType + "</td>";
                tr += "<td width='10%'>" + list[i].isNegative + "</td>";
                tr += "<td width='10%'>" + list[i].date + "</td>";
                tr += "</tr>";
            });
            $("#Gnote3").append(tr);
           if(isNullOrEmpty(data.total)){
            	data.total = 0;
            }
            $(".tab-content").find('.active .mod-con-ipt').after("<div class='row allListTow pageTotalDiv'><div class='hang-title'>共<span class='pageTotal'>"+ data.total +"</span>条结果</div></div>");
        };

        //重置
        $(".compReset").on("click", function () {
        	Query.setHash({
                "page":1
            });
            var _thisVal = $(this).val();
            $(".contan-search,.datePar").find("input").val("");
            $(".allList").find("li:first").addClass("hang-active").siblings("li").removeClass("hang-active")
            initTable();
        });

        //回车查询
        $(".form-filter").on("keydown", function (e) {
            var keyCode = e.which;
            var btnId = $(this).parents(".mod-con-ipt").children(".compBtn").children("button:first").attr("id");
            if (keyCode == 13) {
                $("#" + btnId).click();
            }
        })

        $("#noteSer5").on("click", function () {
        	Query.setHash({
                "page":1
            });
            $(this).addClass("hang-active");
            $(this).siblings().removeClass("hang-active");
            var keyword = $("#comKeyWord5").val();
	        var type = $("#tradingAnou5").find(".hang-active").attr("name");
	        var start_time = $("#startDate5").val();
	        var stop_time = $("#stopDate5").val();
	        var outkeyword = $("#comKeyWordOut5").val();
            if (isNullOrEmpty(type)) {
                type = '';
            }
            if(start_time !="" && stop_time ==""){
				alert("请选择结束时间！")
            	return false;
            }else if(start_time =="" && stop_time !=""){
            	alert("请选择开始时间！")
            	return false;
            }else if(!isNullOrEmpty(outkeyword) || !isNullOrEmpty(keyword)) {
				if(!isNullOrEmpty(outkeyword) && !isNullOrEmpty(keyword)){
					if (outkeyword == keyword) {
	                    alert("关键字和排除关键字不能相同！");
	                    return false;
	                }else if(start_time =="" && stop_time ==""){
	                	$("#Gnote3").html("");
	                    initTable();
	                }else if(start_time !="" && stop_time !=""){
	                	if(compareDate(start_time, stop_time)){
	                		$("#Gnote3").html("");
		                    initTable();
	                	}
	                }
				}else{
					$("#Gnote3").html("");
					initTable();
				}
			}else{
				$("#Gnote3").html("");
				initTable();
			}
        });

    }
    
    //问询函
    var messageLetter = function () {
    	var initTable = function(){
    		var keyword = $("#comKeyWord4").val();
	        var type = $("#yqType").find(".hang-active").attr("name");
	        var start_time = $("#startDate4").val();
	        var stop_time = $("#stopDate4").val();
	        var outkeyword = $("#comKeyWordOut4").val();
	        var _url = $.kf.GNOTE + "?" + "keyword=" + keyword + "&outkeyword=" + outkeyword + "&typeCode=" + type + "&start_time=" + start_time + "&stop_time=" + stop_time;
	        //new GetTable(_url, $("#pageTool"), {}, noteList, "get", $("#Gnote4")).init();
	        if (compareDate(start_time, stop_time)) {
				var lastPage = Query.getHash("page");
	            $.getTable({
		        	url:_url,//url
			    	pageId:$("#pageTool"),//分页id
			    	callback:noteList,//callback
			    	currentPage:lastPage,
			    	tbodyId:$("#Gnote4")//tbody的id,
		        })
		       };
    	}
        initTable();

        /***table***/
        function noteList(data) {
            var list = data.data;
            var tr = "";
            $("#Gnote4").html("");
            $(list).each(function (i) {
                tr += "<tr>";
                tr += "<td width='10%'>" + list[i].code + "</td>";
                tr += "<td><a href='" + $.url.companyListUrl() + "id=" + list[i].company_id + "&position=neeqNotice" + "'>" + list[i].shortname + "</td>";
                if (isNullOrEmpty(list[i].url)) {
                    tr += "<td style='text-align:left' width='50%'>"
                    tr += "<p style='text-align:left;'><span class='noteTit'>" + list[i].title + "</span></p>"
                    tr += "<p style='width:90%;color:#999;text-align:left;'>" + list[i].highlight + "</p></td>";
                    //tr += "<a href='javascript:void(0)'>" + list[i].title + "</a></td>";
                } else {
                    //tr += "<td  style='text-align:left;' width='50%'><a href='" + list[i].url + "'target='_blank'>" + list[i].title + "</a></td>";
                    tr += "<td style='text-align:left;' width='50%'>"
                    tr += "<p style='text-align:left;'><a href='" + list[i].url + "'target='_blank'><span class='noteTit'>" + list[i].title + "</span></a></p>"
                    tr += "<p style='width:90%;color:#999;text-align:left;'>" + list[i].highlight + "</p></td>";
                }
                tr += "<td width='10%'>" + list[i].publishType + "</td>";
                tr += "<td width='10%'>" + list[i].isNegative + "</td>";
                tr += "<td width='10%'>" + list[i].date + "</td>";
                tr += "</tr>";
            });
            $("#Gnote4").append(tr);
        };
        
        /*邀请函type点击事件*/
        $("#yqType").find("li").on("click", function () {
            $("#Gnote4").html("");
            $(this).addClass("hang-active");
            $(this).siblings().removeClass("hang-active");
            initTable();
        });


        //重置
        $(".compReset").on("click", function () {
        	Query.setHash({
                "page":1
            });
            var _thisVal = $(this).val();
            $(".contan-search,.datePar").find("input").val("");
            $(".allList").find("li:first").addClass("hang-active").siblings("li").removeClass("hang-active")
            initTable();
        });

        //回车查询
        $(".form-filter").on("keydown", function (e) {
        	Query.setHash({
                "page":1
            });
            var keyCode = e.which;
            var btnId = $(this).parents(".mod-con-ipt").children(".compBtn").children("button:first").attr("id");
            if (keyCode == 13) {
                $("#" + btnId).click();
            }
        })

        $("#noteSer4").on("click", function () {
        	Query.setHash({
                "page":1
            });
            $(this).addClass("hang-active");
            $(this).siblings().removeClass("hang-active");
            var keyword = $("#comKeyWord4").val();
	        var type = $("#tradingAnou4").find(".hang-active").attr("name");
	        var start_time = $("#startDate4").val();
	        var stop_time = $("#stopDate4").val();
	        var outkeyword = $("#comKeyWordOut4").val();
            if (isNullOrEmpty(type)) {
                type = '';
            }
            if(start_time !="" && stop_time ==""){
				alert("请选择结束时间！")
            	return false;
            }else if(start_time =="" && stop_time !=""){
            	alert("请选择开始时间！")
            	return false;
            }else if(!isNullOrEmpty(outkeyword) || !isNullOrEmpty(keyword)) {
				if(!isNullOrEmpty(outkeyword) && !isNullOrEmpty(keyword)){
					if (outkeyword == keyword) {
	                    alert("关键字和排除关键字不能相同！");
	                    return false;
	                }else if(start_time =="" && stop_time ==""){
	                	$("#Gnote4").html("");
	                    initTable();
	                }else if(start_time !="" && stop_time !=""){
	                	if(compareDate(start_time, stop_time)){
	                		$("#Gnote4").html("");
		                    initTable();
	                	}
	                }
				}else{
					initTable();
				}
			}else{
				initTable();
			}
        });
    }
    
    //审查信息
    var messageCheck = function () {
    	var initTable = function(){
    		var keyword = $("#comKeyWord3").val();
	        var type = $("#tradingAnou3").find(".hang-active").attr("name");
	        var start_time = $("#startDate3").val();
	        var stop_time = $("#stopDate3").val();
	        var outkeyword = $("#comKeyWordOut3").val();
	        if (isNullOrEmpty(type)) {
	            type = '';
	        }
	        var _url = $.kf.GNOTE + "?" + "keyword=" + keyword + "&outkeyword=" + outkeyword + "&start_time=" + start_time + "&stop_time=" + stop_time + "&typeCode=b04";
	        //new GetTable(_url, $("#pageTool"), {}, noteList, "get", $("#Gnote5")).init();
	        if (compareDate(start_time, stop_time)) {
				var lastPage = Query.getHash("page");
	            $.getTable({
		        	url:_url,//url
			    	pageId:$("#pageTool"),//分页id
			    	callback:noteList,//callback
			    	currentPage:lastPage,
			    	tbodyId:$("#Gnote5")//tbody的id,
		        })
		       };
    	}
        
		initTable();
        /***table***/
        function noteList(data) {
            var list = data.data;
            var tr = "";
            $("#Gnote5").html("");
            $(list).each(function (i) {
                tr += "<tr>";
                tr += "<td width='10%'>" + list[i].code + "</td>";
                tr += "<td><a href='" + $.url.companyListUrl() + "id=" + list[i].company_id + "&position=neeqNotice" + "'>" + list[i].shortname + "</td>";
                if (isNullOrEmpty(list[i].url)) {
                    tr += "<td style='text-align:left' width='50%'>"
                    tr += "<p style='text-align:left;'><span class='noteTit'>" + list[i].title + "</span></p>"
                    tr += "<p style='width:90%;color:#999;text-align:left;'>" + list[i].highlight + "</p></td>";
                    //tr += "<a href='javascript:void(0)'>" + list[i].title + "</a></td>";
                } else {
                    //tr += "<td  style='text-align:left;' width='50%'><a href='" + list[i].url + "'target='_blank'>" + list[i].title + "</a></td>";
                    tr += "<td style='text-align:left;' width='50%'>"
                    tr += "<p style='text-align:left;'><a href='" + list[i].url + "'target='_blank'><span class='noteTit'>" + list[i].title + "</span></a></p>"
                    tr += "<p style='width:90%;color:#999;text-align:left;'>" + list[i].highlight + "</p></td>";
                }
                tr += "<td width='10%'>" + list[i].publishType + "</td>";
                tr += "<td width='10%'>" + list[i].isNegative + "</td>";
                tr += "<td width='10%'>" + list[i].date + "</td>";
                tr += "</tr>";
            });
            $("#Gnote5").append(tr);
            if(isNullOrEmpty(data.total)){
            	data.total = 0;
            }
           if(isNullOrEmpty(data.total)){
            	data.total = 0;
            }
            $(".tab-content").find('.active .mod-con-ipt').after("<div class='row allListTow pageTotalDiv'><div class='hang-title'>共<span class='pageTotal'>"+ data.total +"</span>条结果</div></div>");
        };

        //重置
        $(".compReset").on("click", function () {
        	Query.setHash({
                "page":1
            });
            var _thisVal = $(this).val();
            $(".contan-search,.datePar").find("input").val("");
            $(".allList").find("li:first").addClass("hang-active").siblings("li").removeClass("hang-active")
            initTable();
        });

        //回车查询
        $(".form-filter").on("keydown", function (e) {
            var keyCode = e.which;
            var btnId = $(this).parents(".mod-con-ipt").children(".compBtn").children("button:first").attr("id");
            if (keyCode == 13) {
                $("#" + btnId).click();
            }
        })

        $("#noteSer3").on("click", function () {
        	Query.setHash({
                "page":1
            });
            $(this).addClass("hang-active");
            $(this).siblings().removeClass("hang-active");
            var keyword = $("#comKeyWord3").val();
	        var type = $("#tradingAnou3").find(".hang-active").attr("name");
	        var start_time = $("#startDate3").val();
	        var stop_time = $("#stopDate3").val();
	        var outkeyword = $("#comKeyWordOut3").val();
            if (isNullOrEmpty(type)) {
                type = '';
            }
            
            if(start_time !="" && stop_time ==""){
				alert("请选择结束时间！")
            	return false;
            }else if(start_time =="" && stop_time !=""){
            	alert("请选择开始时间！")
            	return false;
            }else if(!isNullOrEmpty(outkeyword) || !isNullOrEmpty(keyword)) {
				if(!isNullOrEmpty(outkeyword) && !isNullOrEmpty(keyword)){
					if (outkeyword == keyword) {
	                    alert("关键字和排除关键字不能相同！");
	                    return false;
	                }else if(start_time =="" && stop_time ==""){
	                	$("#Gnote5").html("");
	                    initTable();
	                }else if(start_time !="" && stop_time !=""){
	                	if(compareDate(start_time, stop_time)){
	                		$("#Gnote5").html("");
		                    initTable();
	                	}
	                }
				}else{
					initTable();
				}
			}else{
				initTable();
			}
        });

    }

    return {
        newsThreeNote: function () {
            newsThreeNote();
        },
        messageBusiness: function(){
        	messageBusiness();
        },
        messageSupervision: function(){
        	messageSupervision();
        },
        messageLetter: function(){
        	messageLetter();
        },
        messageCheck: function(){
        	messageCheck();
        }
    }
}();