import React, { Component } from 'react';
import * as Actions from '../actions'
import { connect } from 'react-redux'
import Comment from './Comment'
import { Link } from 'react-router-dom'

class PostDetail extends Component{
	state = {
		voteScore: this.props.voteScore,
		edit: false,
		category: this.props.category,
		author: this.props.author,
		body: this.props.body,
		title: this.props.title,
	}

	componentDidMount(){
		this.props.fetchComments(this.props.id)

	}

	handleUpVote(){
		this.setState((prevState) => ({
					voteScore: prevState.voteScore += 1
				}))

		this.props.votePost('upVote', this.props.id)
	}
	handleDownVote(){
		this.setState((prevState) => ({
					voteScore: prevState.voteScore -= 1
				}))
		this.props.votePost('downVote', this.props.id)
	}
	handleDelete(){			
		
		this.props.deletePost(this.props.id)
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
						this.props.editPost(this.props.id, {title: data.get('title'), body: data.get('body')})
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
					const data = new FormData(event.target)
					this.props.addComment({id: Date.now().toString(), author: data.get('author'),parentId: this.props.id, body: data.get('body'), deleted: false, parentDeleted: false, timestamp: Date.now(), voteScore: 0}, Date.now.toString())
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
					const data = new FormData(event.target)
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
		getPosts: (posts) => {dispatch(Actions.fetchPosts())},
		fetchComments: (id) => {dispatch(Actions.fetchComments(id))},
		addComment: (comment, id) => { dispatch(Actions.addAsyncComment(comment, id))},
		fetchPosts: () => { dispatch(Actions.fetchPosts())},
		deletePost: (id) => {dispatch(Actions.deleteAsyncPost(id))},
		votePost: (option, id) => { dispatch(Actions.votePost(option, id))},
		editPost: (id, edit) => { dispatch(Actions.editPost(id, edit))}
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(PostDetail)