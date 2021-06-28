const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const db = require('./queries');
const port = 3000;
const cors = require('cors');
var corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get('/', cors(corsOptions), (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' });
});

app.get('/users', cors(corsOptions), db.getUsers);
app.get('/users/:id', cors(corsOptions), db.getUserById);
app.post('/users', cors(corsOptions), db.createUser);
app.put('/users/:id', cors(corsOptions), db.updateUser);
app.delete('/users/:id', cors(corsOptions), db.deleteUser);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
