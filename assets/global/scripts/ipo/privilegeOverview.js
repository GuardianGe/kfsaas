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
            'echarts/chart/funnel'
        ],
        function (ec) {
            // 基于准备好的dom，初始化echarts图表
            var h = $("#wrap-can").width();
            $("#sellChart").width(h);
            var sellChart = ec.init(document.getElementById('sellChart'),"macarons");
            //resize
            window.addEventListener("resize",function(){
            	var h = $("#wrap-can").width();
            	$("#sellChart").width(h);
		    	sellChart.resize();
		    });
            
            var arr2 = "";
	        var arr = [];
	        var arr3 = [];
            var option = {
            	toolbox: {
			        show : true,
			        feature : {
			            saveAsImage : {
			            	show: true,
			            	name:"三板慧-三板慧色谱",
			            	icon:'../../assets/admin/layout/img/saveAsPic.png',
			            	color:"#f57d4b"
			            }
			        }
			    },
			    tooltip : {
			        trigger: 'item',
			        formatter:function(params,ticket){
			        	arr3 = arr2.split(",")
			        	var res = "";
						var indexNum = params.dataIndex;
						if(indexNum == 0){
							res = arr3[2]
						}else if(indexNum == 1){
							res = arr3[1]
						}else if(indexNum == 2){
							res = arr3[0]//精选层
						}else if(indexNum == 3){
							res = arr3[3]
						}else if(indexNum == 4){
							res = arr3[4]
						}
						return res+"家";
			        }
			        //formatter: "{a} <br/>{b} : {c}"
			    },
			    title : {
			        text: '',
			        textStyle:{
			        	fontSize:14,
			        	color:"#999999"
			        }
			    },
			    legend: {
			        orient: 'horizontal',
			        x: '10%',
			        data : []
			    },
			    calculable : true,
			    series : [
			        {
			            name:'金字塔',
			            type:'funnel',
			            width: '75%',
			            height: '80%',
			            y: '15%',
			            sort : 'ascending',
			            itemStyle:{
			            	normal: {
		                        color: function(params) {
		                            // build a color map as your need.
		                            var colorList = [
		                              '#FEB984','#D67A81','#5EB2EC','#B6A3DC','#3AC7C8'
		                            ];
		                            return colorList[params.dataIndex]
		                        },
		                        label: {
			                        position: 'left',
			                        textStyle:{
			                        	fontSize:"14px"
			                        }
			                    }
		                    }
			            },
			            data:[
			                {value:0, name:'IPO监控'},
			                {value:0, name:'IPO预测'},
			                {value:0, name:'精选层'},
			                {value:0, name:'创新层'},
			                {value:0, name:'基础层'}
			            ]
			        }
			    ]
			};
            
            
			//三板慧色谱
			var _url = $.kf.INDUSTRYGRAPH;
	        $.kf.ajax({
	            type: "get",
	            url: _url,
	            data: "",
	            dataType: "json",
	            processResponse: function (data) {
	            	if(!isNullOrEmpty(data.data.data)){
	            		//实时行情折线图
		            	var obj = data.data;
		            	var arr1=[];
		            	arr1.push(obj.value);
		            	arr2 = obj.value.toString();
		            	arr = arr1[0];
		            	option.legend.data = obj.title;
						var maxVal = 100; //默认最大值
						var arrList = [20,40,60,80,100];
						//option.series[0].data = arrList;
						for(var i=0; i<arrList.length; i++){
		                	option.series[0].data[i].value = arrList[i]; //查找图表数组中的位置并赋值
						}
		                sellChart.setOption(option);
	            	}else{
	            		$("#sellChart > div").append("<div class='currentNoData' style='top:140px;'>暂无数据</div>");
	            	}
	            	
	            }
	        });
	        var ecConfig = require('echarts/config');
	        function eConsole(param) {
	            var mes = '';
	            if (typeof param.seriesIndex != 'undefined') {
	                mes += param.seriesIndex;
	            }
	            if (param.type == 'click') {
	                if(param.dataIndex == 2){//精选层
	                	window.top.location.href = $.url.privilegeUrl() + "currentTab=tab2&page=1";
	                }else if(param.dataIndex == 1){//ipo预测
	                	window.top.location.href = $.url.privilegeUrl() + "currentTab=tab1&page=1";
	                }else if(param.dataIndex == 0){//ipo辅导
	                	window.top.location.href = $.url.privilegeUrl() + "currentTab=tab0&page=1";
	                }else if(param.dataIndex == 3){//创新层
	                	window.top.location.href = $.url.companyList() + "&currentTab=tab1&type=1";
	                }else if(param.dataIndex == 4){//基础层
	                	window.top.location.href = $.url.companyList() + "&currentTab=tab1&type=2";
	                }
	            }
	        }
	
	        sellChart.on(ecConfig.EVENT.CLICK, eConsole);
		});	
		
		
		//本月IPO辅导提示
		$.kf.ajax({
            type: "get",
            url: $.kf.RECORDTIPSMONTH,
            data: "",
            dataType: "json",
            processResponse: function (data) {
                var listData = data.data;
                var tr = "";
                $("#ipoAlert").html("");
                if(!isNullOrEmpty(listData)){
                	$(listData).each(function (i) {
	                    tr += "<tr>";
	                    tr += "<td><a href='"+ $.url.companyListUrl() + "id=" + listData[i].id +"&nameCodeId=" + listData[i].code + "&position=privilege'>"+ listData[i].shortname +"</a></td>";
	                    tr += "<td>"+ listData[i].peRate +"</td>";
	                    tr += "<td>"+ listData[i].marketValue +"</td>";
	                    tr += "<td>"+ listData[i].stageName +"</td>";
	                    if(listData[i].industryName.length > 10){
	                    	tr += "<td title='"+ listData[i].industryName +"'>"+ listData[i].industryName.substring(0,10) +"...</td>";
	                    }else{
	                    	tr += "<td title='"+ listData[i].industryName +"'>"+ listData[i].industryName+"</td>";
	                    }
	                    tr += "</tr>";
	                });
	                $("#ipoAlert").append(tr);
	                $("#ipoAlert tr").on("mouseenter",function(){
				    	$(this).addClass("creentBg").siblings("tr").removeClass("creentBg");
				    });
                }else{
                	$(".moneyTable01").append("<div class='textNoData'>本月暂无IPO辅导提示</div>");
                }
                $("#alertHref").attr("href",$.url.privilegeUrl()+"currentTab=tab0&page=1");
            }
        });
        
        //十大IPO预测
        $.kf.ajax({
            type: "get",
            url: $.kf.COMPANYLISTMONTH,
            data: "",
            dataType: "json",
            processResponse: function (data) {
                var listData = data.data;
                var tr = "";
                $("#ipoPrediction").html("");
                if(!isNullOrEmpty(listData)){
                	$(listData).each(function (i) {
	                    tr += "<tr>";
	                    tr += "<td><a href='"+ $.url.companyListUrl() + "id=" + listData[i].id +"&nameCodeId=" + listData[i].code + "&position=privilege'>"+ listData[i].shortname +"</a></td>";
	                    tr += "<td>"+ listData[i].peRate +"</td>";
	                    tr += "<td>"+ listData[i].totalValue +"</td>";
	                    if(listData[i].industryName.length > 15){
	                    	tr += "<td title='"+ listData[i].industryName +"'>"+ listData[i].industryName.substring(0,15) +"...</td>";
	                    }else{
	                    	tr += "<td title='"+ listData[i].industryName +"'>"+ listData[i].industryName+"</td>";
	                    }
	                    tr += "</tr>";
	                });
	                $("#ipoPrediction").append(tr);
	                $("#predictionHref").attr("href",$.url.privilegeUrl()+"currentTab=tab1&page=1");
	                $("#ipoPrediction tr").on("mouseenter",function(){
				    	$(this).addClass("creentBg").siblings("tr").removeClass("creentBg");
				    });
                }else{
                	$(".moneyTable02").append("<div class='textNoData'>本月暂无十大IPO预测</div>");
                }
                
            }
        });
})
