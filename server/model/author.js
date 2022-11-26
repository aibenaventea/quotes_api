const mongoose = require('mongoose');

const AuthorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name required'],
        minLength: [3, 'name must have more than three characters']
    },
    quotes: [
        {
            quote: {
                type: String,
                minLength: [3, 'quote must have more than three characters']
            },
            vote: {
                type: Number,
                default: 0
            }
        }
    ]
});

module.exports = mongoose.model('Author', AuthorSchema);