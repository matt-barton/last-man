"use strict";

var should = require('should');
var User = require('../lib/User.js');

describe('User', function(){
	describe('getId', function(){
		it('should get the id passed into the constructor', function(done) {
			var id = 'TEST_ID';
			var user = new User(id);
			user.getId().should.be.exactly(id);
			done();
		});
	});
});