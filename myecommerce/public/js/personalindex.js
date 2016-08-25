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
			layer.msg("个人信息修改成功！");
			window.location.href='/personalindex';
		}
		else
			layer.msg("修改失败！");
	});
}

function checkDetail(self){
	var oid = $(self).data('id');
	var oprice = $(self).data('price');
	var ofinish = $(self).data('finish');

	if(oid){
		$.ajax({
			type : 'GET',
			url : '/getorderdetail',
			data : {id : oid}
		})
		.done(function(result) {
			if(result.success){
				var str = '';
				if(result.order_items && result.order_items.length > 0){
					str += '<table class="table" style="padding:20px">'
						+ '<tr><td>订单号：</td><td>'+oid+'</td></tr>'
						+ '<tr><td>总价：</td><td>'+oprice+'</td></tr>';
					for(var i = 0; i < result.order_items.length; i++){
						if(!result.order_items[i].imageurl)
							result.order_items[i].imageurl = '/product-image/p1.jpg';
						str += '<tr><td><a title="'+result.order_items[i].name+'" href="/productdetail/'+result.order_items[i].product+'" class="product-image"><img style="width:60px;height:60px" src="'+result.order_items[i].imageurl+'"></a></td>'
							+ '<td><p class="product-name"><a href="/productdetail/'+result.order_items[i].product+'">'+result.order_items[i].name+'</a></p></td>'
							+ '<td><strong>'+result.order_items[i].qty+'</strong>x<span class="price">￥'+result.order_items[i].price+'</span></td>'
							+ '</tr>';
					}
					str += '</table>';
				}
				else
					str += '订单里竟然是空的。。。。';
				if(ofinish)
					layer.open({
						type: 1,
						title: "订单详情",
						skin: 'layui-layer-molv', //样式类名
						btn: ['取消'],
						area: ['540px', '415px'],
						shift: 2,
						shadeClose: true, //开启遮罩关闭
						content: str
					});
				else
					layer.open({
						type: 1,
						title: "订单详情",
						skin: 'layui-layer-molv', //样式类名
						area: ['540px', '415px'],
						shift: 2,
						shadeClose: true, //开启遮罩关闭
						content: str,
						btn: ['确认收货', '取消'],
						yes: function (){
							if(oid){
								$.ajax({
									type : 'PUT',
									url : '/confirmorder',
									data : {id : oid}
								})
								.done(function(result) {
									if(result.success){
										layer.msg("确认收货成功！");
										window.location.href='/personalindex';
									}
									else
										layer.msg("确实收获失败！");
								});
							}
						}
					});
			}
			else
				alert("修改失败！");
		});
	}
}

function confirmOrder(id){
	if(id){
		$.ajax({
			type : 'PUT',
			url : '/confirmorder',
			data : {id : id}
		})
		.done(function(result) {
			if(result.success){
				layer.msg("确认收货成功！");
			}
			else
				layer.msg("确实收获失败！");
		});
	}
}

function getOrderPage(p){
	var oid = $(self).data('id');
	if(p){
		$.ajax({
			type : 'GET',
			url : '/getorderbyp',
			data : {p : p}
		})
		.done(function(result) {
			if(result.success && result.presult){//页码更新
				var str = '';
				if(result.presult.previous)
					str += '<li><a href="javascript:void(0)" onclick="getOrderPage('+result.presult.previous+')">«</a>';
				else
					str += '<li><a href="javascript:void(0)" onclick="layer.msg(&quot;这已经是第一页了！&quot;);">«</a>';
				for(var i = 0; i < result.presult.totalPages; i++)
					if(result.presult.currentPage === (i+1))
						str += '<li class="active"><a href="javascript:void(0)">'+(i+1)+'</a></li>';
					else
						str += '<li><a href="javascript:void(0)" onclick="getOrderPage('+(i+1)+')">'+(i+1)+'</a></li>';
				str += '</li>';
				if(result.presult.next)
					str += '<li><a href="javascript:void(0)" onclick="getOrderPage('+result.presult.next+')">»</a>';
				else
					str += '<li><a href="javascript:void(0)" onclick="layer.msg(&quot;这已经是最后一页了！&quot;);">»</a>';
				str += '</li>';
				$('#paginatebtn').html(str);

				str = '';
				for(var i = 0; i < result.presult.results.length; i++){
					str += '<tr><td>'+result.presult.results[i]._id+'</td>'
						+ '<td>'+result.presult.results[i].address+'</td>'
						+ '<td>'+result.presult.results[i].phone+'</td>'
						+ '<td>'+result.presult.results[i].totalprice+'</td>';
					if(result.presult.results[i].finish)
						str += '<td><p style="color:green">已完成</p></td>';
					else
						str += '<td><p style="color:red">未完成</p></td>';
					str += '<td><a href="javascript:void(0)" onclick="checkDetail(this)" data-id="'+result.presult.results[i]._id+'" data-price="'+result.presult.results[i].totalprice+'" data-finish="'+result.presult.results[i].finish+'" class="btn">查看</a></td></tr>';
				}
				$('#ordertbody').html(str);
			}
			else
				layer.msg("获取失败！");
		});
	}
}