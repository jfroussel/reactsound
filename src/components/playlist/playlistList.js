import React, { Component } from 'react'
import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getPlaylists, removePlaylist } from '../../actions/playlist'
import { Link } from 'react-router-dom';
import ReactTable from "react-table"
import "react-table/react-table.css"
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'


const style = {

    header: {
        textAlign: 'left',
        color: '#000',

    }
}

class PlaylistList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogged: false,
            uid: null,
            countPlaylists: ''
        };
    }

    componentWillMount() {
        firebase.auth().onAuthStateChanged((user) => {
            user ? this.setState({ isLogged: true }) : this.setState({ isLogged: false })
            if (user) {
                this.setState({ uid: user.uid })
                this.props.getPlaylists(this.state.uid)
            }
        });
        console.log(this.props)
    }

    render() {
        console.log('THIS PROPS //// : ', this.props)
        const { playlists } = this.props
        
        let countPlaylists = playlists.length ? playlists.length : 0
        
        const remove = (id, title) => {
            confirmAlert({
                customUI: ({ onClose }) => {
                    return (
                        <div className='custom-ui'>
                            <h3>Are you sure?</h3>
                            <p>You want to delete {title} playlist?</p>
                            <button className="btn btn-default" onClick={onClose}>No</button>
                            <button className="btn btn-warning" onClick={() => {
                                firebase.database().ref('members/' + this.state.uid + '/playlists').child(id).remove().then(() => {
                                    countPlaylists = countPlaylists -1
                                    onClose()
                                })
                                
                            }}>Yes, Delete it!</button>
                        </div>
                    )
                }
            })
        }

        return (
            <div className="pt-5">
                <h4>you have {countPlaylists} active playlists</h4>
                <br />

                <div>
                    <ReactTable
                        data={playlists}
                        columns={[

                            {

                                columns: [

                                    {
                                        Header: "Title",
                                        accessor: "title",
                                        minWidth: 200,
                                        style: {
                                            color: '#000',
                                        }
                                    },
                                    {
                                        Header: "Description",
                                        accessor: "description",
                                        minWidth: 200,
                                        style: {
                                            color: '#000',
                                        }
                                    },

                                    {

                                        id: 'edit',
                                        Cell: (({ original }) => <Link to={`/playlist/${original.id}`} className="btn btn-primary">Edit</Link>),

                                    },
                                    {

                                        id: 'delete',
                                        Cell: (({ original }) => <button onClick={() => remove(original.id, original.title)}>Delete</button>),
                                    },
                                ]
                            },
                        ]}
                        defaultPageSize={10}
                        headerStyle={style.header}
                        sortable={true}
                        noDataText="No data found !"
                        className="-striped -highlight"
                    />
                </div>
            </div>
        )
    }

}


const mapStateToProps = (state) => {
    return {
        playlists: state.playlists
    };
}

const mapDispatchToProps = (dispatch) => {

    return bindActionCreators({ getPlaylists, removePlaylist }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistList);