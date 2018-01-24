
/*搜索结果*/
var searchResult = function () {
	
	/*内容写入*/
    var search = function () {
    	var keyword = Query.getHash("keyword");
    	/*投资机构*/
    	var investOrg = function(){
	        var _url = $.kf.SEARCHGETINVESTMENSEARCH + "?" + "code=" + keyword + "&page=" + 1;
	        //_url = $.kf.COMPANYCODE+"?"+"code="+keyword+"&page="+1;
	        $.getTable({
	        	url:_url,//url
		    	pageId:$("#pageTool"),//分页id
		    	callback:companyCodeList,//callback
		    	loadId:".maskInTable1",
		    	topPageNum:false,
		    	tbodyId:$("#companyCodeList")//tbody的id,
	        })
	
	        /**table**/
	        function companyCodeList(data) {
	        	
	            var list = data.data;
	            var attention = "";
	            if(isNullOrEmpty(list)){
	            	funNoData($("#pageTool"));
	            	$(".count1").text("（" + 0 + "）");
	            }else{
	            	var tr = "";
		            if (data.total > 99) {
		                $(".count1").text("（99+）");
		            } else {
		                $(".count1").text("（" + data.total + "）");
		            }
		            $("#companyCodeList").html("");
		            
		            $(list).each(function (i) {
		            	if(list[i].attention == "1"){
							attention = "取消";
						}else{
							attention = "关注";
						};
		                tr += "<tr>";
		                
		                tr += '<td><div class="investTbox investTbox-search">';
                        tr += '    <div class="investT-left investT-left-search"><img src="'+list[i].logoUrl+'"></div>';
                        tr += '    <div class="investT-right">';
                        tr += '        <div class="investR-top">';
                        tr += '            <span id="inName"><a href="">'+ list[i].name +'</a></span>';
                        tr += '            <span id="investType">'+ list[i].investType +'</span>';
                        tr += '            <span class="investHide"><br></span>';
                        tr += '            <span id="startYear">'+ list[i].date +'</span>';
                        tr += '            <a id="website" href="'+ list[i].website +'" target="_blank"><img src="../../assets/admin/layout/img/lianjie2.png">官网</a>';
                        tr += '        </div>';
                        tr += '        <div class="in-content" style="display: block;">'+ list[i].introduction.substring(0,28) +'...<a class="in-more">展开<img src="../../assets/admin/layout/img/xiala.png"></a></div>';
                        tr += '        <div class="in-content2" style="display: none;">'+ list[i].introduction +'<a class="in-more in-hide">收起<img src="../../assets/admin/layout/img/shouqi.png"></a></div>';
                        tr += '   </div>';
                        tr += '</div></td>';
		                
		                tr += "<td style='text-align:center;'>" + list[i].project + "</td>";
		                tr += "<td style='text-align:center;'>" + list[i].num + "</td>";
		                if(attention == "取消"){
		                	tr += "<td style='text-align:center;' class='investR-top'><a class='joinOptional  cancelOptional' name='" + list[i].id + "'>" + attention + "</a></td>";
		                }else{
		                	tr += "<td style='text-align:center;' class='investR-top'><a class='joinOptional  wantOptional' name='" + list[i].id + "'>" + attention + "</a></td>";
		                }
		                
		                tr += "</tr>";
		            });
		            $("#companyCodeList").append(tr);
		            //自选功能
		        	comOptional();
		            
	            }
	            
	        }
    	}
    	investOrg();
        //加入自选功能
	    var comOptional = function(){
	    	//展开收起
			$(".investT-right").on("click",".in-more",function(){
				if($(this).hasClass("in-hide")){
					$(this).parents(".investT-right").find(".in-content2").hide();
					$(this).parents(".investT-right").find(".in-content").show();
				}else{
					$(this).parents(".investT-right").find(".in-content2").show();
					$(this).parents(".investT-right").find(".in-content").hide();
				}
			})
			//自选
			$(".joinOptional").click(function(){
				var _url = "";
				var code = $(this).attr("name");
				var param = {
				  		"code":code,
				  		"type":"b1"
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
		            	investOrg();
	            	}
			 	 })
			})
	   };

        /*公告列表*/
        var _url = $.kf.GNOTE + "?" + "keyword=" + keyword + "&page=" + 1;
        $.getTable({
        	url:_url,//url
	    	pageId:$("#pageTool2"),//分页id
	    	loadId:".maskInTable3",
	    	topPageNum:false,
	    	callback:noteList,//callback
	    	tbodyId:$("#Gnote")//tbody的id,
        })
        /***table***/
        function noteList(data) {
        	
            var list = data.data;
            var tr = "";
            if (data.total > 99) {
                $(".count3").text("（99+）");
            } else {
                $(".count3").text("（" + data.total + "）");
            }
            $("#Gnote").html("");
            $(list).each(function (i) {
                tr += "<tr>";
                tr += "<td width='60%'><a href='" + list[i].url + "' target='_blank'>" + list[i].title + "</a><p>" + list[i].highlight + "</p></td>";
                tr += "<td width='10%' style='text-align:center;'>" + list[i].date + "</td>";
                tr += "<td width='10%' style='text-align:center;'>" + list[i].publishType + "</td>";
                tr += "<td width='10%' style='text-align:center;'>" + list[i].code + "</td>";
                tr += "<td style='text-align:center;'><a href='" + $.url.addUrl() + "id=" + list[i].company_id + "'>" + list[i].shortname + "</td>";
                tr += "</tr>";
            });
            $("#Gnote").append(tr);
        }


        /*新闻列表*/
        var _url = $.kf.GETNEWS + "?" + "keyword=" + keyword + "&page=" + 1;
        $.getTable({
        	url:_url,//url
	    	pageId:$("#pageTool3"),//分页id
	    	callback:newsList,//callback
	    	loadId:".maskInTable4",
	    	topPageNum:false,
	    	tbodyId:$("#newsTable")//tbody的id,
        })
        /***table***/
        function newsList(data) {
        	
            var list = data.data;
            var tr = "";
            if (data.total > 99) {
                $(".count4").text("（99+）");
            } else {
                $(".count4").text("（" + data.total + "）");
            }
            $("#newsTable").html("");
            $(list).each(function (i) {
                tr += "<tr>";
                tr += "<td><li><a href='" + $.url.newsInfoUrl() + "id=" + list[i].id + '&name=news' + "'>" + list[i].title + "</a><p>" + list[i].summary + "</p></li></td>";
                tr += "<td style='text-align:center;'>" + list[i].date + "</td>";
                tr += "<td style='text-align:center;'>" + list[i].source + "</td>";
                tr += "</tr>";
            });
            $("#newsTable").append(tr);
        }

        /*研报列表*/
        var _url = $.kf.GETREPORT + "?" + "keyword=" + keyword + "&page=" + 1;
        $.getTable({
        	url:_url,//url
	    	pageId:$("#pageTool4"),//分页id
	    	callback:getList,//callback
	    	loadId:".maskInTable5",
	    	topPageNum:false,
	    	tbodyId:$("#tableOne")//tbody的id,
        })
        /***table***/
        function getList(data) {
        	
            var list = data.data;
            var tr = "";
            if (data.total > 99) {
                $(".count5").text("（99+）");
            } else {
                $(".count5").text("（" + data.total + "）");
            }
            $("#tableOne").html("");
            $(list).each(function (i) {
                tr += "<tr>";
                tr += "<td style='text-align:center;'>" + list[i].date + "</td>";
                tr += "<td style='text-align:left;'><a href='" + list[i].url + "'  target='_blank'>" + list[i].title + "</a><p>" + list[i].highlight + "</p></td>";
                tr += "<td style='text-align:center;'>" + list[i].agency + "</td>";
                tr += "<td style='text-align:center;'>" + list[i].author + "</td>";
                tr += "</tr>";
            });
            $("#tableOne").append(tr);
        };

        /*法规列表*/
        var _url = $.kf.GETINFORMATIONLAWS + "?" + "keyword=" + keyword + "&page=" + 1;
        $.getTable({
        	url:_url,//url
	    	pageId:$("#lawPage"),//分页id
	    	callback:lawList,//callback
	    	loadId:".maskInTable6",
	    	topPageNum:false,
	    	tbodyId:$("#lawList")//tbody的id,
        })
        function lawList(data) {
        	
            var list = data.data;
            var tr = "";
            if (data.total > 99) {
                $(".count6").text("（99+）");
            } else {
                $(".count6").text("（" + data.total + "）");
            }
            $("#lawList").html("");
            $(list).each(function (i) {
                tr += "<div class='laws'>";
                tr += "	<div class='laws-header'>";
                if(list[i].type == "text"){
					tr += "	<a data-type='" + list[i].type + "' name='" + list[i].id + "' href='" + $.url.newsInfoUrl() + "id=" + list[i].id + '&name=laws' + '&position=searchResult' + "'>" + list[i].title + "</a>";                	
                }else{
                	tr += "	<a data-type='" + list[i].type + "' name='" + list[i].id + "' href='" + list[i].url +">" + list[i].title + "</a>";
                }
                tr += "	</div>";
                tr += "	<div class='laws-con'>" + list[i].summary + "</div>";
                tr += "</div>";
            });
            $("#lawList").append(tr);
        }

        /*投资事件列表*/
        var _url2 = $.kf.INVESTHING + "?" + "keyword=" + keyword + "&page=" + 1;
        $.getTable({
        	url:_url2,//url
	    	pageId:$("#pageThing"),//分页id
	    	callback:investList,//callback
	    	loadId:".maskInTable7",
	    	topPageNum:false,
	    	tbodyId:$("#investList")//tbody的id,
        })
        /***table***/
        function investList(data) {
        	
            var list = data.data;
            var tr = "";
            if (data.total > 99) {
                $(".count7").text("（99+）");
            } else {
                $(".count7").text("（" + data.total + "）");
            }
            $("#investList").html("");
            $(list).each(function (i) {
                tr += "<tr>";
                if(isNullOrEmpty(list[i].logoUrl)){
	            	tr += "<td><div class='investOrgImg'><div class='investOrgBox'><img src='../../assets/admin/layout/img/investImg.png' /></div><span>"+ list[i].name +"</span></div></td>";
	            }else{
	            	tr += "<td><div class='investOrgImg'><div class='investOrgBox'><img src='"+ list[i].logoUrl +"' /></div><span>"+ list[i].name +"</span></div></td>";
	            }
                tr += "<td>" + list[i].industry + "</td>";
                tr += "<td class='investT" + i + " investMg'></td>";
                //tr += "<td><a href=''>" +  + "</a></td>";
                tr += "<td>" + list[i].step + "</td>";
                tr += "<td>" + list[i].currencyCode + "</td>";
                tr += "<td>" + list[i].investmentAmount + "</td>";
                tr += "<td>" + list[i].date + "</td>";
                if(isNullOrEmpty(list[i].desc)){
                	tr += "<td>--</td>";
                }else{
                	tr += "<td><a href='javascript:void(0)' data-toggle='tooltip' data-placement='top' title=" + list[i].desc + ">简介</a></td>";
                }
                tr += "</tr>";
            });
            $("#investList").append(tr);
            $("[data-toggle='tooltip']").tooltip();
            //投资机构列表
            for (var i = 0; i < list.length; i++) {
                var tr2 = [];
                var investmentL = list[i].investment.length;
                for (var j = 0; j < investmentL; j++) {
                    if (investmentL == 0 || investmentL == 1) {
                        if (isNullOrEmpty(list[i].investment[j].investorId)) {
                            tr2 += "<span>" + list[i].investment[j].investment + "</span>";
                        } else {
                            tr2 += "<a href='" + $.url.investmentAgencyDetailsUrl() + "id=" + list[i].investment[j].investorId + "'>" + list[i].investment[j].investment + "</a>";
                        }
                    } else {
                        if (isNullOrEmpty(list[i].investment[j].investorId)) {
                            tr2 += "<span>" + list[i].investment[j].investment + "</span>/";
                        } else {
                            tr2 += "<a href='" + $.url.investmentAgencyDetailsUrl() + "id=" + list[i].investment[j].investorId + "'>" + list[i].investment[j].investment + "</a>/";
                        }

                    }

                }
                $(".investT" + i).append(tr2)
            }
            $(".investMg").each(function () {

                if ($(this).html().indexOf("/") > 0) {

                    $(this).html($(this).html().substring(0, $(this).html().length - 1));
                }
            });

        }
        ;
    }
    return{
    	init:function(){
    		search();
    		var pageUrl = "./serachCompany.html";
    		pageFun(pageUrl);
            function pageFun(pageUrl) {
                //new LoadingAjax($("#tabComps"), {}, $("#tabComps")).init();
                $.ajax({
                    type: "get",
                    url: pageUrl,
                    data: "",
                    dataType: "HTML",
                    success: function (data) {
                        //new LoadingAjax($("#tabComps"), {}, $("#tabComps")).close();
                        $("#searchCompany").empty("").html("").append(data);
                    }
                });
            }
    	}
    }
}();
