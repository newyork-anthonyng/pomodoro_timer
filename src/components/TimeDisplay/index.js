import React from 'react';
import T from 'prop-types';
import timeFormatter from '../../utility/timeFormatter';
import glamorous from 'glamorous';

const H1 = glamorous.h1({
  fontSize: '150px',
  margin: 0,
});

const TimeDisplay = ({ timeInMs }) => (
  <H1>{timeFormatter(timeInMs)}</H1>
);

TimeDisplay.defaultProps = {
  timeInMs: 0,
};

TimeDisplay.propTypes = {
  timeInMs: T.number.isRequired,
};

export default TimeDisplay;
