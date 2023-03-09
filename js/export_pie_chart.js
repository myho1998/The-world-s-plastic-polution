function parseData(selection, createGraph) {
    Papa.parse("../assets/global_waste_exports_2010.csv", {
        download: true,
        complete: function(results) {
            createGraph(selection, results.data);
        }
    });
}


function createGraph(selection, data) {
    var Country = [];
    var Exports = [];
    // All non-country entries in the global_waste_exports_2010.csv file
    // Separated so we can easily do different views
    let continents = ["Africa", "Asia", "Europe", "North America", "South America", "Oceania"];
    let income_levels = ["Low-income countries", "Lower-middle-income countries", "Upper-middle-income countries",
        "High-income countries"];

    // Not the world's most efficient code, but it works
    switch (selection) {
        case "Country":
            for (var i = 0; i < data.length; i++) {
                // Just countries
                if (!continents.includes(data[i][0]) && !income_levels.includes(data[i][0]) && data[i][0] != "World") {
                    Country.push(data[i][0]);
                    Exports.push(data[i][2]);
                } else {
                    console.log("Excluded: " + data[i][0]);
                }
            }
            break;
        case "Continent":
            // Just continents
            for (var i = 0; i < data.length; i++) {
                if (continents.includes(data[i][0])) {
                    Country.push(data[i][0]);
                    Exports.push(data[i][2]);
                } else {
                    console.log("Excluded: " + data[i][0]);
                }
            }
            break;
        case "Income Level":
            // Just income levels
            for (var i = 0; i < data.length; i++) {
                if (income_levels.includes(data[i][0])) {
                    Country.push(data[i][0]);
                    Exports.push(data[i][2]);
                } else {
                    console.log("Excluded: " + data[i][0]);
                }
            }
            break;
        default:
            console.log("Error: default value reached in switch statement");
    }

    // console.log(Country);
    // console.log(Exports);

    var summary = c3.generate({
        bindto: '#chart',
        data: {
            rows: [
                Country,
                Exports
            ],
            type: 'pie',
            labels: true,
            onclick: function(d, i) {
                console.log("onclick", d, i);
            },
            onmouseover: function(d, i) {
                console.log("onmouseover", d, i);
            },
            onmouseout: function(d, i) {
                console.log("onmouseout", d, i);
            }
        },

        tooltip: {
            format: {
                value: function (value, ratio, id) {
                    return `${value} Exports`;
                }
            }
        },

        legend: {
            show: false
        }
    });
    
    // Set a timeout so that we can ensure that the `chart` element is created.
    function onReady(selector, callback) {
        var intervalID = window.setInterval(function() {
          if (document.querySelector(selector) !== undefined) {
            window.clearInterval(intervalID);
            callback.call(this);
          }
        }, 500);
      }
}


function selectView(selection) {
    var elem = document.getElementById("pie_selector");
    if (elem.innerHTML != selection) {
        elem.innerHTML = selection;
        parseData(selection, createGraph);
    }
}


parseData("Country", createGraph);