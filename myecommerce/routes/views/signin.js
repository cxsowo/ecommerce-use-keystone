var keystone = require('keystone'),
	Category = keystone.list('Category'),
	User = keystone.list('User');

exports = module.exports = function (req, res) {

	var _user = req.body.user;

	keystone.session.signin(_user, req, res,
		function onSuccess(user){
			console.log("登录成功："+user.name);
			res.redirect('/');
		},
		function onFail(err){
			console.error("signin fail:"+err);
			res.redirect('/signin');
		});
};

exports.showSignin = function(req, res) {

	Category.model.find()
		.exec(function(err, result){
			res.render('signin', {
				title : '登录',
				categories : result,
			})
		})
}