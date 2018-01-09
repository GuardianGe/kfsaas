
/*站内信*/
var standLetter = function () {
	
	/*内容写入*/
    var standLetterCon = function () {
        var _url = $.kf.GETMESSAGELIST;
        $.getTable({
        	url:_url,//url
	    	pageId:$("#pageToolMsg"),//分页id
	    	callback:standList,//callback
	    	tbodyId:$("#standLetter")//tbody的id,
        })

        /***table***/
        function standList(data) {
            var list = data.data;
            var tr = "";
            $("#standLetter").html("");
            $(list).each(function (i) {
                tr += "<tr>";
                tr += "<td><input type='checkbox'/></td>";
                if (list[i].isRead == 1) {
                	if(!isNullOrEmpty(list[i].url)){
                		tr += "<td><a class='letterTit text-default' target='_blank'  set_id='" + list[i].id + "' href='"+list[i].url+"'>" + list[i].title + "</td>";
                	}else{
                		tr += "<td><a class='letterTit text-default' set_id='" + list[i].id + "' href='" + $.url.letterDetailsUrl() + "id=" + list[i].id + '&name=letter' + "'>" + list[i].title + "</td>";
                	}
                    tr += "<td>已读</td>";
                } else {
                	if(!isNullOrEmpty(list[i].url)){
                		tr += "<td><a class='letterTit' target='_blank' set_id='" + list[i].id + "' href='"+list[i].url+"'>" + list[i].title + "</td>";
                	}else{
                		tr += "<td><a class='letterTit' set_id='" + list[i].id + "' href='" + $.url.letterDetailsUrl() + "id=" + list[i].id + "&name=letter" + "'>" + list[i].title + "</td>";
                	}
                    tr += "<td>未读</td>";
                }
                tr += "<td>" + list[i].sendUser + "</td>";
                tr += "<td>" + list[i].date + "</td>";
                tr += "<td><a class='delMessage' id_del='" + list[i].id + "' data-toggle='modal' data-target='#myModal'>删除</a></td>";
                tr += "</tr>";
            });
            $("#standLetter").append(tr);
            delMessage();
            allDel();
            tagRead();
        }
        ;

        //全选
        $("#allChecked").on("click", function () {
            var setC = $(this).attr("data-set");
            if ($(this).attr("checked") == "checked") {
                $(setC).attr("checked", true)
            } else {
                $(setC).attr("checked", false)
            }
        })

        //删除
        var delMessage = function () {
            $(".delMessage").on("click", function () {
                var mythis = $(this);
                $("#delTr").on("click", function () {
                    $("#myModal").modal("hide")
                    //post 提交
                    var param = {
                        messageIds: mythis.attr("id_del")
                    }
                    $.kf.ajax({
                        type: "post",
                        url: $.kf.DELMESSAGE,
                        data: param,
                        dataType: "json",
                        processResponse: function (data) {
                            //删除
                            window.location.href = window.location.href;
                        }
                    });
                })

            })
        }

        //全选删除
        var allDel = function () {
            $("#allDel").on("click", function () {
                var arr = [];
                var letterTit;
                //$("#myModal").modal("hide");
                $("#standLetter input:checkbox").each(function () {
                    if ($(this).attr("checked") == "checked") {
                        $("#myModal").modal("show")
                        letterTit = $(this).parents("td").next("td").children("a").attr("set_id");
                        arr.push(letterTit);
                    } else {
                        return false;
                    }
                });
                $("#delTr").on("click", function () {

                    $("#standLetter").empty();
                    //post 提交
                    var param = {
                        messageIds: JSON.stringify(arr)
                    }
                    $.kf.ajax({
                        type: "post",
                        url: $.kf.DELMESSAGE,
                        data: param,
                        dataType: "json",
                        processResponse: function (data) {
                            $("#myModal").modal("hide");
                            location.reload();
                        }
                    });

                })

            })
        }

        //标记
        var tagRead = function () {
            $(".letterTit").each(function () {
                $(this).on("click", function () {
                    var set_id = $(this).attr("set_id");
                    //post 提交
                    var param = {
                        messageIds: set_id
                    }
                    $.kf.ajax({
                        type: "post",
                        url: $.kf.READMESSAGE,
                        data: param,
                        dataType: "json",
                        processResponse: function (data) {
							
                        }
                    });
                })
            })
            //全部标记
            $("#tagRead").on("click", function () {
                var arr = [];
                var letterTit;
                $("#standLetter input:checkbox").each(function () {
                    if ($(this).attr("checked") == "checked") {
                        letterTit = $(this).parents("td").next("td").children("a").attr("set_id");
                        $(this).parents("td").next("td").children("a").addClass("text-default");
                        $(this).parents("tr").find("td").eq(2).text("已读");
                        arr.push(letterTit);
                    }
                })

                //post 提交
                var param = {
                    messageIds: JSON.stringify(arr)
                }
                $.kf.ajax({
                    type: "post",
                    url: $.kf.READMESSAGE,
                    data: param,
                    dataType: "json",
                    processResponse: function (data) {
						window.location.href = window.location.href;
                    }
                });
            })
        }
    }
    return{
    	init:function(){
    		standLetterCon();
    	}
    }
}();
