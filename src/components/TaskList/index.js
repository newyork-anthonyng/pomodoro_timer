import React from 'react';
import T from 'prop-types';
import Task from '../Task';
import noop from '../../utility/noop';
import glamorous from 'glamorous';

const Container = glamorous.div({
  marginTop: '40px',
  width: '250px',
});

const TaskList = ({ tasks, onDeleteClick }) => (
  <Container>
    {
      tasks.map((task) => (
        <Task
          {...task}
          key={task.id}
          onDeleteClick={onDeleteClick}
        />
      ))
    }
  </Container>
);

TaskList.defaultProps = {
  tasks: [],
  onDeleteClick: noop,
};

TaskList.propTypes = {
  tasks: T.arrayOf(T.shape({
    id: T.string.isRequired,
    title: T.string.isRequired,
    text: T.string.isRequired,
  })).isRequired,
  onDeleteClick: T.func.isRequired,
};

export default TaskList;
