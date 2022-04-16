import React from 'react'

import CanadaPopulationData from '../content/CanadaPopulationData';
import CanadaCovid19Data from '../content/CanadaCovid19Data'
import CanadaEmploymentData from '../content/CanadaEmploymentData'

const Home = (props) => {
    function getJSONData(slug){
      let json_data;
      props.posts.forEach(element =>{
        if(String(element.slug) === String(slug)){
          json_data = element;
        }
      });
      return json_data;
    }

    return (
        <div>
            <div className="home-container">
                <CanadaPopulationData data={getJSONData("canada-population-data")}></CanadaPopulationData>
                <CanadaCovid19Data data={getJSONData("canada-covid-19-data")}></CanadaCovid19Data>
                <CanadaEmploymentData data={getJSONData("canada-employment-data")}></CanadaEmploymentData>
            </div>
        </div>
    )
}

export default Home
