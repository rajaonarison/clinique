function getTraitementSelect() {
	var xml = getHttp();
	xml.open("GET", "http://"+url+"traitement/liste");

	xml.onreadystatechange = function () {
		if (xml.readyState == 4 && xml.status == 200) {
			reponse = JSON.parse(xml.responseText);

			html = reponse.map(function (response) {
				return `<option value="${response.codeTrait}">${response.libelleTrait}</option>`
			}).join("");
			document.getElementById("traitements").innerHTML = html;
		}
	}
	xml.send()
}
getTraitementSelect();


function getTraitement() {
	var xml = getHttp();
	xml.open("GET", "http://"+url+"traitement/liste");

	xml.onreadystatechange = function () {
		if (xml.readyState == 4 && xml.status == 200) {
			reponse = JSON.parse(xml.responseText);

			html = reponse.map(function (response) {
				return `<option value="${response.codeTrait}">${response.libelleTrait}</option>`
			}).join("");

			document.getElementById("traitement").innerHTML = "<option selected>Filtrer l'affichage</option>" + html + "<option value='' >Tous</option>";
		}
	}
	xml.send()
}

function getByTraitement(codeTraitement = "") {
	var xml = getHttp();

	var liste = document.getElementById("liste");
	xml.open("GET", "http://"+url+"medicament/liste/" + codeTraitement);

	xml.onreadystatechange = function () {
		if (xml.readyState == 4 && xml.status == 200) {
			html = "<h5 style='text-align:center;font-weight:lighter'><em>Aucun médicament à afficher</em></h5>";
			thead = "";

			if(xml.responseText != "[]")
			{
				reponse = JSON.parse(xml.responseText);
				html = reponse.map(function(response){
					if(response.parPresentation == null || response.parPresentation == "")
					{
						response.parPresentation = 1;
					}
					if(response.stock < 20)
					{
						color = "danger";
					}
					else{
						color = "primary";
					}
					if(isNaN(response.stock / response.parPresentation))
						stock  = 0;
					else
						stock = response.stock / response.parPresentation
					if(isNaN(response.stock % response.parPresentation))
						prs = 0
					else
						prs = response.stock % response.parPresentation
					return `
					<tr>
					<td><a class='btn btn-sm btn-info' href='http://"+url+"medicament/see/${response.codeMed}'>${response.libelleMed}</a></td>
					<td>${response.unite}</td>
					<td>${response.parPresentation} ${response.unite} = 1 ${response.presentation}</td>
					<td>${response.puDetail} Ar</td>
					<td>${response.stock} ${response.unite}</td>
					<td>${response.datePeremption}</td>
					<td><button data-toggle="modal" data-target="#edit" class='btn btn-sm btn-warning' onclick='editMed(${response.codeMed})'><i class='fa fa-pen'></i></button> <button class='btn btn-sm btn-danger' onclick='deleteMed(${response.codeMed})'><i class='fa fa-trash'></i></button></td>
					</tr>
					`
				}).join("");
				thead = `<thead>
			<tr>
				<th>Libellé : </th>
				<th>Unité :</th>
				<th>Présentation :</th>
				<th>Prix unitaire :</th>
				<th>Stock :</th>
				<th>Date de peremption :</th>
				<th></th>
			</tr>
		</thead>`
			}
			liste.innerHTML = thead + "<tbody>" + html + "</tbody>";
		}
	}
	xml.send()
}

getTraitement();


function deleteMed(codeMed)
{
		xhr = getHttp();
		xhr.open("GET" , "http://"+url+"medicament/delete/" + codeMed);

		xhr.onreadystatechange = function(){
			if(xhr.status == 200 && xhr.readyState == 4)
			{
				if(xhr.responseText == "true")
					notif("supprimé" , "médicament");
					getTraitement();
					getByTraitement();
					getTraitementSelect();
				}
		}
		xhr.send();
}

