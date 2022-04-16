import './scss/app.scss';

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/pages/Home';
import About from './components/pages/About';

import posts_data from './assets/posts.json';

function App() {
  const posts = posts_data.posts;
  return (
    <div className="container">
      <Router>
        <Header></Header>
        <div className="content-container">
          <Switch>
            <Route exact path="/about">
              <About></About>
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
