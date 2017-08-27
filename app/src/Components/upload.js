import React, { Component } from 'react';

export default class Upload extends Component {
    render() {
        const options = ['5 mins', '10 mins', '20 mins', '30 mins', '1 hr'].map(i => {
            return <option value={i} key={i} onClick={ this.props.setTime }>{ i }</option>;
        })

        return (
            <div id='uploadContainer' className='bin col-xs-6 col-sm-4 col-md-4 col-xs-offset-1 col-md-offset-1'>
                <h2>Upload file here</h2>

                <div className="progress">
                    <div className="progress-bar" id='progressBar' role="progressbar" value="0" max="100" style={{width: '0%'}}>
                        
                    </div>
                </div>
                <input type="file" onChange={ this.props.getFile } />
                <select className='form-control'>{ options }</select>
                <button className="btn btn-warning pull-right" onClick={ this.props.uploadFile }>{ this.props.fileObj.file_name ? `upload ${ this.props.fileObj.file_name }` : 'upload file' }</button>
            </div>
        )
    }
}
