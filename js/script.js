 var url = "192.168.1.20/clinique/";
  // var url = "localhost/clinique/"
// var url = "clinique.test/";






function rappel() {
	var xml = getHttp();

	xml.open("GET", "http://"+url+"rappel/notifier")

	xml.onreadystatechange = function () {
		if (xml.readyState == 4 && xml.status == 200) {
			if (xml.responseText != "[]")
				document.getElementById("rappel").classList.toggle("notification");
			else
				document.getElementById("rappel").classList.remove("notification");
		}
	}
	xml.send()
}

setInterval(function () {
	rappel();

}, 1000)

function finance() {
	var xml = getHttp();

	xml.open("GET", "http://"+url+"finance/alert")

	xml.onreadystatechange = function () {
		if (xml.readyState == 4 && xml.status == 200) {
			if (xml.responseText != "[]")
				document.getElementById("finance").classList.toggle("notification");
			else
				document.getElementById("finance").classList.remove("notification");
		}
	}
	xml.send()
}

setInterval(function () {
	finance();

}, 1000)



var declenchement = function () {
	var declencheur = document.querySelector(".declencheur");
	var nav = document.querySelector(".navigation-bar");
	var content = document.querySelector(".container-fluid");
	nav.addEventListener("mouseover", function () {
		declencheur.classList.add("declencheur-slide")
		nav.classList.add("slide-menu");
		content.classList.remove("slide-content");
	})
	nav.addEventListener("mouseout", function () {
		declencheur.classList.remove("declencheur-slide")
		nav.classList.remove("slide-menu");
		content.classList.add("slide-content");
	})
}

var notif = function (mode, colonne) {
	var tache = document.querySelector("#notif");
	tache.classList.add("notification");
	tache.innerHTML = "Un " + colonne + " a été " + mode + " <i class='fa fa-sms'></i>"
}
declenchement();

function getHttp() {
	if (window.XMLHttpRequest) {
		// code for modern browsers
		return new XMLHttpRequest();
	} else {
		// code for old IE browsers
		return new ActiveXObject("Microsoft.XMLHTTP");
	}
}
var getCountPatient = function () {
	var XML = getHttp();

	XML.open("GET", "http://"+url+"patient/count");

	XML.onreadystatechange = function () {
		if (XML.readyState == 4 && XML.status == 200) {
			reponse = XML.responseText

			document.getElementById("pat").innerHTML = reponse;
			if (document.querySelector(".pat"))
				document.querySelector(".pat").innerHTML = reponse;


		}
	}

	XML.send()
}
var getCountClient = function () {
	var XML = getHttp();

	XML.open("GET", "http://"+url+"proprietaire/count");

	XML.onreadystatechange = function () {
		if (XML.readyState == 4 && XML.status == 200) {
			document.getElementById("client").innerHTML = XML.responseText;
		}
	}

	XML.send()
}

getCountPatient()
getCountClient()

setInterval(function () {
	getCountPatient()
	getCountClient()
}, 3000);
//==============================================================//

setInterval(() => {

	var xml = getHttp();

	xml.open("GET", "http://"+url+"welcome/datetime");

	xml.onreadystatechange = function () {
		if (xml.status == 200 && xml.readyState == 4) {

			var now = JSON.parse(xml.responseText);

			var date = `${now.weekday} , ${now.mday} ${now.month} ${now.year}. ${now.hours} H ${now.minutes} min ${now.seconds} s`;
			document.getElementById("timer").innerHTML = date
		}
	}
	xml.send();
}, 1000);


document.getElementById("logo").addEventListener("mouseover", function () {
	document.getElementById("logo").innerHTML = "DATA <span class='badge badge-success'>1.0</span>";
})

document.getElementById("logo").addEventListener("mouseout", function () {
	document.getElementById("logo").innerHTML = "Do All TAsk <span class='badge badge-success'>1.0</span>";
})

document.querySelector("#notif").addEventListener("click", function () {
	setTimeout(function () {
		document.querySelector("#notif").classList.remove("notification");
		document.querySelector("#notif").innerHTML = "Notification <i class='fa fa-sms'></i>"
	}, 1000)
})


