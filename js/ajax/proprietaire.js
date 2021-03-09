function getHttp() {
    if (window.XMLHttpRequest) {
        // code for modern browsers
        return new XMLHttpRequest();
    } else {
        // code for old IE browsers
        return new ActiveXObject("Microsoft.XMLHTTP");
    }
}
function getProprio() {
	var XML = new getHttp();
	XML.open("GET", "http://"+url+"proprietaire/show");
	XML.onreadystatechange = function () {
		if (XML.readyState == 4 && XML.status == 200) {
			if ((XML.responseText) == "[]") {
				document.getElementById("tbody").innerHTML = "<td colspan='6' style='text-align:center'>Aucun proprietaire n'est enregistré</td>";
			} else {
				reponse = JSON.parse(XML.responseText);

				html = reponse.map(function (proprio) {
					if (proprio.organisation == "")
					{
                        proprio.organisation = "-";
					}

					return `<tr>
                    <td><a class='btn btn-outline-info' href='http://${url}proprietaire/profil/${proprio.codeProprio}'>${proprio.nomProprio}</a></td>
                    <td>${proprio.adresseProprio}</td>
                    <td>${proprio.contactProprio}</td>
                    <td>${proprio.emailProprio}</td>
                    <td>${proprio.status}</td>
                    <td>${proprio.organisation}</td>
                    <td><a href='http://${url}proprietaire/profil/${proprio.codeProprio}' onclick='affect(${proprio.codeProprio})' class='btn btn-outline-danger' data-toggle='modal' data-target='#exampleModal'><i class='fa fa-trash'></i></a>
                    </tr>`
				}).join("");
				document.getElementById("tbody").innerHTML = html;
			}
		}
	}
	XML.send()
}
getProprio();
setInterval(() => {
	getProprio()
}, 4000);

function initialise()
{
    
}

function deleteproprio(codeProprio)
{
    var xml = getHttp();

    xml.open("GET" , "http://"+url+"proprietaire/delete/" + codeProprio)

    xml.onreadystatechange = function(){
        document.getElementById("spin").style.display = "initial";
        setTimeout(() => {
           document.getElementById("close").click(); 
           getProprio();
           document.getElementById("spin").style.display = "none";
        }, 3000);
        if(xml.status == 200 && xml.readyState == 4)
            {
                    setTimeout(function(){
                        notif("supprimé" , "client")
                    } , 1000)
            }
        
    }
    xml.send()
}
document.getElementById("delete_proprio").addEventListener("click" , function(e){
    e.preventDefault();
    
    codeProprio  = parseInt(document.getElementById("hide_delete").textContent);

    deleteproprio(codeProprio);

})

function affect(codeProprio)
{
    document.getElementById("hide_delete").textContent = codeProprio;
}

function addproprio() {

    let formulaire = document.getElementById("form_proprio");

    var XHRreq = new getHttp();

    var data = new FormData(formulaire);

    XHRreq.open("POST", "http://"+url+"proprietaire/storeproprio");

    XHRreq.onreadystatechange = function(){
		if(XHRreq.status == 200 && XHRreq.readyState == 4)
		{
				setTimeout(function(){
					notif("ajouté" , "client")
				} , 1000)
		}
	}
    XHRreq.send(data);

    
    getProprio();
}

let button = document.getElementById("sendClient");

button.addEventListener("click", function () {
    setTimeout(function(){
    document.getElementById("closer").click()
} , 3000);

addproprio();
initialise();
})

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
        xhr.open("GET", "http://"+url+"proprietaire/search/" + keyword)

        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                reponse = JSON.parse(xhr.responseText);
                html = reponse.map(function(reponse){
                    return `
                    <li class='list-group-item list-group-item-action' style='cursor:pointer'><a style="text-decoration:none" href="http://${url}proprietaire/profil/${reponse.codeProprio}" class="btn btn-outline-info"><strong><em>${reponse.nomProprio}</em></strong></a> | Adresse : <em>${reponse.adresseProprio}</em> | Email : <em>${reponse.emailProprio}</em> | Téléphone : <em>${reponse.contactProprio}</em> <button onclick="deleteProprio(${reponse.codeProprio})" class="btn btn-sm btn-outline-danger">Supprimer <i class="fa fa-trash"></i></li>
                    `
                }).join("");
                if(html.length == 0)
                    {
                        clearInterval(timer)
                        document.getElementById("search-result").innerHTML = "Mot clé : <strong><em>"+ keyword +"</em></strong><br>Aucune donnée correspond à votre critère de recherche ";
                    }
                else 
                document.getElementById("search-result").innerHTML = "<em>Resultat de recherche pour <strong><em>"+ keyword +"</em></strong> : </em>"+html;
                }
        }
        xhr.send();
    }
})


