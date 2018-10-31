import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { editCart } from '../../actions/cart'

class Cart extends Component {
    render() {
        const { cart } = this.props
        const price = 39
        return (
            <div className="container-fluid pt-5 pb-5">
                <div className="row">
                    <div className="col-sm-12 text-center">
                        <h3 className="text-uppercase">Your Cart </h3>
                    </div>
                    <div className="col-sm-8 pt-5">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">#ref</th>
                                    <th scope="col">Author</th>
                                    <th scope="col">Filename</th>
                                    <th scope="col">Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                   cart.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <th scope="row">{item.id}</th>
                                                <td>{item.author}</td>
                                                <td>{item.filename}</td>
                                                <td>{price} €</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className="col-sm-4 pt-5">
                        <div className="card">
                            <h5 className="card-header">Your command</h5>
                            <div className="card-body">
                                <h5 className="card-title">Special title treatment</h5>
                                <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                                <p className="card-text">Sub-Total</p>
                                <p className="card-text">European Union VAT 20%</p>
                                <a href="#" className="btn btn-warning">Pay 235 €</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        cart: state.cart

    };
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ editCart }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)