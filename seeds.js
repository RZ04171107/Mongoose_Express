const mongoose = require('mongoose');
require('dotenv').config();
const { MONGO_URL } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
mongoose.set('strictQuery', false);

const Product = require('./models/product');

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(MONGO_URL, options);
  console.log('mongodb connected!!!');
}

// const p = new Product({
//   name: 'Ruby grapefruit',
//   price: 1.5,
//   category: 'fruit',
// });
// p.save()
//   .then(console.log(p))
//   .catch((e) => console.log(e));

const seedProducts = [
  {
    name: 'Organic Celery',
    price: 1.6,
    category: 'vegetable',
  },
  {
    name: 'Chocolate Milk',
    price: 2.69,
    category: 'dairy',
  },
  {
    name: 'kiwi',
    price: 0.8,
    category: 'fruit',
  },
  {
    name: 'Fairy Eggplant',
    price: 1.0,
    category: 'vegetable',
  },
];

Product.insertMany(seedProducts)
  .then((res) => console.log(res))
  .catch((e) => console.log(e));
