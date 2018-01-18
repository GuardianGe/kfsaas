var DetailDwon = function(){
	var id = Query.getHash("id");
	var industryMassage = function(){
		var _url = $.kf.GETCOMPANYINFOSER + "?" + "id=" + id;
	
        $.kf.ajax({
            type: "get",
            url: _url,
            data: "",
            dataType: "json",
            processResponse: function (data) {
               var obj = data.data;
               industryCommList(data);
            }
        });
	}
	//拼接工商注册信息列表
    var industryCommList = function (data) {
        var list = data.data;
        //写入信息
        //工商信息
        $("#registrationNumber").text(list.registrationNumber);
        $("#organizationCode").text(list.organizationCode);
        $("#creditCode").text(list.creditCode);
        $("#companyType").text(list.companyType);
        $("#taxpayerNumber").text(list.taxpayerNumber);
        $("#industry").text(list.industryName);
        $("#legalRepresentative").text(list.legalRepresentative);
        $("#registeredCapital").text(list.registeredCapital);
        $("#people").text(list.people);
        $("#secretaries").text(list.secretaries);
        $("#tel").text(list.phone);
        $("#operatingStatus").text(list.operatingStatus);
        $("#operatingData").text(list.operatingData);
        $("#approvedDate").text(list.approvedDate);
        $("#registrationAuthority").text(list.registrationAuthority);  
        $("#fax").text(list.tel);
        $("#totalStockEquity").text(list.totalStockEquity);
        $("#english").text(list.english);
        $("#registeredCity").text(list.registeredCity);
        if(!isNullOrEmpty(list.businessScope)){
        	$("#businessCcope").text(list.businessScope.substring(0,278)+'...');
        }else{
        	$(".businessCcope-detail").hide();
        }
        $("#businessCcope").attr("title",list.businessScope)
    };
    //变更记录
    var changeTable = function(){
    	var _urlChange = $.kf.GETCOMPANYCHANGE + "?" + "id=" + id + "&limit=10";
    	var lastPage = 1;
        $.getTable({
        	url:_urlChange,//url
	    	pageId:$("#pageToolStoryTool"),//分页id
	    	pageNum:10,
	    	loadId:".maskInTableStory",
	    	callback:changeList,//callback
	    	currentPage:lastPage,
	    	showDataBox:false,
	    	targetId:"gsxh3",
	    	tbodyId:$("#industryTable")//tbody的id,
        })
    }
    var changeList = function (data) {
        //拼接table
        var change = data.data;
        var tr = "";
        var changeLength = data.total;
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
    //企业评级
	var industryLv = function () {
        var _url = "";
        var id = Query.getHash("id");
        _url = $.kf.GETINDUSTRYRATING + "?" + "id=" + id + "&page=" + 1;
        var lastPage = 1;
        $.getTable({
        	url:_url,//url
	    	pageId:$("#pageToolNine2"),//分页id
	    	loadId:".maskInTablePj",
	    	callback:industryLvList,//callback
	    	currentPage:lastPage,
	    	targetId:"jbxx5",
	    	tbodyId:$("#tableNine2")//tbody的id,
        })
    };
    
     //企业评级callback
    var industryLvList = function (data) {
        var list = data.data;
        var tr = "";
        $("#tableNine2").html("");
        $(list).each(function (i) {
            tr += "<tr>";
            tr += "<td>" + list[i].reportDate + "</td>";
            tr += "<td>" + list[i].researchInstituteShortname + "</td>";
            tr += "<td>" + list[i].reporterName + "</td>";
            tr += "<td>" + list[i].rating + "</td>";
            tr += "<td>" + list[i].lastRating + "</td>";
            tr += "<td style='text-align:left'>" + list[i].reportTitle + "</td>";
            tr += "<td><a class='textGl-detail textGl-hypj' data-toggle='modal' data-target='#myModalOut'>查看详情</a><span class='col-hide'>"+ list[i].content +"</span></td>";
            tr += "</tr>";
        });
        $("#tableNine2").append(tr);
        modelCon();
    };
    //股东信息
	var shareHolder = function (thisDate) {
        var _url  = $.kf.GETCOMPANYSHAREHOLDERNEW + "?" + "id=" + id + "&page=" + 1;
        var lastPage = 1;
        $.getTable({
        	url:_url,//url
	    	pageId:$("#pageGd"),//分页id
	    	callback:shareHolderList,//callback
	    	currentPage:lastPage,
	    	pageNum:10,
	    	showDataBox:false,
	    	targetId:"gsgk2",
	    	loadId:".maskInTableGd",
	    	tbodyId:$("#tableGudong")//tbody的id,
        })
    };
    //股东信息拼接列表
    var shareHolderList = function (data) {
        var list = data.data;
        var tr = "";
        $("#tableGudong").html("");
        $(list).each(function (i) {
            tr += "<tr>";
            if(list[i].type == "个人"){
            	tr += "<td>" + list[i].name + "</td>";
            }else{
            	tr += "<td><a href='"+ $.url.industryUrl() + "id=" + list[i].id +"'>" + list[i].name + "</a></td>";
            }
            /*tr += "<td>" + list[i].type + "</td>";*/
            tr += "<td style='text-align:right'>" + list[i].money + "</td>";
            tr += "<td style='text-align:right'>" + list[i].ratio + "</td>";
            tr += "</tr>";
        });
        $("#tableGudong").append(tr);
    };
	
	//公司年报
	var annualReports = function () {
        var _url  = $.kf.GETYEARLIST + "?" + "id=" + id + "&page=" + 1;
        $.kf.ajax({
            type: "get",
            url: _url,
            data: "",
            dataType: "json",
            processResponse: function (data) {
               annualReportsList(data);
            }
        });
    };
    //股东信息拼接列表
    var annualReportsList = function (data) {
        var list = data.data;
        var tr = "";
        $(".inannualReports").html("");
        $(list).each(function (i) {
            tr += "<li>";
            tr += "<span>"+ list[i].year +"</span>"
            tr += "<a target='_blank' href='" + $.url.newsInfoUrl() + "id=" + list[i].id + '&name=annualReport' + "'>详情 ></a>";
            tr += "</li>";
        });
        $(".inannualReports").append(tr);
    };
	
	
	
	
	
	
	
	
	return{
		industryMassageInit:function(){
			industryMassage();//工商信息
		},
		changeTableInit:function(){
			changeTable();//变更记录
		},
		industryLvInit:function(){
			//industryLv();//企业评级
		},
		shareHolderInit:function(){
			shareHolder();//股东信息
		},
		annualReportsInit:function(){
			annualReports();//企业年报
		}
	}
	
}()
