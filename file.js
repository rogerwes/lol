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
			console.log("runes success");
			console.log(result);
			_.each(result.data, function(r){
				//outputToHTML(r, rune(r.id));
				rune(r);
			});
			
			//instead of foreaching and directing output inside,
			//do foreach, then in complete for second call we can
			//call output.
		},
		error: function(error){
			//todo: figure out a way to handle errors	
		},
		complete: function(data){
			console.log("runes completed");
			//console.log(data.responseText);
			//_.each(data.responseText, function(r){
			//	rune(r);
			//})
			//rune(data.responseText);
		}
	});
}



//gathers rune data on ID
function rune(rune){
	var getter = "https://global.api.pvp.net/api/lol/static-data/na/v1.2/rune/";
	var options = "?runeData=all&";
	var full = getter + rune.id + options + apikey;
	//var deferred = $.Deferred();
	
	$.ajax({
		dataType: "json",
		url: full,
		success: function(result){
			console.log("rune successfull");
			console.log(result);
			outputToHTML(result);
			//returnme = result;
			//return result;
			//lets do a call in here to give the output...
		},
		complete: function(data){
			console.log("rune completed");
			console.log(data.responseText);
			//outputToHTML(data.responseText);
		}
	})
	
	
	
	//return defered.promise();
	//return returnme;
}


//func to take given runes and write out to the page
//data is a Rune, and idData is a Rune by ID
function outputToHTML(data){	
	var rune = "<TR> <TD>" 
		+ data.image + "</TD><TD>"
		+ data.name + "</TD><TD>" 
		+ data.rune.type + "</TD><TD>"
		+ data.description + "</TD></TR>";
	
	if(data.rune.tier == 1)
	{
		$("#table1").append(rune);
	}
	else if(data.rune.tier == 2)
	{
		$("#table2").append(rune);
	}
	else
	{
		$("#table3").append(rune);
	}
}

//func to make some sense of the rune stats
function stats(){
	
}

