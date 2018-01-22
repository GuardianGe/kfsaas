/////////////////////////////////////关系图谱 股权关系/////////////////////////////////////////////
//tab切换
$(".relationshipTab a").on("click",function(){
	if($(this).hasClass("notAllowed")){
		return false;
	}
	var thisText = $(this).attr("id");
	$(this).addClass("active").siblings("a").removeClass("active");
	if(thisText == "ownershipStructure"){
		$("#equityRelationshipCon").addClass("active").siblings("div").removeClass("active")
		ownershipStructure();
	}else if(thisText == "customerRelations"){
		$("#updownRelationshipCon").addClass("active").siblings("div").removeClass("active")
		customerRlations();
	}else if(thisText == "supplyChainRelationship"){
		$("#supplyChainRelationshipList").addClass("active").siblings("div").removeClass("active");
		supplyChainRelationship();
	}else if(thisText == "foreignInvestment"){
		$("#foreignInvestmentList").addClass("active").siblings("div").removeClass("active")
		foreignInvestment();
	}else if(thisText == "branchOffice"){
		$("#branchOfficeList").addClass("active").siblings("div").removeClass("active")
		branchOffice();
	}else if(thisText == "storyFinancing"){
		$("#storyFinancingList").addClass("active").siblings("div").removeClass("active")
		storyFinancing();
	}
})

//股权结构
var ownershipStructure = function () {
    $("#mainChart2").width($(".page-content-par").width() - 70)

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
                'echarts/chart/force'
            ],
            function (ec) {
                // 基于准备好的dom，初始化echarts图表
                var myChart = ec.init(document.getElementById('mainChart2'));

                //图表自适应
                window.addEventListener("resize", function () {
                    myChart.resize();
                })

                optionComp = {
                    title: {
                        subtext: '数据来自三板慧',
                        x: 'right',
                        y: 'bottom'

                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} : {b}'

                    },
//		    grid:{
//				backgroundColor:'#eff2fc',
//				borderWidth: 0,
//				width:'100%',
//				height:'100%',
//				x:'1%'
//			},

                    series: [
                        {
                            type: 'force',
                            name: "公司关系",
                            ribbonType: false,
                            categories: [
                                {
                                    name: '公司'

                                },
                                {
                                    name: '股东'

                                },
                                {
                                    name: '分支机构'

                                }

                            ],
                            itemStyle: {
                                normal: {
                                    //color:'#7b7faf',
                                    label: {
                                        show: true,
                                        textStyle: {
                                            color: '#333'

                                        }

                                    },
                                    nodeStyle: {
                                        brushType: 'both',
                                        borderColor: 'rgba(255,215,0,0.4)',
                                        borderWidth: 3

                                    },
                                    linkStyle: {
                                        type: 'curve'

                                    }

                                },
                                emphasis: {
                                    label: {
                                        show: false

                                                // textStyle: null      // 默认使用全局文本样式，详见TEXTSTYLE

                                    },
                                    nodeStyle: {
                                        //r: 30

                                    },
                                    linkStyle: {}

                                }

                            },
                            useWorker: false,
                            minRadius: 35,
                            maxRadius: 50,
                            gravity: 2.0,
                            scaling: 2.0,
                            roam: 'move',
                            nodes: [
                            ],
                            links: [
                            ]

                        }

                    ]
                };

                var id = Query.getHash("id");
                //关系图谱 股权关系
                $.kf.ajax({
                    type: "get",
                    async: false,
                    url:$.kf.GRAPHSERVICEGETMAP + '?type=shareholder&id='+id,
                    dataType: "json",
                    data: "",
                    processResponse: function (result) {
                        if (isData($("#mainChart2"), result.data, "")) {
                            optionComp.series[0].nodes = result.data.nodes;
                            optionComp.series[0].links = result.data.links;
                            window.addEventListener("resize", function () {
                                $("#mainChart2").width($(".page-content-par").width())
                                myChart.setOption(optionComp);
                            })
                            $("#companyName").text(result.data.nodes[0].name); //公司名称
                            myChart.setOption(optionComp);
                        } else {
                            $("#mainChart2").parent().css("background", "none")
                        }
                    }
                });

