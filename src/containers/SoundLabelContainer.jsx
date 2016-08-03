import React from 'react';
import { Label } from '../components/Label';

const SoundLabelContainer = React.createClass({
	render: function() {
		const { sound, handleClick } = this.props;
		const className = sound ? 'toggle-sound active' : 'toggle-sound';

		return (
			<div className={className}>
				<Label handleClick={handleClick}>
					{String.fromCharCode(9833)} Sound {sound ? 'on' : 'off'}
				</Label>
			</div>
		);
	}
});

export { SoundLabelContainer };
