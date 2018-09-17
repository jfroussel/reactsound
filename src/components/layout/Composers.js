import React, { Component } from 'react';
import { composers } from '../catalog/CatalogConstants'
import { fakeComposers } from '../catalog/CatalogConstants'

class Composers extends Component {




    componentWillMount() {
        console.log(fakeComposers)

    }

    render() {
        return (
            <div className="container pt-5 pb-5">
                <div className="text-center">
                    <h1 className="heading">
                        Reactsound Composers<br />
                        (our selection by profils)
                        </h1>
                </div>
                <div className="row mt-4">
                    {composers.map((composer, i) => {
                        return (
                            <div className="col-xs-12 col-sm-6 col-md-3">
                                <div className="flip-div">
                                    <div className="flip-main">
                                        <div className="front">
                                            <div className="card">
                                                <div className="card-body text-center pb-2">

                                                    <p><img className="rounded-circle" src={fakeComposers[i]} alt="" /></p>

                                                    <h5 className="card-title"><strong>{composer}</strong></h5>
                                                    <p className="card-text">This is basic user profile with image, title, detail and button.</p>
                                                    <a href="" className="btn btn-info btn-sm"><i className="fa fa-arrow-right"></i></a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="back rounded">
                                            <div className="card">
                                                <div className="card-body text-center">
                                                    <h4 className="card-title"><strong>{composer}</strong></h4>
                                                    <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                                                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                quis nostrud exercitation.</p>
                                                    <ul className="list-inline">
                                                        <li className="list-inline-item">
                                                            <a className="social-icon text-xs-center text-info" target="_blank" href="">
                                                                <i className="fab fa-facebook"></i>
                                                            </a>
                                                        </li>
                                                        <li className="list-inline-item">
                                                            <a className="social-icon text-xs-center text-info" target="_blank" href="">
                                                                <i className="fab fa-twitter"></i>
                                                            </a>
                                                        </li>
                                                        <li className="list-inline-item">
                                                            <a className="social-icon text-xs-center text-info" target="_blank" href="">
                                                                <i className="fab fa-skype"></i>
                                                            </a>
                                                        </li>
                                                        <li className="list-inline-item">
                                                            <a className="social-icon text-xs-center text-info" target="_blank" href="">
                                                                <i className="fab fa-google"></i>
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )

                    })}
                </div>
            </div>

        );
    }
}

export default Composers;
