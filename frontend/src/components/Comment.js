import React, { Component } from 'react';
import * as Actions from '../actions'
import { connect } from 'react-redux'
import axios from 'axios'

class Comment extends Component{
	componentDidMount(){
		console.log(this.props)
	}
	state = {
		voteScore: this.props.voteScore,
		edit: false,
		author: this.props.author,
		body: this.props.body,
		ROOT: 'http://localhost:3001'

	}
	handleUpVote(){
		this.setState((prevState) => ({
					voteScore: prevState.voteScore += 1
				}))
		axios.post(`${this.state.ROOT}/comments/${this.props.id}`,{option: 'upVote'})

	}
	handleDownVote(){
		this.setState((prevState) => ({
					voteScore: prevState.voteScore -= 1
				}))
		axios.post(`${this.state.ROOT}/comments/${this.props.id}`,{option: 'downVote'})
	}
	handleDelete(event){
		this.props.deleteComment(this.props.id)
		axios.get(`${this.state.ROOT}/posts/${this.props.parentId}/comments`).then(res => this.props.getComments(res.data.filter((comment) => {
			return comment.deleted === false
		})))
	}
	handleEdit(){
		this.setState({edit: true})
	}
	
	render(){
		if(this.state.edit){
			return(
				<form className='CommentEdit' onSubmit={(event) => {
					event.preventDefault()
					const data = new FormData(event.target)
					this.setState({edit: false, body: data.get('body')})
					axios.put(`${this.state.ROOT}/comments/${this.props.id}`,{body: data.get('body'),timestamp: Date.now()})
					axios.get(`${this.state.ROOT}/posts/${this.props.parentId}/comments`).then(res => this.props.getComments(res.data.filter((comment) => {
			return comment.deleted === false
		})))

				}}>
					Body <input type='text' name='body' defaultValue={this.props.body} />
					<button id='updateComment' type='submit'>Update</button>
				</form>
			)
		}
		else{
		return(
			<div className='comment'>
				<p>{this.state.body}</p>
				<p>{this.state.author}</p>
				<p>Vote Score: {this.state.voteScore}</p>
				<div>
					<button onClick={this.handleUpVote.bind(this)}>Up Vote</button>
					<button onClick={this.handleDownVote.bind(this)}>Down Vote</button>
					<button onClick={this.handleEdit.bind(this)}>Edit</button>
					<button onClick={this.handleDelete.bind(this)}>Delete</button>
				</div>
			</div>



		)
	}
	}
}

function mapStateToProps(state){
	return{
		comments: state.comments.comments
	}
}
function mapDispatchToProps(dispatch){
	return{
		getComments: (comments) => { dispatch(Actions.receiveComments(comments))},
		deleteComment: (id) => {dispatch(Actions.deleteAsyncComment(id))}
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(Comment)