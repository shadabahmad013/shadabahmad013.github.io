// Example using Node.js and the ws library on the server-side
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 }); // Change the port as needed

const clients = new Set();

wss.on('connection', ws => {
  clients.add(ws);

  ws.on('message', message => {
    // Parse the JSON message
    const data = JSON.parse(message);

    // Relay the message to all connected clients except the sender
    clients.forEach(client => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(data));
      }
    });
  });

  ws.on('close', () => {
    clients.delete(ws);
  });
});
