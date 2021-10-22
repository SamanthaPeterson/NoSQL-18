const express = require('express');
const mongoose = require('mongoose');

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

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/social-network', {
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// mongoose.set('useCreateIndex', true);
// mongoose.set('debug', true);

// mongoose.set('debug', true);

// app.listen(PORT, () => console.log(` Connected on localhost:${PORT}`));


app.post('/submit', ({
  body
}, res) => {
  const user = new User(body);

  User.create(user)
    .then(dbUser => {
      res.json(dbUser);
    })
    .catch(err => {
      res.json(err);
    });
});

app.get('/users', (req, res) => {
  User.find({}).then(users => {
    res.json(users);
  });
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});


