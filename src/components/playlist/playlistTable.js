import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import ReactTable from "react-table"
import "react-table/react-table.css"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getStorageTrack } from '../../actions/storageTrack'
import WaveSurfer from 'wavesurfer.js'

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
            src: ''
        }
        this.playPause = this.playPause.bind(this)
        this.pause = this.pause.bind(this)
    }
    
    componentDidUpdate() {
        this.$el = ReactDOM.findDOMNode(this)
        this.$waveform = this.$el.querySelector('.wave')
        this.$timelineform = this.$el.querySelector('.wave-timeline')
        this.wavesurfer = WaveSurfer.create({
            container: this.$waveform,
            waveColor: '#17a2b8',
            progressColor: '#056271',
            height: 60,
        })
        this.wavesurfer.load(this.props.track)
    }
    
    playPause() {
        this.setState({ activePlay: true })
        return (
            this.wavesurfer.playPause()
        )
    }

    pause() {
        this.setState({ activePlay: false })
        return (
            this.wavesurfer.pause()
        )
    }

    render() {
        const Wave = () => {
            return (
                <div className='wave'></div>
            )
        }

        const onRowClick = (state, rowInfo, column, instance) => {
            return {
                onClick: (e, handleOriginal) => {
                    let filename = ''
                    const id = rowInfo.index
                    const author = state.data[id].author
                    filename = state.data[id].filename
                    filename && this.props.getStorageTrack(author, filename)
                    
                    alert('ok')

                    if (handleOriginal) {
                        handleOriginal()
                    }
                }
            };
        };
        return (
            <div>
                <Wave />
                <div>
                    <ReactTable
                        data={this.props.sounds}
                        columns={[
                            {
                                columns: [
                                    {
                                        expander: true,
                                        width: 65,
                                        Expander: ({ isExpanded, ...rest }) =>
                                            <div>
                                                {isExpanded
                                                    ? <div style={style.play} onClick={() => this.pause}><i className="material-icons" style={style.icon}>pause</i></div>
                                                    : <div style={style.play} onClick={() => this.playPause}><i className="material-icons" style={style.icon}>play_arrow</i></div>}
                                            </div>,
                                        style: {
                                            cursor: "pointer",
                                            fontSize: 15,
                                            padding: "0",
                                            textAlign: "center",
                                            userSelect: "none",
                                            width: 50
                                        },
                                    }
                                ]
                            },

                            {
                                Header: `${this.props.sounds.length} tracks found`,
                                columns: [

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
                                            <div>
                                                
                                            </div>
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
        track: state.storageTrack
    };
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getStorageTrack }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(playlistTable)
