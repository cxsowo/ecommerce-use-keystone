var keystone = require('keystone');
var Category = keystone.list('Category');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	var categories;
	var shopping_cart_price;
	var commodities_in_cart = [{
			_id:"123",
			name:"奇怪的商品123",
			picPath:"djlsjss.jpg",
			number:2,
			price:2.99
		},
		{
			_id:"1234",
			name:"奇怪的商品1234",
			picPath:"djlsjss.jpg",
			number:10,
			price:333.99
		}];
	Category.model.find()
		.sort({parent:1})
		.exec(function(err, result) {
			var i,j,fir_num;
				for(i = 0,fir_num = 0; i < result.length; i++){
					if(!result[i].parent){
						console.log("in:"+i);
						fir_num++;
						result[i].sec_categories = [];
					}
					else{
						for(j = 0; j < fir_num; j++){
							if(result[j]._id.equals(result[i].parent)){
								result[j].sec_categories.push(result[i]);
							}
							console.log(result[j].sec_categories);
						}
					}
				}
				categories = result.slice(0,fir_num);
		})
		.then(
			function(){
				view.render('index',{ title:"买买买", first_categories:categories, shopping_cart_price:1233.33,commodities_in_cart:commodities_in_cart});
			}
			,function(err){
				throw err;
		});
	console.log("categories"+categories);
		// .exec(function(err,result){
		// 	if(err)
		// 		console.error(err);
		// 	var i,j,fir_num;
		// 	for(i = 0,fir_num = 0; i < result.length; i++){
		// 		if(!result[i].parent){
		// 			console.log("in:"+i);
		// 			fir_num++;
		// 			result[i].sec_categories = [];
		// 		}
		// 		else{
		// 			for(j = 0; j < fir_num; j++){
		// 				if(result[j]._id.equals(result[i].parent)){
		// 					result[j].sec_categories.push(result[i]);
		// 				}
		// 				console.log(result[j].sec_categories);
		// 			}
		// 		}
		// 	}
		// 	return result.slice(0,fir_num);
		// });

		// var i,j,fir_num;
		// 	for(i = 0,fir_num = 0; i < categories.length; i++){
		// 		if(!categories[i].parent){
		// 			console.log("in:"+i);
		// 			fir_num++;
		// 			categories[i].sec_categories = [];
		// 		}
		// 		else{
		// 			for(j = 0; j < fir_num; j++){
		// 				if(categories[j]._id.equals(categories[i].parent)){
		// 					categories[j].sec_categories.push(categories[i]);
		// 				}
		// 				console.log(categories[j].sec_categories);
		// 			}
		// 		}
		// 	}
		// 	categories = categories.slice(0,fir_num);
		// console.log("categories"+categories);
	// locals.section is used to set the currently selected
	// item in the header navigation.
	
	// var commodities_in_cart = [{
	// 		_id:"123",
	// 		name:"奇怪的商品123",
	// 		picPath:"djlsjss.jpg",
	// 		number:2,
	// 		price:2.99
	// 	},
	// 	{
	// 		_id:"1234",
	// 		name:"奇怪的商品1234",
	// 		picPath:"djlsjss.jpg",
	// 		number:10,
	// 		price:333.99
	// 	}];

	// var categories = [
	// {
	// 	id:"123",
	// 	name:"电子",
	// 	sec_categories:[{id:"1231",name:"电脑"},{id:"1232",name:"电视"},{id:"1233",name:"鼠标"},{id:"12321",name:"电脑"},{id:"12322",name:"电视"},{id:"12323",name:"鼠标"}]
	// },
	// {
	// 	id:"124",
	// 	name:"食品",
	// 	sec_categories:[{id:"1231",name:"电脑"},{id:"1232",name:"电视"},{id:"1233",name:"鼠标"}]
	// },
	// {
	// 	id:"125",
	// 	name:"服装",
	// 	sec_categories:[{id:"1231",name:"电脑"},{id:"1232",name:"电视"},{id:"1233",name:"鼠标"}]
	// }
	// ];
	// Render the view
	
};
