const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const { mainModule } = require('process');
require('dotenv').config();
const { MONGO_URL } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

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

app.listen(3000, () => {
  console.log('App is listening on port 3000');
});
