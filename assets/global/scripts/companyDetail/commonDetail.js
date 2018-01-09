	if(Query.getHash("from") == "investment"){
		var showDefaultTabel = true;
	}else{
		//公司详情 ----线上为 false，本地环境为true
		var showDefaultTabel = true;
	}
	
	//事件滚动
	var rollTim = function (leftBtn,rightBtn,jList,len) {
	    var ind = 0;
	    var len = len;
	    var rollIn = function (flg) {
	        if (flg > 6) {
	            leftBtn.show();
	            rightBtn.show();
	        } else {
	            leftBtn.hide();
	            rightBtn.hide();
	        }
	        rightBtn.off().on("click", function () {
	            ind++;
	            if (ind > flg - 6) {
	                ind = 0;
	            }
	            rollFun(ind);
	        });
	        leftBtn.off().on("click", function () {
	            ind--;
	            if (ind < 0) {
	                ind = flg - 6;
	            }
	            rollFun(ind);
	        });
	    };
		var timeSize = jList.find("li").length;
	    rollIn(timeSize);
	    var rollFun = function (i) {
	    	var _len = Number(len*i);
	        if (!jList.parent().is(":animated")) {
	            jList.parent().animate({scrollLeft:_len});
	        }
		}
	};
	//详情popbox
    var modelCon = function (){
		$(".textGl-detail").off().on("click",function(){
			$(".patentList").html("");
			$(".descriptionNote").text("");
			$("#patentImg").attr("src","")
			
			if($(this).hasClass("riskWarn-detail")){
				var dataTitle = "风险详情";
			}else if($(this).hasClass("textGl-hypj")){
				var dataTitle = "报告详情";
			}else if($(this).parent().hasClass("riskWarn-chbox")){
				var dataTitle = "变更详情";
			}else if($(this).hasClass("disBok")){
				var dataTitle = "状态详情";
			}else if($(this).hasClass("businessCcope-detail")){
				var dataTitle = "经营范围";
			}else if($(this).hasClass("patentA")){
				var dataTitle = "国家知识产权信息（专利）";
				$("#myModalOut2").find(".modal-title").text(dataTitle);
		    		var _thisTr =  $(this).parents("tr");
		    		var patentList = "";
		    		patentList+= "<li><b>申请公布号</b><span>"+ _thisTr.children(".publishNumber").text() +"</span></li>";
		        	patentList+= "<li><b>申请号</b><span>"+ _thisTr.children(".applicationNumber").text() +"</span></li>";
		  			patentList+= "<li><b>分类号</b><span>"+ _thisTr.children(".classificationNumber").text() +"</span></li>";
		  			patentList+= "<li><b>发明名称</b><span>"+ _thisTr.children(".patentName").text() +"</span></li>";
		  			patentList+= "<li><b>发明人</b><span>"+ _thisTr.children(".inventor").text() +"</span></li>";
		  			patentList+= "<li><b>申请日</b><span>"+ _thisTr.children(".Ldate").text() +"</span></li>";
		  			patentList+= "<li><b>代理机构</b><span>"+ _thisTr.children(".proxyAgency").text() +"</span></li>";
		  			patentList+= "<li><b>地址</b><span>"+ _thisTr.children(".address").text() +"</span></li>";
		  			patentList+= "<li><b>申请人</b><span>"+ _thisTr.children(".applicant").text() +"</span></li>";
		  			patentList+= "<li><b>申请公布日</b><span>"+ _thisTr.children(".publishDate").text() +"</span></li>";
		  			patentList+= "<li><b>代理人</b><span>"+ _thisTr.children(".agent").text() +"</span></li>";
					$(".patentList").append(patentList);
					$(".descriptionNote").text(_thisTr.children(".abstract").text());
				    $("#patentImg").attr("src",_thisTr.children(".patentImg").text())
			}else{
				var dataTitle = $(this).parents("table").find("th").eq($(this).parents("td").index()).text();
			}
			if($(this).hasClass("businessCcope-detail")){
				var dataContent = $(this).siblings("span").attr('title');
			}else{
				var dataContent = $(this).siblings("span").text();
			}
	    	$("#myModalOut").find(".modal-title").text(dataTitle);
	    	if(isNullOrEmpty(dataContent)||dataContent == "--"){
	    		$("#myModalOut").find("#privateListutO").html("暂无详情！");
	    	}else{
	    		$("#myModalOut").find("#privateListutO").html(dataContent);
	    	}
		})
	}
