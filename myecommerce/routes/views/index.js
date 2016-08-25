var keystone = require('keystone'),
	Cart = keystone.list('Cart'),
	Category = keystone.list('Category'),
	Product = keystone.list('Product'),
	Expand = keystone.list('Expand');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);

	var shopping_cart_price;
	var datas = {};

	Category.model.find()
		.exec(function(err,result){
			if(err) throw err;
			datas.categories = result;
		})
		.then(
			function(){
				Product.model.find()
					.sort({pv:-1})
					.limit(8)
					.exec(function(err, result){
						if(err) throw err;
						// for(one in result)
						// 	for(image in one.images)
						// 		image._.src({width: 300, height: 200, crop :"fill"});
						datas.hot_products = result;
					})
					.then(
						function(){
							Expand.model.find()
								.sort({updatedAt:-1})
								.limit(5)
								.exec(function(err, result){
									if(err) throw err;
									datas.expands = result;
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
													datas.cart = result;
													var sum = 0;
													for(var i = 0; i < result.length; i++){
														sum += result[i].product.price*result[i].qty;
													}
													datas.cartprice = (parseInt(sum*100))/100;
												})
												.then(
													function(){
														view.render('index',{
															title : "买买买",
															categories : datas.categories,
															cart : datas.cart,
															cartprice : datas.cartprice,
															hot_products : datas.hot_products,
															expands : datas.expands
														});
													}
													,function(err){
														throw err;
													}
												)
										}
										else{
											view.render('index',{
												title : "买买买",
												categories : datas.categories,
												cart : datas.cart,
												hot_products : datas.hot_products,
												expands : datas.expands
											});
										}
									},
									function(err){
										throw err;
									}
								);
						}
						,function(err){
							throw err;
						}
					)
			}
			,function(err){
				throw err;
			}
		)

};
