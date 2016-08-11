var keystone = require('keystone');
var User = keystone.list('User');
var signin = require('./signin');

exports = module.exports = function (req, res) {

	var _user = req.body.user;
	var newUser = new User.model({
		name : _user.name,
		email : _user.email,
		password : _user.password,
		phone : _user.phone || '',
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
	res.render('signup', {
		title: '注册'
	})
}