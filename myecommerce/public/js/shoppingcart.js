function updateMinicart(result){
	var minicart = $('#cart-sidebar');
	var cartprice = $('#minicartprice');
	var strhtml = '';
	if(result.cart && result.cart.length > 0){
		for(var i = 0; i < result.cart.length; i++){
			var one = result.cart[i];
			strhtml += '<li class="item .minicart-item-'+one.product._id+'">'
						+'<div class="item-inner"><a title="电脑2" href="/productdetail/'+one.product._id+'" class="product-image">';
			if(one.product.image)
				strhtml += '<img width="60px" height="60px" src="'+one.product.image.url+'"></a>';
			else
				strhtml += '<img src="/products-images/p1.jpg';
			strhtml += '<div class="product-details">'
					+'<div class="access"><a title="删除" href="javascript:void(0);" data-id="'+one.product._id+'" onclick="removeCartItem(this)" class="btn-remove1">删除</a>'
					+'</div>'
					+'<!-- access--><strong>'+one.qty+'</strong>x<span class="price">￥'+one.product.price+'</span>'
					+'<p class="product-name"><a href="/productdetail/'+one.product._id+'">'+one.product.name+'</a></p>'
					+'</div></div></li>';
		}
	}
	else{
		strhtml +=  '<ul id="cart-sidebar" class="mini-products-list">'
				+'<li class="item"><span>空荡荡的购物车O.O</span></li>'
				+'</ul>';
	}
	cartprice.html('￥'+result.cartprice);
	minicart.html(strhtml);
}

function cartAdd(self){
	// alert('加加加');
	$(self).css("disabled",true);
	var id = $(self).data('id');
	var qtyinput = $('#qty'+id);
	var trprice = $('.trprice'+id);
	if(!isNaN(qtyinput.val())){
		qtyinput.val(Number(qtyinput.val())+1);
		$.ajax({
			type : 'PUT',
			url : '/addtocart?id='+id+'&qty='+qtyinput.val()
		})
		.done(function(result) {
			if(result.success){
				var tprice = Number($('#cartprice').data('price'))+Number(trprice.data('price'));
				trprice.html(Number(trprice.data('price'))*Number(qtyinput.val()));
				$('#cartprice').html('￥'+result.cartprice);
				updateMinicart(result);
			}
			else
				alert("编辑购物车项目失败！");
			$(self).css("disabled",false);
		});
	}
	return false;
}

function cartReduce(self){
	$(self).css("disabled",true);
	var id = $(self).data('id');
	var qtyinput = $('#qty'+id);
	var trprice = $('.trprice'+id);
	if(!isNaN(qtyinput.val()) && qtyinput.val() > 1){
		qtyinput.val(Number(qtyinput.val())-1);
		$.ajax({
			type : 'PUT',
			url : '/addtocart?id='+id+'&qty='+qtyinput.val()
		})
		.done(function(result) {
			if(result.success){
				trprice.html(trprice.data('price')*Number(qtyinput.val()));
				$('#cartprice').html('￥'+result.cartprice);
				updateMinicart(result);
			}
			else
				alert("编辑购物车项目失败！");
			$(self).css("disabled",false);
		});
	}
	return false;
}

function clearCart(){
	$.ajax({
		type : 'DELETE',
		url : '/clearcart'
	})
	.done(function(result) {
		if(result.success){
			$('#cart-tbody').html('');
			$('#cartprice').html('￥0');
			result.cartprice = 0;
			updateMinicart(result);
		}
		else
			alert("清空购物车失败！");
	});
}