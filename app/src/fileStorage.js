import * as firebase from 'firebase';

import alias_namesArray from './aliasNames.json';

// Initialize Firebase
firebase.initializeApp({
    apiKey: "AIzaSyCzEiOhe7bL5OMumXRtizIRntuWKVH3POo",
    authDomain: "zipshare-d15d1.firebaseapp.com",
    databaseURL: "https://zipshare-d15d1.firebaseio.com",
    projectId: "zipshare-d15d1",
    storageBucket: "zipshare-d15d1.appspot.com",
    messagingSenderId: "434093569392"
})


export default class FileStorge {

      uploadFile( fileObj, terminate ) {
            return new Promise(function(resolve, reject) {
                  function createAlias() {
                        var aliasNames = alias_namesArray
                        return aliasNames[ Math.floor(Math.random() * aliasNames.length) ]
                  }

                  firebase.database().ref('/').once('value', fileLinks => {
                      fileLinks = fileLinks.val() || []
                      const file_aliasNames = Object.keys( fileLinks )
                      let new_aliasName = createAlias()

                      while ( file_aliasNames.includes( new_aliasName ) ) {
                            new_aliasName = createAlias()
                      }

                      var exist = false;
                      if (Object.keys(fileLinks).length !== 0) {
                          for (let i in fileLinks) {
                              if (fileLinks[i].file_name === fileObj.file_name) {
                                  exist = true;
                                  return;
                              }
                          }
                      }
                      
                      if (!exist) {
                          const storageRef = firebase.storage().ref(`uploads/${ fileObj.file_name }`).put(fileObj.file)
                          storageRef.on('state_changed', storageObj => {
                                var progressBar = document.getElementById('progressBar')
                                progressBar.style.cssText = `width: ${ (storageObj.bytesTransferred / storageObj.totalBytes) * 100 }%`
                          },
                          (err) => reject(err),
                          () => {
                                const date = new Date,
                                // formatting thes current time
                                current_time = `${ date.getMonth() + 1 === 13 ? date.getMonth() : date.getMonth() + 1 }/${ date.getDate()}/${ date.getFullYear() } ${ date.toLocaleTimeString()}`;

                                firebase.database().ref(`/${ new_aliasName }`).set({
                                      file_name: fileObj.file_name,
                                      type: fileObj.type,
                                      size: fileObj.size,
                                      terminate,
                                      upload_date: current_time,
                                      oid: Math.random().toString(36).slice(2),
                                      downloadURL: storageRef.snapshot.downloadURL
                                })
                                return resolve(new_aliasName)
                          })
                          return
                      } else {
                          return reject(`'${fileObj.file_name}' already exists.`)
                      }
                })
          })
      }


      searchForFileAlias( query ) {
            return new Promise(function(resolve, reject) {
                firebase.database().ref('/').on('value', fileStore => {
                    fileStore = fileStore.val()

                    var resp;
                    for (let f in fileStore) {
                        if (f === query.toLowerCase()) {
                            return resolve(fileStore[f])
                        }
                    }

                    return reject(`alias name '${ query }' does not exist or time was up.`)
                })
            })
      }
}