document.getElementById("saveMed").addEventListener("click" , function(e){
	e.preventDefault();

	xhr = getHttp();

	var form = document.getElementById("form-medicament");

	var data = new FormData(form);

	xhr.open("POST" , "http://"+url+"medicament/store");

	xhr.onreadystatechange = function()
	{
		if(xhr.status == 200 && xhr.readyState == 4)
		{
			//console.log(xhr.responseText)
		}
	}
	xhr.send(data);
	setTimeout(function(){
		document.getElementById("close-modal").click();
		notif("ajouté" , "médicament");
	} , 1000)

});


document.getElementById("search-engine").addEventListener("keyup", function () {
	const keyword = document.getElementById("search-engine").value;
	if (keyword == "")
		document.getElementById("liste").innerHTML = "";
	else {
		var xhr = getHttp();
		xhr.open("GET", "http://"+url+"medicament/search/" + keyword)

		xhr.onreadystatechange = function () {
			if (xhr.readyState == 4 && xhr.status == 200) {
				
				reponse = JSON.parse(xhr.responseText);
				html = reponse.map(function(response){
					stock = response.stock / response.parPresentation;
					prs = response.stock % response.parPresentation;


					if(response.parPresentation == null || response.parPresentation == "" )
					{
						response.parPresentation = 1;
					}
					if(isNaN(response.stock / response.parPresentation))
						stock  = 0;
					if(isNaN(response.stock % response.parPresentation))
						prs = 0
					return `
					<tr>
					<td><a class='btn btn-sm btn-info' href='http://"+url+"medicament/see/${response.codeMed}'>${response.libelleMed}</a></td>
					<td>${response.unite}</td>
					<td>${response.parPresentation} ${response.unite} = 1 ${response.presentation}</td>
					<td>${response.puDetail} Ar</td>
					<td>${response.stock} ${response.unite}</td>
					<td>${response.datePeremption}</td>
					<td><button data-toggle="modal" data-target="#edit" class='btn btn-sm btn-warning' onclick='editMed(${response.codeMed})'><i class='fa fa-pen'></i></button> <button class='btn btn-sm btn-danger' onclick='deleteMed(${response.codeMed})'><i class='fa fa-trash'></i></button></td>
					</tr>
					`
				}).join("");
				thead = `
			<tr>
				<th>Libellé : </th>
				<th>Unité :</th>
				<th>Présentation :</th>
				<th>Prix unitaire :</th>
				<th>Stock :</th>
				<th>Date de peremption :</th>
				<th></th>
			</tr>
		`
				if(html.length == 0)
					{
						document.getElementById("liste").innerHTML = "Mot clé : <strong><em>"+ keyword +"</em></strong><br>Aucun donnée correspond à votre critère de recherche ";
					}
				else 
				document.getElementById("liste").innerHTML = "<tr><td colspan='6'><em>Resultat de recherche pour <strong><em>"+ keyword +"</em></strong> : </em></td></tr>"+ thead + html;
			}
		}
		xhr.send();
	}
})


function editMed(codeMed)
{
	document.getElementById("codeMedEdit").value = codeMed;

	xhr = getHttp();
	xhr.open("GET" , "http://"+url+"medicament/thisMedicament/" + codeMed)

	xhr.onreadystatechange = function()
	{
		if(xhr.readyState == 4 && xhr.status == 200)
		{
			reponse = JSON.parse(xhr.responseText)
			document.getElementById("libNew").value = reponse[0].libelleMed;
			document.getElementById("puEdit").value = reponse[0].puDetail;
			document.getElementById("qteEdit").value = reponse[0].stock;
			document.getElementById("puPres").value = reponse[0].prixPresentation;
			
		}
	}
	xhr.send()
}


document.getElementById("do-edit").addEventListener("click" , function(e){
	e.preventDefault()
	xhr = getHttp()
	xhr.open("POST" , "http://"+url+"medicament/update")

	form = new FormData(document.getElementById("edit-med"))

	xhr.onreadystatechange = function()
	{
		if(xhr.status == 200 && xhr.readyState == 4)
		{
			notif("mise à jour" , "medicament")
			document.getElementById("close-edit").click();
		}
	}

	xhr.send(form);

	getTraitement();
	getByTraitement();
	getTraitementSelect();

})