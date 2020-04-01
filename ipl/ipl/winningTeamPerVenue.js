function winningTeamPerVenue(matches) {
  var results = {};
  for (let match of matches) {
    const winner = match.winner;
    var venue = match.venue;
    if (results[venue]) {
      if (results[venue][winner]) {
        results[venue][winner] += 1;
      } else {
        results[venue][winner] = 1
      }
    } else {
      results[venue] = {}
    }
  }
  return results;
}
module.exports = winningTeamPerVenue;
