const mongoose = require('mongoose');
const Product = require('./models/product');

mongoose.connect('mongodb://localhost:27017/farmStand', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Mongo Connection Open")
    })
    .catch((err) => {
        console.log("Ohh NO Mongo error");
        console.log(err);
    })

// const p = new Product({
//     name:'Ruby Grapefruit',
//     price: 30,
//     category : 'fruit'
// })
// p.save()
// .then( p=> {
//     console.log(p)
// })
// .catch( err => {
//     console.log(err)
// })

const seedProducts = [
    {
        name:'Tomato',
        price:10,
        category : 'vegetable'
    },
    {
        name:'Mango',
        price:25,
        category:'fruit'
    },
    {
        name:'Banana',
        price:40,
        category:'fruit'
    },
    {
        name: 'Milk',
        price:52,
        category:'dairy'
    },
    {
        name: 'Curd',
        price:20,
        category: 'dairy'
    }

]

Product.insertMany(seedProducts)
.then(res => {
    console.log(res);
})
.catch(err => {
    console.log(err);
})