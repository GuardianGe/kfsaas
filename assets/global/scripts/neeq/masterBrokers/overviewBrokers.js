
/*券商概览*/
var OverviewBrokers = function () {

	var brokersDate = function(){
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
	                // 基于准备好的dom，初始化echarts图表
	                var myChartBar = ec.init(document.getElementById('barChart'),'macarons');
	                var myChartBar2 = ec.init(document.getElementById('barChart2'),'macarons');
	                var myChartBar3 = ec.init(document.getElementById('barChart3'),'macarons');
	                var myChartBar4 = ec.init(document.getElementById('barChart4'),'macarons');
	
	                //图表自适应
	                window.addEventListener("resize", function () {
	                	var _width = $(".page-content-par").width() - 20;
		            	$("#barChart2").width($(".page-content-par").width());
	                    myChartBar.resize();
	                    myChartBar2.resize();
	                    myChartBar3.resize();
	                    myChartBar4.resize();
	                })
					
	                //券商地区分布/////////////////////////////////////////////////
	                var brokersArea = function(){
	                	var mgh = $(".barChartH").height();
		                optionBar = {
		                	toolbox: {
						        show : true,
						        feature : {
						            saveAsImage : {
						            	show: true,
						            	name:"三板慧-券商地区分布",
						            	icon:'../../assets/admin/layout/img/saveAsPic.png',
						            	color:"#f57d4b"
						            }
						        }
						    },
						    tooltip: {
	                        show: true
		                    },
		                    grid :{ y:'40',height:'70%'},
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
		                            nameTextStyle:{
		                            	color:'#000000',
		                            	fontWeight:'bold'
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
		                    url: $.kf.BROKERAGESERVICE + '?type=statsSecompanyAreaStat',
		                    dataType: "json",
		                    data: "",
		                    processResponse: function (result) {
		                        if (isData($("#barChart"), result.data, "")) {
		                            optionBar.xAxis[0].data = result.data.area;
		                            optionBar.series[0].data = result.data.value;
		                            myChartBar.setOption(optionBar,true);
		                            //$(".yeara").text(result.date)
		                        }else{
		                        	$("#barChart").parent("div").css("background","none")
		                        }
		                    }
		                });
	                }
	                brokersArea();
	                
	                
	                //券商弹窗
	                $(".trPop").click(function(){
	                	var seCode = $(this).attr("set-value");
	                	Query.setHash({
                            "seCode": seCode
                        });
	                })
					var brokersModal = function(){
						//券商
					    var specialWord = function () {
					        $.kf.ajax({
					            type: "get",
					            url: $.kf.SPECIALWORD,
					            data: "",
					            dataType: "json",
					            processResponse: function(data){
					            	specialFun(data);
					            }
					        });
						};
						specialWord();
						//主办券商l列表
						var specialFun = function(data){
							var data = data.data;
							var tr = "";
							var trPop = "";
							var m = 0;
							$(data).each(function(i){
								trPop += "<li data-name=" + data[i].letter +" name =" + data[i].code +" title=' " + data[i].broker_name + " '>" + data[i].broker_name + "</li>";
							});
							$("#compPop2").find("ul").empty("").html("");
							$("#compPop2").find("ul").append(trPop);
							
							//弹窗选择事件
							comPopSpecial();
							
							//字母筛选
							popLetter();
							
						};
						
						/*券商弹窗选择*/
						var comPopSpecial = function(){
							var _text = "";
							var seCode = "";
							
							$("#compPop2").find("li").unbind().on("click",function(){
								_text = $(this).text();
								seCode = $(this).attr("name");
								$(this).addClass("provinceLi");
								$(this).siblings().removeClass("provinceLi");
								$("#compPopspecailSave2").addClass("btn-primary").removeClass("default");
							});
							$("#compPopspecailSave2").unbind().on("click",function(){
								var aCode = Query.getHash("seCode");
								if($(".city-list").find(".provinceLi").text() != ""){
									$(".city-list").find("li").show();
									$(".province-ul").find("li").removeClass("provinceLi");
									$(".province-ul").find("li:last").addClass("provinceLi");
									$('#myModal02').modal('hide');
									if(aCode == 1){
										$("#brokerageName").html("");
										$("#brokerageName").html(_text);
										$("#brokerageName").attr("name",seCode)
										brokersDistributed();
										$("#listedIndustry").addClass("active").siblings("a").removeClass("active")
									}else if(aCode == 2){
										$("#brokerageName2").html("");
										$("#brokerageName2").html(_text);
										$("#brokerageName2").attr("name",seCode)
										brokersMarket();
										$("#listedIndustry2").addClass("active").siblings("a").removeClass("active")
									}else if(aCode == 3){
										$("#brokerageName3").html("");
										$("#brokerageName3").html(_text);
										$("#brokerageName3").attr("name",seCode)
										brokersAdd();
										$("#listedIndustry3").addClass("active").siblings("a").removeClass("active")
									}
									
								}
							})
						};
					}
					brokersModal();
	                
	                //推荐挂牌分布/////////////////////////////////////////////////
	                var brokersDistributed = function(){
	                	var anIndustry = function(){
	                		var mgh = $(".barChartH").height();
			                optionBar2 = {
			                	toolbox: {
							        show : true,
							        feature : {
							            saveAsImage : {
							            	show: true,
							            	name:"三板慧-推荐挂牌分布",
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
					                        rotate:-35,//倾斜度 -90 至 90 默认为0  
					                        margin:2
					                    },    
			                            data : []
			                        }
			                    ],
			                    yAxis : [
			                        {
			                            type : 'value'
			                        }
			                    ],
			                    series : [
			                        {
			                            name:"数量",
			                            type:"bar",
			                            itemStyle: {
			                            	normal: {
								                color:'#8cc6f3',
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
			                var id = "";
			                id = $("#brokerageName").attr("name");
			                $.kf.ajax({
			                    type: "get",
			                    async: false,
			                    url: $.kf.BROKERAGESERVICE + '?type=statsSecompanyListcompanyIndustryStat&id=' + id,
			                    //url: $.kf.BROKERAGESERVICE + '?type=statsSecompanyListcompanyAreaStat&id=' + id,
			                    dataType: "json",
			                    data: "",
			                    processResponse: function (result) {
			                        if (isData($("#barChart2"), result.data, "")) {
			                        	$("#barChart2").parent("div").css("background","#F7F7F7")
			                        	$("#barChart2").parent().show();
			                        	$("#barChart2").show();
			                            optionBar2.xAxis[0].data = result.data.industry;
				                        optionBar2.series[0].data = result.data.value;
			                            myChartBar2.setOption(optionBar2,true);
			                        }else{
			                        	$("#barChart2").parent("div").css("background","none")
			                        }
			                    }
			                });
	                	}
	                	anIndustry();
	                	
		                
		                $("#listedIndustry").click(function(){
		                	var id = "";
			                id = $("#brokerageName").attr("name");
		                	$(this).addClass("active").siblings("a").removeClass("active")
		                	$.kf.ajax({
			                    type: "get",
			                    async: false,
			                    url: $.kf.BROKERAGESERVICE + '?type=statsSecompanyListcompanyIndustryStat&id=' + id,
			                    dataType: "json",
			                    data: "",
			                    processResponse: function (result) {
			                        if (isData($("#barChart2"), result.data, "")) {
			                        	$("#barChart2").parent("div").css("background","#F7F7F7")
			                        	$("#barChart2").parent().show();
			                        	$("#barChart2").show();
			                            optionBar2.xAxis[0].data = result.data.industry;
			                            optionBar2.series[0].data = result.data.value;
			                            myChartBar2.setOption(optionBar2,true);
			                        }else{
			                        	$("#barChart2").parent("div").css("background","none")
			                        }
			                    }
			                });
		                })
		                
		                $("#listedArea").click(function(){
		                	var id = "";
			                id = $("#brokerageName").attr("name");
		                	$(this).addClass("active").siblings("a").removeClass("active")
		                	$.kf.ajax({
			                    type: "get",
			                    async: false,
			                    url: $.kf.BROKERAGESERVICE + '?type=statsSecompanyListcompanyAreaStat&id=' + id,
			                    dataType: "json",
			                    data: "",
			                    processResponse: function (result) {
			                        if (isData($("#barChart2"), result.data, "")) {
			                        	$("#barChart2").parent("div").css("background","#F7F7F7")
			                        	$("#barChart2").parent().show();
			                        	$("#barChart2").show();
			                            optionBar2.xAxis[0].data = result.data.area;
			                            optionBar2.series[0].data = result.data.value;
			                            myChartBar2.setOption(optionBar2,true);
			                        }else{
			                        	$("#barChart2").parent("div").css("background","none")
			                        }
			                    }
			                });
		                })
	                }
	                brokersDistributed();
	                
	                //做市企业分布/////////////////////////////////////////////////
	                var brokersMarket = function(){
	                	var anIndustry = function(){
	                		var mgh = $(".barChartH").height();
			                optionBar3 = {
			                	toolbox: {
							        show : true,
							        feature : {
							            saveAsImage : {
							            	show: true,
							            	name:"三板慧-做市企业分布",
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
					                        rotate:-35,//倾斜度 -90 至 90 默认为0  
					                        margin:2
					                    },    
			                            data : []
			                        }
			                    ],
			                    yAxis : [
			                        {
			                            type : 'value'
			                        }
			                    ],
			                    series : [
			                        {
			                            name:"数量",
			                            type:"bar",
			                            itemStyle: {
			                            	normal: {
								                color:'#feb985',
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
			                var id = "";
			                id = $("#brokerageName2").attr("name");
			                $.kf.ajax({
			                    type: "get",
			                    async: false,
			                    url: $.kf.BROKERAGESERVICE + '?type=statsSecompanyMakemarketIndustryStat&id=' + id,
			                    //url: $.kf.BROKERAGESERVICE + '?type=statsSecompanyListcompanyAreaStat&id=' + id,
			                    dataType: "json",
			                    data: "",
			                    processResponse: function (result) {
			                        if (isData($("#barChart3"), result.data, "")) {
			                        	$("#barChart3").parent("div").css("background","#F7F7F7")
			                        	$("#barChart3").parent().show();
			                        	$("#barChart3").show();
			                            optionBar3.xAxis[0].data = result.data.industry;
				                        optionBar3.series[0].data = result.data.value;
			                            myChartBar3.setOption(optionBar3,true);
			                        }else{
			                        	$("#barChart3").parent("div").css("background","none")
			                        }
			                    }
			                });
	                	}
	                	anIndustry();
	                	
		                $("#listedIndustry2").click(function(){
		                	var id = "";
			                id = $("#brokerageName2").attr("name");
		                	$(this).addClass("active").siblings("a").removeClass("active")
		                	$.kf.ajax({
			                    type: "get",
			                    async: false,
			                    url: $.kf.BROKERAGESERVICE + '?type=statsSecompanyMakemarketIndustryStat&id=' + id,
			                    dataType: "json",
			                    data: "",
			                    processResponse: function (result) {
			                        if (isData($("#barChart3"), result.data, "")) {
			                        	$("#barChart3").parent("div").css("background","#F7F7F7")
			                        	$("#barChart3").parent().show();
			                        	$("#barChart3").show();
			                            optionBar3.xAxis[0].data = result.data.industry;
			                            optionBar3.series[0].data = result.data.value;
			                            myChartBar3.setOption(optionBar3,true);
			                        }else{
			                        	$("#barChart3").parent("div").css("background","none")
			                        }
			                    }
			                });
		                })
		                
		                $("#listedArea2").click(function(){
		                	var id = "";
			                id = $("#brokerageName2").attr("name");
		                	$(this).addClass("active").siblings("a").removeClass("active")
		                	$.kf.ajax({
			                    type: "get",
			                    async: false,
			                    url: $.kf.BROKERAGESERVICE + '?type=statsSecompanyMakemarketAreaStat&id=' + id,
			                    dataType: "json",
			                    data: "",
			                    processResponse: function (result) {
			                        if (isData($("#barChart3"), result.data, "")) {
			                        	$("#barChart3").parent("div").css("background","#F7F7F7")
			                        	$("#barChart3").parent().show();
			                        	$("#barChart3").show();
			                            optionBar3.xAxis[0].data = result.data.area;
			                            optionBar3.series[0].data = result.data.value;
			                            myChartBar3.setOption(optionBar3,true);
			                        }else{
			                        	$("#barChart3").parent("div").css("background","none")
			                        }
			                    }
			                });
		                })
	                }
	                brokersMarket();
	                
	                //增发企业分布/////////////////////////////////////////////////
	                var brokersAdd = function(){
	                	var anIndustry = function(){
	                		var mgh = $(".barChartH").height();
			                optionBar4 = {
							    tooltip: {
		                        show: true
			                    },
			                    grid :{ y:'40',height:'60%'},
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
			                            type : 'value'
			                        }
			                    ],
			                    series : [
			                        {
			                            name:"数量",
			                            type:"bar",
			                            itemStyle: {
			                            	normal: {
								                color:'#39c6c7',
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
			                var id = "";
			                id = $("#brokerageName3").attr("name");
			                $.kf.ajax({
			                    type: "get",
			                    async: false,
			                    url: $.kf.BROKERAGESERVICE + '?type=statsSecompanyDilutionIndustryStat&id=' + id,
			                    //url: $.kf.BROKERAGESERVICE + '?type=statsSecompanyListcompanyAreaStat&id=' + id,
			                    dataType: "json",
			                    data: "",
			                    processResponse: function (result) {
			                        if (isData($("#barChart4"), result.data, "")) {
			                        	$("#barChart4").parent("div").css("background","#F7F7F7")
			                        	$("#barChart4").parent().show();
			                        	$("#barChart4").show();
			                            optionBar4.xAxis[0].data = result.data.industry;
				                        optionBar4.series[0].data = result.data.value;
			                            myChartBar4.setOption(optionBar4,true);
			                        }else{
			                        	$("#barChart4").parent("div").css("background","none")
			                        }
			                    }
			                });
	                	}
	                	anIndustry();
	                	
		                $("#listedIndustry3").click(function(){
		                	var id = "";
			                id = $("#brokerageName3").attr("name");
		                	$(this).addClass("active").siblings("a").removeClass("active")
		                	$.kf.ajax({
			                    type: "get",
			                    async: false,
			                    url: $.kf.BROKERAGESERVICE + '?type=statsSecompanyDilutionIndustryStat&id=' + id,
			                    dataType: "json",
			                    data: "",
			                    processResponse: function (result) {
			                        if (isData($("#barChart4"), result.data, "")) {
			                        	$("#barChart4").parent("div").css("background","#F7F7F7")
			                        	$("#barChart4").parent().show();
			                        	$("#barChart4").show();
			                            optionBar4.xAxis[0].data = result.data.industry;
			                            optionBar4.series[0].data = result.data.value;
			                            myChartBar4.setOption(optionBar4,true);
			                        }else{
			                        	$("#barChart4").parent("div").css("background","none")
			                        }
			                    }
			                });
		                })
		                
		                $("#listedArea3").click(function(){
		                	var id = "";
			                id = $("#brokerageName3").attr("name");
		                	$(this).addClass("active").siblings("a").removeClass("active")
		                	$.kf.ajax({
			                    type: "get",
			                    async: false,
			                    url: $.kf.BROKERAGESERVICE + '?type=statsSecompanyDilutionAreaStat&id=' + id,
			                    dataType: "json",
			                    data: "",
			                    processResponse: function (result) {
			                        if (isData($("#barChart4"), result.data, "")) {
			                        	$("#barChart4").parent("div").css("background","#F7F7F7")
			                        	$("#barChart4").parent().show();
			                        	$("#barChart4").show();
			                            optionBar4.xAxis[0].data = result.data.area;
			                            optionBar4.series[0].data = result.data.value;
			                            myChartBar4.setOption(optionBar4,true);
			                        }else{
			                        	$("#barChart4").parent("div").css("background","none")
			                        }
			                    }
			                });
		                })
	                }
	                brokersAdd();
	            })
	}
    

    return {
        init: function () {
        	brokersDate();
        }
    }
}();