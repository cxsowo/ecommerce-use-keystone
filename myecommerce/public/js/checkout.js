function changeAddress(saveAddress){
	var address = $('#address').val();
	if(address)
		$.ajax({
			type : 'PUT',
			url : '/changeaddress',
			data : {address : address}
		})
		.done(function(result) {
			if(result.success){
				alert("地址修改成功！");
			}
			else
				alert("修改失败！");
		});
	else
		alert("地址是空的啊0o0");
}

function payIt(){
	var addressinput = $('#address');
	$.ajax({
		type : 'POST',
		url : '/createorder'
	})
	.done(function(result) {
		if(result.success){
			alert("订单创建成功！");
			window.location.href='/personalindex';
		}
		else
			alert("订单创建失败！注意要有邮箱、手机和商品~");
	});
}