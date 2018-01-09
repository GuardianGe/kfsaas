
/*搜索结果*/
var searchResult = function () {
	
	/*内容写入*/
    var search = function () {
        /*股票列表*/
        var keyword = Query.getHash("keyword");
        var _url = $.kf.COMPANYCODE + "?" + "code=" + keyword + "&page=" + 1;
        //_url = $.kf.COMPANYCODE+"?"+"code="+keyword+"&page="+1;
        $.getTable({
        	url:_url,//url
	    	pageId:$("#pageTool"),//分页id
	    	callback:companyCodeList,//callback
	    	loadId:".maskInTable1",
	    	tbodyId:$("#companyCodeList")//tbody的id,
        })

        /**table**/
        function companyCodeList(data) {
            var list = data.data.companyList;
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
	                tr += "<tr>";
	                tr += "<td><a href='" + $.url.companyListUrl() + "id=" + list[i].companyId + "'>" + list[i].shortname + "(" + list[i].code + ") <span class='badge badge-default'>" + list[i].type + "</span></a></td>";
	                tr += "</tr>";
	            });
	            $("#companyCodeList").append(tr);
            }
            
        }

        /*公告列表*/
        var _url = $.kf.GNOTE + "?" + "keyword=" + keyword + "&page=" + 1;
        $.getTable({
        	url:_url,//url
	    	pageId:$("#pageTool2"),//分页id
	    	loadId:".maskInTable3",
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

        /*公司列表*/
        var _url = $.kf.COMPANYLIST + "?" + "companyName=" + keyword + "&page=" + 1;
        $.getTable({
        	url:_url,//url
	    	pageId:$("#pageTool8"),//分页id
	    	callback:companyList,//callback
	    	loadId:".maskInTable2",
	    	tbodyId:$("#companyList")//tbody的id,
        })
        /***table***/
        function companyList(data) {
            var list = data.data;
            var tr = "";
            if (data.total > 99) {
                $(".count2").text("（99+）");
            } else {
                $(".count2").text("（" + data.total + "）");
            }
            $("#companyList").html("");
            $(list).each(function (i) {
                tr += "<tr>";
                tr += "<td><a href=>" + list[i].companyName + "</a></td>";
                tr += "<td><span  typeName=" + list[i].companyNameEl + " name=" + list[i].companyId + ">" + list[i].type + "</span></td>";
                tr += "</tr>";
            });
            $("#companyList").append(tr);

            $("#companyList span").each(function () {
                var id = $(this).attr("name");
                var companyName = $(this).attr("typeName");
                if ($(this).text() == "新三板挂牌公司") {
                    $(this).parent("td").siblings("td").children("a").attr("href", $.url.companyListUrl() + "id=" + id)
                } else if ($(this).text() == "一般企业") {
                    $(this).parent("td").siblings("td").children("a").addClass('investRestEl');
                    $(this).parent("td").siblings("td").children("a").attr("href", $.url.industryUrl() + "companyName=" + companyName)
                } else if ($(this).text() == "证券公司") {
                    $(this).parent("td").siblings("td").children("a").attr("href", $.url.securitiesUrl() + "id=" + id)
                } else if ($(this).text() == "私募基金管理人") {
                    $(this).parent("td").siblings("td").children("a").attr("href", $.url.fundManagerUrl() + "id=" + id)
                } else {
                    $(this).parent("td").siblings("td").children("a").attr("href", $.url.investmentAgencyDetailsUrl() + "id=" + id)
                }
            })
            var isCookie = false;
            moneyUrl($(".investRestEl"), isCookie, "isCookie");
        }

        /*新闻列表*/
        var _url = $.kf.GETNEWS + "?" + "keyword=" + keyword + "&page=" + 1;
        $.getTable({
        	url:_url,//url
	    	pageId:$("#pageTool3"),//分页id
	    	callback:newsList,//callback
	    	loadId:".maskInTable4",
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

        /*事件列表*/
        var _url2 = $.kf.INVESTHING + "?" + "keyword=" + keyword + "&page=" + 1;
        $.getTable({
        	url:_url2,//url
	    	pageId:$("#pageThing"),//分页id
	    	callback:investList,//callback
	    	loadId:".maskInTable7",
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
                  console.log(list[i]);
                tr += "<tr>";
                tr += "<td>" + list[i].name + "</td>";
                tr += "<td>" + list[i].industry + "</td>";
                tr += "<td class='investT" + i + " investMg'></td>";
                //tr += "<td><a href=''>" +  + "</a></td>";
                tr += "<td>" + list[i].step + "</td>";
                tr += "<td>" + list[i].currencyCode + "</td>";
                tr += "<td>" + list[i].investmentAmount + "</td>";
                tr += "<td>" + list[i].date + "</td>";
                tr += "<td><a href='javascript:void(0)' data-toggle='tooltip' data-placement='top' title=" + list[i].desc + ">简介</a></td>";
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
    	}
    }
}();
