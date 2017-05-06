import React from 'react';
import T from 'prop-types';
import noop from '../../utility/noop';

const Button = ({ text, onClick, style }) => (
  <button style={style} onClick={onClick}>{text}</button>
);

Button.defaultProps = {
  onClick: noop,
};

Button.propTypes = {
  text: T.string.isRequired,
  onClick: T.func.isRequired,
  style: T.object,
};

export default Button;
