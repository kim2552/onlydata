import React, { Component } from 'react'
import Papa from 'papaparse'

import {createLineChart,createBarChart,createHorizontalBarChart} from '../charts/CreateChart'
import canada_total_data from '../../assets/canada-covid-19-data-total.csv'
import canada_total_per_day_data from '../../assets/canada-covid-19-data-per-day.csv'
import province_total_current_data from '../../assets/province-covid-19-data-by-province.csv'
import province_active_current_data from '../../assets/province-covid-19-active-data-by-province.csv'

export class TestPost extends Component {
    constructor(props){
        super(props);
        this.state = {current_date: "2020-01-01", cases_today_canada: 0};
        this.chartRef = React.createRef();
    }

    formatDate(string){
        var dateString = new Date(string).toUTCString();
        dateString = dateString.split(' ').slice(0, 4).join(' ');
        return dateString;
    }

    async GetData() {
        const csv0 = await Papa.parse(await this.fetchCsv(canada_total_per_day_data));
        const data0 = await JSON.stringify(csv0);
        const chart0 = await document.querySelector('#canada_total_per_day_data').getContext('2d');
        await createBarChart(data0,chart0);

        this.setState({
            current_date: this.formatDate(csv0.data[csv0.data.length-2][0]),
            cases_today_canada: csv0.data[csv0.data.length-2][1]
        });

        const csv1 = await Papa.parse(await this.fetchCsv(canada_total_data));
        const data1 = await JSON.stringify(csv1);
        const chart1 = await document.querySelector('#canada_total_data').getContext('2d');
        await createLineChart(data1,chart1);

        const csv2 = await Papa.parse(await this.fetchCsv(province_total_current_data));
        const data2 = await JSON.stringify(csv2);
        const chart2 = await document.querySelector('#province_total_current_data').getContext('2d');
        await createHorizontalBarChart(data2,chart2);

        const csv3 = await Papa.parse(await this.fetchCsv(province_active_current_data));
        const data3 = await JSON.stringify(csv3);
        const chart3 = await document.querySelector('#province_active_current_data').getContext('2d');
        await createHorizontalBarChart(data3,chart3);
    }

    async fetchCsv(csv_data) {
        const response = await fetch(csv_data);
        const reader = response.body.getReader();
        const result = await reader.read();
        const decoder = new TextDecoder('utf-8');
        const csv = await decoder.decode(result.value);
        return csv;
    }

    componentDidMount(){
        this.GetData();
    }

    render() {
        return (
        <div className="chart-container">
            <div className="title-wrapper" style={{marginBottom: "5rem"}}>
                <h1>{this.props.data.title}</h1>
            </div>
            <div className="heading-wrapper">
                <h2>
                    Cases Today{" ("+this.state.current_date+")"}
                    {": "}
                    {this.state.cases_today_canada}
                </h2>
            </div>
            <div className="chart-wrapper">
                <div className="heading-wrapper">
                    <h3>Daily Number of Confirmed Covid-19 Cases</h3>
                </div>
                <canvas id="canada_total_per_day_data" ref={this.chartRef}></canvas>
            </div>
            <div className="chart-wrapper">
                <div className="heading-wrapper">
                    <h3>Total Number of Confirmed Covid-19 Cases Since The Beginning</h3>
                </div>
                <canvas id="canada_total_data" ref={this.chartRef}></canvas>
            </div>
            <div className="chart-wrapper">
                <div className="heading-wrapper">
                    <h3>Current Total Number of Confirmed Covid-19 Cases by Province/Territory</h3>
                </div>
                <canvas id="province_total_current_data" ref={this.chartRef}></canvas>
            </div>
            <div className="chart-wrapper">
                <div className="heading-wrapper">
                    <h3>Current Active Covid-19 Cases by Province/Territory</h3>
                </div>
                <canvas id="province_active_current_data" ref={this.chartRef}></canvas>
            </div>
            <div className="description-wrapper">
                <p>
                    {this.props.data.description}
                </p>
                <p>
                    Last updated: {this.props.data.last_updated}
                </p>
                <a href={this.props.data.source} rel="noreferrer" target="_blank">source</a>
            </div>
        </div>
        )
    }
}

export default TestPost
