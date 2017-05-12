import React from 'react';
import { mount } from 'enzyme';

jest.mock('../../utility/webworkerWrapper');
import TimerWorker from '../../utility/webworkerWrapper';

jest.mock('../WebNotifications');

jest.mock('../../utility/uuid');

jest.mock('../../utility/localStorage');
import localStorage from '../../utility/localStorage';

import TimerApp from '../TimerApp';
import TaskInput from '../TaskInput';
import Button from '../Button';
import Task from '../Task';
import App from './';

/*
* Shhh...remove console from jest output
*/
// eslint-disable-next-line no-console
console.error = jest.fn();
beforeEach(() => {
  localStorage.set = jest.fn();
  localStorage.get = jest.fn(() => []);
});

describe('On component mount', () => {
  it('should create new web worker on mount', () => {
    const wrapper = mount(<App />);

    expect(TimerWorker.mock.calls.length).toEqual(1);
    const webworker = wrapper.instance().timerWorker;
    expect(typeof webworker.onmessage).toEqual('function');
  });

  it('should fetch items from local storage on mount', () => {
    const tasks = [
      { id: 'apple1', title: 'Apple', text: 'Ate an apple' },
      { id: 'banana2', title: 'Banana', text: 'Ate a banana' },
    ];
    localStorage.get = jest.fn(() => tasks);
    const wrapper = mount(<App />);

    expect(localStorage.get).toHaveBeenCalledTimes(1);
    expect(wrapper.find(TimerApp).props().tasks).toEqual(tasks);
  });

  it('should return default empty array when local storage contains nothing', () => {
    localStorage.get = jest.fn(() => null);
    const wrapper = mount(<App />);

    expect(localStorage.get).toHaveBeenCalledTimes(1);
    expect(wrapper.find(TimerApp).props().tasks).toEqual([]);
  });
});

describe('When clicking play button', () => {
  it('should update timerIsActive to true', () => {
    const wrapper = mount(<App />);

    const playButton = wrapper.find('button').at(0);
    playButton.simulate('click');

    expect(wrapper.find(TimerApp).props().timerIsActive).toBeTruthy();
  });

  it('should start web worker', () => {
    const wrapper = mount(<App />);

    const playButton = wrapper.find('button').at(0);
    playButton.simulate('click');

    const webworker = wrapper.instance().timerWorker;
    expect(webworker.postMessage).toHaveBeenCalledTimes(1);
    expect(webworker.postMessage.mock.calls[0][0]).toMatchSnapshot();
  });
});

describe('When clicking pause button', () => {
  it('should update timerIsActive to false', () => {
    const wrapper = mount(<App />);
    wrapper.setState({ timerIsActive: true });

    const pauseButton = wrapper.find('button').at(0);
    pauseButton.simulate('click');

    expect(wrapper.find(TimerApp).props().timerIsActive).toBeFalsy();
  });

  it('should stop web worker', () => {
    const wrapper = mount(<App />);
    wrapper.setState({ timerIsActive: true });

    const pauseButton = wrapper.find('button').at(0);
    pauseButton.simulate('click');

    const webworker = wrapper.instance().timerWorker;
    expect(webworker.postMessage).toHaveBeenCalledTimes(1);
    expect(webworker.postMessage.mock.calls[0][0]).toMatchSnapshot();
  });
});

describe('When clicking reset button', () => {
  it('should update timerIsActive to false', () => {
    const wrapper = mount(<App />);
    wrapper.setState({ timerIsActive: true });

    const resetButton = wrapper.find('button').at(1);
    resetButton.simulate('click');

    expect(wrapper.find(TimerApp).props().timerIsActive).toBeFalsy();
  });

  it('should reset timer', () => {
    const wrapper = mount(<App />);
    wrapper.setState({ timeInMs: 42 });

    const resetButton = wrapper.find('button').at(1);
    resetButton.simulate('click');

    const workTime = wrapper.instance().WORK_TIME;
    expect(wrapper.find(TimerApp).props().timeInMs).toEqual(workTime);
  });

  it('should stop web worker', () => {
    const wrapper = mount(<App />);

    const resetButton = wrapper.find('button').at(1);
    resetButton.simulate('click');

    const webworker = wrapper.instance().timerWorker;
    expect(webworker.postMessage).toHaveBeenCalledTimes(1);
    expect(webworker.postMessage.mock.calls[0][0]).toMatchSnapshot();
  });

  it('should set mode to WORK', () => {
    const wrapper = mount(<App />);
    wrapper.setState({
      isWorking: false,
    });

    const resetButton = wrapper.find('button').at(1);
    resetButton.simulate('click');

    expect(wrapper.state().isWorking).toBeTruthy();
  });
});

