import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const style = {
    header: {
        fontSize: 20
    }
}
class Account extends Component {


    render() {
        const AccountTab = () => {
            return (
                <Tabs>
                    <TabList style={style.header}>
                        <Tab>Orders</Tab>
                        <Tab>Member infos</Tab>
                        <Tab>Settings</Tab>
                    </TabList>

                    <TabPanel>
                        <div className="pt-5">
                            <p className="lead">No orders Yet !</p>
                        </div>
                    </TabPanel>
                    <TabPanel>
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
                                <div className="form-row pb-5">
                                    <div className="form-group col-md-6">
                                        <label htmlFor="inputCity">City</label>
                                        <input type="text" className="form-control" id="inputCity" />
                                    </div>
                                    <div className="form-group col-md-4">
                                        <label htmlFor="inputState">State</label>
                                        <select id="inputState" className="form-control">
                                            <option selected>Choose...</option>
                                            <option>...</option>
                                        </select>
                                    </div>
                                    <div className="form-group col-md-2">
                                        <label htmlFor="inputZip">Zip</label>
                                        <input type="text" className="form-control" id="inputZip" />
                                    </div>
                                </div>
                                <div className="text-center pb-5">
                                    <button type="submit" class="btn btn-primary">Update membre infos</button>
                                </div>
                            </form>
                        </div>
                    </TabPanel>
                    <TabPanel>
                    <div className="pt-5">
                            <p className="lead">Settings!</p>
                        </div>
                    </TabPanel>
                </Tabs>
            )


        }
        return (
            <div className="container pt-5">
                <div className="row">
                    <div className="col-sm-12 text-center">
                        <h3 className="text-uppercase">Your Account </h3>
                    </div>
                    <div className="container col-sm-12">
                        <AccountTab />
                    </div>
                </div>
            </div>
        );
    }
}

export default Account;