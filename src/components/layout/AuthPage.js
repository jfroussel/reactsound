import React, { Component } from 'react'
import Auth from './Auth'

class AuthPage extends Component {

    constructor(props) {
        super(props)
        this.state = {


        }
    }

    render() {
        return (
            <div className="pt-5">
                <Auth />
            </div>
        )
    }
}

export default AuthPage