var keystone = require('keystone')
var Types = keystone.Field.Types

var CartItem = new keystone.List('CartItem')

CartItem.add({
	product : {type: Types.Relationship, ref: 'Product', many: false, index: true, required: true,initial:true},
	num : {type: Types.Number,required: true, default: 1}
})

CartItem.track = true
CartItem.defaultSort = '-createAt'
CartItem.defaultColumns = 'name, price, description, productionDate, createdAt, updatedAt'

CartItem.register()