timer = setInterval(function () {
	tarif();
}, 7000)

document.getElementById("search-engine").addEventListener("keyup", function () {
	document.getElementById("search-result").style.display = "initial";
	const keyword = document.getElementById("search-engine").value;
	if (keyword == "")
		document.getElementById("search-result").innerHTML = "";
	else {
		var xhr = getHttp();
		xhr.open("GET", "http://"+url+"soin/search/" + keyword)

		xhr.onreadystatechange = function () {

			if (xhr.readyState == 4 && xhr.status == 200) {
				reponse = JSON.parse(xhr.responseText);
				row = reponse.map(function (rps) {
					if (rps.description == null)
						rps.description = "-";
					
					return `
                    <tr>
                        <td>${rps.rubrique}</td>
                        <td>${rps.description}</td>
						<td>${rps.libelle_espece}</td>
						<td>${rps.type}</td>
						<td>${rps.prix} Ar</td>
						<td><span  type="button" class="btn btn-sm btn-primary" data-toggle="modal" data-target="#exampleModal" onclick='editer(${rps.codeSoin})' >Modifier <i class='fa fa-edit'></i></span></td>
                    </tr>
                `
				}).join("");
				if (row.length == 0) {
					document.getElementById("search-result").innerHTML = "Mot clé : <strong><em>" + keyword + "</em></strong><br>Aucune donnée correspond à votre critère de recherche ";
				} else
					document.getElementById("search-result").innerHTML = "<em>Resultat de recherche pour <strong><em>" + keyword + "</em></strong> : </em>";
			}
			clearInterval(timer)
			document.getElementById("listening").innerHTML = row;
			document.getElementById("coll-one").classList.add("show")

		}
		xhr.send();
	}

	setTimeout(function () {
		tarif()
	}, 20000)

})
tarif()


document.getElementById("search-engine").addEventListener("blur", function () {
	setTimeout(function () {
		document.getElementById("search-result").innerHTML = "";
		document.getElementById("search-result").style.display = "none";
		tarif();
	}, 10000)
})

document.getElementById("submit").addEventListener("click", function (e) {
	e.preventDefault()
	xhr = getHttp();
	xhr.open("POST", "http://"+url+"soin/store")
	data = new FormData(document.getElementById("soin-add"));

	xhr.onreadystatechange = function () {
		if (xhr.readyState == 4 && xhr.status == 200) {
				document.querySelector(".close").click();
				alert("Une soin a été ajouté avec succès");
		}
	}
	xhr.send(data);
	tarif();
})

function deleted(codeSoin)
{
	xhr = getHttp();

	xhr.open("GET", "http://"+url+"soin/delete/" + codeSoin)
	xhr.onreadystatechange = function () {
		if (xhr.status == 200 && xhr.readyState == 4) {
			if(xhr.responseText == "true")
			{
				tarif();
				let tache = document.querySelector("#notif");
				tache.classList.add("notification");
				tache.innerHTML = "Une activité a été supprimée avec succès <i class='fa fa-sms'></i>"
			}
		}
	}
	xhr.send()
}
function editer(codeSoin)
{
	xhr = getHttp()
	xhr.open("GET" , "http://"+url+"soin/getSoin/" + codeSoin);

	xhr.onreadystatechange = function()
	{
		if(xhr.status == 200 && xhr.readyState == 4)
		{
			reponse = JSON.parse(xhr.responseText);
			document.getElementById("codeSoin").value = reponse[0].codeSoin
			document.getElementById("prix-edit").value = reponse[0].prix
			document.getElementById("description-edit").value = reponse[0].description
			document.getElementById("rubrique-edit").value = reponse[0].rubrique 
		}
	}
	xhr.send()
}

function tarif() {
	xhr = getHttp();

	xhr.open("GET", "http://"+url+"soin/show")
	xhr.onreadystatechange = function () {
		if (xhr.status == 200 && xhr.readyState == 4) {
			reponse = JSON.parse(xhr.responseText);
			row = reponse.map(function (rps) {
				if (rps.description == null)
					rps.description = "-";
				else if(rps.libelle_espece == 0)
					rps.libelle_espece = "Toutes"
				return `
                    <tr>
                        <td>${rps.rubrique}</td>
						<td>${rps.description}</td>
						<td>${rps.libelle_espece}</td>
						<td>${rps.type}</td>
						<td>${rps.prix} Ar</td>
						<td><span  type="button" class="btn btn-sm btn-primary" data-toggle="modal" data-target="#exampleModal" onclick='editer(${rps.codeSoin})' >Modifier <i class='fa fa-edit'></i></span></td>
                    </tr>
                `
			}).join("");
			document.getElementById("listening").innerHTML = row;
		}

	}
	xhr.send();
}
document.getElementById("editer_soin").addEventListener("click" , function(){
	xhr = getHttp()
	xhr.open("POST" , "http://"+url+"soin/update/")
	data = new FormData(document.getElementById('soin-edit'))
	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4 && xhr.status == 200)
				{
					let tache = document.querySelector("#notif");
					tache.classList.add("notification");
					tache.innerHTML = "Une activité a été mise à jour avec succès <i class='fa fa-sms'></i>"
					document.getElementById("close-editor").click()
					tarif()
				}
	}

	xhr.send(data)
})