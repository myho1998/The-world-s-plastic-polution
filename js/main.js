    // initialize basemmap
mapboxgl.accessToken =
    'pk.eyJ1IjoibGlsbGx5MDIiLCJhIjoiY2xkZ2o4dTA1MHh1MTNxcjhjbmxucGZjZSJ9.ODEhxh5a5B_as4sMO9Z73w';
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/dark-v10', // style URL
    zoom: 1, // starting zoom
    center: [-100, 40] // starting center
});

// load data and add as layer
async function geojsonFetch() {
    let response = await fetch('assets/data_for_choropleth.csv');
    let covid_rates = await response.json();

    map.on('load', () => { 
        map.addSource('covid_rates', {
            type: 'geojson',
            data: covid_rates
        });

        map.addLayer({
            'id': 'covid_rates_layer',
            'type': 'fill',
            'source': 'covid_rates',
            'paint': {
                'fill-color': [
                    'step',
                    ['get', 'rates'],
                    '#FFEDA0',   // stop_output_0
                    10,          // stop_input_0
                    '#FEB24C',   // stop_output_2
                    50,          // stop_input_2
                    '#FD8D3C',   // stop_output_3
                    100,         // stop_input_3
                    '#FC4E2A',   // stop_output_4
                    200,         // stop_input_4
                    '#E31A1C',   // stop_output_5
                    500,         // stop_input_5
                    '#BD0026',   // stop_output_6
                ],
                'fill-outline-color': '#BBBBBB',
                'fill-opacity': 0.7,
            }
        });

        map.addSource('us-covid-2020-counts', {
            type: 'geojson',
            data: 'assets/data_for_choropleth.csv'
        });

        const layers = [
            '0-9',
            '10-49',
            '50-99',
            '100-199',
            '200-499',
            '500 and more'
        ];
        const colors = [
            '#FFEDA070',
            '#FEB24C70',
            '#FD8D3C70',
            '#FC4E2A70',
            '#E31A1C70',
            '#80002670'
        ];

        // create legend
        const legend = document.getElementById('legend');
        legend.innerHTML = "<b><center><span style='color: white;'>Covid-19 Cases (per thousand residents)</center><br>";



        layers.forEach((layer, i) => {
            const color = colors[i];
            const item = document.createElement('div');
            const key = document.createElement('span');
            key.className = 'legend-key';
            key.style.backgroundColor = color;

            const value = document.createElement('span');
            value.innerHTML = `${layer}`;
            item.appendChild(key);
            item.appendChild(value);
            legend.appendChild(item);
        });
    });

    map.on('mousemove', ({point}) => {
        const state = map.queryRenderedFeatures(point, {
            layers: ['covid_rates_layer']
        });
        document.getElementById('text-description').innerHTML = state.length ?
            `<h3><center>${state[0].properties.state}</center></h3><p><strong><em>${state[0].properties.rates}</strong> cases per thousand residents in ${state[0].properties.county}, ${state[0].properties.state}</em></p>` :
            `<p><center><a href="https://data.census.gov/table?g=0100000US$050000&d=ACS+5-Year+Estimates+Data+Profiles&tid=ACSDP5Y2018.DP05&hidePreview=true">Source: US Census Bureau </a></center></p>`;
            
    });
}

geojsonFetch();