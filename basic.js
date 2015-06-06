/*eslint-env browser, jquery, meteor*/
$(document).ready(function(){
	$("#basicTst").on("click",function(){
		getAllChampions();
	});		
	$("#getSummoner").on("click",function(){
		$("#summonerTable").empty();
		$("#summonerTable").append("<tr><th>Match Type</th><th>Match Stats</th></tr>");
		var summonerName = $("#summonerName").val();
		getBasicSummonerInfoBasic(summonerName);
	});
	$("#summonerName").on('keypress',function(e){
		if(e.keyCode === 13){
			$("#getSummoner").trigger('click');
		}
		
	});
});

function getAllChampions(){
	var key = "&api_key=66617fa8-41f5-4e36-9216-801e21eba30d";
	var base = "https://na.api.pvp.net/api/lol/static-data/na/v1.2/champion?champData=image";
	
	$.ajax({
		type : "GET",
		url : base + key,
		success : function(result){
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
	
	var row = "<tr><td><img style='height:50px;width:50px' src='http://ddragon.leagueoflegends.com/cdn/"+ver+"/img/champion/"+thumbnail+"'></td>"+
	"<td class=id>"+id+"</td>"+
	"<td class=key>"+key+"</td>"+
	"<td class=name>"+champName+"</td>"+
	"<td class=title>"+title+"</td>"+
	+"</tr>";
	$("#championTable").append(row);
}

function getBasicSummonerInfoBasic(summonerName){
	var base = "https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/";
	var key = "?api_key=66617fa8-41f5-4e36-9216-801e21eba30d";
	$.ajax({
		type : "GET",
		url : base + summonerName + key,
		success : function(result){
			$("#errorfetchingSummoner").hide();
			var keyMap = summonerName.toLowerCase();
			if(result != undefined){
				getStatsForSummoner(result[keyMap].id);	
			}else{
				$("#errorfetchingSummoner").show().text("No Summoner found for search key.");
			}
		},
		error : function(){
			$("#errorfetchingSummoner").show().text("Invalid Summoner name: "+summonerName);
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
			$("#errorfetchingSummoner").hide();
			if(result.playerStatSummaries != undefined){
				_.each(result.playerStatSummaries, function(match){
					var type = match.playerStatSummaryType;
					var aggStats = match.aggregatedStats;
					createStatsTable(aggStats,type);
				});
			}else{
				$("#errorfetchingSummoner").show().text("No information found.");
			}
		},
		error : function(){
			$("#errorfetchingSummoner").show().text("Invalid Summoner ID: "+sId);
		}
	});
}

function createStatsTable(stats,type){
	var pairsOfStats = _.pairs(stats); 
	var statsTable = "<table><tbody style='display: block;max-height:100px; overflow-y: auto; width:280px'>";
		
	if(pairsOfStats.length > 0){
		statsTable += "<tr><th>Stat</th><th>Value</th></tr>";
		_.each(pairsOfStats, function(at){
			statsTable += "<tr><td>"+at[0]+"</td><td>"+at[1]+"</td></tr>";
		});
	}else{
		statsTable += "<tr>No Data</tr>";
	}
	
	statsTable + "</tbody></table>";
	$("#summonerTable").append("<tr>"+
		"<td>"+type+"</td>"+
		"<td>"+statsTable+"</td>"+
		"</tr>");
}
