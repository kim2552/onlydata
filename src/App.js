import './scss/app.scss';

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import About from './components/About';

import CanadaCovid19Data from './components/posts/CanadaCovid19Data'
import CanadaEmploymentData from './components/posts/CanadaEmploymentData'

import posts_data from './assets/posts.json';

function App() {
  const posts = posts_data.posts;

  function getJSONData(slug){
    let json_data;
    posts.forEach(element =>{
      if(String(element.slug) === String(slug)){
        json_data = element;
      }
    });
    return json_data;
  }
  return (
    <div className="container">
      <Router>
        <Header></Header>
        <div className="content-container">
          <Switch>
            <Route exact path="/about">
              <About></About>
            </Route>
            <Route exact path="/canada-covid-19-data">
              <CanadaCovid19Data data={getJSONData("canada-covid-19-data")}></CanadaCovid19Data>
            </Route>
            <Route exact path="/canada-employment-data">
              <CanadaEmploymentData data={getJSONData("canada-employment-data")}></CanadaEmploymentData>
            </Route>
            <Route exact path="/">
              <Home posts={posts}></Home>
            </Route>
            <Route path="/">
              <div className="description-container">
                <div style={{textAlign: "center", margin: "auto"}}>
                  <p>
                    Page does not exist.
                  </p>
                </div>
              </div>
            </Route>
          </Switch>
        </div>
        <Footer></Footer>
      </Router>
    </div>
  );
}

export default App;
