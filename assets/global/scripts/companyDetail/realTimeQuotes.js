$(function(){
	
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
            'echarts/chart/line',
            'echarts/chart/k'
        ],
        function (ec) {
            // 基于准备好的dom，初始化echarts图表
            var _width = $(".page-content-par").width()-200;
            $("#sellChart").width(_width);
            $("#barChart").width(_width);
            $("#barChartDay").width(_width);
            $("#barChartWeek").width(_width);
            $("#barChartMonth").width(_width);
            $("#barChartQuarter").width(_width);
            $("#dayChart").width(_width);
            $("#weekChart").width(_width);
            $("#monthChart").width(_width);
            $("#quarterChart").width(_width);
            var sellChart = ec.init(document.getElementById('sellChart'),"macarons");
            var barChart = ec.init(document.getElementById('barChart'),"macarons");
            var barChartDay = ec.init(document.getElementById('barChartDay'),"macarons");
            var barChartWeek = ec.init(document.getElementById('barChartWeek'),"macarons");
            var barChartMonth = ec.init(document.getElementById('barChartMonth'),"macarons");
            var barChartQuarter = ec.init(document.getElementById('barChartQuarter'),"macarons");
            var dayChart = ec.init(document.getElementById('dayChart'),"macarons");
            var weekChart = ec.init(document.getElementById('weekChart'),"macarons");
            var monthChart = ec.init(document.getElementById('monthChart'),"macarons");
            var quarterChart = ec.init(document.getElementById('quarterChart'),"macarons");
            //resize
            window.addEventListener("resize",function(){
            	var _width = $(".page-content-par").width()-200;
            	$("#sellChart").width(_width);
	            $("#barChart").width(_width);
	            $("#barChartDay").width(_width);
	            $("#barChartWeek").width(_width);
	            $("#barChartMonth").width(_width);
	            $("#barChartQuarter").width(_width);
	            $("#dayChart").width(_width);
	            $("#weekChart").width(_width);
	            $("#monthChart").width(_width);
	            $("#quarterChart").width(_width);
		    	sellChart.resize();
		    	barChart.resize();
		    	barChartDay.resize();
		    	barChartWeek.resize();
		    	barChartMonth.resize();
		    	barChartQuarter.resize();
		    	dayChart.resize();
		    	weekChart.resize();
		    	monthChart.resize();
		    	quarterChart.resize();
		    });
		    //格式化32.4位32.40
            function getFloatStr(x){ 
            	if(x =="-" || x =="--"){
            		s_x = "-"
            	}else{
            		var f_x = parseFloat(x);    
				　　if (isNaN(f_x))    
				　　{    
				　　　　return 0;    
				　　}    
				　　var f_x = Math.round(x*100)/100;    
				　　var s_x = f_x.toString();    
				　　var pos_decimal = s_x.indexOf('.');    
				　　if (pos_decimal < 0)    
				　　{    
				　　　　pos_decimal = s_x.length;    
				　　		s_x += '.';    
				　　}    
				　　while (s_x.length <= pos_decimal + 2)    
				　　{    
				　　　　s_x += '0';    
				　　}    
				　　
            	}
		        return s_x;   
		    }; 
		    function isIE() { //ie?
				if (!!window.ActiveXObject || "ActiveXObject" in window)
				  	return true;
				else
				  	return false;
		    }
		    function setXaxisNum(){
		    	var time9 = 9;
		    	var time10 = 10;
		    	var time11 = 11;
		    	var time13 = 13;
		    	var time14 = 14;
		    	var time9arr = [];
		    	var time10arr = [];
		    	var time11arr = [];
		    	var time13arr = [];
		    	var time14arr = [];
		    	var timeAll = [];
		    	var timeNum = '';
		    	function time(time,timeArr){
		    		var num = 0;
		    		for (var i=0;i<60;i++) {
			    		num ++ ;
			    		if(num < 10){
			    			num = "0"+num;
			    		}else if(num == 60){
			    			num = "00";
			    			time ++;
			    		}
			    		timeArr.push(time+":"+num)
			    	}
		    		return timeArr;
		    	}
		    	function timeHalf(time,timeArr){
		    		var numHalf = 29;
		    		for (var i=29;i<60;i++) {
			    		numHalf ++ ;
			    		if(numHalf < 10){
			    			numHalf = "0"+numHalf;
			    		}else if(numHalf == 60){
			    			numHalf = "00";
			    			time ++;
			    		}
			    		timeArr.push(time+":"+numHalf)
			    	}
		    		return timeArr;
		    	}
		    	function timeHalfBefore(time,timeArr){
		    		var num = 0;
		    		for (var i=0;i<30;i++) {
			    		num ++ ;
			    		if(num < 10){
			    			num = "0"+num;
			    		}else if(num == 30){
			    			num = "30/13:00"
			    		}
			    		timeArr.push(time+":"+num)
			    	}
		    		return timeArr;
		    	}
		    	timeAll = timeAll.concat(timeHalf(time9,time9arr));
		    	timeAll = timeAll.concat(time(time10,time10arr));
		    	timeAll = timeAll.concat(timeHalfBefore(time11,time11arr));
		    	timeAll = timeAll.concat(time(time13,time13arr));
		    	timeAll = timeAll.concat(time(time14,time14arr));
		    	return timeAll;
		    }
            
            //实时行情折线图
            var option = {
            	noDataLoadingOption: {
                    text: ' ',
                    effect: function(params){
                    	params.start = function(h){
                    		h._bgDom.style.background = "transparent";
                    		h._bgDom.style.opacity = 0;
                    	}
                    	params.stop = function(h){
                    		h._bgDom.style.background = "transparent";
                    		h._bgDom.style.opacity = 0;
                    	}
                    	return params;
                    },
                    effectOption: {
                        effect: {
                            n: 0
                        }
                    }
 				},
			    title : {
			        text: '',
			        subtext: ''
			    },
			    tooltip : {
			        trigger: 'axis',
			        formatter: function (params) {
			        	var res = params[0].name + '<br/>' ;
			        	if(Number(params[0].value) == 0 || isNullOrEmpty(params[0].value)){
			        		res += params[0].seriesName +"：--";
			        	}else{
				        	res += params[0].seriesName +"："+ getFloatStr(params[0].value);
			        	}
			            return res;
			        }
			    },
			    legend: {
			        data:[{"name":"最新价"},{"name":"平均值"}]
			    },
			    grid:{
			    	x: 80,
			        y: 40,
			        x2:80,
			        y2:30
			    },
			    calculable : true,
			    xAxis :[{
                    type : 'category',
                    boundaryGap : true,
                    axisTick:{
	                	show:false
	                },
	                axisLine:{
	                	onZero: false
	                },
	                data : setXaxisNum(),
	                axisLabel:{
	                	show:true,
	                	interval:function(index,data){
	                		if(index == 0 || index == 60 || index == 120 || index == 180 || index == 240){
	                			return true;
	                		}else{
	                			return false;
	                		}
	                	}
	                }
                    
                }],
			    yAxis : [
			        {
			            type : 'value',
			            name:"",
			            axisLabel:{
			            	formatter:function(value){
			            		value = Number(value);
			            		var vaRt = value.toString();
			            		if(Number(yesTdayNum) <= 1.11){//小于1.11的90%,小于1.00;保留四位小数
			            			if(vaRt.indexOf(".") > 0){
				            			var av = Number(vaRt.split(".")[0] +"."+ vaRt.split(".")[1].substring(0,4)).toFixed(4);
				            		}else{
				            			var av = value.toFixed(4);
				            		}
			            		}else{
			            			if(vaRt.indexOf(".") > 0){
				            			var av = Number(vaRt.split(".")[0] +"."+ vaRt.split(".")[1].substring(0,2)).toFixed(2);
				            		}else{
				            			var av = value.toFixed(2);
				            		}
				            		
				            		/*if(Math.abs(av - yesTdayNum) < 0.01 ){
			            				av = yesTdayNum.toFixed(2);
			            			}*/
			            		}
			            		
			            		if(av == 0){
			            			av = 0;
			            		}
			            		return av;
			            	},
			            	textStyle:{
			            		color:function(value){
			            			value = Number(value);
			            			var vaRt = value.toString();
				            		if(yesTdayNum <= 1.11){//小于1.11的90%,小于1.00;保留四位小数
				            			if(vaRt.indexOf(".") > 0){
					            			var av = Number(vaRt.split(".")[0] +"."+ vaRt.split(".")[1].substring(0,4)).toFixed(4);
					            		}else{
					            			var av = value.toFixed(4);
					            		}
				            		}else{
				            			if(vaRt.indexOf(".") > 0){
					            			var av = Number(vaRt.split(".")[0] +"."+ vaRt.split(".")[1].substring(0,2)).toFixed(2);
					            		}else{
					            			var av = value.toFixed(2);
					            		}
					            		/*if(Math.abs(av - yesTdayNum) < 0.01 ){
				            				av = yesTdayNum.toFixed(2);
				            			}*/
				            		}
			            			if(av < yesTdayNum){
			            				return "#06b042";
			            			}else if(av > yesTdayNum){
			            				return "#f24957";
			            			}else{
			            				return "#333333";
			            			}
			            		}
			            	}
			            },
			            boundaryGap:[0,0.1],
			            splitNumber:6
			        },
			        {
			            type : 'value',
			            name:"",
			            axisLabel:{
			            	formatter: function(value){
			            		value = getFloatStr(Math.abs(value))+"%";
			            		return value;
			            	},
			            	textStyle:{
			            		color:function(param){
			            			var param = Number(getFloatStr(param));
			            			if(param < 0){
			            				return "#06b042";
			            			}else if(param > 0){
			            				return "#f24957";
			            			}else{
			            				return "#333333";
			            			}
			            		}
			            	}
			            },
			            splitNumber:6
			            
			        }
			    ],
			    series : [
			        {
			            name:'最新价',
			            type:'line',
			            yAxisIndex: 0,
			            data:[],
			            /*markPoint : {
			                data : [
			                    {type : 'max', name: '最大值'}
			                ]
			            },*/
			            markLine : {
			                data : []
			            },
			            itemStyle:{
			            	normal:{
			            		color:"#1bb2d8"
			            	}
			            },
			            symbol:"none"
			        },
			        {
			            name:'平均值',
			            type:'line',
			            yAxisIndex: 0,
			            data:[],
			            itemStyle:{
			            	normal:{
		            			width:1,
		            			color:"#e4af0f",
		            			borderWidth:1
			            	}
			            },
			            symbol:"none"
			        },
			        {
			            name:'',
			            yAxisIndex: 1,
			            type:'line',
			            data:[],
			            itemStyle:{
			            	normal:{
		            			width:1,
		            			color:"#e4af0f",
		            			borderWidth:1
			            	}
			            },
			            symbol:"none"
			        }
			    ]
			};
            //实时行情柱形图
           	var barOption = {
                tooltip: {
                    show: true,
                    trigger: 'axis'
                },
                legend: {
                    data:[]
                },
                grid: {
                	borderWidth:0,
			        x: 80,
			        y:10,
			        x2:80,
			        y2:40
			    },
                calculable : true,
                xAxis : [
                    {
	                    type : 'category',
	                    boundaryGap : true,
	                    axisTick:{
		                	show:false
		                },
		                axisLine:{
		                	onZero: false
		                },
		                data : setXaxisNum(),
		                axisLabel:{
		                	show:false,
		                	interval:function(index,data){
		                		if(index == 0 || index == 60 || index == 120 || index == 180 || index == 240){
		                			return true;
		                		}else{
		                			return false;
		                		}
		                	}
		                }
	                    
	                }
                ],
                yAxis : [
                    {
                        type : 'value',
                        axisLabel : {
			                formatter: '{value}'
			            }
                    }
                ],
                series : [
                    {
                        "name":"成交量",
                        "type":"bar",
                        "data":[],
                        "barWidth" :1,//柱图宽度
			            itemStyle:{
			            	normal:{
			            		barBorderRadius:0,
			            		color:"#1bb2d8"
			            	}
			            },
			            symbol:"none"
                    }
                ]
           	};
            //日线柱形图
            var barOptionDay = {
                tooltip: {
                    show: true,
                    trigger: 'axis',
                    formatter: function (params) {
			        	var res = params[0].name + '<br/>' ;
			        	res += params[0].seriesName +"："+ getFloatStr(params[0].value);
			            return res;
			        }
                },
                legend: {
                    data:[]
                },
                grid: {
                	borderWidth:0,
			        x: 80,
			        y:10,
			        x2:80,
			        y2:40
			    },
                calculable : true,
                xAxis : [
                    {
                        type : 'category',
                        data : [],
                        axisTick:{
		                	show:false
		                },
	                    axisLabel:{
		                	show:false
		                }
                    }
                ],
                yAxis : [
                    {
                        type : 'value',
                        boundaryGap:[0,0.2],
                        axisLabel : {
			                formatter: '{value}万'
			            }
                    }
                ],
                series : [
                    {
                        "name":"成交量(万)",
                        "type":"bar",
                        "data":[],
			            itemStyle:{
			            	normal:{
			            		color:"#1bb2d8",
			            		barBorderRadius:0
			            	}
			            },
			            symbol:"none"
                    }
                ]
           	};
           	//周线柱形图
           	var barOptionWeek = {
                tooltip: {
                    show: true,
                    trigger: 'axis',
                    formatter: function (params) {
			        	var res = params[0].name + '<br/>' ;
			        	res += params[0].seriesName +"："+ getFloatStr(params[0].value);
			            return res;
			        }
                },
                legend: {
                    data:[]
                },
                grid: {
                	borderWidth:0,
			        x: 80,
			        y:10,
			        x2:80,
			        y2:40
			    },
                calculable : true,
                xAxis : [
                    {
                        type : 'category',
                        data : [],
                        axisTick:{
		                	show:false
		                },
	                    axisLabel:{
		                	show:false
		                }
                    }
                ],
                yAxis : [
                    {
                        type : 'value',
                        boundaryGap:[0,0.2],
                        axisLabel : {
			                formatter: '{value}万'
			            }
                    }
                ],
                series : [
                    {
                        "name":"成交量(万)",
                        "type":"bar",
                        "data":[],
			            itemStyle:{
			            	normal:{
			            		color:"#1bb2d8",
			            		barBorderRadius:0
			            	}
			            },
			            symbol:"none"
                    }
                ]
           	};
           	//月线柱形图
           	var barOptionMonth = {
                tooltip: {
                    show: true,
                    trigger: 'axis',
                    formatter: function (params) {
			        	var res = params[0].name + '<br/>' ;
			        	res += params[0].seriesName +"："+ getFloatStr(params[0].value);
			            return res;
			        }
                },
                legend: {
                    data:[]
                },
                grid: {
                	borderWidth:0,
			        x: 80,
			        y:10,
			        x2:80,
			        y2:40
			    },
                calculable : true,
                xAxis : [
                    {
                        type : 'category',
                        data : [],
                        axisTick:{
		                	show:false
		                },
	                    axisLabel:{
		                	show:false
		                }
                    }
                ],
                yAxis : [
                    {
                        type : 'value',
                        boundaryGap:[0,0.2],
                        axisLabel : {
			                formatter: '{value}万'
			            }
                    }
                ],
                series : [
                    {
                        "name":"成交量(万)",
                        "type":"bar",
                        "data":[],
			            itemStyle:{
			            	normal:{
			            		barBorderRadius:0,
			            		color:"#1bb2d8"
			            	}
			            },
			            symbol:"none"
                    }
                ]
           	};
           	//季线柱形图
           	var barOptionQuarter = {
                tooltip: {
                    show: true,
                    trigger: 'axis',
                    formatter: function (params) {
			        	var res = params[0].name + '<br/>' ;
			        	res += params[0].seriesName +"："+ getFloatStr(params[0].value);
			            return res;
			        }
                },
                legend: {
                    data:[]
                },
                grid: {
                	borderWidth:0,
			        x: 80,
			        y:10,
			        x2:80,
			        y2:40
			    },
                calculable : true,
                xAxis : [
                    {
                        type : 'category',
                        data :[],
                        axisTick:{
		                	show:false
		                },
	                    axisLabel:{
		                	show:false
		                }
                    }
                ],
                yAxis : [
                    {
                        type : 'value',
                        boundaryGap:[0,0.2],
                        axisLabel : {
			                formatter: '{value}万'
			            }
                    }
                ],
                series : [
                    {
                        "name":"成交量(万)",
                        "type":"bar",
                        "data":[],
			            itemStyle:{
			            	normal:{
			            		barBorderRadius:0,
			            		color:"#1bb2d8"
			            	}
			            },
			            symbol:"none"
                    }
                ]
           	};
            //日线图
            var dayOption = {
			    title : {
			        text: ''
			    },
			    tooltip : {
			        trigger: 'axis',
			        formatter: function (params) {
			        	var dataIndex = params[0].dataIndex
			            var res = params[0].name + '<br/>' + params[0].seriesName;
			            var allPrice = '';
			            for (var i=0;i<dayLast.length;i++) {
			            	if(i == dataIndex){
			            		allPrice = dayLast[i];
			            	}
			            }
			            res += '<br/>  开盘 : ' + getFloatStr(params[0].value[0]) + '  最高 : ' + getFloatStr(params[0].value[3]);
			            res += '<br/>  收盘 : ' + getFloatStr(params[0].value[1]) + '  最低 : ' + getFloatStr(params[0].value[2]);
			            res += '<br/>  成交金额(万) : ' + getFloatStr(allPrice);
			            return res;
			        }
			    },
			    grid:{
			    	x: 80,
			        y: 40,
			        x2:80,
			        y2:30
			    },
			    legend: {
			        orient : 'horizontal',
			        x : 'center',
			        data:['5日均线','10日均线','20日均线','60日均线']
			    },
			    /*dataZoom : {
			        show : true,
			        realtime: true,
			        start : 50,
			        end : 100
			    },*/
			    xAxis : [
			        {
			            type : 'category',
			            boundaryGap : true,
			            axisTick: {onGap:false},
			            splitLine: {show:false},
			            data : []
			        }
			    ],
			    yAxis : [
			        {
			            type : 'value',
			            scale:true,
			            axisLabel:{
			            	formatter:function(value){
			            		if(Number(value) == 0){
			            			var value = 0;
			            		}else{
			            			var value = getFloatStr(value);
			            		}
			            		return value;
			            	}
			            },
			            boundaryGap: [0.01, 0.01]
			        }
			    ],
			    series : [
			        {
			            name:'',
			            type:'k',
			            data:[]
			        },
			        {
			            name:'5日均线',
			            type:'line',
			            data:[],
			            itemStyle:{
			            	normal:{
			            		lineStyle:{
			            			width:1
			            		}
			            	}
			            },
			            symbol:"none"
			        },
			        {
			            name:'10日均线',
			            type:'line',
			            data:[],
			            itemStyle:{
			            	normal:{
			            		lineStyle:{
			            			width:1
			            		}
			            	}
			            },
			            symbol:"none"
			        },
			        {
			            name:'20日均线',
			            type:'line',
			            data:[],
			            itemStyle:{
			            	normal:{
			            		lineStyle:{
			            			width:1
			            		}
			            	}
			            },
			            symbol:"none"
			        },
			        {
			            name:'60日均线',
			            type:'line',
			            data:[],
			            itemStyle:{
			            	normal:{
			            		lineStyle:{
			            			width:1
			            		}
			            	}
			            },
			            symbol:"none"
			        }
			    ]
		    };
            //周线图
            var weekOption = {
            	
			    title : {
			        text: ''
			    },
			    tooltip : {
			        trigger: 'axis',
			        formatter: function (params) {
			        	var dataIndex = params[0].dataIndex
			            var res = params[0].name + '<br/>' + params[0].seriesName;
			            var allPrice = '';
			            for (var i=0;i<weekLast.length;i++) {
			            	if(i == dataIndex){
			            		allPrice = weekLast[i];
			            	}
			            }
			            res += '<br/>  开盘 : ' + getFloatStr(params[0].value[0]) + '  最高 : ' + getFloatStr(params[0].value[3]);
			            res += '<br/>  收盘 : ' + getFloatStr(params[0].value[1]) + '  最低 : ' + getFloatStr(params[0].value[2]);
			            res += '<br/>  成交金额(万) : ' + getFloatStr(allPrice);
			            return res;
			        }
			    },
			    grid:{
			    	x: 80,
			        y: 40,
			        x2:80,
			        y2:30
			    },
			    legend: {
			        data:['最新价'],
			        orient : 'horizontal',
			        x : 'center',
			        data:['5周均线','10周均线','20周均线','60周均线']
			    },
			    /*dataZoom : {
			        show : true,
			        realtime: true,
			        start : 50,
			        end : 100
			    },*/
			    xAxis : [
			        {
			            type : 'category',
			            boundaryGap : true,
			            axisTick: {onGap:false},
			            splitLine: {show:false},
			            data : []
			        }
			    ],
			    yAxis : [
			        {
			            type : 'value',
			            scale:true,
			            axisLabel:{
			            	formatter:function(value){
			            		if(Number(value) == 0){
			            			var value = 0;
			            		}else{
			            			var value = getFloatStr(value);
			            		}
			            		return value;
			            	}
			            },
			            boundaryGap: [0.01, 0.05]
			        }
			    ],
			    series : [
			        {
			            name:'',
			            type:'k',
			            data:[]
			        },
			        {
			            name:'5周均线',
			            type:'line',
			            data:[],
			            itemStyle:{
			            	normal:{
			            		lineStyle:{
			            			width:1
			            		}
			            	}
			            },
			            symbol:"none"
			        },
			        {
			            name:'10周均线',
			            type:'line',
			            data:[],
			            itemStyle:{
			            	normal:{
			            		lineStyle:{
			            			width:1
			            		}
			            	}
			            },
			            symbol:"none"
			        },
			        {
			            name:'20周均线',
			            type:'line',
			            data:[],
			            itemStyle:{
			            	normal:{
			            		lineStyle:{
			            			width:1
			            		}
			            	}
			            },
			            symbol:"none"
			        },
			        {
			            name:'60周均线',
			            type:'line',
			            data:[],
			            itemStyle:{
			            	normal:{
			            		lineStyle:{
			            			width:1
			            		}
			            	}
			            },
			            symbol:"none"
			        }
			    ]
		    
            };
            //月线图
            var monthOption = {
			    title : {
			        text: ''
			    },
			    tooltip : {
			        trigger: 'axis',
			        formatter: function (params) {
			        	var dataIndex = params[0].dataIndex
			            var res = params[0].name + '<br/>' + params[0].seriesName;
			            var allPrice = '';
			            for (var i=0;i<monthLast.length;i++) {
			            	if(i == dataIndex){
			            		allPrice = monthLast[i];
			            	}
			            }
			            res += '<br/>  开盘 : ' + getFloatStr(params[0].value[0]) + '  最高 : ' + getFloatStr(params[0].value[3]);
			            res += '<br/>  收盘 : ' + getFloatStr(params[0].value[1]) + '  最低 : ' + getFloatStr(params[0].value[2]);
			            res += '<br/>  成交金额(万) : ' + allPrice;
			            return res;
			        }
			    },
			    grid:{
			    	x: 80,
			        y: 40,
			        x2:80,
			        y2:30
			    },
			    legend: {
			        data:['最新价'],
			        orient : 'horizontal',
			        x : 'center',
			        data:['5月均线','10月均线','20月均线','60月均线']
			    },
			    /*dataZoom : {
			        show : true,
			        realtime: true,
			        start : 50,
			        end : 100
			    },*/
			    xAxis : [
			        {
			            type : 'category',
			            boundaryGap : true,
			            axisTick: {onGap:false},
			            splitLine: {show:false},
			            data : []
			        }
			    ],
			    yAxis : [
			        {
			            type : 'value',
			            scale:true,
			            axisLabel:{
			            	formatter:function(value){
			            		if(Number(value) == 0){
			            			var value = 0;
			            		}else{
			            			var value = getFloatStr(value);
			            		}
			            		return value;
			            	}
			            },
			            boundaryGap: [0.01, 0.01]
			        }
			    ],
			    series : [
			        {
			            name:'',
			            type:'k',
			            data:[]
			        },
			        {
			            name:'5月均线',
			            type:'line',
			            data:[],
			            itemStyle:{
			            	normal:{
			            		lineStyle:{
			            			width:1
			            		}
			            	}
			            },
			            symbol:"none"
			        },
			        {
			            name:'10月均线',
			            type:'line',
			            data:[],
			            itemStyle:{
			            	normal:{
			            		lineStyle:{
			            			width:1
			            		}
			            	}
			            },
			            symbol:"none"
			        },
			        {
			            name:'20月均线',
			            type:'line',
			            data:[],
			            itemStyle:{
			            	normal:{
			            		lineStyle:{
			            			width:1
			            		}
			            	}
			            },
			            symbol:"none"
			        },
			        {
			            name:'60月均线',
			            type:'line',
			            data:[],
			            itemStyle:{
			            	normal:{
			            		lineStyle:{
			            			width:1
			            		}
			            	}
			            },
			            symbol:"none"
			        }
			    ]
		    
           
            }
            //季线图
            var quarterOption = {
            	
			    title : {
			        text: ''
			    },
			    tooltip : {
			        trigger: 'axis',
			        formatter: function (params) {
			        	var dataIndex = params[0].dataIndex
			            var res = params[0].name + '<br/>' + params[0].seriesName;
			            var allPrice = '';
			            for (var i=0;i<quarterLast.length;i++) {
			            	if(i == dataIndex){
			            		allPrice = quarterLast[i];
			            	}
			            }
			            res += '<br/>  开盘 : ' + getFloatStr(params[0].value[0]) + '  最高 : ' + getFloatStr(params[0].value[3]);
			            res += '<br/>  收盘 : ' + getFloatStr(params[0].value[1]) + '  最低 : ' + getFloatStr(params[0].value[2]);
			            res += '<br/>  成交金额(万) : ' + getFloatStr(allPrice);
			            return res;
			        }
			    },
			    grid:{
			    	x: 80,
			        y: 40,
			        x2:80,
			        y2:30
			    },
			    legend: {
			       data:['最新价'],
			       orient : 'horizontal',
			       x : 'center',
			       data:['5季均线','10季均线','20季均线','60季均线']
			    },
			    /*dataZoom : {
			        show : true,
			        realtime: true,
			        start : 50,
			        end : 100
			    },*/
			    xAxis : [
			        {
			            type : 'category',
			            boundaryGap : true,
			            axisTick: {onGap:false},
			            splitLine: {show:false},
			            data : []
			        }
			    ],
			    yAxis : [
			        {
			            type : 'value',
			            scale:true,
			            axisLabel:{
			            	formatter:function(value){
			            		if(Number(value) == 0){
			            			var value = 0;
			            		}else{
			            			var value = getFloatStr(value);
			            		}
			            		return value;
			            	}
			            },
			            boundaryGap: [0.01, 0.01]
			        }
			    ],
			    series : [
			        {
			            name:'',
			            type:'k',
			            data:[]
			        },
			        {
			            name:'5季均线',
			            type:'line',
			            data:[],
			            itemStyle:{
			            	normal:{
			            		lineStyle:{
			            			width:1
			            		}
			            	}
			            },
			            symbol:"none"
			        },
			        {
			            name:'10季均线',
			            type:'line',
			            data:[],
			            itemStyle:{
			            	normal:{
			            		lineStyle:{
			            			width:1
			            		}
			            	}
			            },
			            symbol:"none"
			        },
			        {
			            name:'20季均线',
			            type:'line',
			            data:[],
			            itemStyle:{
			            	normal:{
			            		lineStyle:{
			            			width:1
			            		}
			            	}
			            },
			            symbol:"none"
			        },
			        {
			            name:'60季均线',
			            type:'line',
			            data:[],
			            itemStyle:{
			            	normal:{
			            		lineStyle:{
			            			width:1
			            		}
			            	}
			            },
			            symbol:"none"
			        }
			    ]
           
            
           };
            
            
            //行情
            var arrLength = '';
			var stompClient = null;
			var dayLast = [];//日k线图成交金额
			var weekLast = [];//周k线图成交金额
			var monthLast = [];//月k线图成交金额
			var quarterLast = [];//季k线图成交金额
			var companyCode = "";//公司code
			var companyName = "";//公司简称
			var listMode = "";
			var _flg = true;
			var _pageNum = 0;
			var yesTdayNum = '';
		    var id = Query.getHash("id");
	        var _url = $.kf.GETCOMPANYINFO + "?" + "id=" + id;
	        /*if(isNullOrEmpty(sessionStorage.getItem("uuid"))){
				var uuid = "";
			}else{
				var uuid = sessionStorage.getItem("uuid");
			}*/
			
			if(isNullOrEmpty($.cookie("uuid"))){
				var uuid = "";
			}else{
				var uuid = $.cookie("uuid");
			}
			
	        $.kf.ajax({
	            type: "get",
	            url: _url,
	            data: "",
	            dataType: "json",
	            processResponse: function (data) {
	                var obj = data.data;
	                companyCode = obj.code;//公司code
				    companyName = obj.shortname;//公司简称
				    listMode = obj.mode;//做市或集合竞价
				    awaysConnect();//默认加载实时行情
				    $("#allMoney").text(obj.totalStockEquity);//总股本
	       			$("#pastMoney").text(obj.circulatingCapital);//流通股本
	            }
	        });
			
			//实时行情
			function awaysConnect(){
				$(".historyDetail").find("a").attr({"href": $.url.historyQuotes() + "companyCode=" + companyCode});
				$(".historyDetail").find("a").on("click",function(){
					//$(this).
				});
				//上送参数公司id和简称
				var header = {
					"companyCode":companyCode,
					"companyName":companyName,
					"uuid":uuid
				};
				var socket = new SockJS($.kf.ANWEBSOCKET);
				//var socket = new SockJS('http://101.201.116.42:8080/kf-web-mq/kf-websocket');
		        stompClient = Stomp.over(socket);
		       // console.log(header);
			    stompClient.connect(header, function (frame) { 
			    	//console.log(123+frame);
			    	//stompClient.send($.kf.ANWEBSOCKET,uuParam,"hello");
			    	//长连接之后开始点击事件
			    	$(".canvas-list").find("li").on("click",function(){
						var _ind = $(this).index();
						$(this).addClass("active");
						$(this).siblings().removeClass("active");
						$(".canvas-most-wrap").find(".canvas-most").eq(_ind).show();
						$(".canvas-most-wrap").find(".canvas-most").eq(_ind).siblings().hide();
						if(_ind == 0){
							//实时行情
						}else if(_ind == 1){
							dayConnect();//日线
						}else if(_ind == 2){
							weekConnect();//周线
						}else if(_ind == 3){
							monthConnect();//月线
						}else if(_ind == 4){
							quarterConnect();//季线
						};
					});
					
			        //获取此刻之前所有的数据
			        stompClient.subscribe('/app/stock/sharingchat.init.'+companyCode, function (stockdata) { 
		        	 	var socketNum =  JSON.parse(JSON.parse(stockdata.body).content);
		        	 	var priceArrTime = [];
		        	 	if(isNullOrEmpty(socketNum)){
		        	 		//canvasNoData($(".canvas-most01"));
		        	 		option.series[0].data = ["-"];
			        	 	barOption.series[0].data = [0,0,0,0];//画echart
			        	 	sellChart.setOption(option);
			        	 	barChart.setOption(barOption);//实例化chart
			        	 	sellChart.connect([barChart]);//chart相互关联
							barChart.connect([sellChart]);
		        	 	}else{
			        	 	for(var i=0;i<socketNum.price.length;i++){
			        	 		priceArrTime.push(getFloatStr(socketNum.price[i]));
			        	 	}
			        	 	option.series[0].data = priceArrTime;
			        	 	barOption.series[0].data = socketNum.volumn;//画echart
			        	 	sellChart.setOption(option);
			        	 	barChart.setOption(barOption);//实例化chart
			        	 	sellChart.connect([barChart]);//chart相互关联
							barChart.connect([sellChart]);
							
		        	 	}
		        	 	
		        	});  
		        	//获取平均值
			        stompClient.subscribe('/app/stock/sharingchatavarage.init.'+companyCode, function (stockdata) { 
		        	 	var socketNum =  JSON.parse(JSON.parse(stockdata.body).content);
		        	 	if(!isNullOrEmpty(socketNum)){
		        	 		socketNum.price.unshift(socketNum.previous_price);
		        	 		option.series[1].data = socketNum.price;
		        	 		sellChart.setOption(option);
		        	 	}
		        	}); 
			        //10s一次循环   获取此刻之前所有的数据
			      	stompClient.subscribe('/stock/sharingchat.'+companyCode, function (stockdata) { 
		        	 	var socketNum =  JSON.parse(JSON.parse(stockdata.body).content);
		        	 	if(!isNullOrEmpty(socketNum)){
			        	 	var priceArrTime = [];
			        	 	for(var i=0;i<socketNum.price.length;i++){
			        	 		priceArrTime.push(getFloatStr(socketNum.price[i]));
			        	 	}
			        	 	option.series[0].data = priceArrTime;
			        	 	barOption.series[0].data = socketNum.volumn;
			        	 	sellChart.setOption(option);
			        	 	barChart.setOption(barOption);
			        	 	sellChart.connect([barChart]);
							barChart.connect([sellChart]);
		        	 	}else{
		        	 		//canvasNoData($(".canvas-most01"));
		        	 		option.series[0].data = ["-"];
			        	 	barOption.series[0].data = [0,0,0,0];//画echart
			        	 	sellChart.setOption(option);
			        	 	barChart.setOption(barOption);
			        	 	sellChart.connect([barChart]);
							barChart.connect([sellChart]);
		        	 	}
		        	 	
		        	});
		        	//获取平均值12S循环
			        stompClient.subscribe('/stock/sharingchatavarage.'+companyCode, function (stockdata) { 
		        	 	var socketNum =  JSON.parse(JSON.parse(stockdata.body).content);
		        	 	if(!isNullOrEmpty(socketNum)){
		        	 		socketNum.price.unshift(socketNum.previous_price);
		        	 		option.series[1].data = socketNum.price;
		        	 		sellChart.setOption(option);
		        	 	}
		        	});
		        	//获取右边表格数据
		        	stompClient.subscribe('/app/stock/quotation.init.'+companyCode, function (stockdata) { 
		        		var socketNum =  JSON.parse(JSON.parse(stockdata.body).content);
		        		if(!isNullOrEmpty(socketNum)){
		        			yesTdayNum = Number(getFloatStr(socketNum.previous_price));
		        			//刻画Y轴刻度
		        			var yRight01 = '';
		        			var yRight02 = '';
		        			var yRight03 = '';
		        			var yLeft01 = '';
		        			var yLeft02 = '';
			        	 	if(Number(socketNum.max_price) > 0){//最高价大于0
			        	 		yRight01 = Math.abs(socketNum.max_price-socketNum.previous_price)/socketNum.previous_price;//（最高-昨收)/昨收
			        	 		yRight02 = Math.abs(socketNum.min_price-socketNum.previous_price)/socketNum.previous_price;//（最低-昨收)/昨收
			        	 		yRight03 = Math.max(yRight01,yRight02)*1.2+0.001;//取最大值,作为右边轴的中间值
			        	 		yLeft01 = socketNum.previous_price*(yRight03+1);//左边轴最大值
			        	 		yLeft02 = socketNum.previous_price*(1-yRight03);//左边轴最小值
			        	 	}else{//最高价等于0或者没有最高价
			        	 		yLeft01 = socketNum.previous_price*1.1;//左边轴最大值
			        	 		yLeft02 = socketNum.previous_price*0.9;//左边轴最小值
			        	 		yRight03 = 0.10;//默认右边轴中间值
			        	 	}
			        	 	option.yAxis[0].max = Number(yLeft01);//左边轴赋值最大值
			        	 	if(Number(yLeft02) < 0){//计算左边轴 最小值小于0的时候  等于0
			        	 		option.yAxis[0].min = 0;
			        	 	}else{
			        	 		option.yAxis[0].min = Number(yLeft02);//左边轴赋值最小值
			        	 	}
			        	 	
			        	 	if(Number(yLeft02) == 0 && Number(yLeft01) == 0){//左边轴没有最大最小值的时候  右边轴同理
			        	 		option.yAxis[1].max = 0;
			        	 		option.yAxis[1].min = 0;
			        	 	}else{
			        	 		option.yAxis[1].max = Number(yRight03*100);//右边轴最大值
			        	 		option.yAxis[1].min = Number(-yRight03*100);//右边轴 最小值
			        	 	}
			        	 	
			        	 	//option.series[0].markLine.data[0] = [{name: '', value: "", xAxis: -1, yAxis: socketNum.previous_price},{name: '', xAxis: '15:00', yAxis: socketNum.previous_price}];
			        	 	sellChart.setOption(option);
				      		socketNumFun(socketNum);//实时买卖
			        	 	socketPrice(socketNum);//实时最新平均价钱
		        		}else{
		        			option.yAxis[1].max = 0;
		        	 		option.yAxis[1].min = 0;
		        	 		option.yAxis[0].max = 0;
		        	 		option.yAxis[0].min = 0;
		        			var socketNum = {
		        				"deal_sum_str":"--",
		        				"trans_rate":"--",
		        				"up_down_rate_close":"--",
		        				"current_price":"--",
		        				"sell_volumn_4":"--",
		        				"sell_volumn_5":"--",
		        				"sell_volumn_2":"--",
		        				"sell_volumn_3":"--",
		        				"sell_volumn_1":"--",
		        				"avarage_price":"--",
		        				"sell_price_5":"--",
		        				"sell_price_4":"--",
		        				"sell_price_3":"--",
		        				"sell_price_2":"--",
		        				"sell_price_1":"--",
		        				"deal_sum":"--",
		        				"min_price":"--",
		        				"previous_price":"--",
		        				"open_price":"--",
		        				"deal_volumn":"--",
		        				"buy_volumn_3":"--",
		        				"buy_volumn_2":"--",
		        				"buy_volumn_1":"--",
		        				"buy_volumn_5":"--",
		        				"buy_volumn_4":"--",
		        				"pe_rate":"--",
		        				"up_down_last":"--",
		        				"up_down_close":"--",
		        				"buy_price_1":"--",
		        				"buy_price_4":"--",
		        				"buy_price_5":"--",
		        				"deal_volumn_str":"--",
		        				"max_price":"--",
		        				"buy_price_2":"--",
		        				"buy_price_3":"--"
		        			};
		        			socketNumFun(socketNum);//实时买卖
			        	 	socketPrice(socketNum);//实时最新平均价钱
		        		}
		        	});  
			        //10s循环一次   获取右边表格数据
			      	stompClient.subscribe('/stock/quotation.'+companyCode, function (stockdata) { 
			      		var socketNum =  JSON.parse(JSON.parse(stockdata.body).content);
			      		if(!isNullOrEmpty(socketNum)){
			      			//刻画Y轴刻度
		        			var yRight01 = '';
		        			var yRight02 = '';
		        			var yRight03 = '';
		        			var yLeft01 = '';
		        			var yLeft02 = '';
			        	 	if(Number(socketNum.max_price) > 0){
			        	 		yRight01 = Math.abs(socketNum.max_price-socketNum.previous_price)/socketNum.previous_price;
			        	 		yRight02 = Math.abs(socketNum.min_price-socketNum.previous_price)/socketNum.previous_price;
			        	 		yRight03 = Math.max(yRight01,yRight02)*1.2+0.001;
			        	 		yLeft01 = socketNum.previous_price*(yRight03+1);
			        	 		yLeft02 = socketNum.previous_price*(1-yRight03);
			        	 	}else{
			        	 		yLeft01 = socketNum.previous_price*1.1;
			        	 		yLeft02 = socketNum.previous_price*0.9;
			        	 		yRight03 = 0.10;
			        	 	}
			        	 	option.yAxis[0].max = Number(yLeft01);
			        	 	if(Number(yLeft02) < 0){
			        	 		option.yAxis[0].min = 0;
			        	 	}else{
			        	 		option.yAxis[0].min = Number(yLeft02);
			        	 	}
			        	 	
			        	 	if(Number(yLeft02) == 0 && Number(yLeft01) == 0){
			        	 		option.yAxis[1].max = 0;
			        	 		option.yAxis[1].min = 0;
			        	 	}else{
			        	 		option.yAxis[1].max = Number(yRight03*100);
			        	 		option.yAxis[1].min = Number(-yRight03*100);
			        	 	}
			        	 	//option.series[0].markLine.data[0] = [{name: '平均值', value: "", xAxis: -1, yAxis: socketNum.avarage_price},{name: '', xAxis: '15:00', yAxis: socketNum.avarage_price}];
			        	 	sellChart.setOption(option);
			        	 	socketNumFun(socketNum);
			        	 	socketPrice(socketNum);
			      		}else{
			      			option.yAxis[1].max = 0;
		        	 		option.yAxis[1].min = 0;
		        	 		option.yAxis[0].max = 0;
		        	 		option.yAxis[0].min = 0;
			      			var socketNum = {
		        				"deal_sum_str":"--",
		        				"trans_rate":"--",
		        				"up_down_rate_close":"--",
		        				"current_price":"--",
		        				"sell_volumn_4":"--",
		        				"sell_volumn_5":"--",
		        				"sell_volumn_2":"--",
		        				"sell_volumn_3":"--",
		        				"sell_volumn_1":"--",
		        				"avarage_price":"--",
		        				"sell_price_5":"--",
		        				"sell_price_4":"--",
		        				"sell_price_3":"--",
		        				"sell_price_2":"--",
		        				"sell_price_1":"--",
		        				"deal_sum":"--",
		        				"min_price":"--",
		        				"previous_price":"--",
		        				"open_price":"--",
		        				"deal_volumn":"--",
		        				"buy_volumn_3":"--",
		        				"buy_volumn_2":"--",
		        				"buy_volumn_1":"--",
		        				"buy_volumn_5":"--",
		        				"buy_volumn_4":"--",
		        				"pe_rate":"--",
		        				"up_down_last":"--",
		        				"up_down_close":"--",
		        				"buy_price_1":"--",
		        				"buy_price_4":"--",
		        				"buy_price_5":"--",
		        				"deal_volumn_str":"--",
		        				"max_price":"--",
		        				"buy_price_2":"--",
		        				"buy_price_3":"--"
		        			};
		        			socketNumFun(socketNum);//实时买卖
			        	 	socketPrice(socketNum);//实时最新平均价钱
			      		};
			      		
		        	});
		        	if(listMode == "集合竞价"){
		        		//当日统计表格
				      	stompClient.subscribe('/app/stock/agreetransstat.init.'+companyCode, function (stockdata) {
				      		var socketNum =  JSON.parse(JSON.parse(stockdata.body).content);
				      		if(!isNullOrEmpty(socketNum)){
				      			if(socketNum.buy_ava_price == 0){
				      				$("#buyPrice").text("--");
				      			}else{
			      					$("#buyPrice").text(socketNum.buy_ava_price);
				      			}
			      				$("#buyGu").text(socketNum.buy_volumn);
			      				$("#buyBi").text(socketNum.buy_number);
			      				if(socketNum.buy_max_price == 0){
			      					$("#buyTop").text("--");
			      				}else{
			      					$("#buyTop").text(socketNum.buy_max_price);
			      				}
			      				if(socketNum.buy_min_price == 0){
			      					$("#buyBottom").text("--");
			      				}else{
			      					$("#buyBottom").text(socketNum.buy_min_price);
			      				}
			      				if(socketNum.sell_ava_price == 0){
			      					$("#sellPrice").text("--");
			      				}else{
			      					$("#sellPrice").text(socketNum.sell_ava_price);
			      				}
			      				
			      				$("#sellGu").text(socketNum.sell_volumn);
			      				$("#sellBi").text(socketNum.sell_number);
			      				if(socketNum.sell_max_price == 0){
			      					$("#sellTop").text("--");
			      				}else{
			      					$("#sellTop").text(socketNum.sell_max_price);
			      				}
			      				if(socketNum.sell_min_price == 0){
			      					$("#sellBottom").text("--");
			      				}else{
			      					$("#sellBottom").text(socketNum.sell_min_price);
			      				}
			      				
				      		}else{
				      			//funNoData($(".canvasTop02"));
				      			socketNum = {
				      				buy_ava_price:'',
				      				buy_volumn:'',
				      				buy_number:'',
				      				buy_max_price:'',
				      				buy_min_price:'',
				      				sell_ava_price:'',
				      				sell_volumn:'',
				      				sell_ava_price:'',
				      				sell_ava_price:'',
				      				sell_ava_price:'',
				      			}
			      				$("#buyPrice").text("--");
			      				$("#buyGu").text("--");
			      				$("#buyBi").text("--");
			      				$("#buyTop").text("--");
			      				$("#buyBottom").text("--");
			      				$("#sellPrice").text("--");
			      				$("#sellGu").text("--");
			      				$("#sellBi").text("--");
			      				$("#sellTop").text("--");
			      				$("#sellBottom").text("--");
				      		}
				      		
			        	});
			        	//12s循环当日统计
				      	stompClient.subscribe('/stock/agreetransstat.'+companyCode, function (stockdata) {
				      		var socketNum =  JSON.parse(JSON.parse(stockdata.body).content);
				      		if(!isNullOrEmpty(socketNum)){
				      			$("#buyPrice").text(socketNum.buy_ava_price);
			      				$("#buyGu").text(socketNum.buy_volumn);
			      				$("#buyBi").text(socketNum.buy_number);
			      				$("#buyTop").text(socketNum.buy_max_price);
			      				$("#buyBottom").text(socketNum.buy_min_price);
			      				$("#sellPrice").text(socketNum.sell_ava_price);
			      				$("#sellGu").text(socketNum.sell_volumn);
			      				$("#sellBi").text(socketNum.sell_number);
			      				$("#sellTop").text(socketNum.sell_max_price);
			      				$("#sellBottom").text(socketNum.sell_min_price);
				      		}/*else{
				      			funNoData($(".canvasTop02"));
				      		}*/
				      		
			        	});
			        	//报价明细
				        stompClient.subscribe('/app/stock/agreetransreal.init.'+companyCode,function (stockdata) {
				      		var socketNum =  JSON.parse(JSON.parse(stockdata.body).content);
				      		if(!isNullOrEmpty(socketNum)){
				      			$("#tableOne_1").removeClass("tableOnePayDetail");
				      			sellAndBuy(socketNum);
				      		}/*else{
				      			$("#tableOne_1").addClass("tableOnePayDetail");
				      			canvasNoData($("#sellAndBuy"));
				      		}*/
				      		
				      	});
				      	//报价明细12s循环
				      	stompClient.subscribe('/stock/agreetransreal.'+companyCode,function (stockdata) {
				      		var socketNum =  JSON.parse(JSON.parse(stockdata.body).content);
				      		if(!isNullOrEmpty(socketNum)){
				      			$("#tableOne_1").removeClass("tableOnePayDetail");
				      			if(_flg){
					      			sellAndBuy(socketNum);
					      		}
				      		}/*else{
				      			$("#tableOne_1").addClass("tableOnePayDetail");
				      			canvasNoData($("#sellAndBuy"));
				      		}*/
				      		
				      	});
		        	}
		        	
		        });
			};
			
			function sellAndBuy(socketNum){
	      		var arrMoneyDetail = [];
	      		var arrMoneyDetails = [];
	      		if(!isNullOrEmpty(socketNum.sell)){
	      			var sellList = socketNum.sell;
	      		}else{
	      			var sellList = [{
		      				"number":"--",
		      				"price":"--",
		      				"time":"--",
		      				"unit":"--",
		      				"volumn":"--"
		      			}];
	      		}
	      		if(!isNullOrEmpty(socketNum.buy)){
	      			var buyList = socketNum.buy;
	      		}else{
	      			var buyList = [{
		      				"number":"--",
		      				"price":"--",
		      				"time":"--",
		      				"unit":"--",
		      				"volumn":"--"
		      			}];
	      		}
	      		var objMoneyDetail = {
	      			"sellNumber":"",
	      			"sellPrice":"",
	      			"sellTime":"",
	      			"sellUnit":"",
	      			"sellVolume":"",
	      			"buyNumber":"",
	      			"buyPrice":"",
	      			"buyTime":"",
	      			"buyUnit":"",
	      			"buyVolume":""
	      		};
	      		if(sellList.length >= buyList.length){
	      			_pageNum = sellList.length;
	      			var _forIndex = _pageNum-buyList.length;
	      			for (var i=0;i<_forIndex;i++) {
		      			buyList.unshift({
		      				"number":"--",
		      				"price":"--",
		      				"time":"--",
		      				"unit":"--",
		      				"volumn":"--"
		      			});
		      		};
	      		}else{
	      			_pageNum = buyList.length;
	      			var _forIndex = _pageNum-sellList.length;
	      			for (var i=0;i<_forIndex;i++) {
		      			sellList.unshift({
		      				"number":"--",
		      				"price":"--",
		      				"time":"--",
		      				"unit":"--",
		      				"volumn":"--"
		      			});
		      		};
	      		};
	      		for (var i=0;i<_pageNum;i++) {
	      			arrMoneyDetail[i] = objMoneyDetail;
	      		};
	      		for (var i=0;i<_pageNum;i++) {
	      			arrMoneyDetail[i].sellNumber = sellList[i].number;
	      			arrMoneyDetail[i].sellPrice = sellList[i].price;
	      			arrMoneyDetail[i].sellTime = sellList[i].time;
	      			arrMoneyDetail[i].sellUnit = sellList[i].unit;
	      			arrMoneyDetail[i].sellVolume = sellList[i].volumn;
	      			arrMoneyDetail[i].buyNumber = buyList[i].number;
	      			arrMoneyDetail[i].buyPrice = buyList[i].price;
	      			arrMoneyDetail[i].buyTime = buyList[i].time;
	      			arrMoneyDetail[i].buyUnit = buyList[i].unit;
	      			arrMoneyDetail[i].buyVolume = buyList[i].volumn;
					arrMoneyDetails.push(JSON.parse(JSON.stringify(arrMoneyDetail[i])));
	      		}
	      		//$('#tableOne_1').find("tbody").html("");
	      		if(typeof(wageSummaryTable) == "undefined"){
	      			var table = $('#tableOne_1');
		      		wageSummaryTable = table.dataTable({
						data:arrMoneyDetails,
						//bSort:false,
						aLengthMenu:[10],
						aaSorting: [[ 4, "desc" ],[ 9, "desc" ]],//默认排序
						columns: [
							{ data: 'buyPrice' },
							{ data: 'buyVolume' },
							{ data: 'buyUnit' },
						    { data: 'buyNumber' },
				            { data: 'buyTime' },
				            { data: 'sellPrice' },
				            { data: 'sellVolume' },
				            { data: 'sellUnit' },
				            { data: 'sellNumber' },
				            { data: 'sellTime' }
				        ]
				        
			        });
			        $("#tableOne_1_length").find("label").text("");
			        //翻页事件
			        $('#tableOne_1').on('page.dt',function() {
			        	var t = setTimeout(function(){
			        		if(Number($(".pagination").find(".active").text()) == 1){
			        			_flg = true;
			        		}else{
			        			_flg = false;
			        		};
			        	},500);
					}).dataTable();
			        
	      		}else{
	      			//wageSummaryTable.fnClearTable();//清空数据.fnClearTable();//清空数据  
                	wageSummaryTable.fnDestroy(); //还原初始化了的datatable  
                	var table = $('#tableOne_1');
		      		wageSummaryTable = table.dataTable({
						data:arrMoneyDetails,
						//bSort:false,
						aLengthMenu:[10],
						aaSorting: [[ 4, "desc" ],[ 9, "desc" ]],//默认排序
						columns: [
							{ data: 'buyPrice' },
							{ data: 'buyVolume' },
							{ data: 'buyUnit' },
						    { data: 'buyNumber' },
				            { data: 'buyTime' },
				            { data: 'sellPrice' },
				            { data: 'sellVolume' },
				            { data: 'sellUnit' },
				            { data: 'sellNumber' },
				            { data: 'sellTime' }
				        ]
				        
			        });
			        $("#tableOne_1_length").find("label").text("");
			       	//翻页事件
			        $('#tableOne_1').on('page.dt',function() {
			        	var t = setTimeout(function(){
			        		if(Number($(".pagination").find(".active").text()) == 1){
			        			_flg = true;
			        		}else{
			        			_flg = false;
			        		};
			        	},500);
					}).dataTable();
	      		};
			};
			
			//日线图
			function dayConnect(){
				//日线一次性
	        	stompClient.subscribe('/app/stock/klineday.init.'+companyCode, function (stockdata) { 
	        		var socketNum =  JSON.parse(JSON.parse(stockdata.body).content);
	        		if(!isNullOrEmpty(socketNum)){
	        			var priceArr = [];
		            	//k线图只支持数组包含4个值
		            	for (var i=0;i<socketNum.price.length;i++) {
		            		priceArr.push(socketNum.price[i].splice(0,4));//echart规定4个值
		            		dayLast.push(socketNum.price[i].pop());//数组最后的总量
		            	}
		            	/*自适应最大值和最小值*/
		            	var theMin = [];
		            	var theMax = [];
		            	for (var i=0;i<priceArr.length;i++) {
		            		theMin.push(priceArr[i][2]);//最小值数组
		            		theMax.push(priceArr[i][3]);//最大值数组
		            	}
		            	Array.max = function( arr ){ 
							return Math.max.apply( Math, arr );//数组中取最大值
						};
						Array.min = function( arr ){ 
							return Math.min.apply( Math, arr );//数组中取最小值
						};
		            	dayOption.yAxis[0].min = Array.min(theMin)*(0.99);
		            	dayOption.yAxis[0].max = Array.max(theMax)*(1.01);
		            	/*end*/
		        	 	dayOption.xAxis[0].data = socketNum.day;//X轴日期刻度
		        	 	barOptionDay.xAxis[0].data = socketNum.day;
		        	 	dayOption.series[0].data = priceArr;//划线
		        	 	dayOption.series[0].name = companyName;//传入公司简称
		        	 	barOptionDay.series[0].data = socketNum.volumn;
		        	 	dayChart.setOption(dayOption);
		        	 	barChartDay.setOption(barOptionDay);
		        	 	dayChart.connect([barChartDay]);
						barChartDay.connect([dayChart]);
	        		}else{
	        			canvasNoData($(".canvas-most02"));
	        		};
	            	
	        	});
	        	//日线12秒循环
	        	stompClient.subscribe('/stock/klineday.'+companyCode, function (stockdata) { 
	        		var socketNum =  JSON.parse(JSON.parse(stockdata.body).content);
	        		if(!isNullOrEmpty(socketNum)){
	        			var priceArr = [];
		            	//k线图只支持数组包含4个值
		            	for (var i=0;i<socketNum.price.length;i++) {
		            		priceArr.push(socketNum.price[i].splice(0,4));//echart规定4个值
		            		dayLast.push(socketNum.price[i].pop());//数组最后的总量
		            	}
		            	/*自适应最大值和最小值*/
		            	var theMin = [];
		            	var theMax = [];
		            	for (var i=0;i<priceArr.length;i++) {
		            		theMin.push(priceArr[i][2]);
		            		theMax.push(priceArr[i][3]);
		            	}
		            	Array.max = function( arr ){ 
							return Math.max.apply( Math, arr );
						};
						Array.min = function( arr ){ 
							return Math.min.apply( Math, arr );
						};
		            	dayOption.yAxis[0].min = Array.min(theMin)*(0.99);
		            	dayOption.yAxis[0].max = Array.max(theMax)*(1.01);
		            	/*end*/
		        	 	dayOption.xAxis[0].data = socketNum.day;//X轴日期刻度
		        	 	barOptionDay.xAxis[0].data = socketNum.day;
		        	 	dayOption.series[0].data = priceArr;//划线
		        	 	dayOption.series[0].name = companyName;//传入公司简称
		        	 	barOptionDay.series[0].data = socketNum.volumn;
		        	 	dayChart.setOption(dayOption);
		        	 	barChartDay.setOption(barOptionDay);
		        	 	dayChart.connect([barChartDay]);
						barChartDay.connect([dayChart]);
	        		}else{
	        			canvasNoData($(".canvas-most02"));
	        		};
	            	
	        	});
	        	//5天均线
	        	stompClient.subscribe('/app/stock/avarageline5day.init.'+companyCode, function (stockdata) { 
	        		var socketNum =  JSON.parse(JSON.parse(stockdata.body).content);
	        		if(!isNullOrEmpty(socketNum)){
	        			dayOption.series[1].data = socketNum.price;
	        	 		dayChart.setOption(dayOption);
	        		}
	        	 	
	        	});
	        	//10天均线
	        	stompClient.subscribe('/app/stock/avarageline10day.init.'+companyCode, function (stockdata) { 
	        		var socketNum =  JSON.parse(JSON.parse(stockdata.body).content);
	        		if(!isNullOrEmpty(socketNum)){
	        			dayOption.series[2].data = socketNum.price;
	        	 		dayChart.setOption(dayOption);
	        		};
	        	 	
	        	});
	        	//20天均线
	        	stompClient.subscribe('/app/stock/avarageline20day.init.'+companyCode, function (stockdata) { 
	        		var socketNum =  JSON.parse(JSON.parse(stockdata.body).content);
	        		if(!isNullOrEmpty(socketNum)){
	        			dayOption.series[3].data = socketNum.price;
	        	 		dayChart.setOption(dayOption);
	        		}
	        	 	
	        	});
	        	//60天均线
	        	stompClient.subscribe('/app/stock/avarageline60day.init.'+companyCode, function (stockdata) { 
	        		var socketNum =  JSON.parse(JSON.parse(stockdata.body).content);
	        		if(!isNullOrEmpty(socketNum)){
	        			dayOption.series[4].data = socketNum.price;
	        	 		dayChart.setOption(dayOption);
	        		};
	        	 	
	        	});
	        	//5天均线12秒循环
	        	stompClient.subscribe('/stock/avarageline5day.'+companyCode, function (stockdata) { 
	        		var socketNum =  JSON.parse(JSON.parse(stockdata.body).content);
	        		if(!isNullOrEmpty(socketNum)){
	        			dayOption.series[1].data = socketNum.price;
	        	 		dayChart.setOption(dayOption);
	        		};
	        	 	
	        	});
	        	//10天均线12秒循环
	        	stompClient.subscribe('/stock/avarageline10day.'+companyCode, function (stockdata) { 
	        		var socketNum =  JSON.parse(JSON.parse(stockdata.body).content);
	        		if(!isNullOrEmpty(socketNum)){
	        			dayOption.series[2].data = socketNum.price;
	        	 		dayChart.setOption(dayOption);
	        		};
	        	 	
	        	});
	        	//20天均线12秒循环
	        	stompClient.subscribe('/stock/avarageline20day.'+companyCode, function (stockdata) { 
	        		var socketNum =  JSON.parse(JSON.parse(stockdata.body).content);
	        		if(!isNullOrEmpty(socketNum)){
	        			dayOption.series[3].data = socketNum.price;
	        	 		dayChart.setOption(dayOption);
	        		};
	        	 	
	        	});
	        	//60天均线12秒循环
	        	stompClient.subscribe('/stock/avarageline60day.'+companyCode, function (stockdata) { 
	        		var socketNum =  JSON.parse(JSON.parse(stockdata.body).content);
	        		if(!isNullOrEmpty(socketNum)){
	        			dayOption.series[4].data = socketNum.price;
	        	 		dayChart.setOption(dayOption);
	        		};
	        	 	
	        	});
			}
			
			//周线图
			function weekConnect(){
				//周线一次性
				stompClient.subscribe('/app/stock/klineweek.init.'+companyCode, function (stockdata) { 
	        		var socketNum =  JSON.parse(JSON.parse(stockdata.body).content);
	        		if(!isNullOrEmpty(socketNum)){
	        			var weekArr = [];
		            	//k线图只支持数组包含4个值
		            	for (var i=0;i<socketNum.price.length;i++) {
		            		weekArr.push(socketNum.price[i].splice(0,4));
		            		weekLast.push(socketNum.price[i].pop());
		            	}
		            	/*自适应最大值和最小值*/
		            	var theMin = [];
		            	var theMax = [];
		            	for (var i=0;i<weekArr.length;i++) {
		            		theMin.push(weekArr[i][2]);
		            		theMax.push(weekArr[i][3]);
		            	}
		            	Array.max = function( arr ){ 
							return Math.max.apply( Math, arr );
						};
						Array.min = function( arr ){ 
							return Math.min.apply( Math, arr );
						};
		            	weekOption.yAxis[0].min = Array.min(theMin)*(0.99);
		            	weekOption.yAxis[0].max = Array.max(theMax)*(1.01);
		            	/*end*/
		        	 	weekOption.xAxis[0].data = socketNum.day;
		        	 	barOptionWeek.xAxis[0].data = socketNum.day;
		        	 	weekOption.series[0].data = weekArr;
		        	 	weekOption.series[0].name = companyName;//传入公司简称
		        	 	barOptionWeek.series[0].data = socketNum.volumn;
		        	 	weekChart.setOption(weekOption);
		        	 	barChartWeek.setOption(barOptionWeek);
		        	 	weekChart.connect([barChartWeek]);
						barChartWeek.connect([weekChart]);
	        		}else{
	        			canvasNoData($(".canvas-most03"));
	        		};
	        	}); 
	        	//周线12秒循环
				stompClient.subscribe('/stock/klineweek.'+companyCode, function (stockdata) { 
	        		var socketNum =  JSON.parse(JSON.parse(stockdata.body).content);
	        		if(!isNullOrEmpty(socketNum)){
	        			var weekArr = [];
		            	//k线图只支持数组包含4个值
		            	for (var i=0;i<socketNum.price.length;i++) {
		            		weekArr.push(socketNum.price[i].splice(0,4));
		            		weekLast.push(socketNum.price[i].pop());
		            	}
		            	/*自适应最大值和最小值*/
		            	var theMin = [];
		            	var theMax = [];
		            	for (var i=0;i<weekArr.length;i++) {
		            		theMin.push(weekArr[i][2]);
		            		theMax.push(weekArr[i][3]);
		            	}
		            	Array.max = function( arr ){ 
							return Math.max.apply( Math, arr );
						};
						Array.min = function( arr ){ 
							return Math.min.apply( Math, arr );
						};
		            	weekOption.yAxis[0].min = Array.min(theMin)*(0.99);
		            	weekOption.yAxis[0].max = Array.max(theMax)*(1.01);
		            	/*end*/
		        	 	weekOption.xAxis[0].data = socketNum.day;
		        	 	barOptionWeek.xAxis[0].data = socketNum.day;
		        	 	weekOption.series[0].data = weekArr;
		        	 	weekOption.series[0].name = companyName;//传入公司简称
		        	 	barOptionWeek.series[0].data = socketNum.volumn;
		        	 	weekChart.setOption(weekOption);
		        	 	barChartWeek.setOption(barOptionWeek);
		        	 	weekChart.connect([barChartWeek]);
						barChartWeek.connect([weekChart]);
	        		}else{
	        			canvasNoData($(".canvas-most03"));
	        		};
	        	}); 
	        	//5周均线
	        	stompClient.subscribe('/app/stock/avarageline5week.init.'+companyCode, function (stockdata) { 
	        		var socketNum =  JSON.parse(JSON.parse(stockdata.body).content);
	        		if(!isNullOrEmpty(socketNum)){
	        			weekOption.series[1].data = socketNum.price;
	        	 		weekChart.setOption(weekOption);
	        		}
	        	 	
	        	});
	        	//10周均线
	        	stompClient.subscribe('/app/stock/avarageline10week.init.'+companyCode, function (stockdata) { 
	        		var socketNum =  JSON.parse(JSON.parse(stockdata.body).content);
	        		if(!isNullOrEmpty(socketNum)){
	        			weekOption.series[2].data = socketNum.price;
	        	 		weekChart.setOption(weekOption);
	        		}
	        	 	
	        	});
	        	//20周均线
	        	stompClient.subscribe('/app/stock/avarageline20week.init.'+companyCode, function (stockdata) { 
	        		var socketNum =  JSON.parse(JSON.parse(stockdata.body).content);
	        		if(!isNullOrEmpty(socketNum)){
	        			weekOption.series[3].data = socketNum.price;
	        	 		weekChart.setOption(weekOption);
	        		}
	        	 	
	        	});
	        	//60周均线
	        	stompClient.subscribe('/app/stock/avarageline60week.init.'+companyCode, function (stockdata) { 
	        		var socketNum =  JSON.parse(JSON.parse(stockdata.body).content);
	        		if(!isNullOrEmpty(socketNum)){
	        			weekOption.series[4].data = socketNum.price;
	        	 		weekChart.setOption(weekOption);
	        		}
	        	 	
	        	});
	        	//5周均线12秒循环
	        	stompClient.subscribe('/stock/avarageline5week.'+companyCode, function (stockdata) { 
	        		var socketNum =  JSON.parse(JSON.parse(stockdata.body).content);
	        		if(!isNullOrEmpty(socketNum)){
	        			weekOption.series[1].data = socketNum.price;
	        	 		weekChart.setOption(weekOption);
	        		}
	        	 	
	        	});
	        	//10周均线12秒循环
	        	stompClient.subscribe('/stock/avarageline10week.'+companyCode, function (stockdata) { 
	        		var socketNum =  JSON.parse(JSON.parse(stockdata.body).content);
	        		if(!isNullOrEmpty(socketNum)){
	        			weekOption.series[2].data = socketNum.price;
	        	 		weekChart.setOption(weekOption);
	        		}
	        	 	
	        	});
	        	//20周均线12秒循环
	        	stompClient.subscribe('/stock/avarageline20week.'+companyCode, function (stockdata) { 
	        		var socketNum =  JSON.parse(JSON.parse(stockdata.body).content);
	        		if(!isNullOrEmpty(socketNum)){
	        			weekOption.series[3].data = socketNum.price;
	        	 		weekChart.setOption(weekOption);
	        		}
	        	 	
	        	});
	        	//60周均线12秒循环
	        	stompClient.subscribe('/stock/avarageline60week.'+companyCode, function (stockdata) { 
	        		var socketNum =  JSON.parse(JSON.parse(stockdata.body).content);
	        		if(!isNullOrEmpty(socketNum)){
	        			weekOption.series[4].data = socketNum.price;
	        	 		weekChart.setOption(weekOption);
	        		}
	        	 	
	        	});
			};
			//月线图
			function monthConnect(){
				//月线一次性
				stompClient.subscribe('/app/stock/klinemonth.init.'+companyCode, function (stockdata) { 
	        		var socketNum =  JSON.parse(JSON.parse(stockdata.body).content);
	        		if(!isNullOrEmpty(socketNum)){
	        			var monthArr = [];
		            	//k线图只支持数组包含4个值
		            	for (var i=0;i<socketNum.price.length;i++) {
		            		monthArr.push(socketNum.price[i].splice(0,4));
		            		monthLast.push(socketNum.price[i].pop());
		            	}
		            	
		            	/*自适应最大值和最小值*/
		            	var theMin = [];
		            	var theMax = [];
		            	for (var i=0;i<monthArr.length;i++) {
		            		theMin.push(monthArr[i][2]);
		            		theMax.push(monthArr[i][3]);
		            	}
		            	Array.max = function( arr ){ 
							return Math.max.apply( Math, arr );
						};
						Array.min = function( arr ){ 
							return Math.min.apply( Math, arr );
						};
		            	monthOption.yAxis[0].min = Array.min(theMin)*(0.99);
		            	monthOption.yAxis[0].max = Array.max(theMax)*(1.01);
		            	/*自适应最大值和最小值---end*/
		            	
		        	 	monthOption.xAxis[0].data = socketNum.day;
		        	 	barOptionMonth.xAxis[0].data = socketNum.day;
		        	 	monthOption.series[0].data = monthArr;
		        	 	monthOption.series[0].name = companyName;//传入公司简称
		        	 	barOptionMonth.series[0].data = socketNum.volumn;
		        	 	monthChart.setOption(monthOption);
		        	 	barChartMonth.setOption(barOptionMonth);
		        	 	monthChart.connect([barChartMonth]);
						barChartMonth.connect([monthChart]);
	        		}else{
	        			canvasNoData($(".canvas-most04"));
	        		};
	            	
	        	});
	        	//月线12秒循环
				stompClient.subscribe('/stock/klinemonth.'+companyCode, function (stockdata) { 
	        		var socketNum =  JSON.parse(JSON.parse(stockdata.body).content);
	        		if(!isNullOrEmpty(socketNum)){
	        			var monthArr = [];
		            	//k线图只支持数组包含4个值
		            	for (var i=0;i<socketNum.price.length;i++) {
		            		monthArr.push(socketNum.price[i].splice(0,4));
		            		monthLast.push(socketNum.price[i].pop());
		            	}
		            	/*自适应最大值和最小值*/
		            	var theMin = [];
		            	var theMax = [];
		            	for (var i=0;i<monthArr.length;i++) {
		            		theMin.push(monthArr[i][2]);
		            		theMax.push(monthArr[i][3]);
		            	}
		            	Array.max = function( arr ){ 
							return Math.max.apply( Math, arr );
						};
						Array.min = function( arr ){ 
							return Math.min.apply( Math, arr );
						};
		            	monthOption.yAxis[0].min = Array.min(theMin)*(0.99);
		            	monthOption.yAxis[0].max = Array.max(theMax)*(1.01);
		            	/*自适应最大值和最小值---end*/
		        	 	monthOption.xAxis[0].data = socketNum.day;
		        	 	barOptionMonth.xAxis[0].data = socketNum.day;
		        	 	monthOption.series[0].data = monthArr;
		        	 	monthOption.series[0].name = companyName;//传入公司简称
		        	 	barOptionMonth.series[0].data = socketNum.volumn;
		        	 	monthChart.setOption(monthOption);
		        	 	barChartMonth.setOption(barOptionMonth);
		        	 	monthChart.connect([barChartMonth]);
						barChartMonth.connect([monthChart]);
	        		}else{
	        			canvasNoData($(".canvas-most04"));
	        		};
	            	
	        	});
	        	//5月均线
	        	stompClient.subscribe('/app/stock/avarageline5month.init.'+companyCode, function (stockdata) { 
	        		var socketNum =  JSON.parse(JSON.parse(stockdata.body).content);
	        		if(!isNullOrEmpty(socketNum)){
	        			monthOption.series[1].data = socketNum.price;
	        	 		monthChart.setOption(monthOption);
	        		}
	        	 	
	        	});
	        	//10月均线
	        	stompClient.subscribe('/app/stock/avarageline10month.init.'+companyCode, function (stockdata) { 
	        		var socketNum =  JSON.parse(JSON.parse(stockdata.body).content);
	        		if(!isNullOrEmpty(socketNum)){
	        			monthOption.series[2].data = socketNum.price;
	        	 		monthChart.setOption(monthOption);
	        		}
	        	});
	        	//20月均线
	        	stompClient.subscribe('/app/stock/avarageline20month.init.'+companyCode, function (stockdata) { 
	        		var socketNum =  JSON.parse(JSON.parse(stockdata.body).content);
	        		if(!isNullOrEmpty(socketNum)){
	        			monthOption.series[3].data = socketNum.price;
	        	 		monthChart.setOption(monthOption);
	        		}
	        	});
	        	//60月均线
	        	stompClient.subscribe('/app/stock/avarageline60month.init.'+companyCode, function (stockdata) { 
	        		var socketNum =  JSON.parse(JSON.parse(stockdata.body).content);
	        		if(!isNullOrEmpty(socketNum)){
	        			monthOption.series[4].data = socketNum.price;
	        	 		monthChart.setOption(monthOption);
	        		}
	        	});
	        	//5月均线12秒循环
	        	stompClient.subscribe('/stock/avarageline5month.'+companyCode, function (stockdata) { 
	        		var socketNum =  JSON.parse(JSON.parse(stockdata.body).content);
	        		if(!isNullOrEmpty(socketNum)){
	        			monthOption.series[1].data = socketNum.price;
	        	 		monthChart.setOption(monthOption);
	        		}
	        	 	
	        	});
	        	//10月均线12秒循环
	        	stompClient.subscribe('/stock/avarageline10month.'+companyCode, function (stockdata) { 
	        		var socketNum =  JSON.parse(JSON.parse(stockdata.body).content);
	        		if(!isNullOrEmpty(socketNum)){
	        			monthOption.series[2].data = socketNum.price;
	        	 		monthChart.setOption(monthOption);
	        		}
	        	 	
	        	});
	        	//20月均线12秒循环
	        	stompClient.subscribe('/stock/avarageline20month.'+companyCode, function (stockdata) { 
	        		var socketNum =  JSON.parse(JSON.parse(stockdata.body).content);
	        		if(!isNullOrEmpty(socketNum)){
	        			monthOption.series[3].data = socketNum.price;
	        	 		monthChart.setOption(monthOption);
	        		}
	        	 	
	        	});
	        	//60月均线12秒循环
	        	stompClient.subscribe('/stock/avarageline60month.'+companyCode, function (stockdata) { 
	        		var socketNum =  JSON.parse(JSON.parse(stockdata.body).content);
	        		if(!isNullOrEmpty(socketNum)){
	        			monthOption.series[4].data = socketNum.price;
	        	 		monthChart.setOption(monthOption);
	        		}
	        	 	
	        	});
			};
			//季线图
			function quarterConnect(){
				//季线一次性
				stompClient.subscribe('/app/stock/klinequarter.init.'+companyCode, function (stockdata) { 
	        		var socketNum =  JSON.parse(JSON.parse(stockdata.body).content);
	        		if(!isNullOrEmpty(socketNum)){
	        			var quarterArr = [];
		            	//k线图只支持数组包含4个值
		            	for (var i=0;i<socketNum.price.length;i++) {
		            		quarterArr.push(socketNum.price[i].splice(0,4));
		            		quarterLast.push(socketNum.price[i].pop());
		            	}
		            	/*自适应最大值和最小值*/
		            	var theMin = [];
		            	var theMax = [];
		            	for (var i=0;i<quarterArr.length;i++) {
		            		theMin.push(quarterArr[i][2]);
		            		theMax.push(quarterArr[i][3]);
		            	}
		            	Array.max = function( arr ){ 
							return Math.max.apply( Math, arr );
						};
						Array.min = function( arr ){ 
							return Math.min.apply( Math, arr );
						};
		            	quarterOption.yAxis[0].min = Array.min(theMin)*(0.99);
		            	quarterOption.yAxis[0].max = Array.max(theMax)*(1.01);
		            	/*自适应最大值和最小值---end*/
		        	 	quarterOption.xAxis[0].data = socketNum.day;
		        	 	barOptionQuarter.xAxis[0].data = socketNum.day;
		        	 	quarterOption.series[0].data = quarterArr;
		        	 	quarterOption.series[0].name = companyName;//传入公司简称
		        	 	barOptionQuarter.series[0].data = socketNum.volumn;
		        	 	quarterChart.setOption(quarterOption);
		        	 	barChartQuarter.setOption(barOptionQuarter);
		        	 	quarterChart.connect([barChartQuarter]);
						barChartQuarter.connect([quarterChart]);
	        		}else{
	        			canvasNoData($(".canvas-most05"));
	        		};
	            	
	        	});
	        	//季线12秒循环
				stompClient.subscribe('/app/stock/klinequarter.init.'+companyCode, function (stockdata) { 
	        		var socketNum =  JSON.parse(JSON.parse(stockdata.body).content);
	        		if(!isNullOrEmpty(socketNum)){
	        			var quarterArr = [];
		            	//k线图只支持数组包含4个值
		            	for (var i=0;i<socketNum.price.length;i++) {
		            		quarterArr.push(socketNum.price[i].splice(0,4));
		            		quarterLast.push(socketNum.price[i].pop());
		            	}
		            	/*自适应最大值和最小值*/
		            	var theMin = [];
		            	var theMax = [];
		            	for (var i=0;i<quarterArr.length;i++) {
		            		theMin.push(quarterArr[i][2]);
		            		theMax.push(quarterArr[i][3]);
		            	}
		            	Array.max = function( arr ){ 
							return Math.max.apply( Math, arr );
						};
						Array.min = function( arr ){ 
							return Math.min.apply( Math, arr );
						};
		            	quarterOption.yAxis[0].min = Array.min(theMin)*(0.99);
		            	quarterOption.yAxis[0].max = Array.max(theMax)*(1.01);
		            	/*自适应最大值和最小值---end*/
		        	 	quarterOption.xAxis[0].data = socketNum.day;
		        	 	barOptionQuarter.xAxis[0].data = socketNum.day;
		        	 	quarterOption.series[0].data = quarterArr;
		        	 	quarterOption.series[0].name = companyName;//传入公司简称
		        	 	barOptionQuarter.series[0].data = socketNum.volumn;
		        	 	quarterChart.setOption(quarterOption);
		        	 	barChartQuarter.setOption(barOptionQuarter);
		        	 	quarterChart.connect([barChartQuarter]);
						barChartQuarter.connect([quarterChart]);
	        		}else{
	        			canvasNoData($(".canvas-most05"));
	        		};
	            	
	        	});
	        	//5季均线
	        	stompClient.subscribe('/app/stock/avarageline5quarter.init.'+companyCode, function (stockdata) { 
	        		var socketNum =  JSON.parse(JSON.parse(stockdata.body).content);
	        		if(!isNullOrEmpty(socketNum)){
	        			quarterOption.series[1].data = socketNum.price;
	        	 		quarterChart.setOption(quarterOption);
	        		}
	        	 	
	        	});
	        	//10季均线
	        	stompClient.subscribe('/app/stock/avarageline10quarter.init.'+companyCode, function (stockdata) { 
	        		var socketNum =  JSON.parse(JSON.parse(stockdata.body).content);
	        		if(!isNullOrEmpty(socketNum)){
	        			quarterOption.series[2].data = socketNum.price;
	        	 		quarterChart.setOption(quarterOption);
	        		}
	        	 	
	        	});
	        	//20季均线
	        	stompClient.subscribe('/app/stock/avarageline20quarter.init.'+companyCode, function (stockdata) { 
	        		var socketNum =  JSON.parse(JSON.parse(stockdata.body).content);
	        		if(!isNullOrEmpty(socketNum)){
	        			quarterOption.series[3].data = socketNum.price;
	        	 		quarterChart.setOption(quarterOption);
	        		}
	        	 	
	        	});
	        	//60季均线
	        	stompClient.subscribe('/app/stock/avarageline60quarter.init.'+companyCode, function (stockdata) { 
	        		var socketNum =  JSON.parse(JSON.parse(stockdata.body).content);
	        		if(!isNullOrEmpty(socketNum)){
	        			quarterOption.series[4].data = socketNum.price;
	        	 		quarterChart.setOption(quarterOption);
	        		}
	        	 	
	        	});
	        	//5季均线12秒循环
	        	stompClient.subscribe('/stock/avarageline5quarter.'+companyCode, function (stockdata) { 
	        		var socketNum =  JSON.parse(JSON.parse(stockdata.body).content);
	        		if(!isNullOrEmpty(socketNum)){
	        			quarterOption.series[1].data = socketNum.price;
	        	 		quarterChart.setOption(quarterOption);
	        		}
	        	 	
	        	});
	        	//10季均线12秒循环
	        	stompClient.subscribe('/stock/avarageline10quarter.'+companyCode, function (stockdata) { 
	        		var socketNum =  JSON.parse(JSON.parse(stockdata.body).content);
	        		if(!isNullOrEmpty(socketNum)){
	        			quarterOption.series[2].data = socketNum.price;
	        	 		quarterChart.setOption(quarterOption);
	        		}
	        	 	
	        	});
	        	//20季均线12秒循环
	        	stompClient.subscribe('/stock/avarageline20quarter.'+companyCode, function (stockdata) { 
	        		var socketNum =  JSON.parse(JSON.parse(stockdata.body).content);
	        		if(!isNullOrEmpty(socketNum)){
	        			quarterOption.series[3].data = socketNum.price;
	        	 		quarterChart.setOption(quarterOption);
	        		}
	        	 	
	        	});
	        	//60季均线12秒循环
	        	stompClient.subscribe('/stock/avarageline60quarter.'+companyCode, function (stockdata) { 
	        		var socketNum =  JSON.parse(JSON.parse(stockdata.body).content);
	        		if(!isNullOrEmpty(socketNum)){
	        			quarterOption.series[4].data = socketNum.price;
	        	 		quarterChart.setOption(quarterOption);
	        		}
	        	 	
	        	});
			};
			//买卖价格
	        function socketNumFun(socketNum){
	        	var html = "";
        	 	html += '<table border="0" cellspacing="0" cellpadding="0">';
        	 	html += '			<colgroup><col width="30%"/><col width="30%"/><col width="40%"/></colgroup>';
				html += '			<tr>';
				html += '				<td>卖五</td>';
				if(Number(socketNum.sell_price_5) == 0){
					html += '				<td class="right"><span class="">--</span></td>';
				}else if(Number(socketNum.sell_price_5) > Number(socketNum.previous_price)){
					html += '				<td class="right"><span class="priceRed">'+ socketNum.sell_price_5 +'</span></td>';
				}
				else if(Number(socketNum.sell_price_5) == Number(socketNum.previous_price)){
					html += '				<td class="right"><span class="">'+ socketNum.sell_price_5 +'</span></td>';
				}else{
					html += '				<td class="right"><span class="priceGreen">'+ socketNum.sell_price_5 +'</span></td>';
				}
				html += '				<td class="right"><span>'+ socketNum.sell_volumn_5 +'</span></td>';
				html += '			</tr>';
				html += '			<tr>';
				html += '				<td>卖四</td>';
				if(Number(socketNum.sell_price_4) == 0){
					html += '				<td class="right"><span class="">--</span></td>';
				}else if(Number(socketNum.sell_price_4) > Number(socketNum.previous_price)){
					html += '				<td class="right"><span class="priceRed">'+ socketNum.sell_price_4 +'</span></td>';
				}else if(Number(socketNum.sell_price_4) == Number(socketNum.previous_price)){
					html += '				<td class="right"><span class="">'+ socketNum.sell_price_4 +'</span></td>';
				}else{
					html += '				<td class="right"><span class="priceGreen">'+ socketNum.sell_price_4 +'</span></td>';
				}
				html += '				<td class="right"><span>'+ socketNum.sell_volumn_4 +'</span></td>';
				html += '			</tr>';
				html += '			<tr>';
				html += '				<td>卖三</td>';
				if(Number(socketNum.sell_price_3) == 0){
					html += '				<td class="right"><span class="">--</span></td>';
				}else if(Number(socketNum.sell_price_3) > Number(socketNum.previous_price)){
					html += '				<td class="right"><span class="priceRed">'+ socketNum.sell_price_3 +'</span></td>';
				}else if(Number(socketNum.sell_price_3) == Number(socketNum.previous_price)){
					html += '				<td class="right"><span class="">'+ socketNum.sell_price_3 +'</span></td>';
				}else{
					html += '				<td class="right"><span class="priceGreen">'+ socketNum.sell_price_3 +'</span></td>';
				}
				html += '				<td class="right"><span id="">'+ socketNum.sell_volumn_3 +'</span></td>';
				html += '			</tr>';
				html += '			<tr>';
				html += '				<td>卖二</td>';
				if(Number(socketNum.sell_price_2) == 0){
					html += '				<td class="right"><span class="">--</span></td>';
				}else if(Number(socketNum.sell_price_2) > Number(socketNum.previous_price)){
					html += '				<td class="right"><span class="priceRed">'+ socketNum.sell_price_2 +'</span></td>';
				}else if(Number(socketNum.sell_price_2) == Number(socketNum.previous_price)){
					html += '				<td class="right"><span class="">'+ socketNum.sell_price_2 +'</span></td>';
				}else{
					html += '				<td class="right"><span class="priceGreen">'+ socketNum.sell_price_2 +'</span></td>';
				}
				html += '				<td class="right"><span id="">'+ socketNum.sell_volumn_2 +'</span></td>';
				html += '			</tr>';
				html += '			<tr>';
				html += '				<td>卖一</td>';
				if(Number(socketNum.sell_price_1) == 0){
					html += '				<td class="right"><span class="">--</span></td>';
				}else if(Number(socketNum.sell_price_1) > Number(socketNum.previous_price)){
					html += '				<td class="right"><span class="priceRed">'+ socketNum.sell_price_1 +'</span></td>';
				}else if(Number(socketNum.sell_price_1) == Number(socketNum.previous_price)){
					html += '				<td class="right"><span class="">'+ socketNum.sell_price_1 +'</span></td>';
				}else{
					html += '				<td class="right"><span class="priceGreen">'+ socketNum.sell_price_1 +'</span></td>';
				}
				html += '				<td class="right"><span id="">'+ socketNum.sell_volumn_1 +'</span></td>';
				html += '			</tr>';
				html += '			<tr>';
				html += '				<td>买一</td>';
				if(Number(socketNum.buy_price_1) == 0){
					html += '				<td class="right"><span class="">--</span></td>';
				}else if(Number(socketNum.buy_price_1) > Number(socketNum.previous_price)){
					html += '				<td class="right"><span class="priceRed">'+ socketNum.buy_price_1 +'</span></td>';
				}else if(Number(socketNum.buy_price_1) == Number(socketNum.previous_price)){
					html += '				<td class="right"><span class="">'+ socketNum.buy_price_1 +'</span></td>';
				}else{
					html += '				<td class="right"><span class="priceGreen">'+ socketNum.buy_price_1 +'</span></td>';
				}
				html += '				<td class="right"><span>'+ socketNum.buy_volumn_1 +'</span></td>';
				html += '			</tr>';
				html += '			<tr>';
				html += '				<td>买二</td>';
				if(Number(socketNum.buy_price_2) == 0){
					html += '				<td class="right"><span class="">--</span></td>';
				}else if(Number(socketNum.buy_price_2) > Number(socketNum.previous_price)){
					html += '				<td class="right"><span class="priceRed">'+ socketNum.buy_price_2 +'</span></td>';
				}else if(Number(socketNum.buy_price_2) == Number(socketNum.previous_price)){
					html += '				<td class="right"><span class="">'+ socketNum.buy_price_2 +'</span></td>';
				}else{
					html += '				<td class="right"><span class="priceGreen">'+ socketNum.buy_price_2 +'</span></td>';
				}
				html += '				<td class="right"><span>'+ socketNum.buy_volumn_2 +'</span></td>';
				html += '			</tr>';
				html += '			<tr>';
				html += '				<td>买三</td>';
				if(Number(socketNum.buy_price_3) == 0){
					html += '				<td class="right"><span class="">--</span></td>';
				}else if(Number(socketNum.buy_price_3) > Number(socketNum.previous_price)){
					html += '				<td class="right"><span class="priceRed">'+ socketNum.buy_price_3 +'</span></td>';
				}else if(Number(socketNum.buy_price_3) == Number(socketNum.previous_price)){
					html += '				<td class="right"><span class="">'+ socketNum.buy_price_3 +'</span></td>';
				}else{
					html += '				<td class="right"><span class="priceGreen">'+ socketNum.buy_price_3 +'</span></td>';
				}
				html += '				<td class="right"><span>'+ socketNum.buy_volumn_3 +'</span></td>';
				html += '			</tr>';
				html += '			<tr>';
				html += '				<td>买四</td>';
				if(Number(socketNum.buy_price_4) == 0){
					html += '				<td class="right"><span class="">--</span></td>';
				}else if(Number(socketNum.buy_price_4) > Number(socketNum.previous_price)){
					html += '				<td class="right"><span class="priceRed">'+ socketNum.buy_price_4 +'</span></td>';
				}else if(Number(socketNum.buy_price_4) == Number(socketNum.previous_price)){
					html += '				<td class="right"><span class="">'+ socketNum.buy_price_4 +'</span></td>';
				}else{
					html += '				<td class="right"><span class="priceGreen">'+ socketNum.buy_price_4 +'</span></td>';
				}
				html += '				<td class="right"><span>'+ socketNum.buy_volumn_4 +'</span></td>';
				html += '			</tr>';
				html += '			<tr>';
				html += '				<td>买五</td>';
				if(Number(socketNum.buy_price_5) == 0){
					html += '				<td class="right"><span class="">--</span></td>';
				}else if(Number(socketNum.buy_price_5) > Number(socketNum.previous_price)){
					html += '				<td class="right"><span class="priceRed">'+ socketNum.buy_price_5 +'</span></td>';
				}else if(Number(socketNum.buy_price_5) == Number(socketNum.previous_price)){
					html += '				<td class="right"><span class="">'+ socketNum.buy_price_5 +'</span></td>';
				}else{
					html += '				<td class="right"><span class="priceGreen">'+ socketNum.buy_price_5 +'</span></td>';
				}
				html += '				<td class="right"><span>'+ socketNum.buy_volumn_5 +'</span></td>';
				html += '			</tr>';
				html += '		</table>';
				if(isNullOrEmpty(socketNum.market_value)){
	        		$("#liushizhi").text("--");
	        	}else{
	        		$("#liushizhi").text(socketNum.market_value);
	        	}
				
				$("#sellTable").html("").append(html);
	        };
	        
	        //最新价格
	        function socketPrice(prive){
	        	$("#huanshoul").text(prive.trans_rate);
	        	$("#shijingl").text(prive.pb_rate);
	        	$("#shiyingl").text(prive.pe_rate);
	        	$("#pettm").text(prive.pe_rate);
		        
	        	var html = "";
        	 	html += '<table border="0" cellspacing="0" cellpadding="0">';
        	 	html += '			<colgroup><col width="30%"/><col width="30%"/><col width="40%"/></colgroup>';
				html += '			<tr>';
				html += '				<td>最新价</td>';
				if(Number(prive.current_price) == 0){
					$("#shoupan").text("--");
					html += '				<td class="right"><span class="">--</span></td>';
				}else if(Number(prive.current_price) > Number(prive.previous_price)){
					$("#shoupan").html('<b class="priceRed">'+ prive.current_price +'</b>');
					html += '				<td class="right"><span class="priceRed">'+ prive.current_price +'</span></td>';
				}else if(Number(prive.current_price) == Number(prive.previous_price)){
					$("#shoupan").html('<b class="">'+ prive.current_price +'</b>');
					html += '				<td class="right"><span class="">'+ prive.current_price +'</span></td>';
				}else{
					$("#shoupan").html('<b class="priceGreen">'+ prive.current_price +'</b>');
					html += '				<td class="right"><span class="priceGreen">'+ prive.current_price +'</span></td>';
				};
				if(Number(prive.up_down_close) == 0){
					$("#zhangdie").html("--");
					html += '				<td class="right"><span class="">--</span></td>';
				}else if(Number(prive.up_down_close) > 0){
					$("#zhangdie").html('<b class="priceRed">'+ prive.up_down_close +'</b>');
					html += '				<td class="right"><span class="priceRed">'+ prive.up_down_close +'</span></td>';
				}else{
					$("#zhangdie").html('<b class="priceGreen">'+ prive.up_down_close +'</b>');
					html += '				<td class="right"><span class="priceGreen">'+ prive.up_down_close +'</span></td>';
				}
				html += '			</tr>';
				html += '			<tr>';
				html += '				<td>涨跌幅</td>';
				html += '				<td></td>';
				if(Number(prive.up_down_rate_close) == 0){
					$("#zhangbi").html("--");
					html += '				<td class="right"><span class="">--</span></td>';
				}else if(Number(prive.up_down_rate_close) > 0){
					$("#zhangbi").html('<b class="priceRed">'+ prive.up_down_rate_close +'%</b>');
					html += '				<td class="right"><span class="priceRed">'+ prive.up_down_rate_close +'%</span></td>';
				}else{
					$("#zhangbi").html('<b class="priceGreen">'+ prive.up_down_rate_close +'%</b>');
					html += '				<td class="right"><span class="priceGreen">'+ prive.up_down_rate_close +'%</span></td>';
				}
				html += '			</tr>';
				html += '			<tr>';
				html += '				<td>昨收价</td>';
				html += '				<td></td>';
				$("#zuoshoujia").html('<b class="">'+ prive.previous_price +'</b>');
				html += '				<td class="right"><span id="">'+ prive.previous_price +'</span></td>';
				html += '			</tr>';
				html += '			<tr>';
				html += '				<td>最高价</td>';
				html += '				<td></td>';
				if(Number(prive.max_price) == 0){
					$("#zuigao").html('--');
					html += '				<td class="right"><span class="">--</span></td>';
				}else if(Number(prive.max_price) > Number(prive.previous_price)){
					$("#zuigao").html('<b class="priceRed">'+ prive.max_price +'</b>');
					html += '				<td class="right"><span class="priceRed">'+ prive.max_price +'</span></td>';
				}else if(Number(prive.max_price) == Number(prive.previous_price)){
					$("#zuigao").html('<b class="">'+ prive.max_price +'</b>');
					html += '				<td class="right"><span class="">'+ prive.max_price +'</span></td>';
				}else{
					$("#zuigao").html('<b class="priceGreen">'+ prive.max_price +'</b>');
					html += '				<td class="right"><span class="priceGreen">'+ prive.max_price +'</span></td>';
				}
				html += '			</tr>';
				html += '			<tr>';
				html += '				<td>最低价</td>';
				html += '				<td></td>';
				if(Number(prive.min_price) == 0){
					$("#zuidijia").html('--');
					html += '				<td class="right"><span class="">--</span></td>';
				}else if(Number(prive.min_price) > Number(prive.previous_price)){
					$("#zuidijia").html('<b class="priceRed">'+ prive.min_price +'</b>');
					html += '				<td class="right"><span class="priceRed">'+ prive.min_price +'</span></td>';
				}else if(Number(prive.min_price) == Number(prive.previous_price)){
					$("#zuidijia").html('<b class="">'+ prive.min_price +'</b>');
					html += '				<td class="right"><span class="">'+ prive.min_price +'</span></td>';
				}else{
					$("#zuidijia").html('<b class="priceGreen">'+ prive.min_price +'</b>');
					html += '				<td class="right"><span class="priceGreen">'+ prive.min_price +'</span></td>';
				}
				html += '			</tr>';
				html += '			<tr>';
				html += '				<td>开盘价</td>';
				html += '				<td></td>';
				if(Number(prive.open_price) == 0){
					$("#kaipan").text("--");
					html += '				<td class="right"><span class="">--</span></td>';
				}else if(Number(prive.open_price) > Number(prive.previous_price)){
					$("#kaipan").html('<b class="priceRed">'+ prive.open_price +'</b>');
					html += '				<td class="right"><span class="priceRed">'+ prive.open_price +'</span></td>';
				}else if(Number(prive.open_price) == Number(prive.previous_price)){
					$("#kaipan").html('<b class="">'+ prive.open_price +'</b>');
					html += '				<td class="right"><span class="">'+ prive.open_price +'</span></td>';
				}else{
					$("#kaipan").html('<b class="priceGreen">'+ prive.open_price +'</b>');
					html += '				<td class="right"><span class="priceGreen">'+ prive.open_price +'</span></td>';
				}
				html += '			</tr>';
				html += '			<tr>';
				html += '				<td>均   价</td>';
				html += '				<td></td>';
				if(Number(prive.avarage_price) == 0){
					$("#junjia").html('--');
					html += '				<td class="right"><span class="">--</span></td>';
				}else if(Number(prive.avarage_price) > Number(prive.previous_price)){
					$("#junjia").html('<b class="priceRed">'+ prive.avarage_price +'</b>');
					html += '				<td class="right"><span class="priceRed">'+ prive.avarage_price +'</span></td>';
				}else if(Number(prive.avarage_price) == Number(prive.previous_price)){
					$("#junjia").html('<b class="">'+ prive.avarage_price +'</b>');
					html += '				<td class="right"><span class="">'+ prive.avarage_price +'</span></td>';
				}else{
					$("#junjia").html('<b class="priceGreen">'+ prive.avarage_price +'</b>');
					html += '				<td class="right"><span class="priceGreen">'+ prive.avarage_price +'</span></td>';
				}
				html += '			</tr>';
				html += '			<tr>';
				html += '				<td>成交量</td>';
				$("#chengjiao").html('<b class="">'+ prive.deal_volumn_str +'</b>');
				html += '				<td colspan="2" class="right"><span>'+ prive.deal_volumn_str +'</span></td>';
				html += '			</tr>';
				html += '			<tr>';
				html += '				<td>成交额</td>';
				$("#chengjiaoe").html('<b class="">'+ prive.deal_sum_str +'</b>');
				html += '				<td colspan="2" class="right"><span>'+ prive.deal_sum_str +'</span></td>';
				html += '			</tr>';
				html += '		</table>';
				$("#priceTable").html("").append(html);
	        };
			
		});	
	
})
