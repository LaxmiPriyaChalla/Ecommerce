var express = require('express')
var mongoose = require('mongoose')
var dotenv = require('dotenv')
const bodyParser = require('body-parser');
var cors = require('cors');

dotenv.config();

const url = 'mongodb://localhost/Ecommerce'
mongoose.connect(url, { useNewUrlParser: true }).then(() => {
    console.log('Connected' + url)
}).catch(err => {
    console.error("App starting error:", err.message);
    process.exit(1);
})

const app = express();
app.response.sendResponse = function (statusCode, success, data, message) {
    var obj = { "success": success, "data": data, message: message };
    return this.contentType("application/json").status(statusCode).send(obj);
}


app.use(bodyParser.json())

app.all('*', function(req, res, next) {
    res.header('X-Frame-Options', 'DENY');
    res.header('X-Content-Type-Options', 'nosniff');
    res.header('Content-Length', '52250');
    res.header('X-XSS-Protection', '1');
    // res.header('Content-Type', 'application/json; charset=utf-8');
    res.header('Cache-Control', 'no-cache');
    next();
});
app.use(cors());

const routes = require('./routes/userRoute');
routes.routes(app)
app.listen(process.env.PORT || 3000, () => {
    console.log('server started')
})