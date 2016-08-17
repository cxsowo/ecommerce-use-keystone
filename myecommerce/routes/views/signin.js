var keystone = require('keystone'),
	Category = keystone.list('Category'),
	User = keystone.list('User');

exports = module.exports = function (req, res) {

	var _user = req.body.user;

	console.dir(_user);
	keystone.session.signin(_user, req, res,
		function onSuccess(user){
			console.log("登录成功："+user.name);
			res.redirect('/');
		},
		function onFail(err){
			console.error("signin fail:"+err);
			res.redirect('/signin');
		});
	// User.model.find()
	// 	.where('name' , _user.name)
	// 	.exec(function(err,users){
	// 		if(err)
	// 			console.error(err);
	// 		if(users.length === 1){
	// 			var user = users[0];
	// 			user._.password.compare(_user.password,function(err,result){
	// 				if(err){
	// 					console.error(err);
	// 				}
	// 				if(result){
	// 					saveSession(user,req,res,function(){
	// 						console.log("登录成功："+user.name);
	// 						res.redirect('/');
	// 					});
	// 				}
	// 				else{
	// 					console.log("登录失败："+_user.name);
	// 					res.redirect('/signin');
	// 				}
	// 			});
	// 		}
	// 	});
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