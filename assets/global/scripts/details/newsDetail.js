

/*
 
 * 
 * 新闻详情
 * 
 * 
 * */
var GetContent = function () {
	var id = '';
	var keywd = "";
    var news = function () {
        id = Query.getHash("id");
        var name = Query.getHash("name");
       // console.log(Query.getHash("encodeKeyword"));
        var keywordB = Query.getHash("keywordB");
        var keywordT = Query.getHash("codeURI-Keyword");
        var titleName = Query.getHash("title");
        keywd = keywordT;
        if(isNullOrEmpty(Query.getHash("position"))){
        	var newsFrom = Query.getHash("name");
        }else{
        	var newsFrom = Query.getHash("position");
        }
        
        if(newsFrom == "latestnews"){
        	$("#brandTwo a").text("最新动态").attr("href","/news/latestnews");
        };
        if(newsFrom == "news"){
        	$("#brandTwo a").text("市场新闻").attr("href","/news/index");
        };
        if(newsFrom == "supervisionNews"){
        	$("#brandTwo a").text("监管要闻").attr("href","/news/supervision");
        };
        if(newsFrom == "timePolicyUrl"){
        	$("#brandTwo a").text("时政新闻").attr("href","/news/timepolicy");
        };
        if(newsFrom == "makeReport"){
        	$("#brandTwo a").text("报告制作").attr("href","/reportproduction/production");
        };
        if(newsFrom == "searchResult"){
        	$("#brandTwo a").text("搜索结果").attr("href","/search/index");
        };
        if(newsFrom == "html"){
        	$("#brandTwo a").text("信息披露").attr("href","/notice/index");
        };
        var _url = "";
        if (name == "news") {
            _url = $.kf.GETNEWSDETAIL + "?" + "id=" + id;
        };
        if (name == "laws") {
            _url = $.kf.GETLAWDETAIL + "?" + "id=" + id;
        };
        if (name == "search") {
            _url = $.kf.GETWECHAT + "?" + "id=" + id + "&keyword=" + keywordB + "&title=" + titleName;
        };
        if (name == "letter") {
            _url = $.kf.GETMESSAGE + "?" + "id=" + id;
        };
        if (name == "html") {
        	var htmlUrl = utf8to16(base64decode(Query.getHash("htmlUrl")));
            _url = $.kf.GETHTMLNOTICESERVICE + "?" + "htmlUrl=" + htmlUrl;
            $("title").text("公告详情");
        	$("#brandOne").text("新三板");
        	$(".threeTextLi").text("公告详情");
            $(".pdfUrl a").attr('href',htmlUrl.substr(0,htmlUrl.length-5))
        };
        if(!isNullOrEmpty(Query.getHash("word"))){
        	var word = Query.getHash("word");
        }else{
        	var word = "";
        }
        
        new LoadingAjax($(".maskInAjax"), {}, $("#newsContent")).init();
        $.kf.ajax({
            type: "get",
            url: _url,
            data: "",
            dataType: "json",
            processResponse: function (data) {
                new LoadingAjax($(".maskInAjax"), {}, $("#newsContent")).close();
                if(name == "html"){
                	$(".newList").hide();
                	$(".htmlPdf").show();
                	if(!isNullOrEmpty(word)){
                		var data = data.data.replace(new RegExp("(" + word + ")","ig"), "<span class='selectWord' style='background-color:red;color:#ffffff'>" + word + "</span>");
                	}else{
                		var data = data.data;
                	}
                	$(".htmlPdfIn").html(data);
                	if($(".selectWord").size()){
                		$(".selectWord").eq(0).attr("id","selectWord");
	                	var offsetTop = $("#selectWord").offset().top;//当前元素在body中的offsetTop值
			        	document.getElementById("selectWord").scrollIntoView(true);//显示锚点元素到顶栏
			        	var _top = $(document).scrollTop();
			        	_top = _top - 70;//70是clearHeight+$(#_name)的margin-top值；
			        	$(document).scrollTop(_top);
                	}
                	
                }else{
                	$(".newList").show();
                	$(".htmlPdf").hide();
                	newsList(data);
                }
                
            }
        });
    }
    var newsList = function (data) {
        var list = data.data;

        $("#newTitle").text(list.title);
        $("#newDate").text(list.date);
        $("#newSource").text(list.source);
        $("#newAuthor").text(list.author);
        $("#newsContent").html(list.content);
        
        //判断是否有收藏
        if(list.isCollection == 0){
        	$(".newSecond").append("<a class='pull-right' u_id='"+ list.id +"' u_type='"+ list.source +"' id='detailSC'>收藏</a>")
        }else if(list.isCollection == 1){
        	$(".newSecond").append("<a class='pull-right' id='detailSC'>取消收藏</a>")
        }
       
        $("#detailSC").on("click",function(){
        	var _text = $(this).text();
        	var _id = id;
        	var _keyword = keywd;
        	if(_text == "收藏"){
        		//上送参数
                var param = {
                    id: _id,
                    type: "weixin",
                    keyword: _keyword,
                    title: $("#newTitle").text()
                }
                $.kf.ajax({
                    type: "post",
                    url: $.kf.COLLECTION,
                    data: param,
                    dataType: "json",
                    processResponse: function (data) {

                    }
                });
                $(this).text("取消收藏")
        	}else{
        		//上送参数
                var param = {
                    id: _id,
                    type: "weixin",
                    keyword: _keyword,
                    title: $("#newTitle").text()
                }
                $.kf.ajax({
                    type: "post",
                    url: $.kf.CANCELCOLLECTION,
                    data: param,
                    dataType: "json",
                    processResponse: function (data) {

                    }
                });
                $(this).text("收藏")
        	}
        })

    }

    return {
        init: function () {
            news();
        }
    }

}();
