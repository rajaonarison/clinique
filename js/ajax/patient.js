	let listePatient = function () {
		var XHR = getHttp();
		var XHR2 = getHttp();

		XHR.open("GET", "http://"+url+"patient/liste");

		
		//XHR2.open("GET", "http://"+url+"patient/showChatList");

		

		XHR.onreadystatechange = function () {
			if (XHR.status == 200 && XHR.readyState == 4) {
				var response = JSON.parse(XHR.responseText);
				var html = response.map(function (reponse) {
					return `
					<tr>
						<td style='text-align: center'>${reponse.nomPatient}</td>
						<td style='text-align: center'>${reponse.libelle_espece}</td>
						<td style='text-align: center'>${reponse.created_at}</td>
						<td style='text-align: center'><a href="http://${url}patient/profil/${reponse.codePatient}" class="btn btn-sm btn-outline-secondary">Consulter son profil</a></td>												

						
					</tr>
				`;
				}).join("");
				document.getElementById("liste_patient").innerHTML = html;
			}
		}

		XHR.send();
	}

	listePatient();

	setInterval(() => {
		listePatient()
	}, 2000);

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
	

		listePropri() ;
	}
	
	setTimeout(function(){
		xhr = getHttp();

		xhr.open("GET" , "http://"+url+"patient/incrementDate");

		

		xhr.send();
		
	} , 86400);

	let button_add = document.getElementById("sendClient");
	
	button_add.addEventListener("click", function (e) {
		e.preventDefault();
	addproprio();
	})
	

	function deletePatient(codePatient) {
		var xml = getHttp();

		xml.open("GET", "http://"+url+"patient/delete/" + codePatient);

		
		xml.onreadystatechange = function(){
		if(xml.status == 200 && xml.readyState == 4)
			{
					setTimeout(function(){
						notif("supprimé" , "patient")
					} , 1000)
			}
		}
		xml.send();
		listePatient();
	}

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

document.getElementById("sendRace").addEventListener("click" , function(e){
	e.preventDefault()
	xhr = getHttp();
	data = new FormData()
	data.append("codeEspece" , document.getElementById("newRace").value)
	data.append("nom_race" , document.getElementById("newRaceNom").value)

	xhr.open("POST" , "http://"+url+"race/insert");

	

	xhr.send(data)
	
	showRace(document.getElementById("esp").value);
})

	//========================================================================//
	let button = document.getElementById("sendPatient");

	button.addEventListener("click", function (e) {
		e.preventDefault()
		addPatient();
		timer();
	})

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

	timer = (function () {
		var xhr = getHttp();
		xhr.open("GET", "http://"+url+"patient/get_last");

		

		xhr.onreadystatechange = function () {
			if (xhr.readyState == 4 && xhr.status == 200) {
				html = "";
				if(xhr.responseText == "[]")
					html = "Aucune donnée à lister";
				else{
					var content = JSON.parse(xhr.responseText);
				
				html = content.map(function(rps){
					if(rps.dateNais == null)
						rps.dateNais = "";
					if(rps.description == "")
					{
						rps.description = "-"
					}
					
					return `
					<img src="http://${url}assets/img/${rps.img_patient}" alt="Aucun image correspondant au patient" style="width:200px;height:250px;">

					
					<ul style="margin-left:180px;margin-top:-250px;">
						<li class="list-group-item" style="background-color:rgba(120 , 120 , 120 , 0.3)"><mark>Nom</mark> : <em>${rps.NomPatient}</em></li>
						<li class="list-group-item" style="background-color:rgba(120 , 120 , 120 , 0.3)"><mark>Propriétaire</mark> : <a href="http://${url}proprietaire/profil/${rps.codeProprio}"><em>${rps.nomProprio}</em></a></li>

						
						<li class="list-group-item" style="background-color:rgba(120 , 120 , 120 , 0.3)"><mark>Age (ou date de naissance)</mark> : <em>${rps.age} (mois) - <em>${rps.dateNais}</em></li>
						<li class="list-group-item" style="background-color:rgba(120 , 120 , 120 , 0.3)"><mark>Espèce</mark> : <em>${rps.libelle_espece}</em></li>
						<li class="list-group-item" style="background-color:rgba(120 , 120 , 120 , 0.3)"><mark>Sexe</mark> : <em>${rps.libelle_sexe}</em></li>
						<li class="list-group-item" style="background-color:rgba(120 , 120 , 120 , 0.3)"><mark>Race</mark> : <em>${rps.nom_race}</em></li>
						<li class="list-group-item" style="background-color:rgba(120 , 120 , 120 , 0.3)"><mark>Couleur</mark> : <em>${rps.couleur}</em></li>
						<li class="list-group-item" style="background-color:rgba(120 , 120 , 120 , 0.3)"><mark>Corpulance</mark> : <em>${rps.variete}</em></li>
						<li class="list-group-item" style="background-color:rgba(120 , 120 , 120 , 0.3)"><mark>Description</mark> : <em>${rps.description}</em></li>
						<li class="list-group-item" style="background-color:rgba(120 , 120 , 120 , 0.3)"><mark>Ajouté le</mark> : <em>${rps.created_at}</li>
					</ul>
					<hr>
					<a class='btn btn-outline-primary btn-sm' href='http://${url}patient/profil/${rps.codePatient}'	role='button'>Afficher ses historiques au cabinet</a>`

					
				})
			}
				document.getElementById("last_patient").innerHTML = html
			}
		}
		xhr.send()
	});

timer();
	document.getElementById("serach-engine").addEventListener("blur" , function(){
        setTimeout(function(){
			document.getElementById("search-result").innerHTML = "";
        document.getElementById("search-result").style.display = "none";
		} , 5000)
	})
	document.getElementById("serach-engine").addEventListener("keyup", function () {
        document.getElementById("search-result").style.display = "initial";
        const keyword = document.getElementById("serach-engine").value;
		if (keyword == "")
		document.getElementById("search-result").innerHTML = "";
		else {
            var xhr = getHttp();
			xhr.open("GET", "http://"+url+"patient/search/" + keyword)

			

			xhr.onreadystatechange = function () {
				if (xhr.readyState == 4 && xhr.status == 200) {
					reponse = JSON.parse(xhr.responseText);
					html = reponse.map(function(reponse){
						//if((reponse.nomPatient).indexOf(keyword) > 0)
						return `
						<li class='list-group-item list-group-item-action' style='cursor:pointer'><a style="text-decoration:none" href="http://${url}patient/profil/${reponse.codePatient}" class="btn btn-outline-info"><strong>${reponse.nomPatient}</strong></a> | Age : ${reponse.age} | Couleur : ${reponse.couleur} | Variété : ${reponse.variete} | Déscription : ${reponse.description}   <button onclick="deletePatient(${reponse.codePatient})" class="btn btn-sm btn-outline-danger">Supprimer <i class="fa fa-trash"></i></li>

						
						`
					}).join("");
					if(html.length == 0)
						{
                            //clearInterval(timer)
							document.getElementById("search-result").innerHTML = "Mot clé : <strong><em>"+ keyword +"</em></strong><br>Aucun donnée correspond à votre critère de recherche ";
						}
					else 
					document.getElementById("search-result").innerHTML = "<em>Resultat de recherche pour <strong><em>"+ keyword +"</em></strong> : </em>"+html;
					}
			}
			xhr.send();
		}
    })


	//====================================================================//

	


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