function economicalBowler(deliveries) {
  var results_extra_run = {};

  var players_over = {};
  for (let del of deliveries) {
    var num = del.match_id * 1;
    if (num <= 576 && 518 <= num) {
      var bowler = del.bowler; //KingsXIPunjabbowler = bowler.replace(/ /g, "");
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
module.exports = economicalBowler;
