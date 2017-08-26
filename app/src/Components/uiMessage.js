import React, { Component } from 'react';

export default class uiMessage extends Component {
    render() {
        return (
            <p>{ this.props.message }</p>
        )
    }
}
