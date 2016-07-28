import React from 'react';
import { connect } from 'react-redux';
import { TimeContainer } from './TimeContainer';
import { Footer } from '../components/Footer';

export function App() {
	return (
		<div>
			<TimeContainer />
			<Footer />
		</div>
	);
};
