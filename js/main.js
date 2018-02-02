// word sets
var numToAdj = [];
var adjToNum = {};
var numToNoun = [];
var nounToNum = {};

// read in txt files
d3.csv("../data/adjectives.txt", function(data) {
	// populate sets
	data.forEach(function(d,i) {
  	numToAdj.push(d.word);
  	adjToNum[d.word] = i;
	});
});

// on change of input
$("#input").keyup(function(){
	var value = $("#input").val();
	// if number
	if(hasNumber(value)){
		// remove spaces
		value = value.replace(/\s/g, '');
		// split into 3, 3, 4
		var val1 = parseInt(value.substring(0,3));
		var val2 = parseInt(value.substring(3,6));
		var val3 = parseInt(value.substring(6,10));
		// return corresponding words
		$("#output").text(checkDef(numToAdj[val1]) + " " + checkDef(numToAdj[val2]) + " " + checkDef(numToNoun[val3]));
	}
	// else if string
	else {
		// remove spaces
		var vals = value.split(" ");
		// return corresponding number
		$("#output").text(checkDef(adjToNum[vals[0]]) + "-" + checkDef(adjToNum[vals[1]]) + "-" + checkDef(nounToNum[vals[2]]));
	}
});

// returns true if string contains number
function hasNumber(myString) {
  return /\d/.test(myString);
}
// returns blank instead of undefined
function checkDef(value) {
	if(value==undefined){
		return "________";
	} else {
		return value;
	}
}

