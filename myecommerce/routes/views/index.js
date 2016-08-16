var keystone = require('keystone'),
	headerfind = require('./headerfind.js'),
	Cart = keystone.list('Cart'),
	Category = keystone.list('Category'),
	Product = keystone.list('Product'),
	Expand = keystone.list('Expand');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);

	var shopping_cart_price;
	var datas = {};

	// Category.model.find()
	// 	.exec(function(err,result){
	// 		if(err) throw err;
	// 		datas.categories = result;
	// 	})
	// 	.then(
	// 		function(){
	// 			Product.model.find()
	// 				.sort({createdAt:-1})
	// 				.limit(8)
	// 				.exec(function(err, result){
	// 					if(err) throw err;
	// 					datas.hot_products = result;
	// 					console.log("111111111111111");
	// 				});
	// 		}
	// 		,function(err){
	// 			throw err;
	// 		}
	// 	)
	// 	.then(
	// 		function(){
	// 			console.log("sen categories" + datas.categories);
	// 			console.log("sen datas.hot_products" + datas.hot_products);
	// 			console.log("222222222222222222");
	// 			view.render('index',{
	// 				title : "买买买",
	// 				categories : datas.categories,
	// 				shopping_cart_price : 1233.33,
	// 				hot_products : datas.hot_products,
	// 				expands : datas.expands
	// 			});
	// 		},
	// 		function(err){
	// 			throw err;
	// 		}
	// 	);

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
										// if(req.user){
										// 	headerfind.findCart(req.user)
										// 		.exec(function(err, result){
										// 			if(err) throw err;
										// 			datas.cart = result;
										// 			console.log("cart" + result);
										// 		})
										// 		.then(
										// 			function(){
										// 				view.render('index',{
										// 					title : "买买买",
										// 					categories : datas.categories,
										// 					shopping_cart_price : 1233.33,
										// 					hot_products : datas.hot_products,
										// 					expands : datas.expands
										// 				});
										// 			}
										// 			,function(err){
										// 				throw err;
										// 			}
										// 		)
										// }
										// else
											view.render('index',{
												title : "买买买",
												categories : datas.categories,
												shopping_cart_price : 1233.33,
												hot_products : datas.hot_products,
												expands : datas.expands
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
