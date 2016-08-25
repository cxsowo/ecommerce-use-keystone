var keystone = require('keystone'),
	Cart = keystone.list('Cart'),
	Category = keystone.list('Category'),
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
							datas.cartprice = sum;
						})
						.then(
							function(){
								User.model.findOne({
									_id : req.user._id
								}).exec(function(err, result){
									if(err) throw err;

									view.render('shoppingcart',{
										title : "购物车",
										categories : datas.categories,
										cart : datas.cart,
										cartprice : datas.cartprice
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

exports.deleteItem = function(req, res){
	var id = req.query.id;
	if(!id)
		res.json({success : 0});
	else{
		Cart.model.remove({
			user : req.user._id,
			product : id
		}).exec(function(err, result){
			if(err) throw err;
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
					res.json({
						success : 1,
						cart : result,
						cartprice : sum
					});
				})
			res.json({success : 1});
		})
	}
}

exports.addToCart = function(req, res) {

	var view = new keystone.View(req, res);
	var id = req.query.id;
	var qty = req.query.qty;

	if(!qty || !id || qty < 1){
		console.log("更新购物车商品错误！qty:"+qty+",id:"+id);
		res.json({success:0});
	}
	else{
		Product.model.findOne({_id: id})
			.exec(function(err, result){
				console.log("要更新购物车了:"+result);
				if(err) console.error(err);
				if(result){
					Cart.model.update({
							user : req.user._id,
							product : id
						},{
							qty : parseInt(qty)
						},{
							upsert  : true//设置成没找到就插入
						},function (err, raw) {
							if(err) console.error(err);

							//res.json({success:1});
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
										res.json({
											success : 1,
											cart : result,
											cartprice : sum
										});
									})
						});
				}
			});
	}
}

exports.clearCart = function(req, res){
	Cart.model.remove({
		user : req.user._id
	}).exec(function(err, result){
		if(err) throw err;
		res.json({success : 1});
	})
}

