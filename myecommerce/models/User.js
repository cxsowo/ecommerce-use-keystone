var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * User Model
 * ==========
 */
var User = new keystone.List('User',{
	track: {updatedAt: true,createdAt: true}
});

User.add({
	name: { type: Types.Text, required: true, index: true,unique: true },
	email: { type: Types.Email, initial: true, required: true, index: true },
	password: { type: Types.Password, initial: true, required: true },
	address: {type: Types.Text, initial: true},
	phone: {type: Types.Number, initial: true}
}, 'Permissions', {
	isAdmin: { type: Boolean, label: 'Can access Keystone', index: true },
});

// Provide access to Keystone
User.schema.virtual('canAccessKeystone').get(function () {
	return this.isAdmin;
});

User.schema.methods.signIn = function(user,cb){
	this.findOne({
		name:user.name
	},function(err, founduser) {
		if(err) cb(err,false);

		if(!founduser){
			console.log("该用户不存在："+founduser.name);
			cb(null,false);
		}
		bcrypt.compare(user.password, founduser.password, function(isMatch){
			if(err){
				cb(err,false);
			}
			if(isMatch)
				cb(null, true);
			else
				cb(null,false);
		})
	});
}

User.schema.methods.signUp = function(user,cb){
	this.findOne({
		name:user.name
	},function(err, founduser) {
		if(err) cb(err,false);

		if(founduser){
			console.log("该用户已存在："+founduser.name);
			cb(null,false);
		}
		newuser = new User(user)
		newuser.save(function(err, u) {
			if(err)  cb(err,false);
			cb(null,true);
		})
	});
}

/**
 * Registration
 */

User.defaultColumns = 'name, email, isAdmin, address ,phone, updatedAt, createdAt';
User.register();