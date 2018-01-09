/*
 * 
 * 
 邀请认证  
 * 
 * 
 * */
var SpecIden = function () {
    //选项点击事件
    var listComClick = function () {
        var industry = "";
        var province = "";
        var verifyrecord = "";
        var teCode = '';
        var seCode = '';
        var ccCode = '';
        var typeText = '';
        $(".allList").find("li").unbind("click").on("click", function (event) {
            event.preventDefault();
            var ind = $("#soCheck").find("li").length;
            if (!$(this).hasClass("hang-more")) {
                $("#tableOne").html("");
                $(this).parent("ul").find("li").removeClass("hang-active");
                $(this).addClass("hang-active");
                teCode = Query.getHash("teCode");
				seCode = Query.getHash("seCode");
				ccCode = Query.getHash("ccCode");
                /*行业分类*/
                if ($(this).parents(".allList").attr("id") == "compQs") {
                    industry = $(this).text();
                    teCode = $(this).attr("name");
                    if ($(this).index() == 0) {
                    	if($(".listOne").length){
                    		if(ind <= 2){
                    			$("#allListSo").hide();
                    		}
                    		Query.setHash({
	                            "teCode": ""
	                        });
	                        $(".listOne").remove();
                    	}
                    } else {
                    	$("#allListSo").show();
                        Query.setHash({
                            "teCode": teCode
                        });
                        $(".listOne").remove();
                        $("#allListSo").find("ul").prepend("<li class='listOne' name =" + teCode + ">" + industry + "<span class='soListClose'></span></li>");
                    }
                }
                /*省份*/
                if ($(this).parents(".allList").attr("id") == "compSf") {
                    province = $(this).text();
                    seCode = $(this).attr("name");
                    if ($(this).index() == 0) {
                    	if($(".listTwo").length){
                    		if(ind <= 2){
                    			$("#allListSo").hide();
                    		}
                    		Query.setHash({
	                            "seCode": ""
	                        });
	                        $(".listTwo").remove();
                    	}
                    } else {
                    	$("#allListSo").show();
                        Query.setHash({
                            "seCode": seCode
                        });
                        $(".listTwo").remove();
                        $("#allListSo").find("ul").prepend("<li class='listTwo' name =" + seCode + ">" + province + "<span class='soListClose'></span></li>");
                    }
                }
                 /*认证状态*/
                if ($(this).parents(".allList").attr("id") == "compYg") {
                    ccCode = $(this).attr("name");
                    verifyrecord = $(this).text();
                    if ($(this).index() == 0) {
                    	if($(".listThree").length){
                    		if(ind <= 2){
                    			$("#allListSo").hide();
                    		}
	                        Query.setHash({
	                            "ccCode": ""
	                        });
	                        $(".listThree").remove();
                    	}
                    } else {
                    	$("#allListSo").show();
                        Query.setHash({
                            "ccCode": ccCode
                        });
                        $(".listThree").remove();
                        $("#allListSo").find("ul").prepend("<li class='listThree' name =" + ccCode + ">" + verifyrecord + "<span class='soListClose'></span></li>");
                    }
                }
                
                //行业
                if ($(".listOne").size()) {
                    industry = $(".listOne").attr("name");
                } else if ($("#compQs").find(".hang-active").text() == "全部") {
                    industry = "";
                } else {
                    industry = $("#compQs").find(".hang-active").attr("name")
                }
                //省份
                if ($(".listTwo").size()) {
                    province = $(".listTwo").text();
                } else if ($("#compHy").find(".hang-active").text() == "全部") {
                    province = "";
                } else {
                    province = $("#compHy").find(".hang-active").text()
                }
                //状态
                if ($(".listThree").size()) {
                    verifyrecord = $(".listThree").attr("name");
                } else if ($("#compYg").find(".hang-active").text() == "全部") {
                    verifyrecord = "";
                } else {
                    verifyrecord = $("#compYg").find(".hang-active").attr("name");
                }
                var _url = "";
                var keyword = $("#comKeyWord").val();
                _url = $.kf.AUTHENTICATION+"?"+"keyword="+keyword+"&industry="+industry+"&province="+province+"&verifyrecord="+verifyrecord;                                                       
				new GetTable(_url,$("#pageTool"),"",getList,"get",$("#tableOne")).init(); 
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
            tr += "<td><label><input type='checkbox' name='0' value='"+ list[i].id +"'></label></td>";
            tr += "<td>" + list[i].code + "</td>";
			tr += "<td>" + list[i].secompanyName + "</td>";
            tr += "<td>" + list[i].companyName + "</td>";
            tr += "<td><input class='ganerateEmail' type='text' class='text-center' name='0' value="+ list[i].email +"></td>";
            tr += "<td><input class='ganerateTel' type='text' class='text-center' name='0' value="+ list[i].tel +"></td>";
            tr += "<td>" + list[i].verifyRecord + "</td>";
            tr += "<td>" + list[i].authenticationCode + "</td>";
            if(list[i].operation == 1){
            	tr += "<td><a href='javascript:void(0)' class='bdBtn' set-id='"+ list[i].id +"'>取消绑定</a></td>";
            }else{
            	tr += "<td>未绑定</td>";
            }
            tr += "</tr>";
        });
        $("#tableOne").append(tr);
        cancelBinding();
        $("input:checkbox").uniform(); 
    };
    //取消绑定
    var cancelBinding = function (){
    	$(".bdBtn").on("click",function(){
        	var _thisId = $(this).attr("set-id");
        	alert("确认要取消绑定吗？","温馨提示","cancelBinding");
        	$("#cancelBinding").on("click",function(){
        		//ajax提交
        		var _url = {
        			"id":_thisId
        		}
	        	$.ajax({
		            type: "post",
		            url: $.kf.GETUNBINDING,
		            data: _url,
		            dataType: "json",
		            success: function (data) {
						if(data.code == '0'){
							alert("取消绑定成功！","温馨提示","cancelBindingSucess");
						}else{
							alert("取消绑定失败，请重试！","温馨提示");
						}
						$("#cancelBindingSucess").click(function(){
							location.reload(location.href);
						})
		            }
		        });
        	})
        })
    }
    var removeThing = function () {
        //点击关闭按钮
        $(".soListClose").unbind("click").on("click", function () {
            var flg = $(this).index();
            $("#tableOne").html("");
            if ($(this).parents(".allListSo").find("li").length == 2) {
                $(this).parents(".allListSo").hide();
            }
            $(this).parent().remove();
            //查询条件清楚地址栏参数
            if ($(this).parent().hasClass("listOne")) {
                $("#compQs").find("li").each(function () {
                    if ($(this).text() == "全部") {
                        $(this).addClass("hang-active");
                        $(this).siblings().removeClass("hang-active");
                    }
                });
                Query.setHash({
                    teCode: ""
                });
            }
            if ($(this).parent().hasClass("listTwo")) {
                $("#compSf").find("li").each(function () {
                    if ($(this).text() == "全部") {
                        $(this).addClass("hang-active");
                        $(this).siblings().removeClass("hang-active");
                    }
                });
                Query.setHash({
                    seCode: ""
                });
            }
            if ($(this).parent().hasClass("listThree")) {
                $("#compYg").find("li").each(function () {
                    if ($(this).text() == "全部") {
                        $(this).addClass("hang-active");
                        $(this).siblings().removeClass("hang-active");
                    }
                });
                Query.setHash({
                    ccCode: ""
                });
            }
            var _url = "";
            var industry = "";
            var province = "";
            var verifyrecord = "";
			var keyword = $("#comKeyWord").val();
            //行业
	        if ($(".listOne").size()) {
	            industry = $(".listOne").attr("name");
	        } else if ($("#compQs").find(".hang-active").text() == "全部") {
	            industry = "";
	        } else {
	            industry = $("#compQs").find(".hang-active").attr("name")
	        }
	        //省份
	        if ($(".listTwo").size()) {
	            province = $(".listTwo").text();
	        } else if ($("#compHy").find(".hang-active").text() == "全部") {
	            province = "";
	        } else {
	            province = $("#compHy").find(".hang-active").text()
	        }
	        //状态
	        if ($(".listThree").size()) {
	            verifyrecord = $(".listThree").attr("name");
	        } else if ($("#compSf").find(".hang-active").text() == "全部") {
	            verifyrecord = "";
	        } else {
	            verifyrecord = $("#compSf").find(".hang-active").attr("name");
	        }
            _url = $.kf.AUTHENTICATION+"?"+"keyword="+keyword+"&industry="+industry+"&province="+province+"&verifyrecord="+verifyrecord;                                                       
			new GetTable(_url,$("#pageTool"),"",getList,"get",$("#tableOne")).init();
        });
    };
    var getUrlParam = function () {
        var atxt = '';
        var btxt = '';
        var ctxt = '';
        var aCode = Query.getHash("teCode");
		var bCode = Query.getHash("seCode");
		var cCode = Query.getHash("ccCode");
        $("#compQs").find("li").each(function (i) {
            if (!isNullOrEmpty(aCode)) {
                if ($(this).attr("name") != aCode) {
                    $(this).removeClass("hang-active");
                    $(this).nextAll("li").removeClass("hang-active");
                    $("#compPop").find("li").each(function () {
                        if ($(this).attr("name") == aCode) {
                            atxt = $(this).text();
                        }
                    });
                } else {
                    $(this).addClass("hang-active");
                    $(this).siblings("li").removeClass("hang-active");
                    atxt = $(this).text();
                }
            }
        });
        $("#compSf").find("li").each(function (i) {
            if (!isNullOrEmpty(bCode)) {
                if ($(this).attr("name") != bCode) {
                    $(this).removeClass("hang-active");
                    $(this).nextAll("li").removeClass("hang-active");
                    $("#comProvince").find("li").each(function () {
                        if ($(this).attr("name") == bCode) {
                            btxt = $(this).text();
                        }
                    });
                } else {
                    $(this).addClass("hang-active");
                    $(this).siblings("li").removeClass("hang-active");
                    btxt = $(this).text();
                }
            }
        });
        $("#compYg").find("li").each(function (i) {
            if (!isNullOrEmpty(cCode)) {
                if ($(this).attr("name") != cCode) {
                    $(this).removeClass("hang-active");
                    $(this).nextAll("li").removeClass("hang-active");
                } else {
                    $(this).addClass("hang-active");
                    $(this).siblings("li").removeClass("hang-active");
                    ctxt = $(this).text();
                }
            }
        });
        if (isNullOrEmpty(aCode) && isNullOrEmpty(bCode) && isNullOrEmpty(cCode)) {
            $("#allListSo").hide();
        }
        if (!isNullOrEmpty(aCode)) {
            $("#allListSo").show();
            $(".listOne").remove();
            $("#allListSo").find("ul").prepend("<li class='listOne' name=" + aCode + ">" + atxt + "<span class='soListClose'></span></li>");
        }
        if (!isNullOrEmpty(bCode)) {
            $("#allListSo").show();
            $(".listTwo").remove();
            $("#allListSo").find("ul").prepend("<li class='listTwo' name=" + bCode + ">" + btxt + "<span class='soListClose'></span></li>");
        }
        if (!isNullOrEmpty(cCode)) {
            $("#allListSo").show();
            $(".listThree").remove();
            $("#allListSo").find("ul").prepend("<li class='listThree' name=" + cCode + ">" + ctxt + "<span class='soListClose'></span></li>");
        }
        //清空选项
        $("#soClear").on("click", function () {
        	Query.setHash({
                teCode: ""
            });
            Query.setHash({
                seCode: ""
            });
            Query.setHash({
                ccCode: ""
            });
            $(this).parent("li").siblings().remove();
            $(this).parents("#allListSo").hide();
            $("#compQs").find("li").eq(0).addClass("hang-active").siblings().removeClass("hang-active");
            $("#compSf").find("li").eq(0).addClass("hang-active").siblings().removeClass("hang-active");
            $("#compYg").find("li").eq(0).addClass("hang-active").siblings().removeClass("hang-active");
            
            //状态
	        var verifyrecord = "";
	        //行业
	        var industry = "";
	        //省份
	        var province = "";
            var keyword = $("#comKeyWord").val();
            $("#tableOne").html("");
            _url = $.kf.AUTHENTICATION+"?"+"keyword="+keyword+"&province="+province+"&industry="+industry+"&verifyrecord="+verifyrecord;                                                       
			new GetTable(_url,$("#pageTool"),"",getList,"get",$("#tableOne")).init();
        });
        //初始化列表
        initTable();
        //清空选项
        removeThing();
    };
    //初始化表格
    var initTable = function () {
        var _url = "";
        var code = '';
        var company = "";
        var keyword = $("#comKeyWord").val();
        if ($(".listOne").size()) {
            industry = $(".listOne").attr("name");
        } else if ($("#compQs").find(".hang-active").text() == "全部") {
            industry = "";
        } else {
            industry = $("#compQs").find(".hang-active").attr("name");
        }
        if ($(".listTwo").size()) {
            province = $(".listTwo").attr("name");
        } else if ($("#compSf").find(".hang-active").text() == "全部") {
            province = "";
        } else {
            province = $("#compSf").find(".hang-active").attr("name");
        }
        if ($(".listThree").size()) {
            verifyrecord = $(".listThree").attr("name");
        } else if ($("#compYg").find(".hang-active").text() == "全部") {
            verifyrecord = "";
        } else {
            verifyrecord = $("#compYg").find(".hang-active").attr("name");
        }
        _url = $.kf.AUTHENTICATION+"?"+"keyword="+keyword+"&industry="+industry+"&province="+province+"&verifyrecord="+verifyrecord;                                                       
		new GetTable(_url,$("#pageTool"),"",getList,"get",$("#tableOne")).init();
    };
    //所属行业
    var specialWord = function () {
        $.ajax({
            type: "get",
            url: $.kf.INDUSTRYWORD,
            data: "",
            dataType: "json",
            success: function (data) {
                specialFun(data);
            }
        });
    };
    //所属行业列表
    var specialFun = function (data) {
        var data = data.data;
        var tr = "";
        var trPop = "";
        var m = 0;
        $(data).each(function (i) {
            m++;
            if (i < 5) {
                tr += "<li name =" + data[i].code + ">" + data[i].name + "</li>";
            } else {
                trPop += "<li data-name=" + data[i].letter + "  name =" + data[i].code + " title=' " + data[i].name + " '>" + data[i].name + "</li>";
            }
        });
        $("#comSpecial").append(tr);
        //是否显示更多按钮
        if (m > 5) {
            $("#comSpecial").append('<li id = "trPop"  class="hang-more" data-toggle="modal" data-target="#myModal02">更多>></li>');
        }
        $("#compPop").find("ul").empty("").html("");
        $("#compPop").find("ul").append(trPop);
        $("#compPop").find("ul").append("<li name ='0'>其他</li>");
        popLetter();
        //弹窗选择事件
        comPopSpecial();
        //选项点击事件
        listComClick();
        //地址栏参数，刷新
        getUrlParam();
    };
    
    //所属行业 弹窗保存
    var comPopSpecial = function () {
        var _text = "";
        var teCode = "";
        $("#compPop").find("li").on("click", function () {
            _text = $(this).text();
            teCode = $(this).attr("name");
            $(this).addClass("provinceLi");
            $(this).siblings().removeClass("provinceLi");
            $("#compPopspecailSave").removeClass("default").addClass("btn-primary");
        });
        $("#compPopspecailSave").on("click", function () {
            $(".city-list").find("li").show();
            if (_text != "") {
                $('#myModal02').modal('hide');
                $("#compQs").find("li").removeClass("hang-active");
                Query.setHash({
                    teCode: teCode
                });
                
                var industry = teCode;
                var province = "";
				var verifyrecord = "";
				//省份
				if($(".listTwo").size()){
					province = $(".listTwo").text();
				}else if($("#compSf").find(".hang-active").text() == "全部"){
					province = "";
				}else{
					province = $("#compSf").find(".hang-active").text();
				}
				//状态
				if($(".listThree").size()){
					verifyrecord = $(".listThree").attr("name");
				}else if($("#compYg").find(".hang-active").text() == "全部"){
					verifyrecord = "";
				}else{
					verifyrecord = $("#compYg").find(".hang-active").attr("name")
				}
				
				
                var _url = "";
				var keyword = $("#comKeyWord").val();
                _url = $.kf.AUTHENTICATION+"?"+"keyword="+keyword+"&industry="+industry+"&province="+province+"&verifyrecord="+verifyrecord;                                                       
				new GetTable(_url,$("#pageTool"),"",getList,"get",$("#tableOne")).init();
                $("#allListSo").show();
                $(".listOne").remove();
                $("#allListSo").find("ul").prepend("<li class='listOne' name =" + teCode + ">" + _text + "<span class='soListClose'></span></li>");
            }
            removeThing();
        })
    }
	//省份选择pop
	var provinceChoose = function(){
		var _text = "";
		var seCode = "";
		$("#comProvince").find("li").on("click",function(){
			$("#compProvSave").addClass("btn-primary").removeClass("default");
			_text = $(this).text();
			seCode = $(this).attr("name");
			$(this).addClass("provinceLi");
			$(this).siblings().removeClass("provinceLi");
			$("#compProvSave").removeClass("default").addClass("btn-primary");
		});
		$("#compProvSave").on("click",function(){
			if($(".city-list").find(".provinceLi").text() != ""){
				$(".city-list").find("li").show();
				$(".province-ul").find("li").removeClass("provinceLi");
				$(".province-ul").find("li:last").addClass("provinceLi");
				$('#myModal').modal('hide');
				$("#tableOne").html("");
				$("#compSf").find("li").removeClass("hang-active");
				Query.setHash({
					seCode:seCode
				});
				var _url = "";
				var province = _text;
				var industry = "";
				var verifyrecord = "";
				//行业
				if($(".listOne").size()){
					industry = $(".listOne").attr("name");
				}else if($("#compQs").find(".hang-active").text() == "全部"){
					industry = "";
				}else{
					industry = $("#compQs").find(".hang-active").attr("name")
				}
				//状态
				if($(".listThree").size()){
					verifyrecord = $(".listThree").attr("name");
				}else if($("#compYg").find(".hang-active").text() == "全部"){
					verifyrecord = "";
				}else{
					verifyrecord = $("#compYg").find(".hang-active").attr("name")
				}
				var keyword = $("#comKeyWord").val();
				_url = $.kf.AUTHENTICATION+"?"+"keyword="+keyword+"&industry="+industry+"&province="+province+"&verifyrecord="+verifyrecord;                                                       
				new GetTable(_url,$("#pageTool"),"",getList,"get",$("#tableOne")).init();
				$("#allListSo").show();
				$(".listTwo").remove();
				$("#allListSo").find("ul").prepend("<li class='listTwo' name =" + seCode + ">" + _text + "<span class='soListClose'></span></li>");
			}
			removeThing();
		})
	};
	var keyWord = function () {
        /*关键词搜索按钮*/
        $("#ddSearch").on("click", function () {
            var verifyrecord = "";
            var industry = "";
            var province = "";
            //省份
            if ($(".listTwo").size()) {
                province = $(".listTwo").attr("name");
            } else if ($("#compSf").find(".hang-active").text() == "全部") {
                province = "";
            } else {
                province = $("#compSf").find(".hang-active").attr("name")
            }
            //行业
            if ($(".listOne").size()) {
                industry = $(".listOne").attr("name");
            } else if ($("#compQs").find(".hang-active").text() == "全部") {
                industry = "";
            } else {
                industry = $("#compQs").find(".hang-active").attr("name")
            }
            //状态
            if ($(".listThree").size()) {
                verifyrecord = $(".listThree").text();
            } else if ($("#compSf").find(".hang-active").text() == "全部") {
                verifyrecord = "";
            } else {
                verifyrecord = $("#compSf").find(".hang-active").text();
            }
            
            var code = "";
            var keyword = $("#comKeyWord").val();
			var _url = "";
            $("#tableOne").html("");
            _url = $.kf.AUTHENTICATION+"?"+"keyword="+keyword+"&industry="+industry+"&province="+province+"&verifyrecord="+verifyrecord;                                                       
			new GetTable(_url,$("#pageTool"),"",getList,"get",$("#tableOne")).init();
        });
        //重置
        $("#compReset").on("click", function () {
        	$(this).parents(".page-content-par").find("input").val("");
            initTable();
        });
        //回车查询
        $("#comKeyWord").on("keydown", function (e) {
            var keyCode = e.which;
            if (keyCode == 13) {
                $("#ddSearch").click();
            }
        });
        //全选
        $("#allChecked").on("click",function(){
        	var setC = $(this).attr("data-set");
        	if($(this).attr("checked") == "checked"){
				$(setC).attr("checked",true)
        	}else{
        		$(setC).attr("checked",false)
        	}
        	$("input:checkbox").uniform(); 
        })
        //邀请认证按钮点击
        $("#generateCode,#generateCodeNotice").click(function(){
        	if($(this).val() == "生成认证码"){
        		postMessage("1")
        	}else{
        		postMessage("2")
        	}
        })
        function postMessage(type){
        	var messageList = [];
        	$("#tableOne input:checkbox").each(function(){
        		if($(this).attr("checked") == "checked"){
        			var ganerateId = $(this).attr("value");
        			var ganerateEmail = $(this).parents("tr").find(".ganerateEmail").val();
        			var ganerateTel = $(this).parents("tr").find(".ganerateTel").val();
        			var arr = {
        				"id":ganerateId,
        				"email":ganerateEmail,
        				"tel":ganerateTel,
        				"type":type
        			};
        			messageList.push(arr)
        		}
        	});
        	//ajax提交
        	$.ajax({
	            type: "post",
	            url: $.kf.GENERATEAUTHENTICATION,
//			            data:"22",
	            data: {"data":JSON.stringify(messageList)},
	            dataType: "json",
	            success: function (data) {
	            	if(!isNullOrEmpty(data.data)){
	            		alert("认证码已生成！","温馨提示","ganerateSuccess");
	            		$("#ganerateSuccess").on("click",function(){
							location.reload(location.href);	  
				        })
	            	}else{
	            		alert("认证码生成失败，请再次生成！","温馨提示","ganerateError")
	            	}
	            }
	        });
        	
        }
    };
    return {
        init: function () {
            specialWord();//加载券商选项
            provinceChoose();//弹窗选择省份
            keyWord();//关键字搜索
        }
    }
}();