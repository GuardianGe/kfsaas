$(function(){
	var id = Query.getHash("id");
	var caseId = Query.getHash("caseId");
	if(Query.getHash("name")=="annualReport"){  //公司年报
		var _url = $.kf.GETYEARLISTINFO + "?" + "id=" + id;
	}else if(Query.getHash("name")=="courtMsg"){  //法律诉讼
		var _url = $.kf.GETCOMPANYCASEHTML + "?" + "caseId=" + caseId;
	}else if(Query.getHash("name")=="bidding"){  //招投标
		var _url = $.kf.GETEVENTSTENDERBIDINFO + "?" + "bidId=" + id;
	}else{   //新闻
		var _url = $.kf.GETNEWSDETAIL + "?" + "id=" + id;
	}
    $.kf.ajax({
        type: "get",
        url: _url,
        data: "",
        dataType: "json",
        processResponse: function (data) {
            if(Query.getHash("name")=="annualReport"){
            	annualReports(data);//公司年报
            }else if(Query.getHash("name")=="courtMsg"){
            	courtMsg(data); //法律诉讼
            }else if(Query.getHash("name")=="bidding"){
            	bidding(data); //招投标
            }else{
            	newsDetail(data); //新闻
            }
        }
    });
 	//返回顶部
	toTop('toTop',false);
})
function newsDetail(data){
	var list = data.data;
	$("title").html(list.title+"｜北京凯峰数据科技有限公司");
	$(".ns-banner").addClass("ns-title");
	$(".ns-title").find("span").html(list.title);
	$(".nsc-copy").html(list.original);
	$(".nsc-data").html(list.date);
//	$(".nsc-author").html(list.author);
	$(".nsc-source").html("新闻来源："+list.source);
	$(".nsc-text").html(list.content);
	if(!isNullOrEmpty(list.label)){
		$(".nsc-copy").text(list.label).show();
	}else{
		$(".nsc-copy").hide();
	}
}
function courtMsg(data){
	var list = data.data;
	$(".nsc-text").html(list.html);
	$("title").html(list.caseTitle+"｜北京凯峰数据科技有限公司");
	$(".ns-title").find("span").html(list.caseTitle);
	$(".nsc-t").hide();
}
function annualReports(data){
	var list = data.data;
	$(".nsc-text").html(list.html);
	$("title").html(list.title+"｜北京凯峰数据科技有限公司");
	$(".ns-title").find("span").html(list.title);
	$(".nsc-t").hide();
	$(".ns-title").find("span").css("text-align","center");
}
function bidding(data){
	var list = data.data;
	$(".nsc-text").html(list.content);
	$("title").html(list.title+"｜北京凯峰数据科技有限公司");
	$(".ns-title").find("span").html(list.title);
	$(".nsc-t").hide();
	$(".ns-title").find("span").css("text-align","center");
}
//返回顶部
var toTop = function (id, show) {
	var oTop = document.getElementById(id);
	var bShow = show;
	if(!bShow) {
		oTop.style.display = 'none';
		setTimeout(btnShow, 50);
	}
	oTop.onclick = scrollToTop;

	function scrollToTop() {
		var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
		var iSpeed = Math.floor(-scrollTop / 2);
		if(scrollTop <= 0) {
			if(!bShow) {
				oTop.style.display = 'none';
			}
			return;
		}
		document.documentElement.scrollTop = document.body.scrollTop = scrollTop + iSpeed;
		setTimeout(scrollToTop, 50);
	}

	function btnShow() {
		var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
		if(scrollTop <= 0) {
			oTop.style.display = 'none';
		} else {
			oTop.style.display = 'block';
		}
		setTimeout(btnShow, 50);
	}
}
		