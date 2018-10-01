import React, { Component } from 'react';
import CatalogHeader from '../components/catalog/CatalogHeader'
import CatalogSidebar from './CatalogSidebar'
import CatalogContent from '../components/catalog/CatalogContent'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getSounds } from '../actions/sounds'

const style = {
  content: {
    //backgroundColor: '#001a1a',
  },
  sidebar: {
    //backgroundColor: '#001a1a',
  }
}


class Catalog extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataFixtures: []
    }
  }

  
  componentWillMount() {
    this.props.getSounds()
  }
  

  render() {
    const { sounds, storageTrack, filters } = this.props
  
    return (
        <section className="features-1">
          <div className="container-fluid container-catalog">
              <CatalogHeader />
            <div className="row">
              <div className="col-2" style={style.sidebar}>
                <CatalogSidebar filters={filters} />
              </div>
              <div className="col-10" style={style.content}>
              
               <CatalogContent sounds={sounds} filters={filters} storageTrack={storageTrack} />

              </div>
            </div>
          </div>
        </section>
    )
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
  return bindActionCreators({ getSounds }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Catalog)


