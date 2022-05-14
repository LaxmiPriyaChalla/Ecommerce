const productController = require('../controllers/productController')

exports.routes = (app) => {
    app.post('/api/addProduct', productController.createItem),
    app.post('/api/updateProduct', productController.updateItem),
    app.post('/api/deleteProduct', productController.deleteItem),
    app.post('/api/getProducts', productController.getProducts)
}