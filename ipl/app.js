function fetchAndVisualizeData() {
  fetch("./data.json")
    .then(r => r.json())
    .then(visualizeData);
}

fetchAndVisualizeData();

function extraRunsConceded1() {
  var yearId = document.getElementById("year-input").value;
  console.log(yearId);
  fetch("http://localhost:3000/extraRunsConceded1/"+ yearId)
  .then((response) => {
    return response.json()
  })
  .then(data => {
    visualizeExtraRunsConceded1(data);
  });
}

function visualizeExtraRunsConceded1(extraRunsConceded) {
  const seriesData = [];  
  var yearId = document.getElementById("year-input").value;
  for (let team in extraRunsConceded) {
    seriesData.push([team, extraRunsConceded[team]]);
  }
  Highcharts.chart("visualizeExtraRuns", {
    chart: {
      type: "column"
    },
    title: {
      text: "TOP 10 Economical Bowlers of " + yearId + " Season "
    },
    subtitle: {
      text:
        'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>'
    },
    xAxis: {
      title: {
        text: "Players Name"
      },
      type: "category"
    },
    yAxis: {
      min: 0,
      title: {
        text: "Economical Bowlers"
      }
    },
    series: [
      {
        name: "Economical Bowlers Dynamic Visuals",
        data: seriesData,

      }
    ]
  });
}




function visualizeData(data) {
  visualizeMatchesPlayedPerYear(data.matchesPlayedPerYear);
  visualizeMostWins(data.mostWins);
  visualizeExtraRuns(data.Extra_Runs);
  visualizeTopEconomicalBowler(data.economicalBowler);
  visualizemostManOfMatches(data.mostManOfTheMatches);
  visualizemostWinsPerSeason(data.Match_Winners, data.mostWins);
  visualizeMostMatchesWonAtVenue(data.winningTeamPerVenue, data.mostWins);
  return;
}

function visualizeMatchesPlayedPerYear(matchesPlayedPerYear) {
  const seriesData = [];
  for (let year in matchesPlayedPerYear) {
    seriesData.push([year, matchesPlayedPerYear[year]]);
  }

  Highcharts.chart("matches-played-per-year", {
    chart: {
      type: "column"
    },
    title: {
      text: "Matches Played Each Year"
    },
    subtitle: {
      text:
        'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>'
    },
    xAxis: {
      title: {
        text: "years"
      },
      type: "category"
    },
    yAxis: {
      min: 0,
      title: {
        text: "Matches"
      }
    },
    series: [
      {
        name: "Matches of All Years",
        data: seriesData
      }
    ]
  });
}

function visualizeExtraRuns(Extra_Runs) {
  const seriesData = [];
  for (let year in Extra_Runs) {
    seriesData.push([year, Extra_Runs[year]]);
  }
  Highcharts.chart("Extra_Runs", {
    chart: {
      type: "column"
    },
    title: {
      text: "Extra Runs Conceded in 2016 By Each-Team"
    },
    subtitle: {
      text:
        'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>'
    },
    xAxis: {
      title: {
        text: "Teams"
      },
      type: "category"
    },
    yAxis: {
      min: 0,
      title: {
        text: "Extra Runs"
      }
    },
    series: [
      {
        name: "Extra Runs",
        colorByPoint: true,
        data: seriesData,
        showInLegend: false
      }
    ]
  });
}

function visualizeTopEconomicalBowler(economicalBowler) {
  const seriesData = [];
  for (let year in economicalBowler) {
    seriesData.push([year, parseFloat(economicalBowler[year])]);
  }
  Highcharts.chart("economicalBowler", {
    chart: {
      type: "column"
    },
    title: {
      text: "Top 10 Economical Bowler"
    },
    subtitle: {
      text:
        'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>'
    },
    xAxis: {
      title: {
        text: "Players"
      },
      type: "category"
    },
    yAxis: {
      min: 0,
      title: {
        text: "Economy"
      }
    },
    series: [
      {
        name: "Economical run_rate",
        data: seriesData
      }
    ]
  });
}

