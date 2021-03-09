//////////////////////////////////
setTimeout(function(){
	choixMed();
} , 1500)


function addPatient() {
	let formulaire = document.getElementById("form_patient");

	var XHRreq = new XMLHttpRequest();

	var data = new FormData(formulaire);

	XHRreq.open("POST", "http://"+url+"patient/storePatient");
	XHRreq.onreadystatechange = function(){
		if(XHRreq.status == 200 && XHRreq.readyState == 4)
		{
				setTimeout(function(){
					notif("ajouté" , "patient")
					document.getElementById("closer").click();
				} , 500)
		}
	}
		XHRreq.send(data);

		listePatient();
}

let button = document.getElementById("sendPatient");

button.addEventListener("click", function (e) {
	e.preventDefault()
	addPatient();

})



function choix() {
	xhr = getHttp();

	xhr.open("GET", "http://"+url+"soin/soin/soin")
	xhr.onreadystatechange = function () {
		if (xhr.status == 200 && xhr.readyState == 4) {
			reponse = JSON.parse(xhr.responseText);
			row = reponse.map(function (rps) {
				return `
				<div class="form-check">
				<input class="form-check-input" type="checkbox" value="${rps.rubrique
				}" name="${rps.rubrique}" >
				<label class="form-check-label">
					${rps.rubrique}
				</label>
				</div>
                `
			}).join("");
			document.getElementById("checkBoxes").innerHTML = row;
		}

	}
	xhr.send();
}


function choixMed() {
	
	xhr = getHttp();

	xhr.open("GET", "http://"+url+"medicament/liste")
	xhr.onreadystatechange = function () {
		if (xhr.status == 200 && xhr.readyState == 4) {
			reponse = JSON.parse(xhr.responseText);
			row = reponse.map(function (rps) {
				return `
				<div class="form-check mb-2" style='border:solid 1px rgba(10,10,10,0.2);background-color:rgba(150,120,120,0.12)'>
				<input class="form-check-input" type="checkbox" value="${rps.codeMed}" name="${rps.libelleMed}">
				<label class="form-check-label">
					${rps.libelleMed}
				</label><br>
				<input type="text" name="qte${rps.libelleMed}" placeholder="Quantité"><span style="color:red">${rps.unite}</span> [Stock : ${rps.stock}]<br>
				<input type="checkbox" name="Type${rps.libelleMed}" value='nouveau'>Nouveau produit<br>
				
				</div>
                `
			}).join("");
			document.getElementById("produit-utiliser").innerHTML = row;
		}
// <input type="checkbox" name="Type${rps.libelleMed}" value='nouveau'>Facturer ou pas<br>
	}
	xhr.send();
}


choix();



//===============================================================================//

function addproprio() {

	var XHRreq = new getHttp();

	var data = new FormData();

	data.append("nom", document.getElementById("nom").value)
	data.append("adresse", document.getElementById("adresse").value)
	data.append("email", document.getElementById("email").value)
	data.append("status", document.getElementById("status").value)
	data.append("phone", document.getElementById("phone").value)
	data.append("organisation", document.getElementById("organisation").value)
	XHRreq.open("POST", "http://"+url+"proprietaire/storeproprio")

	XHRreq.send(data);


	listePropri();
}

let button_add = document.getElementById("sendClient");

button_add.addEventListener("click", function (e) {
	e.preventDefault();
	addproprio();
})

let listePropri = function () {
	var XHR = getHttp();

	XHR.open("GET", "http://"+url+"proprietaire/show");

	XHR.onreadystatechange = function () {
		if (XHR.readyState == 4 && XHR.status == 200) {
			var reponse = JSON.parse(XHR.responseText);
			html = reponse.map(function (proprio) {
				return `<option value='${proprio.codeProprio}'>${proprio.nomProprio}</option>`
			}).join("");

			document.getElementById("proprio").innerHTML = html;
		}
	}
	XHR.send();
}
listePropri();


$("#Patient").change(() => {

	value = ($("#Patient").val())
	
	xhr = getHttp();
	xhr.open("GET", "http://"+url+"soin/soin/soin/" + value)
	xhr.onreadystatechange = function () {
		if (xhr.status == 200 && xhr.readyState == 4) {
			reponse = JSON.parse(xhr.responseText);
			row = reponse.map(function (rps) {
				return `
				<div class="form-check">
				<input class="form-check-input" type="checkbox" value="${rps.rubrique
				}" name="${rps.rubrique}" >
				<label class="form-check-label">
					${rps.rubrique}
				</label>
				</div>
                `
			}).join("");
			document.getElementById("checkBoxes").innerHTML = row;
		}

	}
	xhr.send();
})




let listePatient = function () {
	var XHR = getHttp();

	XHR.open("GET", "http://"+url+"patient/liste");

	XHR.onreadystatechange = function () {
		if (XHR.readyState == 4 && XHR.status == 200) {
			var reponse = JSON.parse(XHR.responseText);
			html = reponse.map(function (patient) {
				return `<option value='${patient.codePatient}'>${patient.nomPatient}</option>`
			}).join("");

			document.getElementById("Patient").innerHTML = html;
		}
	}
	XHR.send();
}
listePatient();

let sexe = function () {
	let radio_male = document.querySelector("#male");
	let radio_femelle = document.querySelector("#femelle");

	let selectMale = document.querySelector("#selectMale");
	let selectFemelle = document.querySelector("#selectFemelle");

	radio_male.addEventListener("click", function () {
		selectFemelle.style.display = "none";
		selectFemelle.removeAttribute("name");
		selectMale.style.display = "initial";
	})

	radio_femelle.addEventListener("click", function () {
		selectFemelle.style.display = "initial";
		selectMale.style.display = "none";
		selectFemelle.setAttribute("name" , "sexe");
		//selectFemelle.removeAttribute("name");
	})
}
sexe();


document.getElementById("soigner").addEventListener("click" , function(e){
	data = new FormData(document.getElementById("soin_passe"))
	e.preventDefault()
	xhr = getHttp()
	xhr.open("POST" , "http://"+url+"soin/soigner")
	xhr.onreadystatechange = function()
	{
		if(xhr.readyState == 4 && xhr.status == 200)
		{
			document.getElementById("facture-soin").innerHTML = xhr.responseText;
		}
	}
	xhr.send(data)
})



document.getElementById("sendRace").addEventListener("click" , function(e){
	e.preventDefault()
	xhr = getHttp();
	data = new FormData()
	data.append("codeEspece" , document.getElementById("newRace").value)
	data.append("nom_race" , document.getElementById("newRaceNom").value)

	xhr.open("POST" , "http://"+url+"race/insert");

	xhr.send(data);

	showRace(document.getElementsByName("espece")[0].value);
	
})

// document.getElementById("sendEspece").addEventListener("click" , function(e){
// 	e.preventDefault();
// 	libelle = document.getElementById("newEspece").value;

// 	xhr = getHttp();
// 	xhr.open("GET" , "http://"+url+"espece/add/" + libelle)

// 	xhr.onreadystatechange = function(){
// 		if(xhr.readyState == 4 && xhr.status == 200)
// 		{
// 			//
// 		}
// 	}
// 	xhr.send()
// })

