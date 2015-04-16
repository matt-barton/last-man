'use strict'

var should = require('should')
var User = require('../lib/User.js');

describe('lms >', function () {

	describe('User >', function () {

		var mockDb = {}

		beforeEach(function (done) {

			mockDb.findUserByUsername = function(username, callback) {
				callback()
			}

			done()
		})

		it('Given a username is supplied to find ' + 
			'When a user is being found ' +
			'Then the username is passed to the db for searching', function (done) {

			var userFoundByUsername = false
			var _username = 'USERNAME'

			mockDb.findUserByUsername = function(username, callback) {
				userFoundByUsername = true
				username.should.equal(_username)
				callback(null, [])
			}

			var user = new User(mockDb)
			user.findOne({
				username: _username
			}, function() {
				userFoundByUsername.should.be.true
				done()
			})
		})


		it('Given no username is supplied to find ' + 
			'When a user is being found ' +
			'Then an error is passed to the callback', function (done) {

			var userFoundByUsername = false

			mockDb.findUserByUsername = function(username, callback) {
				userFoundByUsername = true
				callback()
			}

			var user = new User(mockDb)
			user.findOne({}, function(e) {
				e.should.be.instanceof(Error)
				e.should.have.property('message', 'Cannot find user with no search criteria')
				userFoundByUsername.should.be.false
				done()
			})
		})

		it('Given a username is supplied ' +
			'And no matching user is found ' + 
			'When a user is being found ' +
			'Then a null result is passed to the callback', function (done) {
			mockDb.findUserByUsername = function(username, callback) {
				callback(null, [])
			}

			var user = new User(mockDb)
			user.findOne({
				username: "x"
			}, function(e, result) {
				should.not.exist(e)
				should.not.exist(result)
				done()
			})
		})

		it('Given a username is supplied ' +
			'And one matching user is found ' + 
			'When a user is being found ' +
			'Then a User object is passed to the callback', function (done) {
			var username = 'USERNAME'
			var userId = 'USER_ID'
			var password = 'ENCRYPTED_PASSWORD'
			mockDb.findUserByUsername = function(x, callback) {
				callback(null, [{
					username: username,
					_id: userId,
					password: password
				}])
			}

			var user = new User(mockDb)
			user.findOne({
				username: "x"
			}, function(e, user) {
				should.not.exist(e)
				should.exist(user)
				user.should.be.instanceof(User)
				user.username.should.equal(username)
				user.id.should.equal(userId)
				user.password.should.equal(password)
				done()
			})
		})

		it('Given a username is supplied ' +
			'And > 1 matching user is found ' + 
			'When a user is being found ' +
			'Then an error is passed to the callback', function (done) {
			var username = 'USERNAME'
			var userId = 'USER_ID'
			var password = 'ENCRYPTED_PASSWORD'
			mockDb.findUserByUsername = function(x, callback) {
				callback(null, [{}, {}])
			}

			var user = new User(mockDb)
			user.findOne({
				username: "x"
			}, function(e, user) {
				should.exist(e)
				should.not.exist(user)
				e.should.be.instanceof(Error)
				e.should.have.property('message', 'Found multiple matching users')
				done()
			})
		})
	})
})