
/*定增概览*/
var OverviewPrivate = function () {

	var privateDate = function(){
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
	                'echarts/chart/line'
	            ],
	            function (ec) {
	            	var _width = $(".page-content-par").width() - 20;
	            	$("#barChart2").width($(".page-content-par").width());
	            	$("#barChart4").width(_width);
	            	$("#barChart6").width(_width);
	            	$("#barChart8").width(_width);
	                // 基于准备好的dom，初始化echarts图表
	                var myChartBar = ec.init(document.getElementById('barChart'));
	                var myChartBar2 = ec.init(document.getElementById('barChart2'));
	                var myChartBar3 = ec.init(document.getElementById('barChart3'),'macarons');
	                var myChartBar4 = ec.init(document.getElementById('barChart4'),'macarons');
	                var myChartBar5 = ec.init(document.getElementById('barChart5'),'macarons');
	                var myChartBar6 = ec.init(document.getElementById('barChart6'),'macarons');
	                var myChartBar7 = ec.init(document.getElementById('barChart7'),'macarons');
	                var myChartBar8 = ec.init(document.getElementById('barChart8'),'macarons');
	
	                //图表自适应
	                window.addEventListener("resize", function () {
	                	var _width = $(".page-content-par").width() - 20;
		            	$("#barChart2").width($(".page-content-par").width());
		            	$("#barChart4").width(_width);
		            	$("#barChart6").width(_width);
		            	$("#barChart8").width(_width);
	                    myChartBar.resize();
	                    myChartBar2.resize();
	                    myChartBar3.resize();
	                    myChartBar4.resize();
	                    myChartBar5.resize();
	                    myChartBar6.resize();
	                    myChartBar7.resize();
	                    myChartBar8.resize();
	                })
	
	
	
	                //季度增发统计/////////////////////////////////////////////////
	                var totalHome = function(){
	                	var mgh = $(".barChartH").height();
		                optionBar = {
		                	toolbox: {
						        show : true,
						        feature : {
						            saveAsImage : {
						            	show: true,
						            	name:"三板慧-季度增发统计",
						            	icon:'../../assets/admin/layout/img/saveAsPic.png',
						            	color:"#f57d4b"
						            }
						        }
						    },
		                    tooltip : {
		                    	toolbox: {
						        show : true,
						        feature : {
						            saveAsImage : {
						            	show: true,
						            	name:"三板慧",
						            	icon:'../../assets/admin/layout/img/saveAsPic.png',
						            	color:"#f57d4b"
						            }
						        }
						    },
						        trigger: 'axis',
						        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
						            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
						        },
						        formatter: function(param){
						        	var res = param[0].name+"<br/>"
						        	if(param[0].data == ""){
						        		res += param[0].seriesName+"：--家<br/>";
						        	}else{
						        	res += param[0].seriesName+"："+param[0].data+"家<br/>";
						        	}
						        	if(param[1].data == ""){
						        		res += param[1].seriesName+"：--家<br/>";
						        	}else{
						        	res += param[1].seriesName+"："+param[1].data+"家<br/>";
						        	}
						        	if(param[2].data == ""){
						        		res += param[2].seriesName+"：--家<br/>";
						        	}else{
						        	res += param[2].seriesName+"："+param[2].data+"家<br/>";
						        	}
						        	if(param[3].data == ""){
						        		res += param[3].seriesName+"：--家<br/>";
						        	}else{
						        	res += param[3].seriesName+"："+param[3].data+"家<br/>";
						        	}
						        	if(param[4].data == ""){
						        		res += param[4].seriesName+"：--家<br/>";
						        	}else{
						        	res += param[4].seriesName+"："+param[4].data+"家<br/>";
						        	}
						        	return res;
						        }
						    },
						    grid: {
						    	borderWidth:0
						    },
						    legend: {
						        data:['增发总数', '基础层', '创新层', '做市转让', '协议转让']
						    },
						    calculable : true,
						    xAxis : [
						        {
						        	splitLine:{
								　　　　show:false
								　　},
						            type : 'value'
						        }
						    ],
						    yAxis : [
						        {
						            type : 'category',
						            splitLine:{
								　　　　show:false
								　　},
						            axisLabel:{
					                     textStyle:{
					                     	fontFamily: '微软雅黑',
					                         color:"#f57d4b"
					                     }
					                },
						            data : []
						        }
						    ],
						    series : [
						        {
						            name:'增发总数',
						            type:'bar',
						            stack: '总量',
						            itemStyle : {
						            	normal:
							            	{
							            		label : {
							            			show: true, 
							            			position: 'insideLeft',
							            			formatter: '{c}'+' 家'
							            		}, 
							            		color: '#205ea7'
							            		
							            	}
						            	},
						            data:[]
						        },
						        {
						            name:'基础层',
						            type:'bar',
						            stack: '总量',
						            itemStyle : { normal: {label : {show: true, position: 'insideLeft',formatter: '{c}'+' 家'}, color: '#b6a3dc'}},
						            data:[]
						        },
						        {
						            name:'创新层',
						            type:'bar',
						            stack: '总量',
						            itemStyle : { normal: {label : {show: true, position: 'insideLeft',formatter: '{c}'+' 家'}, color: '#3ac7a8'}},
						            data:[]
						        },
						        {
						            name:'做市转让',
						            type:'bar',
						            stack: '总量',
						            itemStyle : { normal: {label : {show: true, position: 'insideLeft',formatter: '{c}'+' 家'}, color: '#4ca9de'}},
						            data:[]
						        },
						        {
						            name:'协议转让',
						            type:'bar',
						            stack: '总量',
						            itemStyle : { normal: {label : {show: true, position: 'insideLeft',formatter: '{c}'+' 家'}, color: '#feb985'}},
						            data:[]
						        }
						    ]
		                };
		                //季度增发统计
		                $.kf.ajax({
		                    type: "get",
		                    async: false,
		                    url: $.kf.ISSUANCESTAT + '?type=statsListcompanyDilutionCompanynum',
		                    dataType: "json",
		                    data: "",
		                    processResponse: function (result) {
		                        if (isData($("#barChart"), result.data, "")) {
		                        	$("#year").text(result.date)
		                            optionBar.yAxis[0].data = result.data.name.reverse();
		                            optionBar.series[0].data = result.data.total.reverse();
		                            optionBar.series[2].data = result.data.base.reverse();
		                            optionBar.series[1].data = result.data.idea.reverse();
		                            optionBar.series[3].data = result.data.make.reverse();
		                            optionBar.series[4].data = result.data.agree.reverse();
		                            myChartBar.setOption(optionBar);
		                            //$(".yeara").text(result.date)
		                        }else{
		                        	$("#barChart").parent().css("background","white");
		                        }
		                    }
		                });
	                }
	                totalHome();
	                
	                
	                //季度增发统计/////////////////////////////////////////////////
	                var totalMoney = function(){
	                	var mgh = $(".barChartH").height();
		                optionBar2 = {
		                	toolbox: {
						        show : true,
						        feature : {
						            saveAsImage : {
						            	show: true,
						            	name:"三板慧-季度增发统计",
						            	icon:'../../assets/admin/layout/img/saveAsPic.png',
						            	color:"#f57d4b"
						            }
						        }
						    },
		                    tooltip : {
						        trigger: 'axis',
						        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
						            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
						        },
						        formatter: function(param){
						        	var res = param[0].name+"<br/>"
						        	if(param[0].data == ""){
						        		res += param[0].seriesName+"：--亿<br/>";
						        	}else{
						        	res += param[0].seriesName+"："+param[0].data+"亿<br/>";
						        	}
						        	if(param[1].data == ""){
						        		res += param[1].seriesName+"：--亿<br/>";
						        	}else{
						        	res += param[1].seriesName+"："+param[1].data+"亿<br/>";
						        	}
						        	if(param[2].data == ""){
						        		res += param[2].seriesName+"：--亿<br/>";
						        	}else{
						        	res += param[2].seriesName+"："+param[2].data+"亿<br/>";
						        	}
						        	if(param[3].data == ""){
						        		res += param[3].seriesName+"：--亿<br/>";
						        	}else{
						        	res += param[3].seriesName+"："+param[3].data+"亿<br/>";
						        	}
						        	if(param[4].data == ""){
						        		res += param[4].seriesName+"：--亿<br/>";
						        	}else{
						        	res += param[4].seriesName+"："+param[4].data+"亿<br/>";
						        	}
						        	return res;
						        }
						    },
						    legend: {
						        data:['增发总额', '基础层', '创新层', '做市转让', '协议转让']
						    },
						    grid: {
						    	borderWidth:0
						    },
						    calculable : true,
						    xAxis : [
						        {
						        	splitLine:{
								　　　　show:false
								　　},
						            type : 'value'
						        }
						    ],
						    yAxis : [
						        {
						            type : 'category',
						            splitLine:{
								　　　　show:false
								　　},
						            axisLabel:{
					                     textStyle:{
					                     	fontFamily: '微软雅黑',
					                         color:"#f57d4b"
					                     }
					                },
						            data : []
						        }
						    ],
						    series : [
						   	 	{
						            name:'增发总额',
						            type:'bar',
						            stack: '总量',
						            itemStyle : { normal: {label : {show: true, position: 'insideLeft',formatter: '{c}'+' 亿'}, color: '#205ea7'}},
						            data:[]
						        },
						        {
						            name:'基础层',
						            type:'bar',
						            stack: '总量',
						            itemStyle : { normal: {label : {show: true, position: 'insideLeft',formatter: '{c}'+' 亿'}, color: '#b6a3dc'}},
						            data:[]
						        },
						        {
						            name:'创新层',
						            type:'bar',
						            stack: '总量',
						            itemStyle : { normal: {label : {show: true, position: 'insideLeft',formatter: '{c}'+' 亿'}, color: '#3ac7a8'}},
						            data:[]
						        },
						        {
						            name:'做市转让',
						            type:'bar',
						            stack: '总量',
						            itemStyle : { normal: {label : {show: true, position: 'insideLeft',formatter: '{c}'+' 亿'}, color: '#4ca9de'}},
						            data:[]
						        },
						        {
						            name:'协议转让',
						            type:'bar',
						            stack: '总量',
						            itemStyle : { normal: {label : {show: true, position: 'insideLeft',formatter: '{c}'+' 亿'}, color: '#feb985'}},
						            data:[]
						        }
						    ]
		                };
		                //季度增发统计
		                $.kf.ajax({
		                    type: "get",
		                    async: false,
		                    url: $.kf.ISSUANCESTAT + '?type=statsListcompanyDilutionSum',
		                    dataType: "json",
		                    data: "",
		                    processResponse: function (result) {
		                        if (isData($("#barChart2"), result.data, "")) {
		                            optionBar2.yAxis[0].data = result.data.name.reverse();
		                            optionBar2.series[0].data = result.data.total.reverse();
		                            optionBar2.series[2].data = result.data.base.reverse();
		                            optionBar2.series[1].data = result.data.idea.reverse();
		                            optionBar2.series[3].data = result.data.make.reverse();
		                            optionBar2.series[4].data = result.data.agree.reverse();
		                            myChartBar2.setOption(optionBar2);
		                            //$(".yeara").text(result.date)
		                        }else{
		                        	$("#barChart2").parent().css("background","white");
		                        }
		                    }
		                });
	                }
	                
	                //总家数、总金额切换
	                $(".privateTab a").click(function(){
	                	$(this).addClass("active").siblings("a").removeClass("active");
	                	$("#industryArea1").attr("checked",true);
	                	$("#industryArea4").attr("checked",false);
	                	if($(this).text() == "总家数"){
	                		$("#barChart").parent("div").removeClass("hide");
	                		$("#barChart2").parent("div").addClass("hide")
	                		totalHome();
	                		totalIndustry();
	                	}else if($(this).text() == "总金额"){
	                		$("#industryArea3").attr("checked",true)
	                		$("#barChart2").parent("div").removeClass("hide");
	                		$("#barChart").parent("div").addClass("hide")
	                		totalMoney();
	                		totalArea();
	                	}
	                })
	                
	                
	                //季度增发统计 行业融资公司数统计/////////////////////////////////////////////////
	                var totalIndustry = function(){
	                	var mgh = $(".barChartH").height();
		                optionBar3 = {
		                	toolbox: {
						        show : true,
						        feature : {
						            saveAsImage : {
						            	show: true,
						            	name:"三板慧",
						            	icon:'../../assets/admin/layout/img/saveAsPic.png',
						            	color:"#f57d4b"
						            }
						        }
						    },
						    tooltip: {
	                        show: true
		                    },
		                    grid :{ y:'40',height:'60%'},
		                    xAxis : [
		                        {
		                            type : 'category',
		                            axisLabel:{  
				                        interval:0,  
				                        rotate:35,//倾斜度 -90 至 90 默认为0  
				                        margin:2
				                    },    
		                            data : []
		                        }
		                    ],
		                    yAxis : [
		                        {
		                        	name: '增发家数（家）',
		                            type : 'value',
		                            nameTextStyle:{
		                            	color:'#2391cd'
		                            }
		                        }
		                    ],
		                    series : [
		                        {
		                            name:"数量",
		                            type:"bar",
		                            itemStyle: {normal: {
						                color:'#2391cd',
						                barBorderRadius: [0]
						            },
						            emphasis: {
							            barBorderRadius: [0]
							            }
						           	},
		                            data:[]
		                        }
		                    ]
		                };
		                $.kf.ajax({
		                    type: "get",
		                    async: false,
		                    url: $.kf.ISSUANCESTAT + '?type=statsListcompanyDilutionIndustryCompanynum',
		                    dataType: "json",
		                    data: "",
		                    processResponse: function (result) {
		                        if (isData($("#barChart3"), result.data, "")) {
		                        	myChartBar3.clear();
		                            optionBar3.xAxis[0].data = result.data.industry;
		                            optionBar3.series[0].data = result.data.value;
		                            myChartBar3.setOption(optionBar3,true);
		                            //$(".yeara").text(result.date)
		                        }else{
		                        	$("#barChart3").parent().css("background","white");
		                        }
		                    }
		                });
		                //季度增发统计
		                $("#industryArea1").click(function(){
		                	$.kf.ajax({
			                    type: "get",
			                    async: false,
			                    url: $.kf.ISSUANCESTAT + '?type=statsListcompanyDilutionIndustryCompanynum',
			                    dataType: "json",
			                    data: "",
			                    processResponse: function (result) {
			                        if (isData($("#barChart3"), result.data, "")) {
			                        	myChartBar3.clear();
			                            optionBar3.xAxis[0].data = result.data.industry;
			                            optionBar3.series[0].data = result.data.value;
			                            myChartBar3.setOption(optionBar3,true);
			                            //$(".yeara").text(result.date)
			                        }else{
			                        	$("#barChart3").parent().css("background","white");
			                        }
			                    }
			                });
		                })
		                //季度增发统计
		                $("#industryArea2").click(function(){
		                	$.kf.ajax({
			                    type: "get",
			                    async: false,
			                    url: $.kf.ISSUANCESTAT + '?type=statsListcompanyDilutionAreaCompanynum',
			                    dataType: "json",
			                    data: "",
			                    processResponse: function (result) {
			                        if (isData($("#barChart3"), result.data, "")) {
			                        	myChartBar3.clear();
			                            optionBar3.xAxis[0].data = result.data.area;
			                            optionBar3.series[0].data = result.data.value;
			                            myChartBar3.setOption(optionBar3,true);
			                            //$(".yeara").text(result.date)
			                        }else{
			                        	$("#barChart3").parent().css("background","white");
			                        }
			                    }
			                });
		                })
	                }
	                totalIndustry();
	                
	                //季度增发统计 地区融资额统计/////////////////////////////////////////////////
	                var totalArea = function(){
	                	var mgh = $(".barChartH").height();
		                optionBar4 = {
		                	toolbox: {
						        show : true,
						        feature : {
						            saveAsImage : {
						            	show: true,
						            	name:"三板慧",
						            	icon:'../../assets/admin/layout/img/saveAsPic.png',
						            	color:"#f57d4b"
						            }
						        }
						    },
						    tooltip: {
	                        show: true
		                    },
		                    grid :{ y:'40',height:'60%'},
		                    xAxis : [
		                        {
		                            type : 'category',
		                            axisLabel:{  
				                        interval:0,  
				                        rotate:35,//倾斜度 -90 至 90 默认为0  
				                        margin:2
				                    },    
		                            data : []
		                        }
		                    ],
		                    yAxis : [
		                        {
		                        	name: '增发金额（亿）',
		                            type : 'value'
		                        }
		                    ],
		                    series : [
		                        {
		                            name:"金额",
		                            type:"bar",
		                            itemStyle: {
		                            	normal: {
							                color:'#2391cd',
							                barBorderRadius: [0]
							            },
							            emphasis: {
								            barBorderRadius: [0]
							            }
						           	},
		                            data:[]
		                        }
		                    ]
		                };
		                
		                $.kf.ajax({
		                    type: "get",
		                    async: false,
		                    url: $.kf.ISSUANCESTAT + '?type=statsListcompanyDilutionIndustrySum',
		                    dataType: "json",
		                    data: "",
		                    processResponse: function (result) {
		                        if (isData($("#barChart4"), result.data, "")) {
		                            optionBar4.xAxis[0].data = result.data.industry;
			                        optionBar4.series[0].data = result.data.value;
		                            myChartBar4.setOption(optionBar4,true);
		                        }else{
		                        	$("#barChart4").parent().css("background","white");
		                        }
		                    }
		                });
		                
		                $("#industryArea3").click(function(){
		                	$.kf.ajax({
			                    type: "get",
			                    async: false,
			                    url: $.kf.ISSUANCESTAT + '?type=statsListcompanyDilutionIndustrySum',
			                    dataType: "json",
			                    data: "",
			                    processResponse: function (result) {
			                        if (isData($("#barChart4"), result.data, "")) {
			                            optionBar4.xAxis[0].data = result.data.industry;
			                            optionBar4.series[0].data = result.data.value;
			                            myChartBar4.setOption(optionBar4,true);
			                            //$(".yeara").text(result.date)
			                        }
			                    }
			                });
		                })
		                
		                $("#industryArea4").click(function(){
		                	$.kf.ajax({
			                    type: "get",
			                    async: false,
			                    url: $.kf.ISSUANCESTAT + '?type=statsListcompanyDilutionAreaSum',
			                    dataType: "json",
			                    data: "",
			                    processResponse: function (result) {
			                        if (isData($("#barChart4"), result.data, "")) {
			                            optionBar4.xAxis[0].data = result.data.area;
			                            optionBar4.series[0].data = result.data.value;
			                            myChartBar4.setOption(optionBar4,true);
			                            //$(".yeara").text(result.date)
			                        }else{
			                        	$("#barChart4").parent().css("background","white");
			                        }
			                    }
			                });
		                })
	                }
	                
	                //增发排行榜 -》增发金额价格排名
	                var privateMoney = function(){
	                	$.kf.ajax({
		                    type: "get",
		                    async: false,
		                    url: $.kf.ISSUANCESTAT + '?type=statsListcompanyDilutionSumRank',
		                    dataType: "json",
		                    data: "",
		                    processResponse: function (result) {
		                        if (result) {
		                        	var list = result.data;
							        var tr = "";
							        $("#year2").text(result.date)
							        $("#privateMoney").html("");
							        $(list).each(function (i) {
							            tr += "<tr>";
							            tr += "<td><a href='"+ $.url.companyListUrl() + 'id=' + list[i].company_id +"'>"+ list[i].shortname +"</a></td>";
							            tr += "<td>"+ list[i].date +"</td>";
							            tr += "<td>"+ list[i].status +"</td>";
							            tr += "<td>"+ list[i].sum +"</td>";
							            tr += "</tr>";
							        });
							        $("#privateMoney").append(tr);
		                        }
		                    }
		                });
	                }
	                privateMoney();
	                
	                //增发排行榜 -》增发PE排名
	                var privateMoney = function(){
	                	$.kf.ajax({
		                    type: "get",
		                    async: false,
		                    url: $.kf.ISSUANCESTAT + '?type=statsListcompanyDilutionPeRank',
		                    dataType: "json",
		                    data: "",
		                    processResponse: function (result) {
		                        if (result) {
		                        	var list = result.data;
							        var tr = "";
							        $("#privatePE").html("");
							        $(list).each(function (i) {
							            tr += "<tr>";
							            tr += "<td><a href='"+ $.url.companyListUrl() + 'id=' + list[i].company_id +"'>"+ list[i].shortname +"</a></td>";
							            tr += "<td>"+ list[i].date +"</td>";
							            tr += "<td>"+ list[i].status +"</td>";
							            tr += "<td>"+ list[i].pe +"</td>";
							            tr += "</tr>";
							        });
							        $("#privatePE").append(tr);
		                        }
		                    }
		                });
	                }
	                privateMoney();
	                
	                
	                //增发成功率 -》按行业
	                var successIndustry = function(){
	                	var mgh = $(".barChartH").height();
		                optionBar5 = {
		                	toolbox: {
						        show : true,
						        feature : {
						            saveAsImage : {
						            	show: true,
						            	name:"三板慧",
						            	icon:'../../assets/admin/layout/img/saveAsPic.png',
						            	color:"#f57d4b"
						            }
						        }
						    },
						    tooltip: {
	                        show: true
		                    },
		                    grid :{ y:'40',height:'60%'},
		                    xAxis : [
		                        {
		                            type : 'category',
		                            axisLabel:{  
				                        interval:0,  
				                        rotate:35,//倾斜度 -90 至 90 默认为0  
				                        margin:2
				                    },    
		                            data : []
		                        }
		                    ],
		                    yAxis : [
		                        {
		                        	name: '成功率%',
		                        	nameTextStyle:{
		                            	color:'#000000',
		                            	fontWeight:'bold'
		                            },
		                            type : 'value'
		                        }
		                    ],
		                    series : [
		                        {
		                            "name":"数量",
		                            "type":"bar",
		                            itemStyle: {
		                            	normal: {
							                color:'#b6a3dc',
							                barBorderRadius: [0]
							            },
							            emphasis: {
								            barBorderRadius: [0]
							            }
						           	},
		                            "data":[]
		                        }
		                    ]
		                };
		                
		                $.kf.ajax({
		                    type: "get",
		                    async: false,
		                    url: $.kf.ISSUANCESTAT + '?type=statsListcompanyDilutionIndustrySuccessRate',
		                    dataType: "json",
		                    data: "",
		                    processResponse: function (result) {
		                        if (isData($("#barChart5"), result.data, "")) {
		                        	$("#year3").text(result.date)
		                            optionBar5.xAxis[0].data = result.data.industry;
			                        optionBar5.series[0].data = result.data.value;
		                            myChartBar5.setOption(optionBar5);
		                        }else{
		                        	$("#barChart5").parent().css("background","white");
		                        }
		                    }
		                });
	                }
	                successIndustry();
	                
	                //增发成功率 -》按地区
	                var successArea = function(){
	                	var mgh = $(".barChartH").height();
		                optionBar6 = {
		                	toolbox: {
						        show : true,
						        feature : {
						            saveAsImage : {
						            	show: true,
						            	name:"三板慧",
						            	icon:'../../assets/admin/layout/img/saveAsPic.png',
						            	color:"#f57d4b"
						            }
						        }
						    },
						    tooltip: {
	                        show: true
		                    },
		                    grid :{ y:'40',height:'60%'},
		                    xAxis : [
		                        {
		                            type : 'category',
		                            axisLabel:{  
				                        interval:0,  
				                        rotate:35,//倾斜度 -90 至 90 默认为0  
				                        margin:2
				                    },    
		                            data : []
		                        }
		                    ],
		                    yAxis : [
		                        {
		                        	name: '成功率%',
		                        	nameTextStyle:{
		                            	color:'#000000',
		                            	fontWeight:'bold'
		                            },
		                            type : 'value'
		                        }
		                    ],
		                    series : [
		                        {
		                            "name":"数量",
		                            "type":"bar",
		                            itemStyle: {
		                            	normal: {
							                color:'#b6a3dc',
							                barBorderRadius: [0]
							            },
							            emphasis: {
								            barBorderRadius: [0]
							            }
						           	},
		                            "data":[]
		                        }
		                    ]
		                };
		                
		                $.kf.ajax({
		                    type: "get",
		                    async: false,
		                    url: $.kf.ISSUANCESTAT + '?type=statsListcompanyDilutionAreaSuccessRate',
		                    dataType: "json",
		                    data: "",
		                    processResponse: function (result) {
		                        if (isData($("#barChart6"), result.data, "")) {
		                            optionBar6.xAxis[0].data = result.data.area;
			                        optionBar6.series[0].data = result.data.value;
		                            myChartBar6.setOption(optionBar6);
		                        }else{
		                        	$("#barChart6").parent().css("background","white");
		                        }
		                    }
		                });
	                }
	                
	                //增发成功率 按行业按地区切换
	                $("#successIndustry").click(function(){
	                	$("#barChart5").removeClass("hide").siblings("div").addClass("hide");
	                	successIndustry();
	                })
	                $("#successArea").click(function(){
	                	$("#barChart6").removeClass("hide").siblings("div").addClass("hide");
	                	successArea();
	                })
	                
	                
	                
	                //增发所需时间 -》按行业
	                var dateIndustry = function(){
	                	var mgh = $(".barChartH").height();
		                optionBar7 = {
		                	toolbox: {
						        show : true,
						        feature : {
						            saveAsImage : {
						            	show: true,
						            	name:"三板慧",
						            	icon:'../../assets/admin/layout/img/saveAsPic.png',
						            	color:"#f57d4b"
						            }
						        }
						    },
						    tooltip: {
	                        show: true
		                    },
		                    grid :{ y:'40',height:'60%'},
		                    xAxis : [
		                        {
		                            type : 'category',
		                            axisLabel:{  
				                        interval:0,  
				                        rotate:35,//倾斜度 -90 至 90 默认为0  
				                        margin:2
				                    },    
		                            data : []
		                        }
		                    ],
		                    yAxis : [
		                        {
		                        	name: '所需天数（日）',
		                        	nameTextStyle:{
		                            	color:'#000000',
		                            	fontWeight:'bold'
		                            },
		                            type : 'value'
		                        }
		                    ],
		                    series : [
		                        {
		                            "name":"数量",
		                            "type":"bar",
		                            itemStyle: {
		                            	normal: {
							                color:'#39c6c7',
							                barBorderRadius: [0]
							            },
							            emphasis: {
								            barBorderRadius: [0]
							            }
						           	},
		                            "data":[]
		                        }
		                    ]
		                };
		                
		                $.kf.ajax({
		                    type: "get",
		                    async: false,
		                    url: $.kf.ISSUANCESTAT + '?type=statsListcompanyDilutionIndustryDaynum',
		                    dataType: "json",
		                    data: "",
		                    processResponse: function (result) {
		                        if (isData($("#barChart7"), result.data, "")) {
		                        	$("#year4").text(result.date)
		                            optionBar7.xAxis[0].data = result.data.industry;
			                        optionBar7.series[0].data = result.data.value;
		                            myChartBar7.setOption(optionBar7);
		                        }else{
		                        	$("#barChart7").parent().css("background","white");
		                        }
		                    }
		                });
	                }
	                dateIndustry();
	                
	                //增发成功率 -》按地区
	                var dateArea = function(){
	                	var mgh = $(".barChartH").height();
		                optionBar8 = {
		                	toolbox: {
						        show : true,
						        feature : {
						            saveAsImage : {
						            	show: true,
						            	name:"三板慧",
						            	icon:'../../assets/admin/layout/img/saveAsPic.png',
						            	color:"#f57d4b"
						            }
						        }
						    },
						    tooltip: {
	                        show: true
		                    },
		                    grid :{ y:'40',height:'60%'},
		                    xAxis : [
		                        {
		                            type : 'category',
		                            axisLabel:{  
				                        interval:0,  
				                        rotate:35,//倾斜度 -90 至 90 默认为0  
				                        margin:2
				                    },    
		                            data : []
		                        }
		                    ],
		                    yAxis : [
		                        {
		                        	name: '所需天数（日）',
		                        	nameTextStyle:{
		                            	color:'#000000',
		                            	fontWeight:'bold'
		                            },
		                            type : 'value'
		                        }
		                    ],
		                    series : [
		                        {
		                            "name":"数量",
		                            "type":"bar",
		                            itemStyle: {
		                            	normal: {
							                color:'#39c6c7',
							                barBorderRadius: [0]
							            },
							            emphasis: {
								            barBorderRadius: [0]
							            }
						           	},
		                            "data":[]
		                        }
		                    ]
		                };
		                
		                $.kf.ajax({
		                    type: "get",
		                    async: false,
		                    url: $.kf.ISSUANCESTAT + '?type=statsListcompanyDilutionAreaDaynum',
		                    dataType: "json",
		                    data: "",
		                    processResponse: function (result) {
		                        if (isData($("#barChart8"), result.data, "")) {
		                            optionBar8.xAxis[0].data = result.data.area;
			                        optionBar8.series[0].data = result.data.value;
		                            myChartBar8.setOption(optionBar8);
		                        }else{
		                        	$("#barChart8").parent().css("background","white");
		                        }
		                    }
		                });
	                }
	                
	                //增发成功率 按行业按地区切换
	                $("#dataIndustry").click(function(){
	                	$("#barChart7").removeClass("hide").siblings("div").addClass("hide");
	                	dateIndustry();
	                })
	                $("#dataArea").click(function(){
	                	$("#barChart8").removeClass("hide").siblings("div").addClass("hide");
	                	dateArea();
	                })
	            })
	}
    

    return {
        init: function () {
        	privateDate();
        }
    }
}();