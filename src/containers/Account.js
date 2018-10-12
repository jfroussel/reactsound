import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import MemberInfo from '../components/account/MemberInfo'
import Orders from '../components/account/Orders'
import Settings from '../components/account/Settings'
import Profil from '../assets/jeff.jpg'

const style = {
    header: {
        fontSize: 20
    },
    profil: {
        width:150,
        borderRadius: 100,
        border: 'solid 4px #6c757d4d'
    }
}
class Account extends Component {

    constructor(props) {
        super(props)
        this.state = {
            
        }
    }

    render() {
        const AccountTab = () => {
            return (
                <Tabs>
                    <TabList style={style.header}>
                        <Tab>Member info</Tab>
                        <Tab>Orders</Tab>
                        <Tab>Settings</Tab>
                    </TabList>
                    <TabPanel>
                       <MemberInfo />
                    </TabPanel>
                    <TabPanel>
                        <Orders />
                    </TabPanel>
                    <TabPanel>
                        <Settings />
                    </TabPanel>
                </Tabs>
            )
        }
        return (
            <div className="container pt-5">
                <div className="row">
                    <div className="col-sm-12 text-center">
                        <h3 className="text-uppercase pb-2">Your Account </h3>
                        <img src={Profil} class="mx-auto d-block" alt="profil" style={style.profil}/>
                    </div>
                    <div className="container pt-5 col-sm-12">
                        <AccountTab />
                    </div>
                </div>
            </div>
        );
    }
}

export default Account;