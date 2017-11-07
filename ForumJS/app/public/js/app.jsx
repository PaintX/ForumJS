import React from 'react';
import ReactDOM from 'react-dom';
import api from 'api';

import { HashRouter , Route, hashHistory, Switch} from 'react-router-dom';

import App from 'components/App';

import IndexPage from 'pages/index'
import LoginPage from 'pages/login'

api.init(() => {

    setTimeout(() => {
        ReactDOM.render(
            <HashRouter history={hashHistory}>
                <App>
                    <Switch>
                        <Route exact path="/" component={IndexPage} />
                        <Route path="/login" component={LoginPage} />
                    </Switch>
                </App>
            </HashRouter >, document.getElementById('appBody'));
    }
        , 10);
});


