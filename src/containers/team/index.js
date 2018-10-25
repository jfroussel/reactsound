import React, { Component } from 'react';

class Team extends Component {

    componentWillMount() {
        console.log('Component will mount')
    }

    componentDidMount() {
        console.log('Component did mount')
    }

    componentWillUpdate() {
        console.log('Component will update')
    }
    componentDidUpdate(){
        console.log('Component did update')
    }

    componentWillReceiveProps() {
        console.log('Component will receive props')
    }

    componentWillUnmount() {
        console.log('Component will unmount')
    }

    shouldComponentUpdate() {
        console.log('Should component update')
    }

    
    render() {
        return (
            <div className="container-fluid pt-5">
                <div className="row">
                    <div className="col-sm-12 text-center">
                        <h3 className="text-uppercase">Your Team </h3>
                    </div>
                    <div className="col-sm-12">
                        
                    </div>
                </div>
            </div>
        );
    }
}

export default Team;