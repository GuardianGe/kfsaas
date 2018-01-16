/*
 * 
 * 
 企业-------公告管理  
 * 
 * 
 * */
var Sup = function () {
	//公告ID
	var thisId;
	//公告类型
	var thisType;
    //选项点击事件
    var listComClick = function () {
        var securities = "";
        var industry = "";
        var province = "";
        var teCode = '';
        var typeText = '';
        var seCode = '';
        $(".allList").find("li").unbind("click").on("click", function (event) {
            event.preventDefault();
            var ind = $("#soCheck").find("li").length;
            if (!$(this).hasClass("hang-more")) {
                $("#tableOne").html("");
                $(this).parent("ul").find("li").removeClass("hang-active");
                $(this).addClass("hang-active");
				seCode = Query.getHash("seCode");
				teCode = Query.getHash("teCode");
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
                var type = seCode;
                var keyword = $("#comKeyWord").val();
                var process = teCode;
                _url = $.kf.GETSUPERNOTICE+"?type="+type+"&process="+process+"&keyword="+keyword;
                new GetTable(_url, $("#pageTool"), "", getList, "get", $("#tableOne")).init();
                removeThing();
            }
        });
        /***分类标准***/
       	$("#menu1 a").on("click",function(){
       		var thisTxt = $(this).text();
       		var teCode = '';
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
       			if(!$(".listTwo").length){
       				$(".allListSo").hide();
       			}else{
       				teCode = $(".listTwo").attr("name")
       			}
       		}
       		var type = seCode;
            var keyword = $("#comKeyWord").val();
            var process = teCode;
            _url = $.kf.GETSUPERNOTICE+"?type="+type+"&process="+process+"&keyword="+keyword;
       	})
    }

    /*拼table表格*/
    var getList = function (data) {
        var list = data.data;
        var tr = "";
        $("#tableOne").html("");
        $(list).each(function (i) {
            tr += "<tr>";
            tr += "<td><a class='toPop3' name="+list[i].id+" data-type="+list[i].type+" href='javascript:void(0);'>" + list[i].title + "</a></td>";
			tr += "<td>" + list[i].noticeTypeName + "</td>";
            tr += "<td>" + list[i].status + "</td>";
            tr += "<td>" + list[i].createdAt + "</td>";
            tr += "<td>" + list[i].updatedAt + "</td>";
            tr += "<td>查看</td>";
            tr += "</tr>";
        });
        $("#tableOne").append(tr);
        //打开新建公告弹窗
        $(".toPop1").unbind().on("click",function(){
        	$(".sup-mask").show();
        	$(".sup-choose").show();
        });
        $(".toPopList").unbind().on("click",function(){
        	$(".sup-mask").show();
        	$(".sup-pop01").show();
        	$(".sup-choose").hide();
        	$(".sup-top").find("input").show();
        	thisType = $(this).attr("name");
          	$("body").css("overflow","hidden");
        	var _urlLeft = $.kf.GETLEFTTEMPLATE+"?type="+thisType;
        	$.kf.ajax({
	            type: "get",
	            url: _urlLeft,
	            data: "",
	            dataType: "json",
	            processResponse: function (data) {
	            	$("#creatLeftTable").html(data.data);
	            	$(".sup-left").css("marginBottom","230px")
	            	$(".haveBoder").hide();
					$(".sup-table").find(".haveBoder").hide();
					$(".sup-list-con-left").find("colgroup").find("col").eq(1).hide();
	            	getTextTable("sup-creat-height");
	            	$(".date-picker").datepicker({
	                    format: "yyyy-mm-dd",
	                    autoclose: true,
	                    minView: "month",
	                    maxView: "decade",
	                    todayBtn: "linked",
	                    language: 'zh-CN',
	                    todayHighlight: true,
	                    pickerPosition: "bottom-right"
               		});	
	            }
	        });
	        var _urlRight = $.kf.GETRIGHTTEMPLATE+"?type="+thisType;
	        $.kf.ajax({
	            type: "get",
	            url: _urlRight,
	            data: "",
	            dataType: "json",
	            processResponse: function (data) {
	            	$("#creatRightTable").html(data.data);
	            	$(".haveBoder").hide();
					$(".sup-table").find(".haveBoder").hide();
					$(".sup-list-con-left").find("colgroup").find("col").eq(1).hide();
	            	getTextTable("sup-creat-height");
	            	$(".date-picker").datepicker({
	                    format: "yyyy-mm-dd",
	                    autoclose: true,
	                    minView: "month",
	                    maxView: "decade",
	                    todayBtn: "linked",
	                    language: 'zh-CN',
	                    todayHighlight: true,
	                    pickerPosition: "bottom-right"
               		});	
	            }
	        });
        	
        });
        //其他公告弹窗
        $(".otherNotice").unbind().on("click",function(){
        	$(".sup-mask").show();
        	$(".sup-pop02").show();
        	$(".sup-choose").hide();
        	thisType = $(this).attr("name");
          	$("body").css("overflow","hidden");
        	var ue = UE.getEditor('editor', {
    			toolbars: [
		        ['source','undo', 'redo','bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'removeformat', 'formatmatch', 'pasteplain', '|', 'forecolor', 'insertorderedlist', 'insertunorderedlist', 'selectall', '|',
	            'rowspacingtop', 'rowspacingbottom', 'lineheight', '|','customstyle', 'paragraph', 'fontfamily', 'fontsize'],
	            ['directionalityltr', 'directionalityrtl', 'indent', '|','justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|', 'touppercase', 'tolowercase', '|',
	            'horizontal', 'date', 'time', 'spechars', 'inserttable', 'deletetable', 'insertparagraphbeforetable', 'insertrow', 'deleterow', 'insertcol', 'deletecol', 'mergecells', 'mergeright', 'mergedown', 'splittocells', 'splittorows', 'splittocols']
		   	 ],
			autoHeightEnabled: true,
   		 	autoFloatEnabled: true
		    });
        })
        
       //查看或者修改公告
         $(".toPop3").on("click",function(){
         	$(".sup-top").find("input").hide();
        	$(".sup-mask").show();
        	$(".sup-pop03").show();
        	var thisStatus = $(this).parents("tr").find("td").eq(2).text();
        	$(".supStatus").text(thisStatus);
        	thisId = $(this).attr("name");
        	thisType = $(this).attr("data-type");
        	$("body").css("overflow","hidden");
        	var _urlLeft = $.kf.GETLEFTTEMPLATE+"?id="+thisId+"&type="+thisType;
        	$.kf.ajax({
	            type: "get",
	            url: _urlLeft,
	            data: "",
	            dataType: "json",
	            processResponse: function (data) {
	            	$("#fixLeftTable").html(data.data);
					$(".haveBoder").hide();
					$(".sup-table").find(".haveBoder").hide();
					$(".sup-pop").find(".sup-table").find("colgroup").find("col").eq(3).hide();
					$(".sup-list-con-left").find("colgroup").find("col").eq(1).hide();
					$(".sup-pop").find(".haveBoder").find("textarea").attr("disabled","disabled");
	            	getTextTable("sup-fix-height");
	            	$(".date-picker").datepicker({
	                    format: "yyyy-mm-dd",
	                    autoclose: true,
	                    minView: "month",
	                    maxView: "decade",
	                    todayBtn: "linked",
	                    language: 'zh-CN',
	                    todayHighlight: true,
	                    pickerPosition: "bottom-right"
               		});	
               		if(thisStatus == "修改中"){
						$(".sup-top").find("input").show();
		         		$(".sup-pop").find(".sup-table").find("colgroup").find("col").eq(3).show();
		         		$(".sup-table").find(".haveBoder").show();
		         	}else if(thisStatus == "编写中"){
               			$(".sup-btn").find("input").show();
               		}else{
               			$(".input-group-btn").attr("disabled","disabled")
               			var leftTaraLen = $(".sup-left tr").length;
						for(var i=1; i<leftTaraLen; i++){
							if(i<10){
								$(".textarea0" + i).attr("disabled",true)
							}else{
								$(".textarea" + i).attr("disabled",true)
							}
						}
               		}
	            }
	        });
	        var _urlRight = $.kf.GETRIGHTTEMPLATE+"?id="+thisId+"&type="+thisType;
	        $.kf.ajax({
	            type: "get",
	            url: _urlRight,
	            data: "",
	            dataType: "json",
	            processResponse: function (data) {
	            	$("#fixRightTable").html(data.data);
					$(".haveBoder").hide();
	            	$(".sup-table").find(".haveBoder").hide();
					$(".sup-pop").find(".sup-table").find("colgroup").find("col").eq(3).hide();
					$(".sup-list-con-left").find("colgroup").find("col").eq(1).hide();
					$(".sup-pop").find(".haveBoder").find("textarea").attr("disabled","disabled");
	            	getTextTable("sup-list-con");
	            	$(".date-picker").datepicker({
	                    format: "yyyy-mm-dd",
	                    autoclose: true,
	                    minView: "month",
	                    maxView: "decade",
	                    todayBtn: "linked",
	                    language: 'zh-CN',
	                    todayHighlight: true,
	                    pickerPosition: "bottom-right"
               		});	
               		if(thisStatus == "修改中"){
						$(".sup-top").find("input").show();
		         		$(".sup-pop").find(".sup-table").find("colgroup").find("col").eq(3).show();
		         		$(".sup-table").find(".haveBoder").show();
		         	}else if(thisStatus == "编写中"){
               			$(".sup-btn").find("input").show();
               		}else{
               			$(".input-group-btn").find("button").attr("disabled","disabled")
               			var leftTaraLen = $(".sup-left tr").length;
						for(var i=1; i<leftTaraLen; i++){
							if(i<10){
								$(".textarea0" + i).attr("disabled",true)
							}else{
								$(".textarea" + i).attr("disabled",true)
							}
						}
               		}
	            }
	        });
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
        });
        //导出pdf文件
       	$(".sup-pdf").unbind().on("click",function(){
       		var status = $(this).parent().prev().prev().text();
       		if(status == "编写中"||status == "修改中"){
       			alert("确定保存草稿并导出pdf文档？","温馨提示","sureBinding");
       			$("#sureBinding").on("click",function(){
        		//保存草稿
        		sendNotice2(2);
        		//导出pdf
        		if(thisId){
        			window.open($.kf.SUPBBSERVICE+"?id="+thisId+"&type="+thisType);
        		}else{
        			window.open($.kf.SUPBBSERVICE+"?type="+thisType);
        		}
    			})
       		}else if(status == "公告编写"){
       			alert("确定保存草稿并导出pdf文档？","温馨提示","sureBinding");
       			$("#sureBinding").on("click",function(){
        		//保存草稿
        		sendNotice(1);
        		//导出pdf
        		if(thisId){
        			window.open($.kf.SUPBBSERVICE+"?id="+thisId+"&type="+thisType);
        		}else{
        			window.open($.kf.SUPBBSERVICE+"?type="+thisType);
        		}
    			})
       		}else{
       			alert("确定导出pdf文档？","温馨提示","sureBinding");
       			$("#sureBinding").on("click",function(){
        		//导出pdf
        		if(thisId){
        			window.open($.kf.SUPBBSERVICE+"?id="+thisId+"&type="+thisType);
        		}else{
        			window.open($.kf.SUPBBSERVICE+"?type="+thisType);
        		}
       		})
        	}
       	});
       	//导出Xbrl文件
       	$(".sup-xbrl").unbind().on("click",function(){
       		var status = $(this).parent().prev().prev().text();
       		if(status == "编写中"||status == "修改中"){
       			alert("确定保存草稿并导出xbrl文档？","温馨提示","sureBinding");
       			$("#sureBinding").on("click",function(){
        		//保存草稿
        		sendNotice2(2);
        		//导出xbrl
        		if(thisId){
        			window.open($.kf.SUPXBRL+"?id="+thisId+"&type="+thisType);
        		}else{
        			window.open($.kf.SUPXBRL+"?type="+thisType);
        		}
    			})
       		}else if(status == "公告编写"){
       			alert("确定保存草稿并导出xbrl文档？","温馨提示","sureBinding");
       			$("#sureBinding").on("click",function(){
        		//保存草稿
        		sendNotice(1);
        		//导出xbrl
        		if(thisId){
        			window.open($.kf.SUPXBRL+"?id="+thisId+"&type="+thisType);
        		}else{
        			window.open($.kf.SUPXBRL+"?type="+thisType);
        		}
    			})
       		}else{
       			alert("确定导出xbrl文档？","温馨提示","sureBinding");
       			$("#sureBinding").on("click",function(){
        		//导出xbrl
        		if(thisId){
        			window.open($.kf.SUPXBRL+"?id="+thisId+"&type="+thisType);
        		}else{
        			window.open($.kf.SUPXBRL+"?type="+thisType);
        		}
       		})
        	}
   		});
       	//导出word文件
       	$(".sup-word").unbind().on("click",function(){
       		var status = $(this).parent().prev().prev().text();
       		if(status == "编写中"||status == "修改中"){
       			alert("确定保存草稿并导出word文档？","温馨提示","sureBinding");
       			$("#sureBinding").on("click",function(){
        		//保存草稿
        		sendNotice2(2);
        		//导出word
        		if(thisId){
        			window.open($.kf.SUPWORD+"?id="+thisId+"&type="+thisType);
        		}else{
        			window.open($.kf.SUPWORD+"?type="+thisType);
        		}
    			})
       		}else if(status == "公告编写"){
       			alert("确定保存草稿并导出word文档？","温馨提示","sureBinding");
       			$("#sureBinding").on("click",function(){
        		//保存草稿
        		sendNotice(1);
        		//导出word
        		if(thisId){
        			window.open($.kf.SUPWORD+"?id="+thisId+"&type="+thisType);
        		}else{
        			window.open($.kf.SUPWORD+"?type="+thisType);
        		}
    			})
       		}else{
       			alert("确定导出word文档？","温馨提示","sureBinding");
       			$("#sureBinding").on("click",function(){
        		//导出word
        		if(thisId){
        			window.open($.kf.SUPWORD+"?id="+thisId+"&type="+thisType);
        		}else{
        			window.open($.kf.SUPWORD+"?type="+thisType);
        		}
       		})
        	}
       	});
        //关闭新建公告弹窗
        $(".sup-close").on("click",function(){
        	$(".sup-mask").hide();
        	$(".sup-pop").hide();
        	$("body").css("overflow","auto");
        	thisId = "";
        	$(".sup-table").html("");
        	$(".sup-list-con-left").html("");
        });
        
    };
    var getTextTable = function(classname){
    	//textarea高度自适应
		$('textarea').each(function () {
			if($(this).val() == ""){
				this.setAttribute('style', 'height:40px;overflow-y:hidden;width:100%;');
			}else{
				if($(this).attr("disabled") == "disabled"){
					this.setAttribute('style', 'height:50px;overflow-y:hidden;width:100%;');
				}else{
				this.setAttribute('style', 'height:' + (this.scrollHeight) + 'px;overflow-y:hidden;width:100%;');
				}
			}
		}).on('input', function () {
		  	this.style.height = 'auto';
		  	this.style.height = (this.scrollHeight) + 'px';
		  	areaAutoHeight(classname);
		});
		areaAutoHeight(classname);
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
         $(".sup-center textarea, .sup-center input,.sup-center select").each(function(){
        	$(this).on("keyup",function(){
        		var currentClass = $(this).attr("class");
        		var currentText = $(this).val();
        		$("."+currentClass).val(currentText);
        	});
        });
        $(".sup-center input").each(function(){
        	$(this).on("change",function(){
        		var that = this;
        		var currentClass = $(this).attr("class");
        		if($(this).hasClass("date-ipt")){
				        var currentText = $(that).val();
        				var textCurrentclass = currentClass.substring(currentClass.length-10);
        				$("."+textCurrentclass).val(currentText);
        		}else{
        			var currentText = $(this).val();
        			$("."+currentClass).val(currentText);
        		}
        	})
        });
        $(".sup-center select").each(function(){
        	$(this).on("change",function(){
        		var currentClass = $(this).attr("class");
        		var currentText = $(this).find("option:selected").text();
        		$("."+currentClass).val(currentText);
        	})
        })
    };
    
    var noticeStatus = function(){
    	//新建公告提交
    	$("#noticePass").unbind().on("click",function(){
    		sendNotice(0);
    	});
    	//新建保存草稿
    	$("#noticeSave").unbind().on("click",function(){
    		sendNotice(1);
    	});
    	
    	//修改公告提交
    	$("#fixPass").unbind().on("click",function(){
    		sendNotice2(0);
    	});
    	//修改保存草稿
    	$("#fixSave").unbind().on("click",function(){
    		sendNotice2(2);
    	});
    	
    	$(".noticeCancle").on("click",function(){
    		$("#fixLeftTable").empty().html("");
	        $("#fixRightTable").empty().html("");
	        $("#creatLeftTable").empty().html("");
	        $("#creatRightTable").empty().html("");
    		$(".sup-mask").hide();
        	$(".sup-pop").hide();
        	$("body").css("overflow","auto");
        	thisId = "";
    	});
    	
    };
    //新建公告公告上送
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
		}
		if(thisType == "huiyi"){
			var sum = ["number","company_code","company_shortname","secompany_name","company_name","announcement_name",
			"authenticity_part","authenticity","meeting_time","meeting_address","meeting_mode","meeting_people","meeting_host",
			"situation","the_number","stock_number","stock_sum","adopt","motion_name","motion_content","agreed","agreed_proportion","against",
			"against_proportion","give_up","give_up_proportion","avoid_voting","law_firm_name","lawyers_name","opinion","reference_documents","announcement_date"]
		}
		//获取textarea数据和相应字段的二维数组
		var arr = [];
		if(thisType == "qita"){
			ue.ready(function() {
			    arr = ue.getContent();
			});
		}else{
			//遍历输入框数据
		$("#sup-left01 tr:gt(0) td:nth-child(3)").each(function(i){
			var textArr = $(this).find("textarea");
			var iptArr = $(this).find(".date-ipt");
			var selArr = $(this).find("select");
			if(textArr.length){
				var _this = $(this).find("textarea").val();
				arr.push({'key':sum[i],'value':_this});
			}else if(iptArr.length){
				var _this = $(this).find("input").val();
				arr.push({'key':sum[i],'value':_this});
			}else if(selArr.length){
					var _this = $(this).find("select").find("option:selected").text();
				arr.push({'key':sum[i],'value':_this});
			};
		});
		}
		var arrObj = {
			"notice":arr
		};
		var arrStr = JSON.stringify(arrObj);
		var param = {
			"type":thisType,
			"status":status,
			"notice":arrStr
		}
		$.kf.ajax({
            type: "post",
            url:$.kf.COMPANYANNOUNCEMENT,
            data: param,
            dataType: "json",
            processResponse: function(data){
            	$("#creatLeftTable").empty().html("");
            	$("#creatRightTable").empty().html("");
            	$(".sup-mask").hide();
	        	$(".sup-pop").hide();
	        	$("body").css("overflow","auto");
	        	initTable();
            }
        });
    	
    }
    //修改公告公告上送
	var sendNotice2 = function(status){
		if(thisType == "kongzi"){
			var sum = ["number","company_code","secompany_summary","secompany_name","company_name","announcement_name",
			"authenticity_part","authenticity","investment_cooperation","subsidiary_holding","registered_area","currency","money",
			"investment_currency","investment_money","capital_ratio","investment_proportion","connected_transaction","consideration",
			"examination","field","new_field","counterparty_name","adversary_name","registered_address","official_address","legal_name",
			"opponent_currency","opponent_money","business_license","main_business","legal_description","opponent_name","opponent_sex",
			"opponent_nationality","opponent_address","natural_description","investment_method","investment_description","limited_company",
			"investment_subject","address_subject","business_scope","shareholder_name","currency_add","money_add","investment_add",
			"purpose_investment","investment_risk","investment_influence","other_contents","reference_documents_notes","data"];
		}
		if(thisType == "huiyi"){
			var sum = ["number","company_code","company_shortname","secompany_name","company_name","announcement_name",
			"authenticity_part","authenticity","meeting_time","meeting_address","meeting_mode","meeting_people","meeting_host",
			"situation","the_number","stock_number","stock_sum","adopt","motion_name","motion_content","agreed","agreed_proportion","against",
			"against_proportion","give_up","give_up_proportion","avoid_voting","law_firm_name","lawyers_name","opinion","reference_documents","announcement_date"]
		}
		//获取textarea数据和相应字段的二维数组
		var arr = [];
		//遍历textarea数据
		$("#sup-left03 tr:gt(0) td:nth-child(3)").each(function(i){
			var textArr = $(this).find("textarea");
			var iptArr = $(this).find(".date-ipt");
			var selArr = $(this).find("select");
			if(textArr.length){
				var _this = $(this).find("textarea").val();
				arr.push({'key':sum[i],'value':_this});
			}else if(iptArr.length){
				var _this = $(this).find("input").val();
				arr.push({'key':sum[i],'value':_this});
			}else if(selArr.length){
				var _this = $(this).find("select").text();
				arr.push({'key':sum[i],'value':_this});
			};
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
		}
		$.kf.ajax({
	        type: "post",
	        url:$.kf.COMPANYANNOUNCEMENT,
	        data: param,
	        dataType: "json",
	        processResponse: function(data){
	        	$("#fixLeftTable").empty().html("");
	        	$("#fixRightTable").empty().html("");
	        	$(".sup-mask").hide();
	        	$(".sup-pop").hide();
	        	$("body").css("overflow","auto");
	        	thisId = "";
	        	initTable();
	        }
	    });
	}
    var areaAutoHeight = function (classname){
    	var leftHeight = $("."+classname).height();
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
                $("#compYg").find("li").each(function () {
                    if ($(this).text() == "全部") {
                        $(this).addClass("hang-active");
                        $(this).siblings().removeClass("hang-active");
                    }
                });
                Query.setHash({
                    teCode: ""
                });
            }
            var _url = "";
            var type = $("#comSpecial").find(".hang-active").attr("name");
            var keyword = $("#comKeyWord").val();
            var process = $("#compYg").find(".hang-active").attr("name");
            if ($(".sameTab").find(".hang-active").text() == "全部") {
                type = "";
            }
            if ($("#compYg").find(".hang-active").text() == "全部") {
                process = "";
            }
            _url = $.kf.GETSUPERNOTICE+"?type="+type+"&process="+process+"&keyword="+keyword;
            new GetTable(_url, $("#pageTool"), "", getList, "get", $("#tableOne")).init();
        });
    };

    var dateSearch = function () {
        /*日历搜索按钮*/
        $("#compBtn").on("click", function () {
            var _url = "";
            var type = '';
			var process = '';
            var keyword = $("#comKeyWord").val();
            if ($(".listOne").size()) {
                type = $(".listOne").attr("name");
            } else if ($("#comSpecial").find(".hang-active").text() == "全部") {
                type = "";
            } else {
                type = $("#comSpecial").find(".hang-active").attr("name");
            }
            if ($(".listTwo").size()) {
                process = $(".listTwo").attr("name");
            } else if ($("#compYg").find(".hang-active").text() == "全部") {
                process = "";
            } else {
                process = $("#compYg").find(".hang-active").attr("name");
            }
            $("#tableOne").html("");
            _url = $.kf.GETSUPERNOTICE+"?type="+type+"&process="+process+"&keyword="+keyword;
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
        var aCode = Query.getHash("seCode");
		var bCode = Query.getHash("teCode");
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
        //清空选项
        $("#soClear").on("click", function () {
        	Query.setHash({
                teCode: ""
            });
            Query.setHash({
                seCode: ""
            });
            $(this).parent("li").siblings().remove();
            $(this).parents("#allListSo").hide();
            $("#comSpecial").find("li").eq(0).addClass("hang-active").siblings().removeClass("hang-active");
            $("#tradingAnou").find("li").eq(0).addClass("hang-active").siblings().removeClass("hang-active");
            $("#compYg").find("li").eq(0).addClass("hang-active").siblings().removeClass("hang-active");
            $("#tableOne").html("");
            var type = "";
            var process = "";
          	var keyword = $("#comKeyWord").val();
            _url = $.kf.GETSUPERNOTICE+"?type="+type+"&process="+process+"&keyword="+keyword;
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

        var process = "";
        var keyword = $("#comKeyWord").val();

        if ($(".listOne").size()) {
            type = $(".listOne").attr("name");
        } else if ($("#comSpecial").find(".hang-active").text() == "全部") {
            type = "";
        } else {
            type = $("#comSpecial").find(".hang-active").attr("name");
        }
        
        
        if ($(".listTwo").size()) {
            process = $(".listTwo").attr("name");
        } else if ($("#compYg").find(".hang-active").text() == "全部") {
            process = "";
        } else {
            process = $("#compYg").find(".hang-active").attr("name");
        }

        _url = $.kf.GETSUPERNOTICE+"?type="+type+"&process="+process+"&keyword="+keyword;
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
        $(".city-list").find("li").on("click", function () {
            _text = $(this).text();
            seCode = $(this).attr("name");
            $(this).addClass("provinceLi");
            $(this).siblings().removeClass("provinceLi");
            $("#compPopspecailSave").removeClass("default").addClass("btn-primary");
        });
        $("#compPopspecailSave").unbind().on("click", function () {
            if (_text != "") {
                $('#myModal02').modal('hide');
                $("#notesLi").find("li").removeClass("hang-active");
                var type = seCode;
                var keyword = $("#comKeyWord").val();
                $("#allListSo").show();
                Query.setHash({
                    "seCode": seCode
                });
                $(".listOne").remove();
                $("#allListSo").find("ul").prepend("<li class='listOne' name =" + seCode + ">" + _text + "<span class='soListClose'></span></li>");
               	$("#notesLi").find("li").each(function(){
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
               var _url = $.kf.GETSUPERNOTICE+"?type="+type+"&process="+process+"&keyword"+keyword;
    			new GetTable(_url, $("#pageTool"), "", getList, "get", $("#tableOne")).init();
            }
            removeThing();
        })
    };

    return {
        init: function () {
            dateSearch();//关键字
            specialWord();//加载公告分类
           // companyLi();//加载公司列表
            listComClick();
        }
    }

}();




