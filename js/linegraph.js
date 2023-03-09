google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
  var data = google.visualization.arrayToDataTable([
    ['Year', 'Plastic Production(Million tonnes)', 'Recycled(Million tonnes'],
    ['1950',  2, 1],
    ['1960',  8, 1],
    ['1970',  35, 3],
    ['1980',  70, 12],
    ['1990',  120, 28],
    ['2000',  213, 43],
    ['2010',  313, 66],
    ['2019',  459.75, 86],
  ]);

  var options = {
    title: 'Million tonnes by years',
    curveType: 'function',
    legend: { position: 'bottom' }
  };

  var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

  chart.draw(data, options);
}