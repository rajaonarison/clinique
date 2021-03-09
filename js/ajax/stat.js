document.getElementById("changer").addEventListener("click", function () {
	xhr = getHttp();
	taux = document.getElementById("taux").value;
	xhr.open("GET", "http://"+ url+"soin/changeAll/" + taux)

	xhr.onreadystatechange = function () {
		if (xhr.readyState == 4 && xhr.status == 200) {
			if (xhr.responseText == 'true') {
				setTimeout(function () {
					document.getElementById("close_change").click();
					let tache = document.querySelector("#notif");
					tache.classList.add("notification");
					tache.innerHTML = "Toutes les soins ont été mises à jour <i class='fa fa-sms'></i>"
				}, 3000)
			}
		}
	}
	xhr.send();
})
function statPatient()
{
	ctx = document.getElementById('chart8').getContext("2d")
	xhr = getHttp()
	xhr.open("GET" , "http://"+ url+"patient/statPat")
	espece = Array();
	count = Array();
	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4 && xhr.status == 200)
		{
		response = JSON.parse(xhr.responseText)
			for (var i = 0; i < response.length; i++) {
				count[i] = response[i]["count"];
				espece[i] = response[i]["libelle_espece"];
			}

			Ourdata = {
				labels: espece,
				datasets: [{
					label: 'Repartition des patients',
					data: count,
					backgroundColor: 'rgba(50,50,20,.75)',
					// borderColor: [ $backgroundColor ],
					borderWidth: 3
				}]
			}

			create(ctx, 'line', Ourdata)	
		}
	}
	xhr.send()
}
setTimeout(function(){
	statPatient();
} , 3000)
function compare2() {
	xhr1 = getHttp();
	xhr = getHttp();

	annee1 = document.getElementById("first").value
	annee2 = document.getElementById("second").value

	document.getElementById("year1").innerHTML = annee1;
	document.getElementById("year2").innerHTML = annee2;

	xhr.open("GET", "http://"+ url+"patient/statPerYear/" + annee1)
	xhr1.open("GET", "http://"+ url+"patient/statPerYear/" + annee2)

	xhr.onreadystatechange = function () {
		if (xhr.status == 200 && xhr.readyState == 4) {
			if (xhr.responseText != "[]") {
					response = JSON.parse(xhr.responseText)
					document.getElementById("years1").innerHTML = response[0]["counter"];
			} else
				document.getElementById("years1").innerHTML = 0;

		}
	}
	xhr1.onreadystatechange = function () {
		if (xhr1.status == 200 && xhr1.readyState == 4) {
			if (xhr1.responseText != "[]") {
				response = JSON.parse(xhr1.responseText)
				document.getElementById("years2").innerHTML = response[0]["counter"];
			} else
				document.getElementById("years2").innerHTML = 0;
		}
	}



	xhr1.send();
	xhr.send();
}

function compare() {
	xhr1 = getHttp();
	xhr = getHttp();

	annee1 = document.getElementById("annee1").value
	annee2 = document.getElementById("annee2").value

	document.getElementById("year1").innerHTML = annee1;
	document.getElementById("year2").innerHTML = annee2;

	xhr.open("GET", "http://"+ url+"patient/statPerYear/" + annee1)
	xhr1.open("GET", "http://"+ url+"patient/statPerYear/" + annee2)

	xhr.onreadystatechange = function () {
		if (xhr.status == 200 && xhr.readyState == 4) {
			if (xhr.responseText != "[]" ) {
					response = JSON.parse(xhr.responseText)
					document.getElementById("years1").innerHTML = response[0]["counter"];
			} else
				document.getElementById("years1").innerHTML = 0;

		}
	}
	xhr1.onreadystatechange = function () {
		if (xhr1.status == 200 && xhr1.readyState == 4) {
			if (xhr1.responseText != '[]') {
				response = JSON.parse(xhr1.responseText)
				document.getElementById("years2").innerHTML = response[0]["counter"];
			} else
				document.getElementById("years2").innerHTML = 0;
		}
	}



	xhr1.send();
	xhr.send();
}

