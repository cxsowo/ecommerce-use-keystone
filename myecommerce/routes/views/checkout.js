var keystone = require('keystone'),
	Cart = keystone.list('Cart'),
	Order = keystone.list('Order'),
	Category = keystone.list('Category'),
	OrderItem = keystone.list('OrderItem'),
	Product = keystone.list('Product'),
	User = keystone.list('User');

//exports = module.exports = User;
exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res);
	var datas = {};
	Category.model.find()
		.exec(function(err,result){
			if(err) throw err;
			datas.categories = result;
		})
		.then(
			function(){
				if(req.user){
					Cart.model.find({
						user : req.user._id
						})
						.populate('product')
						.exec(function(err, result){
							if(err) throw err;

							var sum = 0;
							for(var i = 0; i < result.length; i++){
								sum += result[i].product.price*result[i].qty;
							}
							datas.cart = result;
							datas.cartprice = sum.toFixed(2);
						})
						.then(
							function(){
								User.model.findOne({
									_id : req.user._id
								}).exec(function(err, result){
									if(err) throw err;

									view.render('checkout',{
										title : "结算",
										categories : datas.categories,
										cart : datas.cart,
										cartprice : datas.cartprice,
										address : result.address,
										phone : result.phone
									});
								})
							}
							,function(err){
								throw err;
							}
						)
				}
			},
			function(err){
				throw err;
			}
		)
}

exports.checkOutPay = function(req, res){
	var datas = {};
	User.model.findOne({
			_id : req.user._id
		}).exec(function(err, result){
			if(err) throw err;

			if(!result.address)
				res.json({success:0});
			else{
				var address = result.address;
				var phone = result.phone;
				Cart.model.find({
					user : req.user._id
				})
				.populate('product')
				.exec(function(err, cart){
					if(err) throw err;

					if(cart && cart.length > 0){
						var i,sum = 0;
						for(i = 0; i < cart.length; i++){
							sum += cart[i].product.price*cart[i].qty;
						}

						var newOrder = Order.model({
							user: req.user._id,
							totalprice: sum.toFixed(2),
							address: address,
							phone: phone,
							finish: false
						})
						newOrder.save(function(err, isSuccess){
							if(err) console.error(err);
							if(isSuccess){
								var orderid = newOrder._id;
								for(var i = 0; i < cart.length; i++){
									var imageurl = '';
									if(cart[i].product.image)
										imageurl = cart[i].product.image.url;
									var newOrderItem = new OrderItem.model({
										order: orderid,
										product: cart[i].product._id,
										qty: cart[i].qty,
										price: cart[i].product.price.toFixed(2),
										name: cart[i].product.name,
										imageurl: imageurl
									});
									newOrderItem.save();
								}
								Cart.model.remove({
									user : req.user._id
								}).exec(function(err, result){
									if(err) throw err;
									res.json({success : 1});
								})
							}
							else{
								console.log("订单创建失败了？？？");
								res.json({success:0});
							}
						});
					}
				})
			}
		});
}


