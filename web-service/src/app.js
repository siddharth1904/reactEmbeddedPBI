let path = require('path');
let embedToken = require(__dirname + '/service/embedTokenGeneration.js');
let dashEmbedToken=require("./service/dashboardTokenGen")
const tileEmbedToken=require("./service/tileTokenGeneration")
const express = require("express");
const bodyParser = require("body-parser");
const cors =require('cors')
const app = express();


app.use(cors())
// Prepare server for Bootstrap, jQuery and PowerBI files
app.use('/js', express.static('./node_modules/bootstrap/dist/js/')); // Redirect bootstrap JS
app.use('/js', express.static('./node_modules/jquery/dist/')); // Redirect JS jQuery
app.use('/js', express.static('./node_modules/powerbi-client/dist/')) // Redirect JS PowerBI
app.use('/css', express.static('./node_modules/bootstrap/dist/css/')); // Redirect CSS bootstrap

const port = process.env.PORT || 5300;

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: true
}));


app.get('/getEmbedToken', async function(req, res) {

    // Get the details like Embed URL, Access token and Expiry
    let result = await embedToken.generateEmbedToken();

    // result.status specified the statusCode that will be sent along with the result object
    res.status(result.status).send(result);
});

app.get('/getDashEmbedToken', async function(req, res) {

    // Get the details like Embed URL, Access token and Expiry
    let result = await dashEmbedToken.generateEmbedToken();

    // result.status specified the statusCode that will be sent along with the result object
    
    res.status(result.status).send(result);
});
app.get('/getTileEmbedToken', async function(req, res) {

    // Get the details like Embed URL, Access token and Expiry
    let result = await tileEmbedToken.generateEmbedToken();

    // result.status specified the statusCode that will be sent along with the result object
    
    res.status(result.status).send(result);
});

app.listen(port, () => console.log(`Listening on port ${port}`));