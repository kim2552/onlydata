import React from 'react'
import Papa from 'papaparse'

import {createLineChart,createBarChart,createHorizontalBarChart} from '../charts/CreateChart'
import canada_total_data from '../../data/canada-covid-19-data-total.csv'
import canada_total_per_day_data from '../../data/canada-covid-19-data-per-day.csv'
import province_total_current_data from '../../data/province-covid-19-data-by-province.csv'
import province_active_current_data from '../../data/province-covid-19-active-data-by-province.csv'

const CanadaCovid19Data = (props) => {
    const chartRef = React.createRef();

    async function GetData() {
        const csv0 = await Papa.parse(await fetchCsv(canada_total_per_day_data));
        const data0 = await JSON.stringify(csv0);
        const chart0 = await document.querySelector('#canada_total_per_day_data').getContext('2d');
        await createBarChart(data0,chart0);

        const csv1 = await Papa.parse(await fetchCsv(canada_total_data));
        const data1 = await JSON.stringify(csv1);
        const chart1 = await document.querySelector('#canada_total_data').getContext('2d');
        await createLineChart(data1,chart1);

        const csv2 = await Papa.parse(await fetchCsv(province_total_current_data));
        const data2 = await JSON.stringify(csv2);
        const chart2 = await document.querySelector('#province_total_current_data').getContext('2d');
        await createHorizontalBarChart(data2,chart2);

        const csv3 = await Papa.parse(await fetchCsv(province_active_current_data));
        const data3 = await JSON.stringify(csv3);
        const chart3 = await document.querySelector('#province_active_current_data').getContext('2d');
        await createHorizontalBarChart(data3,chart3);
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
            <div className="title-wrapper" style={{marginBottom: "5rem"}}>
                <h1>{props.data.title}</h1>
            </div>
            <div className="heading-wrapper">
                <h3>Total Number of Confirmed Covid-19 Cases per Day</h3>
            </div>
            <div className="chart-wrapper">
                <canvas id="canada_total_per_day_data" ref={chartRef}></canvas>
            </div>
            <div className="heading-wrapper">
                <h3>Total Number of Confirmed Covid-19 Cases Since The Beginning</h3>
            </div>
            <div className="chart-wrapper">
                <canvas id="canada_total_data" ref={chartRef}></canvas>
            </div>
            <div className="heading-wrapper">
                <h3>Current Total Number of Confirmed Covid-19 Cases by Province</h3>
            </div>
            <div className="chart-wrapper">
                <canvas id="province_total_current_data" ref={chartRef}></canvas>
            </div>
            <div className="heading-wrapper">
                <h3>Current Active Covid-19 Cases by Province</h3>
            </div>
            <div className="chart-wrapper">
                <canvas id="province_active_current_data" ref={chartRef}></canvas>
            </div>
            <div className="description-wrapper">
                <p>
                    {props.data.description}
                </p>
                <a href={props.data.source} rel="noreferrer" target="_blank">source</a>
            </div>
        </div>
    )
}

export default CanadaCovid19Data
