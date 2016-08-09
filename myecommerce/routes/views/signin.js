var keystone = require('keystone');

//exports = module.exports = User;
exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	// locals.section = 'home';
	// var _user = req.body.user
	// var name = _user.name
	// var password = _user.password

	// User.findOne({
	// 	name : name
	// }, function(err, user) {
	// 	if(err)  console.log(err)

	// 	if(!user)
	// 		return res.redirect('/signup')
	// 	user.comparePassword(password, function(err, isMatch) {
	// 		if(err) console.log(err)

	// 		if(isMatch) {
	// 			//save user  on serve
	// 			req.session.user = user
	// 			return res.redirect('/')
	// 		}
	// 		else
	// 			return res.redirect('../signin')
	// 	})
	// })
	// view.on('post', { action: 'signin' }, function (next) {

	// 	var newUser = new User.model();
	// 	var updater = newEnquiry.getUpdateHandler(req);

	// 	updater.process(req.body, {
	// 		flashErrors: true,
	// 		fields: 'name, email, phone, enquiryType, message',
	// 		errorMessage: 'There was a problem submitting your enquiry:',
	// 	}, function (err) {
	// 		if (err) {
	// 			locals.validationErrors = err.errors;
	// 		} else {
	// 			locals.enquirySubmitted = true;
	// 		}
	// 		next();
	// 	});
	// });

	view.render('signin',{ title:"登陆页面" });
}
