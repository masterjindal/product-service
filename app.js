const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost/productdb', { useNewUrlParser: true, useUnifiedTopology: true });

const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    description: String
});

const Product = mongoose.model('Product', productSchema);

app.post('/products', async (req, res) => {
    const product = new Product(req.body);
    await product.save();
    res.status(201).send(product);
});

app.get('/products/:id', async (req, res) => {
    const product = await Product.findById(req.params.id);
    res.send(product);
});

app.listen(3000, () => {
    console.log('Product service listening on port 3000');
});
 
