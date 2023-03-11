mapboxgl.accessToken =
            'pk.eyJ1IjoibGlsbGx5MDIiLCJhIjoiY2xkZ2o4dTA1MHh1MTNxcjhjbmxucGZjZSJ9.ODEhxh5a5B_as4sMO9Z73w';
        let map = new mapboxgl.Map({
            container: 'map', // container ID
            style: 'mapbox://styles/lillly02/clf33ygu3001701phfouo9jh9',
            zoom: 2, // starting zoom
            center: [50, 40] // starting center
        });
        const grades = [100, 500, 1000, 5000, 10000, 35000],
        colors = ['rgb(235,209,256)', 'rgb(205,145,242)', 'rgb(161,53,237)', 'rgb(138,18,237)', 'rgb(84,9,149)', 'rgb(58,5,102)'],
        radii = [5, 10, 15, 20, 25];
        
        map.on('load', () => { 
            map.addSource('pWaste2016data', {
                type: 'geojson',
                data: 'assets/data_for_choropleth.js'
            });
            map.addLayer({
                'id': 'pWaste2016Counts',
                'type': 'circle',
                'source': 'pWaste2016data',
                'paint': {
                    // increase the radii of the circle as cases value increases
                    'circle-radius': {
                        'property': 'pWaste2016',
                        'stops': [
                            [grades[0], radii[0]],
                            [grades[1], radii[1]],
                            [grades[2], radii[2]], 
                            [grades[3], radii[3]], 
                            [grades[4], radii[4]]
                        ]
                    },
                    // change the color of the circle as cases value increases
                    'circle-color': {
                        'property': 'pWaste2016',
                        'stops': [
                            [grades[0], colors[0]],
                            [grades[1], colors[1]],
                            [grades[2], colors[2]], 
                            [grades[3], colors[3]], 
                            [grades[4], colors[4]]
                        ]
                    },
                    'circle-stroke-color': 'white',
                    'circle-stroke-width': 1,
                    'circle-opacity': 0.6
                }
            });
            // click on tree to view magnitude in a popup
// create legend object, it will anchor to the div element with the id legend.
const legend = document.getElementById('legend');

//set up legend grades and labels
var labels = ['<center><strong>Total Pollution in 2016 (Per thousand metric tons)</center></strong>'], vbreak;
//iterate through grades and create a scaled circle and label for each
for (var i = 0; i < grades.length; i++) {
    vbreak = grades[i];
    // you need to manually adjust the radius of each dot on the legend 
    // in order to make sure the legend can be properly referred to the dot on the map.
    dot_radius = 4 * radii[i];
    labels.push(
        '<p class="break"><i class="dot" style="background:' + colors[i] + '; width: ' + dot_radius +
        'px; height: ' +
        dot_radius + 'px; "></i> <span class="dot-label" style="top: ' + dot_radius / 2 + 'px;">' + vbreak +
        '</span></p>');

}

// combine all the html codes.
legend.innerHTML = labels.join('');


        });

        


        