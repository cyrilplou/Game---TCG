import 'dotenv/config';
//Pour mes variables d'environnement. Editer le fichier .env example
import express from 'express';
import { createServer } from 'node:http';
//Import de mon export du fichier router
import {router} from './app/router.js';
//Import de mon serveur Socket
import { Server } from "socket.io";


//Je crée mon App 
const app = express()
//Mon PORT est défini dans le .env 
const PORT = process.env.PORT 
//Création serveur Socket
const server = createServer(app);
// Paramétrage de mes connnexions Socket et des réponses envoyés à la page.
const io = new Server(server);
io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });
  io.on('connection', (socket) => {
    socket.on('carte joué', (msg) => {
      console.log('message: ' + msg);
    });
  });

  io.on('connection', (socket) => {
    socket.on('carte joué', (msg) => {
      io.emit('carte joué', msg);
    });
  });
// Définition de mes statics //
app.set('view engine', 'ejs');
app.set('views','./app/views')
app.use(express.static('./public'))
app.use(express.urlencoded({ extended: true }));

//J'indique à mon APP d'utiliser le routeur.
app.use(router)

// J'écoute mon Server. ATTENTION, si on enlève le Socket il faudra changer "server" par "app".
server.listen(PORT,()=>{
    console.log(`C'est parti sur le port ${PORT}`)
})