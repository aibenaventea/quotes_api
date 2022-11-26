const mongoose = require('mongoose');
mongoose.connect('mongodb://0.0.0.0/quotes_api_db', {useNewUrlParser:true});

module.exports = mongoose