/*
	     
    * 
    * 知识产权
    * 
    * 
* */   
    // 研发投入
    var id = Query.getHash("id");
    var rdInvestment = function () {
        var _url = "";
        _url = $.kf.GETCOMPANYRESEARCH + "?" + "id=" + id + "&page=" + 1;
        var lastPage = 1;
        $.getTable({
        	showDefaultTabel:showDefaultTabel,
        	url:_url,//url
	    	pageId:$("#productPageTr"),//分页id
	    	callback:rdInvestmentList,//callback
	    	currentPage:lastPage,
	    	pageNum:10,
	    	loadId:".maskInTableTr",
	    	targetId:"zscq1",
	    	showDataBox:false,
	    	tbodyId:$("#productTableTr")//tbody的id,
        });
        //商标信息
        rollAjax();
        //公司专利
        compPatent();
        //作品著作权
        compWhite();
        //软件著作权
        compCopyright();
        //域名备案
        recordInformation();
        //企业证书
        certificate();
        //特许经营权
        franchiseRight();
    };
    
    //拼接列表
    var rdInvestmentList = function (data) {
        var list = data.data;
        var tr = "";
        $("#productTableTr").html("");
        $(list).each(function (i) {
            tr += "<tr>";
            tr += "<td class='leftIn'>" + list[i].date + "</td>";
            tr += "<td class='leftIn'>" + list[i].expenseAmount + "</td>";
            tr += "<td class='leftIn'>" + list[i].expenseRatio + "</td>";
            tr += "<td class='leftIn'>" + list[i].expenseAmountPre + "</td>";
            tr += "<td class='leftIn'>" + list[i].expenseRatioPre + "</td>";
            tr += "</tr>";
        });
        $("#productTableTr").append(tr);
    };
    //商标信息
    var rollAjax = function () {
        var _url = $.kf.GETCOMPANYTRADEMARK + "?" + "id=" + id;
        $(".lists_left_btn").hide();
        $(".lists_right_btn").hide();
        new LoadingAjax($(".maskInAjax"), {}, $(".lists_con")).init();
        $.kf.ajax({
            type: "get",
            url: _url,
            data: "",
            dataType: "json",
            processResponse: function (data) {
                new LoadingAjax($(".maskInAjax"), {}, $(".list_con")).close();
                var obj = data.data;
                if (!isNullOrEmpty(obj)) {
                    $(".lists_left_btn").show();
                    $(".lists_right_btn").show();
                    rollList(data);
                }else{
                	$(".msg-pic").height(0).css("margin",0);
                }

            }
        });
    };
    var rollList = function (data) {
        var list = data.data;
        var tr = "";
        $(".j_ul_lists").html("");
        $(list).each(function (i) {

            tr += "<li class='list01'>";
            tr += "	<div class='listMoveDiv'>";
            tr += "		<span>申请时间：</span>";
            tr += "		<span>" + list[i].applicationDate + "</span>";
            tr += "	</div>";
            tr += "	<div class='listMoveDiv'>";
            tr += "		<span>注册号：</span>";
            tr += "		<span>" + list[i].registrationNumber + "</span>";
            tr += "	</div>";
            /*tr += "	<div class='listMoveDiv'>";
            tr += "		<span class='listMoveType' data-toggle='tooltip' data-placement='top' title=" + list[i].applicationName + ">商标名称：" + list[i].applicationName + "</span>";
            tr += "	</div>";*/
            tr += "	<div class='listMoveDiv'>";
          	tr += "		<span class='listMoveType' data-toggle='tooltip' data-placement='top' title=" + list[i].trademarkType + ">商标类型：" + list[i].trademarkType + "</span>";
            tr += "	</div>";
            tr += "	<div class='listMoveDiv'>";
            tr += "		<span class='listMoveType' data-toggle='tooltip' data-placement='top' title=" + list[i].trademarkStatus + ">流程状态：" + list[i].trademarkStatus + "</span>";
            /*<a class='textGl-detail textGl-content' data-toggle='modal' data-target='#myModalOut'>查看详情</a><span class='col-hide'>"+ list[i].caseText +"</span>*/
            /*tr += "		<span class='disBok'  data-toggle='tooltip' data-placement='top' title=" + list[i].trademarkStatus + ">" + "查看详情" + "</span>";*/
            //tr += "		<span class='disBok'><a class='textGl-detail disBok textGl-content' data-toggle='modal' data-target='#myModalOut'>查看详情</a><span class='col-hide'>"+ list[i].trademarkStatus +"</span></span>";
            tr += "	</div>";
            tr += "	<img src='" + list[i].url + "'>";
            tr += "</li>";
        });
        $(".j_ul_lists").append(tr);
        $("[data-toggle='tooltip']").tooltip();
        rollTim($(".lists_left_btn"),$(".lists_right_btn"),$(".j_ul_lists"),320);
    };
    rollTim($(".lists_left_btn"),$(".lists_right_btn"),$(".j_ul_lists"),320);
    // 公司专利
    var compPatent = function () {
        var _url = "";
        _url = $.kf.GETCOMPANYPATENT + "?" + "id=" + id + "&page=" + 1;
        //new GetTable(_url, $("#compPatentPage"), "", compPatentList, "get", $("#compPatentTable"),"",$(".maskInTablePatent"),false).init();
        var lastPage = 1;
        $.getTable({
        	showDefaultTabel:showDefaultTabel,
        	url:_url,//url
	    	pageId:$("#compPatentPage"),//分页id
	    	callback:compPatentList,//callback
	    	currentPage:lastPage,
	    	loadId:".maskInTablePatent",
	    	targetId:"zscq2",
	    	showDataBox:false,
	    	tbodyId:$("#compPatentTable")//tbody的id,
        })
    };
    //拼接列表
    var compPatentList = function (data) {
        var list = data.data;
        var tr = "";
        $("#compPatentTable").html("");
        $(list).each(function (i) {
            tr += "<tr>";
//          tr += "<td class='leftIn'>" + list[i].mainNumber + "</td>";
            tr += "<td class='leftIn publishDate'>" + list[i].publishDate + "</td>";
            tr += "<td class='leftIn'>" + list[i].patentType + "</td>";
            tr += "<td class='leftIn patentName'>" + list[i].patentName + "</td>";
            tr += "<td class='leftIn publishNumber'>" + list[i].publishNumber + "</td>";
            tr += "<td class='leftIn classificationNumber'>" + list[i].classificationNumber + "</td>";
            tr += "<td class='leftIn inventor'>" + list[i].inventor  + "</td>";
            tr += "<td class='leftIn areaName hide'>" + list[i].areaName + "</td>";
            
            tr += "<td class='leftIn applicationNumber hide'>" + list[i].applicationNumber + "</td>";
            tr += "<td class='leftIn Ldate hide'>" + list[i].date + "</td>";
            tr += "<td class='leftIn proxyAgency hide'>" + list[i].proxyAgency + "</td>";
            tr += "<td class='leftIn applicant hide'>" + list[i].applicant + "</td>";
            tr += "<td class='leftIn agent hide'>" + list[i].agent + "</td>";
            tr += "<td class='leftIn abstract hide'>" + list[i].abstract + "</td>";
            tr += "<td class='leftIn patentImg hide'>" + list[i].img + "</td>";
            tr += "<td class='leftIn address hide'>" + list[i].address + "</td>";
            
            if(isNullOrEmpty(list[i].abstract)){
            	tr += "<td class='leftIn'>--</td>";
            }else{
            	tr += "<td class='leftIn'><a class='textGl-detail patentA' data-toggle='modal' data-target='#myModalOut2'>详情</a><span class='col-hide'>"+list[i].abstract+"</span></td>";
            }
            tr += "</tr>";
        });
        $("#compPatentTable").append(tr);
        
        
        modelCon();
//      $(".abstractPop").on("click", function () {
//          $("#abstract").html("");
//          var abstractTxt = $(this).attr("name");
//          $("#abstract").html(abstractTxt);
//      });
    };
	//作品著作权
	var compWhite = function () {
        var _url = "";
        _url = $.kf.GETCOMPANYCOPYRIGHT + "?" + "id=" + id + "&page=" + 1;
        var lastPage = 1;
        $.getTable({
        	showDefaultTabel:showDefaultTabel,
        	url:_url,//url
	    	pageId:$("#whitePage"),//分页id
	    	callback:compWhiteList,//callback
	    	currentPage:lastPage,
	    	loadId:".maskInTableSoft",
	    	showDataBox:false,
	    	targetId:"zscq4",
	    	tbodyId:$("#whiteTable")//tbody的id,
        })
    };
	//软件著作权
	 var compCopyright = function () {
        var _url = "";
        _url = $.kf.GETCOMPANYSOFTWARECOPYRIGHT + "?" + "id=" + id + "&page=" + 1;
        var lastPage = 1;
        $.getTable({
        	showDefaultTabel:showDefaultTabel,
        	url:_url,//url
	    	pageId:$("#productPage"),//分页id
	    	callback:compCopyrightList,//callback
	    	currentPage:lastPage,
	    	loadId:".maskInTableProduct",
	    	showDataBox:false,
	    	targetId:"zscq5",
	    	tbodyId:$("#productTable")//tbody的id,
        })
    };
    
    //拼接列表
    var compCopyrightList = function (data) {
        var list = data.data;
        var tr = "";
        $("#productTable").html("");
        $(list).each(function (i) {
            tr += "<tr>";
            tr += "<td class='leftIn'>" + list[i].successDate + "</td>";
            tr += "<td class='leftIn'>" + list[i].fullName + "</td>";
            tr += "<td class='leftIn'>" + list[i].name + "</td>";
            tr += "<td class='leftIn'>" + list[i].registrationNumber + "</td>";
            tr += "<td class='leftIn'>" + list[i].classificationNumber + "</td>";
            tr += "<td class='leftIn'>" + list[i].versionNumber + "</td>";
            tr += "<td class='leftIn'>";
            tr += "<a class='softWall' onclick='softWallFun(this)'  registerTime='"+list[i].registerTime+"' fullName='"+list[i].fullName+"'  sday='"+list[i].sday+"'  country='"+list[i].country+"'  copyrightOwner='"+list[i].copyrightOwner+"'  successDate='"+list[i].successDate+"'  classificationNumber='"+list[i].classificationNumber+"' versionNumber='"+list[i].versionNumber+"'  href='#mySoftWall' data-toggle='modal'>详情</a>";
            tr += "</td>";
            tr += "</tr>";
        });
        $("#productTable").append(tr);
        modelCon();
    };
    
    //拼接列表
    var compWhiteList = function (data) {
        var list = data.data;
        var tr = "";
        $("#whiteTable").html("");
        $(list).each(function (i) {
            tr += "<tr>";
            tr += "<td class='leftIn'>" + list[i].name + "</td>";
            tr += "<td class='leftIn'>" + list[i].registrationNumber + "</td>";
            tr += "<td class='leftIn'>" + list[i].type + "</td>";
            tr += "<td class='leftIn'>" + list[i].createDate + "</td>";
            tr += "<td class='leftIn'>" + list[i].registerDate + "</td>";
            tr += "<td class='leftIn'>" + list[i].publishedDate + "</td>";
            tr += "</tr>";
        });
        $("#whiteTable").append(tr);
    };
	//域名备案
	var recordInformation = function () {
        var _url = "";
        _url = $.kf.GETCOMPANYDOMAIN + "?" + "id=" + id + "&page=" + 1;
        //new GetTable(_url, $("#recordPage"), "", recordList, "get", $("#recordList")).init();
        var lastPage = 1;
        $.getTable({
        	showDefaultTabel:showDefaultTabel,
        	url:_url,//url
	    	pageId:$("#recordPage"),//分页id
	    	callback:recordList,//callback
	    	loadId:".maskInTableYm",
	    	currentPage:lastPage,
	    	showDataBox:false,
	    	targetId:"zscq6",
	    	tbodyId:$("#recordList")//tbody的id,
        })
    };
    //拼接列表
    var recordList = function (data) {
        var list = data.data;
        var tr = "";
        $("#recordList").html("");
        $(list).each(function (i) {
            tr += "<tr>";
            tr += "<td>" + list[i].releaseDate + "</td>";
            tr += "<td>" + list[i].websiteName + "</td>";
            tr += "<td><a target='_blank' href='http://"+ list[i].website +"'>" + list[i].website + "</a></td>";
            tr += "<td>" + list[i].domain + "</td>";
            tr += "<td>" + list[i].recordNumber + "</td>";
            tr += "<td>" + list[i].operatingStatus + "</td>";	
            tr += "<td>" + list[i].type + "</td>";
            tr += "</tr>";
        });
        $("#recordList").append(tr);
    };
    //企业证书
	var certificate = function () {
        var _url = "";
        var id = Query.getHash("id");
        _url = $.kf.GETCERTIFICATE + "?" + "id=" + id + "&page=" + 1;
        var lastPage = 1;
        $.getTable({
        	showDefaultTabel:showDefaultTabel,
        	url:_url,//url
	    	pageId:$("#recordPageZs"),//分页id
	    	pageNum:10,
	    	callback:certificateList,//callback
	    	currentPage:lastPage,
	    	loadId:".maskInTableZs",
	    	showDataBox:false,
	    	targetId:"zscq7",
	    	tbodyId:$("#recordListZs")//tbody的id,
        })
    };
    //拼接列表
    var certificateList = function (data) {
        var list = data.data;
        var tr = "";
        $("#recordListZs").html("");
        $(list).each(function (i) {
            tr += "<tr>";
            tr += "<td>" + list[i].date + "</td>";
            tr += "<td>" + list[i].certifName + "</td>";
            tr += "<td>" + list[i].certifSerialNum + "</td>";
            tr += "<td>" + list[i].agencyName + "</td>";
            tr += "<td>" + list[i].dtExp + "</td>";
            tr += "</tr>";
        });
        $("#recordListZs").append(tr);
    };
    //特许经营权
	var franchiseRight = function () {
        var _url = "";
        var id = Query.getHash("id");
        _url = $.kf.GETFRANCHISE + "?" + "id=" + id + "&page=" + 1;
        var lastPage = 1;
        $.getTable({
        	showDefaultTabel:showDefaultTabel,
        	url:_url,//url
	    	pageId:$("#recordPageJy"),//分页id
	    	pageNum:10,
	    	callback:franchiseRightList,//callback
	    	currentPage:lastPage,
	    	loadId:".maskInTableJy",
	    	showDataBox:false,
	    	targetId:"zscq8",
	    	tbodyId:$("#recordListJy")//tbody的id,
        })
    };
    //拼接列表
    var franchiseRightList = function (data) {
        var list = data.data;
        var tr = "";
        $("#recordListJy").html("");
        $(list).each(function (i) {
            tr += "<tr>";
            tr += "<td>" + list[i].dtEffect + "</td>";
            tr += "<td>" + list[i].agencyName + "</td>";
            tr += "<td>" + list[i].authorRangeBusi + "</td>";
            tr += "<td>" + list[i].authorRangeGeog + "</td>";
            tr += "<td>" + list[i].dtExp + "</td>";
            tr += "<td class=''><a class='textGl-detail textGl-performance' data-toggle='modal' data-target='#myModalOut'>查看详情</a><span class='col-hide'>"+ list[i].content +"</span></td>";
            tr += "</tr>";
        });
        $("#recordListJy").append(tr);
        modelCon();
    };
    //
    //风险信息
    //
    //
    //风险提示
    //风险提示请求地址
    var riskWarningTop = function(thisDate){
    	var _url = "";
        var id = Query.getHash("id");
        if(isNullOrEmpty(thisDate)){
        	 _url = $.kf.GETRISKTIPS + "?" + "id=" + id + "&page=" + 1;
        }else{
        	_url = $.kf.GETRISKTIPS + "?" + "id=" + id + "&page=" + 1+"&date="+thisDate;
        }
        $.kf.ajax({
	        type: "get",
	        url: _url,
	        data: "",
	        dataType: "json",
	        processResponse: function (data) {
	            var list = data.data;
	            var tr = "";
	            $(".riskWarn-choose").hide();
	            $(".riskWarn-change-choose").show();
	            $("#riskWarn-box").html("");
	            $(list).each(function(i){
	            	tr += "<li>";
		            tr += "<div class='riskWarn-title'>风险名称："+ list[i].name +"</div>";
		            if(!isNullOrEmpty(list[i].content)){
		            	tr += "<span class='riskWarn-content'>"+ list[i].content +"</span>";
		            	tr += "<a class='textGl-detail riskWarn-detail' data-toggle='modal' data-target='#myModalOut'>查看详情</a>";
		            }else{
		            	//...
		            }
		            tr += "</li>";
	            });
	            if(isNullOrEmpty(data.chg)){
	            	$(".riskWarn-choose").hide();
	            }else if(isNullOrEmpty(data.chg.changeDetail)){
	            	if(data.chg.ifChanged == 1){
	            		$(".riskWarn-choose").find("span").text("是");
	            	}else{
	            		$(".riskWarn-choose").find("span").text("否");
	            	};
	            	$(".riskWarn-chbox").hide();
	            }else{
	            	if(data.chg.ifChanged == 1){
	            		$(".riskWarn-choose").find("span").text("是");
	            	}else{
	            		$(".riskWarn-choose").find("span").text("否");
	            	};
	            }
	            $("#riskWarn-box").append(tr);
	           if(isNullOrEmpty($("#timeListTs").html())){
		        	$(data.date).each(function(i){
			    		if(i==0){
			    			$("#timeListTs").append("<li class='timeChildTs active'><a>"+data.date[i]+"</a></li>");
			    		}else{
			    			$("#timeListTs").append("<li class='timeChildTs'><a>"+data.date[i]+"</a></li>");
			    		}
			    	})
		        }
 			riskBox();
 			modelCon();
	        }
	    });
    }
	//风险信息
	var riskWarning = function () {
		if(Query.getHash("from") == "investment"){
			riskWarningTop();
		}
	    
	    //法律诉讼
	    courtMsg();
	    //法院公告
	    CompDishonesty();
	    //经营异常
	    abnormalOperation();
	    //行政处罚
	    administrativeSan();
	    //动产抵押
	    chattelMortgage();
	    //司法拍卖
	    judicialAuction();
	    //股权质押
	    //sharePledge();
	    //股权冻结
	    //equityFreeze();
	    //开庭公告
	    courtNotice();
	    //失信人
	    dishonestPerson();
	    //被执行人
	    executePerson();
	    //欠税公告
	    taxNotice();
	    //行政处罚
	    publishFun();
    };
    riskBox();
    function riskBox(){
    	//日期点击事件
        $(".timeChildTs a").off().on("click",function(){
        	$(this).parent().addClass("active").siblings("li").removeClass("active");
        	riskWarningTop($(this).text());
        });
        //日期滚动效果
        rollTim($("#timelfTs"),$("#timergTs"),$("#timeListTs"),130);
    }
	//法院公告
	var CompDishonesty = function () {
        var _url = "";
        _url = $.kf.GETCOMPANYCASENOTICE + "?" + "id=" + id + "&page=" + 1;
        var lastPage = 1;
        $.getTable({
	        showDefaultTabel:showDefaultTabel,
        	url:_url,//url
	    	pageId:$("#DisListPage"),//分页id
	    	callback:CompDishonestyList,//callback
	    	currentPage:lastPage,
	    	showDataBox:false,
	    	loadId:".maskInTablSx",
	    	targetId:"fxxx2",
	    	tbodyId:$("#compDisList")//tbody的id,
        })
    };
    //拼接列表
    var CompDishonestyList = function (data) {
        var list = data.data;
        var tr = "";
        $("#compDisList").html("");
        $(list).each(function (i) {
            tr += "<tr>";
            tr += "<td class='leftIn'>" + list[i].publishDate + "</td>";
            if(isNullOrEmpty(list[i].appellatepartyId)){
            	tr += "<td class='leftIn'>" + list[i].appellateparty + "</td>";
            }else{
            	tr += "<td class='leftIn'><a href='" + $.url.companyListUrl() + "id=" + list[i].appellatepartyId +"'>" + list[i].appellateparty + "</a></td>";
            }
            if(isNullOrEmpty(list[i].respondentId)){
            	tr += "<td class='leftIn'>" + list[i].respondent + "</td>";
            }else{
            	tr += "<td class='leftIn'><a href='" + $.url.companyListUrl() + "id=" + list[i].respondentId +"'>" + list[i].respondent + "</a></td>";
            }
            tr += "<td class='leftIn'>" + list[i].typeName  + "</td>";
            tr += "<td class='leftIn'>" + list[i].court   + "</td>";
            tr += "<td class=''><a class='compDisMod'>查看详情</a>";
            tr += '<div style="display:none"><table class="table">';
			tr += 			'<tbody>';
			tr += 				'<tr>';
			tr += 					'<td class="table-left" style="white-space: nowrap;">发布时间</td>';
			tr += 					'<td>'+ list[i].publishDate +'</td>';
			tr += 				'</tr>';
			tr += 				'<tr>';
			tr += 					'<td class="table-left">上诉方</td>';
			tr += 					'<td>'+ list[i].appellateparty +'</td>';
			tr += 				'</tr>';
			tr += 				'<tr>';
			tr += 					'<td class="table-left">被诉方</td>';
			tr += 					'<td>'+ list[i].respondent  +'</td>';
			tr += 				'</tr>';
			tr += 				'<tr>';
			tr += 					'<td class="table-left">公告类型</td>';
			tr += 					'<td>'+ list[i].typeName  +'</td>';
			tr += 				'</tr>';
			tr += 				'<tr>';
			tr += 					'<td class="table-left">法院</td>';
			tr += 					'<td>'+ list[i].court  +'</td>';
			tr += 				'</tr>';
			tr += 				'<tr>';
			tr += 					'<td class="table-left">公告内容</td>';
			tr += 					'<td>'+ list[i].content  +'</td>';
			tr += 				'</tr>';
			tr += 			'</tbody>';
			tr += 		'</table></div>';
            tr += "</td>";
            tr += "</tr>";
        });
        $("#compDisList").append(tr);
        $(".compDisMod").on("click",function(){
        	$("#myportCredit").find(".modal-title").text("法院公告");
        	$("#myportCredit").modal();
        	$(".portCredit-content").html($(this).siblings("div").html());
        })
    };
    //法律诉讼
	var courtMsg = function () {
        var _url = "";
        _url = $.kf.GETCOMPANYCASE + "?" + "id=" + id + "&page=" + 1;
        var lastPage = 1;
        $.getTable({
	        showDefaultTabel:showDefaultTabel,
        	url:_url,//url
	    	pageId:$("#courtPage"),//分页id
	    	callback:courtMsgList,//callback
	    	currentPage:lastPage,
	    	showDataBox:false,
	    	loadId:".maskInTablGf",
	    	targetId:"fxxx3",
	    	tbodyId:$("#courtList")//tbody的id,
        })
        
    };
    //拼接列表
    var courtMsgList = function (data) {
        var list = data.data;
        var tr = "";
        $("#courtList").html("");
        $(list).each(function (i) {
            tr += "<tr>";
            tr += "<td class='leftIn'>" + list[i].judicialDate + "</td>";
            if(isNullOrEmpty(list[i].content)){
            	tr += "<td class='leftIn' style='text-align:left'>"+ list[i].caseTitle + "</td>";
            }else{
            	tr += "<td class='leftIn' style='text-align:left'><a target='_blank' href='" + $.url.newsInfoUrl() + "caseId=" + list[i].caseId + '&name=courtMsg' + "'>" + list[i].caseTitle + "</a></td>";
            }
            tr += "<td class='leftIn'>" + list[i].caseType + "</td>";
            tr += "<td class='leftIn'>" + list[i].courtName + "</td>";
            tr += "<td class='leftIn'>" + list[i].caseNumber + "</td>";
            tr += "</tr>";
        });
        $("#courtList").append(tr);
        modelCon();
    };
    
     //经营异常
	var abnormalOperation = function () {
        var _url = "";
        _url = $.kf.GETCOMPANYOPERATION + "?" + "id=" + id + "&page=" + 1;
        var lastPage = 1;
        $.getTable({
	        showDefaultTabel:showDefaultTabel,
        	url:_url,//url
	    	pageId:$("#courtPageYc"),//分页id
	    	callback:abnormalOperationList,//callback
	    	currentPage:lastPage,
	    	loadId:".maskInTablYc",
	    	targetId:"fxxx4",
	    	showDataBox:false,
	    	tbodyId:$("#courtListYc")//tbody的id,
        })
        
    };
    //拼接列表
    var abnormalOperationList = function (data) {
        var list = data.data;
        var tr = "";
        $("#courtListYc").html("");
        $(list).each(function (i) {
            tr += "<tr>";
            tr += "<td class='leftIn'>" + list[i].dtList + "</td>";
            tr += "<td class='leftIn'>" + list[i].reasonList + "</td>";
            tr += "<td class='leftIn'>" + list[i].agencyList + "</td>";
            tr += "<td class='leftIn'>" + list[i].dtRemove + "</td>";
            tr += "<td class='leftIn'>" + list[i].reasonRemove + "</td>";
            tr += "<td class='leftIn'>" + list[i].agencyRemove + "</td>";
            tr += "</tr>";
        });
        $("#courtListYc").append(tr);
    };
    
     //行政处罚
	var administrativeSan = function () {
        var _url = "";
        _url = $.kf.GETCOMPANYPENALTY + "?" + "id=" + id + "&page=" + 1;
        var lastPage = 1;
        $.getTable({
	        showDefaultTabel:showDefaultTabel,
        	url:_url,//url
	    	pageId:$("#courtPageCf"),//分页id
	    	pageNum:10,
	    	callback:administrativeSanList,//callback
	    	currentPage:lastPage,
	    	loadId:".maskInTablCf",
	    	targetId:"fxxx5",
	    	showDataBox:false,
	    	tbodyId:$("#courtListCf")//tbody的id,
        })
        
    };
    //拼接列表
    var administrativeSanList = function (data) {
        var list = data.data;
        var tr = "";
        $("#courtListCf").html("");
        $(list).each(function (i) {
            tr += "<tr>";
            tr += "<td class='leftIn'>" + list[i].date + "</td>";
            tr += "<td class='leftIn'>" + list[i].agency + "</td>";
            tr += "<td class='leftIn'>" + list[i].type + "</td>";
            tr += "<td class='leftIn'><a class='textGl-detail textGl-content' data-toggle='modal' data-target='#myModalOut'>查看详情</a><span class='col-hide'>"+ list[i].caseText +"</span></td>";
            tr += "<td class='leftIn'><a href='" + list[i].noticeUrl + "'target='_blank'>查看详情</td>";
            tr += "</tr>";
        });
        $("#courtListCf").append(tr);
        modelCon();
        
    };
    
  	//动产抵押
	var chattelMortgage = function () {
        var _url = "";
         var id = Query.getHash("id");
        _url = $.kf.GETCOMPANYMORTGAGE + "?" + "id=" + id + "&page=" + 1;
        var lastPage = 1;
        $.getTable({
	        showDefaultTabel:showDefaultTabel,
        	url:_url,//url
	    	pageId:$("#courtPageDy"),//分页id
	    	pageNum:10,
	    	callback:chattelMortgageList,//callback
	    	currentPage:lastPage,
	    	loadId:".maskInTablDy",
	    	showDataBox:false,
	    	targetId:"fxxx6",
	    	tbodyId:$("#courtListDy")//tbody的id,
        })
        
    };
    //拼接列表
    var chattelMortgageList = function (data) {
        var list = data.data;
        var tr = "";
        $("#courtListDy").html("");
        $(list).each(function (i) {
            tr += "<tr>";
            tr += "<td class='leftIn'>" + list[i].date + "</td>";
            tr += "<td class='leftIn'>" + list[i].registerAgency + "</td>";
            tr += "<td class='leftIn'>" + list[i].registerNumber + "</td>";
            tr += "<td class='leftIn'>" + list[i].mortgagee + "</td>";
            tr += "<td class='leftIn'>" + list[i].pledgeName + "</td>";
            tr += "<td class='leftIn'>" + list[i].term + "</td>";
            tr += "<td class='leftIn'>" + list[i].type + "</td>";
            tr += "<td class='leftIn'>" + list[i].amt + "</td>";
            tr += "<td class='leftIn'>" + list[i].status + "</td>";
            tr += "</tr>";
        });
        $("#courtListDy").append(tr);
    };
    
    //司法拍卖
	var judicialAuction = function () {
        var _url = "";
        var id = Query.getHash("id");
        _url = $.kf.GETJUDICIALAUCTION + "?" + "id=" + id + "&page=" + 1;
        var lastPage = 1;
        $.getTable({
	        showDefaultTabel:showDefaultTabel,
        	url:_url,//url
	    	pageId:$("#courtPagePm"),//分页id
	    	pageNum:10,
	    	callback:judicialAuctionList,//callback
	    	currentPage:lastPage,
	    	loadId:".maskInTablPm",
	    	showDataBox:false,
	    	targetId:"fxxx7",
	    	tbodyId:$("#courtListPm")//tbody的id,
        })
        
    };
    //拼接列表
    var judicialAuctionList = function (data) {
        var list = data.data;
        var tr = "";
        $("#courtListPm").html("");
        $(list).each(function (i) {
            tr += "<tr>";
            tr += "<td class='leftIn'>" + list[i].date + "</td>";
            tr += "<td class='leftIn'>" + list[i].court + "</td>";
            tr += "<td class='leftIn'>" + list[i].title + "</td>";
            tr += "<td class='leftIn'><a class='textGl-detail judicial-caseText' data-toggle='modal' data-target='#myModalOut'>查看详情</a><span class='col-hide'>"+ list[i].content +"</span></td>";
            tr += "</tr>";
        });
        $("#courtListPm").append(tr);
        modelCon();
    };
    //股权质押
	var sharePledge = function () {
        var _url = "";
        var id = Query.getHash("id");
        _url = $.kf.GETCOMPANYBONDPLEDGE + "?" + "id=" + id + "&page=" + 1;
        var lastPage = 1;
        $.getTable({
	        showDefaultTabel:showDefaultTabel,
        	url:_url,//url
	    	pageId:$("#courtPageZy"),//分页id
	    	pageNum:10,
	    	callback:sharePledgeList,//callback
	    	currentPage:lastPage,
	    	loadId:".maskInTablZy",
	    	showDataBox:false,
	    	targetId:"fxxx8",
	    	tbodyId:$("#courtListZy")//tbody的id,
        })
        
    };
    //拼接列表
    var sharePledgeList = function (data) {
        var list = data.data;
        var tr = "";
        $("#courtListZy").html("");
        $(list).each(function (i) {
            tr += "<tr>";
            tr += "<td class='leftIn'>" + list[i].dtNotice + "</td>";
            tr += "<td class='leftIn'>" + list[i].pldName + "</td>";
            tr += "<td class='leftIn'>" + list[i].pldShareNum + "</td>";
            tr += "<td class='leftIn'>" + list[i].pldShareRatio + "</td>";
             tr += "<td class='leftIn'>" + list[i].pldShareRatioTotal + "</td>";
            tr += "<td class='leftIn'>" + list[i].loanFrom + "</td>";
            tr += "<td class='leftIn'>" + list[i].dtStart + "</td>";
             tr += "<td class='leftIn'>" + list[i].dtEnd + "</td>";
            tr += "<td class='leftIn'><a class='textGl-detail share-caseText' data-toggle='modal' data-target='#myModalOut'>查看详情</a><span class='col-hide'>"+ list[i].pldPurpose +"</span></td>";
            tr += "</tr>";
        });
        $("#courtListZy").append(tr);
        modelCon();
    };
   	
   	 //股权冻结
	var equityFreeze = function () {
        var _url = "";
        var id = Query.getHash("id");
        _url = $.kf.GETCOMPANYEQUITYFREEZE + "?" + "id=" + id + "&page=" + 1;
        var lastPage = 1;
        $.getTable({
	        showDefaultTabel:showDefaultTabel,
        	url:_url,//url
	    	pageId:$("#courtPageDj"),//分页id
	    	pageNum:10,
	    	callback:equityFreezeList,//callback
	    	currentPage:lastPage,
	    	loadId:".maskInTablDj",
	    	targetId:"fxxx9",
	    	showDataBox:false,
	    	tbodyId:$("#courtListDj")//tbody的id,
        })
        
    };
    //拼接列表
    var equityFreezeList = function (data) {
        var list = data.data;
        var tr = "";
        $("#courtListDj").html("");
        $(list).each(function (i) {
            tr += "<tr>";
            tr += "<td class='leftIn'>" + list[i].dtNotice + "</td>";
            tr += "<td class='leftIn'>" + list[i].executiveName + "</td>";
            tr += "<td class='leftIn'>" + list[i].stockholderName + "</td>";
            tr += "<td class='leftIn'>" + list[i].freezeNum + "</td>";
            tr += "<td class='leftIn'>" + list[i].dtStart + "</td>";
             tr += "<td class='leftIn'>" + list[i].dtEnd + "</td>";
            tr += "<td class='leftIn'><a class='textGl-detail share-caseText' data-toggle='modal' data-target='#myModalOut'>查看详情</a><span class='col-hide'>"+ list[i].freezeReason +"</span></td>";
            tr += "</tr>";
        });
        $("#courtListDj").append(tr);
        modelCon();
    };
     //开庭公告
	var courtNotice= function () {
        var _url = "";
        var id = Query.getHash("id");
        _url = $.kf.GETCOMPANYANNOUNCEMENT + "?" + "id=" + id + "&page=" + 1;
        var lastPage = 1;
        $.getTable({
	        showDefaultTabel:showDefaultTabel,
        	url:_url,//url
	    	pageId:$("#courtNoticePage"),//分页id
	    	callback:courtNoticeList,//callback
	    	currentPage:lastPage,
	    	loadId:".maskInTableCourt",
	    	targetId:"fxxx10",
	    	showDataBox:false,
	    	tbodyId:$("#courtNoticeList")//tbody的id,
        })
        
    };
    //拼接列表
    var courtNoticeList = function (data) {
        var list = data.data;
        var tr = "";
        $("#courtNoticeList").html("");
        $(list).each(function (i) {
            tr += "<tr>";
            tr += "<td class='leftIn'>" + list[i].date  + "</td>";
            tr += "<td class='leftIn'>" + list[i].caseReason  + "</td>";
            tr += "<td class='leftIn'>" + list[i].plaintiff   + "</td>";
            tr += "<td class='leftIn'>" + list[i].defendant  + "</td>";
            tr += "<td class='leftIn'><a id='courtToPop' litigant='"+list[i].litigant+"'  date='"+list[i].date+"' caseReason='"+list[i].caseReason+"' plaintiff='"+list[i].plaintiff+"' defendant='"+list[i].defendant+"' caseNumber='"+list[i].caseNumber+"' courtRoom='"+list[i].courtRoom+"' court='"+list[i].court+"' judge='"+list[i].judge+"' contractors='"+list[i].contractors+"' class='textGl-detail share-caseText' data-toggle='modal' data-target='#myModalCourt'>查看详情</a></td>";
            tr += "</tr>";
        });
        $("#courtNoticeList").append(tr);
        $("#courtToPop").on("click",function(){
        	courtPop(this)
        });
    };
    var courtPop = function(el){
    	$("#courtTableList").html("");
       	var tr = '';
    	tr += '<tr>';
		tr += '	<td class="gray">案由</td>';
		tr += '	<td><span id="">' + $(el).attr("caseReason") + '</span></td>';
		tr += '</tr>';
		tr += '<tr>';
		tr += '	<td class="gray">编号</td>';
		tr += '	<td><span id="">' + $(el).attr("caseNumber") + '</span></td>';
		tr += '</tr>';
		tr += '<tr>';
		tr += '	<td class="gray">原告/上诉人</td>';
		tr += '	<td><span id="">' + $(el).attr("plaintiff") + '</span></td>';
		tr += '</tr>';
		tr += '<tr>';
		tr += '	<td class="gray">被告/被上诉人</td>';
		tr += '	<td><span id="">' + $(el).attr("defendant") + '</span></td>';
		tr += '</tr>';
		tr += '<tr>';
		tr += '	<td class="gray">开庭日期</td>';
		tr += '	<td><span id="">' + $(el).attr("date") + '</span></td>';
		tr += '</tr>';
		tr += '<tr>';
		tr += '	<td class="gray">当事人</td>';
		tr += '	<td><span id="">' + $(el).attr("litigant") + '</span></td>';
		tr += '</tr>';
		tr += '<tr>';
		tr += '	<td class="gray">承办部门</td>';
		tr += '	<td><span id="">' + $(el).attr("contractors") + '</span></td>';
		tr += '</tr>';
		tr += '<tr>';
		tr += '	<td class="gray">审判长/主审人</td>';
		tr += '	<td><span id="">' + $(el).attr("judge") + '</span></td>';
		tr += '</tr>';
		tr += '<tr>';
		tr += '	<td class="gray">法院</td>';
		tr += '	<td><span id="">' + $(el).attr("court") + '</span></td>';
		tr += '</tr>';
		tr += '<tr>';
		tr += '	<td class="gray">法庭</td>';
		tr += '	<td><span id="">' + $(el).attr("courtRoom") + '</span></td>';
		tr += '</tr>';
		$("#courtTableList").html(tr);
    }
     //失信人
	var dishonestPerson= function () {
        var _url = "";
        var id = Query.getHash("id");
        _url = $.kf.GETCOMPANYDISHONESTY + "?" + "id=" + id + "&page=" + 1;
        var lastPage = 1;
        $.getTable({
	        showDefaultTabel:showDefaultTabel,
        	url:_url,//url
	    	pageId:$("#dishonestPage"),//分页id
	    	callback:dishonestList,//callback
	    	currentPage:lastPage,
	    	loadId:".maskInTableDishonest",
	    	targetId:"fxxx13",
	    	showDataBox:false,
	    	tbodyId:$("#dishonestList")//tbody的id,
        })
        
    };
    var dishonestPop = function(el){
    	$("#courtTableList").html("");
       	var tr = '';
    	tr += '<tr>';
		tr += '	<td class="gray">名称</td>';
		tr += '	<td><span id="">' + $(el).attr("title") + '</span></td>';
		tr += '</tr>';
		tr += '<tr>';
		tr += '	<td class="gray">法定代表人</td>';
		tr += '	<td><span id="">' + $(el).attr("legalRepresentative") + '</span></td>';
		tr += '</tr>';
		tr += '<tr>';
		tr += '	<td class="gray">身份证号/组织机构代码</td>';
		tr += '	<td><span id="">' + $(el).attr("creditCode") + '</span></td>';
		tr += '</tr>';
		tr += '<tr>';
		tr += '	<td class="gray">案号</td>';
		tr += '	<td><span id="">' + $(el).attr("caseNumber") + '</span></td>';
		tr += '</tr>';
		tr += '<tr>';
		tr += '	<td class="gray">作出执行依据单位</td>';
		tr += '	<td><span id="">' + $(el).attr("executor") + '</span></td>';
		tr += '</tr>';
		tr += '<tr>';
		tr += '	<td class="gray">法律生效文书确定的义务</td>';
		tr += '	<td><span id="">' + $(el).attr("judicialText") + '</span></td>';
		tr += '</tr>';
		tr += '<tr>';
		tr += '	<td class="gray">被执行人的履行情况</td>';
		tr += '	<td><span id="">' + $(el).attr("performance") + '</span></td>';
		tr += '</tr>';
		tr += '<tr>';
		tr += '	<td class="gray">执行法院</td>';
		tr += '	<td><span id="">' + $(el).attr("courtName") + '</span></td>';
		tr += '</tr>';
		tr += '<tr>';
		tr += '	<td class="gray">省份</td>';
		tr += '	<td><span id="">' + $(el).attr("area") + '</span></td>';
		tr += '</tr>';
		tr += '<tr>';
		tr += '	<td class="gray">立案时间</td>';
		tr += '	<td><span id="">' + $(el).attr("registerDate") + '</span></td>';
		tr += '</tr>';
		tr += '<tr>';
		tr += '	<td class="gray">发布时间</td>';
		tr += '	<td><span id="">' + $(el).attr("releaseDate") + '</span></td>';
		tr += '</tr>';
		$("#courtTableList").html(tr);
    }
    //拼接列表
    var dishonestList = function (data) {
        var list = data.data;
        var tr = "";
        $("#dishonestList").html("");
        $(list).each(function (i) {
            tr += "<tr>";
            tr += "<td class='leftIn'>" + list[i].registerDate  + "</td>";
            tr += "<td class='leftIn'>" + list[i].caseNumber  + "</td>";
            tr += "<td class='leftIn'>" + list[i].courtName   + "</td>";
            tr += "<td class='leftIn'>" + list[i].performance   + "</td>";
            tr += "<td class='leftIn'>" + list[i].basisCaseNumber  + "</td>";
            tr += "<td class='leftIn'><a id='dishonestTo' creditCode='"+list[i].creditCode+"' registerDate='"+list[i].registerDate+"' caseNumber='"+list[i].caseNumber+"' courtName='"+list[i].courtName+"' judicialText='"+list[i].judicialText+"' basisCaseNumber='"+list[i].basisCaseNumber+"' performance='"+list[i].performance+"' dishonestyBehavior='"+list[i].dishonestyBehavior+"' title='"+list[i].title+"' releaseDate='"+list[i].releaseDate+"' area='"+list[i].area+"' executor='"+list[i].executor+"' legalRepresentative='"+list[i].legalRepresentative+"' class='textGl-detail share-caseText' data-toggle='modal' data-target='#myModalCourt'>查看详情</a></td>";
            tr += "</tr>";
        });
        $("#dishonestList").append(tr);
        $("#dishonestTo").on("click",function(){
        	dishonestPop(this)
        });
    };
     //被执行人
	var executePerson= function () {
        var _url = "";
        var id = Query.getHash("id");
        _url = $.kf.GETCOMPANYEXECUTOR + "?" + "id=" + id + "&page=" + 1;
        var lastPage = 1;
        $.getTable({
	        showDefaultTabel:showDefaultTabel,
        	url:_url,//url
	    	pageId:$("#executePage"),//分页id
	    	callback:dishonestList,//callback
	    	currentPage:lastPage,
	    	loadId:".maskInTableExecute",
	    	targetId:"fxxx14",
	    	showDataBox:false,
	    	tbodyId:$("#executeList")//tbody的id,
        })
        
    };
    //拼接列表
    var dishonestList = function (data) {
        var list = data.data;
        var tr = "";
        $("#executeList").html("");
        $(list).each(function (i) {
            tr += "<tr>";
            tr += "<td class='leftIn'>" + list[i].date   + "</td>";
            tr += "<td class='leftIn'>" + list[i].target   + "</td>";
            tr += "<td class='leftIn'>" + list[i].caseNumber     + "</td>";
            tr += "<td class='leftIn'>" + list[i].court    + "</td>";
            tr += "</tr>";
        });
        $("#executeList").append(tr);
    };
     //欠税公告
	var taxNotice= function () {
        var _url = "";
        var id = Query.getHash("id");
        _url = $.kf.GETCOMPANYTAXARREARS + "?" + "id=" + id + "&page=" + 1;
        var lastPage = 1;
        $.getTable({
	        showDefaultTabel:showDefaultTabel,
        	url:_url,//url
	    	pageId:$("#taxPage"),//分页id
	    	callback:taxList,//callback
	    	currentPage:lastPage,
	    	loadId:".maskInTableTax",
	    	targetId:"fxxx14",
	    	showDataBox:false,
	    	tbodyId:$("#taxList")//tbody的id,
        })
        
    };
    //拼接列表
    var taxList = function (data) {
        var list = data.data;
        var tr = "";
        $("#taxList").html("");
        $(list).each(function (i) {
            tr += "<tr>";
            tr += "<td class='leftIn'>" + list[i].date + "</td>";
            tr += "<td class='leftIn'>" + list[i].taxpayerNumber + "</td>";
            tr += "<td class='leftIn'>" + list[i].taxCategory + "</td>";
            tr += "<td class='leftIn'>" + list[i].currentTaxAmount + "</td>";
            tr += "<td class='leftIn'>" + list[i].taxAmount + "</td>";
            tr += "<td class='leftIn'>" + list[i].taxAuthority + "</td>";
            tr += "</tr>";
        });
        $("#taxList").append(tr);
    };
    
     //行政处罚
	var publishFun= function () {
        var _url = "";
        var id = Query.getHash("id");
        _url = $.kf.GETCOMPANYPENALTY + "?" + "id=" + id + "&page=" + 1;
        var lastPage = 1;
        $.getTable({
	        showDefaultTabel:showDefaultTabel,
        	url:_url,//url
	    	pageId:$("#publishPage"),//分页id
	    	callback:publishList,//callback
	    	currentPage:lastPage,
	    	loadId:".maskInTablePublish",
	    	targetId:"fxxx16",
	    	showDataBox:false,
	    	tbodyId:$("#publishList")//tbody的id,
        })
        
    };
    var publishListPop = function(el){
    	$("#courtTableList").html("");
       	var tr = '';
    	tr += '<tr>';
		tr += '	<td class="gray">决定书文号</td>';
		tr += '	<td><span id="">' + $(el).attr("number") + '</span></td>';
		tr += '</tr>';
		tr += '<tr>';
		tr += '	<td class="gray">类型</td>';
		tr += '	<td><span id="">' + $(el).attr("type") + '</span></td>';
		tr += '</tr>';
		tr += '<tr>';
		tr += '	<td class="gray">处罚内容</td>';
		tr += '	<td><span id="">' + $(el).attr("content") + '</span></td>';
		tr += '</tr>';
		tr += '<tr>';
		tr += '	<td class="gray">决定日期</td>';
		tr += '	<td><span id="">' + $(el).attr("date") + '</span></td>';
		tr += '</tr>';
		tr += '<tr>';
		tr += '	<td class="gray">决定机关</td>';
		tr += '	<td><span id="">' + $(el).attr("agency") + '</span></td>';
		tr += '</tr>';
		tr += '<tr>';
		tr += '	<td class="gray">法人</td>';
		tr += '	<td><span id="">' + $(el).attr("legalPerson") + '</span></td>';
		tr += '</tr>';
		tr += '<tr>';
		tr += '	<td class="gray">备注</td>';
		tr += '	<td><span id="">' + $(el).attr("remarks") + '</span></td>';
		tr += '</tr>';
		$("#courtTableList").html(tr);
    }
    //拼接列表
    var publishList = function (data) {
        var list = data.data;
        var tr = "";
        $("#publishList").html("");
        $(list).each(function (i) {
            tr += "<tr>";
            tr += "<td class='leftIn'>" + list[i].date  + "</td>";
            tr += "<td class='leftIn'>" + list[i].number   + "</td>";
            tr += "<td class='leftIn'>" + list[i].type   + "</td>";
            tr += "<td class='leftIn'>" + list[i].agency   + "</td>";
            tr += "<td class='leftIn'><a id='publishListTo' content='"+list[i].content+"' date='"+list[i].date+"' type='"+list[i].type+"' agency='"+list[i].agency+"' number='"+list[i].number+"' legalPerson='"+list[i].legalPerson+"' remarks='"+list[i].remarks+"'  class='textGl-detail share-caseText' data-toggle='modal' data-target='#myModalCourt'>查看详情</a></td>";
            tr += "</tr>";
        });
        $("#publishList").append(tr);
        $("#publishListTo").on("click",function(){
        	publishListPop(this)
        });
    };


	/*
     * 
     * 经营信息
     * 
     * 
     * */
    //招聘信息
    var operitingInit = function () {
        _url = $.kf.GETCOMPANYRECRUITMENT + "?" + "id=" + id + "&page=" + 1;
		var lastPage = 1;
		$.getTable({
	        showDefaultTabel:showDefaultTabel,
        	url:_url,//url
	    	pageId:$("#operitingTool"),//分页id
	    	callback:operitingList,//callback
	    	loadId:".maskInTableAz",
	    	showDataBox:false,
	    	targetId:"jyxx1",
	    	tbodyId:$("#operitingList")//tbody的id,
        })
		bidding();//招投标
		//employees();//企业员工
		portCredit();//进出口信用
		taxRating();//税务评级
		bondInfo();//债券信息
		spotCheck();//抽查检查
	    judicialAuction();//司法拍卖
		if(Query.getHash("from") == "investment"){
			
		}
    };
    //招投标
    var bidding = function () {
        var _url = "";
        _url = $.kf.EVENTSTENDERBID + "?" + "id=" + id + "&page=" + 1;
        var lastPage = 1;
        $.getTable({
	        showDefaultTabel:showDefaultTabel,
        	url:_url,//url
	    	pageId:$("#biddingTool"),//分页id
	    	pageNum:10,
	    	callback:biddingList,//callback
	    	loadId:".maskInTableAx",
	    	showDataBox:false,
	    	targetId:"jyxx2",
	    	tbodyId:$("#biddingList")//tbody的id,
        })
    };
    //招投标拼接表格
    var biddingList = function (data) {
        var list = data.data;
        console.log(list)
        var tr = "";
        $("#biddingList").html("");
        $(list).each(function (i) {
            tr += "<tr>";
            tr += "<td>" + list[i].date + "</td>";
            if(isNullOrEmpty(list[i].number)){
            	tr += "<td class='leftIn' style='text-align:left'>"+ list[i].title + "</td>";
            }else{
            	tr += "<td class='leftIn' style='text-align:left'><a target='_blank' href='" + $.url.newsInfoUrl() + "id=" + list[i].bidId + '&name=bidding' + "'>" + list[i].title + "</a></td>";
            }
            tr += "<td>" + list[i].name + "</td>";
            tr += "</tr>";
        });
        $("#biddingList").append(tr);
    };
    //企业员工
    var employees = function () {
        var _url = "";
        _url = $.kf.COMPANYMAINSTAFF + "?" + "id=" + id + "&page=" + 1;
        var lastPage = 1;
        $.getTable({
	        showDefaultTabel:showDefaultTabel,
        	url:_url,//url
	    	pageId:$("#employeesTool"),//分页id
	    	pageNum:10,
	    	callback:employeesList,//callback
	    	loadId:".maskInTableAc",
	    	showDataBox:false,
	    	targetId:"jyxx3",
	    	tbodyId:$("#employeesList")//tbody的id,
        })
    };
    //企业员工拼接表格
    var employeesList = function (data) {
        var list = data.data;
        var tr = "";
        $("#employeesList").html("");
        $(list).each(function (i) {
            tr += "<tr>";
            tr += "<td>" + list[i].name + "</td>";
            tr += "<td>" + list[i].job + "</td>";
            tr += "<td>" + list[i].content + "</td>";
            tr += "</tr>";
        });
        $("#employeesList").append(tr);
    };
    
    //招聘信息拼接表格
    var operitingList = function (data) {
        var list = data.data;
        var tr = "";
        $("#operitingList").html("");
        $(list).each(function (i) {
            tr += "<tr>";
            tr += "<td>" + list[i].date + "</td>";
            tr += "<td>" + list[i].job + "</td>";
            if(isNullOrEmpty(list[i].content)){
            	tr += "<td> -- </td>";
            }else{
            	tr += "<td class='textGl-box'><span>" + list[i].content + "</span><a class='textGl-detail' data-toggle='modal' data-target='#myModalOut'>查看详情</a></td>";
            }
            tr += "<td>" + list[i].city + "</td>";
            tr += "</tr>";
        });
        $("#operitingList").append(tr);
        modelCon();
    };
    
    //进出口信用
    var portCredit = function () {
        var _url = "";
        _url = $.kf.GETCOMPANYIMEXPORT + "?" + "id=" + id + "&page=" + 1;
        var lastPage = 1;
        $.getTable({
	        showDefaultTabel:showDefaultTabel,
        	url:_url,//url
	    	pageId:$("#portCreditTool"),//分页id
	    	pageNum:10,
	    	callback:portCreditList,//callback
	    	loadId:".maskInTableJc",
	    	showDataBox:false,
	    	targetId:"jyxx3",
	    	tbodyId:$("#portCreditList")//tbody的id,
        })
    };
    //进出口信用拼接表格
    var portCreditList = function (data) {
        var list = data.data;
        var tr = "";
        $("#portCreditList").html("");
        $(list).each(function (i) {
            tr += "<tr>";
            tr += "<td>" + list[i].registerOrg + "</td>";
            tr += "<td>" + list[i].registerNumber + "</td>";
            tr += "<td>" + list[i].operateType + "</td>";
            tr += "<td class=''><a class='portCreditMod'>查看详情</a>";
            tr += '<div style="display:none"><table class="table">';
			tr += 			'<tbody>';
			tr += 				'<tr>';
			tr += 					'<td class="table-left" width="15%">注册日期</td>';
			tr += 					'<td id="date">'+ list[i].date +'</td>';
			tr += 					'<td class="table-left" width="15%">海关注册号</td>';
			tr += 					'<td id="registerNumber">'+ list[i].registerNumber +'</td>';
			tr += 				'</tr>';
			tr += 				'<tr>';
			tr += 					'<td class="table-left" width="15%">注册海关</td>';
			tr += 					'<td id="registerOrg">'+ list[i].registerOrg +'</td>';
			tr += 					'<td class="table-left" width="15%">行政区划</td>';
			tr += 					'<td class="precincts">'+ list[i].precincts +'</td>';
			tr += 				'</tr>';
			tr += 				'<tr>';
			tr += 					'<td class="table-left" width="15%">经济区划</td>';
			tr += 					'<td id="economyPrecincts">'+ list[i].economyPrecincts +'</td>';
			tr += 					'<td class="table-left" width="15%">经营类别</td>';
			tr += 					'<td id="operateType">'+ list[i].operateType +'</td>';
			tr += 				'</tr>';
			tr += 				'<tr>';
			tr += 					'<td class="table-left" width="15%">特殊贸易区域</td>';
			tr += 					'<td id="specialPrecincts">'+ list[i].specialPrecincts +'</td>';
			tr += 					'<td class="table-left" width="15%">行业种类</td>';
			tr += 					'<td id="industry">'+ list[i].industry +'</td>';
			tr += 				'</tr>';
			tr += 				'<tr>';
			tr += 					'<td class="table-left" width="15%">报关有效期</td>';
			tr += 					'<td id="declareDate">'+ list[i].declareDate +'</td>';
			tr += 					'<td class="table-left" width="15%">海关注销标识</td>';
			tr += 				'<td id="identifier">'+ list[i].identifier +'</td>';
			tr += 				'</tr>';
			tr += 				'<tr>';
			tr += 					'<td class="table-left" width="15%">年报情况</td>';
			tr += 					'<td id="report">'+ list[i].report +'</td>';
			tr += 					'<td class="table-left" width="15%">跨境贸易电子商务类型</td>';
			tr += 					'<td id="electronic">'+ list[i].electronic +'</td>';
			tr += 				'</tr>';
			tr += 			'</tbody>';
			tr += 		'</table></div>';
            tr += "</td>";
            tr += "</tr>";
        });
        $("#portCreditList").append(tr);
        $(".portCreditMod").on("click",function(){
        	$("#myportCredit").find(".modal-title").text("进出口信用详情");
        	$("#myportCredit").find(".portCredit-title").text("注册信息");
        	$("#myportCredit").modal();
        	$(".portCredit-content").html($(this).siblings("div").html());
        })
    };
    //税务评级
    var taxRating = function () {
        var _url = "";
        _url = $.kf.GETCOMPANYTAXRATING + "?" + "id=" + id + "&page=" + 1;
        var lastPage = 1;
        $.getTable({
	        showDefaultTabel:showDefaultTabel,
        	url:_url,//url
	    	pageId:$("#taxRatingTool"),//分页id
	    	pageNum:10,
	    	callback:taxRatingList,//callback
	    	loadId:".maskInTableSw",
	    	showDataBox:false,
	    	targetId:"jyxx4",
	    	tbodyId:$("#taxRatingList")//tbody的id,
        })
    };
    //税务评级拼接表格
    var taxRatingList = function (data) {
        var list = data.data;
        var tr = "";
        $("#taxRatingList").html("");
        $(list).each(function (i) {
            tr += "<tr>";
            tr += "<td>" + list[i].year + "</td>";
            tr += "<td>" + list[i].rating + "</td>";
            tr += "<td>" + list[i].type + "</td>";
            tr += "<td>" + list[i].number + "</td>";
            tr += "<td>" + list[i].agency + "</td>";
            tr += "</tr>";
        });
        $("#taxRatingList").append(tr);
    };
    
    //债券信息
    var bondInfo = function () {
        var _url = "";
        _url = $.kf.GETCOMPANYBONDFINANCING + "?" + "id=" + id + "&page=" + 1;
        var lastPage = 1;
        $.getTable({
	        showDefaultTabel:showDefaultTabel,
        	url:_url,//url
	    	pageId:$("#bondInfoTool"),//分页id
	    	pageNum:10,
	    	callback:bondInfoList,//callback
	    	loadId:".maskInTableZq",
	    	showDataBox:false,
	    	targetId:"jyxx5",
	    	tbodyId:$("#bondInfoList")//tbody的id,
        })
    };
    //债券信息拼接表格
    var bondInfoList = function (data) {
        var list = data.data;
        var tr = "";
        $("#bondInfoList").html("");
        $(list).each(function (i) {
            tr += "<tr>";
            tr += "<td>" + list[i].publishDate + "</td>";
            tr += "<td>" + list[i].bondName   + "</td>";
            tr += "<td>" + list[i].bondNumber + "</td>";
            tr += "<td>" + list[i].bondType + "</td>";
            tr += "<td>" + list[i].debtRating + "</td>";
            tr += "<td class=''><a class='bondInfoMod'>查看详情</a>";
            tr += '<div style="display:none"><table class="table">';
			tr += 			'<tbody>';
			tr += 				'<tr>';
			tr += 					'<td class="table-left">债券名称</td>';
			tr += 					'<td>'+ list[i].bondName   +'</td>';
			tr += 					'<td class="table-left">债券代码</td>';
			tr += 					'<td>'+ list[i].bondNumber  +'</td>';
			tr += 				'</tr>';
			tr += 				'<tr>';
			tr += 					'<td class="table-left">发行人</td>';
			tr += 					'<td>'+ list[i].publishName +'</td>';
			tr += 					'<td class="table-left">债券类型</td>';
			tr += 					'<td>'+ list[i].bondType +'</td>';
			tr += 				'</tr>';
			tr += 				'<tr>';
			tr += 					'<td class="table-left">债券发行日</td>';
			tr += 					'<td>'+ list[i].publishDate +'</td>';
			tr += 					'<td class="table-left">债券到期日</td>';
			tr += 					'<td>'+ list[i].expireDate +'</td>';
			tr += 				'</tr>';
			tr += 				'<tr>';
			tr += 					'<td class="table-left">债券期限</td>';
			tr += 					'<td>'+ list[i].bondDateLimit +'</td>';
			tr += 					'<td class="table-left">上市交易日</td>';
			tr += 					'<td>'+ list[i].bondTradeDate +'</td>';
			tr += 				'</tr>';
			tr += 				'<tr>';
			tr += 					'<td class="table-left">计息方式</td>';
			tr += 					'<td>'+ list[i].calInterestType  +'</td>';
			tr += 					'<td class="table-left">债券摘牌日</td>';
			tr += 					'<td>'+ list[i].bondStopDate +'</td>';
			tr += 				'</tr>';
			tr += 				'<tr>';
			tr += 					'<td class="table-left">信用评级机构</td>';
			tr += 					'<td>'+ list[i].creditRatingGov +'</td>';
			tr += 					'<td class="table-left">债项评级</td>';
			tr += 					'<td>'+ list[i].debtRating +'</td>';
			tr += 				'</tr>';
			tr += 				'<tr>';
			tr += 					'<td class="table-left">面值</td>';
			tr += 					'<td>'+ list[i].faceValue +'</td>';
			tr += 					'<td class="table-left">参考利率（%）</td>';
			tr += 					'<td>'+ list[i].refInterestRate +'</td>';
			tr += 				'</tr>';
			tr += 				'<tr>';
			tr += 					'<td class="table-left">票面利率</td>';
			tr += 					'<td>'+ list[i].faceInterestRate +'</td>';
			tr += 					'<td class="table-left">实际发行量（亿）</td>';
			tr += 					'<td>'+ list[i].realIssuedQuantity +'</td>';
			tr += 				'</tr>';
			tr += 				'<tr>';
			tr += 					'<td class="table-left">计划发行量（亿）</td>';
			tr += 					'<td>'+ list[i].planIssuedQuantity +'</td>';
			tr += 					'<td class="table-left">发行价格（元）</td>';
			tr += 					'<td>'+ list[i].issuedPrice +'</td>';
			tr += 				'</tr>';
			tr += 				'<tr>';
			tr += 					'<td class="table-left">利差（BP）</td>';
			tr += 					'<td>'+ list[i].interestDiff +'</td>';
			tr += 					'<td class="table-left">付息频率</td>';
			tr += 					'<td>'+ list[i].payInterestHz +'</td>';
			tr += 				'</tr>';
			tr += 				'<tr>';
			tr += 					'<td class="table-left">债券起息日</td>';
			tr += 					'<td>'+ list[i].startCalInterestDate +'</td>';
			tr += 					'<td class="table-left">行权类型</td>';
			tr += 					'<td>'+ list[i].exeRightType +'</td>';
			tr += 				'</tr>';
			tr += 				'<tr>';
			tr += 					'<td class="table-left">行权日期</td>';
			tr += 					'<td>'+ list[i].exeRightDate +'</td>';
			tr += 					'<td class="table-left">托管机构</td>';
			tr += 					'<td>'+ list[i].escrowAgent +'</td>';
			tr += 				'</tr>';
			tr += 				'<tr>';
			tr += 					'<td class="table-left">流通范围</td>';
			tr += 					'<td colspan="3">'+ list[i].flowRange +'</td>';
			tr += 				'</tr>';
			tr += 			'</tbody>';
			tr += 		'</table></div>';
            tr += "</td>";
            tr += "</tr>";
        });
        $("#bondInfoList").append(tr);
        $(".bondInfoMod").on("click",function(){
        	$("#myportCredit").find(".modal-title").text("债劵信息");
        	$("#myportCredit").modal();
        	$(".portCredit-content").html($(this).siblings("div").html());
        })
    };
	//抽查检查
   	var spotCheck = function () {
        var _url = "";
        _url = $.kf.GETCOMPANYCHECKS + "?" + "id=" + id + "&page=" + 1;
        var lastPage = 1;
        $.getTable({
	        showDefaultTabel:showDefaultTabel,
        	url:_url,//url
	    	pageId:$("#spotCheckTool"),//分页id
	    	pageNum:10,
	    	callback:spotCheckList,//callback
	    	loadId:".maskInTableCc",
	    	showDataBox:false,
	    	targetId:"jyxx6",
	    	tbodyId:$("#spotCheckList")//tbody的id,
        })
    };
    //抽查检查拼接表格
    var spotCheckList = function (data) {
        var list = data.data;
        var tr = "";
        $("#spotCheckList").html("");
        $(list).each(function (i) {
            tr += "<tr>";
            tr += "<td>" + list[i].date + "</td>";
            tr += "<td>" + list[i].type + "</td>";
            tr += "<td>" + list[i].result + "</td>";
            tr += "<td>" + list[i].agency + "</td>";
            tr += "</tr>";
        });
        $("#spotCheckList").append(tr);
    };
    //司法拍卖
	var judicialAuction = function () {
        var _url = "";
        var id = Query.getHash("id");
        _url = $.kf.GETJUDICIALAUCTION + "?" + "id=" + id + "&page=" + 1;
        var lastPage = 1;
        $.getTable({
	        showDefaultTabel:showDefaultTabel,
        	url:_url,//url
	    	pageId:$("#courtPagePm"),//分页id
	    	pageNum:10,
	    	callback:judicialAuctionList,//callback
	    	currentPage:lastPage,
	    	loadId:".maskInTablPm",
	    	showDataBox:false,
	    	targetId:"fxxx7",
	    	tbodyId:$("#courtListPm")//tbody的id,
        })
        
    };
    //拼接列表
    var judicialAuctionList = function (data) {
        var list = data.data;
        var tr = "";
        $("#courtListPm").html("");
        $(list).each(function (i) {
            tr += "<tr>";
            tr += "<td class='leftIn'>" + list[i].date + "</td>";
            tr += "<td class='leftIn'>" + list[i].court + "</td>";
            tr += "<td class='leftIn'>" + list[i].title + "</td>";
            tr += "<td class='leftIn'><a class='textGl-detail judicial-caseText' data-toggle='modal' data-target='#myModalOut'>查看详情</a><span class='col-hide'>"+ list[i].content +"</span></td>";
            tr += "</tr>";
        });
        $("#courtListPm").append(tr);
        modelCon();
    };