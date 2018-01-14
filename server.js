const express = require("express");
const path = require("path");
const app = express();

/**
 * If an incoming request uses a protocol other than HTTPS, redirect the request to the same URL but with HTTPS
 */
const forceSSL = () => {
  return (req, res, next) => {
    if (req.headers['x-forward-proto'] !== 'https') {
      return res.redirect(
        ['https://', req.get('Host'), req.url].join('')
      );
    }
    next();
  }
}

// instruct the app to use the forceSSL method
// app.use(forceSSL());

// run the app by serving the static files in the dist directory
app.use(express.static(__dirname + '/dist'));

// start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);

// For all GET requests, send back index.html
// so that PathLocationStrategy can be used
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/index.html'));
});