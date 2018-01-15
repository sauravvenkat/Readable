import React, { Component } from 'react'
import { connect } from 'react-redux'
class NotFound extends Component{
	render(){
		if(this.props.posts.filter((post) => { return post.id === this.props.match.params.id && post.category === this.props.match.params.category }).length === 0){
			return(
				<center>
					<h3>404 NOT FOUND</h3>
				</center>

			)
		}
		else{
			return(
				<div>
				</div>
			)
		}

	}
}

function mapStateToProps(state){
	return {
		posts: state.posts.posts,
	}
}
export default connect(mapStateToProps)(NotFound)