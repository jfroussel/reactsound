import React, { Component } from 'react';
import { genres } from '../catalog/CatalogConstants'

class Playlist extends Component {


    render() {
        return (
            <section className="wrapper">
                <div className="container-fostrap pt-5">
                    <div>
                        <h1 className="heading">
                            PlayList of the month<br />
                            (our selection by genres)
                        </h1>
                    </div>
                    <div className="content">
                        <div className="container pt-5">
                            <div className="row">
                                {genres.map((genre, i) => {
                                    return (
                                        <div className="col-xs-12 col-sm-4" key={genre}>
                                            <div className="card-playlist">
                                                <a className="img-card" href="">
                                                    <img src={'https://picsum.photos/200/300?image=2'+i} alt="" />
                                                </a>
                                                <div className="card-content">
                                                    <h4 className="card-title">
                                                        <a href=""> "{genre}" playlist of the month
                                            </a>
                                                    </h4>
                                                    <p className="">
                                                        sounds {genre} selected for you ...
                                            </p>
                                                </div>
                                                <div className="card-read-more">
                                                    <a href="" className="btn btn-link btn-block text-info">
                                                        Read More
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Playlist;
