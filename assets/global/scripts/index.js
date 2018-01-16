function commonJs(){
	var thisWidth = $(window).width();
	if(thisWidth <= 768){
		$(".topBlockme").removeClass("tapActive");
	}else{
		$(".topBlockme").addClass("tapActive");
	}
	$(".topBlock").on("mouseover",function(){
		if($(this).hasClass("tapActive")){
			$(this).find(".arrow").addClass("open");
			return false;
		}else{
			$(this).addClass("tapActive").siblings().removeClass("tapActive");
			if(thisWidth <=768){
				$(this).parent().siblings().find(".topBlock").removeClass("tapActive");
			}
		}
	})
	
	$(".topTwo li a div").mouseover(function(){
		$(this).addClass("animated rotateIn")
	}).mouseout(function(){
		$(this).removeClass("animated rotateIn")
	})
	
	
	//滚动箭头鼠标放上显示隐藏
	$(".swiper-container").mouseover(function(){
		$(".swiper-button-prev").removeClass("hide");
		$(".swiper-button-next").removeClass("hide");
	}).mouseout(function(){
		$(".swiper-button-prev").addClass("hide");
		$(".swiper-button-next").addClass("hide");
	})
	
	//首页头部菜单跳转权限判断
	var getPromiss = $.cookie("permission");
	if(getPromiss == 'true'){
		$(".topOne a,.topTwo a").each(function(){
			if($(this).hasClass("toPay")){
				$(this).removeClass("toPay");
			}
			$(this).attr("href",$(this).attr("get_href"));
		})
	}else{
		$(".topOne a,.topTwo a").each(function(){
			if(!$(this).hasClass("toPay")){
				$(this).attr("href",$(this).attr("get_href"))
			}
		})
	}
	
}
commonJs();


// 路径配置
var mobileWidth = $(window).width();
require.config({
    paths: {
        echarts: '../assets/global/plugins/echarts/build/dist'
    }
});

