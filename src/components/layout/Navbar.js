import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { editCart } from '../../actions/cart'
import Logo from '../../assets/logo.png'
import { NavLink } from 'react-router-dom'
import firebase from 'firebase/app'
import 'firebase/auth'
import { auth } from '../../firebase'
import { doSignOut } from '../../firebase/auth'


const style = {
    loginIcon: {
        fontSize: 35,
        marginTop: -6,
    },
    navbar: {
        borderBottom: '1px solid #0000001a',
        backgroundColor: '#fff'
    }
    
}

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLogged: false,
        }
    }

    componentWillMount() {
        firebase.auth().onAuthStateChanged((user) => {
            user ? this.setState({ isLogged: true }) : this.setState({ isLogged: false })
            this.props.editCart(user.uid)
        });
    }

    componentWillReceiveProps() {
        firebase.auth().onAuthStateChanged((user) => {
            user ? this.setState({ isLogged: true }) : this.setState({ isLogged: false })
        })
    }

    render() {
        console.log(this.props)
        const { cart } = this.props

        return (
            <nav className="navbar navbar-expand-lg navbar-light fixed-top" style={style.navbar}>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <NavLink className="nav-item nav-link" to='/home' activeClassName='activeNav'>
                    <img src={Logo} width="200px" alt="" />
                </NavLink>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                    <ul className="navbar-nav mx-auto">
                        <NavLink className="nav-item nav-link text-uppercase" to='/catalog' activeClassName='activeNav'>Catalog</NavLink>
                        <NavLink className="nav-item nav-link text-uppercase" to='/features' activeClassName='activeNav'>Features</NavLink>
                        <NavLink className="nav-item nav-link text-uppercase" to='/prices' activeClassName='activeNav'>Prices & conditions</NavLink>
                        <NavLink className="nav-item nav-link text-uppercase" to='/contact' activeClassName='activeNav'>Contact</NavLink>
                        <NavLink className="nav-item nav-link text-uppercase" to='/languages' activeClassName='activeNav'>FR</NavLink>
                    </ul>
                </div>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                    <ul className="navbar-nav ml-auto">
                        {!this.state.isLogged ?
                            <NavLink className="nav-item nav-link" to='/signin' activeClassName='activeNav'>
                                <i className="material-icons" style={style.loginIcon}>
                                    account_circle
                                </i>
                            </NavLink>
                            : null
                        }
                        {this.state.isLogged ?
                            <NavLink className="nav-item nav-link mt-2 pl-5" to='/account' activeClassName='activeNav'>
                                <em>you are now connected </em><span className="text-info">  {auth.currentUser().displayName ? auth.currentUser().displayName : auth.currentUser().email}</span>
                            </NavLink>
                            : null
                        }
                        {this.state.isLogged ?
                            <li className="nav-item dropdown pl-5">
                                <a className="nav-link dropdown-toggle" href="" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i className="material-icons" style={style.loginIcon}>
                                        account_circle
                                </i>
                                </a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <NavLink className="dropdown-item " to='/account' activeClassName='activeNav'>Account</NavLink>
                                    <NavLink className="dropdown-item " to='/projects' activeClassName='activeNav'>Projects</NavLink>
                                    <NavLink className="dropdown-item " to='/playlists' activeClassName='activeNav'>Playlists</NavLink>
                                    <NavLink className="dropdown-item " to='/team' activeClassName='activeNav'>Team</NavLink>
                                    <div className="dropdown-divider"></div>
                                    <NavLink className="dropdown-item " to='/documentation' activeClassName='activeNav'>Documentation</NavLink>
                                    <NavLink className="dropdown-item " to='/help-center' activeClassName='activeNav'>Help center</NavLink>
                                    <div className="dropdown-divider"></div>
                                    <a className="dropdown-item" href="" onClick={doSignOut}>Sign out</a>
                                </div>
                            </li>
                            : null
                        }
                        <div className="cart-element">
                            <NavLink   to='/cart' activeClassName='activeNav'>
                                <span className="cart-icon">
                                    <i className="material-icons" style={style.loginIcon}>
                                        shopping_cart
                                </i>
                                </span>
                            </NavLink>

                            <span className="cart-notification">
                                {cart.length}
                            </span>
                        </div>
                    </ul>

                </div>
            </nav>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        cart: state.cart,
    };
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ editCart }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)

