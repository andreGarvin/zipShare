var app = new Vue({
    el: '#app',
    
    data: {
        seen: false,
        
        feedback: {
            key: '',
            msg: ''
        }
    },
    
    methods: {
        
        open_zip: function() {
            
            var key = prompt('Enter zip Key');
            
            if ( key ) {
                
                // Send a POST request
                axios.post('/'+ key)
                    .then(function( resp ) {
                        if ( resp.data.status !== null )
                            alert( resp.data.msg );
                        else
                            window.open( resp.data.msg , '_blank' );
                    });
                
            }
        },
        
        send_feedback: function(){
            
            // Send a POST request
            axios.post({
                method: 'post',
                url: '/feedback?msg=' + app.feedback.msg,
            });
        }
    }
});
