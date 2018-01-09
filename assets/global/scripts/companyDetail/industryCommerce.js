/*
 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 工商信息
 * 
 * 
 * 
 * 
 * */


var IndustryComp = function () {
    /*
     
     * 
     * 
     * 工商注册信息
     * 
     * 
     * 
     * 
     * */
    //工商注册信息请求地址
    var industryComm = function () {

        var companyName = Query.getHash("companyName");
        var _url = $.kf.GETCOMPANYINFOSER + "?" + "companyName=" + companyName;
        var _url2 = $.kf.GETCOMPANYCHANGE + "?" + "companyName=" + companyName;
        new LoadingAjax($(".maskInAjax"), {}, $("#oneWd")).init();
        $.kf.ajax({
            type: "get",
            url: _url,
            data: "",
            dataType: "json",
            processResponse: function (data) {
                new LoadingAjax($(".maskInAjax"), {}, $("#oneWd")).close();
                var obj = data.data;
                if (isData($(".dataDivOne"), obj, $("#oneWd"))) {
                    industryCommList(data);
                }
                //industryCommList2(data);

                $.kf.ajax({
                    type: "get",
                    url: _url2,
                    data: "",
                    dataType: "json",
                    processResponse: function (data) {
//                        console.log(data.data);
                        var obj = data.data;
                        if (isData($(".dataDiv"), obj, $("#industryTable"))) {
                            industryCommList2(data);
                        }

                    }
                });
            }
        });

    };

    //拼接工商注册信息列表
    var industryCommList = function (data) {
        var list = data.data;
        //写入信息
        getId = list.companyId;
        var tr = "";
        $("#fullCodeName").remove();
        tr += "<li id='fullCodeName'>";
        tr += "	新三板上市股票简称：";
        tr += "	<a href='" + $.url.companyListUrl() + "id=" + getId + "' class='list-color' id=''>";
        tr += "<span id='shortname'></span>";
        tr += "<span id='shortnameCode'></span>";
        tr += "	</a>";
        /*tr += "	<a href='"+$.url.companyListUrl()+"#id="+getId+"' class='list-color' id='shortnameCode'></a>";*/
        tr += "</li>";
        $("#fullCodeNamePar").append(tr);
        if (isNullOrEmpty(list.code)) {
            $("#fullCodeName").hide();
        } else {
            $("#shortname").text(list.shortname).attr({"name": list.code});
            $("#shortnameCode").text("（" + list.code + "）");
        }

        $("#fullname").text(list.fullname);
        $("#registrationNumber").text(list.registrationNumber);
        $("#creditCode").text(list.creditCode);
        $("#organizationCode").text(list.organizationCode);
        $("#operating_status").text(list.operating_status);
        $("#company_type").text(list.company_type);
        $("#registrationDate").text(list.registrationDate);
        $("#legalRepresentative").text(list.legalRepresentative);
        $("#registeredCapital").text(list.registeredCapital);
        $("#operatingData").text(list.operatingData);
        $("#registrationAuthority").text(list.registrationAuthority);
        $("#approvedDate").text(list.approvedDate);
        $("#name").text(list.name);
        $("#industry").text(list.industry);
        $("#address").text(list.address);
        $("#business_scope").text(list.business_scope);



    };
    //变更记录
    var industryCommList2 = function (data) {
        //拼接table
        var change = data.data;
        var tr = "";
        var changeLength = change.length;
        $("#changeLength").text(changeLength);
        $("#industryTable").html("");
        $(change).each(function (i) {
            tr += "<tr>";
            tr += "	<td class='gub-li01'>"
            tr += "		<span  class='gub-icon'>" + (i + 1) + "</span>"
            tr += "		<div>"
            tr += "			<p>变更项目：<span>" + change[i].name + "</span></p>"
            tr += "			<p>变更前：<span title='"+change[i].first+"'>" + change[i].first + "</span></p>"
            tr += "		</div>"
            tr += "	</td>"
            tr += "	<td  class='gub-li01'><div>"
            tr += "		<p>变更日期：<span>" + change[i].date + "</span></p>"
            tr += "		<p>变更后：<span>" + change[i].back + "</span></p>"
            tr += "	</div></td>"
            tr += "</tr>";
        });
        $("#industryTable").append(tr);
    };
    /*
     
     * 
     * 
     * 
     * 公司专利
     * 
     * 
     * 
     * 
     * */

    var compPatent = function () {
        var _url = "";

        var companyName = Query.getHash("companyName");

        _url = $.kf.GETCOMPANYPATENT + "?" + "companyName=" + companyName + "&page=" + 1;

        //new GetTable(_url, $("#compPatentPage"), "", compPatentList, "get", $("#compPatentTable"),"",$(".maskInTablePatent"),false).init();
        var lastPage = Query.getHash("page");
        $.getTable({
        	url:_url,//url
	    	pageId:$("#compPatentPage"),//分页id
	    	callback:compPatentList,//callback
	    	currentPage:lastPage,
	    	loadId:".maskInTablePatent",
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
            tr += "<td class='leftIn'>" + list[i].patentName + "</td>";
            tr += "<td class='leftIn'>" + list[i].patentType + "</td>";
            tr += "<td class='leftIn'>" + list[i].applicationNumber + "</td>";
            tr += "<td class='leftIn'>" + list[i].date + "</td>";
            /* tr += "<td class='leftIn'>" + list[i].abstract + "</td>";*/
            if(isNullOrEmpty(list[i].abstract)){
            	tr += "<td class='leftIn'>--</td>";
            }else{
            	tr += "<td class='leftIn'><a  class='abstractPop'  data-toggle='modal' data-target='#myAbstract'  name='" + list[i].abstract + "' >详情</a></td>";
            }
            tr += "</tr>";
        });
        $("#compPatentTable").append(tr);
        $(".abstractPop").on("click", function () {
            $("#abstract").html("");
            var abstractTxt = $(this).attr("name");
            $("#abstract").html(abstractTxt);
        });
    };
    /*
     
     * 
     *招聘信息
     * 
     * 
     * */

    //招聘信息请求地址
    var recruitment = function () {
        var _url = "";

        var companyName = Query.getHash("companyName");

        _url = $.kf.GETCOMPANYRECRUITMENT + "?" + "companyName=" + companyName + "&page=" + 1;

        //new GetTable(_url, $("#recruitmentPage"), "", recruitmentList, "get", $("#recruitmentTblbe")).init();
        var lastPage = Query.getHash("page");
        $.getTable({
        	url:_url,//url
	    	pageId:$("#recruitmentPage"),//分页id
	    	callback:recruitmentList,//callback
	    	currentPage:lastPage,
	    	tbodyId:$("#recruitmentTblbe")//tbody的id,
        })
    };

    //拼接列表
    var recruitmentList = function (data) {

        var list = data.data;

        var tr = "";
        var th = "<tr><th class='leftIn'>职位</th><th class='leftIn'>职位描述</th><th class='leftIn'>工作地点</th><th class='leftIn'>发布时间</th></tr>"
        $("#recruitmentTblbe").html("");
        $("#recruitmentTblbe").append(th);
        $(list).each(function (i) {

            tr += "<tr>";
            tr += "<td class='leftIn'>" + list[i].job + "</td>";
            tr += "<td>" + list[i].description + "</td>";
            tr += "<td class='leftIn'>" + list[i].city + "</td>";
            tr += "<td class='leftIn'>" + list[i].date + "</td>";
            tr += "</tr>";
        });
        $("#recruitmentTblbe").append(tr);
    };

    /*
     
     * 
     * 
     * 
     * 作品著作权
     * 
     * 
     * 
     * 
     * */

    var compWhite = function () {
        var _url = "";

        var companyName = Query.getHash("companyName");

        _url = $.kf.GETCOMPANYCOPYRIGHT + "?" + "companyName=" + companyName + "&page=" + 1;

        //new GetTable(_url, $("#whitePage"), "", compWhiteList, "get", $("#whiteTable"),"",$(".maskInTableProduct"),false).init();
        var lastPage = Query.getHash("page");
        $.getTable({
        	url:_url,//url
	    	pageId:$("#whitePage"),//分页id
	    	callback:compWhiteList,//callback
	    	currentPage:lastPage,
	    	loadId:".maskInTableProduct",
	    	showDataBox:false,
	    	tbodyId:$("#whiteTable")//tbody的id,
        })
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

    /*
     
     * 
     * 
     * 
     * 软件作权
     * 
     * 
     * 
     * 
     * */

    var compCopyright = function () {
        var _url = "";

        var companyName = Query.getHash("companyName");

        _url = $.kf.GETCOMPANYSOFTWARECOPYRIGHT + "?" + "companyName=" + companyName + "&page=" + 1;

        //new GetTable(_url, $("#productPage"), "", compCopyrightList, "get", $("#productTable"),"",$(".maskInTableSoft"),false).init();
        var lastPage = Query.getHash("page");
        $.getTable({
        	url:_url,//url
	    	pageId:$("#productPage"),//分页id
	    	callback:compCopyrightList,//callback
	    	currentPage:lastPage,
	    	loadId:".maskInTableSoft",
	    	showDataBox:false,
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
            tr += "<a class='softWall'  registerTime='"+list[i].registerTime+"' fullName='"+list[i].fullName+"'  sday='"+list[i].sday+"'  country='"+list[i].country+"'  copyrightOwner='"+list[i].copyrightOwner+"'  successDate='"+list[i].successDate+"'  classificationNumber='"+list[i].classificationNumber+"' versionNumber='"+list[i].versionNumber+"'  href='#mySoftWall' data-toggle='modal'>详情</a>";
            tr += "</td>";
            tr += "</tr>";
        });
        $("#productTable").append(tr);
        
        $(".softWall").on("click",function(){
        	$("#privateList").html("");
	       	var tr = '';
	       	tr += "<tr>";
            tr += "<td class=''>软件全称：" + $(this).attr("fullName") + "</td>";
            tr += "</tr>";
            tr += "<tr>";
            tr += "<td class='' >著作权人：" + $(this).attr("copyrightOwner") + "</td>";
            tr += "</tr>";
            tr += "<tr>";
            tr += "<td class=''>国籍：" + $(this).attr("country") + "</td>";
            tr += "</tr>";
            tr += "<tr>";
            tr += "<td class=''>首次发表日期：" + $(this).attr("sday") + "</td>";
            tr += "</tr>";
            tr += "<tr>";
            tr += "<td class=''>登记日期：" + $(this).attr("registerTime") + "</td>";
            tr += "</tr>";
            tr += "<tr>";
            tr += "<td class=''>著作权登记批准日期：" + $(this).attr("successDate") + "</td>";
            tr += "</tr>";
            tr += "<tr>";
            tr += "<td class=''>分类号：" + $(this).attr("classificationNumber") + "</td>";
            tr += "</tr>";
            tr += "<tr>";
            tr += "<td class=''>版本号：" + $(this).attr("versionNumber") + "</td>";
            tr += "</tr>";
	        
	        $("#privateList").append(tr);
        });
        
    };
    /*
     
     * 
     * 
     * 域名备案
     * 
     * 
     * 
     * 
     * 
     * */
    var recordInformation = function () {
        var _url = "";
        var companyName = Query.getHash("companyName");
        _url = $.kf.GETCOMPANYDOMAIN + "?" + "companyName=" + companyName + "&page=" + 1;
        //new GetTable(_url, $("#recordPage"), "", recordList, "get", $("#recordList")).init();
        var lastPage = Query.getHash("page");
        $.getTable({
        	url:_url,//url
	    	pageId:$("#recordPage"),//分页id
	    	callback:recordList,//callback
	    	currentPage:lastPage,
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
            tr += "<td>" + list[i].recordNumber + "</td>";
            tr += "<td>" + list[i].operatingStatus + "</td>";
            tr += "<td>" + list[i].type + "</td>";
            tr += "</tr>";
        });
        $("#recordList").append(tr);
    };
    /*
     * 
     * 
     * 
     * 风险信息
     * 
     * 
     * 
     * 
     * */

    var CompDishonesty = function () {
        var _url = "";

        var companyName = Query.getHash("companyName");

        _url = $.kf.GETCOMPANYDISHONESTY + "?" + "companyName=" + companyName + "&page=" + 1;

        //new GetTable(_url, $("#DisListPage"), "", CompDishonestyList, "get", $("#compDisList")).init();
        var lastPage = Query.getHash("page");
        $.getTable({
        	url:_url,//url
	    	pageId:$("#DisListPage"),//分页id
	    	callback:CompDishonestyList,//callback
	    	currentPage:lastPage,
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
            tr += "<td class='leftIn'>" + list[i].caseNumber + "</td>";
            tr += "<td class='leftIn'>" + list[i].registerDate + "</td>";
            tr += "<td class='leftIn'><a href='javascript:void(0)'>" + list[i].basisCaseNumber + "</a></td>";
            tr += "<td class='leftIn'>" + list[i].courtName + "</td>";
            tr += "<td class='leftIn'>" + list[i].performance + "</td>";
            tr += "<td class='leftIn'>" + list[i].dishonestyBehavior + "</td>";
            tr += "<td class='leftIn'><span>" + list[i].judicialText + "</span></td>";
            tr += "</tr>";
        });
        $("#compDisList").append(tr);
    };

    /*
     
     * 
     * 
     * 
     * 司法信息
     * 
     * 
     * 
     * 
     * */

    var courtMsg = function () {
    	
        var _url = "";

        var companyName = Query.getHash("companyName");

        _url = $.kf.GETCOMPANYCASE + "?" + "companyName=" + companyName + "&page=" + 1;

        //new GetTable(_url, $("#courtPage"), "", courtMsgList, "get", $("#courtList")).init();
        var lastPage = Query.getHash("page");
        $.getTable({
        	url:_url,//url
	    	pageId:$("#courtPage"),//分页id
	    	callback:courtMsgList,//callback
	    	currentPage:lastPage,
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
            tr += "<td class='leftIn'>" + list[i].caseNumber + "</td>";
            tr += "<td class='leftIn'><span>" + list[i].caseTitle + "</span></td>";
            tr += "<td class='leftIn'>" + list[i].courtName + "</td>";
            tr += "</tr>";
        });
        $("#courtList").append(tr);
    };
    //股东信息

    var holdersInfo = function () {
        var _url = "";
        var companyName = Query.getHash("companyName");
        _url = $.kf.GETSHAREHOLDERSINFO + "?" + "companyName=" + companyName + "&page=" + 1;
        //new GetTable(_url, $("#shareholdersPage"), "", shareholdersList, "get", $("#shareholdersTblbe")).init();
        var lastPage = Query.getHash("page");
        $.getTable({
        	url:_url,//url
	    	pageId:$("#shareholdersPage"),//分页id
	    	callback:shareholdersList,//callback
	    	currentPage:lastPage,
	    	tbodyId:$("#shareholdersTblbe")//tbody的id,
        })
    };
    //拼接列表
    var shareholdersList = function (data) {

        var list = data.data;
        var tr = "";
        $("#shareholdersTblbe").html("");
        $(list).each(function (i) {
            tr += "<tr>";
            if (list[i].type == '个人') {
                tr += "<td class='leftIn'>" + list[i].name + "</td>";
            } else {
                tr += "<td class='leftIn'><a class='shareholdersMan' href='" + $.url.industryUrl() + "companyName=" + list[i].name + "'>" + list[i].name + "</a></td>";
            }
            tr += "<td class='leftIn'>" + list[i].type + "</td>";
            tr += "<td class='leftIn'>" + list[i].money + "</td>";
            tr += "<td class='leftIn'>" + list[i].proportion + "</td>";
            tr += "</tr>";
        });
        $("#shareholdersTblbe").append(tr);
        //扣费跳转
        var isCookie = false;
        moneyUrl($(".shareholdersMan"), isCookie, "isCookie");
    };
    /*
     
     * 
     *公司對外投資
     * 
     * 
     * */

    //对外投资请求地址
    var outInvest = function () {
        var _url = "";

        var companyName = Query.getHash("companyName");

        _url = $.kf.GETINVESTMENTCOMPANY + "?" + "companyName=" + companyName + "&page=" + 1;

        //new GetTable(_url, $("#investPageVest"), "", outInvestList, "get", $("#tableInvest")).init();
        var lastPage = Query.getHash("page");
        $.getTable({
        	url:_url,//url
	    	pageId:$("#investPageVest"),//分页id
	    	callback:outInvestList,//callback
	    	currentPage:lastPage,
	    	tbodyId:$("#tableInvest")//tbody的id,
        })
    };

    //拼接列表
    var outInvestList = function (data) {

        var list = data.data;

        var tr = "";
        var th = "<tr><th>投资方</th><th>被投方</th></tr>"
        $("#tableInvest").html("");
        $("#tableInvest").append(th);
        $(list).each(function (i) {
            tr += "<tr>";
            tr += "<td>";
            tr += "<span>" + list[i].name + "</span>";
            tr += "</td>";
            tr += "<td><a class='industry02s' href='" + $.url.industryUrl() + "companyName=" + list[i].investedName + "'>" + list[i].investedName + "</a></td>";
            tr += "</tr>";
        });
        $("#tableInvest").append(tr);
        //扣费跳转
        var isCookie = false;
        moneyUrl($(".industry02s"), isCookie, "isCookie");
    };
    
    /*
     
     * 
     *分支机构
     * 
     * 
     * */

    //分支机构请求地址
    var branchOffice = function () {
        var _url = "";

        var companyName = Query.getHash("companyName");

        _url = $.kf.COMPANYBRANCH + "?" + "id=" + companyName + "&page=" + 1;

        //new GetTable(_url, $("#investPage"), "", branchOfficeList, "get", $("#childCom")).init();
        var lastPage = Query.getHash("page");
        $.getTable({
        	url:_url,//url
	    	pageId:$("#investPage"),//分页id
	    	callback:branchOfficeList,//callback
	    	currentPage:lastPage,
	    	tbodyId:$("#childCom")//tbody的id,
        })
    };

    //拼接列表
    var branchOfficeList = function (data) {
		
        var list = data.data;
        if(isNullOrEmpty(list)){
        	funNoData($("#childCom"))
        }else{
			var tr = "";
	        $("#childCom").html("");
	        $(list).each(function (i) {
	            if (list[i].type = "0") {
	                tr += "<li><a class='basicName' title='"+list[i].name+"' data-name='" + list[i].name + "' href='" + $.url.industryUrl() + 'companyName=' + list[i].name + "'>" + list[i].name + "</a></li>";
	            } else {
	                tr += "<li><a  title='"+list[i].name+"'  href='" + $.url.companyListUrl() + 'id=' + list[i].id + "'>" + list[i].name + "</a></li>";
	            }
	        });
	        $("#childCom").append(tr);
	        //扣费跳转
	        var isCookie = false;
	        moneyUrl($(".industry02s"), isCookie, "isCookie");
		}
    };
	var indComUrl = function(_flg){
		var _flg = _flg;
		if (_flg == "tab_0") {
            $(".mask-in").remove();
            $(".maskInAjax").height("auto");
            $("#noOutData").remove();
            industryComm();//工商注册信息
        }
        ;
        if (_flg == "tab_1") {
            $(".mask-in").remove();
            $(".maskInTable").height("auto");
            CompDishonesty();//风险信息
        }
        ;
        if (_flg == "tab_2") {
            $(".mask-in").remove();
            $(".maskInTable").height("auto");
            courtMsg();//司法信息
        }
        ;
        if (_flg == "tab_3") {
            $(".mask-in").remove();
            $(".maskInTable").height("auto");
            Roll.init();//商标信息
            compPatent();//公司专利
            compCopyright();//作品权
            compWhite();//作品著作权
        }
        ;
        if (_flg == "tab_7") {
            $(".mask-in").remove();
            $(".maskInTable").height("auto");
            recordInformation();//域名备案
        }
        ;
        if (_flg == "tab_4") {
            $(".mask-in").remove();
            $(".maskInTable").height("auto");
            outInvest();//对外投资
        }
        ;
        if (_flg == "tab_8") {
            $(".mask-in").remove();
            $(".maskInTable").height("auto");
            branchOffice();//分支机构
        }
        ;
        if (_flg == "tab_5") {
            $(".mask-in").remove();
            $(".maskInTable").height("auto");
            recruitment();//招聘信息
        }
        ;
        if (_flg == "tab_6") {
            $(".mask-in").remove();
            $(".maskInTable").height("auto");
            holdersInfo(); //股东信息
        }
	}
    var indComTab = function(){
    	$(".overLi-btn-link").find("a").on("click", function () {
    		var companyName = Query.getHash("companyName");
            var _leg = $(this).attr('href');
            _leg = _leg.split("_")[1];
            pushUrlState("_"+_leg,{"companyName":companyName});
            indComUrl("tab_"+_leg);
        });
        //刷新
		var _leg = Query.getHash("currentTab");
		if(isNullOrEmpty(_leg)){
			_leg = 'tab_0';
		}
		indComUrl(_leg);
		if(isNullOrEmpty(_leg)){
			_leg = '#tab_0';
		}else{
			_leg = "#" + _leg;
		}
		$(".overLi-btn-link").find("a").each(function(){
			if($(this).attr("href") == _leg){
				$(this).parent().addClass("active").siblings().removeClass("active");
				$(_leg).addClass("active").siblings().removeClass("active");
			}
		})
    }
    return {
        init: function () {
        	indComTab()//tab切换
        }
    }

}();








/*
 
 * 
 * 
 * 
 * 
 * 
 * 版权轮播
 * 
 * 
 * 
 * 
 * 
 * */
var Roll = function () {
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
	    //商标信息
    var rollAjax = function () {
        var companyName = Query.getHash("companyName");
        var _url = $.kf.GETCOMPANYTRADEMARK + "?" + "companyName=" + companyName;
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
                //console.log(isData($(".box_con"),obj));
                if (isData($(".box_con"), obj, "")) {
                    $(".lists_left_btn").show();
                    $(".lists_right_btn").show();
                    rollList(data);
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
             tr += "	<div class='listMoveDiv'>";
            tr += "		<span>类别编号：</span>";
            tr += "		<span>" + list[i].categoryNumber + "</span>";
            tr += "	</div>";
             tr += "	<div class='listMoveDiv'>";
            tr += "		<span class='listMoveType' data-toggle='tooltip' data-placement='top' title=" + list[i].trademarkType + ">商标类型：" + list[i].trademarkType + "</span>";
            tr += "	</div>";
            tr += "	<div class='listMoveDiv'>";
            tr += "		<span>状态：</span>";
            tr += "		<span class='disBok'  data-toggle='tooltip' data-placement='top' title=" + list[i].trademarkStatus + ">" + list[i].trademarkStatus + "</span>";
            tr += "	</div>";
            tr += "	<img src='" + list[i].url + "'>";
            tr += "</li>";
        });
        $(".j_ul_lists").append(tr);
        $("[data-toggle='tooltip']").tooltip();
        rollTim($(".lists_left_btn"),$(".lists_right_btn"),$(".j_ul_lists"),320);
    };
    rollTim($(".lists_left_btn"),$(".lists_right_btn"),$(".j_ul_lists"),320);
    return {
        init: function () {
            rollAjax();
        }
    }
}();



