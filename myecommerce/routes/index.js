/**
 * This file is where you define your application routes and controllers.
 *
 * Start by including the middleware you want to run for every request;
 * you can attach middleware to the pre('routes') and pre('render') events.
 *
 * For simplicity, the default setup for route controllers is for each to be
 * in its own file, and we import all the files in the /routes/views directory.
 *
 * Each of these files is a route controller, and is responsible for all the
 * processing that needs to happen for the route (e.g. loading data, handling
 * form submissions, rendering the view template, etc).
 *
 * Bind each route pattern your application should respond to in the function
 * that is exported from this module, following the examples below.
 *
 * See the Express application routing documentation for more information:
 * http://expressjs.com/api.html#app.VERB
 */

var keystone = require('keystone');
var middleware = require('./middleware');
var importRoutes = keystone.importer(__dirname);

// Common Middleware
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);

// Import Route Controllers
var routes = {
	views: importRoutes('./views'),
};

// Setup Route Bindings
exports = module.exports = function (app) {
	// Views
	app.get('/', routes.views.index);
	app.all('/contact', routes.views.contact);

	app.get('/productdetail/:id', routes.views.productdetail);
	app.get('/productlist/:id', routes.views.productlist.findByCategory);
	app.get('/productlist', routes.views.productlist.allproduct);
	app.get('/signin', middleware.requireNoUser, routes.views.signin.showSignin);
	app.get('/signup', middleware.requireNoUser, routes.views.signup.showSignup);
	app.get('/signout', middleware.requireUser, routes.views.signout);
	app.get('/shoppingcart', middleware.requireUser, routes.views.shoppingcart);
	app.get('/personalindex', middleware.requireUser, routes.views.personalindex);
	app.get('/checkout', middleware.requireUser, middleware.requireCart, routes.views.checkout);
	app.get('/getorderbyp', middleware.requireUser, routes.views.personalindex.findOrderPaginate);
	app.get('/getorderdetail', middleware.requireUser, routes.views.personalindex.findOrderById);

	app.post('/signin', middleware.requireNoUser, routes.views.signin);
	app.post('/signup', middleware.requireNoUser, routes.views.signup);
	app.post('/createorder', middleware.requireUser, routes.views.checkout.checkOutPay);

	app.put('/addtocart', middleware.requireUser, routes.views.shoppingcart.addToCart);
	app.put('/changeuserinfo', middleware.requireUser, routes.views.personalindex.changeUserInfo);
	app.put('/changeaddress', middleware.requireUser, routes.views.personalindex.changeAddress);
	app.put('/confirmorder', middleware.requireUser, routes.views.personalindex.confirmOrder);

	app.delete('/removecartitem', middleware.requireUser, routes.views.shoppingcart.deleteItem);
	app.delete('/clearcart', middleware.requireUser, routes.views.shoppingcart.clearCart);

	//app.get('/categories/:id', routes.views.categories);

	// NOTE: To protect a route so that only admins can see it, use the requireUser middleware:
	// app.get('/protected', middleware.requireUser, routes.views.protected);

};
