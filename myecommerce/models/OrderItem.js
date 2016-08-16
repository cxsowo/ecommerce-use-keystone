var keystone = require('keystone')
var Types = keystone.Field.Types

var OrderItem = new keystone.List('OrderItem')

OrderItem.add({
	product : {type: Types.Relationship, ref: 'Product', many: false, index: true, required: true,initial:true},
	qty : {type: Types.Number, required: true, default: 1},
	productname: {type: Types.Text, required: true, default: ''}
})

OrderItem.track = true
OrderItem.defaultSort = '-createAt'
OrderItem.defaultColumns = 'productnamename, product, qty, createdAt'

OrderItem.register()