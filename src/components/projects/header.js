import React, { Component } from 'react';
import Select from 'react-select'


class header extends Component {

    render() {
        const { playlists } = this.props
        const dataPlaylist = () => {
            const result = []
                playlists.map((playlist) => {
                    result.push({
                        value: playlist.id,
                        label: playlist.title
                    })
                })
            return result
        }
        return (
            <div>
                <div className="col-3">
                    <p className="lead">Select playlist</p>
                    <Select options={dataPlaylist()} />
                </div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <a className="nav-link" href="">
                                    <i className="material-icons">
                                        autorenew
                                    </i>
                                </a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        );
    }
}

export default header;