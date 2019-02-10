let player;
let candies;
let candyCount = 20
let candyScore = 0

function setup() {
	//Put setup code here

	createCanvas(600,600);
	background(0,0,255)

	// Create player
	player = createSprite(width/2, height/2, 50,50);
	player.shapeColor = color(250,250,0)

	// Make the candy items and put them all in a group
	candies = new Group();

	for (let i = 0; i < candyCount; i++){
		let candyItem = createSprite(random(0,width), random(0,height), 20, 20);
		candies.add(candyItem);
	}


}

function draw() {
	//Put drawing code here
	background(0,0,255)

	// Move player
	//player.position.x = mouseX
	//player.position.y = mouseY

	// Collision--THAT'S IT
	player.collide(candies, candyCollision);

	if(keyDown(LEFT_ARROW))
		player.velocity.x = -4;
	else if(keyDown(RIGHT_ARROW))
		player.velocity.x = 4;
	else if(keyDown(UP_ARROW))
		player.velocity.y = -4;
		//console.log("Move up");
	else if(keyDown(DOWN_ARROW))
		player.velocity.y = 4;
	else
	{
		player.velocity.x = 0;
		player.velocity.y = 0;
	}

	drawSprites();

	fill(255)
	textSize(36)
	textAlign(LEFT)
	text("Score: " + candyScore, 30, 30)
}

function candyCollision(player, candyItem){
	//console.log("Candy collision!")
	candyItem.remove()

	candyScore += 1
	console.log(candyScore)
}