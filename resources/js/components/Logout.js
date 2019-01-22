import React from 'react'

class Logout extends React.Component {
    componentWillMount () {
    	axios.get('/api/auth/logout',
    		{ 
    			headers: {
		        	"Authorization" : "Bearer " + localStorage.getItem('access_token')
		     	}
		    }).then((result) => {
		      if(result.data.message) {
		    		localStorage.removeItem('access_token')
        			localStorage.removeItem('loggedIn')
        			window.location.reload()
		    	}
		    })
    }

    render () {
        return (
            <div>
                <h2>Logging out</h2>
            </div>
        )
    }
};

export default Logout