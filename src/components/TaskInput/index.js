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

class TaskInput extends PureComponent {
  constructor() {
    super();

    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.props.onSubmit();
    }
  }

  render() {
    const { value, onChange, onSubmit } = this.props;

    return (
      <Container>
        <Textarea
          value={value}
          onChange={onChange}
          onKeyPress={this.handleKeyPress}
        />
        <button onClick={onSubmit}>✓</button>
      </Container>
    );
  }
}

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
