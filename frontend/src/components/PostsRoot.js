import React, { Component } from 'react'
import Post from './Post'
import { connect } from 'react-redux'
import * as Actions from '../actions'
import { Link } from 'react-router-dom'

class PostsRoot extends Component{
		componentDidMount(){
			this.props.fetchPosts()
		}

		state = {
			sortBy: 'timestamp'

		}
		render(){
			let posts = this.props.posts
			if(this.state.sortBy === 'timestamp'){
				 posts = posts.sort((a,b) => {
					return b.timestamp - a.timestamp
				})
			}
			else{
				posts = posts.sort((a,b) => {
					return b.voteScore - a.voteScore
				})
			}
			return(
			<div>
				<div className='SortFilter'>
					<div>
						<span className='filterLabel'>Filter By Category:</span>
						<div>{


					this.props.categories.map((cat) => {
						return(
							<Link key={cat.name} className='CatLink' to={`/${cat.path}`}>{`${cat.name}`}</Link>
						)
					})


					}
						</div>
					</div>
					<div>
						<span>Sort By:</span>
						<select  onChange={(event) =>{
							this.setState({sortBy: event.target.value})
						}}>
							<option value='timestamp'>timestamp</option>
							<option value='voteScore'>Vote Score</option>
						</select>
					</div>
				</div>

			{

				posts.map((post) => {
					return(
						<Post timestamp={post.timestamp} body={post.body} key={post.id} title={post.title} author={post.author} voteScore={post.voteScore} comments={post.commentCount} id={post.id} category={post.category}/>

				)
				})
	


 			
			
				

			}
			<form className='PostForm' onSubmit={(event) => {
				event.preventDefault()
				const data = new FormData(event.target)
				this.props.addPost({id: Date.now().toString(), title: data.get('title'), author: data.get('author'), body: data.get('body'), category: data.get('category'), commentCount: 0, deleted: false, voteScore: 0, timestamp: Date.now()})
				const ids = ['PostTitle', 'PostAuthor', 'PostCategory', 'PostBody']
				ids.forEach((id) => {
					document.getElementById(id).value = ''
				})


			}}>
				<input placeholder='Title' id='PostTitle' name='title' type='text' />
				<input placeholder='Author' id='PostAuthor' name='author' type='text' />
				<input placeholder='Category' id='PostCategory' name='category' type='text'/>
				<input className='PostBody'  id='PostBody' name='body' placeholder='Body...' type='text' />
				<button type='submit'>Add Post</button> 
			</form>
			</div>
			)

		}

}
function mapStateToProps(state){
	return{
		posts: state.posts.posts,
		categories: state.categories.categories
	}
}
function mapDispatchToProps(dispatch){
	return {
		getPosts: (posts) =>  { dispatch(Actions.receivePosts(posts)) },
		getCats: (cats) => { dispatch(Actions.receiveCategories(cats))},
		addPost: (post) => { dispatch(Actions.addAsyncPost(post))},
		addCategory: (cat) => { dispatch(Actions.addCategory(cat))},
		fetchPosts: () => { dispatch(Actions.fetchPosts())},
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsRoot)