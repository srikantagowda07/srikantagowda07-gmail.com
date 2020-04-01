function mostWins(matches) {
  var results = {};
  for (let match of matches) {
    var winner = match.winner; //KingsXIPunjabwinner = winner.replace(/ /g, "");
    if (results[winner]) {
        results[winner] += 1
      }
     else {
      results[winner] = 1
    }
  }
  return results;
}
module.exports = mostWins;
