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
    var non_countries = ["Africa", "Asia", "Europe", "North America", "South America", "Oceania", 
    "Low-income countries", "Lower-middle-income countries", "Upper-middle-income countries", 
    "High-income countries", "World"];
    
    for (var i = 0; i < data.length; i++) {
        // Temporary fix so that the pie chart doesn't display any non-country values (e.g., Africa, World, etc.)
        if (!non_countries.includes(data[i][0])) {
            Country.push(data[i][0]);
            Exports.push(data[i][2]);
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