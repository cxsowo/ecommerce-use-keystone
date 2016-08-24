var keystone = require('keystone')
var Types = keystone.Field.Types

var OrderItem = new keystone.List('OrderItem')

OrderItem.add({
	order : {type: Types.Relationship, ref: 'Order', many: false, index: true, required: true,initial:true},
	product : {type: Types.Relationship, ref: 'Product', many: false, required: true, initial:true},
	qty : {type: Types.Number, required: true, default: 1},
	price : {type: Types.Money, required: true, default: 1},
	name: {type: Types.Text, required: true, default: ''},
	imageurl: {type: Types.Text}
})

OrderItem.track = true
OrderItem.defaultSort = '-createAt'
OrderItem.defaultColumns = 'productnamename, product, qty, createdAt'

OrderItem.register()