document.getElementById("compare").addEventListener("click", function () {
	compare();
})

document.getElementById("text-comparer").addEventListener("click", function () {
	compare2();
})








function statMonthPatient() {
	var ctx = document.getElementById('chart1').getContext('2d');
	month = Array("Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre")
	datas = Array(12);
	xhr = getHttp()
	xhr.open("GET", "http://"+ url+"patient/statpermonth");

	xhr.onreadystatechange = function () {
		if (xhr.status == 200 && xhr.readyState == 4) {
			//On met un 0 pour avoir les 12
			response = JSON.parse(xhr.responseText)
			for (var i = 0; i < response.length; i++) {
				datas[parseInt(response[i]["month"]) - 1] = response[i]["count"];
			}

			//On met un +1 car on n'a pas de mois avec un indice 0
			for (j = 0; j < datas.length; j++) {
				if (!datas[j])
					datas[j] = 0
			}
			//datas.shift()
			Ourdata = {
				labels: month,
				datasets: [{
					label: 'Nombre de patient enregistré',
					data: datas,
					backgroundColor: 'rgba(50,50,20,.75)',
					// borderColor: [ $backgroundColor ],
					borderWidth: 3
				}]
			}

			create(ctx, 'line', Ourdata)

		}
		//On fait correspondre month et datas

	}


	xhr.send()
}

function statMonthConsult(year) {
	var ctx = document.getElementById('chart2').getContext('2d');
	month = Array("Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre")
	datas = Array(12);
	xhr = getHttp()
	xhr.open("GET", "http://"+ url+"consultation/statmonth/" + year);

	xhr.onreadystatechange = function () {
		if (xhr.status == 200 && xhr.readyState == 4) {
			//On met un 0 pour avoir les 12
			response = JSON.parse(xhr.responseText)
			for (var i = 0; i < response.length; i++) {
				datas[parseInt(response[i]["Month"]) - 1] = response[i]["counter"];
			}

			//On met un +1 car on n'a pas de mois avec un indice 0
			for (j = 0; j < datas.length; j++) {
				if (!datas[j])
					datas[j] = 0
			}
			//datas.shift()
			Ourdata = {
				labels: month,
				datasets: [{
					label: 'Nombre de consultation enregistrée',
					data: datas,
					backgroundColor: 'rgba(100,100,0,.75)',
					borderWidth: 3
				}]
			}


			create(ctx, 'line', Ourdata)

		}
		//On fait correspondre month et datas

	}
	xhr.send()
}


document.getElementById("getStat").addEventListener("click", function () {
	statMonthConsult(document.getElementById("yearStatConsult").value)
})

function remise() {
	xhr = getHttp()
	xhr.open("get", "http://"+ url+"statistique/remise");

	xhr.onreadystatechange = function () {
		if (xhr.readyState == 4 && xhr.status == 200) {
			document.getElementById("basic-addonRemise").innerHTML = "Actuellement " + xhr.responseText + "%";
		}
	}
	xhr.send()
}



//document.getElementById()

function statDayConsult() {
	var ctx = document.getElementById('chart3').getContext('2d');
	day = Array()

	datas = Array();
	xhr = getHttp()
	xhr.open("GET", "http://"+ url+"patient/statperdaycons");

	xhr.onreadystatechange = function () {
		if (xhr.status == 200 && xhr.readyState == 4) {
			//On met un 0 pour avoir les 12
			response = JSON.parse(xhr.responseText)
			for (var i = 0; i < response.length; i++) {
				datas[i] = response[i]["COUNT"];
				day[i] = response[i]["dayname"];
			}
			//datas.shift()
			Ourdata = {
				labels: day,
				datasets: [{
					label: 'Nombre de consultation enregistrée',
					data: datas,
					backgroundColor: ['rgba(00,100,0,.75)', 'rgba(00,40,150,.75)', 'rgba(200,100,0,.75)', 'rgba(200,10,50,.75)', 'rgba(00,00,0,.75)', 'rgba(050,40,0,.75)', 'rgba(200,200,220,.75)'],
					borderWidth: 3
				}]
			}


			create(ctx, 'pie', Ourdata)

		}
		//On fait correspondre month et datas

	}
	xhr.send()
}