//              var ecConfig = require('echarts/config');
//              function eConsole(param) {
//                  var mes = '';
//                  if (typeof param.seriesIndex != 'undefined') {
//                      mes += param.seriesIndex;
//                  }
//                  if (param.type == 'click') {
//                      $.kf.ajax({
//                          type: "get",
//                          async: false,
//                          url: $.kf.COMPANYSPECIALTOP,
//                          dataType: "json",
//                          data: "",
//                          processResponse: function (result) {
//                              $("#companyName").text(param.name)
//                              _url2 = $.kf.COMPANYBRANCH + "?" + "id=" + param.data.id + "&page=" + 1;
//                              var lastPage = Query.getHash("page");
//                              //new GetTable(_url2, $("#"), "", relationsList, "get", $("#childCom")).init();
//                              var lastPage = Query.getHash("page");
//					            $.getTable({
//						        	url:_url,//url
//							    	pageId:$("#aaa"),//分页id
//							    	callback:relationsList,//callback
//							    	currentPage:lastPage,
//							    	tbodyId:$("#childCom")//tbody的id,
//						        })
//                              _url = $.kf.SHAREHOLDERLIST + "?" + "id=" + param.data.id + "&page=" + 1;
//                              //new GetTable(_url, $("#pageToolShareholder"), "", shareholderList, "get", $("#shareholderList")).init();
//                              $.getTable({
//						        	url:_url,//url
//							    	pageId:$("#pageToolShareholder"),//分页id
//							    	callback:shareholderList,//callback
//							    	currentPage:lastPage,
//							    	tbodyId:$("#shareholderList")//tbody的id,
//						        })
//                          }
//                      });
//                  }
//              }
//
//              myChart.on(ecConfig.EVENT.CLICK, eConsole);


                //股东信息
				var shareHolder = function (thisDate) {
			        var _url  = $.kf.GETCOMPANYSHAREHOLDERNEW + "?" + "id=" + id + "&page=" + 1;
			        var lastPage = 1;
			        $.getTable({
			        	url:_url,//url
				    	pageId:$("#pageGd"),//分页id
				    	callback:shareHolderList,//callback
				    	currentPage:lastPage,
				    	pageNum:10,
				    	showDataBox:false,
				    	targetId:"gsgk2",
				    	loadId:".maskInTableGd",
				    	tbodyId:$("#tableGudong")//tbody的id,
			        })
			    };
			    //股东信息拼接列表
			    var shareHolderList = function (data) {
			        var list = data.data;
			        var tr = "";
			        $("#tableGudong").html("");
			        $(list).each(function (i) {
			            tr += "<tr>";
			            if(list[i].type == "个人"){
			            	tr += "<td>" + list[i].name + "</td>";
			            }else{
			            	tr += "<td><a href='"+ $.url.industryUrl() + "id=" + list[i].id +"'>" + list[i].name + "</a></td>";
			            }
			            tr += "<td style='text-align:right'>" + list[i].money + "</td>";
			            tr += "<td style='text-align:right'>" + list[i].ratio + "</td>";
			            tr += "</tr>";
			        });
			        $("#tableGudong").append(tr);
			    };
				shareHolder();
            }
    );

}


