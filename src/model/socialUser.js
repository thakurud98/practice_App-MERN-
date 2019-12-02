'use strict'

var mongoose = require('mongoose')
var Schema = mongoose.Schema;

    var SocialUserSchema = new Schema({
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        },
        facebookProvider: {
            type: {
                id: String,
                token: String
            },
            select: false
        },
        twitterProvider: {
            type: {
                id: String,
                token: String
            },
            select: false
        },
        googleProvider: {
            type: {
                id: String,
                token: String
            },
            select: false
        }
    }, {collection: 'task', timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}})
    /**
     * virtuals: If you use toJSON() or toObject() mongoose will not include virtuals by default. This includes the output of calling JSON.stringify() on a Mongoose document, because JSON.stringify() calls toJSON(). Pass { virtuals: true } to either toObject() or toJSON().
     * getters: Mongoose getters and setters allow you to execute custom logic when getting or setting a property on a Mongoose document. Getters let you transform data in MongoDB into a more user friendly form, and setters let you transform user data before it gets to MongoDB., Suppose you have a User collection and you want to obfuscate user emails to protect your users' privacy
     */
    SocialUserSchema.set('toJSON',{virtuals: true, getters: true})

    /**Twitter Handeling */
    SocialUserSchema.static.upsertTwitterUser = function(token, tokenSecret, profile, cb) {
        var that = this
        return this.findOne({
            'twitterProvider.id': profile.id
        }, function(err, user){
            // no user was found, lets create a new one
            if(!user) {
                var newUser = new that({
                    email: profile.emails[0].value,
                    twitterProvider:{
                        id: profile.id,
                        token,
                        tokenSecret
                    }
                })
                newUser.save(function(error, savedUser){
                    if(error) console.log(error)
                    return cb(error, savedUser)
                })
            }
            else return cb(err, user)
        })
    }

    /**Facebook Handeling */
    SocialUserSchema.static.upsertFacebook = function(accessToken, refreshToken, profile, cb) {
        var that = this;
        return this.findOne({
            'facebookProvider.id': profile.id
        }, function(err, user) {
            // no user was found, lets create a new one
            if (!user) {
                var newUser = new that({
                    fullName: profile.displayName,
                    email: profile.emails[0].value,
                    facebookProvider: {
                        id: profile.id,
                        token: accessToken
                    }
                });

                newUser.save(function(error, savedUser) {
                    if (error) {
                        console.log(error);
                    }
                    return cb(error, savedUser);
                });
            } else {
                return cb(err, user);
            }
        });
    };

    /**Google handeling */
    SocialUserSchema.statics.upsertGoogleUser = function(accessToken, refreshToken, profile, cb) {
        var that = this;
        return this.findOne({
            'googleProvider.id': profile.id
        }, function(err, user) {
            // no user was found, lets create a new one
            if (!user) {
                var newUser = new that({
                    fullName: profile.displayName,
                    email: profile.emails[0].value,
                    googleProvider: {
                        id: profile.id,
                        token: accessToken
                    }
                });

                newUser.save(function(error, savedUser) {
                    if (error) {
                        console.log(error);
                    }
                    return cb(error, savedUser);
                });
            } else {
                return cb(err, user);
            }
        });
    };
    
    
    const SocialUserSchema = mongoose.model("SocialUserSchema", SocialUserSchema)
    
    
    module.exports = SocialUserSchema