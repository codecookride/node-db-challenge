const express = require('express');
const helmet = require('helmet');


const server = express();
const projectRouter = require('./router.js');
server.use(express.json());
server.use(helmet());



server.use('/api/projects', projectRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});






module.exports = server;




