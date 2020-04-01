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
      console.log(resultmostWins);
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



/*
function saveMatchesPlayedPerYear(result) {
  const jsonData = {
    matchesPlayedPerYear: result
  };
  const jsonString = JSON.stringify(jsonData);
  fs.writeFile(JSON_OUTPUT_FILE_PATH1, jsonString, "utf8", err => {
    if (err) {
      console.error(err);
    }
  });
}
function saveExtra_Runs(result2) {
  const jsonData2 = {
    Extra_Runs: result2
  };
  const jsonString2 = JSON.stringify(jsonData2);
  fs.writeFile(JSON_OUTPUT_FILE_PATH2, jsonString2, "utf8", err => {
    if (err) {
      console.error(err);
    }
  });
}

/*
function savewinningTeamPerVenue(resultPerVenue) {
  const jsonData3 = {
    winningTeamPerVenue : resultPerVenue
  };
  const jsonString3 = JSON.stringify(jsonData3);
  fs.writeFile(JSON_OUTPUT_FILE_PATH3, jsonString3, "utf8", err => {
    if (err) {
      console.error(err);
    }
  });
}*/