//客户关系
var customerRlations = function () {
    $("#mainChart2").width($(".page-content-par").width() - 70)

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
                'echarts/chart/force'
            ],
            function (ec) {
                // 基于准备好的dom，初始化echarts图表
                var myChart = ec.init(document.getElementById('updonwChart'));

                //图表自适应
                window.addEventListener("resize", function () {
                    myChart.resize();
                })

                optionComp = {
                    title: {
                        subtext: '数据来自三板慧',
                        x: 'right',
                        y: 'bottom'

                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} : {b}'

                    },
                    series: [
                        {
                            type: 'force',
                            name: "公司关系",
                            ribbonType: false,
                            categories: [
                                {
                                    name: '公司'

                                },
                                {
                                    name: '股东'

                                },
                                {
                                    name: '分支机构'

                                }

                            ],
                            itemStyle: {
                                normal: {
                                    //color:'#7b7faf',
                                    label: {
                                        show: true,
                                        textStyle: {
                                            color: '#333'

                                        }

                                    },
                                    nodeStyle: {
                                        brushType: 'both',
                                        borderColor: 'rgba(255,215,0,0.4)',
                                        borderWidth: 3

                                    },
                                    linkStyle: {
                                        type: 'curve'

                                    }

                                },
                                emphasis: {
                                    label: {
                                        show: false
                                    },
                                    nodeStyle: {
                                        //r: 30

                                    },
                                    linkStyle: {}

                                }

                            },
                            useWorker: false,
                            minRadius: 35,
                            maxRadius: 50,
                            gravity: 2.0,
                            scaling: 2.0,
                            roam: 'move',
                            nodes: [
                            ],
                            links: [
                            ]

                        }

                    ]
                };

                var id = Query.getHash("id");
                //关系图谱 客户关系
                $.kf.ajax({
                    type: "get",
                    async: false,
                    url:$.kf.GRAPHSERVICEGETMAP + '?type=client&id='+id,
//					url: $.kf.GRAPHSERVICEGETMAP + '?type=client&id=101001430002000000000000',
                    dataType: "json",
                    data: "",
                    processResponse: function (result) {
                    	
                        if (isData($("#updonwChart"), result.data, "")) {
                            optionComp.series[0].nodes = result.data.nodes;
                            optionComp.series[0].links = result.data.links;
                            window.addEventListener("resize", function () {
                                $("#updonwChart").width($(".page-content-par").width())
                                myChart.setOption(optionComp);
                            })
                            $("#companyName").text(result.data.nodes[0].name); //公司名称
                            myChart.setOption(optionComp);
                        } else {
                            $("#updonwChart").parent().css("background", "none")
                        }
                    }
                });


                //客户关系列表
                var shareholderList = function (data) {
                    var list = data.data;
                    var tr = "";
                    $("#majorClientList").html("");
                    if (list != "") {
                    	if(!isNullOrEmpty(list[0].date)){
                    		$("#majorClientDate").text(list[0].date);
                    	}else{
                        	$("#majorClientDate").text("--");
                    	}
                        $(list).each(function (i) {
                            tr += "<tr>";
                            tr += "<td>" + list[i].date + "</td>";
                            if (list[i].type == "挂牌") {
                                tr += "<td><a href='" + $.url.companyListUrl() + 'id=' + list[i].id + "' target='_blank'>" + list[i].name + "</a></td>";
                            } else {
                                if (isNullOrEmpty(list[i].id)) {
                                    tr += "<td><span>" + list[i].name + "</span></td>";
                                } else {
                                    tr += "<td><a class='basicName' data-name='" + list[i].name + "' href='" + $.url.industryUrl() + 'id=' + list[i].id + "'>" + list[i].name + "</a></td>";
                                }
                            }
                            tr += "<td style='text-align:right'>" + list[i].money + "</td>";
                            tr += "<td style='text-align:right'>" + list[i].radio + "</td>";
                            tr += "</tr>";
                        });
                        $("#majorClientList").append(tr);
                        var isCookie = false;
                        moneyUrl($(".basicName"), isCookie, "isCookie");
                    }else{
                    	$("#majorClientDate").text("--");
                    }
                };


				var lastPage = Query.getHash("page");
                _url = $.kf.MAJORCLIENT + "?" + "id=" + id + "&page=" + 1;
                //new GetTable(_url, $("#pageToolShareholder"), "", shareholderList, "get", $("#shareholderList2")).init();
                $.getTable({
		        	url:_url,//url
			    	pageId:$("#pageToolMajorClient"),//分页id
			    	callback:shareholderList,//callback
			    	currentPage:lastPage,
			    	tbodyId:$("#majorClientList")//tbody的id,
		        })
            }
    );

}

