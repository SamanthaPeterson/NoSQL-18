const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;

const db = require('./models');

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/social-network', {
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.set('useCreateIndex', true);
mongoose.set('debug', true);

db.User.create({ name: 'Samantha Peterson'})
  .then(dbUser => {
    console.log(dbUser);
  })
  .catch(({ message }) => {
    console.log(message);
  });

// Retrieve all notes
app.get('/', (req, res) => {
  db.Note.find({})
    .then(db => {
      res.json(db);
    })
    .catch(err => {
      res.json(err);
    });
});

// Retrieve all users
app.get('/user', (req, res) => {
  db.User.find({})
    .then(dbUser => {
      res.json(dbUser);
    })
    .catch(err => {
      res.json(err);
    });
});


app.post('/api/submit', ({
  body
}, res) => {
  db.user.create(body)
    .then(({
        _id
      }) =>
      db.User.findOneAndUpdate({}, {
        $push: {
          notes: _id
        }
      }, {
        new: true
      })
    )
    .then(dbUser => {
      res.json(dbUser);
    })
    .catch(err => {
      res.json(err);
    });
});

//  app.post('/api/submit', ({
//       body
//     }, res) => {
//       //const user = new User(body);

// //User.create(body)
//   .then(dbUser => {
//     res.json(dbUser);
//   })
//   .catch(err => {
//     res.json(err);
//   });


app.get('/user', (req, res) => {
  db.User.find({})
    .populate({
      path: 'thoughts',
      select: '-__v'
    })

    .then(dbUser => {
      res.json(dbUser);
    })
    .catch(err => {
      res.json(err);
    });
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});