var keystone = require('keystone'),
	Category = keystone.list('Category'),
	Cart = keystone.list('Cart'),
	User = keystone.list('User');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var datas = {};

	Category.model.find()//查所有分类
		.exec(function(err, result){
			if(err) throw err;
			datas.categories = result;
		})
		.then(
			function(){
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
						datas.cartprice = sum;
						datas.cart = result;
					})
					.then(
						function(){
							if(req.user){
								User.model.findOne({//查用户信息
									_id : req.user._id
									})
									.exec(function(err, result){
										if(err) throw err;
										view.render('personalindex',{
											title : datas.product_name || "商品详情",
											categories : datas.categories,
											cartprice : datas.cartprice,
											cart : datas.cart,
											userinfo : result,
										});
									})
							}
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
	// view.render('personalindex', {
	// 			title : '个人主页',
	// 			usermsg : {}
	// 		});
};

exports.changeUserInfo = function(req, res) {
	var name = req.body.name;
	var phone = req.body.phone;
	var address = req.body.address;
	var reg =/^0{0,1}(13|15|18)[0-9]{9}$/;
	if(name && phone && !phone.match(reg)){
		console.log("手机号格式不对！"+name+phone);
		res.json({success:0});
	}
	else
	User.model.update({
		_id : req.user._id
	},{
		name : name,
		phone : phone,
		address : address
	}).exec(function(err, result){
		if(err) throw err;
		res.json({success:1});
	})
}