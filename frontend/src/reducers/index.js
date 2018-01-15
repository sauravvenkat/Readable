import { RECEIVE_CATEGORIES, ADD_POST, RECEIVE_POSTS, RECEIVE_COMMENTS, ADD_COMMENT } from '../actions';
import { combineReducers } from 'redux'


export const initialState = {
	categories: [
  ],
  comments: 
  	[],
 posts:
  []

}




//categories
function categories(state = {'categories': []}, action){
	switch (action.type){		

		case RECEIVE_CATEGORIES:
      const { categories } = action
			return {'categories': [...categories]}
		default:
			return {
				...state
			}
	}


}

//posts
function posts(state = {'posts': []}, action){
  switch (action.type){
    case ADD_POST:
      const { post } = action
      return {'posts': [...state['posts'], post] }
    case RECEIVE_POSTS:
      const { posts } = action
      return { 'posts': [...posts]}
    case 'DELETE_POST':
      const { id } = action
      return{ 'posts': [...state['posts'].filter((post) => post.id !== id)]}
    default:
      return {
        ...state
      }
  }
}

function comments(state={'comments': []}, action){
  switch(action.type){
    case RECEIVE_COMMENTS:
     const { comments } = action
     return {'comments': [...comments]}
    case ADD_COMMENT:
      const { comment } = action
      return { 'comments': [...state['comments'], comment]}
    case 'DELETE_COMMENT':
      const { id } = action
      return { 'comments': [...state['comments'].filter((comment) => comment.id !== id)]}
    default:
      return{
        ...state
      }
  }
}






export const rootReducer = combineReducers({ categories, posts, comments})






