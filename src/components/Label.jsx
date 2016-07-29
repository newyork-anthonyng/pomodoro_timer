import React from 'react';

export function Label(props) {
	const { handleClick } = props;

	return (
		<div className="label">
			<p onClick={handleClick}>
				{props.children}
			</p>
		</div>
	);
};
