var keystone = require('keystone')
var Types = keystone.Field.Types

var Cart = new keystone.List('Cart')

Cart.add({
	user: {type: Types.Relationship, ref: 'User', required: true, many: false, initial: true},
	products: {
		product : {type: Types.Relationship, ref: 'Product', many: true, index: true},
		num : {type: Types.Number,required: true,initial:true}
	}
})
Cart.track = true
Cart.defaultSort = '-createAt'
Cart.defaultColumns = 'user, createdAt, updatedAt'

Cart.register()