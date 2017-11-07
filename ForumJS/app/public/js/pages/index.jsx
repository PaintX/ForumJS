import React, { Component } from 'react';
import { translate } from 'translate';
import siteinfos from "siteinfos";

var compiled = require('index_body.hbs');



class IndexPage extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {

    }


    componentDidMount() {

    }
    
    render() {

        return <div dangerouslySetInnerHTML={{ __html: compiled(object.Assign({}, { i18n: this.props.i18n }, siteinfos.getAll()))}} />;
    }
}

export default (translate(['COMMON'])(IndexPage));