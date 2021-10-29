const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;

//const db = require('./models');

app.use("/api",require("./routes"))

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/social-network', {
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.set('useCreateIndex', true);
mongoose.set('debug', true);


// // Retrieve all users
// app.get('/user', (req, res) => {
//   db.User.find({})
//     .then(dbUser => {
//       res.json(dbUser);
//     })
//     .catch(err => {
//       res.json(err);
//     });
// });


// app.post('/api/submit', ({
//   body
// }, res) => {
//   db.User.create(body)
//     .then(({
//         _id
//       }) =>
//       db.User.findOneAndUpdate({}, {
//         $push: {
//           notes: _id
//         }
//       }, {
//         new: true
//       })
//     )
//     .then(dbUser => {
//       res.json(dbUser);
//     })
//     .catch(err => {
//       res.json(err);
//     });
// });

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


// app.get('/user', (req, res) => {
//   db.User.find({})
//     .populate({
//       path: 'thoughts',
//       select: '-__v'
//     })

//     .then(dbUser => {
//       res.json(dbUser);
//     })
//     .catch(err => {
//       res.json(err);
//     });
// });

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});