import React from 'react';

export function Giphy(props) {
	const { src } = props;

	return (
		<div id="giphy">
			<img src={src} />
		</div>
	);
}
