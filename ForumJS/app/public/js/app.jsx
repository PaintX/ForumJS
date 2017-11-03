import React from 'react';
import ReactDOM from 'react-dom';

import { HashRouter , Route, hashHistory, Switch} from 'react-router-dom';

import App from 'components/App';

import IndexPage from 'pages/index'
import LoginPage from 'pages/login'

setTimeout(() => {
    ReactDOM.render(
        <HashRouter  history={hashHistory}>
            <App>
                <Switch>
                    <Route exact path="/" component={IndexPage} />
                    <Route path="/login" component={LoginPage} />
                </Switch>
            </App>
        </HashRouter >, document.getElementById('root'));
}
    , 10);

