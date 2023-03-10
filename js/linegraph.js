google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
  var data = google.visualization.arrayToDataTable([
    ['Year', 'Plastic Production', 'Plastic Recycled'],
    ['1950',  2, 1],
    ['1960',  8, 1],
    ['1970',  35, 1],
    ['1980',  70, 1],
    ['1990',  120, 5],
    ['2000',  213, 20],
    ['2010',  313, 54],
    ['2019',  459.75, 96],
  ]);

  var options = {
    title: 'Plastic production refers to the annual production of polymer resin and fibers( Million tonnes)',
    curveType: 'function',
    legend: { position: 'bottom' },
    width: 500,  
    height: 300
  };

  var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

  chart.draw(data, options);
}