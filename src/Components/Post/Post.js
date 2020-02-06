import React, { Component } from 'react'
import axios from 'axios'

export class Post extends Component {
    constructor(){
        super(); 

        this.state = {
            post: []
        }
    }

    componentDidMount () {
        axios.get(`/auth/post/${this.props.match.params.postid}`)
        .then(res=>this.setState({post: res.data}))
    }
    render() {
        const { post } = this.state
        console.log(this.state.post)
        return (
            <div>
                {post.map(post=>(
                    <div key={post.id} >
                    <img src={post.image} style={{width: '40px', height: '40px'}} alt='pfp'/> 
                    <h3> {post.title} </h3>
                    <p> {post.content} </p>
                    <p> {post.id} </p>
                    </div>))}
            </div>
        )
    }
}


export default Post; 