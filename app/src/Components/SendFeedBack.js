import * as firebase from 'firebase';
import React, { Component } from 'react';

import UiMessage from './uiMessage';

export default class SendFeedBack extends Component {
    constructor(props) {
        super(props)
        this.state = {
            message: '',
            sentFeedback: false
        }
    }

    sendFeedBack(e) {
        const date = new Date,
        // formatting thes current time
        current_time = `${ date.getMonth() + 1 === 13 ? date.getMonth() : date.getMonth() + 1 }/${ date.getDate()}/${ date.getFullYear() } ${ date.toLocaleTimeString()}`;

        firebase.database().ref(`/feedback/${ Math.random().toString(10).slice(2) }`).set({
            time: current_time,
            message: this.state.feedback
        })
        this.setState({
            feedback: '',
            sentFeedback: true
        })
    }

    getMessage(e) {
        const message = e.target.value;
        if ( message.replace(/^\s+|\s+$/g, '').length !== 0 ) {
              this.setState({
                  feedback: message
              })
        }
    }

    render() {
        const inputFeild = (
            <span>
                <input className='form-control' onChange={ this.getMessage.bind(this) } placeholder='feedback message' />
                <button className='btn btn-warning' onClick={ this.sendFeedBack.bind(this) }>Send Feedback</button>
            </span>
        )
        return (
            <div className='col-xs-12 col-ms-12 col-md-12'>
                { this.state.sentFeedback ? <UiMessage className='bin col-xs-12 col-sm-12 col-md-12 col-xs-offset-1' message='Thanks for sending your feedback' /> : inputFeild }
            </div>
        )
    }
}
