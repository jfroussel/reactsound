import React, { Component } from 'react';
import sounds from '../../components/catalog/data/sounds.json'

import ReactTable from "react-table"
import "react-table/react-table.css"

const style = {
    iconAction: {
        color: 'dark',
        backgroundColor: 'transparent',

    },
    iconBoxAction: {
        border: 'solid 2px #dfe1e5c2',
        textAlign: 'center',
        paddingTop: 3,
        borderRadius: 50,
        width: 30,
        height: 30,
        cursor: 'pointer'
    },

}

class tracks extends Component {

    constructor(props) {
        super(props)
        this.state = {
            tracks: [sounds],
            random: ''
        }
    }
    render() {
        const tracks = [
            { author: "jeff roussel", description: "mon super morceau", title: "billie's bounce" },
            { author: "charlie parker", description: "mon super morceau", title: "billie's bounce" },
            { author: "tommy emmanuel", description: "mon super morceau", title: "billie's bounce" }
        ]

        const TrackControls = () => {
            return (
                <div>
                    <div className="row">
                        <div style={style.iconBoxAction} className="ml-3" data-tip="Download this track">
                            <i class="material-icons"> play_arrow</i>
                        </div>
                    </div>
                </div>
            )
        }

        const TrackVolumes = () => {
            return (
                <div>
                    <div className="row">
                        <div style={style.iconBoxAction} className="ml-2" data-tip="Download this track">
                            <i class="material-icons"> volume_down</i>
                        </div>
                        <div style={style.iconBoxAction} className="ml-2" data-tip="Add to playlist" >
                            <i class="material-icons"> volume_off</i>
                        </div>
                        <div style={style.iconBoxAction} className="ml-2" data-tip="Add to playlist" >
                            <i class="material-icons"> volume_up</i>
                        </div>
                    </div>
                </div>
            )
        }

        const TrackProgress = () => {
            return (
                <div className="progress">
                    <div className="progress-bar" role="progressbar" style={{ width: getRandom(1, 100) }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
            )
        }

        const getRandom = (min, max) => {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min
        }


        return (


            <div>
                <ReactTable
                    data={tracks}
                    columns={[
                        {

                            columns: [
                                {
                                    id: "Controls",
                                    accessor: e => e.Controls, width:50,
                                    
                                    Cell: row => (
                                        <div><TrackControls /></div>
                                    ),
                                    
                                    
                                    
                                    
                                },
                                {
                                    Header: "Title",
                                    accessor: "title"
                                },
                                {
                                    Header: "Author",
                                    accessor: "author"
                                },
                                {
                                    Header: "Description",
                                    accessor: "description"
                                },
                                {
                                    Header: "Progress",
                                    accessor: "Progress",
                                    Cell: row => (
                                        <div><TrackProgress /></div>
                                    )
                                },
                                {

                                    accessor: "Volumes",
                                    Cell: row => (
                                        <div><TrackVolumes /></div>
                                    )
                                }

                            ]
                        },

                    ]}
                    defaultPageSize={5}
                    className="-striped -highlight"
                />
                <br />

            </div >
        );
    }
}

export default tracks;