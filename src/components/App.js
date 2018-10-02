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
import Projects from '../containers/Project'
import Playlist from '../containers/Playlist'
import PlaylistDetail from '../containers/detailPlaylist'
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
            <Route exact path='/home' component={Home} />
            <Route exact path='/catalog' component={Catalog} />
            <Route exact path='/features' component={Features} />
            <Route exact path='/prices' component={Prices} />
            <Route exact path='/contact' component={Contact} />
            <Route exact path='/signin' component={Signin} />
            <Route exact path='/projects' component={Projects} />
            <Route exact path='/projects/:id' component={ProjectDetail} />
            <Route exact path='/playlists' component={Playlist} />
            <Route exact path='/playlists/:id' component={PlaylistDetail} />
            <Route path='/notRegister' component={NotRegister} />
            <Footer />
        </div>
    </Router>
);

export default App;