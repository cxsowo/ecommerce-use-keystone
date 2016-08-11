var keystone = require('keystone')
var Types = keystone.Field.Types

var Category = new keystone.List('Category')

Category.add({
	name: {type: Types.Text, required: true,initial: true,default: ''},
	parent: {type: Types.Relationship, ref: 'Category', initial: true,required: true,default: ''}
})
Category.track = true
Category.defaultSort = '-createAt'
Category.defaultColumns = 'name, parent, createdAt, updatedAt'

Category.register()