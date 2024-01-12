import { sqlite3 } from "sqlite3";
import {open} from 'sqlite'


const db = await open ({
    filename : 'archive.db',
    driver : sqlite3.Database
})



export const createTable = async (name,)=>{
    await db.exec(`CREATE TABLE IF NOT EXISTS ${name} (header TEXT PRIMARY KEY,pgn TEXT unique)`).then(()=>{
        console.log('creating table ', name, ' done');
    }).catch(err => console.log('error creating table', err));
}

export const insertData = async (name,header,pgn)=>{
    await db.run (`INSERT INTO ${name}  (header ,pgn) VALUES ?, ?`, [header,pgn],(error)=>{
        console.log('error inserting data \n :',error);
    }).then(()=>{
        console.log('inserting data done');
    })
}

