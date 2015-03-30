"use strict";

var User = function(id) {
	this.id = id;
}

User.prototype.getId = function () {
	return this.id;
}

module.exports = User;