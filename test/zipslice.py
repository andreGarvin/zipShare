import json
import os

obj = {
    'data-slice': [],
    'len': None
}

with open('prog_log.txt','r') as f:
    
    obj['len'] = os.path.getsize('prog_log.txt')
    
    data_size = os.path.getsize('prog_log.txt')
    
    while data_size != 0:
        
        i = 0
        
        data_size = data_size / 2
        
        obj['data-slice'].append( f.read()[ i  : data_size ] )
        
        print i, data_size
        raw_input()
        
        i += data_size
    
    with open('data.json', 'w') as wf:
    
        wf.write( json.dumps( obj ) )