//供应商关系
var supplyChainRelationship = function () {
    $("#mainChart2").width($(".page-content-par").width() - 70)

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
                'echarts/chart/force'
            ],
            function (ec) {
                // 基于准备好的dom，初始化echarts图表
                var myChart = ec.init(document.getElementById('supplyChart'));

                //图表自适应
                window.addEventListener("resize", function () {
                    myChart.resize();
                })

                optionComp = {
                    title: {
                        subtext: '数据来自三板慧',
                        x: 'right',
                        y: 'bottom'

                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} : {b}'

                    },
                    series: [
                        {
                            type: 'force',
                            name: "公司关系",
                            ribbonType: false,
                            categories: [
                                {
                                    name: '公司'

                                },
                                {
                                    name: '股东'

                                },
                                {
                                    name: '分支机构'

                                }

                            ],
                            itemStyle: {
                                normal: {
                                    //color:'#7b7faf',
                                    label: {
                                        show: true,
                                        textStyle: {
                                            color: '#333'

                                        }

                                    },
                                    nodeStyle: {
                                        brushType: 'both',
                                        borderColor: 'rgba(255,215,0,0.4)',
                                        borderWidth: 3

                                    },
                                    linkStyle: {
                                        type: 'curve'

                                    }

                                },
                                emphasis: {
                                    label: {
                                        show: false
                                    },
                                    nodeStyle: {
                                        //r: 30

                                    },
                                    linkStyle: {}

                                }

                            },
                            useWorker: false,
                            minRadius: 35,
                            maxRadius: 50,
                            gravity: 2.0,
                            scaling: 2.0,
                            roam: 'move',
                            nodes: [
                            ],
                            links: [
                            ]

                        }

                    ]
                };

                var id = Query.getHash("id");
                //关系图谱 客户关系
                $.kf.ajax({
                    type: "get",
                    async: false,
                    url:$.kf.GRAPHSERVICEGETMAP + '?type=supplier&id='+id,
//					url: $.kf.GRAPHSERVICEGETMAP + '?type=supplier&id=101001430002000000000000',
                    dataType: "json",
                    data: "",
                    processResponse: function (result) {
                    	
                        if (isData($("#supplyChart"), result.data, "")) {
                            optionComp.series[0].nodes = result.data.nodes;
                            optionComp.series[0].links = result.data.links;
                            window.addEventListener("resize", function () {
                                $("#supplyChart").width($(".page-content-par").width())
                                myChart.setOption(optionComp);
                            })
                            $("#companyName").text(result.data.nodes[0].name); //公司名称
                            myChart.setOption(optionComp);
                        } else {
                            $("#supplyChart").parent().css("background", "none")
                        }
                    }
                });


                //供应链关系列表
                var shareholderList = function (data) {
                    var list = data.data;
                    var tr = "";
                    $("#supplyList").html("");
                    if (list != "") {
                    	if(!isNullOrEmpty(list[0].date)){
                    		$("#supplyDate").text(list[0].date);
                    	}else{
                        	$("#supplyDate").text("--");
                    	}
                        $(list).each(function (i) {
                            tr += "<tr>";
                            tr += "<td>" + list[i].date + "</td>";
                            if (list[i].type == "挂牌") {
                                tr += "<td><a href='" + $.url.companyListUrl() + 'id=' + list[i].id + "' target='_blank'>" + list[i].name + "</a></td>";
                            } else {
                                if (isNullOrEmpty(list[i].id)) {
                                    tr += "<td><span>" + list[i].name + "</span></td>";
                                } else {
                                    tr += "<td><a class='basicName' data-name='" + list[i].name + "' href='" + $.url.industryUrl() + 'id=' + list[i].id + "'>" + list[i].name + "</a></td>";
                                }
                            }
                            tr += "<td>" + list[i].money + "</td>";
                            tr += "<td>" + list[i].radio + "</td>";
                            tr += "</tr>";
                        });
                        $("#supplyList").append(tr);
                        var isCookie = false;
                        moneyUrl($(".basicName"), isCookie, "isCookie");
                    }else{
                    	$("#supplyDate").text("--");
                    }
                };


				var lastPage = Query.getHash("page");
                _url = $.kf.MAJORSUPPLIER + "?" + "id=" + id + "&page=" + 1;
                $.getTable({
		        	url:_url,//url
			    	pageId:$("#pageToolSupplyClient"),//分页id
			    	callback:shareholderList,//callback
			    	currentPage:lastPage,
			    	tbodyId:$("#majorClientList")//tbody的id,
		        })
            }
    );

}

