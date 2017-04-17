'use strict';

var colorsPalette = [
	[ '#C02942', '#ECD078' ],
	[ '#FAFCD9', '#FC4416' ],
	[ '#FA6900', '#E0E4CC' ],
	[ '#40C0CB', '#F9F2E7' ],
	[ '#F8B195', '#F67280' ],
	[ '#EEE6AB', '#36393B' ],
	[ '#E32D40', '#152B3C' ],
	[ '#11644D', '#F2C94E' ],
	[ '#360745', '#D61C59' ]
];

function setup() {
	createCanvas(windowWidth, windowHeight);

	strokeWeight(4);

	drawPattern('#C02942', '#ECD078', 40);
}

function drawPattern(backgroundColor, strokeColor, squareSize) {
	squareSize = squareSize || Math.max(floor(random() * 100), 30);

	var rows = windowHeight / squareSize,
			cols = windowWidth / squareSize;

	// set colors
	background(backgroundColor);
	stroke(strokeColor);

	for (let col = 0; col < cols; col++) {
		for (let row = 0; row < rows; row++) {
			push();

			translate(col * squareSize, row * squareSize);

			if (random() > 0.5) {
				// draw left to right
				line(0, 0, squareSize, squareSize);
			} else {
				// draw right to left
				line(0, squareSize, squareSize, 0);
			}

			pop();
		}
	}
}

function generatePattern() {
	var colorComb = colorsPalette[floor(random() * (colorsPalette.length - 1))];

	var num = round(random()) ? 1 : 0;

	drawPattern(colorComb[num], colorComb[num ? 0 : 1]);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);

	generatePattern();
}
