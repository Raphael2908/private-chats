import express from "express"
import { Server } from 'socket.io';
import { createServer } from 'node:http';
import { join } from 'node:path';
import { getTwoRandPrime } from "./prime-generator.js";
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

const app = express()
const server = createServer(app);
const io = new Server(server, {
  connectionStateRecovery: {}
});

const port = 3000

app.use(express.static(join(__dirname, 'public')))

// Sends the html file -> chat.html
app.get('/chat/room', (req, res) => {
  res.sendFile(join(__dirname, 'public/chat.html'))
})

// Join the room 
app.get('/chat/join/:roomkey', (req, res) => {
  const roomkey = req.params.roomkey
  // console.log("roomkey = " + roomkey)
  res.redirect('/chat/room/?roomkey=' + roomkey)
})

// Initialise a room 
app.get('/chat', (req, res) => {
  const primes = getTwoRandPrime(1, 100)
  const p = primes[0].toString().padStart(2, "0")
  const g = primes[1].toString().padStart(2, "0") 
  res.redirect('/chat/room/?roomkey=' + p + g)
})

// Manages sockets
io.on('connection', (socket) => {
  
  // Socket joins a room
  socket.on('keys', (keys, callback) => {
    const rooms = io.of("/").adapter.rooms
    const room = rooms.get(keys)

    socket.on('chat message', (msg)=> {
      console.log(msg)
      io.to(keys).emit('chat message', msg);
    })

    socket.on('key swap server', (keySwapObj) => {

      // if response 
      if(keySwapObj.response == true) {
        // Get id of partner in room
        var partnerId = keySwapObj.partnerId
        
        // Server sends pub key to partner
        io.to(partnerId).emit('key swap response', {
          pubKey: keySwapObj.pubKey,
          partnerId: socket.id,
          type: "res"
        })
        return
      }

      // if initialising

      // Get id of partner in room
      var partnerId = ""
      for (const key of room.keys()) {
        if (key !== socket.id){
          partnerId = key
        }
      }
      
      // Server sends pub key to partner
      io.to(partnerId).emit('key swap', {
        pubKey: keySwapObj.pubKey,
        partnerId: socket.id,
        type: "init"
      })
    })
    

    // If no rooms in server, socket to create a room
    if(!room){
      socket.join(keys) 
      callback({
        // Server returns room details to client socket after receiving room size
        roomSize: 1,
        disconnect: false
      })
      return
    }

    // If room already has one client socket in
    if(room.size == 1) {
      socket.join(keys)
      io.to(keys).emit('user joined', true)

      callback({
        // Server returns room details to client socket after receiving room size
        roomSize: room.size,
        disconnect: false,
      })
      return 
    }

    // If room has 2 sockets, don't allow socket to join
    if(room.size == 2){
      callback({
        roomsize: room.size, 
        disconnect: true
      })
      return
    }
  })
 
});

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

