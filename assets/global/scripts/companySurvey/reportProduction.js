/******
 
 UPDATE DATE:2017/4/12
 NAV:企业调查
 NAME:WANGJH
 
 ******/


/************************************报告制作****************************************/
var reportProduction = function () {
    
    //报告引导
    var basicInformation = function () {
    	var tmp_name = '';
    	var rp_id = Query.getHash("rp_id");
        var tmp_id = Query.getHash("tmp_id");
    	/*var tmp_name = decodeURI(Query.getHash("templateName"));
    	if(!isNullOrEmpty(tmp_name)){
    		$("#tempName").val(tmp_name);
    	}*/
    	$("#tempName").blur(function(){
    		tmp_name = trimAll($(this).val());
    	});
    	$("#tempName").keyup(function(){
    		if($(this).val().length >= 30){
    			$("#errorTip").text("最多可以输入30个字符");
    		}else{
    			$("#errorTip").text("");
    		}
    	})
    	//导航
    	$.kf.ajax({
            type: "get",
            url: $.kf.REPORTMODULECHECK + "?rp_id="+ rp_id +"&tmp_id="+ tmp_id,
            data: "",
            dataType: "json",
            processResponse: function (data) {
            	var tr = '';
                var dataList = data.data.body;
                tmp_name = data.data.tmpName;
                $("#tempName").val(tmp_name);
                $(dataList).each(function(i){
                	tr += "<li current_name='"+ dataList[i] +"'><a href='javascript:void(0)'>"+ dataList[i] +"</a></li>";
                	$(".productionCon").each(function(j){
                		if($(this).attr("conname") == dataList[i]){
                			$(this).addClass("have");
                		}
                	});
                })
                $(".tabLi").append(tr);
                $(".tabLi li").eq(0).addClass("active");
                
                //判断当前对应的内容
                $(".productionCon").each(function(){
                	if($(this).attr("conName") == $(".tabLi li").eq(0).attr("current_name")){
                		$(this).removeClass("hide");
                	}
                })
                
                //tab切换
		        $(".tabLi li").on("click",function(){
		        	$(this).addClass("active").siblings("li").removeClass("active")
		        	var curName = $(this).attr("current_name");
		        	$(".productionCon").each(function(){
		        		if($(this).attr("conName") == curName){
		        			$(this).removeClass("hide");
		        			$(this).siblings("div").addClass("hide");
		        		}
		        	})
		        })
            }
        });
    	
        
        //基本公司信息
        $.kf.ajax({
            type: "get",
            url: $.kf.REPORTCOMPANYINFO + "?rp_id="+ rp_id +"&tmp_id="+ tmp_id,
            data: "",
            dataType: "json",
            processResponse: function (data) {
                var dataList = data.data;
                if(isNullOrEmpty(dataList)){
                	$(".basicMes").hide();
                }else{
                	$(".basicDate").text(dataList.updateDate);
	                $(".re1").eq(0).html("<span style='padding-left:3px;'>"+dataList.code+"</span>");
	                $(".re1").eq(1).val(dataList.limitedDate).attr("value",dataList.limitedDate);
	                $(".re1").eq(2).val(dataList.shortname).attr("value",dataList.shortname);
	                $(".re1").eq(3).val(dataList.sharesDate).attr("value",dataList.sharesDate);
	                $(".re1").eq(4).val(dataList.transaction).attr("value",dataList.transaction);
	                $(".re1").eq(5).val(dataList.mode).attr("value",dataList.mode);
	                $(".re1").eq(6).val(dataList.transfer).attr("value",dataList.transfer);
	                $(".re1").eq(7).val(dataList.belongs).attr("value",dataList.belongs);
	                $(".re1").eq(8).val(dataList.capital).attr("value",dataList.capital);
	                $(".re1").eq(9).val(dataList.earningsDate).attr("value",dataList.earningsDate);
	                $(".re1").eq(10).val(dataList.companyName).attr("value",dataList.companyName);
	                $(".re1").eq(11).text(dataList.mainBusiness).attr("value",dataList.mainBusiness);
	                $(".re1").eq(12).text(dataList.businessScope).attr("value",dataList.businessScope);
	                $(".re1").eq(13).val(dataList.industry).attr("value",dataList.industry);
	                $(".re1").eq(14).val(dataList.industryCode).attr("value",dataList.industryCode);
	                $(".re1").eq(15).val(dataList.number).attr("value",dataList.number);
	                $(".re1").eq(16).val(dataList.listingDate).attr("value",dataList.listingDate);
	                $(".re1").eq(17).val(dataList.officeAddress).attr("value",dataList.officeAddress);
	                $(".re1").eq(18).val(dataList.registeredAddress).attr("value",dataList.registeredAddress);
	                $(".re1").eq(19).val(dataList.remarks).attr("value",dataList.remarks);
                }
            }
        });
        
        //中介机构信息
        $.kf.ajax({
            type: "get",
            url: $.kf.REPORTINTERMEDIARYINFO + "?rp_id="+ rp_id +"&tmp_id="+ tmp_id,
            data: "",
            dataType: "json",
            processResponse: function (data) {
                var dataList = data.data;
                if(isNullOrEmpty(dataList)){
                	$(".basicMes2").hide();
                }else{
	                $(".basicDate2").text(dataList.updateDate);
	                $(".re01").eq(0).val(dataList.secompanyName).attr("value",dataList.secompanyName);
	                $(".re01").eq(1).val(dataList.secompanyPersonnel).attr("value",dataList.secompanyPersonnel);
	                $(".re01").eq(2).val(dataList.accounting).attr("value",dataList.accounting);
	                $(".re01").eq(3).val(dataList.accountingPersonnel).attr("value",dataList.accountingPersonnel);
	                $(".re01").eq(4).val(dataList.law).attr("value",dataList.law);
	                $(".re01").eq(5).val(dataList.lawPersonnel).attr("value",dataList.lawPersonnel);
	                $(".aboutmeOne1").val(dataList.remarks).attr("value",dataList.remarks);
	            }
            }
        });
        
        //资质/专利信息
        $.kf.ajax({
            type: "get",
            url: $.kf.REPORTPATENTINFO + "?rp_id="+ rp_id +"&tmp_id="+ tmp_id,
            data: "",
            dataType: "json",
            processResponse: function (data) {
                var dataList = data.data;
                if(isNullOrEmpty(dataList)){
                	$(".basicMes3").hide();
                }else{
	                $(".basicDate3").text(dataList.updateDate);
	                $(".re001").eq(0).val(dataList.patent).attr("value",dataList.patent);
	                $(".re001").eq(1).val(dataList.softwareCopyright).attr("value",dataList.softwareCopyright);
	                $(".re001").eq(2).val(dataList.utilityModelPatents).attr("value",dataList.utilityModelPatents);
	                $(".re001").eq(3).val(dataList.related).attr("value",dataList.related);
	                $(".re001").eq(4).val(dataList.designPatent).attr("value",dataList.designPatent);
	                $(".re001").eq(5).val(dataList.enterprises).attr("value",dataList.enterprises);
	                $(".re001").eq(6).val(dataList.remarks).attr("value",dataList.remarks);
	            }
            }
        });
        
        //联系情况
        $.kf.ajax({
            type: "get",
            url: $.kf.REPORTCONTACTSITUATION + "?rp_id="+ rp_id +"&tmp_id="+ tmp_id,
            data: "",
            dataType: "json",
            processResponse: function (data) {
                var dataList = data.data;
                if(isNullOrEmpty(dataList)){
                	$(".basicMes4").hide();
                }else{
	                if(!isNullOrEmpty(dataList.contactScene)){
	                	$("#concatRadio input:radio").eq(dataList.contactScene).attr('checked', 'checked');	
	                	$(".re0001").attr("value",dataList.name);
	                	$(".re0002").attr("value",dataList.job);
	                	$(".re0003").attr("value",dataList.tel);
	                }
	            }
            }
        });
        
        //var ue = UE.getEditor('editor');
        var ue = UE.getEditor('editor', {
			toolbars: []
	    });
        /////////////////////////风险提示////////////////////////////////
        //风险提示
        $.kf.ajax({
            type: "get",
            url: $.kf.REPORTRISKWARNING + "?rp_id="+ rp_id +"&tmp_id="+ tmp_id,
            data: "",
            dataType: "json",
            processResponse: function (data) {
                var dataList = data.data;
                if(isNullOrEmpty(dataList)){
                	$(".riskTip").hide();
                }else{
	                $(".basicDate4").text(dataList.upadateDate);
	                $(".ae1").text(dataList.content);
					ue.ready(function() {
						ue.setContent(dataList.content, false);
					});
	                $(".ae2").val(dataList.remarks).attr("value",dataList.remarks);
	            }
            }
        });
        
        //过往处罚情况
        $.kf.ajax({
            type: "get",
            url: $.kf.REPORTPENALTIES + "?rp_id="+ rp_id +"&tmp_id="+ tmp_id,
            data: "",
            dataType: "json",
            processResponse: function (data) {
                var dataList = data.data.body;
                var dataC = data.data;
                if(isNullOrEmpty(dataC)){
                	$(".riskTip2").hide();
                }else{
	                var tr = "";
	                $(".basicDate5").text(data.data.updateDate);
	                $(".remarksC").text(data.data.remarks)
	                $(dataList).each(function(i){
	                	tr += "<tr>";
	                	tr += "<td>" + dataList[i].introduction + "</td>";
	                	tr += "<td style='text-align:center'>"+ dataList[i].announcementDateType +"</td>";
	                	tr += "<td style='text-align:center'>" + dataList[i].announcementDate + "</td>";
	                	tr += "</tr>";
	                })
	                $("#pastPenaltiesList").append(tr)
	            }
            }
        });
        
        
        
        /////////////////////////人员信息////////////////////////////////
        //管理层信息
        $.kf.ajax({
            type: "get",
            url: $.kf.REPORTINFORMATION + "?rp_id="+ rp_id +"&tmp_id="+ tmp_id,
            data: "",
            dataType: "json",
            processResponse: function (data) {
                var dataList = data.data.body;
                var dataC = data.data;
                if(isNullOrEmpty(dataC)){
                	$(".perInformation").hide();
                }else{
	                var tr = "";
	                $(".rb").text(data.data.updateDate);
	                $(".remarksDC").val(data.data.remarks).attr("value",data.data.remarks);
	                $(dataList).each(function(i){
	                	tr += "<tr>";
	                	tr += "<td><input type='text' value='"+ dataList[i].executiveName +"' /></td>";
	                	tr += "<td><input type='text' value='"+ dataList[i].job +"' /></td>";
	                	if(dataList[i].sex == "男"){
	                		tr += "<td style='text-align:center;padding:0;'><select class='selectReport'>";
		            		tr += 		"<option>男</option>";
		            		tr += 		"<option>女</option>";
		            		tr += "</select><span>男</span></td>";
	                	}else{
	                		tr += "<td style='text-align:center;padding:0;'><select class='selectReport'>";
		            		tr += 		"<option>女</option>";
		            		tr += 		"<option>男</option>";
		            		tr += "</select><span>女</span></td>";
	                	}
	                	tr += "<td><input class='text-center' type='text' value='"+ dataList[i].term +"' /></td>";
	                	tr += "<td><textarea rows='2' type='text' value='"+ dataList[i].remarks +"'>"+ dataList[i].remarks +"</textarea></td>";
	                	tr += "</tr>";
	                })
	                $("#reportInformation").append(tr);
	                $(".selectReport").show();
	                $(".selectReport").parent().find("span").hide();
	                $(".selectReport").on("change",function(){
	                	$(this).parent().find("span").text($(this).find("option:selected").text());
	                });
	                reportInformation();
	            }
            }
        });
        
        //高管简介
        $.kf.ajax({
            type: "get",
            url: $.kf.REPORTINFORMATIONINFO + "?rp_id="+ rp_id +"&tmp_id="+ tmp_id,
            data: "",
            dataType: "json",
            processResponse: function (data) {
                var dataList = data.data.body;
                var dataC = data.data;
                if(isNullOrEmpty(dataC)){
                	$(".perInformation").hide();
                }else{
	                var tg = "";
	                $(".rb3").text(data.data.updateDate);
	                $(".remarksD2").val(data.data.remarks).attr("value",data.data.remarks);
	                $(dataList).each(function(i){
	                	tg += "<tr>";
	                	tg += "<td><input type='text' value='"+ dataList[i].executiveName +"' /></td>";
	                	tg += "<td><textarea rows='3' type='text' value=''>"+ dataList[i].introduction +"</textarea></td>";
	                	tg += "</tr>";
	                })
	                $("#executiveInfor").append(tg);
	                managementIntroduction();
	            }
            }
        });
        
        
        /////////////////////////财务指标////////////////////////////////
        //财务数据
        $.kf.ajax({
            type: "get",
            url: $.kf.REPORTINDICATOR + "?rp_id="+ rp_id +"&tmp_id="+ tmp_id,
            data: "",
            dataType: "json",
            processResponse: function (data) {
                var dataList = data.data.body;
                var dataC = data.data;
                if(isNullOrEmpty(dataList)){
                	$(".finDate").find("table").hide();
                }else{
                	var tr = "";
	                $(".unit").text(data.data.unit);
	                $(".rbb3").text(data.data.updateDate);
	                $(".remarksF").val(data.data.remarks);
	                $(dataList).each(function(i){
	                	tr += "<tr>";
	                	tr += "<td style='line-height:38px' class='textR'><b>"+ dataList[i].date +"</b></td>";
	                	tr += "<td><input class='textRight' type='text' value='"+ dataList[i].totalEquity +"' /></td>";
	                	tr += "<td><input class='textRight' type='text' value='"+ dataList[i].totalShareCapital +"' /></td>";
	                	tr += "<td><input class='textRight' type='text' value='"+ dataList[i].totalOperatingIncome +"' /></td>";
	                	tr += "<td><input class='textRight' type='text' value='"+ dataList[i].netProfit +"' /></td>";
	                	tr += "<td><input class='textRight' type='text' value='"+ dataList[i].netProfitRate +"' /></td>";
	                	tr += "<td><input class='textRight' type='text' value='"+ dataList[i].netPrfCut +"' /></td>";
	                	tr += "<td><input class='textRight' type='text' value='"+ dataList[i].assetLiabilityRatio +"' /></td>";
	                	tr += "<td><input class='textRight' type='text' value='"+ dataList[i].salesGrossMargin +"' /></td>";
	                	tr += "<td><input class='textRight' type='text' value='"+ dataList[i].earningsPerShare +"' /></td>";
	                	tr += "<td><input class='textRight' type='text' value='"+ dataList[i].netAssetsPerShare +"' /></td>";
	                	tr += "<td><input class='textRight' type='text' value='"+ dataList[i].capitalPerShare +"' /></td>";
	                	tr += "<td><input class='textRight' type='text' value='"+ dataList[i].undistributedProfit +"' /></td>";
	                	tr += "<td><input class='textRight' type='text' value='"+ dataList[i].stock +"' /></td>";
	                	tr += "<td><input class='textRight' type='text' value='"+ dataList[i].moneyFund +"' /></td>";
	                	tr += "<td><input class='textRight' type='text' value='"+ dataList[i].accountsReceivable +"' /></td>";
	                	tr += "<td><input class='textRight' type='text' value='"+ dataList[i].netCashFlowOperating +"' /></td>";
	                	tr += "<td><input class='textRight' type='text' value='"+ dataList[i].netCashFlowInvesting +"' /></td>";
	                	tr += "<td><input class='textRight' type='text' value='"+ dataList[i].netCashFlowFinancing +"' /></td>";
	                	tr += "</tr>";
	                })
	                $("#financialData").append(tr);
	                financialData();
                }
            }
        });
        
        
        /////////////////////////商业分析////////////////////////////////
        //营收情况
        $.kf.ajax({
            type: "get",
            url: $.kf.REPORTREVENUESITUATION + "?rp_id="+ rp_id +"&tmp_id="+ tmp_id,
            data: "",
            dataType: "json",
            processResponse: function (data) {
                var dataList = data.data.body;
                var dataC = data.data;
                if(isNullOrEmpty(dataC)){
                	$(".busAnalysis").hide();
					$(".businessTime").text("--");
	                $(".businessTime2").text("--");
                }else{
	                var tr = "";
	                $(".rbbb").text(data.data.updateDate);
	                $(".remarksG").val(data.data.remarks);
	                if(!isNullOrEmpty(data.data.newDate)){
	                	$(".businessTime").text(data.data.newDate);
	                }else{
	                	$(".businessTime").text("--");
	                }
	                if(!isNullOrEmpty(data.data.oldDate)){
	                	$(".businessTime2").text(data.data.oldDate);
	                }else{
	                	$(".businessTime2").text("--");
	                }
	                $(dataList).each(function(i){
	                	tr += "<tr>";
	                	if(dataList[i].productType == "合计"){
	                		tr += "<td class='textR'><b>"+ dataList[i].productType +"</b></td>";
	                	}else{
	                		tr += "<td><input class='textL' type='text' value='"+ dataList[i].productType +"' /></td>";
	                	}
	                	tr += "<td><input class='textRight' type='text' value='"+ dataList[i].newDate +"' /></td>";
	                	tr += "<td><input type='text' value='"+ dataList[i].newRatio +"' /></td>";
	                	tr += "<td><input class='textRight' type='text' value='"+ dataList[i].oldDate +"' /></td>";
	                	tr += "<td><input type='text' value='"+ dataList[i].oldRatio +"' /></td>";
	                	tr += "</tr>";
	                })
	                $("#revenueSituationList").append(tr);
	                revenueSituation()
	            }
            }
        });
        
        //前五客户情况
        $.kf.ajax({
            type: "get",
            url: $.kf.REPORTCUSTOMERSITUATION + "?rp_id="+ rp_id +"&tmp_id="+ tmp_id,
            data: "",
            dataType: "json",
            processResponse: function (data) {
                var dataList = data.data.body;
                var dataC = data.data;
                if(isNullOrEmpty(dataC)){
                	$(".busAnalysis2").hide();
                }else{
	                var tr = "";
	                $(".rbbb2").text(data.data.updateDate);
	                $(".remarksH").val(data.data.remarks);
	                $(dataList).each(function(i){
	                	tr += "<tr>";
	                	tr += "<td style='color:#999;text-align:center'>"+ dataList[i].date +"</td>";
	                	if(dataList[i].supplierName == "合计"){
	                		tr += "<td class='textR'><b>"+ dataList[i].supplierName +"</b></td>";
	                	}else{
	                		tr += "<td><input class='textL' type='text' value='"+ dataList[i].supplierName +"' /></td>";
	                	}
	                	tr += "<td><input class='textRight' type='text' value='"+ dataList[i].purchaseAmount +"' /></td>";
	                	tr += "<td><input type='text' value='"+ dataList[i].ratio +"' /></td>";
	                	tr += "</tr>";
	                })
	                $("#firstFiveHappeningList").append(tr);
	                firstFiveHappening();
	            }
            }
        });
        
        //前五供应商情况
        $.kf.ajax({
            type: "get",
            url: $.kf.REPORTSUPPLIERSITUATION + "?rp_id="+ rp_id +"&tmp_id="+ tmp_id,
            data: "",
            dataType: "json",
            processResponse: function (data) {
                var dataList = data.data.body;
                var dataC = data.data;
                if(isNullOrEmpty(dataC)){
                	$(".busAnalysis3").hide();
                }else{
	                var tr = "";
	                $(".rbbb3").text(data.data.updateDate);
	                $(".remarksI").val(data.data.remarks);
	                $(dataList).each(function(i){
	                	tr += "<tr>";
	                	tr += "<td style='color:#999;text-align:center'>"+ dataList[i].date +"</td>";
	                	if(dataList[i].supplierName == "合计"){
	                		tr += "<td class='textR'><b>"+ dataList[i].supplierName +"</b></td>";
	                	}else{
	                		tr += "<td><input class='textL' type='text' value='"+ dataList[i].supplierName +"' /></td>";
	                	}
	                	tr += "<td><input class='textRight' type='text' value='"+ dataList[i].purchaseAmount +"' /></td>";
	                	tr += "<td><input type='text' value='"+ dataList[i].ratio +"' /></td>";
	                	tr += "</tr>";
	                })
	                $("#firstFiveSupplierList").append(tr);
	                firstFiveSupplier();
	            }
            }
        });
        
        //商业模式
        var ue2 = UE.getEditor('editor2', {
			toolbars: []
	    });
        $.kf.ajax({
            type: "get",
            url: $.kf.REPORTBUSINESSMODEL + "?rp_id="+ rp_id +"&tmp_id="+ tmp_id,
            data: "",
            dataType: "json",
            processResponse: function (data) {
                var dataList = data.data;
                if(isNullOrEmpty(dataList)){
                	$(".busAnalysis4").hide();
                }else{
	                $(".datJ").text(data.data.updateDate);
	                ue2.ready(function() {
						ue2.setContent(dataList.content, false);
					});
	                $(".remarksJ").val(data.data.remarks);
	            }
            }
        });
        
        //同商业模式企业
        $.kf.ajax({
            type: "get",
            url: $.kf.REPORTBUSINESSWITH + "?rp_id="+ rp_id +"&tmp_id="+ tmp_id,
            data: "",
            dataType: "json",
            processResponse: function (data) {
                var dataList = data.data.body;
                var dataC = data.data;
                if(isNullOrEmpty(dataC)){
                	$(".busAnalysis5").hide();
                }else{
	                var tr = "";
	                $(".datK").text(data.data.updateDate);
	                $(".remarksK").val(data.data.remarks);
	                $(dataList).each(function(i){
	                	tr += "<tr>";
	                	tr += "<td><input type='text' value='"+ dataList[i].code +"' /></td>";
	                	tr += "<td><input type='text' value='"+ dataList[i].name +"' /></td>";
	                	tr += "</tr>";
	                })
	                $("#businessModelCompany").append(tr);
	                businessModelCompany();
	            }
            }
        });
        
        
        /////////////////////////做市行情////////////////////////////////
        //做市信息
        $.kf.ajax({
            type: "get",
            url: $.kf.REPORTMARKETINFO + "?rp_id="+ rp_id +"&tmp_id="+ tmp_id,
            data: "",
            dataType: "json",
            processResponse: function (data) {
                var dataList = data.data.body;
                var dataC = data.data;
                if(isNullOrEmpty(dataC)){
                	$(".reportQutes4").hide();
                }else{
	                var tr = "";
	                $(".hqMes2").text(dataC.updateDate);
	                $(".remarksJJ").val(data.data.remarks);
	                $(dataList).each(function(i){
	                	tr += "<tr>";
	                	if(dataList[i].maker == "合计"){
	                		tr += "<td class='textR'><b>"+ dataList[i].maker +"</b></td>";
	                	}else{
	                		tr += "<td><input type='text' value='"+ dataList[i].maker +"' /></td>";
	                	}
	                	tr += "<td><input type='text' value='"+ dataList[i].buyDate +"' /></td>";
	                	tr += "<td><input type='text' value='"+ dataList[i].buyWay +"' /></td>";
	                	tr += "<td><input class='textRight' type='text' value='"+ dataList[i].buyCost +"' /></td>";
	                	tr += "<td><input class='textRight' type='text' value='"+ dataList[i].buyNumber +"' /></td>";
	                	tr += "</tr>";
	                })
	                $("#marketInformation").append(tr);
	                marketInformation();
	            }
            }
        });
        
        /////////////////////////媒体报道////////////////////////////////
        //媒体报道
        var _url = $.kf.REPORTSINFOMEDIA + "?rp_id="+ rp_id +"&tmp_id="+ tmp_id;
        //new GetTable(_url, $("#pageMedia"), {}, mediaList, "get", $("#mediaReportList"),"",$(".maskInTableMedia"),false).init();
        $.getTable({
        	url:_url,//url
	    	pageId:$("#pageMedia"),//分页id
	    	callback:mediaList,//callback
	    	loadId:".maskInTableMedia",
	    	showDataBox:false,
	    	tbodyId:$("#mediaReportList")//tbody的id,
        })
        function mediaList(data){
        	 var dataList = data.data.body;
        	 if(isNullOrEmpty(dataList)){
        		$("#pageMedia").hide();
        	}
        	var tr = "";
            $(".mediaDate").text(data.data.updateDate)
           
            $(dataList).each(function(i){
            	tr += "<tr>";
            	tr += "<td><a href='" + $.url.newsInfoUrl() + "id=" + dataList[i].id + '&name=news&from=makeReport' + "'>" + dataList[i].title + "</a></td>";
            	tr += "<td class='textR'>"+ dataList[i].newsSource +"</td>";
            	tr += "<td class='textR'>"+ dataList[i].releaseDate +"</td>";
            	tr += "</tr>";
            })
            $("#mediaReportList").append(tr);
        }
        
        /////////////////////////公告信息////////////////////////////////
        //公告信息
        var _url2 = $.kf.REPORTNOTICEINFO + "?rp_id="+ rp_id +"&tmp_id="+ tmp_id;
        //new GetTable(_url, $("#pageNotice"), {}, noteList, "get", $("#noticeNewsList"),"",$(".maskInTableNote"),false).init();
        $.getTable({
        	url:_url2,//url
	    	pageId:$("#pageNotice"),//分页id
	    	callback:noteList,//callback
	    	loadId:".maskInTableNote",
	    	showDataBox:false,
	    	tbodyId:$("#noticeNewsList")//tbody的id,
        })
        function noteList(data){
        	var dataList = data.data.body;
        	if(isNullOrEmpty(dataList)){
        		$("#pageNotice").hide();
        	}
        	$("#noticeNewsList").html("");
        	var tr = "";
            $(".noticeDate").text(data.data.updateDate);
            $(dataList).each(function(i){
            	tr += "<tr>";
            	if(isNullOrEmpty(dataList[i].url)){
            		tr += "<td><a href='javascript:void(0)'>"+ dataList[i].title +"</a></td>";
            	}else{
					tr += "<td><a target='_blank' href='"+ dataList[i].url +"'>"+ dataList[i].title +"</a></td>";            		
            	}
            	tr += "<td class='textR'>"+ dataList[i].newsSource +"</td>";
            	tr += "<td class='textR'>"+ dataList[i].releaseDate +"</td>";
            	tr += "</tr>";
            })
            $("#noticeNewsList").append(tr);
        }
        
        /////////////////////////股权信息////////////////////////////////
        //股权结构分析
        $.kf.ajax({
            type: "get",
            url: $.kf.REPORTSTRUCTURE + "?rp_id="+ rp_id +"&tmp_id="+ tmp_id,
            data: "",
            dataType: "json",
            processResponse: function (data) {
                var dataList = data.data.body;
                var dataC = data.data;
                if(isNullOrEmpty(dataC)){
                	$(".equInformation").hide();
                }else{
	                var tr = "";
	                $(".remarksN").val(data.data.remarks);
	                $(".datN").text(data.data.updateDate);
	                $(dataList).each(function(i){
	                	tr += "<tr>";
	                	if(dataList[i].shareholderName == "合计"){
	                		tr += "<td><b>"+ dataList[i].shareholderName +"</b></td>";
	                	}else{
	                		tr += "<td><input type='text' value='"+ dataList[i].shareholderName +"' /></td>";
	                	}
	                	tr += "<td><input class='textRight' type='text' value='"+ dataList[i].holdingShares +"' /></td>";
	                	tr += "<td><input class='textRight' type='text' value='"+ dataList[i].endPeriod +"' /></td>";
	                	tr += "<td><input type='text' value='"+ dataList[i].endPeriodRatio +"' /></td>";
	                	tr += "<td><input class='textRight' type='text' value='"+ dataList[i].qutstandingShares +"' /></td>";
	                	/*tr += "<td><input type='text' value='"+ dataList[i].sharesType +"' /></td>";
	                	tr += "<td><input type='text' value='"+ dataList[i].buyCost +"' /></td>";*/
	                	tr += "</tr>";
	                })
	                $("#equityAnalysisList").append(tr);
	                equityAnalysis();
	            }
            }
        });
        
        //历史定增
        $.kf.ajax({
            type: "get",
            url: $.kf.REPORTHISTORYINCREASE + "?rp_id="+ rp_id +"&tmp_id="+ tmp_id,
            data: "",
            dataType: "json",
            processResponse: function (data) {
                var dataList = data.data.body;
                var dataC = data.data;
                if(isNullOrEmpty(dataC)){
                	$(".equInformation2").hide();
                }else{
	                var tr = "";
	                $(".distoryRmark").val(data.data.remarks);
	                $(".distoryDate").text(data.data.updateDate);
	                $(dataList).each(function(i){
	                	tr += "<tr>";
	                	tr += "<td><input type='text' value='"+ dataList[i].IssueDate +"' /></td>";
	                	tr += "<td><input  class='textRight' type='text' value='"+ dataList[i].IssuePrice +"' /></td>";
	                	tr += "<td><input  class='textRight' type='text' value='"+ dataList[i].issueNumber +"' /></td>";
	                	tr += "<td><input  class='textRight' type='text' value='"+ dataList[i].fundRaising +"' /></td>";
	                	tr += "<td><textarea rows='4' type='text' value=''>"+ dataList[i].IssueObject +"</textarea></td>";
	                	tr += "<td><input class='text-center' type='text' value='"+ dataList[i].IssuePurpose +"' /></td>";
	                	tr += "<td><input class='text-center' type='text' value='"+ dataList[i].releaseResults +"' /></td>";
	                	tr += "</tr>";
	                })
	                $("#historyAddList").append(tr);
	                historyAdd();
	            }
            }
        });
        
        //分红
        $.kf.ajax({
            type: "get",
            url: $.kf.REPORTDIVIDENDS + "?rp_id="+ rp_id +"&tmp_id="+ tmp_id,
            data: "",
            dataType: "json",
            processResponse: function (data) {
                var dataList = data.data.body;
                var dataC = data.data;
                if(isNullOrEmpty(dataC)){
                	$(".equInformation3").hide();
                }else{
	                var tr = "";
	                $(".dividendsRemarks").val(data.data.remarks);
	                $(".dividendsDate").text(data.data.updateDate);
	                $(dataList).each(function(i){
	                	tr += "<tr>";
	                	tr += "<td><input class='text-center' type='text' value='"+ dataList[i].reportingPeriod +"' /></td>";
	                	tr += "<td><input type='text' value='"+ dataList[i].dividendStatement +"' /></td>";
	                	tr += "<td><input class='text-center' type='text' value='"+ dataList[i].equityRegistrationDate +"' /></td>";
	                	tr += "<td><input  class='textRight' type='text' value='"+ dataList[i].beforeCapital +"' /></td>";
	                	tr += "<td><input  class='textRight' type='text' value='"+ dataList[i].rearCapital +"' /></td>";
	                	tr += "</tr>";
	                })
	                $("#dividendsList").append(tr);
	                dividends();
	            }
            }
        });
        
        
        /////////////////////////债权质押////////////////////////////////
        //股权质押
        $.kf.ajax({
            type: "get",
            url: $.kf.REPORTBONDPLEDGE + "?rp_id="+ rp_id +"&tmp_id="+ tmp_id,
            data: "",
            dataType: "json",
            processResponse: function (data) {
                var dataList = data.data.body;
                var dataC = data.data;
                if(isNullOrEmpty(dataC)){
                	
                }else{
	                var tr = "";
	                $(".equityPledgeRemarks").val(data.data.remarks);
	                $(".equityPledgeDate").text(data.data.updateDate);
	                $(dataList).each(function(i){
	                	tr += "<tr>";
	                	tr += "<td><input class='text-center' type='text' value='"+ dataList[i].pledgeDate +"' /></td>";
	                	tr += "<td><input type='text' value='"+ dataList[i].person +"' /></td>";
	                	tr += "<td><input class='textRight' type='text' value='"+ dataList[i].sharesNumber +"' /></td>";
	                	tr += "<td><input class='textRight' type='text' value='"+ dataList[i].totalSharesNumber +"' /></td>";
	                	tr += "<td><input type='text' value='"+ dataList[i].borrowingObject +"' /></td>";
	                	tr += "<td><input class='textRight' type='text' value='"+ dataList[i].loanAmount +"' /></td>";
	                	tr += "<td><input class='text-center' type='text' value='"+ dataList[i].pledgePeriod +"' /></td>";
	                	tr += "<td><input type='text' value='"+ dataList[i].guarantor +"' /></td>";
	                	tr += "</tr>";
	                })
	                $("#equityPledgeList").append(tr);
	                equityPledge();
	            }
            }
        });
        
        /////////////////////////投融信息////////////////////////////////
        //关联公司情况
        $.kf.ajax({
            type: "get",
            url: $.kf.REPORTCOMPANYSITUATION + "?rp_id="+ rp_id +"&tmp_id="+ tmp_id,
            data: "",
            dataType: "json",
            processResponse: function (data) {
                var dataList = data.data.body;
                var dataC = data.data;
                if(isNullOrEmpty(dataC)){
                	
                }else{
	                var tr = "";
	                $(".companyHappeningRemarks").val(data.data.remarks);
	                $(".companyHappeningDate").text(data.data.updateDate);
	                $(dataList).each(function(i){
	                	tr += "<tr>";
	                	tr += "<td><input type='text' value='"+ dataList[i].subsidiaryName +"' /></td>";
	                	tr += "<td><input class='textRight' type='text' value='"+ dataList[i].registeredCapital +"' /></td>";
	                	tr += "<td><input type='text' value='"+ dataList[i].registrationTime +"' /></td>";
	                	tr += "<td><input type='text' value='"+ dataList[i].proportion +"' /></td>";
	                	tr += "<td><input type='text' value='"+ dataList[i].representative +"' /></td>";
	                	tr += "</tr>";
	                })
	                $("#companyHappeningList").append(tr);
	                companyHappening();
	            }
            }
        });
        
        
        /////////////////////////企业交流////////////////////////////////
        //企业交流
        $.kf.ajax({
            type: "get",
            url: $.kf.REPORTCOMMUNICATION + "?rp_id="+ rp_id +"&tmp_id="+ tmp_id,
            data: "",
            dataType: "json",
            processResponse: function (data) {
                var dataList = data.data;
                if(isNullOrEmpty(dataList.problem)){
                	$(".busCommunication").hide();
                }else{
                	$(".busCommunication textarea").text(dataList.problem.problem);
                }
                if(isNullOrEmpty(dataList.businessNeeds)){
                	$(".busCommunication2").hide();
                }else{
                	$(".busCommunication2 textarea").text(dataList.businessNeeds.businessNeeds);
                }
                if(isNullOrEmpty(dataList.cooperation)){
                	$(".busCommunication3").hide();
                }else{
                	$(".busCommunication3 textarea").text(dataList.cooperation.cooperation);
                }
            }
        });
        
        
        


		//////////////////////////////////上送字段/////////////////////////////////////
        var reportAll = [];
        
		
        $("#reportAll input[type='text'],#reportAll textarea").each(function(){
        	$(this).change(function(){
        		var code = $(this).attr("current-code");
        		var value = $(this).val();
        		var obj={};
    			obj[code] = value;
				$.each(reportAll,function(name,val){
					for (var key in val) {
						if(key == code){
							reportAll.splice(name,1)
						}
					}
				})
        		reportAll.push(obj);
        	})
        })
        
        //基本信息--联系情况radio
        $("#concatRadio input[type='radio']").each(function(){
        	if($(this).is(':checked')){
    			var mobai = $(this).attr("current-code");
    			reportAll.push({b01040100:mobai})
    		}
        })
    	$("#concatRadio input[type='radio']").on("click",function(){
    		if($(this).is(':checked')){
    			var mobai = $(this).attr("current-code");
    			reportAll.push({b01040100:mobai})
    		}
    	})
    	
    	//人员信息 --管理层信息
    	var managementMesD = [];
    	var manageLast = {};
    	function reportInformation(){
    		$("#reportInformation input,#reportInformation textarea").each(function(){
				$(this).change(function(){
					var intr = [];
					intr = intr.concat(reportAll);
					manageLast = intr.splice(reportAll.length-1,1)[0];
					for (var val in manageLast) {
						if(val == "b03010000"){
							reportAll.pop();
						}
					}
					managerList();
					var managerCon = {b03010000:managementMesD};
	        		reportAll.push(managerCon);
				})
			})
    		
    		$("#reportInformation select").each(function(){
				$(this).change(function(){
					var intr = [];
					intr = intr.concat(reportAll);
					manageLast = intr.splice(reportAll.length-1,1)[0];
					for (var val in manageLast) {
						if(val == "b03010000"){
							reportAll.pop();
						}
					}
					managerList();
					var managerCon = {b03010000:managementMesD}
	        		reportAll.push(managerCon)
				})
			})
    	}
		function managerList(){
			managementMesD.splice(0,managementMesD.length)
			$("#reportInformation tr").each(function(i){
        		var executiveName = $(this).children("td").eq(0).children("input").val();
        		var job = $(this).children("td").eq(1).children("input").val();
        		var sexSelect = $(this).children("td").eq(2).children("select").find("option:selected");
        		var sex = sexSelect.text();
          		var term = $(this).children("td").eq(3).children("input").val();
        		var remarks = $(this).children("td").eq(4).children("textarea").val();
        		managementMesD.push({"executiveName":executiveName,"job":job,"sex":sex,"term":term,"remarks":remarks});
        	})
		}
        
        
		//人员信息 --高管简介
    	var managementIntroductionD = [];
    	var introductionLast = {};
    	function managementIntroduction(){
    		$("#executiveInfor input,#executiveInfor textarea").each(function(){
				$(this).change(function(){
					var intr = [];
					intr = intr.concat(reportAll);
					introductionLast = intr.splice(reportAll.length-1,1)[0];
	    			for(var val in introductionLast){
	    				if(val == "b03020000"){
	    					reportAll.pop()
	    				}
	    			}
					IntroductionList();
					var managerCon = {b03020000:managementIntroductionD}
	        		reportAll.push(managerCon)
				})
			})
    	}
		function IntroductionList(){
			managementIntroductionD.splice(0,managementIntroductionD.length)
			$("#executiveInfor tr").each(function(i){
        		var executiveName = $(this).children("td").eq(0).children("input").val();
        		var introduction = $(this).children("td").eq(1).children("textarea").val();
        		managementIntroductionD.push({"executiveName":executiveName,"introduction":introduction});
        	})
		}
        
        
        //财务数据 --财务指标
    	var financialDataD = [];
    	var financialDataLast = {};
    	function financialData(){
    		$("#financialData input").each(function(){
				$(this).change(function(){
					var intr = [];
					intr = intr.concat(reportAll);
					financialDataLast = intr.splice(reportAll.length-1,1)[0];
	    			for(var val in financialDataLast){
	    				if(val == "b04010000"){
	    					reportAll.pop()
	    				}
	    			}
					financialDataList();
					var managerCon = {b04010000:financialDataD}
	        		reportAll.push(managerCon)
				})
			})
    	}
		function financialDataList(){
			financialDataD.splice(0,financialDataD.length)
			$("#financialData tr").each(function(i){
        		var date = $(this).children("td").eq(0).children("b").text();
        		var totalEquity = $(this).children("td").eq(1).children("input").val();
        		var totalShareCapital = $(this).children("td").eq(2).children("input").val();
        		var totalOperatingIncome = $(this).children("td").eq(3).children("input").val();
        		var netProfit = $(this).children("td").eq(4).children("input").val();
        		var netProfitRate = $(this).children("td").eq(5).children("input").val();
        		var netPrfCut = $(this).children("td").eq(6).children("input").val();
        		var assetLiabilityRatio = $(this).children("td").eq(7).children("input").val();
        		var salesGrossMargin = $(this).children("td").eq(8).children("input").val();
        		var earningsPerShare = $(this).children("td").eq(9).children("input").val();
        		var netAssetsPerShare = $(this).children("td").eq(10).children("input").val();
        		var capitalPerShare = $(this).children("td").eq(11).children("input").val();
        		var undistributedProfit = $(this).children("td").eq(12).children("input").val();
        		var stock = $(this).children("td").eq(13).children("input").val();
        		var moneyFund = $(this).children("td").eq(14).children("input").val();
        		var accountsReceivable = $(this).children("td").eq(15).children("input").val();
        		var netCashFlowOperating = $(this).children("td").eq(16).children("input").val();
        		var netCashFlowInvesting = $(this).children("td").eq(17).children("input").val();
        		var netCashFlowFinancing = $(this).children("td").eq(18).children("input").val();
        		financialDataD.push({"date":date,"totalEquity":totalEquity,"totalShareCapital":totalShareCapital,"totalOperatingIncome":totalOperatingIncome,"netProfit":netProfit,"netProfitRate":netProfitRate,"netPrfCut":netPrfCut,"assetLiabilityRatio":assetLiabilityRatio,"salesGrossMargin":salesGrossMargin,"earningsPerShare":earningsPerShare,"netAssetsPerShare":netAssetsPerShare,"capitalPerShare":capitalPerShare,"undistributedProfit":undistributedProfit,"stock":stock,"moneyFund":moneyFund,"accountsReceivable":accountsReceivable,"netCashFlowOperating":netCashFlowOperating,"netCashFlowInvesting":netCashFlowInvesting,"netCashFlowFinancing":netCashFlowFinancing});
        	})
		}
        
        
        //商业分析 --营收情况
    	var revenueSituationD = [];
    	var revenueSituationLast = {};
    	function revenueSituation(){
    		$("#revenueSituationList input").each(function(){
				$(this).change(function(){
					var intr = [];
					intr = intr.concat(reportAll);
					revenueSituationLast = intr.splice(reportAll.length-1,1)[0];
	    			for(var val in revenueSituationLast){
	    				if(val == "b05010000"){
	    					reportAll.pop()
	    				}
	    			}
					revenueSituationList();
					var managerCon = {b05010000:revenueSituationD}
	        		reportAll.push(managerCon)
				})
			})
    	}
		function revenueSituationList(){
			revenueSituationD.splice(0,revenueSituationD.length)
			$("#revenueSituationList tr").each(function(i){
        		var productType = $(this).children("td").eq(0).children("input").val();
				if(productType == undefined){
					productType = "合计"
				}
        		var newDate = $(this).children("td").eq(1).children("input").val();
        		var newRatio = $(this).children("td").eq(2).children("input").val();
        		var oldDate = $(this).children("td").eq(3).children("input").val();
        		var oldRatio = $(this).children("td").eq(4).children("input").val();
        		revenueSituationD.push({"productType":productType,"newDate":newDate,"newRatio":newRatio,"oldDate":oldDate,"oldRatio":oldRatio});
        	})
		}
		
		
		//商业分析 --前五名客户情况
    	var firstFiveHappeningD = [];
    	var firstFiveHappeningLast = {};
    	function firstFiveHappening(){
    		$("#firstFiveHappeningList input").each(function(){
				$(this).change(function(){
					var intr = [];
					intr = intr.concat(reportAll);
					firstFiveHappeningLast = intr.splice(reportAll.length-1,1)[0];
	    			for(var val in firstFiveHappeningLast){
	    				if(val == "b05020000"){
	    					reportAll.pop()
	    				}
	    			}
					firstFiveHappeningList();
					var managerCon = {b05020000:firstFiveHappeningD}
	        		reportAll.push(managerCon)
				})
			})
    	}
		function firstFiveHappeningList(){
			firstFiveHappeningD.splice(0,firstFiveHappeningD.length)
			$("#firstFiveHappeningList tr").each(function(i){
        		var date = $(this).children("td").eq(0).text();
        		var supplierName = $(this).children("td").eq(1).children("input").val();
        		if(supplierName == undefined){
					supplierName = "合计"
				}
        		var purchaseAmount = $(this).children("td").eq(2).children("input").val();
        		var ratio = $(this).children("td").eq(3).children("input").val();
        		firstFiveHappeningD.push({"date":date,"supplierName":supplierName,"purchaseAmount":purchaseAmount,"ratio":ratio});
        	})
		}
		
		
		//商业分析 --前五名供应商情况
    	var firstFiveSupplierD = [];
    	var firstFiveSupplierLast = {};
    	function firstFiveSupplier(){
    		$("#firstFiveSupplierList input").each(function(){
				$(this).change(function(){
					var intr = [];
					intr = intr.concat(reportAll);
					firstFiveSupplierLast = intr.splice(reportAll.length-1,1)[0];
	    			for(var val in firstFiveSupplierLast){
	    				if(val == "b05030000"){
	    					reportAll.pop()
	    				}
	    			}
					firstFiveSupplierList();
					var managerCon = {b05030000:firstFiveSupplierD};
	        		reportAll.push(managerCon)
				})
			})
    	}
		function firstFiveSupplierList(){
			firstFiveSupplierD.splice(0,firstFiveSupplierD.length);
			$("#firstFiveSupplierList tr").each(function(i){
        		var date = $(this).children("td").eq(0).text();
        		var supplierName = $(this).children("td").eq(1).children("input").val();
        		if(supplierName == undefined){
					supplierName = "合计"
				}
        		var purchaseAmount = $(this).children("td").eq(2).children("input").val();
        		var ratio = $(this).children("td").eq(3).children("input").val();
        		firstFiveSupplierD.push({"date":date,"supplierName":supplierName,"purchaseAmount":purchaseAmount,"ratio":ratio});
        	})
		}
		
		
		//商业分析 --同商业模式企业
    	var businessModelCompanyD = [];
    	var businessModelCompanyLast = {};
    	function businessModelCompany(){
    		$("#businessModelCompany input").each(function(){
				$(this).change(function(){
					var intr = [];
					intr = intr.concat(reportAll);
					businessModelCompanyLast = intr.splice(reportAll.length-1,1)[0];
	    			for(var val in businessModelCompanyLast){
	    				if(val == "b05050000"){
	    					reportAll.pop()
	    				}
	    			}
					businessModelCompanyList();
					var managerCon = {b05050000:businessModelCompanyD}
	        		reportAll.push(managerCon)
				})
			})
    	}
		function businessModelCompanyList(){
			businessModelCompanyD.splice(0,businessModelCompanyD.length)
			$("#businessModelCompany tr").each(function(i){
        		var code = $(this).children("td").eq(0).children("input").val();
        		var name = $(this).children("td").eq(1).children("input").val();
        		businessModelCompanyD.push({"code":code,"name":name});
        	})
		}
		
		
		//行情做市 --做市信息
    	var marketInformationD = [];
    	var marketInformationLast = {};
    	function marketInformation(){
    		$("#marketInformation input").each(function(){
				$(this).change(function(){
					var intr = [];
					intr = intr.concat(reportAll);
					marketInformationLast = intr.splice(reportAll.length-1,1)[0];
	    			for(var val in marketInformationLast){
	    				if(val == "b06020000"){
	    					reportAll.pop()
	    				}
	    			}
					marketInformationList();
					var managerCon = {b06020000:marketInformationD}
	        		reportAll.push(managerCon)
				})
			})
    	}
		function marketInformationList(){
			marketInformationD.splice(0,marketInformationD.length)
			$("#marketInformation tr").each(function(i){
        		var maker = $(this).children("td").eq(0).children("input").val();
        		var buyDate = $(this).children("td").eq(1).children("input").val();
        		var buyWay = $(this).children("td").eq(2).children("input").val();
        		var buyCost = $(this).children("td").eq(3).children("input").val();
        		var buyNumber = $(this).children("td").eq(4).children("input").val();
        		marketInformationD.push({"maker":maker,"buyDate":buyDate,"buyWay":buyWay,"buyCost":buyCost,"buyNumber":buyNumber});
        	})
		}
		
		
		//股权信息 --股权结构分析
    	var equityAnalysisD = [];
    	var equityAnalysisLast = {};
    	function equityAnalysis(){
    		$("#equityAnalysisList input").each(function(){
				$(this).change(function(){
					var intr = [];
					intr = intr.concat(reportAll);
					equityAnalysisLast = intr.splice(reportAll.length-1,1)[0];
	    			for(var val in equityAnalysisLast){
	    				if(val == "b09010000"){
	    					reportAll.pop()
	    				}
	    			}
					equityAnalysisList();
					var managerCon = {b09010000:equityAnalysisD}
	        		reportAll.push(managerCon)
				})
			})
    	}
		function equityAnalysisList(){
			equityAnalysisD.splice(0,equityAnalysisD.length)
			$("#equityAnalysisList tr").each(function(i){
        		var shareholderName = $(this).children("td").eq(0).children("input").val();
        		if(shareholderName == undefined){
					shareholderName = "合计"
				}
        		var holdingShares = $(this).children("td").eq(1).children("input").val();
        		var endPeriod = $(this).children("td").eq(2).children("input").val();
        		var endPeriodRatio = $(this).children("td").eq(3).children("input").val();
        		var qutstandingShares = $(this).children("td").eq(4).children("input").val();
        		equityAnalysisD.push({"shareholderName":shareholderName,"holdingShares":holdingShares,"endPeriod":endPeriod,"endPeriodRatio":endPeriodRatio,"qutstandingShares":qutstandingShares});
        	})
		}
		
		//股权信息 --历史定增
    	var historyAddD = [];
    	var historyAddLast = {};
    	function historyAdd(){
    		$("#historyAddList input,#historyAddList textarea").each(function(){
				$(this).change(function(){
					var intr = [];
					intr = intr.concat(reportAll);
					historyAddLast = intr.splice(reportAll.length-1,1)[0];
	    			for(var val in historyAddLast){
	    				if(val == "b09020000"){
	    					reportAll.pop()
	    				}
	    			}
					historyAddList();
					var managerCon = {b09020000:historyAddD}
	        		reportAll.push(managerCon)
				})
			})
    	}
		function historyAddList(){
			historyAddD.splice(0,historyAddD.length)
			$("#historyAddList tr").each(function(i){
        		var IssueDate = $(this).children("td").eq(0).children("input").val();
        		var IssuePrice = $(this).children("td").eq(1).children("input").val();
        		var issueNumber = $(this).children("td").eq(2).children("input").val();
        		var fundRaising = $(this).children("td").eq(3).children("input").val();
        		var IssueObject = $(this).children("td").eq(4).children("textarea").val();
        		var IssuePurpose = $(this).children("td").eq(5).children("input").val();
        		var releaseResults = $(this).children("td").eq(6).children("input").val();
        		historyAddD.push({"IssueDate":IssueDate,"IssuePrice":IssuePrice,"issueNumber":issueNumber,"fundRaising":fundRaising,"IssueObject":IssueObject,"IssuePurpose":IssuePurpose,"releaseResults":releaseResults});
        	})
		}
        
        //股权信息 --分红
    	var dividendsD = [];
    	var dividendsLast = {};
    	function dividends(){
    		$("#dividendsList input").each(function(){
				$(this).change(function(){
					var intr = [];
					intr = intr.concat(reportAll);
					dividendsLast = intr.splice(reportAll.length-1,1)[0];
	    			for(var val in dividendsLast){
	    				if(val == "b09030000"){
	    					reportAll.pop()
	    				}
	    			}
					dividendsList();
					var managerCon = {b09030000:dividendsD}
	        		reportAll.push(managerCon)
				})
			})
    	}
		function dividendsList(){
			dividendsD.splice(0,dividendsD.length)
			$("#dividendsList tr").each(function(i){
        		var reportingPeriod = $(this).children("td").eq(0).children("input").val();
        		var dividendStatement = $(this).children("td").eq(1).children("input").val();
        		var equityRegistrationDate = $(this).children("td").eq(2).children("input").val();
        		var beforeCapital = $(this).children("td").eq(3).children("input").val();
        		var rearCapital = $(this).children("td").eq(4).children("input").val();
        		dividendsD.push({"reportingPeriod":reportingPeriod,"dividendStatement":dividendStatement,"equityRegistrationDate":equityRegistrationDate,"beforeCapital":beforeCapital,"rearCapital":rearCapital});
        	})
		}
        
        //债权质押 --股权质押
    	var equityPledgeD = [];
    	var equityPledgeLast = {};
    	function equityPledge(){
    		$("#equityPledgeList input").each(function(){
				$(this).change(function(){
					var intr = [];
					intr = intr.concat(reportAll);
					equityPledgeLast = intr.splice(reportAll.length-1,1)[0];
	    			for(var val in equityPledgeLast){
	    				if(val == "b10010000"){
	    					reportAll.pop()
	    				}
	    			}
					equityPledgeList();
					var managerCon = {b10010000:equityPledgeD}
	        		reportAll.push(managerCon)
				})
			})
    	}
		function equityPledgeList(){
			equityPledgeD.splice(0,equityPledgeD.length)
			$("#equityPledgeList tr").each(function(i){
        		var pledgeDate = $(this).children("td").eq(0).children("input").val();
        		var person = $(this).children("td").eq(1).children("input").val();
        		var sharesNumber = $(this).children("td").eq(2).children("input").val();
        		var totalSharesNumber = $(this).children("td").eq(3).children("input").val();
        		var borrowingObject = $(this).children("td").eq(4).children("input").val();
        		var loanAmount = $(this).children("td").eq(5).children("input").val();
        		var pledgePeriod = $(this).children("td").eq(6).children("input").val();
        		var guarantor = $(this).children("td").eq(7).children("input").val();
        		equityPledgeD.push({"pledgeDate":pledgeDate,"person":person,"sharesNumber":sharesNumber,"totalSharesNumber":totalSharesNumber,"borrowingObject":borrowingObject,"loanAmount":loanAmount,"pledgePeriod":pledgePeriod,"guarantor":guarantor});
        	})
		}
        
        //投融信息 --关联公司情况
    	var companyHappeningD = [];
    	var companyHappeningLast = {};
    	function companyHappening(){
    		$("#companyHappeningList input").each(function(){
				$(this).change(function(){
					var intr = [];
					intr = intr.concat(reportAll);
					companyHappeningLast = intr.splice(reportAll.length-1,1)[0];
	    			for(var val in companyHappeningLast){
	    				if(val == "b11010000"){
	    					reportAll.pop()
	    				}
	    			}
					companyHappeningList();
					var managerCon = {b11010000:companyHappeningD}
	        		reportAll.push(managerCon)
				})
			})
    	}
		function companyHappeningList(){
			companyHappeningD.splice(0,companyHappeningD.length)
			$("#companyHappeningList tr").each(function(i){
        		var subsidiaryName = $(this).children("td").eq(0).children("input").val();
        		var registeredCapital = $(this).children("td").eq(1).children("input").val();
        		var registrationTime = $(this).children("td").eq(2).children("input").val();
        		var proportion = $(this).children("td").eq(3).children("input").val();
        		var representative = $(this).children("td").eq(4).children("input").val();
        		companyHappeningD.push({"subsidiaryName":subsidiaryName,"registeredCapital":registeredCapital,"registrationTime":registrationTime,"proportion":proportion,"representative":representative});
        	})
		}
        
        
        //预览导出报告
        $("#outTemplate").on("click",function(){
        	$("#comModalLoad").modal("show");
        	delay_till_last('#outTemplate', function() {
	        	var obj = {"b02010000":$("#editorDiv").html()};
				$.each(reportAll,function(name,val){
					for (var key in val) {
						if(key == "b02010000"){
							reportAll.splice(name,1)
						}
					}
				})
				reportAll.push(obj);
				
				var obj2 = {"b05040000":$("#editor2Div").html()};
				$.each(reportAll,function(name,val){
					for (var key in val) {
						if(key == "b05040000"){
							reportAll.splice(name,1)
						}
					}
				})
				reportAll.push(obj2);
				var imgSrc = $("#img001").find("img").attr("src");
				var imgSrc2 = $("#img002").find("img").attr("src");
				imgUrl.push({b06010200:{"imgSrc":imgSrc,"imgSrc2":imgSrc2}});
				var allDate = reportAll.concat(imgUrl);
	        	var cc = JSON.stringify(allDate);
	        	var parentAll = {"data":cc,"rp_id":rp_id,"tmp_id":tmp_id,"type":"export","tmp_name":tmp_name};
	        	
	        	//var allDateFY = JSON.stringify(parentAll);
	        	if(isNullOrEmpty(tmp_name)){
	        		$("#tempNameErr").text('报告名称不能为空').show();
	        	}else{
	        		$("#tempNameErr").text('').hide();
	        		$.kf.ajax({
			            type: "post",
			            url: $.kf.REPORTSAVEEXPORT,
			            data:parentAll,
			            dataType: "json",
			            processResponse: function (data) {
			            	if(data.code == "10010"){
			            		$("#tempNameErr").text(data.message).show();
			            	}else{
			            		$("#tempNameErr").text('').hide();
			            		$("#comModalLoad").modal("hide");
			            		window.location.href = data.url;
			            	}
			            }
			        });
	        	}
        	}, 300);
        })
        
        //导出报告
        $("#createTemplate").on("click",function(){
        	$("#hideOut").click();
        	$("#comModalLoad").modal("show");
        	delay_till_last('#createTemplate', function() {
	        	ue.ready(function() {
				 	var ueText =  UE.getEditor('editor').getContent();
					var obj = {"b02010000":ueText};
					$.each(reportAll,function(name,val){
						for (var key in val) {
							if(key == "b02010000"){
								reportAll.splice(name,1)
							}
						}
					})
					reportAll.push(obj);
				});
				ue2.ready(function() {
					var ueText2 =  UE.getEditor('editor2').getContent();
					var obj = {"b05040000":ueText2};
					$.each(reportAll,function(name,val){
						for (var key in val) {
							if(key == "b05040000"){
								reportAll.splice(name,1)
							}
						}
					})
					reportAll.push(obj);
				});
				var imgSrc = $("#img001").find("img").attr("src");
				var imgSrc2 = $("#img002").find("img").attr("src");
				imgUrl.push({b06010200:{"imgSrc":imgSrc,"imgSrc2":imgSrc2}});
	        	var allDate = reportAll.concat(imgUrl);
	        	var cc = JSON.stringify(allDate);
	        	var parentAll = {"data":cc,"rp_id":rp_id,"tmp_id":tmp_id,"type":"export","tmp_name":tmp_name};
	        	
	        	//var allDateFY = JSON.stringify(parentAll);
	        	if(isNullOrEmpty(tmp_name)){
	        		$("#tempNameErr").text('报告名称不能为空').show();
	        	}else{
	        		$("#tempNameErr").text('').hide();
	        		$.kf.ajax({
			            type: "post",
			            url: $.kf.REPORTSAVEEXPORT,
			            data:parentAll,
			            dataType: "json",
			            processResponse: function (data) {
			            	if(data.code == "10010"){
			            		$("#tempNameErr").text(data.message).show();
			            	}else{
			            		$("#tempNameErr").text('').hide();
			            		$("#comModalLoad").modal("hide");
			            		window.location.href = data.url;
			            	}
			            	
			            }
			        });
	        	}
	        }, 300);
        })
        
        //保存报告
        $("#saveTemplate,#saveTemplate2").on("click",function(){
        	$("#hideOut").click();
        	delay_till_last('#saveTemplate,#saveTemplate2', function() {
		        ue.ready(function() {
				 	var ueText =  UE.getEditor('editor').getContent();
					var obj = {"b02010000":ueText};
					$.each(reportAll,function(name,val){
						for (var key in val) {
							if(key == "b02010000"){
								reportAll.splice(name,1)
							}
						}
					})
					reportAll.push(obj);
				});
				ue2.ready(function() {
					var ueText2 =  UE.getEditor('editor2').getContent();
					var obj = {"b05040000":ueText2};
					$.each(reportAll,function(name,val){
						for (var key in val) {
							if(key == "b05040000"){
								reportAll.splice(name,1)
							}
						}
					})
					reportAll.push(obj);
				});
				var imgSrc = $("#img001").find("img").attr("src");
				var imgSrc2 = $("#img002").find("img").attr("src");
				imgUrl.push({b06010200:{"imgSrc":imgSrc,"imgSrc2":imgSrc2}});
	        	var allDate = reportAll.concat(imgUrl);
	        	var cc = JSON.stringify(allDate);
	        	var parentAll = {"data":cc,"rp_id":rp_id,"tmp_id":tmp_id,"type":"save","tmp_name":tmp_name};
	        	//var allDateFY = JSON.stringify(parentAll);
	        	if(isNullOrEmpty(tmp_name)){
	        		$("#tempNameErr").text('报告名称不能为空').show();
	        	}else{
	        		$("#tempNameErr").text('').hide();
	        		$.kf.ajax({
			            type: "post",
			            url: $.kf.REPORTSAVEEXPORT,
			            data:parentAll,
			            dataType: "json",
			            processResponse: function (data) {
			            	if(data.code == "10010"){
			            		$("#tempNameErr").text(data.message).show();
			            	}else{
			            		$("#tempNameErr").text('').hide();
			            		alert("保存成功","提示","saveRep");
				            	$("#saveRep").click(function(){
									window.top.location.href = $.url.reportList();      		
				            	})
			            	}
			            }
			        });
	        	}
		    }, 300);
        })
        
        //放弃
        $("#notCreateTemplate").click(function(){
        	delay_till_last('#notCreateTemplate', function() {
	        	alert("您确定要放弃继续编写吗？您将失去全部已编写的信息","提示","notCreateSure",true);
	        	$("#notCreateSure").click(function(){
	        		window.top.location.href = $.url.reportGuide();
	        	})
	        }, 300);
        })
        
        
        
    }
    return {
        basicInformation: function () {
            basicInformation()
        }
    }
}();