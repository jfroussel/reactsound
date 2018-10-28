import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import ReactTable from "react-table"
import "react-table/react-table.css"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getStorageTrack } from '../../actions/storageTrack'
import { getSoundsSelected } from '../../actions/soundsSelected'
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
        }
        this.playPause = this.playPause.bind(this)
        this.pause = this.pause.bind(this)

    }

    componentDidUpdate(prevProps) {
        if (this.props.listID !== prevProps.listID) {
            this.props.getSoundsSelected(this.props.listID)
        }
    }

    componentDidMount() {
        this.$el = ReactDOM.findDOMNode(this)
        this.$waveform = this.$el.querySelector('.wave')
        this.$timelineform = this.$el.querySelector('.wave-timeline')
        this.wavesurfer = WaveSurfer.create({
            container: this.$waveform,
            waveColor: '#17a2b8',
            progressColor: '#056271',
            height: 60,
        })

        const src = 'https://firebasestorage.googleapis.com/v0/b/myapp-a124d.appspot.com/o/A.Del%2F_Wild%20Fire_%20EpicOrchestral%20Em%2080bpm.mp3?alt=media&token=d368ce80-d145-4fcc-bbc3-9660c68662f5'
        this.wavesurfer.load(src)
    }

    playPause() {
        return (
            this.wavesurfer.playPause()
        )
    }

    pause() {
        return (
            this.wavesurfer.pause()
        )
    }

    render() {
        const { soundsSelected } = this.props
        const onRowClick = (state, rowInfo, column, instance) => {
            return {
                onClick: (e, handleOriginal) => {
                    console.log(rowInfo)
                    let filename = ''
                    const id = rowInfo.index
                    const author = state.data[id].author
                    filename = state.data[id].filename
                    //filename && this.props.getStorageTrack(author, filename)
                    if (handleOriginal) {
                        handleOriginal()
                    }
                }
            };
        };


        const SubComponent = (props) => {
            const id = props.id
            return (
                <div className="row" style={style.subComponent}>
                   
                </div>
            )
        }
        return (
            <div>
                <div className="wave"> </div>
                <div>
                    <ReactTable
                        data={soundsSelected}
                        columns={[
                            {

                                columns: [
                                    {
                                        expander: true,
                                        width: 65,
                                        Expander: ({ isExpanded, ...rest }) =>
                                            <div >
                                                {isExpanded
                                                    ? <div onClick={this.pause} data-tip="" ><i className="material-icons" >pause_circle_outline</i></div>
                                                    : <div onClick={this.playPause} data-tip="Expend for more infos" ><i className="material-icons">play_circle_outline</i></div>}
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
                                Header: `${soundsSelected ? soundsSelected.length : 0} tracks found`,
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

                                ]
                            },
                        ]}
                        defaultPageSize={5}
                        style={style.table}
                        className="-striped -highlight"
                        getTdProps={onRowClick}
                        SubComponent={(row) => <div style={{ padding: '10px' }}><SubComponent id={row.index} /></div>}

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
