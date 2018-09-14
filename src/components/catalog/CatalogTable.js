import React, { Component } from "react"
import './table.css'
import firebase from 'firebase';
import 'firebase/auth'
import style from './CatalogTableStyle'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getSounds } from '../../actions/sounds'
import { getStorageTrack } from '../../actions/storageTrack'
import ReactTable from "react-table"
import "react-table/react-table.css"
import Album from '../../assets/jacquette.jpg'
import WaveSurfer from './WaveSurfer'
import ReactTooltip from 'react-tooltip'
import Modal from 'react-responsive-modal';

class CatalogTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pictureFixture: '',
            filteredSounds: '',
            open: false,
            isLogged: false,
        };
        this.getTags = this.getTags.bind(this)
    }

    onOpenModal = () => {
        if(!this.state.isLogged) {
            this.setState({ open: true });
        } else {
            alert("go to function")
        }

        
    };

    onCloseModal = () => {
        this.setState({ open: false });
    };

    getFilterSelect(data) {
        return (
            data[0].value
        )
    }


    filtered(sounds) {
        return (
            sounds.filter(sound =>
                this.getFilterSelect(sound.genres) === this.props.filters.genres.toString() ||
                this.getFilterSelect(sound.moods) === this.props.filters.moods.toString() ||
                this.getFilterSelect(sound.instruments) === this.props.filters.instruments.toString()
            )
        )
    }

    componentWillMount() {
        this.props.getSounds()
        var user = firebase.auth().currentUser;

        if (user) {
            this.setState({ isLogged: true })
            console.log('USER IS LOGGED')
        } else {
            this.setState({ isLogged: false })
            console.log('USER IS NOT LOGGED')
        }
    }

    componentWillReceiveProps(nextProps) {


    }

    componentDidUpdate() {

        const sounds = this.props.sounds
        this.filtered(sounds)

    }

    getTags(tags, i) {
        if (tags) {

            return (
                tags.map((tag, i) => {
                    return (
                        <span className="ml-2 pl-2 pt-1 pb-1 pr-2" key={i} style={style.tags}>{tag.value}</span>
                    )
                })
            )
        }
    }




    render() {
        console.log('IS LOGGED : ',this.state.isLogged)
        const { open } = this.state;
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
                <button type="button" className="btn btn-warning" onClick={this.onOpenModal}>Buy 25€</button>
            )
        }

        const CatalogActions = () => {
            return (
                <div>
                    <div className="row">
                        <div style={style.iconBoxAction} className="ml-3" data-tip="like this track" onClick={this.onOpenModal} >
                            <i className="far fa-heart" style={style.iconAction} ></i>
                        </div>
                        <div style={style.iconBoxAction} className="ml-2" data-tip="Download this track" onClick={this.onOpenModal}>
                            <i className="fas fa-download" style={style.iconAction} ></i>
                        </div>
                        <div style={style.iconBoxAction} className="ml-2" data-tip="Add to favorites" onClick={this.onOpenModal}>
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

            return (
                <div className="row" style={style.subComponent}>
                    <div className="col-2 pt-3">
                        <img src={Album} alt="album" width="200px" />
                    </div>
                    <div className="col-10 pt-3" >
                        <div className="pb-3">Audio filename : {filename ? filename : 'track not found !'} <br /><span>By Author : {author ? author : 'author not found !'}</span> </div>
                        <div className="pb-3">Genres : {this.getTags(genres) ? this.getTags(genres) : ''} </div>
                        <div className="pb-3">Moods : {this.getTags(moods) ? this.getTags(moods) : ''}</div>
                        <div className="pb-3">Instruments : {this.getTags(instruments) ? this.getTags(instruments) : ''}</div>
                        <div className='parent-component' style={style.wave}><WaveSurfer src={!storageTrack ? defaultTrack : storageTrack} /></div>
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
                                columns: [

                                    {
                                        Header: "Title",
                                        accessor: "title",

                                    },
                                    {
                                        Header: "Author",
                                        accessor: "author",
                                    },
                                    {
                                        Header: "Length",
                                        accessor: "lenght",
                                    },
                                    {
                                        Header: "BPM",
                                        accessor: "bpm",
                                    },
                                    {
                                        Header: "Tone",
                                        accessor: "tone.label",
                                    },
                                    {
                                        Header: "Loops",
                                        accessor: "loops",
                                        style: {
                                            cursor: "pointer",
                                            textAlign: "left",
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
                   
                    <Modal
                        open={open}
                        onClose={this.onCloseModal}
                        center
                        classNames={{
                            transitionEnter: 'transition-enter',
                            transitionEnterActive: 'transition-enter-active',
                            transitionExit: 'transition-exit-active',
                            transitionExitActive: 'transition-exit-active',
                        }}
                        animationDuration={1000}
                    >
                            <h2>to use this feature you must register </h2>
                            <button className="btn btn-lg btn-warning">Register now</button>
                    </Modal>
                </div>
            );
        }
    }
}

const mapStateToProps = (state) => {
    return {
        sounds: state.sounds,
        storageTrack: state.storageTrack,
        filters: state.filters
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getSounds, getStorageTrack }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CatalogTable);






