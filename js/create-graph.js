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
    var Exports = ["Exports"];
    
    for (var i = 0; i < data.length; i++) {
        Country.push(data[i][0]);
        Exports.push(data[i][2])
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

			size: {
				width: 500,
				height: 500
			},

			zoom: {
				enabled: true
			},

            legend: {
                show: false
            }
    });

}

parseData(createGraph);