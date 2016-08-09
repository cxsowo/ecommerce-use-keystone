var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	var commodities_in_cart = [{
			id:"123",
			name:"奇怪的商品123",
			picPath:"djlsjss.jpg",
			number:2,
			price:2.99
		},
		{
			id:"1234",
			name:"奇怪的商品1234",
			picPath:"djlsjss.jpg",
			number:10,
			price:333.99
		}];
	var categories = [
	{
		id:"123",
		name:"电子",
		sec_categories:[{id:"1231",name:"电脑"},{id:"1232",name:"电视"},{id:"1233",name:"鼠标"},{id:"12321",name:"电脑"},{id:"12322",name:"电视"},{id:"12323",name:"鼠标"}]
	},
	{
		id:"124",
		name:"食品",
		sec_categories:[{id:"1231",name:"电脑"},{id:"1232",name:"电视"},{id:"1233",name:"鼠标"}]
	},
	{
		id:"125",
		name:"服装",
		sec_categories:[{id:"1231",name:"电脑"},{id:"1232",name:"电视"},{id:"1233",name:"鼠标"}]
	}
	];
	// Render the view
	view.render('index',{ title:"买买买", first_categories:categories, shopping_cart_price:1233.33,commodities_in_cart:commodities_in_cart});
};
