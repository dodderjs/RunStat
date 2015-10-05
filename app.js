var Hapi              =     require('hapi'),
    passport          =     require('passport'),
    FacebookStrategy  =     require('passport-facebook').Strategy,
    facebookConfig    =     require('./config/facebook'),
    Hoek = require('hoek'),
    FacebookStrategy = require("passport-facebook"),
    facebookLogin = require("hapi-passport")(new FacebookStrategy(facebookConfig, 
      function verify(accessToken, refreshToken, profile, verified) {
        verified(error, info);
    })),
    server = new Hapi.Server();
    server.connection({host: 'localhost', port: 3000});


server.register(require('vision'), function (err) {

    Hoek.assert(!err, err);

    server.views({
        engines: {
            html: require('handlebars')
        },
        relativeTo: __dirname,
        path: 'templates'
    });
});


server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        reply.view('index', { title: 'My home page' });
    }
});

server.route({
    method: "GET",
    path: "/login/facebook",
    handler: facebookLogin({
        onSuccess: function (info, request, reply) {
            console.log('siker', info)
            reply.view('index', { title: info });
        },
        onFailed: function (warning, request, reply) {
            console.error('FAILED', warning)
        },
        onError: function (error, request, reply) {
          console.error('error nah', error)
        }
    })
});

// Start the server
server.start(function () {
    console.log('Server running at:', server.info.uri);
});