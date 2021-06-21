import React, { Component } from 'react'
import Papa from 'papaparse'
import * as d3 from 'd3'
import {feature} from 'topojson'

import vacc_total_data from '../../assets/canada-covid-19-vaccination-totals.csv'

import {CanadaMap} from '../charts/CanadaMap'
const topoJsonUrl = 'https://gist.githubusercontent.com/Brideau/2391df60938462571ca9/raw/f5a1f3b47ff671eaf2fb7e7b798bacfc6962606a/canadaprovtopo.json'

export class CanadaCovid19VaccineData extends Component {
    constructor(props){
        super(props);
        this.chart_props = {pointBackgroundColor: "#fff", borderColor: '#fff', backgroundColor: "#2469FF"}
        this.state = {current_date: "2020-01-01", topoData: null, vaccData: null};
        this.chartRef = React.createRef();
        this.current_pt_chart = null;
    }

    useData = (jsonUrl) => {
        d3.json(jsonUrl).then(topojsondata => {
            const {canadaprov} = topojsondata.objects
            this.setState({topoData: {
                provinces: feature(topojsondata, canadaprov),
            }})
        })
    }

    formatDate(string){
        var dateString = new Date(string).toUTCString();
        dateString = dateString.split(' ').slice(0, 4).join(' ');
        return dateString;
    }

    async GetVacData(){
        const csv0 = await Papa.parse(await this.fetchCsv(vacc_total_data));

        this.setState({
            vaccData: csv0
        });
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
        this.GetVacData();
        this.useData(topoJsonUrl);
    }

    loadMap(){
        if(this.state.topoData == null || this.state.vaccData == null){
            return(<h1 style={{textAlign: "center"}}>Loading...</h1>)
        }else{
            return(
                <div className="chart-wrapper">
                    <div className="heading-wrapper">
                    <h3>Total Number of Administered Covid-19 Vaccine Doses [{this.state.vaccData.data[1][2]}]</h3>
                    </div>
                    <CanadaMap
                    data={this.state.topoData}
                    vaccData={this.state.vaccData}
                    ></CanadaMap>
                </div>
            )
        }
    }

    render() {
        return (
        <div className="chart-container">
            <div className="title-wrapper" style={{marginBottom: "5rem"}}>
                <h1>{this.props.data.title}</h1>
            </div>
            {
                this.loadMap()
            }
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

export default CanadaCovid19VaccineData
