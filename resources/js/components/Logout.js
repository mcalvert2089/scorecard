import React from 'react'
import { togglePageLoad } from '../../js/actions/index'
import Loading from './Loading'

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

    componentDidMount() {
        store.dispatch(togglePageLoad({ pageLoading: false }))
    }

    componentWillUnmount() {
        store.dispatch(togglePageLoad({ pageLoading: true }))
    }

    render () {
        return (
            <div>
                <div className="flex justify-center">
                    <h2>Logging out</h2>
                </div>
                <Loading />
            </div>
        )
    }
};

export default Logout