import React, { Component } from 'react';
import * as Actions from '../actions'
import { connect } from 'react-redux'

class Comment extends Component{
	componentDidMount(){
		console.log(this.props)
	}
	state = {
		voteScore: this.props.voteScore,
		edit: false,
		author: this.props.author,
		body: this.props.body,

	}
	handleUpVote(){
		this.setState((prevState) => ({
					voteScore: prevState.voteScore += 1
				}))
		this.props.voteComment('upVote', this.props.id, this.props.parentId)

	}
	handleDownVote(){
		this.setState((prevState) => ({
					voteScore: prevState.voteScore -= 1
				}))
		this.props.voteComment('downVote', this.props.id, this.props.parentId)
	}
	handleDelete(event){
		this.props.deleteComment(this.props.id)
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
					this.props.editComment(this.props.id, {body: data.get('body'),timestamp: Date.now()}, this.props.parentId)

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
		getComments: (id) => { dispatch(Actions.fetchComments(id))},
		deleteComment: (id) => {dispatch(Actions.deleteAsyncComment(id))},
		voteComment: (option, id, parent_id) => {dispatch(Actions.voteComment(option, id, parent_id))},
		editComment: (id, edit, parentId) => {dispatch(Actions.editComment(id, edit, parentId))}
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(Comment)