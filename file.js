/*eslint-env browser, jquery, meteor*/

/*globals Twitch Chart*/
var apikey = "";

function something(hii) {
	//Alert with message	
	alert(hii);
}


function lolAPI(){	
	var url = "https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/";
	var summonerID = document.getElementById('name').value;
	$.ajax({
		dataType: "json",
		url: url + summonerID + "?api_key=" + apikey,
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
	var getter = "https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion?api_key=";
	
	$.ajax({
		dataType: "json",
		url: getter + apikey,
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
	var getter = "https://global.api.pvp.net/api/lol/static-data/na/v1.2/rune?api_key=";
	
	$("#table1 tr").remove();
	$("#table2 tr").remove();
	$("#table3 tr").remove();
	
	$.ajax({
		dataType: "json",
		url: getter + apikey,
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

function getMatch(id){
	var getter = "https://global/api.pvp.net/api/lol/na/v2.2/match/";
	var postID = "?api_key="
	$.ajax({
		dataType: "json",
		url: getter + id + postID + apikey,
		success: function(result){
			console.log(result);
		}
	})
}


//gathers rune data on ID
function rune(rune){
	var getter = "https://global.api.pvp.net/api/lol/static-data/na/v1.2/rune/";
	var options = "?runeData=all&api_key=";
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
	});
	
	
	
	//return defered.promise();
	//return returnme;
}


//func to take given runes and write out to the page
//data is a Rune
function outputToHTML(data){
	var version = $("#versions option:selected").text();//"5.2.1";
	var runeHTML = "<TR><TD><img style='height:50px;width:50px' src='http://ddragon.leagueoflegends.com/cdn/"
		+ version + "/img/rune/" 
		+ data.image.full + "'/></TD><TD>"
		+ data.name + "</TD><TD>" 
		+ data.rune.type + "</TD><TD>"
		+ data.description + "</TD></TR>";
	
	if(data.rune.tier == 1)
	{
		$("#table1").append(runeHTML);
	}
	else if(data.rune.tier == 2)
	{
		$("#table2").append(runeHTML);
	}
	else
	{
		$("#table3").append(runeHTML);
	}
}

function getVersions(){
	var getter = "https://global.api.pvp.net/api/lol/static-data/na/v1.2/versions?api_key=";
	$.ajax({
		dataType: "json",
		url: getter + apikey,
		success: function(result){
			console.log(result);

			_.each(result, function(r){
				$("#versions").append("<option>" + r + "</option>");
			});
		}
	})
}

//func to make some sense of the rune stats
function stats(){
	
}


function keyFunction(){
	apikey = "";
	apikey = $("#key").val();
	console.log(apikey);
}


function twitch(){
	var data = "";
	$.ajax({
		dataType: "jsonp",
		url: "https://api.twitch.tv/kraken",
		data: data,
		jsonCallback: "callback",
		success: function(result){
			console.log("Twitch!!!!");
			consle.log(result);
		},
		error: function(error){
			console.log("Twitch error");
			console.log(error);
		}
	});
}

function callback(){
	Twitch.api({method: 'streams', params: {game:'Diablo III', limit:3} }, 
		function(error, list) {
  		console.debug(list);
	});
}


//TODO take a look at the callback for twitch.
//https://github.com/justintv/twitch-js-sdk
function getJ() {
	var url = "http://localhost:8080/";
	var getter = "/api/json?pretty=true";
	$.ajax({
		url: url + getter,
		dataType: "jsonp",
		data: "depth=1&tree=jobs[displayName,lastBuild[result]]&jsonp=callBack",
		jsonCallback: "callBack",
		//Success isn't needed when we have a callback apparently
		// success: function (result) {
		// 	printme(result);
		// },
		error: function (error) {
			console.log(error);
			//printme(error);
		}
	});
}

function chart(){
	var ctx = $("#myChart").get(0).getContext("2d");
	
	var myNewChart = new Chart(ctx);
	
	var myLineChart = new Chart(ctx).Line(data, {
		bezierCurve: true
	});
}

var data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
        {
            label: "My First dataset",
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: [65, 59, 80, 81, 56, 55, 40]
        },
        {
            label: "My Second dataset",
            fillColor: "rgba(151,187,205,0.2)",
            strokeColor: "rgba(151,187,205,1)",
            pointColor: "rgba(151,187,205,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(151,187,205,1)",
            data: [28, 48, 40, 19, 86, 27, 90]
        },
        {
        	label: "3rd Dataset",
        	fillColor: "rgba(255,0,0,0.3)",
        	strokeColor: "",
        	pointColor: "",
        	pointStrokeColor: "",
        	pointHighlightFill: "rgba(255,0,0,0.3)", //this one is the hover-over color dot key
        	pointHighlightStroke: "rgba(255,0,0,0.3)",
        	data: [10, 15, 20, 25, 35, 45, 65]
        }
    ]
};







































