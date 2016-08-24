$(document).ready(function(){
	$('#thm-rev-slider').show().revolution({//购物车显示
		dottedOverlay: 'none',
		delay: 5000,
		startwidth: 0,
		startheight:570,
		hideThumbs: 200,
		thumbWidth: 200,
		thumbHeight: 50,
		thumbAmount: 2,
		navigationType: 'thumb',
		navigationArrows: 'solo',
		navigationStyle: 'round',
		touchenabled: 'on',
		onHoverStop: 'on',
		swipe_velocity: 0.7,
		swipe_min_touches: 1,
		swipe_max_touches: 1,
		drag_block_vertical: false,
		spinner: 'spinner0',
		keyboardNavigation: 'off',
		navigationHAlign: 'center',
		navigationVAlign: 'bottom',
		navigationHOffset: 0,
		navigationVOffset: 20,
		soloArrowLeftHalign: 'left',
		soloArrowLeftValign: 'center',
		soloArrowLeftHOffset: 20,
		soloArrowLeftVOffset: 0,
		soloArrowRightHalign: 'right',
		soloArrowRightValign: 'center',
		soloArrowRightHOffset: 20,
		soloArrowRightVOffset: 0,
		shadow: 0,
		fullWidth: 'on',
		fullScreen: 'on',
		stopLoop: 'off',
		stopAfterLoops: -1,
		stopAtSlide: -1,
		shuffle: 'off',
		autoHeight: 'on',
		forceFullWidth: 'off',
		fullScreenAlignForce: 'off',
		minFullScreenHeight: 0,
		hideNavDelayOnMobile: 1500,
		hideThumbsOnMobile: 'off',
		hideBulletsOnMobile: 'off',
		hideArrowsOnMobile: 'off',
		hideThumbsUnderResolution: 0,
		hideSliderAtLimit: 0,
		hideCaptionAtLimit: 0,
		hideAllCaptionAtLilmit: 0,
		startWithSlide: 0,
		fullScreenOffsetContainer: ''
	});

});

function removeCartItem(self){
	var id = $(self).data('id');
	var tr = $('.cart-item-'+ id);
	var minitr = $('item .minicart-item-'+id);
	$.ajax({
		type : 'DELETE',
		url : '/removecartitem?id='+id
	})
	.done(function(result) {
		if(result.success){
			if(tr) {
				tr.remove();
			}
			if(minitr) {
				minitr.delete(minitr);
			}
		}
		else
			alert("移除购物车项目失败！");
	});
}

function addToCart(self){
	var id = $(self).data('id');
	var qty;
	var minicart = $('#cart-sidebar');
	var cartprice = $('#minicartprice');
	var strhtml = '';
	if($(self).data('qty'))
		qty = $(self).data('qty');
	else
		qty = $('#qty').val();
	$.ajax({
		type : 'PUT',
		url : '/addtocart?id='+id+'&qty='+qty
	})
	.done(function(result){
		if(result.success){
			if(result.cart){
				for(var i = 0; i < result.cart.length; i++){
					var one = result.cart[i];
					strhtml += '<li class="item .minicart-item-'+one.product._id+'">'
								+'<div class="item-inner"><a title="电脑2" href="/productdetail/'+one.product._id+'" class="product-image">';
					if(one.product.image)
						strhtml += '<img src="'+one.product.image.url+'"></a>';
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
		else
			alert("加入购物车失败了！");
	});
}