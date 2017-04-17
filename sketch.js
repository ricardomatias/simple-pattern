'use strict';

var colorsPalette = [
	[ '#C02942', '#ECD078' ],
	[ '#FAFCD9', '#FC4416' ],
	[ '#FA6900', '#E0E4CC' ],
	[ '#40C0CB', '#F9F2E7' ],
	[ '#F8B195', '#F67280' ],
	[ '#EEE6AB', '#36393B' ],
	[ '#E32D40', '#152B3C' ],
	[ '#11644D', '#F2C94E' ]
];

var randomizer = new RandomGenerator(colorsPalette.length);

var patterns = {
	obliqueLines: function(sideSize) {
		if (random() > 0.5) {
			// draw left to right
			line(0, 0, sideSize, sideSize);
		} else {
			// draw right to left
			line(0, sideSize, sideSize, 0);
		}
	},
	triangles: function(sideSize, strokeColor, col, row) {
		fill(strokeColor);
		noStroke();

		// draw top -> down
		beginShape();

		vertex(0, 0);
		vertex(sideSize / 2, sideSize / 2);
		vertex(sideSize, 0);

		endShape(CLOSE);

		beginShape();

		vertex(0, sideSize);
		vertex(sideSize / 2, sideSize / 2);
		vertex(sideSize, sideSize);

		endShape(CLOSE);
	},
	verticalStripes: function(sideSize, strokeColor, col, row) {
		noStroke();

		if (col % 2 === 0) {
			fill(strokeColor);
			rect(0, 0, sideSize, sideSize);
		}
	},
	horizontalStripes: function(sideSize, strokeColor, col, row) {
		noStroke();

		if (row % 2 === 0) {
			fill(strokeColor);
			rect(0, 0, sideSize, sideSize);
		}
	},
	squares: function(sideSize, strokeColor, col, row) {
		noStroke();

		if (row % 2 === 0) {
			if (col % 2 === 0) {
				fill(strokeColor);
				rect(0, 0, sideSize, sideSize);
			}
		} else {
			if (col % 2 !== 0) {
				fill(strokeColor);
				rect(0, 0, sideSize, sideSize);
			}
		}
	}
}

var pttrNames = Object.keys(patterns);

var MAX_SIZE = 120,
		MIN_SIZE = 50;

function setup() {
	createCanvas(windowWidth, windowHeight);

	strokeWeight(4);

	drawPatterns('#C02942', '#ECD078', MIN_SIZE);
}

function drawPatterns(backgroundColor, strokeColor, sideSize) {
	sideSize = sideSize || Math.max(floor(random() * MAX_SIZE), MIN_SIZE);

	var rows = windowHeight / sideSize,
			cols = windowWidth / sideSize;

	var rndIndex = random() > 0.3 ? round(random() * (pttrNames.length - 1)) : 0;

	var pattern = patterns[pttrNames[rndIndex]];

	// set colors
	if (random() * 0.5) {
		background(backgroundColor);
		stroke(strokeColor);
	}
	background(backgroundColor);
	stroke(strokeColor);

	// decide which pattern to draw
	var options = Object.keys(patterns);

	for (let col = 0; col < cols; col++) {
		for (let row = 0; row < rows; row++) {
			push();

			translate(col * sideSize, row * sideSize);

			pattern(sideSize, strokeColor, col, row);

			pop();
		}
	}
}

function drawPattern(sideSize) {
	patterns.obliqueLines(sideSize);
}

function generatePattern() {
	var colorComb = colorsPalette[randomizer.gen()];

	var num = round(random()) ? 1 : 0;

	drawPatterns(colorComb[num], colorComb[num ? 0 : 1]);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);

	generatePattern();
}
