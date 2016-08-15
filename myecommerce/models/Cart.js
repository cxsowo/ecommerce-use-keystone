var keystone = require('keystone')
var Types = keystone.Field.Types

var Cart = new keystone.List('Cart');

Cart.add({
	user: {type: Types.Relationship, ref: 'User', required: true, many: false, initial: true},
	products: {type: Types.Relationship, ref: 'Product', many: false, unique: true, required: true, initial: true},
	num: {type: Types.Number, required: true, default: 1, initial: true},
})
Cart.track = true
Cart.defaultSort = '-createAt'
Cart.defaultColumns = 'user, createdAt, updatedAt'

Cart.register()