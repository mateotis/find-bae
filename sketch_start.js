let player;
let bae;

SCREEN_WIDTH = 600
SCREEN_HEIGHT = 600

isBaeFound = false

function setup() {

	createCanvas(SCREEN_WIDTH,SCREEN_HEIGHT);
	background(255)

	charSetup()

}

function draw() {

	background(255)

	// Collision--THAT'S IT
	player.collide(bae, baeFound);

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

	if(isBaeFound) {
		fill(0, 0, 0)
		textSize(36)
		textAlign(CENTER)
		text("Bae found!", width/2, height/2)
	}

		drawSprites();

	if((isBaeFound) && (keyDown(ENTER))) {
		nextLevel();


	}

}

function baeFound(player, bae){
	isBaeFound = true

}

function charSetup() {

	// Create player
	player = createSprite(width/2, height/2, 50,50);
	player.shapeColor = color(0,0,255)

	// Create bae
	bae = createSprite(random(0, width-50), random(0,height-50), 50,50);
	bae.shapeColor = color(255,0,0)

}

function nextLevel() {
	isBaeFound = false
	player.remove()
	bae.remove()
	charSetup()
}