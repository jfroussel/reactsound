import React from 'react'
import { connect } from 'react-redux'
import firebase from 'firebase/app'
import 'firebase/database'
import { Link } from 'react-router-dom';
//import { removeSound } from '../actions/sounds'
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
        backgroundColor: '#000'
    }
}




const remove = (id, title) => {
    confirmAlert({
        title: 'Suppression de ' + title,
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
        ]
    })
}

const ProjectList = (props) => (

    <div className="pt-5">
        <div>
            <ReactTable
                data={props.projects}
                columns={[

                    {
                        columns: [
                            {
                                accessor: "play",
                                width: 25
                            },
                            {
                                Header: "Title",
                                accessor: "title",
                                minWidth: 200,
                            },
                            {
                                Header: "Description",
                                accessor: "description",
                                minWidth: 200,
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
);

const mapStateToProps = (state) => {
    return {
        projects: state.projects
    };
}

export default connect(mapStateToProps)(ProjectList);