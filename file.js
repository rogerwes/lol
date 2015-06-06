/*eslint-env browser, jquery, meteor*/
function something(hii) {
	//Alert with message	
	alert(hii);
}

function lolAPI(){
	var key = "?api_key=0003fbfc-6008-4aac-bc0e-b0359ac2891e";
	var url = "https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/";
	var summonerID = document.getElementById('name').value;
	$.ajax({
		dataType: "json",
		url: url + summonerID + key,
		success: function(result){
			console.log(result);
			//TODO: verify ack is equal to the summonerID
			//The ack should have a substring thats found
			//Actually just need better error handling
			var ack = result[summonerID.toLowerCase()];
			alert(ack.summonerLevel);
			//alert(result.varleghan.summonerLevel);
		}
	});
}

function getChampion(){
	var getter = "https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion?api_key=0003fbfc-6008-4aac-bc0e-b0359ac2891e";
	
	$.ajax({
		dataType: "json",
		url: getter,
		success: function(result){
			console.log(result);
			
			//data is the object type, vied from log statement above
			_.each(result.data, function(r) {
				//Use # when referencing elements by ID
				$("#Name").append("<div>" + r.name + "</div>");
				console.log(r);	
			});
			
			//this returns all the champs in an array sorted by 
			//there name alphabetically
		}
	});
}

//Gather all the functions
function runes(){
	var getter = "https://global.api.pvp.net/api/lol/static-data/na/v1.2/rune?api_key=0003fbfc-6008-4aac-bc0e-b0359ac2891e";
	
	$.ajax({
		dataType: "json",
		url: getter,
		success: function(result){
			console.log(result);
		},
		error: function(error){
			//todo: figure out a way to handle errors	
		}
	});
}

//func to take given runes and write out to the page
function outputToHTML(){
	
}

//func to make some sense of the rune stats
function stats(){
	
}

