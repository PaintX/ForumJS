import { default as React, PropTypes, Component } from 'react';

class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="inner-page">
                {this.props.children}
            </div>
        );
    }
}

export default App;