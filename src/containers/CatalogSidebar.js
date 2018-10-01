import React, { Component } from 'react';
import { connect } from 'react-redux'
import {
  filterGenres,
  removeFilterGenres,
  filterBpm,
  removeFilterBpm,
  filterArtists,
  removeFilterArtists,
  filterMoods,
  removeFilterMoods,
  filterInstruments,
  removeFilterInstruments
} from '../actions/filters'
import style from './CatalogSidebarStyle'
import { genres, moods, artists, instruments, bpm } from '../components/catalog/CatalogConstants'

class CatalogSidebar extends Component {

  constructor(props) {
    super(props)
    this.state = {
      mouseOverSidebar: false,
      checked: false
    }
  }
  /*
    onMouseOver() {
      //this.setState({ mouseOverSidebar: true })
      return (
        console.log('on mouse over')
      )
    }
  */

  handleChange = name => event => {
    this.setState({ checked: event.target.checked });
  }

  render() {
   
    const { filters } = this.props

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

                  GENRES <span className="badge badge-pill badge-custom ml-3">{filters.genres}</span>

                </button>
              </h5>

            </div>
            <div id="collapseOne" className="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
              <div className="card-body">
              {genres.map((genre, i) => {
                  return (
                    <div className="form-check" key={genre}>

                      <input
                        type="radio"
                        value={genre}
                        name="genre"
                        className="form-check-input"
                        id={genre}
                        onChange={(e) => {

                          if (e.target.checked) {
                            
                            this.props.dispatch(filterGenres(e.target.value));
                          } else {
                            this.props.dispatch(removeFilterGenres(e.target.value))
                          }
                        }}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="exampleCheck1"
                      >{genre}</label>
                    </div>
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
                  MOODS <span className="badge badge-pill badge-custom ml-3">{ filters.moods }</span>
                </button>
              </h5>
            </div>
            <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
              <div className="card-body">
                {moods.map((mood, i) => {
                  return (
                    <div className="form-check" key={mood}>
                      <input
                        type="radio"
                        name="moods"
                        className="form-check-input"
                        value={mood}
                        id={mood}
                        onChange={(e) => {
                          if (e.target.checked) {
                            this.props.dispatch(filterMoods(e.target.value));
                          } else {
                            this.props.dispatch(removeFilterMoods(e.target.value))
                          }
                        }}
                      />
                      <label className="form-check-label" htmlFor="exampleCheck1">{mood}</label>
                    </div>
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
                  BPM <span className="badge badge-pill badge-custom ml-3">{ filters.bpm }</span>
                </button>
              </h5>
            </div>
            <div id="collapseThree" className="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
              <div className="card-body">
                {bpm.map((el, i) => {

                  return (
                    <div className="form-check" key={el.name}>
                      <input
                        type="radio"
                        name="bpm"
                        className="form-check-input"
                        value={el.name}
                        id={el.name}
                        onChange={(e) => {
                          if (e.target.checked) {
                            this.props.dispatch(filterBpm(e.target.value));
                          } else {
                            this.props.dispatch(removeFilterBpm(e.target.value))
                          }
                        }}
                      />
                      <label className="form-check-label" htmlFor="exampleCheck1">{el.name}  {el.value}</label>
                    </div>
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
                  ARTISTS <span className="badge badge-pill badge-custom ml-3"></span>
                </button>
              </h5>
            </div>
            <div id="collapseFive" className="collapse" aria-labelledby="headingFive" data-parent="#accordionExample">
              <div className="card-body">
                {artists.map((artist, i) => {
                  return (
                    <div className="form-check" key={artist}>
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id={artist}
                        value={artist}
                        onChange={(e) => {
                          if (e.target.checked) {
                            this.props.dispatch(filterArtists(e.target.value))
                          } else {
                            this.props.dispatch(removeFilterArtists(e.target.value))
                          }
                        }}
                      />
                      <label className="form-check-label" htmlFor="exampleCheck1">{artist}</label>
                    </div>
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
                    <div className="form-check has-warning" key={instrument}>
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id={instrument}
                        value={instrument}
                        onChange={(e) => {
                          if (e.target.checked) {
                            this.props.dispatch(filterInstruments(e.target.value))
                          } else {
                            this.props.dispatch(removeFilterInstruments(e.target.value))
                          }
                        }}
                      />
                      <label className="form-check-label" htmlFor="exampleCheck1">{instrument}</label>
                    </div>
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


