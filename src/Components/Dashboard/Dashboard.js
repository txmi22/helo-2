import React, {Component} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'

export class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            posts: []
        }
    }

    componentDidMount() {
        this.update(); 
    }
     
    update = async () => await axios.get('/auth/post').then(res=>this.setState({posts: res.data }))

    postList = id => {
        this.props.history.push(`/post/${id}`)
    }

    render() {
        return (
            <div className="dashboard">
                 {this.state.posts.map(post=>(
                  <div key={post.id} className='post' onClick={()=>this.postList(post.id)} >
                    <img src={post.image} style={{width: '40px', height: '40px'}} alt='pfp'/> 
                    <p> {post.title} </p>
                    <p> {post.content} </p>
                    <p> {post.user_id} </p>
                  </div>  
                ))}
            </div>
        )
    }
}

function mapStateToProps(state) {
	return { 
        user: state.reducer.user, 
     };
}

export default connect(mapStateToProps)(Dashboard); 