function visualizemostManOfMatches(mostManOfTheMatches) {
  const seriesData = [];
  for (let player in mostManOfTheMatches) {
    seriesData.push([player, mostManOfTheMatches[player]]);
  }
Highcharts.chart('mostManOfTheMatches', {
  chart: {
    type: 'column'
  },
  title: {
      text: 'Man of The Matches of All Times'
  },

  subtitle: {
      text: 'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>'
  },

  xAxis: {
    title: {
      text: "Teams"
    },
    type: "category"
  },
  yAxis: {
    min: 0,
    title: {
      text: "Matches"
    }
  },

  series: [{
      name: 'MOM',
      colorByPoint: true,
      data: seriesData,
      showInLegend: false
  }]

});
}

function visualizeMostWins(mostWins) {
   const seriesData = [];
   for (let year in mostWins) {
     seriesData.push([year, mostWins[year]]);
   }
   Highcharts.chart("mostWins", {
     chart: {
       plotBackgroundColor: null,
       plotBorderWidth: null,
       plotShadow: false,
       type: "pie"
     },
     title: {
       text: "Winners"
     },
     subtitle: {
       text:
         'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>'
     },
     tooltip: {
       pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>"
     },
     accessibility: {
       point: {
         valueSuffix: "%"
       }
     },
     plotOptions: {
       pie: {
         allowPointSelect: true,
         cursor: "pointer",
         dataLabels: {
           enabled: false
         },
         showInLegend: true
       }
     },
     series: [
       {
         name: "Brands",
         colorByPoint: true,
         data: seriesData
       }
     ]
   });
}

function visualizeMostMatchesWonAtVenue(winningTeamPerVenue, mostWins) {
  const venues = Object.keys(winningTeamPerVenue);
  const teams = Object.keys(mostWins);
  let seriesData = [];
  seriesData = teams.map(team => ({
    name: team,
    data: venues.map(v => winningTeamPerVenue[v][team] || 0)
  }));

  Highcharts.chart("winningTeamPerVenue", {
    chart: {
      type: "bar"
    },
    title: {
      text: "winnes at Venue"
    },
    subtitle: {
      text:
        'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>'
    },
    xAxis: {
      categories: venues
    },
    yAxis: {
      min: 0,
      title: {
        text: "Total Wins"
      }
    },
    legend: {
      reversed: true
    },
    plotOptions: {
      series: {
        stacking: "normal"
      }
    },
    series: seriesData
  });
}



function visualizemostWinsPerSeason(Match_Winners, mostWins) {
  const teams = Object.keys(mostWins);
  const seasons=Object.keys(Match_Winners);
  let seriesData=[];
  seriesData = teams.map(team => ({
    name: team,
    data: seasons.map(season => Match_Winners[season][team] || 0)
  }));

  Highcharts.chart('Winners', {
    chart: {
        type: 'column'
    },
    title: {
        text: 'Match : - Winners'
    },
    subtitle: {
      text:
        'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>'
    },
    xAxis: {
      title: {
        text: "Teams"
      },
        categories: seasons,
        crosshair: true
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Total Wins'
        }
    },
    tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y}</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
    },
    plotOptions: {
        column: {
            pointPadding: 0.2,
            borderWidth: 0
        }
    },
    series: seriesData
});
}




/*
function visualizemostDlWinner(Match_Winners) {
  const seriesData = [];
  for (let team in Match_Winners) {
    seriesData.push([team, Match_Winners[team]]);
  }

  Highcharts.chart("container6", {
    chart: {
      type: "column"
    },
    title: {
      text: "Most Matches Won By Teams (DL method)"
    },
    subtitle: {
      text:
        'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>'
    },
    xAxis: {
      title: {
        text: "Teams"
      },
      type: "category"
    },
    yAxis: {
      min: 0,
      title: {
        text: "Matches"
      }
    },
    series: [
      {
        name: "Matches",
        data: seriesData
      }
    ]
  });
}
*/
