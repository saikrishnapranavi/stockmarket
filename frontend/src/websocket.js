import { useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:4000'); // Replace with your backend URL

useEffect(() => {
  // Listen for new SIPs
  socket.on('newSip', (newSip) => {
    setSips((prevSips) => [...prevSips, newSip]);
  });

  return () => {
    socket.disconnect();
  };
}, []);
