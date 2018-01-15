import React, { Component } from 'react';
import './App.css';
import PostsRoot from './PostsRoot'
import { connect } from 'react-redux'
import * as Actions from '../actions'
import { Route, withRouter } from 'react-router-dom'
import PostDetail from './PostDetail'
import PostCategory from './PostCategory'
import NotFound from './NotFound'



class App extends Component { 
	componentDidMount(){
    this.props.fetchPosts()
    this.props.fetchCats()


	}

  render() {
    return (

      <div className="App">


      	<Route exact path='/' render={() => (<PostsRoot />)} />
      	{
      		this.props.cats.map((cat) => {
      			return(

      				<Route exact path={`/${cat.name}`} key={`${cat.name}`} render={() => ( <PostCategory category={`${cat.name}`} /> )} />
      			)
      		})
      	}
      	{
      		this.props.posts.map((post) => {
      			return(

      				<Route exact path={`/${post.category}/${post.id}`} key={`${post.id}`} render={() => ( <PostDetail key={`${post.id}`} id={`${post.id}`} title={post.title} author={post.author} voteScore={post.voteScore} commentCount={post.commentCount} body={post.body}/> )} />
      			)
      		})
      	}
        <Route path='/:category/:id' component={NotFound}/>

      </div>
    );
  }
}
function mapStateToProps(state){
	return {
		posts: state.posts.posts,
		cats: state.categories.categories
	}
}

function mapDispatchToProps(dispatch){
	return {
    fetchPosts: () => { dispatch(Actions.fetchPosts())},
		getPosts: (posts) =>  { dispatch(Actions.receivePosts(posts)) },
    fetchCats: () => {dispatch(Actions.fetchCategories())}
	}
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
