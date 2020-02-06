import React, { Component } from 'react'
import {connect} from 'react-redux'; 
import { post } from '../../ducks/post_reducer'; 

export class Form extends Component {
    constructor() {
        super(); 

        this.state = {
            title: '',
            image: '',
            content: ''
        }
    }

    handlePost = e => this.setState({[e.target.name]: e.target.value })

    post = () => {
        const { title, image, content } = this.state; 
        console.log(title, image, content)
        this.props.post(this.props.match.params.userid, {title, image, content})
        this.setState({title: '', image: '', content: ''})
        this.props.history.push('/dashboard')
    }

    render() {
        const { title, image, content } = this.state; 
        return (
            <div className='new-post' >
                <h1>New Post</h1>
                <span>
                    <label>Title:</label><input name='title' value={title} onChange={e=>this.handlePost(e)} /> 
                    </span>
                <span> 
                    <img src={image} style={{width: '200px'}} alt='pfp'/>
                </span>
                <span>
                    <p>Image URL: </p>
                    <input name='image' value={image} onChange={e=>this.handlePost(e)} /> 
                </span>
                <span>
                    <p>Content:</p>
                    <input name='content' value={content} onChange={e=>this.handlePost(e)} />
                </span>
                <button onClick={this.post}>Post</button>
            </div>
        )
    }
}

function mapStateToProps (state) {
    return {
        post: state.reducer.post,
        user: state.reducer.user
    }
}

export default connect(mapStateToProps, { post })(Form);