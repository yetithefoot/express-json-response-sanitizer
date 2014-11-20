Express json response sanitizer middleware


Problem
---

Express app should sanitize sensitive objects data. Based on keys.
Ex. API that rsponds with User object, but should not respond with password field.


Usage
---

Use this module as app level middleware.

```javascript
var express = require('express');
var app = express();
var sanitizer = require('../lib/sanitizer');

// build sanitizer middleware - all responses will 
app.use(sanitizer.middleware(['password', 'card', 'email', 'fcuk']))

// build response object
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
    counter: 123,
    fcuk: 'French Connect'

}

// start server
// just curl it or open in browser
app.get('/', function(req, res){
    res.json(200, OBJECT_TO_RESPOND);
});

app.listen(3000);
```

