import React, { Component } from 'react';
import { genres } from '../catalog/CatalogConstants'

class Playlist extends Component {


    componentWillMount() {
        console.log(genres)

    }

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
                                        <div className="col-xs-12 col-sm-3">
                                            <div className="card-playlist" key={genre}>
                                                <a className="img-card" href="">
                                                    <img src={'https://picsum.photos/200/300?image=2'+i} />
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
                                                    <a href="http://www.fostrap.com/2016/03/bootstrap-3-carousel-fade-effect.html" className="btn btn-link btn-block">
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
