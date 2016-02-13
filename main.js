// Declaration of win/loss/ratio indices
var winsWhenChanged = 0;
var lossesWhenChanged = 0;
var ratioWhenChanged = 0;

var winsWhenStayed = 0;
var lossesWhenStayed = 0;
var ratioWhenStayed = 0;

var winsTotal = 0;
var lossesTotal = 0;
var ratioTotal = 0;

function statUpdate(prize,changed) {
	// Figure out what happened and update the info
	if (prize && changed) {
		winsWhenChanged++;
		winsTotal++;
		document.getElementById("winsWhenChanged").innerHTML = winsWhenChanged;
	} else if (prize && ! changed) {
		winsWhenStayed++;
		winsTotal++;
		document.getElementById("winsWhenStayed").innerHTML = winsWhenStayed;
	} else if (! prize && changed) {
		lossesWhenChanged++;
		lossesTotal++;
		document.getElementById("lossesWhenChanged").innerHTML = lossesWhenChanged;
	} else {
		lossesWhenStayed++;
		lossesTotal++;
		document.getElementById("lossesWhenStayed").innerHTML = lossesWhenStayed;
	}

	// Update the total wins and losses
	document.getElementById("winsTotal").innerHTML = winsTotal;
	document.getElementById("lossesTotal").innerHTML = lossesTotal;

	// Update total ratio if possible
	if (winsTotal) {
		ratioTotal = ((lossesTotal / (winsTotal + lossesTotal)) * 100).toFixed(2);
		document.getElementById("ratioTotal").innerHTML = ratioTotal.toString().concat("%");
	} else {
		document.getElementById("ratioTotal").innerHTML = "-";
	}

	// Update changed ratio if possible
	if (winsWhenChanged) {
		ratioWhenChanged = ((lossesWhenChanged / (winsWhenChanged + lossesWhenChanged)) * 100).toFixed(2);
		document.getElementById("ratioWhenChanged").innerHTML = ratioWhenChanged.toString().concat("%");
	} else {
		document.getElementById("ratioWhenChanged").innerHTML = "-";
	}

	// Update stayed ratio if possible
	if (winsWhenStayed) {
		ratioWhenStayed = ((lossesWhenStayed / (winsWhenStayed + lossesWhenStayed)) * 100).toFixed(2);
		document.getElementById("ratioWhenStayed").innerHTML = ratioWhenStayed.toString().concat("%");
	} else {
		document.getElementById("ratioWhenStayed").innerHTML = "-";
	}
}

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

function replayQuery() {
	// Put in some buttons to ask if they want to go again
	var buttonContainer = document.getElementById("yesnoButtonContainer");
	buttonContainer.innerHTML = '<hr> <input class="yesnoButton" id="yes" onclick="reinitialize(true)" type="button" value="Yes" /> <input class="yesnoButton" id="no" onclick="reinitialize(false)" type="button" value="No" /> <hr>';
}

function reinitialize(replay) {
	// Get rid of any text I've already outputted
	var buttonContainer = document.getElementById("outputContainer");
	buttonContainer.innerHTML = '';

	// Get rid of the yes/no buttons
	var buttonContainer = document.getElementById("yesnoButtonContainer");
	buttonContainer.innerHTML = '';

	// Respond to their button press
	if (replay) {
		output("Cool! Click a door button to go again.<br><br>");
	} else {
		output("<br><br>Alright, then. Thanks for playing! IF you change your mind, just click a door button to go again.");
	}

	// Re-enable door buttons
	var buttonContainer = document.getElementById("doorButtonContainer");
	buttonContainer.innerHTML = '<input class="doorButton" id="input1" onclick="firstStep(1)" type="button" value="Door 1" /> <input class="doorButton" id="input2" onclick="firstStep(2)" type="button" value="Door 2" /> <input class="doorButton" id="input3" onclick="firstStep(3)" type="button" value="Door 3" />';
}

function firstStep(doorNum) {
	// Disable the door buttons so we don't get extra function calls
	var buttonContainer = document.getElementById("doorButtonContainer");
	buttonContainer.innerHTML = '<input class="doorButton" id="input1" type="button" value="Door 1" /> <input class="doorButton" id="input2" type="button" value="Door 2" /> <input class="doorButton" id="input3" type="button" value="Door 3" />';

	// Get some doors going
	possibleDoors = [1, 2, 3];
	goodDoor = Math.floor(3 * Math.random()) + 1;
	possibleDoors.splice(goodDoor - 1, 1);

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
			output("<br>Your final choice is door " + alternate + " and this door contains the car!!!<br><br>Would you like to play again?");
			statUpdate(1,1);
			replayQuery();
		} else {
			output("<br>Your final choice is door " + alternate + " and this door contains a goat. Sorry.<br><br>Would you like to play again?");
			statUpdate(0,1);
			replayQuery();
		}
	} else {
		if (userDoor === goodDoor) {
			output("<br>Your final choice is door " + userDoor + " and this door contains the car!!!<br><br>Would you like to play again?");
			statUpdate(1,0);
			replayQuery();
		} else {
			output("<br>Your final choice is door " + userDoor + " and this door contains a goat. Sorry.<br><br>Would you like to play again?");
			statUpdate(0,0);
			replayQuery();
		}
	}
}