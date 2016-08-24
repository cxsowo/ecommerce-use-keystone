var keystone = require('keystone')
var Types = keystone.Field.Types

var Order = new keystone.List('Order')

Order.add({
	// ordernumber: {type: Types.Text, required: true, default: '', initial: true, unique: true},
	user: {type: Types.Relationship, ref: 'User', many: false, required: true,index: true, initial: true},
	totalprice: {type: Types.Money, required: true, default: 0},
	address: {type: Types.Text, required: true, default: '', initial: true},
	phone: {type: Types.Number, required: true, default: '', initial: true},
	finish: {type: Types.Boolean, required: true, default:false, initial:true}
})

Order.track = true
Order.defaultSort = '-createAt'
Order.defaultColumns = 'finish, address, phone, totalprice, createdAt, updatedAt'

Order.register()