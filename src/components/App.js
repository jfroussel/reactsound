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

const App = () => (
    <Router>
        <div className="mt-5">
            <Navbar />
            <Route path='/home' component={Home} />
            <Route path='/catalog' component={Catalog} />
            <Route path='/features' component={Features} />
            <Route path='/prices' component={Prices} />
            <Route path='/contact' component={Contact} />
            <Route path='/signin' component={Signin} />
        </div>
    </Router>
);

export default App;