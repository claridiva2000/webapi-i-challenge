// implement your API here
const express = require('express');

const cors = require('cors');

const db = require('./data/db');

const server = express();

//middleware
server.use(express.json()); //this is required or else your req.body won't come through making it impossible to do a post request.

server.use(cors({origin: 'http://localhost:3000'}))

server.get('/', (req, res) => {
  res.send('Hello world');
});

server.get('/api/users', (req, res) => {
  //specify data type
  //set a status code
  //send a response
  db.find()
    .then(allUsers => {
      res.status(200).json(allUsers);
    })
    .catch(err => {
      res.status(500).json({
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

server.delete('/api/users/:id', (req, res) => {
  const { id } = req.params;
  db.remove(id)
    .then(removedUser => {
      res.json(removedUser);
    })
    .catch(err => {
      res
        .status(404)
        .json({
          err: `{ message: "The user with the specified ID does not exist." }`
        });
    });
});

server.put('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  db.update(id, changes)
    .then(updatedUser => {
      if (updatedUser) {
        res.json(updatedUser);
      } else {
        res
          .status(404)
          .json({
            err: `{ message: "The user with the specified ID does not exist." }`
          });
      }
    })
    .catch(err => {
      res
        .status(404)
        .json({
          err: `{ message: "The user with the specified ID does not exist." }`
        });
    });
  }); 

server.listen(8000, () => {
  console.log("I have no idea what i'm doing");
});
