const fs = require("fs");
const csv = require("csvtojson");
const matchesPlayedPerYear = require("./ipl/matchesPlayedPerYear");
const Extra_Runs = require("./ipl/Extra_Runs");
const winningTeamPerVenue = require("./ipl/winningTeamPerVenue");
const economicalBowler = require("./ipl/economicalBowler");
const mostManOfTheMatches = require("./ipl/mostManOfTheMatches");
const Match_Winners = require("./ipl/Match_Winners");
const mostWins = require("./ipl/mostWins");

const MATCHES_FILE_PATH = "./csv_data/matches.csv";
const DELIVERIES_FILE_PATH = "./csv_data/deliveries.csv";
const JSON_OUTPUT_FILE_PATH = "./public/data.json";
var finalResult = {};

function main() {
  csv()
    .fromFile(MATCHES_FILE_PATH)
    .then(matches => {
      let resultPlayedPerYear = matchesPlayedPerYear(matches);
      finalResult['matchesPlayedPerYear'] = resultPlayedPerYear;
      let resultPerVenue = winningTeamPerVenue(matches);
      finalResult['winningTeamPerVenue'] = resultPerVenue;
      let resultmostManOfTheMatches = mostManOfTheMatches(matches);
      finalResult['mostManOfTheMatches'] = resultmostManOfTheMatches;
      let resultMatch_Winners = Match_Winners(matches);
      finalResult['Match_Winners'] = resultMatch_Winners;
      let resultmostWins = mostWins(matches);
      finalResult['mostWins'] = resultmostWins;
    //  console.log(resultmostWins);
    });
  csv()
    .fromFile(DELIVERIES_FILE_PATH)
    .then(deliveries => {
      let result2 = Extra_Runs(deliveries);
      finalResult['Extra_Runs'] = result2;
      let resulteconomicalBowler = economicalBowler(deliveries);
      finalResult['economicalBowler'] = resulteconomicalBowler;
      const jsonString = JSON.stringify(finalResult);
      fs.writeFile(JSON_OUTPUT_FILE_PATH, jsonString, "utf8", err => {
        if (err) {
          console.error(err)
        }
      });
    });
}
main();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  app.use(express.static('public'));
app.get('/extraRunsConceded1/:yearId', (req, res) => {

  function economicalBowler(matches,deliveries) {
    var results_extra_run = {};

  var players_over = {};
  var a = [];
  let year = req.params.yearId;
        for (var match of matches) {
          var season = match.season;
          if(season == year){
            var id = match.id;
            a.push(id);
          }
        }
  for (let del of deliveries) {
     var matchId = del.match_id
    if (a.includes(matchId)) {
      var bowler = del.bowler;
      if (results_extra_run[bowler]) {
        results_extra_run[bowler] += (del.total_runs * 1);
      } else {
        results_extra_run[bowler] = (del.total_runs * 1);
      }
      if (players_over[bowler]) {
        players_over[bowler] += 1;
      } else {
        players_over[bowler] = 1
      }
    }
  }
    for (var key of Object.keys(players_over)) {
      players_over[key] = players_over[key] / 6;
      players_over[key] = results_extra_run[key] / players_over[key];
    }
    var newO = {};
    Object.keys(players_over).sort(function(a, b) {
        return players_over[a] - players_over[b]
      })
      .map(key => newO[key] = players_over[key]);
  
    function objSlice(newO, lastExclusive) {
      var filteredKeys = Object.keys(newO).slice(0, lastExclusive);
      var newObj = {};
      filteredKeys.forEach(function(key) {
        newObj[key] = newO[key];
      });
      return newObj;
    }
    var players_over = objSlice(newO, 10);
    return players_over; //return results_extra_run;
  }
      
let finalResult1 = {};
function main() {

    csv()
      .fromFile(MATCHES_FILE_PATH)
      .then(matches => {
        let result={};
        csv()
        .fromFile(DELIVERIES_FILE_PATH)
        .then(deliveries =>{
          result = economicalBowler(matches,deliveries);
          finalResult1 = JSON.stringify(result);
          res.send(finalResult1);
    }); 
   });
  }
  main();
});

app.listen(port, () => console.log(`server running at at http://localhost:${port}`));

