import React from 'react'
import Papa from 'papaparse'

import {createBarChart} from '../charts/CreateChart'
import canada_employment_timeline_data from '../../assets/canada-employment-timeline-data.csv'
import canada_unemployment_timeline_data from '../../assets/canada-unemployment-timeline-data.csv'

const CanadaEmploymentData = (props) => {
    const chartRef = React.createRef();

    async function GetData() {
        const csv0 = await Papa.parse(await fetchCsv(canada_employment_timeline_data));
        const data0 = await JSON.stringify(csv0);
        const chart0 = await document.querySelector('#canada_employment_timeline_data').getContext('2d');
        await createBarChart(data0,chart0);

        const csv1 = await Papa.parse(await fetchCsv(canada_unemployment_timeline_data));
        const data1 = await JSON.stringify(csv1);
        const chart1 = await document.querySelector('#canada_unemployment_timeline_data').getContext('2d');
        await createBarChart(data1,chart1);
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
            <div className="chart-wrapper">
                <div className="heading-wrapper">
                    <h3>Canada Timeline of Employment Rate</h3>
                </div>
                <canvas id="canada_employment_timeline_data" ref={chartRef}></canvas>
                <p>
                    Employment rate is a percentage of number of employed to the population 15 years of age and over. Employment includes both full-time and part-time employment. Data type is seasonally adjusted.
                </p>
            </div>
            <div className="chart-wrapper">
                <div className="heading-wrapper">
                    <h3>Canada Timeline of Unemployment Rate</h3>
                </div>
                <canvas id="canada_unemployment_timeline_data" ref={chartRef}></canvas>
                <p>
                    Unemployment rate is a percentage of number of unemployed to the population 15 years of age and over. Data type is seasonally adjusted.
                </p>
            </div>
            <div className="description-wrapper">
                <p>
                    {props.data.description}
                </p>
                <p>
                    Last updated: {props.data.last_updated}
                </p>
                <a href={props.data.source} rel="noreferrer" target="_blank">source</a>
            </div>
        </div>
    )
}

export default CanadaEmploymentData
