
  module.exports = {
    'facebookAuth' : {
        'clientID'      : '415899259090150',
        'clientSecret'  : '063e66933371ac85ecc916881a7061d0',
        'callbackURL'     : 'http://localhost:4500/api/auth/facebook/callback',
        'profileURL': 'https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email'

    },

    'twitterAuth' : {
        'consumerKey'        : 'your-consumer-key-here',
        'consumerSecret'     : 'your-client-secret-here',
        'callbackURL'        : 'http://localhost:4500/auth/twitter/callback'
    },

    'googleAuth' : {
        'clientID'         : '122659192363-5r5tvvl0mms3beft64ikovlrupgrugnj.apps.googleusercontent.com',
        'clientSecret'     : 'gZuLt6ND2ctjO0wI1KhLfXSh',
        'callbackURL'      : 'http://localhost:4500/auth/google/callback'
    }
};