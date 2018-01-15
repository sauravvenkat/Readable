// import * as API from '../utils/api';
// import { store } from '../index.js'

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

export function receiveCategories( categories ){
	return{
		type: RECEIVE_CATEGORIES,
		categories,
	}
}

export const receivePosts = (posts) => {
	return{
		type: RECEIVE_POSTS,
		posts
	}
}

export const fetchAllPosts = () => {
	return{
		type: FETCH_POSTS
	}
}
export const fetchAllCategories = () => {
	return {
		type: FETCH_CATEGORIES
	}
}
export function addPost( post ){
    return{
        type: ADD_POST,
        post,
    }
}

export function votePost(option, id){
	return{
		type: VOTE_POST,
		option,
		id,
	}
}
export function addCategory(name){
	return{
		type: ADD_CATEGORY,
		name
	}
}


