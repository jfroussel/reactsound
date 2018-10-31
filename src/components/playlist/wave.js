import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import WaveSurfer from 'wavesurfer.js'
import TimelinePlugin from 'wavesurfer.js/dist/plugin/wavesurfer.timeline.min.js';
import RegionsPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.regions';
import Loader from 'react-loader-spinner'

class Wave extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isReady: false,
            activePlay: false,
            isLogged: false,
            uid: null,
        }
        this.pause = this.pause.bind(this)
        this.addRegion = this.addRegion.bind(this)
        this.removeRegion = this.removeRegion.bind(this)
        this.play = this.play.bind(this)
        this.stop = this.stop.bind(this)

    }

    componentDidMount() {

        const src = this.props.src
        this.$el = ReactDOM.findDOMNode(this)
        this.$waveform = this.$el.querySelector('.wave')
        this.$timelineform = this.$el.querySelector('.wave-timeline')
        this.wavesurfer = WaveSurfer.create({
            container: this.$waveform,
            waveColor: '#6c757d9c',
            progressColor: '#6c757d',
            height: 60,
            plugins: [
                TimelinePlugin.create({
                    container: '.wave-timeline',
                    fontFamily: 'Montserrat',
                    primaryColor: '#343a40',
                    secondaryColor: '#343a40',
                    primaryFontColor: '#343a40',
                    secondaryFontColor: '#343a40',
                    notchPercentHeight: 60

                }),
                RegionsPlugin.create({

                })
            ]
        })
        this.wavesurfer.load(src)

        this.wavesurfer.on('ready', () => { 
            this.setState({ isReady: true }) 
            this.wavesurfer.enableDragSelection({});
        })

        this.wavesurfer.on('region-click', (region, e) => {
            e.stopPropagation();
            this.wavesurfer.play(region.start, region.end);
        });

    }

    play() {
        this.setState({ activePlay: true })
        this.wavesurfer.play()
    }

    pause() {
        this.setState({ activePlay: false })
        this.wavesurfer.pause()
    }

    stop() {
        this.setState({ activePlay: false })
        this.wavesurfer.stop()
    }

    addRegion() {
        this.wavesurfer.addRegion({
            start: 8,
            end: 30,
            color: '#28a74578'
        })
    }

    removeRegion() {
        this.wavesurfer.clearRegions()
    }

    handleClickRegion() {
        this.wavesurfer.playLoop()
    }


    render() {

        return (
            <div className="col-12">
                <div className="text-center">
                    {!this.state.isReady ? <Loader type="Ball-Triangle" color="#e83e8c" height={80} width={80} /> : null}
                </div>
                <div className='wave' > </div>
                <div className='wave-timeline'  > </div>
                <div className="pt-2">
                    <button onClick={this.addRegion} className="btn btn-sm btn-secondary">add Region</button>
                    <button onClick={this.removeRegion} className="btn btn-sm btn-secondary ml-2">remove Region</button>
                    <button onClick={this.play} className="btn btn-sm btn-secondary ml-2">play</button>
                    <button onClick={this.pause} className="btn btn-sm btn-secondary ml-2">pause</button>
                    <button onClick={this.stop} className="btn btn-sm btn-secondary ml-2">stop</button>
                </div>

            </div>
        )
    }
}

Wave.defaultProps = {
    src: ""
}


export default Wave