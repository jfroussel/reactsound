import React, {Component} from 'react';


class Prices extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {

        return (
                <section className="features-1 text-center">
                    <div className="container">
                        <h2 className="font-weight-light">Prices & Conditions</h2>
                        <p className="lead constrain-width mt-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. At aliquam rhoncus donec magna turpis, dictum sit amet tellus at, commodo elementum sapien.</p>
                        <div className="divider"></div>
                        <div className="row">
                            <div className="col-md-4 col-feature">
                                <div className="rounded-circle justify-center">
                                    <em className="fa fa-2x fa-paint-brush"></em>
                                </div>
                                <h4>Clean Design</h4>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse cursus erat sed sem sagittis cursus.</p>
                                <p><a className="btn btn-outline-info mt-2 font-weight-normal" href="" role="button">View details</a></p>
                            </div>
                            <div className="col-md-4 col-feature">
                                <div className="rounded-circle justify-center">
                                    <em className="fa fa-2x fa-desktop"></em>
                                </div>
                                <h4>Responsive</h4>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse cursus erat sed sem sagittis cursus.</p>
                                <p><a className="btn btn-outline-info mt-2 font-weight-normal" href="" role="button">View details</a></p>
                            </div>
                            <div className="col-md-4 col-feature">
                                <div className="rounded-circle justify-center">
                                    <em className="fa fa-2x fa-code"></em>
                                </div>
                                <h4>Bootstrap 4</h4>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse cursus erat sed sem sagittis cursus.</p>
                                <p><a className="btn btn-outline-info mt-2 font-weight-normal" href="" role="button">View details</a></p>
                            </div>
                        </div>
                    </div>
                </section>
        )
    }
}

export default Prices;