import React, { Component } from 'react';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';

class MemberInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            country: '',
            region: '',
        }
    }

    selectCountry(val) {
        this.setState({ country: val });
    }

    selectRegion(val) {
        this.setState({ region: val });
    }
    render() {
        const { country, region } = this.state
        return (
            <div className="pt-5">
                <form >
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="firstname">First name</label>
                            <input type="text" className="form-control" id="firstname" placeholder="First name" />
                        </div>
                        <div class="form-group col-md-6">
                            <label htmlFor="lastname">Last name</label>
                            <input type="text" className="form-control" id="lastname" placeholder="Last name" />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="inputEmail4">Email</label>
                            <input type="email" className="form-control" id="inputEmail4" placeholder="Email" />
                        </div>
                        <div class="form-group col-md-6">
                            <label htmlFor="inputPassword4">Password</label>
                            <input type="password" className="form-control" id="inputPassword4" placeholder="Password" />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputAddress">Address</label>
                        <input type="text" className="form-control" id="inputAddress" placeholder="1234 Main St" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputAddress2">Address 2</label>
                        <input type="text" className="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor" />
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-4">
                            <label htmlFor="Country">Country</label>
                            <CountryDropdown
                                value={country}
                                onChange={(val) => this.selectCountry(val)}
                                className={'form-control'} />
                        </div>
                        <div className="form-group col-md-4">
                            <label htmlFor="Region">Region</label>
                            <RegionDropdown
                                country={country}
                                value={region}
                                onChange={(val) => this.selectRegion(val)}
                                className={'form-control'} />
                        </div>
                    </div>
                    <div className="form-row pb-5">
                        <div className="form-group col-md-4">
                            <label htmlFor="inputCity">City</label>
                            <input type="text" className="form-control" id="inputCity" />
                        </div>
                        <div className="form-group col-md-2">
                            <label htmlFor="inputZip">Zip</label>
                            <input type="text" className="form-control" id="inputZip" />
                        </div>
                    </div>
                    <div className="text-center pb-5">
                        <button type="submit" class="btn btn-primary">Update info</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default MemberInfo;