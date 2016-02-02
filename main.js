var possibleDoors = [1, 2, 3];
var goodDoor = Math.floor(3 * Math.random()) + 1;
possibleDoors.splice(goodDoor - 1, 1);

function shuffle(array) {
	var m = array.length, t, i;

	// While there is still stuff to shuffle
	while (m) {

		// Pick some random remaining element
		i = Math.floor(Math.random() * m--);

		// Swap that with the current element
		t = array[m];
		array[m] = array[i];
		array[i] = t;
	}
}

function output(text) {
	var whatsThere = document.getElementById("output");

	var container = document.getElementById("outputContainer");
	var newcontent = document.createElement('div');
	newcontent.innerHTML = text;

	while (newcontent.firstChild) {
		container.appendChild(newcontent.firstChild);
	}
}

function firstStep(doorNum) {
	// Disable the door buttons so we don't get extra function calls
	var buttonContainer = document.getElementById("doorButtonContainer");
	buttonContainer.innerHTML = '<input class="doorButton" id="input1" type="button" value="Door 1" /> <input class="doorButton" id="input2" type="button" value="Door 2" /> <input class="doorButton" id="input3" type="button" value="Door 3" />';

	// Check what door got picked and figure out what the other doors are
	if (doorNum === goodDoor) {
		reveal = possibleDoors[0];
		alternate = possibleDoors[1];
	} else if (doorNum === possibleDoors[0]) {
		reveal = possibleDoors[1];
		alternate = goodDoor;
	} else {
		reveal = possibleDoors[0];
		alternate = goodDoor;
	}

	// Assign a global user door variable
	userDoor = doorNum;

	// Bring them the news
	output(	"You have chosen door " + userDoor + ".<br>" + 
			"I will tell you that door " + reveal + " has a goat behind it" + ".<br>" + 
			"Would you like to change your door to door " + alternate + "?" + "<br>");

	// Bring up the yes and no buttons
	var queryContainer = document.getElementById("yesnoButtonContainer");
	queryContainer.innerHTML = '<hr> <input class="yesnoButton" id="yes" onclick="secondStep(true)" type="button" value="Yes" /> <input class="yesnoButton" id="no" onclick="secondStep(false)" type="button" value="No" /> <hr>';
}

function secondStep(selection) {
	// Get rid of the yes and no buttons
	var buttonContainer = document.getElementById("yesnoButtonContainer");
	buttonContainer.innerHTML = '';

	// Decide if they won and tell them
	if (selection) {
		if (alternate === goodDoor) {
			output("<br>Your final choice is door " + alternate + " and this door contains the car!!!");
		} else {
			output("<br>Your final choice is door " + alternate + " and this door contains a goat. Sorry.");
		}
	} else {
		if (userDoor === goodDoor) {
			output("<br>Your final choice is door " + userDoor + " and this door contains the car!!!");
		} else {
			output("<br>Your final choice is door " + userDoor + " and this door contains a goat. Sorry.");
		}
	}
}