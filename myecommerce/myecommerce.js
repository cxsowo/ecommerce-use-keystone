// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require('dotenv').config();

// Require keystone
var keystone = require('keystone');

// Initialise Keystone with your project's configuration.
// See http://keystonejs.com/guide/config for available options
// and documentation.

keystone.init({
	'name': '基于keystone的电商',
	'brand': 'MyEcommerce',

	'less': 'public',
	'static': 'public',
	'favicon': 'public/favicon.ico',
	'views': 'templates2/views',
	'view engine': 'jade',

	'emails': 'templates/emails',

	'auto update': true,
	'session': true,
	'auth': true,
	'user model': 'User',
	'mongo': process.env.MONGO_URI || process.env.MONGOLAB_URI || 'mongodb://localhost/myecommerce-test',
	'session store': 'mongo'
});

keystone.set('cloudinary config', { cloud_name: 'shi-no', api_key: '782672353871716', api_secret: 'Pbe0M55TgExXsjevlUu0TdvB3SI' });

// Load your project's Models
keystone.import('models');

// Setup common locals for your templates. The following are required for the
// bundled templates and layouts. Any runtime locals (that should be set uniquely
// for each request) should be added to ./routes/middleware.js
keystone.set('locals', {
	_: require('lodash'),
	env: keystone.get('env'),
	utils: keystone.utils,
	editable: keystone.content.editable,
});

// Load your project's Routes
keystone.set('routes', require('./routes'));

// Setup common locals for your emails. The following are required by Keystone's
// default email templates, you may remove them if you're using your own.
// keystone.set('email locals', {
// 	logo_src: '/images/logo-email.gif',
// 	logo_width: 194,
// 	logo_height: 76,
// 	theme: {
// 		email_bg: '#f9f9f9',
// 		link_color: '#2697de',
// 		buttons: {
// 			color: '#fff',
// 			background_color: '#2697de',
// 			border_color: '#1a7cb7',
// 		},
// 	},
// });

// Load your project's email test routes
//keystone.set('email tests', require('./routes/emails'));


// Configure the navigation bar in Keystone's Admin UI
keystone.set('email tests', require('./routes/emails'));
keystone.set('cloudinary config', { cloud_name: 'shi-no', api_key: '782672353871716', api_secret: 'Pbe0M55TgExXsjevlUu0TdvB3SI' });
// Configure the navigation bar in Keystone's Admin UI
// 可选，会用'keystone_'作为所有内置标签的前缀
keystone.set('cloudinary prefix', 'myecommerce');
// 可选，会用[{prefix}]/{list.path}/{field.path}/ 作为每个图片的public_id的前缀
keystone.set('cloudinary folders', true);

keystone.set('nav', {
	enquiries: 'enquiries',
	users: 'users',
	products: 'products',
	orders: 'orders',
	categories: 'categories',
	cart : 'carts',
	expand : 'expands'
});

// Start Keystone to connect to your database and initialise the web server

keystone.start();
