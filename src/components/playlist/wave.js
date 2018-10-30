import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import WaveSurfer from 'wavesurfer.js'
import TimelinePlugin from 'wavesurfer.js/dist/plugin/wavesurfer.timeline.min.js';
import RegionsPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.regions';


class Wave extends Component {
    constructor(props) {
        super(props)
        this.state = {
            activePlay: false,
            isLogged: false,
            uid: null,
        }
        this.playPause = this.playPause.bind(this)
        this.pause = this.pause.bind(this)
        this.addRegion = this.addRegion.bind(this)
        this.removeRegion = this.removeRegion.bind(this)
        this.play = this.play.bind(this)


    }

    componentDidMount() {
        const src = this.props.src
        this.$el = ReactDOM.findDOMNode(this)
        this.$waveform = this.$el.querySelector('.wave')
        this.$timelineform = this.$el.querySelector('.wave-timeline')
        this.wavesurfer = WaveSurfer.create({
            container: this.$waveform,
            waveColor: '#17a2b8',
            progressColor: '#056271',
            height: 60,
            plugins: [
                TimelinePlugin.create({
                    container: '.wave-timeline'
                }),
                RegionsPlugin.create({

                })
            ]
        })

        this.wavesurfer.load(src)
        this.wavesurfer.on('ready', () => {
            this.wavesurfer.addRegion({
                start: 3,
                end: 5,
                color: 'hsla(100, 100%, 30%, 0.1)'
            });
            this.wavesurfer.addRegion({
                start: 1,
                end: 2,
                color: 'hsla(200, 100%, 30%, 0.1)'
            });

            this.wavesurfer.addRegion({
                start: 8,
                end: 10,
                color: 'hsla(400, 100%, 30%, 0.1)'
            });

        })

    }

    play() {
        this.wavesurfer.playPause()
    }
    addRegion() {
        this.wavesurfer.addRegion({
            start: 8,
            end: 10,
            color: 'rgba(111, 66, 193, 0.53)'
        })
    }

    removeRegion() {
        this.wavesurfer.clearRegions()
    }

    handleClickRegion() {
        this.wavesurfer.playLoop()
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
            <div className="col-12">
                <div className='wave' > </div>
                <div className='wave-timeline'  > </div>
                <div className="pt-2">
                    <button onClick={this.addRegion} className="btn btn-sm btn-primary">add Region</button>
                    <button onClick={this.removeRegion} className="btn btn-sm btn-primary ml-2">remove Region</button>
                    <button onClick={this.play} className="btn btn-sm btn-primary ml-2">play</button>
                </div>

            </div>
        )
    }
}

Wave.defaultProps = {
    src: ""
}


export default Wave