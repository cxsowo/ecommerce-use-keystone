var keystone = require('keystone'),
	Category = keystone.list('Category'),
	Cart = keystone.list('Cart'),
	Order = keystone.list('Order'),
	OrderItem = keystone.list('OrderItem'),
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
							sum += result[i].product.price*result[i].qty;
						}
						datas.cartprice = sum;
						datas.cart = result;
						console.log("查完了购物车");
					})
					.then(
						function(){
							if(req.user){
								User.model.findOne({//查用户信息
									_id : req.user._id
									})
									// .select(name, phone, address, email)
									.exec(function(err, result){
										if(err) throw err;
										result.password = '';
										datas.userinfo = result;
										console.log("查找用户信息了："+result);
									})
									.then(
										function(){//查所有订单
											Order.paginate({//分页查看商品
												page: req.body.p || 1,
												perPage: 10,
												maxPages: 10
											})
											.sort({createdAt:-1})
											.where('user').equals(req.user._id)
											.exec(function(err, presult){
												if(err) console.error(err);

												console.log(presult);
												view.render('personalindex',{
													title : "个人主页",
													categories : datas.categories,
													cartprice : datas.cartprice,
													cart : datas.cart,
													userinfo : datas.userinfo,
													presult : presult
												});
											})
										},function(err){
											throw err;
										}
									)
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
		req.flash('warning', '手机号格式不对！');
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
		});
}

exports.changeAddress = function(req, res) {
	var address = req.body.address;
	if(!address){
		console.log("要更改的地址为空！"+req.user);
		res.json({success:0});
	}
	else
		User.model.update({
			_id : req.user._id
		},{
			address : address
		}).exec(function(err, result){
			if(err) throw err;
			res.json({success:1});
		});
}

exports.findOrderById = function(req, res) {
	var oid = req.query.id;
	if(!oid){
		console.log("要查的订单id为空！"+oid);
		res.json({success:0});
	}
	else
		OrderItem.model.find({
			order : oid
		}).exec(function(err, result){
			if(err) throw err;
			console.log(result);
			res.json({
				success : 1,
				order_items : result
			});
		});
}

exports.findOrderPaginate = function(req, res) {
		Order.paginate({//分页查看商品
			page: req.body.p || 1,
			perPage: 10,
			maxPages: 10
		})
		.sort({createdAt:-1})
		.where('user').equals(req.user._id)
		.exec(function(err, presult){
			if(err) console.error(err);

			console.log(presult);
			view.json({
				success : 1,
				presult : presult
			});
		})
}

exports.confirmOrder = function(req, res) {
	Order.model.update({
			_id : req.body.id,
			user : req.user._id
		},{
			finish : true
		}).exec(function(err, result){
			if(err) throw err;
			res.json({success:1});
		});
}