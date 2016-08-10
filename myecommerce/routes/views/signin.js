var keystone = require('keystone');
var bcrypt = require('bcrypt');
var User = keystone.list('User');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var _user = req.body.user;

	User.model.find()
		.where('name' , _user.name)
		.exec(function(err,user){
			if(err)
				console.error(err);
			if(user.length === 1){
				bcrypt.compare(_user.password, user[0].password, function(err, isMatch){
					if(err){
						console.error(err);
					}
					if(isMatch){
						console.log("登录成功："+_user.name);
						res.redirect('/');
					}
					else{
						console.log("登录失败："+_user.name);
						res.redirect('/signin');
					}
				});
			}
		});
		// .where('name' , _user.name)
		// .exec(function(err,user){
		// 	if(err)
		// 		console.error(err);
		// 	if(user.length === 0){
		// 		console.log("该用户不存在"+_user.name);
		// 		res.redirect('/signin');
		// 	}
		// 	else{
		// 		User.model.comparePassword(_user.password,function(err,isMatch){
		// 			if(err)
		// 				console.error(err);
		// 			if(isMatch){
		// 				console.log("登录成功："+_user.name);
		// 				res.redirect('/');
		// 			}
		// 			else{
		// 				console.log("登录失败："+_user.name);
		// 				res.redirect('/signin');
		// 			}

		// 		});
		// 	}
		// });
};

exports.showSignin = function(req, res) {
	res.render('signin', {
		title: '登录'
	})
}