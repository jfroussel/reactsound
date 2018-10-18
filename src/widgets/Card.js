import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import RemoveCard from './RemoveCard'

class Card extends Component {
    constructor(props) {
        super(props)
        this.state = {}

    }

    render() {
        const card = this.props
        return (
            <div className="card-playlist">
                <a className="img-card" href="">
                    <img src={`https://picsum.photos/200/300?image=${card.img}${card.id}`} alt="" />
                </a>
                <div className="card-content">
                    <h4 className="card-title">
                        {card.title}
                    </h4>
                    <p className="card-text">{card.description}</p>
                </div>
                <div className="card-footer text-right">
                    <Link to={card.url} className="btn btn-dark">{card.btn1}</Link>
                    <a href="" className="btn btn-light" data-toggle="modal" data-target={`#` + card.uid}>delete</a>
                </div>
                <RemoveCard card={card} />
            </div>
        );
    }
}
export default Card;