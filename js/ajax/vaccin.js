function choix() {
	xhr = getHttp();

	xhr.open("GET", "http://"+url+"soin/soin/vaccination")
	xhr.onreadystatechange = function () {
		if (xhr.status == 200 && xhr.readyState == 4) {
			reponse = JSON.parse(xhr.responseText);
			row = reponse.map(function (rps) {
				return `
				<div class="form-check">
				<input class="form-check-input" type="checkbox" value="${rps.rubrique}" name="${rps.rubrique}" >
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

$("#Patient").change(() => {

    value = ($("#Patient").val())
    
    xhr = getHttp();
    xhr.open("GET", "http://"+url+"soin/soin/vaccination/" + value)
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





document.getElementById("sendRace").addEventListener("click" , function(e){
	e.preventDefault()
	xhr = getHttp();
	data = new FormData()
	data.append("codeEspece" , document.getElementById("newRace").value)
	data.append("nom_race" , document.getElementById("newRaceNom").value)

	xhr.open("POST" , "http://"+url+"race/insert");

	xhr.send(data)
})


function parametre(codeParametre) {
	xhr = getHttp();

	xhr.open("GET", "http://"+url+"parametre/showParametre/" + codeParametre);

	xhr.onreadystatechange = function () {
		if (xhr.readyState == 4 && xhr.status == 200) {
			fiche = document.getElementById("parametre-fiche");

			reponse = JSON.parse(xhr.responseText);

			html = reponse.map(function (response) {
				return `
                <li class="list-group-item d-flex justify-content-between align-items-center">
                    Fréquence cardiaque : <span class="badge badge-secondary badge-pill">${response.freqCard} b / m</span></li>
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                    Fréquence respiratoire : <span class="badge badge-secondary badge-pill">${response.freqResp}</span></li>
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                    T.R.C : <span class="badge badge-secondary badge-pill">${response.TRC}</span></li>
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                    Témperature : <span class="badge badge-secondary badge-pill">${response.temperature} ° C</span></li>
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                    Poids : <span class="badge badge-secondary badge-pill">${response.poids} kg</span></li>
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                    Taille : <span class="badge badge-secondary badge-pill">${response.taille} cm</span></li>
                `
            }).join("");
            
            fiche.innerHTML = html;
		}
	}
	xhr.send();
}

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


let listeProprio = function () {
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
listeProprio();


function addPatient() {
    let formulaire = document.getElementById("form_patient");

    var XHRreq = new XMLHttpRequest();

    var data = new FormData(formulaire);

    XHRreq.open("POST", "http://"+url+"patient/storePatient");

    XHRreq.onreadystatechange = function () {
        if (XHRreq.status == 200 && XHRreq.readyState == 4) {
            setTimeout(function () {
                let tache = document.querySelector("#notif");
                tache.classList.add("notification");
                tache.innerHTML = "Un nouveau patient ajouté <i class='fa fa-sms'></i>"
            }, 1000)
            listePatient();
        }
    }
    XHRreq.send(data);

}


//========================================================================//
let button = document.getElementById("sendPatient");

button.addEventListener("click", function (e) {
    e.preventDefault();
    addPatient();
    listeProprio();
setTimeout(function(){
    document.getElementById("closer").click();
} , 2000)

})





document.getElementById("sendParametre").addEventListener("click" , function(e){
    
    e.preventDefault();
    
    xhr = getHttp();
    
    xhr.open("POST" , "http://"+url+"parametre/store/")

    formulaire = document.getElementById("parametreNew");

    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 200)
        {
            document.getElementById("fichePatient").setAttribute("value" , xhr.responseText);
            setTimeout(function(){
            document.getElementById("closed-param").click()} , 1500)
        }
    }
    data = new FormData(formulaire);

    xhr.send(data);
})



function addproprio() {

    var XHRreq = new getHttp();

    var data = new FormData();

    data.append("nom" , document.getElementById("nom").value)
    data.append("adresse" , document.getElementById("adresse").value)
    data.append("email" , document.getElementById("email").value)
    data.append("status" , document.getElementById("status").value)
    data.append("phone" , document.getElementById("phone").value)
    data.append("organisation" , document.getElementById("organisation").value)
    XHRreq.open("POST", "http://"+url+"proprietaire/storeproprio")

    XHRreq.send(data);

    listeProprio() ;
}

let button_add = document.getElementById("sendClient");

button_add.addEventListener("click", function (e) {
    e.preventDefault();
    addproprio();
})


function traiter(value)
{
    if(value  != 1 && value != 3 )
    {
        document.getElementById("traitement").style.display = "initial";
        document.getElementById("rappeler-vaccin").style.display ="none";
    }
    else if(value == 3)
    {
        document.getElementById("rappeler-vaccin").style.display ="initial";
        document.getElementById("traitement").style.display = "initial";

    }
    else
        {
            document.getElementById("rappeler-vaccin").style.display ="none";
            document.getElementById("traitement").style.display = "none";
        }
}

function choixMed() {
	
	xhr = getHttp();

	xhr.open("GET", "http://"+url+"medicament/listes/vaccin")
	xhr.onreadystatechange = function () {
		if (xhr.status == 200 && xhr.readyState == 4) {
			reponse = JSON.parse(xhr.responseText);
			row = reponse.map(function (rps) {
				return `
				<div class="form-check mb-2" style='border:solid 1px rgba(10,10,10,0.2);background-color:rgba(150,120,120,0.12)'>
				<input class="form-check-input" type="checkbox" value="${rps.codeMed}" name="${rps.libelleMed}">
				<label class="form-check-label">
					${rps.libelleMed}
				</label>
				<input type='text' class='form-control form-control-sm' name='qte${rps.libelleMed}'>${rps.unite} <span style='color:blue'>[Stock actuel: ${rps.stock} ${rps.unite}]</span>
				</div>
                `
			}).join("");
			document.getElementById("produit-utiliser").innerHTML = row;
		}

	}
	xhr.send();
}

setTimeout(function(){
    choixMed();
} , 2000)

setTimeout(function(){
    choix()
} , 1500);


function traiter(value)
{
    
    if(value == 3)
    {
        document.getElementById("rappeler-vaccin").style.display ="initial";
    }
    else
        {
            document.getElementById("rappeler-vaccin").style.display ="none";
        }
}

document.getElementById("sendEspece").addEventListener("click" , function(e){
	e.preventDefault();
	libelle = document.getElementById("newEspece").value;

	xhr = getHttp();
	xhr.open("GET" , "http://"+url+"espece/add/" + libelle)

	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4 && xhr.status == 200)
		{
			//
		}
	}
	xhr.send()
})