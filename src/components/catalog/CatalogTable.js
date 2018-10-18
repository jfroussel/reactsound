import React, { Component } from "react"
import './table.css'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getStorageTrack } from '../../actions/storageTrack'
import firebase from 'firebase';
import 'firebase/auth'
import style from './CatalogTableStyle'
import ReactTable from "react-table"
import "react-table/react-table.css"
import WaveSurfer from './WaveSurfer'
import ReactTooltip from 'react-tooltip'



class CatalogTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pictureFixture: '',
            filteredSounds: '',
            isLogged: false,
        };
        this.getTags = this.getTags.bind(this)

    }

    getFilterSelect(sound) {
        return (
            sound[0].value
        )
    }


    filtered(sounds) {

        return (
            sounds.filter((sound, i) =>


                this.getFilterSelect(sound.genres) === this.props.filters.genres.toString() ||
                this.getFilterSelect(sound.moods) === this.props.filters.moods.toString() ||
                this.getFilterSelect(sound.instruments) === this.props.filters.instruments.toString()

            )
        )
    }

    componentWillMount() {

        var user = firebase.auth().currentUser;
        if (user) {
            this.setState({ isLogged: true })
        } else {
            this.setState({ isLogged: false })
        }

    }


    componentDidUpdate() {

        //const sounds = this.props.sounds
        this.filtered(this.props.sounds)

    }

    getTags(tags, i) {
        if (tags) {

            return (
                tags.map((tag, i) => {
                    return (
                        <span className="badge badge-pill badge-custom-sidebar ml-2 mt-2" key={i}>{tag.value}</span>
                    )
                })
            )
        }
    }

    render() {

        const { sounds, storageTrack } = this.props
        const filteredSounds = this.filtered(sounds).length ? this.filtered(sounds) : sounds

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

        const Buy = () => {
            return (
                <button type="button" className="btn btn-warning">Buy 25€</button>
            )
        }

        const CatalogActions = () => {

            return (
                <div>
                    <div className="row">
                        <div style={style.iconBoxAction} className="ml-3" data-tip="like this track" >
                            <i className="far fa-heart" style={style.iconAction}  ></i>
                        </div>
                        <div style={style.iconBoxAction} className="ml-2" data-tip="Download this track">
                            <i className="fas fa-download" style={style.iconAction} ></i>
                        </div>
                        <div style={style.iconBoxAction} className="ml-2" data-tip="Add to playlist" >
                            <i className="fas fa-music" style={style.iconAction} ></i>
                        </div>
                    </div>
                    <ReactTooltip />
                </div>
            )
        }

        const SubComponent = (props) => {

            const author = props.author
            const filename = props.filename
            const genres = props.genres
            const moods = props.moods
            const instruments = props.instruments
            const defaultTrack = '../data/audioDefault.mpeg'
            const id = props.id
            const trackID = this.props.sounds[id].id
            const trackName = this.props.sounds[id].title


            return (
                <div className="row" style={style.subComponent}>
                    <div className="col-2 pt-3">
                        <img src={'https://picsum.photos/200/300?image=2' + id} alt="album" style={style.subComponentImg} />
                    </div>
                    <div className="col-10 pt-3" >
                        <div className="pb-3 text-white">Audio filename : {filename ? filename : 'track not found !'} </div>
                        <div className="pb-1">Genres : {this.getTags(genres) ? this.getTags(genres) : ''} </div>
                        <div className="pb-1">Moods : {this.getTags(moods) ? this.getTags(moods) : ''}</div>
                        <div className="pb-1">Instruments : {this.getTags(instruments) ? this.getTags(instruments) : ''}</div>
                        <div className='parent-component' style={style.wave}><WaveSurfer src={!storageTrack ? defaultTrack : storageTrack} trackID={trackID} trackName={trackName} author={author} id={id} /></div>
                    </div>
                </div>
            )
        }

        if (filteredSounds) {
            return (
                <div>
                    <ReactTable
                        data={filteredSounds}
                        columns={[
                            {

                                columns: [
                                    {
                                        expander: true,
                                        width: 65,
                                        Expander: ({ isExpanded, ...rest }) =>
                                            <div>
                                                {isExpanded
                                                    ? <div data-tip="" style={style.play}><i className="material-icons" style={style.icon}>arrow_drop_down</i></div>
                                                    : <div data-tip="Expend for more infos" style={style.play}><i className="material-icons" style={style.icon}>arrow_right</i></div>}
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
                                Header: `${filteredSounds.length} tracks found`,
                                columns: [

                                    {
                                        Header: "Title",
                                        accessor: "title",
                                        style: {
                                            color: '#fff'
                                        }

                                    },
                                    {
                                        Header: "Author",
                                        accessor: "author",
                                        style: {
                                            color: '#fff'
                                        }

                                    },
                                    {
                                        Header: "Length",
                                        accessor: "lenght",
                                        style: {
                                            color: '#fff'
                                        }

                                    },
                                    {
                                        Header: "BPM",
                                        accessor: "bpm",
                                        style: {
                                            color: '#fff'
                                        }

                                    },
                                    {
                                        Header: "Tone",
                                        accessor: "tone.label",
                                        style: {
                                            color: '#fff'
                                        }

                                    },
                                    {
                                        Header: "Loops",
                                        accessor: "loops",
                                        style: {
                                            cursor: "pointer",
                                            textAlign: "left",
                                            color: '#fff'
                                        },
                                    },
                                    {
                                        accessor: "Actions",
                                        Cell: row => (
                                            <div><CatalogActions /></div>
                                        )
                                    },
                                    {
                                        accessor: "buy",
                                        Cell: row => (
                                            <div><Buy /></div>
                                        )
                                    },

                                ]
                            },
                        ]}
                        defaultPageSize={10}
                        style={style.table}
                        className="-striped -highlight"
                        SubComponent={(row) => <div style={{ padding: '10px' }}><SubComponent id={row.index} genres={row.original.genres} author={row.original.author} filename={row.original.filename} moods={row.original.moods} instruments={row.original.instruments} /></div>}
                        getTdProps={onRowClick}
                        collapseOnDataChange={false}
                        collapseOnSortingChange={true}
                        showPaginationBottom
                    />
                    <br />

                </div>

            );
        }
    }
}



const mapStateToProps = (state) => {
    return {
        storageTrack: state.storageTrack,

    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getStorageTrack }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CatalogTable)