// 使用
require(
    [
        'echarts',
        'echarts/chart/bar',
        'echarts/chart/line',
        'echarts/chart/pie',
        'echarts/chart/map',
        'echarts/chart/wordCloud',
        
    ],
    function (ec) {
        // 基于准备好的dom，初始化echarts图表
        var myChartMap = ec.init(document.getElementById('main'));
        var myChartMoney = ec.init(document.getElementById('echarNum'));
        var myChartBar2 = ec.init(document.getElementById('barChart2'),'macarons');
        var myRealData = ec.init(document.getElementById('realData'));
        var myRealData2 = ec.init(document.getElementById('realData2'));
        var myRealData3 = ec.init(document.getElementById('realData3'));
        var myRealData4 = ec.init(document.getElementById('realData4'));
        var myRealData5 = ec.init(document.getElementById('realData5'));
        var myRealData6 = ec.init(document.getElementById('realData6'));
        var myRealData7 = ec.init(document.getElementById('realData7'));
        var myRealData8 = ec.init(document.getElementById('realData8'));
        var myRealData9 = ec.init(document.getElementById('realData9'));
        var myRealData10 = ec.init(document.getElementById('realData10'));
        var myRealData11 = ec.init(document.getElementById('realData11'));
        
        //图表自适应
        window.addEventListener("resize", function () {
            myChartMap.resize();
            myChartMoney.resize();
            myChartBar2.resize();
            myRealData.resize();
            myRealData2.resize();
            myRealData3.resize();
            myRealData4.resize();
            myRealData5.resize();
            myRealData6.resize();
            myRealData7.resize();
            myRealData8.resize();
            myRealData9.resize();
            myRealData10.resize();
            myRealData11.resize();
//          myChartRecommend.resize();
        })
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
        
        //实时数据图表
		var radius = [30, 40];
		realData = {
		   series : [
		        {
		            type : 'pie',
		            center : ['50%', '57%'],
		            radius : radius,
		            x: '0%', // for funnel
		            data : [
		                {
		                	value:60,
		                	itemStyle : {
		                		normal : {
							    	color: '#f7a923',
							        label : {
							            show : true,
							            textStyle: {
							            	color: '#f7a923',
							            },
							            position : 'right',
							            formatter : function (params){
							                return '新增 \n' + params.data.value / 200
							            },
							        },
							        labelLine : {
							            show : true,
							            lineStyle: {
							            	color: '#f7a923',
							            },
							            length : 5
							        }
							    }
		                	}
		                },
		                {
		                	name:'挂牌公司', 
		                	value:175, 
		                	itemStyle : {
		                		normal : {
							        color: '#f1f3fa',
							        label : {
							            show : true,
							            textStyle: {
							            	color: '#333333',
							            },
							            position : 'center',
							            formatter : '{b}'
							        },
							        labelLine : {
							            show : false
							        }
							    },
							    emphasis: {
							        color: 'rgba(0,0,0,0)'
							    }
		                	}
		                },
		            ]
		        }
		    ]
		};
		realData2 = {
		   series : [
		        {
		            type : 'pie',
		            center : ['50%', '57%'],
		            radius : radius,
		            x: '0%', // for funnel
		            data : [
		                {
		                	value:60,
		                	itemStyle : {
		                		normal : {
							    	color: '#6c6ec1',
							        label : {
							            show : true,
							            textStyle: {
							            	color: '#6c6ec1',
							            },
							            position : 'right',
							            formatter : function (params){
							                return '新增 \n' + params.data.value / 2000
							            },
							        },
							        labelLine : {
							            show : true,
							            lineStyle: {
							            	color: '#6c6ec1',
							            },
							            length : 5
							        }
							    }
		                	}
		                },
		                {
		                	name:'非上市\n企业', 
		                	value:175, 
		                	itemStyle : {
		                		normal : {
							        color: '#f1f3fa',
							        label : {
							            show : true,
							            textStyle: {
							            	color: '#333333',
							            },
							            position : 'center',
							            formatter : '{b}'
							        },
							        labelLine : {
							            show : false
							        }
							    },
							    emphasis: {
							        color: 'rgba(0,0,0,0)'
							    }
		                	}
		                },
		            ]
		        }
		    ]
		};
		realData3 = {
		   series : [
		        {
		            type : 'pie',
		            center : ['50%', '57%'],
		            radius : radius,
		            x: '0%', // for funnel
		            data : [
		                {
		                	value:60,
		                	itemStyle : {
		                		normal : {
							    	color: '#f05461',
							        label : {
							            show : true,
							            textStyle: {
							            	color: '#f05461',
							            },
							            position : 'right',
							            formatter : function (params){
							                return '新增 \n' + params.data.value / 300
							            },
							        },
							        labelLine : {
							            show : true,
							            lineStyle: {
							            	color: '#f05461',
							            },
							            length : 5
							        }
							    }
		                	}
		                },
		                {
		                	name:'定增事件', 
		                	value:175, 
		                	itemStyle : {
		                		normal : {
							        color: '#f1f3fa',
							        label : {
							            show : true,
							            textStyle: {
							            	color: '#333333',
							            },
							            position : 'center',
							            formatter : '{b}'
							        },
							        labelLine : {
							            show : false
							        }
							    },
							    emphasis: {
							        color: 'rgba(0,0,0,0)'
							    }
		                	}
		                },
		            ]
		        }
		    ]
		};
		realData4 = {
		   series : [
		        {
		            type : 'pie',
		            center : ['50%', '57%'],
		            radius : radius,
		            x: '0%', // for funnel
		            data : [
		                {
		                	value:60,
		                	itemStyle : {
		                		normal : {
							    	color: '#3795db',
							        label : {
							            show : true,
							            textStyle: {
							            	color: '#3795db',
							            },
							            position : 'right',
							            formatter : function (params){
							                return '新增 \n' + params.data.value / 300
							            },
							        },
							        labelLine : {
							            show : true,
							            lineStyle: {
							            	color: '#3795db',
							            },
							            length : 5
							        }
							    }
		                	}
		                },
		                {
		                	name:'投资事件', 
		                	value:175, 
		                	itemStyle : {
		                		normal : {
							        color: '#f1f3fa',
							        label : {
							            show : true,
							            textStyle: {
							            	color: '#333333',
							            },
							            position : 'center',
							            formatter : '{b}'
							        },
							        labelLine : {
							            show : false
							        }
							    },
							    emphasis: {
							        color: 'rgba(0,0,0,0)'
							    }
		                	}
		                },
		            ]
		        }
		    ]
		};
		realData5 = {
		   series : [
		        {
		            type : 'pie',
		            center : ['50%', '57%'],
		            radius : radius,
		            x: '0%', // for funnel
		            data : [
		                {
		                	value:60,
		                	itemStyle : {
		                		normal : {
							    	color: '#ff782f',
							        label : {
							            show : true,
							            textStyle: {
							            	color: '#ff782f',
							            },
							            position : 'right',
							            formatter : function (params){
							                return '新增 \n' + params.data.value / 300
							            },
							        },
							        labelLine : {
							            show : true,
							            lineStyle: {
							            	color: '#ff782f',
							            },
							            length : 5
							        }
							    }
		                	}
		                },
		                {
		                	name:'投资机构', 
		                	value:175, 
		                	itemStyle : {
		                		normal : {
							        color: '#f1f3fa',
							        label : {
							            show : true,
							            textStyle: {
							            	color: '#333333',
							            },
							            position : 'center',
							            formatter : '{b}'
							        },
							        labelLine : {
							            show : false
							        }
							    },
							    emphasis: {
							        color: 'rgba(0,0,0,0)'
							    }
		                	}
		                },
		            ]
		        }
		    ]
		};
		realData6 = {
		   series : [
		        {
		            type : 'pie',
		            center : ['50%', '57%'],
		            radius : radius,
		            x: '0%', // for funnel
		            data : [
		                {
		                	value:60,
		                	itemStyle : {
		                		normal : {
							    	color: '#04b9a6',
							        label : {
							            show : true,
							            textStyle: {
							            	color: '#04b9a6',
							            },
							            position : 'right',
							            formatter : '新增 \n'+'{c}',
							        },
							        labelLine : {
							            show : true,
							            lineStyle: {
							            	color: '#04b9a6',
							            },
							            length : 5
							        }
							    }
		                	}
		                },
		                {
		                	name:'券商', 
		                	value:175, 
		                	itemStyle : {
		                		normal : {
							        color: '#f1f3fa',
							        label : {
							            show : true,
							            textStyle: {
							            	color: '#333333',
							            },
							            position : 'center',
							            formatter : '{b}'
							        },
							        labelLine : {
							            show : false
							        }
							    },
							    emphasis: {
							        color: 'rgba(0,0,0,0)'
							    }
		                	}
		                },
		            ]
		        }
		    ]
		};
		realData7 = {
		   series : [
		        {
		            type : 'pie',
		            center : ['50%', '57%'],
		            radius : radius,
		            x: '0%', // for funnel
		            data : [
		                {
		                	value:60,
		                	itemStyle : {
		                		normal : {
							    	color: '#6a546d',
							        label : {
							            show : true,
							            textStyle: {
							            	color: '#6a546d',
							            },
							            position : 'right',
							            formatter : function (params){
							                return '新增 \n' + params.data.value / 100
							            },
							        },
							        labelLine : {
							            show : true,
							            lineStyle: {
							            	color: '#6a546d',
							            },
							            length : 5
							        }
							    }
		                	}
		                },
		                {
		                	name:'公告', 
		                	value:175, 
		                	itemStyle : {
		                		normal : {
							        color: '#f1f3fa',
							        label : {
							            show : true,
							            textStyle: {
							            	color: '#333333',
							            },
							            position : 'center',
							            formatter : '{b}'
							        },
							        labelLine : {
							            show : false
							        }
							    },
							    emphasis: {
							        color: 'rgba(0,0,0,0)'
							    }
		                	}
		                },
		            ]
		        }
		    ]
		};
		realData8 = {
		   series : [
		        {
		            type : 'pie',
		            center : ['50%', '57%'],
		            radius : radius,
		            x: '0%', // for funnel
		            data : [
		                {
		                	value:60,
		                	itemStyle : {
		                		normal : {
							    	color: '#bc7dff',
							        label : {
							            show : true,
							            textStyle: {
							            	color: '#bc7dff',
							            },
							            position : 'right',
							            formatter : function (params){
							                return '新增 \n' + params.data.value / 100
							            },
							        },
							        labelLine : {
							            show : true,
							            lineStyle: {
							            	color: '#bc7dff',
							            },
							            length : 5
							        }
							    }
		                	}
		                },
		                {
		                	name:'资讯', 
		                	value:175, 
		                	itemStyle : {
		                		normal : {
							        color: '#f1f3fa',
							        label : {
							            show : true,
							            textStyle: {
							            	color: '#333333',
							            },
							            position : 'center',
							            formatter : '{b}'
							        },
							        labelLine : {
							            show : false
							        }
							    },
							    emphasis: {
							        color: 'rgba(0,0,0,0)'
							    }
		                	}
		                },
		            ]
		        }
		    ]
		};
		realData9 = {
		   series : [
		        {
		            type : 'pie',
		            center : ['50%', '57%'],
		            radius : radius,
		            x: '0%', // for funnel
		            data : [
		                {
		                	value:60,
		                	itemStyle : {
		                		normal : {
							    	color: '#4ce18c',
							        label : {
							            show : true,
							            textStyle: {
							            	color: '#4ce18c',
							            },
							            position : 'right',
							            formatter : function (params){
							                return '新增 \n' + params.data.value / 300
							            },
							        },
							        labelLine : {
							            show : true,
							            lineStyle: {
							            	color: '#4ce18c',
							            },
							            length : 5
							        }
							    }
		                	}
		                },
		                {
		                	name:'研报', 
		                	value:175, 
		                	itemStyle : {
		                		normal : {
							        color: '#f1f3fa',
							        label : {
							            show : true,
							            textStyle: {
							            	color: '#333333',
							            },
							            position : 'center',
							            formatter : '{b}'
							        },
							        labelLine : {
							            show : false
							        }
							    },
							    emphasis: {
							        color: 'rgba(0,0,0,0)'
							    }
		                	}
		                },
		            ]
		        }
		    ]
		};
		realData10 = {
		   series : [
		        {
		            type : 'pie',
		            center : ['50%', '57%'],
		            radius : radius,
		            x: '0%', // for funnel
		            data : [
		                {
		                	value:60,
		                	itemStyle : {
		                		normal : {
							    	color: '#0064fd',
							        label : {
							            show : true,
							            textStyle: {
							            	color: '#0064fd',
							            },
							            position : 'right',
							            formatter : '新增 \n'+'{c}',
							        },
							        labelLine : {
							            show : true,
							            lineStyle: {
							            	color: '#0064fd',
							            },
							            length : 5
							        }
							    }
		                	}
		                },
		                {
		                	name:'会计师\n事务所', 
		                	value:175, 
		                	itemStyle : {
		                		normal : {
							        color: '#f1f3fa',
							        label : {
							            show : true,
							            textStyle: {
							            	color: '#333333',
							            },
							            position : 'center',
							            formatter : '{b}'
							        },
							        labelLine : {
							            show : false
							        }
							    },
							    emphasis: {
							        color: 'rgba(0,0,0,0)'
							    }
		                	}
		                },
		            ]
		        }
		    ]
		};
		realData11 = {
		   series : [
		        {
		            type : 'pie',
		            center : ['50%', '57%'],
		            radius : radius,
		            x: '0%', // for funnel
		            data : [
		                {
		                	value:60,
		                	itemStyle : {
		                		normal : {
							    	color: '#cd947f',
							        label : {
							            show : true,
							            textStyle: {
							            	color: '#cd947f',
							            },
							            position : 'right',
							            formatter : '新增 \n'+'{c}',
							        },
							        labelLine : {
							            show : true,
							            lineStyle: {
							            	color: '#cd947f',
							            },
							            length : 5
							        }
							    }
		                	}
		                },
		                {
		                	name:'律师\n事务所', 
		                	value:175, 
		                	itemStyle : {
		                		normal : {
							        color: '#f1f3fa',
							        label : {
							            show : true,
							            textStyle: {
							            	color: '#333333',
							            },
							            position : 'center',
							            formatter : '{b}'
							        },
							        labelLine : {
							            show : false
							        }
							    },
							    emphasis: {
							        color: 'rgba(0,0,0,0)'
							    }
		                	}
		                },
		            ]
		        }
		    ]
		};
		
		//实时数据
		function realDataAll(){
			$.kf.ajax({
	            type: "get",
	            url:$.kf.STATISTICSTURN,
	            dataType: "json",
	            data: "",
	            processResponse: function(data) {
	            	if(!isNullOrEmpty(data.data)){
	            		var dataArr = data.data;
	        			$(".realDataTime span").text(data.date);
	            		realData.series[0].data[0].value = dataArr.company[1] * 200;
	            		realData.series[0].data[1].value = dataArr.company[0];
	            		$("#realDataNum").text(dataArr.company[0]);
	            		realData2.series[0].data[0].value = dataArr.noCompany[1] * 2000;
	            		realData2.series[0].data[1].value = dataArr.noCompany[0];
	            		$("#realDataNum2").text(dataArr.noCompany[0]);
	            		realData3.series[0].data[0].value = dataArr.incidentIncrease[1] * 300;
	            		realData3.series[0].data[1].value = dataArr.incidentIncrease[0];
	            		$("#realDataNum3").text(dataArr.incidentIncrease[0]);
	            		realData4.series[0].data[0].value = dataArr.eventInvestment[1] * 300;
	            		realData4.series[0].data[1].value = dataArr.eventInvestment[0];
	            		$("#realDataNum4").text(dataArr.eventInvestment[0]);
	            		realData5.series[0].data[0].value = dataArr.agencyInvestment[1] * 300;
	            		realData5.series[0].data[1].value = dataArr.agencyInvestment[0];
	            		$("#realDataNum5").text(dataArr.agencyInvestment[0]);
	            		realData6.series[0].data[0].value = dataArr.brokers[1];
	            		realData6.series[0].data[1].value = dataArr.brokers[0];
	            		$("#realDataNum6").text(dataArr.brokers[0]);
	            		realData7.series[0].data[0].value = dataArr.notice[1] * 100;
	            		realData7.series[0].data[1].value = dataArr.notice[0];
	            		$("#realDataNum7").text(dataArr.notice[0]);
	            		realData8.series[0].data[0].value = dataArr.news[1] * 100;
	            		realData8.series[0].data[1].value = dataArr.news[0];
	            		$("#realDataNum8").text(dataArr.news[0]);
	            		realData9.series[0].data[0].value = dataArr.report[1] * 300;
	            		realData9.series[0].data[1].value = dataArr.report[0];
	            		$("#realDataNum9").text(dataArr.report[0]);
	            		realData10.series[0].data[0].value = dataArr.accountant[1];
	            		realData10.series[0].data[1].value = dataArr.accountant[0];
	            		$("#realDataNum10").text(dataArr.accountant[0]);
	            		realData11.series[0].data[0].value = dataArr.law[1];
	            		realData11.series[0].data[1].value = dataArr.law[0];
	            		$("#realDataNum11").text(dataArr.law[0]);
	                	//option6.series[0].data = dataArr;
	                	myRealData.setOption(realData);
	                	myRealData2.setOption(realData2);
	                	myRealData3.setOption(realData3);
	                	myRealData4.setOption(realData4);
	                	myRealData5.setOption(realData5);
	                	myRealData6.setOption(realData6);
	                	myRealData7.setOption(realData7);
	                	myRealData8.setOption(realData8);
	                	myRealData9.setOption(realData9);
	                	myRealData10.setOption(realData10);
	                	myRealData11.setOption(realData11);
	            	}
	            }
	        });
	    }
		realDataAll();
		setInterval(realDataAll,10000)
        
        
        //年度热词
        option6 = {
		    tooltip: {
		        show: true,
		        formatter:"{a}"+"<br/>"+"{b}：{c}"+"次"
		    },
		    toolbox: {
		        show : true,
		        y : 'top',
		        x : 'right',
		        feature : {
		            saveAsImage : {
		            	show: true,
		            	name:"三板慧-年度热词",
		            	icon:'../assets/admin/layout/img/saveAsPic.png',
		            	color:"#f57d4b"
		            }
		        }
		    },
		    series: [{
		        name: '年度热词',
		        type: 'wordCloud',
		        size: ['130%', '130%'],
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
		var chartUrl = $.kf.INVESTMENTSTATSERVICE;
		//年度热词
		$.kf.ajax({
            type: "get",
            url:chartUrl+"?type=investOverviewKeywordCloud",
            dataType: "json",
            data: "",
            processResponse: function(data) {
            	if(!isNullOrEmpty(data.data)){
            		var dataArr = data.data;
	            	for (var i=0;i<dataArr.length;i++) {
	            		if(i > 8){
	            			dataArr[i].itemStyle = createRandomItemStyle();
	            		}
	            	}
                	option6.series[0].data = dataArr;
                	myChartMap.setOption(option6);
            	}else{
            		$("#main > div").append("<div class='currentNoData' style='top:120px;'>暂无数据</div>");
            	}
            }
        });
        
        //挂牌企业财务分析
        var optionEch = {
		    tooltip : {
		        trigger: 'item',
		        formatter: "{a} <br/>{b} : {c} ({d}%)"
		    },
		    legend: {
		        orient : 'vertical',
		        x : 'left',
		        data:[]
		    },
		    calculable : false,
		    series : [
		        {
		            name:'',
		            type:'pie',
					radius : ['36%', '43%'],
					center: ['50%', '43%'],
		            itemStyle:{
		            	normal:{
		            		labelLine:{    
			                    length:10,
			                    lineStyle:{
			                    	type:"dotted",
			                    	color:"rgba(250,190,164,1)"
			                    }
				            },
				            label:{
				            	textStyle:{
				            		color:"rgba(0,0,0,1)",
				            		fontFamily:"微软雅黑",
				            		fontSize:12
				            	}
				            }
		            	}
		            },
		            data:[]
		        }
		    ],
		    color:["#04b9a6","#43439a","#5bb2f0","#ff782f"]
		};
		
		//挂牌企业财务分析数据请求
		function moneyAjAX(idc,curentName,grade){
			var id = "";
			var thisName = "";
			var thisImgUrl = $(".moneyGarde").children("img");
			if(!isNullOrEmpty(idc)){
				id = idc
			}else{
				id = $("#companyCommend tr").eq(0).attr("id");
			}
			if(!isNullOrEmpty(curentName)){
				thisName = curentName
			}else{
				thisName = $("#companyCommend tr").eq(0).find("td").eq(0).text();
			}
			$(".companyName").text(thisName);
			if(grade == "A"){
				thisImgUrl.attr("src","../assets/admin/layout/img/lever-a.png");
			}else if(grade == "B"){
				thisImgUrl.attr("src","../assets/admin/layout/img/lever-b.png");
			}else if(grade == "C"){
				thisImgUrl.attr("src","../assets/admin/layout/img/lever-c.png");
			}else if(grade == "D"){
				thisImgUrl.attr("src","../assets/admin/layout/img/lever-d.png");
			}else{
				thisImgUrl.attr("src","../assets/admin/layout/img/lever-e.png");
			}
			$.kf.ajax({
			    type: "get",
			    url:$.kf.GETFINANCIALANALYSIS+"?id="+ id +"&type=analysis&year=2016-12-31",
			    dataType: "json",
			    data: "",
			    processResponse: function(data) {
			    	if(!isNullOrEmpty(data.data.growingUp.data) && $("#tabClick2 a").eq(0).hasClass("active")){
	                	optionEch.series[0].data = data.data.growingUp.data;
	                	myChartMoney.setOption(optionEch);
	                }else if(!isNullOrEmpty(data.data.returnAnalysis.data) && $("#tabClick2 a").eq(1).hasClass("active")){
	                	optionEch.series[0].data = data.data.returnAnalysis.data;
	                	myChartMoney.setOption(optionEch);
	                }else if(!isNullOrEmpty(data.data.safety.data) && $("#tabClick2 a").eq(2).hasClass("active")){
	                	optionEch.series[0].data = data.data.safety.data;
	                	myChartMoney.setOption(optionEch);
	                }else{
	                	myChartMoney.clear();
	            		//$("#echarNum > div").append("<div class='currentNoData' style='top:180px;font-size:14px;'>暂无数据</div>");
	            	};
			    }
			})
		}
		
		//鼠标放上图表切换
		function mouseChart(){
			$("#companyCommend tr").on("mouseover",function(){
				var idc = $(this).attr("id");
				var curentName = $(this).children("td").eq(0).text();
				var grade = $(this).attr("grade");
				moneyAjAX(idc,curentName,grade);
			})
		}
		
		
		
//		挂牌企业推荐 更多跳转
		$("#companyMore").on("click",function(){
			var thisName = "";
			var thisByType = "";
			if($(".companyC span").hasClass("bgredT") || $(".companyC span").hasClass("bgredB")){
				$(".companyC span").each(function(){
					if($(this).hasClass("bgredT") || $(this).hasClass("bgredB")){
						thisName = $(this).parent().attr("name");
						thisByType = $(this).attr("name");
						window.location.href = $.url.companyList() + "&orderByName="+ thisName + "&orderByType=" + thisByType + "&currentTab=tab1&source=homelist";
					}
				})
			}else{
				window.location.href = $.url.companyList() + "&currentTab=tab1";
			}
		})
		
		//挂牌企业推荐
		function companyRecommend(thisName,thisSort){
			$.kf.ajax({
			    type: "get",
			    url:$.kf.DYNAMICCOLUMNHOME+"?source=home&orderByName="+thisName+"&orderByType="+thisSort,
			    //url:$.kf.LAWOFFICE+"?source=home&orderByName="+thisName+"&orderByType="+thisSort,
			    dataType: "json",
			    data: "",
			    processResponse: function(data) {
			    	var list = data.data;
			        var tr = "";
			        $("#companyCommend").html("");
			        if(!isNullOrEmpty(list)){
			        	$(list).each(function (i) {
			                tr += "<tr id="+ list[i].id +" grade="+ list[i].rating +">";
			                tr += "<td><a class='basicName2' href='" + $.url.companyListUrl() + "id=" + list[i].id +"'>" + list[i].name + "</a></td>";
			                tr += "<td class='text-right'>" + list[i].operatingIncome + "</td>";
			                tr += "<td class='text-right'>" + list[i].netProfit + "</td>";
			                if(mobileWidth > 480){
			                	tr += "<td>" + list[i].listingDateMachine + "</td>";
			                }
			                tr += "</tr>";
			            });
			            $("#companyCommend").append(tr);
			            moneyAjAX();
			            mouseChart();
			        }
			    }
			});
		}
		companyRecommend();
		
		//挂牌企业财务分析tab切换
		$("#tabClick2 a").on("click",function(){
			var thisIndex = $(this).index();
			if(thisIndex == 0){
				$(".smallEch").addClass("smallEch1").removeClass("smallEch2").removeClass("smallEch3");
			}else if(thisIndex == 1){
				$(".smallEch").addClass("smallEch2").removeClass("smallEch1").removeClass("smallEch3");
			}else{
				$(".smallEch").addClass("smallEch3").removeClass("smallEch1").removeClass("smallEch2");
			}
			$(this).addClass("active").siblings().removeClass("active");
			moneyAjAX()
		})



		//券商推荐挂牌排行 更多跳转
		$("#brokersMore").on("click",function(){
			var thisName = "";
			var thisByType = "";
			if($(".brokers span").hasClass("bgredT") || $(".brokers span").hasClass("bgredB")){
				$(".brokers span").each(function(){
					if($(this).hasClass("bgredT") || $(this).hasClass("bgredB")){
						thisName = $(this).parent().attr("name");
						thisByType = $(this).attr("name");
						window.location.href = $.url.brokersUrl() + "orderByName="+ thisName + "&orderByType=" + thisByType + "&currentTab=tab1&source=homelist";
					}
				})
			}else{
				window.location.href = $.url.brokersUrl() + "&currentTab=tab1";
			}
		})

		//券商推荐挂牌排行
		function brokersRanking(thisName,thisSort){
			if(isNullOrEmpty(thisSort)){
				thisName = "recommend";
				thisSort = "DESC";
			}
			var isPun = 2;
			$("#menu1 a").on("click",function(){
				isPun = $(this).attr("tabindex");
				$.kf.ajax({
				    type: "get",
				    url:$.kf.SECURITIESCOMPANY + "?source=home&orderByName="+thisName+'&orderByType='+thisSort+'&isPunish='+isPun,
				    dataType: "json",
				    data: "",
				    processResponse: function(data) {
				    	var list = data.data;
				        var tr = "";
				        $("#securitiesList").html("");
				        if(!isNullOrEmpty(list)){
				        	$(list).each(function (i) {
					            tr += "<tr id='"+ list[i].id +"'>";
					            tr += "<td><a href='" + $.url.securitiesUrl() + "currentTab=tab0" + "&id=" + list[i].id + "'>" + list[i].name + "</a></td>";
					            tr += "<td><a href='" + $.url.securitiesUrl() + "currentTab=tab1" + "&id=" + list[i].id + "'>" + list[i].recommend + "</a></td>";
					            tr += "<td><a href='" + $.url.securitiesUrl() + "currentTab=tab3" + "&id=" + list[i].id + "'>" + list[i].recommendedMarket + "</a></td>";
					            if(mobileWidth > 480){
					            	tr += "<td class='text-right'>" + list[i].netCapitalHone + "</td>";
					            	tr += "<td>" + list[i].isPunish + "</td>";
					            }
					            tr += "</tr>";
					        });
					        $("#securitiesList").append(tr);
					        $(".companyName2").text($("#securitiesList tr").eq(0).find("td").eq(0).text());
				        }else{
				        	$("#securitiesList").append("<div class='currentNoData' style='top:180px;font-size:14px;'>暂无数据</div>");
				        }
				    }
				});
			})
			
			$.kf.ajax({
			    type: "get",
			    url:$.kf.SECURITIESCOMPANY + "?source=home&orderByName="+thisName+'&orderByType='+thisSort+'&isPunish='+isPun,
			    dataType: "json",
			    data: "",
			    processResponse: function(data) {
			    	var list = data.data;
			        var tr = "";
			        $("#securitiesList").html("");
			        if(!isNullOrEmpty(list)){
				        $(list).each(function (i) {
				            tr += "<tr id='"+ list[i].id +"'>";
				            tr += "<td><a href='" + $.url.securitiesUrl() + "currentTab=tab0" + "&id=" + list[i].id + "'>" + list[i].name + "</a></td>";
				            tr += "<td><a href='" + $.url.securitiesUrl() + "currentTab=tab1" + "&id=" + list[i].id + "'>" + list[i].recommend + "</a></td>";
				            tr += "<td><a href='" + $.url.securitiesUrl() + "currentTab=tab3" + "&id=" + list[i].id + "'>" + list[i].recommendedMarket + "</a></td>";
				            if(mobileWidth > 480){
					            tr += "<td class='queryWidth'>" + list[i].netCapitalHone + "</td>";
					            tr += "<td>" + list[i].isPunish + "</td>";
					        }
				            tr += "</tr>";
				        });
				        $("#securitiesList").append(tr);
					    $(".companyName2").text($("#securitiesList tr").eq(0).find("td").eq(0).text());
				    }else{
				    	$("#securitiesList").append("<div class='currentNoData' style='top:180px;font-size:14px;'>暂无数据</div>");
				    }
				    totalMoney();
			    }
			});
		}
		brokersRanking();
		
//		券商推荐挂牌企业分布
		var totalMoney = function(){
            optionBar2 = {
			    tooltip : {
			        trigger: 'axis'
			    },
			    calculable : true,
			    grid: {
			    	borderWidth:0,
			    	y:30,
			    	height:'90%',
			    	width:'65%'
			    },
			    xAxis : [
			        {
			        	splitLine:{show: false},//去除网格线
			            type : 'value',
			            boundaryGap : [0, 0.01],
			            position:'top',
			            axisLine:{
			            	show:false
			            },
			            axisLabel:{
			            	textStyle:{
			            		color:'#1f93d2'
			            	}
			            }
			        }
			    ],
			    yAxis : [
			        {
			        	splitLine:{show: false},//去除网格线
			            type : 'category',
			            axisLabel:{
			            	textStyle:{
			            		color:'#1f93d2'
			            	},
			            	formatter:function(name){
			            		var textL = "";
			            		if(name.length > 4){
			            			textL = name.slice(0,4) + '...';
			            		}else{
			            			textL = name;
			            		}
			            		return textL;
			            	}
			            },
			            axisLine:{
			            	lineStyle:{
			            		color:'#1f93d2'
			            	}
			            },
			            axisTick:{
			            	lineStyle:{
			            		color:'#1f93d2'
			            	}
			            },
			            data : [],
			        }
			    ],
			    series : [
			        {
			            name:'数量',
			            type:'bar',
			            itemStyle: {
			            	normal:{
			            		color: function (params){
			                        colorList = ['#46b981','#6eb86a','#77b864','#77b864','#9cb84d','#9db84d','#a1b94c','#b1b843','#ceb731','#d3b72e','#dcb828','#deb828','#e9b821','#ffb815','#fc9b2a'];
			                        return colorList[params.dataIndex];
			                    }
			            	}
			            },
			            data:[]
			        }
			    ]
            };
            
            optionBar3 = {
			    tooltip : {
			        trigger: 'axis'
			    },
			    calculable : true,
			    grid: {
			    	borderWidth:0,
			    	y:'20',
			    	height:'90%',
			    	width:'65%'
			    },
			    xAxis : [
			        {
			        	splitLine:{show: false},//去除网格线
			            type : 'value',
			            boundaryGap : [0, 0.01],
			            position:'top',
			            axisLine:{
			            	show:false
			            },
			            axisLabel:{
			            	textStyle:{
			            		color:'#1f93d2'
			            	}
			            }
			        }
			    ],
			    yAxis : [
			        {
			        	splitLine:{show: false},//去除网格线
			            type : 'category',
			            axisLabel:{
			            	textStyle:{
			            		color:'#1f93d2'
			            	},
			            	formatter:function(name){
			            		var textL = "";
			            		if(name.length > 4){
			            			textL = name.slice(0,4) + '...';
			            		}else{
			            			textL = name;
			            		}
			            		return textL;
			            	}
			            },
			            axisLine:{
			            	lineStyle:{
			            		color:'#1f93d2'
			            	}
			            },
			            axisTick:{
			            	lineStyle:{
			            		color:'#1f93d2'
			            	}
			            },
			            data : [],
			        }
			    ],
			    series : [
			        {
			            name:'数量',
			            type:'bar',
			            itemStyle: {
			            	normal:{
			            		color: function (params){
			                        colorList = ['#5861e6','#5862e5','#417adb','#407cda','#3c7fd9','#3c7fd9','#2a92d0','#2399cb','#14a8c6','#14a8c4','#06b4c0','#01bbb8','#02bbb7','#02bab5','#01bab4'];
			                        return colorList[params.dataIndex];
			                    }
			            	}
			            },
			            data:[]
			        }
			    ]
            };
            
            //按行业
            function pressIndustry(idc){
            	var id = "";
				if(!isNullOrEmpty(idc)){
					id = idc
				}else{
					id = $("#securitiesList tr").eq(0).attr("id");
				}
				$("#barChart2").find(".currentNoData").remove();
            	$.kf.ajax({
	                type: "get",
	                url: $.kf.BROKERAGESERVICE + '?type=statsSecompanyListcompanyIndustryStat&id='+id,
	                dataType: "json",
	                data: "",
	                processResponse: function (result) {
	                	if(!isNullOrEmpty(result.data)){
	                		$("#barChart2 > div").show();
	                		var yaxisData = result.data.industry.reverse();
		                	var seriesData = result.data.value.reverse();
		                	var yaxisLen = yaxisData.length;
		                	var seriesLen = seriesData.length;
	                		if(result.data.industry.length > 15){
		                        optionBar2.yAxis[0].data = yaxisData.splice(yaxisLen-15,yaxisLen);
		                        optionBar2.series[0].data = seriesData.splice(seriesLen-15,seriesLen);
		                        myChartBar2.setOption(optionBar2,true);
		                	}else{
		                        optionBar2.yAxis[0].data = yaxisData;
		                        optionBar2.series[0].data = seriesData;
		                        myChartBar2.setOption(optionBar2,true);
		                	}
	                	}else{
	                		/*$("#barChart > div").hide();
		            		$("#barChart").append("<div class='currentNoData' style='top:180px;'>暂无数据</div>");*/
		            		
	                		$("#barChart2 > div").hide();
		            		$("#barChart2").append("<div class='currentNoData' style='top:180px;'>暂无数据</div>");
		            	};
	                }
	            });
            }
            pressIndustry();
            
            //按地区
            function pressArea(idc){
            	var id = "";
				if(!isNullOrEmpty(idc)){
					id = idc
				}else{
					id = $("#securitiesList tr").eq(0).attr("id");
				}
				$("#barChart2").find(".currentNoData").remove();
            	$.kf.ajax({
	                type: "get",
                    async: false,
                    url: $.kf.BROKERAGESERVICE + '?type=statsSecompanyListcompanyAreaStat&id='+id,
//                  url:'http://test.kaifengdata.com/brokerageservice/getList?type=statsSecompanyListcompanyAreaStat&id=6d5262d955c9f9bf7a8020900726a9',
                    dataType: "json",
                    data: "",
                    processResponse: function (result) {
                    	if(!isNullOrEmpty(result.data)){
                    		$("#barChart2 > div").show();
                    		//var colorList = ['#5861e6','#5862e5','#417adb','#407cda','#3c7fd9','#3c7fd9','#2a92d0','#2399cb','#14a8c6','#14a8c4','#06b4c0','#01bbb8','#02bbb7','#02bab5','#01bab4'];
	                        var yaxisData = result.data.area.reverse();
		                	var seriesData = result.data.value.reverse();
		                	var yaxisLen = yaxisData.length;
		                	var seriesLen = seriesData.length;
		                	if(result.data.area.length > 15){
		                        optionBar3.yAxis[0].data = yaxisData.splice(yaxisLen - 15,yaxisLen);
		                        optionBar3.series[0].data = seriesData.splice(seriesLen - 15,seriesLen);
		                        myChartBar2.setOption(optionBar3,true);
		                    }else{
		                        optionBar3.yAxis[0].data = yaxisData;
		                        optionBar3.series[0].data = seriesData;
		                        myChartBar2.setOption(optionBar3,true);
		                	}
			            }else{
	                		$("#barChart2 > div").hide();
		            		$("#barChart2").append("<div class='currentNoData' style='top:180px;'>暂无数据</div>");
		            	};
                    }
	            });
            }
            
            //按行业、按地区切换
	        $("#privateTab a").click(function(){
	        	$(this).addClass("active").siblings("a").removeClass("active");
	        	if($(this).text() == "按行业"){
	        		pressIndustry();
	        	}else if($(this).text() == "按地区"){
	        		pressArea();
	        	}
	        })
	        
	        $("#securitiesList tr").mouseover(function(){
	        	var idc = $(this).attr("id");
	        	$(".companyName2").text($(this).eq(0).children("td").eq(0).text());
	        	if($("#privateTab a").eq(0).hasClass("active")){
	        		pressIndustry(idc);
	        	}else{
	        		pressArea(idc);
	        	}
	        })
        }
		
		
//		排序
		$(".sort").on("click",function(){
			var thisName = $(this).attr("name");
			var thisSort = "";
			var sortUp = $(this).find("span").eq(0);
			var sortDown = $(this).find("span").eq(1);
			$(this).parent("th").siblings().each(function(){
				$(this).find("span").eq(0).removeClass("bgredT");
				$(this).find("span").eq(1).removeClass("bgredB");
			})
			if(sortUp.hasClass("bgredT")){
				sortUp.removeClass("bgredT");
				sortDown.addClass("bgredB");
				thisSort = sortDown.attr("name");
			}else if(sortDown.hasClass("bgredB")){
				sortDown.removeClass("bgredB");
				sortUp.addClass("bgredT");
				thisSort = sortUp.attr("name");
			}else{
				sortUp.addClass("bgredT");
				thisSort = sortUp.attr("name");
			}
			
			if($(this).hasClass("activeInven")){
				activeBody(thisName,thisSort);
			}else if($(this).hasClass("investBoard")){
				investBoard(thisName,thisSort);
			}else if($(this).hasClass("brokers")){
				brokersRanking(thisName,thisSort);
			}else if($(this).hasClass("ipoTen")){
				ipoTen(thisName,thisSort);	
			}else if($(this).hasClass("addEvent")){
				addEvent(thisName,thisSort);
			}else if($(this).hasClass("companyC")){
				companyRecommend(thisName,thisSort);
			}else if($(this).hasClass("tableOne")){
				accountant(thisName,thisSort);
			}else if($(this).hasClass("tableTwo")){
				lawyer(thisName,thisSort);
			}
		})
    }
)


//案例热词分布
var myChart = echarts.init(document.getElementById('caseHot'));
window.addEventListener("resize", function () {
    myChart.resize();
})

// 指定图表的配置项和数据
var option = {
	color: ["#c6e1f5","#b2eded",  "#fbd9c1", "#fbe5a0", "#e4f1c8", "#caf2d5", "#fbcdd1", "#f8e8b8", "#d6d6f5", "#fee0d1"],
    tooltip: {
        trigger: 'item',
        formatter: "{b}"+" {c}"  //显示tooltip时，只显示name
    },
    calculable: false,
    series: [{
        name: '矩形图',
        type: 'treemap',
        height: '100%',
        width: '100%',
        itemStyle: {
            normal: {
                label: {
                    show: true,
                    formatter: "{b}"+"\n{c}",
                    fontSize: 12,
                    color: '#000000'
                },

                borderWidth: 1
            },
            emphasis: {
                label: {
                    show: true
                }
            }
        },
        label: {
            normal: {
                textStyle: {
                    fontSize: 12,
                    formatter: "{b}"
                }
            }
        },
        breadcrumb: {//关闭面包屑路径
            show: false
        },
        roam: false,//关闭平移拖动
        nodeClick: false,//关闭节点点击
        silent: false,//关闭鼠标事件
        data: [
        	
        ]
    }]
};


//年度热词
$.kf.ajax({
    type: "get",
    url:$.kf.CASEHOTWORDS,
    dataType: "json",
    data: "",
    processResponse: function(data) {
    	if(!isNullOrEmpty(data.data)){
    		option.series[0].data = data.data;
    		myChart.setOption(option);
    	}else{
    		$("#caseHot > div").append("<div class='currentNoData' style='top:120px;'>暂无数据</div>");
    	}
    	
    }
});

//热词点击跳转
var ecConfig = require('echarts/config');
function eConsole(param) {
    var mes = '';
    if (typeof param.seriesIndex != 'undefined') {
        mes += param.seriesIndex;
    }
    if (param.type == 'click') {
    	var getCookie = $.cookie('permission');
    	if(getCookie == 'true'){
        	window.location.href = $.url.wechaSearch() + "&caseHot=" + param.name;
    	}else{
    		$("#toPay-Modal").modal("show");
    	}
    }
}
myChart.on(ecConfig.EVENT.CLICK, eConsole);


//活跃机构
$("#tabClick a").on("click",function(){
	var thisIndex = $(this).index();
	$(this).addClass("active").siblings().removeClass("active");
	$(".tabCon div").eq(thisIndex).removeClass("hide").siblings().addClass("hide");
})

//更多跳转
$("#activeRanking").on("click",function(){
	var thisName = "";
	var thisByType = "";
	if($("#tabClick a").eq(0).hasClass("active")){
		$(".activeInven span").each(function(){
			if($(this).hasClass("bgredT") || $(this).hasClass("bgredB")){
				thisName = $(this).parent().attr("name");
				thisByType = $(this).attr("name");
				window.location.href = $.url.investmentAgency() + "orderByName="+ thisName + "&orderByType=" + thisByType;
			}
		})
	}else{
		$(".investBoard span").each(function(){
			if($(this).hasClass("bgredT") || $(this).hasClass("bgredB")){
				thisName = $(this).parent().attr("name");
				thisByType = $(this).attr("name");
				window.location.href = $.url.investmentAgency() + "orderByName="+ thisName + "&orderByType=" + thisByType;
			}
		})
	}
})

//活跃机构
function activeBody(thisName,thisSort){
	if(isNullOrEmpty(thisSort)){
		thisName = "investment_num";
		thisSort = "DESC";
	}
	$.kf.ajax({
	    type: "get",
	    url:$.kf.INVESTINSTITUTIONS+"?source=home&orderByName="+thisName+'&orderByType='+thisSort,
	    dataType: "json",
	    data: "",
	    processResponse: function(data) {
	    	$("#activeBody").html("");
	    	var list = data.data;
	    	var tr = "";
	    	$(list).each(function (i) {
	            //console.log(list[i]);
	        	tr += "<tr>";
	        	if(list[i].shortname.length > 4){
	        		tr += "<td><a href='" + $.url.investmentAgencyDetailsUrl() + "id=" + list[i].id + "' title='"+list[i].shortname+"'>" + list[i].shortname.substring(0,4) + "...</a></td>";
	        	}else{
	        		tr += "<td><a href='" + $.url.investmentAgencyDetailsUrl() + "id=" + list[i].id + "'>" + list[i].shortname + "</a></td>";
	        	}
	            tr += "<td>" + list[i].companyNum + "</td>";
	            if(list[i].boardName.length > 4){
	            	tr += "<td><a href='"+ $.url.industryUrl() + "id="+ list[i].boardcompanyId +"&from=companylisted'>" + list[i].boardName.substring(0,4) + "...</a></td>";
	            }else{
	            	tr += "<td><a href='"+ $.url.industryUrl() + "id="+ list[i].boardcompanyId +"&from=companylisted'>" + list[i].boardName + "</a></td>";
	            }
	            if(mobileWidth > 1280){
	            	tr += "<td class='text-right'>" + list[i].date + "</td>";
	            	tr += "<td class='text-right'>" + list[i].totalInvestment + "</td>";
	            	$(".invesmentTime").removeClass("hide");
	            	$(".invesmentCont").removeClass("hide");
	            }else if(mobileWidth <= 1280 && mobileWidth >768){
	            	tr += "<td class='text-right'>" + list[i].date + "</td>";
	            	$(".invesmentCont").addClass("hide");
	            }else{
	            	$(".invesmentTime").addClass("hide");
	            	$(".invesmentCont").addClass("hide");
	            }
	            tr += "</tr>";
	        });
	        $("#activeBody").append(tr);
	    }
	});
}
activeBody();

//投资新三板机构
function investBoard(thisName,thisSort){
	if(isNullOrEmpty(thisSort)){
		thisName = "investment_neeq_num";
		thisSort = "DESC";
	}
	$.kf.ajax({
	    type: "get",
	    url:$.kf.INVESTINSTITUTIONS+"?source=homelist&orderByName="+thisName+'&orderByType='+thisSort,
	    dataType: "json",
	    data: "",
	    processResponse: function(data) {
	    	$("#activeBody2").html("");
	    	var list = data.data;
	    	var tr = "";
	    	$(list).each(function (i) {
	        	tr += "<tr>";
	        	if(list[i].shortname.length > 4){
	            	tr += "<td><a title='"+ list[i].shortname +"' href='" + $.url.investmentAgencyDetailsUrl() + "id=" + list[i].id + "'>" + list[i].shortname.substring(0,4) + "...</a></td>";
	            }else{
	            	tr += "<td><a title='"+ list[i].shortname +"' href='" + $.url.investmentAgencyDetailsUrl() + "id=" + list[i].id + "'>" + list[i].shortname + "...</a></td>";
	            }
	            tr += "<td>" + list[i].boardNum + "</td>";
	           	if(list[i].companyName.length > 4){
	            	tr += "<td><a href='"+ $.url.companyListUrl() + "id="+ list[i].boardcompanyId + "&nameCodeId="+ list[i].code +"&from=companylisted'>" + list[i].companyName.substring(0,4) + "...</a></td>";
	            }else{
	            	tr += "<td><a href='"+ $.url.companyListUrl() + "id="+ list[i].boardcompanyId + "&nameCodeId="+ list[i].code +"&from=companylisted'>" + list[i].companyName + "</a></td>";
	            }
	            if(mobileWidth > 1280){
	            	tr += "<td class='text-right'>" + list[i].date + "</td>";
	            	tr += "<td class='text-right'>" + list[i].totalInvestment + "</td>";
	            	$(".invesmentTime").removeClass("hide");
	            	$(".invesmentCont").removeClass("hide");
	            }else if(mobileWidth <= 1280 && mobileWidth >768){
	            	tr += "<td class='text-right'>" + list[i].date + "</td>";
	            	$(".invesmentCont").addClass("hide");
	            }else{
	            	$(".invesmentTime").addClass("hide");
	            	$(".invesmentCont").addClass("hide");
	            }
	            tr += "</tr>";
	        });
	        $("#activeBody2").append(tr);
//	    	$("#activeBody2 tr").eq(0).addClass("active");
	    }
	});
}
investBoard();


//最新动态
$.kf.ajax({
    type: "get",
    url:$.kf.GETLATESTNEWS,
    dataType: "json",
    data: "",
    processResponse: function(data) {
    	$("#latestNewsList").html("");
    	var list = data.data;
    	var tr = "";
		$(list).each(function (i) {
			if(i >= 20){
				return false;
			}else{
				tr += "<li>";
			    if (list[i].fileExt == "pdf") {
			        tr += "<a target='_blank' href='" + list[i].fileUrl + "'><b></b>" + list[i].title + "</a>";
			    	tr += "<span>"+ list[i].date +"</span><span class='mgl20'>" + list[i].type + "</span>";
			    } else {
			    	tr += "<a target='_blank' href='" + $.url.newsInfoUrl() + "from=latestnews&id=" + list[i].id + '&name=news&position=latestnews' + "'><b></b>" + list[i].title + "</a>";
			    	tr += "<span>"+ list[i].date +"</span><span class='mgl20'>" + list[i].type + "</span>";
			    }
			    tr += "</li>";
			}
		});
		$("#latestNewsList").append(tr);
    }
})

//公司公告监测
$.kf.ajax({
    type: "get",
    url:$.kf.GNOTE,
    dataType: "json",
    data: "",
    processResponse: function(data) {
    	$("#companyNotice").html("");
    	var list = data.data;
    	var tr = "";
		$(list).each(function (i) {
			if(i >= 20){
				return false;
			}else{
				tr += "<li>";
			   		tr += "<a href='"+list[i].url+"'target='_blank'><b></b>" + list[i].title + "</a>";
			    	tr += "<span>"+ list[i].date +"</span><span class='mgl20'>" + list[i].publishType + "</span>";
			    tr += "</li>";
			}
		});
		$("#companyNotice").append(tr);
    }
})



//十大IPO预测  更多跳转
var getPromiss = $.cookie("permission");
if(getPromiss == 'true'){
	$("#ipoMore").removeClass("toPay");
}else{
	$("#ipoMore").attr("id","")
}

$("#ipoMore").on("click",function(){
	var thisName = "";
	var thisByType = "";
	if($(".ipoTen span").hasClass("bgredT") || $(".ipoTen span").hasClass("bgredB")){
		$(".ipoTen span").each(function(){
			if($(this).hasClass("bgredT") || $(this).hasClass("bgredB")){
				thisName = $(this).parent().attr("name");
				thisByType = $(this).attr("name");
				window.location.href = $.url.privilegeUrl() + "orderByName="+ thisName + "&orderByType=" + thisByType + "&currentTab=tab1&source=homelist";
			}
		})
	}else{
		window.location.href = $.url.privilegeUrl() + "&currentTab=tab1";
	}
})

//十大IPO预测
function ipoTen(thisName,thisSort){
	if(isNullOrEmpty(thisSort)){
		thisName = "total_value";
		thisSort = "DESC";
	}
	$.kf.ajax({
	    type: "get",
	    url:$.kf.PRIVILECOMPANYLIST + "?source=home&orderByName="+thisName+'&orderByType='+thisSort,
	    dataType: "json",
	    data: "",
	    processResponse: function(data) {
	    	var listData = data.data;
	        var tr = "";
	        $("#ipoPrediction").html("");
	        if(!isNullOrEmpty(listData)){
	        	$(listData).each(function (i) {
	                tr += "<tr>";
	                tr += "<td><a href='"+ $.url.companyListUrl() + "id=" + listData[i].id +"&nameCodeId=" + listData[i].code + "&position=privilege'>"+ listData[i].shortname +"</a></td>";
	                tr += "<td>"+ listData[i].dynamicProfit +"</td>";
	                tr += "<td class='text-right'>"+ listData[i].totalValue +"</td>";
	                tr += "</tr>";
	            });
	            $("#ipoPrediction").append(tr);
	        }else{
	        }
	    }
	});
}
ipoTen();



//定增事件监测  更多跳转
$("#watchMore").on("click",function(){
	var thisName = "";
	var thisByType = "";
	if($(".addEvent span").hasClass("bgredT") || $(".addEvent span").hasClass("bgredB")){
		$(".addEvent span").each(function(){
			if($(this).hasClass("bgredT") || $(this).hasClass("bgredB")){
				thisName = $(this).parent().attr("name");
				thisByType = $(this).attr("name");
				window.location.href = $.url.addList() + "orderByName="+ thisName + "&orderByType=" + thisByType + "&currentTab=tab1&source=homelist";
			}
		})
	}else{
		window.location.href = $.url.addList() + "&currentTab=tab1";
	}
})

//定增事件监测
function addEvent(thisName,thisSort){
	if(isNullOrEmpty(thisSort)){
		thisName = "fund_max";
		thisSort = "DESC";
	}
	$.kf.ajax({
	    type: "get",
	    url:$.kf.GETSTOCKDILUTIONCOLUMN+"?source=home&orderByName="+thisName+"&orderByType="+thisSort,
	    dataType: "json",
	    data: "",
	    processResponse: function(data) {
	    	var listData = data.data;
	        var tr = "";
	        $("#addEventWatch").html("");
	        if(!isNullOrEmpty(listData)){
	        	$(listData).each(function (i) {
	                tr += "<tr>";
	                tr += "<td><a href='"+ $.url.companyListUrl() + "id=" + listData[i].company_id +"&nameCodeId=" + listData[i].code + "&position=privilege'>"+ listData[i].shortname +"</a></td>";
	                tr += "<td>"+ listData[i].progressName +"</td>";
	                tr += "<td class='text-right'>"+ listData[i].fundMax +"</td>";
	                tr += "</tr>";
	            });
	            $("#addEventWatch").append(tr);
	        }else{
	        	
	        }
	    }
	});
}
addEvent();



//活跃事务所排行 Tab
$("#tabClick3 a").on("click",function(){
	var thisIndex = $(this).index();
	$(this).addClass("active").siblings().removeClass("active");
	$("#tabCon3 div").eq(thisIndex).removeClass("hide").siblings().addClass("hide");
})

//活跃事务所排行更多跳转
$("#activeFirm").on("click",function(){
	var thisName = "";
	var thisByType = "";
	if($("#tabClick3 a").eq(0).hasClass("active")){
		$(".tableOne span").each(function(){
			if($(this).hasClass("bgredT") || $(this).hasClass("bgredB")){
				thisName = $(this).parent().attr("name");
				thisByType = $(this).attr("name");
				window.location.href = $.url.accounting() + "&orderByName="+ thisName + "&orderByType=" + thisByType;
			}
		})
	}else{
		$(".tableTwo span").each(function(){
			if($(this).hasClass("bgredT") || $(this).hasClass("bgredB")){
				thisName = $(this).parent().attr("name");
				thisByType = $(this).attr("name");
				window.location.href = $.url.agencyLaw() + "orderByName="+ thisName + "&orderByType=" + thisByType;
			}
		})
	}
})

//会计师事务所
function accountant(thisName,thisSort){
	if(isNullOrEmpty(thisSort)){
		thisName = "service_number";
		thisSort = "DESC";
	}
	$.kf.ajax({
	    type: "get",
	    url:$.kf.ACCOUNTINGFIRM+"?source=home&orderByName="+thisName+"&orderByType="+thisSort,
	    dataType: "json",
	    data: "",
	    processResponse: function(data) {
	    	var list = data.data;
	        var tr = "";
	        $("#tableOne").html("");
	        if(!isNullOrEmpty(list)){
	        	$(list).each(function (i) {
	                tr += "<tr>";
	                tr += "<td><a class='basicName2'  data-name='"+list[i].companyName+"' href='"+ $.url.industryUrl() + "id=" + list[i].id +"'>" + list[i].name + "</a></td>";
	                tr += "<td>" + list[i].serviceListing + "</td>";
	                tr += "<td>" + list[i].date + "</td>";
	                tr += "</tr>";
	            });
	            $("#tableOne").append(tr);
	        }else{
	        	
	        }
	    }
	});
}
accountant();

//律师事务所
function lawyer(thisName,thisSort){
	if(isNullOrEmpty(thisSort)){
		thisName = "service_number";
		thisSort = "DESC";
	}
	$.kf.ajax({
	    type: "get",
	    url:$.kf.LAWOFFICE+"?source=home&orderByName="+thisName+"&orderByType="+thisSort,
	    dataType: "json",
	    data: "",
	    processResponse: function(data) {
	    	var list = data.data;
	        var tr = "";
	        $("#tableTwo").html("");
	        if(!isNullOrEmpty(list)){
	        	$(list).each(function (i) {
	                tr += "<tr>";
	                tr += "<td><a class='basicName2'  data-name='"+list[i].companyName+"' href='"+ $.url.industryUrl() + "id=" + list[i].id +"'>" + list[i].name + "</a></td>";
	                tr += "<td>" + list[i].serviceListing + "</td>";
	                tr += "<td>" + list[i].date + "</td>";
	                tr += "</tr>";
	            });
	            $("#tableTwo").append(tr);
	        }else{
	        	
	        }
	    }
	});
}
lawyer();


