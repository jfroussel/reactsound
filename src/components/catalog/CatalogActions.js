import React, { Component } from 'react';

const style = {
    icon: {
        color: '#dcad54',
        backgroundColor: 'transparent',

    },
    iconBox: {
        border: 'solid 2px #dfe1e5c2',
        textAlign: 'center',
        paddingTop: 5,
        borderRadius: 50,
        width: 40,
        height: 40,
        cursor: 'pointer'
    }
}



class CatalogActions extends Component {

    render() {
        return (
            <div>
                <div className="row">
                    <div style={style.iconBox} className="ml-3" >
                        <i className="far fa-heart" style={style.icon}  ></i>
                    </div>
                    <div style={style.iconBox} className="ml-2">
                        <i className="fas fa-download" style={style.icon} ></i>
                    </div>
                    <div style={style.iconBox} className="ml-2">
                        <i className="fas fa-music" style={style.icon} ></i>
                    </div>
                </div>
            </div>
        );
    }
}

export default CatalogActions;

