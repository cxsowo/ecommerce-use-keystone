var keystone = require('keystone');
var User = keystone.list('User');

exports = module.exports = function (req, res) {
	keystone.session.signout(req,res,function(){
		console.log("退出登录成功");
		res.redirect('/');
	});
}