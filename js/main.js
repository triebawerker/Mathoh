var frequencies = [120, 240, 480, 1200, 2400, 4800, 6200];
var volumes = {};
var yourResults = [];

function play() {}
function stop() {}

$(function() {
    switchToInput();
});


// START OUTPUT DEFINITION

function switchToOutput() {
    $('h1#heading').text("Mathoh - Measure your ATH");
    $('p#description')
        .text("Results")
        .append(
        $('<button>')
            .text("Test your hearing")
            .addClass("btn-info")
            .addClass("btn")
            .on("click", function() {
                switchToInput();
            })
        );

    $('section#input')
        .hide();

    $('section#output')
        .empty()
        .show()
        .append('<div id="chart"></div>');

    for (var i in volumes) {
        yourResults.push([i, volumes[i]]);
    }

    generateChart("male");
}

function generateChart(gender) {
    new Highcharts.Chart({
        chart: {
            renderTo: 'chart',
            type: 'area'
        },
        title: {
            text: "Analysis for " + gender
        },
        xAxis: {
            title: {
                text: "Frequency"
            },
            labels: {
                formatter: function() {
                    return this.value + " Hz";
                }
            }
        },
        yAxis: {
            title: {
                text: 'Volume'
            },
            labels: {
                formatter: function() {
                    return parseInt(this.value * 100) + "%";
                }
            }
        },
        series: [{
            name: 'Standard',
            data: yourResults
        }]
    });
};

// END OUTPUT DEFINITION


// START INPUT DEFINITION

function switchToInput() {
    $('h1#heading').text("Mathoh - Measure your ATH");
    $('p#description')
        .text("Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et " +
        "dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea " +
        "commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat " +
        "nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit " +
        "anim id est laborum.")
        .append(
        $('<button>')
            .text("View your results")
            .addClass("btn-info")
            .addClass("btn")
            .on("click", function() {
                switchToOutput();
            })
        );

    $('section#output')
        .hide();

    $('section#input')
        .show();

    volumes = {};
    for (var i = 0; i < frequencies.length; ++i) {
        volumes[frequencies[i]] = 0;
    }

    populateInput();
}

function populateInput() {
    var element = $('section#input'),
        _ul = $('<ul>');
    element.empty();

    for (var i = 0; i < frequencies.length; ++i) {
        _ul.append(generateListElement(frequencies[i]));
    }

    element.append(_ul);
}

function generateListElement(frequency) {
    var _li, _button, _progress, _bar, _span;

    _button = $('<button>')
        .attr({
            "id": "control-" + frequency,
            "type": "button"
        })
        .addClass("btn")
        .on("click", function() {
            if (!$(this).hasClass("btn-danger")) {
                $(this).addClass("btn-danger").text("Stop");
                play(frequency, function(volume) {
                    $('li#frequency-' + frequency + ' div.bar').attr({
                        "style": "width: " + parseInt(volume * 100)
                    })
                });
            } else {
                $(this).removeClass("btn-danger").text("Start");
                volumes[frequency] = stop();
            }
        })
        .text("Start");
    _bar = $('<div>')
        .addClass("bar")
        .attr({ "style": "width: 73%" });
    _progress = $('<div>')
        .addClass("progress")
        .append(_bar);
    _span = $('<span>')
        .text(frequency + " Hz");
    _li = $('<li>')
        .attr({
            "id": "frequency-" + frequency
        })
        .append(_button)
        .append(_progress)
        .append(_span);

    return _li;
}

// END INPUT DEFINITION