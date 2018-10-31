import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { addToCart } from '../../actions/cart'
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
        this.addToCart = this.addToCart.bind(this)

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

    addToCart(uid,info) {
        console.log('add to cart', JSON.stringify(info,null,2))
        return (
            this.props.addToCart(uid,info)
            
        )
    }


    render() {
        console.log('WAVE', this.props)
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
                    <button onClick={() => this.addToCart(this.props.uid,this.props.info)} className="btn btn-sm btn-secondary ml-2">add to cart</button>
                </div>
            </div>
        )
    }
}

Wave.defaultProps = {
    src: ""
}
const mapStateToProps = (state) => {
    return {
        cart: state.cart,
        
    };
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ addToCart }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Wave)