function statDaySoin() {
	var ctx = document.getElementById('chart4').getContext('2d');
	day = Array()

	datas = Array();
	xhr = getHttp()
	xhr.open("GET", "http://"+ url+"patient/statperdaysoin");

	xhr.onreadystatechange = function () {
		if (xhr.status == 200 && xhr.readyState == 4) {
			//On met un 0 pour avoir les 12
			response = JSON.parse(xhr.responseText)
			for (var i = 0; i < response.length; i++) {
				datas[i] = response[i]["COUNT"];
				day[i] = response[i]["dayname"];
			}
			//datas.shift()
			Ourdata = {
				labels: day,
				datasets: [{
					label: 'Jour de soin',
					data: datas,
					backgroundColor: ['rgba(00,40,150,.75)', 'rgba(00,100,0,.75)', 'rgba(200,10,50,.75)', 'rgba(00,00,0,.75)', 'rgba(200,100,0,.75)', , 'rgba(200,200,220,.75)', 'rgba(050,40,0,.75)'],
					borderWidth: 3
				}]
			}


			create(ctx, 'pie', Ourdata)

		}
		//On fait correspondre month et datas

	}
	xhr.send()
}


function echange(year) {
    chart = document.getElementById("chart6").getContext('2d');
    chart7 = document.getElementById("chart7").getContext('2d');
	xhr1 = getHttp();
	xhr2 = getHttp();

	xhr1.open("GET", "http://"+ url+"finance/depense/" + year)
	xhr2.open("GET", "http://"+ url+"finance/entre/" + year)

	dataArray = Array()
	datasArray = Array()
	data = Array()
	datas = Array()

  
    xhr1.onreadystatechange = function () {
		if (xhr1.readyState == 4 && xhr1.status == 200) {
			response = JSON.parse(xhr1.responseText)

			for (i = 0; i < response.length; i++) {
				dataArray[i] = response[i]["month"];
				datasArray[i] = response[i]["depense"];
			}
            Ourdata = {
                labels: dataArray,
                datasets: [{
                    label: "Depense par mois",
                    data: datasArray,
                    backgroundColor: ['rgba(00,40,150,.75)'],
                    borderWidth: 3
                }]
        }
        create(chart7, 'line', Ourdata);
    }
}
	xhr2.onreadystatechange = function () {
		
			if (xhr2.readyState == 4 && xhr2.status == 200) {
				response = JSON.parse(xhr2.responseText)

				for (i = 0; i < response.length; i++) {
					data[i] = response[i]["month"];
					datas[i] = response[i]["entre"];
				}
			
	
        Ourdata = {
            labels: data,
            datasets: [ {
                label: "Entrée par mois",
                data: datas,
                backgroundColor: ['rgba(00,100,0,.75)'],
                borderWidth: 3
            }]
    
             
        }
        create(chart, 'line', Ourdata);
    }
    
}

	
	xhr2.send()
	xhr1.send()


}


document.getElementById("statusStat").addEventListener("click" , function(){
    echange(document.getElementById("yearExchange").value)
})

setTimeout(function(){
		statMonthPatient();
} , 5000)

setTimeout(function () {
	echange(2019);

}, 3000)
setTimeout(function () {
	
	statDaySoin()
}, 6000)

 setTimeout(function () {
	statDayConsult()		

 }, 1500)



$("#back").click(function(e){
	e.preventDefault();
	var count = 0;
	$(".check_table").each(function(){
		if($(this).is(':checked'))
		{
			count += 1;
		}
	});
	if(count <= 0 )
	{
		alert("Veuillez selectionner au moins une catégorie");
	}
	else
	{
		$("#backups").submit();
	}

})