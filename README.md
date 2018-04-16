# express-sanitize-middleware
Sanitize Express request body, query, param, and headers.

Heads up!
This package wraps [MapBox's port of Google's Caja sanitizer](https://github.com/mapbox/sanitize-caja).
Please see the aforementioned repository for details on the actual sanitization functionality.

## Installation
```
# Via NPM
npm install express-sanitize-middleware --save

# Via Yarn
yarn add express-sanitize-middleware
```

## Getting Started
express-sanitize-middleware exposes one function `sanitizeRequest`.

It can be used anywhere Express middleware can.

```javascript
const sanitizeRequest = require('../middleware/express-sanitize-middleware');

router.post('/', [
  sanitizeRequest({
    body: true
  }),
], (req, res, next) => {
  return res.json({message: 'Request body sanitized!'});
});
```

## API Reference
### sanitizeRequest(options)
The options argument is required and should contain at least one key dictacting what request property to sanitize.

| Option key | Default |
| -------- | ----------- |
| body | false |
| header | false |
| params | false |
| query | false |

## License
MIT License Copyright (c) 2018 Joel Colucci