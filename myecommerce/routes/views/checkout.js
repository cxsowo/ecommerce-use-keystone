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

exports.deleteItem = function(req, res){
	var id = req.query.id;
	if(!id)
		res.json({success : 0});
	else{
		Cart.model.remove({
			user : req.user._id,
			product : id
		}).exec(function(err, result){

			//return {success : result};
			// res.send({
			// 	success : result
			// })
			if(err) throw err;
			console.log("///////////"+result);
			res.json({success : 1});
		})
	}
}


