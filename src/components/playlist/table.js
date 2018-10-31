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
            isActiveSubComponant: false
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.listID !== prevProps.listID) {
            this.props.getSoundsSelected(this.props.listID)
        }


    }

    render() {
       console.log('TABLE', this.props)
        const { soundsSelected, track } = this.props
        const onRowClick = (state, rowInfo, column, instance) => {
            return {
                onClick: (e, handleOriginal) => {
                    console.log(rowInfo)

                    if (handleOriginal) {
                        handleOriginal()
                    }
                }
            };
        };

        const SubComponent = (props) => {
            const author = props.author
            const filename = props.filename
            this.props.getStorageTrack(author, filename)
            return (
                <Wave src={track} uid={this.props.uid} info={props} />
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
                                        expander: false,
                                        width: 65,
                                        Expander: ({ isExpanded, ...rest }) =>
                                            <div >
                                                {isExpanded
                                                    ? <div data-tip="" ><i className="material-icons" >keyboard_arrow_down</i></div>
                                                    : <div data-tip="Expend for more infos" ><i className="material-icons">keyboard_arrow_right</i></div>}
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
                        SubComponent={(row) => {
                            return (
                                <div style={{ padding: '10px' }}>
                                    <SubComponent id={row.index} refID={row.original.id} author={row.original.author} filename={row.original.filename} />
                                </div>
                            )
                        }}
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
