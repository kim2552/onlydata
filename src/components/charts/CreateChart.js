import Chart from 'chart.js';

/*** Create Chart and Content */
export function createLineChart(json_data,reference) {
    let csv_data = JSON.parse(json_data).data;

    var indep_header = csv_data[0][1];  // Get the independent variable header (i.e. Number of cases)
    var dep_header = csv_data[0][0];    // Get the dependent variable header    (i.e. Date)
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
        type: 'line', // bar, horizontalBar, pie, line, doughnut, radar, polarArea
        data:{
            labels: label_arr,
            datasets:[{
                data: data_arr,
                pointBackgroundColor: "#ffb600",
                borderColor:'#777'
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
                    },
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: indep_header,
                    }
                }],
                xAxes: [{
                    ticks: {
                        beginAtZero: true,
                    },
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: dep_header,
                    }
                }]
            }
        }
    });
}

export function createBarChart(json_data,reference) {
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
                borderColor:'#777'
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
                    },
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: dep_header,
                    }
                }],
                xAxes: [{
                    ticks: {
                        beginAtZero: true,
                    },
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: indep_header,
                    }
                }]
            }
        }
    });
}