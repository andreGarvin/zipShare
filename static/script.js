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
                        console.log( resp );
                    });
                
            }
        },
        
        send_feedback: function(){
            
            // Send a POST request
            axios.post({
                method: 'post',
                url: '/feedback?key=' + app.feedback.key + '&msg=' + app.feedback.msg,
            });
        },
        
        show_feedbox: function() {
            return this.seen = !( this.seen );
        }
    }
});
