var imgUrl = [];
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
            var _width = $(".page-content-par").width()-10;
            $("#barChartDay").width(_width);
            $("#barChartWeek").width(_width);
            $("#barChartMonth").width(_width);
            $("#dayChart").width(_width);
            $("#weekChart").width(_width);
            $("#monthChart").width(_width);
            var barChartDay = ec.init(document.getElementById('barChartDay'),"macarons");
            var barChartWeek = ec.init(document.getElementById('barChartWeek'),"macarons");
            var barChartMonth = ec.init(document.getElementById('barChartMonth'),"macarons");
            var dayChart = ec.init(document.getElementById('dayChart'),"macarons");
            var weekChart = ec.init(document.getElementById('weekChart'),"macarons");
            var monthChart = ec.init(document.getElementById('monthChart'),"macarons");
            
			
            //resize
            window.addEventListener("resize",function(){
            	var _width = $(".page-content-par").width()-10;
	            $("#barChartDay").width(_width);
	            $("#barChartWeek").width(_width);
	            $("#barChartMonth").width(_width);
	            $("#dayChart").width(_width);
	            $("#weekChart").width(_width);
	            $("#monthChart").width(_width);
		    	barChartDay.resize();
		    	barChartWeek.resize();
		    	barChartMonth.resize();
		    	dayChart.resize();
		    	weekChart.resize();
		    	monthChart.resize();
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
                animation:false,
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
                animation:false,
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
                animation:false,
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
            //日线图
            var dayOption = {
			    title : {
			        text: ''
			    },
			    animation:false,
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
            	animation:false,
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
			    animation:false,
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
            
            
            //行情
            var arrLength = '';
			var stompClient = null;
			var dayLast = [];//日k线图成交金额
			var weekLast = [];//周k线图成交金额
			var monthLast = [];//月k线图成交金额
			var quarterLast = [];//季k线图成交金额
			var listMode = "";
			var _flg = true;
			var _pageNum = 0;
			var yesTdayNum = '';
			var rp_id = Query.getHash("rp_id");
        	var tmp_id = Query.getHash("tmp_id");
		    var id = Query.getHash("id");
		    var currentId = Query.getHash("currentId");
		    var companyCode = currentId;//公司code
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
		    var companyName = '';
		    //基本公司信息
	        $.kf.ajax({
	            type: "get",
	            url: $.kf.REPORTCOMPANYINFO + "?rp_id="+ rp_id +"&tmp_id="+ tmp_id,
	            data: "",
	            dataType: "json",
	            processResponse: function (data) {
	                var dataList = data.data;
	                companyName = dataList.shortname;
	                awaysConnect();
	            }
	        });
		    
	        
			
			//实时行情
			function awaysConnect(){
				//上送参数公司id和简称
				var header = {
					"companyCode":companyCode,
					"companyName":companyName,
					"uuid":"4f1f546b5bf60d519d8615f504fdff32"
				};
				var socket = new SockJS($.kf.ANWEBSOCKET);
				//var socket = new SockJS('http://101.201.116.42:8080/kf-web-mq/kf-websocket');
		        stompClient = Stomp.over(socket);
			    stompClient.connect(header, function (frame) { 
			    	//stompClient.send($.kf.ANWEBSOCKET,uuParam,"hello");
			    	var rp_id = Query.getHash("rp_id");
        			var tmp_id = Query.getHash("tmp_id");
			    	$.kf.ajax({
			            type: "get",
			            url: $.kf.REPORTSERVICE + "?rp_id="+ rp_id +"&tmp_id="+ tmp_id,
			            data: "",
			            dataType: "json",
			            processResponse: function (data) {
			            	var dataList = data.data.body;
			            	var datC = data.data;
			            	 $(".remarksM").val(data.data.remarksNotice);
			            	  $(".remarksL").val(data.data.remarksNews);
			            	if(isNullOrEmpty(datC)){
			            		$(".hqMaket").addClass("hide");
			            	}else{
			            		var dataLen = dataList.length;
			            		$(".hqMes").text(datC.updateDate)
				            	for(var i=0; i<dataLen; i++){
				            		if(dataList[i] == "日线图"){
				            			$(".reportQutes").removeClass("hide");
				            		}else if(dataList[i] == "周线图"){
				            			$(".reportQutes2").removeClass("hide");
				            		}else if(dataList[i] == "月线图"){
				            			$(".reportQutes3").removeClass("hide");
				            		}
				            	}
			            	}
			            	
			            }
			        });
			    	dayConnect();//日线
					weekConnect();//周线
					monthConnect();//月线
					
					/*dayImg = dayChart.getDataURL();
					console.log(dayImg);*/
					
		        });
			};
			//遍历input textarea
			$(".productionCon").on("change","input",function(){
				$(this).attr("value",$(this).val());
			});
			$(".productionCon").on("change","textarea",function(){
				$(this).text($(this).val());
			});
			
            
			//点击预览
			var _checkIndex = 0;
			$("#seeTemplate").on("click",function(){
				//备注循环插入
				$(".productionCon textarea").each(function(){
					$(this).text($(this).val())
				})
				//遍历input textarea
				$(".templateName").text($("#tempName").val())
				var ue2 = UE.getEditor('editor2');
		    	var ue = UE.getEditor('editor');
				//记忆当前选中的radio
				$("#concatRadio").find("input[type=radio]").each(function(){
					if($(this).prop("checked")){
						_checkIndex = $(this).parent(".radio-inline").index();
					}
				});
				//uuue
				var ueText = '';
				ue.ready(function() {
			 		ueText =  UE.getEditor('editor').getContent();
				})
				var ueText2 = '';
				ue2.ready(function() {
			 		ueText2 =  UE.getEditor('editor2').getContent();
				})
				$("#editor").parent().hide();
				$("#editor2").parent().hide();
				$("#editorDiv").html(ueText);
				$("#editor2Div").html(ueText2);
				
				$("#seeTmpPop").html("");
				$(".page-mask").show();
				$(".page-addMode").show();
				//男女切换
				$(".selectReport").hide();
				$(".selectReport").parent().find("span").show();
				$(".productionCon").each(function(){
					if($(this).hasClass("have")){
						$("#seeTmpPop").append("<div class='productionCon'>"+$(this).html()+"</div>");
						$("#seeTmpPop").find("#editor").remove();
						$("#seeTmpPop").find("#editor2").remove();
					}
					
				});
				//隐藏空备注
				$(".reportRemarks").each(function(){
					if(isNullOrEmpty($(this).find("textarea").text())){
						$(this).children().css("visibility","hidden");
					}
				});
				
				//隐藏分页
				
				$(".first-page-li").find("span").css("font-size","16px");
				$(".first-page-li").siblings("li").hide();
				
				//disabled  input textarea select
				$("#seeTmpPop").find("input,textarea,select").prop("disabled",true);
				//当前选中的radio
				$("#seeTmpPop").find("#concatRadio").find(".radio-inline").eq(_checkIndex).find("input[type=radio]").prop("checked",true);
				var imgSrc = dayChart.getDataURL();//获取src
//				var param = {imgSrc:imgSrc};
//				$.kf.ajax({
//		            type: "post",
//		            url: "http://test.kaifengdata.com/reportservice/images",
//		            data: param,
//		            dataType: "json",
//		            processResponse: function (data) {
//		              
//		            }
//		        });
				var _width = $('#seeTmpPop').find(".productionCon").width();
				
				$("#img001").html(dayChart.getImage());//获取img
				$("#img002").html(barChartDay.getImage());//获取img
		        $("#seeTmpPop").find("#dayChart").width(_width).html(dayChart.getImage());//获取img
		        $("#seeTmpPop").find("#barChartDay").width(_width).html(barChartDay.getImage());//获取img
		        $("#seeTmpPop").find("#weekChart").width(_width).html(weekChart.getImage());//获取img
		        $("#seeTmpPop").find("#barChartWeek").width(_width).html(barChartWeek.getImage());//获取img
		        $("#seeTmpPop").find("#monthChart").width(_width).html(monthChart.getImage());//获取img
		        $("#seeTmpPop").find("#barChartMonth").width(_width).html(barChartMonth.getImage());//获取img
				$("#seeTmpPop").find("img").width("100%");
				$(".bigCanvasHeight").height("auto");
			});
			$("#hideOut").on("click",function(){
				$("#img001").html(dayChart.getImage());//获取img
				$("#img002").html(barChartDay.getImage());//获取img
			});
			//关闭预览弹窗
			$(".sup-close,#cancelTemplate").on("click",function(){
				var ue2 = UE.getEditor('editor2');
		    	var ue = UE.getEditor('editor');
				$(".page-mask").hide();
				$(".page-addMode").hide();
				$("#seeTmpPop").html("");
				$(".bigCanvasHeight").height("280px");
				//显示空备注
				$(".reportRemarks").each(function(){
					$(this).children().css("visibility","visible");
				});
				//ue
				$("#editor").parent().show();
				$("#editor2").parent().show();
				$("#editorDiv").html("");
				$("#editor2Div").html("");
				//显示分页
				$(".first-page-li").find("span").css("font-size","14px");
				$(".first-page-li").siblings("li").show();
				//select span男女切换
				$(".selectReport").show();
	            $(".selectReport").parent().find("span").hide();
				//当前选中的radio
				$("#concatRadio").find(".radio-inline").eq(_checkIndex).find("input[type=radio]").prop("checked",true);
			});
	
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
						
						/*var imgSrc = dayChart.getDataURL();//获取src
						var imgSrc = $("#seeTmpPop").find("#dayChart").find("img").attr("src");
						var imgSrc2 = barChartDay.getDataURL();//获取src
						var imgSrc2 = $("#seeTmpPop").find("#barChartDay").find("img").attr("src");
						imgUrl.push({b06010200:{"imgSrc":imgSrc,"imgSrc2":imgSrc2}});*/
						//预览
						$("#seeTemplate").removeAttr("disabled");
						$("#seeTemplate").removeAttr("style");
						//导出
						$("#createTemplate").removeAttr("disabled");
						$("#createTemplate").removeAttr("style");
	        		}else{
	        			//预览
						$("#seeTemplate").removeAttr("disabled");
						$("#seeTemplate").removeAttr("style");
						//导出
						$("#createTemplate").removeAttr("disabled");
						$("#createTemplate").removeAttr("style");
	        			dayOption.yAxis[0].min = 0;
		            	dayOption.yAxis[0].max = 0;
		            	/*end*/
		            	var datCurrent = ["0000/00/00"];
		            	var numCurrent = [0];
		            	var priceCurrent = [0,0,0,0]
		        	 	dayOption.xAxis[0].data = datCurrent;//X轴日期刻度
		        	 	barOptionDay.xAxis[0].data = datCurrent;
		        	 	dayOption.series[0].data = priceCurrent;//划线
		        	 	dayOption.series[0].name = companyName;//传入公司简称
		        	 	barOptionDay.series[0].data = numCurrent;
	        			dayChart.setOption(dayOption);
	        			barChartDay.setOption(barOptionDay);
		        	 	dayChart.connect([barChartDay]);
						barChartDay.connect([dayChart]);
						/*var imgSrc = dayChart.getDataURL();//获取src
						var imgSrc = $("#seeTmpPop").find("#dayChart").find("img").attr("src");
						var imgSrc2 = barChartDay.getDataURL();//获取src
						var imgSrc2 = $("#seeTmpPop").find("#barChartDay").find("img").attr("src");
						imgUrl.push({b06010200:{"imgSrc":imgSrc,"imgSrc2":imgSrc2}})*/
//	        			canvasNoData($(".canvas-most02"));
//	        			$(".reportQutes").addClass("hide");
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
						
						var imgSrc3 = weekChart.getDataURL();//获取src
						var imgSrc4 = barChartWeek.getDataURL();//获取src
						imgUrl.push({b06010300:{"imgSrc3":imgSrc3,"imgSrc4":imgSrc4}})
	        		}else{
	        			weekOption.yAxis[0].min = 0;
		            	weekOption.yAxis[0].max = 0;
		            	/*end*/
		            	var datCurrent = ["0000/00/00"];
		            	var numCurrent = [0];
		            	var priceCurrent = [0,0,0,0]
		        	 	weekOption.xAxis[0].data = datCurrent;//X轴日期刻度
		        	 	barOptionDay.xAxis[0].data = datCurrent;
		        	 	weekOption.series[0].data = priceCurrent;//划线
		        	 	weekOption.series[0].name = companyName;//传入公司简称
		        	 	barOptionDay.series[0].data = numCurrent;
		        	 	weekChart.setOption(weekOption);
		        	 	barChartWeek.setOption(barOptionWeek);
		        	 	weekChart.connect([barChartWeek]);
						barChartWeek.connect([weekChart]);
						var imgSrc3 = weekChart.getDataURL();//获取src
						var imgSrc4 = barChartWeek.getDataURL();//获取src
						imgUrl.push({b06010300:{"imgSrc3":imgSrc3,"imgSrc4":imgSrc4}})
	        			//canvasNoData($(".canvas-most03"));
	        			//$(".reportQutes2").addClass("hide");
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
						/*$("#seeTemplate").removeAttr("disabled");
						$("#seeTemplate").removeAttr("style");*/
						
						var imgSrc5 = monthChart.getDataURL();//获取src
						var imgSrc6 = barChartMonth.getDataURL();//获取src
						imgUrl.push({b06010400:{"imgSrc5":imgSrc5,"imgSrc6":imgSrc6}})
	        		}else{
	        			/*$("#seeTemplate").removeAttr("disabled");
						$("#seeTemplate").removeAttr("style");*/
	        			monthOption.yAxis[0].min = 0;
		            	monthOption.yAxis[0].max = 0;
		            	/*end*/
		            	var datCurrent = ["0000/00/00"];
		            	var numCurrent = [0];
		            	var priceCurrent = [0,0,0,0]
		        	 	monthOption.xAxis[0].data = datCurrent;//X轴日期刻度
		        	 	barOptionDay.xAxis[0].data = datCurrent;
		        	 	monthOption.series[0].data = priceCurrent;//划线
		        	 	monthOption.series[0].name = companyName;//传入公司简称
		        	 	barOptionDay.series[0].data = numCurrent;
		        	 	monthChart.setOption(monthOption);
		        	 	barChartMonth.setOption(barOptionMonth);
		        	 	monthChart.connect([barChartMonth]);
						barChartMonth.connect([monthChart]);
						var imgSrc5 = monthChart.getDataURL();//获取src
						var imgSrc6 = barChartMonth.getDataURL();//获取src
						imgUrl.push({b06010400:{"imgSrc5":imgSrc5,"imgSrc6":imgSrc6}})
	        			//canvasNoData($(".canvas-most04"));
	        			//$(".reportQutes3").addClass("hide");
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
	        	
			};
			
			
		});	
})
