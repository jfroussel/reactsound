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
    const searchRequestItems = () => {
      if (filters) {
        return (
          filters.genres + '  ' + filters.moods + ' ' + filters.bpm + ' ' + filters.instruments + ' ' + filters.artists
        )
      }
    }

    return (
      <div>
        <h3 style={style.title}>Most Popular Royalty Free Music</h3>
        <em><h5 style={style.count}>{sounds.length} tracks found</h5></em>
        <em><h6 style={style.count}>search request : {searchRequestItems()}  </h6></em>
        <CatalogTable sounds={sounds} filters={filters} />
      </div>
    )
  }
}

export default CatalogContent

