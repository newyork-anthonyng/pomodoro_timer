import React from 'react';
import { connect } from 'react-redux';
import { Giphy } from '../components/Giphy';
import { getGiphy } from '../util/giphyHelper';

const GiphyContainer = React.createClass({
	getInitialState: function() {
		return { giphySource: '' };
	},

	componentWillMount: function() {
		this.updateGiphySource();
	},

	componentWillReceiveProps: function(nextProps) {
		const breakToWork = (nextProps.mode === 'work') && (this.props.mode === 'break');

		if(breakToWork) this.updateGiphySource();
	},

	updateGiphySource: function() {
		getGiphy(function(data) {
			this.setState({
				giphySource: data['source']
			});
		}.bind(this));
	},

	render: function() {
		if(this.props.mode === 'break') {
			return (
				<Giphy
					src={this.state.giphySource}
				/>
			);
		} else {
			return null;
		}
	}
});

export { GiphyContainer };
