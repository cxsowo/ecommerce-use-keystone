var keystone = require('keystone')
var Types = keystone.Field.Types

var Order = new keystone.List('Order')

Order.add({
	customer: {type: Types.Relationship, ref: 'User', many: false, index: true, initial: true},
	products: {type: Types.Relationship, ref: 'Product', many: true, index: true, require: true, initial: true},
	price: {type: Types.Money, require: true},
	status: {type: Types.Boolean, require: true}
})

Order.track = true
Order.defaultSort = '-createAt'
Order.defaultColumns = 'name, price, description, productionDate, createdAt, updatedAt'

Order.register()