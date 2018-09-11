import React, { Component } from 'react';
import CatalogHeader from '../components/catalog/CatalogHeader'
import CatalogSidebar from '../components/catalog/CatalogSidebar'
import CatalogContent from '../components/catalog/CatalogContent'

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

  render() {
    return (
        <section className="features-1">
          <div className="container-fluid container-catalog">
              <CatalogHeader />
            <div className="row">
              <div className="col-2" style={style.sidebar}>
                <CatalogSidebar />
              </div>
              <div className="col-10" style={style.content}>
                <CatalogContent />
              </div>
            </div>
          </div>
        </section>
    )
  }
}

export default Catalog;

