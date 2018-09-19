import React from 'react';

export default class ProjectForm extends React.Component {
    constructor(props) {
        super(props)
        this.onTitleChange = this.onTitleChange.bind(this)
        this.onDescriptionChange = this.onDescriptionChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.state = {
            title: props.sound ? props.sound.title : '',
            description: props.sound ? props.sound.description : '',
            error: ''
        };
    }

    componentWillMount() {
        console.log('component will mount : ', this)
    }

    componentWillUpdate() {
        console.log('component will update : ', this.props)
    }

    componentDidMount() {
        console.log('component did mount : ', this.props)
    }

    componentDidUpdate() {
        console.log('component did update : ', this.props)
    }

    componentWillReceiveProps() {
        console.log('component will receive props : ', this.props)
    }


    onTitleChange(e) {
        const title = e.target.value
        this.setState(() => ({ title: title }))
    }

    onDescriptionChange(e) {
        const description = e.target.value
        this.setState(() => ({ description: description }))
    }

    onSubmit(e) {
        e.preventDefault()

        if (!this.state.title) {
            this.setState(() => ({ error: 'Please set title' }))
        } else {
            this.setState(() => ({ error: '' }))
            this.props.onSubmitProject(
                {
                    title: this.state.title,
                    description: this.state.description,
                }
            );
        }
    }

    render() {
        return (
            <div className="pt-5">
                {this.state.error && <p className='error'>{this.state.error}</p>}
                <form onSubmit={this.onSubmit}>
                    <div className="form-group col-6">
                        <label>Titre</label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            aria-describedby="emailHelp"
                            placeholder="Titre"
                            autoFocus
                            value={this.state.title}
                            onChange={this.onTitleChange}
                        />
                    </div>
                    <div className="form-group col-6">
                        <label>Description</label>
                        <textarea
                            className="form-control"
                            id="description"
                            rows="3"
                            placeholder="description"
                            value={this.state.description}
                            onChange={this.onDescriptionChange}
                        ></textarea>
                    </div>
                    <div className="row col-6">
                        <button type="submit" className="btn btn-lg btn-primary">Add new project</button>
                    </div>
                </form>
            </div>
        );
    }
}