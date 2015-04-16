'use strict';

var User = function(db) {
	this.db = db
}

User.prototype.buildFromDbDocument = function (doc) {
	this.username = doc.username
	this.id = doc._id
	this.password = doc.password
}

User.prototype.findOne = function (options, callback) {
	var db = this.db
	if (options.username) {
		return this.db.findUserByUsername(options.username, function (e, result) {
			if (result.length == 0) return callback(null, null)
			if (result.length == 1) {
				var user = new User(db)
				user.buildFromDbDocument(result[0])
				return callback(null, user)
			}
			callback(new Error ('Found multiple matching users'))
		})
	}
	callback(new Error('Cannot find user with no search criteria'))
}

module.exports = User;