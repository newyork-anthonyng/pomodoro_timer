import React from 'react';

export function Time(props) {
	const { time } = props;

	return (
		<div id="time">
			<p>{time}</p>
		</div>
	);
};
