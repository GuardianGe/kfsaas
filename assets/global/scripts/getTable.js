/*
 * 
 * getTable
 * 
*/
(function($){
    $.fn.tableList = function(options){
    	var arr = [];
		var opts = $.extend({},$.fn.tableList.defaults,options);
	    var tlist = new GetTable(opts);
	    tlist.init(opts);
	    arr.push(tlist);
	    return arr;
    };
    $.fn.tableList.defaults = {
    	url:"",  //url
    	pageId:null,  //分页id ,$("#id")
    	param:{},  //上送参数
    	callback:null,  //callback
    	method:"get",  //默认get
    	currentPage:1,  //记忆当前页，默认1
    	loadId:".maskInTable",  //默认加载中父元素,变更的话不用加$();和pageId写法不一样
    	showDataBox:true,  //是否显示暂无数据模块
    	tbodyId:null,  //tbody的id,$("#id")
    	dataImg:true,  //是否显示暂无数据的img
    	showPageTool:true,  //是否显示分页栏
    	pageNum:20, //默认分页
    	targetId:null, //锚点
    	showDefaultTabel:true, //默认显示td列表
    	dataTip:{  //默认暂无数据提示信息
    		title:"抱歉，暂未搜到信息",
    		subtitle:"请查阅其他栏目"
    	}
    };
   	//$.fn.tableList.Constructor = GetTable;
   	
	/*$.extend({
   		getTable:function(){
   			return $.fn.tableList(option);
   		}
   	});*/
    $.getTable = function(option) {
		return $.fn.tableList(option);
	};

	/*加载表格和分页*/
	var GetTable = function (options) {
	    var totalPage = "";
	    this.doUrl = options.url;
	    this.el =  options.pageId;
	    this.param =  options.param;
	    this.listFun =  options.callback;
	    this.tbodyId =  options.tbodyId;
	    this.lastPage =  options.currentPage;
	    this.loadEle =  options.loadId;
	    this.showDataBox =  options.showDataBox;
		this.dataTip = options.dataTip;
		this.method = options.method;
		this.dataImg = options.dataImg;
		this.showDefaultTabel = options.showDefaultTabel;
		this.showPageTool = options.showPageTool;
		this.pageNum = options.pageNum;
		this.targetId = options.targetId;
	}
	
	GetTable.prototype = {
	    //初始化表格
	    init: function (options) {
	        var param = this.param;
	        this.getListAjax(param);
	        if(this.el.parent().find("#nodata").size()){
	        	this.el.parent().find("#nodata").remove();
	        }
	    },
	    //默认加载表格
	    getListAjax: function () {
	        var _this = this;
	        var doUrl = this.doUrl;
	        var method = this.method;
	        var lastPage = this.lastPage;
	        var loadEle = this.loadEle;
	        var param = this.param;
	        if(_this.showDefaultTabel){
	        	_this.tbodyId.html("");
            	new Loading(this.loadEle, {}, _this.el).init();//加载中
            }
        	
	        if(isNullOrEmpty(lastPage)){
	        	lastPage = 1;
	        };
	        param["page"] = lastPage;
	        $.kf.ajax({
	            type: method,
	            url: doUrl,
	            data: param,
	            dataType: "json",
	            processResponse: function (data) {
	                totalPage = Number(data.total); //获取总条数
	                _this.totalPage = totalPage;
	                if (isNullOrEmpty(_this.totalPage)) {
	                    _this.totalPage = 0;
	                }
	                $(".pageTotalDiv").remove();
	                //页数
	                if(!$.isNumeric(_this.totalPage)){
			        	_this.totalPage = 0;
			        }
			        _this.el.find("ul").prepend("<li class='first-page-li'><span>共" + _this.totalPage + "条</span></li>");
			        _this.el.find(".ui-paging-toolbar").prepend("<span>跳转到:</span>");
			        if(_this.el.parents(".page-content-par").find(".allListSo").size()){
			        	_this.el.parents(".page-content-par").find(".allListSo").after("<div class='row allList pageTotalDiv'><div class='hang-title'>共<span class='pageTotal'>"+_this.totalPage+"</span>条结果</div></div>");
			        }else if(_this.el.parents(".page-content-par").find(".allList").size()){
			        	_this.el.parents(".page-content-par").find(".allList").after("<div class='row allList pageTotalDiv'><div class='hang-title'>共<span class='pageTotal'>"+_this.totalPage+"</span>条结果</div></div>");
			        }else{
			        	//针对我的筛选没有#allListSo的情况
			        	$("#mySelectPage").text(_this.totalPage);
			        }
	                
	                if(_this.showDefaultTabel){
	                	new Loading(_this.loadEle, {}, _this.el).close();//关闭加载中
	                	if(_this.checkData(data)){//检测是否有数据
	                		_this.listFun(data); //callback
		                	_this.getPage(param); //加载分页
	                	} 
	                	
	                }else{
	                	if(totalPage != 0){
	                		_this.getPage(param); //加载分页
	                	}
	                }
	            }
	        });
	    },
	    //点击分页时，重新加载表格
	    getPageAjax: function (param) {
	        var _this = this;
	        var doUrl = this.doUrl;
	        var method = this.method;
	        var loadEle = this.loadEle;
	        new Loading(loadEle, {}, _this.el).init();
	        $.kf.ajax({
	            type: method,
	            url: doUrl,
	            data: param,
	            dataType: "json",
	            processResponse: function (data) {
	                _this.listFun(data);
	                var _name = _this.targetId;
	                if(!isNullOrEmpty(_name)){
	                	var offsetTop = $("#"+_name).offset().top;//当前元素在body中的offsetTop值
			        	document.getElementById(_name).scrollIntoView(true);//显示锚点元素到顶栏
			        	var _top = $(document).scrollTop();
			        	_top = _top - 123;//123是clearHeight+$(#_name)的margin-top值；
			        	//console.log(offsetTop+":"+$(document).scrollTop());
			        	if(offsetTop == $(document).scrollTop()){
			        		//根据name元素重新定位页面位置;
			        		$(document).scrollTop(_top);
			        	}
	                }
	                new Loading(_this.loadEle, {}, _this.el).close();
	            }
	        });
	    },
	    //加载分页
	    getPage: function (param) {
	        var _this = this;
	        var tbodyId = this.tbodyId;
	        var lastPage = this.lastPage;
	        if(isNullOrEmpty(lastPage)){
	        	lastPage = 1;
	        };
	        if(!this.showPageTool){
	        	this.el.hide();
	        };
	        this.el.empty().html("");
	        this.el.Paging({
	            pagesize: _this.pageNum, //默认表格行数
	            count: _this.totalPage,
	            current:lastPage,
	            callback: function (page, size, count) {//'当前第 ' +page +'页,每页 '+size+'条,总页数：'+count+'页'
	                param["page"] = page;
	                
	                /*  综合筛选  */
	                $("#fixedTable").html("");
			        $("#searchList2Header").html("");
			        $("#searchList2").html("");
			        /*  综合筛选  */
			        
	                _this.tbodyId.html("");
	                _this.getPageAjax(param);
	                $('.pageTotalDiv').remove();
	                _this.el.find("ul").prepend("<li class='first-page-li'><span>共" + _this.totalPage + "条</span></li>");
	                _this.el.find(".ui-paging-toolbar").prepend("<span>跳转到:</span>");
	                if(_this.el.parents(".page-content-par").find(".allListSo").size()){
			        	_this.el.parents(".page-content-par").find(".allListSo").after("<div class='row allList pageTotalDiv'><div class='hang-title'>共<span class='pageTotal'>"+_this.totalPage+"</span>条结果</div></div>");
			        }else if(_this.el.parents(".page-content-par").find(".allList").size()){
			        	_this.el.parents(".page-content-par").find(".allList").after("<div class='row allList pageTotalDiv'><div class='hang-title'>共<span class='pageTotal'>"+_this.totalPage+"</span>条结果</div></div>");
			        }else{
			        	//针对我的筛选没有#allListSo的情况
			        	$("#mySelectPage").text(_this.totalPage);
			        }
			    },
	           toolbar:true
	        });
	    },
	    //check表格是否有数据
	    checkData: function (data) {
	    	var _flg = true;
	        var _this = this;
	        var el = this.el;
	        _this.el.parent().find("#nodata").remove();
	        _this.el.show();
	        if (data.data.length == 0) {
	        	if(this.showDataBox){
	        		var html = "";
		        	if(!_this.dataImg){
		        		html += "<div id='nodata'>";
			            html += "<p class='notDateTit'>"+ _this.dataTip.title +"</p>";
			            html += "<span class='notDateCon'>"+ _this.dataTip.subtitle +"</span>";
			            html += "</div>";	
		        	}else{
		        		html += "<div id='nodata'>";
			        	html += "<img src='../../assets/admin/layout/img/nodata.png' />";
			            html += "<p class='notDateTit'>"+ _this.dataTip.title +"</p>";
			            html += "<span class='notDateCon'>"+ _this.dataTip.subtitle +"</span>";
			            html += "</div>";
		        	}
		            _this.el.before(html);
	        	}
	            _this.el.hide();
	            _flg = false;
	        };
	        return _flg;
	    }
	}
	/*
 
	 * 
	 * 
	 * 
	 * 加载中。。。
	 * 
	 * 
	 * */
	var Loading = function (el, options, pageId) {//加载中父标签,obj,分页ID
	    this.el = el;
	    this.options = options;
	    this.pageId = pageId;
	}
	
	Loading.prototype = {
	    init: function () {//显示化加载中
	        var _this = this;
	        //针对财报的加载中样式
	       /* $(".my-wrapTable").css("border", "0");*/
	        var html = "";
	        $(_this.el).find(".mask-in").remove();
	        html += "<div class='mask-in'>";
	        html += "<img src='../../assets/admin/layout/img/load.gif' />";
	        html += "<p></p>";
	        html += "</div>";
	        $(_this.el).append(html);
	        $(_this.el).height(300+"px");
	        if (!isNullOrEmpty(_this.pageId)) {
	            _this.pageId.hide();
	        };
	    },
	    close: function () {//关闭加载中
	        var _this = this;
	        //针对财报的加载中样式
	        /*$(".my-wrapTable").css("border", "1px solid #ddd");*/
	        $(_this.el).find(".mask-in").remove();
	        $(_this.el).height("auto");
	        if (!isNullOrEmpty(_this.pageId)) {
	            _this.pageId.show();
	        }
	    }
	}
})(jQuery);
