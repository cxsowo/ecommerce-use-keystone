var keystone = require('keystone');

exports.signin = function (req, res) {

	var view = new keystone.View(req, res);

	req.alert("登陆成功！");
	view.render('signin',{ title:"登陆"});
};

exports.signout = function (req, res) {

	var view = new keystone.View(req, res);

	view.render('signout',{ title:"登出"});
};

exports.signup = function (req, res) {

	var view = new keystone.View(req, res);

	view.render('signup',{ title:"注册"});
};

exports.showSignup = function(req, res) {
        res.render('signup', {
            title: '注册'
        })
    }
    //signin
exports.showSignin = function(req, res) {
        res.render('signin', {
            title: '登录'
        })
    }
