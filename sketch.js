
let drops = [];
let valorAnterior;
let valorAnteriorGravity;
let slider;
let sliderGravity;

class Drop {
	constructor(gravityArg) {
		this.x = random(window.width);
		this.y = random(window.width);
		this.z = random(0, 20);
		this.speed = map(this.z, 0, 20, 10, 20);
		this.leng = map(this.z, 0, 20, 1, 10);
		this.gravity = map(this.z, 0, 20, 0, gravityArg);
		this.thick = map(this.z, 0, 20, 0.5, 4);
	}

	fall() {
		this.y += this.speed;
		this.speed += this.gravity;

		if(this.y > window.height) {
			this.y = 0;
			this.speed = map(this.z, 0, 20, 2, 10);
		}
	}

	show() {
		strokeWeight(this.thick);
		stroke(0, 0, 128);
		line(this.x, this.y, this.x, this.y + this.leng);
	}
};

function setup() {
	createCanvas(1535, 752);

	slider = createSlider(50, 1000, 500, 2);
	slider.position(window.width-200, 20);

	sliderGravity = createSlider(0, 1.2, 0.3, 0.1);
	sliderGravity.position(window.width-200, 60);


	for (let i=0; i < slider.value(); i++)
		drops.push(new Drop(sliderGravity.value()));

	valorAnterior = slider.value();
	valorAnteriorGravity = sliderGravity.value()
}


function gradiente(x, y, w, h, c1, c2) {
	for (let i=x; i < x + w; i++) {
		let inter = map(i, x, x+w, 0, 1);
		let c = lerpColor(c1, c2, inter);
		stroke(c);
		line(i, y, i, y+h);
	}
}

function draw() {
	background(150);

	// gradiente(0, 0, width/2, height, color(50), color(255));
	// gradiente(width/2, 0, width/2, height, color(255), color(50));

	text("Nº Gotas", window.width-160, 20);
	text("Gravedad", window.width-160, 60);

	if(slider.value() == valorAnterior || sliderGravity.value() != valorAnteriorGravity) {
		for (let i=0; i < slider.value(); i++) {
			drops[i].fall();
			drops[i].show();
		}
	}

	if(slider.value() != valorAnterior || sliderGravity.value() != valorAnteriorGravity) {
		drops = [];
		for (let i=0; i < slider.value(); i++)
			drops.push(new Drop(sliderGravity.value()));
		valorAnterior = slider.value();
		valorAnteriorGravity = sliderGravity.value();
	}
}
