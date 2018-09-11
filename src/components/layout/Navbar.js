import React, { Component } from 'react'
import Logo from '../../assets/logo.png'
import { NavLink } from 'react-router-dom'
import firebase from 'firebase/app'
import 'firebase/auth'
import { doSignOut } from '../../firebase/auth'
import AuthPage from './AuthPage'
import { PrivateNavigation, PublicNavigation } from './Navigation'
import Modal from 'react-responsive-modal';


class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light navbar-custom fixed-top">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <NavLink className="nav-item nav-link" to='/home' activeClassName='activeNav'>
                    <img src={Logo} width="200px" alt="" />
                </NavLink>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                        <NavLink className="nav-item nav-link" to='/catalog' activeClassName='activeNav'>Catalog</NavLink>
                        <NavLink className="nav-item nav-link" to='/features' activeClassName='activeNav'>Features</NavLink>
                        <NavLink className="nav-item nav-link" to='/prices' activeClassName='activeNav'>Prices & conditions</NavLink>
                        <NavLink className="nav-item nav-link" to='/contact' activeClassName='activeNav'>Contact</NavLink>
                        <NavLink className="nav-item nav-link" to='/languages' activeClassName='activeNav'>FR</NavLink>
                    </ul>
                </div>
            </nav>
        )
    }
}

export default Home

