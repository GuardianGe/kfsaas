
/*我的三板慧*/
var versionDetail = function () {
	
	/*内容写入*/
    var versionContent = function () {
        /*版本信息*/
        $.kf.ajax({
            type: "get",
            url: $.kf.VERSIONINFO,
            data: "",
            dataType: "json",
            processResponse: function (data) {
                var data = data.data;
                getInfoFun(data);
            }
        });
        //写入页面信息
        function getInfoFun(data) {
            $(".versionTit").text(data.versionNumber);//版本号
            $(".versionCon").html(data.content)//内容
        }
    }
    return{
    	init:function(){
    		versionContent();
    	}
    }
}();
