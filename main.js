document.write("You still there?")

var explain? = prompt("Do you want a brief explanation of the problem?")

if (explain? === "yes" || explain? === "Yes" || explain? === "yeah" || explain? === "Yeah" || explain? === "sure" || explain? === "Sure") {
	document.write("The Monty Hall problem states that if you have 3 options...");
} else if (explain? === "No" || explain? === "no" || explain? === "nah" || explain? === "Nah" || explain? === "Nope" || explain? === "nope") {
	startDemo();
} else {
	document.write("I don't understand what " + explain? + " means. Please try again.")
	//do stuff
}

