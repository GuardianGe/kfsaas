function echarList(){
	require.config({
        paths: {
            echarts: '../../assets/global/plugins/echarts/build/dist'
        }
    });
	
	 // 使用
    require(
        [
            'echarts',
            'echarts/chart/bar', // 使用柱状图就加载bar模块，按需加载
            'echarts/chart/line'
        ],
        function (ec) {
            // 基于准备好的dom，初始化echarts图表
            if($(window).width() > 768){
             	var _width = $(".page-content-par").width()-30;
            }else{
             	var _width = 700;
            }
        	$("#myChart0").width(_width);
        	$("#myChart2").width(_width);
        	$("#myChart1").width(_width);
        	$("#myChart4").width(_width);
            var myChart1 = ec.init(document.getElementById('myChart1'),"macarons"); 
            var myChart = ec.init(document.getElementById('myChart0'),"macarons");
            var myChart2 = ec.init(document.getElementById('myChart2'),"macarons");
            var myChart4 = ec.init(document.getElementById('myChart4'),"macarons");
            window.addEventListener("resize",function(){
            	var _width = $(".pic-content").width()-30;
            	$("#myChart0").width(_width);
            	$("#myChart2").width(_width);
            	$("#myChart1").width(_width);
            	$("#myChart4").width(_width);
		    	myChart.resize();
		    	myChart1.resize();	
		    	myChart2.resize();
		    	myChart4.resize();
		    });
		   
            //金额分布
            var option = {
                tooltip: {
                    show: true,
                    backgroundColor:'rgba(0,0,0,.6)',
                    padding:10
                },
                toolbox: {
			        show : true,
			        feature : {
			            saveAsImage : {
			            	show: true,
			            	name:"三板慧-投资金额分布",
			            	icon:'../../../assets/admin/layout/img/saveAsPic.png',
			            	color:"#f57d4b"
			            }
			        }
			    },
                xAxis : [
                    {
                        type : 'category',
                        data : [],
                        axisLabel:{
                        	textStyle:{
                        		color:"#000",
                        		fontFamily:"微软雅黑"
                        	}
                        },
                        splitLine: {// 分隔线
				            show: true
				        }
                    }
                ],
                yAxis : [
                    {
                        type : 'value',
                        name : "数量",
                        nameTextStyle : {
                    		color:"#2c8cce",
                    		fontSize:16,
                    		fontFamily:"微软雅黑"
                        },
                        boundaryGap:[0,0.1]
                    }
                ],
                grid:{
                	height:201,
                	borderWidth:0
                },
                series : [
                    {
                        name:"数量",
                        type:"bar",
                        barCategoryGap :'50%',
                        data:[],
                        itemStyle:{
	                    	normal:{
	                    		label:{
	                    			show: true,
	                    			position:"top",
	                    			formatter:"{c}",
	                    			textStyle: {
										fontFamily: '微软雅黑',
										fontSize: 12,
										fontStyle: 'normal',
										fontWeight: 'normal',
										color:"#f57d4b"
									}
	                    		},
	                    		color:"#f57d4b",
	                    		barBorderRadius:0
	                    	},
	                    	emphasis: {color: '#f57d4b' }
	                    }
                    }
                ]
            };
            
			//行业轮次分布
            option1 = {
            	toolbox: {
			        show : true,
			        feature : {
			            saveAsImage : {
			            	show: true,
			            	name:"三板慧-行业轮次分布",
			            	icon:'../../../assets/admin/layout/img/saveAsPic.png',
			            	color:"#f57d4b"
			            }
			        }
			    },
			    tooltip : {
			        trigger: 'axis',
			        axisPointer:{
		            	type:'shadow',
		            	shadowStyle:{
		            		color:'rgba(160,160,160,.35)'
		            	}
		            },
		            backgroundColor:'rgba(0,0,0,.6)',
		            padding:10
			    },
			    legend: {
			        data:[],
					itemGap:20
			    },
			    calculable:false,
			    grid:{
                	height:201
                	//borderWidth:0
                },
			    xAxis : [
			        {
			            type : 'category',
			            data : [],
                       /* axisLine:{
					　　　　show:false
						},*/
						axisLabel:{  
	                        interval:0,  
	                        rotate:-45,
	                        margin:1,  
	                        textStyle: {
								color: "#000",
								fontStyle: 'oblique',
								fontWeight: 'normal',
								fontFamily: '微软雅黑',
								fontSize: 12,
							} 
	                    }, 
			        }
			    ],
			    yAxis : [
			        {
			            type : 'value',
			            name : "数量",
			            nameTextStyle : {
                    		color:"#2c8cce",
                    		fontSize:16,
                    		fontFamily:"微软雅黑"
                       },
                       boundaryGap:[0,0.1]

			        }
			    ],
			    series : [
			        {
			            name:'',
			            type:'bar',
			            //barWidth:'30%',
			            barCategoryGap :'50%',
			            stack: '总量',
			            itemStyle: {normal: {areaStyle: {type: 'default'},color:"#ce6132",barBorderRadius:0},emphasis: {barBorderRadius: 0}},
			            data:[]
			        },
			        {
			            name:'',
			            type:'bar',
			            stack: '总量',
			            itemStyle: {normal: {areaStyle: {type: 'default'},color:"#f57d4b",barBorderRadius:0},emphasis: {barBorderRadius: 0 }},
			            data:[]
			        },
			        {
			            name:'',
			            type:'bar',
			            stack: '总量',
			            itemStyle: {normal: {areaStyle: {type: 'default'},color:"#fac148",barBorderRadius:0},emphasis: {barBorderRadius: 0 }},
			            data:[]
			        },
			        {
			            name:'',
			            type:'bar',
			            stack: '总量',
			            itemStyle: {normal: {areaStyle: {type: 'default'},color:"#ffdd37",barBorderRadius:0},emphasis: {barBorderRadius: 0 }},
			            data:[]
			        },
			        {
			            name:'',
			            type:'bar',
			            stack: '总量',
			            itemStyle: {normal: {areaStyle: {type: 'default'},color:"#86d3df",barBorderRadius:0},emphasis: {barBorderRadius: 0}},
			            data:[]
			        },
			        {
			            name:'',
			            type:'bar',
			            stack: '总量',
			            itemStyle: {normal: {areaStyle: {type: 'default'},color:"#55a4b0",barBorderRadius:0},emphasis: {barBorderRadius: 0 }},
			            data:[]
			        }
			    ]
			};
    
    
    		//投资时间走势
            option2 = {
            	toolbox: {
			        show : true,
			        feature : {
			            saveAsImage : {
			            	show: true,
			            	name:"三板慧-投资时间走势",
			            	icon:'../../../assets/admin/layout/img/saveAsPic.png',
			            	color:"#f57d4b"
			            }
			        }
			    },
			    tooltip : {
			        trigger: 'axis',
			        axisPointer:{
		            	type:'none'
		            },
		            backgroundColor:'rgba(0,0,0,.6)',
		            padding:10
			    },
			    legend: {
			        data:['投资事件'],
			        selectedMode:false
			    },
			    calculable : false,
			    grid:{
                	height:201,
                	borderWidth:0
                },
			    xAxis : [
			        {
			            type : 'category',
			            boundaryGap : false,
			            data : []
			        }
			    ],
			    yAxis : [
			        {
			            type : 'value',
			            name : "数量",
			            nameTextStyle : {
                    		color:"#2c8cce",
                    		fontSize:16,
                    		fontFamily:"微软雅黑"
                        },
                        boundaryGap:[0,0.3]
			        }
			    ],
			    series : [
			        {
			            name:'投资事件',
			            type:'line',
			            "barWidth":20,
			            stack: '总量',
			            data:[],
			            hoverable:false,
			            clickable:false,
			            itemStyle:{
	                    	normal:{
	                    		color:"#f57d4b",
	                    		label:{
	                    			show: true,
	                    			position:"top",
	                    			formatter:"{c}",
	                    			textStyle: {
										fontFamily: '微软雅黑',
										fontSize: 12,
										fontStyle: 'normal',
										fontWeight: 'normal',
										color:"#f57d4b"
									},
	                    		},
	                    		lineStyle:{
	                    			color:'rgba(245,125,75,1)'
	                    		},
	                    		areaStyle: {
	                    			type: 'macarons',
	                    			color:'rgba(245,125,75,.5)'
	                    		},
	                    		borderColor:'rgba(245,125,75,1)',
	                    		borderWidth:1
	                    		
	                    	}
	                    }
			        }
			        
			    ]
			};
			
			//金额分布
            var option4 = {
                tooltip: {
                    show: true,
                    backgroundColor:'rgba(0,0,0,.6)',
                    padding:10
                },
                toolbox: {
			        show : true,
			        feature : {
			            saveAsImage : {
			            	show: true,
			            	name:"三板慧-投资金额分布",
			            	icon:'../../../assets/admin/layout/img/saveAsPic.png',
			            	color:"#f57d4b"
			            }
			        }
			    },
                xAxis : [
                    {
                        type : 'category',
                        data : [],
                        axisLabel:{
                        	interval:0,  
	                        rotate:-45,//倾斜度 -90 至 90 默认为0  
	                        margin:2,
                        	textStyle:{
                        		color:"#000",
                        		fontFamily:"微软雅黑"
                        	}
                        },
                        splitLine: {// 分隔线
				            show: true
				        }
                    }
                ],
                yAxis : [
                    {
                        type : 'value',
                        name : "数量",
                        nameTextStyle : {
                    		color:"#2c8cce",
                    		fontSize:16,
                    		fontFamily:"微软雅黑"
                        },
                        boundaryGap:[0,0.1]
                    }
                ],
                grid:{
                	height:201,
                	borderWidth:0
                },
                series : [
                    {
                        name:"数量",
                        type:"bar",
                        barCategoryGap :'50%',
                        data:[],
                        itemStyle:{
	                    	normal:{
	                    		label:{
	                    			show: true,
	                    			position:"top",
	                    			formatter:"{c}",
	                    			textStyle: {
										fontFamily: '微软雅黑',
										fontSize: 12,
										fontStyle: 'normal',
										fontWeight: 'normal',
										color:"#f57d4b"
									}
	                    		},
	                    		color:"#f57d4b",
	                    		barBorderRadius:0
	                    	},
	                    	emphasis: {color: '#f57d4b' }
	                    }
                    }
                ]
            };
            
			
			//默认加载
			var getId = Query.getHash("id");
			var url1 = $.kf.GETAGANCYINDUSTRYROUND+"?id="+getId;
			var investArray = [];
			
        	$.kf.ajax({
	            type: "get",
	            url:url1 ,
	            dataType: "json",
	            data: "",
	            processResponse: function(data) {
	                if (isData($(".isDataTwo"),data.data,$("#myChart1"))) {
	                	investArray = data.data.investnum;
	                	var inLength = investArray.length;
	                	for (var i=0;i<inLength;i++) {
	                		option1.series[i].data = investArray[i].data;
	                		option1.series[i].name = investArray[i].name;
	                	}
	                    option1.xAxis[0].data = data.data.industry;
	                    option1.legend.data = data.data.round;
	                    myChart1.setOption(option1);
	                }else{
	                	$("#myChart1").hide();
	                	$(".pic-titel-num").hide();
	                }
	            }
	        });
	        
	        
	        
            $("#picTit1").on("click",function(){
            	$("#myChart0").show();
            	
            	/*if($("#myChart0").html() == ""){}*/
            	
            		 
				// 为echarts对象加载数据 
            	var url0 = $.kf.GETAGANCYMONEY+"?id="+getId;
            	$.kf.ajax({
		            type: "get",
		            url:url0 ,
		            dataType: "json",
		            data: "",
		            processResponse: function(data) {
		                if (isData($(".isDataOne"),data.data,$("#myChart0"))) {
		                    option.xAxis[0].data = data.data.money;
		                    option.series[0].data = data.data.companynum;
		                    myChart.setOption(option); 
		                }else{
		                	$("#myChart0").hide();
		                	$(".pic-titel-num").hide();
		                }
		            }
		        });
            	
            	
			});
			$("#picTit2").on("click",function(){
				// 为echarts对象加载数据 
				$("#myChart2").show();
				
				/*if($("#myChart2").html() == ""){}*/
				
					 
				var url2 = $.kf.GETAGANCYYEAR+"?id="+getId;
            	$.kf.ajax({
		            type: "get",
		            url:url2 ,
		            dataType: "json",
		            data: "",
		            processResponse: function(data) {
		                if (isData($(".isDataThree"),data.data,$("#myChart2"))) {
		                    option2.xAxis[0].data = data.data.year;
		                    option2.series[0].data = data.data.companynum;
		                    option2.series[0].data[0] = "       " + option2.series[0].data[0]
		                    myChart2.setOption(option2); 
		                }else{
		                	$("#myChart2").hide();
		                	$(".pic-titel-num").hide();
		                }
		            }
		        });
			
				
			});
			$("#picTit4").on("click",function(){
				// 为echarts对象加载数据 
				$("#myChart4").show();
				var url4 = $.kf.GETAGANCYAREA+"?id="+getId;
            	$.kf.ajax({
		            type: "get",
		            url:url4 ,
		            dataType: "json",
		            data: "",
		            processResponse: function(data) {
		                if (isData($(".isDataFour"),data.data,$("#myChart4"))) {
		                    option4.xAxis[0].data = data.data.area;
		                    option4.series[0].data = data.data.num;
		                    option4.series[0].data[0] = "       " + option4.series[0].data[0]
		                    myChart4.setOption(option4); 
		                }else{
		                	$("#myChart4").hide();
		                	$(".pic-titel-num").hide();
		                }
		            }
		        });
			
				
			});
           
           
        }
    );

	
}
