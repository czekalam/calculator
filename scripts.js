var $score = $('.score');
$('.buttons button,.operators button').click(function() {
	addSign($(this).text());
});
$('.clear').click(function() {
	$score.val('');
});
$('.equals').click(function() {
	equal();
});
$('body').on("keyup", function( event ) {
	event.preventDefault();
	console.log(event.keyCode);
	if ((event.keyCode === 187)||(event.keyCode === 13)) {
		equal();
	}
	else if((event.key >= 0)||(event.key < 10)) {
		addSign(event.key);
	}
});
function addSign(sign) {
	var newValue = $score.val() + sign;
	$score.val(newValue);
}
function equal() {
	if(validate( $score.val() )) {
		calculate($score.val());
	}
	else {
		$score.val('wrong statement');
	}
}
function validate(input) {
	var operatorReg = /[\+\-\*\/]/;
	var numberReg = /[0-9]/;
	var input = input.split("");
	var previousOperator=false;

	if( operatorReg.test(input[0]) || operatorReg.test(input[input.length-1]) ) {
		return false;
	}
	input.forEach(sign => {
		if (!(numberReg.test(sign)) || (operatorReg.test(sign))) {
			return false;
		}
	});
	input.forEach(sign => {
		if(operatorReg.test(sign)) {
			if(previousOperator===true) {
				return false;
			}
			previousOperator=true
		}
		else{
			previousOperator=false;
		}
	});
	return true;
}
function calculate(input) {
	$score.val(eval(input));
}