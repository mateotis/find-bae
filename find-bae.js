let player;
let bae;
let music;
let wall;
let borders;
let cars;
let fakeBaes;

SCREEN_WIDTH = 600
SCREEN_HEIGHT = 600

level = 3
isBaeFound = false

function setup() {

	createCanvas(SCREEN_WIDTH,SCREEN_HEIGHT);
	background(255)

	charSetup()

	//music = loadSound("sounds/music.mp3", playMusic)
	//music.play()

	// cars.forEach(function(element) {
	// 	element.velocity.x = 5;
	// });

}

function playMusic() {
	music.play()
	console.log("Playing music")
}

function draw() {

	background(255)

	// Collision--THAT'S IT
	player.collide(bae, baeFound);
	if(level == 2)
		player.collide(wall)
	player.collide(borders)
	if(level == 3) {
		cars.displace(player)
		cars.collide(borders, switchDirections)
	}

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


	// Create player; always in the same spot
	player = createSprite(width/2, 500, 50,50);
	player.shapeColor = color(0,0,255)

	// Create and place bae
	if(level == 1) {
		bae = createSprite(width/2, 300, 50,50);
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
		bae = createSprite(width/2, 300, 50,50);
		bae.shapeColor = color(255,0,0)
	}	

	console.log(level)
	if(level == 2) {
		console.log(level)
		console.log("no")
		wall = createSprite(0, 200, 1300,30);
		wall.shapeColor = color(0,0,0)
	}


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

	if(level == 3) {
		cars = new Group();
		let cnt = 0
		for (let i = 0; i < 4; i++){
			let car = createSprite(70, 500 - cnt, 70, 50);
			car.shapeColor = color(0,255,0)
			cars.add(car);
			console.log(car.position)
			cnt += 100
		}
		cnt = 0
		cars.forEach(function(car) {
			car.velocity.x = 5;
		})
	}

	if(level == 4) {
		fakeBaes = new Group();
		for (let i = 0; i < 30; i++){
			let fakeBae = createSprite(random(0,width), random(0,height), 50, 50);
			fakeBae.shapeColor = color(230,0,0)
			fakeBaes.add(fakeBae);
	}
	}


}

function nextLevel() {
	console.log("in nextlevel")
	isBaeFound = false
	player.remove()
	bae.remove()
	if(level == 2)
		wall.remove();
	if(level == 3)
		console.log(cars)
		cars.length = 0
		console.log(cars)
	if(level == 4) {
		fakeBaes.forEach(function(fakeBae) {
			fakeBae.remove()
			console.log('removed a fakebae')
		});

	}
	level += 1
	charSetup()
}

function switchDirections() {
	console.log("function called")
	cars.forEach(function(element) {
		console.log(element.velocity.x)
		if(element.velocity.x == 5) {
			console.log("right side turn")
			element.position.x = 550
			element.velocity.x = -5;
		}
		else if(element.velocity.x == -5) {
			//console.log("left side turn")
			element.position.x = 70
			element.velocity.x = 5
		}

	});

}