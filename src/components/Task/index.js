import React from 'react';
import T from 'prop-types';
import noop from '../../utility/noop';
import glamorous from 'glamorous';

const H4 = glamorous.h4({
  display: 'inline-block',
  margin: 0,
});

const P = glamorous.p({
  marginTop: '10px',
});

const Button = glamorous.button({
  float: 'right',
});

const Task = ({ id, title, text, onDeleteClick }) => (
  <div data-taskId={id}>
    <H4>{title}</H4>

    <Button onClick={() => onDeleteClick(id)}>×</Button>

    <P>{text}</P>
  </div>
);

Task.defaultProps = {
  onDeleteClick: noop,
};

Task.propTypes = {
  id: T.string.isRequired,
  title: T.string.isRequired,
  text: T.string.isRequired,
  onDeleteClick: T.func.isRequired,
};

export default Task;
