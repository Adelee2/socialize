const app = require('express')();
const request = require('sync-request');
const server = require("http").createServer(app);
const io = require("socket.io")(server);

const SOCKETPORT = process.env.SOCKETPORT || 3032;
// const baseUrl = process.env.BASE_URL || '/api/v1/';

const PORT = process.env.PORT || 3000;
const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";

io.on("connection", (socket) => {

  console.log(`Client ${socket.id} connected`);
  const { conversationId } = socket.handshake.query;
  socket.join(conversationId);
  socket.on(NEW_CHAT_MESSAGE_EVENT, (data) => {
    sendMessage(data)
    console.log("socket data",data)
    io.in(conversationId).emit(NEW_CHAT_MESSAGE_EVENT, data);
  });

  socket.on("disconnect", () => {
    console.log(`Client ${socket.id} diconnected`);
    socket.leave(conversationId);
  });
});

server.listen(SOCKETPORT, () => {
  console.log(`Socialize socket is listening on port ${SOCKETPORT}`);
});

const sendMessage = (message) => {
  request(
    'POST',
    `http://localhost:${PORT}/message/add`,
    { json: {
        message:message.messages,
        to:message.toid
      }});
}
const getMessage = (message, conversationId) => {
  var res = request(
    'GET',
    `http://localhost:${PORT}/messages/${conversationId}`,
    {headers:{'Authorization': message.authorization}}
 );
  console.log(res)
  return JSON.parse(res.getBody('utf8')).data
}