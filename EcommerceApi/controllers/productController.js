const productSchema = require('../models/productModel')

exports.createItem = async (req, res) => {
    var name = req.body.name;
    var description = req.body.description;
    var price = req.body.price;
    try {
        var product = new productSchema();
        product.name = name;
        product.description = description;
        product.price = price;
        product.save().then(data => {
            res.sendResponse(200, true, data, 'Item Insterted Successfully')
        }).catch(err => {
            res.sendResponse(500, false, null, err.toString());
        })
    } catch (err) {
        res.sendResponse(500, false, null, err.toString());
    }
}

exports.updateItem = async (req, res) => {
    try {
        var id = req.body._id;
        var name = req.body.name;
        var description = req.body.description;
        var price = req.body.price;
        var data = { name: name, description: description, price: price }
        productSchema.findOneAndUpdate({ _id: id }, data).then(update => {
            res.sendResponse(200, true, update, 'Item Updated Successfully')
        }).catch(err => {
            res.sendResponse(500, false, null, err.toString());
        })
    } catch (err) {
        res.sendResponse(500, false, null, err.toString());
    }
}

exports.deleteItem = async (req, res) => {
    try {
        var id = req.body._id
        productSchema.findOneAndRemove({ _id: id }).then(data => {
            res.sendResponse(200, true, data, 'Item deleted Successfully')
        }).catch(err => {
            res.sendResponse(500, false, null, err.toString());
        })
    } catch (err) {
        res.sendResponse(500, false, null, err.toString());
    }
}

exports.getProducts = async (req,res)=>{
    try{
        productSchema.find({}).then(data => {
            res.sendResponse(200, true, data, 'Fetched Data Successfully')
        }).catch(err => {
            res.sendResponse(500, false, null, err.toString());
        })
    }catch (err) {
        res.sendResponse(500, false, null, err.toString());
    }
}