//对外投资
var foreignInvestment = function () {
    $("#mainChart2").width($(".page-content-par").width() - 70)

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
                'echarts/chart/force'
            ],
            function (ec) {
                // 基于准备好的dom，初始化echarts图表
                var myChart = ec.init(document.getElementById('foreignChart'));

                //图表自适应
                window.addEventListener("resize", function () {
                    myChart.resize();
                })

                optionComp = {
                    title: {
                        subtext: '数据来自三板慧',
                        x: 'right',
                        y: 'bottom'

                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} : {b}'

                    },
                    series: [
                        {
                            type: 'force',
                            name: "公司关系",
                            ribbonType: false,
                            categories: [
                                {
                                    name: '公司'

                                },
                                {
                                    name: '股东'

                                },
                                {
                                    name: '分支机构'

                                }

                            ],
                            itemStyle: {
                                normal: {
                                    //color:'#7b7faf',
                                    label: {
                                        show: true,
                                        textStyle: {
                                            color: '#333'

                                        }

                                    },
                                    nodeStyle: {
                                        brushType: 'both',
                                        borderColor: 'rgba(255,215,0,0.4)',
                                        borderWidth: 3

                                    },
                                    linkStyle: {
                                        type: 'curve'

                                    }

                                },
                                emphasis: {
                                    label: {
                                        show: false
                                    },
                                    nodeStyle: {
                                        //r: 30

                                    },
                                    linkStyle: {}

                                }

                            },
                            useWorker: false,
                            minRadius: 35,
                            maxRadius: 50,
                            gravity: 2.0,
                            scaling: 2.0,
                            roam: 'move',
                            nodes: [
                            ],
                            links: [
                            ]

                        }

                    ]
                };
                var id = Query.getHash("id");
                //关系图谱 客户关系
                $.kf.ajax({
                    type: "get",
                    async: false,
                    url:$.kf.GRAPHSERVICEGETMAP + '?type=investment&id='+id,
//					url: $.kf.GRAPHSERVICEGETMAP + '?type=investment&id=101001430002000000000000',
                    dataType: "json",
                    data: "",
                    processResponse: function (result) {
                        if (isData($("#foreignChart"), result.data, "")) {
                            optionComp.series[0].nodes = result.data.nodes;
                            optionComp.series[0].links = result.data.links;
                            window.addEventListener("resize", function () {
                                $("#foreignChart").width($(".page-content-par").width())
                                myChart.setOption(optionComp);
                            })
                            $("#companyName").text(result.data.nodes[0].name); //公司名称
                            myChart.setOption(optionComp);
                        } else {
                            $("#foreignChart").parent().css("background", "none")
                        }
                    }
                });


                //对外投资列表
                var foreignChartList = function (data) {
                    var list = data.data;
                    var tr = "";
                    $("#foreignList").html("");
                    if (list != "") {
                    	if(!isNullOrEmpty(list[0].investmentDate)){
                    		$("#foreignDate").text(list[0].investmentDate);
                    	}else{
                        	$("#foreignDate").text("--");
                    	}
                        $(list).each(function (i) {
                            tr += "<tr>";
                            tr += "<td>" + list[i].investmentDate + "</td>";
                            tr += "<td><a href='" + $.url.industryUrl() + "id=" + list[i].investedId + "'>" + list[i].investedName + "</a></td>";
                            tr += "<td>" + list[i].legalPerson + "</td>";
                            tr += "<td>" + list[i].capital + "</td>";
                            tr += "<td style='text-align:right'>" + list[i].investmentAmount + "</td>";
                            tr += "<td style='text-align:right'>" + list[i].investRatio + "</td>";
                            tr += "<td>" + list[i].registrationDate + "</td>";
                            tr += "<td>" + list[i].status + "</td>";
                            tr += "</tr>";
                        });
                        $("#foreignList").append(tr);
                        var isCookie = false;
                        moneyUrl($(".basicName"), isCookie, "isCookie");
                    }else{
                    	$("#foreignDate").text("--");
                    }
                };


				var lastPage = Query.getHash("page");
                _url = $.kf.GRAPHSERVICEEVENTSINVESTMENT + "?" + "id=" + id + "&page=" + 1;
                //new GetTable(_url, $("#pageToolShareholder"), "", shareholderList, "get", $("#shareholderList2")).init();
                $.getTable({
		        	url:_url,//url
			    	pageId:$("#pageToolForeign"),//分页id
			    	callback:foreignChartList,//callback
			    	currentPage:lastPage,
			    	tbodyId:$("#foreignList")//tbody的id,
		        })
            }
    );

}

