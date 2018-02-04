// slide to id
$("a[href^='#']").click(function(e) {
	e.preventDefault();
	
	var position = $($(this).attr("href")).offset().top;

	$("body, html").animate({
		scrollTop: position
	} /* speed */ );
});

// word sets
var numToAdj = [];
var adjToNum = {};
var numToNoun = [];
var nounToNum = {};

// read in txt files
d3.csv("../data/medium-10k.txt", function(data) {
	// populate sets
	data.forEach(function(d,i) {
  	numToAdj.push(d.word);
  	adjToNum[d.word] = i;
	});
});
d3.csv("../data/all-10k.txt", function(data) {
	// populate sets
	data.forEach(function(d,i) {
  	numToNoun.push(d.word);
  	nounToNum[d.word] = i;
	});
});

// on change of input
$("#input").keyup(function(){
	var value = $("#input").val();
	if(value==""){
		$("#output").text("simple phone numbers");
	}
	// if number
	else if(hasNumber(value)){
		// remove spaces
		value = value.replace(/\s/g, '');
		// split into 3, 3, 4
		var val1 = parseInt(value.substring(0,3));
		var val2 = parseInt(value.substring(3,6));
		var val3 = parseInt(value.substring(6,10));
		// return corresponding words
		$("#output").text(checkDef(numToAdj[val1])
			+ " " + checkDef(numToAdj[val2])
			+ " " + checkDef(numToNoun[val3]));
	}
	// else if string
	else {
		// remove spaces
		var vals = value.toLowerCase().split(" ");
		// return corresponding number
		$("#output").text(pad(checkDef(adjToNum[vals[0]]),3)
			+ "-" + pad(checkDef(adjToNum[vals[1]]),3)
			+ "-" + pad(checkDef(nounToNum[checkDef(vals[2])]),4));
	}
});

// returns true if string contains number
function hasNumber(myString) {
  return /\d/.test(myString);
}
// returns blank instead of undefined
function checkDef(value) {
	if(value==undefined || value==null){
		return "________";
	} else {
		return value;
	}
}
// returns 0 padded number
function pad(n, width, z) {
	if(!hasNumber(n)) return n;
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

