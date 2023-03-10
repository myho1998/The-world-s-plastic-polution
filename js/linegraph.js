google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
  var data = google.visualization.arrayToDataTable([
    ['Year', 'Plastic Production', 'Plastic Recycling', 'Europe Plastic Production'],
    ['1950',  2, 0, 0.35],
    ['1960',  8, 0, 16],
    ['1970',  35, 0, 19.8],
    ['1976',  50, 0, 24.8],
    ['1980',  70, 0, 27.4],
    ['1990',  120, 5, 39.8],
    ['2000',  213, 20, 56.1],
    ['2010',  313, 54, 57],
    ['2019',  459.75, 96, 56.2],
  ]);

  var options = {
    title: 'Annual plastic production (polymer resin and fibers in million tonnes)',
    curveType: 'function',
    legend: { position: 'top' },
    width: 500,  
    height: 300
  };

  var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

  chart.draw(data, options);
}