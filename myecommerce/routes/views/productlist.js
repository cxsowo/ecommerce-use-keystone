var keystone = require('keystone'),
	Category = keystone.list('Category'),
	Product = keystone.list('Product');

exports.findByCategory = function (req, res) {

	var view = new keystone.View(req, res);
	var id = req.params.id;

	console.log("request id:"+req.params.id);
	var view = new keystone.View(req, res);
	var locals = res.locals;
	var datas = {};
	Category.model.find()
		.exec(function(err, result){
			if(err) throw err;
			datas.categories = result;
			console.log("category");
		})
		.then(
			function(){
				var categoriyids = [];
				categoriyids.push(id);
				Category.model.find({
					parent : id
					})
					.exec(function(err, result){
						if(err) throw err;

						if(result && result.length > 0)
							for(var i = 0; i < result.length; i++)
								categoriyids.push(result[i]._id);
						console.log("category by id"+categoriyids);
					})
					.then(
						function(){
							Product.paginate({
								page: req.query.p || 1,
								perPage: 16,
								maxPages: 10
							})
							.where('category').in(categoriyids)
							.exec(function(err, result){
								if(err) throw err;
								console.log("category end");
								console.dir(result);
								view.render('productlist',{
									title : "所有产品",
									categories : datas.categories,
									first_category : datas.first_category,
									sec_category : datas.sec_category,
									shopping_cart_price : 1233.33,
									// commodities_in_cart:commodities_in_cart,
									product_result : result
								});
							});
						}
						,function(err){
							throw err;
						}
					)
				// Category.model.find()
				// 	.exec(function(err, result){
				// 		if(err) throw err;
				// 		datas.categories = result;
				// 	})
				// 	.then(
				// 		function(){
				// 			view.render('productlist',{
				// 				title:"所有产品",
				// 				categories:datas.categories,
				// 				shopping_cart_price:1233.33,
				// 				// commodities_in_cart:commodities_in_cart,
				// 				product_result:datas.productresult
				// 			});
				// 		}
				// 		,function(err){
				// 			throw err;
				// 		}
				// 	)
			}
			,function(err){
				throw err;
			}
		)
};

exports.allproduct = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;
	var datas = {};
	Category.model.find()
		.exec(function(err, result){
			if(err) throw err;
			datas.categories = result;
		})
	.then(
		function(){
			Product.paginate({
				page: req.query.p || 1,
				perPage: 16,
				maxPages: 10
			})
			.exec(function(err, result){
				if(err) throw err;
				console.dir(result);
				view.render('productlist',{
					title : "所有产品",
					categories : datas.categories,
					first_category : datas.first_category,
					sec_category : datas.sec_category,
					shopping_cart_price : 1233.33,
					// commodities_in_cart:commodities_in_cart,
					product_result : result
				});
			})
			// Category.model.find()
			// 	.exec(function(err, result){
			// 		if(err) throw err;
			// 		datas.categories = result;
			// 	})
			// 	.then(
			// 		function(){
			// 			view.render('productlist',{
			// 				title:"所有产品",
			// 				categories:datas.categories,
			// 				shopping_cart_price:1233.33,
			// 				// commodities_in_cart:commodities_in_cart,
			// 				product_result:datas.productresult
			// 			});
			// 		}
			// 		,function(err){
			// 			throw err;
			// 		}
			// 	)
		}
		,function(err){
			throw err;
		}
	)
};
