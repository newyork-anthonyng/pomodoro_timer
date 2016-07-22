import React from 'react';
import ReactDOM from 'react-dom';

const App = React.createClass({
	render: () => {
		return (
			<p>Hello World</p>
		);
	}
});

ReactDOM.render(<App />, document.getElementById('app'));
