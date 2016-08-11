var keystone = require('keystone')
var Types = keystone.Field.Types

var ProductItem = new keystone.List('ProductItem')

ProductItem.add({
	product : {type: Types.Relationship, ref: 'Product', many: false, index: true, required: true,initial:true},
	num : {type: Types.Number,required: true, default: 1}
})

ProductItem.track = true
ProductItem.defaultSort = '-createAt'
ProductItem.defaultColumns = 'name, price, description, productionDate, createdAt, updatedAt'

ProductItem.register()