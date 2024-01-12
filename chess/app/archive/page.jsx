"use client";
import React from 'react'
import {Chessboard} from 'react-chessboard'
import { Chess } from 'chess.js'
import { useState,useMemo,useEffect } from 'react';
import {FaPause, FaGreaterThan, FaPlay, FaLessThan} from 'react-icons/fa'
import {HiMenu} from 'react-icons/hi'
import CustomChess from '../lib/actions';
import {socket} from '../lib/socket/socket.io'
import {counter,counted,fetchGame,getGame} from '../lib/socket/socket.manager/manager.js'


function Page() {
  useEffect(()=>{
    socket.connect();
    return()=>{
      socket.disconnect();
    }
  },[])

  const players = useMemo(()=>([
    'Steinitz',
    'Alekhine',
    'Anand',
    'Carsen',
    'Fischer',
    'Karpov',
    'Kramnic',
    'Morphy',
    'Tal',
    'Modern_openings',
    'worldl9',
    'world1972',
    'world2021',
    'world2023',
  ]),[]) 
  const [pgnNumber, setpgnNumber] = useState(0)
  const [index, setindex] = useState(0); 

    
 
  const [open, setopen] = useState(false);
  const [play, setplay] = useState(false)
  const chess = useMemo(()=>new Chess(),[]);
  const custom = useMemo(()=>new CustomChess(chess),[]);
  const [game, setgame] = useState(chess.fen());
    
  const [fetchedGame, setfetchedGame] = useState({header:null,pgn:null});
  const [count, setcount] = useState(0)

 

  const [gameNumber, setGameNumber] = useState(0); 
  const [point, setpoint] = useState(0)
  const pgn = useMemo(()=>{
    const game = fetchedGame.pgn?.split(/\s+/);
    const filtered = game?.filter(data=>data[data.length - 1] !== '.');
    return filtered;    
  },[fetchedGame])
  useEffect(()=>{
    if (!play) return;
    setTimeout(()=>{
      load()
    },1200)
    
  },[play,point])
  useEffect(()=>{
    const get = (data)=>{
     
      getGame(data,setfetchedGame)
    }
    const getCount = (data)=>{
      counted(data,setcount)
    }
    socket.on('get_game',get)
    socket.on('count',getCount)
    return ()=>{
      socket.off('get_game',get);
      socket.off('count',getCount);
    }
  },[setfetchedGame, setcount])
  useEffect(()=>{
    fecthIt()   
   
  },[index,pgnNumber])
  useEffect(()=>{
    counter(players[index])
    
  },[index, players])
  const load = ()=>{   
    if (point >= pgn.length){
      play && setplay(false);
      return;
    }
    const x = pgn.slice(0,point+1).join(' ');
    custom.pgn(x,setgame); 
    setpoint(point=>point+1);
    
  }
  const undo = ()=>{
    if(play){
      return setplay(false)
    }
    custom.undo(setgame);
    setpoint(point=>point-1)
  }
  const next = ()=>{ 
    if(play){
      return setplay(false)
    }
    if(pgnNumber >= count) return; 
    setpgnNumber(pgnNumber=>pgnNumber+1);
    setpoint(0);
    custom.reset(setgame)

  }
  const prev = ()=>{
    if(play){
      return setplay(false)
    }
    if (pgnNumber < 1) return;
    setpgnNumber(pgnNumber=>pgnNumber-1);
    setpoint(0);
    custom.reset(setgame)
  }
  const loadIt = (point)=>{
    if(play){
      return setplay(false)
    }
    setpoint(point);
    const x = pgn.slice(0, point).join(' ');
    custom.pgn(x,setgame)
  }
  const jump = (e)=>{
    e.preventDefault();
    if (!jump || gameNumber > count) return;
    setpgnNumber(gameNumber-1)
    setpoint(0);
    custom.reset(setgame)
  }
  const fecthIt = ()=>{
    fetchGame(players[index],pgnNumber);    
  }

  return (
    <div className='h-max min-h-screen sm:h-[91vh] mt-5'>
      <div  className='text-white text-lg font-semibold justify-end w-full flex'>
        <HiMenu onClick={()=>setopen(open=>!open)} className={`text-lg ${!open ? 'fixed left-0' : 'hidden'} `}/>
      </div>
     <div className={`${open ? 'w-max fixed' : 'hidden border-none'} border h-max flex flex-col gap-2 p-3 bg-slate-900 transition-all duration-500 z-50`}>
      <div  className='text-white text-lg font-semibold justify-end w-full flex'>
        <HiMenu onClick={()=>setopen(open=>!open)} className={`text-lg ${!open && 'fixed left-0'}`}/>
      </div>
      {players.map((gm,i) =>(
        <span onClick={()=>{
          custom.reset(setgame);
          setpoint(0);
          setindex(i);
          setpgnNumber(0)
          setGameNumber(0);
        }} key={i} className={` ${index===i ? 'text-green-500': 'text-white'}  font-mono font-semibold hover:text-green-600 cursor-pointer hover:translate-x-2 transition-all duration-300`}>{gm}</span>
      ))}
     </div>
     <div className='flex flex-wrap w-max justify-between mx-auto p-5 '>
      
      <div className='w-max sm:hidden flex flex-col gap-2'>

        <div className='flex flex-col justify-center items-center mx-auto'>
          <div className='w-max flex mx-auto'>
        <Chessboard
        position={game}
        boardWidth={380}  
        animationDuration={play ? 800 : 600}      
        />
          </div>
          <div className='flex justify-between mt-2 text-lg text-white w-full'>
          <div className='flex items-center active:text-orange-600' onClick={prev}>
          <FaLessThan/>
          <FaLessThan/>
          </div>

          <div onClick={undo} className='active:text-green-600'>
          <FaLessThan/>
          </div>

          <div onClick={()=>setplay(play=>!play)}>
            {play?  <FaPause /> : <FaPlay/> }
          
          </div>
          
          <div onClick={()=>{
            if(play){
              return setplay(false)
            }
            load()

            }} className='active:text-green-800'>
          <FaGreaterThan/>
          </div>

          <div className='flex items-center active:text-orange-600' onClick={next} >
          <FaGreaterThan/>
          <FaGreaterThan/>
          </div>

        </div>
        </div>
        <div className='flex border flex-col gap-2  max-w-lg w-max h-max justify-center mx-auto '>
        <div>
        <div className=' text-white flex flex-col max-w-sm w-max p-3 rounded-sm'>
        <h2 className='flex flex-1 text-white text-lg font-semibold underline uppercase mb-5'>{players[index]}</h2>
          {
          fetchedGame.header?.split('[').map((header,i) =>{
            const x = header.split('').filter(x => x !== ']').join('');           
            return <span key={i}>{x}</span>

          })
          }
         <div className='flex flex-col mt-5'>
            <span>Game {pgnNumber+1} 0f {count}</span>
            <form onSubmit={jump} className='flex gap-5'>
              <button  className='border rounded-md px-4 py-1'>Jump to : </button>
            <input onChange={(e)=>{
              setGameNumber(e.target.value);
             
            }} type="number"  className='bg-slate-300 bg-opacity-15 border bg-transparent rounded-sm text-white text-lg'/>
            </form>

          </div>
        </div>
        </div>
        <div className='flex flex-wrap max-w-sm mx-auto gap-2 w-max'>

        {pgn?.map((pgn,i)=>(
          <span onClick={()=>{
            loadIt(i+1);
          }} className={`w-max hover:text-orange-600 ${point === i +1 && 'text-green-700'}`} key={i}>{pgn}</span>
        ))}
        </div>
      </div>

      </div>
      <div className='w-max  hidden  sm:flex sm:flex-wrap sm:gap-2 '>
      <div>
        <div className=' text-white flex flex-col max-w-sm w-max border p-3  rounded-sm  '>
        <h2 className='flex-1 text-lg font-semibold underline uppercase mb-5'>{players[index]}</h2>
          {
          fetchedGame.header?.split('[').map((header,i) =>{
            const x = header.split('').filter(x => x !== ']').join('');           
            return <span key={i}>{x}</span>

          })
          }
          <div className='flex flex-col mt-5'>
            <span>Game {pgnNumber+1} 0f {count}</span>
            <form onSubmit={jump} className='flex gap-5'>
              <button  className='border rounded-md px-4 py-1'>Jump to : </button>
            <input onChange={(e)=>{
              setGameNumber(e.target.value);
             
            }} type="number"  className='bg-slate-300 bg-opacity-15 border bg-transparent rounded-sm text-white text-lg'/>
            </form>

          </div>
        </div>
        </div>
        <div className='w-max flex flex-col'>
          <div>

        <Chessboard
        boardWidth={420}      
        position={game} 
        animationDuration={play ? 1000 : 700} 
        />
          </div>

        <div className='flex justify-between mt-2 text-lg text-white'>
          <div className='flex items-center active:text-orange-600' onClick={prev}>
          <FaLessThan/>
          <FaLessThan/>
          </div>

          <div onClick={undo} className='active:text-green-600'>
          <FaLessThan/>
          </div>

          <div onClick={()=>setplay(play=>!play)}>
            {play?  <FaPause /> : <FaPlay/> }
          
          </div>
          
          <div onClick={()=>{
            if(play){
              return setplay(false)
            }
            load()

            }} className='active:text-green-800'>
          <FaGreaterThan/>
          </div>

          <div className='flex items-center active:text-orange-600' onClick={next} >
          <FaGreaterThan/>
          <FaGreaterThan/>
          </div>

        </div>
        </div>

<div className='flex  flex-col gap-2  max-w-lg w-max h-max justify-center mx-auto'>
       
        <div className='flex flex-wrap max-w-sm mx-auto gap-2 border text-white bg-slate-950 p-3 rounded-sm '>

        {pgn?.map((pgn,i)=>(
          <span onClick={()=>loadIt(i+1)} className={`w-max ${point === i+1 && 'text-green-600'} hover:text-orange-500`} key={i}>{pgn}</span>
        ))}
        </div>
      </div>

      </div>
      
      
     </div>
      
      </div>
  )
}

export default Page