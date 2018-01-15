import React, { Component } from 'react';
import * as Actions from '../actions'
import { connect } from 'react-redux'
import Comment from './Comment'
import { Link } from 'react-router-dom'
import axios from 'axios'

class PostDetail extends Component{
	state = {
		voteScore: this.props.voteScore,
		edit: false,
		category: this.props.category,
		author: this.props.author,
		body: this.props.body,
		title: this.props.title,
		ROOT: 'http://localhost:3001'
	}

	componentDidMount(){
		const ROOT = 'http://localhost:3001'
		const AUTH_HEADERS = { 'Authorization': 'whatever-you-want', 'Accept': 'application/json', };
    axios.defaults.headers.common['Authorization'] = AUTH_HEADERS;
		axios.get(`${ROOT}/posts/${this.props.id}/comments`).then(res =>{
			this.props.getComments(res.data)
		})

	}

	handleUpVote(){
		this.setState((prevState) => ({
					voteScore: prevState.voteScore += 1
				}))

		axios.post(`${this.state.ROOT}/posts/${this.props.id}`, {option: 'upVote'})
	}
	handleDownVote(){
		this.setState((prevState) => ({
					voteScore: prevState.voteScore -= 1
				}))
		axios.post(`${this.state.ROOT}/posts/${this.props.id}`, {option: 'downVote'})
	}
	handleDelete(){			
		axios.delete(`${this.state.ROOT}/posts/${this.props.id}`).then(res => console.log(res.statusText))
		
		this.props.getPosts(this.props.posts.filter((post) => {
			return post.id !== this.props.id
		}))
	}



	render(){

		if(this.state.edit === true){
			return(
				<div>
					<Link to='/' className='MainLink'>Main</Link>
					<form className='PostEdit' onSubmit={(event) => {
						const data = new FormData(event.target)
						this.setState({title: data.get('title'), body: data.get('body')})
						this.setState({edit: false})
						axios.put(`${this.state.ROOT}/posts/${this.props.id}`,{title: data.get('title'), body: data.get('body')})
						axios.get(`${this.state.ROOT}/posts`).then(res => this.props.getPosts(res.data))
					}}>
						Title: <input type='text' name='title' defaultValue={this.props.title}/>
						Body: <input type='text' name='body' defaultValue={this.props.body} />
						<button type='submit'>Edit Post</button>
					</form>
					<div className='commentView'>
				<p>Comment Count: {this.props.comments.length}</p>
				{
					this.props.comments.map((comment) => {
						return(
							<Comment key={comment.id} id={comment.id} parentId={comment.parentId} voteScore={comment.voteScore} author={comment.author} body={comment.body} wholeComment={comment} onDeleteComment={this.onDeleteComment}/>
						)
					})
				}
	
				</div>
				<form className='CommentForm' onSubmit={(event) => {
					event.preventDefault()
					const ROOT = 'http://localhost:3001'
					const data = new FormData(event.target)
					axios.post(`${ROOT}/comments`,{id: Date.now.toString(), author: data.get('author'),parentId: this.props.id, body: data.get('body'), timestamp: Date.now()})
					this.props.addComment({id: Date.now().toString(), author: data.get('author'),parentId: this.props.id, body: data.get('body'), deleted: false, parentDeleted: false, timestamp: Date.now(), voteScore: 0})
					document.getElementById('CommentAuthor').value = ''
					document.getElementById('CommentBody').value = ''
				}}>
					<input type='text' id='CommentAuthor' name='author' placeholder='author' />
					<input type='text' id='CommentBody' name='body' placeholder='body' className='CommentBody' />
					<button type='submit'>Add Comment</button>
				</form>
				</div>

			)
		}
		else if(this.state.edit === false){
		return(

			<div className='PostDetail'>
				<Link to='/' className='MainLink'>Main</Link>
				<h3>{this.state.title}</h3>
				<h6>By {this.props.author}</h6>
				<p>{this.state.body}</p>
				<p>Vote Score: {this.state.voteScore}</p>
				<button onClick={this.handleUpVote.bind(this)}>Up Vote</button>
				<button onClick={this.handleDownVote.bind(this)}>Down Vote</button>
				<button onClick={() => {
					this.setState({edit: true})
				}}>Edit</button>
				<button onClick={this.handleDelete.bind(this)}>Delete</button>
				<div className='commentView'>
				<p>Comment Count: {this.props.comments.length}</p>
				{
					this.props.comments.map((comment) => {
						return(
							<Comment key={comment.id} id={comment.id} parentId={comment.parentId} voteScore={comment.voteScore} author={comment.author} body={comment.body} wholeComment={comment} onDeleteComment={this.onDeleteComment}/>
						)
					})
				}
	
				</div>
				<form className='CommentForm' onSubmit={(event) => {
					event.preventDefault()
					const ROOT = 'http://localhost:3001'
					const data = new FormData(event.target)
					axios.post(`${ROOT}/comments`,{id: Date.now.toString(), author: data.get('author'),parentId: this.props.id, body: data.get('body'), timestamp: Date.now()})
					this.props.addComment({id: Date.now().toString(), author: data.get('author'),parentId: this.props.id, body: data.get('body'), deleted: false, parentDeleted: false, timestamp: Date.now(), voteScore: 0})
					document.getElementById('CommentAuthor').value = ''
					document.getElementById('CommentBody').value = ''
				}}>
					<input type='text' id='CommentAuthor' name='author' placeholder='author' />
					<input type='text' id='CommentBody' name='body' placeholder='body' className='CommentBody' />
					<button type='submit'>Add Comment</button>
				</form>
			</div>

		)
		}
	}
}

function mapStateToProps(state){
	return{
		comments: state.comments.comments,
		posts: state.posts.posts,

	}
}
function mapDispatchToProps(dispatch){
	return{
		getPosts: (posts) => {dispatch(Actions.receivePosts(posts))},
		getComments: (comments) => {dispatch(Actions.receiveComments(comments))},
		addComment: (comment) => { dispatch(Actions.addComment(comment))},
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(PostDetail)