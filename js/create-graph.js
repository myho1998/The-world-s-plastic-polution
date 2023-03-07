function parseData(createGraph) {
    Papa.parse("../assets/global_waste_exports_2010.csv", {
        download: true,
        complete: function(results) {
            createGraph(results.data);
        }
    });
}


function createGraph(data) {
    var Country = [];
    var Exports = [];
    // All non-country entries in the global_waste_exports_2010.csv file
    // Separated in case we want to introduce functionality to change from a country-level view
    // to a continent/income-level view
    let continents = ["Africa", "Asia", "Europe", "North America", "South America", "Oceania"];
    let income_levels = ["Low-income countries", "Lower-middle-income countries", "Upper-middle-income countries", 
    "High-income countries"];

    for (var i = 0; i < data.length; i++) {
        // Temporary fix so that the pie chart doesn't display any non-country values (e.g., Africa, World, etc.)
        if (!continents.includes(data[i][0]) && !income_levels.includes(data[i][0]) && data[i][0] != "World") {
            Country.push(data[i][0]);
            Exports.push(data[i][2]);
        } else {
            console.log("Excluded: " + data[i][0]);
        }
    }
    
    console.log(Country);
    console.log(Exports);
    
    var summary = c3.generate({
            bindto: '#chart',
            data: {
                rows: [
                    Country,
                    Exports
                ],
                type: 'pie',
				labels: true,
				onclick: function (d, i) { console.log("onclick", d, i); },
        		onmouseover: function (d, i) { console.log("onmouseover", d, i); },
        		onmouseout: function (d, i) { console.log("onmouseout", d, i); }
            },

            legend: {
                show: false
            }
    });

}

parseData(createGraph);