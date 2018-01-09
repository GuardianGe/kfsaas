/*
 * 
 * 
 券商---------------公告管理  
 * 
 * 
 * */
var SupSecurity = function () {
	//公告ID
	var thisId;
	//公告类型
	var thisType;
    //公告选项点击事件
    var listComClick = function () {
        var securities = "";
        var industry = "";
        var province = "";
        var teCode = '';
        var typeText = '';
        var seCode = '';
        var ceCode = '';
        var compText = '';
        $(".allList").find("li").unbind("click").on("click", function (event) {
            event.preventDefault();
            var ind = $("#soCheck").find("li").length;
            if (!$(this).hasClass("hang-more")) {
                $("#tableOne").html("");
                $(this).parent("ul").find("li").removeClass("hang-active");
                $(this).addClass("hang-active");
				seCode = Query.getHash("seCode");
				teCode = Query.getHash("teCode");
				ceCode = Query.getHash("ceCode");
                /*公告类型*/
                if ($(this).parents(".allList").hasClass('sameTab')) {
                    securities = $(this).text();
                    seCode = $(this).attr("name");
                    if ($(this).index() == 0) {
                    	if($(".listOne").length){
                    		if(ind <= 2){
                    			$("#allListSo").hide();
                    		}
                    		Query.setHash({
	                            "seCode": ""
	                        });
	                        $(".listOne").remove();
                    	}
                    	
                    } else {
                    	$("#allListSo").show();
                        Query.setHash({
                            "seCode": seCode
                        });
                        $(".listOne").remove();
                        $("#allListSo").find("ul").prepend("<li class='listOne' name =" + seCode + ">" + securities + "<span class='soListClose'></span></li>");
                    }

                }
                /*公司列表*/
                if ($(this).parents(".allList").attr("id") == 'compJs') {
                    compText = $(this).text();
                    ceCode = $(this).attr("name");
                    if ($(this).index() == 0) {
                    	if($(".listThree").length){
                    		if(ind <= 2){
                    			$("#allListSo").hide();
                    		}
                    		Query.setHash({
	                            "ceCode": ""
	                        });
	                        $(".listThree").remove();
                    	}
                    	
                    } else {
                    	$("#allListSo").show();
                        Query.setHash({
                            "ceCode": ceCode
                        });
                        $(".listThree").remove();
                        $("#allListSo").find("ul").prepend("<li class='listThree' name =" + ceCode + ">" + compText + "<span class='soListClose'></span></li>");
                    }

                }
                 /*公告进度*/
                if ($(this).parents(".allList").attr("id") == "compYg") {
                    teCode = $(this).attr("name");
                    typeText = $(this).text();
                    if ($(this).index() == 0) {
                    	if($(".listTwo").length){
                    		if(ind <= 2){
                    			$("#allListSo").hide();
                    		}
                    		
	                        Query.setHash({
	                            "teCode": ""
	                        });
	                        $(".listTwo").remove();
                    	}
                    	
                    } else {
                    	$("#allListSo").show();
                        Query.setHash({
                            "teCode": teCode
                        });
                        $(".listTwo").remove();
                        $("#allListSo").find("ul").prepend("<li class='listTwo' name =" + teCode + ">" + typeText + "<span class='soListClose'></span></li>");
                    }

                }

                var _url = "";
                var keyword = $("#comKeyWord").val();
                _url = $.kf.GETSECOMPANYNOTICE+"?type="+seCode+"&process="+teCode+"&company="+ceCode+"&keyword="+keyword;
                new GetTable(_url, $("#pageTool"), "", getList, "get", $("#tableOne")).init();
                removeThing();
            }
        });
        /***分类标准***/
       	$("#menu1 a").on("click",function(){
       		var thisTxt = $(this).text();
       		var teCode = '';
       		var ceCode = '';
       		if(thisTxt == "业务标准"){
       			$("#notesLi").show();
       			$("#tradingAnou").hide();
       			$("#notesLi").find("li").eq(0).addClass("hang-active");
        		$("#notesLi").find("li").eq(0).siblings().removeClass("hang-active");
       		}else{
       			$("#notesLi").hide();
       			$("#tradingAnou").show();
       			$("#tradingAnou").find("li").eq(0).addClass("hang-active");
        		$("#tradingAnou").find("li").eq(0).siblings().removeClass("hang-active");
       		}
       		if($(".listOne").length){
       			$(".listOne").remove();
       			Query.setHash({
                    seCode: ""
                });
   			if($(".listTwo").length||$(".listThree").length){
   				if($(".listTwo").length){
					teCode = $(".listTwo").attr("name")
   				}else if($(".listThree").length){
   					ceCode = $(".listThree").attr("name")
   				}
   			}else{
   				$(".allListSo").hide();
   				}
       		}
            var keyword = $("#comKeyWord").val();
            _url = $.kf.GETSECOMPANYNOTICE+"?type="+seCode+"&process="+teCode+"&company="+ceCode+"&keyword="+keyword;
       	})
    }

    /*拼table表格*/
    var getList = function (data) {
        var list = data.data;
        var tr = "";
        $("#tableOne").html("");
        $(list).each(function (i) {
            tr += "<tr>";
            tr += "<td><a class='toPop2' href='javascript:void(0);' name="+ list[i].id+" data-type="+list[i].type+">" + list[i].title + "</a></td>";
            tr += "<td>" + list[i].company_name + "</td>";
			tr += "<td>" + list[i].typeName + "</td>";
            tr += "<td>" + list[i].status + "</td>";
            tr += "<td>" + list[i].sign + "</td>";
            tr += "<td>" + list[i].createdAt + "</td>";
            tr += "<td>" + list[i].updatedAt + "</td>";
            tr += "</tr>";
        });
        $("#tableOne").append(tr);
        //标记显示和点击事件
        $("#tableOne").find("tr td:nth-child(4)").each(function(){
        	if($(this).text() == "审核通过"){
        		var thisSign = $(this).next();
	        	thisSign.addClass("signActive");
	        	thisSign.on("click",function(){
	        		thisId = $(this).parent().find(".toPop2").attr("name");
		        	//thisType = $(this).attr("data-type");
		        	var param = {
						"id":thisId
					}
        			$.kf.ajax({
			            type: "post",
			            url: $.kf.DISCLOSURE,
			            data: param,
			            dataType: "json",
			            processResponse: function (data) {
			               
			            }
			        });
        			//初始化列表
        			initTable();
        		});
       	 	};
        });
       	
      	 //查看或者修改公告
         $(".toPop2").on("click",function(){
         	$(".sup-top").find("input").hide();
        	$(".sup-mask").show();
        	$(".sup-pop02").show();
        	$("body").css("overflow","hidden");
        	var thisStatus = $(this).parents("tr").find("td").eq(3).text();
        	$(".supStatus").text(thisStatus);
        	thisId = $(this).attr("name");
        	thisType = $(this).attr("data-type");
        	var _url = $.kf.GETLEFTTEMPLATE+"?id="+thisId+"&type="+thisType;
        	$.kf.ajax({
	            type: "get",
	            url: _url,
	            data: "",
	            dataType: "json",
	            processResponse: function (data) {
	            	$(".sup-table01").html(data.data);
	            	$(".input-group-btn").attr("disabled","disabled");
	            	var leftTaraLen = $(".sup-left tr").length;
					for(var i=1; i<leftTaraLen; i++){
						if(i<10){
							$(".textarea0" + i).attr("disabled",true)
						}else{
							$(".textarea" + i).attr("disabled",true)
						}
					}
	            	getLeftTable(data);
	            	$(".date-picker").datepicker({
	                    format: "yyyy-mm-dd",
	                    autoclose: true,
	                    minView: "month",
	                    maxView: "decade",
	                    todayBtn: "linked",
	                    language: 'zh-CN',
	                    todayHighlight: true,
	                    pickerPosition: "bottom-left"
               		});	
					$(".haveBoder").hide();
					$(".sup-list-con-left").find("colgroup").find("col").eq(1).hide();
					if(thisStatus == "审核中"){
		         		$(".sup-top").find("input").show();
		         		$(".sup-pop").find(".sup-table").find("colgroup").find("col").eq(3).show();
		         		$(".sup-table").find(".haveBoder").show();
		         	}else{
						$(".sup-table").find(".haveBoder").hide();
		         	}
	            }
	        });
	        
	        var _url1 = $.kf.GETRIGHTTEMPLATE+"?id="+thisId+"&type="+thisType;
        	$.kf.ajax({
	            type: "get",
	            url: _url1,
	            data: "",
	            dataType: "json",
	            processResponse: function (data) {
	            	$(".sup-list-con-left").html(data.data);
	            	$(".input-group-btn").attr("disabled","disabled");
	            	var leftTaraLen = $(".sup-left tr").length;
					for(var i=1; i<leftTaraLen; i++){
						if(i<10){
							$(".textarea0" + i).attr("disabled",true)
						}else{
							$(".textarea" + i).attr("disabled",true)
						}
					}
	            	getRightTable(data);
	            	$(".date-picker").datepicker({
	                    format: "yyyy-mm-dd",
	                    autoclose: true,
	                    minView: "month",
	                    maxView: "decade",
	                    todayBtn: "linked",
	                    language: 'zh-CN',
	                    todayHighlight: true,
	                    pickerPosition: "bottom-left"
               		});	
					$(".haveBoder").hide();
					$(".sup-list-con-left").find("colgroup").find("col").eq(1).hide();
					//$(".sup-pop").find(".haveBoder").find("textarea").attr("disabled","disabled");
					if(thisStatus == "审核中"){
		         		$(".sup-top").find("input").show();
		         		$(".sup-pop").find(".sup-table").find("colgroup").find("col").eq(3).show();
		         		$(".sup-table").find(".haveBoder").show();
		         	}else{
		         		$(".sup-top").find("input").hide();
						$(".sup-table").find(".haveBoder").hide();
						$(".sup-list-con-left").find("colgroup").find("col").eq(1).hide();
		         	}
	            }
	        });
	        
        	
			$(".toolTable").siblings().removeClass("active");
			$(".toolTable").addClass("active");
			$(".toolTable").on('click',function(){
				$(this).parents(".sup-pop").find(".haveBoder").hide();
				$(this).parents(".sup-pop").find(".sup-list-con-left").find("colgroup").find("col").eq(1).hide();
				$(this).parents(".sup-pop").find(".sup-table").find(".haveBoder").show();
				$(this).parents(".sup-pop").find(".sup-table").find("colgroup").find("col").eq(3).show();
				$(this).siblings().removeClass("active");
				$(this).addClass("active");
			});
			$(".toolText").on('click',function(){
				$(this).parents(".sup-pop").find(".haveBoder").hide();
				$(this).parents(".sup-pop").find(".sup-table").find("colgroup").find("col").eq(3).hide();
				$(this).parents(".sup-pop").find(".sup-list-con-left").find(".haveBoder").show();
				$(this).parents(".sup-pop").find(".sup-list-con-left").find("colgroup").find("col").eq(1).show();
				$(this).siblings().removeClass("active");
				$(this).addClass("active");
			});
			areaAutoHeight();
			noticeStatus();//公告状态。返回，通过 保存
        });
        //导出pdf文件
       	$(".sup-pdf").unbind().on("click",function(){
       		var status = $(this).parent().prev().prev().text();
   			if(status == "审核中"){
   				alert("确定保存草稿并导出pdf文档？","温馨提示","sureBinding");
   				$("#sureBinding").on("click",function(){
	        		//保存草稿
	        		sendNotice(1);
	        		//导出pdf
	        		window.open($.kf.SUPBBSERVICE+"?id="+thisId+"&type="+thisType);
	    		})
   			}else{
   				alert("确定导出pdf文档？","温馨提示","sureBinding");
   				$("#sureBinding").on("click",function(){
	        		//导出pdf
	        		window.open($.kf.SUPBBSERVICE+"?id="+thisId+"&type="+thisType);
	    		})
   			}
       	});
       	//导出Xbrl文件
       	$(".sup-xbrl").unbind().on("click",function(){
       		var status = $(this).parent().prev().prev().text();
   			if(status == "审核中"){
   				alert("确定保存草稿并导出xbrl文档？","温馨提示","sureBinding");
   				$("#sureBinding").on("click",function(){
	        		//保存草稿
	        		sendNotice(1);
	        		//导出xbrl
	        		window.open($.kf.SUPXBRL+"?id="+thisId+"&type="+thisType);
	    		})
   			}else{
   				alert("确定导出xbrl文档？","温馨提示","sureBinding");
   				$("#sureBinding").on("click",function(){
	        		//导出xbrl
	        		window.open($.kf.SUPXBRL+"?id="+thisId+"&type="+thisType);
	    		})
   			}
       	});
       	//导出word文件
       	$(".sup-word").unbind().on("click",function(){
       		var status = $(this).parent().prev().prev().text();
   			if(status == "审核中"){
   				alert("确定保存草稿并导出word文档？","温馨提示","sureBinding");
   				$("#sureBinding").on("click",function(){
	        		//保存草稿
	        		sendNotice(1);
	        		//导出word
	        		window.open($.kf.SUPWORD+"?id="+thisId+"&type="+thisType);
	    		})
   			}else{
   				alert("确定导出word文档？","温馨提示","sureBinding");
   				$("#sureBinding").on("click",function(){
	        		//导出word
	        		window.open($.kf.SUPWORD+"?id="+thisId+"&type="+thisType);
	    		})
   			}
       	});
       	
        $(".sup-close").on("click",function(){
        	$(".sup-mask").hide();
        	$(".sup-pop").hide();
        	$("body").css("overflow","auto");
        });
        
        textFoucus();
        
    };
    
    var getLeftTable = function(data){
    	//textarea高度自适应
		$('textarea').each(function () {
			if($(this).val() == ""){
				this.setAttribute('style', 'height:60px;overflow-y:hidden;width:100%;');
			}else{
				//this.setAttribute('style', 'height:' + (this.scrollHeight) + 'px;overflow-y:hidden;width:100%;');
				this.setAttribute('style', 'height:60px;overflow-y:hidden;width:100%;');
			}
		}).on('input', function () {
		  	this.style.height = 'auto';
		  	this.style.height = (this.scrollHeight) + 'px';
		  	areaAutoHeight();
		});
		areaAutoHeight();
		noticeStatus();//公告状态。返回，通过 保存
		textFoucus();
    };
    var getRightTable = function(data){
    	$(".sup-taw").html(data);
    	//textarea高度自适应
		$('textarea').each(function () {
			if($(this).val() == ""){
				this.setAttribute('style', 'height:40px;overflow-y:hidden;width:100%;');
			}else{
				//this.setAttribute('style', 'height:' + (this.scrollHeight) + 'px;overflow-y:hidden;width:100%;');
				this.setAttribute('style', 'height:50px;overflow-y:hidden;width:100%;');
			}
		}).on('input', function () {
		  	this.style.height = 'auto';
		  	this.style.height = (this.scrollHeight) + 'px';
		  	areaAutoHeight();
		});
		$(".haveBoder").hide();
		$(".sup-table").find(".haveBoder").hide();
		$(".sup-list-con-left").find("colgroup").find("col").eq(1).hide();
		areaAutoHeight();
		noticeStatus();//公告状态。返回，通过 保存
		textFoucus();
    };
    var textFoucus = function(){
    	 //textarea  focus
        $(".sup-center textarea, .sup-center input").each(function(){
        	$(this).on("focus",function(){
	        	if($(this).parents(".sup-left").length){
	        		$(this).parents(".sup-left").find(".sup-radius").removeClass("active");
	        		$(this).parents("td").siblings().find(".sup-radius").addClass("active");       	
	        		var _text = $(this).parents("td").siblings().find(".sup-radius").text();
	        		$(".sup-right").find(".textRadius").each(function(){
	        			if($(this).text() == _text){
	        				$(this).css("display","inline-block");
	        			}else{
	        				$(this).css("display","none");
	        			}
	        		});
	        	}else{
	        		$(this).parents(".sup-right").find(".textRadius").css("display","none");
	        		if($(this).hasClass("date-ipt")){
	        			console.log(2);
	        			$(this).parent().parent().find(".textRadius").css("display","inline-block");
	        			var _text = $(this).parent().parent().find(".textRadius").text();
	        		}else{
	        			$(this).parent().find(".textRadius").css("display","inline-block");
	        			var _text = $(this).parent().find(".textRadius").text();
	        		}
	        		
	        		$(".sup-left").find(".sup-radius").each(function(){
	        			if($(this).text() == _text){
	        				$(this).addClass("active");
	        			}else{
	        				$(this).removeClass("active");
	        			}
	        		});
	        	}
	        });
        });
        //统一对应输入框的text
         $(".sup-center textarea, .sup-center input").each(function(){
        	$(this).on("blur",function(){
        		var that = this;
        		var currentClass = $(this).attr("class");
        		if($(this).hasClass("date-ipt")){
        			setTimeout(function () {
				        var currentText = $(that).val();
        				var textCurrentclass = currentClass.substring(currentClass.length-10);
        				$("."+textCurrentclass).val(currentText);
				    }, 1000);
        		}else{
        			var currentText = $(this).val();
        			$("."+currentClass).val(currentText);
        		}
        	});
        });
    };
    
    var noticeStatus = function(){
    	//审批公告驳回
    	$(".noticeRefuse").unbind().on("click",function(){
    		sendNotice(0);
    	});
    	//审批公告通过
    	$(".noticePass").unbind().on("click",function(){
    		sendNotice(2);
    	});
    	//审批公告保存草稿
    	$(".noticeSave").unbind().on("click",function(){
    		sendNotice(1);
    	});
    };
    //公告内容上送
    var sendNotice = function(status){
		if(thisType == "kongzi"){
			var sum = ["number","company_code","secompany_summary","secompany_name","company_name","announcement_name",
			"authenticity_part","authenticity","investment_cooperation","subsidiary_holding","registered_area","currency","money",
			"investment_currency","investment_money","capital_ratio","investment_proportion","connected_transaction","consideration",
			"examination","field","new_field","counterparty_name","adversary_name","registered_address","official_address","legal_name",
			"opponent_currency","opponent_money","business_license","main_business","legal_description","opponent_name","opponent_sex",
			"opponent_nationality","opponent_address","natural_description","investment_method","investment_description","limited_company",
			"investment_subject","address_subject","business_scope","shareholder_name","currency_add","money_add","investment_add",
			"purpose_investment","investment_risk","investment_influence","other_contents","reference_documents_notes","data"];
		};
		if(thisType == "huiyi"){
			var sum = ["number","company_code","company_shortname","secompany_name","company_name","announcement_name",
			"authenticity_part","authenticity","meeting_time","meeting_address","meeting_mode","meeting_people","meeting_host",
			"situation","the_number","stock_number","stock_sum","adopt","motion_name","motion_content","agreed","agreed_proportion","against",
			"against_proportion","give_up","give_up_proportion","avoid_voting","law_firm_name","lawyers_name","opinion","reference_documents","announcement_date"]
		};
		var arr = [];
		$(".sup-left tr:gt(0) td:nth-child(4)").find("textarea").each(function(i){
			arr.push({'key':sum[i],'value':$(this).val(),'value2':''});
		});
		$(".sup-right .textPar").find("textarea").each(function(i){
			arr[i].value2 = $(this).val();
		});
		var arrObj = {
			"notice":arr
		};
		var arrStr = JSON.stringify(arrObj);
		var param = {
			"type":thisType,
			"id":thisId,
			"status":status,
			"notice":arrStr
		};
		$.kf.ajax({
            type: "post",
            url:$.kf.ADDLEFTCOMMENT,
            data: param,
            dataType: "json",
            processResponse: function(data){
            	$("#fixLeftTable").empty().html("");
            	$(".sup-mask").hide();
	        	$(".sup-pop").hide();
	        	$("body").css("overflow","auto");
	        	initTable();
            }
        });
	}
    var areaAutoHeight = function (){
		var leftHeight = $(".sup-left").height();
		$(".sup-right").height(leftHeight+20);
		$(".sup-txt-con").height(leftHeight);
		$('.sup-txt-list').slimScroll({
			size: '5px', //组件宽度
		    color: '#f4ad8f',
		    opacity: .9, //滚动条透明度
		    size: '10px',
		    alwaysVisible: true,
		    disableFadeOut: true,
		    railVisible: true, //是否 显示轨道
            railColor: '#dfdfdf', //轨道颜色
		    allowPageScroll:true
		});
		$(".sup-list-box").height($(".sup-list-con").height());
		$(".sup-table-box").height($(".sup-table table").height());
	};
    var removeThing = function () {
        //点击关闭按钮
        $(".soListClose").unbind("click").on("click", function () {
            var flg = $(this).index();
            $("#tableOne").html("");
            if ($(this).parents(".allListSo").find("li").length == 2) {
                $(this).parents(".allListSo").hide();
            }
            $(this).parent().remove();
            //查询条件清楚地址栏参数
            if ($(this).parent().hasClass("listOne")) {
                $(".sameTab").find("li").each(function () {
                    if ($(this).text() == "全部") {
                        $(this).addClass("hang-active");
                        $(this).siblings().removeClass("hang-active");
                    }
                });
                Query.setHash({
                    seCode: ""
                });
            }
            if ($(this).parent().hasClass("listTwo")) {
                $("#compJs").find("li").each(function () {
                    if ($(this).text() == "全部") {
                        $(this).addClass("hang-active");
                        $(this).siblings().removeClass("hang-active");
                    }
                });
                Query.setHash({
                    teCode: ""
                });
            }
            if ($(this).parent().hasClass("listThree")) {
                $("#compJs").find("li").each(function () {
                    if ($(this).text() == "全部") {
                        $(this).addClass("hang-active");
                        $(this).siblings().removeClass("hang-active");
                    }
                });
                Query.setHash({
                    ceCode: ""
                });
            }
            var _url = "";
            var type = "";
            var process = "";
            var company = "";
            if ($(".listOne").size()) {
                type = $(".listOne").attr("name");
            } else if ($("#notesLi").find(".hang-active").text() == "全部") {
                type = "";
            } else {
                type = $("#notesLi").find(".hang-active").attr("name");
            }
            if ($(".listTwo").size()) {
                process = $(".listTwo").attr("name");
            } else if ($("#compYg").find(".hang-active").text() == "全部") {
                process = "";
            } else {
                process = $("#compYg").find(".hang-active").attr("name");
            }
            if ($(".listThree").size()) {
                company = $(".listThree").attr("name");
            } else if ($("#compJs").find(".hang-active").text() == "全部") {
                company = "";
            } else {
                company = $("#compJs").find(".hang-active").attr("name");
            }
            var keyword = $("#comKeyWord").val();
            _url = $.kf.GETSECOMPANYNOTICE+"?type="+type+"&company="+company+"&process="+process+"&keyword="+keyword;
            new GetTable(_url, $("#pageTool"), "", getList, "get", $("#tableOne")).init();
        });
    };

    var dateSearch = function () {
        /*日历搜索按钮*/
        $("#compBtn").on("click", function () {
            var _url = "";
            var process = '';
			var type = '';
            var company = '';
            var keyword = $("#comKeyWord").val();
            if ($(".listOne").size()) {
                type = $(".listOne").attr("name");
            } else if ($("#notesLi").find(".hang-active").text() == "全部") {
                type = "";
            } else {
                type = $("#notesLi").find(".hang-active").attr("name");
            }
            if ($(".listTwo").size()) {
                process = $(".listTwo").attr("name");
            } else if ($("#compYg").find(".hang-active").text() == "全部") {
                process = "";
            } else {
                process = $("#compYg").find(".hang-active").attr("name");
            }
            if ($(".listThree").size()) {
                company = $(".listThree").attr("name");
            } else if ($("#compJs").find(".hang-active").text() == "全部") {
                company = "";
            } else {
                company = $("#compJs").find(".hang-active").attr("name");
            }
            $("#tableOne").html("");
            _url = $.kf.GETSECOMPANYNOTICE+"?type="+type+"&company="+company+"&process="+process+"&keyword="+keyword;
            new GetTable(_url, $("#pageTool"), "", getList, "get", $("#tableOne")).init();

        });
        //重置
        $("#compReset").on("click", function () {
        	$(this).parents(".page-content-par").find("input").val("");
            initTable();
        });
        $("#comKeyWord").on("keydown", function (e) {
            var keyCode = e.which;
            if (keyCode == 13) {
                $("#compBtn").click();
            }

        });
    };

    var getUrlParam = function () {
        var atxt = "";
        var btxt = '';
        var ctxt = '';
        var aCode = Query.getHash("seCode");
		var bCode = Query.getHash("teCode");
		var cCode = Query.getHash("ceCode");
        $(".sameTab").find("li").each(function (i) {
            if (!isNullOrEmpty(aCode)) {
                if ($(this).attr("name") != aCode) {
                    $(this).removeClass("hang-active");
                    $(this).nextAll("li").removeClass("hang-active");
                    $("#compPop").find("li").each(function () {
                        if ($(this).attr("name") == aCode) {
                            atxt = $(this).text();
                            //console.log(aTex);
                        }
                    });
                } else {
                    $(this).addClass("hang-active");
                    $(this).siblings("li").removeClass("hang-active");
                    atxt = $(this).text();
                }
            }

        });
        $("#compYg").find("li").each(function (i) {
            if (!isNullOrEmpty(bCode)) {
                if ($(this).attr("name") != bCode) {
                    $(this).removeClass("hang-active");
                    $(this).nextAll("li").removeClass("hang-active");
                } else {
                    $(this).addClass("hang-active");
                    $(this).siblings("li").removeClass("hang-active");
                    btxt = $(this).text();
                }
            }

        });
        $("#compJs").find("li").each(function (i) {
            if (!isNullOrEmpty(cCode)) {
                if ($(this).attr("name") != cCode) {
                    $(this).removeClass("hang-active");
                    $(this).nextAll("li").removeClass("hang-active");
                } else {
                    $(this).addClass("hang-active");
                    $(this).siblings("li").removeClass("hang-active");
                    btxt = $(this).text();
                }
            }
        });


        if (isNullOrEmpty(aCode) && isNullOrEmpty(bCode)) {
            $("#allListSo").hide();
        }
        if (!isNullOrEmpty(aCode)) {
            $("#allListSo").show();
            $(".listOne").remove();
            $("#allListSo").find("ul").prepend("<li class='listOne' name=" + aCode + ">" + atxt + "<span class='soListClose'></span></li>");
        }
        if (!isNullOrEmpty(bCode)) {
            $("#allListSo").show();
            $(".listTwo").remove();
            $("#allListSo").find("ul").prepend("<li class='listTwo' name=" + bCode + ">" + btxt + "<span class='soListClose'></span></li>");
        }
        if (!isNullOrEmpty(cCode)) {
            $("#allListSo").show();
            $(".listTwo").remove();
            $("#allListSo").find("ul").prepend("<li class='listThree' name=" + cCode + ">" + ctxt + "<span class='soListClose'></span></li>");
        }
        //清空选项
        $("#soClear").on("click", function () {
        	Query.setHash({
                teCode: ""
            });
            Query.setHash({
                seCode: ""
            });
            Query.setHash({
                ceCode: ""
            });
            $(this).parent("li").siblings().remove();
            $(this).parents("#allListSo").hide();
            $("#comSpecial").find("li").eq(0).addClass("hang-active").siblings().removeClass("hang-active");
            $("#tradingAnou").find("li").eq(0).addClass("hang-active").siblings().removeClass("hang-active");
            $("#compYg").find("li").eq(0).addClass("hang-active").siblings().removeClass("hang-active");
             $("#compJs").find("li").eq(0).addClass("hang-active").siblings().removeClass("hang-active");
            $("#tableOne").html("");
            var teCode = "";
            var seCode = "";
            var ceCode = "";
            var keyword = $("#comKeyWord").val();
            _url = $.kf.GETSECOMPANYNOTICE+"?type="+teCode+"&process="+seCode+"&company="+ceCode+"&keyword="+keyword;
            new GetTable(_url, $("#pageTool"), "", getList, "get", $("#tableOne")).init();
        });
        //初始化列表
        initTable();

        //清空选项
        removeThing();
    };

    //初始化表格
    var initTable = function () {
        var _url = "";
        var type = '';
        var company = "";
        var process = "";
        var keyword = $("#comKeyWord").val();

        if ($(".listOne").size()) {
            type = $(".listOne").attr("name");
        } else if ($("#notesLi").find(".hang-active").text() == "全部") {
            type = "";
        } else {
            type = $("#notesLi").find(".hang-active").attr("name");
        }
        
        
        if ($(".listTwo").size()) {
            process = $(".listTwo").attr("name");
        } else if ($("#compYg").find(".hang-active").text() == "全部") {
            process = "";
        } else {
            process = $("#compYg").find(".hang-active").attr("name");
        }
        
        if ($(".listThree").size()) {
            company = $(".listThree").attr("name");
        } else if ($("#compJs").find(".hang-active").text() == "全部") {
            company = "";
        } else {
            company = $("#compJs").find(".hang-active").attr("name");
        }

        _url = $.kf.GETSECOMPANYNOTICE+"?type="+type+"&process="+process+"&company="+company+"&keyword="+keyword;
        new GetTable(_url, $("#pageTool"), "", getList, "get", $("#tableOne")).init();
		
    };


    //公告类型
    var specialWord = function () {
        $.kf.ajax({
            type: "get",
            url: $.kf.GETNOTICECATEGORY,
            data: "",
            dataType: "json",
            processResponse: function(data){
            	typeFun(data);
            	getUrlParam();
            }
        });
    };
    //公告分类列表
	var typeFun = function(data){
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
        for(var i=0; i<data.length; i++){
        	if(data[i].child != ""){
        		for(var j=0; j<data[i].child.length; j++){
        			tr += "<li name='" + data[i].child[j].id + "'title='" + data[i].child[j].name + "'>" + data[i].child[j].name + "</li>";
        		}
        	}
        }
        
        //是否显示更多按钮
        $("#comSpecial").append('<li id = "trPop"  class="hang-more" data-toggle="modal" data-target="#myModal02">更多>></li>');
        $("#compPop").find("ul").empty("").html("");
        $("#compPop").find("ul").append(tr);
        $("#compPop").find("li").each(function(){
       		if($(this).text() == "全部"){
       			$(this).remove();
       		}
        });
        $(".province-ul").find("ul").append(trPop);
        $(".province-ul").find("ul").append('<li class="provinceLi">全部</li>')

		//类型切换
        $(".province-ul ul li").on("click",function(){
        	$("#compPop").find("ul").empty("").html("");
        	$(this).addClass("provinceLi");
            $(this).siblings().removeClass("provinceLi");
        	var typeTxt = $(this).text();
        	if(typeTxt == "全部"){
        		//全部子级
	            for(var i=0; i<data.length; i++){
	            	if(data[i].child != ""){
	            		for(var j=0; j<data[i].child.length; j++){
	            			tr += "<li name='" + data[i].child[j].id + "'title='" + data[i].child[j].name + "'>" + data[i].child[j].name + "</li>";
	            		}
	            	}
	            }
	            $("#compPop").find("ul").append(tr);
	            $("#compPop").find("li").each(function(){
		       		if($(this).text() == "全部"){
		       			$(this).remove();
		       		}
		        });
	            //弹窗选择事件
        		comPopSpecial();
        	}else{
        		var tc="";
		        $.kf.ajax({
		            type: "get",
		            url: $.kf.GETNOTICECATEGORY,
		            data: "",
		            dataType: "json",
		            processResponse: function(data){
		            	var data = data.data;
		            	$("#compPop").find("ul").empty("").html("");
		            	for(var i=0; i<data.length; i++){
		            		if(data[i].name == typeTxt){
		            			for(var j=0; j<data[i].child.length; j++){
		            				tc += "<li name='" + data[i].child[j].id + "'title='" + data[i].child[j].name + "'>" + data[i].child[j].name + "</li>";
		            			}
		            			
	          					$("#compPop").find("ul").append(tc);
	          					//弹窗选择事件
        						
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
        var process = "";
        var company = "";
        $("#myModal02").find("li").on("click", function () {
            _text = $(this).text();
            seCode = $(this).attr("name");
            $(this).addClass("provinceLi");
            $(this).siblings().removeClass("provinceLi");
            $("#compPopspecailSave").removeClass("default").addClass("btn-primary");
        });
        $("#compPopspecailSave").unbind().on("click", function () {
            if (_text != "") {
                $('#myModal02').modal('hide');
                $("#comSpecial").find("li").removeClass("hang-active");
                var type = seCode;
                var keyword = $("#comKeyWord").val();
                $("#allListSo").show();
                Query.setHash({
                    "seCode": seCode
                });
                $(".listOne").remove();
                $("#allListSo").find("ul").prepend("<li class='listOne' name =" + seCode + ">" + _text + "<span class='soListClose'></span></li>");
               	$("#comSpecial").find("li").each(function(){
               		if($(this).text() == _text){
               			$(this).addClass('hang-active');
               			$(this).siblings().removeClass("hang-active");
               		}
               	});
               	
               	if ($(".listTwo").size()) {
               		 process = $(".listTwo").attr("name");
       			 } else if ($("#compYg").find(".hang-active").text() == "全部") {
              		 process = "";
            	} else {
               		 process = $("#compYg").find(".hang-active").attr("name");
           		 }
	            if ($(".listThree").size()) {
	                company = $(".listThree").attr("name");
	            } else if ($("#compJs").find(".hang-active").text() == "全部") {
	                company = "";
	            } else {
	                company = $("#compJs").find(".hang-active").attr("name");
	            }
	               var _url = $.kf.GETSECOMPANYNOTICE+"?type="+type+"&process="+process+"&company="+company+"&keyword="+keyword;
	    			new GetTable(_url, $("#pageTool"), "", getList, "get", $("#tableOne")).init();
	            }
            removeThing();
        })
    };
	//公司列表
	var companyLi = function () {
        $.ajax({
            type: "get",
            url: $.kf.GETSECOMPANYENTERPRISES,
            data: "",
            dataType: "json",
            success: function (data) {
                companyFun(data);
            }
        });
    };
    //公司列表类型
    var companyFun = function (data) {
        var data = data.data;
        var tr = "";
        var trPop = "";
        var m = 0;
        $(data).each(function (i) {
            m++;
            if (i < 5) {
                tr += "<li name =" + data[i].id + ">" + data[i].shortname + "</li>";
            } else {
                trPop += "<li name =" + data[i].id + " title=' " + data[i].shortname + " '>" + data[i].shortname + "</li>";
            }
        });
        $("#companyLi").append(tr);
        //是否显示更多按钮
        if (m > 5) {
            $("#companyLi").append('<li id = "trPop2"  class="hang-more" data-toggle="modal" data-target="#myModal03">更多>></li>');
        }
        $("#compPop2").find("ul").empty("").html("");
        $("#compPop2").find("ul").append(trPop);
        $("#compPop2").find("ul").append("<li name ='0'>其他</li>");
        popLetter();
        //弹窗选择事件
        companySpecial();
        //选项点击事件
        listComClick();
    };
	//弹窗保存
    var companySpecial = function () {
        var _text = "";
        $("#myModal03").find("li").on("click", function () {
            _text = $(this).text();
            ceCode = $(this).attr("name");
            $(this).addClass("provinceLi");
            $(this).siblings().removeClass("provinceLi");
            $("#compPopspecailSave2").removeClass("default").addClass("btn-primary");
        });
        $("#compPopspecailSave2").unbind().on("click", function () {
            if (_text != "") {
                $('#myModal03').modal('hide');
                $("#companyLi").find("li").removeClass("hang-active");
                var company = ceCode;
                $("#allListSo").show();
                Query.setHash({
                    "ceCode": ceCode
                });
                $(".listThree").remove();
                $("#allListSo").find("ul").prepend("<li class='listThree' name =" + ceCode + ">" + _text + "<span class='soListClose'></span></li>");
               	$("#companyLi").find("li").each(function(){
               		if($(this).text() == _text){
               			$(this).addClass('hang-active');
               			$(this).siblings().removeClass("hang-active");
               		}
               	});
               	
               	if ($(".listOne").size()) {
                	type = $(".listOne").attr("name");
	            } else if ($("#notesLi").find(".hang-active").text() == "全部") {
	                type = "";
	            } else {
	                type = $("#notesLi").find(".hang-active").attr("name");
	            }
	            if ($(".listTwo").size()) {
	                process = $(".listTwo").attr("name");
	            } else if ($("#compYg").find(".hang-active").text() == "全部") {
	                process = "";
	            } else {
	                process = $("#compYg").find(".hang-active").attr("name");
	            }
	            var keyword = $("#comKeyWord").val();
               	var _url = $.kf.GETSECOMPANYNOTICE+"?type="+type+"&process="+process+"&company="+company+"&keyword="+keyword;
    			new GetTable(_url, $("#pageTool"), "", getList, "get", $("#tableOne")).init();
            }
            removeThing();
        })
    };
    
    

    return {
        init: function () {
            dateSearch();//关键字
            specialWord();//加载公告分类
            companyLi();//加载公司列表
            listComClick();
        }
    }

}();

