document.addEventListener("DOMContentLoaded", () => {
	let deck = [],
		suits = ["hearts", "diamonds", "clubs", "spades"],
		faces = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"],
		values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10],
		hand = [],
		pool = [],
		score = 0,
		s,
		t,
		games = 0,
		start = true;
	function regeneratedeck() {
		for (let i = 0; i < 4; i++) {
			for (let j = 0; j < 13; j++) {
				deck.push({
					suit: suits[i],
					face: faces[j],
					value: values[j],
					image: "img/card" + suits[i] + faces[j] + ".png",
				});
			}
		}
	}
	function generateset() {
		for (let i = 0; i < 52; i++) {
			pool.push(i);
		}
		document.getElementById("cards").innerHTML = "";
		let sum = 0;
		hand = [];
		let index;
		while (sum < 12 || hand.length < 2) {
			index = Math.floor(Math.random() * pool.length);
			window.console.log();
			sum += deck[index].value;
			let e = document.createElement("img");
			document.getElementById("cards").appendChild(e);
			e.src = deck[index].image;
			hand.push(deck[index]);
			deck.splice(index, 1);
			pool.splice(index, 1);
		}
		pool = [];
		return sum;
	}
	function startround() {
		document.getElementById("cards").classList.remove(...document.getElementById("cards").classList);
		document.getElementById("score").innerHTML = "Score: " + score;
		if (games !== 0) {
			document.getElementById("average").innerHTML = "Average: " + (score / games).toFixed(0);
		} else {
			document.getElementById("average").innerHTML = "Average: 0";
		}
		document.getElementById("games").innerHTML = "Games: " + games;
		games++;
		regeneratedeck();
		s = generateset();
		t = new Date();
		start = true;
	}
	startround();
	document.getElementById("no").addEventListener("click", () => {
		if (start) {
			start = false;
			let t2 = new Date();
			if (s !== 15) {
				score += 10000 - t2.getMilliseconds() - t.getMilliseconds();
				document.getElementById("cards").classList.add("correct");
			} else {
				score -= 50000 - t2.getMilliseconds() - t.getMilliseconds();
				document.getElementById("cards").classList.add("wrong");
			}
			setTimeout(startround, 100);
		}
	});
	document.getElementById("yes").addEventListener("click", () => {
		if (start) {
			start = false;
			let t2 = new Date();
			if (s === 15) {
				score += 10000 - t2.getMilliseconds() - t.getMilliseconds();
				document.getElementById("cards").classList.add("correct");
			} else {
				score -= 50000 - t2.getMilliseconds() - t.getMilliseconds();
				document.getElementById("cards").classList.add("wrong");
			}
			setTimeout(startround, 100);
		}
	});
	document.addEventListener("keypress", (e) => {
		if (start) {
			if (e.key == "j") {
				start = false;
				let t2 = new Date();
				if (s !== 15) {
					score += 10000 - t2.getMilliseconds() - t.getMilliseconds();
					document.getElementById("cards").classList.add("correct");
				} else {
					score -= 50000 - t2.getMilliseconds() - t.getMilliseconds();
					document.getElementById("cards").classList.add("wrong");
				}
				setTimeout(startround, 100);
			}
			if (e.key == "k") {
				start = false;
				let t2 = new Date();
				if (s == 15) {
					score += 10000 - t2.getMilliseconds() - t.getMilliseconds();
					document.getElementById("cards").classList.add("correct");
				} else {
					score -= 50000 - t2.getMilliseconds() - t.getMilliseconds();
					document.getElementById("cards").classList.add("wrong");
				}
				setTimeout(startround, 100);
			}
		}
	});
});
