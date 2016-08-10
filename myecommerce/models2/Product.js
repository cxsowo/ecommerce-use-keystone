var keystone = require('keystone')
var Types = keystone.Field.Types

var Product = new keystone.List('Product')

Product.add({
	name : {type: Types.Text, require: true, initial: true},
	price : {type: Types.Money, requrie: true, initial: true},
	description: {type: Types.Markdown},
	productionDate: {type: Types.Datetime, default: Date.now(),	 requrie: true},
	vedio: {type: Types.Url, require: true},
	pv: {type: Number, default: 0, noedit:true},
	category: {type: Types.Relationship, ref:'Category', require: true},
	image: {type: Types.CloudinaryImages,  folder: true}
})
Product.trace = true

Product.defaultSort = '-createAt'
Product.defaultColumns = 'name, price, category, productionDate';

Product.register();