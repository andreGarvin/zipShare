import React, { Component } from 'react';

export default class uiMessage extends Component {
    render() {
        return (
            <div style={{ borderTop: '6px solid #fd6b2e' }}>
                <h3 className='text-center'>{ this.props.message }</h3>
            </div>
        )
    }
}