function stocks() {
	xml = getHttp()
	xml.open("GET", "http://"+url+"medicament/stockinsuffisant")

	xml.onreadystatechange = function () {
		if (xml.readyState == 4 && xml.status == 200) {
			if (xml.responseText != "[]") {
				document.getElementById("med").classList.toggle("notification");
				document.querySelector("#notif").classList.add("notification");
				document.querySelector("#notif").innerHTML = "Medicament en rupture de stock <i class='fa fa-sms'></i>"
			} else {
				document.getElementById("med").classList.remove("notification");
				document.querySelector("#notif").classList.remove("notification");
				document.querySelector("#notif").innerHTML = "Notification <i class='fa fa-sms'></i>"
			}
		}
	}
	xml.send()
}

setInterval(function () {
	stocks();

}, 2000)


function datePeremption() {
	xml = getHttp()
	xml.open("GET", "http://"+url+"medicament/dateperemption")

	xml.onreadystatechange = function () {
		if (xml.readyState == 4 && xml.status == 200) {
			if (xml.responseText != "[]") {

				document.getElementById("med").classList.toggle("notification");
				document.querySelector("#notif").classList.add("notification");
				document.querySelector("#notif").innerHTML = "Date de peremption en approche <i class='fa fa-sms'></i>"
			} else {
				document.getElementById("med").classList.remove("notification");
				document.querySelector("#notif").classList.remove("notification");
				document.querySelector("#notif").innerHTML = "Notification <i class='fa fa-sms'></i>"
			}
		}
	}
	xml.send()
}

setInterval(function () {
	datePeremption();
}, 1500)

datePeremption();

if(document.getElementById("sendEspece"))
{
	document.getElementById("sendEspece").addEventListener("click", function (e) {
		e.preventDefault();
		libelle = document.getElementById("newEspece").value;
	
		xhr = getHttp();
		xhr.open("GET", "http://"+url+"espece/add/" + libelle)
	
		xhr.onreadystatechange = function () {
			if (xhr.readyState == 4 && xhr.status == 200) {
				listeEspece();
			}
		}
		xhr.send()
	})
}


function espece() {
	xhr = getHttp()
	xhr.open("GET", "http://"+url+"espece/getEspece")
	xhr.onreadystatechange = function () {
		if (xhr.status == 200 && xhr.readyState == 4) {
			reponse = JSON.parse(xhr.responseText)
			html = reponse.map(function (rps) {
				return `
				<option value='${rps.codeEspece}'>${rps.libelle_espece}</option>
				`
			})
			if(document.getElementById("newRace"))
				document.getElementById("newRace").innerHTML = html;
		}
	}
	xhr.send();
};

setTimeout(function(){
	espece();
} , 3000)

setTimeout(function(){
	listeEspece();
} , 2500)


function listeEspece(){
xhr = getHttp()
	xhr.open("GET", "http://"+url+"espece/getEspece")
	xhr.onreadystatechange = function () {
		if (xhr.status == 200 && xhr.readyState == 4) {
			reponse = JSON.parse(xhr.responseText)
			html = reponse.map(function (rps) {
				return `
				<div class="form-check">						
							<input class="form-check-input" type="radio" name="espece" onclick="showRace(${rps.codeEspece})" value="${rps.codeEspece}">
							<label class="form-check-label" for="${rps.libelle_espece}">
							${rps.libelle_espece}
							</label>
				</div>`
			}).join("");
			if(document.getElementById("esp"))
				document.getElementById("esp").innerHTML = html;
		}
	}
	xhr.send();	
}




function showRace(codeEspece)
{
	xhr = getHttp()
	xhr.open("GET" , "http://"+url+"race/getRace/" + codeEspece)
	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4 && xhr.status == 200)
		{
			var reponse = JSON.parse(xhr.responseText);

				var liste = document.querySelector("#race");

				if(liste)
				{
					var html = reponse.map(function (race) {
						return `<option value="${race.codeRace}">
	                ${race.nom_race}</option>`;
					}).join("");
					liste.innerHTML = html;
				}
		}
	}
	xhr.send();
}

