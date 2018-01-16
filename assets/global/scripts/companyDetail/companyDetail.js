	var fromType = Query.getHash("from");
	var htmlWid = document.getElementsByTagName("html")[0];
	modelCon();
	function modelCon(){
		$(".textGl-detail").off().on("click",function(){
			$(".patentList").html("");
			$(".descriptionNote").text("");
			$("#patentImg").attr("src","")
			
			if($(this).hasClass("riskWarn-detail")){
				var dataTitle = "风险详情";
			}else if($(this).hasClass("textGl-hypj")){
				var dataTitle = "报告详情";
			}else if($(this).parent().hasClass("riskWarn-chbox")){
				var dataTitle = "变更详情";
			}else if($(this).hasClass("disBok")){
				var dataTitle = "状态详情";
			}else if($(this).hasClass("textGl-cpxx")){
				var dataTitle = "产品信息";
			}else if($(this).hasClass("businessCcope-detail")){
				var dataTitle = "经营范围";
			}else if($(this).hasClass("patentA")){
				var dataTitle = "国家知识产权信息（专利）";
				$("#myModalOut2").find(".modal-title").text(dataTitle);
		    		var _thisTr =  $(this).parents("tr");
		    		var patentList = "";
		    		patentList+= "<li><b>申请公布号</b><span>"+ _thisTr.children(".publishNumber").text() +"</span></li>";
		        	patentList+= "<li><b>申请号</b><span>"+ _thisTr.children(".applicationNumber").text() +"</span></li>";
		  			patentList+= "<li><b>分类号</b><span>"+ _thisTr.children(".classificationNumber").text() +"</span></li>";
		  			patentList+= "<li><b>发明名称</b><span>"+ _thisTr.children(".patentName").text() +"</span></li>";
		  			patentList+= "<li><b>发明人</b><span>"+ _thisTr.children(".inventor").text() +"</span></li>";
		  			patentList+= "<li><b>申请日</b><span>"+ _thisTr.children(".Ldate").text() +"</span></li>";
		  			patentList+= "<li><b>代理机构</b><span>"+ _thisTr.children(".proxyAgency").text() +"</span></li>";
		  			patentList+= "<li><b>地址</b><span>"+ _thisTr.children(".address").text() +"</span></li>";
		  			patentList+= "<li><b>申请人</b><span>"+ _thisTr.children(".applicant").text() +"</span></li>";
		  			patentList+= "<li><b>申请公布日</b><span>"+ _thisTr.children(".publishDate").text() +"</span></li>";
		  			patentList+= "<li><b>代理人</b><span>"+ _thisTr.children(".agent").text() +"</span></li>";
					$(".patentList").append(patentList);
					$(".descriptionNote").text(_thisTr.children(".abstract").text());
				    $("#patentImg").attr("src",_thisTr.children(".patentImg").text())
			}else{
				var dataTitle = $(this).parents("table").find("th").eq($(this).parents("td").index()).text();
			}
			if($(this).hasClass("businessCcope-detail")){
				var dataContent = $(this).siblings("span").attr('title');
			}else{
				var dataContent = $(this).siblings("span").text();
			}
	    	$("#myModalOut").find(".modal-title").text(dataTitle);
	    	if(isNullOrEmpty(dataContent)||dataContent == "--"){
	    		$("#myModalOut").find("#privateListutO").html("暂无详情！");
	    	}else{
	    		$("#myModalOut").find("#privateListutO").html(dataContent);
	    	}
		})
	}
/*
 
 * 
 * 
 * 公告
 * 
 * 
 * */
