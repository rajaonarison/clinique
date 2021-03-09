function getRappel()
{
    xhr = getHttp()
    xhr.open("GET" , "http://"+url+"rappel/rappel/")

    xhr.onreadystatechange = function()
    {
        if(xhr.readyState == 4 && xhr.status == 200)
        {
            reponse = JSON.parse(xhr.responseText)
            html = "<tr><td colspan='5' style='text-align:center;color:rgba(20,20,200,0.7)'>Aucun rappel prevu ulterièrement";
            if(xhr.responseText != "[]")
            {
                html = reponse.map(function(answer){
                return `<tr>
                        <td><span class="badge badge-info">${answer.dateRappel}</span></td>
                        <td><a href='http://${url}patient/profil/${answer.codePatient}'>${answer.nomPatient}</td>
                        <td>${answer.libelleMed}</td>
                        <td>${answer.qte} ${answer.unite}</td>
                    </tr>
                `
            }).join("")
        }
            document.getElementById("body-rappel").innerHTML = html;
        }
    }
    xhr.send()
}
getRappel()

function getRappelTrait()
{
    xhr = getHttp()
    xhr.open("GET" , "http://"+url+"rappel/rappelTrait/")

    xhr.onreadystatechange = function()
    {
        if(xhr.readyState == 4 && xhr.status == 200)
        {
            reponse = JSON.parse(xhr.responseText)
            html = "<tr><td colspan='5' style='text-align:center;color:rgba(20,20,200,0.7)'>Aucun rappel prevu ulterièrement";
            if(xhr.responseText != "[]")
            {
                html = reponse.map(function(answer){
                return `<tr>
                        <td><span class="badge badge-info">${answer.dateRappel}</span></td>
                        <td><a href='http://${url}patient/profil/${answer.codePatient}'>${answer.nomPatient}</td>
                        <td>${answer.libelleTrait}</td>
                        <td>${answer.libelleMed}</td>
                        <td>${answer.qte} ${answer.unite}</td>
                    </tr>
                `
            }).join("")
        }
            document.getElementById("bod").innerHTML = html;
        }
    }
    xhr.send()
}

getRappel();

setTimeout(function(){
    getRappelTrait()

} , 1200);

