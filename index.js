require('./site/index.html')
require('./site/style.css')
require('./site/custom_styles.css')

var app = require('./es6/main')

app.start({ tableId: "table" })