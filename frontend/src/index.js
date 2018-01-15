import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
// import * as API from './utils/api'
import { createStore } from 'redux';
import { Provider } from 'react-redux'
import { rootReducer } from './reducers'
import { BrowserRouter } from 'react-router-dom';


export const store = createStore(rootReducer);



store.subscribe(() => {
	console.log(store.getState())
})


ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>, document.getElementById('root'));

registerServiceWorker();
