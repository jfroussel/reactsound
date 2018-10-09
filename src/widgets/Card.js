import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import RemoveCard from './RemoveCard'


const style = {
    card: {
        width: '18rem'
    }
}

class Card extends Component {
    constructor(props) {
        super(props)
        this.state = {
           
        }
    }




    render() {
        const card = this.props
        console.log(this.props)
        return (
            <div className="card" style={style.card}>
                <div className="card-body">
                    <h5 className="card-title">{card.title}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{card.btn2}</h6>
                    <p className="card-text">{card.description}</p>
                    <Link to={card.url} className="btn btn-primary">{card.btn1}</Link>
                    <a href="" className="btn btn-default" data-toggle="modal" data-target={`#` + card.uid}>delete</a>
                </div>

                <RemoveCard card={card} />
                
            </div>
        );
    }
}

export default Card;