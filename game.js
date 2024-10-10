class Board {
    constructor(){
        this.rows = 8
        this.columns = 8
        this.board = []
        for (let i = 0; i < this.rows; i++) {
            this.board[i] = []
            for (let j = 0; j < this.columns; j++) {
                this.board[i].push(new Knight([i,j]))
                
            }
            
        }
    }

    printBoard(){
        console.log(this.board[0][0].possibleMoves)
    }
    
    knightMoves(startingLocation,destinationArray){
        //let possibleMoves = [[1,2],[1,-2],[-1,2],[-1,-2],[2,1],[2,-1],[-2,1],[-2,-1]]
        const queue = [{ location: startingLocation, path: [startingLocation] }];
        let set = new Set() // to track old values and avoid infinite loops
        set.add(startingLocation)
        while(queue.length > 0){
            let { location :  currentLocation, path } = queue.shift()
    
            if(this.arrayEquals(currentLocation,destinationArray)) {
                
                console.log(`You made it in ${path.length} moves!  Here's your path:  ${path}`)
                return;
            }
            else{
                const currentKnight = this.board[currentLocation[0]][currentLocation[1]]
                currentKnight.possibleMoves.forEach(possibleLocation => {
                    if(!set.has(possibleLocation) && this.isValidMove(possibleLocation)) {
                        queue.push({location : possibleLocation, path : [...path,possibleLocation]})
                        set.add(possibleLocation)
                    }
                });
                
            }
        }
        return null; 
    
    }
    
    isValidMove([x, y]) {
        return x >= 0 && x < 8 && y >= 0 && y < 8;
    }
    
    // check if two arrays are equal
    arrayEquals(a, b) {
        return Array.isArray(a) &&
            Array.isArray(b) &&
            a.length === b.length &&
            a.every((val, index) => val === b[index]);
    }
}

class Knight {
    constructor(node){
        this.node = node
        this.possibleMoves = [[node[0]+1,node[1]+2],[node[0]+1,node[1]-2],[node[0]-1,node[1]+2],[node[0]-1,node[1]-2],[node[0]+2,node[1]+1],[node[0]+2,node[1]-1],[node[0]-2,node[1]+1],[node[0]-2,node[1]-1]]
    }

}

export { Board }