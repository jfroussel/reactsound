import React, { Component } from 'react'

import firebase from 'firebase/app'
import 'firebase/database'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getProjects } from '../../actions/projects'
import { Link } from 'react-router-dom';
import ReactTable from "react-table"
import "react-table/react-table.css"
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'

const style = {
    subComponent: {
        border: 'solid 1px #6c757d',
        padding: '10px 10px',
        fontWeight: '200',
        color: '#000'
    },
    header: {
        textAlign: 'left',
        color: '#000',

    }
}

class ProjectsList extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };


    }


    componentWillMount() {
        this.props.getProjects()
    }

    componentWillUpdate() {
        this.props.getProjects()
    }



    render() {

        const { projects } = this.props

        const remove = (id, title) => {
            confirmAlert({
                customUI: ({ onClose }) => {
                    return (
                        <div className='custom-ui'>
                            <h3>Are you sure?</h3>
                            <p>You want to delete {title} project?</p>
                            <button className="btn btn-default" onClick={onClose}>No</button>
                            <button className="btn btn-warning" onClick={() => {
                                firebase.database().ref('projects').child(id).remove().then(() => {
                                    onClose()
                                })
                            }}>Yes, Delete it!</button>
                        </div>
                    )
                }
            })


            /*
            confirmAlert({
                title: 'Suppression du projet ' + title,
                message: 'Etes vous certain de vouloir supprimer définitivement ce projet ?',
                buttons: [
                    {
                        label: 'Oui',
                        onClick: () => {
                            firebase.database().ref('projects').child(id).remove().then(() => {
                                window.location.reload()
                            })
        
                        }
                    },
                    {
                        label: 'Non',
                        onClick: () => console.log('la suppression a été annulée !')
                    }
                ],
                
            })
            */
        };
        return (
            <div className="pt-5">
                <div>
                    <ReactTable
                        data={projects}
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
                                        Cell: (({ original }) => <Link to={`/sound/${original.id}`} className="btn btn-primary">Edit</Link>),

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
        projects: state.projects
    };
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getProjects }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsList);