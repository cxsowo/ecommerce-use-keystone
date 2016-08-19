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
	var minitr = $('.minicart-item-'+id);
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
				minitr.remove(minitr);
			}
		}
		else
			alert("移除购物车项目失败！");
	});
}

function addToCart(self){
	var id = $(self).data('id');
	var qty;
	if($(self).data('qty'))
		qty = $(self).data('qty');
	else
		qty = $('#qty').val();
	$.ajax({
		type : 'PUT',
		url : '/addtocart?id='+id+'&qty='+qty
	});
}