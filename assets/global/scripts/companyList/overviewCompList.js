
/*挂牌概览*/
var OverviewComp = function () {
	
	var overviewCompJs = function(){
		
		//市场规模
        $.kf.ajax({
            type: "get",
            async: false,
            url: $.kf.COMPANYOVERVIEW + "?type=statsListcompanyOverviewScale",
            dataType: "json",
            data: "",
            processResponse: function (result) {
            	var data = result.data[0];
            	if(!isNullOrEmpty(data)){
            		$("#companyTotal").text(data.companyTotal);
	                $("#netProfit").text(data.totalAssets);
	                $("#operatingIncome").text(data.operatingIncome);
	                $("#totalAssets").text(data.netProfit);
                        $("#year1").text(result.date);
            	}
            	$("#companyNum").on("click",function(){
            		window.location.href = $.url.companyList() + "&currentTab=tab1"
            	})
            	$("#totalAssetss").on("click",function(){
            		window.location.href = $.url.companyList() + "&currentTab=tab1&source=scale&orderByName=total_assets&orderByType=desc"
            	})
            	$("#totalRevenue").on("click",function(){
            		window.location.href = $.url.companyList() + "&currentTab=tab1&source=scale&orderByName=operating_income&orderByType=desc"
            	})
            	$("#totalProfit").on("click",function(){
            		window.location.href = $.url.companyList() + "&currentTab=tab1&source=scale&orderByName=net_profit&orderByType=desc"
            	})
                
            }
        });
        
        //新三板企业盈利排行
        $.kf.ajax({
            type: "get",
            async: false,
            url: $.kf.COMPANYOVERVIEW + "?type=statsListcompanyOverviewProfit",
            dataType: "json",
            data: "",
            processResponse: function (result) {
            	var tr = "";
            	var list = result.data;
            	$("#privateMoney").html("");
                if (list) {
                    $(list).each(function (i) {
                    	tr += "<tr>";
                    	tr += "<td>"+ (i+1) +"</td>";
                    	tr += "<td>"+ list[i].code +"</td>";
                    	tr += "<td><a href='"+ $.url.companyListUrl()+"id="+ list[i].companyId +"&nameCodeId="+ list[i].code +"&position=companyList'>"+ list[i].shortname +"</a></td>";
                    	tr += "<td style='text-align:right'>"+ list[i].newProfit +"&nbsp;&nbsp;</td>";
                    	tr += "<td style='text-align:right'>"+ list[i].profit +"&nbsp;&nbsp;</td>";
                    	tr += "<td style='text-align:right'>"+ list[i].oldProfit +"&nbsp;&nbsp;</td>";
                    	tr += "<td>"+ list[i].growthRate +"</td>";
                    })
                    $("#privateMoney").append(tr)
                    $("#year2").text(result.date);
                }else{
                	$("#year2").text("");
                	$("#privateMoney").append("<div class='currentNoData' style='top:245px; width:165px'>新三板企业盈利排行暂无数据</div>");
                	$("#profitMore").hide();
                }
            }
        });
        
        //新三板定增排行
        $.kf.ajax({
            type: "get",
            async: false,
            url: $.kf.COMPANYOVERVIEW + "?type=statsListcompanyOverviewIncrease",
            dataType: "json",
            data: "",
            processResponse: function (result) {
            	var tr = "";
            	var list = result.data;
            	$("#privateMoney2").html("");
                if (list) {
                    $(list).each(function (i) {
                    	tr += "<tr>";
                    	tr += "<td>"+ (i+1) +"</td>";
                    	tr += "<td><a href='"+ $.url.companyListUrl()+"id="+ list[i].companyId +"&nameCodeId="+ list[i].code +"&position=companyList'>"+ list[i].shortname +"</a></td>";
                    	tr += "<td>"+ list[i].type +"</td>";
                    	tr += "<td><a href='"+ $.url.addList() + "currentTab=tab1&company=company&industry="+ list[i].industryId +"'>"+ list[i].industryName +"</a></td>";
                    	tr += "<td style='text-align:right'>"+ list[i].money +"&nbsp;&nbsp;</td>";
                    })
                    $("#privateMoney2").append(tr);
                    $("#year4").text(result.date);
                }else{
                	$("#privateMoney2").append("<div class='currentNoData' style='top:200px;'>暂无数据</div>");
                	$("#year4").text("");
                	$("#increaseMore").hide();
                }
            }
        });
        
        //新三板企业亏损排行
        $.kf.ajax({
            type: "get",
            async: false,
            url: $.kf.COMPANYOVERVIEW + "?type=statsListcompanyOverviewDeficit",
            dataType: "json",
            data: "",
            processResponse: function (result) {
            	var tr = "";
            	var list = result.data;
            	$("#privateMoney3").html("");
                if (list) {
                    $(list).each(function (i) {
                    	tr += "<tr>";
                    	tr += "<td>"+ (i+1) +"</td>";
                    	tr += "<td><a href='"+ $.url.companyListUrl()+"id="+ list[i].companyId +"&nameCodeId="+ list[i].code +"&position=companyList'>"+ list[i].shortname +"</a></td>";
                    	tr += "<td style='text-align:right'>"+ list[i].netProfit +"&nbsp;&nbsp;</td>";
                    })
                    $("#privateMoney3").append(tr)
                }else{
                	$("#privateMoney3").append("<div class='currentNoData' style='top:200px;'>暂无数据</div>");
                	$("#lossMore").hide();
                }
            }
        });
		
		//更多跳转列表
		$("#profitMore").on("click",function(){
			window.location.href = $.url.companyList() + "&currentTab=tab1&source=profit";
		})
		//更多跳转列表
		$("#lossMore").on("click",function(){
			window.location.href = $.url.companyList() + "&currentTab=tab1&source=loss";
		})
		$("#increaseMore").on("click",function(){
			window.location.href = $.url.addList() + "currentTab=tab1&company=company";
		})
		
		var myCertify = $.cookie("myCertify");//成功或者失败后第一次登录
		var certified = $.cookie("certified");//认证状态
		if(myCertify == "true"){
			$('.modal-footer').hide();
			$("#myModalTip").modal({backdrop: 'static', keyboard: false});
			if(certified == "certifiedFirst"){
				$("#certifyTip").text("恭喜您！您已成功通过认证，获得个人版长期使用权限。");
				$('.modal-footer01').show();
			} else if(certified == "certifyFailedFirst"){
				$("#certifyTip").text("很遗憾！您的认证材料未通过审核，请重新提交认证材料。");
				$('.modal-footer02').show();
				$('.comSureSave').on("click",function(){
					window.location.href = $.url.certification() + "&certify=companyList";
				});
			}
			//改变myCertify的值，只显示一次弹窗
			$.cookie("myCertify", "false", { path: "/", expiress: "" ,sucue:true});
		}
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
                'echarts/chart/bar',
                'echarts/chart/line',
                'echarts/chart/pie',
                'echarts/chart/map'
            ],
            function (ec) {
                // 基于准备好的dom，初始化echarts图表
                var myChartBar = ec.init(document.getElementById('barChart'),'macarons');
                var myChartMap = ec.init(document.getElementById('mapChart'));
                var myChartMarket2 = ec.init(document.getElementById('marketChart2'));
                var myChartPie = ec.init(document.getElementById('pieChart'));
                var myChartPie2 = ec.init(document.getElementById('pieChart2'));
                //图表自适应
                window.addEventListener("resize", function () {
                    myChartBar.resize();
                    myChartMap.resize();
                    myChartMarket2.resize();
                    myChartPie.resize();
                    myChartPie2.resize();
                })
                //挂牌企业分布/////////////////////////////////////////////////
                optionBar = {
                	tooltip : {
				        trigger: 'axis'
				    },
				     toolbox: {
					    show : true,
					    feature : {
					        saveAsImage : {
				            	show: true,
				            	name:"三板慧-市场层级",
				            	icon:'../../assets/admin/layout/img/saveAsPic.png',
				            	color:"#f57d4b"
				            }
					    }
					},
				    calculable : false,
				    legend: {
				        data:['总挂牌企业','总资产','总收入','总利润']
				    },
				    
				    xAxis : [
				        {
				            type : 'category',
				            axisLabel:{  
		                        interval:0,  
		                        rotate:-35,//倾斜度 -90 至 90 默认为0  
		                        margin:2
		                    },    
				            data : []
				        }
				    ],
				    yAxis : [
				        {
				            type : 'value',
				            axisLabel : {
				                formatter: '{value}'
				            },
				            name:"（家）"
				        },
				        {
				            type : 'value',
				            axisLabel : {
				                formatter: '{value}'
				            },
				            name:"（亿元）"
				        }
				    ],
				    grid: {
						left: '23%',
						right: '4%',
						containLabel: true,
						width: '73%',
						x: 50,
						x2: 40,
						y2: 40
					},
					calculable : false,
				    series : [
				
				        {
				            name:'总挂牌企业',
				            type:'bar',
				            data:[]
				        },
				        {
				            name:'总资产',
				            type:'line',
				            yAxisIndex: 1,
				            data:[]
				        },
				        {
				            name:'总收入',
				            type:'line',
				            yAxisIndex: 1,
				            data:[]
				        },
				        {
				            name:'总利润',
				            type:'line',
				            yAxisIndex: 1,
				            data:[]
				        }
				    ],
				    color: ['#8cc6f3','#56d7d7','#fdb989','#c8b4f2']
                };
                //市场规模2
		        $.kf.ajax({
		            type: "get",
		            async: false,
		            url: $.kf.COMPANYOVERVIEW + "?type=statsListcompanyOverviewMeaketSize",
		            dataType: "json",
		            data: "",
		            processResponse: function (result) {
		            	if (!isNullOrEmpty(result.data)) {
                            var data = result.data[0];
			            	optionBar.xAxis[0].data = data.date;
			            	optionBar.series[0].data = data.companyListed;
			            	optionBar.series[1].data = data.totalAssets;
			            	optionBar.series[2].data = data.totalRevenue;
			            	optionBar.series[3].data = data.totalProfit;
			            	myChartBar.setOption(optionBar);
                        }else{
                        	$("#barChart > div").append("<div class='currentNoData' style='top:95px;'>挂牌企业数据暂无</div>");
                        }
		            }
		        });
                
                //企业地区分布/////////////////////////////////////////////////
                optionMap = {
                	toolbox: {
				        show : true,
				        feature : {
				            saveAsImage : {
				            	show: true,
				            	name:"三板慧-挂牌企业地区分布",
				            	icon:'../../assets/admin/layout/img/saveAsPic.png',
				            	color:"#f57d4b"
				            }
				        }
				    },
                    title: {
                        text: '挂牌公司区域分布图',
                        x: 'center',
                        textStyle:{
                        	fontSize:12
                        }
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{b} : {c}"
                    },
                    dataRange: {
                        x: -5,
                        y: 'bottom',
                        splitList: [
                            {start: 1000, label: '>1000'},
                            {start: 500, end: 1000, label: '500-1000'},
                            {start: 300, end: 500, label: '300-500'},
                            {start: 100, end: 300, label: '100-300'},
                            {start: 30, end: 100, label: '30-100'},
                            {end: 30, label: '<30'}
                        ],
                        itemGap:5,
                        textStyle:{
                        	fontSize:8
                        },
                        color: ['#0C5999', '#1278BA', '#1A9CE3', '#35B7F4', '#84D4F8', '#ACDDF2']
                    },
                    series: [
                        {
                            name: '省份',
                            type: 'map',
                            mapType: 'china',
                            roam: false,
                            itemStyle: {
                                normal: {
                                    label: {
                                        show: false,
                                        textStyle: {
                                            color: "rgb(249, 249, 249)"
                                        }
                                    }
                                },
                                emphasis: {
                                    label: {show: true},
                                    areaStyle:{
                                        color:'#b6a3dc'
                                    }
                                }
                            },
                            data: [
                            ]
                        }
                    ]
                };
                //企业地区分布
                $.kf.ajax({
                    type: "get",
                    async: false,
                    url: $.kf.STATSERVICECOMPANYAREA,
//					url: "https://saas.kaifengdata.com/listedcompanystatservice/getListcompanyArea?sid=4f1f546b5bf60d519d8615f504fdff32&_=1504095298967\n",
                    dataType: "json",
                    data: "",
                    processResponse: function (result) {
                        if (!isNullOrEmpty(result.data)) {
                            optionMap.series[0].data = result.data;
                            myChartMap.setOption(optionMap);
                        }else{
                        	$("#mapChart > div").append("<div class='currentNoData' style='top:95px;'>暂无数据</div>");
                        }
                    }
                });
                
                //地图点击
                var ecConfig = require('echarts/config');
                function eConsole(param) {
                    var mes = '';
                    if (typeof param.seriesIndex != 'undefined') {
                        mes += param.seriesIndex;
                    }
                    if (param.type == 'click') {
                        window.location.href = $.url.companyList() + "&currentTab=tab1&proCode=" + param.name;
                    }
                }
                myChartMap.on(ecConfig.EVENT.CLICK, eConsole);
                
                var topNum = "";
                //挂牌企业行业分布/////////////////////////////////////////////////
                optionMarket2 = {
                	toolbox: {
				        show : true,
				        feature : {
				            saveAsImage : {
				            	show: true,
				            	name:"三板慧-券商推荐挂牌市场份额",
				            	icon:'../../assets/admin/layout/img/saveAsPic.png',
				            	color:"#f57d4b"
				            }
				        }
				    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                    	show: false,
                        orient: 'vertical',
                        x: 'left'
                    },
                    calculable: false,
                    series: [
                        {
                            name: '占比',
                            type: 'pie',
                            center: ['55%', 115],
                            radius: 40,
                            itemStyle: {
                                normal: {
                                    label: {
                                    	show: false,
                                        position: 'inner',
                                        formatter: function (params) {
                                            return (params.percent - 0).toFixed(0) + '%'
                                        }
                                    },
                                    labelLine: {
                                        show: false
                                    },
                                    color: function (params) {
                                        var colorList = [
//                                          '#FB866B', '#B6A4DD', '#FAAC2B', '#6177CE', '#3AC8C9', '#FEB980', '#D77B82', '#F1F092', '#5FB3ED', '#95E3D9'
                                        ];
                                        return colorList[params.dataIndex]
                                    }
                                },
                                emphasis: {
                                    label: {
                                        show: true,
                                        formatter: "{b}\n{d}%"
                                    }
                                }

                            },
                            data: [
                            ]
                        },
                        {
                            name: '占比',
                            type: 'pie',
                            center: ['55%', 115],
                            radius: [50, 70],
                            data: [
                            ]
                        }
                    ],
                    color: ['#feb985','#d77b82','#f1f092','#5fb3ed','#95e3d9','#fb866b','#b6a4dd','#faac2b','#6177ce','#3ac8c9']
                };
                //挂牌企业分布点击
                function eConsole2(param) {
                    var mes = '';
                    if (typeof param.seriesIndex != 'undefined') {
                        mes += param.seriesIndex;
                    }
                    if (param.type == 'click') {
                        window.location.href = $.url.companyList() + "&currentTab=tab1&inCode=" + param.data.code;
                    }
                }
                myChartMarket2.on(ecConfig.EVENT.CLICK, eConsole2);
                //挂牌企业行业分布
                $.kf.ajax({
                    type: "get",
                    async: false,
                    url: $.kf.LISTCOMPANY,
//					url: "https://test.kaifengdata.com/listedcompanystatservice/getListcompany?sid=4f1f546b5bf60d519d8615f504fdff32&_=1504148108862",
                    dataType: "json",
                    data: "",
                    processResponse: function (result) {
                        if (!isNullOrEmpty(result.data)) {
                        	topNum = result.data[0].name;
                            optionMarket2.series[0].data = result.data;
                            optionMarket2.series[1].data = result.data;
                            optionMarket2.legend.data = [topNum, '其他券商'];
                            myChartMarket2.setOption(optionMarket2);
                            $("#year3").text(result.date);
                        }else{
                        	$("#marketChart2 > div").append("<div class='currentNoData' style='top:100px;'>暂无数据</div>");
                        }
                    }
                });
                
                //分层/////////////////////////////////////////////////
                optionPie = {
                	toolbox: {
				        show : true,
				        feature : {
				            saveAsImage : {
				            	show: true,
				            	name:"三板慧-市场层级",
				            	icon:'../../assets/admin/layout/img/saveAsPic.png',
				            	color:"#f57d4b"
				            }
				        }
				    },
                    tooltip: {
                        show: true,
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        x: 'left',
                        data: ['基础层', '创新层']
                    },
                    calculable: false,
                    series: [
                        {
                            name: '市场分层',
                            type: 'pie',
                            center: ['55%', 105],
                            radius: 50,
                            itemStyle: {
                                normal: {
                                    label: {
                                        position: 'inner',
                                        formatter: function (params) {
                                            return (params.percent - 0).toFixed(0) + '%'
                                        }
                                    },
                                    labelLine: {
                                        show: false
                                    },
                                    color: function (params) {
                                        var colorList = [
                                            '#39c7c8', '#b6a4dc'
                                        ];
                                        return colorList[params.dataIndex]
                                    }
                                },
                                emphasis: {
                                    label: {
                                        show: true,
                                        formatter: "{b}\n{d}%"
                                    }
                                }

                            },
                            data: [
                            ]
                        },
                        {
                            name: '市场分层',
                            type: 'pie',
                            center: ['55%', 105],
                            radius: [60, 80],
                            data: [
                            ]
                        }
                    ]
                };
                //分层
                $.kf.ajax({
                    type: "get",
                    async: false,
                    url: $.kf.COMPANYLAYER,
//					url: "https://saas.kaifengdata.com/listedcompanystatservice/getListcompanyLayer?sid=4f1f546b5bf60d519d8615f504fdff32&_=1504151643230",
                    dataType: "json",
                    data: "",
                    processResponse: function (result) {
                        if (!isNullOrEmpty(result.data)) {
                            //判断数据是否为空
                            optionPie.series[0].data = result.data;
                            optionPie.series[1].data = result.data;
                            myChartPie.setOption(optionPie);
                        }else{
                        	$("#pieChart > div").append("<div class='currentNoData' style='top:100px;'>分层暂无数据</div>");
                        }
                    }
                });
                //分层点击
                function eConsole3(param) {
                    var mes = '';
                    if (typeof param.seriesIndex != 'undefined') {
                        mes += param.seriesIndex;
                    }
                    if (param.type == 'click') {
                    	var type = "";
                    	if(param.data.name == "基础层"){
                    		type = 2;
                    	}else{
                    		type = 1;
                    	}
                        window.location.href = $.url.companyList() + "&currentTab=tab1&type=" + type;
                    }
                }
                myChartPie.on(ecConfig.EVENT.CLICK, eConsole3);


                //转让方式分布/////////////////////////////////////////////////
                optionPie2 = {
                	toolbox: {
				        show : true,
				        feature : {
				            saveAsImage : {
				            	show: true,
				            	name:"三板慧-转让方式",
				            	icon:'../../assets/admin/layout/img/saveAsPic.png',
				            	color:"#f57d4b"
				            }
				        }
				    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{b} : {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        x: 'left',
                        data: ['协议', '做市']
                    },
                    calculable: false,
                    series: [
                        {
                            name: '转让方式',
                            type: 'pie',
                            center: ['55%', 105],
                            radius: 50,
                            itemStyle: {
                                normal: {
                                    label: {
                                        position: 'inner',
                                        formatter: function (params) {
                                            return (params.percent - 0).toFixed(0) + '%'
                                        }
                                    },
                                    labelLine: {
                                        show: false
                                    },
                                    color: function (params) {
                                        var colorList = [
                                            '#39c6c8', '#b6a3dc'
                                        ];
                                        return colorList[params.dataIndex]
                                    },
                                },
                                emphasis: {
                                    label: {
                                        show: true,
                                        formatter: "{b}\n{d}%"
                                    }
                                }

                            },
                            data: [
                            ]
                        },
                        {
                            name: '转让方式分布',
                            type: 'pie',
                            center: ['55%', 105],
                            radius: [60, 80],
                            data: [
                            ]
                        }
                    ]
                };
                //转让方式分布
                $.kf.ajax({
                    type: "get",
                    async: false,
                    url: $.kf.COMPANYTRANSFORMODE,
                    dataType: "json",
                    data: "",
                    processResponse: function (result) {
                        if (!isNullOrEmpty(result.data)) {
                            optionPie2.series[0].data = result.data;
                            optionPie2.series[1].data = result.data;
                            myChartPie2.setOption(optionPie2);
                        }else{
                        	$("#pieChart2 > div").append("<div class='currentNoData' style='top:100px;'>转让方式暂无数据</div>");
                        
                        }
                    }
                });
                //转让方式点击
                function eConsole4(param) {
                    var mes = '';
                    if (typeof param.seriesIndex != 'undefined') {
                        mes += param.seriesIndex;
                    }
                    if (param.type == 'click') {
                    	var mode = "";
                    	if(param.data.name == "协议"){
                    		mode = 2;
                    	}else{
                    		mode = 1;
                    	}
                        window.location.href = $.url.companyList() + "&currentTab=tab1&mode=" + mode;
                    }
                }
                myChartPie2.on(ecConfig.EVENT.CLICK, eConsole4);
                myChartMap.setOption(optionMap);
            }
        )
	}
    return {
        init: function () {
        	overviewCompJs();
        }
    }
}();

//@ sourceURL=overviewCompList.js