//分支机构
var branchOffice = function () {
    $("#mainChart2").width($(".page-content-par").width() - 70)
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
                'echarts/chart/force'
            ],
            function (ec) {
                // 基于准备好的dom，初始化echarts图表
                var myChart = ec.init(document.getElementById('branchOfficeChart'));

                //图表自适应
                window.addEventListener("resize", function () {
                    myChart.resize();
                })

                optionComp = {
                    title: {
                        subtext: '数据来自三板慧',
                        x: 'right',
                        y: 'bottom'

                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} : {b}'

                    },
                    series: [
                        {
                            type: 'force',
                            name: "公司关系",
                            ribbonType: false,
                            categories: [
                                {
                                    name: '公司'

                                },
                                {
                                    name: '股东'

                                },
                                {
                                    name: '分支机构'

                                }

                            ],
                            itemStyle: {
                                normal: {
                                    //color:'#7b7faf',
                                    label: {
                                        show: true,
                                        textStyle: {
                                            color: '#333'

                                        }

                                    },
                                    nodeStyle: {
                                        brushType: 'both',
                                        borderColor: 'rgba(255,215,0,0.4)',
                                        borderWidth: 3

                                    },
                                    linkStyle: {
                                        type: 'curve'

                                    }

                                },
                                emphasis: {
                                    label: {
                                        show: false
                                    },
                                    nodeStyle: {
                                        //r: 30

                                    },
                                    linkStyle: {}

                                }

                            },
                            useWorker: false,
                            minRadius: 35,
                            maxRadius: 50,
                            gravity: 2.0,
                            scaling: 2.0,
                            roam: 'move',
                            nodes: [
                            ],
                            links: [
                            ]

                        }

                    ]
                };

                var id = Query.getHash("id");
                //关系图谱 客户关系
                $.kf.ajax({
                    type: "get",
                    async: false,
                    url: $.kf.GRAPHSERVICEGETMAP + '?type=agency&id='+id,
//					url: $.kf.GRAPHSERVICEGETMAP + '?type=agency&id=101001430002000000000000',
                    dataType: "json",
                    data: "",
                    processResponse: function (result) {
                        if (isData($("#branchOfficeChart"), result.data, "")) {
                            optionComp.series[0].nodes = result.data.nodes;
                            optionComp.series[0].links = result.data.links;
                            window.addEventListener("resize", function () {
                                $("#branchOfficeChart").width($(".page-content-par").width())
                                myChart.setOption(optionComp);
                            })
                            $("#companyName").text(result.data.nodes[0].name); //公司名称
                            myChart.setOption(optionComp);
                        } else {
                            $("#branchOfficeChart").parent().css("background", "none")
                        }
                    }
                });


                //分支机构列表
                var branchOfficeList = function (data) {
                    var list = data.data;
                    var tr = "";
                    $("#branchOfficeList2").html("");
                    if (list != "") {
	                    if(!isNullOrEmpty(list[0].date)){
	                    	$("#branchOfficeDate").text(list[0].date);
	                    }else{
	                    	$("#branchOfficeDate").text("--");
	                    }
	                    $(list).each(function (i) {
	                        tr += "<tr>";
	                        if (list[i].type = "0") {
	                            tr += "<td><a class='basicName' data-name='" + list[i].name + "' href='" + $.url.industryUrl() + 'id=' + list[i].id + "'>" + list[i].name + "</a></td>";
	                        } else {
	                            tr += "<td><a href='" + $.url.companyListUrl() + '#id=' + list[i].id + "'>" + list[i].name + "</a></td>";
	                        }
	                        tr += "<td>" + list[i].date + "</td>";
	                        tr += "<td>" + list[i].legalPerson + "</td>";
	                        tr += "<td>" + list[i].industry + "</td>";
	                        tr += "<td>" + list[i].status + "</td>";
	                        tr += "</tr>";
	                    });
	                    $("#branchOfficeList2").append(tr);
	                }else{
	                	$("#branchOfficeDate").text("--");
	                }
                    var isCookie = false;
                    moneyUrl($(".basicName"), isCookie, "isCookie");
                };


				var lastPage = Query.getHash("page");
                _url = $.kf.GRAPHSERVICEBRANCHLIST + "?" + "id=" + id + "&page=" + 1;
                //new GetTable(_url, $("#pageToolShareholder"), "", shareholderList, "get", $("#shareholderList2")).init();
                $.getTable({
		        	url:_url,//url
			    	pageId:$("#pageToolBranchOffice"),//分页id
			    	callback:branchOfficeList,//callback
			    	currentPage:lastPage,
			    	tbodyId:$("#branchOfficeList2")//tbody的id,
		        })
            }
    );

}

