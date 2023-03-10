mapboxgl.accessToken =
            'pk.eyJ1IjoibGlsbGx5MDIiLCJhIjoiY2xkZ2o4dTA1MHh1MTNxcjhjbmxucGZjZSJ9.ODEhxh5a5B_as4sMO9Z73w';
        let map = new mapboxgl.Map({
            container: 'map', // container ID
            style: 'mapbox://styles/lillly02/clf33ygu3001701phfouo9jh9',
            zoom: 4, // starting zoom
            center: [-100, 40] // starting center
        });
        const grades = [1000, 5000, 10000, 50000, 100000],
            colors = ['rgb(208,209,230)', 'rgb(103,169,207)', 'rgb(1,108,89)', 'rgb(1,59,48)', 'rgb(0,18,14)'],
            radii = [5, 10, 15, 20, 40];

        map.on('load', () => { 
            map.addSource('us-covid-2020-counts', {
                type: 'geojson',
                data: 'assets/us-covid-2020-counts.json'
            });
            map.addLayer({
                'id': 'covid-2020-counts',
                'type': 'circle',
                'source': 'us-covid-2020-counts',
                'paint': {
                    // increase the radii of the circle as cases value increases
                    'circle-radius': {
                        'property': 'cases',
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
                        'property': 'cases',
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
            map.on('click', 'covid-2020-counts', (event) => {
                new mapboxgl.Popup()
                    .setLngLat(event.features[0].geometry.coordinates)
                    .setHTML(`<strong>Counts:</strong> ${event.features[0].properties.cases}`)
                    .addTo(map);
            });
        });

        const legend = document.getElementById('legend');
        //set up legend grades and labels
        var labels = ['<FONT COLOR="#FFFFFF"><strong>Covid Case Count</strong>'],
            vbreak;
        //iterate through grades and create a scaled circle and label for each
        for (var i = 0; i < grades.length; i++) {
            vbreak = grades[i];
            // you need to manually adjust the radius of each dot on the legend 
            // in order to make sure the legend can be properly referred to the dot on the map.
            dot_radii = 2 * radii[i];
            labels.push(
                '<p class="break"><i class="dot" style="background:' + colors[i] + '; width: ' + dot_radii +
                'px; height: ' +
                dot_radii + 'px; "></i> <span class="dot-label" style="top: ' + dot_radii / 2 + 'px;">' + vbreak +
                '</span></p>');
        }
        // add the data source
        const source =
            '<p style="text-align: right; font-size:10pt">Source: <a href="https://github.com/nytimes/covid-19-data/blob/43d32dde2f87bd4dafbb7d23f5d9e878124018b8/live/us-counties.csv">NYT</a></p>';
        // combine all the html codes.
        legend.innerHTML = labels.join('') + source;


        