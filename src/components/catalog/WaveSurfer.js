import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import WaveSurfer from 'wavesurfer.js'
//import TimelinePlugin from 'wavesurfer.js/dist/plugin/wavesurfer.timeline.min.js';
//import MinimapPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.minimap.min.js';
//import RegionsPlugin from 'wavesurfer.js/src/plugin/regions.js'
//import CursorPlugin from 'wavesurfer.js/src/plugin/cursor.js'
import drums from '../../assets/instruments/drums.svg'
import fullmix from '../../assets/instruments/fullmix.svg'
import bass from '../../assets/instruments/bass.svg'

import ReactTooltip from 'react-tooltip'
import style from './WaveSurferStyle'

export default class Waveform extends Component {
    constructor(props) {
        super(props)
        this.state = {
            activePlay: false
        }
        this.playPause = this.playPause.bind(this)
        this.pause = this.pause.bind(this)
    }

    componentDidMount() {
        this.$el = ReactDOM.findDOMNode(this)
        this.$waveform = this.$el.querySelector('.wave')
        this.$timelineform = this.$el.querySelector('.wave-timeline')
        this.wavesurfer = WaveSurfer.create({
            container: this.$waveform,
            waveColor: '#17a2b8',
            progressColor: '#056271',
            height: 60,
        })
        this.wavesurfer.load(this.props.src)
    }

    playPause() {
        this.setState({ activePlay: true })
        return (
            this.wavesurfer.playPause()
        )
    }

    pause() {
        this.setState({ activePlay: false })
        return (
            this.wavesurfer.pause()
        )
    }

    render() {

        return (
            <div className='container waveform'>
                <div className="row">
                    {!this.state.activePlay ?
                        <span data-tip="Play track">
                            <i className="material-icons" onClick={this.playPause} style={style.playpause}>
                                play_arrow
                        </i>
                        </span>
                        :
                        <span data-tip="Pause track">
                            <i className="material-icons" onClick={this.pause} style={style.playpause}>
                                pause
                        </i>
                        </span>
                    }

                    <div className="col-6">
                        <div className='wave' style={style.wave} > </div>
                    </div>

                    <div className="col-1" style={style.iconBox}>
                        <div className="dropup" data-tip="Stems">
                            <a className="btn btn-default dropdown-toggle dropdown-reactsound" href="" role="button"  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i className="material-icons " style={style.stems} >
                                    list
                                </i>
                            </a>
                            
                            <div className="dropdown-menu" >
                                <a className="dropdown-item" href=""><img className="mr-2" src={fullmix} width="25" alt=""/> full mix</a>
                                <a className="dropdown-item" href=""><img className="mr-2" src={drums} width="25" alt=""/> drums stem </a>
                                <a className="dropdown-item" href=""><img className="mr-2" src={bass} width="25" alt=""/> bass stem</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-1" style={style.iconBox}>
                        <div className="dropup" data-tip="Stems">
                            <a className="btn btn-default dropdown-toggle dropdown-reactsound" href="" role="button"  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i className="material-icons " style={style.stems} >
                                playlist_add
                                </i>
                            </a>
                            
                            <div className="dropdown-menu" >
                                <a className="dropdown-item" href=""> playlist 1</a>
                                <a className="dropdown-item" href=""> playlist 2 </a>
                                <a className="dropdown-item" href=""> playlist 3</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-1" style={style.iconBox}>
                        <span data-tip="list of author tracks">
                            <i className="material-icons" style={style.icon}>
                                how_to_reg
                            </i>
                        </span>
                    </div>
                    <div className="col-1" style={style.iconBox}>
                        <span data-tip="Infos">
                            <i className="material-icons" style={style.icon}>
                                info
                            </i>
                        </span>
                    </div>
                    <div className="col-1" style={style.iconBox}>
                        <span data-tip="Add to cart">
                            <i className="material-icons" style={style.icon}>
                                add_shopping_cart
                            </i>
                        </span>
                    </div>

                </div>

                <ReactTooltip />
            </div>
        )
    }
}

Waveform.defaultProps = {
    src: ""
}