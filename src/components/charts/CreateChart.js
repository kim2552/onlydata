import Chart from 'chart.js';

/*** Create Chart and Content */
export function createLineChart(json_data,reference) {
    let csv_data = JSON.parse(json_data).data;

    var indep_header = csv_data[0][1];  // Get the independent variable header (i.e. Number of cases)
    var dep_header = csv_data[0][0];    // Get the dependent variable header    (i.e. Date)
    var label_arr = [];
    var data_arr = [];

    var gradient = reference.createLinearGradient(0, 0, 0, 450);
    gradient.addColorStop(0, 'rgba(36, 105, 255, 0.5)');
    gradient.addColorStop(0.5, 'rgba(36, 105, 255, 0.25)');
    gradient.addColorStop(1, 'rgba(36, 105, 255, 0)');

    let i;
    for(i=1;i<csv_data.length;i++){
        if(csv_data[i][0] !== undefined && csv_data[i][1] !== undefined){
            label_arr.push(csv_data[i][0]);
            data_arr.push(csv_data[i][1].replace(/,+/g,'').replace(/['"]+/g, ''));
        }
    }

    return new Chart(reference, {
        type: 'line', // bar, horizontalBar, pie, line, doughnut, radar, polarArea
        data:{
            labels: label_arr,
            datasets:[{
                data: data_arr,
                pointBackgroundColor: "#2469FF",
                borderColor:'#777',
                backgroundColor: gradient
            }]
        },
        options:{
            legend:{
                display: false,
                position:'top'
            },
            hover: {
                mode: 'nearest',
                intersect: false,
                axis: 'x',
                animationDuration: 400
            },
            tooltips:{
                enabled:true,
                mode: 'index',
                intersect: false
            },
            scales: {
                yAxes: [{
                    ticks: {
                        fontColor: "black",
                        fontFamily: "Arial"
                    },
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: indep_header,
                        fontColor: "black",
                        fontStyle: "bold",
                        fontFamily: "Arial"
                    }
                }],
                xAxes: [{
                    ticks: {
                        beginAtZero: true,
                        fontColor: "black",
                        fontFamily: "Arial",
                        maxTicksLimit: 20
                    },
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: dep_header,
                        fontColor: "black",
                        fontStyle: "bold",
                        fontFamily: "Arial"
                    }
                }]
            }
        }
    });
}

export function createBarChart(json_data,reference,chart_props) {
    let csv_data = JSON.parse(json_data).data;

    var indep_header = csv_data[0][1];  // Get the independent variable header
    var dep_header = csv_data[0][0];    // Get the dependent variable header
    var label_arr = [];
    var data_arr = [];

    let i;
    for(i=1;i<csv_data.length;i++){
        if(csv_data[i][0] !== undefined && csv_data[i][1] !== undefined){
            label_arr.push(csv_data[i][0]);
            data_arr.push(csv_data[i][1].replace(/,+/g,'').replace(/['"]+/g, ''));
        }
    }
    if(chart_props === undefined){
        chart_props = {pointBackgroundColor: '#2469FF', borderColor: '#777', backgroundColor: '#2469FF'}
    }

    return new Chart(reference, {
        type: 'bar', // bar, horizontalBar, pie, line, doughnut, radar, polarArea
        data:{
            labels: label_arr,
            datasets:[{
                data: data_arr,
                pointBackgroundColor: chart_props.pointBackgroundColor,
                borderColor:chart_props.borderColor,
                backgroundColor: chart_props.backgroundColor
            }]
        },
        options:{
            legend:{
                display: false,
                position:'top'
            },
            hover: {
                mode: 'nearest',
                intersect: false,
                axis: 'x',
                animationDuration: 400
            },
            tooltips:{
                enabled:true,
                mode: 'index',
                intersect: false
            },
            scales: {
                yAxes: [{
                    ticks: {
                        fontColor: "black",
                        fontFamily: "Arial"
                    },
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: indep_header,
                        fontColor: "black",
                        fontStyle: "bold",
                        fontFamily: "Arial"
                    }
                }],
                xAxes: [{
                    ticks: {
                        beginAtZero: true,
                        fontColor: "black",
                        fontFamily: "Arial",
                        maxTicksLimit: 20
                    },
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: dep_header,
                        fontColor: "black",
                        fontStyle: "bold",
                        fontFamily: "Arial"
                    }
                }]
            }
        }
    });
}

export function createHorizontalBarChart(json_data,reference) {
    let csv_data = JSON.parse(json_data).data;

    var indep_header = csv_data[0][1];  // Get the independent variable header
    var dep_header = csv_data[0][0];    // Get the dependent variable header
    var label_arr = [];
    var data_arr = [];

    let i;
    for(i=1;i<csv_data.length;i++){
        if(csv_data[i][0] !== undefined && csv_data[i][1] !== undefined){
            label_arr.push(csv_data[i][0]);
            data_arr.push(csv_data[i][1].replace(/,+/g,'').replace(/['"]+/g, ''));
        }
    }

    return new Chart(reference, {
        type: 'horizontalBar', // bar, horizontalBar, pie, line, doughnut, radar, polarArea
        data:{
            labels: label_arr,
            datasets:[{
                data: data_arr,
                pointBackgroundColor: "#ffb600",
                borderColor:'#777',
                backgroundColor: '#2469FF'
            }]
        },
        options:{
            legend:{
                display: false,
                position:'top'
            },
            hover: {
                mode: 'nearest',
                intersect: false,
                axis: 'x',
                animationDuration: 400
            },
            tooltips:{
                enabled:true,
                mode: 'index',
                intersect: false
            },
            scales: {
                yAxes: [{
                    ticks: {
                        fontColor: "black",
                        fontFamily: "Arial"
                    },
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: dep_header,
                        fontColor: "black",
                        fontStyle: "bold",
                        fontFamily: "Arial"
                    }
                }],
                xAxes: [{
                    ticks: {
                        beginAtZero: true,
                        fontColor: "black",
                        fontFamily: "Arial"
                    },
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: indep_header,
                        fontColor: "black",
                        fontStyle: "bold",
                        fontFamily: "Arial"
                    }
                }]
            }
        }
    });
}

export function createPieChart(json_data,reference) {
    let csv_data = JSON.parse(json_data).data;

    // var indep_header = csv_data[0][1];  // Get the independent variable header
    // var dep_header = csv_data[0][0];    // Get the dependent variable header
    var label_arr = [];
    var data_arr = [];

    let i;
    for(i=1;i<csv_data.length;i++){
        if(csv_data[i][0] !== undefined && csv_data[i][1] !== undefined){
            label_arr.push(csv_data[i][0]);
            data_arr.push(csv_data[i][1].replace(/,+/g,'').replace(/['"]+/g, ''));
        }
    }

    return new Chart(reference, {
        type: 'pie', // bar, horizontalBar, pie, line, doughnut, radar, polarArea
        data:{
            labels: label_arr,
            datasets:[{
                data: data_arr,
                pointBackgroundColor: "#ffb600",
                borderColor:'#777',
                backgroundColor: [
                    'Red',
                    'Yellow',
                    'Orange',
                    'Green',
                    'Blue',
                    'Purple'
                ]
            }]
        },
        options:{
            legend:{
                display: true,
                position:'top'
            },
            hover: {
                mode: 'nearest',
                intersect: false,
                axis: 'x',
                animationDuration: 400
            },
            tooltips:{
                enabled:true,
                mode: 'index',
                intersect: false
            },
            labels: [
                'Red',
                'Yellow',
                'Orange',
                'Green',
                'Blue',
                'Purple'
            ]
        }
    });
}