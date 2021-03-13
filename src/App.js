import './scss/app.scss';

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import About from './components/About';

import CanadaCovid19Data from './components/posts/CanadaCovid19Data'

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
            <Route path="/about">
              <About></About>
            </Route>
            <Route path="/canada-covid-19-data">
              <CanadaCovid19Data data={getJSONData("canada-covid-19-data")}></CanadaCovid19Data>
            </Route>
            <Route path="/">
              <Home posts={posts}></Home>
            </Route>
          </Switch>
        </div>
        <Footer></Footer>
      </Router>
    </div>
  );
}

export default App;
