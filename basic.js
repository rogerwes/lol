/*eslint-env browser, jquery, meteor*/
$(document).ready(function(){
	var toggle = true;
	$("#basicTst").on("click",function(){
		getAllChampions();
	});		
	$("#getSummoner").on("click",function(){
		var summonerName = $("#summonerName").val();
		getBasicSummonerInfoBasic(summonerName);
	});
});

function getAllChampions(){
	var key = "&api_key=66617fa8-41f5-4e36-9216-801e21eba30d";
	var base = "https://na.api.pvp.net/api/lol/static-data/na/v1.2/champion?champData=image";
	
	$.ajax({
		type : "GET",
		url : base + key,
		success : function(result){
			console.log(result);
			var sorted = _.sortBy(result.data,'id');
			_.each(sorted, function(champ){
				createTableRowForChamp(champ, result.version);
			});
		}
	});
}

function createTableRowForChamp(champ, version){
	var id = champ.id;
	var key = champ.key;
	var champName = champ.name;
	var title = champ.title;
	var ver = version;
	var thumbnail = champ.image.full;
	
	var row = "<tr><td><img src='http://ddragon.leagueoflegends.com/cdn/"+ver+"/img/champion/"+thumbnail+"'></td>"+
	"<td class=id>"+id+"</td>"+
	"<td class=key>"+key+"</td>"+
	"<td class=name>"+champName+"</td>"+
	"<td class=title>"+title+"</td>"+
	+"</tr>";
	$("#championTable").append(row);
}

function getBasicSummonerInfoBasic(name){
	var base = "https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/";
	var key = "?api_key=66617fa8-41f5-4e36-9216-801e21eba30d";
	$.ajax({
		type : "GET",
		url : base + name + key,
		success : function(result){
			var keyMap = name.toLowerCase();
			if(result != undefined){
				getStatsForSummoner(result[keyMap].id);	
			}else{
				throw "No Summoner found for search key.";
			}
			
		}
	});
}

function getStatsForSummoner(sId){
	var base = "https://na.api.pvp.net/api/lol/na/v1.3/stats/by-summoner/"+sId+"/summary?season=SEASON2015";
	var key = "&api_key=66617fa8-41f5-4e36-9216-801e21eba30d";
	$.ajax({
		type : "GET",
		url : base + key,
		success : function(result){
			console.log(result);
			var avgAndTotal = result.playerStatSummaries[0].aggregatedStats;
			var pairsOfStats = _.pairs(avgAndTotal); 
			_.each(pairsOfStats, function(at){
				$("#summonerTable").append("<tr><td>"+at[0]+"</td><td>"+at[1]+"</td></tr>");
			});
		}
	});
}

