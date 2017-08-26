import React, { Component } from 'react';

// firbase db-interfeace class FileStorge
import FileStorage from '../fileStorage';

// components
import UImessage from './uiMessage';
import Download from './download';
import Upload from './upload';

// styles
import '../styles/app.css';

export default class App extends Component {
      constructor(props) {
          super(props)
          this.state = {
              fileObj: {},
              prevFile: '',
              uiMessage: '',
              queryAlias: '',
              terminate: '5 mins'
          }
      }

      uploadFile() {
          const isObjectEmpty = (obj) => Object.keys(obj).length < 1

          if ( !isObjectEmpty(this.state.fileObj) ) {
              if (this.state.fileObj.file_name !== this.state.prevFile) {
                  this.setState({ uiMessage: "" })

                  const fileStorage = new FileStorage()
                  fileStorage.uploadFile(this.state.fileObj, this.state.terminate)
                      .then(alias_name => {
                            this.setState({
                                queryAlias: alias_name,
                                prevFile: this.state.fileObj.file_name
                            })
                      })
                      .catch(err => alert( err ))
              } else {
                  alert(`You can not upload the same file again.`)
              }
          } else {
              this.setState({ uiMessage: "Must a provide a file to upload" })
          }
      }

      getFile(e) {
        const file = e.target.files[0],
              fileObj = {
                    file,
                    type: file.name.split('.').length > 1 ? file.name.split('.')[1] : 'text',
                    file_name: file.name,
                    size: file.size
              }
              this.setState({
                  fileObj
              })
      }

      onPrompt() {
          const query = prompt('alias name'),
              fileStore = new FileStorage()
          if (query) {
              if ( query.replace(/^\s+|\s+$/g, '') ) {
                  fileStore.searchForFileAlias(query)
                      .then(resp => {
                          this.setState({
                              queryAlias: query
                          })
                      })
                      .catch(err => alert( err ))
              }
          }
      }

      // make this work
      setTime(e) {
          console.log( e )
      }

      render() {
          return (
              <div className='container-fuild'>
                    <div className="navbar navbar-theme navbar-static-top">
                        <h1 className='col-xs-5 col-sm-5 col-md-5' id="logo">
                            <a href='/'>zipshare</a>
                        </h1>
                        <button className="btn btn-warning pull-right" onClick={ this.onPrompt.bind(this) }>Get File</button>
                    </div>
                    { this.state.uiMessage ? <UImessage message={ this.state.uiMessage } /> : '' }
                    <Upload fileObj={this.state.fileObj} uploadFile={ this.uploadFile.bind(this) } getFile={ this.getFile.bind(this) } setTime={ this.setTime.bind(this) } />
                    { this.state.queryAlias ? <Download queryAlias={ this.state.queryAlias } /> : '' }
              </div>
          )
      }
}
