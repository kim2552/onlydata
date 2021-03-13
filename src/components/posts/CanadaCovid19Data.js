import React from 'react'
import Papa from 'papaparse'

import {createLineChart,createBarChart} from '../charts/CreateChart'
import canada_total_per_day_data from '../../data/canada-covid-19-data-per-day.csv'
import province_total_current_data from '../../data/province-covid-19-data-total.csv'

const CanadaCovid19Data = (props) => {
    const chartRef = React.createRef();

    async function GetData(csv_data,chart_id) {
        const csv1 = await Papa.parse(await fetchCsv(canada_total_per_day_data));
        const data1 = await JSON.stringify(csv1);
        const chart1 = await document.querySelector('#canada_total_per_day_data').getContext('2d');
        await createLineChart(data1,chart1,'line');

        const csv2 = await Papa.parse(await fetchCsv(province_total_current_data));
        const data2 = await JSON.stringify(csv2);
        const chart2 = await document.querySelector('#province_total_current_data').getContext('2d');
        await createBarChart(data2,chart2,'bar');
    }

    async function fetchCsv(csv_data) {
        const response = await fetch(csv_data);
        const reader = response.body.getReader();
        const result = await reader.read();
        const decoder = new TextDecoder('utf-8');
        const csv = await decoder.decode(result.value);
        return csv;
    }
    GetData();

    return (
        <div className="chart-container">
            <div className="title-wrapper">
                <h1>{props.data.title}</h1>
            </div>
            <div className="heading-wrapper">
                <h3>Total Number of Confirmed Covid-19 Cases per Day</h3>
            </div>
            <div className="chart-wrapper">
                <canvas id="canada_total_per_day_data" ref={chartRef}></canvas>
            </div>
            <div className="description-wrapper">
                <p>
                    {props.data.description}
                </p>
            </div>
            <div className="heading-wrapper">
                <h3>Current Total Number of Confirmed Covid-19 Cases by Province</h3>
            </div>
            <div className="chart-wrapper">
                <canvas id="province_total_current_data" ref={chartRef}></canvas>
            </div>
        </div>
    )
}

export default CanadaCovid19Data
