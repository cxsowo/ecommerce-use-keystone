var keystone = require('keystone')
var Types = keystone.Field.Types

var Cart = new keystone.List('Cart');

Cart.add({
	user: {type: Types.Relationship, ref: 'User', required: true, many: false, initial: true},
	products: {type: Types.Relationship, ref: 'ProductItem', many: true},
})
Cart.track = true
Cart.defaultSort = '-createAt'
Cart.defaultColumns = 'user, createdAt, updatedAt'

Cart.register()