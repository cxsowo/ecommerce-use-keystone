var keystone = require('keystone'),
	header_find = require('./header-find.js'),
	Cart = keystone.list('Cart'),
	Product = keystone.list('Product'),
	Expand = keystone.list('Expand'),
	CartItem = keystone.list('CartItem');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	
	var categories;
	var shopping_cart_price;
	var hot_products;
	var new_products;
	var cart_datas;
	var product_in_cart;
	var expands;

	// header_find.findCategories()
	// 	.exec(function(err,result){
	// 		if(err) throw err;
	// 		categories = result;
	// 	})
	// 	.then(
	// 		function(){
	// 			Product.model.find()
	// 				.sort({pv:-1})
	// 				.limit(5)
	// 				.exec(function(err, result){
	// 					if(err) throw err;
	// 					hot_products = result;
	// 					console.log("exec hot_products" + hot_products);
	// 				})
	// 		}
	// 		,function(err){
	// 			throw err;
	// 		}
	// 	)
	// 	.then(
	// 		function(){
	// 			Product.model.find()
	// 				.sort({createdAt:-1})
	// 				.limit(5)
	// 				.exec(function(err, result){
	// 					if(err) throw err;
	// 					new_products = result;
	// 					console.log("exec new_products" + new_products);
	// 				});
	// 		}
	// 		,function(err){
	// 			throw err;
	// 		}
	// 	)
	// 	.then(
	// 		function(){
	// 			console.log("sen hot_products" + hot_products);
	// 			console.log("sen new_products" + new_products);
	// 			view.render('index',{
	// 				title : "买买买",
	// 				categories : categories,
	// 				shopping_cart_price : 1233.33,
	// 				hot_products : hot_products,
	// 				new_products : new_products
	// 			});
	// 		},
	// 		function(err){
	// 			throw err;
	// 		}
	// 	);

	header_find.findCategories()
		.exec(function(err,result){
			if(err) throw err;
			categories = result;
		})
		.then(
			function(){
				Product.model.find()
					.sort({pv:-1})
					.limit(5)
					.exec(function(err, result){
						if(err) throw err;
						for(one in result)
							for(image in one.images)
								image._.src({width: 300, height: 200, crop :"fill"});
						hot_products = result;
						console.log("exec hot_products" + hot_products);
					})
					.then(
						function(){
							Expand.model.find()
								.sort({updatedAt:-1})
								.limit(5)
								.exec(function(err, result){
									if(err) throw err;
									expands = result;
								})
							// Product.model.find()
							// 	.sort({createdAt:-1})
							// 	.limit(5)
							// 	.exec(function(err, result){
							// 		if(err) throw err;
							// 		new_products = result;
							// 		console.log("exec new_products" + new_products);
							// 	})
								.then(
									function(){
										console.log("sen hot_products" + hot_products);
										console.log("sen expands" + expands);
										view.render('index',{
											title : "买买买",
											categories : categories,
											shopping_cart_price : 1233.33,
											hot_products : hot_products,
											expands : expands
										});
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

// var getCart = function(){
// 	if(req.user){
// 		Cart.model.find({
// 			user : req.user._id
// 			})
// 			.populate('products')
// 			.exec(function(err, result){
// 				cart_datas = result;
// 			}
// 			.then(
// 				function(){
// 					if(cart_datas){
// 						for(one in cart_datas){
// 							Product.model.find({
// 								_id : one.product
// 							}).exec(function(err,result){
// 								if(err) throw err;
// 								one.price = result[0].price;
// 								one.name = 
// 							})
// 						}
// 					}
// 				},
// 				function(err){
// 					throw err;
// 				}

// 			);
// 	}
