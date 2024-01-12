class Engine{
    constructor(){
        this.stockfish = new Worker('./stockfish.js');
        this.onMessage = (callback) =>{
            this.stockfish.addEventListener('message', (e)=>{
                const bestMove = e.data?.match(/bestmove\s+(\S+)/)?.[1];
                callback({bestMove});
            });            
        }

        this.stockfish.postMessage('uci');
        this.stockfish.postMessage('isReady');
    }
    start(){
        try {
              this.stockfish.postMessage('ucinewgame');
              this.stockfish.postMessage('isReady');
            
        } catch (error) {
            return
            
        }
    }

    evaluatePosition(fen, depth){
        this.stockfish.postMessage(`position fen ${fen}`);
        this.stockfish.postMessage(`go depth ${depth}`);
    }
    stop(){
        this.stockfish.postMessage('stop');
    }
    quit(){
        this.stockfish.postMessage('quit');
        this.stockfish.terminate();
    }

}

export default Engine;
