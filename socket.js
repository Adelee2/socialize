const app = require('express')();
const request = require('sync-request');
var cors = require('cors')
require('dotenv').config()
const server = require("http").createServer();
const io = require("socket.io")(server, {
    // cors: {
    //   origin: "https://socialize--web.herokuapp.com",
      // methods: ["GET","PATCH","PUT", "POST"],
      // allowedHeaders: ["my-custom-header"],
      // credentials: true
    // }
    cors:{
      origin:['https://socialize--web.herokuapp.com:3000'],
      methods: ["GET","PATCH","PUT", "POST"],
      allowedHeaders: ["my-custom-header"],
      credentials: true
    }
  });
// var WebSocketServer = require("ws").Server
// var io = new WebSocketServer({server: server})
app.use(cors())
const SOCKETPORT = process.env.SOCKETPORT || 3032;
// const baseUrl = process.env.BASE_URL || '/api/v1/';

const PORT = process.env.PORT || 3000;
const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";
var connectedUsers = {0:[0,0],1:[0,0]};
let numUsers = 0;
let new_chat = "";
io.on("connection", socket => {
    // let addedUser = false;
    console.log(`Client ${socket.id} connected`);
   
    // let conversationId = socket.handshake.issued
    socket.on('newuser',(data)=>{

        
        // sendMessage(data)
        let resa=0;
        for(let i=0;i < data.from.length;i++){
          /* console.log("a,",{i,j}) */
            resa+=data.from[i].charCodeAt(0)
        }
        let resb=0;
        for(let p=0;p < data.to.length;p++){
            /* console.log("b,",{p,q}) */
            resb+=data.to[p].charCodeAt(0)
        }
        let result = resa | resb;
        let result2 = resb | resa;
        if(connectedUsers[result]){
            connectedUsers[result].push(socket.id)
        }
        else{
            connectedUsers[result]=[];
            connectedUsers[result].push(socket.id)
        }
        

        // new_chat = result
        // new_chat=data
        io.emit('newuser',{conversationId:result})
    })

    socket.on("sendmessage", (data) => {
        
        let socketid = connectedUsers[data.conversationId]
        // console.log(data.conversationId,socketid)
        sendMessage(data)
        // console.log("connectedusers",socket.rooms)
        // if(connectedUsers.includes(data.userid) && connectedUsers.includes(data.toid)){
        //     io.in().emit(NEW_CHAT_MESSAGE_EVENT, data);  
        // }
        io.in(socketid).emit("newmessage", data);  
        
    });
    
    // socket.on(NEW_CHAT_MESSAGE_EVENT, (data) => {
    //     console.log("rooms",socket.rooms)
        // for (const room of socket.rooms) {
        //   if (room == socket.id) {
        //       console.log('room found',room)
        //     socket.emit(NEW_CHAT_MESSAGE_EVENT, data);
        //   }
        // }
    //     // io.in(socket.rooms).emit(NEW_CHAT_MESSAGE_EVENT, data);
    // })
    // when the user disconnects.. perform this
    socket.on('disconnect', () => {
        
       
    });
  });

server.listen(SOCKETPORT, () => {
  console.log(`Socialize socket is listening on port ${SOCKETPORT}`);
});

const sendMessage = (message) => {
  request(
    'POST',
    `https://socialize--web.herokuapp.com/message/add`,
    { json: {
        message:message.text,
        to:message.to,
        from:message.from
      }});
}
const getMessage = (message, conversationId) => {
  var res = request(
    'GET',
    `https://socialize--web.herokuapp.com/messages/${conversationId}`,
    {headers:{'Authorization': message.authorization}}
 );
  console.log(res)
  return JSON.parse(res.getBody('utf8')).data
}