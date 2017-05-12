import React from 'react';
import T from 'prop-types';
import noop from '../../utility/noop';
import TimeDisplay from '../TimeDisplay';
import Button from '../Button';
import TaskInput from '../TaskInput';
import TaskList from '../TaskList';

const TimerApp = ({
  onPlayClick,
  onPauseClick,
  onResetClick,
  timeInMs,
  timerIsActive,
  tasks,
  onTaskInputChange,
  taskInputValue,
  onTaskSubmit,
  onTaskDeleteClick,
  onClearAllClick,
}) => (
  <div>
    <TimeDisplay timeInMs={timeInMs} />

    <Button
      text={timerIsActive ? 'Pause' : 'Play'}
      onClick={timerIsActive ? onPauseClick : onPlayClick}
      style={{ marginRight: '20px' }}
    />

    <Button
      text="Reset"
      onClick={onResetClick}
    />

    <TaskInput
      value={taskInputValue}
      onSubmit={onTaskSubmit}
      onChange={onTaskInputChange}
    />

    <TaskList
      tasks={tasks}
      onDeleteClick={onTaskDeleteClick}
    />

    <Button
      text="Clear All"
      onClick={onClearAllClick}
    />

  </div>
);

TimerApp.defaultProps = {
  onPlayClick: noop,
  onPauseClick: noop,
  onResetClick: noop,
  onTaskInputChange: noop,
  onTaskSubmit: noop,
  onTaskDeleteClick: noop,
  onClearAllClick: noop,
};

TimerApp.propTypes = {
  onPlayClick: T.func.isRequired,
  onPauseClick: T.func.isRequired,
  onResetClick: T.func.isRequired,
  timeInMs: T.number.isRequired,
  timerIsActive: T.bool.isRequired,
  tasks: T.arrayOf(T.shape({
    title: T.string.isRequired,
    text: T.string.isRequired,
  })).isRequired,
  onTaskInputChange: T.func.isRequired,
  taskInputValue: T.string.isRequired,
  onTaskSubmit: T.func.isRequired,
  onTaskDeleteClick: T.func.isRequired,
  onClearAllClick: T.func.isRequired,
};

export default TimerApp;
