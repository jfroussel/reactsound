import React from 'react'
import './App.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Home from './layout/Home'
import Catalog from '../containers/catalog'
import Features from './layout/Features'
import Prices from './layout/Prices'
import Contact from './layout/Contact'
import Team from '../containers/team'
import Cart from '../containers/cart'
import Signin from './layout/AuthPage'
import Navbar from './layout/Navbar'
import Footer from './layout/Footer'
import Projects from '../containers/project'
import Playlist from '../containers/playlist'
import PlaylistDetail from '../containers/playlist/detailPlaylist'
import ProjectDetail from '../containers/project/detailProject'
import Account from '../containers/account'
import HelpCenter from '../containers/helpCenter'
import Documentation from '../containers/documentation'
import Composer from '../containers/composer'
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
            <Route exact path='/cart' component={Cart} />
            <Route exact path='/team' component={Team} />
            <Route exact path='/signin' component={Signin} />
            <Route exact path='/projects' component={Projects} />
            <Route exact path='/projects/:id' component={ProjectDetail} />
            <Route exact path='/playlists' component={Playlist} />
            <Route exact path='/playlists/:id' component={PlaylistDetail} />
            <Route path='/notRegister' component={NotRegister} />
            <Route exact path='/account' component={Account} />
            <Route exact path='/documentation' component={Documentation} />
            <Route exact path='/help-center' component={HelpCenter} />
            <Route exact path='/composer/:id' component={Composer} />
            <Footer />
        </div>
    </Router>
);

export default App;