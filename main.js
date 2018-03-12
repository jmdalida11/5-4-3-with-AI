
var values = [5, 4, 3];
const FIVE = 0;
const FOUR = 1;
const THREE = 2;

var Player = {};
Player.p1 = 0;
Player.p2 = 1;

var turn = Player.p1;
var gameOver = false;

var ai = Player.p2;
var human = Player.p1;

function print(){
    var p = "";
    if(turn == Player.p1)
        p = "Player1";
    else
        p = "Player2";
    console.log(p + " turn.");
    console.log(values[FIVE] + " | " + values[FOUR] + " | " + values[THREE]);
}

function move(post, val){
    if(gameOver) return;
    let isSwitch = false;

    if(post == FIVE){
        if(val > 0 && values[FIVE] - val >= 0 && values[FIVE] != 0){
            values[FIVE] -= val;
            check();
            isSwitch = true;
        }else{
            console.log("Invalid Move");
        }
    }else if(post == FOUR){
        if(val > 0 && values[FOUR] - val >= 0 && values[FOUR] != 0){
            values[FOUR] -= val;
            check();
            isSwitch = true;
        }else{
            console.log("Invalid Move");
        }
    }else if(post == THREE){
        if(val > 0 && values[THREE] - val >= 0 && values[THREE] != 0){
            values[THREE] -= val;
            check();
            isSwitch = true;
        }else{
            console.log("Invalid Move");
        }
    }else{
        console.log("Invalid Move. Choices FIVE, FOUR and THREE only");
    }

    if(isSwitch){
        switchTurn();
    }
    print();
   
}

function switchTurn(){
    if(turn == Player.p1){
        turn = Player.p2;
    }  
    else{
        turn = Player.p1;
    }
       
}

function check(){
    if(values[FIVE] == 0 && values[FOUR] == 0 && values[THREE] == 0){
        if(turn != Player.p1){
            console.log("Player1 win!")
        }else{
            console.log("Player2 win!")
        }
        gameOver = true;
    }
}



function eval(node, playerTurn){
    if(playerTurn != ai){
        return -100;
    }else{
        return 100;
    }
    return 0; 
}

function minmax(node, playerTurn){
    var bestscore;
	var bestmove = [-1, -1];

    if(node[FIVE] == 0 && node[FOUR] == 0 && node[THREE] == 0){
        bestscore = eval(node, playerTurn);
    }else{
        if(playerTurn == ai){
            bestscore = -Infinity;
            for(let i=0; i<node.length; i++){
                for(let val=1; val<=node[i]; val++){
                    
                    var newNode = newState(node, i, val);
                    var value = minmax(newNode, human)[0];
                    
                    if(value > bestscore){
                        bestscore =  value;
                        bestmove = [i, val];
                    }
    
                }
            }
        }else{
            bestscore = Infinity;			
            for(let i=0; i<node.length; i++){
                for(let val=1; val<=node[i]; val++){
                    
                    var newNode = newState(node, i, val);
                    var value = minmax(newNode, ai)[0];
                    
                    if(value < bestscore){
                        bestscore =  value;
                        bestmove = [i, val];
                    }
    
                }
            }
        }
    }    
    return [bestscore, bestmove];
}

function newState(node, index, val){
    var newNode = [0,0,0];
    for(let i=0;i<node.length;i++){
        newNode[i] = node[i];
    }
    newNode[index] -= val;
    return newNode;
}

function aiMove(){
    let choice = minmax(values, ai)[1];
    move(choice[0], choice[1]);
}

function main(){
    print();
}

main();