var keystone = require('keystone')
var Types = keystone.Field.Types

var Expand = new keystone.List('Expand')

Expand.add({
	statement: {type: Types.Text, required: true, initial: true, default:""},
	miniStatement: {type: Types.Text, required: true, initial: true, default:""},
	image: {type: Types.CloudinaryImage, folder: true, autoCleanup : true}
})

Expand.track = true

Expand.defaultSort = '-createAt'
Expand.defaultColumns = 'statement, miniStatement, createdAt, updatedAt';

Expand.register();