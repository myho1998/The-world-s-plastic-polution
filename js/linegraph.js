google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
  var data = google.visualization.arrayToDataTable([
    ['Year', 'Plastic Production', 'Plastic Recycling'],
    ['1950',  2, 0],
    ['1960',  8, 0],
    ['1970',  35, 0],
    ['1980',  70, 0],
    ['1990',  120, 5],
    ['2000',  213, 20],
    ['2010',  313, 54],
    ['2019',  459.75, 96],
  ]);

  var options = {
    title: 'Annual plastic production (polymer resin and fibers in million tonnes)',
    curveType: 'function',
    legend: { position: 'bottom' },
    width: 500,  
    height: 300
  };

  var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

  chart.draw(data, options);
}