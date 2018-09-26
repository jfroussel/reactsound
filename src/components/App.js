import React from 'react'
import './App.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Home from './layout/Home'
import Catalog from '../containers/Catalog'
import Features from './layout/Features'
import Prices from './layout/Prices'
import Contact from './layout/Contact'
import Signin from './layout/AuthPage'
import Navbar from './layout/Navbar'
import Footer from './layout/Footer'
import Projects from './projects'
import ProjectDetail from './projects/detailProject'
import NotRegister from './Messages/NotRegister'

const style = {
    container : {
        paddingTop: '5rem'
    }
}

const App = () => (
    <Router>
        <div style={style.container}>
            <Navbar />
            <Route exact path="/" component={Home} />
            <Route path='/home' component={Home} />
            <Route path='/catalog' component={Catalog} />
            <Route path='/features' component={Features} />
            <Route path='/prices' component={Prices} />
            <Route path='/contact' component={Contact} />
            <Route path='/signin' component={Signin} />
            <Route path='/projects' component={Projects} />
            <Route path='/project/:id' component={ProjectDetail} />
            <Route path='/notRegister' component={NotRegister} />
            <Footer />
        </div>
    </Router>
);

export default App;