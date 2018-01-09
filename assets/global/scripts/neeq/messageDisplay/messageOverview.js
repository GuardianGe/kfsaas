
/*信息披露概览*/
var OverviewMessage = function () {

	var messageDate = function(){
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
	            	$("#barChart4").width(_width);
	            	$("#barChart5").width(_width);
	                // 基于准备好的dom，初始化echarts图表
	                var myChartBar = ec.init(document.getElementById('barChart'),'macarons');
	                var myChartBar1 = ec.init(document.getElementById('barChart1'));
	                var myChartBar2 = ec.init(document.getElementById('barChart2'));
	                var myChartBar3 = ec.init(document.getElementById('barChart3'),'macarons');
	                var myChartBar4 = ec.init(document.getElementById('barChart4'),'macarons');
	                var myChartBar5 = ec.init(document.getElementById('barChart5'),'macarons');
	
	                //图表自适应
	                window.addEventListener("resize", function () {
//	                	var _width = $(".page-content-par").width() - 20;
		            	$("#barChart4").width(_width);
		            	$("#barChart5").width(_width);
	                    myChartBar.resize();
	                    myChartBar1.resize();
	                    myChartBar2.resize();
	                    myChartBar3.resize();
	                    myChartBar4.resize();
	                    myChartBar5.resize();
	                })
	
	                
	                //公告概览 -》今日重要公告
	                var todayNotes = function(){
	                	var mgh = $(".barChartH").height();
		                optionBar = {
		                	toolbox: {
						        show : true,
						        feature : {
						            saveAsImage : {
						            	show: true,
						            	name:"三板慧-今日重要公告",
						            	icon:'../../assets/admin/layout/img/saveAsPic.png',
						            	color:"#f57d4b"
						            }
						        }
						    },
						    tooltip: {
	                        show: true
		                    },
		                    grid :{ y:'66',height:'67%',x:'60',width:'91%'},
		                    xAxis : [
		                        {
		                            type : 'category',
		                            axisLabel:{  
				                        interval:0,  
				                        rotate:-45,//倾斜度 -90 至 90 默认为0  
				                        margin:2
				                    },    
		                            data : []
		                        }
		                    ],
		                    yAxis : [
		                        {
		                        	name: '',
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
							                color:'#40a7e3',
							                barBorderRadius: [2,2,2,2]
							            },
							            emphasis: {
								            barBorderRadius: [2,2,2,2]
							            }
						           	},
		                            "data":[]
		                        }
		                    ]
		                };
		                
		                $.kf.ajax({
		                    type: "get",
		                    async: false,
		                    url: $.kf.ANNOUNCEMENTSERVICE + '?type=statsNoticeSecondLevelStat',
		                    dataType: "json",
		                    data: "",
		                    processResponse: function (result) {
		                        if (isData($("#barChart"), result.data, "")) {
		                            optionBar.xAxis[0].data = result.data.class;
			                        optionBar.series[0].data = result.data.value;
		                            myChartBar.setOption(optionBar);
		                        }else{
		                        	$("#barChart").parent("div").css("background","none")
		                        }
		                    }
		                });
	                }
	                todayNotes();
	                
	                //公告概览 -》利好公告
	                var goodNotes = function(){
	                	var mgh = $(".barChartH").height();
		                optionBar1 = {
		                	toolbox: {
						        show : true,
						        feature : {
						            saveAsImage : {
						            	show: true,
						            	name:"三板慧-利好公告",
						            	icon:'../../assets/admin/layout/img/saveAsPic.png',
						            	color:"#f57d4b"
						            }
						        }
						    },
						    title: {
		                        text: '',
		                        textStyle: {
		                            fontSize: 14,
		                            fontWeight: 'bold',
		                            color: '#4CA9DE'
		                        },
		                        y: 0
		//			        x:50
		                    },
		                    tooltip: {
		                        backgroundColor: "#ffffff",
		                        textStyle: {
		                            color: "#000000"
		                        },
		                        borderColor: "#999999",
		                        borderWidth: 1
		                    },
		                    calculable: true,
		                    grid: {borderWidth: '0px', height: mgh - 50, y: '30', width:'76%',x: '90'},
		                    xAxis: [
		                        {
		                            type: 'value',
		                            show: true,
		                            splitLine: {
		                                show: false
		                                        },
		                            axisLabel: {
		                                textStyle: {
		                                    color: "#686868"
		                                }
		                            }
		                        }
		                    ],
		                    yAxis: [
		                        {
		                            type: 'category',
		                            splitLine: {
		                                show: false
		                                        },
		                            axisLabel: {
		                                textStyle: {
		                                    fontFamily: '微软雅黑',
		                                    color: "#686868"
		                                },
		                                margin: 20,
		                                formatter: function (params) {
		                                    var newParamsName = "";// 最终拼接成的字符串
		                                    var paramsNameNumber = params.length;// 实际标签的个数
		                                    var provideNumber = 4;// 每行能显示的字的个数
		                                    if (paramsNameNumber > provideNumber) {
		                                        var subN = params.substring(0, 4)
		                                        newParamsName = subN + '...'
		                                    } else {
		                                        // 将旧标签的值赋给新标签
		                                        newParamsName = params;
		                                    }
		                                    //将最终的字符串返回
		                                    return newParamsName
		                                }
		                            },
		                            data: []
		                        }
		                    ],
		                    series: [
		                        {
		                            name: '当前数量',
		                            type: 'bar',
		                            stack: '总量',
		                            barGap: '1',
		                            itemStyle: {
		                                normal: {
		                                    color: '#e1bb3c',
		                                    //以下为是否显示，显示位置和显示格式的设置了
		                                            label: {
		                                                show: false,
		                                                position: 'right',
		                                                formatter: '{c}' + ' 家'
		                                            },
		                                    //label : {show: true, position: 'insideRight'},
		                                    //barBorderRadius: 5
		                                },
		                                emphasis: {
		                                    //barBorderRadius: 5
		                                }
		                            },
		                            barWidth: 35,
		                            barCategoryGap: '20',
		                            data: []
		                        }
		                    ]
		                };
		                
		                $.kf.ajax({
		                    type: "get",
		                    async: false,
		                    url: $.kf.ANNOUNCEMENTSERVICE + '?type=statsNoticeSmotionStat',
		                    dataType: "json",
		                    data: "",
		                    processResponse: function (result) {
		                    	if(isNullOrEmpty(result.data)){
		                    		$("#barChart1").parent("div").css("background","none")
		                    	}else{
		                    		if (isData($("#barChart1"), result.data.good.industry, "")) {
			                            optionBar1.yAxis[0].data = result.data.good.industry;
				                        optionBar1.series[0].data = result.data.good.value;
			                            myChartBar1.setOption(optionBar1);
			                        }
		                    	}
		                    }
		                });
	                }
	                goodNotes();
	                
	                
	                //公告概览 -》利空公告
	                var badNotes = function(){
	                	var mgh = $(".barChartH").height();
		                optionBar2 = {
		                	toolbox: {
						        show : true,
						        feature : {
						            saveAsImage : {
						            	show: true,
						            	name:"三板慧-利空公告",
						            	icon:'../../assets/admin/layout/img/saveAsPic.png',
						            	color:"#f57d4b"
						            }
						        }
						    },
						    title: {
		                        text: '',
		                        textStyle: {
		                            fontSize: 14,
		                            fontWeight: 'bold',
		                            color: '#4CA9DE'
		                        },
		                        y: 0
		//			        x:50
		                    },
		                    tooltip: {
		                        backgroundColor: "#ffffff",
		                        textStyle: {
		                            color: "#000000"
		                        },
		                        borderColor: "#999999",
		                        borderWidth: 1
		                    },
		                    calculable: true,
		                    grid: {borderWidth: '0px', height: mgh - 50, y: '30', width:'76%',x: '90'},
		                    xAxis: [
		                        {
		                            type: 'value',
		                            show: true,
		                            splitLine: {
		                                show: false
		                                        },
		                            axisLabel: {
		                                textStyle: {
		                                    color: "#686868"
		                                }
		                            }
		                        }
		                    ],
		                    yAxis: [
		                        {
		                            type: 'category',
		                            splitLine: {
		                                show: false
		                                        },
		                            axisLabel: {
		                                textStyle: {
		                                    fontFamily: '微软雅黑',
		                                    color: "#686868"
		                                },
		                                margin: 20,
		                                formatter: function (params) {
		                                    var newParamsName = "";// 最终拼接成的字符串
		                                    var paramsNameNumber = params.length;// 实际标签的个数
		                                    var provideNumber = 4;// 每行能显示的字的个数
		                                    if (paramsNameNumber > provideNumber) {
		                                        var subN = params.substring(0, 4)
		                                        newParamsName = subN + '...'
		                                    } else {
		                                        // 将旧标签的值赋给新标签
		                                        newParamsName = params;
		                                    }
		                                    //将最终的字符串返回
		                                    return newParamsName
		                                }
		                            },
		                            data: []
		                        }
		                    ],
		                    series: [
		                        {
		                            name: '当前数量',
		                            type: 'bar',
		                            stack: '总量',
		                            barGap: '1',
		                            itemStyle: {
		                                normal: {
		                                    color: '#e1bb3c',
		                                    //以下为是否显示，显示位置和显示格式的设置了
		                                            label: {
		                                                show: false,
		                                                position: 'right',
		                                                formatter: '{c}' + ' 家'
		                                            },
		                                    //label : {show: true, position: 'insideRight'},
		                                    //barBorderRadius: 5
		                                },
		                                emphasis: {
		                                    //barBorderRadius: 5
		                                }
		                            },
		                            barWidth: 35,
		                            barCategoryGap: '20',
		                            data: []
		                        }
		                    ]
		                };
		                
		                $.kf.ajax({
		                    type: "get",
		                    async: false,
		                    url: $.kf.ANNOUNCEMENTSERVICE + '?type=statsNoticeSmotionStat',
		                    dataType: "json",
		                    data: "",
		                    processResponse: function (result) {
		                    	if(isNullOrEmpty(result.data)){
		                    		$("#barChart2").parent("div").css("background","none")
		                    	}else{
		                    		if (isData($("#barChart2"), result.data.bad.industry, "")) {
			                            optionBar2.yAxis[0].data = result.data.bad.industry;
				                        optionBar2.series[0].data = result.data.bad.value;
			                            myChartBar2.setOption(optionBar2);
			                        }
		                    	}
		                    }
		                });
	                }
	                badNotes();
	                
	                
	                //今日分类公告 -》按行业
	                var notesIndustry = function(){
	                	var mgh = $(".barChartH").height();
		                optionBar3 = {
		                	toolbox: {
						        show : true,
						        feature : {
						            saveAsImage : {
						            	show: true,
						            	name:"三板慧-今日分类公告",
						            	icon:'../../assets/admin/layout/img/saveAsPic.png',
						            	color:"#f57d4b"
						            }
						        }
						    },
						    tooltip: {
	                        show: true
		                    },
		                    grid :{ y:'66',height:'60%',x:'60',width:'91%'},
		                    xAxis : [
		                        {
		                            type : 'category',
		                            axisLabel:{  
				                        interval:0,  
				                        rotate:-45,//倾斜度 -90 至 90 默认为0  
				                        margin:2
				                    },    
		                            data : []
		                        }
		                    ],
		                    yAxis : [
		                        {
		                        	name: '',
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
							                color:'#40a7e3',
							                barBorderRadius: [2,2,2,2]
							            },
							            emphasis: {
								            barBorderRadius: [2,2,2,2]
							            }
						           	},
		                            "data":[]
		                        }
		                    ]
		                };
		                
		                $.kf.ajax({
		                    type: "get",
		                    async: false,
		                    url: $.kf.ANNOUNCEMENTSERVICE + '?type=statsNoticeSndustryStat',
		                    dataType: "json",
		                    data: "",
		                    processResponse: function (result) {
		                        if (isData($("#barChart3"), result.data, "")) {
		                            optionBar3.xAxis[0].data = result.data.industry;
			                        optionBar3.series[0].data = result.data.value;
		                            myChartBar3.setOption(optionBar3);
		                        }else{
		                        	$("#barChart3").parent("div").css("background","none")
		                        }
		                    }
		                });
	                }
	                notesIndustry();
	                
