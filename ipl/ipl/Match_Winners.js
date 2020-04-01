function Match_Winners(matches) {
  var results = {};
  for (let match of matches) {
    const season = match.season;
    var winner = match.winner; //KingsXIPunjabwinner = winner.replace(/ /g, "");
    if (results[season]) {
      if (results[season][winner]) {
        results[season][winner] += 1;
      } else {
        results[season][winner] = 1
      }
    } else {
      results[season] = {}
    }
  }
  return results;
}
module.exports = Match_Winners;
