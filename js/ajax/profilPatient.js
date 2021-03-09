function getTraitement(codeTrait)
{
	var xml = getHttp()
	xml.open("GET" , "http://"+url+"/traitement/see_traitement/" + codeTrait)


	xml.onreadystatechange = function()
	{
		if(xml.readyState == 4 && xml.status == 200 && xml.responseText != "[]")
		{

			reponse = JSON.parse(xml.responseText);
			html = reponse.map(function(response){
				return `
					<tr>
						<td>${response.libelleMed}</td>
						<td>${response.qte} ${response.unite}</td>
					</tr>
				`
			}).join("");
			document.getElementById("trait_for").innerHTML = html;
		}
	}
	xml.send()
}

let getConsultationList = function (codePatient) {

	var XMLHttp = getHttp();

	XMLHttp.open("GET", "http://"+url+"/consultation/consultationFor/" + codePatient);

	XMLHttp.onreadystatechange = function () {
		if (XMLHttp.status == 200 && XMLHttp.readyState == 4) {
			var reponse = XMLHttp.responseText;

			document.getElementById("table-consult").innerHTML = reponse;
		}
	}

    XMLHttp.send();
}
function parametre(codeParametre) {
	xhr = getHttp();

	xhr.open("GET", "http://"+url+"/parametre/showParametre/" + codeParametre);

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


let getSoinList = function (codePatient) {

	var XMLHttp = getHttp();

	XMLHttp.open("GET", "http://"+url+"/soin/see/" + codePatient);

	XMLHttp.onreadystatechange = function () {
		if (XMLHttp.status == 200 && XMLHttp.readyState == 4) {
			var reponse = XMLHttp.responseText;

			document.getElementById("table-soin").innerHTML = reponse;
		}
	}

    XMLHttp.send();
}




getConsultationList(document.getElementById("codePatient").value);
getSoinList(document.getElementById("codePatient").value);


