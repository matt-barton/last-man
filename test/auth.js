"use strict";

var should = require('should');
var authModule = require('../lib/Auth.js');

describe('Auth', function(){
	describe('Logon', function(){
		var username = 'USERNAME';
		var password = 'PASSWORD';
		var mockDb = {
			view: function (a, b, callback) {callback(null, {});}
		};

		it('On login attempt, Auth.login attempted', function(done) {
			var Auth = new authModule(mockDb);
			Auth.login(username, password, function(e, success) {
				(typeof e == 'undefined' ||  e === null).should.be.true;
				success.should.not.equal(null);
				success.should.be.type('boolean');
				done();
			});
		});

		it ('On login attempt, user is fetched from db by username', function(done) {
			mockDb.view=  function (viewName, options, callback) {
				viewName.should.equal('user/byUsername');
				options.key.should.equal(username.toLowerCase());
				callback(null, {});
			};
			var Auth = new authModule(mockDb);
			Auth.login(username, password, function(e, success) {
				done();
			});
		});

		it ('On login attempt, if an error occurs, an error is detected', function(done) {
			var error = new Error ('an error');
			mockDb.view=  function (viewName, options, callback) {
				callback(error);
			};
			var Auth = new authModule(mockDb);
			Auth.login(username, password, function(e, success) {
				e.should.equal(error);
				done();
			});
		});

		it ('On login attempt, if username is unknown, failure is returned', function(done) {
			mockDb.view=  function (viewName, options, callback) {
				callback(null, []);
			};
			var Auth = new authModule(mockDb);
			Auth.login(username, password, function(e, success) {
				success.should.be.false;
				done();
			});
		});
	});
});