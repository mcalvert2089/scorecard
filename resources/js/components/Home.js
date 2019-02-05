import React, { Component } from 'react'
import { togglePageLoad } from '../../js/actions/index'

class Home extends Component {
	componentDidMount() {
		store.dispatch(togglePageLoad({ pageLoading: false }))
	}

	componentWillUnmount() {
		store.dispatch(togglePageLoad({ pageLoading: true }))
	}

	render() {
		return (
			<div className="rounded overflow-hidden shadow-lg">
				<div className="px-6 py-4">
					<div className="font-bold text-xl mb-2">Welcome to the site</div>
					<p className="text-grey-darker text-base">
					  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas a auctor odio. Maecenas eu fringilla nisi, in aliquet erat. Nunc faucibus, risus in aliquet varius, erat risus maximus augue, quis pretium risus arcu quis lacus. Ut pharetra sem et est pulvinar rhoncus in sit amet odio. Integer convallis facilisis risus, a mollis magna congue non. Pellentesque luctus lacinia nisl, vitae tristique mauris eleifend ut. Duis maximus justo non pretium commodo. Nunc condimentum sapien et tellus aliquet blandit. Proin suscipit metus nisi, a sagittis metus accumsan ut. Suspendisse efficitur nunc vel bibendum consequat. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Sed id elementum mauris, quis tincidunt neque.
					</p>
				</div>
			</div>
		)
	}
}

export default Home