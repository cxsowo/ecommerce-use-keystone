var keystone = require('keystone')
var Types = keystone.Field.Types

var Product = new keystone.List('Product')

Product.add({
	name: {type: Types.Text, required: true, initial: true, unique: true, default:""},
	price: {type: Types.Money, required: true, initial: true, default:1},
	description: {type: Types.Textarea},
	pv: {type: Number, default: 0, noedit:true},
	category: {type: Types.Relationship, ref:'Category', initial: true},
	image: {type: Types.CloudinaryImage, folder: true, autoCleanup : true}
})
Product.track = true

Product.defaultSort = '-createAt'
Product.defaultColumns = 'name, price, category, createdAt';

Product.register();