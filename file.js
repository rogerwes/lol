/*eslint-env browser, jquery, meteor*/
function something(hii) {
	//Alert with message	
	alert(hii);
}

var apikey = "api_key=0003fbfc-6008-4aac-bc0e-b0359ac2891e";

function lolAPI(){	
	var url = "https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/";
	var summonerID = document.getElementById('name').value;
	$.ajax({
		dataType: "json",
		url: url + summonerID + apikey,
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
			_.each(result.data, function(r){
				outputToHTML(r, rune(r.id));
			});
		},
		error: function(error){
			//todo: figure out a way to handle errors	
		}
	});
}

//gathers rune data on ID
function rune(id){
	var getter = "https://global.api.pvp.net/api/lol/static-data/na/v1.2/rune/";
	var options = "?runeData=all&";
	var full = getter + id + options + apikey;
	var returnme;	
	
	$.ajax({
		dataType: "json",
		url: full,
		success: function(result){
			console.log(result);
			returnme = result;
		}
	})
	return returnme;
}



//func to take given runes and write out to the page
function outputToHTML(data, idData){
	if(data.rune.tier == 1)
	{
		$("#Name1").append("<div>" + data.name + "</div>");
		$("#Type1").append("<dvv>" + data.rune.type + "<div>");
	}
	else if(data.rune.tier == 2)
	{
		$("#Name2").append("<div>" + data.name + "<div>");
		$("#Type2").append("<div>" + data.rune.type + "<div>");
	}
	else
	{
		$("#Name3").append("<div>" + data.name + "<div>");
		$("#Type3").append("<div>" + data.rune.type + "<div>");
	}
}

//func to make some sense of the rune stats
function stats(){
	
}

