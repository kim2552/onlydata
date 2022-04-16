import React, { Component } from 'react'
import Papa from 'papaparse'
import * as d3 from 'd3'
import {feature} from 'topojson'

import population_total_data from '../../assets/canada-population-data.csv'

import {CanadaMap} from '../charts/CanadaMap'
const topoJsonUrl = 'https://gist.githubusercontent.com/Brideau/2391df60938462571ca9/raw/f5a1f3b47ff671eaf2fb7e7b798bacfc6962606a/canadaprovtopo.json'
var quarterlyDate=""
export class CanadaPopulationData extends Component {
    constructor(props){
        super(props);
        this.chart_props = {pointBackgroundColor: "#fff", borderColor: '#fff', backgroundColor: "#2469FF"}
        this.state = {current_date: "2020-01-01", topoData: null, valData: null};
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
        const csv0 = await Papa.parse(await this.fetchCsv(population_total_data));

        this.setState({
            valData: csv0
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
        if(this.state.topoData == null || this.state.valData == null){
            return(<h1 style={{textAlign: "center"}}>Loading...</h1>)
        }else{
            quarterlyDate = this.state.valData.data[1][2]
            return(
                <div className="chart-wrapper">
                    <CanadaMap
                    data={this.state.topoData}
                    valData={this.state.valData}
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
                    Last updated: {quarterlyDate}
                </p>
                <a href={this.props.data.source} rel="noreferrer" target="_blank">source</a>
            </div>
        </div>
        )
    }
}

export default CanadaPopulationData
