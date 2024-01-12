import {open} from 'sqlite'
import  sqlite3  from 'sqlite3'

const db = await open ({
    filename: 'archive1.db',
    driver : sqlite3.Database
})

export const createTable = async (name)=>{
    await db.exec(`CREATE TABLE IF NOT EXISTS ${name} (id integer PRIMARY KEY,header TEXT, pgn TEXT unique )`)
    .then(() => console.log('created table successfully'))
    .catch((err) => console.log('an error occurred while creating table', err));
  
}
export const insertData = async (name, header, pgn, id) => {
    await db.run(`INSERT INTO ${name} (id, header, pgn) VALUES (?, ?, ?)`, id, header, pgn)
      .then(async()=>{
        const result = await db.get(`SELECT COUNT(*) as count FROM ${name}`)
        console.log(result.count,' done !')
      })
      .catch(err => console.log(err));
  };
  
  export const fetchGame = async (name, id) => {
   
    
    try {
      const data = await db.get(`SELECT header, pgn FROM ${name} WHERE id = ?`,id+1);          
      return data;
    } catch (err) {
      console.log(err);
    }
  };
  
  
  export const counter =async (name)=>{
    let count = 0;
    await db.get(`SELECT COUNT(*) as count FROM ${name}`).then((data)=>count=data.count).catch(err=>console.log(err));     
    return count;
  }
