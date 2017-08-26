import React, { Component } from 'react';

// firbase db-interfeace class FileStorge
import FileStorage from '../fileStorage';

export default class download extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fileObj: {}
        }
    }

    componentDidMount() {
        const fileStore = new FileStorage()
        fileStore.searchForFileAlias(this.props.queryAlias)
            .then(resp => {
                this.setState({ fileObj: resp })
            })
            .catch(err => alert( err ))
    }

    render() {
        const fileObj = this.state.fileObj
        return (
              <div className='contianer-fuild'>
                    <div id='downloadContainer' className="bin col-xs-6 col-sm-4 col-md-4 col-xs-offset-3 col-md-offset-2">
                        <h2 className='text-center'>{ fileObj.file_name ? <span>Download <span style={{color: '#fd6b2e'}}>{fileObj.file_name}</span> here</span> : 'Download file here' }</h2>
                        <h2>alias name: { this.props.queryAlias }</h2>
                        <span>
                            <h3>{ fileObj.file_name } <span style={{fontStyle: 'italic', fontSize: '20px', color: 'gray'}}>{ fileObj.size }</span></h3>
                            <h3 style={{marginLeft: '20px'}}>upload date: { fileObj.upload_date }</h3>
                        </span>
                        <a href={fileObj.downloadURL} style={{marginTop: '25px'}} className='btn btn-warning btn-block'>{ fileObj.file_name ? `download ${ fileObj.file_name }` : 'download file' }</a>
                    </div>
              </div>
        )
    }
}
