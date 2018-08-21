var patterns = {
	"firstName": /^[A-Z][a-z]+$/,
	"lastName": /^([A-Z][a-z]+)*$/,
	"phoneNumber": /^(\+91\s?|0)?([0-9]{5}\s?[0-9]{5})+$/,
	"email": /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
}

var formEvents = {
	"actionurl": "userRegistration",
	"firstName": {
		"actionurl": "firstName",
		"errurl": "errMsgFirstName",
		"value": "",
		"matched": false,
		"action": (args) => {
			var firstName = args.target.value.trim();
			var errMsg = document.getElementById(formEvents["firstName"]["errurl"]);
			if(firstName.length === 0) {
				formEvents["firstName"]["matched"] = false;
				errMsg.innerText = "First name is required.";
			} else if(!firstName.match(patterns["firstName"])) {
				formEvents["firstName"]["matched"] = false;
				errMsg.innerText = "First name can contain only alphabets and first letter should be capital";
			} else {
				formEvents["firstName"]["matched"] = true;
				errMsg.innerText = "";
				formEvents["firstName"]["value"] = firstName;
			}
		}
	},
	"lastName": {
		"actionurl": "lastName",
		"errurl": "errMsgLastName",
		"value": "",
		"matched": true,
		"action": (args) => {
			var lastName = args.target.value.trim();
			var errMsg = document.getElementById(formEvents["lastName"]["errurl"]);

			if(!lastName.match(patterns["lastName"])) {
				formEvents["lastName"]["matched"] = false;
				errMsg.innerText = "Last name can contain only alphabets and first letter should be capital";
			} else {
				formEvents["lastName"]["matched"] = true;
				errMsg.innerText = "";
				formEvents["lastName"]["value"] = lastName;
			}
		}
	},
	"phoneNumber": {
		"actionurl": "phoneNumber",
		"errurl": "errMsgPhoneNumber",
		"value": "",
		"matched": false,
		"action": (args) => {
			var phoneNumber = args.target.value.trim();
			var errMsg = document.getElementById(formEvents["phoneNumber"]["errurl"]);

			if(phoneNumber.length === 0) {
				formEvents["phoneNumber"]["matched"] = false;
				errMsg.innerText = "Phone Number is required.";
			} else if(!phoneNumber.match(patterns["phoneNumber"])) {
				formEvents["phoneNumber"]["matched"] = false;
				errMsg.innerText = "Phone Number is not valid.";
			} else {
				formEvents["phoneNumber"]["matched"] = true;
				errMsg.innerText = "";
				formEvents["phoneNumber"]["value"] = phoneNumber;
			}
		}
	},
	"email": {
		"actionurl": "email",
		"errurl": "errMsgEmail",
		"value": "",
		"matched": false,
		"action": (args) => {
			var email = args.target.value.trim();
			var errMsg = document.getElementById(formEvents["email"]["errurl"]);

			if(email.length === 0) {
				formEvents["email"]["matched"] = false;
				errMsg.innerText = "Email is required.";
			} else if(!email.match(patterns["email"])) {
				formEvents["email"]["matched"] = false;
				errMsg.innerText = "Please enter valid Email";
			} else {
				formEvents["email"]["matched"] = true;
				errMsg.innerText = "";
				formEvents["email"]["value"] = email;
			}
		}
	},
	"address": {
		"actionurl": "address",
		"errurl": "errMsgAddress",
		"value": "",
		"action": (args) => {
			var address = args.target.value.trim();
			formEvents["address"]["value"] = address;
		}
	},
	"city": {
		"actionurl": "city",
		"errurl": "errMsgCity",
		"value": "Mumbai",
		"matched": true,
		"action": (args) => {
			var city = args.target.value.trim();
			var errMsg = document.getElementById(formEvents["city"]["errurl"]);
			console.log(city);
			if(city.length === 0) {
				formEvents["city"]["matched"] = false;
				errMsg.innerText = "City is not selected";
			} else {
				formEvents["city"]["matched"] = true;
				errMsg.innerText = "";
				formEvents["city"]["value"] = city;
			}
		}
	},
	"gender": {
		"actionurl": "gender",
		"value": "Male",
		"action": (args) => {
			var gender = args.target.value.trim();
			formEvents["gender"]["value"] = gender;
		}
	},
	"errurl": "errMsgForm",
	"action": (args) => {
		args.preventDefault();
		var patternsMatched = formEvents["firstName"]["matched"] && formEvents["lastName"]["matched"] && formEvents["phoneNumber"]["matched"] && formEvents["email"]["matched"] && formEvents["city"]["matched"];
		if(patternsMatched) {
			document.location.href = "file:///c:/Users/Krish/Desktop/Form/success.html";
		} else {
			var errMsg = document.getElementById(formEvents["errurl"]);
			errMsg.innerText = "Fill the form";
		}
	}
}


function loadEvents() {
	var elem;
	if(document.getElementById(formEvents["firstName"]["actionurl"]) !== null) {
		elem = document.getElementById(formEvents["firstName"]["actionurl"]);
		elem.addEventListener("blur", formEvents["firstName"]["action"]);
	}

	if(document.getElementById(formEvents["lastName"]["actionurl"]) !== null) {
		elem = document.getElementById(formEvents["lastName"]["actionurl"]);
		elem.addEventListener("blur", formEvents["lastName"]["action"]);
	}

	if(document.getElementById(formEvents["phoneNumber"]["actionurl"]) !== null) {
		elem = document.getElementById(formEvents["phoneNumber"]["actionurl"]);
		elem.addEventListener("blur", formEvents["phoneNumber"]["action"]);
	}

	if(document.getElementById(formEvents["email"]["actionurl"]) !== null) {
		elem = document.getElementById(formEvents["email"]["actionurl"]);
		elem.addEventListener("blur", formEvents["email"]["action"]);
	}

	if(document.getElementById(formEvents["address"]["actionurl"]) !== null) {
		elem = document.getElementById(formEvents["address"]["actionurl"]);
		elem.addEventListener("blur", formEvents["address"]["action"]);
	}

	if(document.getElementById(formEvents["city"]["actionurl"]) !== null) {
		elem = document.getElementById(formEvents["city"]["actionurl"]);
		elem.addEventListener("change", formEvents["city"]["action"]);
	}

	if(document.getElementsByName(formEvents["gender"]["actionurl"]) !== null) {
		elem = document.getElementsByName(formEvents["gender"]["actionurl"]);
		for(var gender = 0; gender < elem.length; gender++)
			elem[gender].addEventListener("click", formEvents["gender"]["action"]);
	}

	if(document.getElementById(formEvents["actionurl"]) !== null) {
		elem = document.getElementById(formEvents["actionurl"]);
		elem.addEventListener("submit", formEvents["action"]);
	}
}

window.addEventListener("load", loadEvents);