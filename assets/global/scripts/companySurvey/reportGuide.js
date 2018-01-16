/******
 
 UPDATE DATE:2017/5/2
 NAV:企业调查
 NAME:WANGJH
 
 ******/


/************************************报告引导****************************************/
var reportGuide = function () {
    var isFix = true;
    //报告引导
    var reportGuideList = function () {
    	function initTable(){
    		var keyword = $("#comKeyWord").val();
    		$("#reportGuideList").html("");
	        var _url = $.kf.GETTEMPLATE + "?" + "keyword=" + keyword;
	        var dataTipObj = {
	        	title:"还没有任何内容",
				subtitle:"请点击右上方按钮新建报告模板"
	        };
	        //new GetTable(_url, $("#pageTool"), {}, noteList, "get", $("#reportGuideList"),1,"",true,true,dataTipObj).init();
	        $.getTable({
	        	url:_url,//url
		    	pageId:$("#pageTool"),//分页id
		    	callback:noteList,//callback
		    	dataTip:dataTipObj,
		    	tbodyId:$("#reportGuideList")//tbody的id,
	        })
    	}
    	initTable();
        /***table***/
        function noteList(data) {
            var list = data.data;
            var tr = "";
            $("#reportGuideList").html("");
            $(list).each(function (i) {
                tr += "<tr se-id='"+ list[i].id +"'>";
                tr += "<td><a href='javascript:void(0)' class='reviseTemplate modeNameIn'>" + list[i].name + "</a></td>";
                tr += "<td>" + list[i].createDate + "</td>";
                tr += "<td>" + list[i].updateDate + "</td>";
                //tr += "<td width='20%'><a href='javascript:void(0)' class='useTemplate'>生成报告</a><a href='javascript:void(0)' class='mgl10 reviseTemplate'>修改</a><a href='javascript:void(0)' class='mgl10 copyTemplate'>复制</a><a href='javascript:void(0)' class='mgl10 deleteTemplate'>删除</a></td>";
                tr += "<td width='20%'><a href='javascript:void(0)' style='color:#f77e44;' class='useTemplate'>生成报告</a><a href='javascript:void(0)' class='mgl10 reviseTemplate'>修改</a><a href='javascript:void(0)' class='mgl10 deleteTemplate'>删除</a></td>";
                tr += "</tr>";
            });
            $("#reportGuideList").append(tr);
            copyTemplate();
            deleteTemplate();
			useTemplate();     
			reviseTemplate();
        };
        
        //使用
        function useTemplate(){
        	$(".useTemplate").on("click",function(){
        		$(".modeNameErr").hide().text("");
        		var thisId =  $(this).parents("tr").attr("se-id");
        		useModal(thisId);
        	})
        }
        //公司代码弹窗
        function useModal(thisId){
        	var id = thisId;
        	$("#myModal02").modal("show");
        	$("#codeKeyWord").val("");
        	$(".codeHide").hide();
        	$("#codeKeyWord").off().on("keyup",function(e){
        		var searchI = trim($("#codeKeyWord").val());
        		var keyCode = e.which;
	            if (keyCode == 13) {
	                var code = '';
	                if($(".codeList .active").find("span").text() == ""){
	                	code = $("#codeKeyWord").val();
	                	$("#getCodeTem").click()
	                }else{
	                	code = $(".codeList .active").find("span").text();
	                }
	                $("#codeKeyWord").val(code);
            		$(".codeList").hide();
            		$(".codeList ul").html("");
	            } else if (keyCode == 40) {
		            if ($(".codeList ul li:last-child").hasClass("active")) {
		                return false;
		            } else if (!$(".codeList ul li").hasClass("active")) {
		                $(".codeList ul li:first-child").addClass("active");
		                return false;
		            } else {
		                $(".codeList .active").removeClass("active").next().addClass("active");
		                return false;
		                }
		        } else if (keyCode == 38) {
		            if ($(".codeList ul li:first-child").hasClass("active")) {
		                return false;
		            } else {
		                $(".codeList .active").removeClass("active").prev().addClass("active");
		                return false;
		            }
		        }else{
		        	$(".codeList ul").html("");
	        		if (searchI != "") {
			            //上送参数
			            var param = {"code": searchI,"listStatusId":"b2"};
			            $.kf.ajax({
			                type: "get",
			                url: $.kf.COMPANYCODE,
			                data: param,
			                dataType: "json",
			                processResponse: function (data) {
			                    if (data.total == 0) {
			                         $(".codeList").hide();
			                    } else {
			                    	$(".codeHide").hide();
			                        var list = data.data.companyList;
			                        var tr = "";
			                        $(".codeList ul").html("");
			                        $(list).each(function (i) {
			                            if (i < 10) {
			                                tr += "<li><a href='javascript:void(0)'><b class='pull-right'>" + list[i].shortname + "</b><span>" + list[i].code + "</span></a></li>";
			                            }
			                        });
			                        $(".codeList ul").append(tr);
			                        $(".codeList").show();
			                        $(".codeList").find("li").on("click",function(){
			                        	var code = $(this).find("span").text();
			                        	$("#codeKeyWord").val(code);
			                        	$(".codeList").hide();
			                        	$("#getCodeTem").click();
			                        });
			                    }
			                }
			            });
			        } else {
			            $(".codeList").hide();
		             	$(".codeHide").hide();
			        }
		        }
        	})
        	$("body").on("click",function(){
        		$(".codeList").hide();
        	})
        	$("#getCodeTem").on("click",function(){
        		var searchI = trim($("#codeKeyWord").val());
        		//判断输入代码是否为6位数字
        		var na = /^\d{6}$/;
        		if (na.test(searchI)) {
		            //上送参数
		            var param = {"code": searchI,"id":id};
		            $.kf.ajax({
		                type: "post",
		                url: $.kf.REPORTGENERATE,
		                data: param,
		                dataType: "json",
		                processResponse: function (data) {
		                    if (data.total == 0) {
		                         $(".codeList").hide();
		                         $(".codeHide").show().text("未找到对应公司，请重新输入");
		                    } else {
		                    	$("#myModal02").modal("hide");
		                    	window.location.href=$.url.reportModify()+"rp_id="+ data.data.rp_id +"&tmp_id="+data.data.tmp_id +"&currentId="+searchI;
		                    }
		                }
		            });
		        }else {
		            $(".codeList").hide();
	             	$(".codeHide").show().text("请输入代码或者简称");
		        }
        	})
        }
        //复制
        function copyTemplate(){
        	$(".copyTemplate").on("click",function(){
        		setDefault();
        		//上送参数
                var param = {
                    id: $(this).parents("tr").attr("se-id")
                }
        		$.kf.ajax({
                    type: "post",
                    url: $.kf.COPYTEMPLATE,
                    data: param,
                    dataType: "json",
                    processResponse: function (data) {
                        initTable();
                    }
                });
                $(".copyTemplate").off();
        	})
        }
        
        //删除
        function deleteTemplate(){
        	$(".deleteTemplate").on("click",function(){
        		setDefault();
        		//上送参数
        		alert("你确定要删除对应模板吗？","提示","delTemplate",true);
        		var param = {
                    id: $(this).parents("tr").attr("se-id")
                }
        		$("#delTemplate").on("click",function(){
        			$.kf.ajax({
	                    type: "post",
	                    url: $.kf.DELTEMPLATE,
	                    data: param,
	                    dataType: "json",
	                    processResponse: function (data) {
	                        initTable();
	                    }
	                });
        		})
        	})
        }
        //修改
        function reviseTemplate (){
        	$(".reviseTemplate").on("click",function(e){
        		$(".modeNameErr").hide().text("");
        		$(".checkboxSaveAs").show();
        		$(".modeNameErr").hide().text("");
        		var modeName = $(this).parents("tr").find('.modeNameIn').text();
        		if(modeName.length>30){
        			$("#modeName").val("");
        		}else{
        			$("#modeName").val(modeName);
        		}
        		
        		setDefault();
	        	var id = $(this).parents("tr").attr("se-id");
	        	var _url = $.kf.REPORTEDITTEMPLATE+"?id="+id;
	        	$.kf.ajax({
                    type: "get",
                    url: _url,
                    data: "",
                    processResponse: function (data) {
                    	$("label").find("span").removeClass("checkbox-active");
                    	var list = data.data;
                    	if(!isNullOrEmpty(list)){
                    		$(list).each(function(i){
                    			//$("#"+list[i]).addClass("checkbox-active");
                    			$("label").find("span").each(function(j){
                    				if($(this).attr("name") == list[i].sec_code){
                    					$(this).addClass("checkbox-active");
	                    			}
                    			})
                    			$(".productionCon .radio-list").find("input").each(function(){
                    				if($(this).attr("se-code") == list[i].sec_code){
                    					$(this).parents(".radio-list").find("input").removeAttr("checked");
                    					$(this).attr("checked",'checked');
	                    			}
                    			})
                    			
                    		});
                    		$(".checkbox-lists label").find("span").each(function(){
                    			if($(this).hasClass("checkbox-active")){
                    				//$(".checkbox-title").find("span").addClass("checkbox-active");
                    			}else{
                    				$(this).parents(".checkbox-group").find(".checkbox-title").find("span").removeClass("checkbox-active");
                    			}
                    		});
                    		$(".productionCon").each(function(){
                    			var num01 = $(this).find(".checkbox-title").length;
                    			var num02 = $(this).find(".checkbox-title").find(".checkbox-active").length;
                    			if(num01 == num02&&num01 != 0){
                    				$(this).find(".checkbox-total").find("span").addClass("checkbox-active");
                    			}else if(num01 == 0){
                    				var num03 = $(this).find(".checkbox-lists").find(".checkbox-bg").length;
                    				var num04 = $(this).find(".checkbox-active").length;
                    				if(num03 == num04){
                    					$(this).find(".checkbox-total").find("span").addClass("checkbox-active");
                    				}
                    			}
                    		})
                    	}
                    	checkboxSave(id);
                        $(".page-mask").show();
	       				$(".page-addMode").show();
	       				$(".addMode-center").scrollTop(0);
                    }
                });
        	})
        }
        

        /***搜索***/
        $("#noteSer").on("click", function () {
            $("#reportGuideList").html("");
            initTable();
        });
        //重置
        $("#noteReset").on("click",function(){
        	$("#comKeyWord").val("");
        	initTable();
        })
        $("#comKeyWord").on("keydown", function (e) {
            var keyCode = e.which;
            if (keyCode == 13) {
                $("#noteSer").click();
            }
        });
        
        /***默认模板***/
        $("#defaultTemplate").on("click",function(){
        	$(".modeNameErr").hide().text("");
        	setDefault();
        	$(".checkboxSaveAs").hide();
        	$("label").find("span").addClass("checkbox-active");
        	$("#modeName").val("");
       		$(".page-mask").show();
       		$(".page-addMode").show();
       		$(".addMode-center").scrollTop(0);
       		checkboxSave("");
        })
         /***新建模板***/
        $("#createTemplate").on("click",function(){
        	$(".modeNameErr").hide().text("");
        	$(".checkboxSaveAs").hide();
        	setDefault();
        	$("label").find("span").removeClass("checkbox-active");
        	$("#modeName").val("");
       		$(".page-mask").show();
       		$(".page-addMode").show();
       		$(".addMode-center").scrollTop(0);
       		checkboxSave("");
        });
        //初始化弹窗active状态
        function setDefault(){
    		$(".tabLi").find("li").removeClass("active");
        	$(".tabLi").find("li").eq(0).addClass("active");
        	$(".radio-list").find("input").removeAttr("checked");
            $(".radio-list").find(".hang-default").attr("checked",'checked');
        	$(".productionTab").find(".productionCon").addClass("hide");
        	$(".productionTab").find(".productionCon").eq(0).removeClass("hide");
        }
        //数组去重
        function unique(arr){  
	         arr.sort();  
	        var re=[arr[0]];  
	        for(var i=1;i<arr.length;i++){  
	            if(arr[i]!==re[re.length-1]){  
	                re.push(arr[i]);  
	  
	            }  
	        }  
	        return re;  
	    }
        //模板保存、生成
        function checkboxSave (id){
	        	//保存
	        	$(".checkboxSave").unbind().on("click",function(){
	        		delay_till_last('#getModename', function() {
		        		var arr = [];
		        		var checkNum = $(".productionTab").find(".checkbox-active").length;
		    			if(checkNum != 0){
		    				$(".tabLi li").find("a").each(function(){
			    				arr.push($(this).attr("name"));
			        		})
			        		$(".checkbox-lists").find(".checkbox-active").each(function(){
			    				arr.push($(this).attr("name"));
			    				var groupNum = $(this).parents(".checkbox-group").find(".checkbox-title").length;
			    				if(groupNum != 0){
			    					arr.push($(this).parents(".checkbox-group").find(".checkbox-title").find(".checkbox-bg").attr("name"));
			    				}
			        		})
			        		
			        		$(".productionCon").find('input:radio:checked').each(function(){
			        			arr.push($(this).attr("se-code"));
			        		})
			        		var modeName = trim($("#modeName").val());
			        		if(isNullOrEmpty(modeName)){
			        			$(".modeNameErr").show().text("模板名称不能为空");;
			        			$(".addMode-center").scrollTop(0);
			        		}else{
			        			$(".modeNameErr").hide().text("");
			        			arr = unique(arr);//去重
			        			var arrObj = {
									"arr":arr
								};
								var arrStr = JSON.stringify(arrObj);
				        		var param = {
				        			"id":id,
				        			"arr":arrStr,
				        			"title":modeName
				        		};
					        	$.kf.ajax({
					                type: "post",
					                url: $.kf.ADDTEMPLATE,
					                data: param,
					                dataType: "json",
					                processResponse: function (data) {
					                	if(data.code == '10010'){
					                		$(".modeNameErr").show().text(data.message);
					                		$(".addMode-center").scrollTop(0);
					                	}else{
					                		$(".modeNameErr").hide().text("");
					                		$(".page-mask").hide();
					       					$(".page-addMode").hide();
						                    initTable();
					                	}
					                	
					                }
					            });
				           }
		        		}else{
		        			alert("模板的指标不能为空");
		        		}
	        		}, 300);
		        })
		        
	        	//生成
	        	$(".checkboxCreate").unbind().on("click",function(){
	        		$(".modeNameErr").hide().text("");
	        		var arr = [];
        		var checkNum = $(".productionTab").find(".checkbox-active").length;
    			if(checkNum != "0"){
    				$(".tabLi li").find("a").each(function(){
	    				arr.push($(this).attr("name"));
	        		})
	        		$(".checkbox-lists").find(".checkbox-active").each(function(){
	    				arr.push($(this).attr("name"));
	    				arr.push($(this).parents(".checkbox-group").find(".checkbox-title").find(".checkbox-bg").attr("name"));
	        		})
	        		$(".productionCon").find('input:radio:checked').each(function(){
	        			arr.push($(this).attr("se-code"));
	        		})
	        		var modeName = trim($("#modeName").val());
	        		if(isNullOrEmpty(modeName)){
	        			$(".modeNameErr").show().text("模板名称不能为空");
	        			$(".addMode-center").scrollTop(0);
	        		}else{
	        			$(".modeNameErr").hide().text("");
	        			arr = unique(arr);//去重
	        			var arrObj = {
							"arr":arr
						};
						var arrStr = JSON.stringify(arrObj);
		        		var param = {
		        			"id":id,
		        			"arr":arrStr,
		        			"title":modeName
		        		};
			        	$.kf.ajax({
			                type: "post",
			                url: $.kf.ADDTEMPLATE,
			                data: param,
			                dataType: "json",
			                processResponse: function (data) {
			                	if(data.code == '10010'){
			                		$(".modeNameErr").show().text(data.message);
			                		$(".addMode-center").scrollTop(0);
			                	}else{
			                	var list = data.data;
			                	$(".page-mask").hide();
		       					$(".page-addMode").hide();
			                    initTable();
			                    useModal(list.tmp_id);
			                	}
			                }
			            });
		            }
        		}else{
        			alert("模板的指标不能为空");
        		}
	        })
        	//另存为
        	$(".checkboxSaveAs").unbind().on("click",function(){
        		$(".newCodeHide").hide().text("");
        		$("#newModeName").val("");
        		var arr = [];
        		var checkNum = $(".productionTab").find(".checkbox-active").length;
    			if(checkNum != "0"){
    				$(".tabLi li").find("a").each(function(){
	    				arr.push($(this).attr("name"));
	        		})
	        		$(".checkbox-lists").find(".checkbox-active").each(function(){
	    				arr.push($(this).attr("name"));
	    				arr.push($(this).parents(".checkbox-group").find(".checkbox-title").find(".checkbox-bg").attr("name"));
	        		})
	        		$(".productionCon").find('input:radio:checked').each(function(){
	        			arr.push($(this).attr("se-code"));
	        		})
	        		$("#getModename").unbind().on("click",function(){
	        			delay_till_last('#getModename', function() {
		        			var modeName = $("#newModeName").val();
		        			if(isNullOrEmpty(modeName)){
		        				$(".newCodeHide").show().text("模板名称不能为空");
		        			}else{
		        				arr = unique(arr);//去重
			        			var arrObj = {
									"arr":arr
								};
								var arrStr = JSON.stringify(arrObj);
				        		var param = {
				        			"id":"",
				        			"arr":arrStr,
				        			"title":modeName
				        		};
					        	$.kf.ajax({
					                type: "post",
					                url: $.kf.ADDTEMPLATE,
					                data: param,
					                dataType: "json",
					                processResponse: function (data) {
					                	if(data.code == '10010'){
					                		$(".newCodeHide").show().text(data.message);
					                	}else{
						                	var list = data.data;
						                	$(".page-mask").hide();
					       					$(".page-addMode").hide();
						                    initTable();
						                    $("#myModal03").modal("hide");
					                	}
					                }
					            });
		        			}
		        		}, 300);
	        		})
	        		$("#myModal03").modal("show");
        		}else{
        			alert("模板的指标不能为空");
        		}
		        })
        	//关闭
        	$(".sup-close").unbind().on("click",function(){
        		$(".modeNameErr").hide().text("");
	        	$(".page-mask").hide();
	       		$(".page-addMode").hide();
	        })
        	//取消
	        $(".checkboxHide").unbind().on("click",function(){
	        	$(".modeNameErr").hide().text("");
	        	$(".page-mask").hide();
	       		$(".page-addMode").hide();
	        })
        }
	        
        
        //tab切换
        $(".tabLi li").find("a").on("click",function(){
        	$(this).parent().addClass("active").siblings("li").removeClass("active");
        	var indexTab = $(this).parent().attr("name");
        	$(".productionCon").each(function(){
        		if($(this).attr("name") == indexTab){
        			$(this).removeClass("hide").siblings("div").addClass("hide")
        		}
        	})
        })
        
        
        //单选
        $(".checkbox-lists").find("label").on("click",function(){
        	if($(this).find("span").hasClass("checkbox-active")){
        		$(this).find("span").removeClass("checkbox-active");
        	}else{
        		$(this).find("span").addClass("checkbox-active");
        	}
    		var num = $(this).parents(".checkbox-lists").find(".checkbox-active").length;
        	var num2 = $(this).parents(".checkbox-lists").find("label").length;
        	var num3 = $(this).parents(".productionCon").find(".checkbox-title").length;
        if(num3 != 0){
        		if(num == num2){
        			$(this).parents(".checkbox-group").find(".checkbox-title").find("span").addClass("checkbox-active");
        		}else{
        			$(this).parents(".checkbox-group").find(".checkbox-title").find("span").removeClass("checkbox-active");
        		}
        		var num4 = $(this).parents(".productionCon").find(".checkbox-title").find(".checkbox-active").length;
        		if(num3 == num4){
        			$(this).parents(".productionCon").find(".checkbox-total").find("span").addClass("checkbox-active");
        		}else{
        			$(this).parents(".productionCon").find(".checkbox-total").find("span").removeClass("checkbox-active");
        		}
        	}else{
        		if(num == num2){
        			$(this).parents(".productionCon").find(".checkbox-total").find("span").addClass("checkbox-active");
        		}else{
        			$(this).parents(".productionCon").find(".checkbox-total").find("span").removeClass("checkbox-active");
        		}
        	}
        })
        
        //全选
        $(".checkbox-total").on("click",function(){
        	if($(this).children("span").hasClass("checkbox-active")){
        		$(this).parents(".productionCon").find("label span").removeClass("checkbox-active");
        	}else{
        		$(this).parents(".productionCon").find("label span").addClass("checkbox-active");
        	}
        })
        //二级全选
        $(".checkbox-title").on("click",function(){
        	if($(this).find("span").hasClass("checkbox-active")){
        		$(this).parents(".checkbox-group").find("span").removeClass("checkbox-active");
        	}else{
        		$(this).parents(".checkbox-group").find("span").addClass("checkbox-active");
        	}
        	var num3 = $(this).parents(".productionCon").find(".checkbox-title").length;
        	var num4 = $(this).parents(".productionCon").find(".checkbox-title").find(".checkbox-active").length;
        	if(num3 == num4){
        		$(this).parents(".productionCon").find(".checkbox-total").find("span").addClass("checkbox-active");
        	}else{
        		$(this).parents(".productionCon").find(".checkbox-total").find("span").removeClass("checkbox-active");
        	}
        })
        //报告期，单位选择
//      $(".list-inline").find("li").on("click",function(){
//      	$(this).addClass("hang-active").siblings().removeClass("hang-active");
//      })
        
    }
    return {
        reportGuideList: function () {
            reportGuideList()
        }
    }
}();