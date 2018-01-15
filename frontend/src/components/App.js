import React, { Component } from 'react';
import './App.css';
import PostsRoot from './PostsRoot'
import { connect } from 'react-redux'
import * as Actions from '../actions'
import { Route, withRouter } from 'react-router-dom'
import PostDetail from './PostDetail'
import PostCategory from './PostCategory'
import axios from 'axios'
import NotFound from './NotFound'



class App extends Component { 
	componentDidMount(){
    const ROOT = 'http://localhost:3001'
    const AUTH_HEADERS = { 'Authorization': 'whatever-you-want', 'Accept': 'application/json', };
    axios.defaults.headers.common['Authorization'] = AUTH_HEADERS;
    axios.get(`${ROOT}/categories`).then(res => this.props.getCats(res.data.categories))
    // axios.post(`${ROOT}/posts`,{id: Date.now().toString(), timestamp: Date.now(), title: 'React is awesome', body: 'React is awesomer', author:'me', category: 'react'})
    axios.get(`${ROOT}/posts`).then(res => this.props.getPosts(res.data))
    // axios.delete(`${ROOT}/posts/1515805428716`)
    axios.get(`${ROOT}/posts`).then(res => this.props.getPosts(res.data))

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
		getPosts: (posts) =>  { dispatch(Actions.receivePosts(posts)) },
		getCats: (cats) => { dispatch(Actions.receiveCategories(cats))}
	}
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
