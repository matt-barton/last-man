"use strict";

module.exports = function(db) {
	function login (username, password, callback) {
		db.view('user/byUsername', {key: username.toLowerCase()});
		callback(null, true);
	}

	return {
		login: login
	};
};
