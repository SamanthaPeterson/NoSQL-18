const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

const db = require('./models');
const {
  User
} = require('./models');

app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());
console.log(process.env.MONGODB_URI)
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/social-network', {
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
});


mongoose.set('debug', true);

// app.listen(PORT, () => console.log(` Connected on localhost:${PORT}`));


app.post('/api/submit', ({
  body
}, res) => {
  //const user = new User(body);

  User.create(body)
    .then(dbUser => {
      res.json(dbUser);
    })
    .catch(err => {
      res.json(err);
    });
});

app.get('/user', (req, res) => {
  User.find({}).then(user => {
    res.json(user);
  });
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});



