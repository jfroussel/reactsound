import React, { Component } from 'react';
import { connect } from 'react-redux'
import {
  filterGenres,
  filterBpm,
  filterComposers,
  filterMoods,
  filterInstruments,
} from '../actions/filters'
import style from './CatalogSidebarStyle'
import { genres, moods, composers, instruments, bpm } from '../components/catalog/CatalogConstants'

class CatalogSidebar extends Component {

  constructor(props) {
    super(props)
    this.state = {
      checked: false
    }
  }

  handleChange = name => event => {
    this.setState({ checked: event.target.checked });
  }

  render() {
    return (
      <div style={style.containerSidebar}>
        <div className="accordion" id="catalog-sidebar">
          <div className="card card-catalog">
            <div className="card-header" id="headingOne">
              <h5 className="mb-0">
                <button
                  className="btn btn-link collapsed"
                  type="button"
                  data-toggle="collapse"
                  data-target="#collapseOne"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                //onMouseOver={this.onMouseOver}
                >


                  GENRES <span className="badge badge-pill badge-custom ml-3"></span>

                </button>
              </h5>

            </div>
            <div id="collapseOne" className="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
              <div className="card-body">
                {genres.map((genre, i) => {
                  return (
                    <a
                      key={genre}
                      className="badge badge-pill badge-custom-sidebar ml-2 mt-2"
                      onClick={(e) => {
                          this.props.dispatch(filterGenres(e.target.text))
                      }}
                    >{genre}</a>
                  )
                })}
                
              </div>
            </div>
          </div>
          <div className="card card-catalog">
            <div className="card-header" id="headingTwo">
              <h5 className="mb-0">
                <button
                  className="btn btn-link collapsed"
                  type="button"
                  data-toggle="collapse"
                  data-target="#collapseTwo"
                  aria-expanded="false"
                  aria-controls="collapseTwo"
                >
                  MOODS <span className="badge badge-pill badge-custom ml-3"></span>
                </button>
              </h5>
            </div>
            <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
              <div className="card-body">
              {moods.map((mood, i) => {
                  return (
                    <a
                      key={mood}
                      className="badge badge-pill badge-custom-sidebar ml-2 mt-2"
                      onClick={(e) => {
                          this.props.dispatch(filterMoods(e.target.text))
                      }}
                    >{mood}</a>
                  )
                })}
                
              </div>
            </div>
          </div>
          <div className="card card-catalog">
            <div className="card-header" id="headingThree">
              <h5 className="mb-0">
                <button
                  className="btn btn-link collapsed"
                  type="button"
                  data-toggle="collapse"
                  data-target="#collapseThree"
                  aria-expanded="false"
                  aria-controls="collapseThree"
                >
                  BPM <span className="badge badge-pill badge-custom ml-3"></span>
                </button>
              </h5>
            </div>
            <div id="collapseThree" className="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
              <div className="card-body">
              {bpm.map((el, i) => {
                  return (
                    <a
                      key={el.name}
                      className="badge badge-pill badge-custom-sidebar ml-2 mt-2"
                      onClick={(e) => {
                          this.props.dispatch(filterBpm(e.target.text))
                      }}
                    >{el.name}</a>
                  )
                })}
                
              </div>
            </div>
          </div>
          <div className="card card-catalog">
            <div className="card-header" id="headingFour">
              <h5 className="mb-0">
                <button
                  className="btn btn-link collapsed"
                  type="button"
                  data-toggle="collapse"
                  data-target="#collapseFour"
                  aria-expanded="false"
                  aria-controls="collapseThree"
                >
                  LENGTH
                </button>
              </h5>
            </div>
            <div id="collapseFour" className="collapse" aria-labelledby="headingFour" data-parent="#accordionExample">
              <div className="card-body">
              </div>
            </div>
          </div>
          <div className="card card-catalog">
            <div className="card-header" id="headingFive">
              <h5 className="mb-0">
                <button
                  className="btn btn-link collapsed "
                  type="button"
                  data-toggle="collapse"
                  data-target="#collapseFive"
                  aria-expanded="false"
                  aria-controls="collapseThree"
                >
                  COMPOSERS <span className="badge badge-pill badge-custom ml-3"></span>
                </button>
              </h5>
            </div>
            <div id="collapseFive" className="collapse" aria-labelledby="headingFive" data-parent="#accordionExample">
              <div className="card-body">
              {composers.map((composer, i) => {
                  return (
                    <a
                      key={composer}
                      className="badge badge-pill badge-custom-sidebar ml-2 mt-2"
                      onClick={(e) => {
                          this.props.dispatch(filterComposers(e.target.text))
                      }}
                    >{composer}</a>
                  )
                })}
              </div>
            </div>
          </div>
          <div className="card card-catalog">
            <div className="card-header" id="headingSix">
              <h5 className="mb-0">
                <button
                  className="btn btn-link collapsed"
                  type="button"
                  data-toggle="collapse"
                  data-target="#collapseSix"
                  aria-expanded="false"
                  aria-controls="collapseThree"
                >
                  INSTRUMENTS <span className="badge badge-pill badge-custom ml-3"></span>
                </button>
              </h5>
            </div>
            <div id="collapseSix" className="collapse" aria-labelledby="headingSix" data-parent="#accordionExample">
              <div className="card-body">
              {instruments.map((instrument, i) => {
                  return (
                    <a
                      key={instrument}
                      className="badge badge-pill badge-custom-sidebar ml-2 mt-2"
                      onClick={(e) => {
                          this.props.dispatch(filterInstruments(e.target.text))
                      }}
                    >{instrument}</a>
                  )
                })}
                
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
};

const mapStateToProps = (state) => {
  return {
    filters: state.filters
  }
}

export default connect(mapStateToProps)(CatalogSidebar)


