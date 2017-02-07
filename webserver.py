# server
from flask import Flask, request, render_template, jsonify, send_file, redirect, url_for
from time import gmtime, strftime       # time stamp
from pymongo import MongoClient         # database 'mongodb' module
from random import randint              # random moduel
from io import BytesIO                  # upload and download
import os                               # operating system

# my script files
from ziptime import *
# from watch_db import *

# start app
app = Flask(__name__)
client = MongoClient('localhost', 27017)
db = client.zipshare


# upload and homepage route
@app.route('/', methods=['GET', 'POST'])
def home():
    
    # wordbank fr the redirect urls
    word_bank = [ 'pillow', 'house', 'cat', 'key', 'dogs', 'umbrella', 'brother', 'car', 'spider', 'kill', 'code', 'snap', 'sister', 'paper', 'gutair', 'icon', 'tree', 'leaf', 'master', 'bird', 'phone', 'bottle', 'snake', 'bot', 'teeth', 'bite', 'data', 'react', 'cover', 'coat', 'goat', 'disc', 'vinyl', 'book', 'wallet', 'computer', 'cards', 'bob', 'baby', 'mario', 'classroom' ]
    
    # if it is a post method
    if request.method == 'POST':
        
        # uploaded file data
        file = request.files['inputFile']
        content = file.read()   # reads the file content
        
        if len( file.filename ) != 0:
            
            # file object/dictionary
            POST_data = {
                'end_time': set_time( request.form.get('time') ),
                'file_name': file.filename,
                'content': content,
                'file_size': len( content ),
                'file_key': word_bank[randint(0, len( word_bank )  - 1 )],
                'date': strftime("%a, %d %b %Y %H:%M", gmtime()),
            }
        
            # checkd to see if the file_key is not in use or been assigned        
            for j in db.docshare.find():
                # if the file key that was assigned is in use then reasign the file_key
                    while j['file_key'] == POST_data['file_key']:
                        POST_data['file_key'] = db['word_bank'][randint(0, len( fake_db['word_bank'] )  - 1 )]
        
            # incremnt to number active keys 
            # and appened the new key into active key
            db.docshare.insert_one( POST_data )
            
            # then redirect the user to the download page
            return render_template('download.html', resp={ 'file_name': POST_data['file_name'], 'file_size': len( content ), 'date': POST_data['date'], 'file_key': POST_data['file_key'] })
        
    # if the user just makes a get metjod send the homepage
    return render_template('index.html', resp={ 'activeKeys': db['activeKeys']['keys'], 'len': db['activeKeys']['count'] })



# displaying the download html page 
@app.route('/<key>', methods=['GET', 'POST'])
def GETdoc( key ):
    
    # the use makes a post request
    if request.method == 'POST':
        
        # send them back the jsn url route to the route it is on
        for i in db['activeKeys']['keys']:
        
            if i['file_key'].lower() == key.lower():
                
                return jsonify({ 'msg': '/' + key.lower(), 'status': True })
        
        # else they enter a 'bad key' then send this error msg
        return jsonify({ 'msg': 'Key not found or is expired.', 'status': None })
    
    
    # if the user makes a get request
    elif request.method == 'GET':
    
        # then redirects the user to the front download page
        # goes through each key
        for i in db['activeKeys']['keys']:
            
            if i['file_key'].lower() == key.lower():
                
                # if the key matches of the file they wish to download    
                # then redirect the to the download page
                return render_template('download.html', resp={ 'file_name': i['file_name'], 'file_size': i['file_size'], 'date': i['date'], 'file_key': key.lower() })
        
        # else returns  back  a error messg in json format
        return jsonify({ 'msg': 'Key-file is not active anymore or does not exist.', 'status': False })


# download route
@app.route('/download')
def download():
    
    # the key
    req_file = request.args.get('k')
    
    # go through each key to find the downloadable file
    for i in db['activeKeys']['keys']:
        
        # i fpound it starts to download
        if i['file_key'] == req_file:
            
            return send_file( BytesIO( i['content'] ), attachment_filename=i['file_name'], as_attachment=True )
    
    # else it returns back a json error meg
    return jsonify({ 'msg': 'error', 'status': None })


# feedback route
@app.route('/zipshare/feedback/', methods=['POST', 'GET'])
def feedback():
    
    
    # the use makes a post request
    if request.method == 'POST':
        
        # the 'msg'and 'key'(optional) from a feedback
        msg = request.args.get('msg')
        key = request.args.get('key')
    
        
        # appends the feeback msg
        # then retuns back of the msg and the status in json format
        db.feedback.insert_one({ 'msg': msg, 'key': key,  'status': True })
        
        return True
        
    # the use makes a post request
    elif request.method == 'GET':
        return redirect( url_for('home') )


# starts the webserver
if __name__ == '__main__':
    app.run(host=os.getenv('IP', '0.0.0.0'), port=int(os.getenv('PORT', 8080)),debug=True)
