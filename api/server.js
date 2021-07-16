// build your server here and require it from index.js
const express = require('express');
const server = express();
const projectsRouter = require('./project/router')
const resourceRouter = require('./resource/router')
const taskRouter = require('./task/router')

server.use(express.json());
server.use('/api/projects', projectsRouter)
server.use('/api/resources', resourceRouter)
server.use('/api/tasks', taskRouter)

server.get('/', (req, res) => {
    res.send(`<h2>OMG ANOTHER SPRINT CHALLENGE</h2>`);
});

module.exports = server;