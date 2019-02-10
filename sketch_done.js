//Initialize some global letiables
let player;
let playerSize = 45;

let candies;
let candiesEaten = 0;

let timeLimit = 6;
let timer = 0;

let gameOver = false;
let winner = false;

function setup(){
	//Initialize the canvas
	createCanvas(800,600);
	//Initialize the characters
	makeCharacters();
}

function draw(){
	//Redraw the background every time draw is called
	background(0,0,175);

	if (gameOver){
		fill(255);
		textSize(48);
		textAlign(CENTER);
		text("GAME OVER", width/2, height/2 - 40);
		textSize(24);
		text("Click the mouse to restart", width/2, height/2 + 20);
	}
	else if (winner){
		fill(255,255,0);
		textSize(48);
		textAlign(CENTER);
		text("Winner!!!", width/2, height/2 - 40);
		textSize(24);
		text("Click the mouse to restart", width/2,height/2 + 20);
	}
	else{
		//Update the player position according to the mouse position
		player.position.x = mouseX;
		player.position.y = mouseY;

		//If the player hits a member of the candies group, call the 'candyCollision' function
		player.collide(candies, candyCollision);

		drawSprites();

		fill(255);
		textSize(24);
		textAlign(RIGHT);
		text("Score: " + candiesEaten, width-20, 30);

		//Logic for the timer
		timer++;
		let curTime = timeLimit - floor(timer/60);
		text("Time: " + curTime, width-20, 60);	

		//Check if the candies have all been collected or if time has run out
		if (candies.length === 0 ){
			winner = true;
		}
		else if (curTime === 0){
			gameOver = true;
		}
	}
}

function candyCollision(player, candy){
	console.log("Nom nom!");
	candy.remove();
	candiesEaten = candiesEaten + 1;
}

function makeCharacters(){
	//Make the main player
	player = createSprite(width/2, height/2, playerSize, playerSize);
	player.shapeColor = color(255,255,0);

	//Make a 'group' to store the candies
	candies = new Group();
	//Use a 'for loop' to initialize the candy sprites
	//Within the loop, add each candy to the candies group 
	let numCandies = 30;
	for (let i = 0; i < numCandies; i++){
		let candy = createSprite(random(0,width), random(0,height), 20, 20);
		candies.add(candy);
	}
}

function restartGame(){
	//Reset the boolean values
	timer = 0;
	gameOver = false;
	winner = false;

	//Reset the score
	candiesEaten = 0;

	//Remove any left over candy sprites
	candies.removeSprites();
	//Remove player 
	player.remove();

	//Re-make sprites again
	makeCharacters();
}

function mousePressed(){
	//Only restart game if one of these are true
	if (gameOver || winner){
		restartGame();
	}
}