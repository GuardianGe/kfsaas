
/*意见反馈*/
var feedback = function () {
	
	/*内容写入*/
    var feedbackCon = function () {
        $.kf.ajax({
            type: "get",
            url: $.kf.MESSAGETYPE,
            data: "",
            dataType: "json",
            processResponse: function (data) {
                var result = data.data;
                var ta = "";
                var tb = "";
                var tc = "";
                for (var i = 0; i < result.b01.length; i++) {
                    ta += "<li><a data-toggle='modal' data-name='1' class='myModalBack'  data-target='#myModal02' name='" + result.b01[i].message_id + "'>" + result.b01[i].message_type + "</a></li>"
                }
                for (var i = 0; i < result.b02.length; i++) {
                    tb += "<li><a data-toggle='modal' data-name='2'  class='myModalBack'  data-target='#myModal02' name='" + result.b02[i].message_id + "'>" + result.b02[i].message_type + "</a></li>"
                }
                for (var i = 0; i < result.b03.length; i++) {
                    tc += "<li><a data-toggle='modal' data-name='3'  class='myModalBack'  data-target='#myModal02' name='" + result.b03[i].message_id + "'>" + result.b03[i].message_type + "</a></li>"
                }
                $("#submitXq").append(ta);
                $("#submitXq2").append(tb);
                $("#submitXq3").append(tc);
                $(".myModalBack").on("click", function () {
                    var _name = $(this).attr("data-name");
                    if (_name == '1') {
                        $("#myModalLabel").text("提交需求");
                    }
                    if (_name == '2') {
                        $("#myModalLabel").text("如何使用");
                    }
                    if (_name == '3') {
                        $("#myModalLabel").text("发现问题");
                    }
                });

                //点击弹窗获取内容
                var thisText = "";
                $(".submitXq a").on("click", function () {
                    $(".feedbackMap").text($(this).text())
                    thisText = $(this).attr("name");
                })

                //提交
                $("#fbBtn").on("click", function () {
                    var typeId = $('#menu1Feed option:selected').val();
                    //上送参数
                    var param = {
                        related_section_id: typeId,
                        message_type_id: thisText,
                        content: $(".feedbackCon textarea").val(),
                    }

                    if (trimAll($(".feedbackCon textarea").val()) == "") {
                        return false;
                    } else {
                        $("#myModal02").modal("hide");
                        $.kf.ajax({
                            type: "post",
                            url: $.kf.FEEDBACK,
                            data: param,
                            dataType: "json",
                            processResponse: function (data) {
                                if (data.code == 0) {
                                    $("#fbError01").text("")
                                    $("#content2").fadeIn().delay(3000).fadeOut();
                                    $(".feedbackCon textarea").val("");
                                    $(".count span").text("0");
                                } else {
                                    $("#fbError01").text(data.message)
                                }
                            }
                        });
                    }
                })
            }

        });

        $.kf.ajax({
            type: "get",
            url: $.kf.INTERNALSECTION,
            data: "",
            dataType: "json",
            processResponse: function (data) {
                var result = data.data;
                var td = "";
                for (var i = 1; i < result.length; i++) {
                    td += "<option value='" + result[i].related_section_id + "'>" + result[i].related_section + "</option>"
                }
                $("#menu1Feed").append(td);
                $("#select2-chosen-1").text("新三板");
            }
        });

        var num = $(".feedbackCon textarea").val().length;
        $(".count span").text(num);
        $(".feedbackCon textarea").on("keyup", function () {//
            var numT = $(".feedbackCon textarea").val().length;
            if (trim(numT != "")) {
                $("#fbBtn").addClass("btn-primary").removeClass("default");
                $(".count span").text(numT);
            }
            if ($(".count span").text() == 0) {
                $("#fbBtn").addClass("default").removeClass("btn-primary");
            }
        })


        //反馈
        function feedbackList() {
            $.kf.ajax({
                type: "get",
                url: $.kf.INTERNALSECTION,
                data: "",
                dataType: "json",
                processResponse: function (data) {
                    var result = data.data;
                    var td = "";
                    for (var i = 1; i < result.length; i++) {
                        td += "<option value='" + result[i].related_section_id + "'>" + result[i].related_section + "</option>"
                    }
                    $("#menu1Feed").append(td);
                }
            });
        }
        var feedbackListCon = function () {
            $("#feedbackListCon").html("");
            $.kf.ajax({
                type: "get",
                url: $.kf.GETFEEDBACK,
                data: "",
                dataType: "json",
                processResponse: function (data) {
                    var result = data.data;
                    var td = "";
                    for (var i = 0; i < result.length; i++) {
                        td += "<li>";
                        td += "<div style='overflow:hidden;margin-bottom:20px;'><ul><li style='width:80px;vertical-align:baseline;'>我的问题：</li><li style='width:88%;overflow:hidden;'>" + result[i].content + "<span style='padding-left:60px;white-space:nowrap;'>" + result[i].sendTime + "</span></li></div>";
                        if (!isNullOrEmpty(result[i].replyContent)) {
                            td += "<div style='overflow:hidden;'><ul><li style='width:80px;vertical-align:baseline;color:#f77e44;'>慧君回复：</li><li style='width:88%;overflow:hidden;color:#f77e44;'>" + result[i].replyContent;
                            td += "<p class='pdr text-right' style='color: #999999;white-space:nowrap;color:#f77e44;'>" + result[i].replyTime + "</p></li></ul></div>"
                        }
                        td += "</li>";
                    }
                    $("#feedbackListCon").append(td);
                }
            });
        }
        //tab点击事件
        $("#feedbackNew").click(function () {
            $(".feedbackNew").removeClass("hide").siblings("div").addClass("hide");
        })
        $("#feedbackList").click(function () {
            $(".feedbackList").removeClass("hide").siblings("div").addClass("hide");
            feedbackListCon();
        })
    }
    return{
    	init:function(){
    		feedbackCon();
    	}
    }
}();
