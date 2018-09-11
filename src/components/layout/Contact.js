import React, {Component} from 'react';

class Contact extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {

        return (
            <section className="contact pt-5">
                <div className="container">
                    <div className="row contact-details">
                        <div className="col-sm-8 m-auto text-center">
                            <h2 className="font-weight-light">Contact Us</h2>
                            <p className="lead constrain-width mt-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. At aliquam rhoncus donec magna turpis, dictum sit amet tellus at, commodo elementum sapien.</p>
                            <div className="divider"></div>
                            <h4>Ask us a question</h4>
                            <form className="contact-form mt-4">
                                <div className="row">
                                    <div className="col-md-6">
                                        <input type="text" className="form-control-custom mb-4" placeholder="Name"/>
                                    </div>
                                    <div className="col-md-6">
                                        <input type="text" className="form-control-custom mb-4" placeholder="Email address"/>
                                    </div>
                                    <br />
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <textarea className="form-control-custom mb-4" rows="3" placeholder="Your message ..."></textarea><br />
                                        <button type="submit" className="btn btn-info btn-lg mb-4 font-weight-normal">Send Message</button>
                                    </div> 
                                </div>
                            </form>
                        </div>
                        
                    </div>
                </div>
            </section>

        )
    }
}

export default Contact;