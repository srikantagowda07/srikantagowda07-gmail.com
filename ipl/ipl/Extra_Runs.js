function Extra_Runs(deliveries) {
  var result = {};
  for (var del of deliveries) {
    var bowling_team = del.bowling_team;
    var num = del.match_id * 1;

    if (num >= 577 && 636 >= num) {
      if (result[bowling_team]) {
        result[bowling_team] +=  (del.extra_runs * 1);
      } else {
        result[bowling_team] =(del.extra_runs * 1);
      }
    }
  }
  return result;
  console.log(result);
}
module.exports = Extra_Runs;
