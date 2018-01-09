

/*
 * 
 * 
 搜索列表 start  
 * 
 * 
 * */

var wechaSearch = function () {

    /**************************搜索全部*****************************/
   //公告
    /*拼table表格*/
    var allList = function (data) {
        var list = data.data;
        var tr = "";
        if (!isNullOrEmpty(data.total)) {
            $("#countN").text('(' + data.total + ')')
        }

        //拼接表格
        $("#tableOne").html("");
        $(list).each(function (i) {
            tr += "<tr>";
            tr += "<td width='10%'>" + list[i].date + "</td>";
            tr += "<td width='10%'>" + list[i].code + "</td>";
//          tr += "<p><a class='noteTit' href='" + list[i].url + "' target='_blank'>" + list[i].title + "</a></p>"
//          tr += "<p style='width:90%;color:#999;'>" + list[i].highlight + "</p></td>";
            if (isNullOrEmpty(list[i].url)) {
                tr += "<td>"
	            tr += "<p  style='text-align:left'><span class='noteTit'>" + list[i].title + "</span></p>"
	            tr += "<p style='width:90%;color:#999;text-align:left'>" + list[i].highlight + "</p></td>";
            } else {
                tr += "<td>"
	            tr += "<p style='text-align:left'><a class='noteTit' href='" + list[i].url + "' target='_blank'>" + list[i].title + "</a></p>"
	            tr += "<p style='width:90%;color:#999;text-align:left'>" + list[i].highlight + "</p></td>";
            }
            
            tr += "<td width='10%'><a class='noteSCC' u_type='notice' u_id=" + list[i].id + " name=" + list[i].isCollection + ">收藏</a></td>";
            tr += "</tr>";
        });
        $("#tableOne").append(tr);
        noteSC(".noteSCC");
        clickSC(".noteSCC");
    };
   
    //公告是否收藏
    var noteSC = function (className) {
        $(className).each(function () {
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
	//公众号
    var wechaListDesc = function (data) {
        var list = data.data;
        var leng = list.length;
        var tr = "";
        $("#tableTwo").html("");
        list.sort(function (a, b) {
            return Date.parse(b.date) - Date.parse(a.date);//时间正序
        });
        for (var i = 0, l = list.length; i < l; i++) {
            tr += "<tr>";
            tr += "<td>" + list[i].date + "</td>";
            tr += "<td style='text-align:left'>"
            tr += "<p><a class='noteTit' href='/case/details?id=" + list[i].id + "&name=search" + "&keywordB=" + list[i].keyword + "&title=" + list[i].titleName + "'>" + list[i].title + "</a></p>"
            tr += "<p style='width:90%;color:#999;'>" + list[i].summary + "</p></td>";
            tr += "<td>" + list[i].source + "</a></td>";
            tr += "<td width='10%'><a class='noteSC' u_type='weixin' u_keyword=" + list[i].keyword + " u_id=" + list[i].id + " name=" + list[i].isCollection + ">收藏</a></td>";
            tr += "</tr>";
        }

        $("#tableTwo").append(tr);
        $("#wechaN").text('(' + leng + ')');
        noteSC(".noteSC");
        clickSC(".noteSC");
    };
	//A股公告
	var sharesList = function(data){
        var list = data.data;
        var tr = "";
        if (isNullOrEmpty(data.total)) {
            //$("#countN").text("")
        } else {
            $("#sharesN").text('(' + data.total + ')')
        }
        //拼接表格
        $("#tableThree").html("");
        $(list).each(function (i) {
            tr += "<tr>";
            tr += "<td width='10%'>" + list[i].date + "</td>";
            tr += "<td width='10%'>" + list[i].code + "</td>";
//          tr += "<p><a class='noteTit' href='" + list[i].url + "' target='_blank'>" + list[i].title + "</a></p>"
//          tr += "<p style='width:90%;color:#999;'>" + list[i].highlight + "</p></td>";
            if (isNullOrEmpty(list[i].url)) {
                tr += "<td>"
	            tr += "<p  style='text-align:left'><span class='noteTit'>" + list[i].title + "</span></p>"
	            tr += "<p style='width:90%;color:#999;text-align:left'>" + list[i].highlight + "</p></td>";
            } else {
                tr += "<td>"
	            tr += "<p style='text-align:left'><a class='noteTit' href='" + list[i].url + "' target='_blank'>" + list[i].title + "</a></p>"
	            tr += "<p style='width:90%;color:#999;text-align:left'>" + list[i].highlight + "</p></td>";
            }
            
            tr += "<td width='10%'><a class='noteSCC' u_type='notice' u_id=" + list[i].id + " name=" + list[i].isCollection + ">收藏</a></td>";
            tr += "</tr>";
        });
        $("#tableThree").append(tr);
        noteSC();
        clickSC(".noteSCC");
	}
	//业务周知
	var businessKnowwinglyList = function(data){
        var list = data.data;
        var tr = "";
        if (isNullOrEmpty(data.total)) {
            //$("#countE").text("")
        } else {
            $("#tabNum").text('(' + data.total + ')')
        }

        //拼接表格
        $("#tableFour").html("");
        $(list).each(function (i) {
            tr += "<tr>";
            tr += "<td width='10%'>" + list[i].date + "</td>";
            tr += "<td width='10%'>" + list[i].code + "</td>";
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
            tr += "<td width='10%'><a class='noteSD' u_type='notice' u_id=" + list[i].id + " name=" + list[i].isCollection + ">收藏</a></td>";
            tr += "</tr>";
        });
        $("#tableFour").append(tr);
        noteSC(".noteSD");
        clickSC(".noteSD");
	}
	//监管公告
	var regulatoryNoticeList = function(data){
        var list = data.data;
        var tr = "";
        if (isNullOrEmpty(data.total)) {
            //$("#countF").text("")
        } else {
            $("#tabNum2").text('(' + data.total + ')')
        }

        //拼接表格
        $("#tableFive").html("");
        $(list).each(function (i) {
            tr += "<tr>";
            tr += "<td width='10%'>" + list[i].date + "</td>";
            tr += "<td width='10%'>" + list[i].code + "</td>";
            if (isNullOrEmpty(list[i].url)) {
                tr += "<td>"
	            tr += "<p  style='text-align:left'><span class='noteTit'>" + list[i].title + "</span></p>"
	            tr += "<p style='width:90%;color:#999;text-align:left'>" + list[i].highlight + "</p></td>";
            } else {
                tr += "<td>"
	            tr += "<p style='text-align:left'><a class='noteTit' href='" + list[i].url + "' target='_blank'>" + list[i].title + "</a></p>"
	            tr += "<p style='width:90%;color:#999;text-align:left'>" + list[i].highlight + "</p></td>";
            }
            
            tr += "<td width='10%'><a class='noteSE' u_type='notice' u_id=" + list[i].id + " name=" + list[i].isCollection + ">收藏</a></td>";
            tr += "</tr>";
        });
        $("#tableFive").append(tr);
        noteSC(".noteSE");
        clickSC(".noteSE");
	}
	//问询函
	var inquiryLetterList = function(data){
        var list = data.data;
        var tr = "";
        if (isNullOrEmpty(data.total)) {
            //$("#countG").text("")
        } else {
            $("#tabNum3").text('(' + data.total + ')')
        }

        //拼接表格
        $("#tableSix").html("");
        $(list).each(function (i) {
            tr += "<tr>";
            tr += "<td width='10%'>" + list[i].date + "</td>";
            tr += "<td width='10%'>" + list[i].code + "</td>";
//          tr += "<p><a class='noteTit' href='" + list[i].url + "' target='_blank'>" + list[i].title + "</a></p>"
//          tr += "<p style='width:90%;color:#999;'>" + list[i].highlight + "</p></td>";
            if (isNullOrEmpty(list[i].url)) {
                tr += "<td>"
	            tr += "<p  style='text-align:left'><span class='noteTit'>" + list[i].title + "</span></p>"
	            tr += "<p style='width:90%;color:#999;text-align:left'>" + list[i].highlight + "</p></td>";
            } else {
                tr += "<td>"
	            tr += "<p style='text-align:left'><a class='noteTit' href='" + list[i].url + "' target='_blank'>" + list[i].title + "</a></p>"
	            tr += "<p style='width:90%;color:#999;text-align:left'>" + list[i].highlight + "</p></td>";
            }
            
            tr += "<td width='10%'><a class='noteSF' u_type='notice' u_id=" + list[i].id + " name=" + list[i].isCollection + ">收藏</a></td>";
            tr += "</tr>";
        });
        $("#tableSix").append(tr);
        noteSC(".noteSF");
        clickSC(".noteSF");
	}
	//审查信息
	var checkMessageList = function(data){
        var list = data.data;
        var tr = "";
        if (isNullOrEmpty(data.total)) {
            //$("#countH").text("")
        } else {
            $("#tabNum4").text('(' + data.total + ')')
        }

        //拼接表格
        $("#tableSeven").html("");
        $(list).each(function (i) {
            tr += "<tr>";
            tr += "<td width='10%'>" + list[i].date + "</td>";
            tr += "<td width='10%'>" + list[i].code + "</td>";
//          tr += "<p><a class='noteTit' href='" + list[i].url + "' target='_blank'>" + list[i].title + "</a></p>"
//          tr += "<p style='width:90%;color:#999;'>" + list[i].highlight + "</p></td>";
            if (isNullOrEmpty(list[i].url)) {
                tr += "<td>"
	            tr += "<p  style='text-align:left'><span class='noteTit'>" + list[i].title + "</span></p>"
	            tr += "<p style='width:90%;color:#999;text-align:left'>" + list[i].highlight + "</p></td>";
            } else {
                tr += "<td>"
	            tr += "<p style='text-align:left'><a class='noteTit' href='" + list[i].url + "' target='_blank'>" + list[i].title + "</a></p>"
	            tr += "<p style='width:90%;color:#999;text-align:left'>" + list[i].highlight + "</p></td>";
            }
            
            tr += "<td width='10%'><a class='noteSG' u_type='notice' u_id=" + list[i].id + " name=" + list[i].isCollection + ">收藏</a></td>";
            tr += "</tr>";
        });
        $("#tableSeven").append(tr);
        noteSC(".noteSG");
        clickSC(".noteSG");
	}
    //默认搜索定增
    var adKey = "外籍高管持股";
    $("#allBtn").on("click", function () {
    	Query.setHash({"page":1})
    	var keyword = '';
    	var thisWord = $("#allKeyWord").val();
        $("#tableOne").html("");
        $("#tableTwo").html("");
        $("#tableThree").html("");
        $("#countN").text("");
        $("#wechaN").text("");
        $("#tabNum").text("");
        $("#tabNum2").text("");
        $("#tabNum3").text("");
        $("#tabNum4").text("");
        Tone = $("#Tone").val();
	    Ttwo = $("#Ttwo").val();
	    Tthree = $("#Tthree").val();
	    Cone = $("#Cone").val();
	    Ctwo = $("#Ctwo").val();
	    Cthree = $("#Cthree").val();
        keyword = $("#allKeyWord").val();
       if(thisWord == adKey){
        	Ctwo = "外籍高级管理 外籍高管 为外籍人士";
        } else {
            Ttwo = $("#Ttwo").val();
        }
        $("#countN").html("");
        $("#wechaN").html("");
        $("#sharesN").html("");
        var _url = "";
        var _url2 = "";
        var _url3 = "";
        var t = null;
        //公众号
        _url2 = $.kf.SEARCHCHWECHA + "?" + "keyword=" + keyword;
        //new GetTable(_url2, $("#pageToolWe"), "", wechaList, "get", $("#tableTwo")).init();
        $.getTable({
        	url:_url2,//url
	    	pageId:$("#pageToolWe"),//分页id
	    	callback:wechaListDesc,//callback
	    	loadId:".maskInTableWe",
	    	tbodyId:$("#tableTwo")//tbody的id,
        })
        //公告
        _url = $.kf.SEARCHNOTICE + "?" + "title_all=" + Tone + "&title_any=" + Ttwo + "&title_no=" + Tthree + "&content_all=" + Cone + "&content_any=" + Ctwo + "&content_no=" + Cthree + "&typeCode=b05";
        //new GetTable(_url, $("#pageTool"), "", allList, "get", $("#tableOne")).init();
        $.getTable({
        	url:_url,//url
	    	pageId:$("#pageTool"),//分页id
	    	callback:allList,//callback
	    	loadId:".maskInTable01",
	    	tbodyId:$("#tableOne")//tbody的id,
        })
         //A股公告
        _url3 = $.kf.GETANNOUNCEMENTA + "?" + "title_all=" + Tone + "&title_any=" + Ttwo + "&title_no=" + Tthree + "&content_all=" + Cone + "&content_any=" + Ctwo + "&content_no=" + Cthree;
        $.getTable({
        	url:_url3,//url
	    	pageId:$("#pageToolA"),//分页id
	    	callback:sharesList,//callback
	    	loadId:".maskInTableA",
	    	tbodyId:$("#tableThree")//tbody的id,
        })
        //业务周知
        _url4 = $.kf.SEARCHNOTICE + "?" + "title_all=" + Tone + "&title_any=" + Ttwo + "&title_no=" + Tthree + "&content_all=" + Cone + "&content_any=" + Ctwo + "&content_no=" + Cthree + "&typeCode=b01";
        $.getTable({
        	url:_url4,//url
	    	pageId:$("#pageToolFour"),//分页id
	    	callback:businessKnowwinglyList,//callback
	    	loadId:".maskInTableFour",
	    	tbodyId:$("#tableFour")//tbody的id,
        })
        //监管公告
        _url5 = $.kf.SEARCHNOTICE + "?" + "title_all=" + Tone + "&title_any=" + Ttwo + "&title_no=" + Tthree + "&content_all=" + Cone + "&content_any=" + Ctwo + "&content_no=" + Cthree + "&typeCode=b02";
        $.getTable({
        	url:_url5,//url
	    	pageId:$("#pageToolFive"),//分页id
	    	callback:regulatoryNoticeList,//callback
	    	loadId:".maskInTableFive",
	    	tbodyId:$("#tableFive")//tbody的id,
        })
//      //问询函
        _url6 = $.kf.SEARCHNOTICE + "?" + "title_all=" + Tone + "&title_any=" + Ttwo + "&title_no=" + Tthree + "&content_all=" + Cone + "&content_any=" + Ctwo + "&content_no=" + Cthree + "&typeCode=b100";
        $.getTable({
        	url:_url6,//url
	    	pageId:$("#pageToolSix"),//分页id
	    	callback:inquiryLetterList,//callback
	    	loadId:".maskInTableSix",
	    	tbodyId:$("#tableSix")//tbody的id,
        })
//      //审查信息
        _url7 = $.kf.SEARCHNOTICE + "?" + "title_all=" + Tone + "&title_any=" + Ttwo + "&title_no=" + Tthree + "&content_all=" + Cone + "&content_any=" + Ctwo + "&content_no=" + Cthree + "&typeCode=b04";
        $.getTable({
        	url:_url7,//url
	    	pageId:$("#pageToolSeven"),//分页id
	    	callback:checkMessageList,//callback
	    	loadId:".maskInTableSeven",
	    	tbodyId:$("#tableSeven")//tbody的id,
        })
    })
	//重置
	$("#allBtnReset").on("click", function () {
		Query.setHash({"page":1});
		Query.setHash({"caseHot":""});
		$("#allKeyWord").val("");
		$("#allBtn").click();
	})
    $("#allKeyWord").on('keydown', function (e) {
        var keyCode = e.which;
        if (keyCode == 13) {
            $("#allBtn").click();
        }
    });


    //初始化表格
    var initWechatTable = function () {
    	var currentKey = Query.getHash("caseHot");
    	var Tone = $("#Tone").val("");
	    var Ttwo = $("#Ttwo").val("");
	    var Tthree = $("#Tthree").val("");
	    var Cone = $("#Cone").val("");
	    var Ctwo = $("#Ctwo").val("");
	    var Cthree = $("#Cthree").val("");
    	$("#allKeyWord").val(currentKey);
    	if(isNullOrEmpty(currentKey)){
			$("#allKeyWord").val('外籍高管持股');
	        var allCon = '外籍高级管理 外籍高管 为外籍人士';
	        var keyword = '外籍高管持股';
		}else{
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
		}
		$("#allBtn").click();
    	
    }

    //插入关键字
    $(".keywordList li").each(function () {
        var currentKey = $(this).children("a").text();
        $(this).children("a").on("click", function () {
        	Query.setHash({"page":1})
        	var thisTxt = $(this).text();
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
        	
            $("#allKeyWord").val(currentKey);
            $("#allBtn").click();
        })
    })


    //回车查询
    $("#allKeyWord").on("keydown", function (e) {
        var keyCode = e.which;
        if (keyCode == 13) {
            $("#allBtn").click();
        }
    });

    return {
        all: function () {
            initWechatTable();
        }
    }
}();

    