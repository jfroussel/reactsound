import React, { Component } from 'react';

class Composer extends Component {

    constructor(props) {
        super(props)
        this.state = {
            composer:''
        }
    }

    
    componentWillMount() {
        this.setState({composer: this.props.match.params})
    }
    
    render() {
        console.log('COMPOSER ', this.state.composer.id)
        return (
            <div className="container-fluid pt-5">
                <div className="row">
                    <div className="col-sm-12 text-center">
                        <h3 className="text-uppercase" >Composer {this.state.composer.id}   </h3>
                    </div>
                    <div className="col-sm-12">
                        
                    </div>
                </div>
            </div>
        );
    }
}

export default Composer;