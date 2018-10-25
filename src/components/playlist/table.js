import React, { Component } from 'react';
import ReactTable from "react-table"
import "react-table/react-table.css"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getStorageTrack } from '../../actions/storageTrack'
import { getSoundsSelected} from '../../actions/soundsSelected'

const style = {
    wave: {
        position: 'inherit !important'
    },
}

class playlistTable extends Component {
    constructor(props) {
        super(props)
        this.state = {
            activePlay: false,
        }
        this.playPause = this.playPause.bind(this)
        this.pause = this.pause.bind(this)
        
    }
   
    componentDidUpdate(prevProps) {
        if(this.props.listID !== prevProps.listID) {
            this.props.getSoundsSelected(this.props.listID)
        }
    }
    
    playPause() {
        this.setState({ activePlay: true })
    }

    pause() {
        this.setState({ activePlay: false })
    }

    render() {
        const { soundsSelected} = this.props
        const onRowClick = (state, rowInfo, column, instance) => {
            return {
                onClick: (e, handleOriginal) => {
                    let filename = ''
                    const id = rowInfo.index
                    const author = state.data[id].author
                    filename = state.data[id].filename
                    filename && this.props.getStorageTrack(author, filename)
                    if (handleOriginal) {
                        handleOriginal()
                    }
                }
            };
        };
        return (
            <div>
                <div>
                    <ReactTable
                        data={soundsSelected}
                        columns={[
                            {
                                Header: `${soundsSelected ? soundsSelected.length : 0} tracks found`,
                                columns: [
                                    {
                                        Header: "Action",
                                        accessor: "action",
                                        style: {
                                            cursor: "pointer",
                                            fontSize: 15,
                                            padding: "0",
                                            textAlign: "center",
                                            userSelect: "none",
                                            width: 50
                                        },
                                        Cell: row => (
                                            <div>{
                                                !this.state.activePlay ?
                                                    <div style={style.play} onClick={() => this.playPause()}><i className="material-icons" style={style.icon}>play_arrow</i></div>
                                                    :
                                                    <div style={style.play} onClick={() => this.pause()}><i className="material-icons" style={style.icon}>pause</i></div>
                                            }</div>
                                        ),

                                    },
                                    {
                                        Header: "Title",
                                        accessor: "title",
                                        style: {
                                            color: '#000'
                                        }
                                    },
                                    {
                                        Header: "Author",
                                        accessor: "author",
                                        style: {
                                            color: '#000'
                                        }

                                    },
                                    {
                                        Header: "Length",
                                        accessor: "lenght",
                                        style: {
                                            color: '#000'
                                        }

                                    },
                                    {
                                        Header: "BPM",
                                        accessor: "bpm",
                                        style: {
                                            color: '#000'
                                        }

                                    },
                                    {
                                        Header: "Tone",
                                        accessor: "tone.label",
                                        style: {
                                            color: '#000'
                                        }

                                    },
                                    {
                                        Header: "Track",
                                        accessor: "Tracks",
                                        Cell: row => (
                                            <div></div>
                                        )
                                    },
                                    {
                                        accessor: "Actions",
                                        Cell: row => (
                                            <div>actions</div>
                                        )
                                    },
                                    {
                                        accessor: "buy",
                                        Cell: row => (
                                            <div>buy</div>
                                        )
                                    },

                                ]
                            },
                        ]}
                        defaultPageSize={5}
                        style={style.table}
                        className="-striped -highlight"
                        getTdProps={onRowClick}
                        collapseOnDataChange={false}
                        collapseOnSortingChange={true}
                        showPaginationBottom
                    />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        track: state.storageTrack,
        tracks: state.tracks,
        soundsSelected: state.soundsSelected
    };
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getStorageTrack, getSoundsSelected }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(playlistTable)