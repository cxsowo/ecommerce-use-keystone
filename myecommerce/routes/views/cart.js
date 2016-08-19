var keystone = require('keystone'),
	Cart = keystone.list('Cart'),
	User = keystone.list('User');

exports.deleteItem = function(req, res){
	var id = req.query.id;
	if(!id)
		return {success : 0};
	else{
		Cart.model.remove({
			user : req.user._id,
			product : id
		}).exec(function(err, result){
			console.log("22222222"+result);
			return {success : result};
			// res.json({
			// 	success : 1
			// })
		})
	}
}