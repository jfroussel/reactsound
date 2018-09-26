import React, { Component } from 'react';


class DetailPlaylist extends Component {

    constructor(props) {
        super(props)
        this.state = {
            playlistID: ''
        }
    }



    componentWillMount() {
        this.setState({ playlistID: this.props.match.params })
    }



    render() {

        const pid = this.state.playlistID
        
        console.log(pid.id)
        return (

            <div className="container-fluid pt-5">
                <div className="row">
                    <div className="col-sm-12">
                        <h4 className="font-weight-light">Detail playlist {pid.id}</h4>
                    </div>
                    <div className="col-sm-12">
                       
                    </div>
                </div>
               
            </div>



        );
    }
}

export default DetailPlaylist
