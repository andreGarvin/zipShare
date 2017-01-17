# server
from flask import Flask, request, render_template, jsonify, send_file

# time stamp
from time import gmtime, strftime
from random import randint

# upload and download
from io import BytesIO

# josn
import json

# operating system
import os

# start app
app = Flask(__name__)


db = {
    # active kyes being used
  'activeKeys': {
      'count': 0,
      'keys': []
  },
  'db-route': '/route/db/admin?p=f$BTN7@1',
  'word_bank': [ 'pillow', 'house', 'cat', 'key', 'dogs', 'umbrella', 'brother', 'car', 'spider', 'kill', 'code', 'snap', 'sister', 'paper', 'gutair', 'icon', 'tree', 'leaf', 'master', 'bird', 'phone', 'bottle', 'snake', 'bot', 'teeth', 'bite', 'data', 'react', 'cover', 'coat', 'goat', 'disc', 'vinyl', 'book', 'wallet', 'computer', 'cards', 'bob', 'baby', 'mario', 'classroom' ]
}

# def check():
#     time = strftime("%M", gmtime())
    
#     """
#     59 + 10
    
#     69 - 60
    
#     9
#     """
    
#     for k in db['activeKeys']['keys']:
        
#         # if time[3:5] ==  i['date'][13:16]:
#         print 'times up'
#         # del i['file_key']

# check()

@app.route('/', methods=['GET', 'POST'])
def home():
    # check()
    
    
    if request.method == 'POST':
        
        file = request.files['inputFile']
        content = file.read()
        
        POST_data = {
            'end_time': request.form.get('time')[0:1],
            'file_name': file.filename,
            'content': content,
            'file_size': len( content ),
            'file_key': db['word_bank'][randint(0, len( db['word_bank'] )  - 1 )],
            'date': strftime("%a, %d %b %Y %H:%M", gmtime()),
            'feedback': []
        }
        
        
        for j in db['activeKeys']['keys']:
            while j['file_key'] == POST_data['file_key']:
                POST_data['file_key'] = db['word_bank'][randint(0, len( db['word_bank'] )  - 1 )]
        
        db['activeKeys']['count'] += 1
        db['activeKeys']['keys'].append( POST_data )
        
        # check()
        return render_template('download.html', resp={ 'file_name': POST_data['file_name'], 'file_size': len( content ), 'date': POST_data['date'], 'file_key': POST_data['file_key'] })
    
    # check()
    return render_template('index.html', resp={ 'activeKeys': db['activeKeys']['keys'], 'len': db['activeKeys']['count'] })

@app.route('/demo')
def demo():
    return jsonify( db )

@app.route('/<key>', methods=['GET', 'POST'])
def GETdoc( key ):
    
    # check()
    
    if request.method == 'POST':
        
        for i in db['activeKeys']['keys']:
        
            if i['file_key'].lower() == key.lower():
                
                return jsonify({ 'msg': '/' + key.lower(), 'status': True })
        
        # check()
        return jsonify({ 'msg': 'Key not found or is expired.', 'status': None })
    
    
    elif request.method == 'GET':
    
        for i in db['activeKeys']['keys']:
        
            if i['file_key'].lower() == key.lower():
                
                # check()
                return render_template('download.html', resp={ 'file_name': i['file_name'], 'file_size': i['file_size'], 'date': i['date'], 'file_key': key.lower() })
        
        # check()
        return jsonify({ 'msg': 'Key-file is not active anymore or does not exist.', 'status': False })

@app.route('/download')
def download():
    
    req_file = request.args.get('k')
    
    for i in db['activeKeys']['keys']:
        
        if i['file_key'] == req_file:
            
            # check()
            return send_file( BytesIO( i['content'] ), attachment_filename=i['file_name'], as_attachment=True )
    
    # check()
    return jsonify({ 'msg': 'error', 'status': None })


@app.route('/feedback/<key>', methods=['POST'])
def feedback( key ):
    
    msg = request.args.get('msg')
    
    if len( msg ) != 0:
        
        for k in db['activeKeys']['keys']:
            
            if k['file_key'] == key:
                
                k['feedback'].append(msg)
                
                print '\n', k['feedback'], '\n'
                
                return jsonify({ 'msg': msg, 'status': True })
                
        return jsonify({ 'msg': 'stop it!', 'status': None })
    
    else:
        return jsonify({ 'msg': 'stop it!', 'status': None })


app.run(host=os.getenv('IP', '0.0.0.0'), port=int(os.getenv('PORT', 8080)),debug=True)