import React from 'react'

import {geoPath, geoTransverseMercator} from 'd3-geo'

export const CanadaMap = ({ data:{provinces}, valData}) => {
    const svgWidth=800
    const svgHeight=720
    const fixedTranslate={x: svgWidth/2-100, y: svgHeight/2+280}

    const labelScaleColor = ["#C8DEB1","#C7C8A0","#C6B18F","#C59A7E","#C3846D","#C26D5C","#C1564B","#C0403A","#BF2929"]
    const labelScaleValue = [0, 10000, 50000, 100000, 500000, 1000000, 5000000, 10000000, 20000000]

    const provinceTextPosition={
        "CA-MB": {x: 284.2564, y: 420.6969, text: "Manitoba", width: 95},
        "CA-SK": {x: 220.2564, y: 420.6969, text: "Saskatchewan", width: 120},
        "CA-AB": {x: 150.9233, y: 400.6482, text: "Alberta", width: 90},
        "CA-BC": {x: 75.3623, y: 366.3645, text: "British Columbia", width: 140},
        "CA-NU": {x: 280.1675, y: 269.3562, text: "Nunavut", width: 85},
        "CA-NT": {x: 150.1341, y: 265.2254, text: "Northwest Territories", width: 165},
        "CA-YT": {x: 56.6342, y: 225.7942, text: "Yukon", width: 75},
        "CA-ON": {x: 368.1643, y: 482.6332, text: "Ontario", width: 100},
        "CA-QC": {x: 490.6442, y: 440.1365, text: "Quebec", width: 95},
        "CA-NB": {x: 582.8475, y: 482.2855, text: "New Brunswick", width: 130},
        "CA-NS": {x: 625.2857, y: 487.5427, text: "Nova Scotia", width: 105},
        "CA-NL": {x: 517.4923, y: 373.5523, text: "Newfoundland and Labrador", width: 210},
        "CA-PE": {x: 561.2455, y: 454.2324, text: "Prince Edward Island", width: 165}
    }

    let regionCases={
        "CA-MB": {number: 0, text: "MB", fullname: "Manitoba"},
        "CA-SK": {number: 0, text: "SK", fullname: "Saskatchewan"},
        "CA-AB": {number: 0, text: "AB", fullname: "Alberta"},
        "CA-BC": {number: 0, text: "BC", fullname: "British Columbia"},
        "CA-NU": {number: 0, text: "NU", fullname: "Nunavut"},
        "CA-NT": {number: 0, text: "NT", fullname: "Northwest Territories"},
        "CA-YT": {number: 0, text: "YT", fullname: "Yukon"},
        "CA-ON": {number: 0, text: "ON", fullname: "Ontario"},
        "CA-QC": {number: 0, text: "QC", fullname: "Quebec"},
        "CA-NB": {number: 0, text: "NB", fullname: "New Brunswick"},
        "CA-NS": {number: 0, text: "NS", fullname: "Nova Scotia"},
        "CA-NL": {number: 0, text: "NL", fullname: "Newfoundland and Labrador"},
        "CA-PE": {number: 0, text: "PE", fullname: "Prince Edward Island"},
        "CA": {number: 0, text: "CA", fullname: "Canada"}
    }

    const fillValData = (dat) => {
        Object.entries(regionCases).map( (el) => {
            dat.data.forEach(element => {
                if(element[0] === el[1].fullname){
                    el[1].number = element[1]
                }
            });
            return 0
        })
    }
    fillValData(valData)

    const mapValueColorMapping = (num) => {
        for(let i=labelScaleColor.length-1; i>=0; i--){
            if(num >= labelScaleValue[i]){
                return labelScaleColor[i]
            }
        }
        return labelScaleColor[0]
    }
    
    const projection = geoTransverseMercator()
    .scale(800)
    .translate([fixedTranslate.x, fixedTranslate.y])
    .rotate([96, 0])
    .center([-0.6, 38.7])
  
    const path = geoPath(projection)
    const mouseHover = (event,key,feature) => {
        const regionPathElement = document.getElementById('region_path_'+key)
        const regionElement = document.getElementById('region_'+key)
        regionPathElement.classList.add('interactive')
        regionElement.classList.remove('hide')
    }
    const mouseOut = (event,key) => {
        const regionPathElement = document.getElementById('region_path_'+key)
        const regionElement = document.getElementById('region_'+key)
        regionPathElement.classList.remove('interactive')
        regionElement.classList.add('hide')
    }

    return (
        <div>
            <div className="heading-wrapper">
                <h3>Canada Total Population: {regionCases["CA"].number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h3>
            </div>
            <svg
            id="svg"
            width="100%"
            preserveAspectRatio="xMinYMin meet"
            viewBox="0 0 730 650"
            style={{border:"0", borderStyle: "solid", borderColor: "black"}}
            >
                <g className="marks">
                    {
                        provinces.features.map((feature,i) => {
                            return(
                            <g 
                            className="province-group"
                            key={i}
                            onMouseOver={(event)=>mouseHover(event,i,feature)}
                            onMouseOut={(event)=>mouseOut(event,i)}
                            >
                                <path
                                fill={mapValueColorMapping(regionCases[feature.id].number)}
                                stroke="black"
                                className="provinces"
                                id={"region_path_"+i}
                                d={path(feature)}
                                ></path>
                            </g>
                            )
                        })
                    }
                    {
                        provinces.features.map((feature,i) => {
                            return(
                            <g
                            key={i}
                            className="regionValues hide"
                            id={"region_"+i}
                            onMouseOver={(event)=>mouseHover(event,i,feature)}
                            onMouseOut={(event)=>mouseOut(event,i)}
                            >
                                <rect
                                fill="black"
                                width={provinceTextPosition[feature.id].width}
                                height="50"
                                rx="10" ry="10"
                                transform={`translate(${provinceTextPosition[feature.id].x-15},${provinceTextPosition[feature.id].y-17})`}/>
                                <text
                                fill="white"
                                opacity="1"
                                transform={`translate(${provinceTextPosition[feature.id].x},${provinceTextPosition[feature.id].y})`}
                                >
                                    <tspan>
                                        {provinceTextPosition[feature.id].text}
                                    </tspan>
                                    <tspan x="0" y="1.5rem">
                                        {regionCases[feature.id].number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                    </tspan>
                                </text>
                            </g>
                            )
                        })
                    }
                </g>
                <g>
                    {
                        labelScaleValue.map((val,idx) => {
                            return(
                            <g key={idx}>
                            <text
                            transform={`translate(${75*(idx)},640)`}
                            fontSize={`0.75rem`}
                            >{val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</text>
                            <rect
                            fill={labelScaleColor[idx]}
                            width="100"
                            height="25"
                            transform={`translate(${75*(idx)},600)`}
                            ></rect>
                            </g>
                            )
                        })
                    }
                </g>
            </svg>
        </div>
    )
}
