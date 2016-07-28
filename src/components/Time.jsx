import React from 'react';

export function Time(props) {
	const { seconds } = props;

	return (
		<div id="time">
			<p>{seconds}</p>
		</div>
	);
};
