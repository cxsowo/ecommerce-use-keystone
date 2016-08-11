var keystone = require('keystone')
var Types = keystone.Field.Types

var Order = new keystone.List('Order')

Order.add({
	customer: {type: Types.Relationship, ref: 'User', many: false, required: true,index: true, initial: true},
	products: {type: Types.Relationship, ref: 'ProductItem', many: true},
	price: {type: Types.Money, require: true},
	finish: {type: Types.Boolean, require: true, default:false, initial:true}
})

Order.track = true
Order.defaultSort = '-createAt'
Order.defaultColumns = 'name, price, description, productionDate, createdAt, updatedAt'

Order.register()