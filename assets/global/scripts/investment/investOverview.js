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
            'echarts/chart/wordCloud'
        ],
        function (ec) {
        	var _width = $(".page-content-par").width()-10;
        	$("#wordChart").width(_width);
        	$("#barChart").width(_width);
        	if($(window).width() <= 768){
        		$("#bottomChart01").width(_width);
	        	$("#bottomChart02").width(_width);
	        	$("#changeChart").width(_width);
        	}else{
        		$("#bottomChart01").width(_width/2-15);
        		$("#bottomChart02").width(_width/2-15);
        		$("#changeChart").width(_width/2);
        	}
        	var wordChart = ec.init(document.getElementById('wordChart'),"macarons"); 
        	var barChart = ec.init(document.getElementById('barChart'),"macarons"); 
        	var bottomChart01 = ec.init(document.getElementById('bottomChart01'),"macarons");
        	var bottomChart02 = ec.init(document.getElementById('bottomChart02'),"macarons");
        	var changeChart = ec.init(document.getElementById('changeChart'),"macarons");
        	//图表自适应
			window.addEventListener("resize",function(){
				var _width = $(".page-content-par").width()-10;
	        	$("#wordChart").width(_width);
	        	$("#barChart").width(_width);
	        	if($(window).width() <= 768){
	        		$("#bottomChart01").width(_width);
		        	$("#bottomChart02").width(_width);
		        	$("#changeChart").width(_width);
	        	}else{
	        		$("#bottomChart01").width(_width/2-15);
	        		$("#bottomChart02").width(_width/2-15);
	        		$("#changeChart").width(_width/2);
	        	}
	        	wordChart.resize();
	        	barChart.resize();
	        	bottomChart01.resize();
	        	bottomChart02.resize();
	        	changeChart.resize();
	        })
        	//颜色随机
        	function createRandomItemStyle() {
			    return {
			        normal: {
			        	textStyle:{
			        		fontFamily:"Microsoft Yahei"
			        	},
			            color: 'rgb(' + [
			                Math.round(Math.random() * 160),
			                Math.round(Math.random() * 160),
			                Math.round(Math.random() * 160)
			            ].join(',') + ')'
			        }
			    };
			};
			
			var optionWord = {
			    title: {
			        /*text: 'Google Trends',
			        link: 'http://www.google.com/trends/hottrends'*/
			    },
			    tooltip: {
			        show: true,
			        formatter:"{a}"+"<br/>"+"{b}：{c}"+"次"
			    },
			    toolbox: {
			        show : true,
			        feature : {
			            saveAsImage : {
			            	show: true,
			            	name:"三板慧-年度热词",
			            	icon:'../../../assets/admin/layout/img/saveAsPic.png',
			            	color:"#f57d4b"
			            }
			        }
			    },
			    series: [{
			        name: '年度热词',
			        type: 'wordCloud',
			        size: ['80%', '80%'],
			        textRotation : [0, 45, 90, -45],
			        textPadding: 0,
			        autoSize: {
			            enable: true,
			            minSize: 14
			        },
			        data: []
			    }]
			};
			var optionBar = {
				toolbox: {
			        show : true,
			        feature : {
			            saveAsImage : {
			            	show: true,
			            	name:"三板慧-投资事件行业伦次分布",
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
                	height:201,
                	x:50,
			    	y:60,
			    	x2:30,
			    	y2:50
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
			            name : "数量（家）",
			            nameTextStyle : {
                    		color:"#2c8cce",
                    		fontSize:14,
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
			
			var botOption01 = {
				grid:{
			    	x:50,
			    	y:55,
			    	x2:20,
			    	y2:50
			    },
			    tooltip : {
			        trigger: 'axis'
			    },
			    legend: {
			        data:[]
			    },
			    toolbox: {
			        show : true,
			        feature : {
			            saveAsImage : {
			            	show: true,
			            	name:"三板慧-投资事件行业趋势",
			            	icon:'../../../assets/admin/layout/img/saveAsPic.png',
			            	color:"#f57d4b"
			            }
			        }
			    },
			    calculable : true,
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
		                name : "数量（家）",
			            nameTextStyle : {
                    		color:"#2c8cce",
                    		fontSize:14,
                    		fontFamily:"微软雅黑"
                       },
			        }
			    ],
			    series : [
			        {
			            name:'行业趋势',
			            type:'line',
			            stack: '总量',
			            data:[120, 132, 101, 134, 90, 230, 210]
			        }
			    ]
			}
			var botOption02 = {
				grid:{
			    	x:50,
			    	y:55,
			    	x2:20,
			    	y2:50
			    },
			    tooltip : {
			        trigger: 'axis'
			    },
			    legend: {
			        data:[]
			    },
			    toolbox: {
			        show : true,
			        feature : {
			            saveAsImage : {
			            	show: true,
			            	name:"三板慧-投资事件行业趋势",
			            	icon:'../../../assets/admin/layout/img/saveAsPic.png',
			            	color:"#f57d4b"
			            }
			        }
			    },
			    calculable : true,
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
			            name : "数量（家）",
			            nameTextStyle : {
                    		color:"#2c8cce",
                    		fontSize:14,
                    		fontFamily:"微软雅黑"
                        },
			            splitNumber :5
			        }
			    ],
			    series : []
			}
			
			
			
			if($(window).width() <= 768){
        		var _yy = 90;
        	}else{
        		var _yy = 70;
        	}
			var changeOption = {
				
			    tooltip : {
			        trigger: 'axis'
			    },
			    legend: {
			        data:[],
			        x:50
			    },
			    grid:{
			    	x:50,
			    	y:_yy,
			    	x2:20,
			    	y2:30
			    },
			    toolbox: {
			        show : true,
			        feature : {
			            saveAsImage : {
			            	show: true,
			            	name:"三板慧",
			            	icon:'../../../assets/admin/layout/img/saveAsPic.png',
			            	color:"#f57d4b"
			            }
			        }
			    },
			    calculable : true,
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
			            name : "数量（次）",
			            nameTextStyle : {
                    		color:"#2c8cce",
                    		fontSize:14,
                    		fontFamily:"微软雅黑"
                        },
			        }
			    ],
			    series : [
			    	{
		    			itemStyle:{
		    				emphasis:{
		    					
		    				}
		    			},
			    		data:[]
			    	}
			    ]
			}
			
			
			
			//场外投资url
			var chartUrl = $.kf.INVESTMENTSTATSERVICE;
			//年度热词
			yearWord(2017);//默认2017年
			function yearWord(year){ 	
				$("#wordChart").find(".currentNoData").remove();
				$.kf.ajax({
		            type: "get",
		            url:chartUrl+"?type=investOverviewKeywordCloud&keyword="+year,
		            dataType: "json",
		            data: "",
		            processResponse: function(data) {
		            	if(!isNullOrEmpty(data.data)){
		            		$("#wordChart>div").show();
		            		var dataArr = data.data;
			            	for (var i=0;i<dataArr.length;i++) {
			            		dataArr[i].itemStyle = createRandomItemStyle();
			            	}
		                	optionWord.series[0].data = dataArr;
		                	wordChart.setOption(optionWord,true);
		            	}else{
		            		$("#wordChart>div").hide();
		            		$("#wordChart").append("<div class='currentNoData' style='top:120px;'>暂无数据</div>");
		            	}
		            	
	                }
		        });
			}
			var lengedName = [];//热词数组
			var defaultName = '';//默认热词
	        //年度热词改变
			$.kf.ajax({
	            type: "get",
	            url:chartUrl+"?type=investOverviewKeyword&keyword=keyword",
	            dataType: "json",
	            data: "",
	            processResponse: function(data) {
	            	if(!isNullOrEmpty(data.data.data)){
	            		var changeArr =  data.data.data;
		            	defaultName = data.data.data[0].name;//默认选中第一个热词
	                    for (var i=0;i<changeArr.length;i++) {
	                		changeOption.series[i] = changeArr[i];
	                		changeOption.series[i].type = "line";
	                		lengedName.push(changeArr[i].name);
	                	};
	                	changeOption.legend.data = lengedName;
	                	changeOption.xAxis[0].data = data.data.year;
	                    changeChart.setOption(changeOption,true);
	                    selectTechFun();
	                    //默认方法
		       			changeTable(defaultName);
	            	}else{
	            		selectTechFun();
	            		//$("#selectTech").html("<option selected='selected' value='暂无数据'>暂无数据</option>");
	            		$(".moneyTable").html("<div class='textNoData' style='margin-top:100px;'>暂无数据</div>");
	            		$("#changeChart > div").html("<div class='currentNoData' style='top:120px;'>暂无数据</div>");
	            	}
	            	
                }
	        });
	        //table 热词下拉框
	        function selectTechFun(){
	        	var tr = '';
                $("#selectTech").html("");
                if(isNullOrEmpty(lengedName)){
                	$("#selectTech").html("<option selected='selected' value='暂无数据'>暂无数据</option>");
                	$("#selectTech").select2('val',"暂无数据");
                }else{
                	$(lengedName).each(function (i) {
	                    tr += "<option value=" + lengedName[i] + ">" + lengedName[i] + "</option>";
		            });
		            $("#selectTech").html(tr);
		            //默认选中第一个
		            $("#selectTech").select2('val',defaultName);
                }
                
	        }
	        
	        //echart点击事件
	        /*var ecConfig = require('echarts/config');
			function eConsole(param) {
			    var paramName = param.seriesName;
			    if (param.type == 'click') {
			    	 changeTable(paramName);
			    }
			}
			changeChart.on(ecConfig.EVENT.CLICK, eConsole);*/
			
	        //热词企业表格
	        function changeTable(tech){
	        	$(".moneyTable").find(".textNoData").remove();
	        	$.kf.ajax({
		            type: "get",
		            url:chartUrl+"?type=investOverviewKeywordCompanys&keyword="+tech,
		            dataType: "json",
		            data: "",
		            processResponse: function(data) {
		            	if(!isNullOrEmpty(data)){
			            	getList(data.data);
		            	}else{
		            		$(".moneyTable").html("<div class='textNoData' style='margin-top:100px;'>暂无数据</div>");
		            	}
	                }
		        });
	        }
	        //table function
	        function getList(data) {
		        var list = data;
		        list = list.slice(0,6)
		        var tr = "";
		        $("#changeTable").html("");
		        $(list).each(function (i) {
		            tr += "<tr>";
		            tr += "<td class='creentCom'><a class='' data-name='"+list[i][4]+"' href='"+ $.url.industryUrl() + "id=" + list[i][0] +"'>" + list[i][1] + "</a></td>";
		            tr += "<td>" + list[i][2] +"</td>";
		            tr += "<td>" + list[i][3]+ "</td>";
		            tr += "</tr>";
		        });
		        $("#changeTable").html(tr);
		        $("#changeTable tr").on("mouseenter",function(){
		        	$(this).addClass("creentBg").siblings("tr").removeClass("creentBg");
		        })
		    };
			//投资事件行业伦次分布
			investPub(2017);//默认2017年
			function investPub(year){
				$("#barChart").find(".currentNoData").remove();
				$.kf.ajax({
		            type: "get",
		            url:chartUrl+"?type=investOverviewIndustryround&keyword="+year,
		            dataType: "json",
		            data: "",
		            processResponse: function(data) {
		            	if(!isNullOrEmpty(data.data.investnum)){
		            		$("#barChart > div").show();
		            		var investArray = data.data.investnum;
		                	var inLength = investArray.length;
		                	for (var i=0;i<inLength;i++) {
		                		optionBar.series[i].data = investArray[i].data;
		                		optionBar.series[i].name = investArray[i].name;
		                	}
		                    optionBar.xAxis[0].data = data.data.industry;
		                    optionBar.legend.data = data.data.round;
		                    barChart.setOption(optionBar,true);
		            	}else{
		            		$("#barChart > div").hide();
		            		$("#barChart").append("<div class='currentNoData' style='top:180px;'>暂无数据</div>");
		            	}
	                }
		        });
			}
			
        	
	        //投资事件轮次趋势
	        $.kf.ajax({
	            type: "get",
	            url:chartUrl+"?type=investOverviewRound&keyword=round",
	            dataType: "json",
	            data: "",
	            processResponse: function(data) {
	            	if(!isNullOrEmpty(data.data.data)){
	            		 var indArr =  data.data.data;
	                    for (var i=0;i<indArr.length;i++) {
	                		botOption02.series[i] = indArr[i];
	                		botOption02.series[i].type = "line";
	                	};
	                	botOption02.xAxis[0].data = data.data.year;
	                	botOption02.legend.data = data.data.round;
	                    bottomChart02.setOption(botOption02);
	            	}else{
	            		$("#bottomChart01 > div").html("<div class='currentNoData' style='top:140px;'>暂无数据</div>");
	            	}
                   
                }
	        });
	        //投资事件行业趋势
	        investIudustry("all");//默认全行业
	        function investIudustry(name){
	        	$("#bottomChart02").find(".currentNoData").remove();
		        $.kf.ajax({
		            type: "get",
		            url:chartUrl+"?type=investOverviewIndustry&keyword="+name,
		            dataType: "json",
		            data: "",
		            processResponse: function(data) {
		            	if(!isNullOrEmpty(data.data.investnum)){
		            		$("#bottomChart02 > div").show();
		            		var allArr =  data.data.investnum;
		                	botOption01.series[0].data = data.data.investnum
		                	botOption01.xAxis[0].data = data.data.year;
		                    bottomChart01.setOption(botOption01,true);
		            	}else{
		            		$("#bottomChart02 > div").hide();
		            		$("#bottomChart02").append("<div class='currentNoData' style='top:140px;'>暂无数据</div>");
		            	}
	                    
	                }
		        });
	        }
	        
	        //年度热词查询
	        $("#selectOne").on("click",function(){
				var _text = $("#s2id_selectOne").select2("val");
				yearWord(_text);
	        });
	        //行业伦次分布查询
	        $("#selectTwo").on("click",function(){
				var _text = $("#s2id_selectTwo").select2("val");
				investPub(_text);
	        });
	         //投资事件行业趋势
	        $("#selectThree").on("click",function(){
				var _text = $("#s2id_selectThree").select2("val");
				investIudustry(_text);
	        });
	         //热词代表企业
	        $("#selectTech").on("click",function(){
				var _text = $("#s2id_selectTech").select2("val");
				changeTable(_text);
	        });
        	
        }
    );

	
})
