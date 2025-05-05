const express = require('express');
const http = require('http');
const path = require('path');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);

const io = socketio(server);
app.use(express.json());

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));


io.on('connection', (socket)=>{
    console.log("user connnected")
    socket.on("send-location",(data)=>{
        io.emit("recieve-location",{
            id: socket.id,
            ...data
        })
    })
    socket.on("disconnect",()=>{
        console.log('user disconnected');
        io.emit("diss",socket.id);
    })
})

app.get('/', (req, res) => {
    res.render('index');
}); 

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});