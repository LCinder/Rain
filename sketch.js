
let drops = [];
let valorAnterior;
let slider;

class Drop {
	constructor() {
		this.x = random(window.width);
		this.y = random(window.width);
		this.z = random(0, 20);
		this.speed = map(this.z, 0, 20, 10, 20);
		this.leng = map(this.z, 0, 20, 1, 10);
	}

	fall() {
		this.y += this.speed;
		let gravity = map(this.z, 0, 20, 0, 0.3)
		this.speed += gravity;

		if(this.y > window.height) {
			this.y = 0;
			this.speed = map(this.z, 0, 20, 2, 10);
		}
	}

	show() {
		let thick = map(this.z, 0, 20, 1, 3);
		strokeWeight(thick);
		stroke(0, 0, 128);
		line(this.x, this.y, this.x, this.y + this.leng);
	}
};

function setup() {
	createCanvas(1535, 752);

	slider = createSlider(50, 1000, 500, 2);
	slider.position(window.width-200, 20);


	for (let i=0; i < slider.value(); i++)
		drops.push(new Drop());

	valorAnterior = slider.value();
}

function draw() {
	background(150);
	text("Nº Gotas", window.width-160, 20);

	if(slider.value() == valorAnterior) {
		for (let i=0; i < slider.value(); i++) {
			drops[i].fall();
			drops[i].show();
		}
	}

	if(slider.value() != valorAnterior) {
		drops = [];
		for (let i=0; i < slider.value(); i++)
			drops.push(new Drop());
		valorAnterior = slider.value();
	}
}
