import React, { Component } from 'react';
import ReactTable from "react-table"
import "react-table/react-table.css"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getStorageTrack } from '../../actions/storageTrack'
import { getSoundsSelected } from '../../actions/soundsSelected'
import Wave from './wave'

const style = {
    table: {}
}

class playlistTable extends Component {
    constructor(props) {
        super(props)
        this.state = {
            activePlay: false,
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.listID !== prevProps.listID) {
            this.props.getSoundsSelected(this.props.listID)

        }
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
            return (
                <Wave />
            )
        }
        return (
            <div>
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
                                                    ? <div  data-tip="" ><i className="material-icons" >pause_circle_outline</i></div>
                                                    : <div  data-tip="Expend for more infos" ><i className="material-icons">play_circle_outline</i></div>}
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
                                    {
                                        
                                        Cell: row => (
                                           <button className="btn btn-sm btn-warning">buy</button>
                                        )
                                            
                                               
                                            
                                        
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
