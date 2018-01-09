/*
     
     * 
     * 商业分析
     * 
     * 
     * */

    //商业分析主营业务
    var businessAnalysis = function () {
        var _url = "";
        var id = Query.getHash("id");
       	//anchorPosition();
        _url = $.kf.GETMAINBUSINES + "?" + "id=" + id ;
		$.kf.ajax({
            type: "get",
            url: _url,
            data: "",
            dataType: "json",
            processResponse: function(data){
        		var list = data.data;
            	if (!isNullOrEmpty(list.content)) {
        		 	$(".server-scope").html("");
            		$(".server-scope").html(list.content);
                }else{
                	$(".server-scope").hide();
                }
            	
            }
        });	
        $(".msg-service").find("a").on("click",function(e){
        	var _name = $(this).attr("name");
        	document.getElementById(_name).scrollIntoView();
        	var _top = $(document).scrollTop();
        	_top = _top - 180;
        	$(document).scrollTop(_top);
        	
        });
        //营收来源
        revenueStreams();
        revenueStreamsList();
        //主要客户
        majorClient();
        //主要供应商
        majorSupplier();
        //商业模式
        businessModel();
       	// 同商业模式企业
        theSameComp();
    };
    //同商业详情弹窗
    function toSamePop(){
		$(".toSamePop").off().on("click",function(){
	    	var dataTitle = $(this).parents("table").find("th").eq($(this).parents("td").index()).text();
			var dataContent = $(this).siblings("span").text();
			$("#samePop").find(".modal-title").text(dataTitle);
	    	if(isNullOrEmpty(dataContent)||dataContent == "--"){
	    		$("#samePop").find("#compPopSame").html("暂无详情！");
	    	}else{
	    		$("#samePop").find("#compPopSame").html(dataContent);
	    	}
	    	
	    });
	}
    toSamePop();
    //锚点定位平滑过渡
    var anchorPosition = function (){
		$('a[href*=#],area[href*=#]').click(function() {
		    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
		      var $target = $(this.hash);
		      $target = $target.length && $target || $('[name=' + this.hash.slice(1) + ']');
		      if ($target.length) {
		        var targetOffset = $target.offset().top;
		        $('html,body').animate({
		          scrollTop: targetOffset
		        },
		        500);
		        return false;
		   }
	    }
	  });
    }
    //营收来源
    var revenueStreams = function(){
    	var _url = "";
        var id = Query.getHash("id");
        _url = $.kf.GETREVENUESOURCES + "?" + "id=" + id ;
		$.kf.ajax({
            type: "get",
            url: _url,
            data: "",
            dataType: "json",
            processResponse: function(data){
            	var list = data.data;
            	if (list.length != 0) {
            		var tr = "";
	            	$("#revenueStreams-date").find("span").html(list[0].date)
			        $("#businessTbody").html("");
			        $(list).each(function (i) {
			            tr += "<tr>";
			            tr += "<td>" + list[i].business + "</td>";
			            tr += "<td>" + list[i].businessIncome + "</td>";
			            tr += "<td>" + list[i].businessIncomeRatio + "</td>";
			            tr += "</tr>";
			        });
			        $("#businessTbody").append(tr);
                }else{
                	$(".msg-business").hide();
                }
            }
        });	
    }
    //统计图表配置
    var revenueStreamsList = function(data){
    	 // 路径配置
	    require.config({
	        paths: {
	            echarts: '../../assets/global/plugins/echarts/build/dist'
	        }
	    });
	    
	    // 使用
	    require(
	        [
	            'echarts',
	            'echarts/chart/pie',
	        ],
	        function (ec) {
	            // 基于准备好的dom，初始化echarts图表
	            var myChartPie = ec.init(document.getElementById('revenueStreams')); 
				var myChartPie2 = ec.init(document.getElementById('majorClient'));
				var myChartPie3 = ec.init(document.getElementById('majorSupplie')); 
				//图表自适应
				/*window.addEventListener("resize",function(){
		        	myChartPie.resize();
		        	myChartPie2.resize();
		        	myChartPie3.resize();
		        })*/
			option = {
				calculable : false,
			    tooltip : {
			        trigger: 'item',
			        formatter: "{b}</br>销售金额 : {c}元"
			    },
			    legend: {
			        orient : 'vertical',
			        x : 320,
			        y : 60,
			        data:[],
			        textStyle:{
			        	fontFamily:"微软雅黑"
			        }
			    },
			    series : [
			        {
			            name:'',
			            type:'pie',
			            radius : ['30%', '60%'],
			            center: ['30%', '50%'],
			            itemStyle : {
			                normal : {
			                    label : {
			                        show : false,
			                        formatter : "{c}"
			                    },
			                    labelLine : {
			                        show : false
			                    }
			                },
			            },
			            data:[]
			        }
			    ]
			};
			option2 = {
			    tooltip : {
			        trigger: 'item',
			        formatter: "{b}</br>销售金额 : {c}元"
			    },
			    legend: {
			        x : 320,
			        y : 60,
			        orient : 'vertical',
			        data:[]
			    },
			    calculable : false,
			    series : [
			        {
			            name:'半径模式',
			            type:'pie',
			            radius : [20, 80],
			            center : ['30%', '50%'],
			            roseType : 'radius',
			            width: '40%',      
			            max: 40,           
			            itemStyle : {
			                normal : {
			                    label : {
			                        show : false,
			                        formatter : "{c}"
			                    },
			                    labelLine : {
			                        show : false,
			                        length : 10
			                    }
			                }
			            },
			            data:[]
			        }
			    ]
			};
			option3 = { 
				tooltip : {
			        trigger: 'item',
			         formatter: "{b}</br>销售金额 : {c}元"
			    },
			    legend: {
			        orient : 'vertical',
			        x : 320,
			        y : 60,
			        data:[],
			        textStyle:{
			        	fontFamily:"微软雅黑"
			        }
			    },
			    calculable : false,
			    series : [
			        {
			            name:'',
			            type:'pie',
			            radius : '60%',
			            center: ['30%', '50%'],
			            itemStyle : {
			                normal : {
			                    label : {
			                        show : false,
			                        formatter : "{c}"
			                    },
			                    labelLine : {
			                        show : false,
			                        length : 10
			                    }
			                }
			            },
			            data:[]
			        }
			    ]};
			
			//营收来源
			var _url = "";
	        var id = Query.getHash("id");
	        _url = $.kf.GETMAINBUSINESSTATISTICS + "?" + "id=" + id ;
			$.kf.ajax({
	            type: "get",
	            url: _url,
	            data: "",
	            dataType: "json",
	            processResponse: function(data){
	            	var list = data.data;
	            	if(isNullOrEmpty(list.data)){
	            		option.series[0].data = [{"name":"","value":0}];
	            	}else{
	            		option.series[0].data = list.data;
	            	}
	            	option.legend.data = list.title;
	            	myChartPie.setOption(option);
	            	
            	}
	        });
	        //主要客户
		    var _url2 = $.kf.GETMAJORCLIENTSTATISTICS + "?" + "id=" + id ;
	    	$.kf.ajax({
	            type: "get",
	            url: _url2,
	            data: "",
	            dataType: "json",
	            processResponse: function(data){
	            	var list = data.data;
	            	option2.series[0].data = list.data;
	            	option2.legend.data = list.title;
	            	if(!isNullOrEmpty(list.data)){
	            		myChartPie2.setOption(option2);
	            	}else{
	            		$("#majorSupplie").hide();
	            	}
            	}
	        });	
       		//主要供应商
       		var _url3 = $.kf.GETMAJORSUPPLIERSTASISTICS + "?" + "id=" + id ;
       		$.kf.ajax({
	            type: "get",
	            url: _url3,
	            data: "",
	            dataType: "json",
	            processResponse: function(data){
	            	var list = data.data;
	            	option3.series[0].data = list.data;
	            	option3.legend.data = list.title;
	            	if(!isNullOrEmpty(list)){
	            		myChartPie3.setOption(option3);
	            	}
            	}
	        });
        })
}
    //主要客户
    var majorClient = function(){
    	var _url = "";
        var id = Query.getHash("id");
        _url = $.kf.GETMAJORCLIENT + "?" + "id=" + id ;
		$.kf.ajax({
            type: "get",
            url: _url,
            data: "",
            dataType: "json",
            processResponse: function(data){
            	var list = data.data;
            	if (!isNullOrEmpty(list)) {
            		var tr = "";
	            	$("#majorClient-data").find("span").html(list[0].date);
			        $("#majorClientTbody").html("");
			        $(list).each(function (i) {
			            tr += "<tr>";
			            if(isNullOrEmpty(list[i].companyId)){
			            	tr += "<td>"+ list[i].clientName + "</td>";
			            }else{
			            	tr += "<td><a class='basicName' data-name='"+list[i].clientName+"' href='"+$.url.industryUrl() + "companyName=" + list[i].clientName+"'>" + list[i].clientName + "</a></td>";
			            };
			            tr += "<td>" + list[i].salesAmount + "</td>";
			            tr += "<td>" + list[i].salesAmountRatio + "</td>";
			            tr += "</tr>";
			        });
			        $("#majorClientTbody").append(tr);
            	}else{
            		$(".majorWrap").hide();
            		$("#majorClient").hide();
            	}
            	
            	 //扣费跳转
		        var isCookie = false;
		        moneyUrl($(".basicName"), isCookie, "isCookie");
            }
        });	
    }
	//主要供应商
	var majorSupplier = function(){
	    	var _url = "";
	        var id = Query.getHash("id");
	        _url = $.kf.GETMAJORSUPPLIER + "?" + "id=" + id ;
			$.kf.ajax({
	            type: "get",
	            url: _url,
	            data: "",
	            dataType: "json",
	            processResponse: function(data){
	            	var list = data.data;
	            	if (!isNullOrEmpty(list)) {
		            	var tr = "";
		           		$("#majorSupplier-data").find("span").html(list[0].date);
				        $("#majorSupplierTbody").html("");
				        $(list).each(function (i) {
				            tr += "<tr>";
				            if(isNullOrEmpty(list[i].companyId)){
				            	tr += "<td>"+ list[i].companyName + "</td>";
				            }else{
				            	tr += "<td><a class='basicName2' data-name='"+list[i].companyName+"' href='"+$.url.industryUrl() + "companyName=" + list[i].companyName+"'>" + list[i].companyName + "</a></td>";
				            };
				            tr += "<td>" + list[i].purchaseAmount + "</td>";
				            tr += "<td>" + list[i].purchaseAmountRatio + "</td>";
				            tr += "</tr>";
				        });
				        $("#majorSupplierTbody").append(tr);
			        }else{
			        	$(".supplierBox").hide();
            			$("#majorSupplie").hide();
			        }
			        
			         //扣费跳转
			        var isCookie = false;
			        moneyUrl($(".basicName2"), isCookie, "isCookie");
	            }
	        });	
	    }
	//商业模式tab
	var businessModel = function(){
		var _url = "";
        var id = Query.getHash("id");
        $(".server-scope").html("");
        _url = $.kf.GETBUSINESSMODEL + "?" + "id=" + id ;
		$.kf.ajax({
            type: "get",
            url: _url,
            data: "",
            dataType: "json",
            processResponse: function(data){
            	var list = data.data;
            	if (!isNullOrEmpty(list.data[0])) {
	            	var dateList = list.year;
	            	var contentList = list.data;
	            	$(".businessModel-date").html("");
	            	$(dateList).each(function(i){
	            		if(i==0){
	            			$(".businessModel-date").append("<li class='busDateList active'><a>"+dateList[i]+"</a><span class='hide'>"+contentList[i].summary+"</span></li>");
	            		}else{
	            			$(".businessModel-date").append("<li class='busDateList'><a>"+dateList[i]+"</a><span class='hide'>"+contentList[i].summary+"</span></li>");
	            		}
	            	})
	            	$(".businessModel-content").html(contentList[0].summary);
            	}else{
            		$(".businessModel-date").hide();
            		$(".businessModel-content").hide();
            	}
            }
        });	
	};
	$("body").on("click",".busDateList",function(){
		$(".businessModel-content").html("");
		$(this).addClass('active').siblings().removeClass('active');
		$(".businessModel-content").html($(this).find("span").html());
	})
	//同商业模式企业
	var theSameComp = function(){
		_url = $.kf.GETCOMPANYSIMILIAR + "?id=" +Query.getHash("id");
		var lastPage =1;
            $.getTable({
            	showDefaultTabel:false,
	        	url:_url,//url
		    	pageId:$("#pageToolSame"),//分页id
		    	callback:getListSame,//callback
		    	currentPage:lastPage,
		    	loadId:".maskInTableTonf",
		    	targetId:"syfx6",
		    	tbodyId:$("#tableOneSame")//tbody的id,
	        })
	};
	var nameArr = [];
	var getListSame = function (data) {
        var list = data.data;
        var tr = "";
        $("#tableOneSame").html("");
        $(list).each(function (i) {
        	nameArr.push(list[i].modelIntroduction);
            tr += "<tr>";
            tr += "<td>" + list[i].code + "</td>";
            if(list[i].isOptional == "0"){
            	 tr += "<td><a href='" + $.url.companyListUrl() + "id=" + list[i].companyId + "&nameCodeId=" + list[i].code+"'>" + list[i].shortname + "</a></td>";
            }else{
            	 tr += "<td><a style='color:#f57d4b' href='" + $.url.companyListUrl() + "id=" + list[i].companyId + "&nameCodeId=" + list[i].code+"'>" + list[i].shortname + "</a></td>";
            }
            tr += "<td class='queryWidthCom'>" + list[i].latestPrice + "</td>";
            tr += "<td>" + list[i].date + "</td>";
            tr += "<td class='queryWidthCom'>" + list[i].netProfit + "</td>";
            tr += "<td class='queryWidthCom'>" + list[i].earningsPerShare + "</td>";
            tr += "<td class='queryWidthCom'>" + list[i].dynamicPofit + "</td>";
            tr += "<td class='queryWidthCom'>" + list[i].netAssetsYield + "</td>";
            tr += "<td class='queryWidthCom'>" + list[i].totalShareCapital + "</td>";
            tr += "<td><a data-toggle='modal' data-target='#samePop' class='toSamePop'  name='"+i+"'>查看详情</a><span class='col-hide'>"+ list[i].modelIntroduction +"</span></td>";
            tr += "</tr>";
        });
        $("#tableOneSame").append(tr);
        toSamePop();
    };
	
