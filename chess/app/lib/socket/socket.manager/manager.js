import {socket} from '../socket.io'

export const createTable = (name)=>{
    socket.emit('create_table', name);
}
export const insertData = (data,count)=>{
 socket.emit('insert_data', data,count);
 
};
export const fetchGame = (name, id)=>{
   
    socket.emit('get_game', {name,id});
}
export const counter = (name)=>{
    
    socket.emit('count',name);
}


export const getGame = (data,callback)=>{
    callback(data);
}
export const counted = (data,callback)=>{
    callback(data)
};