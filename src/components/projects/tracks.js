import React, { Component } from 'react';
import sounds from '../../components/catalog/data/sounds.json'
import ReactTable from "react-table"
import "react-table/react-table.css"

class tracks extends Component {

    constructor(props) {
        super(props)
        this.state = {
            tracks: [sounds]
        }
    }
    render() {
        const tracks = [
            {author: "jeff roussel", description:"mon super morceau", title:"billie's bounce"},
            {author: "charlie parker", description:"mon super morceau", title:"billie's bounce"},
            {author: "tommy emmanuel", description:"mon super morceau", title:"billie's bounce"}
        ]
        
        return (

            <div>
                <ReactTable
                    data={tracks}
                    columns={[
                        {
                            
                            columns: [
                                {
                                    Header: "Title",
                                    accessor: "title"
                                },
                                {
                                    Header: "Author",
                                    accessor: "author"
                                },
                                {
                                    Header: "Description",
                                    accessor: "description"
                                },
                               
                            ]
                        },
                        
                    ]}
                    defaultPageSize={5}
                    className="-striped -highlight"
                />
                <br />
               
            </div>
        );
    }
}

export default tracks;