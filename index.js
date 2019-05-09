// implement your API here
const express = require('express');

const db = require('./data/db');

const server = express();
server.use(express.json());

//send back list of all users
server.get('/api/users', (req, res) => {
  db.find()
    .then(allUsers => {
      res.json(allUsers);
    })
    .catch(err => {
      res
        .status(500)
        .json({
          err: `{ error: "The users information could not be retrieved." }`
        });
    });
});

server.post('/api/users', (req, res) => {
  const newUser = req.body;
  console.log('req body', req.body);
  db.insert(newUser)
    .then(addedUser => {
      res.status(201).json(addedUser);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});






server.listen(8500, () => {
  console.log('I have no idea what i\'m doing');
});
