var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	console.log("query id:" + req.query.category_id);
	// locals.section is used to set the currently selected
	// item in the header navigation.
	console.log("in product-detail");
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
	}];
	var product ={
		name:"测试名字的商品呵呵哈哈哈",
		id:123,
		first_category:{
			name:"一级分类电子",
			id:"12321"
		}
	}
	// Render the view
	view.render('productdetail',{ title:"买买买", first_categories:categories, shopping_cart_price:1233.33,commodities_in_cart:commodities_in_cart
	,product:product});
};
