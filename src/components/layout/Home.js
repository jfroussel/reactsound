import React, { Component } from 'react'
import CoverImage from '../../assets/console.jpg'
import AutoSearch from './Autosuggest'
import Playlist from './Playlist'

const style = {
    coverImage: {
        width: '100%',
        minHeight: 1000,
        margin: 0,
        padding: 0,
        background: 'url(' + CoverImage + ') no-repeat center fixed',
        backgroundSize: 'cover',
    },
    baseline: {
        color: '#FFF',
        fontSize: 60,
        paddingTop: 150,
        fontWeight: '300',
    },

}

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div>
                <section className="cover-container pb-5" style={style.coverImage}>
                    <div className="container">
                        <p className="text-left " style={style.baseline}>Explore Our<br />
                            Curated Royalty-Free<br />
                            Music Library
                        </p>
                        <AutoSearch />
                    </div>

                </section>
                <Playlist />

            </div>

        )
    }
}

export default Home;