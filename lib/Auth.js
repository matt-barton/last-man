"use strict";

module.exports = function(db) {
	function login (username, password, callback) {
		db.view('user/byUsername', {
			key: username.toLowerCase()
		}, function (e, result) {
			if (e) return callback(e);
			if (result.length == 0) return callback(null, false);
			callback(null, true);
		});
	}

	return {
		login: login
	};
};
