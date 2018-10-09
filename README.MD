Express API should sanitize sensitive json data on `res.json`?

Install
---
`npm install express-json-response-sanitizer`


Usage
---

Use this module as app level middleware to remove sensitive data from json response based on specified property names.

```javascript
var express = require('express');
var app = express();
var sanitizer = require('../lib/sanitizer');

// use sanitizer middleware
app.use(sanitizer.middleware(['password', 'card', 'email']))

var OBJECT_TO_RESPOND = {
    msg: 'Lorem ipsum...',
    user: {
        name: 'John Doe',
        password: '5upers3cr3t',
        geo: {
            code: 'US',
            latitude: '0.0',
            longitude: '0.0'
        },
        email: 'email@example.com',
    },
    card: '0000 0000 0000 0000',
    counter: 123
}


app.get('/', function(req, res){
    res.json(200, OBJECT_TO_RESPOND);
    // will responds with sanitized object
    // {
    //  "msg": "Lorem ipsum...",
    //  "user": {
    //          "geo": {
    //                  "code": "US",
    //                  "latitude": "0.0",
    //                  "longitude": "0.0"
    //          },
    //          "name": "John Doe"
    //  }
    //  "counter": 123,
});

app.listen(3000);
```

