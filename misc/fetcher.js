var https = require('https');

var get = function get(url, callback) {
  https.get(url, function(res) {
      if (res.statusCode === 302) {
        var next = res.headers['location'];
        get('https://hola.org' + next, callback);
        res.resume();
      } else {
        var body = "";
        res.on('data', function (chunk) {
          body += chunk.toString();
        });

        res.on('end', function (chunk) {
          var data = JSON.parse(body);
          var words = Object.keys(data);
          words.forEach(function(w) {
            console.log(w +','+ data[w]);
          });
        });
      }
  }).on('error', function(e){
      // console.log('Got error: ' + e.message);
  });
};

get('https://hola.org/challenges/word_classifier/testcase');