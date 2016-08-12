var keystone = require('keystone')
var Types = keystone.Field.Types

var Category = new keystone.List('Category')

Category.add({
	name: {type: Types.Text, required: true,initial: true,default: '', unique: true},
	parent: {type: Types.Relationship, ref: 'Category', initial: true }
})
Category.track = true
Category.defaultSort = '-createAt'
Category.defaultColumns = 'name, parent, createdAt, updatedAt'

Category.register()