//历史融资
var storyFinancing = function () {

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
                'echarts/chart/force'
            ],
            function (ec) {
                // 基于准备好的dom，初始化echarts图表
                var myChart = ec.init(document.getElementById('storyFinancingChart'));

                //图表自适应
                window.addEventListener("resize", function () {
                    myChart.resize();
                })

                optionComp = {
                    title: {
                        subtext: '数据来自三板慧',
                        x: 'right',
                        y: 'bottom'

                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} : {b}'

                    },
                    series: [
                        {
                            type: 'force',
                            name: "公司关系",
                            ribbonType: false,
                            categories: [
                                {
                                    name: '公司'

                                },
                                {
                                    name: '股东'

                                },
                                {
                                    name: '分支机构'

                                }

                            ],
                            itemStyle: {
                                normal: {
                                    //color:'#7b7faf',
                                    label: {
                                        show: true,
                                        textStyle: {
                                            color: '#333'

                                        }

                                    },
                                    nodeStyle: {
                                        brushType: 'both',
                                        borderColor: 'rgba(255,215,0,0.4)',
                                        borderWidth: 3

                                    },
                                    linkStyle: {
                                        type: 'curve'

                                    }

                                },
                                emphasis: {
                                    label: {
                                        show: false
                                    },
                                    nodeStyle: {
                                        //r: 30

                                    },
                                    linkStyle: {}

                                }

                            },
                            useWorker: false,
                            minRadius: 35,
                            maxRadius: 50,
                            gravity: 2.0,
                            scaling: 2.0,
                            roam: 'move',
                            nodes: [
                            ],
                            links: [
                            ]

                        }

                    ]
                };
                var id = Query.getHash("id");
                //关系图谱 客户关系
                $.kf.ajax({
                    type: "get",
                    async: false,
                    url: $.kf.GRAPHSERVICEGETMAP + '?type=financing&id='+id,
//					url: $.kf.GRAPHSERVICEGETMAP + '?type=financing&id=101001430002000000000000',
                    dataType: "json",
                    data: "",
                    processResponse: function (result) {
                        if (isData($("#storyFinancingChart"), result.data, "")) {
                            optionComp.series[0].nodes = result.data.nodes;
                            optionComp.series[0].links = result.data.links;
                            window.addEventListener("resize", function () {
                                $("#storyFinancingChart").width($(".page-content-par").width())
                                myChart.setOption(optionComp);
                            })
                            $("#companyName").text(result.data.nodes[0].name); //公司名称
                            myChart.setOption(optionComp);
                        } else {
                            $("#storyFinancingChart").parent().css("background", "none")
                        }
                    }
                });


                //投资机构列表
                var storyFinancingList = function (data) {
                    var list = data.data;
                    var tr = "";
                    $("#storyFinancingList2").html("");
                    if (list != "") {
	                    if(!isNullOrEmpty(list[0].investmentDate)){
	                    	$("#storyFinancingDate").text(list[0].investmentDate);
	                    }else{
	                    	$("#storyFinancingDate").text("--");
	                    }
	                    $(list).each(function (i) {
			            tr += "<tr>";
			            tr += "<td>" + list[i].investmentDate + "</td>";
			             tr += "<td>" + list[i].invest + "</td>";
			             tr += "<td>" + list[i].investmentAmount + "</td>";
			             tr += "<td>" + list[i].investRatio + "</td>";
			             tr += "<td class='investT"+i+" investEdg'><div class='investTwo'></div><div class='investAll'></div></td>";
			            tr += "</tr>";
			        });
			        $("#storyFinancingList2").append(tr);
			        //投资机构列表
				        for (var i = 0; i < list.length; i++) {
				            var tr2 = [];
				            var tr3 = [];
				            var investmentL = list[i].investmentAgency.length;
				            for (var j = 0; j < investmentL; j++) {
				                if (investmentL == 0 || investmentL == 1) {
				                    if (list[i].investmentAgency[j].investorId) {
				                        tr2 += "<a href=" + $.url.investmentAgencyDetailsUrl() + "id=" + list[i].investmentAgency[j].investorId + ">" + list[i].investmentAgency[j].investment + "</a>";
				                    } else {
				                        tr2 += list[i].investmentAgency[j].investment;
				                    }
				                } else {
				                    if (list[i].investmentAgency[j].investorId) {
				                    	if(list[i].investmentAgency[j].investment !=" "){
				                    		tr2 += "<a href=" + $.url.investmentAgencyDetailsUrl() + "id=" + list[i].investmentAgency[j].investorId + ">" + list[i].investmentAgency[j].investment + "</a>/";
				                    	}else{
				                    		tr2 += "";
				                    	}
				                    } else {
				                    	if(list[i].investmentAgency[j].investment !=" "){
				                        	tr2 += list[i].investmentAgency[j].investment + "/";
				                        }else{
				                        	tr2 += "";
				                        }
				                    }
				                    if(j<2){
				                    	tr3 = tr2;
				                    }
				                }
				            }
				            if(investmentL<3){
				            	if(investmentL ==2){
				            		$(".investT" + i).find(".investTwo").append(tr2.substring(0,tr2.length-1));
				            	}else{
				            		$(".investT" + i).find(".investTwo").append(tr2);
				            	}
				            }else{
				            	var tr4 = tr3.substring(0,tr3.length-1)+'...<b class="investSummary investJg">展开</b>';
				            	$(".investT" + i).find(".investTwo").append(tr4);
				            	$(".investT" + i).find(".investAll").append(tr2.substring(0,tr2.length-1)+'<b class="investSummary investSummaryClose investJg2">收起</b>');
				            }
				        }
						$(".investEdg").each(function(){
							if($(this).html().indexOf("/") > 0){
								$(this).html($(this).html().substring(0,$(this).html().length-1));
							}
						});
					}
                };


				var lastPage = Query.getHash("page");
                _url = $.kf.GRAPHSERVICEINVESTED + "?" + "id=" + id + "&page=" + 1;
                //new GetTable(_url, $("#pageToolShareholder"), "", shareholderList, "get", $("#shareholderList2")).init();
                $.getTable({
		        	url:_url,//url
			    	pageId:$("#pageToolStoryFinancing"),//分页id
			    	callback:storyFinancingList,//callback
			    	currentPage:lastPage,
			    	tbodyId:$("#storyFinancingChart2")//tbody的id,
		        })
            }
    );

}