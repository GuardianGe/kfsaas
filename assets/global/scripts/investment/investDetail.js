var InvestDetail = function(){
	var htmlWid = document.getElementsByTagName("html")[0];
	var positionFrom = Query.getHash("position");
	var tid = Query.getHash("id");
    /*****投资组合******/
   	var initTable = function(){
    	var keyword = $("#zh_ser").val();
    	var newThree = Query.getHash("newThree");
    	var company = "";
    	if(!isNullOrEmpty(newThree) && newThree == "yes"){
    		company = "company";
    		$("#neeqChoose").find("div").eq(1).addClass("active").siblings().removeClass();
    	}else{
    		company = "";
    	}
    	
        var _url = $.kf.INVESTCOMPANY + "?" + "id=" + tid + "&keyword=" + keyword + "&company=" + company + "&page=" + 1;
        //new GetTable(_url, $("#pageTool"), "", combinationList, "get", $("#combination")).init();
        $("#combination").html("");
		var lastPage = Query.getHash("page");
        $.getTable({
        	url:_url,//url
	    	pageId:$("#pageTool"),//分页id
	    	callback:combinationList,//callback
	    	currentPage:lastPage,
	    	tbodyId:$("#combination")//tbody的id,
        })
   	}
    /***table投资组合***/
    function combinationList(data) {
        var list = data.data;
        var tr = "";
        var comId = "";
        $("#combination").html("");
        $(list).each(function (i) {
            //console.log(list[i]);
            if(list[i].type == "新三板"){
            	if (isNullOrEmpty(list[i].companyId)){
            	 comId = "<span class='industry03'>" + list[i].name + "</span> <span class='badge badge-roundless badge-danger'>" + list[i].type + "</span>";
            	}else{
            	 comId = "<a class='industry03' href='" + $.url.companyListUrl() + "id=" + list[i].companyId + "'>" + list[i].name + "</a> <span class='badge badge-roundless badge-danger'>" + list[i].type + "</span>";
            	}
            }else{
            	if (!isNullOrEmpty(list[i].companyId)) {
	                comId = "<a class='industry03' href='" + $.url.industryUrl() + "id=" + list[i].companyId + "'>" + list[i].name + "</a> <span class='badge badge-roundless badge-danger'>" + list[i].type + "</span>";
	            } else {
	                comId = "<span>" + list[i].name + "</span> <span class='badge badge-roundless badge-danger'>" + list[i].type + "</span>";
	            }
            }
            
            tr += "<tr>";
            tr += "<td>" + comId + "</td>";
            tr += "<td>" + list[i].industry + "</td>";
            tr += "<td class='investT"+i+" investEdg'></td>";
            tr += "<td>" + list[i].step + "</td>";
            tr += "<td class='queryWidth'>" + list[i].total + "</td>";
            tr += "<td>" + list[i].currency + "</td>";
            tr += "<td>" + list[i].date + "</td>";
            tr += "</tr>";
        });
        $("#combination").append(tr);

        //扣费跳转
        var isCookie = false;
        moneyUrl($(".industry03"), isCookie, "isCookie");
        //投资机构列表
        for (var i = 0; i < list.length; i++) {
            var tr2 = [];
            var investmentL = list[i].investmentArr.length;
            for (var j = 0; j < investmentL; j++) {
                if (investmentL == 0 || investmentL == 1) {
                	if(isNullOrEmpty(list[i].investmentArr[j].investorId)){
                		tr2 += "<span>" + list[i].investmentArr[j].investment + "</span>";
                	}else{
                		tr2 += "<a href='" + $.url.investmentAgencyDetailsUrl() + "id=" + list[i].investmentArr[j].investorId + "'>" + list[i].investmentArr[j].investment + "</a>";
                	}
                    
                } else {
                    if(isNullOrEmpty(list[i].investmentArr[j].investorId)){
                    		tr2 += "<span>" + list[i].investmentArr[j].investment + "</span>/";
                    	}else{
                    		tr2 += "<a href='" + $.url.investmentAgencyDetailsUrl() + "id=" + list[i].investmentArr[j].investorId + "'>" + list[i].investmentArr[j].investment + "</a>/";
                    	}
                }

            }
           
            $(".investT" + i).append(tr2);

        };
        $(".investEdg").each(function(){
        	
			if($(this).html().indexOf("/") > 0){
				
				$(this).html($(this).html().substring(0,$(this).html().length-1));
			}
		});
    };
    //查询
    $("#seaBtn").on("click",function(){
    	initTable();
    });
    //重置
    $("#seaBtnReset").on("click",function(){
    	$("#zh_ser").val("");
    	Query.setHash({
			"newThree":"no"
		});
		$("#neeqChoose").find("div").eq(0).addClass("active").siblings().removeClass();
    	initTable();
    });
    //回车搜索
    //enter
    $("#zh_ser").on("keydown", function (e) {
        var keyCode = e.which;
        if (keyCode == 13) {
            initTable();
        }
    });
    //新三板 切换
    $("#neeqChoose").find("div").on("click",function(){
    	$(this).siblings().removeClass("active");
    	$(this).addClass("active");
    	$("#combination").html("");
    	if($(this).index() == 1){
    		Query.setHash({"newThree":"yes"});
    	}else{
    		Query.setHash({"newThree":"no"});
    	}
    	initTable();
    })
	function basicMeg() {
        new LoadingAjax($(".maskInAjax"), {}, $("#myChartInfo")).init();
        var _url = $.kf.INVESTINFORMATION + "?" + "id=" + tid + "&page=" + 1;
        $.kf.ajax({
            type: "get",
            url: _url,
            data: "",
            dataType: "json",
            processResponse: function (data) {
                var obj1 = data.data;
                new LoadingAjax($(".maskInAjax"), {}, $("#myChartInfo")).close();
                informationList(data);
            }
        });
        /***table***/
        function informationList(data) {
            var list = data.data;
            $("#informationTitle").html("");
            $("#informationTitle").append(list.name);
            $("#informationGps").html("");
            $("#informationGps").append(list.registration);
            if (isNullOrEmpty(list.registration)) {
                $(".mgt").hide();
            }
            $("#name").text(list.name);
            $("#englishName").text(list.englishName);
            $("#totalCapital").text(list.totalCapital);
            $("#organizationHeadquarters").text(list.organizationHeadquarters);
            $("#agencyCapitalType").text(list.agencyCapitalType);
            $("#organizational").text(list.organizational);
            $("#isRecord").text(list.isRecord);
            $("#address").text(list.address);
            $("#tel").text(list.tel);
            $("#zipCode").text(list.zipCode);
            $("#fax").text(list.fax);
            $("#email").text(list.email);
            $("#socialRelations").text(list.socialRelations);
			
			if(isNullOrEmpty(list.logo)){
				$(".investT-left").html("<img src='../../assets/admin/layout/img/investImg2.png' />");
			}else{
				$(".investT-left").html("<img src='"+ list.logo +"' />");
			}
			$("#inName").text(list.shortname);
			$("#investTypeO").text(list.investType);
			$("#startYear").text(list.startYear);
			if(!isNullOrEmpty(list.website)){
				$("#website").show();
				$("#website").attr("href",list.website);
			}else{
				$("#website").hide();
			}
			if(isNullOrEmpty(list.tel)&&isNullOrEmpty(list.email)){
        		$(".investorsTxtLine").hide();
        	}else if(isNullOrEmpty(list.tel)&&!isNullOrEmpty(list.email)){
        		$("#investors-email").text(list.email);
        		$(".investorsTxtLine").html('<img src="../../assets/admin/layout/img/youxiang2.png" />');
        	}else if(isNullOrEmpty(list.email)&&!isNullOrEmpty(list.tel)){
        		$("#investors-phone").text(list.tel);
        		$(".investorsTxtLine").html('<img src="../../assets/admin/layout/img/dianhua2.png" />');
        	}else{
        		$("#investors-email").text(list.email);
        		$("#investors-phone").text(list.tel);
        		$(".investorsTxtLine").html('<img src="../../assets/admin/layout/img/dianhua2.png" /><img src="../../assets/admin/layout/img/youxiang2.png" />');
        	}
        	if(!isNullOrEmpty(list.introduction)){
        		if (htmlWid.offsetWidth > 768) {
	        		if(list.introduction.length>120){
		        		var introduction= list.introduction.substring(0,120);
		        		$("#in-content").html(introduction+"...<a class='in-more'>展开<img src='../../assets/admin/layout/img/xiala.png' /></a>");
		        		$("#in-content2").html(list.introduction+"<a class='in-more in-hide'>收起<img src='../../assets/admin/layout/img/shouqi.png' /></a>").hide();
		        	}else{
		        		$("#in-content").html(list.introduction);
		        	}
	        	}else{
	        		if(list.introduction.length>30){
		        		var introduction= list.introduction.substring(0,30);
		        		$("#in-content").html(introduction+"...<a class='in-more'>展开<img src='../../assets/admin/layout/img/xiala.png' /></a>");
		        		$("#in-content2").html(list.introduction+"<a class='in-more in-hide'>收起<img src='../../assets/admin/layout/img/shouqi.png' /></a>").hide();
		        	}else{
		        		$("#in-content").html(list.introduction);
		        	}
	        	}
        	}
        	
        	if(list.attention == "1"){
        		$("#joinOptional").text("取消");
        		$("#joinOptional").addClass("cancelOptional").removeClass("wantOptional");
			}else{
				$("#joinOptional").text("关注");
				$("#joinOptional").removeClass("cancelOptional").addClass("wantOptional");
			};
			if(isNullOrEmpty(list.agencyInvestStage)){
				$("#agencyInvestStage").text("--");
			}else{
				$("#agencyInvestStage").text(list.agencyInvestStage);
			}
			//展开收起
			$(".investT-right").on("click",".in-more",function(){
				if($(this).hasClass("in-hide")){
					$("#in-content2").hide();
					$("#in-content").show();
				}else{
					$("#in-content2").show();
					$("#in-content").hide();
				}
			})
			//加入自选功能
		    var comOptional = function(){
				$("#joinOptional").off().on("click",function(){
					var _url = "";
					var code = Query.getHash("id");
					var _txt = $(this).text();
					var param = {
					  		"code":code,
					  		"type":"b1"
					 	};
					if(_txt == "关注"){
			           	 _url = $.kf.ADDCOLLECTIONOPTION;
					}else{
						 _url = $.kf.CANCELCOLLECTIONOPTION;
					}
					$.kf.ajax({
			            type: "post",
			            url: _url,
			            data: param,
			            dataType: "json",
			            processResponse: function(){
			            	if(_txt == "关注"){
				           	 	$("#joinOptional").text("取消");
		    					$("#joinOptional").addClass("cancelOptional").removeClass("wantOptional");
							}else{
								 $("#joinOptional").text("关注");
								$("#joinOptional").removeClass("cancelOptional").addClass("wantOptional");
							}
		            	}
				 	 })
				})
		   };
       		comOptional();
            //扣费跳转
            var isCookie = false;
            moneyUrl($("#industry04"), isCookie, "isCookie");
            echartsWord();
            function echartsWord(){
            	require.config({
				    paths: {
				        echarts: '../../assets/global/plugins/echarts/build/dist'
				    }
				});
				
				// 使用
				require(
				    [
				        'echarts',
				        'echarts/chart/wordCloud',
				        
				    ],
				    function (ec) {
				        // 基于准备好的dom，初始化echarts图表
				        var myChartMap = ec.init(document.getElementById('main'));
				        
				        
				        function createRandomItemStyle() {
						    return {
						        normal: {
						            color: 'rgb(' + [
						                Math.round(Math.random() * 160),
						                Math.round(Math.random() * 160),
						                Math.round(Math.random() * 160)
						            ].join(',') + ')'
						        }
						    };
						}
				        
				        //年度热词
				        option6 = {
						    tooltip: {
						        show: true,
						        formatter:"{a}"+"<br/>"+"{b}：{c}"+"次"
						    },
						    series: [{
						        name: '年度热词',
						        type: 'wordCloud',
						        size: ['100%', '100%'],
						        textRotation : [0, 45, 90, -45],
						        textPadding: 0,
						        autoSize: {
						            enable: true,
						            minSize: 14
						        },
						        data: []
						    }]
						};
						
						//年度热词url
						var chartUrl = $.kf.GETINVESTMENTHOTWORD;
						//年度热词
						$.kf.ajax({
				            type: "get",
				            url:chartUrl+"?id="+ Query.getHash("id"),
				            dataType: "json",
				            data: "",
				            processResponse: function(data) {
				            	if(!isNullOrEmpty(data.data)){
				            		var dataArr = data.data;
					            	for (var i=0;i<dataArr.length;i++) {
				            			dataArr[i].itemStyle = createRandomItemStyle();
					            	}
				                	option6.series[0].data = dataArr;
				                	myChartMap.setOption(option6);
				            	}else{
				            		$("#main > div").append("<div class='currentNoData' style='top:120px;'>暂无数据</div>");
				            	}
				            }
				        });
				        //图表自适应
				        window.addEventListener("resize", function () {
				            myChartMap.resize();
				        })
				    }
				)
            }
            
        }
    }
	var initTableSix = function(){
		var orderByName = "";
        var orderByType = "";
        $(".sort").find("a").each(function () {
            if ($(this).hasClass("bgredB") || $(this).hasClass("bgredT")) {
                orderByName = $(this).parents("th").attr("name");
                orderByType = $(this).attr("name");
            }
        });
		var fundType = trimAll($("#noteType1").text())=="基金类型" ? "" : trimAll($("#noteType1").text());
		var recordStage = trimAll($("#noteType2").text())=="备案状态" ? "" : trimAll($("#noteType2").text());
		var operation = trimAll($("#noteType3").text())=="运作状态" ? "" : trimAll($("#noteType3").text());
        var _url = $.kf.GETINVESTMENTMANAGEMENT + "?" + "id=" + tid + "&orderByName=" + orderByName + "&orderByType=" + orderByType + "&fundType=" + fundType + "&operation=" + operation + "&recordStage=" + recordStage + "&page=" + 1;
        $("#imentnewsSix").html("");
		var lastPage = Query.getHash("page");
        $.getTable({
        	url:_url,//url
	    	pageId:$("#pageToolSix"),//分页id
	    	callback:imentSixList,//callback
	    	currentPage:lastPage,
	    	tbodyId:$("#imentnewsSix")//tbody的id,
        })
        /***table***/
        function imentSixList(data) {
            var list = data.data;
            var fundId= Query.getHash("id");
            var tr = "";
            $("#imentnewsSix").html("");
            $(list).each(function (i) {
                tr += "<tr>";
                tr += "<td class='left'><a href='" + $.url.fundDetailUrl() + "id=" + list[i].id + "&fundId=" + fundId + "'>" + list[i].fundName + "</a></td>";
                tr += "<td>" + list[i].fundType + "</td>";
                tr += "<td>" + list[i].recordStage + "</td>";
                tr += "<td>" + list[i].managementType + "</td>";
                /*tr += "<td>" + list[i].ratio + "</td>";*/
                tr += "<td>" + list[i].date + "</td>";
                tr += "<td>" + list[i].operationStatus + "</td>";
//              tr += "<td><a class='tomodalPopDetail' data-toggle='modal' href='#modalPopDetail'>详情</a><span style='display:none;'>"+list[i].content+"</span></td>";
                tr += "</tr>";
            });
            $("#imentnewsSix").append(tr);
            $(".tomodalPopDetail").on("click",function(){
            	var _text = $(this).parent().find("span").text();
            	$("#modalPopText").html(_text);
            });
            tableSelect();
        }
	}
 	
 	//合作关系
 	var parentPage = 1;
 	var joinPage = 1;
 	var partnerData = "partnerData";
 	var joinShipData = "joinShipData";
 	//合投
	var partnerShip = function () {
		$(".noOutData").remove();
        var _url = "";
        var id = Query.getHash("id");
        if(parentPage == 1){
        	$("#partnerShip").html("");
        }
        new LoadingAjax($(".partnerShip-box"), {}, $("#partnerShip")).init();
        _url = $.kf.GETCOINVESTMENT + "?" + "id=" + id + "&page=" + parentPage;
        
        $.kf.ajax({
	        type: "get",
	        url: _url,
	        data: "",
	        dataType: "json",
	        processResponse: function (data) {
	        	new LoadingAjax($(".partnerShip-box"), {}, $("#partnerShip")).close();
	        	if (isData($(".investg-moreh"), data.data, "")) {
	        		partnerShipList(data);
	        	}
	        }
	    });
    };
    //拼接列表
    var partnerShipList = function (data) {
        var list = data.data;
        partnerData = Math.ceil(data.total/10);
        var tr = "";
        $(list).each(function (i) {
            tr += "<tr>";
            if(isNullOrEmpty(list[i].id)){
            	if(isNullOrEmpty(list[i].logo)){
	            	tr += "<td><div class='investOrgImg'><div class='investOrgBox'><img src='../../assets/admin/layout/img/investImg.png' /></div><span>"+ list[i].name +"</span></div></td>";
	            }else{
	            	tr += "<td><div class='investOrgImg'><div class='investOrgBox'><img src='"+ list[i].logo +"' /></div><span>"+ list[i].name +"</span></div></td>";
	            }
            }else{
            	if(isNullOrEmpty(list[i].logo)){
            	tr += "<td><div class='investOrgImg'><div class='investOrgBox'><img src='../../assets/admin/layout/img/investImg.png' /></div><a class='basicName' href='"+ $.url.investmentAgencyDetailsUrl()+ "id=" + list[i].id +"'>"+ list[i].name +"</a></div></td>";
            }else{
            	tr += "<td><div class='investOrgImg'><div class='investOrgBox'><img src='"+ list[i].logo +"' /></div><a class='basicName' href='"+ $.url.investmentAgencyDetailsUrl()+ "id=" + list[i].id +"'>"+ list[i].name +"</a></div></td>";
	            }
            }
            tr += "<td style='text-align:center'>"+list[i].count+"</td>";
            tr += "</tr>";
        });
        $("#partnerShip").append(tr);
    };
 	//参投
	var joinShip = function () {
        var _url = "";
        var id = Query.getHash("id");
        if(joinPage == 1){
        	 $("#joinShip").html("");
        }
        new LoadingAjax($(".joinShip-box"), {}, $("#joinShip")).init();
        _url = $.kf.GETPARTICIPATIONVOTE + "?" + "id=" + id + "&page=" + joinPage;
        $.kf.ajax({
	        type: "get",
	        url: _url,
	        data: "",
	        dataType: "json",
	        processResponse: function (data) {
	        	new LoadingAjax($(".joinShip-box"), {}, $("#joinShip")).close();
	        	if (isData($(".investg-morec"), data.data, "")) {
	        		joinShipList(data);
	        	}
	        }
	    });
    };
    //拼接列表
	    var joinShipList = function (data) {
	        var list = data.data;
	        joinShipData = Math.ceil(data.total/10);
	        var tr = "";
	        $(list).each(function (i) {
	            tr += "<tr>";
	            if(isNullOrEmpty(list[i].id)){
	            if(isNullOrEmpty(list[i].logo)){
		            	tr += "<td><div class='investOrgImg'><div class='investOrgBox'><img src='../../assets/admin/layout/img/investImg.png' /></div><span>"+ list[i].name +"</span></div></td>";
	            }else{
		            	tr += "<td><div class='investOrgImg'><div class='investOrgBox'><img src='"+ list[i].logo +"' /></div><span>"+ list[i].name +"</span></div></td>";
		            }
	            }else{
	            	if(isNullOrEmpty(list[i].logo)){
		            	tr += "<td><div class='investOrgImg'><div class='investOrgBox'><img src='../../assets/admin/layout/img/investImg.png' /></div><a class='basicName' href='"+ $.url.investmentAgencyDetailsUrl()+ "id=" + list[i].id +"'>"+ list[i].name +"</a></div></td>";
		            }else{
		            	tr += "<td><div class='investOrgImg'><div class='investOrgBox'><img src='"+ list[i].logo +"' /></div><a class='basicName' href='"+ $.url.investmentAgencyDetailsUrl()+ "id=" + list[i].id +"'>"+ list[i].name +"</a></div></td>";
		            }
	            }
	            tr += "<td style='text-align:center'>"+list[i].count+"</td>";
	            tr += "</tr>";
	        });
	        $("#joinShip").append(tr);
	    };
    if (htmlWid.offsetWidth > 768) {
    	$(window).scroll(function(){
	        if ($(window).scrollTop() + $(window).height() > $(document).height()-1) {
	            parentPage++;
	            joinPage++;
	            if(parentPage>partnerData&&parentPage>joinShipData){
			    	$(window).off("scroll");
			    	$(".investg-noMore").show();
			    }else{
			    	if(!$(".joinShip-box").find(".noOutData").size()){
			    		joinShip();
			    	}
			    	if(!$(".partnerShip-box").find(".noOutData").size()){
			    		partnerShip();
			    	}
	           		
			    }
	        }
	    });
    }else{
    	$(".investg-more").on("click",function(){
    		if($(this).attr("name") == 1){
    			parentPage++;
    			if(parentPage>partnerData){
    				$(".investg-moreh").hide();
    			}else{
    				if(parentPage == partnerData){
	    				$(".investg-moreh").hide();
	    			}
    				partnerShip();
    			}
    		}else if($(this).attr("name") == 2){
    			joinPage++;
    			if(joinPage>joinShipData){
    				$(".investg-morec").hide();
    			}else{
    				if(joinPage == joinShipData){
    					$(".investg-morec").hide();
    				}
    				joinShip();
    			}
    		}
    	})
    }

	
 	//tab判断
    var comRefreshTab = function(_leg){
    	var _leg = _leg;
    	if (_leg == "tab_0") {//投资概览
            $(".mask-in").remove();
            $(".maskInTable").height("auto");
            basicMeg();
       };
    	if (_leg == "tab_1") {//投资组合
            $(".mask-in").remove();
            $(".maskInTable").height("auto");
            if (isNullOrEmpty($("#combination").html())) {
                initTable();
            }
       };
        if (_leg == "tab_2") {//投资团队
            $(".mask-in").remove();
            $(".maskInTable").height("auto");
            if (isNullOrEmpty($("#member").html())) {
                var _url = $.kf.INVESTMEMBER + "?" + "id=" + tid + "&page=" + 1;
               // new GetTable(_url, $("#pageToolTuan"), {}, memberList, "get", $("#member")).init();
                var lastPage = Query.getHash("page");
	            $.getTable({
		        	url:_url,//url
			    	pageId:$("#pageToolTuan"),//分页id
			    	callback:memberList,//callback
			    	currentPage:lastPage,
			    	tbodyId:$("#tableOne")//tbody的id,
		        })
                /***table***/
                function memberList(data) {
                    var list = data.data;
                    var tr = "";
                    $("#tableOne").html("");
                    $(list).each(function (i) {
                    	tr += "<tr>";
                        tr += "<td class='investComNum investComNum2'>";
			        	tr += "<div class='investComNum-left investComNum-detail'>"
			        	if(isNullOrEmpty(list[i].logo)){
			        		tr += "<img src='../../assets/admin/layout/img/rentou.png'/>";
			        	}else{
			        		tr += "<img src='"+ list[i].logo +"'/>";
			        	}
			        	tr += "</div>";
			        	tr += "<div class='investComNum-right'>"
			        	tr += "<a href='"+ $.url.investorDetailsUrl() + "id=" + list[i].id +"'>"+ list[i].name +"</a>";
			        	if(isNullOrEmpty(list[i].tel)&&isNullOrEmpty(list[i].weiXi)){
			        		tr +="";
			        	}else if(isNullOrEmpty(list[i].tel)&&!isNullOrEmpty(list[i].weiXi)){
			        		tr +='<a class="investorsTxtLine" data-tel='+ list[i].tel +' data-weiXi='+ list[i].weiXi +' data-toggle="modal" data-target="#myModalOutIn"><img src="../../assets/admin/layout/img/weixin2.png"></a>';
			        	}else if(!isNullOrEmpty(list[i].tel)&&isNullOrEmpty(list[i].weiXi)){
			        		tr +='<a class="investorsTxtLine" data-tel='+ list[i].tel +' data-weiXi='+ list[i].weiXi +'data-toggle="modal" data-target="#myModalOutIn"><img src="../../assets/admin/layout/img/dianhua2.png"></a>';
			        	}else{
			        		tr +='<a class="investorsTxtLine"data-tel='+ list[i].tel +' data-weiXi='+ list[i].weiXi +' data-toggle="modal" data-target="#myModalOutIn"><img src="../../assets/admin/layout/img/dianhua2.png"><img src="../../assets/admin/layout/img/weixin2.png"></a>';
			        	}
			        	tr += "</td></div>";
			        	tr += "<td>" + list[i].job +"</b></td>";
			        	tr += "<td class='investT"+i+" investEdg'><div class='investTwo'></div><div class='investAll'></div></td>";
			        	tr += "<td class='center'><div>";
			        	for(var j=0; j<list[i].stage.length; j++){
			        		if(j == list[i].stage.length-1){
			        			tr += "<span>"+ list[i].stage[j] +"</span>";	
			        		}else{
			        			tr += "<span>"+ list[i].stage[j] +",</span>";	
			        		}
			        	}
			        	tr += "</div></td>";
			        	tr += "<td>"+ list[i].city +"</td>";
			        	tr += "</tr>";
                    });
                    $("#tableOne").append(tr);
                    $(".investorsTxtLine").on("click",function(){
                    	$("#investors-phone").text($(this).attr("data-tel"));
                    	$("#investors-wx").text($(this).attr("data-tel"));
                    	$("#investors-email").text($(this).parents("tr").find("td:last").text());
                    })
                    //投资机构列表
			        for (var i = 0; i < list.length; i++) {
			            var tr2 = [];
			            var tr3 = [];
			            var investmentL = list[i].field.length;
			            for (var j = 0; j < investmentL; j++) {
			                if (investmentL == 0 || investmentL == 1) {
		                        tr2 += list[i].field[j];
			                } else {
	                        	tr2 += list[i].field[j] + "/";
		                    }
		                    if(j<8){
		                    	tr3 = tr2;
		                    }
			            }
			            if(investmentL<9){
			            	if(investmentL>1&&investmentL<9){
			            		$(".investT" + i).find(".investTwo").append(tr2.substring(0,tr2.length-1));
			            	}else{
			            		$(".investT" + i).find(".investTwo").append(tr2);
			            	}
			            }else{
			            	var tr4 = tr3.substring(0,tr3.length-1)+'...<b class="investSummary investJg">展开</b>';
			            	$(".investT" + i).find(".investTwo").append(tr4);
			            	$(".investT" + i).find(".investAll").append(tr2.substring(0,tr2.length-1)+'<b class="investSummary investSummaryClose investJg2">收起</b>');
			            }
			        }
					$(".investEdg").each(function(){
						if($(this).html().indexOf("/") > 0){
							$(this).html($(this).html().substring(0,$(this).html().length-1));
						}
					});
					//机构展开收起
					$(".investEdg").on("click",".investJg",function(){
						$(this).parent(".investTwo").hide();
						$(this).parent(".investTwo").siblings(".investAll").show();
					})
					$(".investEdg").on("click",".investJg2",function(){
						$(this).parent(".investAll").hide();
						$(this).parent(".investAll").siblings(".investTwo").show();
					})
                }
            }
        };
        if (_leg == "tab_3") {//合作关系
            $(".mask-in").remove();
            $(".maskInTable").height("auto");
            parentPage=1;
            joinPage=1;
            partnerShip();
            joinShip();
        };
        if (_leg == "tab_4") {//幕资事件
            $(".mask-in").remove();
            $(".maskInTable").height("auto");
            if (isNullOrEmpty($("#infundraising").html())) {
                var _url = $.kf.INVESTIFUNDRAISING + "?" + "id=" + tid + "&page=" + 1;
                //new GetTable(_url, $("#pageToolEvent"), {}, infundraisingList, "get", $("#infundraising")).init();
                $("#infundraising").html("");
				var lastPage = Query.getHash("page");
	            $.getTable({
		        	url:_url,//url
			    	pageId:$("#pageToolEvent"),//分页id
			    	callback:infundraisingList,//callback
			    	currentPage:lastPage,
			    	tbodyId:$("#infundraising")//tbody的id,
		        })
                /***table***/
                function infundraisingList(data) {
                    var list = data.data;
                    var tr = "";
                    $("#infundraising").html("");
                    $(list).each(function (i) {
                        //console.log(list[i]);
                        tr += "<tr>";
                        tr += "<td>" + list[i].fund_name + "</td>";
                        tr += "<td>" + list[i].type + "</td>";
                        tr += "<td style='text-align:right'>" + list[i].money + "</td>";
                        tr += "<td>" + list[i].fundraisingName + "</td>";
                        tr += "<td style='text-align:right'>" + list[i].scale + "</td>";
                        tr += "<td>" + list[i].currencyCode + "</td>";
                        tr += "<td>" + list[i].date + "</td>";
                        tr += "<td><a class='infundDetail' data-toggle='modal' name='"+ list[i].content +"' data-target='#myModalZy'>详情</a></td>";
                        tr += "</tr>";
                    });
                    $("#infundraising").append(tr);
                    $(".infundDetail").on("click",function(){
                    	$(".patentListZy").html($(this).attr("name"));
                    })
                }
            }

        };
        if (_leg == "tab_5") {//相关新闻
            $(".mask-in").remove();
            $(".maskInTable").height("auto");
            if (isNullOrEmpty($("#imentnews").html())) {
                var _url = $.kf.GETCOMPANYNEWS + "?" + "id=" + tid + "&page=" + 1;
                //new GetTable(_url, $("#pageToolNews"), {}, imentnewsList, "get", $("#imentnews")).init();
                $("#imentnews").html("");
				var lastPage = Query.getHash("page");
	            $.getTable({
		        	url:_url,//url
			    	pageId:$("#pageToolNews"),//分页id
			    	callback:imentnewsList,//callback
			    	currentPage:lastPage,
			    	tbodyId:$("#imentnews")//tbody的id,
		        })
                /***table***/
                function imentnewsList(data) {
                    var list = data.data;
                    var tr = "";
                    $("#imentnews").html("");
                    $(list).each(function (i) {
                        tr += "<tr>";
                        if(list[i].fileExt == "pdf"){
                        	tr += "<td style='text-align:left;'><a href='"+ list[i].fileUrl +"'>" + list[i].title + "</a></td>";
                        }else{
                        tr += "<td style='text-align:left;'><a target='_blank' href='"+ $.url.newsInfoUrl() +"id=" + list[i].id + "&name=news'>" + list[i].title + "</a></td>";
                        }
                        tr += "<td>" + list[i].source + "</td>";
                        tr += "<td>" + list[i].date + "</td>";
                        tr += "</tr>";
                    });
                    $("#imentnews").append(tr);
                }
            }

        };
        if (_leg == "tab_6") {//投资管理基金
            $(".mask-in").remove();
            $(".maskInTable").height("auto");
            if (isNullOrEmpty($("#imentnewsSix").html())) {
            	initTableSix();
            }

        };
        if (_leg == "tab_7") {//基本信息
            $(".mask-in").remove();
            $(".maskInTable").height("auto");
            DetailDwon.industryMassageInit();//工商信息
			DetailDwon.industryLvInit();//企业评级
			DetailDwon.shareHolderInit();//股东信息
			DetailDwon.changeTableInit();//变更记录
			DetailDwon.annualReportsInit();//企业年报

        };
        if (_leg == "tab_8") {//经营信息
            $(".mask-in").remove();
            $(".maskInTable").height("auto");
            if (isNullOrEmpty($("#operitingList").html())) {
            	operitingInit();//经营信息
            }

        };
        if (_leg == "tab_9") {//风险信息
            $(".mask-in").remove();
            $(".maskInTable").height("auto");
            riskWarning();//风险信息

        };
        if (_leg == "tab_10") {//知识产权
            $(".mask-in").remove();
            $(".maskInTable").height("auto");
            rdInvestment();//知识产权

        };
        
    }
    var tableSelect = function(){
    	/***排序***/
        $("#jjinTabel tr span a").on("click", function (e) {
        	sortToggle(this);
        	Query.setHash({"page":1});
           	initTableSix();
        })
		new Select($("#comSelect1"),{}).init();
		new Select($("#comSelect2"),{}).init();
		new Select($("#comSelect3"),{}).init();
		//基金类型
		$("#comSelect1").find("li").on("click",function(){
			/*if(trimAll($(this).text()) == "做市"){
				Query.setHash({
					"mode":1,
					"page":1
				});
			}else if(trimAll($(this).text()) == "集合竞价"){
				Query.setHash({
					"mode":2,
					"page":1
				});
			}else{
				Query.setHash({
					"mode":"",
					"page":1
				});
			}*/
			
			$("#imentnewsSix").html("");
			initTableSix();
		});
		//备案状态
		$("#comSelect2").find("li").on("click",function(){
			/*if(trimAll($(this).text()) == "创新层"){
				Query.setHash({
					"type":1,
					"page":1
				});
			}else if(trimAll($(this).text()) == "基础层"){
				Query.setHash({
					"type":2,
					"page":1
				});
			}else{
				Query.setHash({
					"type":"",
					"page":1
				});
			}*/
			$("#imentnewsSix").html("");
			initTableSix();
		});
		//运作状态
		$("#comSelect3").find("li").on("click",function(){
			/*if(trimAll($(this).text()) == "创新层"){
				Query.setHash({
					"type":1,
					"page":1
				});
			}else if(trimAll($(this).text()) == "基础层"){
				Query.setHash({
					"type":2,
					"page":1
				});
			}else{
				Query.setHash({
					"type":"",
					"page":1
				});
			}*/
			$("#imentnewsSix").html("");
			initTableSix();
		});
	}
    //tab切换
    var comDetailTab = function(){
    	$(".overLi-btn").find("a").off("click.tab").on("click.tab", function () {
    		var thisId = Query.getHash("id");
            var _leg = $(this).attr('href');
            _leg = _leg.split("_")[1];
            pushUrlState("_"+_leg,{"id":thisId,"from":"investment"});
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
		init:function(){
			comDetailTab();//tab切换
			basicMeg();
			/*锚点跳转*/
	        $(".inArrowUl > li").find("a").off("click.tab").on("click",function(e){
	        	if($(this).hasClass("gray")){
	        		return false;
	        	}
	        	//获取和导航相对应的索引
	        	var _index = $(this).parents(".invesmentTab1").index();
	        	//调转到不同的tab
	        	if(_index != $(".inArrowPage").find("li.active").index()){
	        		$(".inArrowPage").children("li").eq(_index).children("a").click();
	        	}
	        	var _name = $(this).attr("name");
	        	var offsetTop = $("#"+_name).offset().top;//当前元素在body中的offsetTop值
	        	document.getElementById(_name).scrollIntoView(true);//显示锚点元素到顶栏
	        	var _top = $(document).scrollTop();
	        	_top = _top - 73;//123是clearHeight+$(#_name)的margin-top值；
	        	//console.log(offsetTop+":"+$(document).scrollTop());
	        	if(offsetTop == $(document).scrollTop()){
	        		//根据name元素重新定位页面位置;
	        		$(document).scrollTop(_top);
	        	}
	        });
		}
	}
}()
