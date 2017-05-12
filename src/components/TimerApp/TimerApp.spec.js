import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Button from '../Button';
import TaskInput from '../TaskInput';
import TaskList from '../TaskList';
import TimerApp from './';
import noop from '../../utility/noop';

const defaultProps = {
  onPlayClick: noop,
  onPauseClick: noop,
  onResetClick: noop,
  timeInMs: 25 * 60 * 1000, // 25 minutes
  timerIsActive: false,
  tasks: [
    { id: 'batman1', title: 'Batman', text: 'The Dark Knight' },
    { id: 'superman2', title: 'Superman', text: '???' },
  ],
  onTaskInputChange: noop,
  taskInputValue: 'Learn Marko',
  onTaskSubmit: noop,
  onTaskDeleteClick: noop,
};

it('should render correctly when timer is active', () => {
  const wrapper = shallow(
    <TimerApp
      {...defaultProps}
      timerIsActive
    />
  );
  expect(toJson(wrapper)).toMatchSnapshot();
});

it('should render correctly when timer is not active', () => {
  const wrapper = shallow(
    <TimerApp
      {...defaultProps}
      timerIsActive={false}
    />
  );
  expect(toJson(wrapper)).toMatchSnapshot();
});

it('should run callback when clicking on Play button', () => {
  const cb = jest.fn();
  const wrapper = shallow(
    <TimerApp
      {...defaultProps}
      onPlayClick={cb}
      timerIsActive={false}
    />
  );
  const playButton =  wrapper.find(Button).at(0);
  playButton.simulate('click');

  expect(cb.mock.calls.length).toEqual(1);
});

it('should run callback when clicking on Pause button', () => {
  const cb = jest.fn();
  const wrapper = shallow(
    <TimerApp
      {...defaultProps}
      onPauseClick={cb}
      timerIsActive
    />
  );
  const pauseButton = wrapper.find(Button).at(0);
  pauseButton.simulate('click');

  expect(cb.mock.calls.length).toEqual(1);
});

it('should pass correct props to Reset button', () => {
  const cb = jest.fn();
  const wrapper = shallow(
    <TimerApp
      {...defaultProps}
      onResetClick={cb}
    />
  );
  const resetButton = wrapper.find(Button).at(1);
  resetButton.simulate('click');

  expect(cb.mock.calls.length).toEqual(1);
});

it('should pass correct props to TaskInput', () => {
  const value = 'Run marathon';
  const onSubmit = jest.fn();
  const onChange = jest.fn();
  const wrapper = shallow(
    <TimerApp
      {...defaultProps}
      taskInputValue={value}
      onTaskInputChange={onChange}
      onTaskSubmit={onSubmit}
    />
  );
  const taskInput = wrapper.find(TaskInput);

  expect(taskInput.props().value).toEqual(value);
  expect(taskInput.props().onSubmit).toBe(onSubmit);
  expect(taskInput.props().onChange).toBe(onChange);
});

it('should pass correct props to TaskList', () => {
  const cb = jest.fn();
  const wrapper = shallow(
    <TimerApp
      {...defaultProps}
      onTaskDeleteClick={cb}
    />
  );
  const taskList = wrapper.find(TaskList);

  expect(taskList.props().tasks).toBe(defaultProps.tasks);
  expect(taskList.props().onDeleteClick).toBe(cb);
});
