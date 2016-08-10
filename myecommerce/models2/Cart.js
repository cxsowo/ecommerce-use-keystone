var keystone = require('keystone')
var Types = keystone.Field.Types

var Cart = new keystone.List('Cart')

Cart.add({
	user: {type: Types.Raletionship, ref: 'Product', required: true, many: false, initial: true},
	product: {type: Types.Relationship, ref: 'Product', many: true, index: true},

})
Cart.trace = true
Cart.defaultSort = '-createAt'
Cart.defaultColumns = 'user, createdAt, updatedAt'

Cart.register()