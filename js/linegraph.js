google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
  var data = google.visualization.arrayToDataTable([
    ['Year', 'Plastic Production( Million tonnes)'],
    ['1950',  2],
    ['1960',  8],
    ['1970',  35],
    ['1980',  70],
    ['1990',  120],
    ['2000',  213],
    ['2010',  313],
    ['2019',  459.75],
  ]);

  var options = {
    title: 'Global Plastics Production',
    curveType: 'function',
    legend: { position: 'bottom' }
  };

  var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

  chart.draw(data, options);
}