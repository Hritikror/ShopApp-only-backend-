const express = require('express');
const app = express();
const path = require('path');

const mongoose = require('mongoose');
const Product = require('./models/product');
const methodOverride = require('method-override')
app.use(methodOverride('_method'))

mongoose.connect('mongodb://localhost:27017/farmStand', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Mongo Connection Open")
    })
    .catch((err) => {
        console.log("Ohh NO Mongo error");
        console.log(err);
    })


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));  //use a middleware to take data from /products/new
app.use(methodOverride('_method')) //use method-override use update value in mongoDB

app.get('/',(req,res) => {
    res.render('products/home');
})

app.get('/products', async (req, res) => {
    const products = await Product.find({})
    // console.log(products);

    res.render('products/index', { products })
})

app.get('/products/new', (req, res) => {
    res.render('products/new')
})

app.post('/products', async (req, res) => {
    const newProduct = new Product(req.body)    // for simplicity either this will wrong if user enter wrong detail
    await newProduct.save();
    res.redirect(`/products/${newProduct._id}`)
})

app.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.render('products/show', { product })

})

app.get('/products/:id/edit', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.render('products/edit', { product })
})

app.put('/products/:id' ,async(req,res) => {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id,req.body,{runValidators :true , new:true})
    res.redirect(`/products/${product._id}`);
})

app.delete('/products/:id', async(req,res) => {
    const {id} = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    res.redirect('/products');
})

app.listen(3000, () => {
    console.log('Server is Open Now....Good')
})