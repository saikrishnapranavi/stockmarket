const io = require('socket.io')(server);

io.on('connection', (socket) => {
  console.log('Client connected');

  socket.on('addSip', (sipData) => {
    // Broadcast the new SIP to all clients
    io.emit('newSip', sipData);
  });
});
