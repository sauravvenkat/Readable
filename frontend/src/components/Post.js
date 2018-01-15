import React, { Component } from 'react';
import * as Actions from '../actions'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios'
class Post extends Component {
	state = {
		voteScore: this.props.voteScore,
		edit: false,
		category: this.props.category,
		author: this.props.author,
		body: this.props.body,
		title: this.props.title,
		ROOT: 'http://localhost:3001'
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
		
		// this.props.addBrokenLink(this.props.category, this.props.id)
		this.props.getPosts(this.props.posts.filter((post) => {
			return post.id !== this.props.id
		}))
	}
	render(){
		if(this.state.edit){
		return(
			<form className='PostEdit' onSubmit={(event) => {
				const data = new FormData(event.target)
				this.setState({title: data.get('title'), body: data.get('body')})
				this.setState({edit: false})
				axios.put(`${this.state.ROOT}/posts/${this.props.id}`,{title: data.get('title'), body: data.get('body')})
				axios.get(`${this.state.ROOT}/posts`).then(res => this.props.getPosts(res.data))
			}}>
				Title: <input type='text' name='title' defaultValue={this.props.title}/>
				Body: <input type='text' name='body' defaultValue={this.props.body} />
				<button type='submit'>Add Edit</button>
			</form>

		) 
	}
	else{
	return(
		<div className='post'>
			<Link to={`/${this.state.category}/${this.props.id}`} ><h3>{this.state.title}</h3></Link>
			<h6>{this.state.author}</h6>
			<p>{this.state.body}</p>
			<p>Vote Score: {this.state.voteScore}</p>
			<p>Comments({this.props.comments})</p>
				<button onClick={this.handleUpVote.bind(this)}>Up Vote</button>
				<button onClick={this.handleDownVote.bind(this)}>Down Vote</button>
				<button onClick={() => {
					this.setState({edit: true})
				}}>Edit</button>
				<button onClick={this.handleDelete.bind(this)}>Delete</button>


		</div>
		)
}
	}
}
function mapStateToProps(state){
	return{
		posts: state.posts.posts
	}
}
function mapDispatchToProps(dispatch){
	return{
		getPosts: (posts) => {dispatch(Actions.receivePosts(posts))},
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);