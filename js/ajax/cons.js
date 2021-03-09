
document.getElementById("sendRace").addEventListener("click" , function(e){
	e.preventDefault()
	xhr = getHttp();
	data = new FormData()
	data.append("codeEspece" , document.getElementById("newRace").value)
	data.append("nom_race" , document.getElementById("newRaceNom").value)

	xhr.open("POST" , "http://"+url+"race/insert");

	xhr.send(data)
	
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



function raceByespece(codeEspece)
{
    var XMLReq = getHttp();

    XMLReq.open("GET", "http://"+url+"race/getRaceChat");

    XMLReq.onreadystatechange = function () {
        if (XMLReq.status == 200 && XMLReq.readyState == 4) {
            var reponse = JSON.parse(XMLReq.responseText);

            var liste = document.querySelector("#race");
            var html = reponse.map(function (race_chat) {
                return `<option value="${race_chat.codeRace}">
            ${race_chat.nom_race}</option>`;
            }).join("");
            liste.innerHTML = html;
        }
    }
    XMLReq.send();
}

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

document.getElementById("consulter").addEventListener("click" , function(e){
    
    e.preventDefault();

    formulaire = document.getElementById("patientConsultation");
    
    data = new FormData(formulaire)

    xhr = getHttp()

    xhr.open("POST" , "http://"+url+"consultation/store");

    xhr.onreadystatechange = function(){
        if(xhr.status == 200 && xhr.readyState == 4)
            {
                let tache = document.querySelector("#notif");
                if(xhr.responseText != "Rappel" && xhr.responseText != 'false')
                {
                    document.getElementById("coll-one").classList.remove("show");
                tache.classList.toggle("notification");
                tache.innerHTML = "Une consultation a été enregistrée <i class='fa fa-sms'></i>";

                document.getElementById("facture").innerHTML = xhr.responseText;
            }
            else if(xhr.responseText == "Rappel")
            {
                document.getElementById("coll-one").classList.remove("show");

                tache.classList.toggle("notification");
                tache.innerHTML = "Rappel enregistrée <i class='fa fa-sms'></i>";
            }

        }
    }
    
    
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
    
}

let button_add = document.getElementById("sendClient");

button_add.addEventListener("click", function (e) {
    e.preventDefault();
    addproprio();
    listeProprio() ;
})


function traiter(value)
{
    if(value == 3)
    {
        document.getElementById("rappeler-vaccin").style.display ="initial";
        document.getElementById("traitement").style.display = "initial";
        document.getElementById("date-debut").style.display = "none";
        document.getElementById("date-fin").style.display = "none";

    }
    else if(value == 2)
    {
        document.getElementById("date-debut").style.display = "initial";
        document.getElementById("date-fin").style.display = "initial";
        document.getElementById("traitement").style.display = "initial";
        document.getElementById("rappeler-vaccin").style.display ="none";
    }
    else if(value == 4)
    {
        document.getElementById("rappeler-vaccin").style.display ="none";
            document.getElementById("traitement").style.display = "initial";
            document.getElementById("date-debut").style.display = "none";
            document.getElementById("date-fin").style.display = "none";
    }
    else
        {
            document.getElementById("rappeler-vaccin").style.display ="none";
            document.getElementById("traitement").style.display = "none";
            document.getElementById("date-debut").style.display = "none";
            document.getElementById("date-fin").style.display = "none";
        }
}

function getByTraitement() {
    
    var xml = getHttp();

    xml.open("GET", "http://"+url+"consultation/getWithMed/");

	xml.onreadystatechange = function () {

			if (xml.readyState == 4 && xml.status == 200) {	
                document.getElementById("byTraitement").innerHTML = xml.responseText;
			}
		}
		xml.send();
	
}

getByTraitement();


$("#Patient").change(() => {

    value = ($("#Patient").val())
    xhr = getHttp()
    xhr.open("GET" , "http://"+url+"soin/soin/traitement/" + value);
    
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 200)
        {
            rps = JSON.parse(xhr.responseText)
            html = rps.map(function(reponse){
                return `
                    <input type='checkbox' name='${reponse.rubrique}' value='${reponse.rubrique}'>${reponse.rubrique}</br>
                `
            }).join("")
            document.getElementById("task").innerHTML = html;
        }
    }

    xhr.send()    

})


function consultation()
{
    xhr = getHttp()
    xhr.open("GET" , "http://"+url+"soin/soin/traitement");
    
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 200)
        {
            rps = JSON.parse(xhr.responseText)
            html = rps.map(function(reponse){
                return `
                    <input type='checkbox' name='${reponse.rubrique}' value='${reponse.rubrique}'>${reponse.rubrique}</br>
                `
            }).join("")
            document.getElementById("task").innerHTML = html;
        }
    }

    xhr.send()
}

setTimeout(function(){
    consultation();
} , 500)