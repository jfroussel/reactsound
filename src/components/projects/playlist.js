import React, { Component } from 'react';
import CatalogTable from '../catalog/CatalogTable'
import PlaylistTable from '../playlist/table'

class ProjectPlaylist extends Component {
    render() {
        return (
            <div>
                <PlaylistTable />
            </div>
        );
    }
}

export default ProjectPlaylist;
