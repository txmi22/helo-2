import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import { connect } from 'react-redux';
import axios from 'axios';

export class Nav extends Component {

    render(){
        console.log(this.props)
        if (this.props.location.pathname === "/") {
            return <></>;
        } else {
            return (
                <div className='nav-bar'>
                    <img src={this.props.user.profile_pic} style={{width: '70px'}} alt='pfp'/>
                    <h1>{this.props.user.username}</h1>
                    <div onClick={() => this.props.history.push('/dashboard')} className='home'>Dashboard</div>
                    <div onClick={() => this.props.history.push(`/new/${this.props.user.id}`)} className='add'>Add Post</div>
                    <button
                        onClick={() => axios.post('/auth/logout').then(()=> this.props.history.push('/'))}
                        className='logout'
                    >Logout</button>
                </div>
            )
        }
    }
}

function mapStateToProps(state) {
	return { user: state.reducer.user };
}

export default connect(mapStateToProps)(withRouter(Nav));