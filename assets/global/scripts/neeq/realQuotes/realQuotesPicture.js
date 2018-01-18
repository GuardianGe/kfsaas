var TranChange = function(){
	var _flg = true;
	var realQuoTop = function(){
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
	            'echarts/chart/k',
	            'echarts/chart/pie'
	        ],
	        function (ec) {
	            //行情概览
	            var myChartPie = ec.init(document.getElementById('realEcharts')); 
				var myChartPie2 = ec.init(document.getElementById('realEcharts2'));
				var myChartPie3 = ec.init(document.getElementById('realEcharts3')); 
				var _width = $("#quotesMap").width();
				/*left*/
				//三板做市
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
			    //三板成指
			    $("#barChartDay2").width(_width);
			    $("#barChartWeek2").width(_width);
			    $("#barChartMonth2").width(_width);
			    $("#barChartQuarter2").width(_width);
			    $("#dayChart2").width(_width);
			    $("#weekChart2").width(_width);
			    $("#monthChart2").width(_width);
			    $("#quarterChart2").width(_width);
			    /*right*/
			    $("#sellChart3").width(_width);
			    $("#barChart3").width(_width);
			    $("#barChartDay3").width(_width);
			    $("#barChartWeek3").width(_width);
			    $("#barChartMonth3").width(_width);
			    $("#barChartQuarter3").width(_width);
			    $("#dayChart3").width(_width);
			    $("#weekChart3").width(_width);
			    $("#monthChart3").width(_width);
			    $("#quarterChart3").width(_width);
			    /*left*/
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
			    var barChartDay2 = ec.init(document.getElementById('barChartDay2'),"macarons");
			    var barChartWeek2 = ec.init(document.getElementById('barChartWeek2'),"macarons");
			    var barChartMonth2 = ec.init(document.getElementById('barChartMonth2'),"macarons");
			    var barChartQuarter2 = ec.init(document.getElementById('barChartQuarter2'),"macarons");
			    var dayChart2 = ec.init(document.getElementById('dayChart2'),"macarons");
			    var weekChart2 = ec.init(document.getElementById('weekChart2'),"macarons");
			    var monthChart2 = ec.init(document.getElementById('monthChart2'),"macarons");
			    var quarterChart2 = ec.init(document.getElementById('quarterChart2'),"macarons");
			    /*right*/
			    var sellChart3 = ec.init(document.getElementById('sellChart3'),"macarons");
			    var barChart3 = ec.init(document.getElementById('barChart3'),"macarons");
			    var barChartDay3 = ec.init(document.getElementById('barChartDay3'),"macarons");
			    var barChartWeek3 = ec.init(document.getElementById('barChartWeek3'),"macarons");
			    var barChartMonth3 = ec.init(document.getElementById('barChartMonth3'),"macarons");
			    var barChartQuarter3 = ec.init(document.getElementById('barChartQuarter3'),"macarons");
			    var dayChart3 = ec.init(document.getElementById('dayChart3'),"macarons");
			    var weekChart3 = ec.init(document.getElementById('weekChart3'),"macarons");
			    var monthChart3 = ec.init(document.getElementById('monthChart3'),"macarons");
			    var quarterChart3 = ec.init(document.getElementById('quarterChart3'),"macarons");
			    //resize
			    window.addEventListener("resize",function(){
			    	var _width = $("#quotesMap").width();
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
			        //
			        $("#barChartDay2").width(_width);
				    $("#barChartWeek2").width(_width);
				    $("#barChartMonth2").width(_width);
				    $("#barChartQuarter2").width(_width);
				    $("#dayChart2").width(_width);
				    $("#weekChart2").width(_width);
				    $("#monthChart2").width(_width);
				    $("#quarterChart2").width(_width);
			        /*right*/
			        $("#sellChart3").width(_width);
			        $("#barChart3").width(_width);
			        $("#barChartDay3").width(_width);
				    $("#barChartWeek3").width(_width);
				    $("#barChartMonth3").width(_width);
				    $("#barChartQuarter3").width(_width);
				    $("#dayChart3").width(_width);
				    $("#weekChart3").width(_width);
				    $("#monthChart3").width(_width);
				    $("#quarterChart3").width(_width);
				    
				    /*left*/
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
			    	//
			    	barChartDay2.resize();
			    	barChartWeek2.resize();
			    	barChartMonth2.resize();
			    	barChartQuarter2.resize();
			    	dayChart2.resize();
			    	weekChart2.resize();
			    	monthChart2.resize();
			    	quarterChart2.resize();
			    	/*right*/
			    	sellChart3.resize();
			    	barChart3.resize();
			    	barChartDay3.resize();
			    	barChartWeek3.resize();
			    	barChartMonth3.resize();
			    	barChartQuarter3.resize();
			    	dayChart3.resize();
			    	weekChart3.resize();
			    	monthChart3.resize();
			    	quarterChart3.resize();
			    });
				window.addEventListener("resize",function(){
			    	myChartPie.resize();
			    	myChartPie2.resize();
			    	myChartPie3.resize();
			    });
				var stompClient = null;
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
			    //实时行情X周时间刻度
			    function setXaxisNum() {
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
			    };
			    //实时行情折线图left
			    var option = {
			    	/*toolbox: {
				        show : true,
				        feature : {
				            saveAsImage : {
				            	show: true,
				            	name:"三板慧-三板做市",
				            	icon:'../../assets/admin/layout/img/saveAsPic.png',
				            	color:"transparent",
				            	
				            }
				        }
				    },*/
			    	noDataLoadingOption: {
	                    text: ' ',
	                    effect: function(params){
	                    	/*params.start = function(h){
	                    		h._bgDom.style.background = "transparent";
	                    		h._bgDom.style.opacity = 0;
	                    	}
	                    	params.stop = function(h){
	                    		h._bgDom.style.background = "transparent";
	                    		h._bgDom.style.opacity = 0;
	                    	}
	                    	return params;*/
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
				    	x: 70,
				        y: 40,
				        x2:80,
				        y2:30,
				        height:"70%",
				        width:"75%"
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
					            		/*if(Math.abs(av - yesTdayNum) <= 0.01 ){
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
						            		/*if(Math.abs(av - yesTdayNum) <= 0.01 ){
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
				            splitNumber:6,
				            min:0,//默认最低为0
				            max:5
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
			    //实时行情柱形图left
			   	var barOption = {
			   		toolbox: {
			   			y:-50,
				        show : true,
				        feature : {
				            saveAsImage : {
				            	show: true
				            }
				        }
				    },
			        tooltip: {
			            show: true,
			            trigger: 'axis'
			        },
			        legend: {
			            data:[]
			        },
			        grid: {
			        	borderWidth:0,
				        x:70,
				        y:10,
				        x2:80,
				        y2:40,
				        height:"80%",
				        width:"75%"
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
			    //日线柱形图left
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
				        x: 70,
				        y:10,
				        x2:80,
				        y2:40,
				        height:"80%",
				        width:"82%"
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
			   	//周线柱形图left
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
				        x: 70,
				        y:10,
				        x2:80,
				        y2:40,
				        height:"80%",
				        width:"82%"
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
			   	//月线柱形图left
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
				        x: 70,
				        y:10,
				        x2:80,
				        y2:40,
				        height:"80%",
				        width:"82%"
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
			   	//季线柱形图left
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
				        x: 70,
				        y:10,
				        x2:80,
				        y2:40,
				        height:"80%",
				        width:"82%"
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
			    //日线图left
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
				    	x: 70,
				        y: 40,
				        x2:80,
				        y2:30,
				        height:"70%",
				        width:"82%"
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
			    //周线图left
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
				    	x: 70,
				        y: 40,
				        x2:80,
				        y2:30,
				        height:"70%",
				        width:"82%"
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
			    //月线图left
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
				    	x: 70,
				        y: 40,
				        x2:80,
				        y2:30,
				        height:"70%",
				        width:"82%"
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
			    //季线图left
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
				    	x: 70,
				        y: 40,
				        x2:80,
				        y2:30,
				        height:"70%",
				        width:"82%"
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
				var companyCode = "899002";//三板做市code
				var companyCodeRight = "899001";//三板成指code
				var listMode = "";
				var _flg = true;
				var _pageNum = 0;
				var yesTdayNum = '';
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
			        	 	dayOption.series[0].name = "";//传入公司简称
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
			        	 	dayOption.series[0].name = "";//传入公司简称
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
			        	 	weekOption.series[0].name = "";//传入公司简称
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
			        	 	weekOption.series[0].name = "";//传入公司简称
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
			        	 	monthOption.series[0].name = "";//传入公司简称
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
			        	 	monthOption.series[0].name = "";//传入公司简称
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
			        	 	quarterOption.series[0].name = "";//传入公司简称
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
			        	 	quarterOption.series[0].name = "";//传入公司简称
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
			    
			    
/***********************************************************************************************************/			    
			    
   
			    //日线柱形图
			    var barOptionDay2 = {
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
				        x:70,
				        y:10,
				        x2:80,
				        y2:40,
				        height:"80%",
				        width:"82%"
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
			   	var barOptionWeek2 = {
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
				        x:70,
				        y:10,
				        x2:80,
				        y2:40,
				        height:"80%",
				        width:"82%"
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
			   	var barOptionMonth2 = {
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
				        x:70,
				        y:10,
				        x2:80,
				        y2:40,
				        height:"80%",
				        width:"82%"
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
			   	var barOptionQuarter2 = {
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
				        x:70,
				        y:10,
				        x2:80,
				        y2:40,
				        height:"80%",
				        width:"82%"
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
			    var dayOption2 = {
				    title : {
				        text: ''
				    },
				    tooltip : {
				        trigger: 'axis',
				        formatter: function (params) {
				        	var dataIndex = params[0].dataIndex
				            var res = params[0].name + '<br/>' + params[0].seriesName;
				            var allPrice = '';
				            for (var i=0;i<dayLastRight.length;i++) {
				            	if(i == dataIndex){
				            		allPrice = dayLastRight[i];
				            	}
				            }
				            res += '<br/>  开盘 : ' + getFloatStr(params[0].value[0]) + '  最高 : ' + getFloatStr(params[0].value[3]);
				            res += '<br/>  收盘 : ' + getFloatStr(params[0].value[1]) + '  最低 : ' + getFloatStr(params[0].value[2]);
				            res += '<br/>  成交金额(万) : ' + getFloatStr(allPrice);
				            return res;
				        }
				    },
				    grid:{
				    	x: 70,
				        y: 40,
				        x2:80,
				        y2:30,
				        height:"70%",
				        width:"82%"
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
			    var weekOption2 = {
			    	
				    title : {
				        text: ''
				    },
				    tooltip : {
				        trigger: 'axis',
				        formatter: function (params) {
				        	var dataIndex = params[0].dataIndex
				            var res = params[0].name + '<br/>' + params[0].seriesName;
				            var allPrice = '';
				            for (var i=0;i<weekLastRight.length;i++) {
				            	if(i == dataIndex){
				            		allPrice = weekLastRight[i];
				            	}
				            }
				            res += '<br/>  开盘 : ' + getFloatStr(params[0].value[0]) + '  最高 : ' + getFloatStr(params[0].value[3]);
				            res += '<br/>  收盘 : ' + getFloatStr(params[0].value[1]) + '  最低 : ' + getFloatStr(params[0].value[2]);
				            res += '<br/>  成交金额(万) : ' + getFloatStr(allPrice);
				            return res;
				        }
				    },
				    grid:{
				    	x: 70,
				        y: 40,
				        x2:80,
				        y2:30,
				        height:"70%",
				        width:"82%"
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
			    var monthOption2 = {
				    title : {
				        text: ''
				    },
				    tooltip : {
				        trigger: 'axis',
				        formatter: function (params) {
				        	var dataIndex = params[0].dataIndex
				            var res = params[0].name + '<br/>' + params[0].seriesName;
				            var allPrice = '';
				            for (var i=0;i<monthLastRight.length;i++) {
				            	if(i == dataIndex){
				            		allPrice = monthLastRight[i];
				            	}
				            }
				            res += '<br/>  开盘 : ' + getFloatStr(params[0].value[0]) + '  最高 : ' + getFloatStr(params[0].value[3]);
				            res += '<br/>  收盘 : ' + getFloatStr(params[0].value[1]) + '  最低 : ' + getFloatStr(params[0].value[2]);
				            res += '<br/>  成交金额(万) : ' + allPrice;
				            return res;
				        }
				    },
				    grid:{
				    	x: 70,
				        y: 40,
				        x2:80,
				        y2:30,
				        height:"70%",
				        width:"82%"
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
			    var quarterOption2 = {
			    	
				    title : {
				        text: ''
				    },
				    tooltip : {
				        trigger: 'axis',
				        formatter: function (params) {
				        	var dataIndex = params[0].dataIndex
				            var res = params[0].name + '<br/>' + params[0].seriesName;
				            var allPrice = '';
				            for (var i=0;i<quarterLastRight.length;i++) {
				            	if(i == dataIndex){
				            		allPrice = quarterLastRight[i];
				            	}
				            }
				            res += '<br/>  开盘 : ' + getFloatStr(params[0].value[0]) + '  最高 : ' + getFloatStr(params[0].value[3]);
				            res += '<br/>  收盘 : ' + getFloatStr(params[0].value[1]) + '  最低 : ' + getFloatStr(params[0].value[2]);
				            res += '<br/>  成交金额(万) : ' + getFloatStr(allPrice);
				            return res;
				        }
				    },
				    grid:{
				    	x: 70,
				        y: 40,
				        x2:80,
				        y2:30,
				        height:"70%",
				        width:"82%"
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
				var dayLastRight = [];//日k线图成交金额
				var weekLastRight = [];//周k线图成交金额
				var monthLastRight = [];//月k线图成交金额
				var quarterLastRight = [];//季k线图成交金额
				var listMode = "";
				var _flg = true;
				var _pageNum = 0;
				
				//实时行情
				//日线图
				function dayConnect2(){
					//日线一次性
			    	stompClient.subscribe('/app/stock/klineday.init.'+companyCodeRight, function (stockdata) { 
			    		var socketNum =  JSON.parse(JSON.parse(stockdata.body).content);
			    		if(!isNullOrEmpty(socketNum)){
			    			var priceArr = [];
			            	//k线图只支持数组包含4个值
			            	for (var i=0;i<socketNum.price.length;i++) {
			            		priceArr.push(socketNum.price[i].splice(0,4));//echart规定4个值
			            		dayLastRight.push(socketNum.price[i].pop());//数组最后的总量
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
			            	dayOption2.yAxis[0].min = Array.min(theMin)*(0.99);
			            	dayOption2.yAxis[0].max = Array.max(theMax)*(1.01);
			            	/*end*/
			        	 	dayOption2.xAxis[0].data = socketNum.day;//X轴日期刻度
			        	 	barOptionDay2.xAxis[0].data = socketNum.day;
			        	 	dayOption2.series[0].data = priceArr;//划线
			        	 	dayOption2.series[0].name = "";//传入公司简称
			        	 	barOptionDay2.series[0].data = socketNum.volumn;
			        	 	dayChart2.setOption(dayOption2);
			        	 	barChartDay2.setOption(barOptionDay2);
			        	 	dayChart2.connect([barChartDay2]);
							barChartDay2.connect([dayChart2]);
			    		}else{
			    			canvasNoData($(".canvas-most02s"));
			    		};
			        	
			    	});
			    	//日线12秒循环
			    	stompClient.subscribe('/stock/klineday.'+companyCodeRight, function (stockdata) { 
			    		var socketNum =  JSON.parse(JSON.parse(stockdata.body).content);
			    		if(!isNullOrEmpty(socketNum)){
			    			var priceArr = [];
			            	//k线图只支持数组包含4个值
			            	for (var i=0;i<socketNum.price.length;i++) {
			            		priceArr.push(socketNum.price[i].splice(0,4));//echart规定4个值
			            		dayLastRight.push(socketNum.price[i].pop());//数组最后的总量
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
			            	dayOption2.yAxis[0].min = Array.min(theMin)*(0.99);
			            	dayOption2.yAxis[0].max = Array.max(theMax)*(1.01);
			            	/*end*/
			        	 	dayOption2.xAxis[0].data = socketNum.day;//X轴日期刻度
			        	 	barOptionDay2.xAxis[0].data = socketNum.day;
			        	 	dayOption2.series[0].data = priceArr;//划线
			        	 	dayOption2.series[0].name = "";//传入公司简称
			        	 	barOptionDay2.series[0].data = socketNum.volumn;
			        	 	dayChart2.setOption(dayOption2);
			        	 	barChartDay2.setOption(barOptionDay2);
			        	 	dayChart2.connect([barChartDay2]);
							barChartDay2.connect([dayChart2]);
			    		}else{
			    			canvasNoData($(".canvas-most02s"));
			    		};
			        	
			    	});
			    	//5天均线
			    	stompClient.subscribe('/app/stock/avarageline5day.init.'+companyCodeRight, function (stockdata) { 
			    		var socketNum =  JSON.parse(JSON.parse(stockdata.body).content);
			    		if(!isNullOrEmpty(socketNum)){
			    			dayOption2.series[1].data = socketNum.price;
			    	 		dayChart2.setOption(dayOption2);
			    		}
			    	 	
			    	});
			    	//10天均线
			    	stompClient.subscribe('/app/stock/avarageline10day.init.'+companyCodeRight, function (stockdata) { 
			    		var socketNum =  JSON.parse(JSON.parse(stockdata.body).content);
			    		if(!isNullOrEmpty(socketNum)){
			    			dayOption2.series[2].data = socketNum.price;
			    	 		dayChart2.setOption(dayOption2);
			    		};
			    	 	
			    	});
			    	//20天均线
			    	stompClient.subscribe('/app/stock/avarageline20day.init.'+companyCodeRight, function (stockdata) { 
			    		var socketNum =  JSON.parse(JSON.parse(stockdata.body).content);
			    		if(!isNullOrEmpty(socketNum)){
			    			dayOption2.series[3].data = socketNum.price;
			    	 		dayChart2.setOption(dayOption2);
			    		}
			    	 	
			    	});
			    	//60天均线
			    	stompClient.subscribe('/app/stock/avarageline60day.init.'+companyCodeRight, function (stockdata) { 
			    		var socketNum =  JSON.parse(JSON.parse(stockdata.body).content);
			    		if(!isNullOrEmpty(socketNum)){
			    			dayOption2.series[4].data = socketNum.price;
			    	 		dayChart2.setOption(dayOption2);
			    		};
			    	 	
			    	});
			    	//5天均线12秒循环
			    	stompClient.subscribe('/stock/avarageline5day.'+companyCodeRight, function (stockdata) { 
			    		var socketNum =  JSON.parse(JSON.parse(stockdata.body).content);
			    		if(!isNullOrEmpty(socketNum)){
			    			dayOption2.series[1].data = socketNum.price;
			    	 		dayChart2.setOption(dayOption2);
			    		};
			    	 	
			    	});
			    	//10天均线12秒循环
			    	stompClient.subscribe('/stock/avarageline10day.'+companyCodeRight, function (stockdata) { 
			    		var socketNum =  JSON.parse(JSON.parse(stockdata.body).content);
			    		if(!isNullOrEmpty(socketNum)){
			    			dayOption2.series[2].data = socketNum.price;
			    	 		dayChart2.setOption(dayOption2);
			    		};
			    	 	
			    	});
			    	//20天均线12秒循环
			    	stompClient.subscribe('/stock/avarageline20day.'+companyCodeRight, function (stockdata) { 
			    		var socketNum =  JSON.parse(JSON.parse(stockdata.body).content);
			    		if(!isNullOrEmpty(socketNum)){
			    			dayOption2.series[3].data = socketNum.price;
			    	 		dayChart2.setOption(dayOption2);
			    		};
			    	 	
			    	});
			    	//60天均线12秒循环
			    	stompClient.subscribe('/stock/avarageline60day.'+companyCodeRight, function (stockdata) { 
			    		var socketNum =  JSON.parse(JSON.parse(stockdata.body).content);
			    		if(!isNullOrEmpty(socketNum)){
			    			dayOption2.series[4].data = socketNum.price;
			    	 		dayChart2.setOption(dayOption2);
			    		};
			    	 	
			    	});
				}
				
				//周线图
				function weekConnect2(){
					//周线一次性
					stompClient.subscribe('/app/stock/klineweek.init.'+companyCodeRight, function (stockdata) { 
			    		var socketNum =  JSON.parse(JSON.parse(stockdata.body).content);
			    		if(!isNullOrEmpty(socketNum)){
			    			var weekArr = [];
			            	//k线图只支持数组包含4个值
			            	for (var i=0;i<socketNum.price.length;i++) {
			            		weekArr.push(socketNum.price[i].splice(0,4));
			            		weekLastRight.push(socketNum.price[i].pop());
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
			            	weekOption2.yAxis[0].min = Array.min(theMin)*(0.99);
			            	weekOption2.yAxis[0].max = Array.max(theMax)*(1.01);
			            	/*end*/
			        	 	weekOption2.xAxis[0].data = socketNum.day;
			        	 	barOptionWeek2.xAxis[0].data = socketNum.day;
			        	 	weekOption2.series[0].data = weekArr;
			        	 	weekOption2.series[0].name = "";//传入公司简称
			        	 	barOptionWeek2.series[0].data = socketNum.volumn;
			        	 	weekChart2.setOption(weekOption2);
			        	 	barChartWeek2.setOption(barOptionWeek2);
			        	 	weekChart2.connect([barChartWeek2]);
							barChartWeek2.connect([weekChart2]);
			    		}else{
			    			canvasNoData($(".canvas-most03s"));
			    		};
			    	}); 
			    	//周线12秒循环
					stompClient.subscribe('/stock/klineweek.'+companyCodeRight, function (stockdata) { 
			    		var socketNum =  JSON.parse(JSON.parse(stockdata.body).content);
			    		if(!isNullOrEmpty(socketNum)){
			    			var weekArr = [];
			            	//k线图只支持数组包含4个值
			            	for (var i=0;i<socketNum.price.length;i++) {
			            		weekArr.push(socketNum.price[i].splice(0,4));
			            		weekLastRight.push(socketNum.price[i].pop());
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
			            	weekOption2.yAxis[0].min = Array.min(theMin)*(0.99);
			            	weekOption2.yAxis[0].max = Array.max(theMax)*(1.01);
			            	/*end*/
			        	 	weekOption2.xAxis[0].data = socketNum.day;
			        	 	barOptionWeek2.xAxis[0].data = socketNum.day;
			        	 	weekOption2.series[0].data = weekArr;
			        	 	weekOption2.series[0].name = "";//传入公司简称
			        	 	barOptionWeek2.series[0].data = socketNum.volumn;
			        	 	weekChart2.setOption(weekOption2);
			        	 	barChartWeek2.setOption(barOptionWeek2);
			        	 	weekChart2.connect([barChartWeek2]);
							barChartWeek2.connect([weekChart2]);
			    		}else{
			    			canvasNoData($(".canvas-most03s"));
			    		};
			    	}); 
			    	//5周均线
			    	stompClient.subscribe('/app/stock/avarageline5week.init.'+companyCodeRight, function (stockdata) { 
			    		var socketNum =  JSON.parse(JSON.parse(stockdata.body).content);
			    		if(!isNullOrEmpty(socketNum)){
			    			weekOption2.series[1].data = socketNum.price;
			    	 		weekChart2.setOption(weekOption2);
			    		}
			    	 	
			    	});
			    	//10周均线
			    	stompClient.subscribe('/app/stock/avarageline10week.init.'+companyCodeRight, function (stockdata) { 
			    		var socketNum =  JSON.parse(JSON.parse(stockdata.body).content);
			    		if(!isNullOrEmpty(socketNum)){
			    			weekOption2.series[2].data = socketNum.price;
			    	 		weekChart2.setOption(weekOption2);
			    		}
			    	 	
			    	});
			    	//20周均线
			    	stompClient.subscribe('/app/stock/avarageline20week.init.'+companyCodeRight, function (stockdata) { 
			    		var socketNum =  JSON.parse(JSON.parse(stockdata.body).content);
			    		if(!isNullOrEmpty(socketNum)){
			    			weekOption2.series[3].data = socketNum.price;
			    	 		weekChart2.setOption(weekOption2);
			    		}
			    	 	
			    	});
			    	//60周均线
			    	stompClient.subscribe('/app/stock/avarageline60week.init.'+companyCodeRight, function (stockdata) { 
			    		var socketNum =  JSON.parse(JSON.parse(stockdata.body).content);
			    		if(!isNullOrEmpty(socketNum)){
			    			weekOption2.series[4].data = socketNum.price;
			    	 		weekChart2.setOption(weekOption2);
			    		}
			    	 	
			    	});
			    	//5周均线12秒循环
			    	stompClient.subscribe('/stock/avarageline5week.'+companyCodeRight, function (stockdata) { 
			    		var socketNum =  JSON.parse(JSON.parse(stockdata.body).content);
			    		if(!isNullOrEmpty(socketNum)){
			    			weekOption2.series[1].data = socketNum.price;
			    	 		weekChart2.setOption(weekOption2);
			    		}
			    	 	
			    	});
			    	//10周均线12秒循环
			    	stompClient.subscribe('/stock/avarageline10week.'+companyCodeRight, function (stockdata) { 
			    		var socketNum =  JSON.parse(JSON.parse(stockdata.body).content);
			    		if(!isNullOrEmpty(socketNum)){
			    			weekOption2.series[2].data = socketNum.price;
			    	 		weekChart2.setOption(weekOption2);
			    		}
			    	 	
			    	});
			    	//20周均线12秒循环
			    	stompClient.subscribe('/stock/avarageline20week.'+companyCodeRight, function (stockdata) { 
			    		var socketNum =  JSON.parse(JSON.parse(stockdata.body).content);
			    		if(!isNullOrEmpty(socketNum)){
			    			weekOption2.series[3].data = socketNum.price;
			    	 		weekChart2.setOption(weekOption2);
			    		}
			    	 	
			    	});
			    	//60周均线12秒循环
			    	stompClient.subscribe('/stock/avarageline60week.'+companyCodeRight, function (stockdata) { 
			    		var socketNum =  JSON.parse(JSON.parse(stockdata.body).content);
			    		if(!isNullOrEmpty(socketNum)){
			    			weekOption2.series[4].data = socketNum.price;
			    	 		weekChart2.setOption(weekOption2);
			    		}
			    	 	
			    	});
				};
				//月线图
				function monthConnect2(){
					//月线一次性
					stompClient.subscribe('/app/stock/klinemonth.init.'+companyCodeRight, function (stockdata) { 
			    		var socketNum =  JSON.parse(JSON.parse(stockdata.body).content);
			    		if(!isNullOrEmpty(socketNum)){
			    			var monthArr = [];
			            	//k线图只支持数组包含4个值
			            	for (var i=0;i<socketNum.price.length;i++) {
			            		monthArr.push(socketNum.price[i].splice(0,4));
			            		monthLastRight.push(socketNum.price[i].pop());
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
			            	monthOption2.yAxis[0].min = Array.min(theMin)*(0.99);
			            	monthOption2.yAxis[0].max = Array.max(theMax)*(1.01);
			            	/*自适应最大值和最小值---end*/
			            	
			        	 	monthOption2.xAxis[0].data = socketNum.day;
			        	 	barOptionMonth2.xAxis[0].data = socketNum.day;
			        	 	monthOption2.series[0].data = monthArr;
			        	 	monthOption2.series[0].name = "";//传入公司简称
			        	 	barOptionMonth2.series[0].data = socketNum.volumn;
			        	 	monthChart2.setOption(monthOption2);
			        	 	barChartMonth2.setOption(barOptionMonth2);
			        	 	monthChart2.connect([barChartMonth2]);
							barChartMonth2.connect([monthChart2]);
			    		}else{
			    			canvasNoData($(".canvas-most04s"));
			    		};
			        	
			    	});
			    	//月线12秒循环
					stompClient.subscribe('/stock/klinemonth.'+companyCodeRight, function (stockdata) { 
			    		var socketNum =  JSON.parse(JSON.parse(stockdata.body).content);
			    		if(!isNullOrEmpty(socketNum)){
			    			var monthArr = [];
			            	//k线图只支持数组包含4个值
			            	for (var i=0;i<socketNum.price.length;i++) {
			            		monthArr.push(socketNum.price[i].splice(0,4));
			            		monthLastRight.push(socketNum.price[i].pop());
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
			            	monthOption2.yAxis[0].min = Array.min(theMin)*(0.99);
			            	monthOption2.yAxis[0].max = Array.max(theMax)*(1.01);
			            	/*自适应最大值和最小值---end*/
			        	 	monthOption2.xAxis[0].data = socketNum.day;
			        	 	barOptionMonth2.xAxis[0].data = socketNum.day;
			        	 	monthOption2.series[0].data = monthArr;
			        	 	monthOption2.series[0].name = "";//传入公司简称
			        	 	barOptionMonth2.series[0].data = socketNum.volumn;
			        	 	monthChart2.setOption(monthOption2);
			        	 	barChartMonth2.setOption(barOptionMonth2);
			        	 	monthChart2.connect([barChartMonth2]);
							barChartMonth2.connect([monthChart2]);
			    		}else{
			    			canvasNoData($(".canvas-most04s"));
			    		};
			        	
			    	});
			    	//5月均线
			    	stompClient.subscribe('/app/stock/avarageline5month.init.'+companyCodeRight, function (stockdata) { 
			    		var socketNum =  JSON.parse(JSON.parse(stockdata.body).content);
			    		if(!isNullOrEmpty(socketNum)){
			    			monthOption2.series[1].data = socketNum.price;
			    	 		monthChart2.setOption(monthOption2);
			    		}
			    	 	
			    	});
			    	//10月均线
			    	stompClient.subscribe('/app/stock/avarageline10month.init.'+companyCodeRight, function (stockdata) { 
			    		var socketNum =  JSON.parse(JSON.parse(stockdata.body).content);
			    		if(!isNullOrEmpty(socketNum)){
			    			monthOption2.series[2].data = socketNum.price;
			    	 		monthChart2.setOption(monthOption2);
			    		}
			    	});
			    	//20月均线
			    	stompClient.subscribe('/app/stock/avarageline20month.init.'+companyCodeRight, function (stockdata) { 
			    		var socketNum =  JSON.parse(JSON.parse(stockdata.body).content);
			    		if(!isNullOrEmpty(socketNum)){
			    			monthOption2.series[3].data = socketNum.price;
			    	 		monthChart2.setOption(monthOption2);
			    		}
			    	});
			    	//60月均线
			    	stompClient.subscribe('/app/stock/avarageline60month.init.'+companyCodeRight, function (stockdata) { 
			    		var socketNum =  JSON.parse(JSON.parse(stockdata.body).content);
			    		if(!isNullOrEmpty(socketNum)){
			    			monthOption2.series[4].data = socketNum.price;
			    	 		monthChart2.setOption(monthOption2);
			    		}
			    	});
			    	//5月均线12秒循环
			    	stompClient.subscribe('/stock/avarageline5month.'+companyCodeRight, function (stockdata) { 
			    		var socketNum =  JSON.parse(JSON.parse(stockdata.body).content);
			    		if(!isNullOrEmpty(socketNum)){
			    			monthOption2.series[1].data = socketNum.price;
			    	 		monthChart2.setOption(monthOption2);
			    		}
			    	 	
			    	});
			    	//10月均线12秒循环
			    	stompClient.subscribe('/stock/avarageline10month.'+companyCodeRight, function (stockdata) { 
			    		var socketNum =  JSON.parse(JSON.parse(stockdata.body).content);
			    		if(!isNullOrEmpty(socketNum)){
			    			monthOption2.series[2].data = socketNum.price;
			    	 		monthChart2.setOption(monthOption2);
			    		}
			    	 	
			    	});
			    	//20月均线12秒循环
			    	stompClient.subscribe('/stock/avarageline20month.'+companyCodeRight, function (stockdata) { 
			    		var socketNum =  JSON.parse(JSON.parse(stockdata.body).content);
			    		if(!isNullOrEmpty(socketNum)){
			    			monthOption2.series[3].data = socketNum.price;
			    	 		monthChart2.setOption(monthOption2);
			    		}
			    	 	
			    	});
			    	//60月均线12秒循环
			    	stompClient.subscribe('/stock/avarageline60month.'+companyCodeRight, function (stockdata) { 
			    		var socketNum =  JSON.parse(JSON.parse(stockdata.body).content);
			    		if(!isNullOrEmpty(socketNum)){
			    			monthOption2.series[4].data = socketNum.price;
			    	 		monthChart2.setOption(monthOption2);
			    		}
			    	 	
			    	});
				};
				//季线图
				function quarterConnect2(){
					//季线一次性
					stompClient.subscribe('/app/stock/klinequarter.init.'+companyCodeRight, function (stockdata) { 
			    		var socketNum =  JSON.parse(JSON.parse(stockdata.body).content);
			    		if(!isNullOrEmpty(socketNum)){
			    			var quarterArr = [];
			            	//k线图只支持数组包含4个值
			            	for (var i=0;i<socketNum.price.length;i++) {
			            		quarterArr.push(socketNum.price[i].splice(0,4));
			            		quarterLastRight.push(socketNum.price[i].pop());
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
			            	quarterOption2.yAxis[0].min = Array.min(theMin)*(0.99);
			            	quarterOption2.yAxis[0].max = Array.max(theMax)*(1.01);
			            	/*自适应最大值和最小值---end*/
			        	 	quarterOption2.xAxis[0].data = socketNum.day;
			        	 	barOptionQuarter2.xAxis[0].data = socketNum.day;
			        	 	quarterOption2.series[0].data = quarterArr;
			        	 	quarterOption2.series[0].name = "";//传入公司简称
			        	 	barOptionQuarter2.series[0].data = socketNum.volumn;
			        	 	quarterChart2.setOption(quarterOption2);
			        	 	barChartQuarter2.setOption(barOptionQuarter2);
			        	 	quarterChart2.connect([barChartQuarter2]);
							barChartQuarter2.connect([quarterChart2]);
			    		}else{
			    			canvasNoData($(".canvas-most05s"));
			    		};
			        	
			    	});
			    	//季线12秒循环
					stompClient.subscribe('/app/stock/klinequarter.init.'+companyCodeRight, function (stockdata) { 
			    		var socketNum =  JSON.parse(JSON.parse(stockdata.body).content);
			    		if(!isNullOrEmpty(socketNum)){
			    			var quarterArr = [];
			            	//k线图只支持数组包含4个值
			            	for (var i=0;i<socketNum.price.length;i++) {
			            		quarterArr.push(socketNum.price[i].splice(0,4));
			            		quarterLastRight.push(socketNum.price[i].pop());
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
			            	quarterOption2.yAxis[0].min = Array.min(theMin)*(0.99);
			            	quarterOption2.yAxis[0].max = Array.max(theMax)*(1.01);
			            	/*自适应最大值和最小值---end*/
			        	 	quarterOption2.xAxis[0].data = socketNum.day;
			        	 	barOptionQuarter2.xAxis[0].data = socketNum.day;
			        	 	quarterOption2.series[0].data = quarterArr;
			        	 	quarterOption2.series[0].name = "";//传入公司简称
			        	 	barOptionQuarter2.series[0].data = socketNum.volumn;
			        	 	quarterChart2.setOption(quarterOption2);
			        	 	barChartQuarter2.setOption(barOptionQuarter2);
			        	 	quarterChart2.connect([barChartQuarter2]);
							barChartQuarter2.connect([quarterChart2]);
			    		}else{
			    			canvasNoData($(".canvas-most05s"));
			    		};
			        	
			    	});
			    	//5季均线
			    	stompClient.subscribe('/app/stock/avarageline5quarter.init.'+companyCodeRight, function (stockdata) { 
			    		var socketNum =  JSON.parse(JSON.parse(stockdata.body).content);
			    		if(!isNullOrEmpty(socketNum)){
			    			quarterOption2.series[1].data = socketNum.price;
			    	 		quarterChart2.setOption(quarterOption2);
			    		}
			    	 	
			    	});
			    	//10季均线
			    	stompClient.subscribe('/app/stock/avarageline10quarter.init.'+companyCodeRight, function (stockdata) { 
			    		var socketNum =  JSON.parse(JSON.parse(stockdata.body).content);
			    		if(!isNullOrEmpty(socketNum)){
			    			quarterOption2.series[2].data = socketNum.price;
			    	 		quarterChart2.setOption(quarterOption2);
			    		}
			    	 	
			    	});
			    	//20季均线
			    	stompClient.subscribe('/app/stock/avarageline20quarter.init.'+companyCodeRight, function (stockdata) { 
			    		var socketNum =  JSON.parse(JSON.parse(stockdata.body).content);
			    		if(!isNullOrEmpty(socketNum)){
			    			quarterOption2.series[3].data = socketNum.price;
			    	 		quarterChart2.setOption(quarterOption2);
			    		}
			    	 	
			    	});
			    	//60季均线
			    	stompClient.subscribe('/app/stock/avarageline60quarter.init.'+companyCodeRight, function (stockdata) { 
			    		var socketNum =  JSON.parse(JSON.parse(stockdata.body).content);
			    		if(!isNullOrEmpty(socketNum)){
			    			quarterOption2.series[4].data = socketNum.price;
			    	 		quarterChart2.setOption(quarterOption2);
			    		}
			    	 	
			    	});
			    	//5季均线12秒循环
			    	stompClient.subscribe('/stock/avarageline5quarter.'+companyCodeRight, function (stockdata) { 
			    		var socketNum =  JSON.parse(JSON.parse(stockdata.body).content);
			    		if(!isNullOrEmpty(socketNum)){
			    			quarterOption2.series[1].data = socketNum.price;
			    	 		quarterChart2.setOption(quarterOption2);
			    		}
			    	 	
			    	});
			    	//10季均线12秒循环
			    	stompClient.subscribe('/stock/avarageline10quarter.'+companyCodeRight, function (stockdata) { 
			    		var socketNum =  JSON.parse(JSON.parse(stockdata.body).content);
			    		if(!isNullOrEmpty(socketNum)){
			    			quarterOption2.series[2].data = socketNum.price;
			    	 		quarterChart2.setOption(quarterOption2);
			    		}
			    	 	
			    	});
			    	//20季均线12秒循环
			    	stompClient.subscribe('/stock/avarageline20quarter.'+companyCodeRight, function (stockdata) { 
			    		var socketNum =  JSON.parse(JSON.parse(stockdata.body).content);
			    		if(!isNullOrEmpty(socketNum)){
			    			quarterOption2.series[3].data = socketNum.price;
			    	 		quarterChart2.setOption(quarterOption2);
			    		}
			    	 	
			    	});
			    	//60季均线12秒循环
			    	stompClient.subscribe('/stock/avarageline60quarter.'+companyCodeRight, function (stockdata) { 
			    		var socketNum =  JSON.parse(JSON.parse(stockdata.body).content);
			    		if(!isNullOrEmpty(socketNum)){
			    			quarterOption2.series[4].data = socketNum.price;
			    	 		quarterChart2.setOption(quarterOption2);
			    		}
			    	 	
			    	});
				};
		

/***************************************333333333333333 start**********************************************************/			   
			    
				//实时行情折线图ipo
			    var option3 = {
			    	/*toolbox: {
				        show : true,
				        feature : {
				            saveAsImage : {
				            	show: true,
				            	name:"三板慧-三板做市",
				            	icon:'../../assets/admin/layout/img/saveAsPic.png',
				            	color:"transparent",
				            	
				            }
				        }
				    },*/
			    	noDataLoadingOption: {
	                    text: ' ',
	                    effect: function(params){
	                    	/*params.start = function(h){
	                    		h._bgDom.style.background = "transparent";
	                    		h._bgDom.style.opacity = 0;
	                    	}
	                    	params.stop = function(h){
	                    		h._bgDom.style.background = "transparent";
	                    		h._bgDom.style.opacity = 0;
	                    	}
	                    	return params;*/
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
				    	x: 70,
				        y: 40,
				        x2:80,
				        y2:30,
				        height:"70%",
				        width:"75%"
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
				            		var vaRt = value.toString();
				            		if(yesTdayNum3 <= 1.11){//小于1.11的90%,小于1.00;保留四位小数
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
					            		/*if(Math.abs(av - yesTdayNum3) <= 0.01 ){
				            				av = yesTdayNum3.toFixed(2);
				            			}*/
				            		}
				            		
				            		if(av == 0){
				            			av = 0;
				            		}
				            		return av;
				            	},
				            	textStyle:{
				            		color:function(value){
				            			var vaRt = value.toString();
					            		if(yesTdayNum3 <= 1.11){//小于1.11的90%,小于1.00;保留四位小数
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
						            		/*if(Math.abs(av - yesTdayNum3) <= 0.01 ){
					            				av = yesTdayNum3.toFixed(2);
					            			}*/
					            		}
				            			if(av < yesTdayNum3){
				            				return "#06b042";
				            			}else if(av > yesTdayNum3){
				            				return "#f24957";
				            			}else{
				            				return "#333333";
				            			}
				            		}
				            	}
				            },
				            boundaryGap:[0,0.1],
				            splitNumber:6,
				            min:0,//默认最低为0
				            max:5
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
			    //实时行情柱形图left
			   	var barOption3 = {
			   		toolbox: {
			   			y:-50,
				        show : true,
				        feature : {
				            saveAsImage : {
				            	show: true
				            }
				        }
				    },
			        tooltip: {
			            show: true,
			            trigger: 'axis'
			        },
			        legend: {
			            data:[]
			        },
			        grid: {
			        	borderWidth:0,
				        x:70,
				        y:10,
				        x2:80,
				        y2:40,
				        height:"80%",
				        width:"75%"
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
			    //日线柱形图left
			    var barOptionDay3 = {
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
				        x: 70,
				        y:10,
				        x2:80,
				        y2:40,
				        height:"80%",
				        width:"82%"
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
			   	//周线柱形图left
			   	var barOptionWeek3 = {
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
				        x: 70,
				        y:10,
				        x2:80,
				        y2:40,
				        height:"80%",
				        width:"82%"
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
			   	//月线柱形图left
			   	var barOptionMonth3 = {
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
				        x: 70,
				        y:10,
				        x2:80,
				        y2:40,
				        height:"80%",
				        width:"82%"
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
			   	//季线柱形图left
			   	var barOptionQuarter3 = {
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
				        x: 70,
				        y:10,
				        x2:80,
				        y2:40,
				        height:"80%",
				        width:"82%"
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
			    //日线图left
			    var dayOption3 = {
				    title : {
				        text: ''
				    },
				    tooltip : {
				        trigger: 'axis',
				        formatter: function (params) {
				        	var dataIndex = params[0].dataIndex
				            var res = params[0].name + '<br/>' + params[0].seriesName;
				            var allPrice = '';
				            for (var i=0;i<dayLast3.length;i++) {
				            	if(i == dataIndex){
				            		allPrice = dayLast3[i];
				            	}
				            }
				            res += '<br/>  开盘 : ' + getFloatStr(params[0].value[0]) + '  最高 : ' + getFloatStr(params[0].value[3]);
				            res += '<br/>  收盘 : ' + getFloatStr(params[0].value[1]) + '  最低 : ' + getFloatStr(params[0].value[2]);
				            res += '<br/>  成交金额(万) : ' + getFloatStr(allPrice);
				            return res;
				        }
				    },
				    grid:{
				    	x: 70,
				        y: 40,
				        x2:80,
				        y2:30,
				        height:"70%",
				        width:"82%"
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
			    //周线图left
			    var weekOption3 = {
			    	
				    title : {
				        text: ''
				    },
				    tooltip : {
				        trigger: 'axis',
				        formatter: function (params) {
				        	var dataIndex = params[0].dataIndex
				            var res = params[0].name + '<br/>' + params[0].seriesName;
				            var allPrice = '';
				            for (var i=0;i<weekLast3.length;i++) {
				            	if(i == dataIndex){
				            		allPrice = weekLast3[i];
				            	}
				            }
				            res += '<br/>  开盘 : ' + getFloatStr(params[0].value[0]) + '  最高 : ' + getFloatStr(params[0].value[3]);
				            res += '<br/>  收盘 : ' + getFloatStr(params[0].value[1]) + '  最低 : ' + getFloatStr(params[0].value[2]);
				            res += '<br/>  成交金额(万) : ' + getFloatStr(allPrice);
				            return res;
				        }
				    },
				    grid:{
				    	x: 70,
				        y: 40,
				        x2:80,
				        y2:30,
				        height:"70%",
				        width:"82%"
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
			    //月线图left
			    var monthOption3 = {
				    title : {
				        text: ''
				    },
				    tooltip : {
				        trigger: 'axis',
				        formatter: function (params) {
				        	var dataIndex = params[0].dataIndex
				            var res = params[0].name + '<br/>' + params[0].seriesName;
				            var allPrice = '';
				            for (var i=0;i<monthLast3.length;i++) {
				            	if(i == dataIndex){
				            		allPrice = monthLast3[i];
				            	}
				            }
				            res += '<br/>  开盘 : ' + getFloatStr(params[0].value[0]) + '  最高 : ' + getFloatStr(params[0].value[3]);
				            res += '<br/>  收盘 : ' + getFloatStr(params[0].value[1]) + '  最低 : ' + getFloatStr(params[0].value[2]);
				            res += '<br/>  成交金额(万) : ' + allPrice;
				            return res;
				        }
				    },
				    grid:{
				    	x: 70,
				        y: 40,
				        x2:80,
				        y2:30,
				        height:"70%",
				        width:"82%"
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
			    //季线图left
			    var quarterOption3 = {
			    	
				    title : {
				        text: ''
				    },
				    tooltip : {
				        trigger: 'axis',
				        formatter: function (params) {
				        	var dataIndex = params[0].dataIndex
				            var res = params[0].name + '<br/>' + params[0].seriesName;
				            var allPrice = '';
				            for (var i=0;i<quarterLast3.length;i++) {
				            	if(i == dataIndex){
				            		allPrice = quarterLast3[i];
				            	}
				            }
				            res += '<br/>  开盘 : ' + getFloatStr(params[0].value[0]) + '  最高 : ' + getFloatStr(params[0].value[3]);
				            res += '<br/>  收盘 : ' + getFloatStr(params[0].value[1]) + '  最低 : ' + getFloatStr(params[0].value[2]);
				            res += '<br/>  成交金额(万) : ' + getFloatStr(allPrice);
				            return res;
				        }
				    },
				    grid:{
				    	x: 70,
				        y: 40,
				        x2:80,
				        y2:30,
				        height:"70%",
				        width:"82%"
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
				var dayLast3 = [];//日k线图成交金额
				var weekLast3 = [];//周k线图成交金额
				var monthLast3 = [];//月k线图成交金额
				var quarterLast3 = [];//季k线图成交金额
				var listMode = "";
				var _flg = true;
				var _pageNum = 0;
				var yesTdayNum3 = '';
				var companyCode3 = 'NIPO';
				//日线图
				function dayConnect3(){
					//日线一次性
			    	stompClient.subscribe('/app/stock/klineday.init.'+companyCode3, function (stockdata) { 
			    		var socketNum =  JSON.parse(JSON.parse(stockdata.body).content);
			    		if(!isNullOrEmpty(socketNum)){
			    			var priceArr = [];
			            	//k线图只支持数组包含4个值
			            	for (var i=0;i<socketNum.price.length;i++) {
			            		priceArr.push(socketNum.price[i].splice(0,4));//echart规定4个值
			            		dayLast3.push(socketNum.price[i].pop());//数组最后的总量
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
			            	dayOption3.yAxis[0].min = Array.min(theMin)*(0.99);
			            	dayOption3.yAxis[0].max = Array.max(theMax)*(1.01);
			            	/*end*/
			        	 	dayOption3.xAxis[0].data = socketNum.day;//X轴日期刻度
			        	 	barOptionDay3.xAxis[0].data = socketNum.day;
			        	 	dayOption3.series[0].data = priceArr;//划线
			        	 	dayOption3.series[0].name = "";//传入公司简称
			        	 	barOptionDay3.series[0].data = socketNum.volumn;
			        	 	dayChart3.setOption(dayOption3);
			        	 	barChartDay3.setOption(barOptionDay3);
			        	 	dayChart3.connect([barChartDay3]);
							barChartDay3.connect([dayChart3]);
			    		}else{
			    			canvasNoData($(".canvas-most02ipo"));
			    		};
			        	
			    	});
			    	//日线12秒循环
			    	stompClient.subscribe('/stock/klineday.'+companyCode3, function (stockdata) { 
			    		var socketNum =  JSON.parse(JSON.parse(stockdata.body).content);
			    		if(!isNullOrEmpty(socketNum)){
			    			var priceArr = [];
			            	//k线图只支持数组包含4个值
			            	for (var i=0;i<socketNum.price.length;i++) {
			            		priceArr.push(socketNum.price[i].splice(0,4));//echart规定4个值
			            		dayLast3.push(socketNum.price[i].pop());//数组最后的总量
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
			            	dayOption3.yAxis[0].min = Array.min(theMin)*(0.99);
			            	dayOption3.yAxis[0].max = Array.max(theMax)*(1.01);
			            	/*end*/
			        	 	dayOption3.xAxis[0].data = socketNum.day;//X轴日期刻度
			        	 	barOptionDay3.xAxis[0].data = socketNum.day;
			        	 	dayOption3.series[0].data = priceArr;//划线
			        	 	dayOption3.series[0].name = "";//传入公司简称
			        	 	barOptionDay3.series[0].data = socketNum.volumn;
			        	 	dayChart3.setOption(dayOption3);
			        	 	barChartDay3.setOption(barOptionDay3);
			        	 	dayChart3.connect([barChartDay3]);
							barChartDay3.connect([dayChart3]);
			    		}else{
			    			canvasNoData($(".canvas-most02ipo"));
			    		};
			        	
			    	});
			    	//5天均线
			    	stompClient.subscribe('/app/stock/avarageline5day.init.'+companyCode3, function (stockdata) { 
			    		var socketNum =  JSON.parse(JSON.parse(stockdata.body).content);
			    		if(!isNullOrEmpty(socketNum)){
			    			dayOption3.series[1].data = socketNum.price;
			    	 		dayChart3.setOption(dayOption3);
			    		}
			    	 	
			    	});
			    	//10天均线
			    	stompClient.subscribe('/app/stock/avarageline10day.init.'+companyCode3, function (stockdata) { 
			    		var socketNum =  JSON.parse(JSON.parse(stockdata.body).content);
			    		if(!isNullOrEmpty(socketNum)){
			    			dayOption3.series[2].data = socketNum.price;
			    	 		dayChart3.setOption(dayOption3);
			    		};
			    	 	
			    	});
			    	//20天均线
			    	stompClient.subscribe('/app/stock/avarageline20day.init.'+companyCode3, function (stockdata) { 
			    		var socketNum =  JSON.parse(JSON.parse(stockdata.body).content);
			    		if(!isNullOrEmpty(socketNum)){
			    			dayOption3.series[3].data = socketNum.price;
			    	 		dayChart3.setOption(dayOption3);
			    		}
			    	 	
			    	});
			    	//60天均线
			    	stompClient.subscribe('/app/stock/avarageline60day.init.'+companyCode3, function (stockdata) { 
			    		var socketNum =  JSON.parse(JSON.parse(stockdata.body).content);
			    		if(!isNullOrEmpty(socketNum)){
			    			dayOption3.series[4].data = socketNum.price;
			    	 		dayChart3.setOption(dayOption3);
			    		};
			    	 	
			    	});
			    	//5天均线12秒循环
			    	stompClient.subscribe('/stock/avarageline5day.'+companyCode3, function (stockdata) { 
			    		var socketNum =  JSON.parse(JSON.parse(stockdata.body).content);
			    		if(!isNullOrEmpty(socketNum)){
			    			dayOption3.series[1].data = socketNum.price;
			    	 		dayChart3.setOption(dayOption3);
			    		};
			    	 	
			    	});
			    	//10天均线12秒循环
			    	stompClient.subscribe('/stock/avarageline10day.'+companyCode3, function (stockdata) { 
			    		var socketNum =  JSON.parse(JSON.parse(stockdata.body).content);
			    		if(!isNullOrEmpty(socketNum)){
			    			dayOption3.series[2].data = socketNum.price;
			    	 		dayChart3.setOption(dayOption3);
			    		};
			    	 	
			    	});
			    	//20天均线12秒循环
			    	stompClient.subscribe('/stock/avarageline20day.'+companyCode3, function (stockdata) { 
			    		var socketNum =  JSON.parse(JSON.parse(stockdata.body).content);
			    		if(!isNullOrEmpty(socketNum)){
			    			dayOption3.series[3].data = socketNum.price;
			    	 		dayChart3.setOption(dayOption3);
			    		};
			    	 	
			    	});
			    	//60天均线12秒循环
			    	stompClient.subscribe('/stock/avarageline60day.'+companyCode3, function (stockdata) { 
			    		var socketNum =  JSON.parse(JSON.parse(stockdata.body).content);
			    		if(!isNullOrEmpty(socketNum)){
			    			dayOption3.series[4].data = socketNum.price;
			    	 		dayChart3.setOption(dayOption3);
			    		};
			    	 	
			    	});
				}
				//周线图
				function weekConnect3(){
					//周线一次性
					stompClient.subscribe('/app/stock/klineweek.init.'+companyCode3, function (stockdata) { 
			    		var socketNum =  JSON.parse(JSON.parse(stockdata.body).content);
			    		if(!isNullOrEmpty(socketNum)){
			    			var weekArr = [];
			            	//k线图只支持数组包含4个值
			            	for (var i=0;i<socketNum.price.length;i++) {
			            		weekArr.push(socketNum.price[i].splice(0,4));
			            		weekLast3.push(socketNum.price[i].pop());
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
			            	weekOption3.yAxis[0].min = Array.min(theMin)*(0.99);
			            	weekOption3.yAxis[0].max = Array.max(theMax)*(1.01);
			            	/*end*/
			        	 	weekOption3.xAxis[0].data = socketNum.day;
			        	 	barOptionWeek3.xAxis[0].data = socketNum.day;
			        	 	weekOption3.series[0].data = weekArr;
			        	 	weekOption3.series[0].name = "";//传入公司简称
			        	 	barOptionWeek3.series[0].data = socketNum.volumn;
			        	 	weekChart3.setOption(weekOption3);
			        	 	barChartWeek3.setOption(barOptionWeek3);
			        	 	weekChart3.connect([barChartWeek3]);
							barChartWeek3.connect([weekChart3]);
			    		}else{
			    			canvasNoData($(".canvas-most03ipo"));
			    		};
			    	}); 
			    	//周线12秒循环
					stompClient.subscribe('/stock/klineweek.'+companyCode3, function (stockdata) { 
			    		var socketNum =  JSON.parse(JSON.parse(stockdata.body).content);
			    		if(!isNullOrEmpty(socketNum)){
			    			var weekArr = [];
			            	//k线图只支持数组包含4个值
			            	for (var i=0;i<socketNum.price.length;i++) {
			            		weekArr.push(socketNum.price[i].splice(0,4));
			            		weekLast3.push(socketNum.price[i].pop());
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
			            	weekOption3.yAxis[0].min = Array.min(theMin)*(0.99);
			            	weekOption3.yAxis[0].max = Array.max(theMax)*(1.01);
			            	/*end*/
			        	 	weekOption3.xAxis[0].data = socketNum.day;
			        	 	barOptionWeek3.xAxis[0].data = socketNum.day;
			        	 	weekOption3.series[0].data = weekArr;
			        	 	weekOption3.series[0].name = "";//传入公司简称
			        	 	barOptionWeek3.series[0].data = socketNum.volumn;
			        	 	weekChart3.setOption(weekOption3);
			        	 	barChartWeek3.setOption(barOptionWeek3);
			        	 	weekChart3.connect([barChartWeek3]);
							barChartWeek3.connect([weekChart3]);
			    		}else{
			    			canvasNoData($(".canvas-most03ipo"));
			    		};
			    	}); 
			    	//5周均线
			    	stompClient.subscribe('/app/stock/avarageline5week.init.'+companyCode3, function (stockdata) { 
			    		var socketNum =  JSON.parse(JSON.parse(stockdata.body).content);
			    		if(!isNullOrEmpty(socketNum)){
			    			weekOption3.series[1].data = socketNum.price;
			    	 		weekChart3.setOption(weekOption3);
			    		}
			    	 	
			    	});
			    	//10周均线
			    	stompClient.subscribe('/app/stock/avarageline10week.init.'+companyCode3, function (stockdata) { 
			    		var socketNum =  JSON.parse(JSON.parse(stockdata.body).content);
			    		if(!isNullOrEmpty(socketNum)){
			    			weekOption3.series[2].data = socketNum.price;
			    	 		weekChart3.setOption(weekOption3);
			    		}
			    	 	
			    	});
			    	//20周均线
			    	stompClient.subscribe('/app/stock/avarageline20week.init.'+companyCode3, function (stockdata) { 
			    		var socketNum =  JSON.parse(JSON.parse(stockdata.body).content);
			    		if(!isNullOrEmpty(socketNum)){
			    			weekOption3.series[3].data = socketNum.price;
			    	 		weekChart3.setOption(weekOption3);
			    		}
			    	 	
			    	});
			    	//60周均线
			    	stompClient.subscribe('/app/stock/avarageline60week.init.'+companyCode3, function (stockdata) { 
			    		var socketNum =  JSON.parse(JSON.parse(stockdata.body).content);
			    		if(!isNullOrEmpty(socketNum)){
			    			weekOption3.series[4].data = socketNum.price;
			    	 		weekChart3.setOption(weekOption3);
			    		}
			    	 	
			    	});
			    	//5周均线12秒循环
			    	stompClient.subscribe('/stock/avarageline5week.'+companyCode3, function (stockdata) { 
			    		var socketNum =  JSON.parse(JSON.parse(stockdata.body).content);
			    		if(!isNullOrEmpty(socketNum)){
			    			weekOption3.series[1].data = socketNum.price;
			    	 		weekChart3.setOption(weekOption3);
			    		}
			    	 	
			    	});
			    	//10周均线12秒循环
			    	stompClient.subscribe('/stock/avarageline10week.'+companyCode3, function (stockdata) { 
			    		var socketNum =  JSON.parse(JSON.parse(stockdata.body).content);
			    		if(!isNullOrEmpty(socketNum)){
			    			weekOption3.series[2].data = socketNum.price;
			    	 		weekChart3.setOption(weekOption3);
			    		}
			    	 	
			    	});
			    	//20周均线12秒循环
			    	stompClient.subscribe('/stock/avarageline20week.'+companyCode3, function (stockdata) { 
			    		var socketNum =  JSON.parse(JSON.parse(stockdata.body).content);
			    		if(!isNullOrEmpty(socketNum)){
			    			weekOption3.series[3].data = socketNum.price;
			    	 		weekChart3.setOption(weekOption3);
			    		}
			    	 	
			    	});
			    	//60周均线12秒循环
			    	stompClient.subscribe('/stock/avarageline60week.'+companyCode3, function (stockdata) { 
			    		var socketNum =  JSON.parse(JSON.parse(stockdata.body).content);
			    		if(!isNullOrEmpty(socketNum)){
			    			weekOption3.series[4].data = socketNum.price;
			    	 		weekChart3.setOption(weekOption3);
			    		}
			    	 	
			    	});
				};
				//月线图
				function monthConnect3(){
					//月线一次性
					stompClient.subscribe('/app/stock/klinemonth.init.'+companyCode3, function (stockdata) { 
			    		var socketNum =  JSON.parse(JSON.parse(stockdata.body).content);
			    		if(!isNullOrEmpty(socketNum)){
			    			var monthArr = [];
			            	//k线图只支持数组包含4个值
			            	for (var i=0;i<socketNum.price.length;i++) {
			            		monthArr.push(socketNum.price[i].splice(0,4));
			            		monthLast3.push(socketNum.price[i].pop());
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
			            	monthOption3.yAxis[0].min = Array.min(theMin)*(0.99);
			            	monthOption3.yAxis[0].max = Array.max(theMax)*(1.01);
			            	/*自适应最大值和最小值---end*/
			            	
			        	 	monthOption3.xAxis[0].data = socketNum.day;
			        	 	barOptionMonth3.xAxis[0].data = socketNum.day;
			        	 	monthOption3.series[0].data = monthArr;
			        	 	monthOption3.series[0].name = "";//传入公司简称
			        	 	barOptionMonth3.series[0].data = socketNum.volumn;
			        	 	monthChart3.setOption(monthOption3);
			        	 	barChartMonth3.setOption(barOptionMonth3);
			        	 	monthChart3.connect([barChartMonth3]);
							barChartMonth3.connect([monthChart3]);
			    		}else{
			    			canvasNoData($(".canvas-most04ipo"));
			    		};
			        	
			    	});
			    	//月线12秒循环
					stompClient.subscribe('/stock/klinemonth.'+companyCode3, function (stockdata) { 
			    		var socketNum =  JSON.parse(JSON.parse(stockdata.body).content);
			    		if(!isNullOrEmpty(socketNum)){
			    			var monthArr = [];
			            	//k线图只支持数组包含4个值
			            	for (var i=0;i<socketNum.price.length;i++) {
			            		monthArr.push(socketNum.price[i].splice(0,4));
			            		monthLast3.push(socketNum.price[i].pop());
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
			            	monthOption3.yAxis[0].min = Array.min(theMin)*(0.99);
			            	monthOption3.yAxis[0].max = Array.max(theMax)*(1.01);
			            	/*自适应最大值和最小值---end*/
			        	 	monthOption3.xAxis[0].data = socketNum.day;
			        	 	barOptionMonth3.xAxis[0].data = socketNum.day;
			        	 	monthOption3.series[0].data = monthArr;
			        	 	monthOption3.series[0].name = "";//传入公司简称
			        	 	barOptionMonth3.series[0].data = socketNum.volumn;
			        	 	monthChart3.setOption(monthOption3);
			        	 	barChartMonth3.setOption(barOptionMonth3);
			        	 	monthChart3.connect([barChartMonth3]);
							barChartMonth3.connect([monthChart3]);
			    		}else{
			    			canvasNoData($(".canvas-most04ipo"));
			    		};
			        	
			    	});
			    	//5月均线
			    	stompClient.subscribe('/app/stock/avarageline5month.init.'+companyCode3, function (stockdata) { 
			    		var socketNum =  JSON.parse(JSON.parse(stockdata.body).content);
			    		if(!isNullOrEmpty(socketNum)){
			    			monthOption3.series[1].data = socketNum.price;
			    	 		monthChart3.setOption(monthOption3);
			    		}
			    	 	
			    	});
			    	//10月均线
			    	stompClient.subscribe('/app/stock/avarageline10month.init.'+companyCode3, function (stockdata) { 
			    		var socketNum =  JSON.parse(JSON.parse(stockdata.body).content);
			    		if(!isNullOrEmpty(socketNum)){
			    			monthOption3.series[2].data = socketNum.price;
			    	 		monthChart3.setOption(monthOption3);
			    		}
			    	});
			    	//20月均线
			    	stompClient.subscribe('/app/stock/avarageline20month.init.'+companyCode3, function (stockdata) { 
			    		var socketNum =  JSON.parse(JSON.parse(stockdata.body).content);
			    		if(!isNullOrEmpty(socketNum)){
			    			monthOption3.series[3].data = socketNum.price;
			    	 		monthChart3.setOption(monthOption3);
			    		}
			    	});
			    	//60月均线
			    	stompClient.subscribe('/app/stock/avarageline60month.init.'+companyCode3, function (stockdata) { 
			    		var socketNum =  JSON.parse(JSON.parse(stockdata.body).content);
			    		if(!isNullOrEmpty(socketNum)){
			    			monthOption3.series[4].data = socketNum.price;
			    	 		monthChart3.setOption(monthOption3);
			    		}
			    	});
			    	//5月均线12秒循环
			    	stompClient.subscribe('/stock/avarageline5month.'+companyCode3, function (stockdata) { 
			    		var socketNum =  JSON.parse(JSON.parse(stockdata.body).content);
			    		if(!isNullOrEmpty(socketNum)){
			    			monthOption3.series[1].data = socketNum.price;
			    	 		monthChart3.setOption(monthOption3);
			    		}
			    	 	
			    	});
			    	//10月均线12秒循环
			    	stompClient.subscribe('/stock/avarageline10month.'+companyCode3, function (stockdata) { 
			    		var socketNum =  JSON.parse(JSON.parse(stockdata.body).content);
			    		if(!isNullOrEmpty(socketNum)){
			    			monthOption3.series[2].data = socketNum.price;
			    	 		monthChart3.setOption(monthOption3);
			    		}
			    	 	
			    	});
			    	//20月均线12秒循环
			    	stompClient.subscribe('/stock/avarageline20month.'+companyCode3, function (stockdata) { 
			    		var socketNum =  JSON.parse(JSON.parse(stockdata.body).content);
			    		if(!isNullOrEmpty(socketNum)){
			    			monthOption3.series[3].data = socketNum.price;
			    	 		monthChart3.setOption(monthOption3);
			    		}
			    	 	
			    	});
			    	//60月均线12秒循环
			    	stompClient.subscribe('/stock/avarageline60month.'+companyCode3, function (stockdata) { 
			    		var socketNum =  JSON.parse(JSON.parse(stockdata.body).content);
			    		if(!isNullOrEmpty(socketNum)){
			    			monthOption3.series[4].data = socketNum.price;
			    	 		monthChart3.setOption(monthOption3);
			    		}
			    	 	
			    	});
				};
				//季线图
				function quarterConnect3(){
					//季线一次性
					stompClient.subscribe('/app/stock/klinequarter.init.'+companyCode3, function (stockdata) { 
			    		var socketNum =  JSON.parse(JSON.parse(stockdata.body).content);
			    		if(!isNullOrEmpty(socketNum)){
			    			var quarterArr = [];
			            	//k线图只支持数组包含4个值
			            	for (var i=0;i<socketNum.price.length;i++) {
			            		quarterArr.push(socketNum.price[i].splice(0,4));
			            		quarterLast3.push(socketNum.price[i].pop());
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
			            	quarterOption3.yAxis[0].min = Array.min(theMin)*(0.99);
			            	quarterOption3.yAxis[0].max = Array.max(theMax)*(1.01);
			            	/*自适应最大值和最小值---end*/
			        	 	quarterOption3.xAxis[0].data = socketNum.day;
			        	 	barOptionQuarter3.xAxis[0].data = socketNum.day;
			        	 	quarterOption3.series[0].data = quarterArr;
			        	 	quarterOption3.series[0].name = "";//传入公司简称
			        	 	barOptionQuarter3.series[0].data = socketNum.volumn;
			        	 	quarterChart3.setOption(quarterOption3);
			        	 	barChartQuarter3.setOption(barOptionQuarter3);
			        	 	quarterChart3.connect([barChartQuarter3]);
							barChartQuarter3.connect([quarterChart3]);
			    		}else{
			    			canvasNoData($(".canvas-most05ipo"));
			    		};
			        	
			    	});
			    	//季线12秒循环
					stompClient.subscribe('/app/stock/klinequarter.init.'+companyCode3, function (stockdata) { 
			    		var socketNum =  JSON.parse(JSON.parse(stockdata.body).content);
			    		if(!isNullOrEmpty(socketNum)){
			    			var quarterArr = [];
			            	//k线图只支持数组包含4个值
			            	for (var i=0;i<socketNum.price.length;i++) {
			            		quarterArr.push(socketNum.price[i].splice(0,4));
			            		quarterLast3.push(socketNum.price[i].pop());
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
			            	quarterOption3.yAxis[0].min = Array.min(theMin)*(0.99);
			            	quarterOption3.yAxis[0].max = Array.max(theMax)*(1.01);
			            	/*自适应最大值和最小值---end*/
			        	 	quarterOption3.xAxis[0].data = socketNum.day;
			        	 	barOptionQuarter3.xAxis[0].data = socketNum.day;
			        	 	quarterOption3.series[0].data = quarterArr;
			        	 	quarterOption3.series[0].name = "";//传入公司简称
			        	 	barOptionQuarter3.series[0].data = socketNum.volumn;
			        	 	quarterChart3.setOption(quarterOption3);
			        	 	barChartQuarter3.setOption(barOptionQuarter3);
			        	 	quarterChart3.connect([barChartQuarter3]);
							barChartQuarter3.connect([quarterChart3]);
			    		}else{
			    			canvasNoData($(".canvas-most05ipo"));
			    		};
			        	
			    	});
			    	//5季均线
			    	stompClient.subscribe('/app/stock/avarageline5quarter.init.'+companyCode3, function (stockdata) { 
			    		var socketNum =  JSON.parse(JSON.parse(stockdata.body).content);
			    		if(!isNullOrEmpty(socketNum)){
			    			quarterOption3.series[1].data = socketNum.price;
			    	 		quarterChart3.setOption(quarterOption3);
			    		}
			    	 	
			    	});
			    	//10季均线
			    	stompClient.subscribe('/app/stock/avarageline10quarter.init.'+companyCode3, function (stockdata) { 
			    		var socketNum =  JSON.parse(JSON.parse(stockdata.body).content);
			    		if(!isNullOrEmpty(socketNum)){
			    			quarterOption3.series[2].data = socketNum.price;
			    	 		quarterChart3.setOption(quarterOption3);
			    		}
			    	 	
			    	});
			    	//20季均线
			    	stompClient.subscribe('/app/stock/avarageline20quarter.init.'+companyCode3, function (stockdata) { 
			    		var socketNum =  JSON.parse(JSON.parse(stockdata.body).content);
			    		if(!isNullOrEmpty(socketNum)){
			    			quarterOption3.series[3].data = socketNum.price;
			    	 		quarterChart3.setOption(quarterOption3);
			    		}
			    	 	
			    	});
			    	//60季均线
			    	stompClient.subscribe('/app/stock/avarageline60quarter.init.'+companyCode3, function (stockdata) { 
			    		var socketNum =  JSON.parse(JSON.parse(stockdata.body).content);
			    		if(!isNullOrEmpty(socketNum)){
			    			quarterOption3.series[4].data = socketNum.price;
			    	 		quarterChart3.setOption(quarterOption3);
			    		}
			    	 	
			    	});
			    	//5季均线12秒循环
			    	stompClient.subscribe('/stock/avarageline5quarter.'+companyCode3, function (stockdata) { 
			    		var socketNum =  JSON.parse(JSON.parse(stockdata.body).content);
			    		if(!isNullOrEmpty(socketNum)){
			    			quarterOption3.series[1].data = socketNum.price;
			    	 		quarterChart3.setOption(quarterOption3);
			    		}
			    	 	
			    	});
			    	//10季均线12秒循环
			    	stompClient.subscribe('/stock/avarageline10quarter.'+companyCode3, function (stockdata) { 
			    		var socketNum =  JSON.parse(JSON.parse(stockdata.body).content);
			    		if(!isNullOrEmpty(socketNum)){
			    			quarterOption3.series[2].data = socketNum.price;
			    	 		quarterChart3.setOption(quarterOption3);
			    		}
			    	 	
			    	});
			    	//20季均线12秒循环
			    	stompClient.subscribe('/stock/avarageline20quarter.'+companyCode3, function (stockdata) { 
			    		var socketNum =  JSON.parse(JSON.parse(stockdata.body).content);
			    		if(!isNullOrEmpty(socketNum)){
			    			quarterOption3.series[3].data = socketNum.price;
			    	 		quarterChart3.setOption(quarterOption3);
			    		}
			    	 	
			    	});
			    	//60季均线12秒循环
			    	stompClient.subscribe('/stock/avarageline60quarter.'+companyCode3, function (stockdata) { 
			    		var socketNum =  JSON.parse(JSON.parse(stockdata.body).content);
			    		if(!isNullOrEmpty(socketNum)){
			    			quarterOption3.series[4].data = socketNum.price;
			    	 		quarterChart3.setOption(quarterOption3);
			    		}
			    	 	
			    	});
				};
			    
			    
/*****************************************3333333333333333333  end ************************************************/				    
			    
			    
			    
			    
			    
			    
			    
			    
			    
			    
			    
			    
			    
			    
			    
			    
/**********************************************************************************************************88*/
	            var optionPie = {
	            	calculable : false,
	                tooltip: {
	                    show: true,
	                    formatter: "{a} <br/>{b} : {c} ({d}%)"
	                },
	                toolbox: {
				        show : true,
				        feature : {
				            saveAsImage : {
				            	show: true,
				            	name:"三板慧-成交家数",
				            	icon:'../../assets/admin/layout/img/saveAsPic.png',
				            	color:"#f57d4b",
				            	
				            }
				        }
				    },
	                legend: {
	                    orient: 'vertical',
	                    x: 'left',
	                    data: ['平盘', '上涨','下跌'],
	                    textStyle:{
	                    	fontFamily:"微软雅黑"
	                    }
	                },
	                
	                series: [
	                    {
	                        name: '涨跌分布',
	                        type: 'pie',
	                        center: ['55%', 105],
	                        radius: 50,
	                        itemStyle: {
	                            normal: {
	                                label: {
	                                    position: 'inner',
	                                    formatter: function (params) {
	                                        return (params.percent - 0).toFixed(0) + '%'
	                                    },
	                                    textStyle:{
	                                    	fontFamily:"微软雅黑"
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
	                        name: '涨跌分布',
	                        type: 'pie',
	                        center: ['55%', 105],
	                        radius: [60, 80],
	                        itemStyle:{
	                        	normal:{
	                        		label:{
	                        			show:false
	                        		},
	                        		 labelLine: {
	                                    show: false
	                                }
	                        	}
	                        },
	                        data: [
	                        ]
	                    }
	                ]
	            };
	           
				var optionPie2 = {
					calculable : false,
					toolbox: {
				        show : true,
				        feature : {
				            saveAsImage : {
				            	show: true,
				            	name:"三板慧-市场层级",
				            	icon:'../../assets/admin/layout/img/saveAsPic.png',
				            	color:"#f57d4b",
				            	
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
	                    data: ['基础层', '创新层'],
	                    textStyle:{
	                    	fontFamily:"微软雅黑"
	                    }
	                },
	                
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
	                                    },
	                                    textStyle:{
	                                    	fontFamily:"微软雅黑"
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
	                        itemStyle:{
	                        	normal:{
	                        		label:{
	                        			show:false
	                        		},
	                        		 labelLine: {
	                                    show: false
	                                }
	                        	}
	                        },
	                        data: [
	                        ]
	                    }
	                ]
	            };
	            
	            var optionPie3 = {
	            	calculable : false,
	            	toolbox: {
				        show : true,
				        feature : {
				            saveAsImage : {
				            	show: true,
				            	name:"三板慧-转让方式",
				            	icon:'../../assets/admin/layout/img/saveAsPic.png',
				            	color:"#f57d4b",
				            	
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
	                    data: ['集合竞价', '做市'],
	                    textStyle:{
	                    	fontFamily:"微软雅黑"
	                    }
	                },
	                
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
	                                    },
	                                    textStyle:{
	                                    	fontFamily:"微软雅黑"
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
	                        name: '转让方式',
	                        type: 'pie',
	                        center: ['55%', 105],
	                        radius: [60, 80],
	                        itemStyle:{
	                        	normal:{
	                        		label:{
	                        			show:false
	                        		},
	                        		 labelLine: {
	                                    show: false
	                                }
	                        	}
	                        },
	                        data: [
	                        ]
	                    }
	                ]
	            };
	           
	            //切换三板做市,三板成指
	            $(".sanban-btn").find("div").on("click",function(){
	            	$(this).siblings("div").removeClass("active");
	           		$(this).addClass("active");
	           		if($(this).attr("name") == "1"){
	           			$(".sanban-c").hide();
	           			$(".sanban-z").show();
	           		}else{
	           			$(".sanban-c").show();
	           			$(".sanban-z").hide();
	           		}
	           });
				
				//成交统计
				function dealConnect(){
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
					
					var socket = new SockJS($.kf.ANWEBSOCKET);
					var param = {"uuid":uuid}
					  
			        stompClient = Stomp.over(socket);
				    stompClient.connect(param, function (frame) {
				    	/*stompClient.send($.kf.ANWEBSOCKET,function(frame) {
							console.log(frame);
						};*/
				    	//console.log(frame);
				    	//stompClient.send($.kf.ANWEBSOCKET,param,"hello");
				    	//长连接之后开始点击事件
				    	$(".canvas-list-pic").find("li").on("click",function(){
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
						//长连接之后开始点击事件
				    	$(".canvas-list-pic3").find("li").on("click",function(){
							var _ind = $(this).index();
							$(this).addClass("active");
							$(this).siblings().removeClass("active");
							$(".canvas-most-wrap3").find(".canvas-most").eq(_ind).show();
							$(".canvas-most-wrap3").find(".canvas-most").eq(_ind).siblings().hide();
							if(_ind == 0){
								//实时行情
							}else if(_ind == 1){
								dayConnect3();//日线
							}else if(_ind == 2){
								weekConnect3();//周线
							}else if(_ind == 3){
								monthConnect3();//月线
							}else if(_ind == 4){
								quarterConnect3();//季线
							};
						});
						//长连接之后开始点击事件
						dayConnect2();//默认加载日K
				    	$(".canvas-list-pic2").find("li").on("click",function(){
							var _ind = $(this).index();
							$(this).addClass("active");
							$(this).siblings().removeClass("active");
							$(".canvas-most-wrap-right").find(".canvas-most").eq(_ind).show();
							$(".canvas-most-wrap-right").find(".canvas-most").eq(_ind).siblings().hide();
							if(_ind == 0){
								//日线
							}else if(_ind == 1){
								weekConnect2();//周线
							}else if(_ind == 2){
								monthConnect2();//月线
							}else if(_ind == 3){
								quarterConnect2();//季线
							};
						});
						 //获取此刻之前所有的数据
				        stompClient.subscribe('/app/stock/sharingchat.init.'+companyCode, function (stockdata) { 
			        	 	var socketNum =  JSON.parse(JSON.parse(stockdata.body).content);
			        	 	var priceArrTime = [];
			        	 	if(isNullOrEmpty(socketNum)){
			        	 		//canvasNoData($(".canvas-most01"));
			        	 		option.series[0].data = [];
				        	 	barOption.series[0].data = [];//画echart
				        	 	sellChart.setOption(option);
				        	 	barChart.setOption(barOption);//实例化chart
				        	 	sellChart.connect([barChart]);//chart相互关联
								barChart.connect([sellChart]);
			        	 	}else{
			        	 		//console.log(socketNum);
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
			        	 //ipo获取此刻之前所有的数据
				        stompClient.subscribe('/app/stock/sharingchat.init.'+companyCode3, function (stockdata) { 
			        	 	var socketNum =  JSON.parse(JSON.parse(stockdata.body).content);
			        	 	var priceArrTime = [];
			        	 	if(isNullOrEmpty(socketNum)){
			        	 		//canvasNoData($(".canvas-most01"));
			        	 		option3.series[0].data = [];
				        	 	barOption3.series[0].data = [];//画echart
				        	 	sellChart3.setOption(option3);
				        	 	barChart3.setOption(barOption3);//实例化chart
				        	 	sellChart3.connect([barChart3]);//chart相互关联
								barChart3.connect([sellChart3]);
			        	 	}else{
			        	 		//console.log(socketNum);
				        	 	for(var i=0;i<socketNum.price.length;i++){
				        	 		priceArrTime.push(getFloatStr(socketNum.price[i]));
				        	 	}
				        	 	option3.series[0].data = priceArrTime;
				        	 	barOption3.series[0].data = socketNum.volumn;//画echart
				        	 	sellChart3.setOption(option3);
				        	 	barChart3.setOption(barOption3);//实例化chart
				        	 	sellChart3.connect([barChart3]);//chart相互关联
								barChart3.connect([sellChart3]);
								
			        	 	}
			        	 	
			        	});  
			        	//获取平均值
				        stompClient.subscribe('/app/stock/sharingchatavarage.init.'+companyCode, function (stockdata) { 
			        	 	var socketNum =  JSON.parse(JSON.parse(stockdata.body).content);
			        	 	socketNum.price.unshift(socketNum.previous_price);
			        	 	sellChart.setOption(option);
			        	 	option.series[1].data = socketNum.price;
			        	}); 
			        	//ipo获取平均值
				        stompClient.subscribe('/app/stock/sharingchatavarage.init.'+companyCode3, function (stockdata) { 
			        	 	var socketNum =  JSON.parse(JSON.parse(stockdata.body).content);
			        	 	socketNum.price.unshift(socketNum.previous_price);
			        	 	sellChart3.setOption(option);
			        	 	option3.series[1].data = socketNum.price;
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
			        	 		option.series[0].data = [];
				        	 	barOption.series[0].data = [];
				        	 	sellChart.setOption(option);
				        	 	barChart.setOption(barOption);
				        	 	sellChart.connect([barChart]);
								barChart.connect([sellChart]);
			        	 	}
			        	 	
			        	});
			        	//10s一次循环   获取此刻之前所有的数据ipo
				      	stompClient.subscribe('/stock/sharingchat.'+companyCode3, function (stockdata) { 
			        	 	var socketNum =  JSON.parse(JSON.parse(stockdata.body).content);
			        	 	if(!isNullOrEmpty(socketNum)){
				        	 	var priceArrTime = [];
				        	 	for(var i=0;i<socketNum.price.length;i++){
				        	 		priceArrTime.push(getFloatStr(socketNum.price[i]));
				        	 	}
				        	 	option3.series[0].data = priceArrTime;
				        	 	barOption3.series[0].data = socketNum.volumn;
				        	 	sellChart3.setOption(option3);
				        	 	barChart3.setOption(barOption3);
				        	 	sellChart3.connect([barChart3]);
								barChart3.connect([sellChart3]);
			        	 	}else{
			        	 		//canvasNoData($(".canvas-most01"));
			        	 		option3.series[0].data = [];
				        	 	barOption3.series[0].data = [];
				        	 	sellChart3.setOption(option3);
				        	 	barChart3.setOption(barOption3);
				        	 	sellChart3.connect([barChart3]);
								barChart3.connect([sellChart3]);
			        	 	}
			        	 	
			        	});
			        	//获取平均值12S循环
				        stompClient.subscribe('/stock/sharingchatavarage.'+companyCode, function (stockdata) { 
			        	 	var socketNum =  JSON.parse(JSON.parse(stockdata.body).content);
			        	 	socketNum.price.unshift(socketNum.previous_price);
			        	 	option.series[1].data = socketNum.price;
			        	 	sellChart.setOption(option);
			        	});
			        	//获取平均值12S循环ipo
				        stompClient.subscribe('/stock/sharingchatavarage.'+companyCode3, function (stockdata) { 
			        	 	var socketNum =  JSON.parse(JSON.parse(stockdata.body).content);
			        	 	socketNum.price.unshift(socketNum.previous_price);
			        	 	option3.series[1].data = socketNum.price;
			        	 	sellChart3.setOption(option3);
			        	});
			        	//获取y轴数据
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
				        	 	option.yAxis[0].max = Number(getFloatStr(yLeft01));
				        	 	if(Number(getFloatStr(yLeft02)) < 0){
				        	 		option.yAxis[0].min = 0;
				        	 	}else{
				        	 		option.yAxis[0].min = Number(getFloatStr(yLeft02));
				        	 	}
				        	 	
				        	 	
				        	 	option.yAxis[1].max = Number(getFloatStr(yRight03*100));
				        	 	option.yAxis[1].min = Number(-getFloatStr(yRight03*100));
				        	 	sellChart.setOption(option);
					      		
			        		}
			        	});  
			        	//获取y轴数据ipo
			        	stompClient.subscribe('/app/stock/quotation.init.'+companyCode3, function (stockdata) { 
			        		var socketNum =  JSON.parse(JSON.parse(stockdata.body).content);
			        		if(!isNullOrEmpty(socketNum)){
			        			yesTdayNum3 = Number(getFloatStr(socketNum.previous_price));
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
				        	 	option3.yAxis[0].max = Number(getFloatStr(yLeft01));
				        	 	if(Number(getFloatStr(yLeft02)) < 0){
				        	 		option3.yAxis[0].min = 0;
				        	 	}else{
				        	 		option3.yAxis[0].min = Number(getFloatStr(yLeft02));
				        	 	}
				        	 	
				        	 	
				        	 	option3.yAxis[1].max = Number(getFloatStr(yRight03*100));
				        	 	option3.yAxis[1].min = Number(-getFloatStr(yRight03*100));
				        	 	sellChart3.setOption(option3);
					      		
			        		}
			        	});  
				        //10s循环一次   y轴数据
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
				        	 	option.yAxis[0].max = Number(getFloatStr(yLeft01));
				        	 	if(Number(getFloatStr(yLeft02)) < 0){
				        	 		option.yAxis[0].min = 0;
				        	 	}else{
				        	 		option.yAxis[0].min = Number(getFloatStr(yLeft02));
				        	 	}
				        	 	
				        	 	option.yAxis[1].max = Number(getFloatStr(yRight03*100));
				        	 	option.yAxis[1].min = Number(-getFloatStr(yRight03*100));
				        	 	sellChart.setOption(option);
				      		}
				      		
			        	});
			        	//10s循环一次   y轴数据  ipo
				      	stompClient.subscribe('/stock/quotation.'+companyCode3, function (stockdata) { 
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
				        	 	option3.yAxis[0].max = Number(getFloatStr(yLeft01));
				        	 	if(Number(getFloatStr(yLeft02)) < 0){
				        	 		option3.yAxis[0].min = 0;
				        	 	}else{
				        	 		option3.yAxis[0].min = Number(getFloatStr(yLeft02));
				        	 	}
				        	 	
				        	 	option3.yAxis[1].max = Number(getFloatStr(yRight03*100));
				        	 	option3.yAxis[1].min = Number(-getFloatStr(yRight03*100));
				        	 	sellChart3.setOption(option3);
				      		}
				      		
			        	});
				        //最新价格排名
				      	stompClient.subscribe('/app/stock/quotationprice.init.price', function (stockdata) { 
			        		var socketNum =  JSON.parse(JSON.parse(stockdata.body).content);
			        		var tr = "";
			        		for (var i=0;i<socketNum.length;i++) {
		        				tr += "<tr>";
		        				tr += "<td>"+socketNum[i][0]+"</td>";
		        				tr += "<td><a href='" + $.url.companyListUrl() + "id=" + socketNum[i][3] + "&nameCodeId=" + socketNum[i][0] + "&position=realTime"+"'>"+socketNum[i][1]+"</a></td>";
		        				tr += "<td>"+socketNum[i][2]+"</td>";
		        				tr += "</tr>";
			        		};
				        	$("#guPrice").append(tr);
				        });  
				        //最新价格排名循环
				      	stompClient.subscribe('/stock/quotationprice.price', function (stockdata) { 
			        		var socketNum =  JSON.parse(JSON.parse(stockdata.body).content);
			        		$("#guPrice").html("");
			        		var tr = "";
			        		for (var i=0;i<socketNum.length;i++) {
		        				tr += "<tr>";
		        				tr += "<td>"+socketNum[i][0]+"</td>";
		        				tr += "<td><a href='" + $.url.companyListUrl() + "id=" + socketNum[i][3] + "&nameCodeId=" + socketNum[i][0] + "&position=realTime"+"'>"+socketNum[i][1]+"</a></td>";
		        				tr += "<td>"+socketNum[i][2]+"</td>";
		        				tr += "</tr>";
			        		};
				        	$("#guPrice").append(tr);
				        });  
				        //成交额排名
				        stompClient.subscribe('/app/stock/quotationsummoney.init.sum_money', function (stockdata) { 
			        		var socketNum =  JSON.parse(JSON.parse(stockdata.body).content);
			        		var tr = "";
			        		for (var i=0;i<socketNum.length;i++) {
		        				tr += "<tr>";
		        				tr += "<td>"+socketNum[i][0]+"</td>";
		        				tr += "<td><a href='" + $.url.companyListUrl() + "id=" + socketNum[i][3] + "&nameCodeId=" + socketNum[i][0] + "&position=realTime"+"'>"+socketNum[i][1]+"</a></td>";
		        				tr += "<td>"+socketNum[i][2]+"</td>";
		        				tr += "</tr>";
			        		};
				        	$("#guVolume").append(tr);
				        }); 
				        //成交额排名循环
				        stompClient.subscribe('/stock/quotationsummoney.init.sum_money', function (stockdata) { 
			        		var socketNum =  JSON.parse(JSON.parse(stockdata.body).content);
				        	$("#guPrice").html("");
			        		var tr = "";
			        		for (var i=0;i<socketNum.length;i++) {
		        				tr += "<tr>";
		        				tr += "<td>"+socketNum[i][0]+"</td>";
		        				tr += "<td><a href='" + $.url.companyListUrl() + "id=" + socketNum[i][3] + "&nameCodeId=" + socketNum[i][0] + "&position=realTime"+"'>"+socketNum[i][1]+"</a></td>";
		        				tr += "<td>"+socketNum[i][2]+"</td>";
		        				tr += "</tr>";
			        		};
				        	$("#guVolume").append(tr);
				        }); 
		        
		    
				    	
				    	//市场指数三板做市
				    	stompClient.subscribe('/app/stock/quotation.init.899002', function (stockdata) { 
			        	 	var socketNum =  JSON.parse(JSON.parse(stockdata.body).content);
			        	 	if(Number(socketNum.current_price) != 0){
			        	 		if(Number(socketNum.current_price) > Number(socketNum.previous_price)){
			        	 			$("#shiPrice").addClass("priceRed").text(socketNum.current_price);
			        	 		}else if(Number(socketNum.current_price) == Number(socketNum.previous_price)){
			        	 			$("#shiPrice").addClass("").text(socketNum.current_price);
			        	 		}else{
			        	 			$("#shiPrice").addClass("priceGreen").text(socketNum.current_price);
			        	 		}
			        	 	}else{
			        	 		$("#shiPrice").text("--");
			        	 	}
			        	 	
			        	 	if(Number(socketNum.up_down_rate_close) != 0){
			        	 		if(socketNum.up_down_rate_close > 0){
			        	 			$("#shipercent").addClass("priceRed").text(socketNum.up_down_rate_close+"%");
			        	 		}else{
			        	 			$("#shipercent").addClass("priceGreen").text(socketNum.up_down_rate_close+"%");
			        	 		}
			        	 		
			        	 	}else{
			        	 		$("#shipercent").text(socketNum.up_down_rate_close+"%");
			        	 	}
			        	 	
			        	 	
			        	 	$("#shiTotal").text(socketNum.deal_sum_str);
			        	 	$("#shiTime").text(socketNum.day);
			        	 	$("#shiTimes").text(socketNum.time.substring(0,socketNum.time.length-3));
			        	}); 
			        	//市场指数三板做市12s循环
				    	stompClient.subscribe('/stock/quotation.899002', function (stockdata) { 
			        	 	var socketNum =  JSON.parse(JSON.parse(stockdata.body).content);
			        	 	if(Number(socketNum.current_price) != 0){
			        	 		if(Number(socketNum.current_price) > Number(socketNum.previous_price)){
			        	 			$("#shiPrice").addClass("priceRed").text(socketNum.current_price);
			        	 		}else if(Number(socketNum.current_price) == Number(socketNum.previous_price)){
			        	 			$("#shiPrice").addClass("").text(socketNum.current_price);
			        	 		}else{
			        	 			$("#shiPrice").addClass("priceGreen").text(socketNum.current_price);
			        	 		}
			        	 	}else{
			        	 		$("#shiPrice").text("--");
			        	 	}
			        	 	
			        	 	if(Number(socketNum.up_down_rate_close) != 0){
			        	 		if(socketNum.up_down_rate_close > 0){
			        	 			$("#shipercent").addClass("priceRed").text(socketNum.up_down_rate_close+"%");
			        	 		}else{
			        	 			$("#shipercent").addClass("priceGreen").text(socketNum.up_down_rate_close+"%");
			        	 		}
			        	 		
			        	 	}else{
			        	 		$("#shipercent").text(socketNum.up_down_rate_close+"%");
			        	 	}
			        	 	
			        	 	
			        	 	$("#shiTotal").text(socketNum.deal_sum_str);
			        	 	$("#shiTime").text(socketNum.day);
			        	 	$("#shiTimes").text(socketNum.time.substring(0,socketNum.time.length-3));
			        	}); 
			        	
			        	
			        	//市场指数  ipo
				    	stompClient.subscribe('/app/stock/quotation.init.NIPO', function (stockdata) { 
			        	 	var socketNum =  JSON.parse(JSON.parse(stockdata.body).content);
			        	 	if(Number(socketNum.current_price) != 0){
			        	 		if(Number(socketNum.current_price) > Number(socketNum.previous_price)){
			        	 			$("#ipoPrice").addClass("priceRed").text(socketNum.current_price);
			        	 		}else if(Number(socketNum.current_price) == Number(socketNum.previous_price)){
			        	 			$("#ipoPrice").addClass("").text(socketNum.current_price);
			        	 		}else{
			        	 			$("#ipoPrice").addClass("priceGreen").text(socketNum.current_price);
			        	 		}
			        	 	}else{
			        	 		$("#ipoPrice").text("--");
			        	 	}
			        	 	
			        	 	if(Number(socketNum.up_down_rate_close) != 0){
			        	 		if(socketNum.up_down_rate_close > 0){
			        	 			$("#ipopercent").addClass("priceRed").text(socketNum.up_down_rate_close+"%");
			        	 		}else{
			        	 			$("#ipopercent").addClass("priceGreen").text(socketNum.up_down_rate_close+"%");
			        	 		}
			        	 		
			        	 	}else{
			        	 		$("#ipopercent").text(socketNum.up_down_rate_close+"%");
			        	 	}
			        	 	
			        	 	
			        	 	$("#ipoTotal").text(socketNum.deal_sum);
			        	 	$("#ipoTime").text(socketNum.day);
			        	 	$("#ipoTimes").text(socketNum.time);
			        	}); 
			        	//市场指数  ipo   12s循环
				    	stompClient.subscribe('/stock/quotation.NIPO', function (stockdata) { 
			        	 	var socketNum =  JSON.parse(JSON.parse(stockdata.body).content);
			        	 	if(Number(socketNum.current_price) != 0){
			        	 		if(Number(socketNum.current_price) > Number(socketNum.previous_price)){
			        	 			$("#ipoPrice").addClass("priceRed").text(socketNum.current_price);
			        	 		}else if(Number(socketNum.current_price) == Number(socketNum.previous_price)){
			        	 			$("#ipoPrice").addClass("").text(socketNum.current_price);
			        	 		}else{
			        	 			$("#ipoPrice").addClass("priceGreen").text(socketNum.current_price);
			        	 		}
			        	 	}else{
			        	 		$("#ipoPrice").text("--");
			        	 	}
			        	 	
			        	 	if(Number(socketNum.up_down_rate_close) != 0){
			        	 		if(socketNum.up_down_rate_close > 0){
			        	 			$("#ipopercent").addClass("priceRed").text(socketNum.up_down_rate_close+"%");
			        	 		}else{
			        	 			$("#ipopercent").addClass("priceGreen").text(socketNum.up_down_rate_close+"%");
			        	 		}
			        	 		
			        	 	}else{
			        	 		$("#ipopercent").text(socketNum.up_down_rate_close+"%");
			        	 	}
			        	 	
			        	 	
			        	 	$("#ipoTotal").text(socketNum.deal_sum);
			        	 	$("#ipoTime").text(socketNum.day);
			        	 	$("#ipoTimes").text(socketNum.time);
			        	}); 
			        	
			        	//市场指数三板成指
			        	stompClient.subscribe('/app/stock/quotation.init.899001', function (stockdata) { 
			        	 	var socketNum =  JSON.parse(JSON.parse(stockdata.body).content);
			        	 	if(Number(socketNum.current_price) != 0){
			        	 		if(Number(socketNum.current_price) > Number(socketNum.previous_price)){
			        	 			$("#zhiPrice").addClass("priceRed").text(socketNum.current_price);
			        	 		}else if(Number(socketNum.current_price) == Number(socketNum.previous_price)){
			        	 			$("#zhiPrice").addClass("").text(socketNum.current_price);
			        	 		}else{
			        	 			$("#zhiPrice").addClass("priceGreen").text(socketNum.current_price);
			        	 		}
			        	 	}else{
			        	 		$("#zhiPrice").text("--");
			        	 	}
			        	 	
			        	 	if(Number(socketNum.up_down_rate_close) != 0){
			        	 		if(socketNum.up_down_rate_close > 0){
			        	 			$("#zhipercent").addClass("priceRed").text(socketNum.up_down_rate_close+"%");
			        	 		}else{
			        	 			$("#zhipercent").addClass("priceGreen").text(socketNum.up_down_rate_close+"%");
			        	 		}
			        	 		
			        	 	}else{
			        	 		$("#zhipercent").text(socketNum.up_down_rate_close+"%");
			        	 	}
			        	 	$("#zhiTotal").text(socketNum.deal_sum_str);
			        	 	$("#zhiTime").text(socketNum.day);
			        	}); 
				    	//市场指数三板成指12秒循环
			        	stompClient.subscribe('/stock/quotation.899001', function (stockdata) { 
			        	 	var socketNum =  JSON.parse(JSON.parse(stockdata.body).content);
			        	 	if(Number(socketNum.current_price) != 0){
			        	 		if(Number(socketNum.current_price) > Number(socketNum.previous_price)){
			        	 			$("#zhiPrice").addClass("priceRed").text(socketNum.current_price);
			        	 		}else if(Number(socketNum.current_price) == Number(socketNum.previous_price)){
			        	 			$("#zhiPrice").addClass("").text(socketNum.current_price);
			        	 		}else{
			        	 			$("#zhiPrice").addClass("priceGreen").text(socketNum.current_price);
			        	 		}
			        	 	}else{
			        	 		$("#zhiPrice").text("--");
			        	 	}
			        	 	
			        	 	if(Number(socketNum.up_down_rate_close) != 0){
			        	 		if(socketNum.up_down_rate_close > 0){
			        	 			$("#zhipercent").addClass("priceRed").text(socketNum.up_down_rate_close+"%");
			        	 		}else{
			        	 			$("#zhipercent").addClass("priceGreen").text(socketNum.up_down_rate_close+"%");
			        	 		}
			        	 		
			        	 	}else{
			        	 		$("#zhipercent").text(socketNum.up_down_rate_close+"%");
			        	 	}
			        	 	$("#zhiTotal").text(socketNum.deal_sum_str);
			        	 	$("#zhiTime").text(socketNum.day);
			        	}); 
				    	
				        //行情统计
				        stompClient.subscribe('/app/stock/quotationoverview.init.overview', function (stockdata) { 
			        	 	var socketNum =  JSON.parse(JSON.parse(stockdata.body).content);
			        	 	$("#realcjNum").text(socketNum.totalnum);
			        	 	$("#realcjMoney").text(socketNum.summoney);
			        	 	$("#realNumjs").text(socketNum.tradenum+"家");
			        	 	/*$("#realNumje").text(socketNum.summoney);*/
			        	 	if(socketNum.max_value == "-"){
			        	 		$("#realNumzg").text(socketNum.max_value).addClass("realNumzg");
			        	 	}else{
			        	 		$("#realNumzg").text(socketNum.max_value).removeClass("realNumzg").attr('href',$.url.companyListUrl()+"id="+socketNum.max_id+"&nameCodeId="+socketNum.max_code+"&position=realTime");
			        	 	}
			        	 	if(socketNum.min_value == "-"){
			        	 		$("#realNumzd").text(socketNum.min_value).addClass("realNumzg");
			        	 	}else{
			        	 		$("#realNumzd").text(socketNum.min_value).removeClass("realNumzg").attr('href',$.url.companyListUrl()+"id="+socketNum.min_id+"&nameCodeId="+socketNum.max_code+"&position=realTime");
			        	 	}
			        	 	$("#realNumzd").text(socketNum.min_value).attr('href',$.url.companyListUrl()+"id="+socketNum.min_id+"&nameCodeId="+socketNum.max_code+"&position=realTime");
			        	 	$("#realNumzgCode").text(socketNum.max_code);
			        	 	$("#realNumzdCode").text(socketNum.min_code);
			        	 	$("#traderate").text("（占挂牌总数"+socketNum.traderate+"%）");
			        	 	$(".cjDate").text(socketNum.time);
			        	 	$("#regTime").html(socketNum.time);
			        	 	$("#tradTransferDate").html(socketNum.time);
			        	}); 
			        	 //行情统计循环
				        stompClient.subscribe('/stock/quotationoverview.overview', function (stockdata) { 
			        	 	var socketNum =  JSON.parse(JSON.parse(stockdata.body).content);
			        	 	$("#realNumjs").text(socketNum.tradenum+"家");
			        	 	/*$("#realNumje").text(socketNum.summoney);*/
			        	 	if(socketNum.max_value == "-"){
			        	 		$("#realNumzg").text(socketNum.max_value).addClass("realNumzg");
			        	 	}else{
			        	 		$("#realNumzg").text(socketNum.max_value).removeClass("realNumzg").attr('href',$.url.companyListUrl()+"id="+socketNum.max_id+"&nameCodeId="+socketNum.max_code+"&position=realTime");
			        	 	}
			        	 	if(socketNum.min_value == "-"){
			        	 		$("#realNumzd").text(socketNum.min_value).addClass("realNumzg");
			        	 	}else{
			        	 		$("#realNumzd").text(socketNum.min_value).removeClass("realNumzg").attr('href',$.url.companyListUrl()+"id="+socketNum.min_id+"&nameCodeId="+socketNum.max_code+"&position=realTime");
			        	 	}
			        	 	$("#realNumzgCode").text(socketNum.max_code);
			        	 	$("#realNumzdCode").text(socketNum.min_code);
			        	 	$("#traderate").text("（占挂牌总数"+socketNum.traderate+"%）");
			        	 	$(".cjDate").text(socketNum.time);
			        	 	$("#tradTransferDate").html(socketNum.time);
			        	 	$("#regTime").html(socketNum.time);
			        	}); 
			        	//第1个饼图
			        	stompClient.subscribe('/app/stock/quotationoverview.init.updownstat', function (stockdata) { 
			        	 	var socketNum =  JSON.parse(JSON.parse(stockdata.body).content);
			        	 	if(!isNullOrEmpty(socketNum)){
			        	 		optionPie.series[0].data = socketNum;
		                        optionPie.series[1].data = socketNum;
		                        myChartPie.setOption(optionPie);
			        	 	}else{
			        	 		optionPie.series[0].data = [0,0,0];
		                        optionPie.series[1].data = [0,0,0];
		                        myChartPie.setOption(optionPie);
			        	 	}
			        	 	
			        	});
			        	//第1个饼图循环
			        	stompClient.subscribe('/stock/quotationoverview.updownstat', function (stockdata) { 
			        	 	var socketNum =  JSON.parse(JSON.parse(stockdata.body).content);
			        	 	if(!isNullOrEmpty(socketNum)){
			        	 		optionPie.series[0].data = socketNum;
		                        optionPie.series[1].data = socketNum;
		                        myChartPie.setOption(optionPie);
			        	 	}else{
			        	 		optionPie.series[0].data = [0,0,0];
		                        optionPie.series[1].data = [0,0,0];
		                        myChartPie.setOption(optionPie);
			        	 	}
			        	});
			        	//第2个饼图
			        	stompClient.subscribe('/app/stock/quotationoverview.init.layer', function (stockdata) { 
			        	 	var socketNum =  JSON.parse(JSON.parse(stockdata.body).content);
			        	 	if(!isNullOrEmpty(socketNum)){
			        	 		optionPie2.series[0].data = socketNum;
		                        optionPie2.series[1].data = socketNum;
		                        myChartPie2.setOption(optionPie2);
			        	 	}else{
			        	 		optionPie2.series[0].data = [0,0];
		                        optionPie2.series[1].data = [0,0];;
		                        myChartPie2.setOption(optionPie2);
			        	 	}
			        	 	
			        	}); 
			        	//第2个饼图循环
			        	stompClient.subscribe('/stock/quotationoverview.layer', function (stockdata) { 
			        	 	var socketNum =  JSON.parse(JSON.parse(stockdata.body).content);
			        	 	if(!isNullOrEmpty(socketNum)){
			        	 		optionPie2.series[0].data = socketNum;
		                        optionPie2.series[1].data = socketNum;
		                        myChartPie2.setOption(optionPie2);
			        	 	}else{
			        	 		optionPie2.series[0].data = [0,0];
		                        optionPie2.series[1].data = [0,0];;
		                        myChartPie2.setOption(optionPie2);
			        	 	}
			        	});
			        	//第3个饼图
			        	stompClient.subscribe('/app/stock/quotationoverview.init.transfer', function (stockdata) { 
			        	 	var socketNum =  JSON.parse(JSON.parse(stockdata.body).content);
			        	 	if(!isNullOrEmpty(socketNum)){
			        	 		optionPie3.series[0].data = socketNum;
		                        optionPie3.series[1].data = socketNum;
		                        myChartPie3.setOption(optionPie3);
			        	 	}else{
			        	 		optionPie3.series[0].data = [0,0];
		                        optionPie3.series[1].data = [0,0];;
		                        myChartPie3.setOption(optionPie3);
			        	 	}
			        	});
			        	//第3个饼图循环
			        	stompClient.subscribe('/stock/quotationoverview.transfer', function (stockdata) { 
			        	 	var socketNum =  JSON.parse(JSON.parse(stockdata.body).content);
			        	 	if(!isNullOrEmpty(socketNum)){
			        	 		optionPie3.series[0].data = socketNum;
		                        optionPie3.series[1].data = socketNum;
		                        myChartPie3.setOption(optionPie3);
			        	 	}else{
			        	 		optionPie3.series[0].data = [0,0];
		                        optionPie3.series[1].data = [0,0];;
		                        myChartPie3.setOption(optionPie3);
			        	 	}
			        	});
			        	//交易异动
			        	stompClient.subscribe('/app/stock/quotationabnormal.init.abnormal', function (stockdata) { 
			        	 	var socketNum =  JSON.parse(JSON.parse(stockdata.body).content);
			        	 	transferStatue(socketNum.cont);
			        	}); 
			        	//交易异动循环
			        	stompClient.subscribe('/stock/quotationabnormal.abnormal', function (stockdata) { 
			        	 	var socketNum =  JSON.parse(JSON.parse(stockdata.body).content);
			        	 	if(_flg){
			        	 		transferStatue(socketNum.cont);
			        	 	}
			        	});
			       })
			   } 
			   dealConnect();
			   function transferStatue(socketNum){
			   		var socketNum = socketNum;
			   		if(typeof(wageSummaryTable) == "undefined"){
		      			var table = $('#tableOne_1');
			      		wageSummaryTable = table.dataTable({
							data:socketNum,
							order: [[ 0, "desc" ]],//默认不排序
							aLengthMenu:[10],//显示10行
							columnDefs:[
								{
					                targets: 2,//第二列html操作
					                data: null,
					                title: "简称",
					                render: function (data, type, row, meta) {
					                    return "<a href='" + $.url.companyListUrl() + "id=" + data[7] + "&nameCodeId=" + data[1] + "&position=companyList"+"'>" + data[2] + "</a>"
					                }
					           },
					           {
					           		targets: [1,2,3,4,5,6],//除了第一列，其他都不排序
							　　　　 orderable:false
					           },
					            {
						            "visible": false,//最后一列不显示
						            "targets": [7]
						        }
							　　　　
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
				    	wageSummaryTable.fnClearTable();//清空数据.fnClearTable();//清空数据  
	                	wageSummaryTable.fnDestroy(); //还原初始化了的datatable  
	                	var table = $('#tableOne_1');
			      		wageSummaryTable = table.dataTable({
							data:socketNum,
							order: [[ 0, "desc" ]],
							aLengthMenu:[10],
							columnDefs:[
								{
					                targets: 2,
					                data: null,
					                title: "简称",
					                render: function (data, type, row, meta) {
					                    return "<a href='" + $.url.companyListUrl() + "id=" + data[7] + "&nameCodeId=" + data[1] + "&position=companyList"+"'>" + data[2] + "</a>"
					                }
					           },
					           {
					           		targets: [1,2,3,4,5,6],
							　　　　 orderable:false
					           },
					           {
						            "visible": false,
						            "targets": [7]
						        }
							　　　　
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
				    }
			   }
			   //指数成份跳转
			    $("#exponentEle").click(function(){
					window.location.href = $.url.ipoExponential();
				})
			    //问号弹窗提示
			    $(".sanban-btns span").click(function(e){
			    	e.stopPropagation();
		        	var thisName = $(this).attr("name");
		        	var thisSetName = $(this).attr("set-name");
		        	$("#myModal04 .modal-body p").empty("");
		        	$("#myModal04 .modal-title").text(thisName)
					$("#myModal04 .modal-body p").html(thisSetName)
					$("#myModal04").modal("show")
			    })
		  	}
	    )
	}
	
	
	return{
		init:function(){
			realQuoTop();
		}
	}
	
}();


