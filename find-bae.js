let player;
let bae;
let music;
let wall;
let borders;
let cars;
let fakeBaes;

let timer = 0
let timeLimit = 4

SCREEN_WIDTH = 600
SCREEN_HEIGHT = 600

level = 0
isBaeFound = false

function preload() { // Preloads the song to make sure there are no playing errors
	song = loadSound("sounds/music.mp3");
}

function setup() {

	createCanvas(SCREEN_WIDTH,SCREEN_HEIGHT);
	background(255)

	mainMenu()

}

function mainMenu() { // Initial screen
	fill(0, 0, 0)
	textSize(36)
	textAlign(CENTER)
	text("press space to play", width/2, height/2) // A different key is used here to advance to stop insta-advancing with a single enter
	textSize(20)
	text("(and enter to progress through levels)", width/1.5, height/1.5)

	if(keyDown(32)) {
		if(song.isPlaying()) // Reloads song at the start of the game
			song.stop()
		song.play()
		level = 1
		charSetup()
	}
}

function draw() {

	background(255)

	if(level == 0) {
		mainMenu()
	}

	// Collision--THAT'S IT
	if(level >= 1) {
		player.collide(bae, baeFound)
		player.collide(borders)
	}
	if(level == 2)
		player.collide(wall)
	if(level == 3) {
		cars.displace(player)
		cars.collide(borders, switchDirections)
	}

	// Player controls
	if(keyDown(LEFT_ARROW))
		player.velocity.x = -3;
	else if(keyDown(RIGHT_ARROW))
		player.velocity.x = 3;
	else if(keyDown(UP_ARROW))
		player.velocity.y = -3;
	else if(keyDown(DOWN_ARROW))
		player.velocity.y = 3;
	else if(level >= 1)
	{
		player.velocity.x = 0;
		player.velocity.y = 0;
	}

	drawSprites();

	if((isBaeFound) && (level < 6)) {
		fill(255, 0, 0)
		textSize(36)
		textAlign(CENTER)
		text("Bae found!", width/2, 50)
	}

	// The most important part!
	if(level == 1) {
		fill(0, 0, 0)
		textSize(36)
		textAlign(CENTER)
		text("sometimes, i just wanna find my bae", width/2, height/2)	
	}

	if(level == 2) {
		fill(0, 0, 0)
		textSize(36)
		textAlign(CENTER)
		text("even if walls separate us", width/2, height/2)	
	}

	if(level == 3) {
		fill(0, 0, 0)
		textSize(36)
		textAlign(CENTER)
		text("even if i have to get in harm's way", width/2, height/2)	
	}

	if(level == 4) {
		fill(0, 0, 0)
		textSize(36)
		textAlign(CENTER)
		text("even if there are many others around", width/2, height/2)	
	}

	if(level == 5) {
		fill(0, 0, 0)
		textSize(36)
		textAlign(CENTER)
		text("sometimes, i just wanna find my bae", width/2, height/2)	
	}

	if(level == 6) { // Since bae is not on the level anymore, there is a different advancing mechanism
		console.log('level 6')
		isBaeFound = false
		fill(0, 0, 0)
		textSize(36)
		textAlign(CENTER)
		text("and tell her i love her", width/2, height/2)

		timer++;
		let curTime = timeLimit - floor(timer/60); // Makes sure the text isn't instantly/accidentally skipped
		if(curTime === 2) {
			nextLevel()
		}
	}

	if(level == 7) {
		console.log('level 7')
		fill(0, 0, 0)
		textSize(36)
		textAlign(CENTER)
		text("happy valentine's day, beloved <3", width/2, height/2)
		text("--máté", width/2, height/1.7)	
		if(keyDown(ENTER))
			nextLevel() // Resets to the menu
	}

	if((isBaeFound) && (keyDown(ENTER))) {
		nextLevel(); // Advancing through levels

	}

}

function baeFound(player, bae){ // The function and the variable names should be the other way around, but oh well
	
	isBaeFound = true
}

function charSetup() {

	// Create player; always in the same spot
	if(level < 6) {
		player = createSprite(width/2, 500, 50,50);
		player.shapeColor = color(0,0,255)
	}

	// Create and place bae
	if(level == 1) {
		bae = createSprite(width/2, 250, 50,50);
		bae.shapeColor = color(255,0,0)
	}
	else if(level == 2) {
		bae = createSprite(width/2, 100, 50,50);
		bae.shapeColor = color(255,0,0)
	}
	else if(level == 3) {
		bae = createSprite(width/2, 150, 50,50);
		bae.shapeColor = color(255,0,0)
	}
	else if(level == 4) {
		bae = createSprite(random(0, width-50), random(0,height-50), 50,50);
		bae.shapeColor = color(255,0,0)
	}
	else if(level == 5) {
		bae = createSprite(width/2, 250, 50,50);
		bae.shapeColor = color(255,0,0)
	}	

	// Walls
	if(level == 2) {
		wall = createSprite(0, 200, 1300,30);
		wall.shapeColor = color(0,0,0)
	}

	// Borders are also always present
	borders = new Group();
	let westBorder = createSprite(0, 0, 5,1500);
	westBorder.shapeColor = color(0,0,0)
	let northBorder = createSprite(0, 0, 1500,5);
	northBorder.shapeColor = color(0,0,0)
	let eastBorder = createSprite(600, 600, 5,1500);
	eastBorder.shapeColor = color(0,0,0)
	let southBorder = createSprite(600, 600, 1500,5);
	southBorder.shapeColor = color(0,0,0)
	if(level != 2) {
		borders.add(westBorder)
		borders.add(northBorder)
		borders.add(eastBorder)
		borders.add(southBorder)
	}

	// Spawns cars and puts them into motion
	if(level == 3) {
		cars = new Group();
		let cnt = 0
		for (let i = 0; i < 4; i++){
			let car = createSprite(70, 500 - cnt, 70, 50);
			car.shapeColor = color(0,255,0)
			cars.add(car);
			cnt += 100
		}
		cnt = 0
		cars.forEach(function(car) {
			car.velocity.x = 10;
		})
	}

	// Creates fakebaes
	if(level == 4) {
		fakeBaes = new Group();
		for (let i = 0; i < 20; i++){
			let fakeBae = createSprite(random(0,width), random(0,height), 50, 50);
			fakeBae.shapeColor = color(230,0,0)
			fakeBaes.add(fakeBae);
	}
	}


}

function nextLevel() {
	isBaeFound = false
	player.remove()
	bae.remove()
	if(level == 2)
		wall.remove();
	if(level == 3) { 
		for(let i = 0; i < 3; i++) { // Extremely hacky; essentially sweeps over the array five times to remove everything
			for(let i = 0; i < cars.length; i++) {
				cars[i].remove()
			}
		}
	}
	if(level == 4) {

		for(let i = 0; i < 5; i++) { // Yeeah...
			for(let i = 0; i < fakeBaes.length; i++) {
				fakeBaes[i].remove()
			}
		}

	}

	level += 1

	if(level == 8) { // Upon reaching the end, go back to the menu
		level = 0
		mainMenu()
	}
	else
		charSetup() // Else, spawn the next level's objects
}

function switchDirections() { // Solely dedicated to making the cars go back and forth
	cars.forEach(function(element) {
		if(element.velocity.x == 10) {
			element.position.x = 550
			element.velocity.x = -10;
		}
		else if(element.velocity.x == -10) {
			element.position.x = 50
			element.velocity.x = 10
		}

	});

}