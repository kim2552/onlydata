import React, { Component } from 'react'
import Papa from 'papaparse'

import {createBarChart} from '../charts/CreateChart'
import canada_total_per_day_data from '../../assets/canada-covid-19-data-per-day.csv'
import ab_total_per_day_data from '../../assets/alberta-covid-19-data-per-day.csv'
import bc_total_per_day_data from '../../assets/british columbia-covid-19-data-per-day.csv'
import mb_total_per_day_data from '../../assets/manitoba-covid-19-data-per-day.csv'
import nb_total_per_day_data from '../../assets/new brunswick-covid-19-data-per-day.csv'
import nl_total_per_day_data from '../../assets/newfoundland and labrador-covid-19-data-per-day.csv'
import nt_total_per_day_data from '../../assets/northwest territories-covid-19-data-per-day.csv'
import ns_total_per_day_data from '../../assets/nova scotia-covid-19-data-per-day.csv'
import nu_total_per_day_data from '../../assets/nunavut-covid-19-data-per-day.csv'
import on_total_per_day_data from '../../assets/ontario-covid-19-data-per-day.csv'
import pe_total_per_day_data from '../../assets/prince edward island-covid-19-data-per-day.csv'
import qc_total_per_day_data from '../../assets/quebec-covid-19-data-per-day.csv'
import sk_total_per_day_data from '../../assets/saskatchewan-covid-19-data-per-day.csv'
import yt_total_per_day_data from '../../assets/yukon-covid-19-data-per-day.csv'

export class TestPost extends Component {
    constructor(props){
        super(props);
        this.chart_props = {pointBackgroundColor: "#fff", borderColor: '#fff', backgroundColor: "#2469FF"}
        this.state = {current_date: "2020-01-01", cases_today_canada: 0, pt_selected: "ON", cases_today_pt: 0};
        this.chartRef = React.createRef();
        this.province_territory = [{SN:"ON", data:on_total_per_day_data, name:"Ontario"},
                                    {SN:"QC", data:qc_total_per_day_data, name:"Quebec"},
                                    {SN:"NS", data:ns_total_per_day_data, name:"Nova Scotia"},
                                    {SN:"NB", data:nb_total_per_day_data, name:"New Brunswick"},
                                    {SN:"MB", data:mb_total_per_day_data, name:"Manitoba"},
                                    {SN:"BC", data:bc_total_per_day_data, name:"British Columbia"},
                                    {SN:"PE", data:pe_total_per_day_data, name:"Prince Edward Island"},
                                    {SN:"SK", data:sk_total_per_day_data, name:"Saskatchewan"},
                                    {SN:"AB", data:ab_total_per_day_data, name:"Alberta"},
                                    {SN:"NL", data:nl_total_per_day_data, name:"Newfoundland and Labrador"},
                                    {SN:"NT", data:nt_total_per_day_data, name:"Northwest Territories"},
                                    {SN:"YT", data:yt_total_per_day_data, name:"Yukon"},
                                    {SN:"NU", data:nu_total_per_day_data, name:"Nunavut"}];
        this.current_pt_chart = null;
    }

    formatDate(string){
        var dateString = new Date(string).toUTCString();
        dateString = dateString.split(' ').slice(0, 4).join(' ');
        return dateString;
    }

    async GetCanadaData() {
        const csv0 = await Papa.parse(await this.fetchCsv(canada_total_per_day_data));
        const data0 = await JSON.stringify(csv0);
        const chart0 = await document.querySelector('#canada_total_per_day_data').getContext('2d');
        await createBarChart(data0,chart0,this.chart_props);

        this.setState({
            current_date: this.formatDate(csv0.data[csv0.data.length-2][0]),
            cases_today_canada: csv0.data[csv0.data.length-2][1]
        });
    }

    async GetPTData(shortname) { // Data for Provinces and Territories
        if(this.current_pt_chart != null){  // If chart already exists, destroy it!
            this.current_pt_chart.destroy();
        }

        var result = this.province_territory.find( obj => {
            return obj["SN"] === shortname;
        });
        const csv = await Papa.parse(await this.fetchCsv(result["data"]));
        const data = await JSON.stringify(csv);
        const chart = await document.querySelector('#pt_total_per_day_data').getContext('2d');
        this.current_pt_chart = createBarChart(data,chart,this.chart_props);

        this.setState({
            pt_selected: result["name"],
            cases_today_pt: csv.data[csv.data.length-2][1]});
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
        this.GetCanadaData();
        this.GetPTData(this.state.pt_selected);
    }

    render() {
        return (
        <div className="chart-container">
            <div className="title-wrapper" style={{marginBottom: "5rem"}}>
                <h1>{this.props.data.title}</h1>
            </div>
            <div className="chart-wrapper">
                <div className="heading-wrapper">
                    <h2>
                        Cases Today{" ("+this.state.current_date+")"}
                        {": "}
                        {this.state.cases_today_canada}
                    </h2>
                </div>
                <div className="heading-wrapper">
                    <h3>Daily Number of Confirmed Covid-19 Cases Canada</h3>
                </div>
                <canvas id="canada_total_per_day_data" ref={this.chartRef}></canvas>
            </div>
            <div className="chart-wrapper">
            <div className="heading-wrapper">
                <h2>
                    Cases Today{" ("+this.state.current_date+")"}
                    {": "}
                    {this.state.cases_today_pt}
                </h2>
            </div>
            <div className="heading-wrapper">
                <h3>Daily Number of Confirmed Covid-19 Cases {this.state.pt_selected}</h3>
            </div>
            <div className="carousel">
                <ul>
                {this.province_territory.map((element,index)=>(
                    <li key={index} onClick={()=>this.GetPTData(element["SN"])} onMouseOver={()=>this.GetPTData(element["SN"])}>{element["SN"]}</li>
                ))}
                </ul>
            </div>
            <canvas id="pt_total_per_day_data" ref={this.chartRef}></canvas>
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
