function listeFournisseur()
{
    lister = document.getElementById("fournisseurs");

    xhr = getHttp();
    xhr.open("GET" , "http://"+url+"fournisseur/liste")

    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 200)
        {
            if(xhr.responseText != "[]")
            {
                reponse = JSON.parse(xhr.responseText);

                html = reponse.map(function(rps){
                    return `
                        <option value='${rps.codeFrs}'>${rps.nomFrs}</option>
                    `
                }).join("")

                lister.innerHTML = html;
            }
        }
    }

    xhr.send()

}

listeFournisseur()

document.getElementById("send").addEventListener("click" , function(e){
    
    e.preventDefault()
    
    var formulaire = document.getElementById("fournisseurses");
    
    formDatas = new FormData(formulaire);    
    
    var xhr = getHttp();
    
    xhr.open("POST" , "http://"+url+"fournisseur/add")


    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 200)
        {
            if(xhr.responseText == "true")
            {
                document.getElementById("spinner").style.visibility = "visible";
                setTimeout(function(){
                    notif("ajouté" , "fournisseur");
                    listeFournisseur()
                    document.getElementById("spinner").style.visibility = "hidden";
                    document.getElementById("clore").click()
                } , 2000)
            }
        }
    };
    xhr.send(formDatas)
})

function liste() {
	var xml = getHttp();

	var liste = document.getElementById("medoc");
	xml.open("GET", "http://"+url+"medicament/all/");

	xml.onreadystatechange = function () {
		if (xml.readyState == 4 && xml.status == 200) {
                med = JSON.parse(xml.responseText)
                html = med.map(function(response){
                    return `
                    <tr>
                    <td><input type='checkbox' name='${response.libelleMed}' value='${response.codeMed}'> ${response.libelleMed}</td>
                    <td><input type='number' min='0' class='form-control col-6 form-control-sm' name='qte${response.libelleMed}'> ${response.presentation}</td>
                    <td><input type='date' class='ml-4 form-control col-6 form-control-sm' name='datePeremption${response.codeMed}'></td>
                    <td>${response.stock} ${response.unite}</td>
                    </tr>
                    `
                }).join("")
                liste.innerHTML = html
        }
    }
    xml.send()
}

liste()