var CompanyDetail = function () {
	var companyNameJs = "";
    //公告分类
    var noteIndustry = function () {
        $.kf.ajax({
            type: "get",
            url: $.kf.GETNOTICECATEGORY,
            data: "",
            dataType: "json",
            processResponse: function (data) {
                typeFun(data);
                //选项点击事件
                investBtn();
                //地址栏参数，刷新
                getUrlParam();
            }
        });
    };
    noteIndustry();

    //公告分类列表
    var typeFun = function (data) {
        var data = data.data;
        var trPop = "";
        var tr = "";
        var noteChild = [];
        var m = 0;
        $(data).each(function (i) {
            m++;
            trPop += "<li name='" + data[i].id + "'title='" + data[i].name + "'>" + data[i].name + "</li>";
        });

        //全部子级
        for (var i = 0; i < data.length; i++) {
            if (!isNullOrEmpty(data[i].child)) {
                for (var j = 0; j < data[i].child.length; j++) {
                    tr += "<li name='" + data[i].child[j].id + "'title='" + data[i].child[j].name + "'>" + data[i].child[j].name + "</li>";
                }
            }
        }
        ;

        //是否显示更多按钮
        $("#comSpecial").append('<li style="padding:2px 8px" id = "trPop"  class="hang-more" data-toggle="modal" data-target="#myModal02">更多>></li>');
        $("#compPop").find("ul").empty("").html("");
        $("#compPop").find("ul").append(tr);
        $("#compPop").find("li").each(function () {
            if ($(this).text() == "全部") {
                $(this).remove();
            }
        });
        $(".province-ul").find("ul").append(trPop);
        $(".province-ul").find("ul").append('<li class="provinceLi">全部</li>')

        //类型切换
        $(".province-ul ul li").on("click", function () {
            $("#compPop").find("ul").empty("").html("");
            $("#compPopspecailSave").removeClass("btn-primary").addClass("default");
            $(this).addClass("provinceLi");
            $(this).siblings().removeClass("provinceLi");
            var typeTxt = $(this).text();
            if (typeTxt == "全部") {
                //全部子级
                for (var i = 0; i < data.length; i++) {
                    if (!isNullOrEmpty(data[i].child)) {
                        for (var j = 0; j < data[i].child.length; j++) {
                            tr += "<li name='" + data[i].child[j].id + "'title='" + data[i].child[j].name + "'>" + data[i].child[j].name + "</li>";
                        }
                    }
                }
                ;


                $("#compPop").find("ul").append(tr);
                $("#compPop").find("li").each(function () {
                    if ($(this).text() == "全部") {
                        $(this).remove();
                    }
                });
                //弹窗选择事件
                comPopSpecial();
            } else {
                var tc = "";
                $.kf.ajax({
                    type: "get",
                    url: $.kf.GETNOTICECATEGORY,
                    data: "",
                    dataType: "json",
                    processResponse: function (data) {
                        var data = data.data;
                        $("#compPop").find("ul").empty("").html("");
                        for (var i = 0; i < data.length; i++) {
                            if (data[i].name == typeTxt) {
                        		for (var j = 0; j < data[i].child.length; j++) {
                                    tc += "<li name='" + data[i].child[j].id + "'title='" + data[i].child[j].name + "'>" + data[i].child[j].name + "</li>";
                                }
                                $("#compPop").find("ul").append(tc);
                            }
                        }
                        comPopSpecial();
                    }
                });
            }

        })

        //弹窗选择事件
        comPopSpecial();
    };

    //弹窗保存
    var comPopSpecial = function () {
        var _text = "";
        $(".city-list").find("li").on("click", function () {
            _text = $(this).text();
            seCode = $(this).attr("name");
            $(this).addClass("provinceLi");
            $(this).siblings().removeClass("provinceLi");
            $("#compPopspecailSave").removeClass("default");
            $("#compPopspecailSave").addClass("btn-primary");
        });
        $("#compPopspecailSave").unbind().on("click", function () {
            if($(this).parents(".myModal01 ").find(".city-list").find(".provinceLi").text() != ""){
            	_text = $(this).parents(".myModal01 ").find(".city-list").find(".provinceLi").text();
				$(".city-list").find("li").show();
                $('#myModal02').modal('hide');
                $("#comSpecial").find("li").removeClass("hang-active");
                $("#comSpecial").find("li").each(function(){
                	if($(this).attr("name") == seCode){
                		$(this).addClass("hang-active");
                	}
                });
                if(_text == "全部"){
                	seCode = $(".province-ul").find(".provinceLi").attr("name");
               		_text = $(".province-ul").find(".provinceLi").text();
                }
                Query.setHash({
                    "type": seCode,
                    "typeText":_text
                });
                var type = seCode;
                var id = Query.getHash("id");
                $("#allListSo").show();
                $(".listOne").remove();
                $("#allListSo").find("ul").prepend("<li class='listOne' name=" + type + ">" + _text + "<span class='soListClose'></span></li>");
            	initNoticeList();
            }
            removeThing();
        })
    };


    //显示关闭按钮
    $("#soClear").on("click", function () {
        Query.setHash({
            "type": "",
            "typeText":''
        });
        $(this).parent("li").siblings().remove();
        $(this).parents("#allListSo").hide();
        $("#comSpecial").find("li").eq(0).addClass("hang-active").siblings().removeClass("hang-active");
        initNoticeList();
    });

    //类别选中
    function investBtn() {
        $(".allList").find("li").unbind("click").on("click", function (event) {
            event.preventDefault()
            var ind = $("#soCheck").find("li").length;
            var afund = Query.getHash("type");
            if (!$(this).hasClass("hang-more")) {
                $("#investList").html("");
                $(this).parent("ul").find("li").removeClass("hang-active");
                $(this).addClass("hang-active");
                type = $(this).text();
                seCode = $(this).attr("name");
                if ($(this).index() == 0) {
                    if ($(".listOne").length) {
                        if (ind <= 2) {
                            $("#allListSo").hide();
                        }
                        Query.setHash({
                            "type": "",
                            "typeText":""
                        });
                        $(".listOne").remove(); //删除已选领域状态
                    }

                } else {
                    $("#allListSo").show();
                    Query.setHash({
                        "type": seCode,
                        "typeText":type
                    });
                    $(".listOne").remove();
                    $("#allListSo").find("ul").prepend("<li class='listOne' name='" + seCode + "'>" + type + "<span class='soListClose'></span></li>");
                }
                initNoticeList();
            }
            removeThing();
        });
    }
    ;
    var getUrlParam = function () {
        var _type = Query.getHash("type");
        var _typeText = Query.getHash("typeText");
        $("#compQs").find("li").each(function (i) {
            if (!isNullOrEmpty(_type)) {
                if ($(this).attr("name") != _type) {
                    $(this).removeClass("hang-active");
                    $(this).nextAll("li").removeClass("hang-active");
                    $("#compPop").find("li").each(function () {
                        if ($(this).attr("name") != _type) {
                            $(this).removeClass("hang-active");
                            $(this).nextAll("li").removeClass("hang-active");
                        } else {
                            $(this).addClass("hang-active");
                            $(this).siblings("li").removeClass("hang-active");
                            _typeText = $(this).text();
                        }
                    })
                } else {
                    $(this).addClass("hang-active");
                    $(this).siblings("li").removeClass("hang-active");
                    _typeText = $(this).text();
                }
            }

        });


        if (isNullOrEmpty(_type)) {
            $("#allListSo").hide();
        }else{
            $("#allListSo").show();
            $(".listOne").remove();
            $("#allListSo").find("ul").prepend("<li class='listOne' name=" + _type + ">" + _typeText + "<span class='soListClose'></span></li>");
        }
        //显示关闭按钮
        $("#soClear").on("click", function () {
            $(this).parents(".soList").find("li").children("span").show();
        });


        //清空选项
        removeThing();


        //初始化列表
        //    initTable();

    };

    var removeThing = function () {
        //点击关闭按钮
        $(".soListClose").on("click", function () {
            var flg = $(this).index();
            if ($(this).parents(".allListSo").find("li").length == 2) {
                $(this).parents(".allListSo").hide();
            }
            $(this).parent().remove();
            //查询条件清除地址栏参数
            if ($(this).parent().hasClass("listOne")) {
                $("#compQs").find("li").each(function () {
                    if ($(this).text() == "全部") {
                        $(this).addClass("hang-active");
                        $(this).siblings().removeClass("hang-active");
                    }
                });
                Query.setHash({
                    type: ""
                });
            }
            initNoticeList();
        });
    };

    var tableSelect = function () {
        new Select($("#comSelect2"), {}).init();
        //转让方式
        $("#comSelect2").find("li").on("click", function () {
            $("#tableOne").html("");
            initNoticeList();
        });
    }






    //公告
    var selectType = "";
    //获取公司ID
    var getHash = function () {
        //company_id = QUERY.getHash("company_id");

        //console.log(company_id);
    };

    //请求地址	
    var initNoticeList = function () {
        var _url = "";
        var id = Query.getHash("id");
        var type = Query.getHash("type");
        if(!isNullOrEmpty(type)){
        	$("#comSpecial").find("li").each(function(){
        		if($(this).attr("name") == type){
        			$(this).addClass("hang-active");
        		}else{
        			
        		}
        	})
        	$("#allListSo").show();
        }
        var keyword = $("#noticeId").val();
        var isNegative = $("#noteType").attr("name");
        _url = $.kf.GETCOMPANYNOTICE + "?" + "id=" + id + "&type=" + type + "&isNegative=" + isNegative + "&keyword=" + keyword + "&page=" + 1;
        var lastPage = Query.getHash("page");
        $.getTable({
        	url:_url,//url
	    	pageId:$("#pageTool"),//分页id
	    	callback:noticeList,//callback
	    	currentPage:lastPage,
	    	tbodyId:$("#tableOne")//tbody的id,
        })
        noticeSearch();
        tableSelect();
    };
    //公告列表
    var noticeList = function (data) {
        var list = data.data;
        var tr = "";
        $("#tableOne").html("");
        $(list).each(function (i) {
            tr += "<tr>";
            if (list[i].url) {
                tr += "<td class='row-new-title'><a href='" + list[i].url + "' target='_blank'>" + list[i].title + "</a></br><p>" + list[i].highlight + "</p></td>";
            } else {
                tr += "<td class='row-new-title'>" + list[i].title + "</td>";
            }
            /*tr += "<li class=''>"+list[i].highlight+"</li>";*/
            tr += "<td class='txtCt'>" + list[i].publishType + "</td>";
            tr += "<td class='txtCt'>" + list[i].isNegative + "</td>";
            tr += "<td class='row-new-date txtCt'>" + list[i].date + "</td>";
            tr += "</tr>";
        });
        $("#tableOne").append(tr);
    };


    //公告  搜索

    var noticeSearch = function () {
        var _li = "";
        var id = Query.getHash("id");

        $("#noticeBtn").unbind("click").on("click", function () {
            $("#tableOne").html("");
            initNoticeList();
        })
        //重置
		$("#noticeBtnReset").unbind("click").on("click", function () {
			var type = "";
			Query.setHash({
                type: ""
            });
            $("#tableOne").html("");
            $("#noticeId").val("");
            var keyword = "";
            var isNegative = $("#noteType").attr("name");
            $("#soClear").click();
        })
        //回车查询
        //enter
        $("#noticeId").on("keydown", function (e) {
            var keyCode = e.which;
            if (keyCode == 13) {
                $("#noticeBtn").click();
            }

        });
    }
    
	/*
     
     * 
     * 公司概况
     * 
     * 
     * */

	var companyStatus = function(){
		//公司高管
		compGg();
		if(fromType != "investCompany"){
			//十大股东
		    shareHolder();
		    //股本结构
		    capitalGb();
		    //股票分红
		    capitalStructure();
		    //股票增发
		    capitalZf();
		    //核心员工
		    compYg();
		}else{
			//非挂牌基本信息
			basicContent();
			//非挂牌历史融资
			historyFin();
			//非挂牌股东信息
			shareHolderX();
			shareHolderXEcharts();
			//非挂牌核心团队
			corePerson();
			//产品信息
			productInfo();
			//竞品信息
			comProductAny();
		}
		
	}
	//非挂牌基本信息
	var basicContent=function(){
		var _url =$.kf.GETCOMPANYINFOSER + "?" + "id=" + id + "&page=" + 1;
		$.kf.ajax({
            type: "get",
            url: _url,
            data: "",
            dataType: "json",
            processResponse: function (data) {
                var obj = data.data;
                new LoadingAjax($(".maskInAjax"), {}, $("#comManAll")).close();
                new LoadingAjax($(".maskInAjax"), {}, $("#basicTable")).close();
                if(!isNullOrEmpty(obj)){
                	basicConList(data);
                }
            }
        });
	}
	var basicConList = function(data){
		var list = data.data;
		$("#fullnameIn").text(list.fullname);
		$("#telIn").text(list.tel);
		$("#addressIn").text(list.address);
		$("#postCodeIn").text(list.postCode);
		$("#legalRepresentativeIn").text(list.legalRepresentative);
		$("#detailedAddressIn").text(list.detailedAddress);
		$("#registrationDateIn").text(list.registrationDate);
		$("#peopleIn").text(list.people);
		$("#industryIn").text(list.industryName);
		if(!isNullOrEmpty(list.website)){
			$("#websiteIn").html('<a href="'+ list.website +'" target="_blank">'+ list.website +'</a>');
		}
	}
	//非挂牌历史融资
	 var historyFin = function () {
        var _url = "";
        _url = $.kf.GRAPHSERVICEINVESTED + "?" + "id=" + id + "&page=" + 1;
        var lastPage = 1;
        $.getTable({
        	showDefaultTabel:showDefaultTabel,
        	url:_url,//url
	    	pageId:$("#pageToolHistoryFin"),//分页id
	    	callback:historyFinList,//callback
	    	currentPage:lastPage,
	    	loadId:".maskInTableRz",
	    	showDataBox:false,
	    	targetId:"gsgk9",
	    	tbodyId:$("#historyFin")//tbody的id,
        })
    };
    
    //拼接列表
    var historyFinList = function (data) {
        var list = data.data;
        var tr = "";
        $("#historyFin").html("");
        $(list).each(function (i) {
            tr += "<tr>";
            tr += "<td>" + list[i].investmentDate + "</td>";
             tr += "<td>" + list[i].step + "</td>";
             tr += "<td>" + list[i].investmentAmount + "</td>";
             tr += "<td>" + list[i].investRatio + "</td>";
             if(isNullOrEmpty(list[i].companyId)){
            	tr += "<td>" + list[i].companyName + "</td>";
             }else{
            	tr += "<td><a href='" + $.url.investmentAgencyDetailsUrl() + "id=" + list[i].companyId + "'>" + list[i].companyName + "</a></td>";
             }
            tr += "</tr>";
        });
        $("#historyFin").append(tr);
    };
    //非挂牌股东信息
	var shareHolderX = function (thisDate) {
        var _url  = $.kf.GETCOMPANYSHAREHOLDERNEW + "?" + "id=" + id + "&limit=5&page=" + 1;
        var lastPage = 1;
        $.getTable({
        	url:_url,//url
	    	pageId:$("#pageGx"),//分页id
	    	callback:shareHolderListX,//callback
	    	currentPage:lastPage,
	    	pageNum:5,
	    	showDataBox:false,
	    	targetId:"gsgk10",
	    	loadId:".maskInTableGx",
	    	tbodyId:$("#tableGudongx")//tbody的id,
        })
    };
    //非挂牌股东信息拼接列表
    var shareHolderListX = function (data) {
        var list = data.data;
        var tr = "";
        $("#tableGudongx").html("");
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
        $("#tableGudongx").append(tr);
    };
    //非挂牌股东信息echarts图表
    var shareHolderXEcharts = function(){
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
	            'echarts/chart/pie',
	        ],
	        function (ec) {
	            // 基于准备好的dom，初始化echarts图表
	            var myChartPie = ec.init(document.getElementById('shareHolderX')); 
	            $("#shareHolderX").width($(".page-content-par").width()*0.52);
				//图表自适应
				/*window.addEventListener("resize",function(){
		        	myChartPie.resize();
		        })*/
			option = {
				calculable : false,
				title: {
			        text: '出资占比',
			        x: 135,
			        y: 120,
			        textStyle: {
			            fontWeight: 'normal',
			            fontSize: 16
			        }
			    },
			    tooltip : {
			        trigger: 'item',
			        formatter: "{b}</br>出资比例 : {c}%"
			    },
			    legend: {
			        orient : 'vertical',
			        x : 320,
			        y : 60,
			        data:[],
			        textStyle:{
			        	fontFamily:"微软雅黑"
			        }
			    },
			    color: ['#ffcb6f', '#5eaff1', '#fe9a9c', '#89d467','#f88d54', '#af8bd5'],
			    series : [
			        {
			            name:'',
			            type:'pie',
			            radius : ['40%', '70%'],
			            color: ['#86D560', '#AF89D6', '#59ADF3', '#FF999A', '#FFCC67'],
			            center: ['30%', '50%'],
			            itemStyle : {
			                normal : {
			                    label : {
			                        show : false,
			                        formatter : "{c}"
			                    },
			                    labelLine : {
			                        show : false
			                    }
			                },
			            },
			            data:[]
			        }
			    ]
			};
			var _url = "";
	        var id = Query.getHash("id");
	        _url = $.kf.GETCOMPANYSHAREHOLDERGRAP + "?" + "id=" + id ;
			$.kf.ajax({
	            type: "get",
	            url: _url,
	            data: "",
	            dataType: "json",
	            processResponse: function(data){
	            	var list = data.data;
	            	if(isNullOrEmpty(list.data)){
	            		$("#shareHolderX").hide();
//	            		option.title.text = "暂无数据";
//	            		option.series[0].data = [{"name":"","value":0}];
	            	}else{
	            		option.legend.data = list.title;
	            		option.series[0].data = list.data;
	            	}
	            	
	            	myChartPie.setOption(option);
            	}
	        });
        })
	}
    
    //非挂牌核心团队
    var corePerson = function () {
        var _url = "";
        var id = Query.getHash("id");
    	 _url = $.kf.GETCOMPANYCORETEAM + "?" + "id=" + id + "&limit=5&page=" + 1;
        var lastPage = 1;
        $.getTable({
	        showDefaultTabel:showDefaultTabel,
        	url:_url,//url
	    	pageId:$("#pageCorePer"),//分页id
	    	callback:corePersonList,//callback
	    	currentPage:lastPage,
	    	pageNum:5,
	    	showDataBox:false,
	    	loadId:".maskInTableHx",
	    	targetId:"gsgk12",
	    	tbodyId:$("#corePersonBox")//tbody的id,
        })
    };

    //拼接列表
    var corePersonList = function (data) {
        var list = data.data;
        var tr = "";
        $("#corePersonBox").html("");
        $(list).each(function (i) {
        	tr += "<li>";
			tr += '<div class="corePer-left">';
			if(isNullOrEmpty(list[i].logo)){
				tr += '<img src="../../assets/admin/layout/img/rentou.png" alt="" />';
			}else{
				tr += '<img src="'+ list[i].logo +'" alt="" />';
			}
			tr += '<span>'+ list[i].name +'</span>';
			tr += '</div>';
			tr += '<div class="corePer-right">';
			if(isNullOrEmpty(list[i].title)){
				tr += '<div class="corePer-jop">--</div>';
			}else{
				tr += '<div class="corePer-jop">'+ list[i].title +'</div>';
			}
			tr += '<div style="overflow: hidden;padding-left: 5px;">';
			tr += '<div class="corePer-time">';
			if(!isNullOrEmpty(list[i].content)){
				$(list[i].content).each(function(j){
					tr += '<span><i></i>'+ list[i].content[j] +'</span>';
				})
			}
			tr += '</div>';
			tr += '</div>';
			tr += '</div>';
			tr += '</li>';
        });
        $("#corePersonBox").append(tr);
    };
	//公司高管
 	//高管请求地址
    var compGg = function (thisDate) {
        var _url = "";
        var id = Query.getHash("id");
        if(isNullOrEmpty(thisDate)){
        	
        	 _url = $.kf.GETCOMPANYEXECUTIVENEW + "?" + "id=" + id + "&page=" + 1;
        }else{
        	showDefaultTabel = true;
        	_url = $.kf.GETCOMPANYEXECUTIVENEW + "?" + "id=" + id + "&page=" + 1+"&date="+thisDate;
        }
        var lastPage = 1;
        $.getTable({
        	showDefaultTabel:showDefaultTabel,
        	url:_url,//url
	    	pageId:$("#pageGg"),//分页id
	    	callback:compGgList,//callback
	    	pageNum:10,
	    	currentPage:lastPage,
	    	loadId:".maskInTableGg",
	    	targetId:"gsgk1",
	    	showDataBox:false,
	    	tbodyId:$("#tableGg")//tbody的id,
        })
    };
    //拼接列表
    var compGgList = function (data) {
        var list = data.data;
        var tr = "";
        $("#tableGg").html("");
        $(list).each(function (i) {
            tr += "<tr>";
            tr += "<td>" + list[i].name + "</td>";
            tr += "<td>" + list[i].country + "</td>";
            tr += "<td>" + list[i].job + "</td>";
            tr += "<td>" + list[i].gender + "</td>";
//          tr += "<td>" + list[i].age + "</td>";
            tr += "<td>" + list[i].education + "</td>";
            tr += "<td>" + list[i].term + "</td>";
            if(isNullOrEmpty(list[i].resume)){
            	tr += "<td> -- </td>";
            }else{
            	tr += "<td class='textGl-box'><span>" + list[i].resume + "</span><a class='textGl-detail' data-toggle='modal' data-target='#myModalOut'>查看详情</a></td>";
            }
            tr += "</tr>";
        });
        if(isNullOrEmpty($("#timeListGg").html())){
        	$(data.date).each(function(i){
	    		if(i==0){
	    			$("#timeListGg").append("<li class='timeChildGg active'><a>"+data.date[i]+"</a></li>");
	    		}else{
	    			$("#timeListGg").append("<li class='timeChildGg'><a>"+data.date[i]+"</a></li>");
	    		}
	    	})
        }
        $("#tableGg").append(tr);
        tableGg();
        modelCon();
    };
     //日期事件
    tableGg();
    function tableGg (){
        //日期点击事件
        $(".timeChildGg a").off().on("click",function(){
        	$(this).parent("li").addClass("active").siblings("li").removeClass("active");
        	compGg($(this).text());
        });
        //日期滚动效果
        rollTim($("#timelfGg"),$("#timergGg"),$("#timeListGg"),130);
    }
    
    
    //产品信息
	 var productInfo = function () {
        var _url = "";
        _url = $.kf.GETCOMPANYPRODUCT + "?" + "id=" + id + "&page=" + 1;
        var lastPage = 1;
        $.getTable({
        	showDefaultTabel:showDefaultTabel,
        	url:_url,//url
	    	pageId:$("#pageCp"),//分页id
	    	callback:productInfoList,//callback
	    	currentPage:lastPage,
	    	loadId:".maskInTableCp",
	    	showDataBox:false,
	    	targetId:"gsgk7",
	    	tbodyId:$("#tableCp")//tbody的id,
        })
    };
    
    //拼接列表
    var productInfoList = function (data) {
        var list = data.data;
        var tr = "";
        $("#tableCp").html("");
        $(list).each(function (i) {
            tr += "<tr>";
            tr += "<td class='leftIn'>" + list[i].productName + "</td>";
            tr += "<td class='leftIn'>" + list[i].productShortname + "</td>";
            tr += "<td class='leftIn'>" + list[i].productType + "</td>";
            tr += "<td class='leftIn'>" + list[i].area + "</td>";
            tr += "<td><a class='textGl-detail textGl-cpxx' data-toggle='modal' data-target='#myModalOut'>查看详情</a><span class='col-hide'>"+ list[i].content +"</span></td>";
            tr += "</tr>";
        });
        $("#tableCp").append(tr);
        modelCon();
    };
    
    //竞品分析
 	var comProductAny = function () {
        var _url = "";
        _url = $.kf.GETPETITORS + "?" + "id=" + id + "&page=" + 1;
        var lastPage = 1;
        $.getTable({
        	showDefaultTabel:showDefaultTabel,
        	url:_url,//url
	    	pageId:$("#pageJp"),//分页id
	    	callback:comProductAnyList,//callback
	    	currentPage:lastPage,
	    	loadId:".maskInTableJp",
	    	showDataBox:false,
	    	targetId:"gsgk11",
	    	tbodyId:$("#tableJp")//tbody的id,
        })
    };
    
    //拼接列表
    var comProductAnyList = function (data) {
        var list = data.data;
        var tr = "";
        $("#tableJp").html("");
        $(list).each(function (i) {
            tr += "<tr>";
            if(list[i].type == "新三板"){
            	var _link = $.url.companyListUrl();
            }else{
            	var _link = $.url.industryUrl();
            }
            if(isNullOrEmpty(list[i].id)){
            if(isNullOrEmpty(list[i].logo)){
	            	tr += "<td><div class='investOrgImg'><div class='investOrgBox'><img src='../../assets/admin/layout/img/investImg.png' /></div><span>"+ list[i].name +"</span></div></td>";
	            }else{
	            	tr += "<td><div class='investOrgImg'><div class='investOrgBox'><img src='"+ list[i].logo +"' /></div><span>"+ list[i].name +"</span></div></td>";
	            }
            }else{
    			if(isNullOrEmpty(list[i].logo)){
            	tr += "<td><div class='investOrgImg'><div class='investOrgBox'><img src='../../assets/admin/layout/img/investImg.png' /></div><a class='basicName' href='"+ $.url.investmentAgencyDetailsUrl()+ "id=" + list[i].id +"'>"+ list[i].name +"</a></div></td>";
            }else{
            	tr += "<td><div class='investOrgImg'><div class='investOrgBox'><img src='"+ list[i].logo +"' /></div><a class='basicName' href='"+ $.url.investmentAgencyDetailsUrl()+ "id=" + list[i].id +"'>"+ list[i].name +"</a></div></td>";
	            }
            }
            tr += "<td style='text-align:center'>"+list[i].area +"</td>";
            tr += "<td style='text-align:center'>"+list[i].step +"</td>";
            tr += "<td style='text-align:center'>"+list[i].industry +"</td>";
            tr += "<td style='text-align:center'>"+list[i].scope +"</td>";
            tr += "<td style='text-align:center'>"+list[i].date +"</td>";
            tr += "</tr>";
        });
        $("#tableJp").append(tr);
        modelCon();
    };
    //十大股东
    //十大股东请求地址
    var shareHolder = function (thisDate) {
        var _url = "";
        var id = Query.getHash("id");
        if(isNullOrEmpty(thisDate)){
        	
        	 _url = $.kf.GETCOMPANYSHAREHOLDERS + "?" + "id=" + id + "&page=" + 1;
        }else{
        	showDefaultTabel = true;
        	_url = $.kf.GETCOMPANYSHAREHOLDERS + "?" + "id=" + id + "&page=" + 1+"&date="+thisDate;
        }
        var lastPage = 1;
        $.getTable({
	        showDefaultTabel:showDefaultTabel,
        	url:_url,//url
	    	pageId:$("#pageGd"),//分页id
	    	callback:shareHolderList,//callback
	    	currentPage:lastPage,
	    	pageNum:10,
	    	showDataBox:false,
	    	targetId:"gsgk2",
	    	loadId:".maskInTableGd",
	    	tbodyId:$("#tableGd")//tbody的id,
        })
    };

    //拼接列表
    var shareHolderList = function (data) {
        var list = data.data;
        var tr = "";
        $("#tableGd").html("");
        $(list).each(function (i) {
            tr += "<tr>";
            tr += "<td>" + list[i].date + "</td>";
            if(list[i].type == "个人"){
            tr += "<td>" + list[i].name + "</td>";
            }else{
            	tr += "<td><a href='"+ $.url.industryUrl() + "companyName=" + list[i].name +"'>" + list[i].name + "</a></td>";
            }
            tr += "<td style='text-align:right'>" + list[i].quantity + "</td>";
            tr += "<td style='text-align:right'>" + list[i].ratio + "</td>";
            tr += "<td>" + list[i].type + "</td>";
            tr += "<td>" + list[i].money + "</td>";
            tr += "</tr>";
        });
        if(isNullOrEmpty($("#timeListGd").html())){
        	$(data.date).each(function(i){
	    		if(i==0){
	    			$("#timeListGd").append("<li class='timeChildGd active'><a>"+data.date[i]+"</a></li>");
	    		}else{
	    			$("#timeListGd").append("<li class='timeChildGd'><a>"+data.date[i]+"</a></li>");
	    		}
	    	})
        	tableGd();
        }
        $("#tableGd").append(tr);
    };
    tableGd();
    function tableGd(){
        //日期点击事件
        $(".timeChildGd a").off().on("click",function(){
        	$(this).parent().addClass("active").siblings("li").removeClass("active");
        	shareHolder($(this).text());
        });
        //日期滚动效果
        rollTim($("#timelfGd"),$("#timergGd"),$("#timeListGd"),130);
    }
    
    //股本结构
    //股本结构请求地址
    var capitalGb = function (thisDate) {
        var _url = "";
        var id = Query.getHash("id");
        if(isNullOrEmpty(thisDate)){
        	
        	 _url = $.kf.GETCOMPANYSTRUCTURE + "?" + "id=" + id + "&page=" + 1;
        }else{
        	showDefaultTabel = true;
        	_url = $.kf.GETCOMPANYSTRUCTURE + "?" + "id=" + id + "&page=" + 1+"&date="+thisDate;
        }
        var lastPage = 1;
        $.getTable({
	        showDefaultTabel:showDefaultTabel,
        	url:_url,//url
	    	pageId:$("#pageGb"),//分页id
			pageNum:10,
	    	callback:capitalGbList,//callback
	    	currentPage:lastPage,
	    	loadId:".maskInTableGb",
	    	targetId:"gsgk3",
	    	showDataBox:false,
	    	tbodyId:$("#tableGb")//tbody的id,
        })
    };
    //拼接列表
    var capitalGbList = function (data) {
        var list = data.data;
        var tr = "";
        $("#tableGb").html("");
        $(list).each(function (i) {
            tr += "<tr>";
            tr += "<td>" + list[i].date + "</td>";
            tr += "<td>" + list[i].stockType + "</td>";
            tr += "<td>" + list[i].stockTypeInfo + "</td>";
            tr += "<td>" + list[i].qtyBegin + "</td>";
            tr += "<td>" + list[i].ratioBegin + "</td>";
            tr += "<td>" + list[i].qtyChange + "</td>";
            tr += "<td>" + list[i].qtyEnd + "</td>";
            tr += "<td>" + list[i].ratioEnd + "</td>";
            tr += "</tr>";
        });
        if(isNullOrEmpty($("#timeListGb").html())){
        	$(data.date).each(function(i){
	    		if(i==0){
	    			$("#timeListGb").append("<li class='timeChildGb active'><a>"+data.date[i]+"</a></li>");
	    		}else{
	    			$("#timeListGb").append("<li class='timeChildGb'><a>"+data.date[i]+"</a></li>");
	    		}
	    	})
        }
        $("#tableGb").append(tr);
        tableGb();
    };
    tableGb();
    function tableGb(){
        //日期点击事件
        $(".timeChildGb a").off().on("click",function(){
        	$(this).parent().addClass("active").siblings("li").removeClass("active");
        	capitalGb($(this).text());
        });
        //日期滚动效果
        rollTim($("#timelfGb"),$("#timergGb"),$("#timeListGb"),130);
    }
    
    //股票分红
    //股票分红请求地址
    var capitalStructure = function (thisDate) {
        var _url = "";
        var id = Query.getHash("id");
        if(isNullOrEmpty(thisDate)){
        	
        	 _url = $.kf.GETCOMPANYDIV + "?" + "id=" + id + "&page=" + 1;
        }else{
        	showDefaultTabel = true;
        	_url = $.kf.GETCOMPANYDIV + "?" + "id=" + id + "&page=" + 1+"&date="+thisDate;
        }
        var lastPage = 1;
        $.getTable({
	        showDefaultTabel:showDefaultTabel,
        	url:_url,//url
	    	pageId:$("#pageGp"),//分页id
	    	callback:capitalStructureList,//callback
	    	currentPage:lastPage,
	    	showDataBox:false,
	    	loadId:".maskInTableGp",
	    	targetId:"gsgk4",
	    	tbodyId:$("#tableGp")//tbody的id,
        })
    };
    //拼接列表
    var capitalStructureList = function (data) {
        var list = data.data;
        var tr = "";
        $("#tableGp").html("");
        $(list).each(function (i) {
            tr += "<tr>";
            tr += "<td>" + list[i].date + "</td>";
            tr += "<td>" + list[i].datePlan + "</td>";
            tr += "<td>" + list[i].dateRegist + "</td>";
            tr += "<td>" + list[i].dateDivEx + "</td>";
            tr += "<td>" + list[i].progressName + "</td>";
            tr += "<td>" + list[i].divPreTax + "</td>";
            tr += "<td>" + list[i].transferRatio + "</td>";
            tr += "<td>" + list[i].divObject + "</td>";
            tr += "<td>" + list[i].divStatement + "</td>";
            tr += "</tr>";
        });
        if(isNullOrEmpty($("#timeListGp").html())){
        	$(data.date).each(function(i){
	    		if(i==0){
	    			$("#timeListGp").append("<li class='timeChildGp active'><a>"+data.date[i]+"</a></li>");
	    		}else{
	    			$("#timeListGp").append("<li class='timeChildGp'><a>"+data.date[i]+"</a></li>");
	    		}
	    	})
        }
        $("#tableGp").append(tr);
        tableGp();
    };
    tableGp();
    function tableGp(){
        //日期点击事件
        $(".timeChildGp a").off().on("click",function(){
        	$(this).parent().addClass("active").siblings("li").removeClass("active");
        	capitalStructure($(this).text());
        });
        //日期滚动效果
        rollTim($("#timelfGp"),$("#timergGp"),$("#timeListGp"),130);
    }
    
    //股票增发
    //股票增发请求地址
    var capitalZf = function (thisDate) {
        var _url = "";
        var id = Query.getHash("id");
        if(isNullOrEmpty(thisDate)){
        	
        	 _url = $.kf.GETCOMPANYISSUANCE + "?" + "id=" + id + "&page=" + 1;
        }else{
        	showDefaultTabel = true;
        	_url = $.kf.GETCOMPANYISSUANCE + "?" + "id=" + id + "&page=" + 1+"&date="+thisDate;
        }
        var lastPage = 1;
        $.getTable({
	        showDefaultTabel:showDefaultTabel,
        	url:_url,//url
	    	pageId:$("#pageZf"),//分页id
	    	callback:capitalZfList,//callback
	    	currentPage:lastPage,
	    	showDataBox:false,
	    	loadId:".maskInTableZf",
	    	targetId:"gsgk5",
	    	tbodyId:$("#tableZf")//tbody的id,
        })
    };
    //拼接列表
    var capitalZfList = function (data) {
        var list = data.data;
        var tr = "";
        $("#tableZf").html("");
        $(list).each(function (i) {
            tr += "<tr>";
            tr += "<td>" + list[i].datePlan + "</td>";
            tr += "<td>" + list[i].dateNew + "</td>";
            //tr += "<td>" + list[i].additionalObject + "</td>";
            tr += "<td><a class='textGl-detail' data-toggle='modal' data-target='#myModalOut'>详情</a><span class='col-hide'>"+list[i].additionalObject+"</span></td>";
            tr += "<td>" + list[i].additionalPrice + "</td>";
            tr += "<td>" + list[i].additionalQuantity + "</td>";
            tr += "<td>" + list[i].raiseFunds + "</td>";
            tr += "<td>" + list[i].progressName + "</td>";
            tr += "<td>" + list[i].ipoDate + "</td>";
            tr += "<td>" + list[i].ipoListedDate + "</td>";
            tr += "<td>" + list[i].discountRate + "</td>";
             tr += "</tr>";
        });
        if(isNullOrEmpty($("#timeListZf").html())){
        	$(data.date).each(function(i){
	    		if(i==0){
	    			$("#timeListZf").append("<li class='timeChildZf active'><a>"+data.date[i]+"</a></li>");
	    		}else{
	    			$("#timeListZf").append("<li class='timeChildZf'><a>"+data.date[i]+"</a></li>");
	    		}
	    	})
        }
        $("#tableZf").append(tr);
//      $(".indcolor").on("click",function(){
//      	$("#additionO").html("");
//      	var _content = $(this).attr("data-content");
//      	$("#additionO").html(_content);
//      })
        tableZf();
        modelCon();
    };
    tableZf();
    function tableZf(){
        //日期点击事件
        $(".timeChildZf a").off().on("click",function(){
        	$(this).parent().addClass("active").siblings("li").removeClass("active");
        	capitalZf($(this).text());
        });
        //日期滚动效果
        rollTim($("#timelfZf"),$("#timergZf"),$("#timeListZf"),130);
    }
    
    //核心员工
 	//核心员工请求地址
    var compYg = function (thisDate) {
        var _url = "";
        var id = Query.getHash("id");
        if(isNullOrEmpty(thisDate)){
        	
        	 _url = $.kf.GETCOMPANYCORESTAFF + "?" + "id=" + id + "&page=" + 1;
        }else{
        	showDefaultTabel = true;
        	_url = $.kf.GETCOMPANYCORESTAFF + "?" + "id=" + id + "&page=" + 1+"&date="+thisDate;
        }
        var lastPage = 1;
        $.getTable({
	        showDefaultTabel:showDefaultTabel,
        	url:_url,//url
	    	pageId:$("#pageYg"),//分页id
	    	callback:compYgList,//callback
	    	currentPage:lastPage,
	    	pageNum:10,
	    	showDataBox:false,
	    	loadId:".maskInTableYg",
	    	targetId:"gsgk6",
	    	tbodyId:$("#tableYg")//tbody的id,
        })
    };

    //拼接列表
    var compYgList = function (data) {
        var list = data.data;
        var tr = "";
        $("#tableYg").html("");
        $(list).each(function (i) {
            tr += "<tr>";
            tr += "<td>" + list[i].name + "</td>";
            tr += "<td>" + list[i].country + "</td>";
            tr += "<td>" + list[i].job + "</td>";
            tr += "<td>" + list[i].gender + "</td>";
            tr += "<td>" + list[i].age + "</td>";
            tr += "<td>" + list[i].education + "</td>";
            tr += "<td>" + list[i].term + "</td>";
            if(isNullOrEmpty(list[i].resume)){
            	tr += "<td>--</td>";
            }else{
            	tr += "<td class='textGl-box'><span>" + list[i].resume + "</span><a class='textGl-detail' data-toggle='modal' data-target='#myModalOut'>查看详情</a></td>";
            }
            tr += "</tr>";
        });
        if(isNullOrEmpty($("#timeListYg").html())){
        	$(data.date).each(function(i){
	    		if(i==0){
	    			$("#timeListYg").append("<li class='timeChildYg active'><a>"+data.date[i]+"</a></li>");
	    		}else{
	    			$("#timeListYg").append("<li class='timeChildYg'><a>"+data.date[i]+"</a></li>");
	    		}
	    	})
        }
        $("#tableYg").append(tr);
        //履历详情点击
//      $("#tableYg").find(".textGl-detail").off().on("click",function(){
//      	var dataContent = list[$(this).parents("tr").index()].resume;
//      	$("#myModalOut").find(".modal-title").text("履历详情");
//      	$("#myModalOut").find("#privateListutO").html(dataContent);
//      });
        tableYg();
        modelCon();
    };
    tableYg();
    function tableYg(){
        //日期点击事件
        $(".timeChildYg a").off().on("click",function(){
        	$(this).parent("li").addClass("active").siblings("li").removeClass("active");
        	compYg($(this).text());
        });
        //日期滚动效果
        rollTim($("#timelfYg"),$("#timergYg"),$("#timeListYg"),130);
    }
    
   
   
	    
	    
	
    
	
	
 	
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
		
		/*
	     
	     * 
	     * 行业分析
	     * 
	     * 
	     * */
	
	    //投资请求地址公司列表详情页面 -》同行业企业
	    var industryAnalysis = function () {
	    	$("#tableCompany").html("");
	        var id = Query.getHash("id");
	         var mode = $(".indmenu1").text();
	        mode = $.trim(mode);
	        if(mode == "转让方式"||mode == "全部"){
	        	mode = "";
	        }else{
	        	mode = $(".indmenu1").text();
	        };
	        var type = "";
	        type = $.trim($(".indmenu2").text());
	        if (type == "创新层") {
	            type = 1;
	        } else if (type == "基础层") {
	            type = 2;
	        }
	        _url = $.kf.GETSIMILARCOMPANIES + "?" + "id=" + id + "&type=" + type + "&mode=" + mode + "&page=" + 1;
			if(isNullOrEmpty($("#pageToolCompany").find(".focus").text())){
				var lastPage = 1;
			}else{
				var lastPage = $("#pageToolCompany").find(".focus").text();
			}
			
	        $.getTable({
    	        //showDefaultTabel:showDefaultTabel,//不需要
	        	url:_url,//url
		    	pageId:$("#pageToolCompany"),//分页id
		    	loadId:".maskInTableIC",
		    	callback:industryAnalysisList,//callback
		    	currentPage:lastPage,
		    	showDataBox:false,
		    	targetId:"jbxx6",
		    	tbodyId:$("#tableCompany")//tbody的id,
	        })
	        //行业公司下拉筛选事件
	        industrySelect();
	    };
	   
	    //同行业企业拼接表格
	    var industryAnalysisList = function (data) {
	        var list = data.data;
	        var tr = "";
	        $("#tableCompany").html("");
	        $(list).each(function (i) {
	        	if(list[i].securities == "1"){
					securities = "取消";
				}else{
					securities = "关注";
				};
				if(list[i].cmpr == "1"){
					cmpr = "已选";
				}else{
					cmpr = "对比";
				};
	            tr += "<tr>";
	            tr += "<td>" + list[i].code + "</td>";
	            if(list[i].securities == "1"){
	            	tr += "<td><a style='color:#f57d4b' href='" + $.url.companyListUrl() + "id=" + list[i].id + "&nameCodeId=" + list[i].code + "&position=companyList"+"'>" + list[i].shortname + "</a></td>";
	            }else{
	            	tr += "<td><a href='" + $.url.companyListUrl() + "id=" + list[i].id + "&nameCodeId=" + list[i].code + "&position=companyList"+"'>" + list[i].shortname + "</a></td>";
	            }
	            tr += "<td class='queryWidthCom'>" + list[i].latestPrice + "</td>";
	            tr += "<td>" + list[i].date + "</td>";
	            tr += "<td class='queryWidthCom'>" + list[i].netProfit + "</td>";
	            tr += "<td class='queryWidthCom'>" + list[i].earningsPerShare + "</td>";
	            tr += "<td class='queryWidthCom'>" + list[i].dynamicPofit + "</td>";
	            tr += "<td class='queryWidthCom'>" + list[i].netAssetsYield + "</td>";
	            tr += "<td class='queryWidthCom'>" + list[i].totalShareCapital + "</td>";
	            tr += "<td>" + list[i].specialName + "</td>";
	            if(list[i].cmpr == "1"){
	            	tr += "<td><span style='color:#999'>"+ cmpr +"</a>&nbsp;&nbsp;<a class='comOptional'>" + securities + "</a></td>";
	            }else{
	            	tr += "<td><a class='comComparison'>"+ cmpr +"</a>&nbsp;&nbsp;<a class='comOptional'>" + securities + "</a></td>";
	            }
	            tr += "</tr>";
	        });
	        $("#tableCompany").append(tr);
	        //自选功能
	        comOptional();
	        //对比功能
	        comComparison();
	    };
	    //对比功能
	    var comComparison = function(){
	    	$(".comComparison").off().on("click",function(){
	    		$(".contrastModal").show();
	    		var thisCode = $(this).parents("tr").find("td:first-child").html();
	    		$("#contrastInput").val(thisCode);
	    		$(".newAddContrast").click();
	    		$("#contrastInput").val("");
	    		industryAnalysis();
	    	});
	    	//全部清除
	    	$(".clearContrastr,.companyP1 a").off("click.companyDetail").on("click.companyDetail",function(){
	    		var t1 = setInterval(function(){
	    			if(_flgCons){
	    				clearInterval(t1);
		    			industryAnalysis();
		    		}
	    		},300);
	    	});
	    	$("body").find(".codeList2").on("click","li",function(){
	    		var t2 = setInterval(function(){
	    			if(_flgCons){
	    				clearInterval(t2);
		    			industryAnalysis();
		    		}
	    		},300);
	    	})
	    }
	     //加入自选功能
	    var comOptional = function(){
			$(".comOptional").click(function(){
				var _url = "";
				var code = $(this).parents("tr").children().first().text();
				var param = {
				  		"code":code
				 	 };
				if($(this).text()== "关注"){
		           	 _url = $.kf.ADDCOLLECTIONOPTION;
				}else{
					 _url = $.kf.CANCELCOLLECTIONOPTION;
				}
				$.kf.ajax({
		            type: "post",
		            url: _url,
		            data: param,
		            dataType: "json",
		            processResponse: function(data){
		            	industryAnalysis();
	            	}
			 	})
			})
	    }
	   
	   //行业公司下拉筛选
		var industrySelect = function () {
	        new Select($("#indSelect2"), {}).init();
	        new Select($("#indSelect1"), {}).init();
	        //转让方式
	        $("#indSelect2").unbind().find("li").on("click", function () {
	            industryAnalysis();
	        });
	        //市场层级
	        $("#indSelect1").unbind().find("li").on("click", function () {
	            industryAnalysis();
	        });
	    }
	
		
	    
    
    /*
	     
	     * 
	     * 研报
	     * 
	     * 
	     * */
	
	    //研报请求地址
	    var getcompReport = function () {
	        var _url = "";
	
	        var id = Query.getHash("id");
	
	        _url = $.kf.GETCOMPANYREPORT + "?" + "id=" + id + "&page=" + 1;
	
	        //new GetTable(_url, $("#pageToolReport"), "", reportList, "get", $("#reportTable")).init();
	        var lastPage = Query.getHash("page");
	        $.getTable({
	        	url:_url,//url
		    	pageId:$("#pageToolReport"),//分页id
		    	callback:reportList,//callback
		    	currentPage:lastPage,
		    	tbodyId:$("#reportTable")//tbody的id,
	        })
	    };
	
	    //研报表格
	    var reportList = function (data) {
	        var list = data.data;
	
	        var tr = "";
	        $("#reportTable").html("");
	        $(list).each(function (i) {
	            tr += "<tr>";
	            tr += "<td><a href='" + list[i].url + "'target='_blank'>" + list[i].title + "</a></td>";
	            tr += "<td>" + list[i].special + "</td>";
	            tr += "<td>" + list[i].author + "</td>";
	            tr += "<td>" + list[i].date + "</td>";
	            tr += "</tr>";
	        });
	        $("#reportTable").append(tr);
	    };
	    /*
	     
	     * 
	     * 新闻
	     * 
	     * 
	     * */
	
	    //新闻请求地址
	    var getcompNews = function () {
	        var _url = "";
	        var id = Query.getHash("id");
	        if ($(".typeNews").find("b").hasClass("typeNews-active")) {
	            var isTips = 1;
	        } else {
	            var isTips = 0;
	        }
	        ;
	        var keyword = $("#newsId").val();
	        _url = $.kf.GETCOMPANYNEWS + "?" + "id=" + id + "&isTips=" + isTips + "&keyword=" + keyword + "&page=" + 1;
	        //new GetTable(_url, $("#pageToolNews"), "", newsList, "get", $("#newsTable")).init();
	        var lastPage = Query.getHash("page");
	        $.getTable({
	        	url:_url,//url
		    	pageId:$("#pageToolNews"),//分页id
		    	callback:newsList,//callback
		    	currentPage:lastPage,
		    	tbodyId:$("#newsTable")//tbody的id,
	        })
	        newsSearch();
	    };
	
	    //新闻列表
	    var newsList = function (data) {
	        var list = data.data;
	        //console.log(list[0]);
	        //$(".pageTotalDiv").remove();
	        var tr = "";
	        $("#newsTable").html("");
	        $(list).each(function (i) {
	            if (Number(list[i].isTips)) {
	                tr += "<tr>";
	                tr += "<td><li><a target='_blank' href='" + $.url.newsInfoUrl() + "id=" + list[i].id + '&name=news' + "'>" + list[i].title + "</a>" + "<img src='../../assets/admin/layout/img/tip.png' class='tip'/></li><p>" + list[i].summary + "</p></td>";
	                tr += "<td>" + list[i].source + "</td>";
	                tr += "<td>" + list[i].date + "</td>";
	                tr += "</tr>";
	            } else {
	                tr += "<tr>";
	                tr += "<td><li><a target='_blank' href='" + $.url.newsInfoUrl() + "id=" + list[i].id + '&name=news' + "'>" + list[i].title + "</a></li></td>";
	                tr += "<td>" + list[i].source + "</td>";
	                tr += "<td>" + list[i].date + "</td>";
	                tr += "</tr>";
	            }
	        });
	        $("#newsTable").append(tr);
	        if(isNullOrEmpty(data.total)){
	        	data.total = 0;
	        }
	        $("#tab_2").find(".mod-con-ipt").after("<div class='pageTotalDiv' style='margin:0 0 18px 12px'><div class='hang-title'>共<span class='pageTotal'>"+data.total+"</span>条结果</div></div>");
	    };
	
	    //新闻  搜索
	    var newsSearch = function () {
	        var id = Query.getHash("id");
	        if ($(".typeNews").find("b").hasClass("typeNews-active")) {
	            var isTips = 1;
	        } else {
	            var isTips = 0;
	        }
	        ;
	        $(".typeNews").off().on("click", function () {
	            $(".typeNews b").toggleClass("typeNews-active");
	            $("#newsTable").html("");
	            getcompNews();
	        })
	        $("#newsBtn").unbind("click").on("click", function () {
	            $("#newsTable").html("");
	            getcompNews();
	        })
	        //重置
	        $("#newsBtnReset").unbind("click").on("click", function () {
	            $("#newsTable").html("");
	            $("#newsId").val("");
	            getcompNews();
	        })
	        //回车查询
	        //enter
	        $("#newsId").on("keydown", function (e) {
	            var keyCode = e.which;
	            if (keyCode == 13) {
	                $("#newsBtn").click();
	            }
	        });
	        
	    };
	    /*
	     
	     * 
	     * 
	     * 基本信息
	     * 
	     * 
	     * */
	    
	    
	    function basicInfo(){
	    	if(fromType == "investCompany"){
	    		//非挂牌工商信息
	        	//公司年报
	        	annualReports();
	        }else{
	        	//挂牌基本信息
	        	basicMsg();
	        	//行业评级
		        industryLv();
		        //同行业企业
	        	industryAnalysis();
	        }
	    	//历史变更
	        industryComm();
	    }
	    
	    
	    //等级划分
	    var leverSun = function(){
	    	$.kf.ajax({
	            type: "get",
	            url: $.kf.GETFINANCIALANALYSIS+"?id="+Query.getHash("id")+"&type=header",
	            data: "",
	            dataType: "json",
	            processResponse: function (data) {
	            	var growingUp = data.data.growingUp;
			    	var returnAnalysis = data.data.returnAnalysis;
			    	var safety = data.data.safety;
			    	var financialTotal = data.data.financialTotal;
	                $("#lever-img").html(leverTotal(financialTotal));
	                $("#lever-1").html(leverImg(growingUp));
	                $("#lever-2").html(leverImg(returnAnalysis));
	                $("#lever-3").html(leverImg(safety));
	            }
	        });
	    };
	    //等级状况
	    var leverImg = function(lever){
	    	var img = '';
	    	if(lever == "A"){
	    		img += "<img src='../../assets/admin/layout/img/lever-hight.png' />";
	    		img += "<img src='../../assets/admin/layout/img/lever-hight.png' />";
	    		img += "<img src='../../assets/admin/layout/img/lever-hight.png' />";
	    		img += "<img src='../../assets/admin/layout/img/lever-hight.png' />";
	    		img += "<img src='../../assets/admin/layout/img/lever-hight.png' />";
	    	}else if(lever == "B"){
	    		img += "<img src='../../assets/admin/layout/img/lever-hight.png' />";
	    		img += "<img src='../../assets/admin/layout/img/lever-hight.png' />";
	    		img += "<img src='../../assets/admin/layout/img/lever-hight.png' />";
	    		img += "<img src='../../assets/admin/layout/img/lever-hight.png' />";
	    		img += "<img src='../../assets/admin/layout/img/lever-gray.png' />";
	    	}else if(lever == "C"){
	    		img += "<img src='../../assets/admin/layout/img/lever-hight.png' />";
	    		img += "<img src='../../assets/admin/layout/img/lever-hight.png' />";
	    		img += "<img src='../../assets/admin/layout/img/lever-hight.png' />";
	    		img += "<img src='../../assets/admin/layout/img/lever-gray.png' />";
	    		img += "<img src='../../assets/admin/layout/img/lever-gray.png' />";
	    	}else if(lever == "D"){
	    		img += "<img src='../../assets/admin/layout/img/lever-hight.png' />";
	    		img += "<img src='../../assets/admin/layout/img/lever-hight.png' />";
	    		img += "<img src='../../assets/admin/layout/img/lever-gray.png' />";
	    		img += "<img src='../../assets/admin/layout/img/lever-gray.png' />";
	    		img += "<img src='../../assets/admin/layout/img/lever-gray.png' />";
	    	}else if(lever == "E"){
	    		img += "<img src='../../assets/admin/layout/img/lever-hight.png' />";
	    		img += "<img src='../../assets/admin/layout/img/lever-gray.png' />";
	    		img += "<img src='../../assets/admin/layout/img/lever-gray.png' />";
	    		img += "<img src='../../assets/admin/layout/img/lever-gray.png' />";
	    		img += "<img src='../../assets/admin/layout/img/lever-gray.png' />";
	    	}else{
	    		img += "<img src='../../assets/admin/layout/img/lever-gray.png' />";
	    		img += "<img src='../../assets/admin/layout/img/lever-gray.png' />";
	    		img += "<img src='../../assets/admin/layout/img/lever-gray.png' />";
	    		img += "<img src='../../assets/admin/layout/img/lever-gray.png' />";
	    		img += "<img src='../../assets/admin/layout/img/lever-gray.png' />";
	    	}
	    	
	    	return img;
	    	
	    }
	    //财务等级
	    var leverTotal = function(lever){
	    	if(lever == "A"){
	    		var src = "lever-a"
	    	}else if(lever == "B"){
	    		var src = "lever-b"
	    	}else if(lever == "C"){
	    		var src = "lever-c"
	    	}else if(lever == "D"){
	    		var src = "lever-d"
	    	}else if(lever == "E"){
	    		var src = "lever-e"
	    	}else{
	    		var src = "lever-gray"
	    	}
	    	var img = "<img src='../../assets/admin/layout/img/"+src+".png' />"
	    	return img;
	    	
	    }
	    //公司基本信息请求地址
	    var basicMsg = function () {
	    	leverSun();
	        var id = Query.getHash("id");
	        var comCode = Query.getHash("nameCodeId");
	        var seuId = Query.getHash("seuId");
	        var backPosition = Query.getHash("position");
	        if(backPosition == "companyList"){
				$("#brandTwo a").text("挂牌公司").attr("href","/companylisted/list");
			};
			if(backPosition == "privateAdd"){
				$("#brandTwo a").text("定增").attr("href","/stockdilution/index");
			};
			if(backPosition == "trading"){
				$("#brandTwo a").text("行情").attr("href","/quotation/index");
			};
			if(backPosition == "neeqNotice"){
				$("#brandTwo a").text("信息披露").attr("href","/notice/index");
			};
			if(backPosition == "realTime"){
				$("#brandTwo a").text("实时行情").attr("href","/quotation/realtime");
			};
			if(backPosition == "collection"){
				$("#brandTwo a").text("收藏列表").attr("href","/account/collection");
			};
			if(backPosition == "markert"){
				$("#brandTwo a").text("市场概览").attr("href","/companylisted/index");
			};
			if(backPosition == "news"){
				$("#brandTwo a").text("市场新闻").attr("href","/news/index");
			};
			if(backPosition == "privilege"){
				$("#brandTwo a").text("慧分析").attr("href","/privilege/index");
			};
			if(backPosition == "masterHold"){
				$("#brandTwo a").text("主办券商详情").attr("href","/securities/details?id="+seuId);
			};
			if(backPosition == "contrast"){
				$("#brandTwo a").text("我的对比").attr("href","/compared/contrast");
			};
			if(backPosition == "sameContrast"){
				$("#brandTwo a").text("同行对比").attr("href","/compared/peer?peerCode="+comCode);
			};
			if(backPosition == "formDetail"){
				$("#brandTwo a").text("报表详情").attr("href","/table/formDetail");
			};
			if(fromType == "investCompany"){
				//非挂牌工商信息
				var _url = $.kf.GETCOMPANYINFOSER + "?" + "id=" + id;
			}else{
				var _url = $.kf.GETCOMPANYINFO + "?" + "id=" + id;
			}
	        /*new LoadingAjax($(".maskInAjax"), {}, $(".comManAll")).init();
	        new LoadingAjax($(".maskInAjax"), {}, $("#basicTable")).init();*/
	        var _urlDeal = $.kf.GETTRADETRANSACTION + "?" + "id=" + id + "&page=" + 1;
	        var lastPage = 1;
	        $.getTable({
	        	url:_urlDeal,//url
		    	pageId:$("#pageToolDeal"),//分页id
		    	showDataBox:false,
		    	callback:dealDetailList,//callback
		    	currentPage:lastPage,
		    	loadId:".maskInTableDeal",
		    	tbodyId:$("#dealDetail")//tbody的id,
	        })
	        $.kf.ajax({
	            type: "get",
	            url: _url,
	            data: "",
	            dataType: "json",
	            processResponse: function (data) {
	                var obj = data.data;
	                new LoadingAjax($(".maskInAjax"), {}, $("#comManAll")).close();
	                new LoadingAjax($(".maskInAjax"), {}, $("#basicTable")).close();
	                if(!isNullOrEmpty(obj)){
	                	basicMsgList(data);
	                }
	            }
	        });
	    };
	    //成交明细
	    var dealDetailList = function (data) {
	        var list = data.data;
	        var tr = "";
	        $("#dealDetail").html("");
	        $(list).each(function (i) {
	            tr += "<tr>";
	            tr += "<td>" + list[i].transPrice + "</td>";
	            tr += "<td>" + list[i].transVolume + "</td>";
	            tr += "<td>" + list[i].transTurnover + "</td>";
	            tr += "<td>" + list[i].brokerOfficeBidName + "</td>";
	            tr += "<td>" + list[i].brokerOfficeAskName + "</td>";
	            tr += "<td>" + list[i].transDt + "</td>";
	            tr += "</tr>";
	        });
	        $("#dealDetail").append(tr);
	    };
	   
	    //拼接新闻列表
	    var isDelisted = "";
	    var basicMsgList = function (data) {
	        var list = data.data;
	        //工商信息
	        $("#creditCode").text(list.creditCode);
	        $("#registrationNumber").text(list.registrationNumber);
	        $("#organizationCode").text(list.organizationCode);
	        $("#operating_status").text(list.operatingStatus);
	        $("#operatingBeginDate").text(list.operatingBeginDate+'至'+list.operatingEndDate);
	        $("#company_type").text(list.companyType);
	        $("#approvedDate").text(list.approvedDate);
	        $("#registrationAuthority").text(list.registrationAuthority);
	        $("#legalRepresentative").text(list.legalRepresentative);
	        $("#basicPhone").text(list.phone);
	        $("#registeredCapital").text(list.registeredCapital);
	        $("#people").text(list.people);
	        $("#basciSecretaries").text(list.secretaries);
	        $("#basicFax").text(list.fax);
	        $("#basicEquity").text(list.totalStockEquity);
	        $("#englishName").text(list.englishName);
	        $("#industryName").text(list.industryName);  
	        $("#registeredAddress").text(list.registeredAddress);
	        $("#taxpayerNumber").text(list.taxpayerNumber);
	        if(!isNullOrEmpty(list.businessScope)){
	        	$("#businessCcope").text(list.businessScope.substring(0,278)+'...');
	        }else{
	        	$(".businessCcope-detail").hide();
	        }
	        if(list.highSalary == "是"){
	        	$(".highSalary").removeClass("hide");
	        }
	        $("#businessCcope").attr("title",list.businessScope);
	        if(fromType != "investCompany"){
	        companyNameJs = list.name;
	        //Query.setHash({"companyName":list.name});
	        var idPage = Query.getHash("id");
	        var marketMaker = list.marketMaker;//做市商
	        var listPchange = list.pchange;//涨跌
	        var listPchangepct = list.pchangePct;//涨跌幅
	        /*if(listPchange.charAt(0) == "-"){
	        	$("#zhangdie").css("color","#06b042");
	        }else{
	        	$("#zhangdie").css("color","#ff3c39");
	        }
	        if(listPchangepct.charAt(0) == "-"){
	        	$("#zhangbi").css("color","#06b042");
	        }else{
	        	$("#zhangbi").css("color","#ff3c39");
	        }*/
	        var marketLength = marketMaker.length;
	        if (marketLength == 0) {
	            marketLength = 0;
	        }
	        var executive = list.executive;//高管
	        var sit = list.mode.substr(0, 1);//做市
	        var chuyu = list.type.substr(0, 1);//创新层
	        if (!isNullOrEmpty(sit)) {
	            $("#sit").text(sit);
	            $("#sit").attr("title", list.mode);
	        } else {
	            $("#sit").hide();
	        };
	        isDelisted = list.isDelisted;
	        if(isDelisted == 1){//是否摘牌
	        	$("#zhaipai").show();
	        	$("#nameShort").css("color","#999");
	        	$("#nameCodeId").css("color","#999");
	        }else{
	        	$("#zhaipai").hide();
	        }
	        if(sit == "协"){
	        	$("#makertMake").hide();
	        }else{
	        	$(".chartDispaly").hide();
	        };
	        
	        if (!isNullOrEmpty(chuyu)) {
	            $("#chuyu").text(chuyu);
	            $("#chuyu").attr("title", list.type);
	        } else {
	            $("#chuyu").hide();
	        }
	
	        var nameCodeId = Query.getHash("nameCodeId");
	        $("#nameShort").text(list.shortname);
	        $("#nameCodeId").text(list.code);
	        if(isNullOrEmpty(list.close)){
	        	var closeMoney = "--"
	        }else{
	        	var closeMoney = list.close;
	        };
	        if(isNullOrEmpty(list.pchange)){
	        	var pchangeMoney = "--"
	        }else{
	        	var pchangeMoney = list.pchange;
	        };
	        if(isNullOrEmpty(list.pchangePct)){
	        	var pchangePctMoney = "0"
	        }else{
	        	var pchangePctMoney = list.pchangePct;
	        };
	        $("#zhandat").text(list.date);
	        //写入信息
	        $("#marketMaker").text(marketLength + "家");
	        
	        
	        //公司信息
	        $("#basicName2").text(list.name);
	        //$("#basicName").append("<span class='seeIndustryDetails'>查看详情</span>");
	        $("#onceName").text(list.onceName);
	        $("#foundDate").text(list.foundDate);
	        $("#basicProvince").text(list.province);
	        $("#basicCity").text(list.city);
	        $("#basicAdress").text(list.address);
	        $("#basciWeb").html("<a href=" + list.website + " target='_blank'>" + list.website + "</a>");
	        
	        //行业信息
	        $("#managementIndustry").html("<a href='" + $.url.companyList() + "&currentTab=tab1&inCode=" + list.managementType.id + "'>" + list.managementType.name +"</a>");
	        $("#investmentIndustry").html(list.investmentType.name);
	        $("#sfcType").html("<a href='" + $.url.companyList() + "&currentTab=tab1&inCode=" + list.sfcType.id + "'>" + list.sfcType.name +"</a>");
	        $("#tag").html("");
	        $(list.tag).each(function(i){
	        	$("#tag").append("<a class='basicName' href='" + $.url.companyList() + "&currentTab=tab1&bqCode=" + list.tag[i].id + "'>"+ list.tag[i].name +"</a>&nbsp;&nbsp;&nbsp;")
	        })
	        //挂牌公司
	        $("#code").text(list.code);
	        $("#shortname").text(list.shortname);
	        $("#listing_date").text(list.listing_date);
	        $("#listedExchange").text(list.listedExchange);
	        //主办券商
	        $("#special").html("<a href='"+ $.url.securitiesUrl() +"currentTab=tab0"+ "&id=" + list.masterId + "'>"+ list.special +"</a>");
	        $("#mode").text(list.mode);
	        //中介机构
	        $("#accountingFirm").html("<a href='" + $.url.industryUrl() + "id=" + list.accountingFirmId + "'>"+ list.accountingFirm +"</a>");
	        $("#lawOffice").html("<a href='" + $.url.industryUrl() + "id=" + list.lawOfficeId + "'>"+ list.lawOffice +"</a>");
	        $("#assetCaluation").html("<a href='" + $.url.industryUrl() + "id=" + list.assetCaluationId + "'>"+ list.assetCaluation +"</a>");
	        
	        
	        
	        //拼接UL
	        var html = "";
	        $("#basicMarket").html("");
	        $(marketMaker).each(function (i) {
	            html += "<li>";
	            html += "<span>" + marketMaker[i].name + "</span>";
	            html += "</li>";
	        });
	        $("#basicMarket").append(html);
	
	        //扣费跳转
	        var isCookie = false;
	
	        moneyUrl($("#basicName"), isCookie, "isCookie");
	
	        //拼接table
	        var th = "<tr><th>姓名</th><th>职位</th><th>性别</th><th>年龄</th><th>学历</th><th>任期</th><th>履历</th></tr>";
	        var tr = "";
	        $("#basicTable").html("");
	        $("#basicTable").html(th);
	        $(executive).each(function (i) {
	            tr += "<tr>";
	            tr += "<td width='5%'><span>" + executive[i].name + "</span></td>";
	            tr += "<td width='10%'><span>" + executive[i].job + "</span></td>";
	            tr += "<td width='5%'><span>" + executive[i].gender + "</span></td>";
	            tr += "<td width='5%'><span>" + executive[i].age + "</span></td>";
	            tr += "<td width='5%'><span>" + executive[i].education + "</span></td>";
	            tr += "<td width='10%'><span>" + executive[i].term + "</span></td>";
	            tr += "<td width='40%'><span>" + executive[i].resume + "</span></td>";
	            tr += "</tr>";
	        });
	        $("#basicTable").append(tr);
	        }else{
	        	//非挂牌行业信息
		        $("#tag").html("");
		        if(!isNullOrEmpty(list.tag)){
		        	$(list.tag).each(function(i){
			        	$("#tag").append("<a class='basicName' href='" + $.url.companyList() + "&currentTab=tab1&bqCode=" + list.tag[i].id + "'>"+ list.tag[i].name +"</a>&nbsp;&nbsp;&nbsp;")
			        })
		        }
		        //头部信息
		        if(isNullOrEmpty(list.logo)){
					$(".investT-left").html("<img src='../../assets/admin/layout/img/investImg2.png' />");
				}else{
					$(".investT-left").html("<img src='"+ list.logo +"' />");
				}
				$("#inName").text(list.fullname);
				$("#inShortName").text(list.shortname);
				$("#step").text(list.step);
				$("#companyAbout").text(list.shortname);
				if (htmlWid.offsetWidth > 768) {
	        		if(list.companyAbout.length>118){
		        		var companyAbout= list.companyAbout.substring(0,118);
		        		$("#in-content").html(companyAbout+"...<a class='in-more'>展开<img src='../../assets/admin/layout/img/xiala.png' /></a>");
		        		$("#in-content2").html(list.companyAbout+"<a class='in-more in-hide'>收起<img src='../../assets/admin/layout/img/shouqi.png' /></a>").hide();
		        	}else{
		        		$("#in-content").html(list.companyAbout);
		        	}
	        	}else{
	        		if(list.companyAbout.length>30){
		        		var companyAbout= list.companyAbout.substring(0,30);
		        		$("#in-content").html(companyAbout+"...<a class='in-more'>展开<img src='../../assets/admin/layout/img/xiala.png' /></a>");
		        		$("#in-content2").html(list.companyAbout+"<a class='in-more in-hide'>收起<img src='../../assets/admin/layout/img/shouqi.png' /></a>").hide();
		        	}else{
		        		$("#in-content").html(list.companyAbout);
		        	}
	        	}
	        	//展开收起
				$(".investT-right").on("click",".in-more",function(){
					if($(this).hasClass("in-hide")){
						$("#in-content2").hide();
						$("#in-content").show();
					}else{
						$("#in-content2").show();
						$("#in-content").hide();
					}
				});
	        }
	        //自选事件
	        postOptional();
	    };
		//自选点击事件
		var optionalClick = function(){
			$(".joinOptional").unbind().on("click",function(){
				var _url = "";
			  	if(fromType == "investCompany"){
			  		var code = Query.getHash("id");
			  	}else{
			  		var code = $("#nameCodeId").html();
			  	}
			  	var param = {
			  			"code":code,
			  			"type":$(this).attr("name")
				 	 };
				if($(this).text()== "关注"){
		           	 _url = $.kf.ADDCOLLECTIONOPTION;
				}else{
					 _url = $.kf.CANCELCOLLECTIONOPTION;
			  	}
		        $.kf.ajax({
		            type: "post",
			            url: _url,
			            data: param,
			            dataType: "json",
			            processResponse: function(){
			            	if(fromType == "investCompany"){
						  		postOptional("b2");
						  	}else{
						  		postOptional("");
						  	}
			            	
	            	}
			 	 })
			})
			  	}
		//自选功能请求
		var postOptional = function(type){
			var id = Query.getHash("id");
	        var _url = $.kf.GETWHETHEROPTIONAL + "?" + "id=" + id+"&type="+type;
	        $.kf.ajax({
	            type: "get",
	            url: _url,
	            data: "",
	            dataType: "json",
	            processResponse: function (data) {
	            	var list = data.data;
	            	var comdelOptional = list.securities;//自选状态
	            	if(comdelOptional == "1"){
	            		var securities = "取消";
	            		$(".joinOptional").removeClass("wantOptional").addClass("cancelOptional");
	            		$(".joinOptional").css("border","1px solid #F28D5D");
	            		$("#nameShort").css("color","#f57d4b");
	            	}else{
	            		var securities = "关注";
	            		$(".joinOptional").removeClass("cancelOptional").addClass("wantOptional");
	            		$(".joinOptional").css("border","1px solid #F28D5D");
	            		if(isDelisted == 1){
	            			$("#nameShort").css("color","#999");
	            		}else{
	            			$("#nameShort").css("color","#222");
	            		}
	            	}
	            	$(".joinOptional").text(securities);
	            }
	        })
	        optionalClick();
		}
		
	//历史变更
    var industryComm = function () {
        var id = Query.getHash("id");
        var _url2 = $.kf.GETCOMPANYCHANGE + "?" + "id=" + id + "&limit=10";
        var lastPage = 1;
        $.getTable({
	        showDefaultTabel:showDefaultTabel,
        	url:_url2,//url
	    	pageId:$("#pageToolStoryTool"),//分页id
	    	pageNum:10,
	    	loadId:".maskInTableStory",
	    	callback:industryCommList2,//callback
	    	currentPage:lastPage,
	    	targetId:"jbxx4",
	    	tbodyId:$("#industryTable")//tbody的id,
        })

    };	
 	//变更记录
    var industryCommList2 = function (data) {
        //拼接table
        var change = data.data;
        var tr = "";
        var changeLength = change.length;
        var pageCurrent = Query.getHash("page");
        if(isNullOrEmpty(pageCurrent)){
        	pageCurrent = 1;
        }
        $("#changeLength").text(changeLength);
        $("#industryTable").html("");
        $(change).each(function (i) {
            tr += "<tr>";
            tr += "	<td class='gub-li01'>"
            tr += "		<span  class='gub-icon'>" + ((i + 1) + ((pageCurrent - 1) * 10)) + "</span>"
            tr += "		<div>"
            tr += "			<p>变更项目：<span>" + change[i].name + "</span></p>"
            tr += "			<p>变更前：<span title='"+change[i].first+"'>" + change[i].first + "</span></p>"
            tr += "		</div>"
            tr += "	</td>"
            tr += "	<td  class='gub-li01'><div>"
            tr += "		<p>变更日期：<span>" + change[i].date + "</span></p>"
            tr += "		<p>变更后：<span>" + change[i].back + "</span></p>"
            tr += "	</div></td>"
            tr += "</tr>";
        });
        $("#industryTable").append(tr);
    };
     //行业评级
    var industryLv = function () {
        var _url = "";
        var id = Query.getHash("id");
        _url = $.kf.GETINDUSTRYRATING + "?" + "id=" + id + "&page=" + 1;
        //new GetTable(_url, $("#pageToolNine2"), "", industryLvList, "get", $("#tableNine2")).init();
        var lastPage = 1;
        $.getTable({
	        showDefaultTabel:showDefaultTabel,
        	url:_url,//url
	    	pageId:$("#pageToolNine2"),//分页id
	    	loadId:".maskInTablePj",
	    	callback:industryLvList,//callback
	    	currentPage:lastPage,
	    	targetId:"jbxx5",
	    	tbodyId:$("#tableNine2")//tbody的id,
        })
    };
	 //行业评级拼接表格
    var industryLvList = function (data) {
        var list = data.data;
        var tr = "";
        $("#tableNine2").html("");
        $(list).each(function (i) {
            tr += "<tr>";
            tr += "<td>" + list[i].reportDate + "</td>";
            tr += "<td>" + list[i].researchInstituteShortname + "</td>";
            tr += "<td>" + list[i].reporterName + "</td>";
            tr += "<td>" + list[i].rating + "</td>";
            tr += "<td>" + list[i].lastRating + "</td>";
            tr += "<td style='text-align:left'>" + list[i].reportTitle + "</td>";
            tr += "<td><a class='textGl-detail textGl-hypj' data-toggle='modal' data-target='#myModalOut'>查看详情</a><span class='col-hide'>"+ list[i].content +"</span></td>";
            tr += "</tr>";
        });
        $("#tableNine2").append(tr);
        modelCon();
//      $(".indcolor").on("click",function(){
//      	$("#privateListutO").html("");
//      	var _content = $(this).attr("data-content");
//      	$("#privateListutO").html(_content);
//      })
    };
    
    //公司年报
	var annualReports = function () {
        var _url  = $.kf.GETYEARLIST + "?" + "id=" + id + "&page=" + 1;
        $.kf.ajax({
            type: "get",
            url: _url,
            data: "",
            dataType: "json",
            processResponse: function (data) {
               annualReportsList(data);
            }
        });
    };
    //公司年报拼接列表
    var annualReportsList = function (data) {
        var list = data.data;
        var tr = "";
        $(".inannualReports").html("");
        $(list).each(function (i) {
            tr += "<li>";
            tr += "<span>"+ list[i].year +"</span>"
            tr += "<a target='_blank' href='" + $.url.newsInfoUrl() + "id=" + list[i].id + '&name=annualReport' + "'>详情 ></a>";
            tr += "</li>";
        });
        $(".inannualReports").append(tr);
    };
	   
	    /*
	     
	     * 
	     * 
	     * 股权结构
	     * 
	     * 
	     * */
	
	    
	
	
	
	
	
	
	
	
	
	
	
	    /*
	     
	     * 
	     * 融资
	     * 
	     * 
	     * */
	
	    //融资请求地址
	    var compFinance = function () {
	        var _url = "";
	
	        var id = Query.getHash("id");
	
	        _url = $.kf.GETCOMPANYFINANCE + "?" + "id=" + id + "&page=" + 1;
	
	        //new GetTable(_url, $("#pageToolComp"), "", compFinanceList, "get", $("#compFin")).init();
	        var lastPage = 1;
	        $.getTable({
    	        showDefaultTabel:showDefaultTabel,
	        	url:_url,//url
		    	pageId:$("#pageToolComp"),//分页id
		    	callback:compFinanceList,//callback
		    	currentPage:lastPage,
		    	tbodyId:$("#compFin")//tbody的id,
	        })
	    };
	
	    //拼接列表
	    var compFinanceList = function (data) {
	
	        var list = data.data;
	
	        var tr = "";
	        $("#compFin").html("");
	        $(list).each(function (i) {
	            tr += "<tr>";
	            tr += "<td>" + list[i].name + "</td>";
	            tr += "<td>" + list[i].orgType + "</td>";
	            tr += "<td>" + list[i].investMoney + "</td>";
	            tr += "<td>" + list[i].investType + "</td>";
	            tr += "<td class='queryWidth'>" + list[i].investStep + "</td>";
	            tr += "<td>" + list[i].investDate + "</td>";
	            tr += "</tr>";
	        });
	        $("#compFin").append(tr);
	    };
	    /*
	     
	     * 
	     * 对外投资
	     * 
	     * 
	     * */
	
	    //投资请求地址公司列表详情页面
	    var compInvest = function () {
	        var _url = "";
	
	        var id = Query.getHash("id");
	
	        //上送参数
	        var  keyword = $("#nameShort").text()
	        _url = $.kf.GETFINANCINGEVENTS + "?id="+id;
	        //new GetTable(_url, $("#pageToolInvest"), "", compInvestList, "get", $("#compInvest")).init();
	        var lastPage = 1;
	        $.getTable({
    	        showDefaultTabel:showDefaultTabel,
	        	url:_url,//url
		    	pageId:$("#pageToolInvest"),//分页id
		    	pageNum:10,
		    	callback:compInvestList,//callback
		    	currentPage:lastPage,
		    	tbodyId:$("#compInvest")//tbody的id,
	        })
	        var _url2 = $.kf.GETCOMPANYBRANCH + "?id="+id;
	        $.kf.ajax({
	            type: "get",
	            url: _url2,
	            data: "",
	            dataType: "json",
	            processResponse: function(data){
	            	if(isData($(".investComListData"), data.data, $(".investComList"))){
	            		$(".investComList").html("");
	            		var list = data.data;
				    	var tr = "";
				    	$(list).each(function (i) {
				            tr += "<li><a class='basicName' data-name='"+list[i].name+"' name="+ list[i].id +" href='" + $.url.industryUrl() + "companyName=" + list[i].name + "'>"+ list[i].name +"</a></li>";
				        });
				        $(".investComList").append(tr);
				        //扣费跳转
				        var isCookie = false;
				
				        moneyUrl($(".basicName"), isCookie, "isCookie");
	
	            	}else{
	            		$(".msg-company").hide();
	            	}
	            	
	            }
	        });	
	    };
	
	    //拼接列表
	    var compInvestList = function (data) {
	
	        var list = data.data;
	        var tr = "";
	        var invNmae = "";
	        $("#compInvest").html("");
	
	        $(list).each(function (i) {
	            tr += "<tr>";
	            tr += "<td class='investT" + i + " investMg'></td>";
	            tr += "<td>" + list[i].step + "</td>";
	            tr += "<td>" + list[i].currencyCode + "</td>";
	            tr += "<td>" + list[i].investmentAmount + "</td>";
	            tr += "<td>" + list[i].date + "</td>";
	            tr += "</tr>";
	        });
	        $("#compInvest").append(tr);
	        //投资机构列表
	        for (var i = 0; i < list.length; i++) {
	            var tr2 = [];
	            var investmentL = list[i].investment.length;
	            for (var j = 0; j < investmentL; j++) {
	                if (investmentL == 0 || investmentL == 1) {
	                	if(isNullOrEmpty(list[i].investment[j].investorId)){
	                		tr2 += "<span>" + list[i].investment[j].investment + "</span>";
	                	}else{
	                		tr2 += "<a href='" + $.url.investmentAgencyDetailsUrl() + "id=" + list[i].investment[j].investorId + "'>" + list[i].investment[j].investment + "</a>";
	                	}
	                    
	                } else {
	                    if(isNullOrEmpty(list[i].investment[j].investorId)){
	                    		tr2 += "<span>" + list[i].investment[j].investment + "</span>/";
	                    	}else{
	                    		tr2 += "<a href='" + $.url.investmentAgencyDetailsUrl() + "id=" + list[i].investment[j].investorId + "'>" + list[i].investment[j].investment + "</a>/";
	                    	}
	                }
	
	            }
	           
	            $(".investT" + i).append(tr2);
	
	        };
	        $(".investMg").each(function(){
	        	
				if($(this).html().indexOf("/") > 0){
					
					$(this).html($(this).html().substring(0,$(this).html().length-1));
				}
			});
	    };
	
	
	
	
	
    /*
     
     * 财报
     * 
     * 
     * */
		var moneyReportYear = function(){
			$.ajax({
	            type: "get",
	            url: $.kf.GETFINANCIALANALYSISYEARMONTH + "?id=" + Query.getHash("id"),
	            data: "",
	            dataType: "json",
	            success: function (data) {
	            	var data = data.data;
	            	var html = "";
	            	if(isNullOrEmpty(data)){
	            		html = "";
	            		$(".echLine-right").hide();
	            		$(".chooseYear").hide();
	            		$("#chooseYearSelect").hide();
	            		$("#chooseYearSelect").find("#noteTypeO").html('<span class="input-group-btn caret2"><button class="btn btn-sm  btn-icon-btn" type="button"><i class="fa fa-calendar2"></i></button></span>')
	            	}else{
	            		$("#chooseYearSelect").find("#noteTypeO").html(data[0]+'<span class="input-group-btn caret2"><button class="btn btn-sm  btn-icon-btn" type="button"><i class="fa fa-calendar2"></i></button></span>')
	            		$(data).each(function(i){
	            			html += '<li role="presentation"><a role="menuitem" tabindex="-1" href="javascript:void(0)">' + data[i] + '</a></li>';
	            		});
	            	}
	            	$("#chooseYearSelect").find("#menu1").html(html);
	            	moneyReport();
	            	finEchart(Query.getHash("id"),"",$("#noteTypeO").text().substr(0,10));
	            	//年份切换
			        $("#chooseYearSelect .dropdown-menu").find('a').on("click",function(){
			        	var fundTime =  $(".tabPaneList").find("li.tabActive").attr("name");
			        	$("#chooseYearSelect").find("#noteTypeO").html($(this).text()+'<span class="input-group-btn caret2"><button class="btn btn-sm  btn-icon-btn" type="button"><i class="fa fa-calendar2"></i></button></span>')
			        	moneyReportInd(fundTime,$(this).text().substr(0,10));
			        	moneyReport();
			        });
	            }
	        });
	        //帮助弹窗
	        $(".infoExplainCw").click(function(e){
	        	e.stopPropagation();
	        	$("#myModalOut .modal-title").text("财务分析");
	        	var tr = "";
	        	tr += "<p>1、财务评级根据企业年度报告进行计算，按照企业所属管理性行业（一级）进行评价；</p>";
	        	tr += "<p>2、财务评级分为成长性、回报率、安全性三个维度评价企业，每个维度分为2-4个子维度，最终落实到具体的财务指标；</p>";
	        	tr += "<p>3、对企业的每个具体的财务指标，按照企业所属行业进行分析，计算企业自身财务指标在整体行业中的排序；</p>";
	        	tr += "<p>4、根据企业的指标排序进行打分，评分分为A-E五个级别，同时每个分项加总后再次进行打分，计算上一层维度的得分和级别；</p>";
	        	tr += "<p>5、最终财务评级每年年报发布完后即进行调整；</p>";
	        	tr += "<p>6、新挂牌企业评级根据最新披露年报数据进行计算。</p>";
				$("#myModalOut .modal-body .province").html(tr);
				$("#myModalOut").modal("show")
	        })
		}
	    var moneyReport = function () {
	        var moneyLi = $("#banU").find("li");
	        var _url = "";
	        var id = Query.getHash("id");
	        growEch();
	        moneyReportEvent();
	        moneyLi.off().on("click", function () {
				var fundTime = $(".tabPaneList").find("li.tabActive").attr("name");
	            var index = $(this).index();
	    		$(".my-wrapTable").eq(index).find(".view-tr").html("");
	    		$(".my-wrapTable").eq(index).find(".banTable").html("");
	            $(".my-wrapTable").hide();
	            $(".my-wrapTable").eq(index).show();
	            $(this).addClass("active");
	            $(this).siblings("li").removeClass("active");
		    	var id = Query.getHash("id");
				var ind = $(this).attr("name");
	            if (ind == 0) {//财务指标
	                $(".mask-in").remove();
	                $(".maskInTable").height("auto");
	                 $("#typeSel").hide();
	                $("#typeSelNull").show();
	                $(".chooseYear,#chooseYearSelect").hide();
	                $("#repYearFenLine").show();
		    		$("#repYearFen").show();
		            _url = $.kf.GETFINANCEINDICATORYEARZCFZ + "?" + "id=" + id + "&fundTime=" + fundTime + "&page=" + 1+"&type=indicator";
	                var lastPage = 1;
			        $.getTable({
			        	url:_url,//url
				    	pageId:$("#banPage"),//分页id
				    	callback:moneyReportList,//callback
				    	currentPage:lastPage,
				    	showPageTool:false, 
				    	tbodyId:$("#banTable")//tbody的id,
			        })
	                
	            };
	            if (ind == 1) {//资产负载
	                $(".mask-in").remove();
	                $(".maskInTable").height("auto");
	                $("#typeSel").show();
	                $("#typeSelNull").show();
	                $(".chooseYear,#chooseYearSelect").hide();
	                $("#repYearFenLine").show();
		    		$("#repYearFen").show();
		            _url = $.kf.GETFINANCEINDICATORYEARZCFZ + "?" + "id=" + id + "&fundTime=" + fundTime + "&page=" + 1+"&type=sheets";
	                var lastPage = 1;
			        $.getTable({
			        	url:_url,//url
				    	pageId:$("#banPage2"),//分页id
				    	callback:moneyReportList,//callback
				    	currentPage:lastPage,
				    	showPageTool:false, 
				    	tbodyId:$("#banTable2")//tbody的id,
			        })
	                
	            };
	            if (ind == 2) {//利润
	                $(".mask-in").remove();
	                $(".maskInTable").height("auto");
	                 $("#typeSel").show();
	                 $("#typeSelNull").show();
	                 $(".chooseYear,#chooseYearSelect").hide();
	                 $("#repYearFenLine").show();
		    		$("#repYearFen").show();
		            _url = $.kf.GETFINANCEINDICATORYEARZCFZ + "?" + "id=" + id + "&fundTime=" + fundTime + "&page=" + 1+"&type=profit";
	                var lastPage = 1;
	                $.getTable({
			        	url:_url,//url
				    	pageId:$("#banPage3"),//分页id
				    	callback:moneyReportList,//callback
				    	currentPage:lastPage,
				    	showPageTool:false, 
				    	tbodyId:$("#banTable3")//tbody的id,
			        })
	            
	
	            };
	            if (ind == 3) {//现金流量
	                $(".mask-in").remove();
	                $(".maskInTable").height("auto");
	                $("#typeSel").show();
	                $("#typeSelNull").show();
	                $(".chooseYear,#chooseYearSelect").hide();
	                $("#repYearFenLine").show();
		    		$("#repYearFen").show();
		            _url = $.kf.GETFINANCEINDICATORYEARZCFZ + "?" + "id=" + id + "&fundTime=" + fundTime + "&page=" + 1+"&type=flow";
	                var lastPage = 1;
	                $.getTable({
			        	url:_url,//url
				    	pageId:$("#banPage4"),//分页id
				    	callback:moneyReportList,//callback
				    	currentPage:lastPage,
				    	showPageTool:false, 
				    	tbodyId:$("#banTable4")//tbody的id,
			        })
	
	            };
	            if (ind == 4) {//财务分析
	                $("#typeSel").hide();
	                $("#typeSelNull").hide();
	                $(".chooseYear,#chooseYearSelect").show();
	                $("#repYearFenLine").hide();
		    		$("#repYearFen").hide();
	                finEchart(id,fundTime,$("#noteTypeO").text().substr(0,10));
	            };
	        });
	        //导出excel
	        $("#outExcel").on("click", function () {
	        	var fundTime = $(".tabPaneList").find("li.tabActive").attr("name");
	            var param = {
	                "id": Query.getHash("id")
	            }
	            window.open($.kf.GETCOMPANYFINANCE + "?id=" + id+ "&fundTime=" + fundTime)
	        });
	
	    };
	    //成长性，安全性，回报率三个表格和图表
	    var growEch = function(){
	    	var widPert = $(".comNewCss").width();
	    	$(".growTablePar").width(widPert/2);
            $(".growEch").width(widPert/5*2);
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
	                'echarts/chart/pie' // 使用柱状图就加载bar模块，按需加载
	            ],
	            function (ec) {
	                // 基于准备好的dom，初始化echarts图表
	                var growingEch = ec.init(document.getElementById('growingEch'),"macarons");
	                var growingEch2 = ec.init(document.getElementById('growingEch2'),"macarons");
	                var growingEch3 = ec.init(document.getElementById('growingEch3'),"macarons");
	                window.addEventListener("resize", function () {
				    	$(".growTablePar").width($(".comNewCss").width()/2);
			            $(".growEch").width($(".comNewCss").width()/5*2);
	                    growingEch.resize();
	                    growingEch2.resize();
	                    growingEch3.resize();
	                });
	                var autoRowSpan = function (tb,row,col){  
				        var lastValue="";  
				        var value="";  
				        var pos=1;  
				        for(var i=row;i<tb.rows.length;i++)  
				        {  
				            value = tb.rows[i].cells[col].innerText;  
				            if(lastValue == value)  
				            {  
				                tb.rows[i].deleteCell(col);  
				                tb.rows[i-pos].cells[col].rowSpan = tb.rows[i-pos].cells[col].rowSpan+1;  
				                pos++;  
				            }else{  
				                lastValue = value;  
				                pos=1;  
				            }  
				        }  
				    }
			        var growingOption = {
					    title : {
					        text: '',
					        subtext: ''
					    },
					    tooltip : {
					        trigger: 'axis'
					    },
					    legend: {
					        data:[]
					    },
					    grid:{
					    	x: 50,
							y: 50,
							x2: 10,
							y2: 50
					    },
					    calculable : true,
					    xAxis : [
					        {
					            type : 'category',
					            data : ["2014-06-30",3,3,3]
					        }
					    ],
					    yAxis : [
					        {
					            type : 'value',
					            boundaryGap : [0, 0.01]
					        }
					    ],
					    series : [
					        {
					            name:'收入增长率',
					            type:'bar',
					            itemStyle:{
					            	normal:{
					            		//barBorderRadius: 0
					            	}
					            },
					            data:[]
					        },
					        {
					            name:'净利润增长',
					            type:'bar',
					            itemStyle:{
					            	normal:{
					            		//barBorderRadius: 0
					            	}
					            },
					            data:[]
					        },
					        {
					            name:'毛利率',
					            type:'bar',
					            itemStyle:{
					            	normal:{
					            		//barBorderRadius: 0
					            	}
					            },
					            data:[]
					        },
					        {
					            name:'收入与利率比',
					            type:'bar',
					            itemStyle:{
					            	normal:{
					            		//barBorderRadius: 0
					            	}
					            },
					            data:[]
					        }
					    ]
					};
			        var growingOption2 = {
					    title : {
					        text: '',
					        subtext: ''
					    },
					    tooltip : {
					        trigger: 'axis'
					    },
					    grid:{
					    	x: 50,
							y: 50,
							x2: 10,
							y2: 50
					    },
					    legend: {
					        data:[]
					    },
					    calculable : true,
					    xAxis : [
					        {
					            type : 'category',
					            data : []
					        }
					    ],
					    yAxis : [
					        {
					            type : 'value',
					            boundaryGap : [0, 0.01]
					        }
					    ],
					    series : [
					        {
					            name:'回报率',
					            type:'bar',
					            itemStyle:{
					            	normal:{
					            		//barBorderRadius: 0
					            	}
					            },
					            data:[]
					        },
					        {
					            name:'盈利水平',
					            type:'bar',
					            itemStyle:{
					            	normal:{
					            		//barBorderRadius: 0
					            	}
					            },
					            data:[]
					        }
					    ]
					};
					var growingOption3 = {
					    title : {
					        text: '',
					        subtext: ''
					    },
					    tooltip : {
					        trigger: 'axis'
					    },
					    grid:{
					    	x: 50,
							y: 50,
							x2: 10,
							y2: 50
					    },
					    legend: {
					        data:[]
					    },
					    calculable : true,
					    xAxis : [
					        {
					            type : 'category',
					            data : []
					        }
					    ],
					    yAxis : [
					        {
					            type : 'value',
					            boundaryGap : [0, 0.01],
					            name:"万元"
					        }
					    ],
					    series : [
					        {
					            name:'资产结构',
					            type:'bar',
					            itemStyle:{
					            	normal:{
					            		//barBorderRadius: 0
					            	}
					            },
					            data:[]
					        },
					        {
					            name:'负债结构',
					            type:'bar',
					            itemStyle:{
					            	normal:{
					            		//barBorderRadius: 0
					            	}
					            },
					            data:[]
					        },
					        {
					            name:'运营资本和资本流转',
					            type:'bar',
					            itemStyle:{
					            	normal:{
					            		//barBorderRadius: 0
					            	}
					            },
					            data:[]
					        },
					        {
					            name:'现金流',
					            type:'bar',
					            itemStyle:{
					            	normal:{
					            		//barBorderRadius: 0
					            	}
					            },
					            data:[]
					        }
					    ]
					};
			        
			        var id = Query.getHash("id");
			        $.kf.ajax({
			            type: "get",
			            url: $.kf.GETTOPAYCOMPANYLISTED,
			            data: "",
			            dataType: "json",
			            processResponse: function (data) {
			            	var data = "";
					        if(!isNullOrEmpty(data)){ //没权限
					        	$(".growTablePar").find("table").hide();
					        	$(".caiwu0").show();
					        }else{
					        	//表格1
						        $.kf.ajax({
						            type: "get",
						            url: $.kf.GETFINANCIALANALYSISTABLE+"?id="+id+"&type=growingUp"+"&date="+$("#noteTypeO").text().substr(0,10),
						            data: "",
						            dataType: "json",
						            processResponse: function (data) {
						            	var list = data.data;
						            	var tr = "";
						            	$("#growingTabel").html("");
								        $(list).each(function (i) {
								            tr += "<tr>";
								            tr += "<td>" + list[i].typeName + "</td>";
								            tr += "<td style='text-align:left;padding-left:15px;'>" + list[i].name + "</td>";
								            tr += "<td style='text-align:right;padding-right:15px;'>" + list[i].value + "</td>";
								            tr += "<td>" + list[i].content + "</td>";
								            tr += "</tr>";
								        });
								        $("#growingTabel").append(tr);
								        var growingTabel = document.getElementById("growingTabel")
								        autoRowSpan(growingTabel,0,0);
						            }
						        });
						        //表格2
						        $.kf.ajax({
						            type: "get",
						            url: $.kf.GETFINANCIALANALYSISTABLE+"?id="+id+"&type=returnAnalysis"+"&date="+$("#noteTypeO").text().substr(0,10),
						            data: "",
						            dataType: "json",
						            processResponse: function (data) {
						            	var list = data.data;
						            	var tr = "";
						            	$("#growingTabel2").html("");
								        $(list).each(function (i) {
								            tr += "<tr>";
								            tr += "<td>" + list[i].typeName + "</td>";
								            tr += "<td style='text-align:left;padding-left:15px;'>" + list[i].name + "</td>";
								            tr += "<td style='text-align:right;padding-right:15px;'>" + list[i].value + "</td>";
								            tr += "<td>" + list[i].content + "</td>";
								            tr += "</tr>";
								        });
								        $("#growingTabel2").append(tr);
								        var growingTabel2 = document.getElementById("growingTabel2")
								        autoRowSpan(growingTabel2,0,0);
						            }
						        });
						        //表格3
						        $.kf.ajax({
						            type: "get",
						            url: $.kf.GETFINANCIALANALYSISTABLE+"?id="+id+"&type=safety"+"&date="+$("#noteTypeO").text().substr(0,10),
						            data: "",
						            dataType: "json",
						            processResponse: function (data) {
						            	var list = data.data;
						            	var tr = "";
						            	$("#growingTabel3").html("");
								        $(list).each(function (i) {
								            tr += "<tr>";
								            tr += "<td>" + list[i].typeName + "</td>";
								            tr += "<td style='text-align:left;padding-left:15px;'>" + list[i].name + "</td>";
								            tr += "<td style='text-align:right;padding-right:15px;'>" + list[i].value + "</td>";
								            tr += "<td>" + list[i].content + "</td>";
								            tr += "</tr>";
								        });
								        $("#growingTabel3").append(tr);
								        var growingTabel3 = document.getElementById("growingTabel3")
								        autoRowSpan(growingTabel3,0,0);
						            }
						        });
					        }
			            }
			        });
			        
			         //图表1
			        $.kf.ajax({
			            type: "get",
			            url: $.kf.GETFINANCIALANALYSISBAR+"?id="+id+"&type=growingUp"+"&date="+$("#noteTypeO").text().substr(0,10),
			            data: "",
			            dataType: "json",
			            processResponse: function (data) {
			            	if(!isNullOrEmpty(data.data)){
			            		growingOption.xAxis[0].data = data.data.name;
				            	growingOption.series[0].data = data.data.data1;
				            	growingOption.series[1].data = data.data.data2;
				            	growingOption.series[2].data = data.data.data3;
				            	growingOption.series[3].data = data.data.data4;
				            	growingEch.setOption(growingOption); 
			            	}else{
			            		//$("#growingEch > div").append("<div class='currentNoData' style='top:100px;font-size:14px;'>暂无数据</div>");
			            		$("#growingEch").hide();
			            	};
			            }
			        });
			        //图表2
			        $.kf.ajax({
			            type: "get",
			            url: $.kf.GETFINANCIALANALYSISBAR+"?id="+id+"&type=returnAnalysis"+"&date="+$("#noteTypeO").text().substr(0,10),
			            data: "",
			            dataType: "json",
			            processResponse: function (data) {
			            	if(!isNullOrEmpty(data.data)){
				            	growingOption2.xAxis[0].data = data.data.name;
				            	growingOption2.series[0].data = data.data.data1;
				            	growingOption2.series[1].data = data.data.data2;
				            	growingEch2.setOption(growingOption2); 
			            	}else{
			            		//$("#growingEch2 > div").append("<div class='currentNoData' style='top:100px;font-size:14px;'>暂无数据</div>");
			            		$("#growingEch2").hide();
			            	};
			            }
			        });
			        //图表3
			        $.kf.ajax({
			            type: "get",
			            url: $.kf.GETFINANCIALANALYSISBAR+"?id="+id+"&type=safety"+"&date="+$("#noteTypeO").text().substr(0,10),
			            data: "",
			            dataType: "json",
			            processResponse: function (data) {
			            	if(!isNullOrEmpty(data.data)){
				            	growingOption3.xAxis[0].data = data.data.name;
				            	growingOption3.series[0].data = data.data.data1;
				            	growingOption3.series[1].data = data.data.data2;
				            	growingOption3.series[2].data = data.data.data3;
				            	growingOption3.series[3].data = data.data.data4;
				            	growingEch3.setOption(growingOption3); 
			            	}else{
			            		//$("#growingEch3 > div").append("<div class='currentNoData' style='top:100px;font-size:14px;'>暂无数据</div>");
			            		$("#growingEch3").hide();
			            	};
			            }
			        });
	            }
	        );
	    
	    }
	    //财务分析三个圆
	    var finEchart = function(id,fundTime,year){
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
	                'echarts/chart/pie' // 使用柱状图就加载bar模块，按需加载
	            ],
	            function (ec) {
	                // 基于准备好的dom，初始化echarts图表
	                var myChart = ec.init(document.getElementById('echarNum'),"macarons"); 
	                var myChart2 = ec.init(document.getElementById('echarNum2'),"macarons"); 
	                var myChart3 = ec.init(document.getElementById('echarNum3'),"macarons"); 
	                $(".echarNum").width($(".comNewCss").width()/3);
	                window.addEventListener("resize", function () {
	                	$(".echarNum").width($(".echWrap").width());
	                    myChart.resize();
	                    myChart2.resize();
	                    myChart3.resize();
	                })
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
					    
					    toolbox: {},
					    calculable : false,
					    series : [
					        {
					            name:'',
					            type:'pie',
					            radius : ['50%', '60%'],
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
							            		fontSize:14
							            	}
							            }
					            	}
					            },
					            data:[]
					        }
					    ]
					};
					var optionEch2 = {
					    tooltip : {
					        trigger: 'item',
					        formatter: "{a} <br/>{b} : {c} ({d}%)"
					    },
					    legend: {
					        orient : 'vertical',
					        x : 'left',
					        data:[]
					    },
					    toolbox: {},
					    calculable : false,
					    series : [
					        {
					            name:'',
					            type:'pie',
					            radius : ['50%', '60%'],
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
							            		fontSize:14
							            	}
							            }
					            	}
					            },
					            data:[]
					        }
					    ]
					};
					var optionEch3 = {
					    tooltip : {
					        trigger: 'item',
					        formatter: "{a} <br/>{b} : {c} ({d}%)"
					    },
					    legend: {
					        orient : 'vertical',
					        x : 'left',
					        data:[]
					    },
					    
					    toolbox: {},
					    calculable : false,
					    series : [
					        {
					            name:'',
					            type:'pie',
					            radius : ['50%', '60%'],
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
							            		fontSize:14
							            	}
							            }
					            	}
					            },
					            data:[]
					        }
					    ]
					};
	        		$.kf.ajax({
			            type: "get",
			            url: $.kf.GETFINANCIALANALYSIS+"?id="+id+"&type=analysis&year="+year,
			            data: "",
			            dataType: "json",
			            processResponse: function (data) {
			            	$(".echarNum > div").find(".currentNoData").remove();
			            	$("#echLine-left").text(data.data.growingUp.name);
		                	$("#echLine-right").text(data.data.growingUp.date);
		                	$("#echLine-left2").text(data.data.returnAnalysis.name);
		                	$("#echLine-right2").text(data.data.returnAnalysis.date);
		                	$("#echLine-left3").text(data.data.safety.name);
			                $("#echLine-right3").text(data.data.safety.date);
			                if(!isNullOrEmpty(data.data.growingUp.data)){
			                	optionEch.series[0].data = data.data.growingUp.data;
			                	myChart.setOption(optionEch); 
			                }else{
			            		$("#echarNum > div").append("<div class='currentNoData' style='top:180px;font-size:14px;'>暂无数据</div>");
			            	};
			            	if(!isNullOrEmpty(data.data.returnAnalysis.data)){
			                	optionEch2.series[0].data = data.data.returnAnalysis.data;
			                	myChart2.setOption(optionEch2); 
			                }else{
			            		$("#echarNum2 > div").append("<div class='currentNoData' style='top:180px;font-size:14px;'>暂无数据</div>");
			            	}
			                if(!isNullOrEmpty(data.data.safety.data)){
			                	optionEch3.series[0].data = data.data.safety.data;
				                myChart3.setOption(optionEch3); 
			                }else{
			            		$("#echarNum3 > div").append("<div class='currentNoData' style='top:180px;font-size:14px;'>暂无数据</div>");
			            	}
			               		            
			            }
			        });
	            }
	        );
	    }
	    //财务报表非点击事件
	    var moneyReportInd = function(fundTime,year){
	    	var id = Query.getHash("id");
	        var fundTime = fundTime;
	        var year = year;
			var ind = $("#banU").find("li.active").attr("name");
	        if (ind == 0) {//财务摘要
		        $(".mask-in").remove();
		        $(".maskInTable").height("auto");
		        $("#typeSel").hide();
		        $("#repYearFenLine").show();
		    	$("#repYearFen").show();
	            _url = $.kf.GETFINANCEINDICATORYEARZCFZ + "?" + "id=" + id + "&fundTime=" + fundTime + "&page=" + 1+"&type=indicator";
	            var lastPage = 1;
	            $.getTable({
		        	url:_url,//url
			    	pageId:$("#banPage"),//分页id
			    	callback:moneyReportList,//callback
			    	currentPage:lastPage,
			    	showPageTool:false, 
			    	tbodyId:$("#banTable")//tbody的id,
		        })
		    };
		    if (ind == 1) {//资产负载
		        $(".mask-in").remove();
		        $(".maskInTable").height("auto");
		        $("#repYearFenLine").show();
		    	$("#repYearFen").show();
	            _url = $.kf.GETFINANCEINDICATORYEARZCFZ + "?" + "id=" + id + "&fundTime=" + fundTime + "&page=" + 1+"&type=sheets";
	            var lastPage = 1;
	            $.getTable({
		        	url:_url,//url
			    	pageId:$("#banPage2"),//分页id
			    	callback:moneyReportList,//callback
			    	currentPage:lastPage,
			    	showPageTool:false, 
			    	tbodyId:$("#banTable2")//tbody的id,
		        })
		    };
		    if (ind == 2) {//利润
		        $(".mask-in").remove();
		        $(".maskInTable").height("auto");
		        $("#repYearFenLine").show();
		    	$("#repYearFen").show();
	            _url = $.kf.GETFINANCEINDICATORYEARZCFZ + "?" + "id=" + id + "&fundTime=" + fundTime + "&page=" + 1+"&type=profit";
	            var lastPage = 1;
	            $.getTable({
		        	url:_url,//url
			    	pageId:$("#banPage3"),//分页id
			    	callback:moneyReportList,//callback
			    	currentPage:lastPage,
			    	showPageTool:false, 
			    	tbodyId:$("#banTable3")//tbody的id,
		        })
		    };
		    if (ind == 3) {//现金流量
		        $(".mask-in").remove();
		        $(".maskInTable").height("auto");
		        $("#repYearFenLine").show();
		    	$("#repYearFen").show();
	            _url = $.kf.GETFINANCEINDICATORYEARZCFZ + "?" + "id=" + id + "&fundTime=" + fundTime + "&page=" + 1+"&type=flow";
	            var lastPage = 1;
	            $.getTable({
		        	url:_url,//url
			    	pageId:$("#banPage4"),//分页id
			    	callback:moneyReportList,//callback
			    	currentPage:lastPage,
			    	showPageTool:false, 
			    	tbodyId:$("#banTable4")//tbody的id,
		        })
		    };
		    if (ind == 4) {//财务分析
		    	$("#typeSel").hide();
		    	$("#typeSelNull").hide();
		    	$("#repYearFenLine").hide();
		    	$("#repYearFen").hide();
		        finEchart(id,fundTime,year);
	            
		    };
	    }
	    var moneyReportEvent = function(){
		  	//报告筛选事件
		   	$(".tabPaneList").find("li").on("click",function(){
		   		$(this).addClass("tabActive").siblings().removeClass('tabActive');
		   		var fundTime = $(this).attr("name");
		   		$(".banTable").html("");
	            $(".tableParCa .view-tr").html("");
				moneyReportInd(fundTime,$("#noteTypeO").text().substr(0,10));
	    	});
	    	
	    	//是否显示同比增长率
	    	$("#typeSel").off().on("click", function () {
	    		var ind = $("#banU").find("li.active").index();
	    		$(".my-wrapTable").eq(ind).find(".view-tr").html("");
	    		$(".my-wrapTable").eq(ind).find(".banTable").html("");
	            $("#typeSel b").toggleClass("typeNews-active");
	            var fundTime =  $(".tabPaneList").find("li.tabActive").attr("name");
	            moneyReportInd(fundTime);
	        });
	        //是否显空行
	    	$("#typeSelNull").off().on("click", function () {
	    		var ind = $("#banU").find("li.active").index();
	    		$(".my-wrapTable").eq(ind).find(".view-tr").html("");
	    		$(".my-wrapTable").eq(ind).find(".banTable").html("");
	            $("#typeSelNull span").toggleClass("type-active");
	            if($("#typeSelNull span").hasClass("type-active")){
	            	$("#typeSelNull span").text("隐藏空行");
	            }else{
	            	$("#typeSelNull span").text("显示空行");
	            }
	            var fundTime =  $(".tabPaneList").find("li.tabActive").attr("name");
	            moneyReportInd(fundTime);
	        });
	    }
	    var moneyReportList = function (data) {
	    	var type = data.type;
	        var list = data.data;
	        var tr = "";
	        var th = "";
	        var thArray = [];
	        $(".banTable").html("");
	        $(".tableParCa .view-tr").html("");
	        //每个list的key都相同
	        for (var key in list[0]){
	    		thArray.push(key);
	    	};
			//tbody
			if(type != "indicator"){//非财务摘要表格
				var str = "";
		        $(thArray).each(function (j) {
		            tr = "<tr class='eachLi'>";
		            var m = 0;
			            $(list).each(function (i) {
			            	//显示空行
			            	if(!$("#typeSelNull").find("span").hasClass("type-active")){
		            			if(isNullOrEmpty(list[i][thArray[j]])||list[i][thArray[j]] == "0.00"){
				            		m++;
				            	}	
	            			}
			            	//加载全部tr
			            	if($("#typeSel").find("b").hasClass("typeNews-active")){
			            		if(isNullOrEmpty(list[i][thArray[j]])){
			            			tr += "<td>--</td>";
			            		}else{
			            			if(list[i][thArray[j]] == thArray[j]){
			            				tr += "<td class='noBorderTd'></td>";
				            		}else{
				            			tr += "<td>" + list[i][thArray[j]] + "</td>";
				            		}
			            		}
			            	}else{//去除同比增长率的tr 同比增长率写死位于2的倍数处
			            		if(i%2 == 0){
			            			if(isNullOrEmpty(list[i][thArray[j]])){
				            			tr += "<td>--</td>";
				            		}else{
				            			if(list[i][thArray[j]] == thArray[j]){
				            				tr += "<td class='noBorderTd'></td>";
					            		}else{
					            			tr += "<td>" + list[i][thArray[j]] + "</td>";
					            		}
				            		}
			            		}
			            	}
			            })
			            if(m == list.length){
			            	tr = "";
			            }else{
			            	//左表格thead
			            	th += "<tr class='tr tableOfTh'><td>" + thArray[j] + "</td>";
			            	tr += "</tr>";
			            }
			            str = str + tr;
		        });   		
        	}else{//财务摘要表格单独处理。不需要同比增长率
        		var str = "";
        		$(thArray).each(function (j) {
		            var tr = "<tr class='eachLi'>";
		            var m = 0;
		            $(list).each(function (i) {
		            	//显示空行
		            	if(!$("#typeSelNull").find("span").hasClass("type-active")){
	            			if(isNullOrEmpty(list[i][thArray[j]])||list[i][thArray[j]] == "0.00"){
			            		m++;
			            	}	
            			}
		            	if(isNullOrEmpty(list[i][thArray[j]])){
	            			tr += "<td>--</td>";
	            		}else {
	            			if(list[i][thArray[j]] == thArray[j]){
	            				tr += "<td class='noBorderTd'></td>";
		            		}else{
		            			tr += "<td>" + list[i][thArray[j]] + "</td>";
		            		}
	            		}
		            })
		            if(m == list.length){
		            	tr = "";
		            }else{
		            	//左表格thead
		            	th += "<tr class='tr tableOfTh'><td>" + thArray[j] + "</td>";
		            	tr += "</tr>";
		            }
		            str = str + tr;
		        });
        	}
	        
	        switch (type){
	        	case "indicator":
	        		$(".view-tr2").append(th);
	        		$("#banTable").append(str);
	        		break;
	        	case "sheets":
	        		$(".view-tr3").append(th);
	        		$("#banTable2").append(str);
	        		break;
	        	case "profit":
	        		$(".view-tr4").append(th);
	        		$("#banTable3").append(str);
	        		break;
	        	case "flow":
	        		$(".view-tr5").append(th);
	        		$("#banTable4").append(str);
	        		break;
	        	default:
	        		break;
	        }
	        //右边table标头
	        $(".view-tr").find('.tableOfTh').eq(0).find("td").css({
	        	"background":"#f1f3fa",
	        	"color":"#333",
	        	"font-weight":"bold"
	        });
	        //右边table标头
	        $('.eachLi').eq(0).find("td").css({
	        	"background":"#f1f3fa",
	        	"color":"#333",
	        	"font-weight":"bold"
	        });
	        //合并标题border
	        $('.eachLi').find("td.noBorderTd:last").css({
	        	"border-right":"1px solid #ddd"
	        });
	        //每行最后一个td有边框为0
	        $('.eachLi').find("td:last").css({
	        	"border-right":"0px solid #ddd"
	        });
	        //右表格父元素宽度
	        $('.tableParCa2Par').width($(".adobeLeft").width() - 300);
	        
	        
	        $(".tableOfTh").each(function(){
	        	if($(this).find("b").hasClass("firstLeverTd")){
	        		$(this).find("td").css("padding-left","10px")
	        	}
	        })
	        //右表格悬浮
	        $(".eachLi").each(function(){
	        	var _isNull = true;
	        	var _ind = $(this).index();
        		var _height = $(".tableOfTh").eq(_ind).find("td").height();
        		$(this).find("td").height(_height);
        		$(this).find("td").css("line-height",_height+"px");
	        	//mouseEvent
	        	$(this).on({
	        		"mouseover":function(){
	        			$(this).css({"background-color":"#f4f4fc"});
	        			$(this).parents(".tableParCa").parent().siblings(".tableParCa").find(".tableOfTh").eq($(this).index()).css({"background-color":"#f4f4fc"});
	        		},
	        		"mouseout":function(){
	        			if($(this).index()%2 == 0){
	        				$(this).css({"background-color":"#fff"});
	        				$(this).parents(".tableParCa").parent().siblings(".tableParCa").find(".tableOfTh").eq($(this).index()).css({"background-color":"#fff"});
	            		}else{
	        				$(this).css({"background-color":"#f9f9f9"});
	        				$(this).parents(".tableParCa").parent().siblings(".tableParCa").find(".tableOfTh").eq($(this).index()).css({"background-color":"#f9f9f9"});
	            		}
	        		}
	        	});
	        });
	         //左表格悬浮
	        $(".tableOfTh").each(function(){
	        	if($(this).parents(".tableParCa").siblings().find(".tableParCa").find(".eachLi").eq($(this).index()).find("td").hasClass("noBorderTd")){
	        		$(this).find("td").addClass("noRightBorderTd");
	        	}
	        	if($(this).find("td").html().indexOf("b") > 0){
	        		$(this).parents(".tableParCa").siblings().find(".tableParCa").find(".eachLi").eq($(this).index()).find("td").addClass("fontWeightTd");
	        	}
	        	$(this).on({
	        		"mouseover":function(){
	        			$(this).css({"background-color":"#f4f4fc"});
	        			$(this).parents(".tableParCa").siblings().find(".tableParCa").find(".eachLi").eq($(this).index()).css({"background-color":"#f4f4fc"});
	        		},
	        		"mouseout":function(){
	        			if($(this).index()%2 == 0){
	        				$(this).css({"background-color":"#fff"});
	        				$(this).parents(".tableParCa").siblings().find(".tableParCa").find(".eachLi").eq($(this).index()).css({"background-color":"#fff"});
	            		}else{
	        				$(this).css({"background-color":"#f9f9f9"});
	        				$(this).parents(".tableParCa").siblings().find(".tableParCa").find(".eachLi").eq($(this).index()).css({"background-color":"#f9f9f9"});
	            		}
	        		}
	        	});
	        });
	    };
	    //tab判断
	    var comRefreshTab = function(_leg){
	    	var _leg = _leg;
	    	if (_leg == "tab_0") {
	            $(".mask-in").remove();
	            $(".maskInTable").height("auto");
	            if (isNullOrEmpty($("#tableOne").html())) {
	                initNoticeList(); //公告
	            }
	        }
	        ;
	        if (_leg == "tab_2") {
	            $(".mask-in").remove();
	            $(".maskInTable").height("auto");
	            if (isNullOrEmpty($("#newsTable").html())) {
	                getcompNews();//新闻 
	            }
	        }
	        ;
	        if (_leg == "tab_3") {
	            $(".mask-in").remove();
	            $(".maskInAjax").height("auto");
	            if (isNullOrEmpty($("#basicName").html())) {
	                basicInfo();//基本信息
	            }
	        }
	        ;
	        if (_leg == "tab_4") {
	            //财报
	            $(".mask-in").remove();
	            $(".maskInTable").height("auto");
	            if (isNullOrEmpty($("#banTable").html())) {
	                moneyReportYear();//财报
	            }
	        }
	        ;
	        if (_leg == "tab_10") {
	            $(".mask-in").remove();
	            $(".maskInTable").height("auto");
	            businessAnalysis();//商业分析
	        };
	        if (_leg == "tab_9") {
	            $(".mask-in").remove();
	            $(".maskInTable").height("auto");
	            riskWarning();//风险信息
	        };
	        if (_leg == "tab_5") {
	            $(".mask-in").remove();
	            $(".maskInTable").height("auto");
	            if (isNullOrEmpty($("#reportTable").html())) {
	                getcompReport();//研报
	            }
	        }
	        ;
	        if (_leg == "tab_6") {
	            $(".mask-in").remove();
	            $(".maskInTable").height("auto");
	            if (isNullOrEmpty($("#holderWrap").html())) {
	                companyStatus();//公司概况
	            }
	        }
	        ;
	        if (_leg == "tab_7") {
	            $(".mask-in").remove();
	            $(".maskInTable").height("auto");
	             rdInvestment();//知识产权
	        };
	        if (_leg == "tab_11") {
	            $(".mask-in").remove();
	            $(".maskInTable").height("auto");
	            if(fromType == "investCompany"){
	            	$("#foreignInvestment").click();//默认加载对外投资
	            }else{
	            	ownershipStructure();//关系图谱 默认加载股权结构
	            }
	        };
	        if (_leg == "tab_12") {
	            $(".mask-in").remove();
	            $(".maskInTable").height("auto");
	            
	        };
	        if (_leg == "tab_13") {
	            $(".mask-in").remove();
	            $(".maskInTable").height("auto");
	            operitingInit();//经营信息
	        };
	    }
	    //tab切换
	    var comDetailTab = function(){
	    	$(".comNewTab").find("a").off("menu").on("click.menu", function () {
	    		$(document).scrollTop(223);
	    		var thisId = Query.getHash("id");
	    		$(this).parent().addClass("active2").siblings("li").removeClass("active2");
	    		var nameCodeId = Query.getHash("nameCodeId");
	            var _leg = $(this).attr('href');
	            _leg = _leg.split("_")[1];
	            pushUrlState("_"+_leg,{"id":thisId,"nameCodeId":nameCodeId,"from":fromType,"companyName":companyNameJs});
	            comRefreshTab("tab_" + _leg);
	        }); 
	        //刷新
			var _leg = Query.getHash("currentTab");
			if(isNullOrEmpty(_leg)){
				if(fromType != "investCompany"){
					_leg = 'tab_1';
				}else{
					_leg = 'tab_6';
				}
			}
			comRefreshTab(_leg);
			if(isNullOrEmpty(_leg)){
				if(fromType != "investCompany"){
					_leg = '#tab_1';
				}else{
					_leg = '#tab_6';
				}
			}else{
				_leg = "#" + _leg;
			}
			$(".comNewTab").find("a").each(function(){
				if($(this).attr("href") == _leg){
					$(this).parent().addClass("active").siblings().removeClass("active");
					$(this).parent().addClass("active2").siblings("li").removeClass("active2");
					$(_leg).addClass("active").siblings().removeClass("active");
				}
			})
	    }
	    return {
	        init: function () {
	        	if(isNullOrEmpty(Query.getHash("id"))){
	        		window.location.href= $.url.login();
	        		return false;
	        	}
				comDetailTab();//tab切换
				basicMsg();//执行挂牌公司基本信息
	            /*模拟select选中,和宽度适应*/
	            var Selects = function (el, options) {
	                this.el = el;
	                this.options = options;
	                var _width = this.el.width();
	                var _minwidth = _width - 44;
	                //this.el.find(".dropdown-menu").width(_width);
	                this.el.find(".dropdown-menu").css("min-width", _minwidth);
	            }
	
	            Selects.prototype = {
	                init: function (el, opitions) {
	                    var _this = this;
	                    if (_this.el.parent().is("th")) {
	                        var _intext = "<b class='caret'></b>";
	                    } else {
	                        var _intext = "<span class='input-group-btn caret2'><button class='btn btn-sm  btn-icon-btn' type='button'><i class='fa fa-calendar2'></i></button></span>";
	                    }
	                    ;
	                    this.el.find(".dropdown-menu").children("li").on("click", function () {
	                        var _text = $(this).find("a").text();
	                        selectType = $(this).find("a").attr("name");
	                        _this.el.find(".dropdown-toggle").html(_text + _intext);
	                    });
	                }
	            };
	            //执行下拉框
	            new Selects($("#noticeSelect"), {}).init();
	            //一级菜单悬浮
	            $(".comNewCss .comNewTab li").on("mouseover",function(){
	        		$(".basicMenu").show();
	        		var index = $(this).index();
	        		$(".comNewCss .comNewTab li").removeClass("active1");
	        		$(this).addClass("active1");
	        		$(".basicMenu > li").find("ul").removeClass("active");
	        		$(".basicMenu > li").eq(index).find("ul").addClass("active");
	            });
	            //二级菜单中的悬浮
	            $(".basicMenu > li").find("ul").on({
	            	"mouseover":function(){
	            		var _ind = $(this).parent().index();
	            		$(".comNewCss .comNewTab li").removeClass("active1");
	            		$(".comNewCss .comNewTab li").eq(_ind).addClass("active1");
	            		$(".basicMenu > li").find("ul").removeClass("active");
	            		$(this).addClass("active");
	            	},
	            	"mouseleave":function(){
	            		//$(".basicMenu").hide();
	            	}
	            });
	            //离开二级菜单
	            $(".basicMenu").on("mouseleave",function(){
	            	$(this).hide();
	            })
	            //离开一级菜单
	            $(".comNewCss").on("mouseleave",function(){
	            	$(".basicMenu").hide();
	            	$(".comNewCss .comNewTab li").removeClass("active1");
	            });
	            
	            $(window).resize(function() {
					$(".comNewCss").width($(".comNewCss").parent().width());
				});
	            /*鼠标滚动*/
	            var _widComNew = $('.comNewCss').parent().width();
	            $('.comNewCss').width(_widComNew);
	            $(window).scroll(function(){
	            	var scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
	           		if($(document).scrollTop() >= 204){
	           			$('.comNewCss').addClass('comNewFixed');
	           			$(".comNewFixed").css("left",265-scrollLeft);
	           		}else{
	           			$('.comNewCss').removeClass('comNewFixed');
						$(".comNewCss").css("left",0);
	           		}
	            });
	            //财务分析查看详情
		        $("#toCwfx").on("click",function(){
		        	$(".comNewTab").find("li").eq(5).find("a").click();
		        	$("#banU").find("li").eq(0).click();
		        });
	            /*锚点跳转*/
		        $(".basicMenu > li li").find("a").on("click",function(e){
		        	if($(this).hasClass("gray")){
		        		return false;
		        	}
		        	//$('.comNewCss').addClass('comNewFixed');
		        	//获取和导航相对应的索引
		        	var _index = $(this).parent().parent().parent().index();
		        	//同一个tab下的二级菜单
		        	if(_index == $(".comNewTab").find("li.active").index()){
		        		//企业图谱
		        		if($(this).hasClass("qytp")){
		        			var qytpInd = $(this).parent().index();
		        			$(".relationshipTab").find("a").eq(qytpInd).click();
		        			return false;
		        		}
		        		//财务数据
		        		if($(this).hasClass("cwsj")){
		        			var cwsjInd = $(this).parent().index();
		        			$("#banU").find("li").eq(cwsjInd).click();
		        			return false;
		        		}
		        	}else{
		        		//调转到不同的tab
		        		$(".comNewTab").find("li").eq(_index).find("a").click();
		        		//企业图谱
		        		if($(this).hasClass("qytp")){
		        			var qytpInd = $(this).parent().index();
		        			$(".relationshipTab").find("a").eq(qytpInd).click();
		        			return false;
		        		}
		        		//财务数据
		        		if($(this).hasClass("cwsj")){
		        			var cwsjInd = $(this).parent().index();
		        			$("#banU").find("li").eq(cwsjInd).click();
		        			return false;
		        		}
		        	}
		        	var _name = $(this).attr("name");
		        	var offsetTop = $("#"+_name).offset().top;//当前元素在body中的offsetTop值
		        	document.getElementById(_name).scrollIntoView(true);//显示锚点元素到顶栏
		        	var _top = $(document).scrollTop();
		        	_top = _top - 123;//123是clearHeight+$(#_name)的margin-top值；
		        	//console.log(offsetTop+":"+$(document).scrollTop());
		        	if(offsetTop == $(document).scrollTop()){
		        		//根据name元素重新定位页面位置;
		        		$(document).scrollTop(_top);
		        	}
		        });
	        }
	    }
}();


