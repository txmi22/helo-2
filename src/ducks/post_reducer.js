import axios from 'axios'; 
const initialState = {
    post: {
        title: '', 
        image: '',
        content: ''
    }
}

const ADD_POST = 'ADD_POST'; 
export const post = (id, post) => {
    console.log(id, post)
    let postData = axios.post(`/auth/post/${id}`, post).then(res=>res.data); 
    return {
        type: ADD_POST, 
        payload: postData
    }
}

export default function reducerPost(state = initialState, action) {
    const {type, payload} = action
    switch(type){
        case ADD_POST + '_PENDING':
            return {post: payload}
        case ADD_POST + '_FULFILLED':
            return {...state.post, post: payload}
        case ADD_POST + '_REJECTED':
            return {...state.post}
        default:
            return state
    }
}