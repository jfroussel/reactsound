import React from 'react'

import 'firebase/auth'
import { auth } from '../../firebase'


const PublicNavigation = () =>
    <div className="navbar-nav">
        <a className="nav-item nav-link nav-item-hover text-uppercase  ml-3" href="catalog">Catalog</a>
        <a className="nav-item nav-link nav-item-hover text-uppercase ml-3" href="projects">Projects</a>
        <a className="nav-item nav-link nav-item-hover text-uppercase ml-3" href="features">Features</a>
        <a className="nav-item nav-link nav-item-hover text-uppercase ml-3" href="about">About</a>
        <a className="nav-item nav-link nav-item-hover text-uppercase ml-3" href="contact">Contact</a>
        <a className="nav-item nav-link nav-item-hover text-uppercase ml-3" href="language">FR</a>
    </div>


const PrivateNavigation = () =>
    <div className="navbar-nav">
    <a className="nav-item nav-link nav-item-hover text-uppercase  ml-3" href="#catalog">Catalog</a>
        <a className="nav-item nav-link nav-item-hover text-uppercase ml-3" href="#projects">Projects</a>
        <a className="nav-item nav-link nav-item-hover text-uppercase ml-3" href="#features">Features</a>
        <a className="nav-item nav-link nav-item-hover text-uppercase ml-3" href="#about">About</a>
        <a className="nav-item nav-link nav-item-hover text-uppercase ml-3" href="#contact">Contact</a>
        <a className="nav-item nav-link nav-item-hover text-uppercase ml-3" href="#language">FR</a>
        <a className="nav-item nav-link"> <em>you are now connected </em><span className="text-info">  {auth.currentUser().displayName ? auth.currentUser().displayName : auth.currentUser().email }</span></a>
    </div>

export {
    PrivateNavigation,
    PublicNavigation
}
