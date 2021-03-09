function listeFournisseur()
{
    lister = document.getElementById("fournisseur_list");

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
                        <tr>
                            <td>${rps.nomFrs}</td>
                            <td>${rps.responsable}</td>
                            <td>${rps.contact_frs}</td>
                            <td>${rps.adresse_frs}</td>
                            <td>${rps.email_frs}</td>

                            <td><i title='Editer' class='fa fa-edit btn btn-sm btn-warning' onclick='edit(${rps.codeFrs})' data-toggle="modal" data-target="#editFournisseur"></i></td>
                        </tr>
                        
                    `
                }).join("")

                lister.innerHTML = html;
            }
        }
    }

    xhr.send()

}
function search(key)
{
    xhr = getHttp()
    xhr.open("GET" , "http://"+url+"fournisseur/search/" + key)

    xhr.onreadystatechange = function(){
        if(xhr.status == 200 && xhr.readyState ==4)
        {
            if(xhr.responseText != "[]")
            {
                reponse = JSON.parse(xhr.responseText);

                html = reponse.map(function(rps){
                    return `
                        <tr>
                            <td>${rps.nomFrs}</td>
                            <td>${rps.responsable}</td>
                            <td>${rps.contact_frs}</td>
                            <td>${rps.adresse_frs}</td>
                            <td>${rps.email_frs}</td>
                            <td><i title='Editer' class='fa fa-edit btn btn-sm btn-warning' onclick='edit(${rps.codeFrs})' data-toggle="modal" data-target="#editFournisseur"></i></td>
                        </tr>
                        
                    `
                }).join("");
        }
        else
            html = "<tr><td colspan='6' style='text-align:center'>Aucun resultat</td></tr>"

            document.getElementById("search-result").innerHTML = "Resultat de recherche pour :<strong>"+ key + "</strong>"
                
            lister.innerHTML = html;

            setTimeout(function(){
                listeFournisseur()
                document.getElementById("search-result").innerHTML = '' 
                document.getElementById("basic-addon3").innerHTML =  '<i class="fa fa-search"></i>'             
            } , 7000)
    }


}
xhr.send()

}

document.getElementById("basic-search").addEventListener("keyup" , function(){
    document.getElementById("basic-addon3").innerHTML = '<div class="spinner-border spinner-border-sm" role="status"><span class="sr-only">Loading...</span></div>'
    search(this.value)
})


function edit(codeFrs)
{
    xhr = getHttp()
    xhr.open("GET" , "http://"+url+"fournisseur/get/" + codeFrs)

    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 200)
        {
            document.getElementById("codeFrs").value = codeFrs
            document.getElementById("nomFrs").value = JSON.parse(xhr.responseText)[0].nomFrs
            document.getElementById("adresse_frs").value = JSON.parse(xhr.responseText)[0].adresse_frs
            document.getElementById("email_frs").value = JSON.parse(xhr.responseText)[0].email_frs
            document.getElementById("contact_frs").value = JSON.parse(xhr.responseText)[0].contact_frs
            document.getElementById("responsable_frs").value = JSON.parse(xhr.responseText)[0].responsable
        }
    }
    
    xhr.send()

}

document.getElementById("editThisFrs").addEventListener("click" , function(e){
    e.preventDefault();
    
    frm = document.getElementById("form-edit")

    data = new FormData(frm);

    var xhr = getHttp();

    xhr.open("POST" , "http://"+url+"fournisseur/update");

    xhr.onreadystatechange = function(){
        if(xhr.readyState ==4 && xhr.status ==200)
        {
            if(xhr.responseText == "true")
            {
                notif("modifié" , "fournisseur")
                document.getElementById("closure").click();
            }
            else{
                alert("Il y a eu erreur lors de la mise à jour du fournisseur")
            }
        }
    }


    xhr.send(data);
    listeFournisseur();

})




listeFournisseur();


document.getElementById("send").addEventListener("click" , function(e){
    
    e.preventDefault()
    
    var formulaire = document.getElementById("fournisseurs");
    
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

