var collectionList = function () {
	/**********************************已收藏列表******************************************/
    //初始化表格
    //股票
    var initShares = function(){
    	_url = $.kf.GETOPTIONALSECURITIESLIST + "?page=" + 1 ;
    	//new GetTable(_url, $("#pageToolgp"), "", aSharesList, "get", $("#aSharesList")).init();
        $.getTable({
        	url:_url,//url
	    	pageId:$("#pageToolgp"),//分页id
	    	callback:aSharesList,//callback
	    	tbodyId:$("#aSharesList")//tbody的id,
        })
    }
    //公告
    var initNote = function(){
    	_urlNote = $.kf.USERCOLLECTION + "?" + "type=b05";
    	//new GetTable(_urlNote, $("#pageToolNote"), "", aNoteList, "get", $("#aNoteList")).init();
        $.getTable({
        	url:_urlNote,//url
	    	pageId:$("#pageToolNote"),//分页id
	    	callback:aNoteList,//callback
	    	tbodyId:$("#aNoteList")//tbody的id,
        })
    }
    //公众号
    var initWecha = function () {
        _urlWecha = $.kf.USERCOLLECTION + "?" + "type=weixin";
        //new GetTable(_urlWecha, $("#pageToolWecha"), "", aWechaList, "get", $("#aWechaList")).init();
        $.getTable({
        	url:_urlWecha,//url
	    	pageId:$("#pageToolWecha"),//分页id
	    	callback:aWechaList,//callback
	    	tbodyId:$("#aWechaList")//tbody的id,
        })
    };
    //报表
    var initChart = function () {
        _urlWecha = $.kf.TABLEBASESERVICEGETCOLLECTIONLIST;
        //new GetTable(_urlWecha, $("#pageToolWecha"), "", aWechaList, "get", $("#aWechaList")).init();
        $.getTable({
        	url:_urlWecha,//url
	    	pageId:$("#pageToolChart"),//分页id
	    	callback:chartList,//callback
	    	tbodyId:$("#chartsList")//tbody的id,
        })
    };
    //业务周知
    var initNote2 = function(){
    	_urlNote2 = $.kf.USERCOLLECTION + "?" + "type=b01";
    	//new GetTable(_urlNote, $("#pageToolNote"), "", aNoteList, "get", $("#aNoteList")).init();
        $.getTable({
        	url:_urlNote2,//url
	    	pageId:$("#pageToolNote2"),//分页id
	    	callback:aNoteList2,//callback
	    	tbodyId:$("#aNoteList2")//tbody的id,
        })
    }
    //监管公告
    var initNote3 = function(){
    	_urlNote3 = $.kf.USERCOLLECTION + "?" + "type=b02";
    	//new GetTable(_urlNote, $("#pageToolNote"), "", aNoteList, "get", $("#aNoteList")).init();
        $.getTable({
        	url:_urlNote3,//url
	    	pageId:$("#pageToolNote3"),//分页id
	    	callback:aNoteList3,//callback
	    	tbodyId:$("#aNoteList3")//tbody的id,
        })
    }
    //问询函
    var initNote4 = function(){
    	_urlNote4 = $.kf.USERCOLLECTION + "?" + "type=b100";
    	//new GetTable(_urlNote, $("#pageToolNote"), "", aNoteList, "get", $("#aNoteList")).init();
        $.getTable({
        	url:_urlNote4,//url
	    	pageId:$("#pageToolNote4"),//分页id
	    	callback:aNoteList4,//callback
	    	tbodyId:$("#aNoteList4")//tbody的id,
        })
    }
    //审查信息
    var initNote5 = function(){
    	_urlNote5 = $.kf.USERCOLLECTION + "?" + "type=b04";
    	//new GetTable(_urlNote, $("#pageToolNote"), "", aNoteList, "get", $("#aNoteList")).init();
        $.getTable({
        	url:_urlNote5,//url
	    	pageId:$("#pageToolNote5"),//分页id
	    	callback:aNoteList5,//callback
	    	tbodyId:$("#aNoteList5")//tbody的id,
        })
    }
    //投资机构
    var initNote6 = function(){
    	_urlNote6 = $.kf.GETOPTIONALLIST + "?"+ "type=b1";
    	//new GetTable(_urlNote, $("#pageToolNote"), "", aNoteList, "get", $("#aNoteList")).init();
        $.getTable({
        	url:_urlNote6,//url
	    	pageId:$("#pageToolNote6"),//分页id
	    	callback:aNoteList6,//callback
	    	tbodyId:$("#aNoteList6")//tbody的id,
        })
    }
    //被投企业
    var initNote7 = function(){
    	_urlNote7 = $.kf.GETOPTIONALLIST + "?"+ "type=b2";
    	//new GetTable(_urlNote, $("#pageToolNote"), "", aNoteList, "get", $("#aNoteList")).init();
        $.getTable({
        	url:_urlNote7,//url
	    	pageId:$("#pageToolNote7"),//分页id
	    	callback:aNoteList7,//callback
	    	tbodyId:$("#aNoteList7")//tbody的id,
        })
    }
    /*拼table表格*/
    var aSharesList = function (data) {
        var list = data.data;
        var tr = "";
        $("#countA").text('(' + data.total + ')')
        $("#aSharesList").html("");
        $(list).each(function (i) {
            tr += "<tr>";
            tr += "<td name='"+ list[i].code +"'>" + list[i].code + "</td>";
            tr += "<td><a href='" + $.url.companyListUrl() + "id=" + list[i].cid + "&nameCodeId=" + list[i].code + "&position=companyList"+"'>" + list[i].name + "</a></td>";
            tr += "<td style='text-align:left' name='securities'>" + list[i].remarks + "</td>";
            tr += "<td><a class='stockNote'>编辑</a></td>";
         	tr += "<td>" + list[i].start_time + "</td>";
         	tr += "<td><a class='comOptional'>移除自选</a></td>";
            tr += "</tr>";
        });
        $("#aSharesList").append(tr);
  		stockNoteClick();
  		comOptional();
    };
    //编辑备注事件
    var stockNoteClick = function(){
    	$(".stockNote").on("click",function(){
    		var stockContent = $(this).parent().prev().text();
    		$(this).parent().prev().html("<textarea autofocus>" + stockContent +"</textarea>");
    		$('textarea').focus();
  		    $('textarea').each(function () {
				if($(this).val() == ""){
					this.setAttribute('style', 'height:40px;overflow-y:hidden;width:100%;');
				}else{
					this.setAttribute('style', 'height:' + (this.scrollHeight) + 'px;overflow-y:hidden;width:100%;');
					}
			}).on('input', function () {
			  	this.style.height = 'auto';
			  	this.style.height = (this.scrollHeight) + 'px';
			});
			$('textarea').on("blur",function(){
				var code = $(this).parent().parent().children().first().attr("name");
				var type = $(this).parent("td").attr("name");
				var _content = $(this).val();
				$(this).parent().html(_content);
				var param = {
					"code":code,
					"type":type,
					"remarks":_content
				}
				$.kf.ajax({
	                type: "post",
	                url: $.kf.ADDREMARKS,
	                data: param,
	                dataType: "json",
	                processResponse: function (data) {
	
	                }
	            });
			})
    	})
    }
    //自选事件
    var comOptional = function(){
		$(".comOptional").click(function(){
			var _url = "";
			var code = $(this).parent().parent().children().first().text();
			var param = {
			  		"code":code
			 	 };
			if($(this).text()== "加入自选"){
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
		            	_url = $.kf.GETOPTIONALSECURITIESLIST + "?page=" + 1 ;
		            	//new GetTable(_url, $("#pageToolgp"), "", aSharesList, "get", $("#aSharesList")).init();
		            	$.getTable({
				        	url:_url,//url
					    	pageId:$("#pageToolgp"),//分页id
					    	callback:aSharesList,//callback
					    	tbodyId:$("#aSharesList")//tbody的id,
				        })
	            	}
			 	 })
		})
    }
    /*拼公告表格*/
    var aNoteList = function (data) {
        var list = data.data;
        var leng = list.length;
        var tr = "";
        $("#countC").text('(' + data.total + ')')
        $("#aNoteList").html("");
        $(list).each(function (i) {
            tr += "<tr>";
            if (isNullOrEmpty(list[i].url)) {
                tr += "<td>"
                tr += "<p><span class='noteTit'>" + list[i].title + "</span></p>"
            } else {
                tr += "<td>"
                tr += "<p><a class='noteTit' href='" + list[i].url + "' target='_blank'>" + list[i].title + "</a></p>"
            }
            tr += "<td>" + list[i].type + "</a></td>";
            tr += "<td>" + list[i].date + "</td>";
            tr += "<td><a class='noteCSB' u_type=" + list[i].type + " u_id=" + list[i].id + ">取消收藏</a></td>";
            tr += "</tr>";
        });
        $("#aNoteList").append(tr);
        clickSCC(".noteCSB", "b05")
    };
    /*拼微信表格*/
    var aWechaList = function (data) {
        var list = data.data;
        var leng = list.length;
        var tr = "";
        $("#countB").text('(' + data.total + ')')
        $("#aWechaList").html("");
        $(list).each(function (i) {
            tr += "<tr>";
            tr += "<td><a class='noteTit' href='/case/details?id=" + list[i].id + "&codeURI-Keyword=" + encodeURI(list[i].keyword) + "&name=search'>" + list[i].title + "</a></td>"
            tr += "<td>" + list[i].type + "</a></td>";
            tr += "<td>" + list[i].date + "</td>";
            tr += "<td><a class='noteCSA' u_keyword='" + list[i].keyword + "' u_type='" + list[i].type + "' u_id='" + list[i].id + "'>取消收藏</a></td>";
            tr += "</tr>";
        });
        $("#aWechaList").append(tr);
        clickSCC(".noteCSA", "wecha")
    };
    /*拼报表表格*/
    var chartList = function (data) {
        var list = data.data;
        var leng = list.length;
        var tr = "";
        $("#countD").text('(' + data.total + ')')
        $("#aWechaList").html("");
        $(list).each(function (i) {
            tr += "<tr>";
            tr += "<td><a class='noteTit' href='" + $.url.formDetail() + "id=" + list[i].id +"' name=" + list[i].id + ">" + list[i].title + "</a></td>"
            tr += "<td>" + list[i].frequency + "</a></td>";
            tr += "<td>" + list[i].date + "</td>";
            tr += "<td><a class='noteCSS' u_keyword='" + list[i].keyword + "' u_type='" + list[i].type + "' u_id='" + list[i].id + "'>取消收藏</a></td>";
            tr += "<td><a href='javascript:void(0)' class='export' name='"+ list[i].title +"'>导出</a></td>";
            tr += "</tr>";
        });
        $("#chartsList").append(tr);
        chartCancelCollection(".noteCSS");
        exportTable();
    };
    /*拼业务周知表格*/
    var aNoteList2 = function (data) {
        var list = data.data;
        var leng = list.length;
        var tr = "";
        $("#countE").text('(' + data.total + ')')
        $("#aNoteList2").html("");
        $(list).each(function (i) {
            tr += "<tr>";
            if (isNullOrEmpty(list[i].url)) {
                tr += "<td>"
                tr += "<p><span class='noteTit'>" + list[i].title + "</span></p>"
            } else {
                tr += "<td>"
                tr += "<p><a class='noteTit' href='" + list[i].url + "' target='_blank'>" + list[i].title + "</a></p>"
            }
            tr += "<td>" + list[i].type + "</a></td>";
            tr += "<td>" + list[i].date + "</td>";
            tr += "<td><a class='noteCSB' u_type='公告' u_id=" + list[i].id + ">取消收藏</a></td>";
            tr += "</tr>";
        });
        $("#aNoteList2").append(tr);
        clickSCC(".noteCSB", "b01")
    };
    /*拼监管公告表格*/
    var aNoteList3 = function (data) {
        var list = data.data;
        var leng = list.length;
        var tr = "";
        $("#countF").text('(' + data.total + ')')
        $("#aNoteList3").html("");
        $(list).each(function (i) {
            tr += "<tr>";
            if (isNullOrEmpty(list[i].url)) {
                tr += "<td>"
                tr += "<p><span class='noteTit'>" + list[i].title + "</span></p>"
            } else {
                tr += "<td>"
                tr += "<p><a class='noteTit' href='" + list[i].url + "' target='_blank'>" + list[i].title + "</a></p>"
            }
            tr += "<td>" + list[i].type + "</a></td>";
            tr += "<td>" + list[i].date + "</td>";
            tr += "<td><a class='noteCSB' u_type='公告' u_id=" + list[i].id + ">取消收藏</a></td>";
            tr += "</tr>";
        });
        $("#aNoteList3").append(tr);
        clickSCC(".noteCSB", "b02")
    };
    /*拼问询函表格*/
    var aNoteList4 = function (data) {
        var list = data.data;
        var leng = list.length;
        var tr = "";
        $("#countG").text('(' + data.total + ')')
        $("#aNoteList4").html("");
        $(list).each(function (i) {
            tr += "<tr>";
            if (isNullOrEmpty(list[i].url)) {
                tr += "<td>"
                tr += "<p><span class='noteTit'>" + list[i].title + "</span></p>"
            } else {
                tr += "<td>"
                tr += "<p><a class='noteTit' href='" + list[i].url + "' target='_blank'>" + list[i].title + "</a></p>"
            }
            tr += "<td>" + list[i].type + "</a></td>";
            tr += "<td>" + list[i].date + "</td>";
            tr += "<td><a class='noteCSB' u_type='公告' u_id=" + list[i].id + ">取消收藏</a></td>";
            tr += "</tr>";
        });
        $("#aNoteList4").append(tr);
        clickSCC(".noteCSB", "b100")
    };
    /*拼审查信息表格*/
    var aNoteList5 = function (data) {
        var list = data.data;
        var leng = list.length;
        var tr = "";
        $("#countH").text('(' + data.total + ')')
        $("#aNoteList5").html("");
        $(list).each(function (i) {
            tr += "<tr>";
            if (isNullOrEmpty(list[i].url)) {
                tr += "<td>"
                tr += "<p><span class='noteTit'>" + list[i].title + "</span></p>"
            } else {
                tr += "<td>"
                tr += "<p><a class='noteTit' href='" + list[i].url + "' target='_blank'>" + list[i].title + "</a></p>"
            }
            tr += "<td>" + list[i].type + "</a></td>";
            tr += "<td>" + list[i].date + "</td>";
            tr += "<td><a class='noteCSB' u_type='公告' u_id=" + list[i].id + ">取消收藏</a></td>";
            tr += "</tr>";
        });
        $("#aNoteList5").append(tr);
        clickSCC(".noteCSB", "b04")
    };
	/*拼投资机构表格*/
	var aNoteList6 = function (data) {
        var list = data.data;
        var leng = list.length;
        var tr = "";
        $("#countJg").text('(' + data.total + ')')
        $("#aNoteList6").html("");
        $(list).each(function (i) {
            tr += "<tr>";
            tr += "<td name='"+ list[i].id +"'><a href='" + $.url.investmentAgencyDetailsUrl() + "id=" + list[i].companyId + "&position=collection"+"'>" + list[i].name + "</a></td>";
            tr += "<td style='text-align:left' name='b1'>" + list[i].remarks + "</td>";
            tr += "<td><a class='stockNote'>编辑</a></td>";
         	tr += "<td>" + list[i].start_time + "</td>";
         	tr += "<td><a class='noteCJg' u_id=" + list[i].companyId + " >移除自选</a></td>";
            tr += "</tr>";
        });
        $("#aNoteList6").append(tr);
        stockNoteClick();
        clickSCC(".noteCJg", "b1",1)
    };
	/*拼被投企业表格*/
	var aNoteList7 = function (data) {
        var list = data.data;
        var leng = list.length;
        var tr = "";
        $("#countQy").text('(' + data.total + ')')
        $("#aNoteList7").html("");
        $(list).each(function (i) {
            tr += "<tr>";
            tr += "<td name='"+ list[i].id +"'><a href='" + $.url.industryUrl() + "id=" + list[i].companyId +"&companyName=" + list[i].companyName + "&position=collection"+"'>" + list[i].name + "</a></td>";
            tr += "<td style='text-align:left' name='b2'>" + list[i].remarks + "</td>";
            tr += "<td><a class='stockNote'>编辑</a></td>";
         	tr += "<td>" + list[i].start_time + "</td>";
         	tr += "<td><a class='noteCqy' u_id=" + list[i].companyId + ">移除自选</a></td>";
            tr += "</tr>";
        });
        $("#aNoteList7").append(tr);
        stockNoteClick();
        clickSCC(".noteCqy", "b2",1)
    };
    //点击取消收藏

    var clickSCC = function (classN, type,flag) {
        $(classN).on("click", function () {
            //上送参数
            var cname = "";
            if ($(this).attr("u_type") == "公告") {
                keyword = ""
            } else {
                cname = "wecha";
                keyword = $(this).attr("u_keyword");
            }
            var param = {
                id: $(this).attr("u_id"),
                type: type
            }
            //CANCELCOLLECTIONOPTION
            if(isNullOrEmpty(flag)){
            	url = $.kf.CANCELCOLLECTION;
            }else{
            	url = $.kf.CANCELCOLLECTIONOPTION ;
            }
            $.kf.ajax({
                type: "post",
                url:url ,
                data: param,
                dataType: "json",
                processResponse: function (data) {
            		location.reload(location.href);
                }
            });
        })
    };
            
    //报表取消收藏
    var chartCancelCollection = function(className){
		$(className).on("click",function(){
			var param = {
                id: $(this).attr("u_id"),
            }
			$.kf.ajax({
                type: "post",
                url: $.kf.TABLEBASESERVICECANCELCOLLECTION,
                data: param,
                dataType: "json",
                processResponse: function (data) {
            		location.reload(location.href);
                }
            });
        })
    }
    //导出
    var exportTable = function(){
    	$(".export").off().on("click",function(){
			//上送参数
			var repId = $(this).attr("se-id");
			var name = $(this).attr("name");
        	var parentAll = {
        		"id":repId,
        		"name":name
    		};
        	$('#myModal04').modal({backdrop: 'static', keyboard: false});
        	$.kf.ajax({
                type: "get",
                url: $.kf.TABLEBASESERVICEGETEXPORT,
                data: parentAll,
                dataType: "json",
                processResponse: function (data) {
                	var _data = data.data;
                	var t = setTimeout(function(){
                		$("#myModal04").modal("hide");
                		window.location.href = _data.url;
                	},1500)
                }
            });
    	})
    }
    //tab判断
    var comRefreshTab = function(_leg){
    	var _leg = _leg;
    	if (_leg == "tab_0") {
            $(".maskInTable").height("auto");
            if (isNullOrEmpty($("#aSharesList").html())) {
                initShares(); //股票
                initWecha();//公众号
                initNote();//公告
                initChart();//报表
                initNote2();//业务周知
                initNote3();//监管公告
                initNote4();//问询函
                initNote5();//审查信息
				initNote6();//投资机构
				initNote7();//被投企业
            }
        }
        ;
        if (_leg == "tab_1") {
            $(".maskInTable").height("auto");
            if (isNullOrEmpty($("#aWechaList").html())) {
                initWecha();//公众号
            }
        };
        if (_leg == "tab_2") {
            $(".maskInTable").height("auto");
            if (isNullOrEmpty($("#aNoteList").html())) {
                initNote();//公告
            }
        };
        if (_leg == "tab_3") {
            $(".maskInTable").height("auto");
            if (isNullOrEmpty($("#chartList").html())) {
                initChart();//报表
            }
        };
        if (_leg == "tab_4") {
            $(".maskInTable").height("auto");
            if (isNullOrEmpty($("#aNoteList2").html())) {
                initNote2();//报表
            }
        };
        if (_leg == "tab_5") {
            $(".maskInTable").height("auto");
            if (isNullOrEmpty($("#aNoteList3").html())) {
                initNote3();//报表
            }
        };
        if (_leg == "tab_6") {
            $(".maskInTable").height("auto");
            if (isNullOrEmpty($("#aNoteList4").html())) {
                initNote4();//报表
            }
        };
        if (_leg == "tab_7") {
            $(".maskInTable").height("auto");
            if (isNullOrEmpty($("#aNoteList5").html())) {
                initNote5();//报表
            }
        };
        if (_leg == "tab_8") {
            $(".maskInTable").height("auto");
            if (isNullOrEmpty($("#aNoteList6").html())) {
                initNote6();//投资机构
            }
        };
        if (_leg == "tab_9") {
            $(".maskInTable").height("auto");
            if (isNullOrEmpty($("#aNoteList7").html())) {
                initNote7();//被投企业
            }
        };
    }
    //tab切换
    var collectionTable = function(){
    	$(".overLi-btn").find("a").off().on("click", function () {
            var _leg = $(this).attr('href');
            _leg = _leg.split("_")[1];
            pushUrlState("_"+_leg);
            comRefreshTab("tab_" + _leg);
        });
        //刷新
		var _leg = Query.getHash("currentTab");
		if(isNullOrEmpty(_leg)){
			_leg = 'tab_0';
		}
		comRefreshTab(_leg);
		if(isNullOrEmpty(_leg)){
			_leg = '#tab_0';
		}else{
			_leg = "#" + _leg;
		}
		$(".overLi-btn").find("a").each(function(){
			if($(this).attr("href") == _leg){
				$(this).parent().addClass("active").siblings().removeClass("active");
				$(_leg).addClass("active").siblings().removeClass("active");
			}
		})
    }
    return {
        collection: function () {
            collectionTable();
        }
    }
}();
