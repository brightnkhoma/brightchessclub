import { Chess } from 'chess.js'

export default class CustomChess{
    private chess: Chess
    constructor(chess : Chess) {
        this.chess = chess
    }
    move(from:string,to:string,callback){
        this.chess.move({from,to})
        callback(this.chess.fen())
    }
    pgn (pgn:string,callback){
        this.chess.loadPgn(pgn); 
        callback(this.chess.fen())  
    }
    undo (callback){
        this.chess.undo(); 
        callback(this.chess.fen())  
    }
    fen(fen : string,callback){
        this.chess.load(fen);
        callback(this.chess.fen());
    }
    reset(callback){
        this.chess.reset();
        callback(this.chess.fen());
    }
}