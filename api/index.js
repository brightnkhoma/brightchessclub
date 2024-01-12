import {createTable,insertData, fetchGame, counter} from './archive.db.js'
import express from 'express'
import { Server } from 'socket.io'
import {createServer} from 'node:http'
import cors from 'cors'
import { count } from 'node:console'
import path from 'path'

const app = express();
const __dirname = path.resolve();
app.use(cors());
const server = createServer(app);
const io = new Server(server,
    {
        cors : {
            origin : 'http://localhost:3000',
            methods : ['POST', 'GET']
        }
    ,connectionStateRecovery : {},

    });

    io.on('connection',socket=>{
        console.log('user connected')
       
            socket.on('create_table', async (data)=>{                       
                    await createTable(data)                
            })            
       
        socket.on('insert_data', async (data)=>{           
                await insertData(data.name, data.header, data.pgn,data.id)          
        })
        socket.on('get_game',async (data)=>{
            try {
                const get = await fetchGame(data.name,data.id)
                
                io.to(socket.id).emit('get_game',get)            
            } catch (error) {
                console.log(error)
            }
        })
        socket.on('count', async data=>{
            try {
               
                const count = await counter(data)
                io.to(socket.id).emit('count',count);
            
            } catch (error) {
                console.log(error)
            }
        })
        
    })

    server.listen(4000,()=>{
        console.log('listening on http://localhost:4000');
    })
    app.use(express.static(path.join(__dirname,'/chess/dist')))
    app.get('*',(req,res)=>{
        res.sendFile(path.join(__dirname,'client','dist','index.html'));
    })