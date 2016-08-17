var keystone = require('keystone'),
	Category = keystone.list('Category'),
	User = keystone.list('User');

exports = deleteItem = function(req, res){
	var id = req.query.id;
	if(!id)
		res.json({
			success : 0
		})
	else{
		Cart.model.remove({
			user : req.user._id
			product : id
		}).exec(function(err, result){
			console.log("22222222"+result);
		})
	}
}