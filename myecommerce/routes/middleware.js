/**
 * This file contains the common middleware used by your routes.
 *
 * Extend or replace these functions as your application requires.
 *
 * This structure is not enforced, and just a starting point. If
 * you have more middleware you may want to group it as separate
 * modules in your project's /lib directory.
 */
var _ = require('lodash'),
	keystone = require('keystone'),
	Cart = keystone.list('Cart');


/**
	Initialises the standard view locals

	The included layout depends on the navLinks array to generate
	the navigation in the header, you may wish to change this array
	or replace it with your own templates / logic.
*/
exports.initLocals = function (req, res, next) {
	res.locals.navLinks = [
		{ label: 'Home', key: 'home', href: '/' },
		{ label: 'Contact', key: 'contact', href: '/contact' },
	];
	res.locals.user = req.user;
	next();
};


/**
	Fetches and clears the flashMessages before a view is rendered
*/
exports.flashMessages = function (req, res, next) {
	var flashMessages = {
		info: req.flash('info'),
		success: req.flash('success'),
		warning: req.flash('warning'),
		error: req.flash('error'),
	};
	res.locals.messages = _.some(flashMessages, function (msgs) { return msgs.length; }) ? flashMessages : false;
	next();
};


/**
	Prevents people from accessing protected pages when they're not signed in
 */
exports.requireUser = function (req, res, next) {
	if (!req.user) {
		req.flash('warning', '请先登录！');
		res.redirect('/signin');
	} else {
		next();
	}
};

/**
	Prevents people from accessing protected pages when they're not signed in
 */
exports.requireNoUser = function (req, res, next) {
	if (req.user) {
		req.flash('warning', '已经登录！');
		res.redirect('/');
	} else {
		next();
	}
};

exports.requireCart = function (req, res, next) {
	Cart.model.findOne({
		user : req.user._id
	}).exec(function(err, result){
		if(err) console.error(err);
		if(!result){
			req.flash('warning', '购物车为空！');
			res.redirect('/shoppingcart');
		}
		else{
			next();
		}
	})
};