//	                //今日分类公告 -》按地区
	                var notesArea = function(){
	                	var mgh = $(".barChartH").height();
		                optionBar4 = {
		                	toolbox: {
						        show : true,
						        feature : {
						            saveAsImage : {
						            	show: true,
						            	name:"三板慧-今日分类公告",
						            	icon:'../../assets/admin/layout/img/saveAsPic.png',
						            	color:"#f57d4b"
						            }
						        }
						    },
						    tooltip: {
	                        show: true
		                    },
		                    grid :{ y:'66',height:'60%',x:'60',width:'91%'},
		                    xAxis : [
		                        {
		                            type : 'category',
		                            axisLabel:{  
				                        interval:0,  
				                        rotate:-45,//倾斜度 -90 至 90 默认为0  
				                        margin:2
				                    },    
		                            data : []
		                        }
		                    ],
		                    yAxis : [
		                        {
		                        	name: '',
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
							                color:'#40a7e3',
							                barBorderRadius: [2,2,2,2]
							            },
							            emphasis: {
								            barBorderRadius: [2,2,2,2]
							            }
						           	},
		                            "data":[]
		                        }
		                    ]
		                };
		                
		                $.kf.ajax({
		                    type: "get",
		                    async: false,
		                    url: $.kf.ANNOUNCEMENTSERVICE + '?type=statsNoticeSreaStat',
		                    dataType: "json",
		                    data: "",
		                    processResponse: function (result) {
		                        if (isData($("#barChart4"), result.data, "")) {
		                            optionBar4.xAxis[0].data = result.data.area;
			                        optionBar4.series[0].data = result.data.value;
		                            myChartBar4.setOption(optionBar4);
		                        }else{
		                        	$("#barChart4").parent("div").css("background","none")
		                        }
		                    }
		                });
	                }
	                
	                //今日分类公告 -》按券商
	                var notesBrokerage = function(){
	                	var mgh = $(".barChartH").height();
		                optionBar5 = {
		                	toolbox: {
						        show : true,
						        feature : {
						            saveAsImage : {
						            	show: true,
						            	name:"三板慧-今日分类公告",
						            	icon:'../../assets/admin/layout/img/saveAsPic.png',
						            	color:"#f57d4b"
						            }
						        }
						    },
						    tooltip: {
	                        show: true
		                    },
		                    grid :{ y:'66',height:'60%',x:'60',width:'91%'},
		                    xAxis : [
		                        {
		                            type : 'category',
		                            axisLabel:{  
				                        interval:0,  
				                        rotate:-55,//倾斜度 -90 至 90 默认为0  
				                        margin:2,
				                        interval:function(index,data){
				                        	if(index % 10 == 0){
				                        		return true;
				                        	}else{
				                        		return false;
				                        	}
				                        }
				                    },    
		                            data : []
		                        }
		                    ],
		                    yAxis : [
		                        {
		                        	name: '',
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
							                color:'#40a7e3',
							                barBorderRadius: [2,2,2,2]
							            },
							            emphasis: {
								            barBorderRadius: [2,2,2,2]
							            }
						           	},
		                            "data":[]
		                        }
		                    ]
		                };
		                
		                $.kf.ajax({
		                    type: "get",
		                    async: false,
		                    url: $.kf.ANNOUNCEMENTSERVICE + '?type=statsNoticeSpecialStat',
		                    dataType: "json",
		                    data: "",
		                    processResponse: function (result) {
		                        if (isData($("#barChart5"), result.data, "")) {
		                            optionBar5.xAxis[0].data = result.data.special;
			                        optionBar5.series[0].data = result.data.value;
		                            myChartBar5.setOption(optionBar5);
		                        }else{
		                        	$("#barChart5").parent("div").css("background","none")
		                        }
		                    }
		                });
	                }
	                
	                //今日分类公告 按行业按地区按主办券商切换
	                $("#dataIndustry").click(function(){
	                	$(this).addClass("active").siblings().removeClass("active");
	                	$("#barChart3").removeClass("hide").siblings("div").addClass("hide");
	                	notesIndustry();
	                })
	                $("#dataArea").click(function(){
	                	$(this).addClass("active").siblings().removeClass("active");
	                	$("#barChart4").removeClass("hide").siblings("div").addClass("hide");
	                	notesArea();
	                })
	                $("#dataBrokerage").click(function(){
	                	$(this).addClass("active").siblings().removeClass("active");
	                	$("#barChart5").removeClass("hide").siblings("div").addClass("hide");
	                	notesBrokerage();
	                })
	            })
	}
    

    return {
        init: function () {
        	messageDate();
        }
    }
}();