describe('TimerWorker messages', () => {
  it('should update time on every TICK message', () => {
    const wrapper = mount(<App />);
    const webworker = wrapper.instance().timerWorker;

    const newTime = 42;
    webworker.onmessage({
      data: {
        action: 'TICK',
        time: newTime,
      },
    });

    expect(wrapper.find(TimerApp).props().timeInMs).toEqual(newTime);
  });

  it('should update timerIsActive to false on COMPLETE message', () => {
    const wrapper = mount(<App />);
    wrapper.setState({ timerIsActive: true });
    const webworker = wrapper.instance().timerWorker;

    webworker.onmessage({
      data: {
        action: 'COMPLETE',
      },
    });

    expect(wrapper.find(TimerApp).props().timerIsActive).toBeFalsy();
  });

  it('should update time when work pomodoro is completed', () => {
    const wrapper = mount(<App />);
    const webworker = wrapper.instance().timerWorker;

    webworker.onmessage({
      data: {
        action: 'COMPLETE',
      },
    });

    const breakTime = wrapper.instance().BREAK_TIME;
    expect(wrapper.find(TimerApp).props().timeInMs).toEqual(breakTime);
  });

  it('should update time when break pomodoro is completed', () => {
    const wrapper = mount(<App />);
    const webworker = wrapper.instance().timerWorker;
    wrapper.setState({ isWorking: false });

    webworker.onmessage({
      data: {
        action: 'COMPLETE',
      },
    });

    const workTime = wrapper.instance().WORK_TIME;
    expect(wrapper.find(TimerApp).props().timeInMs).toEqual(workTime);
  });

  it('should toggle from work to break on COMPLETE message', () => {
    const wrapper = mount(<App />);
    const webworker = wrapper.instance().timerWorker;
    wrapper.setState({ isWorking: true });

    webworker.onmessage({
      data: {
        action: 'COMPLETE',
      },
    });

    expect(wrapper.state().isWorking).toBeFalsy();
  });

  it('should toggle from break to work on COMPLETE message', () => {
    const wrapper = mount(<App />);
    const webworker = wrapper.instance().timerWorker;
    wrapper.setState({ isWorking: false });

    webworker.onmessage({
      data: {
        action: 'COMPLETE',
      },
    });

    expect(wrapper.state().isWorking).toBeTruthy();
  });
});

describe('WebNotifications', () => {
  it('should display correct notification when WORK timer is completed', () => {
    const wrapper = mount(<App />);
    const webworker = wrapper.instance().timerWorker;
    wrapper.setState({ isWorking: true });

    webworker.onmessage({
      data: {
        action: 'COMPLETE',
      },
    });

    const notification = wrapper.instance().notification;
    expect(notification.createNotification).toHaveBeenCalledTimes(1);
    expect(notification.createNotification.mock.calls[0][0]).toMatchSnapshot();
  });

  it('should display correct notification when BREAK timer is completed', () => {
    const wrapper = mount(<App />);
    const webworker = wrapper.instance().timerWorker;
    wrapper.setState({ isWorking: false });

    webworker.onmessage({
      data: {
        action: 'COMPLETE',
      },
    });

    const notification = wrapper.instance().notification;
    expect(notification.createNotification).toHaveBeenCalledTimes(1);
    expect(notification.createNotification.mock.calls[0][0]).toMatchSnapshot();
  });
});

describe('Task inputs', () => {
  it('should update task input text when typing', () => {
    const wrapper = mount(<App />);

    const newText = 'pomodoro is awesome';
    const textArea = wrapper.find('textarea');
    textArea.simulate('change', { target: { value: newText  } });

    expect(textArea.props().value).toEqual(newText);
  });

  it('should add task when clicking on button', () => {
    const wrapper = mount(<App />);

    const textArea = wrapper.find('textarea');
    textArea.simulate('change', { target: { value: 'pomodoro is awesome' } });
    const button = wrapper.find(TaskInput).find('button');
    button.simulate('click');

    expect(wrapper.find(TimerApp).props().tasks).toMatchSnapshot();
  });

  it('should not add an empty task', () => {
    const wrapper = mount(<App />);

    const textArea = wrapper.find('textarea');
    textArea.simulate('change', { target: { value: ' ' } });
    textArea.simulate('keypress', { key: 'Enter' });

    expect(wrapper.find(TimerApp).props().tasks).toHaveLength(0);
  });

  it('should empty text input field after adding a task', () => {
    const wrapper = mount(<App />);

    const textArea = wrapper.find('textarea');
    textArea.simulate('change', { target: { value: 'pomodoro is awesome' } });
    const button = wrapper.find(TaskInput).find('button');
    button.simulate('click');

    expect(textArea.props().value).toEqual('');
  });

  it('should set localStorage after adding a task', () => {
    localStorage.set = jest.fn();

    const wrapper = mount(<App />);

    const textArea = wrapper.find('textarea');
    textArea.simulate('change', { target: { value: 'pomodoro is awesome' } });
    const button = wrapper.find(TaskInput).find('button');
    button.simulate('click');

    expect(localStorage.set).toHaveBeenCalledTimes(1);
  });

  it('should add task in correct order', () => {
    const wrapper = mount(<App />);
    const tasks = [
      { id: 'apple1', title: 'Apples', text: 'Ate an apple' },
      { id: 'banana2', title: 'Bananas', text: 'Ate a banana' },
    ];
    wrapper.setState({ tasks });

    const textArea = wrapper.find('textarea');
    textArea.simulate('change', { target: { value: 'pomodoro is awesome' } });
    const button = wrapper.find(TaskInput).find('button');
    button.simulate('click');

    expect(wrapper.find(TimerApp).props().tasks).toMatchSnapshot();
  });
});

