mapboxgl.accessToken =
            'pk.eyJ1IjoibGlsbGx5MDIiLCJhIjoiY2xkZ2o4dTA1MHh1MTNxcjhjbmxucGZjZSJ9.ODEhxh5a5B_as4sMO9Z73w';
        let map = new mapboxgl.Map({
            container: 'map', // container ID
            style: 'mapbox://styles/lillly02/clf33ygu3001701phfouo9jh9',
            zoom: 2, // starting zoom
            center: [50, 40] // starting center
        });
        const grades = [50, 70, 90, 110, 130],
        colors = ['rgb(208,209,230)', 'rgb(103,169,207)', 'rgb(1,108,89)', 'rgb(1,59,48)', 'rgb(0,18,14)'],
        radii = [5, 10, 15, 20, 40];
        
        map.on('load', () => { 
            map.addSource('us-covid-2020-counts', {
                type: 'geojson',
                data: 'assets/data_for_choropleth.js'
            });
            map.addLayer({
                'id': 'covid-2020-counts',
                'type': 'circle',
                'source': 'us-covid-2020-counts',
                'paint': {
                    // increase the radii of the circle as cases value increases
                    'circle-radius': {
                        'property': 'pWastePercap2016',
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
                        'property': 'pWastePercap2016',
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
var labels = ['<strong>Size</strong>'], vbreak;
//iterate through grades and create a scaled circle and label for each
for (var i = 0; i < grades.length; i++) {
    vbreak = grades[i];
    // you need to manually adjust the radius of each dot on the legend 
    // in order to make sure the legend can be properly referred to the dot on the map.
    dot_radius = 2 * radii[i];
    labels.push(
        '<p class="break"><i class="dot" style="background:' + colors[i] + '; width: ' + dot_radius +
        'px; height: ' +
        dot_radius + 'px; "></i> <span class="dot-label" style="top: ' + dot_radius / 2 + 'px;">' + vbreak +
        '</span></p>');

}

// combine all the html codes.
legend.innerHTML = labels.join('');


        });

        


        