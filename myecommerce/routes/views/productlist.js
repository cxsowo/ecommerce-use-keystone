var keystone = require('keystone'),
	Category = keystone.list('Category'),
	Cart = keystone.list('Cart'),
	Product = keystone.list('Product');

exports.findByCategory = function (req, res) {

	var view = new keystone.View(req, res);
	var id = req.params.id;

	var view = new keystone.View(req, res);
	var datas = {};
	Category.model.find()//查商品分类用于header
		.exec(function(err, result){
			if(err) throw err;
			datas.categories = result;
			console.log("category");
		})
		.then(
			function(){
				var categoriyids = [];
				Category.model.find({//查要查看分类用于商品分类查看
					$or : [{parent : id}, {_id : id}]
					})
					.exec(function(err, result){
						if(err) throw err;

						if(result && result.length > 0)
							for(var i = 0; i < result.length; i++){
								if(result[i]._id.equals(id))
									datas.category_name = result[i].name;
								categoriyids.push(result[i]._id);
							}
					})
					.then(
						function(){
							if(req.user){
								Cart.model.find({//查购物车
									user : req.user._id
									})
									.populate('product')
									.exec(function(err, result){
										if(err) throw err;
										var sum = 0;
										for(var i = 0; i < result.length; i++){
											sum += result[i].product.price*result[i].qty;
										}
										datas.cartprice = sum;
										datas.cart = result;
									})
									.then(
										function(){
											Product.paginate({//分页查看商品
												page: req.query.p || 1,
												perPage: 16,
												maxPages: 10
											})
											.where('category').in(categoriyids)
											.exec(function(err, result){
												if(err) throw err;

												view.render('productlist',{
													title : "分类浏览商品",
													categories : datas.categories,
													category_name : datas.category_name,
													cartprice : datas.cartprice,
													cart : datas.cart,
													product_result : result
												});
											})
										}
										,function(err){

										}
									)
							}
							else
								Product.paginate({//分页查看商品
									page: req.query.p || 1,
									perPage: 16,
									maxPages: 10
								})
								.where('category').in(categoriyids)
								.exec(function(err, result){
									if(err) throw err;
									datas.product_result = result;
									view.render('productlist',{
										title : "分类浏览商品",
										categories : datas.categories,
										category_name : datas.category_name,
										product_result : result
									});
								})
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

exports.allproduct = function (req, res) {

	var view = new keystone.View(req, res);
	var datas = {};
	Category.model.find()//查商品分类用于header
		.exec(function(err, result){
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
							sum += result[i].product.price;
						}
						datas.cart = result;
						datas.cartprice = sum;
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
								datas.product_result = result;
								view.render('productlist',{
									title : "所有商品",
									categories : datas.categories,
									category_name : datas.category_name,
									cartprice : datas.cartprice,
									cart : datas.cart,
									product_result : datas.product_result
								});
							})
						}
						,function(err){
							throw err;
						}
					)
			}
			else
				Product.paginate({
					page: req.query.p || 1,
					perPage: 16,
					maxPages: 10
				})
				.exec(function(err, result){
					if(err) throw err;
					datas.product_result = result;
					view.render('productlist',{
						title : "所有商品",
						categories : datas.categories,
						category_name : datas.category_name,
						product_result : result
					});
				})
		}
		,function(err){
			throw err;
		}
	)
};
