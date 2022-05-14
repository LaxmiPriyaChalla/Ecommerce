const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    name: {
        type: "string",
        required: true
    },
    description: {
        type: "string",
        required: true
    },
    price: {
        type: "Number",
        required: true
    }
})

module.exports = mongoose.model('products', productSchema)