describe('Task delete', () => {
  const tasks = [
    { id: 'apple1', title: 'Apples', text: 'Ate an apple' },
    { id: 'banana2', title: 'Bananas', text: 'Ate a banana' },
  ];

  it('should delete task', () => {
    const wrapper = mount(<App />);
    wrapper.setState({ tasks });

    const bananaTask = wrapper.find(Task).at(1);
    const deleteButton = bananaTask.find('button');
    deleteButton.simulate('click');

    expect(wrapper.find(TimerApp).props().tasks).toHaveLength(1);
  });

  it('should update the local storage', () => {
    const wrapper = mount(<App />);
    wrapper.setState({ tasks });
    localStorage.set.mockClear();

    const bananaTask = wrapper.find(Task).at(1);
    const deleteButton = bananaTask.find('button');
    deleteButton.simulate('click');

    expect(localStorage.set).toHaveBeenCalledTimes(1);
    expect(localStorage.set.mock.calls[0][0]).toMatchSnapshot();
  });
});

describe('Clear all tasks', () => {
  const tasks = [
    { id: 'apple1', title: 'Apples', text: 'Ate an apple' },
    { id: 'banana2', title: 'Bananas', text: 'Ate a banana' },
  ];

  it('should delete all tasks', () => {
    const wrapper = mount(<App />);
    wrapper.setState({ tasks });

    const clearAllButton = wrapper.find(Button).at(2);
    clearAllButton.simulate('click');

    expect(wrapper.find(TimerApp).props().tasks).toEqual([]);
  });

  it('should update the local storage', () => {
    const wrapper = mount(<App />);

    const clearAllButton = wrapper.find(Button).at(2);
    clearAllButton.simulate('click');

    expect(localStorage.set).toHaveBeenCalledTimes(1);
    expect(localStorage.set.mock.calls[0][0]).toMatchSnapshot();
  });
});

describe('Keyboard shortcuts', () => {
  let map;

  beforeEach(() => {
    map = {};

    document.addEventListener = jest.fn((event, cb) => {
      map[event] = cb;
    });
  });

  it('should add keypress event listener on mount', () => {
    mount(<App />);

    expect(document.addEventListener).toHaveBeenCalledTimes(1);
    expect(map.keypress).toBeDefined();
  });

  it('should PLAY when pressing ctrl + q and timer is not active', () => {
    const wrapper = mount(<App />);
    wrapper.setState({ timerIsActive: false });
    wrapper.instance().handlePlayClick = jest.fn();

    map.keypress({
      key: 'q',
      ctrlKey: true,
    });

    expect(wrapper.instance().handlePlayClick).toHaveBeenCalledTimes(1);
  });

  it('should PAUSE when pressing ctrl + q and timer is active', () => {
    const wrapper = mount(<App />);
    wrapper.setState({ timerIsActive: true });
    wrapper.instance().handlePauseClick = jest.fn();

    map.keypress({
      key: 'q',
      ctrlKey: true,
    });

    expect(wrapper.instance().handlePauseClick).toHaveBeenCalledTimes(1);
  });

  it('should RESET when pressing ctrl + R', () => {
    const wrapper = mount(<App />);
    wrapper.instance().handleResetClick = jest.fn();

    map.keypress({
      key: 'r',
      ctrlKey: true,
    });

    expect(wrapper.instance().handleResetClick).toHaveBeenCalledTimes(1);
  });

  it('should submit task when pressing ctrl + ENTER', () => {
    const wrapper = mount(<App />);
    wrapper.instance().handleTaskSubmit = jest.fn();

    map.keypress({
      key: 'Enter',
      ctrlKey: true,
    });

    expect(wrapper.instance().handleTaskSubmit).toHaveBeenCalledTimes(1);
  });

  it('should do nothing if ctrl key is not pressed', () => {
    const wrapper = mount(<App />);
    wrapper.instance().handlePauseClick = jest.fn();

    map.keypress({ key: 'q' });

    expect(wrapper.instance().handlePauseClick).not.toHaveBeenCalled();
  });
});
