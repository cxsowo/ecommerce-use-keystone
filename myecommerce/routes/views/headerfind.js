var keystone = require('keystone'),
	Category = keystone.list('Category'),
	Cart = keystone.list('Cart'),
	Product = keystone.list('Product');

// exports = module.exports = function(){
// 	return "提供findCategories()和findCart(user)两个函数，都是包括了header.jade要用到的";
// }

exports.findCategories = function(){
	return Category.model.find();
}

// exports.findCart = function(_user){
// 	if(!_user)
// 		throw new Error("in findCart(),need a user!");
// 	return Cart.model.find({
// 			user : _user._id
// 		})
// 		.populate('CartItem')
// 		.populate('Product');
// }

