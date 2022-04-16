import React from 'react'
import Papa from 'papaparse'

import {createBarChart} from '../charts/CreateChart'
import canada_tuition_fee_all_data from '../../assets/canada-tuition-fee-all-data.csv'

const CanadaTuitionFeeData = (props) => {
    const chartRef = React.createRef();
    const current_year = props.data.last_updated.split("-")[0];

    async function GetData() {
        const csv0 = await Papa.parse(await fetchCsv(canada_tuition_fee_all_data));
        const data0 = await JSON.stringify(csv0);
        const chart0 = await document.querySelector('#canada_tuition_fee_all_data').getContext('2d');
        await createBarChart(data0,chart0);
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
                    <h3>Canada Tuition for Undergraduate Field of Studies ({current_year-1}/{current_year})</h3>
                </div>
                <canvas id="canada_tuition_fee_all_data" ref={chartRef}></canvas>
                <p>
                    Data does not take into account financial assistance or tax rebates provided to students.
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

export default CanadaTuitionFeeData
