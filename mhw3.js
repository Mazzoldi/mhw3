function search(event){
    event.preventDefault();
    /* Questa API non mi permette di selezionare le partite tramite parametri che non siano 'market', 'federation'
    e 'iso_date', se avessi potuto avrei preso il valore di content direttamente nella search() aggiungendo all'URL
    '&competition_name=' + content oppure '&home_team=' + content oppure '&away_team=' + content, a seconda del tipo,
    invece sono costretto ad usare un ciclo for*/
    fetch('https://football-prediction-api.p.rapidapi.com/api/v2/predictions?market=classic&federation=UEFA', {
    method: 'GET',
    headers: {
		'X-RapidAPI-Key': 'e0715cdc93msh8e64431fc47fef1p1fe213jsnc4b1e22348bd',
		'X-RapidAPI-Host': 'football-prediction-api.p.rapidapi.com'
	}
}).then(onResponse).then(onJson_bet);
}
function onResponse(response){
    return response.json();
}
function onJson_score(json){
    console.log(json);
    const album=document.querySelector('#recent');
    album.innerHTML='';
    for(i=0; i<numResults; i++){
        let div=document.createElement('div');
        let title=document.createElement('h1');
        title.textContent=json.response[i].title;
        let matchview=document.createElement('iframe');
        matchview.src=json.response[i].matchviewUrl;
        div.appendChild(title);
        div.appendChild(matchview);
        album.appendChild(div);
    }
    titolo.classList.remove('hidden');
}
function onJson_bet(json){
    console.log(json);
    const matches=json.data;
    const content=document.querySelector('#content').value;
    const tipo=document.querySelector('#tipo').value;
    const future=document.querySelector('#future');
    future.innerHTML='';
    let trovato=false;
    if (tipo==='squadra'){
        for(match of matches){
            if((match.home_team===content) || (match.away_team===content)){
                let div=document.createElement('div');
                let title=document.createElement('h1');
                title.textContent=match.home_team + ' - ' + match.away_team;
                let prediction=document.createElement('div');
                prediction.textContent='1: ' + match.odds["1"] + '' + '1X: ' + match.odds["1X"] + '' + '2: ' + match.odds["2"] + '' + '12: ' + match.odds["12"] + '' + 'X: ' + match.odds["X"] + '' + 'X2: ' + match.odds["X2"];
                let date=document.createElement('h2');
                date.textContent=match.start_date;
                div.appendChild(title);
                div.appendChild(prediction);
                div.appendChild(date);
                future.appendChild(div);
                trovato=true;
            }
        }
    }
    else{
        for(match of matches){
            if(match.competition_name===content){
                let div=document.createElement('div');
                let title=document.createElement('h1');
                title.textContent=match.home_team + ' - ' + match.away_team;
                let prediction=document.createElement('div');
                prediction.innerHTML="1: " + match.odds["1"] + "<br>" + "1X: " + match.odds["1X"] + "<br>" + "2: " + match.odds["2"] + "<br>" + "12: " + match.odds["12"] + "<br>" + "X: " + match.odds["X"] + "<br>" + "X2: " + match.odds["X2"];
                let date=document.createElement('h2');
                date.textContent=match.start_date;
                div.appendChild(title);
                div.appendChild(prediction);
                div.appendChild(date);
                future.appendChild(div);
                trovato=true;
            }
        }
    }
    if(trovato){
	titolo_primo.textContent='Quote match';
        titolo_primo.classList.remove('hidden');
    }
    else{
        titolo_primo.textContent='Nessun risultato trovato';
        titolo_primo.classList.remove('hidden');
    }
}
const numResults=15;
const video_api_key="NzYzNDlfMTY4MTgxMzc5MF8wMzdiNTI0ODU4NDQ4Mzk5NmE3OTQ0YzQ3OTNiMzA5NDQxNzlkMWI5";
fetch('https://www.scorebat.com/video-api/v3/feed/' + "?token=" + video_api_key).then(onResponse).then(onJson_score);
const form=document.querySelector('form');
form.addEventListener('submit', search);
