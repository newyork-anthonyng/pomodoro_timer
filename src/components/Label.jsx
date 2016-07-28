import React from 'react';

export function Label(props){
	const { handleClick } = props;

	return (
		<div className="label">
			<p
				onClick={handleClick}
			>
				{this.props.children}
			</p>
		</div>
	);
};
