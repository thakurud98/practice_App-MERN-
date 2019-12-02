require('../../mongoose')();
var passport = require('passport');
var TwitterToeknStratergy = require('passport-twitter-token')
var FacebookToeknStratergy = require('passport-facebook-token')
var GoogleToeknStratergy = require('passport-google-token').Strategy 
var SocialUserSchema = require('../model/socialUser')
var config = require('../config')

module.exports = function () {
    passport.use(new TwitterToeknStratergy({
        consumerKey: config.twitterAuth.consumerKey,
        consumerSecret: config.twitterAuth.consumerSecret,
        includeEmail: true
    }, function (token, tokenSecret, profile, done){
        SocialUserSchema.upsertTwitterUser(token, tokenSecret, profile, function(err, user){
            return done(err, user)
        })
    }
    ))
}