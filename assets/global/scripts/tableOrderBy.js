var TableManaged = function () {

    var initTable1 = function () {

        var table = $('#tableOne_1');

	    var securities = "";
		var province = "";
		var industry = "";
		var finance = "";
		var keyword = "";
		var start_time = "";
		var stop_time = "";
		var mode = "";
		var type = "";
		var _url = $.kf.GETCOMPANYLISTEDLIST + "?" + "&securities=" + securities + "&province=" + province + "&industry=" + industry + "&finance=" + finance + "&keyword=" + keyword + "&start_time=" + start_time + "&stop_time=" + stop_time + "&mode=" + mode + "&type=" + type;
    	var dataList = '';
    	function ad(){
    		var list= '';
    		$.ajax({
	    		type:"get",
	    		url:_url,
	    		async:false,
	    		success:function(data){
	    			list = data.data;
	    			
	    		}
	    	});
	    	return list;
    	}
		dataList = ad();
        table.dataTable({
			data:dataList,
			columns: [
	            { data: 'code' },
	            { data: 'shortname' },
	            { data: 'current_price' },
	            { data: 'industry' },
	            { data: 'level' },
	            { data: 'listingDateMachine' },
	            { data: 'market' },
	            { data: 'mode' },
	            { data: 'special' },
	            { data: 'area' }
	        ]
	        
        });

        var tableWrapper = jQuery('#sample_1_wrapper');

        table.find('.group-checkable').change(function () {
            var set = jQuery(this).attr("data-set");
            var checked = jQuery(this).is(":checked");
            jQuery(set).each(function () {
                if (checked) {
                    $(this).attr("checked", true);
                    $(this).parents('tr').addClass("active");
                } else {
                    $(this).attr("checked", false);
                    $(this).parents('tr').removeClass("active");
                }
            });
            jQuery.uniform.update(set);
        });

        table.on('change', 'tbody tr .checkboxes', function () {
            $(this).parents('tr').toggleClass("active");
        });

        tableWrapper.find('.dataTables_length select').addClass("form-control input-xsmall input-inline"); // modify table per page dropdown
    }


    return {

        //main function to initiate the module
        init: function () {
            if (!jQuery().dataTable) {
                return;
            }
            initTable1();
        }

    };

}();