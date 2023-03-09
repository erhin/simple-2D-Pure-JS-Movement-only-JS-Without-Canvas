var playzone = document.createElement('div');
var player = document.createElement('div');
var food = document.createElement('div');
var inputX = document.getElementById('inputX');
var inputY = document.getElementById('inputY');
var score = document.getElementById('score');
var counter = parseInt(score.innerHTML);

var playzoneData = {
    width:500,
    height:500,
    position:'absolute',
    backgroundColor:'black',
    top:20,
    left:20,

    playzoneUpdate:function(){
        playzone.style.width = this.width + 'px';
        playzone.style.height = this.height + 'px';
        playzone.style.position = this.position;
        playzone.style.backgroundColor = this.backgroundColor;
        playzone.style.top = this.top + '%';
        playzone.style.left = this.left + '%';
    }
};

var foodData = {
    width:10,
    height:10,
    position:'absolute',
    backgroundColor:'yellow',
    top:Math.floor(Math.random()*playzoneData.width),
    left:Math.floor(Math.random()*playzoneData.height),

    foodUpdate:function(){
        food.style.width = this.width + 'px';
        food.style.height = this.height + 'px';
        food.style.position = this.position;
        food.style.backgroundColor = this.backgroundColor;
        food.style.top = this.top + 'px';
        food.style.left = this.left + 'px';
    }
};

var playerData = {
    width:50,
    height:50,
    position:'relative',
    backgroundColor:'red',
    borderRadius:50,
    top:450,
    left:0,
    speedX:5,
    speedY:5,

    playerUpdate:function(){
        player.style.width = this.width + 'px';
        player.style.height = this.height + 'px';
        player.style.position = this.position;
        player.style.backgroundColor = this.backgroundColor;
        player.style.top = this.top + 'px';
        player.style.left = this.left + 'px';
        player.style.borderRadius = this.borderRadius + '%';
    }
};




playzoneData.playzoneUpdate();
playerData.playerUpdate();
foodData.foodUpdate();


document.body.append(playzone);
playzone.append(player);
playzone.append(food);



function collision(playerData,foodData){
    var playerOX = playerData.left+playerData.width/2;
    var playerOY = playerData.top+playerData.height/2;
    var foodOX = foodData.left+foodData.width/2;
    var foodOY = foodData.top+foodData.height/2;
    var player_food_X = Math.abs(playerOX-foodOX);
    var player_food_Y = Math.abs(playerOY-foodOY);
    var distancePF_X = playerData.width/2+foodData.width/2;
    var distancePF_Y = playerData.height/2+foodData.height/2;
    return player_food_X<=distancePF_X && player_food_Y<=distancePF_Y;
}

    

function move(e){
inputX.value = playerData.left;
inputY.value = playerData.top;

if(collision(playerData,foodData)===true){
    foodData.left = Math.floor(Math.random()*playzoneData.width);
    foodData.top  = Math.floor(Math.random()*playzoneData.height);
    foodData.foodUpdate();    
    playerData.width +=1;
    playerData.height +=1;
    playerData.playerUpdate();
    counter+=1;
    score.innerHTML = counter;
 }

 if(e.keyCode === 39 && playerData.left<=playzoneData.width-playerData.width){
    playerData.left += playerData.speedX;
    playerData.playerUpdate();
 }

 if(e.keyCode === 37 && playerData.left>0){
    playerData.left -= playerData.speedX;
    playerData.playerUpdate();
 }

 if(e.keyCode === 38 && playerData.top>=playerData.speedY){
    playerData.top -= playerData.speedY;
    playerData.playerUpdate();
 }

 if(e.keyCode === 40 && playerData.top<playzoneData.height-playerData.height){
    playerData.top += playerData.speedY;
    playerData.playerUpdate();
 }
 


}

document.addEventListener('keydown', (e)=>move(e));