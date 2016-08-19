function submitChangeUserInfo(){
	var datas = {};
	datas.name = $('#username').val();
	datas.address = $('#useraddress').val();
	datas.phone = $('#userphone').val();

	$.ajax({
		type : 'PUT',
		url : '/changeuserinfo',
		data : datas
	})
	.done(function(result) {
		if(result.success){
			alert("个人信息修改成功！");
		}
		else
			alert("修改失败！");
	});
}