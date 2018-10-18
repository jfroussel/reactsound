import React, { Component } from 'react'
import style from './CatalogContentStyle'
import CatalogTable from './CatalogTable'

class CatalogContent extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { filters, sounds } = this.props
  
    return (
      <div className="container-fluid">
        <h3 style={style.title}>Most Popular Royalty Free Music</h3>
        
        <div className="row ml-0">
          <em><h6 className="text-muted" style={style.search}> search request :</h6></em>
          <span className="badge badge-pill badge-custom-sidebar  ml-3">{filters.genres}</span>
          <span className="badge badge-pill badge-custom-sidebar ml-3">{filters.moods}</span>
          <span className="badge badge-pill badge-custom-sidebar ml-3">{filters.bpm}</span>
          <span className="badge badge-pill badge-custom-sidebar ml-3">
            {
              filters.instruments
            }
          </span>
        </div>

        <CatalogTable sounds={sounds} filters={filters} />
      </div>
    )
  }
}

export default CatalogContent

