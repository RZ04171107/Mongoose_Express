const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

require('dotenv').config();
const { MONGO_URL } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
const Product = require('./models/product');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// override with POST having ?_method=DELETE
app.use(methodOverride('_method'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
mongoose.set('strictQuery', false);

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(MONGO_URL, options);
  console.log('mongodb test connected!!!');
}

app.get('/test', (req, res) => {
  res.send('test page!');
});

app.get('/products', async (req, res) => {
  const products = await Product.find({});
  console.log(products);
  res.render('products/index', { products: products });
});

app.get('/products/new', (req, res) => {
  res.render('products/new');
});

app.post('/products', async (req, res) => {
  const newProduct = new Product({
    name: req.body.name,
    price: req.body.price,
    category: req.body.category,
  });
  await newProduct.save();
  console.log(newProduct);
  res.redirect(`/products/${newProduct._id}`);
});

app.get('/products/:_id', async (req, res) => {
  const { _id } = req.params;
  const product = await Product.findById(_id);
  console.log(product);
  res.render('products/detail', { product: product });
});

app.get('/products/:_id/edit', async (req, res) => {
  const { _id } = req.params;
  const product = await Product.findById(_id);
  res.render('products/edit', { product: product });
});

app.put('/products/:_id', async (req, res) => {
  const { _id } = req.params;
  const product = await Product.findByIdAndUpdate(_id, req.body, {
    runValidators: true,
    new: true,
  });
  res.redirect(`/products/${product._id}`);
});

app.delete('/products/:_id', async (req, res) => {
  const { _id } = req.params;
  await Product.findByIdAndDelete(_id);
  res.redirect('/products');
});

app.listen(3000, () => {
  console.log('App is listening on port 3000');
});
