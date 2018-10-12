import React, { Component } from 'react';

class Orders extends Component {
    render() {
        return (
            <div className="container text-center pt-5 pb-5">
                <p className="lead">No orders Yet !</p>
                <p className="lead">Visit our catalog</p>
                <p><button className="btn btn-warning">Let go !</button></p>
            </div>
        );
    }
}

export default Orders;