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
				layer.msg("地址修改成功！");
			}
			else
				layer.msg("修改失败！");
		});
	else
		layer.msg("地址是空的啊0o0");
}

function payIt(){
	var addressinput = $('#address');
	$.ajax({
		type : 'POST',
		url : '/createorder'
	})
	.done(function(result) {
		if(result.success){
			layer.msg("付款成功！");
			window.location.href='/personalindex';
		}
		else
			layer.msg("订单创建失败！注意要有邮箱、手机和商品~");
	});
}