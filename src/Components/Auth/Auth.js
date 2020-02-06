import React, { Component } from 'react'
import axios from 'axios'; 
import { getUser } from '../../ducks/reducer'
import { connect } from 'react-redux';

export class Auth extends Component {
    constructor(){
        super(); 

        this.state = {
            username: '', 
            password: '', 
            profile_pic: 'https://robohash.org/people',
            user: {}
            
        }
        this.login = this.login.bind(this); 
        this.register = this.register.bind(this); 
    }

    handleChange = e => {
        const {name, value} = e.target
        this.setState({
          [name]: value
      })
    }

    async login () {
        console.log(this.props.history)
        const { username, password } = this.state;
        await axios.post('/auth/login', {username, password})
        .then(res => {
            this.setState({user: res.data, username: '', password: ''})
            this.props.getUser(this.state.user); 
            console.log(this.state.user)
            this.props.history.push('/dashboard');
        })
       
    }
    async register () {
        const {username, password, profile_pic } = this.state
        axios.post('/auth/register', {username, password, profile_pic})
        .then(res => {
            this.setState({user: res.data, username: '', password: ''})
            this.props.history.push('/');
        })
        .catch(err => console.log(err)); 
    }


    render() {
        const { username, password} = this.state 
        return (
            <div className='auth-main' >
                <div className='auth-box'>
                    <h1>Helo</h1>
                    <span><label>Username:</label><input 
                        name='username'
                        value={username}
                        onChange={e => this.handleChange(e)} /></span>
                    <span><label>Password:</label><input
                        name='password'
                        value={password}
                        onChange={e => this.handleChange(e)} /></span> 
                    <span><button onClick={this.login} >Login</button>
                    <button onClick={this.register} >Register</button></span>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => state; 

export default connect(mapStateToProps, { getUser })(Auth); 