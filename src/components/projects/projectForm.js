import React from 'react';

export default class ProjectForm extends React.Component {
    constructor(props) {
        super(props)
        this.onTitleChange = this.onTitleChange.bind(this)
        this.onDescriptionChange = this.onDescriptionChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.state = {
            title: props.project ? props.project.title : '',
            description: props.project ? props.project.description : '',
            error: ''
        };
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
            this.setState({ title: '', description: '' })
        }
    }

    render() {
        return (
            <div className="container pt-5">
                <h4>Create a new project</h4>
                <br />
                {this.state.error &&
                    <div className="alert alert-danger" role="alert">
                        {this.state.error}
                        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                }
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
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
                    <div className="form-group">
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

                    <button type="submit" className="btn btn-primary">Add new project</button>

                </form>
            </div>
        );
    }
}