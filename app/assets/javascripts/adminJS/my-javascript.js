$(function(){
	$('#btn-add-time').click(function(e) {
		var from = $('#input-time-from').val();
		var to = $('#input-time-to').val();
		var price = $('#input-price').val();
		
		if(from == "" || to == "" || price == ""){
			alert("Định dạng giờ hoặc giá không hợp lệ . Vui lòng nhập theo định dạng 12:00PM và 100.000 VND/h");
		}else{
			var td_from = "<td>" + from + "</td>";
			var td_to = "<td>" + to  + "</td>";
			var td_price = "<td>" + price  + "</td>";
			var td_btn = '<td><a my-id="btn-delete-time" class="btn btn-danger"><span class="icon_trash"></span></a></td>';
			var tr = "<tr>" + td_from + td_to + td_price + td_btn +"</tr>"
			$('#time-table tbody').prepend(tr);
			//Nếu table đã ẩn hiện nó lên
			if($('#time-table').css('display') == 'none'){
				$('#time-table').show(500);
			}
			
			//Clear giá trị của các input
			$('#input-time-from').val("");
			$('#input-time-to').val("");
			$('#input-price').val("");
		}
	});	
	
	$("tr td").on("click", "a[my-id='btn-delete-time']", function(){
		 $(this).parents("tr").remove();
		//Xóa table khi ko còn dòng nào
		if($('#time-table tbody tr').size() == 0){
			$('#time-table').hide(500);
		}
		
	});
	
	
});