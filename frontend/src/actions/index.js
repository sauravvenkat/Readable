// import * as API from '../utils/api';
// import { store } from '../index.js'
import axios from 'axios'

export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const RECEIVE_CATEGORIES = 'ADD_CATEGORY'
export const ADD_POST = 'ADD_POST'
export const VOTE_POST = 'VOTE_POST'
export const FETCH_POSTS = 'FETCH_POSTS'
export const FETCH_CATEGORIES = 'FETCH_CATEGORIES'
export const ADD_CATEGORY ='ADD_CATEGORY'
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS'
export const GET_CURRENT_POST = 'GET_CURRENT_POST'
export const ADD_COMMENT = 'ADD_COMMENT'

const AUTH_HEADERS = { 'Authorization': 'whatever-you-want', 'Accept': 'application/json', };
const ROOT = 'http://localhost:3001'
    axios.defaults.headers.common['Authorization'] = AUTH_HEADERS;


export function fetchPosts(){
	return dispatch => {
		axios.get(`${ROOT}/posts`).then(res => dispatch(receivePosts(res.data)))	
	}
}
export function editPost(id, edit){
	return dispatch =>{
		axios.put(`${ROOT}/posts/${id}`,edit).then(res => dispatch(fetchPosts()))
	}
}


export function fetchComments(id){
	return dispatch => {
		axios.get(`${ROOT}/posts/${id}/comments`).then(res => dispatch(receiveComments(res.data)))
	}
}
export function addAsyncComment(comment){
	return dispatch => {
		axios.post(`${ROOT}/comments`, comment).then(res => dispatch(addComment(comment)))
	}
}
export function receiveComments(comments){
	return{
		type: RECEIVE_COMMENTS,
		comments
	}
}
export function addComment(comment){
	return{
		type: ADD_COMMENT,
		comment
	}
}

export function votePost(option, id){
	return dispatch => {
		axios.post(`${ROOT}/posts/${id}`, {'option': option }).then(res => dispatch(fetchPosts()))
	}

}

export function fetchCategories(){
	return dispatch => {
		axios.get(`${ROOT}/categories`).then(res => dispatch(receiveCategories(res.data.categories)))
	}
}

export function receiveCategories( categories ){
	return{
		type: RECEIVE_CATEGORIES,
		categories,
	}
}

export function deleteAsyncPost( id ){
	return dispatch => {
		axios.delete(`${ROOT}/posts/${id}`).then((res) => dispatch(deletePost(id)))
	}
}

export function deletePost( id ){
	return{
		type: 'DELETE_POST',
		id
	}
}

export function deleteComment(id){
	return{
		type: 'DELETE_COMMENT',
		id
	}
}

export function deleteAsyncComment(id){
	return dispatch => {
		axios.delete(`${ROOT}/comments/${id}`).then(res => dispatch(deleteComment(id)))
	}
}


export const receivePosts = (posts) => {
	return{
		type: RECEIVE_POSTS,
		posts
	}
}

export function addPost( post ){
    return{
        type: ADD_POST,
        post,
    }
}
export function addAsyncPost( post ){
	return dispatch => {
		axios.post(`${ROOT}/posts`, post).then(res => dispatch(addPost(post)))
	}
}


export function addCategory(name){
	return{
		type: ADD_CATEGORY,
		name
	}
}


