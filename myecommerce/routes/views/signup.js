var keystone = require('keystone'),
	User = keystone.list('User'),
	Category = keystone.list('Category'),
	utils = require('keystone-utils'),
	signin = require('./signin');

exports = module.exports = function (req, res) {

	var _user = req.body.user;
	var reg =/^0{0,1}(13|15|18)[0-9]{9}$/;
	if(_user.password && (_user.password.length < 6 || _user.password.length > 20)){
		console.log("注册时密码长度不对："+_user.name);
		res.redirect('/signup');
	}
	else if(!utils.isEmail(_user.email)){
		console.log("邮箱格式不对：" + _user.email);
		res.redirect('/signup');
	}
	else if(!_user.phone.match(reg)){
		console.log("手机号格式不对！"+_user.phone);
		res.redirect('/signup');
	}
	else{
		var newUser = new User.model({
			name : _user.name,
			email : _user.email,
			password : _user.password,
			phone : _user.phone,
			address : _user.address || '',
			isAdmin : false
		});

		newUser.save(function(err,isSuccess) {
		    // post已保存
		    if(err)
		    	console.error(err);
		    if(isSuccess){
		    	console.log("注册成功："+_user.name);
		    	signin(req,res);
		    }
		    else{
				console.log("注册失败："+_user.name);
				res.redirect('/signup');
			}
		});
	}
	// User.model.find()
	// 	.where('name' , _user.name)
	// 	.exec(function(err,user){
	// 		if(err)
	// 			console.error(err);
	// 		if(user.length !== 0){
	// 			console.log(1);
	// 			console.log("已经被注册了："+_user.name);
	// 			res.redirect('/signup');
	// 		}
	// 		else{
	// 			console.log(2);
	// 			var newUser = new User.model({
	// 				name : _user.name,
	// 				email : _user.email,
	// 				password : _user.password
	// 			});

	// 			newUser.save(function(err,isSuccess) {
	// 			    // post已保存
	// 			    if(err)
	// 			    	console.error(err);
	// 			    if(isSuccess){
	// 			    	console.log("注册成功："+_user.name);
	// 					req.session.user = newUser;
	// 					res.redirect('/');
	// 			    }
	// 			    else{
	// 					console.log("注册失败："+_user.name);
	// 					res.redirect('/signup');
	// 				}
	// 			});
	// 		}
	// 	});
};

exports.showSignup = function(req, res) {
	Category.model.find()
		.exec(function(err, result){
			res.render('signup', {
				title : '注册',
				categories : result,
			})
		})
}