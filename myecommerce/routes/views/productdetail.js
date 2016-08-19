var keystone = require('keystone'),
	Category = keystone.list('Category'),
	Cart = keystone.list('Cart'),
	Product = keystone.list('Product');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var id = req.params.id;
	var datas = {};

	Category.model.find()//查所有分类
		.exec(function(err, result){
			if(err) throw err;
			datas.categories = result;
		})
		.then(
			function(){
				var categoriyids = [];
				Product.model.findOne({//找到要查看的商品信息
					_id : id
					})
					.populate('category')
					.exec(function(err, result){
						if(err) throw err;
						datas.product = result;
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
											sum += result[i].product.price;
										}
										view.render('productdetail',{
											title : datas.product_name || "商品详情",
											categories : datas.categories,
											cartprice : sum,
											cart : result,
											product : datas.product,
										});
									})
							}
							else
								view.render('productdetail',{
									title : datas.product_name || "商品详情",
									categories : datas.categories,
									product : datas.product,
								});
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
