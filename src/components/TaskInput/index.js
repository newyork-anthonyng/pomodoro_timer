import React, { PureComponent } from 'react';
import T from 'prop-types';
import noop from '../../utility/noop';
import glamorous from 'glamorous';

const Container = glamorous.div({
  marginTop: '20px',
});
const Textarea = glamorous.textarea({
  display: 'block',
  height: '100px',
  marginBottom: '10px',
  width: '250px',
});

const TaskInput = ({ value, onChange, onSubmit }) => (
  <Container>
    <Textarea
      value={value}
      onChange={onChange}
    />
    <button onClick={onSubmit}>✓</button>
  </Container>
);

TaskInput.defaultProps = {
  onSubmit: noop,
  onChange: noop,
};

TaskInput.propTypes = {
  value: T.string.isRequired,
  onSubmit: T.func.isRequired,
  onChange: T.func.isRequired,
};

export default TaskInput;
